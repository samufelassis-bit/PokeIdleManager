// bot.js — executa no contexto da página do Pokeidle (injetado pelo content.js)
(function () {
    'use strict';

    const ID_PAINEL = 'bot-controle-triplo';
    const ID_ESTILO = 'bot-controle-estilo';

    // Se houver uma instância anterior, encerra antes de iniciar outra
    if (typeof window.__pokeidleBotDestruir === 'function') window.__pokeidleBotDestruir();

    // =====================================================================
    // Seletores (centralizados: se o site mudar, ajuste só aqui)
    // =====================================================================
    const SEL = {
        // Painel da extensão "/hunt for PokeIdle"
        botaoHunt: 'button.pih-btn.pih-barra',
        painelHunt: '.pih-tab',
        painelRegioes: '.pih-regioes',
        itensRegiao: '.pih-regioes [data-regiao]',
        checkboxLiberadas: '.pih-painel [data-pref="soLiberadas"]',
        fecharHunt: '.pih-painel [data-acao="fechar"]',
        botaoOrdem: '.pih-seg button[data-ordem]',
        melhorPokemon: '.pih-top .pih-hunt b',
        dimensao: '.pih-dim',

        // Jogo
        slider: '#auto-limiar input[type="range"]',
        hudHunt: '#hud-hunt',
        irCentro: '#ir-centro',
        botaoMapa: 'button[data-modal="mapa"]',
        regiaoMapa: '.mapa-reg-bt',
        nomeRegiaoMapa: '.mapa-reg-nome',
        buscaMapa: '#f-mapa',
        linhaPokemon: 'button.ml-linha',
        nomePokemon: '.ml-nome',
        botaoMarket: 'button[data-modal="market"]',
        categoriaMarket: '.mk-lado .mk-cat',
        modoMarket: '.cmp-op', // abas "Comprar" / "Vender" (o jogo lembra a última usada)
        cardMarket: '.mk-card',
        nomeCardMarket: '.mk-nome',
        comprarMarket: '.mk-acao.mk-pal-comprar',
        fecharModal: '#modal-fechar',
        chipItem: '.auto-chip',
        ouro: '#tr-gold',
        usarRevive: '#auto-revive',
        voltarHunt: '#auto-voltar-hunt',
    };

    // Tipos de item das automações do jogo (chips) e onde comprá-los no market
    const TIPOS_ITEM = {
        ball: { rotulo: 'Bola', opts: '#auto-ball-opts', categoria: 'pokebolas', idMin: 'input-min-ball', minPadrao: 2000 },
        potion: { rotulo: 'Poção', opts: '#auto-potion-opts', categoria: 'pocoes', idMin: 'input-min-potion', minPadrao: 2000 },
        revive: { rotulo: 'Revive', opts: '#auto-revive-opts', categoria: 'revives', idMin: 'input-min-revive', minPadrao: 100 },
    };
    const MAX_POR_COMPRA = 9999; // limite do campo de quantidade do market

    // Extensão gratuita da qual o Auto Hunt depende (ranking de hunts)
    const URL_EXTENSAO_HUNT = 'https://chromewebstore.google.com/detail/mhnplloljgchpfpcpbhmcokmnefodjnh';

    // =====================================================================
    // Utilidades
    // =====================================================================
    // ---- Relógio ----
    // Com a aba oculta (outra aba, janela minimizada) o Chrome segura os timers da página:
    // 1 vez por segundo e, depois de 5 min oculta, 1 vez por MINUTO. Timers de um Web Worker
    // não sofrem essa limitação forte, então todas as esperas do bot passam por um worker.
    // Se o worker não puder ser criado (ex.: bloqueado pelo site), volta para o setTimeout.
    const relogio = (() => {
        const pendentes = new Map();
        let proximoId = 1;
        let worker = null;

        const liberarPendentes = () => {
            pendentes.forEach((resolver) => resolver());
            pendentes.clear();
        };

        try {
            const codigo = `
                const timers = new Map();
                onmessage = (e) => {
                    const { id, ms } = e.data;
                    timers.set(id, setTimeout(() => { timers.delete(id); postMessage(id); }, ms));
                };`;
            const url = URL.createObjectURL(new Blob([codigo], { type: 'text/javascript' }));
            worker = new Worker(url);
            URL.revokeObjectURL(url);
            worker.onmessage = (e) => {
                const resolver = pendentes.get(e.data);
                pendentes.delete(e.data);
                resolver?.();
            };
            worker.onerror = () => {
                console.warn('[Bot Pokeidle] Relógio em worker indisponível; usando o relógio da página.');
                worker = null;
                liberarPendentes();
            };
        } catch {
            worker = null;
        }

        return {
            esperar(ms) {
                if (!worker) return new Promise((r) => setTimeout(r, ms));
                return new Promise((resolver) => {
                    const id = proximoId++;
                    pendentes.set(id, resolver);
                    worker.postMessage({ id, ms });
                });
            },
            encerrar() {
                worker?.terminate();
                worker = null;
                liberarPendentes();
            },
            get usandoWorker() {
                return Boolean(worker);
            },
        };
    })();

    const sleep = (ms) => relogio.esperar(ms);
    const $ = (seletor, raiz = document) => raiz.querySelector(seletor);
    const $$ = (seletor, raiz = document) => Array.from(raiz.querySelectorAll(seletor));
    // Busca dentro do painel: no modo PiP ele mora em outra janela, fora do document do jogo
    let painel = null;
    const meu = (id) => painel?.querySelector(`#${id}`) || document.getElementById(id);

    /** "29.936" / "1.500/un." → 29936 / 1500 */
    const numero = (texto) => parseInt(String(texto || '').replace(/\D/g, ''), 10) || 0;

    /**
     * Espera `fn` retornar um valor "truthy" (polling). Retorna null em timeout.
     * Sempre confere mais uma vez depois do prazo: se a espera atrasou (aba oculta),
     * não desiste de algo que já aconteceu.
     */
    async function aguardar(fn, timeout = 5000, intervalo = 100) {
        const fim = Date.now() + timeout;
        for (;;) {
            const valor = fn();
            if (valor) return valor;
            if (Date.now() >= fim) return null;
            await sleep(intervalo);
        }
    }

    function definirValor(el, valor, eventos = ['input', 'change']) {
        el.value = valor;
        eventos.forEach((nome) => el.dispatchEvent(new Event(nome, { bubbles: true })));
    }

    /** Lê um inteiro de um input; usa o padrão se vazio/inválido e respeita o mínimo. */
    function lerInt(id, padrao, minimo = 1) {
        const n = parseInt(meu(id).value, 10);
        return Number.isFinite(n) ? Math.max(n, minimo) : padrao;
    }

    /** Normaliza: sem acento, minúsculo, só letras/números separados por espaço. */
    function normalizarNome(texto) {
        return String(texto || '')
            .normalize('NFD')
            .replace(/[̀-ͯ]/g, '')
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, ' ')
            .trim();
    }

    /** Igual após normalizar, ou um nome contido no outro como palavras inteiras (ex.: "Pikachu Nv 150"). */
    function mesmoPokemon(a, b) {
        const x = normalizarNome(a);
        const y = normalizarNome(b);
        if (!x || !y) return false;
        return x === y || ` ${x} `.includes(` ${y} `) || ` ${y} `.includes(` ${x} `);
    }

    // =====================================================================
    // Trava: só uma automação mexe na tela por vez (market, mapa, painel /hunt, chips)
    // =====================================================================
    let filaTrava = Promise.resolve();
    function comTrava(fn) {
        const execucao = filaTrava.then(() => fn());
        filaTrava = execucao.catch(() => {});
        return execucao;
    }

    // =====================================================================
    // Ações no jogo
    // =====================================================================
    const jogo = {
        botaoHunt: () => $(SEL.botaoHunt) || $$('button').find((b) => b.textContent.includes('/hunt')),
        painelAberto: () => Boolean($(SEL.painelHunt)),

        /** Abre o painel de hunt se estiver fechado. Retorna true se FOI ESTE CÓDIGO quem abriu. */
        async abrirPainelHunt(espera = 600) {
            if (jogo.painelAberto()) return false;
            const botao = jogo.botaoHunt();
            if (!botao) return false;
            botao.click();
            await aguardar(() => jogo.painelAberto(), 3000);
            await sleep(espera);
            return true;
        },

        fecharPainelHunt() {
            $(SEL.fecharHunt)?.click();
        },

        modalAberto: () => Boolean($(SEL.fecharModal)?.offsetParent),

        /**
         * O jogo só aceita uma sessão por conta: se o jogador abriu outra aba, esta mostra
         * "Conta aberta em outro lugar" com o botão "Jogar aqui" e ignora compras e trocas.
         */
        sessaoPausada: () => $$('button').some((b) => b.offsetParent && /jogar aqui/i.test(b.textContent)),

        async fecharModal() {
            if (!jogo.modalAberto()) return;
            $(SEL.fecharModal).click();
            await sleep(300);
        },

        centroLivre() {
            const botao = $(SEL.irCentro);
            return !botao || !botao.hasAttribute('disabled');
        },

        /** Aguarda o botão "ir ao centro" ficar disponível (até 60 s). */
        aguardarCentroLivre() {
            return aguardar(() => jogo.centroLivre(), 60000, 1000);
        },
    };

    // ---- Chips de itens (bola / poção / revive) ----
    const nomeDoChip = (chip) => (chip.getAttribute('title') || '').split('—')[0].trim();

    function chipsDoTipo(tipo) {
        return $$(`${TIPOS_ITEM[tipo].opts} ${SEL.chipItem}`).map((el) => ({
            el,
            nome: nomeDoChip(el),
            on: el.classList.contains('on'),
            qtd: numero(el.querySelector('.q')?.textContent),
        }));
    }

    const chipPorNome = (tipo, nome) => chipsDoTipo(tipo).find((c) => normalizarNome(c.nome) === normalizarNome(nome));

    // =====================================================================
    // Painel (UI)
    // =====================================================================
    const ESTILO_CSS = `
        #${ID_PAINEL} { position: fixed; top: 10px; right: 10px; z-index: 99999; background: #1a1a1a; color: #fff; padding: 12px; border-radius: 10px; font: 12px sans-serif; box-shadow: 0 4px 12px rgba(0,0,0,.5); display: flex; flex-direction: column; gap: 10px; width: 250px; border: 1px solid #333; max-height: calc(100vh - 20px); box-sizing: border-box; resize: both; overflow: hidden; min-width: 220px; min-height: 60px; }
        #${ID_PAINEL} .bp-topo { font-weight: bold; display: flex; justify-content: space-between; align-items: center; gap: 6px; border-bottom: 1px solid #333; padding-bottom: 6px; color: #4ade80; cursor: move; user-select: none; touch-action: none; flex: none; }
        #${ID_PAINEL} .bp-topo-botoes { display: flex; gap: 4px; }
        #${ID_PAINEL} .bp-min { background: #333; color: #fff; border: 1px solid #555; border-radius: 4px; width: 20px; height: 20px; cursor: pointer; font-size: 10px; padding: 0; display: flex; align-items: center; justify-content: center; }
        #${ID_PAINEL} .bp-conteudo { display: flex; flex-direction: column; gap: 10px; overflow-y: auto; min-height: 0; flex: 1 1 auto; }
        #${ID_PAINEL}.bp-pip { position: static !important; width: 100% !important; height: 100vh !important; max-height: none; border-radius: 0; border: 0; resize: none; }
        #${ID_PAINEL}.bp-pip .bp-topo { cursor: default; }
        #${ID_PAINEL} .bp-espelho .caidos { position: static; width: auto; }
        #${ID_PAINEL} .bp-espelho .caidos-lista:empty::after { content: 'Nenhum pokémon caído por perto'; display: block; padding: 6px 2px; font-size: 10.5px; color: var(--sobre-mad-dim, #aaa); }
        #${ID_PAINEL} .bp-espelho-auto { border-radius: 8px; padding: 2px 10px 8px; }
        #${ID_PAINEL} .bp-espelho-auto .painel-corpo-auto { margin-top: 6px; }
        #${ID_PAINEL} .bp-secao { display: flex; flex-direction: column; gap: 4px; }
        #${ID_PAINEL} .bp-secao + .bp-secao { border-top: 1px solid #333; padding-top: 8px; }
        #${ID_PAINEL} .bp-linha { display: flex; justify-content: space-between; align-items: center; gap: 4px; }
        #${ID_PAINEL} .bp-titulo { font-weight: 500; }
        #${ID_PAINEL} .bp-rotulo { font-size: 10px; color: #888; }
        #${ID_PAINEL} .bp-toggle { background: #ef4444; color: #fff; border: none; padding: 4px 12px; border-radius: 6px; cursor: pointer; font-weight: bold; font-size: 11px; }
        #${ID_PAINEL} .bp-toggle.on { background: #22c55e; }
        #${ID_PAINEL} input[type=number], #${ID_PAINEL} select { background: #111; color: #fff; border: 1px solid #444; border-radius: 4px; padding: 3px; font-size: 11px; }
        #${ID_PAINEL} input[type=number] { width: 70px; text-align: center; }
        #${ID_PAINEL} select { flex: 1; font-size: 10px; min-width: 0; }
        #${ID_PAINEL} #select-tipo-farm { flex: none; width: 78px; font-size: 11px; }
        #${ID_PAINEL} .bp-lupa { background: #3b82f6; color: #fff; border: none; padding: 3px 6px; border-radius: 4px; cursor: pointer; font-size: 10px; }
        #${ID_PAINEL} .bp-check { cursor: pointer; display: flex; align-items: center; gap: 6px; font-size: 11px; }
        #${ID_PAINEL} .bp-aviso { background: #422006; border: 1px solid #a16207; color: #fde68a; border-radius: 6px; padding: 6px 8px; font-size: 11px; line-height: 1.4; }
        #${ID_PAINEL} .bp-aviso a { display: block; margin-top: 4px; color: #fff; background: #2563eb; border-radius: 4px; padding: 4px; text-align: center; text-decoration: none; font-weight: bold; }
        #${ID_PAINEL} [hidden] { display: none !important; }
    `;

    function campoNumero(id, rotulo, valor) {
        return `<div class="bp-linha"><span class="bp-rotulo">${rotulo}</span><input type="number" id="${id}" value="${valor}" min="1"></div>`;
    }

    function secaoAuto({ titulo, idBotao, campos }) {
        return `
            <div class="bp-secao">
                <div class="bp-linha"><span class="bp-titulo">${titulo}</span><button class="bp-toggle" id="${idBotao}">OFF</button></div>
                ${campos}
            </div>`;
    }

    const estilo = document.createElement('style');
    estilo.id = ID_ESTILO;
    estilo.textContent = ESTILO_CSS;
    document.head.appendChild(estilo);

    painel = document.createElement('div');
    painel.id = ID_PAINEL;
    painel.innerHTML = `
        <div class="bp-topo" id="painel-topo" title="Arraste para mover · canto inferior direito redimensiona">
            <span>Auto Bot Manager</span>
            <span class="bp-topo-botoes">
                <button class="bp-min" id="btn-pip" title="Abrir em janela flutuante (PiP)">⧉</button>
                <button class="bp-min" id="btn-minimizar" title="Minimizar">−</button>
            </span>
        </div>
        <div class="bp-conteudo" id="painel-conteudo">
            ${secaoAuto({
                titulo: 'Auto Hunt',
                idBotao: 'btn-auto-hunt',
                campos: `
                    <div class="bp-aviso" id="aviso-hunt" hidden>
                        O Auto Hunt precisa da extensão gratuita <b>/hunt for PokeIdle</b>.
                        <a href="${URL_EXTENSAO_HUNT}" target="_blank" rel="noopener noreferrer">Adicionar ao navegador</a>
                    </div>
                    ${campoNumero('input-tempo-hunt', 'Tempo (s):', 600)}
                    <div class="bp-linha">
                        <span class="bp-rotulo">Tipo de farm:</span>
                        <select id="select-tipo-farm">
                            <option value="xp">XP/h</option>
                            <option value="ouro">Ouro/h</option>
                            <option value="shiny">Shiny/h</option>
                        </select>
                    </div>
                    <span class="bp-rotulo">Região Alvo:</span>
                    <div class="bp-linha">
                        <select id="select-mapa-hunt"><option value="">(Automático / Melhor)</option></select>
                        <button class="bp-lupa" id="btn-carregar-mapas" title="Carregar regiões abertas no jogo">🔍</button>
                    </div>
                    <label class="bp-check"><input type="checkbox" id="chk-so-liberadas" checked> só hunts liberadas</label>
                    <label class="bp-check"><input type="checkbox" id="chk-sync-risco" checked> Sincronizar Poção (100% - Risco)</label>`,
            })}
            ${secaoAuto({
                titulo: 'Auto Potion',
                idBotao: 'btn-auto-potion',
                campos: campoNumero('input-min-potion', 'Mín Potion:', 2000) + campoNumero('input-tempo-potion', 'Tempo (s):', 300),
            })}
            ${secaoAuto({
                titulo: 'Auto Ball',
                idBotao: 'btn-auto-ball',
                campos: campoNumero('input-min-ball', 'Mín Ball:', 2000) + campoNumero('input-tempo-ball', 'Tempo (s):', 300),
            })}
            ${secaoAuto({
                titulo: 'Auto Revive',
                idBotao: 'btn-auto-revive',
                campos: campoNumero('input-min-revive', 'Mín Revive:', 100) + campoNumero('input-tempo-revive', 'Tempo (s):', 300),
            })}
            <div class="bp-secao">
                <div class="bp-linha"><span class="bp-titulo">Auto Captura</span><button class="bp-toggle" id="btn-auto-captura">OFF</button></div>
                <span class="bp-rotulo">Joga 1 bola em cada pokémon caído, com 1 s entre arremessos. A bola é a escolhida abaixo.</span>
                <div class="bp-espelho" id="espelho-caidos"></div>
            </div>
            <div class="bp-secao">
                <span class="bp-titulo">Itens (painel Auto do jogo)</span>
                <span class="bp-rotulo">O que você clicar aqui acontece no jogo. O jogo usa os itens na ordem em que foram ativados.</span>
                <div class="bp-espelho bp-espelho-auto" id="espelho-auto"></div>
            </div>
        </div>`;
    document.body.appendChild(painel);

    let minimizado = false;
    let alturaAntesDeMinimizar = '';
    meu('btn-minimizar').addEventListener('click', () => {
        minimizado = !minimizado;
        meu('painel-conteudo').style.display = minimizado ? 'none' : 'flex';
        meu('btn-minimizar').textContent = minimizado ? '+' : '−';
        // Altura definida pelo redimensionamento: some ao minimizar e volta ao expandir
        if (minimizado) {
            alturaAntesDeMinimizar = painel.style.height;
            painel.style.height = '';
        } else if (alturaAntesDeMinimizar) {
            painel.style.height = alturaAntesDeMinimizar;
        }
    });

    // =====================================================================
    // Painel: arrastar, redimensionar e janela flutuante (Picture-in-Picture)
    // =====================================================================
    const CHAVE_LAYOUT = 'pokeidleBotLayout';
    let janelaPip = null;

    function lerLayout() {
        try {
            return JSON.parse(localStorage.getItem(CHAVE_LAYOUT)) || {};
        } catch {
            return {};
        }
    }

    function salvarLayout() {
        if (janelaPip || minimizado) return;
        try {
            const r = painel.getBoundingClientRect();
            const layout = { width: Math.round(r.width) };
            if (painel.style.left) Object.assign(layout, { left: Math.round(r.left), top: Math.round(r.top) });
            if (painel.style.height) layout.height = Math.round(r.height);
            localStorage.setItem(CHAVE_LAYOUT, JSON.stringify(layout));
        } catch {
            /* sem localStorage: o painel só não lembra a posição */
        }
    }

    /** Mantém pelo menos o topo do painel dentro da janela do jogo, e a base acima da borda de baixo. */
    function posicionar(left, top) {
        const largura = painel.offsetWidth;
        const y = Math.min(Math.max(top, 0), window.innerHeight - 30);
        painel.style.left = `${Math.min(Math.max(left, 60 - largura), window.innerWidth - 60)}px`;
        painel.style.top = `${y}px`;
        painel.style.right = 'auto';
        painel.style.maxHeight = `${window.innerHeight - y - 10}px`;
    }

    function aplicarLayout(layout) {
        if (layout.width >= 220) painel.style.width = `${layout.width}px`;
        if (layout.height >= 60) painel.style.height = `${layout.height}px`;
        if (Number.isFinite(layout.left) && Number.isFinite(layout.top)) posicionar(layout.left, layout.top);
    }
    aplicarLayout(lerLayout());

    const topo = meu('painel-topo');
    topo.addEventListener('pointerdown', (e) => {
        if (janelaPip || e.button !== 0 || e.target.closest('button')) return;
        e.preventDefault();
        const r = painel.getBoundingClientRect();
        const dx = e.clientX - r.left;
        const dy = e.clientY - r.top;
        topo.setPointerCapture(e.pointerId);
        const mover = (ev) => posicionar(ev.clientX - dx, ev.clientY - dy);
        const soltar = () => {
            topo.removeEventListener('pointermove', mover);
            topo.removeEventListener('pointerup', soltar);
            topo.removeEventListener('pointercancel', soltar);
            salvarLayout();
        };
        topo.addEventListener('pointermove', mover);
        topo.addEventListener('pointerup', soltar);
        topo.addEventListener('pointercancel', soltar);
    });

    // Duplo clique no topo: volta para o canto superior direito, no tamanho padrão
    topo.addEventListener('dblclick', (e) => {
        if (janelaPip || e.target.closest('button')) return;
        painel.style.cssText = '';
        try { localStorage.removeItem(CHAVE_LAYOUT); } catch { /* ignora */ }
    });

    // Fim do redimensionamento (alça nativa do canto): salva o tamanho
    let timerLayout = null;
    const observadorTamanho = new ResizeObserver(() => {
        clearTimeout(timerLayout);
        timerLayout = setTimeout(salvarLayout, 400);
    });
    observadorTamanho.observe(painel);

    const aoRedimensionarJanela = () => {
        if (!janelaPip && painel.style.left) posicionar(parseFloat(painel.style.left), parseFloat(painel.style.top));
    };
    window.addEventListener('resize', aoRedimensionarJanela);

    /** Copia o CSS do jogo e do bot para a janela PiP (os elementos espelhados usam as classes do jogo). */
    function copiarEstilos(destino) {
        const base = destino.createElement('base');
        base.href = location.href;
        destino.head.appendChild(base);
        for (const folha of document.styleSheets) {
            if (folha.href) {
                // Arquivo externo: o link resolve os url() relativos ao próprio CSS
                const link = destino.createElement('link');
                link.rel = 'stylesheet';
                link.href = folha.href;
                destino.head.appendChild(link);
                continue;
            }
            try {
                const st = destino.createElement('style');
                st.textContent = Array.from(folha.cssRules, (r) => r.cssText).join('\n');
                destino.head.appendChild(st);
            } catch {
                /* folha inacessível: segue sem ela */
            }
        }
    }

    function voltarDoPip() {
        janelaPip = null;
        painel.classList.remove('bp-pip');
        meu('btn-pip').textContent = '⧉';
        meu('btn-pip').title = 'Abrir em janela flutuante (PiP)';
        if (encerrado) return;
        document.body.appendChild(painel);
        aplicarLayout(lerLayout());
        espelhos.forEach((e) => e.render());
    }

    meu('btn-pip').addEventListener('click', async () => {
        if (janelaPip) {
            janelaPip.close(); // dispara o pagehide, que devolve o painel
            return;
        }
        if (!('documentPictureInPicture' in window)) {
            alert('Este navegador não abre janelas flutuantes (PiP). Use o Chrome 116 ou mais novo.');
            return;
        }
        try {
            const r = painel.getBoundingClientRect();
            const pip = await window.documentPictureInPicture.requestWindow({
                width: Math.max(260, Math.round(r.width)),
                height: Math.min(Math.max(320, Math.round(r.height)), 900),
            });
            copiarEstilos(pip.document);
            pip.document.title = 'Pokeidle Bot';
            pip.document.body.style.cssText = 'margin:0;background:#1a1a1a;overflow:hidden;';
            painel.classList.add('bp-pip');
            pip.document.body.appendChild(painel);
            janelaPip = pip;
            meu('btn-pip').textContent = '⇲';
            meu('btn-pip').title = 'Voltar o painel para a tela do jogo';
            espelhos.forEach((e) => e.render()); // redesenha os canvas na nova janela
            pip.addEventListener('pagehide', voltarDoPip, { once: true });
        } catch (erro) {
            console.warn('[Bot Pokeidle] Não foi possível abrir a janela flutuante:', erro);
        }
    });

    /** alert() na janela onde o painel está (no PiP, o alert da página ficaria escondido). */
    const avisar = (texto) => (painel.ownerDocument.defaultView || window).alert(texto);

    // =====================================================================
    // Agendador: liga/desliga uma rotina periódica sem execuções sobrepostas
    // =====================================================================
    class Automacao {
        constructor({ idBotao, idTempo, tempoPadrao, executar }) {
            this.botao = meu(idBotao);
            this.idTempo = idTempo;
            this.tempoPadrao = tempoPadrao;
            this.executar = executar;
            this.ciclo = null; // objeto único de cada "ligar"; null = desligada
            this.emExecucao = false;
            this.botao.addEventListener('click', () => (this.ciclo === null ? this.ligar() : this.desligar()));
        }

        get ligada() {
            return this.ciclo !== null;
        }

        /** Laço com o relógio do worker (o setInterval da página é segurado com a aba oculta). */
        ligar() {
            const segundos = lerInt(this.idTempo, this.tempoPadrao, 5);
            const ciclo = {};
            this.ciclo = ciclo;
            this.atualizarBotao(true);
            (async () => {
                while (this.ciclo === ciclo) {
                    this.rodar();
                    await sleep(segundos * 1000);
                }
            })();
        }

        desligar() {
            this.ciclo = null;
            this.atualizarBotao(false);
        }

        atualizarBotao(ligado) {
            this.botao.classList.toggle('on', ligado);
            this.botao.textContent = ligado ? 'ON' : 'OFF';
        }

        async rodar() {
            if (this.emExecucao) return;
            // Sessão aberta em outra aba: o jogo ignoraria tudo; tenta de novo no próximo ciclo
            if (jogo.sessaoPausada()) return;
            this.emExecucao = true;
            try {
                await comTrava(() => (this.ligada && !jogo.sessaoPausada() ? this.executar() : null));
            } catch (erro) {
                console.error('[Bot Pokeidle]', erro);
            } finally {
                this.emExecucao = false;
            }
        }
    }

    // =====================================================================
    // Regiões (dropdown)
    // =====================================================================
    async function sincronizarCheckboxLiberadas() {
        const chkBot = meu('chk-so-liberadas');
        const chkJogo = $(SEL.checkboxLiberadas);
        if (chkBot && chkJogo && chkJogo.checked !== chkBot.checked) {
            chkJogo.checked = chkBot.checked;
            definirValor(chkJogo, chkJogo.checked, ['change', 'input']);
            await sleep(350);
        }
    }

    /** Preenche o select com as regiões do jogo. Retorna quantas foram adicionadas. */
    async function popularDropdownRegioes() {
        const select = meu('select-mapa-hunt');
        const selecionadoAntes = select.value;
        select.innerHTML = '<option value="">(Automático / Melhor)</option>';

        await sincronizarCheckboxLiberadas();

        if (!$(SEL.painelRegioes)) {
            jogo.botaoHunt()?.click();
            if (!(await aguardar(() => $(SEL.painelRegioes), 3000))) return 0;
        }

        let adicionados = 0;
        $$(SEL.itensRegiao).forEach((el) => {
            const regiao = el.getAttribute('data-regiao');
            if (regiao === null) return;
            const existe = Array.from(select.options).some((o) => o.value.toLowerCase() === regiao.toLowerCase());
            if (existe) return;

            const opt = document.createElement('option');
            opt.value = regiao;
            opt.textContent = regiao === '' ? '(Automático / Melhor)' : regiao.charAt(0).toUpperCase() + regiao.slice(1);
            select.appendChild(opt);
            adicionados++;
        });

        if (Array.from(select.options).some((o) => o.value === selecionadoAntes)) select.value = selecionadoAntes;
        aplicarRegraShiny();
        return adicionados;
    }

    meu('btn-carregar-mapas').addEventListener('click', async () => {
        const qtd = await comTrava(async () => {
            const abriu = await jogo.abrirPainelHunt(500);
            const adicionadas = await popularDropdownRegioes();
            if (abriu) jogo.fecharPainelHunt();
            return adicionadas;
        });
        avisar(`Varredura concluída! Regiões adicionadas: ${qtd}`);
    });

    let encerrado = false;

    // ---- O /hunt está instalado? ----
    // Ele roda no mundo da página desde o início do carregamento (cria window.__pokeidleHunt)
    // e desenha o botão "/hunt" alguns segundos depois. O resultado vai para o content.js,
    // que guarda para o popup mostrar o botão de instalar.
    (async () => {
        const instalada =
            Boolean(window.__pokeidleHunt) || Boolean(await aguardar(() => encerrado || jogo.botaoHunt(), 30000, 1000));
        if (encerrado) return;
        meu('aviso-hunt').hidden = instalada;
        enviarParaExtensao({ acao: 'botStatusHunt', instalada });
    })();

    // Carga automática das regiões: vigia até o botão /hunt existir e então preenche o dropdown

    (async () => {
        const botao = await aguardar(() => encerrado || jogo.botaoHunt(), Infinity, 1000);
        if (encerrado || !botao) return;

        // Algumas tentativas, caso o painel de regiões demore a montar
        for (let tentativa = 0; tentativa < 5 && !encerrado; tentativa++) {
            await comTrava(async () => {
                const jaAberto = jogo.painelAberto();
                await popularDropdownRegioes();
                if (!jaAberto) jogo.fecharPainelHunt();
            });
            if (meu('select-mapa-hunt')?.options.length > 1) break;
            await sleep(2000);
        }
    })();

    // =====================================================================
    // Espelhos: cópias vivas de partes da tela do jogo dentro do painel do bot
    // =====================================================================
    /**
     * Clona um elemento do jogo para dentro do painel e mantém a cópia em dia.
     * As classes do jogo são globais, então a cópia fica com a mesma aparência.
     * Todo clique na cópia é repassado ao elemento original: quem age é sempre o próprio jogo.
     */
    class Espelho {
        constructor({ origem, destino, ajustar }) {
            this.origem = origem; // função: o elemento do jogo pode ser recriado
            this.destino = destino;
            this.ajustar = ajustar;
            this.alvo = null;
            this.raiz = null;
            this.agendado = false;
            this.pausado = false;
            this.pendente = false;
            this.observador = new MutationObserver(() => this.agendar());

            // Enquanto o botão do mouse está apertado na cópia, ela não é recriada (senão o clique se perde)
            destino.addEventListener('pointerdown', () => {
                this.pausado = true;
                const doc = destino.ownerDocument;
                const soltar = () => {
                    doc.removeEventListener('pointerup', soltar, true);
                    doc.removeEventListener('pointercancel', soltar, true);
                    // Depois do click, que vem logo após o pointerup
                    setTimeout(() => {
                        this.pausado = false;
                        if (this.pendente) this.render();
                    }, 50);
                };
                doc.addEventListener('pointerup', soltar, true);
                doc.addEventListener('pointercancel', soltar, true);
            }, true);

            destino.addEventListener('click', (e) => this.repassarClique(e), true);
            destino.addEventListener('input', (e) => this.repassarValor(e, 'input'), true);
            destino.addEventListener('change', (e) => this.repassarValor(e, 'change'), true);
        }

        agendar() {
            if (this.agendado) return;
            this.agendado = true;
            queueMicrotask(() => {
                this.agendado = false;
                this.render();
            });
        }

        render() {
            if (this.pausado) {
                this.pendente = true;
                return;
            }
            this.pendente = false;
            const origem = this.origem();
            if (origem !== this.alvo) {
                this.observador.disconnect();
                this.alvo = origem;
                if (origem) this.observador.observe(origem, { subtree: true, childList: true, attributes: true, characterData: true });
            }
            if (!origem) {
                this.destino.replaceChildren();
                this.raiz = null;
                return;
            }

            const clone = origem.cloneNode(true);
            const originais = [origem, ...origem.querySelectorAll('*')];
            const copias = [clone, ...clone.querySelectorAll('*')];
            const canvas = [];
            copias.forEach((c, i) => {
                const o = originais[i];
                // Sem ids repetidos: o jogo e o próprio bot procuram elementos por id
                c.removeAttribute('id');
                c.removeAttribute('for');
                if (o.tagName === 'INPUT') {
                    c.checked = o.checked; // o estado vive na propriedade, não no atributo
                    c.value = o.value;
                } else if (o.tagName === 'IMG') {
                    c.src = o.src; // endereço completo: funciona também na janela PiP
                } else if (o.tagName === 'CANVAS') {
                    canvas.push([o, c]);
                }
            });
            this.ajustar?.(clone);
            this.raiz = clone;
            this.destino.replaceChildren(clone);
            for (const [o, c] of canvas) {
                try {
                    c.getContext('2d').drawImage(o, 0, 0);
                } catch {
                    /* canvas sem conteúdo ainda */
                }
            }
        }

        /** Elemento do jogo que corresponde ao elemento clicado na cópia. */
        correspondente(el) {
            if (!this.alvo || !this.raiz) return null;
            // Pokémon caído: identifica pelo slot (a lista muda de ordem o tempo todo)
            const comSlot = el.closest('[data-slot]');
            if (comSlot && this.raiz.contains(comSlot)) {
                const original = this.alvo.querySelector(`[data-slot="${CSS.escape(comSlot.dataset.slot)}"]`);
                if (!original) return null;
                if (comSlot === el) return original;
                return this.porCaminho(el, comSlot, original);
            }
            return this.porCaminho(el, this.raiz, this.alvo);
        }

        /** Refaz no original o caminho (índices dos filhos) do elemento na cópia; confere tag e title. */
        porCaminho(el, raizCopia, raizOriginal) {
            const caminho = [];
            for (let n = el; n && n !== raizCopia; n = n.parentElement) caminho.unshift(Array.prototype.indexOf.call(n.parentElement.children, n));
            let o = raizOriginal;
            for (const i of caminho) o = o?.children[i];
            if (o && o.tagName === el.tagName && (o.getAttribute('title') || '') === (el.getAttribute('title') || '')) return o;
            // A estrutura mudou: procura pelo mesmo title entre os elementos da mesma tag
            const titulo = el.getAttribute('title');
            if (!titulo) return null;
            return Array.from(raizOriginal.querySelectorAll(el.tagName)).find((x) => x.getAttribute('title') === titulo) || null;
        }

        repassarClique(e) {
            const el = e.target.closest('button, label, input, select');
            if (!el || !this.destino.contains(el) || el.matches('input[type="range"], select')) return;
            // A cópia não muda sozinha: o jogo age no original e a cópia acompanha
            e.preventDefault();
            e.stopPropagation();
            if (el.disabled) return;
            const original = this.correspondente(el);
            if (!original) return;
            original.click();
            this.agendar();
        }

        repassarValor(e, tipo) {
            const el = e.target;
            if (!el.matches?.('input[type="range"], select') || !this.destino.contains(el)) return;
            e.stopPropagation();
            const original = this.correspondente(el);
            if (original) {
                original.value = el.value;
                original.dispatchEvent(new Event(tipo, { bubbles: true }));
            }
            // Entre o "input" e o "change" (barra arrastada ou setas do teclado) a cópia não é
            // recriada: o "change" precisa chegar no mesmo elemento para o jogo salvar o valor
            if (tipo === 'input') {
                this.pausado = true;
            } else {
                this.pausado = false;
                this.agendar();
            }
        }

        encerrar() {
            this.observador.disconnect();
            this.destino.replaceChildren();
        }
    }

    const espelhos = [
        // "Proximidade para Capturar": lista de pokémon caídos e a bola escolhida
        new Espelho({
            origem: () => meuDoJogo('#caidos'),
            destino: meu('espelho-caidos'),
            ajustar: (clone) => clone.classList.remove('hidden', 'm-aberto'),
        }),
        // Painel "Auto" do jogo: bolas, revives, poções, barra de vida e opções
        new Espelho({
            origem: () => meuDoJogo('#auto-corpo'),
            destino: meu('espelho-auto'),
            ajustar: () => registrarAtivacoes(), // toda mudança no painel Auto passa por aqui
        }),
    ];

    /** Elemento do jogo (fora do painel do bot). */
    function meuDoJogo(seletor) {
        return $$(seletor).find((el) => !el.closest(`#${ID_PAINEL}`)) || null;
    }

    /** Fundo de madeira do painel Auto do jogo, copiado para a moldura do espelho. */
    function copiarFundoDoPainelAuto() {
        const painelJogo = meuDoJogo('#p-auto');
        if (!painelJogo) return;
        const cs = getComputedStyle(painelJogo);
        const moldura = meu('espelho-auto');
        for (const prop of ['backgroundColor', 'backgroundImage', 'backgroundSize', 'backgroundRepeat', 'backgroundPosition', 'boxShadow', 'color']) {
            moldura.style[prop] = cs[prop];
        }
    }

    // ---- Ordem de ativação dos chips (o jogo usa os itens nessa ordem) ----
    const ativadoEm = new Map(); // "tipo|nome" → quando ficou ligado
    let ordemInicial = 0;
    let primeiraLeitura = true;

    function registrarAtivacoes() {
        let viuChip = false;
        for (const tipo of Object.keys(TIPOS_ITEM)) {
            for (const chip of chipsDoTipo(tipo)) {
                viuChip = true;
                const chave = `${tipo}|${chip.nome}`;
                if (!chip.on) ativadoEm.delete(chave);
                // Já ligado na 1ª leitura: ordem da tela. Ligado depois: hora da ativação.
                else if (!ativadoEm.has(chave)) ativadoEm.set(chave, primeiraLeitura ? ordemInicial++ : Date.now());
            }
        }
        if (viuChip) primeiraLeitura = false;
    }

    // Mudanças que não aparecem no DOM (checked/value de inputs) e garantia periódica
    const aoMudarNoJogo = (e) => {
        if (e.target.closest?.(`#${ID_PAINEL}`)) return;
        espelhos.forEach((esp) => {
            if (esp.alvo?.contains(e.target)) esp.agendar();
        });
    };
    document.addEventListener('change', aoMudarNoJogo, true);
    document.addEventListener('input', aoMudarNoJogo, true);
    const timerEspelhos = setInterval(() => espelhos.forEach((esp) => esp.agendar()), 1000);

    // Quando o painel Auto do jogo existir: primeira cópia e fundo
    (async () => {
        const pronto = await aguardar(() => encerrado || meuDoJogo('#auto-corpo'), Infinity, 1000);
        if (encerrado || !pronto) return;
        copiarFundoDoPainelAuto();
        espelhos.forEach((esp) => esp.render());
    })();

    // =====================================================================
    // Auto Captura: uma bola em cada pokémon caído
    // =====================================================================
    const ESPERA_ARREMESSO = 1000; // depois de cada arremesso
    const ESPERA_LISTA = 100; // de quanto em quanto tempo olha a lista vazia
    // Cada caído recebe UM clique e nunca mais (mesma regra do script original). O registro é
    // pelo slot e também no próprio botão: se o jogo redesenhar a lista, o slot continua marcado.
    const jaArremessados = new Map(); // slot → quando recebeu a bola
    let cicloCaptura = null;

    function atualizarBotaoCaptura() {
        const botao = meu('btn-auto-captura');
        botao.classList.toggle('on', cicloCaptura !== null);
        botao.textContent = cicloCaptura !== null ? 'ON' : 'OFF';
    }

    function proximoCaido() {
        const lista = meuDoJogo('#caidos-lista');
        if (!lista) return null;
        return $$(':scope > button.caido:not([disabled]):not([data-auto-clicado])', lista).find(
            (b) => !b.dataset.slot || !jaArremessados.has(b.dataset.slot)
        );
    }

    function ligarCaptura() {
        const ciclo = {};
        cicloCaptura = ciclo;
        atualizarBotaoCaptura();
        (async () => {
            while (cicloCaptura === ciclo && !encerrado) {
                // Esquece slots de mais de 30 min (o jogo pode reaproveitar números bem depois)
                const limite = Date.now() - 30 * 60 * 1000;
                jaArremessados.forEach((quando, slot) => { if (quando < limite) jaArremessados.delete(slot); });

                const alvo = jogo.sessaoPausada() ? null : proximoCaido();
                if (!alvo) {
                    await sleep(ESPERA_LISTA);
                    continue;
                }
                const slot = alvo.dataset.slot;
                alvo.dataset.autoClicado = '1'; // nunca mais clica neste botão
                if (slot) jaArremessados.set(slot, Date.now()); // nem neste slot, mesmo se o botão for recriado
                try {
                    alvo.click();
                    const nome = alvo.querySelector('.caido-quem')?.textContent.trim();
                    console.log(`[Bot Pokeidle] Auto Captura: bola em ${nome} (slot ${slot})`);
                } catch (erro) {
                    console.warn('[Bot Pokeidle] Auto Captura:', erro);
                }
                await sleep(ESPERA_ARREMESSO);
            }
        })();
    }
    function desligarCaptura() {
        cicloCaptura = null;
        atualizarBotaoCaptura();
    }

    meu('btn-auto-captura').addEventListener('click', () => (cicloCaptura === null ? ligarCaptura() : desligarCaptura()));


    // =====================================================================
    // Auto Hunt
    // =====================================================================

    /** Risco da 1ª hunt do /hunt, lido pela coluna "Risco". ☠ (1 hit / mortes por hora) = 100. */
    function lerRiscoDaMelhorHunt() {
        const tabela = $(SEL.painelHunt);
        if (!tabela) return null;
        const colunas = $$('thead th', tabela).map((th) => normalizarNome(th.textContent));
        const indice = colunas.indexOf('risco');
        const celula = indice >= 0 ? $('tbody tr', tabela)?.children[indice] : null;
        if (!celula) return null;

        const texto = celula.textContent;
        if (texto.includes('☠')) return 100;
        const m = texto.match(/(\d+)\s*%/);
        return m ? parseInt(m[1], 10) : null;
    }

    async function sincronizarRiscoComPocao() {
        const abriu = await jogo.abrirPainelHunt();
        if (!jogo.painelAberto()) return;
        const risco = lerRiscoDaMelhorHunt();
        if (abriu) jogo.fecharPainelHunt();
        if (risco === null) return;

        // O pior golpe tira `risco`% da vida. Arredonda o risco para cima (9% → 10%) e usa a
        // poção abaixo de (100 - risco)%: no pior caso ela entra logo depois do 2º golpe, e a vida
        // nunca leva um 3º golpe sem curar. Isso só fecha a conta com risco abaixo de 50%;
        // de 50% para cima (⚠) e com ☠, a única proteção é manter a vida sempre cheia (100%).
        const riscoArredondado = Math.ceil(risco / 10) * 10;
        const valorAlvo = riscoArredondado >= 50 ? 100 : Math.max(10, Math.min(100 - riscoArredondado, 90));
        const slider = $(SEL.slider);
        if (slider && slider.value !== String(valorAlvo)) definirValor(slider, valorAlvo);
    }

    const tipoFarmEhShiny = () => meu('select-tipo-farm').value === 'shiny';

    /** Shiny/h exige região "Automático / Melhor": força o valor e trava o dropdown. */
    function aplicarRegraShiny() {
        const selectRegiao = meu('select-mapa-hunt');
        const shiny = tipoFarmEhShiny();
        if (shiny) selectRegiao.value = '';
        selectRegiao.disabled = shiny;
        selectRegiao.title = shiny ? 'Shiny/h exige a região Automático / Melhor' : '';
    }

    meu('select-tipo-farm').addEventListener('change', aplicarRegraShiny);

    /** Assinatura da tabela do /hunt, para saber quando ela terminou de mudar. */
    const assinaturaHunt = () => `${$(SEL.melhorPokemon)?.textContent}|${$(`${SEL.painelHunt} tbody tr`)?.textContent}`;

    /** Clica e espera a tabela do /hunt mudar (ou até `timeout`). */
    async function clicarEAguardarHunt(botao, timeout = 3000) {
        const antes = assinaturaHunt();
        botao.click();
        await aguardar(() => assinaturaHunt() !== antes, timeout);
        await sleep(200);
    }

    /** Seleciona no painel /hunt a ordenação escolhida (XP/h, Ouro/h ou Shiny/h). */
    async function selecionarTipoFarm() {
        const ordem = meu('select-tipo-farm').value;
        const botao = $(`${SEL.botaoOrdem}[data-ordem="${CSS.escape(ordem)}"]`);
        if (!botao || botao.classList.contains('on')) return;
        await clicarEAguardarHunt(botao);
    }

    async function obterMelhorPokemon() {
        await aguardar(() => $(SEL.melhorPokemon), 5000);
        return $(SEL.melhorPokemon)?.textContent.trim() || '';
    }

    /** Vai ao mapa, filtra pela região/pokémon e seleciona o hunt desejado. */
    async function selecionarNoMapa(pokemon, regiao) {
        const botaoMapa = $(SEL.botaoMapa);
        if (!botaoMapa) return;

        botaoMapa.click();
        await aguardar(() => $(SEL.regiaoMapa), 3000);

        const regiaoMin = regiao.toLowerCase();
        const botaoRegiao =
            $(`${SEL.regiaoMapa}[data-regiao="${CSS.escape(regiaoMin)}"]`) ||
            $$(SEL.regiaoMapa).find((b) => $(SEL.nomeRegiaoMapa, b)?.textContent.trim().toLowerCase() === regiaoMin);
        botaoRegiao?.click();
        await sleep(400);

        const busca = $(SEL.buscaMapa);
        if (!busca) return jogo.fecharModal();

        definirValor(busca, pokemon);
        await sleep(600);

        const slug = pokemon.toLowerCase().replace(/\s+/g, '_');
        const alvo =
            $(`${SEL.linhaPokemon}[data-slug="${CSS.escape(slug)}"]`) ||
            $$(SEL.linhaPokemon).find((l) => $(SEL.nomePokemon, l)?.textContent.trim().toLowerCase() === pokemon.toLowerCase());

        if (alvo) {
            alvo.click(); // o jogo fecha o mapa sozinho ao entrar na hunt
            await sleep(600);
        } else {
            console.warn('[Bot Pokeidle] Hunt não encontrada no mapa:', pokemon, regiao);
        }
        await jogo.fecharModal();
    }

    async function executarAutoHunt() {
        // 1) Antes de tudo: compara o melhor Pokémon do /hunt com a hunt atual
        const abriuPainel = await jogo.abrirPainelHunt();
        const fecharSeAbri = () => { if (abriuPainel) jogo.fecharPainelHunt(); };

        const hudAtual = $(SEL.hudHunt);
        if (!hudAtual) return fecharSeAbri();

        const pokemonAtual = hudAtual.textContent.trim().split('·')[0].trim();

        await selecionarTipoFarm();

        // Shiny/h: sempre "Automático / Melhor", independentemente do dropdown
        const regiaoDesejada = tipoFarmEhShiny() ? '' : meu('select-mapa-hunt').value;
        const botaoRegiao = $(`${SEL.painelRegioes} [data-regiao="${CSS.escape(regiaoDesejada)}"]`);
        if (botaoRegiao && !botaoRegiao.classList.contains('on')) await clicarEAguardarHunt(botaoRegiao);

        let melhor = await obterMelhorPokemon();
        if (!melhor) return fecharSeAbri();

        // Melhor hunt da região escolhida mata o pokémon (☠ 1 hit / mortes por hora):
        // ignora a região e pega a melhor de "Todas"
        if (lerRiscoDaMelhorHunt() >= 100 && regiaoDesejada !== '') {
            const botaoTodas = $(`${SEL.painelRegioes} [data-regiao=""]`);
            if (botaoTodas) {
                await clicarEAguardarHunt(botaoTodas);
                melhor = await obterMelhorPokemon();
                if (!melhor) return fecharSeAbri();
            }
        }
        // Nem em "Todas" há hunt segura: fica onde está
        if (lerRiscoDaMelhorHunt() >= 100) {
            console.warn('[Bot Pokeidle] A melhor hunt disponível mata o pokémon (☠). Auto Hunt não trocou de hunt.');
            return fecharSeAbri();
        }

        // Já está no melhor Pokémon: nada a fazer
        if (mesmoPokemon(pokemonAtual, melhor)) return fecharSeAbri();

        // Região exibida na ficha (ex.: "Outland · Nv 150")
        const regiaoAlvo = $(SEL.dimensao)?.textContent.split('·')[0].trim() || 'Outland';

        if (meu('chk-sync-risco').checked) await sincronizarRiscoComPocao();
        fecharSeAbri();

        // 2) Hunt diferente: confere o botão "ir ao centro" e aguarda ficar disponível
        //    (se já estiver no Centro Pokémon, não precisa esperar)
        const jaNoCentro = hudAtual.textContent.includes('Centro Pokemon');
        if (!jaNoCentro && !(await jogo.aguardarCentroLivre())) return;

        // 3) Trâmite para ir à melhor hunt
        const botaoCentro = $(SEL.irCentro);
        if (botaoCentro && !jaNoCentro) {
            botaoCentro.click();
            await aguardar(() => $(SEL.hudHunt)?.textContent.includes('Centro Pokemon'), 8000, 250);
            await sleep(500);
        }

        await selecionarNoMapa(melhor, regiaoAlvo);
    }

    // =====================================================================
    // Compras (Auto Potion / Auto Ball / Auto Revive)
    // =====================================================================

    /**
     * Item a repor: o 1º da ordem de uso do jogo, isto é, o item ligado há mais tempo.
     * A ordem vem das ativações vistas pelo bot; os que já estavam ligados ao abrir
     * a página contam antes, na ordem em que aparecem.
     */
    function itemParaRepor(tipo) {
        registrarAtivacoes();
        const ligados = chipsDoTipo(tipo).filter((c) => c.on && c.nome);
        ligados.sort((a, b) => ativadoEm.get(`${tipo}|${a.nome}`) - ativadoEm.get(`${tipo}|${b.nome}`));
        return ligados[0]?.nome || null;
    }

    /** Preço unitário do card ("1.500/un." → 1500). 0 se não encontrar. */
    function precoUnitario(card) {
        const el = $$('*', card).find((e) => e.children.length === 0 && /\/\s*un\.?$/i.test(e.textContent.trim()));
        return el ? numero(el.textContent) : 0;
    }

    /** Textos curtos visíveis que parecem aviso do jogo (toast, erro), para explicar uma compra que falhou. */
    function mensagensVisiveisDoJogo() {
        return $$('[class*="toast"], [class*="aviso"], [class*="notif"], [class*="erro"], [role="alert"], [role="status"]')
            .filter((el) => el.offsetParent && !el.closest(`#${ID_PAINEL}`) && el.textContent.trim().length > 0)
            .map((el) => el.textContent.trim().replace(/\s+/g, ' ').slice(0, 140))
            .slice(0, 2)
            .join(' | ');
    }

    const cardDoItem = (nome) =>
        $$(SEL.cardMarket).find((c) => normalizarNome($(SEL.nomeCardMarket, c)?.textContent) === normalizarNome(nome));

    async function abrirCategoriaMarket(categoria) {
        const abaComprar = () => $$(SEL.modoMarket).find((b) => b.offsetParent && normalizarNome(b.textContent) === 'comprar');

        if (!jogo.modalAberto() || !abaComprar()) {
            const botao = $(SEL.botaoMarket);
            if (!botao) return false;
            botao.click();
            if (!(await aguardar(() => abaComprar(), 3000))) return false;
        }
        // O market reabre na última aba usada: se o jogador usou "Vender", volta para "Comprar"
        const comprar = abaComprar();
        if (!comprar.classList.contains('on')) comprar.click();
        if (!(await aguardar(() => $(SEL.categoriaMarket)?.offsetParent, 3000))) return false;

        const aba = $$(SEL.categoriaMarket).find((c) => normalizarNome(c.textContent).startsWith(categoria));
        if (!aba) return false;
        aba.click();
        await sleep(500);
        return true;
    }

    async function reporItem(tipo) {
        const cfg = TIPOS_ITEM[tipo];
        const nome = itemParaRepor(tipo);
        if (!nome) return;

        const minimo = lerInt(cfg.idMin, cfg.minPadrao, 0);
        const qtdAtual = () => chipPorNome(tipo, nome)?.qtd ?? 0;
        if (qtdAtual() >= minimo) return;

        if (!(await abrirCategoriaMarket(cfg.categoria))) return jogo.fecharModal();

        try {
            // Em lotes: o campo de quantidade aceita no máximo 9999 por compra
            for (let lote = 0; lote < 20; lote++) {
                const atual = qtdAtual();
                const faltante = minimo - atual;
                if (faltante <= 0) break;

                const card = cardDoItem(nome);
                if (!card) {
                    console.warn('[Bot Pokeidle] Item não encontrado no market:', nome);
                    break;
                }

                const preco = precoUnitario(card);
                const ouro = numero($(SEL.ouro)?.textContent);
                const podePagar = preco > 0 && ouro > 0 ? Math.floor(ouro / preco) : faltante;
                const quantidade = Math.min(faltante, MAX_POR_COMPRA, podePagar);
                if (quantidade <= 0) {
                    console.warn('[Bot Pokeidle] Ouro insuficiente para comprar', nome);
                    break;
                }

                const input = card.querySelector('input[type="number"]');
                if (input) {
                    input.focus();
                    definirValor(input, quantidade);
                }
                await sleep(300);
                card.querySelector(SEL.comprarMarket)?.click();

                // O "você tem" do market não atualiza: a confirmação vem da quantidade no chip
                if (!(await aguardar(() => qtdAtual() > atual, 6000, 200))) {
                    if (jogo.sessaoPausada()) break; // outra aba assumiu a sessão no meio da compra
                    const mensagem = mensagensVisiveisDoJogo();
                    console.warn(
                        `[Bot Pokeidle] Compra não confirmada: ${quantidade}x ${nome} (estoque ${atual}, mínimo ${minimo}).` +
                        (mensagem ? ` Mensagem do jogo: "${mensagem}"` : ' O jogo não mostrou mensagem.')
                    );
                    break;
                }
            }
        } finally {
            await jogo.fecharModal();
        }
    }

    // =====================================================================
    // Automações
    // =====================================================================
    const automacoes = [
        new Automacao({ idBotao: 'btn-auto-hunt', idTempo: 'input-tempo-hunt', tempoPadrao: 600, executar: executarAutoHunt }),
        new Automacao({ idBotao: 'btn-auto-potion', idTempo: 'input-tempo-potion', tempoPadrao: 300, executar: () => reporItem('potion') }),
        new Automacao({ idBotao: 'btn-auto-ball', idTempo: 'input-tempo-ball', tempoPadrao: 300, executar: () => reporItem('ball') }),
        new Automacao({ idBotao: 'btn-auto-revive', idTempo: 'input-tempo-revive', tempoPadrao: 300, executar: () => reporItem('revive') }),
    ];

    // =====================================================================
    // Configurações persistentes (via content.js -> chrome.storage.local)
    // =====================================================================
    const CAMPOS_CONFIG = {
        tempoHunt: 'input-tempo-hunt',
        tempoPotion: 'input-tempo-potion',
        tempoBall: 'input-tempo-ball',
        tempoRevive: 'input-tempo-revive',
        minPotion: 'input-min-potion',
        minBall: 'input-min-ball',
        minRevive: 'input-min-revive',
    };
    let timerSalvar = null;

    function enviarParaExtensao(mensagem) {
        window.postMessage(mensagem, window.location.origin);
    }

    function aplicarConfig(config) {
        if (!config) return;
        const selectFarm = meu('select-tipo-farm');
        if (Array.from(selectFarm.options).some((o) => o.value === config.tipoFarm)) selectFarm.value = config.tipoFarm;
        aplicarRegraShiny();
        for (const [campo, idInput] of Object.entries(CAMPOS_CONFIG)) {
            if (Number.isFinite(config[campo])) meu(idInput).value = config[campo];
        }
    }

    function salvarConfig() {
        const config = {};
        for (const [campo, idInput] of Object.entries(CAMPOS_CONFIG)) {
            const n = parseInt(meu(idInput).value, 10);
            if (Number.isFinite(n)) config[campo] = n;
        }
        config.tipoFarm = meu('select-tipo-farm').value;
        enviarParaExtensao({ acao: 'botSalvarConfig', config });
    }

    // Salva 0,5 s depois da última digitação...
    painel.addEventListener('input', (e) => {
        if (!e.target.matches('input[type=number], #select-tipo-farm')) return;
        clearTimeout(timerSalvar);
        timerSalvar = setTimeout(salvarConfig, 500);
    });

    // ...e na hora ao sair do campo / apertar Enter (evita perder o valor se der F5 logo em seguida)
    painel.addEventListener('change', (e) => {
        if (!e.target.matches('input[type=number], #select-tipo-farm')) return;
        clearTimeout(timerSalvar);
        salvarConfig();
    });

    // =====================================================================
    // Encerramento (acionado pelo content.js quando a licença deixa de valer)
    // =====================================================================
    function destruir() {
        encerrado = true;
        clearTimeout(timerSalvar);
        automacoes.forEach((a) => a.desligar());
        desligarCaptura();
        relogio.encerrar();
        clearInterval(timerEspelhos);
        espelhos.forEach((esp) => esp.encerrar());
        observadorTamanho.disconnect();
        window.removeEventListener('message', aoReceberMensagem);
        window.removeEventListener('resize', aoRedimensionarJanela);
        document.removeEventListener('change', aoMudarNoJogo, true);
        document.removeEventListener('input', aoMudarNoJogo, true);
        janelaPip?.close();
        painel.remove();
        document.getElementById(ID_ESTILO)?.remove();
        delete window.__pokeidleBotDestruir;
    }

    function aoReceberMensagem(evento) {
        if (evento.source !== window || !evento.data) return;
        if (evento.data.acao === 'destruirBotMaster') destruir();
        else if (evento.data.acao === 'botConfig') aplicarConfig(evento.data.config);
    }

    window.addEventListener('message', aoReceberMensagem);
    window.__pokeidleBotDestruir = destruir;

    // Pede ao content.js as configurações salvas
    enviarParaExtensao({ acao: 'botCarregarConfig' });
})();
