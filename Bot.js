// bot.js completo, corrigido e otimizado
(function() {
    const antigo = document.getElementById('bot-controle-triplo');
    if (antigo) antigo.remove();

    if (window.botIntervalos) {
        clearInterval(window.botIntervalos.hunt);
        clearInterval(window.botIntervalos.potion);
        clearInterval(window.botIntervalos.ball);
    }

    const painelControle = document.createElement('div');
    painelControle.innerHTML = `
        <div id="bot-controle-triplo" style="position: fixed; top: 10px; right: 10px; z-index: 99999; background: #1a1a1a; color: #fff; padding: 12px; border-radius: 10px; font-family: sans-serif; box-shadow: 0 4px 12px rgba(0,0,0,0.5); font-size: 12px; display: flex; flex-direction: column; gap: 10px; width: 240px; border: 1px solid #333;">
            <div style="font-weight: bold; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #333; padding-bottom: 6px; color: #4ade80;">
                <span>Auto Bot Manager</span>
                <button id="btn-minimizar" style="background: #333; color: #fff; border: 1px solid #555; border-radius: 4px; width: 20px; height: 20px; cursor: pointer; font-size: 10px; display: flex; align-items: center; justify-content: center; padding: 0;">−</button>
            </div>
            
            <div id="painel-conteudo" style="display: flex; flex-direction: column; gap: 10px;">
                <!-- Auto Hunt -->
                <div style="display: flex; flex-direction: column; gap: 4px;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-weight: 500;">Auto Hunt</span>
                        <button id="btn-auto-hunt" style="background: #ef4444; color: #fff; border: none; padding: 4px 12px; border-radius: 6px; cursor: pointer; font-weight: bold; font-size: 11px;">OFF</button>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-size: 10px; color: #888;">Tempo (s):</span>
                        <input type="number" id="input-tempo-hunt" value="600" style="width: 70px; background: #111; color: #fff; border: 1px solid #444; border-radius: 4px; padding: 3px; text-align: center; font-size: 11px;">
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 2px; margin-top: 2px;">
                        <span style="font-size: 10px; color: #888;">Região Alvo:</span>
                        <div style="display: flex; gap: 4px;">
                            <select id="select-mapa-hunt" style="flex: 1; background: #111; color: #fff; border: 1px solid #444; border-radius: 4px; padding: 3px; font-size: 10px;">
                                <option value="">(Automático / Melhor)</option>
                            </select>
                            <button id="btn-carregar-mapas" style="background: #3b82f6; color: #fff; border: none; padding: 3px 6px; border-radius: 4px; cursor: pointer; font-size: 10px;" title="Carregar regiões abertas no jogo">🔍</button>
                        </div>
                    </div>
                    <label style="cursor: pointer; display: flex; align-items: center; gap: 6px; margin-top: 4px; font-size: 11px;">
                        <input type="checkbox" id="chk-so-liberadas" data-pref="soLiberadas" style="cursor: pointer;" checked> só hunts liberadas
                    </label>
                    <label style="cursor: pointer; display: flex; align-items: center; gap: 6px; margin-top: 2px; font-size: 11px;">
                        <input type="checkbox" id="chk-sync-risco" style="cursor: pointer;" checked> Sincronizar Poção (100% - Risco)
                    </label>
                </div>

                <!-- Auto Potion -->
                <div style="border-top: 1px solid #333; padding-top: 8px; display: flex; flex-direction: column; gap: 4px;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-weight: 500;">Auto Potion</span>
                        <button id="btn-auto-potion" style="background: #ef4444; color: #fff; border: none; padding: 4px 12px; border-radius: 6px; cursor: pointer; font-weight: bold; font-size: 11px;">OFF</button>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-size: 10px; color: #888;">Mín Potion:</span>
                        <input type="number" id="input-min-potion" value="2000" style="width: 70px; background: #111; color: #fff; border: 1px solid #444; border-radius: 4px; padding: 3px; text-align: center; font-size: 11px;">
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-size: 10px; color: #888;">Tempo (s):</span>
                        <input type="number" id="input-tempo-potion" value="300" style="width: 70px; background: #111; color: #fff; border: 1px solid #444; border-radius: 4px; padding: 3px; text-align: center; font-size: 11px;">
                    </div>
                </div>

                <!-- Auto Ball -->
                <div style="border-top: 1px solid #333; padding-top: 8px; display: flex; flex-direction: column; gap: 4px;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-weight: 500;">Auto Ball</span>
                        <button id="btn-auto-ball" style="background: #ef4444; color: #fff; border: none; padding: 4px 12px; border-radius: 6px; cursor: pointer; font-weight: bold; font-size: 11px;">OFF</button>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-size: 10px; color: #888;">Mín Ball:</span>
                        <input type="number" id="input-min-ball" value="2000" style="width: 70px; background: #111; color: #fff; border: 1px solid #444; border-radius: 4px; padding: 3px; text-align: center; font-size: 11px;">
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-size: 10px; color: #888;">Tempo (s):</span>
                        <input type="number" id="input-tempo-ball" value="300" style="width: 70px; background: #111; color: #fff; border: 1px solid #444; border-radius: 4px; padding: 3px; text-align: center; font-size: 11px;">
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(painelControle);

    let huntInterval = null;
    let potionInterval = null;
    let ballInterval = null;
    let filaDeCompras = [];
    let processandoFila = false;

    window.botIntervalos = {
        get hunt() { return huntInterval; },
        get potion() { return potionInterval; },
        get ball() { return ballInterval; }
    };

    const btnMinimizar = document.getElementById('btn-minimizar');
    const painelConteudo = document.getElementById('painel-conteudo');
    let minimizado = false;

    btnMinimizar.addEventListener('click', () => {
        minimizado = !minimizado;
        painelConteudo.style.display = minimizado ? 'none' : 'flex';
        btnMinimizar.textContent = minimizado ? '+' : '−';
    });
	function aguardarElemento(seletor, timeout = 5000) {
        return new Promise((resolve, reject) => {
            const inicio = Date.now();
            const timer = setInterval(() => {
                const el = document.querySelector(seletor);
                if (el) {
                    clearInterval(timer);
                    resolve(el);
                } else if (Date.now() - inicio > timeout) {
                    clearInterval(timer);
                    reject(new Error(`Timeout aguardando elemento: ${seletor}`));
                }
            }, 100);
        });
    }
	async function sincronizarCheckboxLiberadas() {
        const chkBot = document.getElementById('chk-so-liberadas');
        const chkJogo = document.querySelector('body > div.pih-painel > div.pih-ctrl > label > input[type=checkbox]');
        
        if (chkBot && chkJogo) {
            if (chkJogo.checked !== chkBot.checked) {
                chkJogo.checked = chkBot.checked;
                chkJogo.dispatchEvent(new Event('change', { bubbles: true }));
                chkJogo.dispatchEvent(new Event('input', { bubbles: true }));
                await new Promise(r => setTimeout(r, 350));
            }
        }
    }

    async function popularDropdownRegioes() {
        const select = document.getElementById('select-mapa-hunt');
        select.innerHTML = '<option value="">(Automático / Melhor)</option>';
        
        await sincronizarCheckboxLiberadas();

        let painelHunt = document.querySelector('.pih-regioes');
        if (!painelHunt) {
            const botaoHunt = document.querySelector('button.pih-btn.pih-barra') || Array.from(document.querySelectorAll('button')).find(el => el.textContent.includes('/hunt'));
            if (botaoHunt) {
                botaoHunt.click();
                try {
                    painelHunt = await aguardarElemento('.pih-regioes', 3000);
                } catch(e) {
                    return 0;
                }
            }
        }

        const elementosRegioes = document.querySelectorAll('.pih-regioes [data-regiao]');
        if (!elementosRegioes || elementosRegioes.length === 0) return 0;

        const regioes = Array.from(elementosRegioes).map(el => el.getAttribute('data-regiao'));
        
        let adicionados = 0;
        regioes.forEach(regiao => {
            if (regiao !== null) {
                let existe = Array.from(select.options).some(opt => opt.value.toLowerCase() === regiao.toLowerCase());
                if (!existe) {
                    const opt = document.createElement('option');
                    opt.value = regiao;
                    opt.textContent = regiao === "" ? "(Automático / Melhor)" : regiao.charAt(0).toUpperCase() + regiao.slice(1);
                    select.appendChild(opt);
                    adicionados++;
                }
            }
        });
        return adicionados;
    }
	document.getElementById('btn-carregar-mapas').addEventListener('click', async () => {
        const painelHuntJaAberto = document.querySelector('.pih-tab');
        const botaoHunt = document.querySelector('button.pih-btn.pih-barra') || Array.from(document.querySelectorAll('button')).find(el => el.textContent.includes('/hunt'));
        
        if (!painelHuntJaAberto && botaoHunt) {
            botaoHunt.click();
            await new Promise(r => setTimeout(r, 500));
        }

        const qtd = await popularDropdownRegioes();
        alert(`Varredura concluída! Regiões adicionadas: ${qtd}`);
		if (!painelHuntJaAberto) {
            const botaoFecharHunt = document.querySelector('button.pih-fechar[data-acao="fechar"]');
            if (botaoFecharHunt) botaoFecharHunt.click();
        }
    });

    setTimeout(async () => {
        const painelHuntJaAberto = document.querySelector('.pih-tab');
        await popularDropdownRegioes();
        if (!painelHuntJaAberto) {
            const botaoFecharHunt = document.querySelector('button.pih-fechar[data-acao="fechar"]');
            if (botaoFecharHunt) botaoFecharHunt.click();
        }
    }, 2000);
    function atualizarEstadoBotao(botao, ligado) {
        botao.style.background = ligado ? '#22c55e' : '#ef4444';
        botao.textContent = ligado ? 'ON' : 'OFF';
    }

    function sincronizarRiscoComPocao() {
        const painelJaAberto = document.querySelector('.pih-painel');
        const botaoHunt = Array.from(document.querySelectorAll('button')).find(el => el.textContent.includes('/hunt'));
        
        if (!painelJaAberto && !botaoHunt) return;
        if (!painelJaAberto && botaoHunt) botaoHunt.click();

        setTimeout(() => {
            let riscoDetectado = null;
            const linhas = document.querySelectorAll('.pih-tab tr');
            for (let i = 0; i < linhas.length; i++) {
                const celulas = linhas[i].querySelectorAll('td');
                for (let j = 0; j < celulas.length; j++) {
                    const matchRisco = celulas[j].textContent.trim().match(/(\d+)%/);
                    if (matchRisco) {
                        riscoDetectado = parseInt(matchRisco[1], 10);
                        break;
                    }
                }
                if (riscoDetectado !== null) break;
            }

            if (!painelJaAberto) {
                const botaoFecharHunt = document.querySelector('button.pih-fechar[data-acao="fechar"]');
                if (botaoFecharHunt) botaoFecharHunt.click();
            }

            if (riscoDetectado !== null) {
                let riscoArredondadoParaCima = Math.ceil(riscoDetectado / 10) * 10;
                let valorAlvo = Math.max(10, Math.min(100 - riscoArredondadoParaCima, 90));
                const inputSlider = document.querySelector('input[type="range"][name="potion"], input[type="range"]');

                if (inputSlider) {
                    inputSlider.value = valorAlvo;
                    inputSlider.dispatchEvent(new Event('input', { bubbles: true }));
                    inputSlider.dispatchEvent(new Event('change', { bubbles: true }));
                }
            }
        }, 400);
    }

    function executarAutoHunt() {
        const divHudHunt = document.querySelector('#hud-hunt');
        let estaNoCentro = false;

        if (divHudHunt) {
            const statusAtual = divHudHunt.textContent.trim();
            if (statusAtual.includes('Centro Pokemon')) {
                estaNoCentro = true;
            } else {
                const botaoCentro = document.querySelector('#ir-centro');
                if (botaoCentro && botaoCentro.hasAttribute('disabled')) {
                    setTimeout(executarAutoHunt, 1000);
                    return; 
                }
            }
        }

        const painelHuntJaAberto = document.querySelector('.pih-tab');
        if (!painelHuntJaAberto) {
            const botaoAbrirHunt = document.querySelector('button.pih-btn.pih-barra');
            if (botaoAbrirHunt) botaoAbrirHunt.click();
        }

        setTimeout(() => {
            const hudAtualizado = document.querySelector('#hud-hunt');
            if (!hudAtualizado) return;
            
            const pokemonAtualNoHud = hudAtualizado.textContent.trim().split('·')[0].trim();
            
			const regiaoDesejada = document.querySelector("#select-mapa-hunt").value

			const botao = document.querySelector(`body > div.pih-painel > div.pih-regioes button[data-regiao="${regiaoDesejada}"]`);

			
			if (botao) {
				botao.click();
			}
			let pokemonMelhorHunt = "";
			setTimeout(() => {
				const elementoNomeHunt = document.querySelector('.pih-top .pih-hunt b');
				if (!elementoNomeHunt) return;
				pokemonMelhorHunt = elementoNomeHunt.textContent.trim();
			},3000);
            

            // Detecta a região na ficha (ex: "Outland · Nv 150")
            const elemDim = document.querySelector('.pih-dim');
            let regiaoAlvo = "Outland";
            if (elemDim) {
                const textoDim = elemDim.textContent;
                const partes = textoDim.split('·');
                if (partes.length > 0) {
                    regiaoAlvo = partes[0].trim();
                }
            }

            if (document.getElementById('chk-sync-risco').checked) {
                sincronizarRiscoComPocao();
            }

            if (pokemonAtualNoHud.toLowerCase() === pokemonMelhorHunt.toLowerCase()) {
                if (!painelHuntJaAberto) {
                    const botaoFecharHunt = document.querySelector('button.pih-fechar[data-acao="fechar"]');
                    if (botaoFecharHunt) botaoFecharHunt.click();
                }
                return;
            }

            const botaoCentro = document.querySelector('#ir-centro');
            if (botaoCentro && botaoCentro.hasAttribute('disabled')) {
                if (!painelHuntJaAberto) {
                    const botaoFecharHunt = document.querySelector('button.pih-fechar[data-acao="fechar"]');
                    if (botaoFecharHunt) botaoFecharHunt.click();
                }
                setTimeout(executarAutoHunt, 1000);
                return;
            }

            if (botaoCentro) {
                botaoCentro.click();
            }

            setTimeout(() => {
                const botaoMapa = document.querySelector('button[data-modal="mapa"]');
                if (botaoMapa) {
                    botaoMapa.click();
                    setTimeout(() => {
                        // Seleciona a região correspondente antes da busca
                        const botoesRegiao = document.querySelectorAll('.mapa-reg-bt');
                        botoesRegiao.forEach(btn => {
                            const nomeReg = btn.querySelector('.mapa-reg-nome');
                            if (nomeReg && nomeReg.textContent.trim().toLowerCase() === regiaoAlvo.toLowerCase()) {
                                btn.click();
                            }
                        });

                        setTimeout(() => {
                            const inputBusca = document.querySelector('#f-mapa');
                            if (inputBusca) {
                                inputBusca.value = pokemonMelhorHunt;
                                inputBusca.dispatchEvent(new Event('input', { bubbles: true }));
                                inputBusca.dispatchEvent(new Event('change', { bubbles: true }));
                                
                                setTimeout(() => {
                                    const slugBusca = pokemonMelhorHunt.toLowerCase().replace(/\s+/g, '_');
                                    let botaoAlvo = document.querySelector(`button.ml-linha[data-slug="${slugBusca}"]`);
                                    
                                    if (!botaoAlvo) {
                                        const linhas = document.querySelectorAll('button.ml-linha');
                                        for (let l of linhas) {
                                            const nomeEl = l.querySelector('.ml-nome');
                                            if (nomeEl && nomeEl.textContent.trim().toLowerCase() === pokemonMelhorHunt.toLowerCase()) {
                                                botaoAlvo = l;
                                                break;
                                            }
                                        }
                                    }

                                    if (botaoAlvo) {
                                        botaoAlvo.click();
                                        setTimeout(() => {
                                            const fecharMapa = document.querySelector('button.pih-fechar[data-acao="fechar"]');
                                            if (fecharMapa) fecharMapa.click();
                                        }, 400);
                                    }
                                }, 600);
                            }
                        }, 400);
                    }, 400);
                }
            }, 10000); 
        }, 400);
    }

    function adicionarFilaCompra(seletorOpts, minInputId, indiceCategoriaMarket, nomeAuto) {
        const botoesItens = document.querySelectorAll(`${seletorOpts} .auto-chip`);
        let itemAlvoNome = null;
        let quantidadeAtual = 0;

        for (let i = 0; i < botoesItens.length; i++) {
            if (botoesItens[i].classList.contains('on')) {
                const qtdSpan = botoesItens[i].querySelector('.q');
                if (qtdSpan) {
                    quantidadeAtual = parseInt(qtdSpan.textContent.trim().replace(/\./g, ''), 10) || 0;
                    const titulo = botoesItens[i].getAttribute('title') || "";
                    itemAlvoNome = titulo.split(/—|-/)[0].trim();
                }
                break;
            }
        }

        const minConfig = parseInt(document.getElementById(minInputId).value, 10) || 1000;

        if (itemAlvoNome && quantidadeAtual < minConfig) {
            const quantidadeFaltante = minConfig - quantidadeAtual;
            if (!filaDeCompras.some(item => item.nomeAuto === nomeAuto)) {
                filaDeCompras.push({ itemAlvoNome, quantidadeFaltante, indiceCategoriaMarket, nomeAuto });
                processarProximaCompra();
            }
        }
    }

    function processarProximaCompra() {
        if (processandoFila || filaDeCompras.length === 0) return;

        processandoFila = true;
        const tarefa = filaDeCompras.shift();
        const temMaisItensNaFila = filaDeCompras.length > 0;

        const botaoMarket = document.querySelector('button[data-modal="market"]');
        if (!botaoMarket) {
            processandoFila = false;
            processarProximaCompra();
            return;
        }

        botaoMarket.click();

        setTimeout(() => {
            const categorias = document.querySelectorAll('.mk-lado .mk-cat');
            if (categorias.length > tarefa.indiceCategoriaMarket) {
                categorias[tarefa.indiceCategoriaMarket].click();
            }

            setTimeout(() => {
                const cards = document.querySelectorAll('.mk-card');
                let cardAlvo = null;
                for (let i = 0; i < cards.length; i++) {
                    const nomeCard = cards[i].querySelector('.mk-nome');
                    if (nomeCard && nomeCard.textContent.trim().toLowerCase() === tarefa.itemAlvoNome.toLowerCase()) {
                        cardAlvo = cards[i];
                        break;
                    }
                }

                if (cardAlvo) {
                    const inputQtd = cardAlvo.querySelector('input[type="number"]');
                    if (inputQtd) {
                        inputQtd.focus();
                        inputQtd.value = tarefa.quantidadeFaltante;
                        inputQtd.dispatchEvent(new Event('input', { bubbles: true }));
                        inputQtd.dispatchEvent(new Event('change', { bubbles: true }));
                    }
                    setTimeout(() => {
                        const btnComprar = cardAlvo.querySelector('.mk-acao.mk-pal-comprar');
                        if (btnComprar) btnComprar.click();
                        
                        setTimeout(() => {
                            if (!temMaisItensNaFila) {
                                const fecharGeral = document.querySelector('#modal-fechar');
                                if (fecharGeral) fecharGeral.click();
                            }
                            processandoFila = false;
                            processarProximaCompra();
                        }, 500);
                    }, 400);
                } else {
                    if (!temMaisItensNaFila) {
                        const fecharGeral = document.querySelector('#modal-fechar');
                        if (fecharGeral) fecharGeral.click();
                    }
                    processandoFila = false;
                    processarProximaCompra();
                }
            }, 500);
        }, 500);
    }

    document.getElementById('btn-auto-hunt').addEventListener('click', (e) => {
        const ligado = e.target.textContent === 'OFF';
        atualizarEstadoBotao(e.target, ligado);
        if (ligado) {
            executarAutoHunt();
            const segundos = (parseInt(document.getElementById('input-tempo-hunt').value, 10) || 300) * 1000;
            huntInterval = setInterval(executarAutoHunt, segundos);
        } else {
            clearInterval(huntInterval);
            huntInterval = null;
        }
    });

    document.getElementById('btn-auto-potion').addEventListener('click', (e) => {
        const ligado = e.target.textContent === 'OFF';
        atualizarEstadoBotao(e.target, ligado);
        if (ligado) {
            adicionarFilaCompra('#auto-potion-opts', 'input-min-potion', 1, 'Auto Potion');
            const segundos = (parseInt(document.getElementById('input-tempo-potion').value, 10) || 300) * 1000;
            potionInterval = setInterval(() => adicionarFilaCompra('#auto-potion-opts', 'input-min-potion', 1, 'Auto Potion'), segundos);
        } else {
            clearInterval(potionInterval);
            potionInterval = null;
        }
    });

    document.getElementById('btn-auto-ball').addEventListener('click', (e) => {
        const ligado = e.target.textContent === 'OFF';
        atualizarEstadoBotao(e.target, ligado);
        if (ligado) {
            adicionarFilaCompra('#auto-ball-opts', 'input-min-ball', 0, 'Auto Ball');
            const segundos = (parseInt(document.getElementById('input-tempo-ball').value, 10) || 300) * 1000;
            ballInterval = setInterval(() => adicionarFilaCompra('#auto-ball-opts', 'input-min-ball', 0, 'Auto Ball'), segundos);
        } else {
            clearInterval(ballInterval);
            ballInterval = null;
        }
    });
})();