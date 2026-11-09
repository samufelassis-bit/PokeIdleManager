document.addEventListener('DOMContentLoaded', () => {
    const inputEmail = document.getElementById('input-email');
    const btnAtivar = document.getElementById('btn-ativar');
    const btnComprar = document.getElementById('btn-comprar');
    const btnHistorico = document.getElementById('btn-historico');
    const divStatus = document.getElementById('status');
    const lblVersao = document.getElementById('lbl-versao');
    const divVencimento = document.getElementById('vencimento');

    const VERSAO_ATUAL = chrome.runtime.getManifest().version;
    
    if (lblVersao) {
        lblVersao.textContent = `v${VERSAO_ATUAL}`;
    }

    async function verificarVersao() {
        try {
            const res = await fetch('https://fcigdnmvbaxwyjmyobvn.supabase.co/functions/v1/hyper-function');
            const data = await res.json();

            if (data.versao_recente && data.versao_recente !== VERSAO_ATUAL) {
                mostrarAvisoAtualizacao(data.mensagem, data.url, data.atualizacao_obrigatoria);
            }
        } catch (err) {
            console.error("Erro ao verificar versão:", err);
        }
    }

    function mostrarAvisoAtualizacao(mensagem, url, obrigatorio) {
        const container = document.body;
        
        const avisoDiv = document.createElement('div');
        avisoDiv.style.background = obrigatorio ? '#f8d7da' : '#fff3cd';
        avisoDiv.style.border = `1px solid ${obrigatorio ? '#f5c6cb' : '#ffeeba'}`;
        avisoDiv.style.color = obrigatorio ? '#721c24' : '#856404';
        avisoDiv.style.padding = '10px';
        avisoDiv.style.marginBottom = '12px';
        avisoDiv.style.borderRadius = '6px';
        avisoDiv.style.fontSize = '12px';
        avisoDiv.style.textAlign = 'center';
        
        avisoDiv.innerHTML = `
            <strong>${obrigatorio ? 'Atualização Obrigatória!' : 'Nova Versão Disponível!'}</strong><br>
            ${mensagem || 'Baixe a versão mais recente para continuar.'}<br>
            <a href="${url || '#'}" target="_blank" style="color: #0056b3; font-weight: bold; text-decoration: underline; display: inline-block; margin-top: 4px;">Atualizar Agora</a>
        `;
        
        container.prepend(avisoDiv);

        if (obrigatorio) {
            inputEmail.disabled = true;
            btnAtivar.disabled = true;
            btnComprar.disabled = true;
            if (btnHistorico) btnHistorico.disabled = true;
            btnAtivar.style.opacity = '0.5';
            btnComprar.style.opacity = '0.5';
            if (btnHistorico) btnHistorico.style.opacity = '0.5';
        }
    }

    // Executa a checagem de versão
    verificarVersao();

    // Função auxiliar para notificar a aba do jogo (content.js) em tempo real
    function notificarAbaAtiva(ativo) {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs[0] && tabs[0].id) {
                chrome.tabs.sendMessage(tabs[0].id, { acao: "atualizarLicenca", ativo: ativo }).catch(() => {
                    // Ignora se a aba ativa não for a página do jogo
                });
            }
        });
    }

    // Função auxiliar para atualizar a interface com os dados da licença
    function atualizarInterfaceLicenca(ativo, vencimento) {
        if (ativo) {
            divStatus.textContent = 'Status: Ativo';
            divStatus.style.color = '#22c55e';
        } else {
            divStatus.textContent = 'Status: Vencido / Inativo';
            divStatus.style.color = '#ef4444';
        }

        if (vencimento && divVencimento) {
            const dataFormatada = new Date(vencimento).toLocaleDateString('pt-BR');
            divVencimento.textContent = `Validade: ${dataFormatada}`;
        } else if (divVencimento) {
            divVencimento.textContent = `Validade: --/--/----`;
        }
    }

    // Carrega e-mail salvo e faz a validação automática em segundo plano
    chrome.storage.local.get(['emailUsuario', 'ativo', 'vencimento'], (data) => {
        if (data.emailUsuario) {
            inputEmail.value = data.emailUsuario;
            
            // Validação automática ao abrir o popup usando o e-mail salvo
            divStatus.textContent = 'Status: Verificando...';
            divStatus.style.color = '#eab308';

            chrome.runtime.sendMessage({ acao: "obterBot", email: data.emailUsuario }, (resposta) => {
                if (resposta && resposta.sucesso) {
                    const dataVencimento = resposta.vencimento || resposta.data_expiracao;
                    chrome.storage.local.set({ ativo: true, vencimento: dataVencimento });
                    atualizarInterfaceLicenca(true, dataVencimento);
                    notificarAbaAtiva(true);
                } else {
                    chrome.storage.local.set({ ativo: false });
                    atualizarInterfaceLicenca(false, null);
                    notificarAbaAtiva(false);
                }
            });
        } else {
            atualizarInterfaceLicenca(false, null);
            divStatus.textContent = 'Status: Desconectado';
            divStatus.style.color = '#ef4444';
            notificarAbaAtiva(false);
        }
    });

    // Salva o e-mail e valida a licença manualmente ao clicar no botão
    btnAtivar.addEventListener('click', () => {
        const email = inputEmail.value.trim();
        if (!email) {
            alert('Insira um e-mail válido!');
            return;
        }

        divStatus.textContent = 'Status: Verificando...';
        divStatus.style.color = '#eab308';

        chrome.storage.local.set({ emailUsuario: email }, () => {
            chrome.runtime.sendMessage({ acao: "obterBot", email: email }, (resposta) => {
                if (resposta && resposta.sucesso) {
                    const dataVencimento = resposta.vencimento || resposta.data_expiracao;
                    chrome.storage.local.set({ ativo: true, vencimento: dataVencimento });
                    atualizarInterfaceLicenca(true, dataVencimento);
                    notificarAbaAtiva(true);
                } else {
                    chrome.storage.local.set({ ativo: false });
                    atualizarInterfaceLicenca(false, null);
                    notificarAbaAtiva(false);
                }
            });
        });
    });

    // Gera o link de pagamento/renovação do Mercado Pago
    btnComprar.addEventListener('click', () => {
        const email = inputEmail.value.trim();
        if (!email) {
            alert('Digite seu e-mail antes de prosseguir!');
            return;
        }

        const SUPABASE_ANON_KEY = "sb_publishable_WuCewm2dUr_ZuzZ05T6pKw_bdPuEd9v";

        fetch('https://fcigdnmvbaxwyjmyobvn.supabase.co/functions/v1/criar-pagamento', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
            },
            body: JSON.stringify({ email: email })
        })
        .then(async res => {
            const texto = await res.text();
            try {
                return JSON.parse(texto);
            } catch (e) {
                throw new Error("Erro no servidor: " + texto);
            }
        })
        .then(data => {
            if (data.sucesso && data.checkout_url) {
                chrome.storage.local.set({ emailUsuario: email });
                chrome.tabs.create({ url: data.checkout_url });
            } else {
                alert('Erro ao gerar pagamento: ' + (data.mensagem || data.erro || 'Tente novamente.'));
            }
        })
        .catch(err => {
            alert('Erro de conexão: ' + err.message);
        });
    });

    // Abre a aba com o histórico de compras do usuário
    if (btnHistorico) {
        btnHistorico.addEventListener('click', () => {
            chrome.tabs.create({ url: chrome.runtime.getURL('historico.html') });
        });
    }
});