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
