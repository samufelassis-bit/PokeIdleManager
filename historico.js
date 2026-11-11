// historico.js
document.addEventListener('DOMContentLoaded', async () => {
    const infoEmail = document.getElementById('info-email');
    const tabela = document.getElementById('tabela-historico');

    const STATUS = {
        approved: { texto: 'Aprovado', classe: 'approved' },
        pending: { texto: 'Pendente', classe: 'pending' },
        in_process: { texto: 'Pendente', classe: 'pending' },
        cancelled: { texto: 'Cancelado', classe: 'cancelled' },
        rejected: { texto: 'Recusado', classe: 'cancelled' },
        refunded: { texto: 'Reembolsado', classe: 'cancelled' },
    };

    function mensagem(texto) {
        const tr = document.createElement('tr');
        const td = document.createElement('td');
        td.colSpan = 4;
        td.textContent = texto;
        tr.appendChild(td);
        tabela.replaceChildren(tr);
    }

    function celula(texto, classe) {
        const td = document.createElement('td');
        td.textContent = texto;
        if (classe) td.className = classe;
        return td;
    }

    function formatarData(valor) {
        const data = new Date(valor);
        return Number.isNaN(data.getTime())
            ? '—'
            : `${data.toLocaleDateString('pt-BR')} ${data.toLocaleTimeString('pt-BR')}`;
    }

    function formatarValor(valor) {
        const numero = Number.parseFloat(valor);
        return Number.isFinite(numero) ? `R$ ${numero.toFixed(2)}` : '—';
    }

    const { emailUsuario, tokenSessao } = await chrome.storage.local.get(['emailUsuario', 'tokenSessao']);
    if (!emailUsuario || !tokenSessao) {
        mensagem('Confirme seu e-mail no popup da extensão para ver o histórico.');
        return;
    }

    infoEmail.textContent = `Sincronizando e exibindo compras para: ${emailUsuario}`;

    try {
        // A Edge Function busca no Mercado Pago e sincroniza o retroativo
        const res = await Api.sincronizarCompras(emailUsuario, tokenSessao);

        if (res.codigo === 'SESSAO_INVALIDA') {
            mensagem('Sua sessão expirou. Confirme seu e-mail novamente no popup da extensão.');
            return;
        }

        if (!res.sucesso || !Array.isArray(res.compras) || res.compras.length === 0) {
            mensagem('Nenhuma compra encontrada para este e-mail.');
            return;
        }

        const linhas = res.compras.map((c) => {
            // Se o servidor não enviar status, assume aprovado (comportamento anterior)
            const status = STATUS[c.status] || STATUS.approved;
            const tr = document.createElement('tr');
            tr.append(
                celula(formatarData(c.created_at)),
                celula(c.id_transacao_mp || 'N/A'),
                celula(formatarValor(c.valor)),
                celula(status.texto, status.classe),
            );
            return tr;
        });
        tabela.replaceChildren(...linhas);
    } catch (err) {
        mensagem(`Erro ao sincronizar histórico: ${err.message}`);
    }
});
