// api.js — acesso às Edge Functions do Supabase e gerenciamento da licença
// Depende de config.js (carregar antes).

const Api = {
    /** Chama uma Edge Function e devolve o JSON. Lança Error em falha de rede ou resposta inválida. */
    async requisitar(funcao, { metodo = 'POST', corpo } = {}) {
        const res = await fetch(`${CONFIG.SUPABASE_URL}/functions/v1/${funcao}`, {
            method: metodo,
            headers: {
                'Content-Type': 'application/json',
                'apikey': CONFIG.SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${CONFIG.SUPABASE_ANON_KEY}`,
            },
            body: corpo !== undefined ? JSON.stringify(corpo) : undefined,
        });

        const texto = await res.text();
        try {
            return JSON.parse(texto);
        } catch {
            throw new Error(`Erro no servidor (${res.status}): ${texto.slice(0, 100)}`);
        }
    },

    criarPagamento: (email) => Api.requisitar('criar-pagamento', { corpo: { email } }),
    sincronizarCompras: (email, token) => Api.requisitar('sincronizar-compras', { corpo: { email, token } }),

    enviarCodigo: (email, codigoIndicacao) =>
        Api.requisitar('enviar-codigo', { corpo: { email, codigo_indicacao: codigoIndicacao || undefined } }),
    verificarCodigo: async (email, codigo, codigoIndicacao) =>
        Api.requisitar('verificar-codigo', {
            corpo: { email, codigo, codigo_indicacao: codigoIndicacao || undefined, id_navegador: await obterIdNavegador() },
        }),
    sair: (email, token) => Api.requisitar('clever-worker', { corpo: { email, token, acao: 'sair' } }),
};

const FORMATO_ID_NAVEGADOR = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

/**
 * ID aleatório deste navegador, usado só para o teste grátis valer uma vez por navegador.
 * Não identifica a pessoa. Fica no chrome.storage.sync, que acompanha a conta Google do
 * Chrome e sobrevive a reinstalar a extensão; a cópia no local cobre quem não sincroniza.
 */
async function obterIdNavegador() {
    let id = null;
    try {
        id = (await chrome.storage.sync.get('idNavegador')).idNavegador;
    } catch {
        /* sincronização indisponível */
    }
    if (!FORMATO_ID_NAVEGADOR.test(id || '')) id = (await chrome.storage.local.get('idNavegador')).idNavegador;
    if (!FORMATO_ID_NAVEGADOR.test(id || '')) id = crypto.randomUUID();

    await chrome.storage.local.set({ idNavegador: id });
    try {
        await chrome.storage.sync.set({ idNavegador: id });
    } catch {
        /* sem sincronização: vale a cópia local */
    }
    return id;
}

/** Grava a sessão recebida de verificar-codigo. */
async function salvarSessao({ email, token, ativo, vencimento, codigo_indicacao }) {
    await chrome.storage.local.set({
        emailUsuario: email,
        tokenSessao: token,
        ativo: Boolean(ativo),
        vencimento: vencimento || null,
        codigoIndicacao: codigo_indicacao || null,
    });
    await chrome.storage.local.remove('verificacaoPendente');
}

/** Apaga a sessão local (o bot para na hora, via storage.onChanged no content.js). */
async function limparSessao() {
    await chrome.storage.local.set({ ativo: false, vencimento: null });
    await chrome.storage.local.remove(['tokenSessao', 'codigoIndicacao', 'indicacoesRecompensadas', 'oferta']);
}

/**
 * Consulta a licença no servidor e grava o resultado em chrome.storage.local.
 * Em erro de rede lança exceção SEM alterar o estado salvo (uma queda de conexão
 * não deve derrubar a licença do usuário).
 * Retorna { ativo, vencimento, codigoIndicacao, indicacoesRecompensadas, sessaoInvalida }.
 */
async function verificarLicenca(email, token) {
    if (!token) {
        await limparSessao();
        return { ativo: false, vencimento: null, sessaoInvalida: true };
    }

    const resposta = await Api.requisitar('clever-worker', { corpo: { email, token, id_navegador: await obterIdNavegador() } });

    if (resposta && resposta.codigo === 'SESSAO_INVALIDA') {
        await limparSessao();
        return { ativo: false, vencimento: null, sessaoInvalida: true };
    }

    const ativo = Boolean(resposta && resposta.sucesso);
    const vencimento = (resposta && resposta.vencimento) || null;
    // Se o servidor não mandar o código (ex.: clever-worker antigo), mantém o que já está salvo
    const salvo = await chrome.storage.local.get('codigoIndicacao');
    const codigoIndicacao = (resposta && resposta.codigo_indicacao) || salvo.codigoIndicacao || null;
    const indicacoesRecompensadas = Number((resposta && resposta.indicacoes_recompensadas) || 0);
    const oferta = lerOferta(resposta && resposta.oferta);

    await chrome.storage.local.set({ ativo, vencimento, codigoIndicacao, indicacoesRecompensadas, oferta });
    return { ativo, vencimento, codigoIndicacao, indicacoesRecompensadas, oferta, sessaoInvalida: false };
}

/** Oferta vinda do servidor ({ preco, ate }) validada, ou null. */
function lerOferta(valor) {
    const preco = Number(valor && valor.preco);
    const ate = valor && new Date(valor.ate);
    if (!(preco > 0) || !ate || Number.isNaN(ate.getTime()) || ate <= new Date()) return null;
    return { preco, ate: ate.toISOString() };
}
