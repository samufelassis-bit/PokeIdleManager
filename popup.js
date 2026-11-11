// popup.js
document.addEventListener('DOMContentLoaded', () => {
    const $ = (id) => document.getElementById(id);

    const telaLogin = $('tela-login');
    const telaConta = $('tela-conta');
    const blocoPedir = $('bloco-pedir');
    const blocoCodigo = $('bloco-codigo');

    const inputEmail = $('input-email');
    const inputIndicacao = $('input-indicacao');
    const inputCodigo = $('input-codigo');

    const btnEnviarCodigo = $('btn-enviar-codigo');
    const btnVerificar = $('btn-verificar');
    const btnReenviar = $('btn-reenviar');
    const btnTrocarEmail = $('btn-trocar-email');
    const btnComprar = $('btn-comprar');
    const btnHistorico = $('btn-historico');
    const btnCopiar = $('btn-copiar');
    const btnSair = $('btn-sair');

    const divStatus = $('status');
    const divVencimento = $('vencimento');

    // Atualizações chegam pela Chrome Web Store; a versão aparece só como informação
    $('lbl-versao').textContent = `v${chrome.runtime.getManifest().version}`;

    const VALIDADE_CODIGO_MS = 10 * 60 * 1000; // igual ao servidor (enviar-codigo)
    let timerReenvio = null;

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

    function mostrarStatus(texto, tipo) {
        divStatus.textContent = texto;
        divStatus.className = `status ${tipo}`;
    }

    function mostrarVencimento(vencimento) {
        const data = vencimento ? new Date(vencimento) : null;
        divVencimento.textContent = data && !Number.isNaN(data.getTime())
            ? `Validade: ${data.toLocaleDateString('pt-BR')}`
            : 'Validade: --/--/----';
    }

    function renderizarLicenca({ ativo, vencimento, codigoIndicacao, indicacoesRecompensadas }) {
        mostrarStatus(ativo ? 'Status: Ativo' : 'Status: Vencido / Inativo', ativo ? 'ok' : 'erro');
        mostrarVencimento(vencimento);
        if (codigoIndicacao) $('lbl-indicacao').textContent = codigoIndicacao;

        const lblIndicacoes = $('lbl-indicacoes');
        lblIndicacoes.hidden = !indicacoesRecompensadas;
        lblIndicacoes.textContent = indicacoesRecompensadas
            ? `Indicações que já renderam dias: ${indicacoesRecompensadas}`
            : '';
    }

    /** Enquanto `promessa` roda, desabilita o botão. */
    async function comBotaoOcupado(botao, promessa) {
        botao.disabled = true;
        try {
            return await promessa();
        } finally {
            botao.disabled = false;
        }
    }

    function emailDigitado() {
        const email = inputEmail.value.trim().toLowerCase();
        return email && inputEmail.checkValidity() ? email : null;
    }

    // ---------- Telas ----------

    function mostrarTelaConta(email) {
        telaLogin.hidden = true;
        telaConta.hidden = false;
        $('lbl-email').textContent = email;
    }

    function mostrarTelaLogin({ email = '', indicacao = '', aguardandoCodigo = false } = {}) {
        telaConta.hidden = true;
        telaLogin.hidden = false;
        inputEmail.value = email;
        inputIndicacao.value = indicacao;
        inputEmail.disabled = aguardandoCodigo;
        blocoPedir.hidden = aguardandoCodigo;
        blocoCodigo.hidden = !aguardandoCodigo;
        mostrarVencimento(null);
        if (aguardandoCodigo) {
            $('lbl-dica-codigo').textContent = `Enviamos um código de 6 dígitos para ${email}. Confira também o spam.`;
            inputCodigo.value = '';
            inputCodigo.focus();
            mostrarStatus('Status: Aguardando código', 'aviso');
        } else {
            mostrarStatus('Status: Desconectado', 'erro');
        }
    }

    /** Desabilita "Reenviar" por N segundos, mostrando a contagem. */
    function contagemReenvio(segundos) {
        clearInterval(timerReenvio);
        let restante = Math.max(0, Math.ceil(segundos));
        const atualizar = () => {
            btnReenviar.disabled = restante > 0;
            btnReenviar.textContent = restante > 0 ? `Reenviar código (${restante}s)` : 'Reenviar código';
            if (restante-- <= 0) clearInterval(timerReenvio);
        };
        atualizar();
        timerReenvio = setInterval(atualizar, 1000);
    }

    // ---------- Fluxo de verificação ----------

    async function pedirCodigo(email, indicacao) {
        mostrarStatus('Status: Enviando código...', 'aviso');
        let data;
        try {
            data = await Api.enviarCodigo(email, indicacao);
        } catch (err) {
            mostrarStatus('Status: Erro de conexão', 'aviso');
            alert('Erro de conexão: ' + err.message);
            return false;
        }

        // Já existe um código recente para este e-mail: segue para a etapa do código mesmo assim
        if (!data.sucesso && data.codigo !== 'AGUARDE') {
            mostrarStatus('Status: Desconectado', 'erro');
            alert(data.mensagem || 'Não foi possível enviar o código.');
            return false;
        }

        const pendente = { email, indicacao, enviadoEm: Date.now() };
        await chrome.storage.local.set({ verificacaoPendente: pendente });
        mostrarTelaLogin({ email, indicacao, aguardandoCodigo: true });
        contagemReenvio(data.aguardar_segundos || 60);
        if (!data.sucesso) mostrarStatus(`Status: ${data.mensagem}`, 'aviso');
        return true;
    }

    btnEnviarCodigo.addEventListener('click', () => comBotaoOcupado(btnEnviarCodigo, async () => {
        const email = emailDigitado();
        if (!email) {
            alert('Insira um e-mail válido!');
            return;
        }
        await pedirCodigo(email, inputIndicacao.value.trim().toUpperCase());
    }));

    btnReenviar.addEventListener('click', () => comBotaoOcupado(btnReenviar, async () => {
        const { verificacaoPendente } = await chrome.storage.local.get('verificacaoPendente');
        if (verificacaoPendente) await pedirCodigo(verificacaoPendente.email, verificacaoPendente.indicacao);
    }));

    btnTrocarEmail.addEventListener('click', async () => {
        clearInterval(timerReenvio);
        await chrome.storage.local.remove('verificacaoPendente');
        mostrarTelaLogin();
        inputEmail.focus();
    });

    async function confirmarCodigo() {
        const codigo = inputCodigo.value.replace(/\D/g, '');
        if (codigo.length !== 6) {
            alert('Digite os 6 dígitos do código.');
            return;
        }
        const { verificacaoPendente } = await chrome.storage.local.get('verificacaoPendente');
        if (!verificacaoPendente) {
            mostrarTelaLogin();
            return;
        }

        mostrarStatus('Status: Verificando...', 'aviso');
        let data;
        try {
            data = await Api.verificarCodigo(verificacaoPendente.email, codigo, verificacaoPendente.indicacao);
        } catch (err) {
            mostrarStatus('Status: Erro de conexão', 'aviso');
            alert('Erro de conexão: ' + err.message);
            return;
        }

        if (!data.sucesso || !data.token) {
            mostrarStatus('Status: Código inválido', 'erro');
            alert(data.mensagem || 'Código inválido.');
            if (data.codigo === 'CODIGO_EXPIRADO') contagemReenvio(0);
            inputCodigo.select();
            return;
        }

        clearInterval(timerReenvio);
        await salvarSessao(data);
        mostrarTelaConta(data.email);
        renderizarLicenca({ ativo: data.ativo, vencimento: data.vencimento, codigoIndicacao: data.codigo_indicacao });

        if (data.teste) {
            const extra = data.indicacao_aplicada
                ? '\nCódigo de indicação aplicado: na sua 1ª compra você e quem te indicou ganham +1 dia.'
                : '';
            alert('E-mail confirmado! Seu teste grátis de 3 dias começou.' + extra);
        }
    }

    btnVerificar.addEventListener('click', () => comBotaoOcupado(btnVerificar, confirmarCodigo));
    inputCodigo.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !btnVerificar.disabled) btnVerificar.click();
    });
    inputCodigo.addEventListener('input', () => {
        inputCodigo.value = inputCodigo.value.replace(/\D/g, '').slice(0, 6);
    });

    // ---------- Conta ----------

    async function validarLicenca(email, token) {
        mostrarStatus('Status: Verificando...', 'aviso');
        try {
            const resultado = await verificarLicenca(email, token);
            if (resultado.sessaoInvalida) {
                mostrarTelaLogin({ email });
                mostrarStatus('Status: Confirme seu e-mail para continuar', 'aviso');
                return;
            }
            renderizarLicenca(resultado);
        } catch (err) {
            console.error('Erro ao verificar licença:', err);
            mostrarStatus('Status: Erro de conexão', 'aviso');
        }
    }

    btnComprar.addEventListener('click', () => comBotaoOcupado(btnComprar, async () => {
        const { emailUsuario } = await chrome.storage.local.get('emailUsuario');
        if (!emailUsuario) return;
        try {
            const data = await Api.criarPagamento(emailUsuario);
            const checkout = urlHttpsSegura(data.checkout_url);
            if (data.sucesso && checkout) {
                chrome.tabs.create({ url: checkout });
            } else {
                alert('Erro ao gerar pagamento: ' + (data.mensagem || data.erro || 'Tente novamente.'));
            }
        } catch (err) {
            alert('Erro de conexão: ' + err.message);
        }
    }));

    btnHistorico.addEventListener('click', () => {
        chrome.tabs.create({ url: chrome.runtime.getURL('historico.html') });
    });

    btnCopiar.addEventListener('click', async () => {
        const codigo = $('lbl-indicacao').textContent.trim();
        if (!codigo || codigo.startsWith('-')) return;
        try {
            await navigator.clipboard.writeText(codigo);
            btnCopiar.textContent = 'Copiado!';
            setTimeout(() => { btnCopiar.textContent = 'Copiar'; }, 1500);
        } catch {
            alert(`Seu código: ${codigo}`);
        }
    });

    btnSair.addEventListener('click', () => comBotaoOcupado(btnSair, async () => {
        if (!confirm('Sair desta conta? O bot para até você confirmar o e-mail de novo.')) return;
        const { emailUsuario, tokenSessao } = await chrome.storage.local.get(['emailUsuario', 'tokenSessao']);
        try {
            if (emailUsuario && tokenSessao) await Api.sair(emailUsuario, tokenSessao);
        } catch (err) {
            console.error('Erro ao encerrar sessão no servidor:', err);
        }
        await limparSessao();
        mostrarTelaLogin({ email: emailUsuario || '' });
    }));

    // ---------- Inicialização ----------

    async function iniciar() {
        const dados = await chrome.storage.local.get([
            'emailUsuario', 'tokenSessao', 'verificacaoPendente',
            'ativo', 'vencimento', 'codigoIndicacao', 'indicacoesRecompensadas',
        ]);

        if (dados.emailUsuario && dados.tokenSessao) {
            mostrarTelaConta(dados.emailUsuario);
            renderizarLicenca(dados); // mostra o que já está salvo enquanto consulta o servidor
            await validarLicenca(dados.emailUsuario, dados.tokenSessao);
            return;
        }

        // O popup fecha quando o usuário vai ler o e-mail: retoma a etapa do código
        const pendente = dados.verificacaoPendente;
        if (pendente && Date.now() - pendente.enviadoEm < VALIDADE_CODIGO_MS) {
            mostrarTelaLogin({ email: pendente.email, indicacao: pendente.indicacao, aguardandoCodigo: true });
            contagemReenvio(60 - (Date.now() - pendente.enviadoEm) / 1000);
            return;
        }
        if (pendente) await chrome.storage.local.remove('verificacaoPendente');

        mostrarTelaLogin({ email: dados.emailUsuario || '' });
        if (dados.emailUsuario) mostrarStatus('Status: Confirme seu e-mail para continuar', 'aviso');
    }

    iniciar();
});
