// config.js — constantes compartilhadas (popup, histórico e service worker)
const CONFIG = Object.freeze({
    SUPABASE_URL: 'https://fcigdnmvbaxwyjmyobvn.supabase.co',
    // Chave "publishable": pública por design. A segurança real fica nas Edge Functions / RLS.
    SUPABASE_ANON_KEY: 'sb_publishable_WuCewm2dUr_ZuzZ05T6pKw_bdPuEd9v',
    // Intervalo da checagem de licença em segundo plano (chrome.alarms)
    INTERVALO_VERIFICACAO_MIN: 10,
});
