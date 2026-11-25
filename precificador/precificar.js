// precificar.js — botão "Precificar" na ficha do pokemon, com o preço mostrado na própria ficha.
// Roda como content script (mundo isolado da extensão). O cálculo é o do Precificador de Pokémon
// (github.com/briaoAle/precificador-pokemon, licença MIT); as vendas (precos.json) vêm do site dele,
// baixadas pelo background.js, porque a página do jogo não deixa baixar dados de outros sites.
(() => {
  'use strict';
  if (window.__precificadorBot) return;
  window.__precificadorBot = true;

  const SITE = 'https://briaoale.github.io/precificador-pokemon/';
  const ID_BOTAO = 'fi-precificar';
  const ID_CAIXA = 'fi-preco-bot';
  const STATS = ['hp', 'atk', 'def', 'spAtk', 'spDef', 'speed'];
  const ORDEM = { 'HP': 0, 'ATK': 1, 'DEF': 2, 'SP.ATK': 3, 'SP.DEF': 4, 'SPD': 5 };
  const P = window.PokeIdlePvePricing;

  const texto = (el) => el?.textContent.replace(/\s+/g, ' ').trim() || '';
  const inteiro = (s) => { const m = String(s).match(/\d[\d.,]*/); return m ? Number(m[0].replace(/[.,]/g, '')) : null; };
  const decimal = (s) => { const m = String(s).match(/\d+(?:[.,]\d+)?/); return m ? Number(m[0].replace(',', '.')) : null; };
  const gemas = (n) => Math.round(n).toLocaleString('pt-BR');
  const norm = (s) => String(s ?? '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();

  // ---------------------------------------------------------------- leitura da ficha
  function porStat(linhas, ler) {
    const v = {};
    for (const l of linhas) {
      const i = ORDEM[texto(l.querySelector('.fi-stat-nome')).toUpperCase()];
      if (i !== undefined) { const x = ler(l); if (x !== null) v[STATS[i]] = x; }
    }
    return v;
  }

  /** Ficha aberta → o mesmo objeto que PokeIdleFicha.parse devolve, mais Z-Move e AoE. */
  function lerFicha(corpo) {
    // Espécie: a placa "#3.009 Mega Blastoise" (o nome do topo pode ser apelido)
    const especie = [...corpo.querySelectorAll('.fi-placa b')]
      .map(texto).find((t) => /^#[\d.,]+\s+\S/.test(t));
    const nome = especie?.replace(/^#[\d.,]+\s+/, '').trim();
    if (!nome) throw new Error('Não achei a espécie nesta ficha.');

    const notaAttr = corpo.querySelector('.fi-nota-num')?.dataset.nota;
    return {
      nome,
      level: inteiro(texto(corpo.querySelector('.fi-nivel-chip'))),
      potencia: inteiro(texto(corpo.querySelector('.pk-selo-pot b'))),
      quality: decimal(texto(corpo.querySelector('.pk-selo-q b'))),
      nota: notaAttr ? Number(notaAttr) : null,
      shiny: Boolean(corpo.querySelector('.cm-selo-shiny')),
      ivs: porStat(corpo.querySelectorAll('.fi-stats:not(.fi-stats-refino) .fi-stat'),
        (l) => inteiro(texto(l.querySelector('.fi-iv')))),
      refinoActual: porStat(corpo.querySelectorAll('.fi-stats-refino .fi-stat'),
        (l) => inteiro(texto(l.querySelector('.fi-refino-mais'))) || null),
      zMove: [...corpo.querySelectorAll('.fi-selos-linha .tm-selo')]
        .some((s) => /^z-move/i.test(s.title || '') || /\/zmove\/(?!aoe)/.test(s.querySelector('img')?.src || '')),
      aoe: Boolean(corpo.querySelector('.fi-selos-linha .tm-selo.aoe')),
    };
  }

  /** Link para ver a mesma ficha no site do Precificador (mesmo formato do PokeIdleFicha.toLink). */
  function linkSite(f) {
    const p = new URLSearchParams({ nome: f.nome, nv: f.level, p: f.potencia, q: f.quality });
    if (Number.isFinite(f.nota)) p.set('n', f.nota);
    if (f.shiny) p.set('s', '1');
    p.set('iv', STATS.map((k) => f.ivs[k] ?? '').join('-'));
    if (STATS.some((k) => f.refinoActual[k] > 0)) p.set('r', STATS.map((k) => f.refinoActual[k] || 0).join('-'));
    if (f.zMove) p.set('z', '1');
    if (f.aoe) p.set('a', '1');
    return `${SITE}#${p}`;
  }

  // ---------------------------------------------------------------- dados e cálculo
  let dados = null;      // { precos, rows, central, notas }
  let carregando = null;

  function carregar() {
    if (dados) return Promise.resolve(dados);
    carregando ??= new Promise((ok, erro) => {
      chrome.runtime.sendMessage({ tipo: 'precificador:precos' }, (resp) => {
        if (chrome.runtime.lastError) return erro(new Error(chrome.runtime.lastError.message));
        if (!resp?.ok) return erro(new Error(resp?.erro || 'sem resposta do background'));
        const precos = resp.precos;
        const central = window.PokeIdleCentral.create(window);
        dados = {
          precos,
          rows: window.PokeIdleCentral.linhas(precos),
          central,
          notas: window.PokeIdleNota.create(central.species),
        };
        ok(dados);
      });
    }).finally(() => { carregando = null; });
    return carregando;
  }

  const especieDe = (d, f) => [...d.central.species.values()].find((s) => norm(s.n) === norm(f.nome));

  function notaPara(d, f) {
    if (Number.isFinite(f.nota)) return f.nota;
    const e = especieDe(d, f);
    const v = e ? d.notas.nota(e.id, f) : null;
    return Number.isFinite(v) ? v : null;
  }

  /** Mesma trava do site: nota abaixo de 3,5 só precifica se a última evolução chegar a 3,5. */
  function travaDeNota(d, f) {
    const e = especieDe(d, f);
    if (!e) return null;
    const agora = notaPara(d, f);
    if (!Number.isFinite(agora) || agora >= window.PokeIdleNota.MIN) return null;
    const finais = d.central.finals(e.id, false);
    const melhor = Math.max(agora, ...finais.map((x) => d.notas.nota(x.id, f) ?? -1));
    if (melhor >= window.PokeIdleNota.MIN) return null;
    return `Nota ${agora.toLocaleString('pt-BR')}: abaixo de 3,5. O precificador não calcula preço para pokémon com nota abaixo de 3,5.`;
  }

  function precificar(d, f) {
    if (!especieDe(d, f)) throw new Error(`"${f.nome}" não está no catálogo do precificador.`);
    const trava = travaDeNota(d, f);
    if (trava) throw new Error(trava);
    return P.priceSheet(d.central,
      { ...f, nota: notaPara(d, f), tmElemental: f.zMove ? 'NORMAL' : null, tmAoe: f.aoe },
      { rows: d.rows, itemPrices: d.precos.itens, currentItems: {}, now: Date.parse(d.precos.geradoEm), bias: d.precos.correcao?.bias });
  }

  // ---------------------------------------------------------------- tela
  const CSS = `
    #${ID_CAIXA}{margin-top:10px;padding:12px 14px;border-radius:10px;background:rgba(15,23,42,.92);
      border:1px solid rgba(74,222,128,.35);color:#e2e8f0;font-size:13px;line-height:1.4}
    #${ID_CAIXA} .pb-tit{display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:8px;font-weight:700}
    #${ID_CAIXA} .pb-tit small{font-weight:400;color:#94a3b8}
    #${ID_CAIXA} .pb-precos{display:grid;grid-template-columns:repeat(3,1fr);gap:6px}
    #${ID_CAIXA} .pb-preco{background:rgba(255,255,255,.05);border-radius:8px;padding:6px 8px;text-align:center}
    #${ID_CAIXA} .pb-preco small{display:block;color:#94a3b8;font-size:11px}
    #${ID_CAIXA} .pb-preco b{font-size:16px}
    #${ID_CAIXA} .pb-preco.justo{background:rgba(34,197,94,.16);outline:1px solid rgba(74,222,128,.5)}
    #${ID_CAIXA} .pb-preco.justo b{color:#4ade80;font-size:18px}
    #${ID_CAIXA} .pb-linha{margin-top:8px;color:#94a3b8;font-size:12px}
    #${ID_CAIXA} .pb-aviso{margin-top:8px;color:#fbbf24;font-size:12px}
    #${ID_CAIXA} .pb-erro{color:#fca5a5}
    #${ID_CAIXA} a{color:#86efac}`;

  function garantirCss() {
    if (document.getElementById(ID_CAIXA + '-css')) return;
    const s = document.createElement('style');
    s.id = ID_CAIXA + '-css';
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  function caixa(acoes) {
    garantirCss();
    let c = document.getElementById(ID_CAIXA);
    if (!c) {
      c = document.createElement('div');
      c.id = ID_CAIXA;
      acoes.insertAdjacentElement('afterend', c);
    }
    return c;
  }

  const el = (tag, cls, txt) => { const e = document.createElement(tag); if (cls) e.className = cls; if (txt != null) e.textContent = txt; return e; };

  function mostrar(c, f, r, d) {
    c.replaceChildren();
    const tit = el('div', 'pb-tit');
    tit.append(el('span', null, '💰 Preço em Gemas'),
      el('small', null, `vendas lidas em ${new Date(d.precos.geradoEm).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}`));
    c.append(tit);

    if (!r.available) {
      c.append(el('div', 'pb-aviso', 'Poucas vendas parecidas para calcular um preço deste pokémon.'));
    } else {
      const grade = el('div', 'pb-precos');
      for (const [cls, rot, v] of [['', 'Vender rápido', r.low], ['justo', 'Preço justo', r.median], ['', 'Esperar', r.high]]) {
        const b = el('div', 'pb-preco ' + cls);
        b.append(el('small', null, rot), el('b', null, gemas(v)));
        grade.append(b);
      }
      c.append(grade);

      const conf = r.confidence;
      if (conf?.few) c.append(el('div', 'pb-aviso', 'Poucas vendas para medir: use o preço só como referência.'));
      else if (Number.isFinite(conf?.percent)) {
        const linha = el('div', conf.percent < 20 ? 'pb-aviso' : 'pb-linha',
          `Confiança ${Math.round(conf.percent)}%: em vendas parecidas, o Preço justo ficou a até 25% do valor pago ${Math.round(conf.percent / 10)} em cada 10 vezes.`);
        c.append(linha);
      }
      // parts = os Adicionais (Z-Move, AoE, Mega), cada um com o valor somado ao preço
      const adicionais = (r.parts || []).filter((p) => p.total != null);
      if (adicionais.length) {
        c.append(el('div', 'pb-linha', `Pokémon ${gemas(r.base)} + ` + adicionais.map((p) => `${/^Z-Move/.test(p.label) ? 'Z-Move' : p.label} ${gemas(p.total)}`).join(' + ') + '.'));
      }
      if (r.missing?.length) c.append(el('div', 'pb-aviso', 'Sem cotação para: ' + r.missing.map((l) => /^Z-Move/.test(l) ? 'Z-Move' : l).join(', ') + ' (fica fora do preço).'));
    }

    const rodape = el('div', 'pb-linha');
    const a = el('a', null, 'Ver detalhes no Precificador de Pokémon');
    a.href = linkSite(f);
    a.target = '_blank';
    a.rel = 'noopener';
    rodape.append(a, document.createTextNode(' · cálculo de briaoAle (MIT)'));
    c.append(rodape);
  }

  function mostrarErro(c, msg) {
    c.replaceChildren(el('div', 'pb-erro', '💰 ' + msg));
  }

  async function aoClicar(bt) {
    await avaliarLicenca();
    if (!licenciado) return;
    const corpo = document.querySelector('#ficha-corpo');
    const acoes = corpo?.querySelector('.fi-acoes');
    if (!acoes) return;
    const c = caixa(acoes);
    let f;
    try { f = lerFicha(corpo); } catch (e) { return mostrarErro(c, e.message); }

    const rotulo = bt.querySelector('span');
    const original = rotulo.textContent;
    bt.disabled = true;
    rotulo.textContent = dados ? 'Calculando…' : 'Baixando vendas…';
    if (!dados) c.replaceChildren(el('div', 'pb-linha', 'Baixando as vendas do mercado (só na 1ª vez)…'));
    try {
      const d = await carregar();
      const r = precificar(d, f);
      mostrar(c, f, r, d);
    } catch (e) {
      console.warn('[Bot Pokeidle] Precificar:', e);
      mostrarErro(c, e.message);
    } finally {
      bt.disabled = false;
      rotulo.textContent = original;
    }
  }

  // ---------------------------------------------------------------- licença
  // Só aparece para quem tem licença ativa: a mesma checagem local do content.js
  // (o servidor é a autoridade; tolerância de 1 dia para fuso e relógio).
  const UM_DIA_MS = 24 * 60 * 60 * 1000;
  let licenciado = false;

  function licencaValida({ ativo, vencimento }) {
    if (!ativo) return false;
    const fim = vencimento ? new Date(vencimento).getTime() : NaN;
    return Number.isNaN(fim) || fim + UM_DIA_MS >= Date.now();
  }

  async function avaliarLicenca() {
    try {
      licenciado = licencaValida(await chrome.storage.local.get(['ativo', 'vencimento']));
    } catch {
      return; // contexto da extensão invalidado (extensão recarregada): mantém como está
    }
    if (licenciado) colocarBotao();
    else document.querySelectorAll(`#${ID_BOTAO}, #${ID_CAIXA}`).forEach((e) => e.remove());
  }

  function colocarBotao() {
    if (!licenciado) return;
    const acoes = document.querySelector('#ficha-corpo .fi-acoes');
    if (!acoes || acoes.querySelector('#' + ID_BOTAO)) return;
    const bt = document.createElement('button');
    bt.type = 'button';
    bt.id = ID_BOTAO;
    bt.className = 'fi-calc fi-acao';
    bt.title = 'Mostra quanto este pokemon vale no mercado: Vender rápido, Preço justo e Esperar, em Gemas.';
    bt.append(el('span', null, '💰 Precificar'));
    bt.addEventListener('click', () => aoClicar(bt));
    acoes.appendChild(bt);
  }

  // A ficha troca o conteúdo ao abrir outro pokemon: o observador recoloca o botão
  new MutationObserver(colocarBotao).observe(document.body, { childList: true, subtree: true });
  chrome.storage.onChanged.addListener((mudancas, area) => {
    if (area === 'local' && (mudancas.ativo || mudancas.vencimento)) avaliarLicenca();
  });
  avaliarLicenca();
  setInterval(avaliarLicenca, 60 * 1000); // a licença pode vencer com a aba aberta
})();
