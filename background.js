// background.js
const SUPABASE_ANON_KEY = "sb_publishable_WuCewm2dUr_ZuzZ05T6pKw_bdPuEd9v";

// Ouve chamadas vindas do popup ou scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.acao === "obterBot") {
        fetch('https://fcigdnmvbaxwyjmyobvn.supabase.co/functions/v1/clever-worker', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
            },
            body: JSON.stringify({ email: request.email })
        })
        .then(async res => {
            const textoResposta = await res.text();
            try {
                const dadosJson = JSON.parse(textoResposta);
                sendResponse(dadosJson);
            } catch (e) {
                sendResponse({ 
                    sucesso: false, 
                    mensagem: `Erro no servidor (${res.status}): ${textoResposta.substring(0, 100)}` 
                });
            }
        })
        .catch(err => {
            sendResponse({ sucesso: false, mensagem: "Erro de conexão: " + err.message });
        });

        return true; 
    }
});

// CHECAGEM RECORRENTE EM SEGUNDO PLANO
// (Mude de 5 * 1000 para 10 * 60 * 1000 quando terminar os testes)
const TEMPO_VERIFICACAO = 5 * 1000; 

setInterval(() => {
    chrome.storage.local.get(['emailUsuario'], (data) => {
        if (!data || !data.emailUsuario) return;

        fetch('https://fcigdnmvbaxwyjmyobvn.supabase.co/functions/v1/clever-worker', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
            },
            body: JSON.stringify({ email: data.emailUsuario })
        })
        .then(res => res.json())
        .then(resultado => {
            const ativo = resultado && resultado.sucesso;
            chrome.storage.local.set({ ativo: ativo });

            // Notifica todas as abas abertas do Pokeidle sobre o estado atual da licença
            chrome.tabs.query({ url: "*://*.pokeidle.io/*" }, (tabs) => {
                tabs.forEach(tab => {
                    chrome.tabs.sendMessage(tab.id, { acao: "atualizarLicenca", ativo: ativo }).catch(() => {});
                });
            });
        })
        .catch(err => console.error("[Background] Erro na checagem recorrente:", err));
    });
}, TEMPO_VERIFICACAO);