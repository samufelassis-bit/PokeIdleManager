// popup.js
document.addEventListener('DOMContentLoaded', () => {
    const $ = (id) => document.getElementById(id);
    const inputEmail = $('input-email');
    const btnAtivar = $('btn-ativar');
    const btnComprar = $('btn-comprar');
    const btnHistorico = $('btn-historico');
    const divStatus = $('status');
    const divVencimento = $('vencimento');
    const divAviso = $('aviso-versao');

    const VERSAO_ATUAL = chrome.runtime.getManifest().version;
    $('lbl-versao').textContent = `v${VERSAO_ATUAL}`;

    // ---------- Utilidades ----------

    /** Retorna a URL se for https válida; caso contrário null (evita javascript: e afins). */
    function urlHttpsSegura(valor) {
        try {
            const url = new URL(valor);
            return url.protocol === 'https:' ? url.href : null;
        } catch {
            return null;
        }
    }

    /** true se a versão `a` for maior que `b` (comparação numérica, ex.: 1.10.0 > 1.9.0). */
    function versaoMaior(a, b) {
        const pa = String(a).split('.').map(Number);
        const pb = String(b).split('.').map(Number);
        for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
            const x = pa[i] || 0;
            const y = pb[i] || 0;
            if (x !== y) return x > y;
        }
        return false;
    }

    function mostrarStatus(texto, tipo) {
        divStatus.textContent = texto;
        divStatus.className = `status ${tipo}`;
    }

    function renderizarLicenca({ ativo, vencimento }) {
        if (ativo) {
            mostrarStatus('Status: Ativo', 'ok');
        } else {
            mostrarStatus('Status: Vencido / Inativo', 'erro');
        }
        const data = vencimento ? new Date(vencimento) : null;
        divVencimento.textContent = data && !Number.isNaN(data.getTime())
            ? `Validade: ${data.toLocaleDateString('pt-BR')}`
            : 'Validade: --/--/----';
    }

    function definirControlesBloqueados(bloqueado) {
        [inputEmail, btnAtivar, btnComprar, btnHistorico].forEach((el) => { el.disabled = bloqueado; });
    }

    async function validarLicenca(email) {
        mostrarStatus('Status: Verificando...', 'aviso');
        try {
            renderizarLicenca(await verificarLicenca(email));
        } catch (err) {
            console.error('Erro ao verificar licença:', err);
            mostrarStatus('Status: Erro de conexão', 'aviso');
        }
    }

    // ---------- Aviso de atualização ----------

    function mostrarAvisoAtualizacao({ mensagem, url, obrigatorio }) {
        divAviso.className = `aviso-versao${obrigatorio ? ' obrigatorio' : ''}`;
        divAviso.replaceChildren();

        const titulo = document.createElement('strong');
        titulo.textContent = obrigatorio ? 'Atualização Obrigatória!' : 'Nova Versão Disponível!';
        divAviso.append(titulo, document.createElement('br'));
        divAviso.append(mensagem || 'Baixe a versão mais recente para continuar.', document.createElement('br'));

        const href = urlHttpsSegura(url);
        if (href) {
            const link = document.createElement('a');
            link.href = href;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.textContent = 'Atualizar Agora';
            divAviso.append(link);
        }

        if (obrigatorio) definirControlesBloqueados(true);
    }

    async function verificarVersao() {
        try {
            const data = await Api.versaoRecente();
            if (data.versao_recente && versaoMaior(data.versao_recente, VERSAO_ATUAL)) {
                mostrarAvisoAtualizacao({
                    mensagem: data.mensagem,
                    url: data.url,
                    obrigatorio: Boolean(data.atualizacao_obrigatoria),
                });
            }
        } catch (err) {
            console.error('Erro ao verificar versão:', err);
        }
    }

    // ---------- Ações ----------

    btnAtivar.addEventListener('click', async () => {
        const email = inputEmail.value.trim();
        if (!email || !inputEmail.checkValidity()) {
            alert('Insira um e-mail válido!');
            return;
        }
        await chrome.storage.local.set({ emailUsuario: email });
        await validarLicenca(email);
    });

    btnComprar.addEventListener('click', async () => {
        const email = inputEmail.value.trim();
        if (!email || !inputEmail.checkValidity()) {
            alert('Digite um e-mail válido antes de prosseguir!');
            return;
        }

        btnComprar.disabled = true;
        try {
            const data = await Api.criarPagamento(email);
            const checkout = urlHttpsSegura(data.checkout_url);
            if (data.sucesso && checkout) {
                await chrome.storage.local.set({ emailUsuario: email });
                chrome.tabs.create({ url: checkout });
            } else {
                alert('Erro ao gerar pagamento: ' + (data.mensagem || data.erro || 'Tente novamente.'));
            }
        } catch (err) {
            alert('Erro de conexão: ' + err.message);
        } finally {
            btnComprar.disabled = false;
        }
    });

    btnHistorico.addEventListener('click', () => {
        chrome.tabs.create({ url: chrome.runtime.getURL('historico.html') });
    });

    // ---------- Inicialização ----------

    verificarVersao();

    chrome.storage.local.get(['emailUsuario'], ({ emailUsuario }) => {
        if (emailUsuario) {
            inputEmail.value = emailUsuario;
            validarLicenca(emailUsuario);
        } else {
            mostrarStatus('Status: Desconectado', 'erro');
        }
    });
});
