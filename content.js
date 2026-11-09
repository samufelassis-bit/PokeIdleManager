// content.js
(async function() {
    function injetarBot() {
        if (document.getElementById('bot-controle-triplo')) return; 
        
        const scriptEl = document.createElement('script');
        scriptEl.src = chrome.runtime.getURL('bot.js');
        (document.head || document.documentElement).appendChild(scriptEl);
        scriptEl.remove();
    }

    function removerBot() {
        window.postMessage({ acao: 'destruirBotMaster' }, '*');

        const painel = document.getElementById('bot-controle-triplo');
        if (painel) painel.remove();

        const intervaloRemocao = setInterval(() => {
            const p = document.getElementById('bot-controle-triplo');
            if (p) {
                p.remove();
            } else {
                clearInterval(intervaloRemocao);
            }
        }, 150);

        if (window.botIntervalos) {
            clearInterval(window.botIntervalos.hunt);
            clearInterval(window.botIntervalos.potion);
            clearInterval(window.botIntervalos.ball);
            window.botIntervalos = null;
        }

        console.warn('[Bot Pokeidle] Bot desativado e removido da tela.');
    }

    // Ouve comandos enviados pelo background.js ou popup em tempo real
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        try {
            if (request.acao === "atualizarLicenca") {
                if (request.ativo) {
                    injetarBot();
                } else {
                    removerBot();
                }
            }
        } catch (e) {
            // Previne erros caso o contexto seja invalidado durante a mensagem
        }
    });

    // Verificação inicial ao carregar o content script na página
    chrome.storage.local.get(['ativo'], (data) => {
        if (data && data.ativo) {
            injetarBot();
        }
    });
})();