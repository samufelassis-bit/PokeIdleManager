// bot.js — executa no contexto da página do Pokeidle (injetado pelo content.js)
(function () {
    'use strict';

    const ID_PAINEL = 'bot-controle-triplo';
    const ID_ESTILO = 'bot-controle-estilo';

    // Se houver uma instância anterior, encerra antes de iniciar outra
    if (typeof window.__pokeidleBotDestruir === 'function') window.__pokeidleBotDestruir();

    // =====================================================================
    // Seletores do jogo (centralizados: se o site mudar, ajuste só aqui)
    // =====================================================================
    const SEL = {
        botaoHunt: 'button.pih-btn.pih-barra',
        painelHunt: '.pih-tab',
        painelRegioes: '.pih-regioes',
        painelRegioesBotoes: 'body > div.pih-painel > div.pih-regioes',
        itensRegiao: '.pih-regioes [data-regiao]',
        checkboxLiberadas: 'body > div.pih-painel > div.pih-ctrl > label > input[type=checkbox]',
        fecharHunt: 'button.pih-fechar[data-acao="fechar"]',
        botaoOrdem: '.pih-seg button[data-ordem]',
        melhorPokemon: '.pih-top .pih-hunt b',
        dimensao: '.pih-dim',
        celulasRisco: '.pih-tab tr td',
        slider: 'input[type="range"][name="potion"], input[type="range"]',
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
    };

    // =====================================================================
    // Utilidades
    // =====================================================================
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    const $ = (seletor, raiz = document) => raiz.querySelector(seletor);
    const $$ = (seletor, raiz = document) => Array.from(raiz.querySelectorAll(seletor));
    const meu = (id) => document.getElementById(id);

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

    // =====================================================================
    // Ações no jogo
    // =====================================================================
    const jogo = {
        botaoHunt: () => $(SEL.botaoHunt) || $$('button').find((b) => b.textContent.includes('/hunt')),
        painelAberto: () => Boolean($(SEL.painelHunt)),

        /** Abre o painel de hunt se estiver fechado. Retorna true se FOI ESTE CÓDIGO quem abriu. */
        async abrirPainelHunt(espera = 400) {
            if (jogo.painelAberto()) return false;
            const botao = jogo.botaoHunt();
            if (!botao) return false;
            botao.click();
            await sleep(espera);
            return true;
        },

        fecharPainelHunt() {
            $(SEL.fecharHunt)?.click();
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

    // =====================================================================
    // Painel (UI)
    // =====================================================================
    const ESTILO_CSS = `
        #${ID_PAINEL} { position: fixed; top: 10px; right: 10px; z-index: 99999; background: #1a1a1a; color: #fff; padding: 12px; border-radius: 10px; font: 12px sans-serif; box-shadow: 0 4px 12px rgba(0,0,0,.5); display: flex; flex-direction: column; gap: 10px; width: 240px; border: 1px solid #333; }
        #${ID_PAINEL} .bp-topo { font-weight: bold; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #333; padding-bottom: 6px; color: #4ade80; }
        #${ID_PAINEL} .bp-min { background: #333; color: #fff; border: 1px solid #555; border-radius: 4px; width: 20px; height: 20px; cursor: pointer; font-size: 10px; padding: 0; display: flex; align-items: center; justify-content: center; }
        #${ID_PAINEL} .bp-conteudo { display: flex; flex-direction: column; gap: 10px; }
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
                await this.executar();
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
        const abriu = await jogo.abrirPainelHunt(500);
        const qtd = await popularDropdownRegioes();
        alert(`Varredura concluída! Regiões adicionadas: ${qtd}`);
        if (abriu) jogo.fecharPainelHunt();
    });

    // Carga automática das regiões: vigia até o botão /hunt existir e então preenche o dropdown
    let encerrado = false;

    (async () => {
        const botao = await aguardar(() => encerrado || jogo.botaoHunt(), Infinity, 1000);
        if (encerrado || !botao) return;

        // Algumas tentativas, caso o painel de regiões demore a montar
        for (let tentativa = 0; tentativa < 5 && !encerrado; tentativa++) {
            const jaAberto = jogo.painelAberto();
            await popularDropdownRegioes();
            if (!jaAberto) jogo.fecharPainelHunt();
            if (meu('select-mapa-hunt')?.options.length > 1) break;
            await sleep(2000);
        }
    })();

    // =====================================================================
    // Auto Hunt
    // =====================================================================
    async function sincronizarRiscoComPocao() {
        const abriu = await jogo.abrirPainelHunt();
        if (!jogo.painelAberto()) return;

        let risco = null;
        for (const celula of $$(SEL.celulasRisco)) {
            const m = celula.textContent.trim().match(/(\d+)%/);
            if (m) {
                risco = parseInt(m[1], 10);
                break;
            }
        }

        if (abriu) jogo.fecharPainelHunt();
        if (risco === null) return;

        const arredondado = Math.ceil(risco / 10) * 10;
        const valorAlvo = Math.max(10, Math.min(100 - arredondado, 90));
        const slider = $(SEL.slider);
        if (slider) definirValor(slider, valorAlvo);
    }

    /** Normaliza: sem acento, minúsculo, só letras/números separados por espaço. */
    function normalizarNome(texto) {
        return String(texto)
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
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

    /** Seleciona no painel /hunt a ordenação escolhida (XP/h, Ouro/h ou Shiny/h). */
    async function selecionarTipoFarm() {
        const ordem = meu('select-tipo-farm').value;
        const botao = $(`${SEL.botaoOrdem}[data-ordem="${CSS.escape(ordem)}"]`);
        if (!botao || botao.classList.contains('on')) return;
        botao.click();
        await sleep(400); // aguarda a tabela reordenar
    }

    async function obterMelhorPokemon() {
        await sleep(3000); // aguarda o jogo recalcular a ficha
        return $(SEL.melhorPokemon)?.textContent.trim() || '';
    }

    /** Vai ao mapa, filtra pela região/pokémon e seleciona o hunt desejado. */
    async function selecionarNoMapa(pokemon, regiao) {
        const botaoMapa = $(SEL.botaoMapa);
        if (!botaoMapa) return;

        botaoMapa.click();
        await sleep(400);

        $$(SEL.regiaoMapa)
            .filter((b) => $(SEL.nomeRegiaoMapa, b)?.textContent.trim().toLowerCase() === regiao.toLowerCase())
            .forEach((b) => b.click());
        await sleep(400);

        const busca = $(SEL.buscaMapa);
        if (!busca) return;

        definirValor(busca, pokemon);
        await sleep(600);

        const slug = pokemon.toLowerCase().replace(/\s+/g, '_');
        const alvo =
            $(`${SEL.linhaPokemon}[data-slug="${CSS.escape(slug)}"]`) ||
            $$(SEL.linhaPokemon).find((l) => $(SEL.nomePokemon, l)?.textContent.trim().toLowerCase() === pokemon.toLowerCase());

        if (alvo) {
            alvo.click();
            await sleep(400);
            $(SEL.fecharHunt)?.click();
        }
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
        const botaoRegiao = $(`${SEL.painelRegioesBotoes} button[data-regiao="${CSS.escape(regiaoDesejada)}"]`);
        if (botaoRegiao) {
            botaoRegiao.click();
            await sleep(400); // aguarda a interface atualizar antes de ler o melhor Pokémon
        }

        const melhor = await obterMelhorPokemon();
        if (!melhor) return fecharSeAbri();

        // Já está no melhor Pokémon: nada a fazer
        if (mesmoPokemon(pokemonAtual, melhor)) return fecharSeAbri();

        // Região exibida na ficha (ex.: "Outland · Nv 150")
        const regiaoAlvo = $(SEL.dimensao)?.textContent.split('·')[0].trim() || 'Outland';

        if (meu('chk-sync-risco').checked) await sincronizarRiscoComPocao();

        // 2) Hunt diferente: confere o botão "ir ao centro" e aguarda ficar disponível
        //    (se já estiver no Centro Pokémon, não precisa esperar)
        const jaNoCentro = hudAtual.textContent.includes('Centro Pokemon');
        if (!jaNoCentro && !(await jogo.aguardarCentroLivre())) return fecharSeAbri();

        // 3) Trâmite para ir à melhor hunt
        const botaoCentro = $(SEL.irCentro);
        if (botaoCentro) {
            botaoCentro.click();
            await sleep(5000); // pausa após ir ao centro
        }

        await selecionarNoMapa(melhor, regiaoAlvo);
    }

    // =====================================================================
    // Compras (Auto Potion / Auto Ball)
    // =====================================================================
    const filaDeCompras = [];
    let processandoFila = false;

    /** Lê, nos chips do auto-item, o item ligado ('on') e a quantidade atual. */
    function lerItemAtivo(seletorOpts) {
        const chip = $$(`${seletorOpts} ${SEL.chipItem}`).find((c) => c.classList.contains('on'));
        const qtdSpan = chip?.querySelector('.q');
        if (!chip || !qtdSpan) return null;

        return {
            nome: (chip.getAttribute('title') || '').split(/—|-/)[0].trim(),
            quantidade: parseInt(qtdSpan.textContent.trim().replace(/\./g, ''), 10) || 0,
        };
    }

    function enfileirarCompra({ seletorOpts, idMin, indiceCategoria, nomeAuto }) {
        const item = lerItemAtivo(seletorOpts);
        const minimo = lerInt(idMin, 1000, 0);

        if (!item || !item.nome || item.quantidade >= minimo) return;
        if (filaDeCompras.some((t) => t.nomeAuto === nomeAuto)) return;

        filaDeCompras.push({ itemAlvoNome: item.nome, quantidadeFaltante: minimo - item.quantidade, indiceCategoria, nomeAuto });
        processarFila();
    }

    async function comprar(tarefa, haMaisNaFila) {
        const botaoMarket = $(SEL.botaoMarket);
        if (!botaoMarket) return;

        botaoMarket.click();
        await sleep(500);

        const categorias = $$(SEL.categoriaMarket);
        if (categorias.length > tarefa.indiceCategoria) categorias[tarefa.indiceCategoria].click();
        await sleep(500);

        const card = $$(SEL.cardMarket).find(
            (c) => $(SEL.nomeCardMarket, c)?.textContent.trim().toLowerCase() === tarefa.itemAlvoNome.toLowerCase()
        );

        if (card) {
            const inputQtd = card.querySelector('input[type="number"]');
            if (inputQtd) {
                inputQtd.focus();
                definirValor(inputQtd, tarefa.quantidadeFaltante);
            }
            await sleep(400);
            card.querySelector(SEL.comprarMarket)?.click();
            await sleep(500);
        }

        if (!haMaisNaFila) $(SEL.fecharModal)?.click();
    }

    async function processarFila() {
        if (processandoFila) return;
        processandoFila = true;
        try {
            while (filaDeCompras.length > 0) {
                const tarefa = filaDeCompras.shift();
                try {
                    await comprar(tarefa, filaDeCompras.length > 0);
                } catch (erro) {
                    console.error('[Bot Pokeidle] Falha na compra:', erro);
                }
            }
        } finally {
            processandoFila = false;
        }
    }

    // =====================================================================
    // Automações
    // =====================================================================
    const configPotion = { seletorOpts: '#auto-potion-opts', idMin: 'input-min-potion', indiceCategoria: 1, nomeAuto: 'Auto Potion' };
    const configBall = { seletorOpts: '#auto-ball-opts', idMin: 'input-min-ball', indiceCategoria: 0, nomeAuto: 'Auto Ball' };

    const automacoes = [
        new Automacao({ idBotao: 'btn-auto-hunt', idTempo: 'input-tempo-hunt', tempoPadrao: 600, executar: executarAutoHunt }),
        new Automacao({ idBotao: 'btn-auto-potion', idTempo: 'input-tempo-potion', tempoPadrao: 300, executar: async () => enfileirarCompra(configPotion) }),
        new Automacao({ idBotao: 'btn-auto-ball', idTempo: 'input-tempo-ball', tempoPadrao: 300, executar: async () => enfileirarCompra(configBall) }),
    ];

    // =====================================================================
    // Configurações persistentes (via content.js -> chrome.storage.local)
    // =====================================================================
    const CAMPOS_CONFIG = {
        tempoHunt: 'input-tempo-hunt',
        tempoPotion: 'input-tempo-potion',
        tempoBall: 'input-tempo-ball',
        minPotion: 'input-min-potion',
        minBall: 'input-min-ball',
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
        filaDeCompras.length = 0;
        window.removeEventListener('message', aoReceberMensagem);
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