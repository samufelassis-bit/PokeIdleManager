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

    versaoRecente: () => Api.requisitar('hyper-function', { metodo: 'GET' }),
    criarPagamento: (email) => Api.requisitar('criar-pagamento', { corpo: { email } }),
    sincronizarCompras: (email) => Api.requisitar('sincronizar-compras', { corpo: { email } }),
};

/**
 * Consulta a licença no servidor e grava o resultado em chrome.storage.local.
 * Em erro de rede lança exceção SEM alterar o estado salvo (uma queda de conexão
 * não deve derrubar a licença do usuário).
 */
async function verificarLicenca(email) {
    const resposta = await Api.requisitar('clever-worker', { corpo: { email } });
    const ativo = Boolean(resposta && resposta.sucesso);
    const vencimento = ativo ? (resposta.vencimento || resposta.data_expiracao || null) : null;

    await chrome.storage.local.set({ ativo, vencimento });
    return { ativo, vencimento };
}
