document.addEventListener('DOMContentLoaded', () => {
    const infoEmail = document.getElementById('info-email');
    const tabela = document.getElementById('tabela-historico');
    const SUPABASE_ANON_KEY = "sb_publishable_WuCewm2dUr_ZuzZ05T6pKw_bdPuEd9v";

    chrome.storage.local.get(['emailUsuario'], (data) => {
        if (!data.emailUsuario) {
            tabela.innerHTML = '<tr><td colspan="4">Nenhum e-mail encontrado na sessão.</td></tr>';
            return;
        }

        infoEmail.textContent = `Sincronizando e exibindo compras para: ${data.emailUsuario}`;

        // Chama a Edge Function que busca do Mercado Pago e sincroniza o retroativo
        fetch('https://fcigdnmvbaxwyjmyobvn.supabase.co/functions/v1/sincronizar-compras', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
            },
            body: JSON.stringify({ email: data.emailUsuario })
        })
        .then(res => res.json())
        .then(res => {
            if (!res.sucesso || !res.compras || res.compras.length === 0) {
                tabela.innerHTML = '<tr><td colspan="4">Nenhuma compra encontrada para este e-mail.</td></tr>';
                return;
            }

            tabela.innerHTML = res.compras.map(c => `
                <tr>
                    <td>${new Date(c.created_at).toLocaleDateString('pt-BR')} ${new Date(c.created_at).toLocaleTimeString('pt-BR')}</td>
                    <td>${c.id_transacao_mp || 'N/A'}</td>
                    <td>R$ ${parseFloat(c.valor).toFixed(2)}</td>
                    <td class="approved">Aprovado</td>
                </tr>
            `).join('');
        })
        .catch(err => {
            tabela.innerHTML = `<tr><td colspan="4">Erro ao sincronizar histórico: ${err.message}</td></tr>`;
        });
    });
});