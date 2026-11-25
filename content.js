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
            const dados = await chrome.storage.local.get(CHAVES_LICENCA);
            aplicar(licencaValida(dados));
            atualizarAviso(dados);
        } catch {
            // Contexto da extensão invalidado (ex.: extensão recarregada): ignora
        }
    }

    // ---- Aviso na tela do jogo: licença vencida ou teste acabando, com a oferta da conta ----
    // Fica num Shadow DOM para o CSS do jogo e o nosso não se misturarem.
    const CHAVES_LICENCA = ['ativo', 'vencimento', 'emailUsuario', 'tokenSessao', 'oferta', 'avisoFechadoAte'];
    const ID_AVISO = 'pokeidle-bot-aviso';
    const PRECO_NORMAL = 14.9;
    const ESCONDER_AVISO_MS = 6 * 60 * 60 * 1000; // "Agora não" esconde por 6 horas
    const AVISAR_ANTES_MS = UM_DIA_MS;            // teste acabando: avisa nas últimas 24 h

    const moeda = (v) => Number(v).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    const dataHora = (d) => d.toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });

    function ofertaValida(o) {
        const ate = o && new Date(o.ate);
        return o && Number(o.preco) > 0 && ate && !Number.isNaN(ate.getTime()) && ate > new Date()
            ? { preco: Number(o.preco), ate }
            : null;
    }

    function daquiA(data) {
        const ms = data - Date.now();
        const horas = Math.floor(ms / 3600000);
        if (horas >= 48) return `em ${Math.floor(horas / 24)} dias`;
        if (horas >= 1) return `em ${horas} h`;
        return `em ${Math.max(1, Math.ceil(ms / 60000))} min`;
    }

    /** O que o aviso deve mostrar agora, ou null para não mostrar nada. */
    function conteudoDoAviso(d) {
        if (!d.emailUsuario || !d.tokenSessao) return null; // sem conta conectada: o popup cuida disso
        if ((d.avisoFechadoAte || 0) > Date.now()) return null;
        const oferta = ofertaValida(d.oferta);
        const preco = oferta ? oferta.preco : PRECO_NORMAL;
        const riscado = oferta ? moeda(PRECO_NORMAL) : null;
        const botao = `Assinar por ${moeda(preco)}`;

        if (!licencaValida(d)) {
            return oferta
                ? {
                    titulo: 'Seu bot está esperando',
                    texto: `O seu acesso acabou, mas separei um preço especial para você voltar: ${moeda(preco)} no 1º mês, sem cupom. Termina ${daquiA(oferta.ate)} (${dataHora(oferta.ate)}).`,
                    riscado, preco: moeda(preco), botao,
                }
                : {
                    titulo: 'Sua licença do Pokeidle Bot acabou',
                    texto: 'O bot está pausado. Renove para ele voltar a caçar, capturar e comprar por você.',
                    riscado: null, preco: `${moeda(preco)} / mês`, botao,
                };
        }

        const fim = d.vencimento ? new Date(d.vencimento) : null;
        if (oferta && fim && fim > Date.now() && fim - Date.now() < AVISAR_ANTES_MS) {
            return {
                titulo: `Seu teste acaba ${daquiA(fim)}`,
                texto: `Para o bot não parar, continue por ${moeda(preco)} no 1º mês. Sem cupom: o desconto já está na sua conta.`,
                riscado, preco: moeda(preco), botao,
            };
        }
        return null;
    }

    const CSS_AVISO = `
        :host { all: initial; }
        .caixa { position: fixed; right: 20px; bottom: 20px; z-index: 2147483000; width: 310px; box-sizing: border-box;
            background: #0f172a; color: #e2e8f0; border: 1px solid #16a34a; border-radius: 12px; padding: 16px;
            font: 13px/1.45 system-ui, -apple-system, 'Segoe UI', Arial, sans-serif; box-shadow: 0 12px 32px rgba(0,0,0,.45); }
        .topo { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
        .topo img { width: 22px; height: 22px; border-radius: 5px; }
        .marca { font-size: 11px; color: #86efac; font-weight: 600; flex: 1; }
        .fechar { background: none; border: 0; color: #94a3b8; font-size: 18px; line-height: 1; cursor: pointer; padding: 0 2px; }
        .fechar:hover { color: #e2e8f0; }
        h2 { margin: 0 0 6px; font-size: 16px; color: #f8fafc; }
        p { margin: 0 0 12px; color: #cbd5e1; }
        .preco { display: flex; align-items: baseline; gap: 8px; margin-bottom: 12px; }
        .preco s { color: #94a3b8; }
        .preco b { font-size: 24px; color: #4ade80; }
        .assinar { width: 100%; border: 0; border-radius: 8px; padding: 10px; background: #22c55e; color: #052e16;
            font: 700 14px system-ui, -apple-system, 'Segoe UI', Arial, sans-serif; cursor: pointer; }
        .assinar:hover:not(:disabled) { background: #16a34a; }
        .assinar:disabled { opacity: .6; cursor: wait; }
        .depois { display: block; margin: 8px auto 0; background: none; border: 0; color: #93c5fd; font-size: 12px;
            text-decoration: underline; cursor: pointer; }
        .erro { color: #fca5a5; margin: 8px 0 0; font-size: 12px; }
    `;

    function criar(tag, classe, texto) {
        const el = document.createElement(tag);
        if (classe) el.className = classe;
        if (texto != null) el.textContent = texto;
        return el;
    }

    async function esconderAviso() {
        document.getElementById(ID_AVISO)?.remove();
        try {
            await chrome.storage.local.set({ avisoFechadoAte: Date.now() + ESCONDER_AVISO_MS });
        } catch { /* contexto invalidado */ }
    }

    async function abrirPagamento(botao, caixa) {
        caixa.querySelector('.erro')?.remove();
        const textoOriginal = botao.textContent;
        botao.disabled = true;
        botao.textContent = 'Abrindo o pagamento…';
        let resposta;
        try {
            resposta = await chrome.runtime.sendMessage({ acao: 'abrirPagamento' });
        } catch {
            resposta = { ok: false, mensagem: 'A extensão foi atualizada. Recarregue a página e tente de novo.' };
        }
        botao.disabled = false;
        botao.textContent = textoOriginal;
        if (!resposta?.ok) caixa.appendChild(criar('p', 'erro', resposta?.mensagem || 'Não consegui abrir o pagamento. Tente pelo ícone da extensão.'));
    }

    function atualizarAviso(dados) {
        const conteudo = conteudoDoAviso(dados);
        let host = document.getElementById(ID_AVISO);
        if (!conteudo) { host?.remove(); return; }

        const assinatura = JSON.stringify(conteudo);
        if (host?.dataset.conteudo === assinatura) return; // nada mudou: não redesenha
        host?.remove();

        host = document.createElement('div');
        host.id = ID_AVISO;
        host.dataset.conteudo = assinatura;
        const sombra = host.attachShadow({ mode: 'closed' });
        sombra.appendChild(criar('style', null, CSS_AVISO));

        const caixa = criar('div', 'caixa');
        caixa.setAttribute('role', 'dialog');
        caixa.setAttribute('aria-label', conteudo.titulo);

        const topo = criar('div', 'topo');
        const icone = document.createElement('img');
        icone.src = chrome.runtime.getURL('icons/icon-32.png');
        icone.alt = '';
        const fechar = criar('button', 'fechar', '×');
        fechar.title = 'Fechar por 6 horas';
        fechar.addEventListener('click', esconderAviso);
        topo.append(icone, criar('span', 'marca', 'Pokeidle Bot'), fechar);

        const preco = criar('div', 'preco');
        if (conteudo.riscado) preco.appendChild(criar('s', null, conteudo.riscado));
        preco.appendChild(criar('b', null, conteudo.preco));

        const assinar = criar('button', 'assinar', conteudo.botao);
        assinar.addEventListener('click', () => abrirPagamento(assinar, caixa));
        const depois = criar('button', 'depois', 'Agora não');
        depois.addEventListener('click', esconderAviso);

        caixa.append(topo, criar('h2', null, conteudo.titulo), criar('p', null, conteudo.texto), preco, assinar, depois);
        sombra.appendChild(caixa);
        (document.body || document.documentElement).appendChild(host);
    }

    // ---- Configurações do bot (tempos e mínimos), persistidas em chrome.storage.local ----
    // O bot.js roda no mundo da página e não acessa chrome.storage: conversa por postMessage.
    const CHAVE_CONFIG = 'configBot';
    const CAMPOS_CONFIG = ['tempoHunt', 'tempoPotion', 'tempoBall', 'tempoRevive', 'minPotion', 'minBall', 'minRevive', 'tempoBoss', 'minBoss'];
    const CHAVE_BOSS = /^[a-z0-9_]{1,40}$/; // data-key dos bosses do jogo (ex.: articuno, dex487)
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
        if (typeof config.boss === 'string' && (config.boss === '' || CHAVE_BOSS.test(config.boss))) limpo.boss = config.boss;
        if (typeof config.bossRepetir === 'boolean') limpo.bossRepetir = config.bossRepetir;

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
            } else if (evento.data.acao === 'botStatusHunt') {
                // O bot conferiu na página se a extensão "/hunt for PokeIdle" está instalada
                await chrome.storage.local.set({ huntInstalado: evento.data.instalada === true, huntVerificadoEm: Date.now() });
            }
        } catch {
            // Contexto da extensão invalidado: ignora
        }
    });

    chrome.storage.onChanged.addListener((mudancas, area) => {
        if (area === 'local' && CHAVES_LICENCA.some((chave) => chave in mudancas)) avaliar();
    });

    avaliar();
    setInterval(avaliar, 60 * 1000); // reavalia a validade local
})();