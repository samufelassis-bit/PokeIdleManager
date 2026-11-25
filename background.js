// background.js — service worker (MV3)
importScripts('config.js', 'api.js');

const ALARME_LICENCA = 'verificar-licenca';

function agendarVerificacao() {
    chrome.alarms.get(ALARME_LICENCA, (alarme) => {
        if (alarme) return;
        chrome.alarms.create(ALARME_LICENCA, {
            delayInMinutes: 1,
            periodInMinutes: CONFIG.INTERVALO_VERIFICACAO_MIN,
        });
    });
}

async function verificarEmSegundoPlano() {
    const { emailUsuario, tokenSessao } = await chrome.storage.local.get(['emailUsuario', 'tokenSessao']);
    if (!emailUsuario) return;

    try {
        // Sem token (ex.: quem atualizou de uma versão antiga) a licença local é desligada
        // até o usuário confirmar o e-mail no popup.
        await verificarLicenca(emailUsuario, tokenSessao);
        // O content.js reage sozinho a mudanças em chrome.storage (storage.onChanged).
    } catch (err) {
        console.error('[Background] Erro na checagem recorrente:', err);
    }
}

chrome.runtime.onInstalled.addListener(() => {
    agendarVerificacao();
    verificarEmSegundoPlano();
});

chrome.runtime.onStartup.addListener(() => {
    agendarVerificacao();
    verificarEmSegundoPlano();
});

chrome.alarms.onAlarm.addListener((alarme) => {
    if (alarme.name === ALARME_LICENCA) verificarEmSegundoPlano();
});

// Garante o alarme mesmo quando o worker é reativado sem onInstalled/onStartup
agendarVerificacao();

// ---------------------------------------------------------------- Precificador
// Vendas do mercado (precos.json do Precificador de Pokémon). A página do jogo não deixa baixar dados de outros
// sites, então o precificar.js pede aqui. O site libera CORS para todos: não precisa de permissão de host.
const URL_PRECOS = 'https://briaoale.github.io/precificador-pokemon/precos.json';
const VALIDADE_PRECOS_MS = 2 * 60 * 60 * 1000; // o site atualiza algumas vezes por dia
const CACHE_PRECOS = 'precificador-v1';

async function precosDoPrecificador() {
    const cache = await caches.open(CACHE_PRECOS);
    const guardado = await cache.match(URL_PRECOS);
    const baixadoEm = Number(guardado?.headers.get('x-baixado-em')) || 0;
    if (guardado && Date.now() - baixadoEm < VALIDADE_PRECOS_MS) return guardado.json();

    try {
        const resp = await fetch(URL_PRECOS, { cache: 'no-cache' });
        if (!resp.ok) throw new Error(`o site do precificador respondeu ${resp.status}`);
        const corpo = await resp.text();
        const precos = JSON.parse(corpo);
        await cache.put(URL_PRECOS, new Response(corpo, {
            headers: { 'content-type': 'application/json', 'x-baixado-em': String(Date.now()) },
        }));
        return precos;
    } catch (err) {
        // Sem internet ou site fora do ar: usa a cópia antiga, se houver
        if (guardado) return guardado.json();
        throw err;
    }
}

// ---------------------------------------------------------------- Aviso de licença no jogo
// O botão "Assinar" do aviso (content.js) pede aqui: o e-mail vem do storage, nunca da página.
const PAGINA_DO_JOGO = /^https:\/\/([a-z0-9-]+\.)?pokeidle\.io\//;

chrome.runtime.onMessage.addListener((msg, remetente, responder) => {
    if (msg?.acao !== 'abrirPagamento') return false;
    if (!remetente.tab || !PAGINA_DO_JOGO.test(remetente.url || '')) return false;
    (async () => {
        try {
            const { emailUsuario } = await chrome.storage.local.get('emailUsuario');
            if (!emailUsuario) return responder({ ok: false, mensagem: 'Entre com o seu e-mail no ícone da extensão.' });
            const data = await Api.criarPagamento(emailUsuario);
            const url = typeof data.checkout_url === 'string' && data.checkout_url.startsWith('https://') ? data.checkout_url : null;
            if (!data.sucesso || !url) return responder({ ok: false, mensagem: data.mensagem || 'Não consegui gerar o pagamento. Tente de novo.' });
            await chrome.tabs.create({ url, index: remetente.tab.index + 1 });
            responder({ ok: true });
        } catch {
            responder({ ok: false, mensagem: 'Erro de conexão. Tente de novo em instantes.' });
        }
    })();
    return true; // resposta assíncrona
});

chrome.runtime.onMessage.addListener((msg, _remetente, responder) => {
    if (msg?.tipo !== 'precificador:precos') return false;
    precosDoPrecificador()
        .then((precos) => responder({ ok: true, precos }))
        .catch((err) => responder({ ok: false, erro: `Não consegui baixar as vendas do mercado: ${err.message}` }));
    return true; // resposta assíncrona
});
