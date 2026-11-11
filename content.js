// content.js — injeta/remove o bot conforme o estado da licença no storage
(function () {
    'use strict';

    const ID_PAINEL = 'bot-controle-triplo';
    const UM_DIA_MS = 24 * 60 * 60 * 1000;
    let ligado = false;

    // O servidor é a autoridade; esta checagem local é só um complemento (ex.: offline).
    // Tolerância de 1 dia para não cortar a licença por diferença de fuso/hora.
    function licencaValida({ ativo, vencimento }) {
        if (!ativo) return false;
        if (vencimento) {
            const fim = new Date(vencimento).getTime();
            if (!Number.isNaN(fim) && fim + UM_DIA_MS < Date.now()) return false;
        }
        return true;
    }

    function injetarBot() {
        if (document.getElementById(ID_PAINEL)) return;
        const script = document.createElement('script');
        script.src = chrome.runtime.getURL('bot.js');
        script.onload = () => script.remove();
        (document.head || document.documentElement).appendChild(script);
    }

    function removerBot() {
        // O bot.js (mundo da página) escuta esta mensagem e se destrói sozinho
        window.postMessage({ acao: 'destruirBotMaster' }, window.location.origin);
        document.getElementById(ID_PAINEL)?.remove();
        console.warn('[Bot Pokeidle] Bot desativado e removido da tela.');
    }

    function aplicar(deveLigar) {
        if (deveLigar && !ligado) {
            injetarBot();
            ligado = true;
        } else if (!deveLigar && ligado) {
            removerBot();
            ligado = false;
        }
    }

    async function avaliar() {
        try {
            const dados = await chrome.storage.local.get(['ativo', 'vencimento']);
            aplicar(licencaValida(dados));
        } catch {
            // Contexto da extensão invalidado (ex.: extensão recarregada): ignora
        }
    }

    // ---- Configurações do bot (tempos e mínimos), persistidas em chrome.storage.local ----
    // O bot.js roda no mundo da página e não acessa chrome.storage: conversa por postMessage.
    const CHAVE_CONFIG = 'configBot';
    const CAMPOS_CONFIG = ['tempoHunt', 'tempoPotion', 'tempoBall', 'tempoRevive', 'minPotion', 'minBall', 'minRevive'];
    const TIPOS_FARM = ['xp', 'ouro', 'shiny'];
    const TIPOS_ITEM = ['ball', 'potion', 'revive'];
    const NOME_ITEM = /^[\p{L}\p{N} .'-]{1,40}$/u;

    // Aceita só os campos conhecidos, com inteiros em faixa razoável (a página não é confiável)
    function sanitizarConfig(config) {
        const limpo = {};
        if (!config || typeof config !== 'object') return limpo;
        for (const campo of CAMPOS_CONFIG) {
            const n = Number.parseInt(config[campo], 10);
            if (Number.isFinite(n) && n >= 0 && n <= 10000000) limpo[campo] = n;
        }
        if (TIPOS_FARM.includes(config.tipoFarm)) limpo.tipoFarm = config.tipoFarm;

        // Ordem de uso dos itens: até 2 nomes por tipo ("" = não mexer / nenhum)
        if (config.ordem && typeof config.ordem === 'object') {
            limpo.ordem = {};
            for (const tipo of TIPOS_ITEM) {
                const lista = Array.isArray(config.ordem[tipo]) ? config.ordem[tipo].slice(0, 2) : [];
                limpo.ordem[tipo] = lista.map((n) => (typeof n === 'string' && NOME_ITEM.test(n) ? n : ''));
            }
        }
        return limpo;
    }

    window.addEventListener('message', async (evento) => {
        if (evento.source !== window || !evento.data) return;
        try {
            if (evento.data.acao === 'botCarregarConfig') {
                const dados = await chrome.storage.local.get(CHAVE_CONFIG);
                window.postMessage(
                    { acao: 'botConfig', config: sanitizarConfig(dados[CHAVE_CONFIG]) },
                    window.location.origin
                );
            } else if (evento.data.acao === 'botSalvarConfig') {
                await chrome.storage.local.set({ [CHAVE_CONFIG]: sanitizarConfig(evento.data.config) });
            }
        } catch {
            // Contexto da extensão invalidado: ignora
        }
    });

    chrome.storage.onChanged.addListener((mudancas, area) => {
        if (area === 'local' && (mudancas.ativo || mudancas.vencimento)) avaliar();
    });

    avaliar();
    setInterval(avaliar, 60 * 1000); // reavalia a validade local
})();