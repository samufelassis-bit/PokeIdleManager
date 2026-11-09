import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const versaoAtualSistema = "1.0.1";
  const urlAtualizacao = "https://github.com/samufelassis-bit/PokeIdleManager/releases"; 
  const aviso = "Ha uma nova versao disponivel com melhorias e correcoes.";

  return new Response(
    JSON.stringify({
      versao_recente: versaoAtualSistema,
      atualizacao_obrigatoria: false, // Defina como true apenas se quiser bloquear versões antigas
      url: urlAtualizacao,
      mensagem: aviso
    }),
    { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
  );
});