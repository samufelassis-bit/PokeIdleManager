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

    // =====================================================================
    // Utilidades
    // =====================================================================
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    const $ = (seletor, raiz = document) => raiz.querySelector(seletor);
    const $$ = (seletor, raiz = document) => Array.from(raiz.querySelectorAll(seletor));
    const meu = (id) => document.getElementById(id);

    /** "29.936" / "1.500/un." → 29936 / 1500 */
    const numero = (texto) => parseInt(String(texto || '').replace(/\D/g, ''), 10) || 0;

    /** Espera `fn` retornar um valor "truthy" (polling). Retorna null em timeout. */
    async function aguardar(fn, timeout = 5000, intervalo = 100) {
        const fim = Date.now() + timeout;
        while (Date.now() < fim) {
            const valor = fn();
            if (valor) return valor;
            await sleep(intervalo);
        }
        return null;
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
        #${ID_PAINEL} { position: fixed; top: 10px; right: 10px; z-index: 99999; background: #1a1a1a; color: #fff; padding: 12px; border-radius: 10px; font: 12px sans-serif; box-shadow: 0 4px 12px rgba(0,0,0,.5); display: flex; flex-direction: column; gap: 10px; width: 250px; border: 1px solid #333; max-height: calc(100vh - 20px); box-sizing: border-box; }
        #${ID_PAINEL} .bp-topo { font-weight: bold; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #333; padding-bottom: 6px; color: #4ade80; }
        #${ID_PAINEL} .bp-min { background: #333; color: #fff; border: 1px solid #555; border-radius: 4px; width: 20px; height: 20px; cursor: pointer; font-size: 10px; padding: 0; display: flex; align-items: center; justify-content: center; }
        #${ID_PAINEL} .bp-conteudo { display: flex; flex-direction: column; gap: 10px; overflow-y: auto; min-height: 0; }
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
        #${ID_PAINEL} .bp-ordem .bp-rotulo { flex: none; width: 40px; }
        #${ID_PAINEL} .bp-lupa { background: #3b82f6; color: #fff; border: none; padding: 3px 6px; border-radius: 4px; cursor: pointer; font-size: 10px; }
        #${ID_PAINEL} .bp-check { cursor: pointer; display: flex; align-items: center; gap: 6px; font-size: 11px; }
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

    function linhaOrdem(tipo) {
        return `
            <div class="bp-linha bp-ordem">
                <span class="bp-rotulo">${TIPOS_ITEM[tipo].rotulo}</span>
                <select id="ordem-${tipo}-1" data-tipo="${tipo}" title="1º a ser usado"><option value="">(não mexer)</option></select>
                <select id="ordem-${tipo}-2" data-tipo="${tipo}" title="Usado quando o 1º acabar"><option value="">(nenhum)</option></select>
            </div>`;
    }

    const estilo = document.createElement('style');
    estilo.id = ID_ESTILO;
    estilo.textContent = ESTILO_CSS;
    document.head.appendChild(estilo);

    const painel = document.createElement('div');
    painel.id = ID_PAINEL;
    painel.innerHTML = `
        <div class="bp-topo"><span>Auto Bot Manager</span><button class="bp-min" id="btn-minimizar">−</button></div>
        <div class="bp-conteudo" id="painel-conteudo">
            ${secaoAuto({
                titulo: 'Auto Hunt',
                idBotao: 'btn-auto-hunt',
                campos: `
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
                <span class="bp-titulo">Itens (ordem de uso)</span>
                <span class="bp-rotulo">O jogo usa o 1º até acabar e depois o 2º. A compra repõe o 1º.</span>
                ${linhaOrdem('ball')}
                ${linhaOrdem('potion')}
                ${linhaOrdem('revive')}
                <label class="bp-check"><input type="checkbox" id="chk-usar-revive" disabled> Usar Revive ao desmaiar</label>
                <label class="bp-check"><input type="checkbox" id="chk-voltar-hunt" disabled> Voltar à hunt ao morrer/reset</label>
            </div>
        </div>`;
    document.body.appendChild(painel);

    let minimizado = false;
    meu('btn-minimizar').addEventListener('click', () => {
        minimizado = !minimizado;
        meu('painel-conteudo').style.display = minimizado ? 'none' : 'flex';
        meu('btn-minimizar').textContent = minimizado ? '+' : '−';
    });

    // =====================================================================
    // Agendador: liga/desliga uma rotina periódica sem execuções sobrepostas
    // =====================================================================
    class Automacao {
        constructor({ idBotao, idTempo, tempoPadrao, executar }) {
            this.botao = meu(idBotao);
            this.idTempo = idTempo;
            this.tempoPadrao = tempoPadrao;
            this.executar = executar;
            this.timer = null;
            this.emExecucao = false;
            this.botao.addEventListener('click', () => (this.timer === null ? this.ligar() : this.desligar()));
        }

        ligar() {
            const segundos = lerInt(this.idTempo, this.tempoPadrao, 5);
            this.timer = setInterval(() => this.rodar(), segundos * 1000);
            this.atualizarBotao(true);
            this.rodar();
        }

        desligar() {
            clearInterval(this.timer);
            this.timer = null;
            this.atualizarBotao(false);
        }

        atualizarBotao(ligado) {
            this.botao.classList.toggle('on', ligado);
            this.botao.textContent = ligado ? 'ON' : 'OFF';
        }

        async rodar() {
            if (this.emExecucao) return;
            this.emExecucao = true;
            try {
                await comTrava(() => (this.timer === null ? null : this.executar()));
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
        alert(`Varredura concluída! Regiões adicionadas: ${qtd}`);
    });

    // Carga automática das regiões: vigia até o botão /hunt existir e então preenche o dropdown
    let encerrado = false;

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
    // Itens: ordem de uso (1º / 2º) e opções do jogo espelhadas no painel
    // =====================================================================
    let ordemSalva = null; // vinda do chrome.storage; pode chegar antes ou depois dos chips existirem
    let opcoesProntas = false;

    function preencherSelect(select, nomes, valor) {
        const primeira = select.options[0];
        select.replaceChildren(primeira);
        nomes.forEach((nome) => {
            const opt = document.createElement('option');
            opt.value = nome;
            opt.textContent = nome;
            select.appendChild(opt);
        });
        select.value = nomes.includes(valor) ? valor : '';
    }

    /** Gera as opções de cada tipo a partir dos chips que o jogo mostra. */
    function popularOpcoesItens() {
        for (const tipo of Object.keys(TIPOS_ITEM)) {
            const nomes = chipsDoTipo(tipo).map((c) => c.nome).filter(Boolean);
            const [v1 = '', v2 = ''] = ordemSalva?.[tipo] || [];
            preencherSelect(meu(`ordem-${tipo}-1`), nomes, v1);
            preencherSelect(meu(`ordem-${tipo}-2`), nomes, v2);
        }
        opcoesProntas = true;
    }

    /** Itens escolhidos no painel, na ordem (sem repetição). Vazio = o bot não mexe nesse tipo. */
    function ordemEscolhida(tipo) {
        const primeiro = meu(`ordem-${tipo}-1`).value;
        const segundo = meu(`ordem-${tipo}-2`).value;
        if (!primeiro) return [];
        return segundo && segundo !== primeiro ? [primeiro, segundo] : [primeiro];
    }

    /** Liga/desliga um chip e espera o jogo refletir. */
    async function alternarChip(tipo, nome, ligar) {
        const chip = chipPorNome(tipo, nome);
        if (!chip || chip.on === ligar) return Boolean(chip);
        chip.el.click();
        const ok = await aguardar(() => chipPorNome(tipo, nome)?.on === ligar, 2500);
        await sleep(300);
        return Boolean(ok);
    }

    /**
     * Deixa marcados no jogo só os itens escolhidos, ativando-os na ordem escolhida:
     * o jogo usa os itens na ordem em que foram ativados.
     * Nunca deixa o tipo sem nenhum item marcado: com zero marcados o servidor responde
     * atrasado e desfaz o clique seguinte (visto em teste ao vivo).
     * Sem `forcar`, só mexe se os itens marcados forem diferentes dos escolhidos.
     */
    async function aplicarOrdem(tipo, forcar = false) {
        const ordem = ordemEscolhida(tipo);
        if (!ordem.length || !chipsDoTipo(tipo).length) return;

        const desejados = ordem.map(normalizarNome);
        const ligados = chipsDoTipo(tipo).filter((c) => c.on).map((c) => normalizarNome(c.nome));
        const mesmos = ligados.length === desejados.length && desejados.every((n) => ligados.includes(n));
        if (mesmos && !forcar) return;

        const [primeiro, segundo] = ordem;
        // 1) Garante o 1º ligado
        if (!(await alternarChip(tipo, primeiro, true))) return;
        // 2) Desliga o que não foi escolhido (o 1º continua ligado)
        for (const chip of chipsDoTipo(tipo)) {
            if (chip.on && !desejados.includes(normalizarNome(chip.nome))) await alternarChip(tipo, chip.nome, false);
        }
        // 3) Religa o 2º para que ele fique depois do 1º na ordem de ativação
        if (segundo) {
            await alternarChip(tipo, segundo, false);
            await alternarChip(tipo, segundo, true);
        }
    }

    async function sincronizarOrdens() {
        for (const tipo of Object.keys(TIPOS_ITEM)) await aplicarOrdem(tipo);
    }

    painel.addEventListener('change', (e) => {
        const tipo = e.target.matches('select[data-tipo]') ? e.target.dataset.tipo : null;
        if (!tipo) return;
        salvarConfig();
        comTrava(() => aplicarOrdem(tipo, true));
    });

    // ---- "Usar Revive" e "Voltar à hunt": espelho das opções do jogo ----
    const ESPELHOS = [
        { idBot: 'chk-usar-revive', seletorJogo: SEL.usarRevive },
        { idBot: 'chk-voltar-hunt', seletorJogo: SEL.voltarHunt },
    ];

    function sincronizarCheckboxesDoJogo() {
        for (const { idBot, seletorJogo } of ESPELHOS) {
            const jogoChk = $(seletorJogo);
            const botChk = meu(idBot);
            botChk.disabled = !jogoChk;
            if (jogoChk) botChk.checked = jogoChk.checked;
        }
    }

    for (const { idBot, seletorJogo } of ESPELHOS) {
        meu(idBot).addEventListener('change', (e) => {
            const jogoChk = $(seletorJogo);
            // click() dispara os eventos do próprio jogo (é ele quem salva a opção)
            if (jogoChk && jogoChk.checked !== e.target.checked) jogoChk.click();
            setTimeout(sincronizarCheckboxesDoJogo, 500);
        });
    }

    // Mudou no painel do jogo → atualiza o painel do bot
    function aoMudarNoJogo(e) {
        if (ESPELHOS.some(({ seletorJogo }) => e.target.matches?.(seletorJogo))) sincronizarCheckboxesDoJogo();
    }
    document.addEventListener('change', aoMudarNoJogo, true);

    // Quando os chips do jogo aparecerem: gera as opções, espelha as caixas e aplica a ordem salva
    (async () => {
        const pronto = await aguardar(() => encerrado || $(`${TIPOS_ITEM.ball.opts} ${SEL.chipItem}`), Infinity, 1000);
        if (encerrado || !pronto) return;
        popularOpcoesItens();
        sincronizarCheckboxesDoJogo();
        comTrava(sincronizarOrdens);
    })();

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

    /** Item a repor: o 1º da ordem do painel; sem ordem, o 1º marcado no jogo. */
    function itemParaRepor(tipo) {
        const [primeiro] = ordemEscolhida(tipo);
        if (primeiro) return primeiro;
        return chipsDoTipo(tipo).find((c) => c.on)?.nome || null;
    }

    /** Preço unitário do card ("1.500/un." → 1500). 0 se não encontrar. */
    function precoUnitario(card) {
        const el = $$('*', card).find((e) => e.children.length === 0 && /\/\s*un\.?$/i.test(e.textContent.trim()));
        return el ? numero(el.textContent) : 0;
    }

    const cardDoItem = (nome) =>
        $$(SEL.cardMarket).find((c) => normalizarNome($(SEL.nomeCardMarket, c)?.textContent) === normalizarNome(nome));

    async function abrirCategoriaMarket(categoria) {
        if (!$(SEL.categoriaMarket)?.offsetParent) {
            const botao = $(SEL.botaoMarket);
            if (!botao) return false;
            botao.click();
            if (!(await aguardar(() => $(SEL.categoriaMarket)?.offsetParent, 3000))) return false;
        }
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
                if (!(await aguardar(() => qtdAtual() > atual, 4000, 200))) {
                    console.warn('[Bot Pokeidle] Compra não confirmada:', nome, quantidade);
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
        if (config.ordem) {
            ordemSalva = config.ordem;
            if (opcoesProntas) {
                popularOpcoesItens();
                comTrava(sincronizarOrdens);
            }
        }
    }

    function salvarConfig() {
        const config = {};
        for (const [campo, idInput] of Object.entries(CAMPOS_CONFIG)) {
            const n = parseInt(meu(idInput).value, 10);
            if (Number.isFinite(n)) config[campo] = n;
        }
        config.tipoFarm = meu('select-tipo-farm').value;
        if (opcoesProntas) {
            config.ordem = Object.fromEntries(
                Object.keys(TIPOS_ITEM).map((tipo) => [tipo, [meu(`ordem-${tipo}-1`).value, meu(`ordem-${tipo}-2`).value]])
            );
            ordemSalva = config.ordem;
        } else if (ordemSalva) {
            config.ordem = ordemSalva;
        }
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
        window.removeEventListener('message', aoReceberMensagem);
        document.removeEventListener('change', aoMudarNoJogo, true);
        document.getElementById(ID_PAINEL)?.remove();
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
