<body>

<!-- ──────────────────────────── portal ────────────────────────────
     A porta de entrada do jogo: UM quadro de madeira sobre o xadrez azul, do mesmo material
     dos modais de dentro (só mais largo, e retangular). O banner mora dentro dele, e logo
     abaixo fica o que estiver acontecendo — primeiro a barra de carregamento, depois o login.

     Os dois no MESMO quadro de propósito: quem entra vê uma moldura só, que troca o miolo
     quando os assets terminam de chegar. Duas telas cheias diferentes (uma de arte, outra de
     login) davam um pisca-pisca de fundo entre elas.

     Fica no HTML, e não montado por JS, para aparecer no primeiro quadro — antes de o módulo
     do cliente ser baixado. -->
<!-- ─────────────────── "versão nova, recarregue" ───────────────────
     Aparece quando o `/saude` (lido de 10 em 10 s) passa a devolver uma versão diferente da
     que esta aba carregou — ou seja, quando um deploy entrou no ar com o jogador já dentro.

     O `?v=` no `.js`/`.css` resolve quem ABRE o jogo depois do deploy; não há como resolver
     quem já está com a aba aberta, porque os arquivos dela já foram baixados. O que dá para
     fazer é avisar, e avisar de um jeito que a pessoa não role os olhos e continue jogando
     numa versão que pode estar quebrada — daí a barra no topo, e não mais um toast que some
     em três segundos no canto de baixo.

     Não tem botão de fechar de propósito: fechar seria escolher continuar com o cliente
     velho, que é exatamente o estado que a gente vive pedindo para ninguém ficar. Ela não
     bloqueia nada — dá para jogar, terminar a batalha e recarregar quando der. -->
<div id="aviso-versao" class="aviso-versao hidden" role="alert" aria-live="assertive">
  <span class="av-selo" aria-hidden="true">
    <svg viewBox="0 0 24 24"><path d="M12 5V2L8 6l4 4V7a5 5 0 1 1-5 5H5a7 7 0 1 0 7-7z" fill="currentColor"></path></svg>
  </span>
  <div class="av-texto">
    <b data-i18n="versaoNova.titulo">Versão nova disponível</b>
    <span data-i18n="versaoNova.sub">Recarregue para pegar a atualização — leva um segundo e nada se perde.</span>
  </div>
  <button type="button" id="aviso-versao-btn" data-i18n="versaoNova.botao">Recarregar agora</button>
</div>

<div id="portal" class="portal hidden">
  <div class="portal-caixa">
    <!-- O PALCO (21/10/2026): a arte do topo é desenhada pelo jogo, e não mais uma ilustração —
         as duas que moravam aqui (`img/banner.jpg` e `img/login.jpg`) saíram, a pedido do dono,
         para dar lugar a arte própria.
         A Beast Ball da logo gira enquanto a barra anda e a equipe shiny espera em silhueta; no
         100% a bola fecha como numa captura e vira a logo. Quem monta a equipe e as reações é o
         `portal-palco.mjs`; a bola e o céu ficam AQUI, no HTML, para aparecer no primeiro quadro,
         antes de o módulo do cliente chegar. Enfeite: `aria-hidden`, e nada aqui recebe foco.

         O SVG é a bola da logo (`divulgacao/logo.html`, amostrada da `img/logo-bola-180.png`),
         com os ids prefixados (`ptlb-`) para não colidir com outro SVG da página. -->
    <div class="portal-arte ptl-palco pronto" id="ptl-palco" aria-hidden="true">
      <div class="ptl-ceu"></div>
      <div class="ptl-estrelas e1"></div>
      <div class="ptl-estrelas e2"></div>
      <div class="ptl-cadente"></div>
      <div class="ptl-chao"></div>
      <div class="ptl-fila ptl-fila-tras"><span class="ptl-pk pronto" data-pk="gyarados" style="--x: 11; --cw: 96; --ch: 96; --topo: 0.417;"><span class="ptl-halo"></span><span class="ptl-sombra-chao"></span><span class="ptl-ergue"><span class="ptl-boia"><span class="ptl-pulo"><canvas width="96" height="96"></canvas></span></span></span><span class="ptl-faisca f1"></span><span class="ptl-faisca f2"></span><span class="ptl-nome">Gyarados</span></span><span class="ptl-pk pronto" data-pk="dragonite" style="--x: 37; --cw: 64; --ch: 64; --topo: 0.047;"><span class="ptl-halo"></span><span class="ptl-sombra-chao"></span><span class="ptl-ergue"><span class="ptl-boia"><span class="ptl-pulo"><canvas width="64" height="64"></canvas></span></span></span><span class="ptl-faisca f1"></span><span class="ptl-faisca f2"></span><span class="ptl-nome">Dragonite</span></span><span class="ptl-pk pronto" data-pk="garchomp" style="--x: 63; --cw: 96; --ch: 96; --topo: 0.427;"><span class="ptl-halo"></span><span class="ptl-sombra-chao"></span><span class="ptl-ergue"><span class="ptl-boia"><span class="ptl-pulo"><canvas width="96" height="96"></canvas></span></span></span><span class="ptl-faisca f1"></span><span class="ptl-faisca f2"></span><span class="ptl-nome">Garchomp</span></span><span class="ptl-pk pronto" data-pk="metagross" style="--x: 88; --cw: 96; --ch: 96; --topo: 0.448;"><span class="ptl-halo"></span><span class="ptl-sombra-chao"></span><span class="ptl-ergue"><span class="ptl-boia"><span class="ptl-pulo"><canvas width="96" height="96"></canvas></span></span></span><span class="ptl-faisca f1"></span><span class="ptl-faisca f2"></span><span class="ptl-nome">Metagross</span></span></div>
      <div class="ptl-fila ptl-fila-frente"><span class="ptl-pk pronto" data-pk="gengar" style="--x: 25; --cw: 64; --ch: 64; --topo: 0.453;"><span class="ptl-halo"></span><span class="ptl-sombra-chao"></span><span class="ptl-ergue"><span class="ptl-boia"><span class="ptl-pulo"><canvas width="64" height="64"></canvas></span></span></span><span class="ptl-faisca f1"></span><span class="ptl-faisca f2"></span><span class="ptl-nome">Gengar</span></span><span class="ptl-pk estrela pronto" data-pk="charizard" style="--x: 50; --cw: 64; --ch: 64; --topo: 0.250;"><span class="ptl-halo"></span><span class="ptl-sombra-chao"></span><span class="ptl-ergue"><span class="ptl-boia"><span class="ptl-pulo"><canvas width="64" height="64"></canvas></span></span></span><span class="ptl-faisca f1"></span><span class="ptl-faisca f2"></span><span class="ptl-nome">Charizard</span></span><span class="ptl-pk pronto" data-pk="tyranitar" style="--x: 75; --cw: 64; --ch: 96; --topo: 0.375;"><span class="ptl-halo"></span><span class="ptl-sombra-chao"></span><span class="ptl-ergue"><span class="ptl-boia"><span class="ptl-pulo"><canvas width="64" height="96"></canvas></span></span></span><span class="ptl-faisca f1"></span><span class="ptl-faisca f2"></span><span class="ptl-nome">Tyranitar</span></span></div>
      <div class="ptl-logo">
        <span class="ptl-bola">
          <span class="ptl-raios"></span>
          <span class="ptl-bola-gira" style="">
            <svg viewBox="0 0 180 180" focusable="false">
              <defs>
                <clipPath id="ptlb-miolo"><circle cx="90" cy="90" r="82.2"></circle></clipPath>
                <clipPath id="ptlb-face"><circle cx="89.5" cy="89.5" r="21.4"></circle></clipPath>
                <linearGradient id="ptlb-ceu" gradientUnits="userSpaceOnUse" x1="0" y1="-95" x2="0" y2="-36">
                  <stop offset="0" stop-color="#a6dcff"></stop><stop offset=".22" stop-color="#6cc0ff"></stop><stop offset="1" stop-color="#58b5ff"></stop>
                </linearGradient>
                <linearGradient id="ptlb-ceu-lado" gradientUnits="userSpaceOnUse" x1="-90" y1="0" x2="90" y2="0">
                  <stop offset="0" stop-color="#1f5fd0" stop-opacity="0"></stop><stop offset="1" stop-color="#1f5fd0" stop-opacity=".22"></stop>
                </linearGradient>
                <linearGradient id="ptlb-azul" gradientUnits="userSpaceOnUse" x1="-80" y1="0" x2="80" y2="0">
                  <stop offset="0" stop-color="#6385ff"></stop><stop offset=".45" stop-color="#5677fc"></stop><stop offset="1" stop-color="#3358e8"></stop>
                </linearGradient>
                <linearGradient id="ptlb-faixa" gradientUnits="userSpaceOnUse" x1="-80" y1="0" x2="80" y2="0">
                  <stop offset="0" stop-color="#5e2b39"></stop><stop offset=".5" stop-color="#480e1e"></stop><stop offset="1" stop-color="#3e0c1a"></stop>
                </linearGradient>
                <linearGradient id="ptlb-roxo1" gradientUnits="userSpaceOnUse" x1="-80" y1="0" x2="80" y2="0">
                  <stop offset="0" stop-color="#6a4cf6"></stop><stop offset=".45" stop-color="#5236db"></stop><stop offset="1" stop-color="#432abb"></stop>
                </linearGradient>
                <linearGradient id="ptlb-roxo2" gradientUnits="userSpaceOnUse" x1="-80" y1="0" x2="80" y2="0">
                  <stop offset="0" stop-color="#462cc6"></stop><stop offset="1" stop-color="#37229d"></stop>
                </linearGradient>
                <linearGradient id="ptlb-roxo3" gradientUnits="userSpaceOnUse" x1="-80" y1="0" x2="80" y2="0">
                  <stop offset="0" stop-color="#3434a4"></stop><stop offset="1" stop-color="#28287f"></stop>
                </linearGradient>
                <linearGradient id="ptlb-arco-dir" gradientUnits="userSpaceOnUse" x1="0" y1="20" x2="0" y2="135">
                  <stop offset="0" stop-color="#ffe443"></stop><stop offset=".45" stop-color="#d9c234"></stop><stop offset="1" stop-color="#94701f"></stop>
                </linearGradient>
                <linearGradient id="ptlb-arco-esq" gradientUnits="userSpaceOnUse" x1="0" y1="40" x2="0" y2="160">
                  <stop offset="0" stop-color="#ffe866"></stop><stop offset=".5" stop-color="#fbe04e"></stop><stop offset="1" stop-color="#e3cb36"></stop>
                </linearGradient>
              </defs>
              <circle cx="90" cy="90" r="90" fill="#3c0012"></circle>
              <circle cx="90" cy="90" r="88" fill="#f6dcc4"></circle>
              <circle cx="90" cy="90" r="85.4" fill="#480e1e"></circle>
              <g clip-path="url(#ptlb-miolo)">
                <g transform="translate(90 87.6) rotate(-11)">
                  <rect x="-110" y="-110" width="220" height="80" fill="url(#ptlb-ceu)"></rect>
                  <rect x="-110" y="-110" width="220" height="80" fill="url(#ptlb-ceu-lado)"></rect>
                  <rect x="-110" y="-36" width="220" height="33" fill="url(#ptlb-azul)"></rect>
                  <rect x="-110" y="-4.2" width="220" height="8.4" fill="url(#ptlb-faixa)"></rect>
                  <rect x="-110" y="4.2" width="220" height="37" fill="url(#ptlb-roxo1)"></rect>
                  <rect x="-110" y="41" width="220" height="24" fill="url(#ptlb-roxo2)"></rect>
                  <rect x="-110" y="65" width="220" height="50" fill="url(#ptlb-roxo3)"></rect>
                </g>
                <ellipse cx="58" cy="47.5" rx="18" ry="8.4" fill="#ddf0ff" transform="rotate(-7 58 47.5)"></ellipse>
              </g>
              <path d="M 133.37 19.23 A 83 83 0 0 1 157.57 138.20 L 144.14 128.62 A 66.5 66.5 0 0 0 124.75 33.30 Z" fill="url(#ptlb-arco-dir)" stroke="#480e1e" stroke-width="2.4" stroke-linejoin="round"></path>
              <path d="M 46.63 160.77 A 83 83 0 0 1 22.43 41.80 L 35.86 51.38 A 66.5 66.5 0 0 0 55.25 146.70 Z" fill="url(#ptlb-arco-esq)" stroke="#480e1e" stroke-width="2.4" stroke-linejoin="round"></path>
              <circle cx="89.5" cy="89.5" r="31" fill="#480e1e"></circle>
              <circle cx="89.5" cy="89.5" r="28.2" fill="#fdf3ec"></circle>
              <circle cx="89.5" cy="89.5" r="23.9" fill="#480e1e"></circle>
              <g clip-path="url(#ptlb-face)">
                <circle cx="89.5" cy="89.5" r="21.4" fill="#a4a4c5"></circle>
                <circle cx="89.5" cy="83.2" r="15" fill="#e4e4f2"></circle>
                <circle class="ptl-bola-luz" cx="89" cy="81.4" r="9" fill="#ffffff"></circle>
              </g>
            </svg>
          </span>
        </span>
        <span class="ptl-marca" data-txt="pokeidle.io"><span>pokeidle.io</span></span>
      </div>
      <div class="ptl-fx"></div>
      <div class="ptl-colecao hidden"></div>
    </div>

    <div class="portal-corpo">
      <!-- ---- carregando ---- -->
      <div class="carga hidden" id="carregando">
        <div class="carga-trilho">
          <div class="carga-fill" id="carga-fill" style="width: 100%;"></div>
        </div>
        <!-- O Pikachu corre em cima da barra, na ponta do que já carregou. Fica FORA do trilho
             porque o trilho recorta o que passa dele (`overflow: hidden`, por causa do
             preenchido arredondado) — e lá dentro o bicho aparecia cortado num sliver. -->
        <div class="carga-corredor" id="carga-corredor" style="left: calc(100% - 3px);"><canvas width="64" height="64" style="width: 46px; height: 46px; image-rendering: pixelated;"></canvas></div>
        <div class="carga-texto">
          <div class="carga-pct"><b id="carga-pct">100</b>%</div>
          <div class="carga-etapa" id="carga-etapa">desenhando os retratos…</div>
        </div>
      </div>

      <!-- ---- login ---- -->
      <div id="login" class="login hidden">
        <!-- O VIP de boas-vindas do Referral Especial: só aparece quando o `?ref=` é o link de um
             streamer com acordo (a resposta de `/affiliate/visita` diz, ver `anunciarVipDoLink`). -->
        <p class="login-vip-ref hidden" id="login-vip-ref" role="status"></p>
        <div class="login-abas" id="login-abas">
          <button class="login-aba on" data-aba="entrar" data-i18n="login.abaEntrar">Entrar</button>
          <button class="login-aba" data-aba="criar" data-i18n="login.abaCriar">Criar conta</button>
        </div>

        <form class="login-form" id="form-entrar" autocomplete="on">
          <label class="campo">
            <span data-i18n="login.usuarioOuEmail">Email ou Nome de Usuário</span>
            <span class="campo-linha">
              <span class="campo-bola" aria-hidden="true"></span>
              <input id="login-id" maxlength="64" autocomplete="username" data-i18n-attr="placeholder:login.usuarioPh" placeholder="seu_nick">
            </span>
          </label>
          <label class="campo">
            <span data-i18n="login.senha">senha</span>
            <span class="campo-linha">
              <span class="campo-bola" aria-hidden="true"></span>
              <input id="login-senha" type="password" maxlength="72" autocomplete="current-password" placeholder="••••••••">
            </span>
          </label>
          <!-- Desenhado pelo app.js quando o servidor manda uma site key — sem ela fica vazio. -->
          <div class="turnstile-wrap" id="turnstile-entrar"></div>
          <button class="login-acao" id="entrar" type="submit">
            <span data-i18n="login.logar">Logar</span>
            <span class="acao-mascote" id="acao-mascote" aria-hidden="true"></span>
          </button>
          <button class="login-link" id="abrir-esqueci" type="button" data-i18n="esq.link">Esqueci minha senha</button>
        </form>

        <!-- ---- esqueci minha senha ----
             Fica no MESMO quadro do login, e não numa página à parte, porque a volta é o
             caminho mais provável: quem lembra a senha no meio do caminho clica em "voltar" e
             está de novo no formulário que já conhece. -->
        <!-- `novalidate` de propósito: `type="email"` é o que dá o teclado com @ no celular,
             mas a validação nativa barraria o envio antes do nosso handler e a pessoa veria
             a bolha genérica do navegador em vez da frase que explica por que o nick não
             serve aqui. Sem o tipo, perde-se o teclado; sem o novalidate, perde-se a frase. -->
        <form class="login-form hidden" id="form-esqueci" autocomplete="on" novalidate="">
          <p class="login-aviso" data-i18n="esq.explica">Digite o e-mail da sua conta. Mandamos para lá um link para você escolher uma senha nova.</p>
          <!-- Só o e-mail: o nome de usuário é público e serviria para mandar e-mail para
               qualquer um que aparece no ranking. A regra mora no servidor; aqui é a tela
               contando a mesma coisa. -->
          <label class="campo">
            <span data-i18n="login.email">Email</span>
            <span class="campo-linha">
              <span class="campo-bola" aria-hidden="true"></span>
              <input id="esq-email" type="email" maxlength="120" autocomplete="email" data-i18n-attr="placeholder:login.emailPh" placeholder="voce@gmail.com">
            </span>
            <em data-i18n="esq.soEmail">O nome de usuário não serve aqui — precisa ser o e-mail.</em>
          </label>
          <div class="turnstile-wrap" id="turnstile-esqueci"></div>
          <button class="login-acao" id="esq-enviar" type="submit" data-i18n="esq.enviar">Enviar link</button>
          <p class="login-aviso login-aviso-dim hidden" id="esq-ok"></p>
          <button class="btn-apagado" id="esq-voltar" type="button" data-i18n="esq.voltar">Voltar para o login</button>
        </form>

        <!-- `novalidate` pelo motivo do #form-esqueci: a bolha nativa do navegador para um e-mail
             torto pularia o pop-up de aviso, que é quem explica o que está errado. -->
        <form class="login-form hidden" id="form-criar" autocomplete="on" novalidate="">
          <label class="campo hidden" id="cad-nick-wrap">
            <span data-i18n="login.usuario">Nome de Usuário</span>
            <span class="campo-linha">
              <span class="campo-bola" aria-hidden="true"></span>
              <input id="cad-nick" maxlength="16" autocomplete="username" data-i18n-attr="placeholder:login.usuarioPh" placeholder="seu_nick">
            </span>
            <em data-i18n="login.usuarioAjuda">3 a 16 letras, números ou _</em>
          </label>
          <label class="campo">
            <span data-i18n="login.email">Email</span>
            <span class="campo-linha">
              <span class="campo-bola" aria-hidden="true"></span>
              <input id="cad-email" type="email" maxlength="120" autocomplete="email" data-i18n-attr="placeholder:login.emailPh" placeholder="voce@gmail.com">
            </span>
            <em id="cad-email-ajuda" role="status" data-i18n="login.emailAjuda">Aceito: @gmail.com, @live.com, @yahoo.com ou @yahoo.com.br — sem "+" e, no Gmail, sem ponto antes do @</em>
          </label>
          <label class="campo">
            <span data-i18n="login.senha">senha</span>
            <span class="campo-linha">
              <span class="campo-bola" aria-hidden="true"></span>
              <input id="cad-senha" type="password" maxlength="72" autocomplete="new-password" placeholder="••••••••">
            </span>
            <em data-i18n="login.senhaAjuda">pelo menos 8 caracteres</em>
          </label>
          <label class="campo">
            <span data-i18n="login.senha2">Confirmar senha</span>
            <span class="campo-linha">
              <span class="campo-bola" aria-hidden="true"></span>
              <input id="cad-senha2" type="password" maxlength="72" autocomplete="new-password" placeholder="••••••••">
            </span>
          </label>
          <!-- O ACEITE DOS TERMOS: obrigatório. Sem ele o "Criar conta" não conclui e o aviso de conta
               diz por quê; o servidor também recusa o pedido sem a versão aceita
               (`login.termosObrigatorio`). É a caixa de marcar do aceite de compra (`.dia-aceite`), e não
               o interruptor da casa: o que se pede é um "li e concordo". Os dois links abrem os Termos
               em outra aba — o formulário continua aqui. -->
          <label class="dia-aceite cad-termos" id="cad-termos-wrap">
            <input type="checkbox" id="cad-termos">
            <span data-i18n-html="termos.declaracao">Tenho 18 anos ou mais e li e aceito os <a href="/terms" target="_blank" rel="noopener">Termos de Uso</a> e a <a href="/terms#privacidade" target="_blank" rel="noopener">Política de Privacidade</a></span>
          </label>
          <div class="turnstile-wrap" id="turnstile-criar"></div>
          <button class="login-acao" id="criar" type="submit" data-i18n="login.criarConta">Criar conta</button>
        </form>

        <!-- Entrar por provedor. Some sozinho quando nenhum está configurado no servidor. -->
        <div class="login-social" id="login-social">
          <div class="login-ou"><span data-i18n="login.ou">ou</span></div>
          <button class="social-btn discord" id="btn-discord" type="button">
            <span class="social-ico" aria-hidden="true"></span>
            <span data-i18n="login.comDiscord">Login com Discord</span>
          </button>
          <button class="social-btn google" id="btn-google" type="button">
            <span class="social-ico" aria-hidden="true"></span>
            <span data-i18n="login.comGoogle">Login com Google</span>
          </button>
        </div>

        <div id="login-erro" class="erro"></div>
      </div>

      <!-- ---- confirme seu e-mail ----
           Aparece no lugar do formulário depois de criar conta, e também quando alguém tenta
           entrar numa conta que ainda não confirmou. Não é um toast: é a tela inteira, porque
           é a única coisa que a pessoa pode fazer agora.

           Desde 16/10/2026 é um CÓDIGO, e não um link: a conta só nasce quando os 8 dígitos que
           foram para o e-mail são digitados AQUI, na aba que fez o cadastro (ver "o cadastro
           pendente" em server/auth.mjs). -->
      <div id="confirmar-email" class="confirma hidden">
        <div class="confirma-selo" aria-hidden="true">✉</div>
        <h2 data-i18n="conf.titulo">Confirme seu e-mail</h2>
        <p class="confirma-texto" id="confirma-texto"></p>
        <form class="confirma-form" id="form-codigo" autocomplete="off" novalidate="">
          <input class="confirma-codigo" id="confirma-codigo" type="text" inputmode="numeric" pattern="[0-9]*" autocomplete="one-time-code" spellcheck="false" placeholder="00000000" data-i18n-attr="aria-label:conf.codigoRotulo" aria-label="Código de 8 dígitos">
          <p class="confirma-erro" id="confirma-erro" role="alert"></p>
          <button class="login-acao" id="confirma-ok" type="submit" data-i18n="conf.confirmar">Confirmar</button>
        </form>
        <p class="confirma-ajuda" data-i18n="conf.spam">Não chegou? Veja a caixa de spam — o código vale por 1 hora.</p>
        <button class="btn-apagado" id="confirma-reenviar" type="button" data-i18n="conf.reenviar">Reenviar código</button>
        <button class="btn-apagado" id="confirma-voltar" type="button" data-i18n="conf.voltar">Voltar para o login</button>
      </div>

      <!-- ---- escolha do nick ----
           Para quem entrou por Google/Discord ou criou conta com e-mail: o nick só é decidido
           aqui, depois de autenticado. Fica no portal (e não no onboarding lá dentro) porque
           o nick É a chave do socket — ele precisa estar decidido antes de a conexão abrir. -->
      <div id="escolher-nick" class="login hidden">
        <p class="login-aviso" data-i18n="nick.explica">Escolha o nome com que os outros treinadores vão te ver. Escolha bem: depois o nick não se troca mais — só a equipe troca, em caso extremo.</p>
        <form class="login-form" id="form-nick" autocomplete="off">
          <label class="campo">
            <span data-i18n="login.usuario">Nome de Usuário</span>
            <span class="campo-linha">
              <span class="campo-bola" aria-hidden="true"></span>
              <input id="nick-novo" maxlength="16" autocomplete="off" placeholder="seu_nick">
            </span>
            <em data-i18n="login.usuarioAjuda">3 a 16 letras, números ou _</em>
          </label>
          <div class="nick-estado" id="nick-estado"></div>
          <button class="login-acao" id="nick-salvar" type="submit" data-i18n="nick.confirmar">Confirmar nome</button>
        </form>
      </div>
    </div>
  </div>

  <!-- O rodapé de fan game acompanha o portal: quem ainda não entrou tem de conseguir ler o
       aviso e abrir os termos ANTES de criar conta. -->
  <div class="rodape-fan">
    <span data-i18n="fan.aviso">Projeto de fã, sem fins de representação oficial. Pokemon é marca registrada de Nintendo, Game Freak, Creatures e The Pokemon Company — não somos afiliados a eles.</span>
    <a href="/terms" target="_blank" rel="noopener" data-i18n="fan.termos">Termos, Privacidade e Direitos</a>
  </div>
</div>
<div id="app" class="app">

  <!-- ─────────────────────────── esquerda: status ─────────────────────────── -->
  <aside class="col esq">
    <!-- sempre visíveis: treinador, pokemon em luta e a equipe -->
    <!-- Os `id="p-*"` daqui para baixo são as alças da montagem de CELULAR: é por eles que o
         `mobile.mjs` acha cada painel para movê-lo à gaveta certa. No desktop não fazem nada. -->
    <div class="painel treinador" id="p-treinador">
      <div class="tr-linha">
        <div class="tr-coluna-retrato">
          <div class="tr-retrato clicavel" id="tr-retrato" tabindex="0" role="button"><canvas width="64" height="64" style="width: 44px; height: 44px; image-rendering: pixelated;"></canvas></div>
          <button type="button" class="tr-guild tem-boost tem-guild" id="tr-guild" data-i18n-attr="title:tip.guild" title="RODELISMO · 31 GP"><svg class="gd-brasao" width="48" height="48" viewBox="0 0 64 64" aria-hidden="true">
    
    <path d="M32 4 L56 12 L56 38 Q56 54 32 60 Q8 54 8 38 L8 12 Z" fill="#ff006e" stroke="#1a1018" stroke-width="2"></path>
    <path d="M32 16 Q20 16 18 28 Q16 38 22 42 L22 48 L28 44 L32 48 L36 44 L42 48 L42 42 Q48 38 46 28 Q44 16 32 16 Z M26 28 A3 3 0 1 0 26.1 28 M38 28 A3 3 0 1 0 38.1 28" fill="#212529" stroke="#ffffff" stroke-width="1.5" stroke-linejoin="round"></path>
  </svg></button>
          <!-- Duas portas que não são "estado do treinador" e por isso não cabem na grade de
               moedas ao lado: uma leva para fora (votar no TopIdle) e a outra é ferramenta (a
               nota de um pokemon). Ficam na coluna do retrato, no mesmo quadrado de 54 px do
               brasão — a coluna é curta e sobrava vão embaixo dela.

               Os três ícones são PIXEL ART desde 15/10/2026, desenhados aqui pixel a pixel numa grade de
               30x30 (o arquivo é o 2x, `img/icone-*.png`): a urna do voto, a calculadora nas cores da
               Pokedex (o corpo vermelho, a lente azul e as três luzes) e a engrenagem prata. -->
          <button type="button" class="tr-quadro tr-quadro-voto tem-voto" id="btn-votar" data-i18n-attr="title:tip.votar" title="Vote no TopIdle e ganhe diamantes">
            <img class="tr-quadro-ico" src="/img/icone-voto.png" alt="" width="30" height="30">
          </button>
          <button type="button" class="tr-quadro" id="btn-calculadora" data-i18n-attr="title:tip.calculadora" title="Nota de 0 a 10 de um pokemon">
            <img class="tr-quadro-ico" src="/img/icone-calculadora.png" alt="" width="30" height="30">
          </button>
          <button type="button" class="tr-quadro" id="btn-amigos" data-i18n-attr="title:tip.amigos" title="Amigos">
            <!-- Os dois treinadores, o ícone que até 15/10/2026 era do RMT (o RMT ganhou o da Gema). O ponto
                 rosa no canto, quando há pedido pendente ou DM não lida, continua vindo do CSS. -->
            <img class="tr-quadro-ico" src="/assets/site/assets/ui/menu-comunidade.png" alt="" width="30" height="30">
          </button>
          <!-- A MOCHILA (19/10/2026): era um botão largo embaixo do rank, com o nome escrito; virou um quadrado
               desta coluna, logo abaixo dos Amigos, só com o desenho (o nome fica no `title`). No celular a coluna
               não aparece, e a Mochila continua sendo a aba da barra de baixo. -->
          <button type="button" class="tr-quadro" id="btn-bolsa" data-i18n-attr="title:tip.bolsa" title="Mochila — bolas, itens raros, pedras e oficinas">
            <img class="tr-quadro-ico" src="/img/itens/mochila.png" alt="" width="30" height="30">
          </button>
          <button type="button" class="tr-quadro" id="btn-config" data-i18n-attr="title:tip.config" title="Configurações">
            <img class="tr-quadro-ico" src="/img/icone-config.png" alt="" width="30" height="30">
          </button>
        </div>
        <div class="tr-dados">
          <div class="tr-topo">
            <span class="tr-nick" id="tr-nick">Jakend</span>
            <span class="tr-lv"><span data-i18n="painel.nivelCurto">Nv</span> <b id="tr-level">325</b></span>
          </div>
          <div class="barra xp"><div class="fill" id="tr-xp-fill" style="width: 58.2257%;"></div><span id="tr-xp-txt">3.046.774 / 5.232.700 xp</span></div>
          <!-- As TRÊS moedas, lado a lado. O diamante voltou junto com um sprite próprio: a
               gema (ex-ORB) usava o mesmo orbe azul, e os dois contadores na mesma linha eram
               indistinguíveis. Agora são um diamante gelo e uma gema rosa. -->
          <div class="tr-moedas">
            <span class="tr-moeda" data-i18n-attr="title:tip.ouro" title="Ouro" id="tr-gold-box"><span class="tr-moeda-ico" style="height: 20px; width: 20px;"><img src="/assets/site/assets/ui/moeda-ouro.png" alt="" style="height: 20px; width: 20px; object-fit: contain;"></span><b id="tr-gold">813.869.819</b></span>
            <span class="tr-moeda" data-i18n-attr="title:tip.diamantes" title="Diamantes" id="tr-diamantes-box"><span class="tr-moeda-ico" style="height: 20px; width: 20px;"><img src="/img/moeda-diamante.png" alt="" style="height: 36px; width: 36px; object-fit: contain;"></span><b id="tr-diamantes">26</b></span>
            <span class="tr-moeda" data-i18n-attr="title:tip.gemas" title="Gemas — a moeda do Mercado da Comunidade" id="tr-gemas-box"><span class="tr-moeda-ico" style="height: 20px; width: 20px;"><img src="/img/moeda-gema.png" alt="" style="height: 36px; width: 36px; object-fit: contain;"></span><b id="tr-gemas">0</b></span>
            <button type="button" id="btn-afiliados" class="tr-moeda tr-afiliado" data-i18n-attr="title:tip.afiliados" title="Indique &amp; ganhe — convide amigos">
              <img src="/img/menu-afiliados.png" alt="" width="20" height="20">
              <span data-i18n="modal.afiliados">Indique &amp; Ganhe</span>
            </button>
          </div>
          <!-- O QUE ESTÁ ATIVO AGORA: o VIP e cada boost correndo, um por linha, com o tempo
               que falta contando ao lado.

               Fica logo abaixo das moedas de propósito. Boost é coisa comprada e que ACABA —
               antes o único lugar que mostrava isso era a faixa dentro da Loja, ou seja, o
               jogador só descobria que o XP Boost tinha vencido quando ia comprar outro. Aqui
               ele está no campo de visão o tempo todo, do lado do saldo que o pagou. -->
          <div class="tr-ativos" id="tr-ativos" data-assinatura="0|-|1802082507179|1796640133420||-|0|10|1794788452548:Rodil|1:jakendly:0,0,0:rodil=Rodil+clovaobengala=ClovaoBengala+cogu=cogu+guaxilol1=Guaxilol1+dersin2k=dersin2k+denissnidertv=DenisSniderTV+faturetosl=FaturetoSL+mecmeno=mecmeno+daniels=Daniels+surskity11=Surskity11|1:Jakendly:0,0,0:yetz=yetz+clovaobengalalol=clovaobengalalol+biscoitao=Biscoitao+cogu=cogu+dersin2k=dersin2k+mecmeno=mecmeno+surskity=surskity+denissnider=DenisSnider+revolta=Revolta+daniels=daniels+yoda=YoDa+fnblol=fNblol"><div class="tr-ativo vip" title="VIP ativo · +50% XP · VIP até 08/02/2027, 07:28:27">
      <span class="selo-vip">VIP</span>
      <span class="tr-ativo-nome">+50% XP</span>
      <span class="tr-ativo-tempo" data-ate="1802082507179" data-dias="1">91 dias</span></div><button type="button" class="tr-ativo passe-vip" title="Passe Premium até 07/12/2026, 07:42:13 · clique para abrir o Passe">
      <img class="tr-ativo-passe" src="/img/passe-vip.png" width="28" height="19" alt="">
      <span class="tr-ativo-nome">Passe Premium</span>
      <span class="tr-ativo-tempo" data-ate="1796640133420" data-dias="1">28 dias</span></button><button type="button" class="tr-ativo guild-boost" title="+10% de XP do treinador e do pokemon para a guild inteira, até 15/11, 21:20. Bancado por: Rodil (560), RMGaspar (153), MESTRE_DAS_BOLAS (30) +3. Clique para abrir o banco.">
    <img src="/img/itens/boost-guild-32.png" width="16" height="16" alt="">
    <span class="tr-ativo-nome">Boost Guild <b class="gb-pct">+10% XP</b></span>
    <span class="tr-ativo-tempo" data-ate="1794788452548" data-curto="1">7d</span></button><button type="button" class="tr-ativo twitch tw-aovivo" title="Ao vivo agora na Twitch: Rodil, ClovaoBengala, cogu, Guaxilol1, dersin2k, DenisSniderTV, FaturetoSL, mecmeno, Daniels, Surskity11. Assista na página do canal e troque os pontos do canal por horas de +15%. Clique para ver." aria-label="Twitch ao vivo — Ao vivo agora na Twitch: Rodil, ClovaoBengala, cogu, Guaxilol1, dersin2k, DenisSniderTV, FaturetoSL, mecmeno, Daniels, Surskity11. Assista na página do canal e troque os pontos do canal por horas de +15%. Clique para ver."><svg class="tw-glifo" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"></path></svg><span class="tr-ativo-nome">Twitch ao vivo</span><span class="tr-ativo-valor"><i class="tw-ponto" aria-hidden="true"></i>assista</span></button><button type="button" class="tr-ativo kick kk-aovivo" title="Ao vivo agora na Kick: yetz, clovaobengalalol, Biscoitao, cogu, dersin2k, mecmeno, surskity, DenisSnider, Revolta, daniels, YoDa, fNblol. Assista e troque os pontos do canal por horas de +15%. Clique para ver." aria-label="Kick ao vivo — Ao vivo agora na Kick: yetz, clovaobengalalol, Biscoitao, cogu, dersin2k, mecmeno, surskity, DenisSnider, Revolta, daniels, YoDa, fNblol. Assista e troque os pontos do canal por horas de +15%. Clique para ver."><svg class="kk-glifo" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M1.5 0h8v5.3h2.7V2.7h2.6V0h8v8h-2.6v2.7h-2.7v2.6h2.7V16h2.6v8h-8v-2.7h-2.6v-2.6H9.5V24h-8z"></path></svg><span class="tr-ativo-nome">Kick ao vivo</span><span class="tr-ativo-valor"><i class="tw-ponto" aria-hidden="true"></i>assista</span></button></div>
          <!-- Uma linha por informação: com tudo na mesma, o contador de online era o
               primeiro a estourar a largura do painel. -->
          <div class="tr-info" data-i18n-attr="title:tip.online" title="Treinadores online agora" id="tr-online-box"><img src="/assets/site/assets/ui/ball-poke.png" alt="" style="height: 14px; width: 14px; object-fit: contain;">
            <b id="tr-online">29967</b> <span data-i18n="painel.online">online</span>
          </div>
          <!-- O RANK do PvP. Fica visível sempre, e não só dentro da aba, porque é uma
               progressão do treinador como o nível — e porque o emblema é a coisa que faz
               alguém querer o próximo. Clicar abre o PvP na aba ranqueada.

               Durante as partidas de posicionamento não há emblema: o `?` é honesto, e
               mostrar "Ouro II" antes de o jogador ter provado qualquer coisa seria um
               número que ele não ganhou. -->
          <button type="button" class="tr-info tr-rank sem-rank" id="tr-rank-box" data-i18n-attr="title:tip.rank" title="Seu rank no PvP ranqueado">
            <img class="tr-rank-emblema hidden" id="tr-rank-emblema" alt="" aria-hidden="true">
            <span class="tr-rank-vazio" id="tr-rank-vazio">?</span>
            <span class="tr-rank-txt">
              <b id="tr-rank-nome">Não classificado</b>
              <!-- O relógio da queda por inatividade vai na MESMA linha dos pontos: só Challenger
                   e Mestre o têm, e uma terceira linha mudaria a altura da ficha só para eles. -->
              <span class="tr-rank-linha">
                <em id="tr-rank-pr"></em>
                <em class="tr-rank-decai hidden" id="tr-rank-decai"></em>
              </span>
            </span>
          </button>
        </div>
      </div>
    </div>

    <div class="painel" id="p-ativo">
      <div class="painel-cab">
        <h3 data-i18n="painel.emCampo">Em campo</h3>
        <!-- REFINO: o "+" que abre a bancada de stats-base do pokemon em campo. Fica ao lado do
             botão de chat porque as duas são ações SOBRE o bicho do cabeçalho — e porque é o
             lugar em que o jogador já olha quando quer mexer nele. -->
        <button type="button" id="btn-refino-pk" class="btn-compartilhar-pk btn-refino" data-i18n-attr="title:refino.botao;aria-label:refino.botao" title="Refinar stats-base" aria-label="Refinar stats-base">
          <svg class="ico-mais" viewBox="0 0 24 24" aria-hidden="true"><path d="M10.5 4h3v6.5H20v3h-6.5V20h-3v-6.5H4v-3h6.5z" fill="currentColor"></path></svg>
        </button>
        <button type="button" id="btn-compartilhar-pk" class="btn-compartilhar-pk" title="Compartilhar no chat" aria-label="Compartilhar no chat">
          <svg class="ico-chat" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H9l-5 4V6a2 2 0 0 1 2-2z" fill="currentColor"></path><circle cx="8" cy="11" r="1.2" fill="var(--vao)"></circle><circle cx="12" cy="11" r="1.2" fill="var(--vao)"></circle><circle cx="16" cy="11" r="1.2" fill="var(--vao)"></circle></svg>
        </button>
      </div>
      <!-- As CASAS EM USO, uma por ícone, na cor da raridade (cinza com X = vazia), numa faixa PRÓPRIA logo
           abaixo do título: ao lado dele, com o "+" e o chat, cinco casas não cabem na coluna de 288 px (no
           cabeçalho da Equipe, onde moraram primeiro, empurravam o botão de recolher para fora). Entram por JS
           (`pintarCasasEmUso`); quem não tem casa em uso não vê nada. -->
      <div class="eq-casas" id="eq-casas" role="group" data-i18n-attr="aria-label:casa.iconesDica" hidden="" aria-label="Suas casas em uso" data-assinatura="[&quot;pt-BR&quot;,[]]"></div>
      <button type="button" class="pih-btn pih-barra" title="Onde caçar? — as melhores hunts para o seu pokémon em campo" aria-label="Onde caçar? — as melhores hunts para o seu pokémon em campo">/hunt</button><div id="ativo-card" class="ativo-card" data-i18n="painel.semAtivo" title="clique para ver a ficha completa"><canvas width="64" height="64" style="width: 48px; height: 48px; image-rendering: pixelated;"></canvas>
    <div class="ativo-info">
      <div class="ativo-nome">Charizard <span class="pl-lv">Nv 314</span></div>
      <div class="ativo-sub"><span class="tipo FIRE">FIRE</span><span class="tipo FLYING">FLYING</span>   poder 1.231</div>
      <span class="pk-selos"><span class="cm-pot p2" title="Poder 2 — este pokemon tem +5% em todos os atributos">P2</span><span class="pk-selo pk-selo-iv t3" title="IV 162 de 192 — 84% do teto. Soma dos seis stats sorteada na captura; nunca muda.">IV 162</span><span class="pk-selo pk-selo-q t5" title="Qualidade 1,600 — só 1% dos pokemon nascem igual ou melhor. Multiplica todos os stats.">Q 1,600</span><span class="pk-selo pk-selo-n t2" title="Nota 3,704 de 10 — mesma força do ⚔@100, dentro desta espécie (IV, qualidade, potência e shiny). Abaixo de 3.5 não entra no Mercado da Comunidade.">N 3,704</span></span>
      <div class="barra hp ">
        <div class="fill" style="width:90.18382352941177%"></div><span>7359 / 8160</span>
      </div>
      <div class="barra xp"><div class="fill" style="width:23.68762415777509%"></div><span>1.156.643 / 4.882.900 xp</span></div>
    </div></div>
      <button type="button" id="btn-evoluir" class="btn-evoluir hidden" data-i18n="painel.evoluir">Evoluir</button>
      <!-- MEGA EVOLUIR. Botão SEPARADO do Evoluir de propósito: são duas moedas diferentes (a
           pedra de tipo contra a Mega Stone daquela espécie) e dois destinos diferentes, e um
           botão só que mudasse de significado conforme o bicho seria a forma mais rápida de
           alguém gastar a pedra errada. A cor dourada é a da áurea das Mega Shiny Stones. -->
      <button type="button" id="btn-mega" class="btn-evoluir btn-mega" data-i18n="painel.mega">Mega Evoluir</button>
    </div>

    <div class="painel" id="p-equipe">
      <div class="painel-cab painel-cab-equipe">
        <h3><img class="ico-equipe" src="/assets/site/assets/ui/ball-poke.png" alt="" width="18" height="18"><span data-i18n="painel.equipe">Equipe</span> <span class="cnt" id="time-cnt">5/5</span></h3>
        <button type="button" id="btn-equipe-toggle" class="btn-painel-toggle" aria-expanded="true" data-i18n-attr="title:tip.equipeRecolher;aria-label:tip.equipeRecolher" title="Recolher equipe" aria-label="Recolher equipe">
          <svg class="ico-chevron" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 10l5 5 5-5z" fill="currentColor"></path></svg>
        </button>
      </div>
      <div id="time-corpo" class="painel-corpo-equipe">
        <div id="time" class="lista-poke"><div class="poke-linha ativo" data-id="99849191" title="poder 1231 · qualidade 1.6 · II · FIRE/FLYING
clique para colocar em campo"><canvas width="64" height="64" style="width: 28px; height: 28px; image-rendering: pixelated;"></canvas>
    <div class="pl-info">
      <div class="pl-cabeca"><div class="pl-nome">Charizard  <span class="pl-lv">Nv314</span> <span class="pl-colecao-marca" title="Da sua Coleção — o botão da Coleção o devolve para ela ao sair da equipe">★</span></div><span class="pk-selos compacto"><span class="cm-pot p2" title="Poder 2 — este pokemon tem +5% em todos os atributos">P2</span><span class="pk-selo pk-selo-iv t3" title="IV 162 de 192 — 84% do teto. Soma dos seis stats sorteada na captura; nunca muda.">IV 162</span><span class="pk-selo pk-selo-q t5" title="Qualidade 1,600 — só 1% dos pokemon nascem igual ou melhor. Multiplica todos os stats.">Q 1,600</span><span class="pk-selo pk-selo-n t2" title="Nota 3,704 de 10 — mesma força do ⚔@100, dentro desta espécie (IV, qualidade, potência e shiny). Abaixo de 3.5 não entra no Mercado da Comunidade.">N 3,704</span></span></div>
      <div class="mini-hp "><i style="width:90.18382352941177%"></i></div>
      <div class="mini-xp" title="1.156.643 / 4.882.900 xp"><i style="width:23.68762415777509%"></i></div>
    </div>
    <div class="pl-acoes">
      <button class="pl-ficha" type="button" title="Ver ficha">i</button>
      
    </div></div><div class="poke-linha" data-id="108427271" title="poder 191 · qualidade 1.121 · I · BUG/STEEL
clique para colocar em campo"><canvas width="64" height="64" style="width: 28px; height: 28px; image-rendering: pixelated;"></canvas>
    <div class="pl-info">
      <div class="pl-cabeca"><div class="pl-nome">Furious Scizor  <span class="pl-lv">Nv100</span></div><span class="pk-selos compacto"><span class="cm-pot p1" title="Potência 1 — comum, sem bônus de atributos">P1</span><span class="pk-selo pk-selo-iv t1" title="IV 81 de 192 — 40% do teto. Soma dos seis stats sorteada na captura; nunca muda.">IV 81</span><span class="pk-selo pk-selo-q t2" title="Qualidade 1,121 — só 52% dos pokemon nascem igual ou melhor. Multiplica todos os stats.">Q 1,121</span><span class="pk-selo pk-selo-n t1" title="Nota 1,805 de 10 — mesma força do ⚔@100, dentro desta espécie (IV, qualidade, potência e shiny). Abaixo de 3.5 não entra no Mercado da Comunidade.">N 1,805</span></span></div>
      <div class="mini-hp "><i style="width:100%"></i></div>
      <div class="mini-xp" title="0 / 485.200 xp"><i style="width:0%"></i></div>
    </div>
    <div class="pl-acoes">
      <button class="pl-ficha" type="button" title="Ver ficha">i</button>
      
    </div></div><div class="poke-linha" data-id="108459723" title="poder 119 · qualidade 0.833 · I · BUG/STEEL
clique para colocar em campo"><canvas width="64" height="64" style="width: 28px; height: 28px; image-rendering: pixelated;"></canvas>
    <div class="pl-info">
      <div class="pl-cabeca"><div class="pl-nome">Furious Scizor  <span class="pl-lv">Nv100</span></div><span class="pk-selos compacto"><span class="cm-pot p1" title="Potência 1 — comum, sem bônus de atributos">P1</span><span class="pk-selo pk-selo-iv t1" title="IV 92 de 192 — 46% do teto. Soma dos seis stats sorteada na captura; nunca muda.">IV 92</span><span class="pk-selo pk-selo-q t1" title="Qualidade 0,833 — só 98% dos pokemon nascem igual ou melhor. Multiplica todos os stats.">Q 0,833</span><span class="pk-selo pk-selo-n t1" title="Nota 1,078 de 10 — mesma força do ⚔@100, dentro desta espécie (IV, qualidade, potência e shiny). Abaixo de 3.5 não entra no Mercado da Comunidade.">N 1,078</span></span></div>
      <div class="mini-hp "><i style="width:100%"></i></div>
      <div class="mini-xp" title="0 / 485.200 xp"><i style="width:0%"></i></div>
    </div>
    <div class="pl-acoes">
      <button class="pl-ficha" type="button" title="Ver ficha">i</button>
      
    </div></div><div class="poke-linha" data-id="108461962" title="poder 204 · qualidade 1.024 · I · BUG/STEEL
clique para colocar em campo"><canvas width="64" height="64" style="width: 28px; height: 28px; image-rendering: pixelated;"></canvas>
    <div class="pl-info">
      <div class="pl-cabeca"><div class="pl-nome">Furious Scizor  <span class="pl-lv">Nv100</span></div><span class="pk-selos compacto"><span class="cm-pot p1" title="Potência 1 — comum, sem bônus de atributos">P1</span><span class="pk-selo pk-selo-iv t2" title="IV 122 de 192 — 62% do teto. Soma dos seis stats sorteada na captura; nunca muda.">IV 122</span><span class="pk-selo pk-selo-q t1" title="Qualidade 1,024 — só 82% dos pokemon nascem igual ou melhor. Multiplica todos os stats.">Q 1,024</span><span class="pk-selo pk-selo-n t1" title="Nota 1,938 de 10 — mesma força do ⚔@100, dentro desta espécie (IV, qualidade, potência e shiny). Abaixo de 3.5 não entra no Mercado da Comunidade.">N 1,938</span></span></div>
      <div class="mini-hp "><i style="width:100%"></i></div>
      <div class="mini-xp" title="0 / 485.200 xp"><i style="width:0%"></i></div>
    </div>
    <div class="pl-acoes">
      <button class="pl-ficha" type="button" title="Ver ficha">i</button>
      
    </div></div><div class="poke-linha" data-id="108472485" title="poder 265 · qualidade 1.181 · I · BUG/STEEL
clique para colocar em campo"><canvas width="64" height="64" style="width: 28px; height: 28px; image-rendering: pixelated;"></canvas>
    <div class="pl-info">
      <div class="pl-cabeca"><div class="pl-nome">Furious Scizor  <span class="pl-lv">Nv100</span></div><span class="pk-selos compacto"><span class="cm-pot p1" title="Potência 1 — comum, sem bônus de atributos">P1</span><span class="pk-selo pk-selo-iv t3" title="IV 147 de 192 — 76% do teto. Soma dos seis stats sorteada na captura; nunca muda.">IV 147</span><span class="pk-selo pk-selo-q t2" title="Qualidade 1,181 — só 40% dos pokemon nascem igual ou melhor. Multiplica todos os stats.">Q 1,181</span><span class="pk-selo pk-selo-n t1" title="Nota 2,557 de 10 — mesma força do ⚔@100, dentro desta espécie (IV, qualidade, potência e shiny). Abaixo de 3.5 não entra no Mercado da Comunidade.">N 2,557</span></span></div>
      <div class="mini-hp "><i style="width:100%"></i></div>
      <div class="mini-xp" title="0 / 485.200 xp"><i style="width:0%"></i></div>
    </div>
    <div class="pl-acoes">
      <button class="pl-ficha" type="button" title="Ver ficha">i</button>
      
    </div></div></div>
      </div>
    </div>

  </aside>

  <!-- ────────────────────────────── centro: jogo ───────────────────────────── -->
  <main class="col centro">
    <!-- os ícones entram por JS: são recortes do atlas de marcadores e os sprites de bola -->
    <nav class="menu-topo">
      <button data-modal="pokedex" data-ico="img:site/assets/ui/menu-pokedex.png" data-ico-px="20" data-ico-feito="1"><img src="/assets/site/assets/ui/menu-pokedex.png" alt="" style="height: 20px; width: 20px; object-fit: contain;"><span data-i18n="menu.pokedex">Pokedex</span><i class="tc-selo" title="Você pontuou +1 no Top Catch desde que abriu o painel pela última vez">+1</i></button>
      <button data-modal="mapa" data-ico="img:site/assets/ui/menu-mapa.png" data-ico-px="20" data-ico-feito="1"><img src="/assets/site/assets/ui/menu-mapa.png" alt="" style="height: 20px; width: 20px; object-fit: contain;"><span data-i18n="menu.mapa">Mapa</span></button>
      <button data-modal="market" data-ico="img:site/assets/ui/menu-market.png" data-ico-px="20" data-ico-feito="1"><img src="/assets/site/assets/ui/menu-market.png" alt="" style="height: 20px; width: 20px; object-fit: contain;"><span data-i18n="menu.market">Market</span></button>
      <!-- PASSE DE BATALHA — a trilha de 30 dias de login. Colado no Market porque é a outra
           porta de "o que eu ganho hoje". O cartão é o Armor Pass do pokesprite (o VIP é o Crown
           Pass), versionado em `img/`. O selo `.tem-premio` acende quando há resgate esperando. -->
      <button data-modal="passe" data-ico="img:/img/passe-free.png" data-ico-px="20" data-ico-feito="1"><img src="/img/passe-free.png" alt="" style="height: 20px; width: 20px; object-fit: contain;"><span data-i18n="menu.passe">Passe</span></button>
      <!-- A COROA nos Ranks e o TROFÉU no Campeonato, e não o contrário: coroa é quem está
           no topo AGORA (o placar, que muda todo dia), troféu é o que se leva para casa
           depois de ganhar um torneio. -->
      <button data-modal="ranking" data-ico="img:/img/menu-ranks.png" data-ico-px="20" data-ico-feito="1"><img src="/img/menu-ranks.png" alt="" style="height: 20px; width: 20px; object-fit: contain;"><span data-i18n="menu.ranking">Ranks</span></button>
      <button data-modal="bosses" data-ico="img:site/assets/ui/menu-bosses.png" data-ico-px="20" data-ico-feito="1"><img src="/assets/site/assets/ui/menu-bosses.png" alt="" style="height: 20px; width: 20px; object-fit: contain;"><span data-i18n="menu.bosses">Boss</span></button>
      <!-- MINI GAMES — uma rodada nova a cada 2 minutos, para todo mundo (descobrir o Pokemon pelo recorte, pela
           sombra ou pelas pistas da Pokedex). Fica ENTRE o Boss e o PvP, e não depois dele: o PvP, o Ginásio e o
           Torneio são o trio da competição, e o comentário do Ginásio (logo abaixo) pede que o Ginásio fique colado
           no PvP. O ícone é o Lucky Punch do pokesprite, aparado e versionado em `img/` (como o do PvP). -->
      <button data-modal="minigames" data-ico="img:/img/menu-minigames.png" data-ico-px="20" data-ico-feito="1"><img src="/img/menu-minigames.png" alt="" style="height: 20px; width: 20px; object-fit: contain;"><span data-i18n="menu.minigames">Mini Games</span></button>
      <button data-modal="pvp" data-ico="img:/img/menu-pvp.png" data-ico-px="20" data-ico-feito="1"><img src="/img/menu-pvp.png" alt="" style="height: 20px; width: 20px; object-fit: contain;"><span data-i18n="menu.pvp">PvP</span></button>
      <!-- GINÁSIO — os 18 ginásios de tipo, disputados entre jogadores. Fica colado no PvP
           porque é a outra metade da mesma coisa: aqui também se briga por posição. -->
      <button data-modal="ginasios" data-ico="img:/img/menu-ginasio.png" data-ico-px="20" data-ico-feito="1"><img src="/img/menu-ginasio.png" alt="" style="height: 20px; width: 20px; object-fit: contain;"><span data-i18n="menu.ginasios">Ginásio</span></button>
      <!-- CAMPEONATO — o torneio com premiação em dinheiro; ainda não é jogável, a aba só
           anuncia o formato e os prêmios. Fecha o trio da COMPETIÇÃO: PvP (1v1 ranqueado),
           Ginásio (o título de um tipo) e aqui, que é a briga com dinheiro na mesa.
           O arquivo do espelho ainda se chama `menu-ranking.png` porque é de lá que ele vem
           (ver `tools/fetch-ui-icons.mjs`); quem usa o troféu hoje é ESTE botão. -->
      <button data-modal="campeonato" data-ico="img:site/assets/ui/menu-ranking.png" data-ico-px="20" data-ico-feito="1"><img src="/assets/site/assets/ui/menu-ranking.png" alt="" style="height: 20px; width: 20px; object-fit: contain;"><span data-i18n="menu.campeonato">Torneio</span></button>
      <!-- CASA — abre as casas do jogador (número, postos, porta) e o registro do servidor. -->
      <button data-modal="casa" data-ico="img:/img/itens/casa-rara.png" data-ico-px="20" data-ico-feito="1"><img src="/img/itens/casa-rara.png" alt="" style="height: 20px; width: 20px; object-fit: contain;"><span data-i18n="menu.casa">Casa</span></button>
      <!-- RMT: a Gema (15/10/2026), RECORTADA — o `moeda-gema.png` tem 32 px com o desenho em 18x15 no meio, e ao lado
           dos outros ícones ela ficava miúda. -->
      <button data-modal="community" data-ico="img:/img/menu-gema.png" data-ico-px="20" data-ico-feito="1"><img src="/img/menu-gema.png" alt="" style="height: 20px; width: 20px; object-fit: contain;"><span data-i18n="menu.comunidade">RMT</span></button>
      <!-- SHOP: o diamante RECORTADO, pelo mesmo motivo da Gema do RMT logo acima (15/10/2026). -->
      <button data-modal="shop" data-ico="img:/img/menu-diamante.png" data-ico-px="20" data-ico-feito="1"><img src="/img/menu-diamante.png" alt="" style="height: 20px; width: 20px; object-fit: contain;"><span data-i18n="menu.shop">Shop</span></button>
      <!-- O manual fecha a barra: é a aba que se abre uma vez para entender o jogo, não a
           cada sessão. O ícone é um LIVRO, e não o Poke Radar da Pokedex ao lado — as duas
           são coisas diferentes e precisam parecer diferentes. -->
      <button data-modal="pokepedia" data-ico="img:/img/menu-pokepedia.png" data-ico-px="20" data-ico-feito="1"><img src="/img/menu-pokepedia.png" alt="" style="height: 20px; width: 20px; object-fit: contain;"><span data-i18n="menu.pokepedia">Wiki</span></button>
    </nav>

    <div class="palco-moldura">
      <div class="palco hunt-ativa" id="palco" data-zoom="1">
        <canvas id="cena" width="1267" height="749"></canvas>

        <!-- MODO ECONOMIA — o palco SEM cena.
             O canvas para de ser desenhado, o mapa e os sprites saem da memória e o servidor
             deixa de mandar o campo (ver `cliente.economia` no protocolo). No lugar da batalha
             fica o que um jogo idle de fato se acompanha: quanto está rendendo por hora e o
             que foi capturado. O farm continua igual do lado de lá — isto é tela, não jogo.

             A caixa nasce VAZIA: o placar, os achados e o cofre são montados pelo app.js
             (`montarEconomia`), e o histórico (`#capturas-painel`) é MOVIDO para cá — o mesmo nó
             do canto da cena, como o `mobile.mjs` faz com os painéis das gavetas. Quem acende é
             a classe `modo-economia` no `<html>` (ver `preferencias.mjs`). -->
        <div class="eco-painel" id="eco-painel" aria-hidden="true">
          <div class="eco-topo">
            <span class="eco-selo" data-i18n="eco.titulo" data-i18n-attr="title:eco.nota" title="A cena está desligada. A caça continua no servidor — o que ela rende aparece aqui.">Modo Economia</span>
            <!-- ONDE SE ESTÁ e COMO SAIR DALI, numa peça só — a plaquinha da hunt com os botões de
                 saída do canto da cena (`#hunt-saida`), que este modo esconde junto com o palco.
                 São os MESMOS comandos e a mesma trava: "Ir para o Centro Pokemon" espera os 3 s
                 sem dano e "Desistir do Combate" pergunta antes, com o XP que vai custar.

                 No Centro, a vaga passa para a Enfermeira Joy: curar é a única coisa da praça sem a
                 qual não se volta a caçar, e sem a cena não haveria em quem tocar. Na arena do BOSS,
                 para o "Abandonar arena" (a mesma pergunta do botão da cena: a entrada não volta).
                 Quem mostra cada um é o app.js (`pintarHudCena` e `pintarCentro`); no celular eles
                 viram os mesmos quadrados de ícone da cena, ao lado da plaquinha.

                 A plaquinha em si abre a FICHA da espécie da hunt, como a da cena; fora de hunt, o
                 Mapa. O título dela é do app.js (`pintarOndeEconomia`), porque muda com o lugar. -->
            <div class="eco-lugar">
              <button type="button" class="eco-onde" id="eco-onde" title="Abrir a ficha de Spinarak na Pokedex">Spinarak · nível 230</button>
              <button type="button" class="eco-saida-bt eco-ir-centro" id="eco-ir-centro" data-i18n-attr="title:cena.irAoCentro" title="Ir para o Centro Pokemon" disabled="">
                <span class="eco-saida-longo" data-i18n="cena.irAoCentro">Ir para o Centro Pokemon</span>
                <span class="eco-saida-curto" data-i18n="cena.irAoCentroCurto">Centro Pokemon</span>
                <span class="eco-saida-conta" id="eco-ir-centro-conta">3s</span>
              </button>
              <button type="button" class="eco-saida-bt eco-desistir" id="eco-desistir" data-i18n-attr="title:cena.desistirCombate" title="Desistir do Combate">
                <span class="eco-saida-longo" data-i18n="cena.desistirCombate">Desistir do Combate</span>
                <span class="eco-saida-curto" data-i18n="cena.desistirCombateCurto">Desistir</span>
              </button>
              <button type="button" class="eco-saida-bt eco-abandonar hidden" id="eco-abandonar" data-i18n-attr="title:tip.bossSair" title="A entrada paga não é devolvida">
                <span class="eco-saida-rot" data-i18n="cena.abandonarArena">Abandonar arena</span>
              </button>
              <button type="button" class="eco-saida-bt eco-curar hidden" id="eco-curar" data-i18n-attr="title:cena.centroCurar" title="Curar equipe">
                <span class="eco-saida-rot" data-i18n="cena.centroCurar">Curar equipe</span>
              </button>
            </div>
            <!-- A JANELINHA DOS NÚMEROS — o botão do Modo Pop-up mora no palco, que este modo
                 esconde. Aqui ele abre a mesma janelinha sem a cena: só o ritmo, flutuando por
                 cima dos outros apps (a bolha do Android). Quem liga e quem o esconde onde não
                 há janelinha do sistema é `popup.mjs`. -->
            <button type="button" class="eco-pip" id="eco-pip" data-i18n-attr="title:eco.pip" title="Janelinha flutuante com estes números — fica por cima dos outros apps">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4 4h16a1 1 0 0 1 1 1v6h-2V6H5v12h5v2H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z" fill="currentColor"></path>
                <path d="M12 12h9a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-9a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1zm1 2v5h7v-5h-7z" fill="currentColor"></path>
              </svg>
            </button>
            <button type="button" class="eco-sair" id="eco-sair" data-i18n="eco.sair">Ligar a cena</button>
          </div>
          <!-- O CORPO, numa grade que a LARGURA do painel decide (container query, ver o estilo): o
               placar e os achados em cima, o histórico e o cofre lado a lado embaixo — ou tudo
               numa pilha que rola, no celular. Cada número da sessão aparece num lugar só: o placar
               é a prancheta redesenhada para esta tela (`montarPlacarEconomia`), e não a prancheta
               movida para cá. -->
          <div class="eco-corpo" id="eco-corpo">
            <section class="eco-placar" id="eco-placar"></section>
            <section class="eco-achados" id="eco-achados"></section>
            <!-- `#capturas-painel` é movido para cá pelo `montarEconomia` -->
            <div class="eco-capturas" id="eco-capturas"></div>
            <!-- O COFRE: Itens, Depot e Coleção numa chave de três posições (`montarCofreEconomia`). -->
            <section class="eco-cofre" id="eco-cofre"></section>
          </div>
        </div>
        <div class="hud-hunt hud-clicavel" id="hud-hunt" data-poke-id="167" role="button" tabindex="0" title="Abrir a ficha de Spinarak na Pokedex">Spinarak · nível 230</div>

        <!-- Golpes do pokemon ATIVO, um embaixo do outro — o ícone é o TIPO do golpe, e o
             cooldown é o relógio (`--p` de 0 a 1) que `pintarGolpesPainel`/o setInterval em
             app.js mantêm. Full idle: quem ataca é o próprio pokemon, o ícone só informa. -->
        <div class="golpes-painel" id="golpes-painel" aria-hidden="true" style="top: 46.6719px; height: 594.328px;">
          <div class="golpes-lista" id="golpes-lista"><button type="button" class="golpe-ico pronto" data-golpe="Fire Spin" aria-label="Fire Spin" style="--p: 1;" data-sem-efeito=""><img src="/img/tipos/fire.svg" alt=""><span class="golpe-x" aria-hidden="true"></span></button><button type="button" class="golpe-ico pronto" data-golpe="Ember" aria-label="Ember" style="--p: 1;" data-sem-efeito=""><img src="/img/tipos/fire.svg" alt=""><span class="golpe-x" aria-hidden="true"></span></button><button type="button" class="golpe-ico pronto" data-golpe="Flame Burst" aria-label="Flame Burst" style="--p: 1;" data-sem-efeito=""><img src="/img/tipos/fire.svg" alt=""><span class="golpe-x" aria-hidden="true"></span></button><button type="button" class="golpe-ico" data-golpe="Incinerate" aria-label="Incinerate" style="--p: 0.6393999290456642;" data-sem-efeito=""><img src="/img/tipos/fire.svg" alt=""><span class="golpe-x" aria-hidden="true"></span></button><button type="button" class="golpe-ico" data-golpe="Air Slash" aria-label="Air Slash" style="--p: 0.58068708573409;" data-sem-efeito=""><img src="/img/tipos/flying.svg" alt=""><span class="golpe-x" aria-hidden="true"></span></button><button type="button" class="golpe-ico" data-golpe="Fire Pledge" aria-label="Fire Pledge" style="--p: 0.8887054842570049;" data-sem-efeito=""><img src="/img/tipos/fire.svg" alt=""><span class="golpe-x" aria-hidden="true"></span></button><button type="button" class="golpe-ico" data-golpe="Flamethrower" aria-label="Flamethrower" style="--p: 0.9622484490845816;" data-sem-efeito=""><img src="/img/tipos/fire.svg" alt=""><span class="golpe-x" aria-hidden="true"></span></button><button type="button" class="golpe-ico" data-golpe="Armor Cannon" aria-label="Armor Cannon" style="--p: 0.8258265292464195;" data-sem-efeito=""><img src="/img/tipos/fire.svg" alt=""><span class="golpe-x" aria-hidden="true"></span></button><button type="button" class="golpe-ico" data-golpe="Hurricane" aria-label="Hurricane" style="--p: 0.750635791728015;" data-sem-efeito=""><img src="/img/tipos/flying.svg" alt=""><span class="golpe-x" aria-hidden="true"></span></button><button type="button" class="golpe-ico pronto" data-golpe="Eruption" aria-label="Eruption" style="--p: 1;" data-sem-efeito=""><img src="/img/tipos/fire.svg" alt=""><span class="golpe-x" aria-hidden="true"></span></button><button type="button" class="golpe-ico" data-golpe="Mind Blown" aria-label="Mind Blown" style="--p: 0.33472538597823337;" data-sem-efeito=""><img src="/img/tipos/fire.svg" alt=""><span class="golpe-x" aria-hidden="true"></span></button><button type="button" class="golpe-ico" data-golpe="Ignition Point" aria-label="Ignition Point" style="--p: 0.13663018322921924;" data-sem-efeito=""><img src="/img/tipos/fire.svg" alt=""><span class="golpe-x" aria-hidden="true"></span></button><button type="button" class="golpe-ico" data-golpe="Massive Hurricane" aria-label="Massive Hurricane" style="--p: 0.6712662478901669;" data-sem-efeito=""><img src="/img/tipos/flying.svg" alt=""><span class="golpe-x" aria-hidden="true"></span></button></div>
          <div class="golpe-dica hidden" id="golpe-dica" style="top: 119px;">
    <div class="golpe-dica-nome">Flamethrower</div>
    <div class="golpe-dica-linha"><span>Cooldown</span><b>26.4s</b></div>
    <div class="golpe-dica-linha"><span>Dano base</span><b>90</b></div>
    </div>
        </div>

        <!-- EVENTO em andamento: a faixa que pisca no alto da batalha enquanto o buff global
             estiver valendo. Fica no topo e ao CENTRO porque é a única coisa da tela que vale
             para todo mundo ao mesmo tempo — e porque é temporária: some sozinha no segundo em
             que o prazo acaba, sem ninguém precisar mexer. Quem a preenche é `pintarFaixaDeEvento`. -->
        <div class="evento-faixa hidden" id="evento-faixa" aria-live="polite">
          <span class="ef-texto" id="evento-texto"></span>
          <span class="ef-tempo" id="evento-tempo"></span>
        </div>

        <!-- NA FILA DO PvP. O pedido é explícito: discreto, no alto, e sem atrapalhar quem
             está caçando — porque procurar partida enquanto se caça é o ponto do modo.

             Fica ao CENTRO por eliminação: o canto esquerdo tem o nome da hunt com a coluna
             de golpes logo abaixo, o direito tem "Ir ao Centro"/"Desistir", e os dois
             rodapés são o log da batalha e os caídos. Vem DEPOIS da faixa de evento no HTML
             de propósito: é isso que deixa a regra de irmão do CSS baixá-lo um degrau
             quando ela estiver no ar, em vez de os dois disputarem o mesmo pixel.

             O corpo abre o PvP; o × cancela a busca sem abrir nada. -->
        <div class="pvp-fila-pill hidden" id="pvp-fila-pill" role="status">
          <span class="pfp-girando" aria-hidden="true"></span>
          <span class="pfp-rotulo" data-i18n="pvp.pillNaFila">Na fila PvP</span>
          <span class="pfp-tempo" id="pvp-fila-tempo">0:00</span>
          <span class="pfp-faixa" id="pvp-fila-faixa"></span>
          <button type="button" class="pfp-cancelar" id="pvp-fila-cancelar" data-i18n-attr="title:pvp.cancelarBusca" title="Cancelar busca">×</button>
        </div>
        <!-- A JANELINHA do PvP ranqueado — o modo "minimizado" da tela de batalha.
             Canto inferior ESQUERDO porque o direito já é do HUD de zoom/sessão, e os dois
             brigariam pelo mesmo pixel. Fica deliberadamente sem barra de tempo, sem
             velocidades e sem elenco: quem quer isso abre a tela cheia pelo ⤢. -->
        <div class="pvp-mini hidden" id="pvp-mini" role="status">
          <div class="pvp-mini-topo">
            <span class="pvp-mini-vs" id="pvp-mini-vs"></span>
            <button type="button" class="pvp-mini-bt" id="pvp-mini-abrir" data-i18n-attr="title:pvp.miniAbrir" title="Abrir em tela cheia">⤢</button>
            <button type="button" class="pvp-mini-bt" id="pvp-mini-fechar" data-i18n-attr="title:pvp.miniFechar" title="Fechar">×</button>
          </div>
          <div class="pvp-mini-palco">
            <canvas id="pvp-mini-campo"></canvas>
            <div class="pvp-mini-res hidden" id="pvp-mini-res"></div>
          </div>
        </div>
        <!-- O TERMÔMETRO DE RANK — o que sobra quando o jogador fecha a batalha no meio.
             Mesma vaga da janelinha (os dois nunca aparecem juntos): a briga some, mas o
             número que ele esperava continua, com a barra andando até o valor novo. -->
        <div class="pvp-tick hidden" id="pvp-tick" role="status">
          <div class="pvp-tick-emblema" id="pvp-tick-emblema"></div>
          <div class="pvp-tick-corpo">
            <div class="pvp-tick-topo">
              <span class="pvp-tick-rank" id="pvp-tick-rank"></span>
              <span class="pvp-tick-delta" id="pvp-tick-delta"></span>
            </div>
            <div class="pvp-tick-barra"><i id="pvp-tick-fill"></i></div>
            <div class="pvp-tick-total" id="pvp-tick-total"></div>
          </div>
          <button type="button" class="pvp-mini-bt pvp-tick-x" id="pvp-tick-fechar" data-i18n-attr="title:pvp.miniFechar" title="Fechar">×</button>
        </div>
        <!-- Vida do boss (e do lendário da Arena Mística): UMA barra grande no meio da arena, que muda de cor
             conforme a vida cai — do verde-claro ao vermelho (`corDaVidaDoBoss`, no app.js). -->
        <div class="boss-vida hidden" id="boss-vida" aria-hidden="true">
          <div class="boss-vida-topo">
            <span class="boss-vida-nome" id="boss-vida-nome"></span>
            <span class="boss-vida-txt" id="boss-vida-txt"></span>
          </div>
          <div class="boss-vida-trilho boss-vida-trilho-vida"><i id="boss-vida-atual"></i></div>
        </div>
        <!-- prancheta de sessão + zoom da batalha (ícones entram por JS) -->
        <div class="hud-zoom">
          <div class="sessao-painel hidden" id="sessao-painel" aria-hidden="true">
    <div class="sessao-topo">
      <h3>Sessão</h3>
      <div class="sessao-acoes">
        <button type="button" class="sessao-reset sessao-copiar" id="sessao-copiar" data-i18n-attr="title:tip.sessaoCopiar" title="Copiar o resumo da sessão (tempo, XP/h, Gold/h e shinies) — para colar no chat">Copiar</button>
        <button type="button" class="sessao-reset" id="sessao-reset" disabled="" data-i18n-attr="title:tip.sessaoReset" title="Zerar contadores da sessão">Reset</button>
      </div>
    </div>
    <div class="bxp-host bxp-na-prancheta" data-bxp-host=""><button type="button" class="bxp" data-bxp="" title="Bônus de XP valendo agora: +65% em cada abate. Os ícones acesos estão valendo; os apagados dá para ligar. Toque para ver a conta."><span class="bxp-total"><span class="bxp-rot">XP</span><b>+65%</b></span><span class="bxp-fontes"><i class="bxp-f on" data-f="vip" title="VIP: +50% — valendo"><img src="/assets/site/assets/loja/vip.png" alt=""></i><i class="bxp-f" data-f="boostXp" title="XP Boost: desligado — daria +50% só no Treinador"><img src="/assets/site/assets/loja/exp.png" alt=""></i><i class="bxp-f" data-f="boostPokexp" title="XP Boost Pokemon: desligado — daria +50% só no Pokemon"><img src="/assets/site/assets/loja/boost.png" alt=""></i><i class="bxp-f on" data-f="guildBoost" title="Boost da Guild: +10% — valendo"><img src="/img/itens/boost-guild-32.png" alt=""></i><i class="bxp-f" data-f="twitch" title="Bônus Twitch: desligado — daria +15%"><svg class="tw-glifo" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"></path></svg></i><i class="bxp-f" data-f="kick" title="Bônus na Kick: desligado — daria +15%"><svg class="kk-glifo" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M1.5 0h8v5.3h2.7V2.7h2.6V0h8v8h-2.6v2.7h-2.7v2.6h2.7V16h2.6v8h-8v-2.7h-2.6v-2.6H9.5V24h-8z"></path></svg></i><i class="bxp-f" data-f="atrasados" title="Boost dos Atrasados: desligado — daria +900%"><svg class="dlg-svg" viewBox="0 0 20 20" width="14" height="14" aria-hidden="true"><path fill="currentColor" d="M10 2.2l7 7.4h-4.2v8.2H7.2V9.6H3z"></path></svg></i><i class="bxp-f" data-f="sacrificio" title="Boost do Sacrifício: desligado — daria +20%"><img src="/img/itens/rare-bone.png" alt=""></i></span></button></div>
    <div class="ss-grade">
      <div class="ss-col">
    <section class="ss-sec ss-treinador">
      <h4>Treinador</h4>
      <ul class="ss-linhas">
        
    <li class="ss-linha">
      <span class="ss-ico" aria-hidden="true"><svg class="dlg-svg" viewBox="0 0 20 20" width="14" height="14" aria-hidden="true"><circle cx="10" cy="5.8" r="4" fill="currentColor"></circle><path fill="currentColor" d="M2.4 18.6c0-4.2 3.4-7 7.6-7s7.6 2.8 7.6 7z"></path></svg></span>
      <span class="ss-rot">XP treinador</span>
      <b data-k="xpTreinador">0</b>
      <em class="ss-hora"><span id="sessao-xp-treinador-h">0</span>/h</em>
    </li>
        
    <li class="ss-linha">
      <span class="ss-ico" aria-hidden="true"><svg class="dlg-svg" viewBox="0 0 20 20" width="14" height="14" aria-hidden="true"><path fill="currentColor" d="M10 1.6l2.6 5.3 5.8.8-4.2 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8-4.2-4.1 5.8-.8z"></path></svg></span>
      <span class="ss-rot">XP pokemon</span>
      <b data-k="xpPokemon">0</b>
      <em class="ss-hora"><span id="sessao-xp-pokemon-h">0</span>/h</em>
    </li>
        
    <li class="ss-linha">
      <span class="ss-ico" aria-hidden="true"><img src="/assets/site/assets/ui/moeda-ouro.png" alt="" style="height: 15px; width: 15px; object-fit: contain;"></span>
      <span class="ss-rot">Gold</span>
      <b data-k="gold">0</b>
      <em class="ss-hora"><span id="sessao-gold-h">0</span>/h</em>
    </li>
        
    <li class="ss-linha">
      <span class="ss-ico" aria-hidden="true"><svg class="dlg-svg" viewBox="0 0 20 20" width="14" height="14" aria-hidden="true"><path d="M3.2 3.2l9.6 9.6M16.8 3.2l-9.6 9.6" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"></path><path d="M10.7 15l4.3-4.3M5 10.7L9.3 15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"></path><path d="M14.4 15.6l2.4 2.4M5.6 15.6L3.2 18" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round"></path></svg></span>
      <span class="ss-rot">Pokemon abatidos</span>
      <b data-k="abates">0</b>
      <em class="ss-hora"><span id="sessao-abates-h">0</span>/h</em>
    </li>
        
    <li class="ss-linha">
      <span class="ss-ico" aria-hidden="true"><img src="/assets/site/assets/ui/ball-poke.png" alt="" style="height: 15px; width: 15px; object-fit: contain;"></span>
      <span class="ss-rot">Capturas</span>
      <b data-k="capturas">0</b>
      
    </li>
      </ul>
    </section>
    <section class="ss-sec ss-custos">
      <h4>Custos</h4>
      <div class="ss-caixa">
        <p class="ss-vazio">Nada gasto ainda — as bolas, poções e revives aparecem aqui conforme a automação usa.</p>
        <ul class="ss-linhas ss-totais">
          
    <li class="ss-linha gasto">
      <span class="ss-ico" aria-hidden="true"><svg class="dlg-svg" viewBox="0 0 20 20" width="14" height="14" aria-hidden="true"><ellipse cx="8" cy="6" rx="5.6" ry="3" fill="currentColor"></ellipse><path d="M2.4 6v4c0 1.7 2.5 3 5.6 3s5.6-1.3 5.6-3V6" fill="none" stroke="currentColor" stroke-width="1.8"></path><path d="M8 13.2v1.6c0 1.7 2.5 3 5.6 3s5.6-1.3 5.6-3v-4c0-1.6-2.2-2.9-5.1-3" fill="none" stroke="currentColor" stroke-width="1.8"></path></svg></span>
      <span class="ss-rot">Gold gasto</span>
      <b data-k="gasto">0</b>
      <em class="ss-hora"><span id="sessao-gasto-h">0</span>/h</em>
    </li>
          
    <li class="ss-linha lucro">
      <span class="ss-ico" aria-hidden="true"><svg class="dlg-svg" viewBox="0 0 20 20" width="14" height="14" aria-hidden="true"><path fill="currentColor" d="M5.4 2.2h9.2v5a4.6 4.6 0 0 1-9.2 0zM9 12.8h2v2.8h3v2.6H6v-2.6h3z"></path><path d="M5.4 4.2H2.6c0 2.6 1.2 4 3.2 4.2M14.6 4.2h2.8c0 2.6-1.2 4-3.2 4.2" fill="none" stroke="currentColor" stroke-width="1.6"></path></svg></span>
      <span class="ss-rot">Lucro líquido</span>
      <b data-k="lucro">0</b>
      <em class="ss-hora"><span id="sessao-lucro-h">0</span>/h</em>
    </li>
        </ul>
      </div>
    </section></div>
      <div class="ss-col">
        <section class="ss-sec ss-sec-tempo">
          <h4>Tempo<i class="ss-vivo" aria-hidden="true"></i></h4>
          <div class="ss-tempo">
            <span class="ss-tempo-ico" aria-hidden="true"><svg class="dlg-svg" viewBox="0 0 20 20" width="26" height="26" aria-hidden="true"><circle cx="10" cy="10" r="7.6" fill="none" stroke="currentColor" stroke-width="2.2"></circle><path d="M10 5.4V10l3.2 2.1" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>
            <b id="sessao-tempo">0:00</b>
          </div>
        </section>
        
    <section class="ss-sec ss-sec-shiny">
      <h4 title="Na hunt contam os shinies. O Fragmento de Ovo Shiny cai de Unova para frente, e o Boss Token e os fragmentos de Chave, Shiny Stone e Bicicleta só na Outland.">Shiny<em class="ss-lugar">· Hunt</em></h4>
      <div class="ss-shinies">
        
    <div class="ss-shiny">
      <span class="ss-shiny-ico" aria-hidden="true"><svg class="dlg-svg" viewBox="0 0 20 20" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M10 1.4l2 6.6 6.6 2-6.6 2-2 6.6-2-6.6-6.6-2 6.6-2z"></path></svg></span>
      <b data-k="shiniesVistos">0</b>
      <span>vistos</span>
    </div>
        
    <div class="ss-shiny">
      <span class="ss-shiny-ico" aria-hidden="true"><svg class="dlg-svg" viewBox="0 0 20 20" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M10 1.4l2 6.6 6.6 2-6.6 2-2 6.6-2-6.6-6.6-2 6.6-2z"></path></svg></span>
      <b data-k="shinies">0</b>
      <span>capturados</span>
    </div>
      </div>
    </section>
      </div>
    </div></div>
          
          <div class="capturas-painel hidden" id="capturas-painel" aria-hidden="true"><div class="cap-cab" data-idioma="pt">
      <div class="cap-cab-l1">
        <span class="cap-cab-ball" aria-hidden="true"><img src="/assets/site/assets/ui/ball-poke.png" alt="" style="height: 18px; width: 18px; object-fit: contain;"></span>
        <h3>Capturas</h3>
        <em class="capturas-conta" data-n="0" hidden=""></em>
        <em class="cap-shinies" title="Shiny" hidden="" data-n="0"><svg class="dlg-svg" viewBox="0 0 20 20" width="11" height="11" aria-hidden="true"><path fill="currentColor" d="M10 1.4l2 6.6 6.6 2-6.6 2-2 6.6-2-6.6-6.6-2 6.6-2z"></path></svg><span>0</span></em>
        <button type="button" class="cap-recorde nota-tinta razoavel" title="Recorde da sessão — clique para ver quem é" data-k="1794238845142:110627122" hidden=""><svg class="dlg-svg" viewBox="0 0 20 20" width="13" height="13" aria-hidden="true"><path fill="currentColor" d="M5.4 2.2h9.2v5a4.6 4.6 0 0 1-9.2 0zM9 12.8h2v2.8h3v2.6H6v-2.6h3z"></path><path d="M5.4 4.2H2.6c0 2.6 1.2 4 3.2 4.2M14.6 4.2h2.8c0 2.6-1.2 4-3.2 4.2" fill="none" stroke="currentColor" stroke-width="1.6"></path></svg><span class="cap-recorde-n">3,302</span></button>
        <button type="button" class="cap-limpar" id="capturas-reset" data-i18n-attr="title:tip.capturasHistReset" title="Limpar histórico de capturas" aria-label="Limpar histórico de capturas"><svg class="dlg-svg" viewBox="0 0 20 20" width="15" height="15" aria-hidden="true"><path d="M2.8 5h14.4M7.6 5V2.8h4.8V5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path fill="currentColor" fill-rule="evenodd" d="M4.6 6.6h10.8l-.9 10.8c-.1.9-.8 1.6-1.7 1.6H7.2c-.9 0-1.6-.7-1.7-1.6zM8 9v7h1.4V9zm2.6 0v7H12V9z"></path></svg></button>
      </div>
      <div class="cap-ordens cap-ordens-principal" role="radiogroup" aria-label="Ordenar por" hidden="">
        <i class="cap-manopla" aria-hidden="true" style="--x: 3px; --y: 3px; --w: 96px; --h: 26px;" hidden=""></i>
        
      <button type="button" class="cap-ordem on" role="radio" data-ordem="recentes" data-titulo="Recentes" aria-checked="true" title="As mais novas primeiro — clique de novo para inverter">
        <span>Recentes</span><svg class="cap-seta" viewBox="0 0 10 10" aria-hidden="true"><path d="M2 3.6 5 6.6 8 3.6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"></path></svg></button>
      <button type="button" class="cap-ordem" role="radio" data-ordem="nota" data-titulo="Maior Nota Calculadora" aria-checked="false" title="Maior Nota Calculadora">
        <span>Nota</span><svg class="cap-seta" viewBox="0 0 10 10" aria-hidden="true"><path d="M2 3.6 5 6.6 8 3.6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"></path></svg></button>
      <button type="button" class="cap-ordem" role="radio" data-ordem="iv" data-titulo="Maior IV Total" aria-checked="false" title="Maior IV Total">
        <span>IV</span><svg class="cap-seta" viewBox="0 0 10 10" aria-hidden="true"><path d="M2 3.6 5 6.6 8 3.6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"></path></svg></button>
      <button type="button" class="cap-ordem" role="radio" data-ordem="potencia" data-titulo="Potência" aria-checked="false" title="Potência">
        <span>Potência</span><svg class="cap-seta" viewBox="0 0 10 10" aria-hidden="true"><path d="M2 3.6 5 6.6 8 3.6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"></path></svg></button>
      <button type="button" class="cap-ordem" role="radio" data-ordem="qualidade" data-titulo="Qualidade" aria-checked="false" title="Qualidade">
        <span>Qualidade</span><svg class="cap-seta" viewBox="0 0 10 10" aria-hidden="true"><path d="M2 3.6 5 6.6 8 3.6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"></path></svg></button>
      <button type="button" class="cap-ordem" role="radio" data-ordem="nivel" data-titulo="Nível" aria-checked="false" title="Nível">
        <span>Nível</span><svg class="cap-seta" viewBox="0 0 10 10" aria-hidden="true"><path d="M2 3.6 5 6.6 8 3.6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"></path></svg></button>
      </div>
      <div class="cap-ordens cap-ordens-iv" role="radiogroup" aria-label="IV" hidden="">
        <i class="cap-manopla" aria-hidden="true" hidden=""></i>
        
      <button type="button" class="cap-ordem" role="radio" data-ordem="iv" data-titulo="Maior IV Total" aria-checked="false" title="Maior IV Total">
        <span>Total</span><svg class="cap-seta" viewBox="0 0 10 10" aria-hidden="true"><path d="M2 3.6 5 6.6 8 3.6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"></path></svg></button>
      <button type="button" class="cap-ordem" role="radio" data-ordem="ivHp" data-titulo="IV HP" aria-checked="false" title="IV HP">
        <span>HP</span><svg class="cap-seta" viewBox="0 0 10 10" aria-hidden="true"><path d="M2 3.6 5 6.6 8 3.6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"></path></svg></button>
      <button type="button" class="cap-ordem" role="radio" data-ordem="ivAtk" data-titulo="IV ATK" aria-checked="false" title="IV ATK">
        <span>ATK</span><svg class="cap-seta" viewBox="0 0 10 10" aria-hidden="true"><path d="M2 3.6 5 6.6 8 3.6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"></path></svg></button>
      <button type="button" class="cap-ordem" role="radio" data-ordem="ivDef" data-titulo="IV DEF" aria-checked="false" title="IV DEF">
        <span>DEF</span><svg class="cap-seta" viewBox="0 0 10 10" aria-hidden="true"><path d="M2 3.6 5 6.6 8 3.6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"></path></svg></button>
      <button type="button" class="cap-ordem" role="radio" data-ordem="ivSpAtk" data-titulo="IV SP.ATK" aria-checked="false" title="IV SP.ATK">
        <span>SP.ATK</span><svg class="cap-seta" viewBox="0 0 10 10" aria-hidden="true"><path d="M2 3.6 5 6.6 8 3.6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"></path></svg></button>
      <button type="button" class="cap-ordem" role="radio" data-ordem="ivSpDef" data-titulo="IV SP.DEF" aria-checked="false" title="IV SP.DEF">
        <span>SP.DEF</span><svg class="cap-seta" viewBox="0 0 10 10" aria-hidden="true"><path d="M2 3.6 5 6.6 8 3.6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"></path></svg></button>
      <button type="button" class="cap-ordem" role="radio" data-ordem="ivSpd" data-titulo="IV SPD" aria-checked="false" title="IV SPD">
        <span>SPD</span><svg class="cap-seta" viewBox="0 0 10 10" aria-hidden="true"><path d="M2 3.6 5 6.6 8 3.6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"></path></svg></button>
      </div></div><div class="cap-vazio">
           <span class="cap-vazio-ball" aria-hidden="true"><img src="/assets/site/assets/ui/ball-poke.png" alt="" style="height: 34px; width: 34px; object-fit: contain;"></span>
           <b>Nenhuma captura ainda</b>
           <p>Os pokemon que você capturar nesta sessão aparecem aqui, com a nota, o IV e a hora.</p>
         </div></div><div class="hud-zoom-btns">
            <button class="sessao-btn" id="cena-capturas" type="button" data-i18n-attr="title:tip.capturasHist" title="Histórico de capturas" data-novas="4"><img src="/assets/site/assets/ui/ball-poke.png" alt="" style="height: 22px; width: 22px; object-fit: contain;"><i class="sessao-selo">4</i></button>
            <button class="sessao-btn" id="cena-sessao" type="button" data-i18n-attr="title:tip.sessao" title="Estatísticas da sessão">
  <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true">
    <rect x="4" y="2.5" width="12" height="15" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.8"></rect>
    <line x1="7" y1="6.5" x2="13" y2="6.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></line>
    <line x1="7" y1="10" x2="13" y2="10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></line>
    <line x1="7" y1="13.5" x2="11" y2="13.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></line>
    <rect x="6.5" y="1" width="2" height="3" rx=".6" fill="currentColor"></rect>
    <rect x="11.5" y="1" width="2" height="3" rx=".6" fill="currentColor"></rect>
  </svg></button>
          </div>
          <div class="hud-zoom-par">
            <!-- A TIPAGEM DO DIA (os Dias Sazonais): o ícone do tipo sorteado à 00:00 de Brasília, na hunt do Mapa —
                 onde os pokemon dele ficam 2× mais fortes — e na praça do Centro. Primeiro da fileira das lupas, o que
                 no celular o põe embaixo do C. Quem pinta e abre a janela é o app.js (`pintarDiaSazonal`, `abrirDiaSazonal`). -->
            <button class="dia-tipo-btn" id="cena-dia-tipo" type="button" data-marca="FLYING|pt" data-tipo="FLYING" title="Hoje é Dia de Ventania — veja a tipagem do dia" aria-label="Hoje é Dia de Ventania — veja a tipagem do dia"><img src="/img/tipos/flying.svg" alt=""></button>
            <button id="cena-zoom-mais" type="button" data-i18n-attr="title:tip.zoomMais" title="Aproximar a batalha">
  <svg viewBox="0 0 20 20" width="19" height="19" aria-hidden="true">
    <circle cx="8.5" cy="8.5" r="6" fill="none" stroke="currentColor" stroke-width="2"></circle>
    <line x1="13" y1="13" x2="18.5" y2="18.5" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></line>
    <line x1="5.5" y1="8.5" x2="11.5" y2="8.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"></line>
    <line x1="8.5" y1="5.5" x2="8.5" y2="11.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"></line>
  </svg></button>
            <button id="cena-zoom-menos" type="button" data-i18n-attr="title:tip.zoomMenos" title="Afastar a batalha" disabled="">
  <svg viewBox="0 0 20 20" width="19" height="19" aria-hidden="true">
    <circle cx="8.5" cy="8.5" r="6" fill="none" stroke="currentColor" stroke-width="2"></circle>
    <line x1="13" y1="13" x2="18.5" y2="18.5" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></line>
    <line x1="5.5" y1="8.5" x2="11.5" y2="8.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"></line>
    
  </svg></button>
          </div>
        </div>
        <!-- Derrotados ainda no chão: dá para arremessar bola neles até o corpo sumir.
             Vem ANTES do log porque o CSS empurra o log para a direita a partir daqui. -->
        <div class="caidos hidden" id="caidos">
          <div class="caidos-topo">
            <span class="caidos-titulo" data-i18n="cena.noChao">Proximidade para Capturar</span>
            <div class="caidos-bolas" id="caidos-bolas"><button class="caidos-bola on" title="Ultra Ball — você tem 1.984"><img src="/assets/site/assets/ui/ball-ultra.png" alt="" style="height: 18px; width: 18px; object-fit: contain;"></button></div>
          </div>
          <div class="caidos-lista" id="caidos-lista"><button class="caido" data-slot="568" title="arremessar bola neste — ele entra na equipe no Nv40"><canvas width="32" height="32" style="width: 26px; height: 26px; image-rendering: pixelated;"></canvas>
        <span class="caido-info">
          <span class="caido-nome">
            <span class="caido-quem">Spinarak <b>Nv230</b></span><em class="caido-teto">→ Nv40</em></span>
          <span class="caido-tempo"><i style="width: 98.8794%;"></i></span>
        </span></button></div>
        </div>

        <!-- A saída da ARENA, no canto da saída da hunt (as duas nunca aparecem juntas): o
             "Abandonar arena" — a entrada já foi paga e NÃO volta — e, colada nele pela esquerda, a
             BATERIA do Modo Economia, a mesma da hunt (ver o `#hunt-eco` logo abaixo: só liga, e
             some com a cena). Quem posiciona é o contêiner, como no `#hunt-saida`: o rótulo muda de
             largura de idioma para idioma e os dois seguem colados.

             A bateria é só da arena do BOSS; na Arena Mística o contêiner mostra só o abandonar. -->
        <div class="arena-saida hidden" id="arena-saida">
          <button class="hunt-eco hidden" id="arena-eco" type="button" data-i18n-attr="title:eco.atalho" title="Modo Economia — desliga a cena e poupa bateria">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 7h11a2 2 0 0 1 2 2v1h1.4a.6.6 0 0 1 .6.6v2.8a.6.6 0 0 1-.6.6H18v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2zm0 2v6h11V9H5z" fill="currentColor"></path>
              <path d="M6.5 10.5h5.5v3H6.5z" fill="currentColor"></path>
            </svg>
          </button>
          <!-- O atalho do Modo Imersivo, o mesmo da hunt (ver o `#hunt-imersivo`), colado na bateria. -->
          <button class="hunt-imersivo hidden" id="arena-imersivo" type="button" data-i18n-attr="title:cfg.imersivoAtalho;aria-label:cfg.imersivoAtalho" title="Modo Imersivo — só a batalha, em tela cheia" aria-label="Modo Imersivo — só a batalha, em tela cheia">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8 3v3H4v14h16V6h-4V3H8zm2 0h4v3h-4V3zM6 8h12v10H6V8z" fill="currentColor"></path>
              <path d="M9 11h6v2H9v-2z" fill="currentColor"></path>
            </svg>
          </button>
          <button class="arena-sair" id="boss-sair" type="button" data-i18n-attr="title:tip.bossSair" title="A entrada paga não é devolvida" data-i18n="cena.abandonarArena">Abandonar arena</button>
        </div>

        <!-- Voltar ao Centro Pokemon de dentro de uma hunt. Fica no mesmo canto do HUD da
             arena PvP — os dois nunca aparecem juntos.

             O botão TRAVA por 3 s a cada dano trocado (a contagem corre ao lado do rótulo), e
             o aviso embaixo dele explica o preço de fechar o jogo sem passar por aqui: o
             servidor trata isso como morte. Quem lê o aviso não é pego de surpresa. -->
        <!-- A dupla de saída da hunt, numa linha só: a corda à esquerda, o botão normal à
             direita. As duas fazem a MESMA coisa (subir ao Centro) e diferem só no preço —
             uma custa 3 s de espera, a outra custa uma Escape Rope. Lado a lado, a escolha
             se lê de uma vez; em cantos diferentes da tela, viraria duas mecânicas. -->
        <div class="hunt-saida" id="hunt-saida">
          <!-- MODO ECONOMIA — o atalho. O interruptor de sempre mora nas Configurações, três
               toques longe; a bateria acabando é justamente a hora em que ninguém quer
               procurar um menu. Uma BATERIA, e não um raio ou uma folha: o que o modo poupa
               é bateria e calor do aparelho, e é esse o nome que o jogador dá para o que está
               sentindo quando procura por ele.

               Só LIGA — não é um interruptor de duas mãos. Ligado, a cena inteira sai do ar,
               e este botão vai junto com ela (`html.modo-economia .palco > :not(.eco-painel)`);
               quem desliga é o "Ligar a cena" do próprio painel de Economia, que é o único
               botão que continua na tela. Quem liga de verdade é `definirEconomia`, no app.js. -->
          <button class="hunt-eco" id="hunt-eco" type="button" data-i18n-attr="title:eco.atalho" title="Modo Economia — desliga a cena e poupa bateria">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 7h11a2 2 0 0 1 2 2v1h1.4a.6.6 0 0 1 .6.6v2.8a.6.6 0 0 1-.6.6H18v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2zm0 2v6h11V9H5z" fill="currentColor"></path>
              <path d="M6.5 10.5h5.5v3H6.5z" fill="currentColor"></path>
            </svg>
          </button>
          <!-- MODO IMERSIVO — o atalho, colado na bateria (pedido de 15/10/2026: quem deixa a hunt
               rodando enquanto faz outra coisa longe do PC não quer abrir as Configurações toda
               vez). O desenho é o MESMO do `#imersivo-sair`, o botão que volta da tela cheia: o
               mesmo símbolo entra e sai. Só LIGA, como a bateria — ligado, o palco esconde tudo
               menos o canvas, e este botão vai junto. Quem liga é o app.js. -->
          <button class="hunt-imersivo" id="hunt-imersivo" type="button" data-i18n-attr="title:cfg.imersivoAtalho;aria-label:cfg.imersivoAtalho" title="Modo Imersivo — só a batalha, em tela cheia" aria-label="Modo Imersivo — só a batalha, em tela cheia">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8 3v3H4v14h16V6h-4V3H8zm2 0h4v3h-4V3zM6 8h12v10H6V8z" fill="currentColor"></path>
              <path d="M9 11h6v2H9v-2z" fill="currentColor"></path>
            </svg>
          </button>
          <!-- MODO POP-UP — destaca a cena e os contadores da sessão numa janelinha flutuante
               (Document Picture-in-Picture no Chrome/Edge; um cartão arrastável no resto), sempre
               em primeiro plano, para acompanhar a hunt com o jogo minimizado. Só o ícone: fica
               colado na corda e no "Ir ao Centro" formando a mesma peça. Quem liga é `popup.mjs`. -->
          <button class="hunt-popup" id="hunt-popup" type="button" data-i18n-attr="title:popup.abrir" title="Modo Pocket — janelinha com a cena e contadores. No Android, a cena pode ficar em picture-in-picture ao usar Home.">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 4h16a1 1 0 0 1 1 1v6h-2V6H5v12h5v2H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z" fill="currentColor"></path>
              <path d="M12 12h9a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-9a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1zm1 2v5h7v-5h-7z" fill="currentColor"></path>
            </svg>
          </button>
          <!-- ESCAPE ROPE — só a logo e a quantidade. Um botão com texto ao lado de outro com
               texto viraria uma fileira de frases, e quem lê "Ir para o Centro Pokemon" ao
               lado já sabe o que a corda faz. -->
          <button class="escape-rope" id="escape-rope" type="button" disabled="" title="Sem Escape Rope. Compre na Loja por 1 💎.">
            <span class="er-ico" id="er-ico" aria-hidden="true" data-pronto="1"><img src="/img/itens/escape-rope.png" alt="" style="height: 20px; width: 20px; object-fit: contain;"></span>
            <span class="er-qtd" id="er-qtd">0</span>
          </button>
          <div class="hunt-saida-acoes">
            <button class="ir-centro" id="ir-centro" type="button">
              <span class="ir-centro-txt-longo" data-i18n="cena.irAoCentro">Ir para o Centro Pokemon</span>
              <span class="ir-centro-txt-curto" data-i18n="cena.irAoCentroCurto">Centro Pokemon</span>
              <span class="ir-centro-conta" id="ir-centro-conta"></span>
            </button>
            <button class="desistir-combate" id="desistir-combate" type="button" data-i18n-attr="title:cena.desistirCombate" title="Desistir do Combate">
              <span class="desistir-txt-longo" data-i18n="cena.desistirCombate">Desistir do Combate</span>
              <span class="desistir-txt-curto" data-i18n="cena.desistirCombateCurto">Desistir</span>
            </button>
          </div>
        </div>


        <div class="hud-log" id="hud-log"><div>Spinarak Nv230 escapou e sumiu</div><div>Spinarak derrotado! +38.008 xp treinador, +38.008 xp pokemon, +1.086 ouro (+142 do bônus de loot)</div><div>Spinarak Nv230 escapou e sumiu</div><div>Spinarak derrotado! +38.008 xp treinador, +38.008 xp pokemon, +1.086 ouro (+142 do bônus de loot)</div><div>poção usada</div><div>Spinarak Nv230 escapou e sumiu</div></div>

        <!-- Centro Pokemon — a praça de Cerulean, onde os treinadores se encontram.

             O botão de curar FLUTUA em cima da Enfermeira Joy, dentro da cena: quem manda nele
             é `seguirEnfermeira` no app.js, que a cada quadro pergunta ao campo onde ela está
             na tela. Já foi uma caixa presa no rodapé — mas numa área em que se anda, a caixa
             tapava justamente o caminho, e curar deixou de ser uma conversa com alguém. -->
        <button class="centro-curar hidden" id="centro-curar" type="button" data-i18n="cena.centroCurar">Curar equipe</button>
        <button class="centro-tm hidden" id="centro-tm" type="button" data-i18n="cena.centroTm">Professor Carvalho</button>
        <button class="centro-depot hidden" id="centro-depot" type="button" data-i18n="cena.centroDepot">Depot</button>
        <!-- As SALAS globais da praça: no terminal da parede, 2 tiles à esquerda e 5 acima do Depot
             (`telaDaSala` no campo.mjs). Só aparece com as salas ligadas no servidor (`centro.salas` no
             estado) — ver `abrirSalasDaPraca`. -->
        <button class="centro-sala-btn hidden" id="centro-sala-btn" type="button" data-i18n="cena.centroSalaBtn">Sala</button>

        <!-- DENTRO DE CASA. Escalação em cima de cada boneco; sair fica no canto direito. -->
        <div class="casa-boneco-btns hidden" id="casa-boneco-btns"></div>
        <button class="casa-btn-cena hidden" id="casa-sair" type="button" data-i18n="casa.sair">Sair de casa</button>

        <!-- A barra da praça: como andar e quem está por perto. Fica o tempo todo enquanto o
             jogador estiver no Centro. -->
        <div class="centro-barra hidden" id="centro-barra">
          <span class="cb-teclas"><b>W A S D</b><i data-i18n="cena.centroAndar">para andar</i></span>
          <span class="cb-quantos" id="centro-quantos">você é o único por aqui</span>
          <span class="cb-sala" id="centro-sala">Sala 9</span>
        </div>

        <!-- O direcional do toque. Celular não tem WASD, e sem isto a praça simplesmente não
             existiria para quem joga no telefone. Só aparece em tela sem mouse (ver o CSS);
             cada botão manda a MESMA mensagem que a tecla. -->
        <!-- As setas são SVG, e não caracteres. `▲`/`▼` (U+25B2/BC) são texto em toda fonte,
             mas `◀`/`▶` (U+25C0/B6) têm apresentação de EMOJI por padrão — no iOS e no Android
             o direcional saía com dois triângulos chapados em cima e embaixo e dois adesivos
             coloridos nas laterais. Um triângulo desenhado à mão fica igual nos quatro, em
             qualquer aparelho, e ainda gira por `transform` a partir do mesmo caminho. -->
        <div class="centro-dpad hidden" id="centro-dpad">
          <button type="button" data-dir="1" aria-label="norte">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 6l7 12H5z" fill="currentColor"></path></svg>
          </button>
          <button type="button" data-dir="4" aria-label="oeste">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 12l12-7v14z" fill="currentColor"></path></svg>
          </button>
          <button type="button" data-dir="2" aria-label="leste">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 12L6 19V5z" fill="currentColor"></path></svg>
          </button>
          <button type="button" data-dir="3" aria-label="sul">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 18L5 6h14z" fill="currentColor"></path></svg>
          </button>
        </div>

        <!-- Só aparece no Modo Imersivo — sem ele o jogador ficaria preso na tela cheia. -->
        <button type="button" class="imersivo-sair" id="imersivo-sair" data-i18n-attr="title:cfg.imersivoSair" title="Sair do modo imersivo">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M8 3v3H4v14h16V6h-4V3H8zm2 0h4v3h-4V3zM6 8h12v10H6V8z" fill="currentColor"></path>
            <path d="M9 11h6v2H9v-2z" fill="currentColor"></path>
          </svg>
        </button>
      </div>
    </div>

  </main>

  <!-- ───────────────────── direita: automações + chat ──────────────────────── -->
  <aside class="col dir">
    <div class="painel" id="p-auto">
      <!-- O cabeçalho recolhível é o mesmo da Equipe. Recolher as Automações é o gesto que
           devolve altura ao chat (ele é o `.cresce` da coluna) e, com o chat recolhido junto,
           estreita a coluna inteira — ver `.col.dir` e `html.dir-min` no estilo. -->
      <div class="painel-cab painel-cab-auto">
        <h3><span data-i18n="painel.automacoes">Automações</span> <span class="cnt aceso" id="auto-cnt" title="3 de 5 automações ligadas">3/5</span></h3>
        <button type="button" id="btn-auto-toggle" class="btn-painel-toggle" aria-expanded="true" aria-controls="auto-corpo" data-i18n-attr="title:tip.autoRecolher;aria-label:tip.autoRecolher" title="Recolher automações — o chat ocupa o espaço" aria-label="Recolher automações — o chat ocupa o espaço">
          <svg class="ico-chevron" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 10l5 5 5-5z" fill="currentColor"></path></svg>
          <!-- Só aparece no RAIL (os dois painéis recolhidos, coluna de 54 px), onde não cabe
               a palavra "Automações". É o MESMO desenho da aba "Auto" do celular, de propósito:
               quem joga nos dois lugares não tem de aprender dois símbolos para a mesma coisa. -->
          <span class="painel-ico" aria-hidden="true">
            <svg viewBox="0 0 24 24"><path d="M12 5V2L8 6l4 4V7a5 5 0 1 1-5 5H5a7 7 0 1 0 7-7z" fill="currentColor"></path><circle cx="12" cy="12" r="2.2" fill="currentColor"></circle></svg>
          </span>
          <b class="painel-ico-selo" id="auto-cnt-rail" aria-hidden="true">3/5</b>
        </button>
      </div>
      <div id="auto-corpo" class="painel-corpo-auto">

        <!-- Lançar pokebola é BENEFÍCIO DE VIP. Os dois modos são excludentes — só um pode ficar
             ligado. A trava de verdade está no servidor (`auto.set`); quem não assina recebe o
             convite para a Loja em vez de um interruptor que não faz nada. -->
        <label class="auto-linha">
          <input type="checkbox" id="auto-ball-captura"> <span data-i18n="painel.autoBallCaptura">Lançar até Capturar</span>
          <span class="selo-vip" id="auto-ball-vip">VIP</span>
        </label>
        <label class="auto-linha">
          <input type="checkbox" id="auto-ball-sem-parar"> <span data-i18n="painel.autoBallSemParar">Lançar sem Parar</span>
          <span class="selo-vip" id="auto-ball-sem-parar-vip">VIP</span>
        </label>
        <div class="auto-opcoes" id="auto-ball-opts"><button class="auto-chip vazio" title="Poke Ball — eficiência ×1"><img src="/assets/site/assets/ui/ball-poke.png" alt="" style="height: 20px; width: 20px; object-fit: contain;"><span class="q">0</span></button><button class="auto-chip vazio" title="Great Ball — eficiência ×2"><img src="/assets/site/assets/ui/ball-great.png" alt="" style="height: 20px; width: 20px; object-fit: contain;"><span class="q">0</span></button><button class="auto-chip vazio" title="Super Ball — eficiência ×3"><img src="/img/ball-super.png" alt="" style="height: 20px; width: 20px; object-fit: contain;"><span class="q">0</span></button><button class="auto-chip on" title="Ultra Ball — eficiência ×4"><img src="/assets/site/assets/ui/ball-ultra.png" alt="" style="height: 20px; width: 20px; object-fit: contain;"><span class="q">1.983</span></button><button class="auto-chip vazio" title="Beast Ball — eficiência ×8"><img src="/img/ball-beast.png" alt="" style="height: 20px; width: 20px; object-fit: contain;"><span class="q">0</span></button></div>

        <label class="auto-linha">
          <input type="checkbox" id="auto-revive"> <span data-i18n="painel.autoRevive">Usar Revive ao desmaiar</span>
        </label>
        <div class="auto-opcoes" id="auto-revive-opts"><button class="auto-chip on vazio" title="Revive — acabou"><img src="/assets/site/assets/markitems/revive.png" alt="" style="height: 20px; width: 20px; object-fit: contain;"><span class="q">0</span></button><button class="auto-chip on vazio" title="Max Revive — acabou"><img src="/assets/site/assets/markitems/max_revive.png" alt="" style="height: 20px; width: 20px; object-fit: contain;"><span class="q">0</span></button></div>

        <label class="auto-linha">
          <input type="checkbox" id="auto-potion"> <span data-i18n="painel.autoPotion">Usar Poções</span>
        </label>
        <!-- A que altura da vida a poção entra. Sem esta escolha o limiar era fixo em 35%, e
             quem caça acima do nível queria curar antes disso enquanto quem farma no fácil
             queria economizar poção. -->
        <div class="auto-limiar" id="auto-limiar"><span class="auto-rotulo">usar abaixo de</span><input type="range" class="auto-limiar-barra qtd-barra" min="10" max="100" step="10" title="usa a poção quando a vida cair abaixo de 90%"><span class="auto-limiar-val" title="usa a poção quando a vida cair abaixo de 90%">90%</span></div>
        <div class="auto-opcoes" id="auto-potion-opts"><button class="auto-chip on" title="Small Potion"><img src="/assets/site/assets/markitems/small_potion.png" alt="" style="height: 20px; width: 20px; object-fit: contain;"><span class="q">2.126</span></button><button class="auto-chip vazio" title="Great Potion — acabou"><img src="/assets/site/assets/markitems/great_potion.png" alt="" style="height: 20px; width: 20px; object-fit: contain;"><span class="q">0</span></button><button class="auto-chip vazio" title="Ultra Potion — acabou"><img src="/assets/site/assets/markitems/ultra_potion.png" alt="" style="height: 20px; width: 20px; object-fit: contain;"><span class="q">0</span></button><button class="auto-chip vazio" title="Hyper Potion — acabou"><img src="/assets/site/assets/markitems/hyper_potion.png" alt="" style="height: 20px; width: 20px; object-fit: contain;"><span class="q">0</span></button><button class="auto-chip vazio" title="Ultimate Potion — acabou"><img src="/assets/site/assets/markitems/ultimate_potion.png" alt="" style="height: 20px; width: 20px; object-fit: contain;"><span class="q">0</span></button><button class="auto-chip vazio" title="Golden Potion — acabou"><img src="/img/itens/golden-potion.png" alt="" style="height: 20px; width: 20px; object-fit: contain;"><span class="q">0</span></button></div>

        <!-- A volta automática SÓ dispara com poção ou revive na bolsa. Sem a trava, ficar
             farmando de madrugada até acabar os itens vira um laço de morte (cada volta cobra
             a perda de XP do nocaute) que derruba o nível do treinador abaixo do mínimo dos
             próprios pokemon — ver `temCuraNaBolsa` no servidor. -->
        <label class="auto-linha">
          <input type="checkbox" id="auto-voltar-hunt"> <span data-i18n="painel.autoVoltarHunt">Voltar à hunt ao morrer/reset</span>
        </label>
        <p class="auto-dica" data-i18n="painel.autoVoltarHuntNota">só volta enquanto houver poção ou revive na mochila</p>
      </div>
    </div>

    <div class="painel chat cresce" id="p-chat">
      <!-- A barra de canais É o cabeçalho do chat: recolhido, ela é tudo o que sobra — e os
           selos de não-lidas continuam à vista, que é o que faz valer a pena fechar. O botão
           de recolher segue o vocabulário do chat (vidro + dourado), não o da madeira, porque
           mora dentro da moldura dele — ver §5 do DESIGN.md. -->
      <div class="chat-abas">
        <!-- OS CANAIS, sempre à vista: um botão por canal, em grade de dois, cada um com o seu
             número de mensagens novas. Até 04/10/2026 eram um seletor só (o canal de agora + um
             menu com os outros), e o canal que não estava aberto sumia da tela — o Mundo levava
             a conversa e a Guild ficava esquecida. Os botões são montados pelo JS
             (`montarBotoesCanais`): a Guild só aparece para quem tem guild. -->
        <div class="chat-canais" id="chat-canais" role="tablist" data-i18n-attr="aria-label:chat.canais" data-montado="mundo,comercio,duvidas,guild|pt" aria-label="Canais do chat">
    <button type="button" role="tab" class="chat-canal-bt" data-canal="mundo" aria-controls="chat-msgs" title="Conversa geral com todo mundo" aria-selected="false" tabindex="-1" aria-label="Mundo: 195 novas">
      <span class="chat-canal-emoji" aria-hidden="true">🌎</span>
      <span class="chat-canal-nome">Mundo</span>
      <span class="chat-aba-selo" aria-hidden="true">99+</span>
    </button>
    <button type="button" role="tab" class="chat-canal-bt lateral on" data-canal="comercio" aria-controls="chat-msgs" title="Compra, venda e anúncios do Market" aria-selected="true" tabindex="0" aria-label="Comércio">
      <span class="chat-canal-emoji" aria-hidden="true">💰</span>
      <span class="chat-canal-nome">Comércio</span>
      <span class="chat-aba-selo hidden" aria-hidden="true">0</span>
    </button>
    <button type="button" role="tab" class="chat-canal-bt lateral" data-canal="duvidas" aria-controls="chat-msgs" title="Perguntas sobre o jogo" aria-selected="false" tabindex="-1" aria-label="Dúvidas: 92 novas">
      <span class="chat-canal-emoji" aria-hidden="true">❓</span>
      <span class="chat-canal-nome">Dúvidas</span>
      <span class="chat-aba-selo" aria-hidden="true">92</span>
    </button>
    <button type="button" role="tab" class="chat-canal-bt" data-canal="guild" aria-controls="chat-msgs" title="Só a sua guild" aria-selected="false" tabindex="-1" aria-label="Guild: 110 novas">
      <span class="chat-canal-emoji" aria-hidden="true">⚔️</span>
      <span class="chat-canal-nome">Guild</span>
      <span class="chat-aba-selo" aria-hidden="true">99+</span>
    </button></div>
        <!-- As ferramentas da barra, numa coluna à direita dos canais: o × dos ignorados em cima
             (entra aqui, por montarIgnoradosDoChat()) e o recolher embaixo. As bandeirinhas de
             idioma do chat saíram em 28/10/2026: a conversa é uma sala só. -->
        <div class="chat-ferramentas"><button type="button" id="chat-ignorados-btn" class="chat-ignorados-btn" title="Jogadores ignorados" aria-label="Jogadores ignorados">×</button>
          <button type="button" id="btn-chat-toggle" class="chat-min-btn" aria-expanded="true" data-i18n-attr="title:tip.chatRecolher;aria-label:tip.chatRecolher" title="Recolher chat" aria-label="Recolher chat">
            <svg class="ico-chevron" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 10l5 5 5-5z" fill="currentColor"></path></svg>
            <!-- No rail os canais somem, e com eles os números de não-lidas. Este é o substituto:
                 a soma do Mundo e da Guild, para fechar o chat nunca virar ficar cego para ele. -->
            <span class="painel-ico" aria-hidden="true">
              <svg viewBox="0 0 24 24"><path d="M4 4h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H9l-5 4V6a2 2 0 0 1 2-2z" fill="currentColor"></path><circle cx="8" cy="11" r="1.3" fill="var(--vao)"></circle><circle cx="12" cy="11" r="1.3" fill="var(--vao)"></circle><circle cx="16" cy="11" r="1.3" fill="var(--vao)"></circle></svg>
            </span>
            <b class="painel-ico-selo selo-novas" id="chat-cnt-rail" aria-hidden="true">99+</b>
          </button>
        </div>
      <div id="chat-ignorados-panel" class="chat-ignorados-panel hidden" role="dialog" aria-hidden="true">
    <div class="chat-ignorados-titulo" id="chat-ignorados-titulo">Ignorados</div>
    <div class="chat-ignorados-vazio" id="chat-ignorados-vazio">Ninguém ignorado.</div>
    <div class="chat-ignorados-lista" id="chat-ignorados-lista"></div></div></div>
      <!-- O vão precisa ser posicionado: a pílula "novas mensagens" flutua sobre a lista, e
           só faz sentido ancorada no rodapé DELA, não do painel. -->
      <div class="chat-vao">
        <div class="chat-msgs" id="chat-msgs"><div data-msg-id="8686b5d5-0d43-480d-b27d-895eb3dae3c2" data-de="vitorcgms" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">13:59</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>vitorcgms<span class="m-nv"> [2730]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="994270">estou anunciando 1x de <b class="m-anuncio-nome">Fragmento de MEGA Shiny Stone</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">475 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="vitorcgms" title="Responder a @vitorcgms" aria-label="Responder a @vitorcgms"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="198c70ab-c799-44f6-b4bd-1c537b6e9be3" data-de="hunterafarmm" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">14:00</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>hunterafarmm<span class="m-nv"> [616]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="972407">estou anunciando 1x de <b class="m-anuncio-nome">✨ Snorlax Nv 110</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">4.000 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="hunterafarmm" title="Responder a @hunterafarmm" aria-label="Responder a @hunterafarmm"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="2932768e-f4e1-48bf-b23e-6b7ff2e2bbc1" data-de="Jurandirfsax" class="chat-msg vip"><span class="m-hora">14:00</span> <span class="m-de m-nick"><span class="m-guild-tag" style="--gt:#ef476f">ROD</span>Jurandirfsax<span class="m-nv"> [43]</span>:</span> <span class="m-txt">Galera como pega gemas</span><button type="button" class="m-responder" data-nick="Jurandirfsax" title="Responder a @Jurandirfsax" aria-label="Responder a @Jurandirfsax"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="a055e070-129a-40db-b728-4e829c2d9383" data-de="seven" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">14:00</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>seven<span class="m-nv"> [826]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="871185">estou anunciando 1x de <b class="m-anuncio-nome">Charizard Nv 80</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">100 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="seven" title="Responder a @seven" aria-label="Responder a @seven"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="236210a9-4115-4423-b3ec-0e8bf1483633" data-de="streameradm" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">14:01</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>streameradm<span class="m-nv"> [1255]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="964478">estou anunciando 1x de <b class="m-anuncio-nome">Tyranitar Nv 1.003</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">200 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="streameradm" title="Responder a @streameradm" aria-label="Responder a @streameradm"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="a22eafe0-ae2b-4731-9c0b-6c9df078bc03" data-de="Jurandirfsax" class="chat-msg vip"><span class="m-hora">14:01</span> <span class="m-de m-nick"><span class="m-guild-tag" style="--gt:#ef476f">ROD</span>Jurandirfsax<span class="m-nv"> [43]</span>:</span> <span class="m-txt">Me diga ai pessoal</span><button type="button" class="m-responder" data-nick="Jurandirfsax" title="Responder a @Jurandirfsax" aria-label="Responder a @Jurandirfsax"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="8b54e26b-cb52-4eec-b2ae-152bcdf7acfa" data-de="TrueDMG" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">14:02</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>TrueDMG<span class="m-nv"> [901]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="998477">estou anunciando 1x de <b class="m-anuncio-nome">Darkness Stone</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">27 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="TrueDMG" title="Responder a @TrueDMG" aria-label="Responder a @TrueDMG"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="210bc84e-bc6d-44db-b0c9-20d14fc0af84" data-de="Martion" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">14:02</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>Martion<span class="m-nv"> [2924]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="938995">estou anunciando 1x de <b class="m-anuncio-nome">Mega Garchomp Nv 1.127</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">4.920 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="Martion" title="Responder a @Martion" aria-label="Responder a @Martion"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="27858efc-52d3-499e-bebc-dc35834712de" data-de="FabioCapo" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">14:02</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>FabioCapo<span class="m-nv"> [863]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="1005354">estou anunciando 1x de <b class="m-anuncio-nome">Larvitar Nv 21</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">3.500 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="FabioCapo" title="Responder a @FabioCapo" aria-label="Responder a @FabioCapo"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="d8950688-e1b2-4d36-9c94-b6ba674b842a" data-de="wolva" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">14:02</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>wolva<span class="m-nv"> [3265]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="993454">estou anunciando 1x de <b class="m-anuncio-nome">✨ Mega Tyranitar Nv 3.076</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">43.000 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="wolva" title="Responder a @wolva" aria-label="Responder a @wolva"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="749a0ede-98a2-4267-8b4c-dfce30fea567" data-de="Baudus" class="chat-msg vip"><span class="m-hora">14:03</span> <span class="m-de m-nick"><span class="m-guild-tag" style="--gt:#c89bff">PKT</span>Baudus<span class="m-nv"> [254]</span>:</span> <span class="m-txt">compro 2 casas comum a 1.2 cada</span><button type="button" class="m-responder" data-nick="Baudus" title="Responder a @Baudus" aria-label="Responder a @Baudus"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="980c2aca-5a31-4f2d-ac2a-9117c7d06e6e" data-de="wotzy_boy" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">14:03</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>wotzy_boy<span class="m-nv"> [960]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="1005387">estou anunciando 1x de <b class="m-anuncio-nome">Furious Scizor Nv 109</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">50 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="wotzy_boy" title="Responder a @wotzy_boy" aria-label="Responder a @wotzy_boy"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="5667ef24-247a-4bc5-9825-95d5c5f9e9a6" data-de="WadeWatts" class="chat-msg compartilhar"><span class="m-hora">14:03</span> <span class="m-de m-nick">WadeWatts<span class="m-nv"> [36]</span>:</span> <span class="m-txt">Veja meu pokemon! <button type="button" class="m-pk-link" data-nick="WadeWatts" data-pk="110289413"><i>Bulbasaur</i></button></span><button type="button" class="m-responder" data-nick="WadeWatts" title="Responder a @WadeWatts" aria-label="Responder a @WadeWatts"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="83b754d4-52ad-42e3-9639-83c4c0ff510b" data-de="seleumorreu" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">14:04</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>seleumorreu<span class="m-nv"> [237]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="987233">estou anunciando 1x de <b class="m-anuncio-nome">✨ Alakazam Nv 118</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">22.000 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="seleumorreu" title="Responder a @seleumorreu" aria-label="Responder a @seleumorreu"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="77723047-bb04-49e1-acfe-54cc7d01b3b6" data-de="WilkersonXD" class="chat-msg vip"><span class="m-hora">14:05</span> <span class="m-de m-nick"><span class="m-guild-tag" style="--gt:#ff006e">TBA</span>WilkersonXD<span class="m-nv"> [960]</span>:</span> <span class="m-txt">Vendo GHOLDENGO LVL 100  a 150 gemas....... Vendo VOLCARONA LVL  793 A 390 Gemas .... são as unicas da loja!!!!!!!!!!!!!!!!</span><button type="button" class="m-responder" data-nick="WilkersonXD" title="Responder a @WilkersonXD" aria-label="Responder a @WilkersonXD"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="ca0f3f50-fdab-4e25-bb71-e7b7b9560f75" data-de="zikamelo" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">14:05</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>zikamelo<span class="m-nv"> [3681]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="1005489">estou anunciando 1x de <b class="m-anuncio-nome">✨ Glaceon Nv 3.078</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">25.000 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="zikamelo" title="Responder a @zikamelo" aria-label="Responder a @zikamelo"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="502c16cb-5a92-452d-9f79-78d295dd5c5b" data-de="SchneiderLL" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">14:06</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>SchneiderLL<span class="m-nv"> [1915]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="1005338">estou anunciando 1x de <b class="m-anuncio-nome">✨ Gengar Nv 1.142</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">11.000 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="SchneiderLL" title="Responder a @SchneiderLL" aria-label="Responder a @SchneiderLL"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="1a31ff4d-7afa-41c2-88b4-ae73be3c691e" data-de="Kirito075" class="chat-msg compartilhar"><span class="m-hora">14:07</span> <span class="m-de m-nick">Kirito075<span class="m-nv"> [46]</span>:</span> <span class="m-txt">Veja meu pokemon! <button type="button" class="m-pk-link" data-nick="Kirito075" data-pk="93162563"><i>Charmeleon</i></button></span><button type="button" class="m-responder" data-nick="Kirito075" title="Responder a @Kirito075" aria-label="Responder a @Kirito075"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="cde6f13b-1d05-4a7d-9bcc-27c0e59acb04" data-de="Avzaen" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">14:07</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>Avzaen<span class="m-nv"> [1262]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="1005625">estou anunciando 1x de <b class="m-anuncio-nome">Aggron Nv 110</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">230 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="Avzaen" title="Responder a @Avzaen" aria-label="Responder a @Avzaen"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="035b60a8-587a-4f0f-b673-75a49809da08" data-de="WilkersonXD" class="chat-msg vip"><span class="m-hora">14:08</span> <span class="m-de m-nick"><span class="m-guild-tag" style="--gt:#ff006e">TBA</span>WilkersonXD<span class="m-nv"> [960]</span>:</span> <span class="m-txt">Vendo GHOLDENGO LVL 100  a 150 gemas....... Vendo VOLCARONA LVL  793 A 390 Gemas .... são as unicas da loja!!!!!!!!!!!!!!!!</span><button type="button" class="m-responder" data-nick="WilkersonXD" title="Responder a @WilkersonXD" aria-label="Responder a @WilkersonXD"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="79411393-196f-4c0f-92cb-33c51338cba7" data-de="AFRICANO" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">14:09</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>AFRICANO<span class="m-nv"> [1432]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="1003033">estou anunciando 1x de <b class="m-anuncio-nome">Earth Stone</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">218 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="AFRICANO" title="Responder a @AFRICANO" aria-label="Responder a @AFRICANO"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="8f7d4339-88d0-48f9-8233-ebb0a1fe9811" data-de="Punister" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">14:09</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>Punister<span class="m-nv"> [2312]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="1005700">estou anunciando 1x de <b class="m-anuncio-nome">Cocoon Stone</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">323 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="Punister" title="Responder a @Punister" aria-label="Responder a @Punister"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="7b583dfe-b16c-41fc-ac2d-b4e924e79bad" data-de="Kedrov" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">14:09</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>Kedrov<span class="m-nv"> [1568]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="1002589">estou anunciando 1x de <b class="m-anuncio-nome">✨ Steelix Nv 1.443</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">12.000 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="Kedrov" title="Responder a @Kedrov" aria-label="Responder a @Kedrov"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="60feffcd-0a90-460d-9372-b5c5a3293d3d" data-de="Grovike" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">14:09</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>Grovike<span class="m-nv"> [3456]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="564517">estou anunciando 1x de <b class="m-anuncio-nome">Mega Steelix Nv 800</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">1.030 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="Grovike" title="Responder a @Grovike" aria-label="Responder a @Grovike"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="e1e78fb0-cdf5-4a24-933f-1cd95f1f8c94" data-de="MegaScar" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">14:10</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>MegaScar<span class="m-nv"> [897]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="981604">estou anunciando 1x de <b class="m-anuncio-nome">✨ Pupitar Nv 40</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">20.000 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="MegaScar" title="Responder a @MegaScar" aria-label="Responder a @MegaScar"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="e0e7c474-0065-4e62-b5b9-e85520d55bc5" data-de="flavinho_" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">14:10</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>flavinho_<span class="m-nv"> [976]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="910229">estou anunciando 1x de <b class="m-anuncio-nome">✨ Graveler Nv 44</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">900 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="flavinho_" title="Responder a @flavinho_" aria-label="Responder a @flavinho_"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="826b0dd2-6c74-4bc0-82b1-84f12a2fd499" data-de="guideras" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">14:12</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>guideras<span class="m-nv"> [1518]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="926044">estou anunciando 1x de <b class="m-anuncio-nome">✨ Larvitar Nv 20</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">3.000 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="guideras" title="Responder a @guideras" aria-label="Responder a @guideras"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="fb5908d1-d7ee-4add-a55e-d24d1179ecc3" data-de="AratSovala4" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">14:13</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>AratSovala4<span class="m-nv"> [1476]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="975487">estou anunciando 1x de <b class="m-anuncio-nome">✨ Snorunt Nv 40</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">2.500 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="AratSovala4" title="Responder a @AratSovala4" aria-label="Responder a @AratSovala4"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="eb938ff6-7471-406d-9b38-0264b0fa58c8" data-de="Jakend" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">14:13</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>Jakend<span class="m-nv"> [318]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="989284">estou anunciando 1x de <b class="m-anuncio-nome">Fragmento de Bicicleta</b> por <b class="m-anuncio-preco"><img src="/assets/site/assets/ui/moeda-ouro.png" alt="">750.477.777 Coins</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span></div><div data-msg-id="9977c498-5ee5-46ec-a6b1-a7c946f85728" data-de="WilkersonXD" class="chat-msg vip"><span class="m-hora">14:13</span> <span class="m-de m-nick"><span class="m-guild-tag" style="--gt:#ff006e">TBA</span>WilkersonXD<span class="m-nv"> [960]</span>:</span> <span class="m-txt">Vendo GHOLDENGO LVL 100  a 150 gemas....... Vendo VOLCARONA LVL  793 A 390 Gemas .... são as unicas da loja!!!!!!!!!!!!!!!!</span><button type="button" class="m-responder" data-nick="WilkersonXD" title="Responder a @WilkersonXD" aria-label="Responder a @WilkersonXD"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="7fc32803-3fea-4bb0-be8e-67dff33a8c3f" data-de="DeNe" class="chat-msg compartilhar"><span class="m-hora">14:15</span> <span class="m-de m-nick">DeNe<span class="m-nv"> [181]</span>:</span> <span class="m-txt">Veja meu pokemon! <button type="button" class="m-pk-link" data-nick="DeNe" data-pk="76448940"><i>Charizard</i></button></span><button type="button" class="m-responder" data-nick="DeNe" title="Responder a @DeNe" aria-label="Responder a @DeNe"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="950c566f-09e2-4488-92e4-d0db3f7bc1f2" data-de="nikuhl" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">14:16</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>nikuhl<span class="m-nv"> [3593]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="1004578">estou anunciando 1x de <b class="m-anuncio-nome">✨ Mega Raichu X Nv 2.136</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">18.000 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="nikuhl" title="Responder a @nikuhl" aria-label="Responder a @nikuhl"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="2d1fd029-f100-4544-ae88-24adc710bc67" data-de="artbruno" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">14:18</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>artbruno<span class="m-nv"> [4230]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="1006050">estou anunciando 1x de <b class="m-anuncio-nome">✨ Mega Dragonite Nv 4.032</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">170.000.000 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="artbruno" title="Responder a @artbruno" aria-label="Responder a @artbruno"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="eb46fe77-c084-488d-abf5-d6ad63ad6a78" data-de="Staz990" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">14:18</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>Staz990<span class="m-nv"> [1146]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="970871">estou anunciando 1x de <b class="m-anuncio-nome">✨ Skiploom Nv 50</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">2.555 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="Staz990" title="Responder a @Staz990" aria-label="Responder a @Staz990"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="f232cc1f-094b-430c-b8e1-8ff2af408bab" data-de="HiroKu" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">14:19</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>HiroKu<span class="m-nv"> [1041]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="715943">estou anunciando 1x de <b class="m-anuncio-nome">✨ Larvitar Nv 20</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">3.800 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="HiroKu" title="Responder a @HiroKu" aria-label="Responder a @HiroKu"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="2d58112b-b565-4d86-a11d-21e18d8a05aa" data-de="Rom5k" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">14:19</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>Rom5k<span class="m-nv"> [365]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="986280">estou anunciando 1x de <b class="m-anuncio-nome">Umbreon Nv 102</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">2.239 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="Rom5k" title="Responder a @Rom5k" aria-label="Responder a @Rom5k"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="c84e9eb7-cd3e-4a27-ada5-fde951f9f4d3" data-de="Hefeus" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">14:20</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>Hefeus<span class="m-nv"> [821]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="1006033">estou anunciando 1x de <b class="m-anuncio-nome">✨ Gastly Nv 237</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">2.400 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="Hefeus" title="Responder a @Hefeus" aria-label="Responder a @Hefeus"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="dbc22fda-d4bf-4f50-9d00-afe9da5a14fd" data-de="WilkersonXD" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">14:20</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>WilkersonXD<span class="m-nv"> [960]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="872934">estou anunciando 1x de <b class="m-anuncio-nome">Typhlosion Nv 100</b> por <b class="m-anuncio-preco"><img src="/assets/site/assets/ui/moeda-ouro.png" alt="">750.000.000 Coins</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="WilkersonXD" title="Responder a @WilkersonXD" aria-label="Responder a @WilkersonXD"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="60354bff-04ab-43d1-840e-df79dc5eaf66" data-de="Nezking" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">14:21</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>Nezking<span class="m-nv"> [1588]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="1002326">estou anunciando 1x de <b class="m-anuncio-nome">✨ Forretress Nv 1.564</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">3.800 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="Nezking" title="Responder a @Nezking" aria-label="Responder a @Nezking"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="5e0dd010-207f-4abd-b395-742eb9a27073" data-de="PBorella" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">14:21</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>PBorella<span class="m-nv"> [1074]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="960773">estou anunciando 1x de <b class="m-anuncio-nome">Squirtle Nv 53</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">1.050 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="PBorella" title="Responder a @PBorella" aria-label="Responder a @PBorella"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="9346242d-5c10-4b8c-a992-1a720e84372a" data-de="Crow3" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">14:21</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>Crow3<span class="m-nv"> [1279]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="912480">estou anunciando 1x de <b class="m-anuncio-nome">✨ Dragonite Nv 1.211</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">11.000 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="Crow3" title="Responder a @Crow3" aria-label="Responder a @Crow3"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="91adcd29-e5e7-4604-b337-22f849b0a571" data-de="Bezeno" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">14:21</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>Bezeno<span class="m-nv"> [5187]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="993142">estou anunciando 1x de <b class="m-anuncio-nome">✨ Mega Lucario Z Nv 3.296</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">17.000 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="Bezeno" title="Responder a @Bezeno" aria-label="Responder a @Bezeno"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="14248129-7fce-47d3-99e5-a0ae85674219" data-de="TremBalla4" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">14:21</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>TremBalla4<span class="m-nv"> [1078]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="982413">estou anunciando 1x de <b class="m-anuncio-nome">✨ Torchic Nv 118</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">3.000 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="TremBalla4" title="Responder a @TremBalla4" aria-label="Responder a @TremBalla4"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="61cc60aa-b025-4001-b37c-9c9b46383b76" data-de="pekenoo" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">14:21</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>pekenoo<span class="m-nv"> [3143]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="948266">estou anunciando 1x de <b class="m-anuncio-nome">Wormadam Nv 1.073</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">350 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="pekenoo" title="Responder a @pekenoo" aria-label="Responder a @pekenoo"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="5907acd0-88b5-4c79-a64c-b2850bc30b78" data-de="luigiscoz" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">14:21</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>luigiscoz<span class="m-nv"> [1250]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="1006185">estou anunciando 1x de <b class="m-anuncio-nome">Mega Charizard Y Nv 848</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">6.000 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="luigiscoz" title="Responder a @luigiscoz" aria-label="Responder a @luigiscoz"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="3fcf8227-162c-40b3-94ba-b4d35af686a7" data-de="pixell" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">14:22</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>pixell<span class="m-nv"> [2065]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="757969">estou anunciando 1x de <b class="m-anuncio-nome">✨ Buizel Nv 40</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">1.500 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="pixell" title="Responder a @pixell" aria-label="Responder a @pixell"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="40e8c973-0830-4969-81c2-7c330907b5d3" data-de="mazal" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">14:22</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>mazal<span class="m-nv"> [2153]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="903802">estou anunciando 1x de <b class="m-anuncio-nome">✨ Tyranitar Nv 1.029</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">7.982 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="mazal" title="Responder a @mazal" aria-label="Responder a @mazal"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="c9fbd4b9-659e-44b9-9ba5-6758e7120b8e" data-de="santscwb" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">14:22</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>santscwb<span class="m-nv"> [929]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="1006128">estou anunciando 1x de <b class="m-anuncio-nome">Leaf Stone</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">191 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="santscwb" title="Responder a @santscwb" aria-label="Responder a @santscwb"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="cdeac365-0712-4c55-975c-49a5d480e16f" data-de="pitoko" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">14:23</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>pitoko<span class="m-nv"> [1191]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="870750">estou anunciando 1x de <b class="m-anuncio-nome">Lucario Nv 653</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">200 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="pitoko" title="Responder a @pitoko" aria-label="Responder a @pitoko"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="e971decc-ec67-4b53-823f-106e3a7b83f9" data-de="Rustte" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">14:23</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>Rustte<span class="m-nv"> [700]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="1006131">estou anunciando 1x de <b class="m-anuncio-nome">Sneasel Nv 52</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">1.000 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="Rustte" title="Responder a @Rustte" aria-label="Responder a @Rustte"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="696ad680-8d80-49ef-8f78-c628d7461fa9" data-de="LepraLivre" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">14:24</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>LepraLivre<span class="m-nv"> [1100]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="1006298">estou anunciando 1x de <b class="m-anuncio-nome">Metal Stone</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">264 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="LepraLivre" title="Responder a @LepraLivre" aria-label="Responder a @LepraLivre"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="ff0105ad-140d-4955-8435-9698fbd6f699" data-de="BallaBalla" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">14:24</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>BallaBalla<span class="m-nv"> [443]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="1006333">estou anunciando 1x de <b class="m-anuncio-nome">Ancient Pupitar Nv 100</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">288 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="BallaBalla" title="Responder a @BallaBalla" aria-label="Responder a @BallaBalla"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="e7e2ffcf-07d5-45b1-8ae4-0f3e35023935" data-de="mlt" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">14:25</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>mlt<span class="m-nv"> [1753]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="965584">estou anunciando 1x de <b class="m-anuncio-nome">Tyranitar Nv 500</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">300 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="mlt" title="Responder a @mlt" aria-label="Responder a @mlt"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="33c258d8-c4bd-4738-8ebc-506b6ac192a1" data-de="Brincadeira" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">14:25</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>Brincadeira<span class="m-nv"> [1176]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="1005465">estou anunciando 1x de <b class="m-anuncio-nome">Slaking Nv 158</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">200 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="Brincadeira" title="Responder a @Brincadeira" aria-label="Responder a @Brincadeira"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="eb4c83bd-ff17-4528-9e6b-426e39898b25" data-de="Pulga" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">14:25</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>Pulga<span class="m-nv"> [1490]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="973674">estou anunciando 1x de <b class="m-anuncio-nome">Electivire Nv 113</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">650 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="Pulga" title="Responder a @Pulga" aria-label="Responder a @Pulga"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="c88ff5f6-defa-4300-b058-c1af4dc8d36f" data-de="HeadHunter" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">14:26</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>HeadHunter<span class="m-nv"> [857]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="1005762">estou anunciando 1x de <b class="m-anuncio-nome">✨ Numel Nv 40</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">3.000 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="HeadHunter" title="Responder a @HeadHunter" aria-label="Responder a @HeadHunter"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="30bad12f-cc57-4ed1-946d-45dbfc90d149" data-de="Stk" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">14:26</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>Stk<span class="m-nv"> [1128]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="1005772">estou anunciando 1x de <b class="m-anuncio-nome">Tyranitar Nv 694</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">2.500 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="Stk" title="Responder a @Stk" aria-label="Responder a @Stk"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="6014e400-ca69-4626-babd-e775e803b818" data-de="Whatagus" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">14:27</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>Whatagus<span class="m-nv"> [1655]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="837349">estou anunciando 16x de <b class="m-anuncio-nome">Cocoon Stone</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">8 Gemas</b> cada, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="Whatagus" title="Responder a @Whatagus" aria-label="Responder a @Whatagus"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="dec43fa6-fbd3-47d0-80e7-79d201615fb2" data-de="ch7" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">14:27</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>ch7<span class="m-nv"> [2218]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="993705">estou anunciando 1x de <b class="m-anuncio-nome">✨ Dragonite Nv 1.158</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">6.000 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="ch7" title="Responder a @ch7" aria-label="Responder a @ch7"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="216da0da-adec-45d6-97f6-afa558a4304d" data-de="zerinho" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">14:28</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>zerinho<span class="m-nv"> [1859]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="900390">estou anunciando 1x de <b class="m-anuncio-nome">✨ Mega Gyarados Nv 860</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">69.000 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="zerinho" title="Responder a @zerinho" aria-label="Responder a @zerinho"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="6354f176-a72b-4589-9358-042836f8c9eb" data-de="ribas" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">14:29</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>ribas<span class="m-nv"> [911]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="1006484">estou anunciando 1x de <b class="m-anuncio-nome">Tyranitar Nv 115</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">60 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="ribas" title="Responder a @ribas" aria-label="Responder a @ribas"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="dbc1a431-0d4f-4f0b-a17f-2d637572aa1b" data-de="Rayanlerte" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">14:29</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>Rayanlerte<span class="m-nv"> [2447]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="834552">estou anunciando 1x de <b class="m-anuncio-nome">✨ Mega Tyranitar Nv 2.399</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">33.500 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="Rayanlerte" title="Responder a @Rayanlerte" aria-label="Responder a @Rayanlerte"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="0d9a4b56-de35-4a49-929c-fb86b1d62d5b" data-de="PRIMOIDLE" class="chat-msg vip"><span class="m-hora">14:30</span> <span class="m-de m-nick">PRIMOIDLE<span class="m-nv"> [15]</span>:</span> <span class="m-txt">onde compra pot</span><button type="button" class="m-responder" data-nick="PRIMOIDLE" title="Responder a @PRIMOIDLE" aria-label="Responder a @PRIMOIDLE"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="9cd83adb-5da1-418c-b1b5-25e8c753f294" data-de="Nyck2" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">14:30</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>Nyck2<span class="m-nv"> [1322]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="775274">estou anunciando 1x de <b class="m-anuncio-nome">✨ Treecko Nv 196</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">1.850 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="Nyck2" title="Responder a @Nyck2" aria-label="Responder a @Nyck2"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="e484979c-eb50-4408-bf2f-2719996220ae" data-de="Galeto" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">14:30</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>Galeto<span class="m-nv"> [1063]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="1004319">estou anunciando 1x de <b class="m-anuncio-nome">Gengar Nv 100</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">230 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="Galeto" title="Responder a @Galeto" aria-label="Responder a @Galeto"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="85e0e750-eb0e-407d-adac-e43225309675" data-de="jojoruski" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">14:30</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>jojoruski<span class="m-nv"> [924]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="1004905">estou anunciando 1x de <b class="m-anuncio-nome">Glaceon Nv 102</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">100 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="jojoruski" title="Responder a @jojoruski" aria-label="Responder a @jojoruski"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="5417f357-fd48-4ed1-bab2-cccac6a91d86" data-de="Scrixel" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">14:31</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>Scrixel<span class="m-nv"> [4412]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="996386">estou anunciando 1x de <b class="m-anuncio-nome">✨ Mega Tyranitar Nv 3.414</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">40.000 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="Scrixel" title="Responder a @Scrixel" aria-label="Responder a @Scrixel"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="4b9f4490-c7fd-4ad2-bf1b-9d6f0f434209" data-de="WilkersonXD" class="chat-msg vip"><span class="m-hora">14:31</span> <span class="m-de m-nick"><span class="m-guild-tag" style="--gt:#ff006e">TBA</span>WilkersonXD<span class="m-nv"> [960]</span>:</span> <span class="m-txt">VENDO POKEMONS EXOTICOS .........................................Vendo GHOLDENGO LVL 100 a 150 gemas....... Vendo VOLCARONA LVL 793 A 390 Gemas ....... Vendo ORBEETLE lvl 200 a 200 Gemas ............</span><button type="button" class="m-responder" data-nick="WilkersonXD" title="Responder a @WilkersonXD" aria-label="Responder a @WilkersonXD"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="f61aa411-cff0-4a36-aee2-7e952b7e5777" data-de="Anfel" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">14:32</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>Anfel<span class="m-nv"> [1708]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="993201">estou anunciando 1x de <b class="m-anuncio-nome">Rhyperior Nv 500</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">130 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="Anfel" title="Responder a @Anfel" aria-label="Responder a @Anfel"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="30e79b72-930b-41cb-a45c-f0d983b95dfa" data-de="Yaya147" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">14:33</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>Yaya147<span class="m-nv"> [607]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="1006468">estou anunciando 1x de <b class="m-anuncio-nome">✨ Barboach Nv 41</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">550 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="Yaya147" title="Responder a @Yaya147" aria-label="Responder a @Yaya147"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="d0d612dc-37bd-4427-b52d-16396f37f153" data-de="TitO_" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">14:34</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>TitO_<span class="m-nv"> [2653]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="994350">estou anunciando 1x de <b class="m-anuncio-nome">✨ Riolu Nv 40</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">6.000 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="TitO_" title="Responder a @TitO_" aria-label="Responder a @TitO_"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="e39e49c6-8ced-4230-a27e-cd079695e768" data-de="Tafarel120" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">14:34</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>Tafarel120<span class="m-nv"> [1385]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="1006701">estou anunciando 1x de <b class="m-anuncio-nome">Fire Stone</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">177 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="Tafarel120" title="Responder a @Tafarel120" aria-label="Responder a @Tafarel120"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="84e65024-afb6-4a23-a88d-a9b57e113871" data-de="Seyn" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">14:34</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>Seyn<span class="m-nv"> [657]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="1006745">estou anunciando 1x de <b class="m-anuncio-nome">Mega Gardevoir Nv 545</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">5.000 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="Seyn" title="Responder a @Seyn" aria-label="Responder a @Seyn"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="956b5349-8260-4220-9d96-5c6224bb8330" data-de="Shawzera" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">14:35</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>Shawzera<span class="m-nv"> [2023]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="1006678">estou anunciando 1x de <b class="m-anuncio-nome">Fire Stone</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">379 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="Shawzera" title="Responder a @Shawzera" aria-label="Responder a @Shawzera"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="a1312920-f9ee-40bd-bf05-118f75a47f41" data-de="wotzy_boy" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">14:37</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>wotzy_boy<span class="m-nv"> [961]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="1005387">estou anunciando 1x de <b class="m-anuncio-nome">Furious Scizor Nv 109</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">40 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="wotzy_boy" title="Responder a @wotzy_boy" aria-label="Responder a @wotzy_boy"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="1ad21038-eb60-46ce-98ae-480d62e94d66" data-de="ribas31" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">14:37</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>ribas31<span class="m-nv"> [676]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="1005713">estou anunciando 1x de <b class="m-anuncio-nome">Garchomp Nv 310</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">75 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="ribas31" title="Responder a @ribas31" aria-label="Responder a @ribas31"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="25b50bc3-ac32-47c0-a67d-ef1f447ff678" data-de="WilkersonXD" class="chat-msg vip"><span class="m-hora">14:38</span> <span class="m-de m-nick"><span class="m-guild-tag" style="--gt:#ff006e">TBA</span>WilkersonXD<span class="m-nv"> [961]</span>:</span> <span class="m-txt">VENDO POKEMONS EXOTICOS .......Vendo GHOLDENGO LVL 100 a 150 gemas....... Vendo VOLCARONA LVL 793 A 390 Gemas ....... Vendo ORBEETLE lvl 200 a 200 Gemas ....... Vendo EELEKTROSS LVL 200 a 250 Gemas...</span><button type="button" class="m-responder" data-nick="WilkersonXD" title="Responder a @WilkersonXD" aria-label="Responder a @WilkersonXD"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="55e7b0b0-a989-4a8d-bef8-3e273f3e27f0" data-de="ArTIO" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">14:38</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>ArTIO<span class="m-nv"> [1311]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="1006928">estou anunciando 18x de <b class="m-anuncio-nome">Bronze Boss Token</b> por <b class="m-anuncio-preco"><img src="/assets/site/assets/ui/moeda-ouro.png" alt="">16.000.000 Coins</b> cada, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="ArTIO" title="Responder a @ArTIO" aria-label="Responder a @ArTIO"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="52b5d748-7cd5-4c6e-b661-73e11ca3fcc5" data-de="PPN13" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">14:38</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>PPN13<span class="m-nv"> [2180]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="952431">estou anunciando 1x de <b class="m-anuncio-nome">Kangaskhan Nv 1.032</b> por <b class="m-anuncio-preco"><img src="/assets/site/assets/ui/moeda-ouro.png" alt="">1.000.000.000 Coins</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="PPN13" title="Responder a @PPN13" aria-label="Responder a @PPN13"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="4dd8e76a-02c7-41c0-8de1-a6157203fedc" data-de="AratSovala" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">14:39</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>AratSovala<span class="m-nv"> [3339]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="966622">estou anunciando 1x de <b class="m-anuncio-nome">Dragonite Nv 1.000</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">450 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="AratSovala" title="Responder a @AratSovala" aria-label="Responder a @AratSovala"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="5113fff7-a946-4399-9788-9a29adc710e4" data-de="iAnfel" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">14:39</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>iAnfel<span class="m-nv"> [1579]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="883852">estou anunciando 1x de <b class="m-anuncio-nome">Camerupt Nv 100</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">100 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="iAnfel" title="Responder a @iAnfel" aria-label="Responder a @iAnfel"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="88cbb305-1598-4109-a175-983298e6195b" data-de="VelhoAnarchy" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">14:40</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>VelhoAnarchy<span class="m-nv"> [212]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="1006977">estou anunciando 1x de <b class="m-anuncio-nome">Bronze Boss Token</b> por <b class="m-anuncio-preco"><img src="/assets/site/assets/ui/moeda-ouro.png" alt="">15.081.000 Coins</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="VelhoAnarchy" title="Responder a @VelhoAnarchy" aria-label="Responder a @VelhoAnarchy"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="ff4937be-da34-4bc7-b152-ab4c1862a3b9" data-de="Kahs2" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">14:40</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>Kahs2<span class="m-nv"> [1202]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="1006984">estou anunciando 18x de <b class="m-anuncio-nome">Bronze Boss Token</b> por <b class="m-anuncio-preco"><img src="/assets/site/assets/ui/moeda-ouro.png" alt="">16.000.000 Coins</b> cada, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="Kahs2" title="Responder a @Kahs2" aria-label="Responder a @Kahs2"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="fe0d4637-42e9-4795-a906-b96d6fcb6e09" data-de="Lucaobauru" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">14:41</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>Lucaobauru<span class="m-nv"> [1532]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="997514">estou anunciando 1x de <b class="m-anuncio-nome">✨ Shedinja Nv 439</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">690 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="Lucaobauru" title="Responder a @Lucaobauru" aria-label="Responder a @Lucaobauru"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="b445a33a-99ef-4a4b-b460-9b703ddde96e" data-de="Bigulin4" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">14:41</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>Bigulin4<span class="m-nv"> [1291]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="840440">estou anunciando 1x de <b class="m-anuncio-nome">Mega Tyranitar Nv 1.247</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">5.900 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="Bigulin4" title="Responder a @Bigulin4" aria-label="Responder a @Bigulin4"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="703c8581-f6d3-497c-92e9-01aa19b8469a" data-de="Garoi" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">14:42</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>Garoi<span class="m-nv"> [1068]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="999629">estou anunciando 2.726x de <b class="m-anuncio-nome">Rock Stone</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">2 Gemas</b> cada, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="Garoi" title="Responder a @Garoi" aria-label="Responder a @Garoi"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="ba828be8-ac46-4215-a8cd-886b98a7c8c6" data-de="HTNededl" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">14:42</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>HTNededl<span class="m-nv"> [1360]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="940424">estou anunciando 1x de <b class="m-anuncio-nome">✨ Mega Gyarados Nv 905</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">15.000 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="HTNededl" title="Responder a @HTNededl" aria-label="Responder a @HTNededl"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="c24d1d97-d846-493d-b5fa-9aaa77167498" data-de="LanaRhoades" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">14:42</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>LanaRhoades<span class="m-nv"> [1170]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="1007100">estou anunciando 16x de <b class="m-anuncio-nome">Bronze Boss Token</b> por <b class="m-anuncio-preco"><img src="/assets/site/assets/ui/moeda-ouro.png" alt="">16.000.000 Coins</b> cada, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="LanaRhoades" title="Responder a @LanaRhoades" aria-label="Responder a @LanaRhoades"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="45b1ed21-7cb3-4e07-bfa9-19f8352f793e" data-de="Hurley" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">14:43</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>Hurley<span class="m-nv"> [1610]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="981094">estou anunciando 187x de <b class="m-anuncio-nome">Earth Stone</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">2 Gemas</b> cada, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="Hurley" title="Responder a @Hurley" aria-label="Responder a @Hurley"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="c8171ce5-6a24-4f45-b272-b118d082239e" data-de="guideras" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">14:44</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>guideras<span class="m-nv"> [1519]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="926044">estou anunciando 1x de <b class="m-anuncio-nome">✨ Larvitar Nv 20</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">3.000 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="guideras" title="Responder a @guideras" aria-label="Responder a @guideras"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="7f62618d-cb70-48fc-8bcb-76bfc7f182ba" data-de="tdfau" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">14:44</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>tdfau<span class="m-nv"> [2556]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="974867">estou anunciando 1x de <b class="m-anuncio-nome">✨ Mega Victreebel Nv 2.012</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">19.071 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="tdfau" title="Responder a @tdfau" aria-label="Responder a @tdfau"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="1eac59ca-8889-45c9-a998-1ca57af9e21e" data-de="Nations" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">14:45</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>Nations<span class="m-nv"> [4550]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="1007226">estou anunciando 1x de <b class="m-anuncio-nome">Mega Tyranitar Nv 2.276</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">6.100 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="Nations" title="Responder a @Nations" aria-label="Responder a @Nations"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="989cd3cc-79ac-4b99-8c92-25280498ab20" data-de="MrSimplicio2" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">14:45</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>MrSimplicio2<span class="m-nv"> [856]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="981745">estou anunciando 12x de <b class="m-anuncio-nome">Bronze Boss Token</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">4 Gemas</b> cada, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="MrSimplicio2" title="Responder a @MrSimplicio2" aria-label="Responder a @MrSimplicio2"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="3dde3f15-1fc9-486b-bfdf-eadef06aeea7" data-de="bilizome2" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">14:45</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>bilizome2<span class="m-nv"> [923]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="1006854">estou anunciando 1x de <b class="m-anuncio-nome">Scizor Nv 100</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">40 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="bilizome2" title="Responder a @bilizome2" aria-label="Responder a @bilizome2"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="fa1a7fdc-9c9a-4176-ab46-eed987cc28f4" data-de="FelgarThor" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">14:48</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>FelgarThor<span class="m-nv"> [1619]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="982620">estou anunciando 1x de <b class="m-anuncio-nome">Abomasnow Nv 205</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">573 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="FelgarThor" title="Responder a @FelgarThor" aria-label="Responder a @FelgarThor"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="9e20b0cb-0be3-4165-9a69-fb97d324f4de" data-de="xAlanx" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">14:49</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>xAlanx<span class="m-nv"> [5379]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="904600">estou anunciando 1x de <b class="m-anuncio-nome">✨ Mega Blaziken Nv 4.465</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">42.000 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="xAlanx" title="Responder a @xAlanx" aria-label="Responder a @xAlanx"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="46f27965-7015-4089-8bd1-70451e9a9116" data-de="Dunadan" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">14:49</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>Dunadan<span class="m-nv"> [2508]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="938467">estou anunciando 1x de <b class="m-anuncio-nome">✨ Sunflora Nv 1.176</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">2.485 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="Dunadan" title="Responder a @Dunadan" aria-label="Responder a @Dunadan"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="be9846f9-847f-455d-885a-022cbafbbaab" data-de="artbruno" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">14:49</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>artbruno<span class="m-nv"> [4232]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="1007428">estou anunciando 1x de <b class="m-anuncio-nome">✨ Mega Dragonite Nv 4.033</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">160.000 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="artbruno" title="Responder a @artbruno" aria-label="Responder a @artbruno"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="d8d6634a-3193-4c5c-9628-46ec7516ac05" data-de="Ragnar01" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">14:50</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>Ragnar01<span class="m-nv"> [1262]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="1007196">estou anunciando 1x de <b class="m-anuncio-nome">Common Bicycle #001089</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">1.150 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="Ragnar01" title="Responder a @Ragnar01" aria-label="Responder a @Ragnar01"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="51148356-9f11-4b8f-b384-1521ae2c0f3a" data-de="tobe" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">14:51</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>tobe<span class="m-nv"> [1152]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="1007289">estou anunciando 12x de <b class="m-anuncio-nome">Bronze Boss Token</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">4 Gemas</b> cada, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="tobe" title="Responder a @tobe" aria-label="Responder a @tobe"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="229d6956-0ab8-4b89-8ddc-fa133b6cedbe" data-de="GBelli" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">14:51</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>GBelli<span class="m-nv"> [2230]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="979253">estou anunciando 1x de <b class="m-anuncio-nome">Mega Tyranitar Nv 1.752</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">4.800 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="GBelli" title="Responder a @GBelli" aria-label="Responder a @GBelli"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="353fb1c0-4343-4b06-a54b-70398f6c95ab" data-de="powerguide" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">14:51</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>powerguide<span class="m-nv"> [1255]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="937095">estou anunciando 1x de <b class="m-anuncio-nome">Enraged Typhlosion Nv 100</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">3.000 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="powerguide" title="Responder a @powerguide" aria-label="Responder a @powerguide"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="0b778db7-5671-408a-8d84-4f1d97d3fade" data-de="Chernobyl" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">14:51</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>Chernobyl<span class="m-nv"> [837]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="1003012">estou anunciando 1x de <b class="m-anuncio-nome">AoE TM Disk Piece</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">292 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="Chernobyl" title="Responder a @Chernobyl" aria-label="Responder a @Chernobyl"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="edd1dcb8-39c4-4b20-9dd1-5130478a4953" data-de="Benn" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">14:52</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>Benn<span class="m-nv"> [727]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="1007432">estou anunciando 638x de <b class="m-anuncio-nome">Cocoon Stone</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">2 Gemas</b> cada, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="Benn" title="Responder a @Benn" aria-label="Responder a @Benn"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="dae11e90-297f-48b8-a7a7-11daf58b1833" data-de="Nezking" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">14:54</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>Nezking<span class="m-nv"> [1588]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="1002326">estou anunciando 1x de <b class="m-anuncio-nome">✨ Forretress Nv 1.564</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">3.000 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="Nezking" title="Responder a @Nezking" aria-label="Responder a @Nezking"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="7d0bf9fe-09aa-4f97-9235-20ac3cdd12e9" data-de="opirudo" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">14:54</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>opirudo<span class="m-nv"> [904]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="1007517">estou anunciando 1x de <b class="m-anuncio-nome">✨ Larvitar Nv 296</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">3.250 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="opirudo" title="Responder a @opirudo" aria-label="Responder a @opirudo"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="d0fa09fd-56b0-4712-9ebb-2794c159ca98" data-de="VoltzzXD" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">14:55</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>VoltzzXD<span class="m-nv"> [1480]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="1007616">estou anunciando 1x de <b class="m-anuncio-nome">Leaf Stone</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">313 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="VoltzzXD" title="Responder a @VoltzzXD" aria-label="Responder a @VoltzzXD"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="e99db416-a75d-4517-b205-aea531fe2601" data-de="alxoly3" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">14:56</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>alxoly3<span class="m-nv"> [1912]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="903210">estou anunciando 1x de <b class="m-anuncio-nome">✨ Snover Nv 40</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">2.000 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="alxoly3" title="Responder a @alxoly3" aria-label="Responder a @alxoly3"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="dbfbdd41-86fb-4bec-a277-aef60a0ce61b" data-de="SchneiderLL" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">14:56</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>SchneiderLL<span class="m-nv"> [1918]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="1005338">estou anunciando 1x de <b class="m-anuncio-nome">✨ Gengar Nv 1.142</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">10.500 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="SchneiderLL" title="Responder a @SchneiderLL" aria-label="Responder a @SchneiderLL"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="7d21a3d1-e4f9-4d72-8ebc-772ef5f476f2" data-de="Harmuulzinho" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">14:57</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>Harmuulzinho<span class="m-nv"> [1043]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="992311">estou anunciando 1x de <b class="m-anuncio-nome">Charizard Nv 80</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">1.000 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="Harmuulzinho" title="Responder a @Harmuulzinho" aria-label="Responder a @Harmuulzinho"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="6826122f-c944-4ced-939f-3b466b7a4fee" data-de="VishBrito" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">14:57</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>VishBrito<span class="m-nv"> [1710]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="960473">estou anunciando 1x de <b class="m-anuncio-nome">✨ Tyranitar Nv 1.710</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">8.000 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="VishBrito" title="Responder a @VishBrito" aria-label="Responder a @VishBrito"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="58da21fb-129b-4c64-9194-ba58473c1ff4" data-de="nLeuo" class="chat-msg vip"><span class="m-hora">14:58</span> <span class="m-de m-nick"><span class="m-guild-tag" style="--gt:#ef476f">ROD</span>nLeuo<span class="m-nv"> [346]</span>:</span> <span class="m-txt">/evento</span><button type="button" class="m-responder" data-nick="nLeuo" title="Responder a @nLeuo" aria-label="Responder a @nLeuo"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="b6a51368-a03b-4bf4-9db9-221d3460378a" data-de="Perfumedenicho" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">14:58</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>Perfumedenicho<span class="m-nv"> [3391]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="971660">estou anunciando 1x de <b class="m-anuncio-nome">✨ Mega Clefable Nv 1.677</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">30.000 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="Perfumedenicho" title="Responder a @Perfumedenicho" aria-label="Responder a @Perfumedenicho"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="da374a5d-c4e2-4d84-af31-d895cd55bde3" data-de="Eriksemce" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">14:58</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>Eriksemce<span class="m-nv"> [2002]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="1007147">estou anunciando 1x de <b class="m-anuncio-nome">Altaria Nv 712</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">6.000 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="Eriksemce" title="Responder a @Eriksemce" aria-label="Responder a @Eriksemce"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="6805bbf2-f6de-48c9-883c-d63f1dcc2159" data-de="ChekMat" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">14:59</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>ChekMat<span class="m-nv"> [303]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="861431">estou anunciando 1x de <b class="m-anuncio-nome">Gastly Nv 20</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">3.400 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="ChekMat" title="Responder a @ChekMat" aria-label="Responder a @ChekMat"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="9a13af70-c2dc-49c1-9245-5a5d681dd641" data-de="Easy" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">14:59</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>Easy<span class="m-nv"> [1320]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="1007748">estou anunciando 1x de <b class="m-anuncio-nome">Magma Magcargo Nv 1.242</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">2.200 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="Easy" title="Responder a @Easy" aria-label="Responder a @Easy"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="d16b0107-f67f-4eae-816a-c490d523708d" data-de="ribas" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">14:59</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>ribas<span class="m-nv"> [911]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="977859">estou anunciando 1x de <b class="m-anuncio-nome">Tyranitar Nv 104</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">26 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="ribas" title="Responder a @ribas" aria-label="Responder a @ribas"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="bdec4111-47da-441d-8b81-891259eb5172" data-de="sagyta" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">15:00</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>sagyta<span class="m-nv"> [1398]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="1000940">estou anunciando 1x de <b class="m-anuncio-nome">Cocoon Stone</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">573 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="sagyta" title="Responder a @sagyta" aria-label="Responder a @sagyta"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="359293b3-28d1-4f05-8d0f-d54b79e96056" data-de="jisatsu" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">15:00</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>jisatsu<span class="m-nv"> [590]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="1007800">estou anunciando 1x de <b class="m-anuncio-nome">✨ Rhydon Nv 100</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">3.600 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="jisatsu" title="Responder a @jisatsu" aria-label="Responder a @jisatsu"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="e4eb079e-431b-4c79-a918-f7d45eb16aa0" data-de="BallaBalla" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">15:00</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>BallaBalla<span class="m-nv"> [445]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="1006333">estou anunciando 1x de <b class="m-anuncio-nome">Ancient Pupitar Nv 100</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">288 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="BallaBalla" title="Responder a @BallaBalla" aria-label="Responder a @BallaBalla"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="4cc4b344-87b7-442e-b52e-3035947f49ed" data-de="oBigMike" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">15:01</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>oBigMike<span class="m-nv"> [1678]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="1007843">estou anunciando 1x de <b class="m-anuncio-nome">Toxic Toxicroak Nv 467</b> por <b class="m-anuncio-preco"><img src="/assets/site/assets/ui/moeda-ouro.png" alt="">2.000.000.000 Coins</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="oBigMike" title="Responder a @oBigMike" aria-label="Responder a @oBigMike"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="0381cf26-df17-41b2-93b9-70d54c3dc6ee" data-de="kirin" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">15:03</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>kirin<span class="m-nv"> [1216]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="1007745">estou anunciando 1x de <b class="m-anuncio-nome">Sun Stone</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">224 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="kirin" title="Responder a @kirin" aria-label="Responder a @kirin"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="fb94a380-d8a4-4eca-b612-75ec320deff7" data-de="Biia" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">15:03</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>Biia<span class="m-nv"> [750]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="1007917">estou anunciando 1x de <b class="m-anuncio-nome">Fragmento de Shiny Stone</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">100 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="Biia" title="Responder a @Biia" aria-label="Responder a @Biia"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="045181a5-137d-48bd-9ee3-623ea207c6f2" data-de="_Minu_" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">15:03</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>_Minu_<span class="m-nv"> [970]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="811026">estou anunciando 1x de <b class="m-anuncio-nome">✨ Charizard Nv 154</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">5.000 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="_Minu_" title="Responder a @_Minu_" aria-label="Responder a @_Minu_"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="b90ee9c8-b9d4-4fd4-8aab-76cb10ff114d" data-de="Natsuosz" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">15:04</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>Natsuosz<span class="m-nv"> [2615]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="978130">estou anunciando 1x de <b class="m-anuncio-nome">✨ Mega Camerupt Nv 1.599</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">8.500 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="Natsuosz" title="Responder a @Natsuosz" aria-label="Responder a @Natsuosz"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="bb4d954b-7642-4669-ba13-a0c56b41393e" data-de="junin_o" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">15:05</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>junin_o<span class="m-nv"> [3676]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="1000325">estou anunciando 1x de <b class="m-anuncio-nome">Mega Venusaur Nv 1.836</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">2.850 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="junin_o" title="Responder a @junin_o" aria-label="Responder a @junin_o"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="e6cc6703-4728-4d8a-861a-8d479d6ba5e0" data-de="Seyn" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">15:05</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>Seyn<span class="m-nv"> [658]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="1006745">estou anunciando 1x de <b class="m-anuncio-nome">Mega Gardevoir Nv 545</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">4.100 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="Seyn" title="Responder a @Seyn" aria-label="Responder a @Seyn"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div class="chat-msg aviso dica"><span class="m-hora">15:06</span> <span class="m-txt">Dúvidas onde farmar? <a href="https://pokeidle-gg.pages.dev/#hunt" target="_blank" rel="noopener noreferrer">pokeidle-gg.pages.dev/#hunt</a><br>Acesse aqui e informe seu pokemon! O melhor caminho será informado.</span></div><div data-msg-id="74fe2411-3975-4ff2-8dcb-7818c727b8b5" data-de="Benzaquen" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">15:06</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>Benzaquen<span class="m-nv"> [3775]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="967644">estou anunciando 1x de <b class="m-anuncio-nome">✨ Mega Alakazam Nv 3.254</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">44.900 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="Benzaquen" title="Responder a @Benzaquen" aria-label="Responder a @Benzaquen"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="d74cdd22-5290-4ca5-94ae-aa7f1042aa85" data-de="Her1n" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">15:06</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>Her1n<span class="m-nv"> [1187]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="1008017">estou anunciando 1x de <b class="m-anuncio-nome">Water Stone</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">61 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="Her1n" title="Responder a @Her1n" aria-label="Responder a @Her1n"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="79e8cf94-f3ca-4967-b9f9-78040aecf3a5" data-de="Norin" class="chat-msg compartilhar"><span class="m-hora">15:07</span> <span class="m-de m-nick">Norin<span class="m-nv"> [54]</span>:</span> <span class="m-txt">Veja meu pokemon! <button type="button" class="m-pk-link" data-nick="Norin" data-pk="105340613"><i>Charmeleon</i></button></span><button type="button" class="m-responder" data-nick="Norin" title="Responder a @Norin" aria-label="Responder a @Norin"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="53378a50-3585-4e61-8de3-fc52bb79fcc0" data-de="WilkersonXD" class="chat-msg vip"><span class="m-hora">15:07</span> <span class="m-de m-nick"><span class="m-guild-tag" style="--gt:#ff006e">TBA</span>WilkersonXD<span class="m-nv"> [961]</span>:</span> <span class="m-txt">VENDO POKEMONS EXOTICOS .......Vendo GHOLDENGO LVL 100 a 150 gemas....... Vendo VOLCARONA LVL 793 A 390 Gemas ....... Vendo ORBEETLE lvl 200 a 200 Gemas ....... Vendo EELEKTROSS LVL 200 a 250 Gemas...</span><button type="button" class="m-responder" data-nick="WilkersonXD" title="Responder a @WilkersonXD" aria-label="Responder a @WilkersonXD"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="75be93ad-3932-4721-acb1-e32e2574a9a9" data-de="AratSovala4" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">15:07</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>AratSovala4<span class="m-nv"> [1477]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="975487">estou anunciando 1x de <b class="m-anuncio-nome">✨ Snorunt Nv 40</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">2.200 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="AratSovala4" title="Responder a @AratSovala4" aria-label="Responder a @AratSovala4"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="ef6c8001-db2c-465f-8480-4cdf33d41dbb" data-de="lucking3" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">15:08</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>lucking3<span class="m-nv"> [998]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="1008109">estou anunciando 1x de <b class="m-anuncio-nome">✨ Numel Nv 180</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">1.800 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="lucking3" title="Responder a @lucking3" aria-label="Responder a @lucking3"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="5640c0c5-1224-476c-9c65-da61a6eb2ac4" data-de="Chitoso" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">15:08</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>Chitoso<span class="m-nv"> [740]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="811105">estou anunciando 1x de <b class="m-anuncio-nome">✨ Mega Alakazam Nv 402</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">9.000 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="Chitoso" title="Responder a @Chitoso" aria-label="Responder a @Chitoso"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="7caf0179-0c37-46fb-862c-d57a10156c72" data-de="Ninraw" class="chat-msg compartilhar"><span class="m-hora">15:09</span> <span class="m-de m-nick">Ninraw<span class="m-nv"> [13]</span>:</span> <span class="m-txt">Veja meu pokemon! <button type="button" class="m-pk-link" data-nick="Ninraw" data-pk="110659003"><i>Squirtle</i></button></span><button type="button" class="m-responder" data-nick="Ninraw" title="Responder a @Ninraw" aria-label="Responder a @Ninraw"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="0bbad2e7-54df-45de-a1b9-b1f6b2d1df7f" data-de="FJnr" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">15:09</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>FJnr<span class="m-nv"> [2604]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="963602">estou anunciando 1x de <b class="m-anuncio-nome">Brave Tyranitar Nv 918</b> por <b class="m-anuncio-preco"><img src="/assets/site/assets/ui/moeda-ouro.png" alt="">900.000.000 Coins</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="FJnr" title="Responder a @FJnr" aria-label="Responder a @FJnr"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="3b04379c-ab7f-4268-a1db-53ed20a01434" data-de="tusquito" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">15:10</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>tusquito<span class="m-nv"> [1316]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="1008158">estou anunciando 1x de <b class="m-anuncio-nome">✨ Silcoon Nv 419</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">800 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="tusquito" title="Responder a @tusquito" aria-label="Responder a @tusquito"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="71015914-df86-4026-a60d-16f2b7535a4b" data-de="streameradm" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">15:11</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>streameradm<span class="m-nv"> [1257]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="1008200">estou anunciando 1x de <b class="m-anuncio-nome">Cocoon Stone</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">276 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="streameradm" title="Responder a @streameradm" aria-label="Responder a @streameradm"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="e739afd6-1602-44a9-8f51-bac1b02d71dd" data-de="alezinho" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">15:11</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>alezinho<span class="m-nv"> [1187]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="957321">estou anunciando 1x de <b class="m-anuncio-nome">✨ Kadabra Nv 132</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">4.500 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="alezinho" title="Responder a @alezinho" aria-label="Responder a @alezinho"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="b82a4083-26c5-421d-8795-f829b8d99258" data-de="NOWAY" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">15:12</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>NOWAY<span class="m-nv"> [1082]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="1008246">estou anunciando 1x de <b class="m-anuncio-nome">Water Stone</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">900 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="NOWAY" title="Responder a @NOWAY" aria-label="Responder a @NOWAY"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="c8221f41-1d30-482b-9bcd-5ec3eb377838" data-de="Benderino" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">15:12</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>Benderino<span class="m-nv"> [1066]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="938348">estou anunciando 1x de <b class="m-anuncio-nome">Tyranitar Nv 430</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">120 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="Benderino" title="Responder a @Benderino" aria-label="Responder a @Benderino"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="715ff1d0-17fd-4c3f-bf74-cfc24fddd777" data-de="Gellato" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">15:12</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>Gellato<span class="m-nv"> [1187]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="735762">estou anunciando 1x de <b class="m-anuncio-nome">✨ Nuzleaf Nv 40</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">5.000 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="Gellato" title="Responder a @Gellato" aria-label="Responder a @Gellato"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="94f59d14-dca9-4841-a305-bc5f5d78ee12" data-de="gguiara" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">15:15</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>gguiara<span class="m-nv"> [2619]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="991118">estou anunciando 1x de <b class="m-anuncio-nome">✨ Mega Charizard X Nv 2.548</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">19.000 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="gguiara" title="Responder a @gguiara" aria-label="Responder a @gguiara"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="d949524e-dfd1-409a-af5d-2fbeebf856b7" data-de="BR10NUNES" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">15:15</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>BR10NUNES<span class="m-nv"> [1985]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="960728">estou anunciando 1x de <b class="m-anuncio-nome">Lucario Nv 136</b> por <b class="m-anuncio-preco"><img src="/assets/site/assets/ui/moeda-ouro.png" alt="">220.000.000 Coins</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="BR10NUNES" title="Responder a @BR10NUNES" aria-label="Responder a @BR10NUNES"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="db8ff65f-85b9-4ea3-be3b-109c52592f56" data-de="JcZ2_" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">15:15</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>JcZ2_<span class="m-nv"> [546]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="1002670">estou anunciando 1x de <b class="m-anuncio-nome">✨ Charizard Nv 121</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">10.000 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="JcZ2_" title="Responder a @JcZ2_" aria-label="Responder a @JcZ2_"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="78c40abc-5fe7-4e79-b636-7723c62541fb" data-de="denissniderTV" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">15:16</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>denissniderTV<span class="m-nv"> [2504]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="992863">estou anunciando 1x de <b class="m-anuncio-nome">✨ Wormadam Nv 100</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">20.000 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="denissniderTV" title="Responder a @denissniderTV" aria-label="Responder a @denissniderTV"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="538a3804-5de8-470f-97e6-10dc3a8e61e5" data-de="Xsyan" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">15:16</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>Xsyan<span class="m-nv"> [4902]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="1008410">estou anunciando 1x de <b class="m-anuncio-nome">Rock Stone</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">414 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="Xsyan" title="Responder a @Xsyan" aria-label="Responder a @Xsyan"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="064409f3-b4a5-49e4-860d-4957f73119cf" data-de="Gomotzy" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">15:17</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>Gomotzy<span class="m-nv"> [1136]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="690861">estou anunciando 1x de <b class="m-anuncio-nome">Dragonite Nv 100</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">700 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="Gomotzy" title="Responder a @Gomotzy" aria-label="Responder a @Gomotzy"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="19b24ca6-17b5-458d-a527-eca5288d1dfe" data-de="Moreira_GP" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">15:18</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>Moreira_GP<span class="m-nv"> [872]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="1008313">estou anunciando 1x de <b class="m-anuncio-nome">Feather Stone</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">40 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="Moreira_GP" title="Responder a @Moreira_GP" aria-label="Responder a @Moreira_GP"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="a0c38d40-1dc8-4ce9-ae74-d7580761461c" data-de="Atelophobic" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">15:19</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>Atelophobic<span class="m-nv"> [2060]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="941555">estou anunciando 1x de <b class="m-anuncio-nome">✨ Mega Blaziken Nv 2.042</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">17.300 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="Atelophobic" title="Responder a @Atelophobic" aria-label="Responder a @Atelophobic"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="135a6be8-8d00-4518-9fe7-c537a2b17011" data-de="fab1a0" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">15:21</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>fab1a0<span class="m-nv"> [2044]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="988642">estou anunciando 1x de <b class="m-anuncio-nome">Mega Charizard X Nv 1.910</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">8.250 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="fab1a0" title="Responder a @fab1a0" aria-label="Responder a @fab1a0"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="dad4926b-e423-446f-9acb-f287934e3b75" data-de="Mizu" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">15:21</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>Mizu<span class="m-nv"> [2192]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="898616">estou anunciando 1x de <b class="m-anuncio-nome">Mega Gengar Nv 757</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">2.100 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="Mizu" title="Responder a @Mizu" aria-label="Responder a @Mizu"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="4bbc4895-a2a1-48f6-a9b5-0ad7d4c8a0c4" data-de="augustoboeinge" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">15:22</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>augustoboeinge<span class="m-nv"> [1098]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="1008501">estou anunciando 15x de <b class="m-anuncio-nome">Bronze Boss Token</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">4 Gemas</b> cada, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="augustoboeinge" title="Responder a @augustoboeinge" aria-label="Responder a @augustoboeinge"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="228c7cce-e027-4af2-98a8-c6b596c559f5" data-de="FizzSENAI" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">15:22</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>FizzSENAI<span class="m-nv"> [2224]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="996476">estou anunciando 1x de <b class="m-anuncio-nome">✨ Dratini Nv 30</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">4.600 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="FizzSENAI" title="Responder a @FizzSENAI" aria-label="Responder a @FizzSENAI"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div><div data-msg-id="3852af94-d649-4292-9266-32dafc51e0be" data-de="Somel" class="chat-msg anuncio anuncio-mercado"><span class="m-hora">15:22</span> <span class="m-de m-nick"><span class="m-alto" aria-hidden="true">📢</span>Somel<span class="m-nv"> [1927]</span>:</span> <span class="m-txt"><button type="button" class="m-anuncio-link" data-anuncio="977850">estou anunciando 1x de <b class="m-anuncio-nome">✨ Camerupt Nv 752</b> por <b class="m-anuncio-preco orb"><img src="/img/moeda-gema.png" alt="">5.750 Gemas</b>, confira meu anúncio!<span class="m-anuncio-cta">Ver anúncio ›</span></button></span><button type="button" class="m-responder" data-nick="Somel" title="Responder a @Somel" aria-label="Responder a @Somel"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5L4 11l6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 11H14a6 6 0 0 1 6 6v2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"></path></svg></button></div></div>
        <!-- A MENSAGEM FIXADA por um admin: o cartão por cima da conversa, no topo do vidro, como o
             "pinned" da Twitch. Montada por `pintarChatFixada`; a lista rola por baixo dela. -->
        <div id="chat-fixada" class="chat-fixada hidden" aria-live="polite"></div>
        <button type="button" id="chat-novas" class="chat-novas">↓ 13 mensagens novas</button>
        <!-- O painel que abre ao clicar no NICK de uma mensagem: ignorar, ver perfil; moderador muta/exclui.
             O × fica fora das duas vistas (ações e duração do mute), no canto: fecha qualquer uma. -->
        <div id="chat-mod-panel" class="chat-mod-panel hidden" role="dialog" aria-hidden="true">
          <button type="button" id="chat-mod-fechar" class="chat-mod-fechar" data-i18n-attr="title:comum.fechar;aria-label:comum.fechar" title="Fechar" aria-label="Fechar">×</button>
          <div id="chat-mod-view-acoes">
            <div class="chat-mod-titulo" id="chat-mod-titulo">Moderar</div>
            <!-- O "Responder" do dedo: no computador a setinha aparece no hover da linha; no toque, mora aqui. -->
            <button type="button" id="chat-responder" class="chat-mod-acao chat-mod-responder hidden" data-i18n="chat.responder">Responder</button>
            <button type="button" id="chat-mod-mute" class="chat-mod-mute hidden" data-i18n="chat.modMute">Mutar</button>
            <button type="button" id="chat-ignorar" class="chat-mod-acao hidden" data-i18n="chat.ignorar">Ignorar</button>
            <button type="button" id="chat-ver-perfil" class="chat-mod-acao hidden" data-i18n="chat.verPerfil">Ver perfil</button>
            <button type="button" id="chat-adicionar-amigo" class="chat-mod-acao chat-mod-cta hidden" data-i18n="chat.adicionarAmigo">Adicionar amigo</button>
            <!-- Só admin, nos canais abertos. Na linha que já é a fixada, o texto vira "Desafixar". -->
            <button type="button" id="chat-mod-fixar" class="chat-mod-acao chat-mod-fixar hidden" data-i18n="chat.fixar">Fixar mensagem</button>
            <button type="button" id="chat-mod-excluir" class="chat-mod-excluir hidden" data-i18n="chat.modExcluir">Excluir mensagem</button>
          </div>
          <div id="chat-mod-view-mute" class="hidden">
            <div class="chat-mod-titulo" id="chat-mod-mute-titulo">Mutar</div>
            <!-- O MOTIVO (19/10/2026): obrigatório — vai ao painel (/admin#mutes), ao lado de quem aplicou. -->
            <label class="chat-mod-motivo-rotulo" for="chat-mod-mute-motivo" data-i18n="chat.modMuteMotivo">Motivo (obrigatório)</label>
            <input type="text" id="chat-mod-mute-motivo" class="chat-mod-motivo" maxlength="200" autocomplete="off" data-i18n-attr="placeholder:chat.modMuteMotivoPh" placeholder="Ex.: spam, ofensa">
            <!-- As durações em 2×2: o campo do motivo entrou acima delas, e a gaveta do celular tem uns 180 px. -->
            <div class="chat-mod-mute-opcoes">
              <button type="button" class="chat-mod-mute-opt" data-min="5" data-i18n="chat.modMute5">5 minutos</button>
              <button type="button" class="chat-mod-mute-opt" data-min="30" data-i18n="chat.modMute30">30 minutos</button>
              <button type="button" class="chat-mod-mute-opt" data-min="60" data-i18n="chat.modMute60">1 hora</button>
              <button type="button" class="chat-mod-mute-opt" data-min="1440" data-i18n="chat.modMute1440">24 horas</button>
            </div>
            <button type="button" id="chat-mod-mute-voltar" class="chat-mod-acao" data-i18n="chat.modMuteVoltar">Voltar</button>
          </div>
        </div>
      </div>
      <div id="chat-emojis" class="chat-emojis hidden"></div>
      <!-- O CHAT INTERROMPIDO pela moderação: a faixa entre a conversa e a linha de digitar, nos canais
           abertos. Montada por `pintarChatInterrompido`. -->
      <div id="chat-interrompido" class="chat-interrompido hidden" role="status"></div>
      <div class="chat-entrada">
        <!-- As OPÇÕES do chat, abertas pela setinha ao lado do emoji. Flutuam por cima da lista, ancoradas
             logo acima desta linha — não disputam altura com a conversa (o chat do computador tem 300 px).
             Duas, cada uma no seu canal: esconder os anúncios do alto-falante do Market (só no Mundo — no
             Comércio o anúncio é o assunto do canal) e, para admin e moderador, INTERROMPER o chat (nos
             três canais abertos). Quem vê o quê é de `syncBotaoOpcoesChat`. -->
        <div id="chat-opcoes" class="chat-opcoes hidden" role="dialog" aria-labelledby="chat-opcoes-titulo">
          <div class="chat-opcoes-cab">
            <b id="chat-opcoes-titulo">Esconder anúncios da comunidade</b>
            <button type="button" id="chat-opcoes-fechar" class="chat-opcoes-fechar" data-i18n-attr="aria-label:chat.opcoesFechar" aria-label="Fechar">×</button>
          </div>
          <div class="chat-opcao hidden" id="chat-opcao-anuncios">
            <span class="chat-opcao-txt">
              <span class="chat-opcao-nome" id="chat-sem-anuncios-nome" data-i18n="chat.semAnuncios">Não mostrar anúncios do Market</span>
              <span class="chat-opcao-desc" data-i18n="chat.semAnunciosAjuda">Os anúncios que os vendedores mandam pelo alto-falante somem do seu chat Mundo. No Comércio eles continuam. Vale só neste navegador.</span>
              <span class="chat-opcao-estado" id="chat-sem-anuncios-estado"></span>
            </span>
            <button type="button" class="cfg-toggle" id="chat-sem-anuncios" role="switch" aria-checked="false" aria-labelledby="chat-sem-anuncios-nome"></button>
          </div>
          <!-- INTERROMPER O CHAT — só admin e moderador (a bandeira `chatInterromper` do welcome; quem
               decide é o gateway). Vale para o servidor inteiro, então é a opção de baixo, separada por
               um filete, e ligar pede confirmação. -->
          <div class="chat-opcao chat-opcao-staff hidden" id="chat-opcao-interromper">
            <span class="chat-opcao-txt">
              <span class="chat-opcao-nome" id="chat-interromper-nome" data-i18n="chat.interromper">Interromper o chat</span>
              <span class="chat-opcao-desc" data-i18n="chat.interromperAjuda">Mundo, Comércio e Dúvidas param para todo mundo, nos dois idiomas — só a equipe (Admin, Moderador e Helper) continua falando. O chat da guild segue normal. Fica assim até alguém da moderação reabrir.</span>
              <span class="chat-opcao-estado chat-interromper-estado" id="chat-interromper-estado" hidden=""></span>
            </span>
            <button type="button" class="cfg-toggle" id="chat-interromper" role="switch" aria-checked="false" aria-labelledby="chat-interromper-nome"></button>
          </div>
        </div>
        <button type="button" id="chat-emoji" class="chat-emoji-btn" data-i18n-attr="title:chat.emojiBotao" title="Emojis">😊</button>
        <button type="button" id="chat-opcoes-btn" class="chat-emoji-btn chat-opcoes-btn hidden" aria-expanded="false" aria-controls="chat-opcoes" data-i18n-attr="title:chat.opcoesBotao" title="Opções do chat"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 15l6-6 6 6" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path></svg></button>
        <input id="chat-input" maxlength="200" placeholder="compre, venda ou anuncie…" data-i18n-attr="placeholder:chat.placeholder" autocomplete="off">
        <button id="chat-enviar">▶</button>
      </div>
    </div>
  </aside>
</div>

<!-- MODO ULTRA ECONOMIA — o jogo inteiro fora da tela, para PC fraco: um fundo preto e UMA caixa
     com o que a sessão rendeu (XP, Gold, drops raros, shinies vistos e capturados), em texto. Irmã
     do `#app`, e não filha: o modo tira o `#app` inteiro do layout (as colunas, o palco e, no
     celular, as gavetas que moram nele) e esta caixa fica. Nasce VAZIA — quem monta e pinta é o
     app.js (`montarUltra`/`pintarUltra`), e quem a acende é a classe `modo-ultra` no `<html>`. -->
<div id="ultra" class="ultra" aria-hidden="true"></div>

<!-- ─────────────────────────── onboarding ───────────────────────────
     Três passos, um quadro só: quem você é (gênero), com que cara (as cores) e com qual
     pokemon (o starter). A ORDEM importa e é a razão de estarem juntos aqui — antes, o
     starter era a primeira coisa que o jogo perguntava, e a pessoa escolhia o companheiro de
     jogo inteiro antes de ter um personagem para acompanhá-lo.

     O passo do NICK não mora aqui: ele acontece no portal, antes do socket abrir (ver
     `#escolher-nick`), porque o nick é a chave da conexão. -->
<div id="onboarding" class="modal hidden">
  <div class="modal-caixa ob-caixa">
    <div class="modal-topo">
      <h2 id="ob-titulo"></h2>
      <div class="ob-passos" id="ob-passos" aria-hidden="true"></div>
    </div>
    <div class="modal-corpo" id="ob-corpo"></div>
  </div>
</div>

<div id="starter" class="modal hidden">
  <div class="modal-caixa starter-caixa">
    <div class="modal-topo"><h2 data-i18n="starter.titulo">Escolha o seu primeiro pokemon</h2></div>
    <div class="modal-corpo">
      <p class="starter-aviso" data-i18n="starter.aviso">Ele vem no nível 5, com poções e revives para começar. A escolha é definitiva.</p>
      <div id="starter-lista" class="starter-lista"></div>
    </div>
  </div>
</div>

<div id="modal" class="modal hidden">
  <div class="modal-caixa ver-painel" data-modal="market">
    <!-- `#modal-extra` é o botão de AÇÃO da tela aberta, ao lado do fechar (os atalhos da Pokedex,
         o Tracker do PvP). Ele vive aqui, no topo comum, para a próxima tela que precisar de um
         atalho não ter de inventar outro canto.
         `#modal-voltar` é a VOLTA para a janela de onde o jogador veio, colado no fechar — só
         aparece quando há para onde voltar (ver `pintarVoltaDoModal` no app.js). -->
    <div class="modal-topo">
      <h2 id="modal-titulo"><img src="/assets/site/assets/ui/menu-market.png" alt="" class="modal-titulo-ico" aria-hidden="true" style="height: 24px; width: 24px; object-fit: contain;">Market</h2>
      <!-- `#modal-aviso` é a frase FIXA da tela aberta, numa pílula no meio do topo (hoje, o reembolso
           da Loja VIP) — ver `AVISO_DO_TOPO` no app.js. -->
      <p id="modal-aviso" class="modal-aviso hidden" role="note"></p>
      <div class="modal-acoes">
        <button id="modal-extra" class="modal-extra hidden" type="button"></button>
        <button id="modal-extra-b" class="modal-extra hidden" type="button"></button>
        <button id="modal-voltar" class="modal-extra modal-extra-ico modal-extra-voltar hidden" type="button">‹</button>
        <button id="modal-fechar">×</button>
      </div>
    </div>
    <div class="modal-corpo" id="modal-corpo">
    <div class="mk-topo">
      <div class="cmp-switch mk-modos" id="mk-modos" role="tablist" data-lado="esq">
        <button type="button" class="cmp-op on" data-aba="compra" role="tab" aria-selected="true"><img src="/assets/site/assets/ui/menu-market.png" alt="" aria-hidden="true">Comprar</button><button type="button" class="cmp-op" data-aba="pokemons" role="tab" aria-selected="false"><img src="/assets/site/assets/ui/moeda-ouro.png" alt="" aria-hidden="true">Vender</button>
        <span class="cmp-manopla"></span>
      </div>
      <div class="mk-saldo gastou" id="mk-saldo"><span class="mk-moeda"><img src="/assets/site/assets/ui/moeda-ouro.png" alt="ouro">813.855.701</span></div>
    </div>
    <div id="mk-corpo" data-tela="compra:bolas" data-aba="compra"><div class="mk-com-lados"><nav class="mk-lado" aria-label="Categorias"><div class="mk-lado-titulo">Categorias</div><button type="button" class="mk-cat on"><span class="mk-cat-bolha"><img src="/assets/site/assets/ui/ball-poke.png" alt="" style="height: 24px; width: 24px; object-fit: contain;"></span><span class="mk-cat-txt"><b>Pokebolas</b><small>Para capturar</small></span></button><button type="button" class="mk-cat"><span class="mk-cat-bolha"><img src="/assets/site/assets/markitems/small_potion.png" alt="" style="height: 24px; width: 24px; object-fit: contain;"></span><span class="mk-cat-txt"><b>Poções</b><small>Curam em campo</small></span></button><button type="button" class="mk-cat"><span class="mk-cat-bolha"><img src="/assets/site/assets/markitems/revive.png" alt="" style="height: 24px; width: 24px; object-fit: contain;"></span><span class="mk-cat-txt"><b>Revives</b><small>Levantam quem caiu</small></span></button><button type="button" class="mk-cat"><span class="mk-cat-bolha"><img src="/img/itens/ovo-p2.png" alt="" style="height: 24px; width: 24px; object-fit: contain;"></span><span class="mk-cat-txt"><b>Ovos</b><small>Pokemon surpresa</small></span></button></nav><div class="mk-grade mk-vitrine"><div class="mk-vitrine-cab"><span class="mk-vitrine-ico"><img src="/assets/site/assets/ui/ball-poke.png" alt="" style="height: 28px; width: 28px; object-fit: contain;"></span><span class="mk-vitrine-txt"><b>Pokebolas</b><small>Quanto melhor a bola, maior a chance de a captura fechar.</small></span></div><div class="mk-card mk-pal pal-n0" data-chave="b1" style="--pal-cor: var(--rar-comum);">
    <div class="mk-pal-palco">
      <span class="mk-pal-feixe" aria-hidden="true"></span>
      <span class="mk-pal-raios" aria-hidden="true"></span>
      <span class="mk-pal-halo" aria-hidden="true"></span>
      <div class="mk-ico mk-pal-arte"><img src="/assets/site/assets/ui/ball-poke.png" alt="" style="height: 52px; width: 52px; object-fit: contain;"></div>
      <span class="mk-pal-pedestal" aria-hidden="true"></span>
      <div class="mk-tem" data-tem="0">você tem ×0</div>
    </div>
    <div class="mk-nome" title="Poke Ball">Poke Ball</div>
    <div class="mk-sub">chance de captura ×1<span class="mk-medidor" aria-hidden="true"><i class="on"></i><i></i><i></i><i></i></span></div>
    <div class="mk-pal-preco"><span class="mk-moeda"><img src="/assets/site/assets/ui/moeda-ouro.png" alt="ouro">5</span><small>/un.</small></div>
    <div class="mk-rodape"><div class="mk-qtd">
    <button class="mk-passo" data-passo="-1" type="button">−</button>
    <input type="number" value="1" min="1" max="9999" inputmode="numeric">
    <button class="mk-passo" data-passo="1" type="button">+</button></div><div class="mk-atalhos"><button type="button" class="mk-max mk-atalho" data-q="10">×10</button><button type="button" class="mk-max mk-atalho" data-q="100">×100</button><button type="button" class="mk-max mk-atalho" title="Comprar o máximo com seu ouro atual" data-q="9999">Máx</button></div><button type="button" class="mk-acao mk-pal-comprar"><span>Comprar</span><span class="mk-moeda"><img src="/assets/site/assets/ui/moeda-ouro.png" alt="ouro">5</span></button></div></div><div class="mk-card mk-pal pal-n1" data-chave="b2" style="--pal-cor: var(--rar-incomum);">
    <div class="mk-pal-palco">
      <span class="mk-pal-feixe" aria-hidden="true"></span>
      <span class="mk-pal-raios" aria-hidden="true"></span>
      <span class="mk-pal-halo" aria-hidden="true"></span>
      <div class="mk-ico mk-pal-arte"><img src="/assets/site/assets/ui/ball-great.png" alt="" style="height: 52px; width: 52px; object-fit: contain;"></div>
      <span class="mk-pal-pedestal" aria-hidden="true"></span>
      <div class="mk-tem" data-tem="0">você tem ×0</div>
    </div>
    <div class="mk-nome" title="Great Ball">Great Ball</div>
    <div class="mk-sub">chance de captura ×2<span class="mk-medidor" aria-hidden="true"><i class="on"></i><i class="on"></i><i></i><i></i></span></div>
    <div class="mk-pal-preco"><span class="mk-moeda"><img src="/assets/site/assets/ui/moeda-ouro.png" alt="ouro">20</span><small>/un.</small></div>
    <div class="mk-rodape"><div class="mk-qtd">
    <button class="mk-passo" data-passo="-1" type="button">−</button>
    <input type="number" value="1" min="1" max="9999" inputmode="numeric">
    <button class="mk-passo" data-passo="1" type="button">+</button></div><div class="mk-atalhos"><button type="button" class="mk-max mk-atalho" data-q="10">×10</button><button type="button" class="mk-max mk-atalho" data-q="100">×100</button><button type="button" class="mk-max mk-atalho" title="Comprar o máximo com seu ouro atual" data-q="9999">Máx</button></div><button type="button" class="mk-acao mk-pal-comprar"><span>Comprar</span><span class="mk-moeda"><img src="/assets/site/assets/ui/moeda-ouro.png" alt="ouro">20</span></button></div></div><div class="mk-card mk-pal pal-n3" data-chave="b3" style="--pal-cor: var(--rar-mitica);">
    <div class="mk-pal-palco">
      <span class="mk-pal-feixe" aria-hidden="true"></span>
      <span class="mk-pal-raios" aria-hidden="true"></span>
      <span class="mk-pal-halo" aria-hidden="true"></span>
      <div class="mk-ico mk-pal-arte"><img src="/img/ball-super.png" alt="" style="height: 52px; width: 52px; object-fit: contain;"></div>
      <span class="mk-pal-pedestal" aria-hidden="true"></span>
      <div class="mk-tem" data-tem="0">você tem ×0</div>
    </div>
    <div class="mk-nome" title="Super Ball">Super Ball</div>
    <div class="mk-sub">chance de captura ×3<span class="mk-medidor" aria-hidden="true"><i class="on"></i><i class="on"></i><i class="on"></i><i></i></span></div>
    <div class="mk-pal-preco"><span class="mk-moeda"><img src="/assets/site/assets/ui/moeda-ouro.png" alt="ouro">50</span><small>/un.</small></div>
    <div class="mk-rodape"><div class="mk-qtd">
    <button class="mk-passo" data-passo="-1" type="button">−</button>
    <input type="number" value="1" min="1" max="9999" inputmode="numeric">
    <button class="mk-passo" data-passo="1" type="button">+</button></div><div class="mk-atalhos"><button type="button" class="mk-max mk-atalho" data-q="10">×10</button><button type="button" class="mk-max mk-atalho" data-q="100">×100</button><button type="button" class="mk-max mk-atalho" title="Comprar o máximo com seu ouro atual" data-q="9999">Máx</button></div><button type="button" class="mk-acao mk-pal-comprar"><span>Comprar</span><span class="mk-moeda"><img src="/assets/site/assets/ui/moeda-ouro.png" alt="ouro">50</span></button></div></div><div class="mk-card mk-pal pal-n4" data-chave="b4" style="--pal-cor: var(--rar-lendaria);">
    <div class="mk-pal-palco">
      <span class="mk-pal-feixe" aria-hidden="true"></span>
      <span class="mk-pal-raios" aria-hidden="true"></span>
      <span class="mk-pal-halo" aria-hidden="true"></span>
      <div class="mk-ico mk-pal-arte"><img src="/assets/site/assets/ui/ball-ultra.png" alt="" style="height: 52px; width: 52px; object-fit: contain;"></div>
      <span class="mk-pal-pedestal" aria-hidden="true"></span>
      <div class="mk-tem" data-tem="1908">você tem ×1.908</div>
    </div>
    <div class="mk-nome" title="Ultra Ball">Ultra Ball</div>
    <div class="mk-sub">chance de captura ×4<span class="mk-medidor" aria-hidden="true"><i class="on"></i><i class="on"></i><i class="on"></i><i class="on"></i></span></div>
    <div class="mk-pal-preco"><span class="mk-moeda"><img src="/assets/site/assets/ui/moeda-ouro.png" alt="ouro">130</span><small>/un.</small></div>
    <div class="mk-rodape"><div class="mk-qtd">
    <button class="mk-passo" data-passo="-1" type="button">−</button>
    <input type="number" value="1" min="1" max="9999" inputmode="numeric">
    <button class="mk-passo" data-passo="1" type="button">+</button></div><div class="mk-atalhos"><button type="button" class="mk-max mk-atalho" data-q="10">×10</button><button type="button" class="mk-max mk-atalho" data-q="100">×100</button><button type="button" class="mk-max mk-atalho" title="Comprar o máximo com seu ouro atual" data-q="9999">Máx</button></div><button type="button" class="mk-acao mk-pal-comprar"><span>Comprar</span><span class="mk-moeda"><img src="/assets/site/assets/ui/moeda-ouro.png" alt="ouro">11.440</span></button></div></div></div></div></div></div>
  </div>
</div>

<!-- Cartão de perfil de um treinador do ranking. Acima do modal, porque abre a partir dele. -->
<div id="perfil" class="modal modal-acima hidden">
  <div class="modal-caixa caixa-perfil">
    <div class="modal-topo"><h2 id="perfil-titulo"></h2><button id="perfil-fechar">×</button></div>
    <div class="modal-corpo" id="perfil-corpo"></div>
  </div>
</div>

<!-- A ficha pública de uma guild, aberta pelo Ranking de Guilds: os membros e, ao clicar num
     deles, a equipe que ele leva para a Guerra de Guilds. O ranking sozinho mostrava nome,
     dono e GP — e nada que dissesse se a guild em primeiro é forte ou só numerosa. -->
<div id="guild-detalhe" class="modal modal-acima hidden">
  <div class="modal-caixa caixa-guild-detalhe">
    <div class="modal-topo">
      <h2 id="guild-detalhe-titulo"></h2>
      <button id="guild-detalhe-fechar" type="button">×</button>
    </div>
    <div class="modal-corpo" id="guild-detalhe-corpo"></div>
  </div>
</div>

<!-- Time completo de um jogador no pódio do ginásio — cards como no Ranking → Guild. -->
<div id="gin-time-detalhe" class="modal modal-acima hidden">
  <div class="modal-caixa caixa-gin-time-detalhe">
    <div class="modal-topo">
      <h2 id="gin-time-detalhe-titulo"></h2>
      <button id="gin-time-detalhe-fechar" type="button">×</button>
    </div>
    <div class="modal-corpo" id="gin-time-detalhe-corpo"></div>
  </div>
</div>

<!-- A FICHA: tudo que se sabe sobre um pokemon.
     Serve a dois donos — a espécie (aberta pela Pokedex) e um bicho concreto (aberto pelo
     Mercado da Comunidade, pelo depot ou pela equipe). São a mesma pergunta vista de dois
     lados, e um modal só evita duas telas que envelhecem separadas.

     Fica ACIMA do modal comum porque é sempre aberta de dentro de um: a Pokedex e a vitrine
     continuam atrás, e fechar a ficha devolve o jogador exatamente onde ele estava.

     `#ficha-voltar` é a volta para a FICHA anterior: a evolução e o "Ver espécie" trocam a ficha
     no mesmo lugar, e sem ele o bicho de onde se partiu sumia (ver `voltarFicha` no app.js).
     `#ficha-setas` folheia a Pokedex de espécie em espécie e NÃO anota caminho no `‹`. -->
<div id="ficha" class="modal modal-acima hidden">
  <div class="modal-caixa caixa-ficha">
    <div class="modal-topo">
      <div class="modal-topo-esq ficha-topo-esq">
        <h2 id="ficha-titulo"></h2>
        <button type="button" id="ficha-compartilhar" class="btn-compartilhar-pk hidden" title="Compartilhar no chat" aria-label="Compartilhar no chat" disabled="">
          <svg class="ico-chat" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H9l-5 4V6a2 2 0 0 1 2-2z" fill="currentColor"></path><circle cx="8" cy="11" r="1.2" fill="var(--vao)"></circle><circle cx="12" cy="11" r="1.2" fill="var(--vao)"></circle><circle cx="16" cy="11" r="1.2" fill="var(--vao)"></circle></svg>
        </button>
      </div>
      <div class="modal-acoes">
        <!-- O ⋮ "Mover para": as PASTAS da Coleção. Só na ficha de um pokemon do jogador, ainda na
             mão — ver `pintarMenuFicha` no app.js. O desenho é SVG: o "⋮" em texto muda com a fonte. -->
        <button type="button" id="ficha-menu" class="modal-extra modal-extra-ico ficha-menu-bt hidden" aria-haspopup="menu" aria-expanded="false" aria-controls="ficha-menu-lista" title="Mover para" aria-label="Mover para" data-i18n-attr="title:pasta.moverPara;aria-label:pasta.moverPara">
          <svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="4" r="2.2"></circle><circle cx="10" cy="10" r="2.2"></circle><circle cx="10" cy="16" r="2.2"></circle></svg>
        </button>
        <button type="button" id="ficha-voltar" class="modal-extra modal-extra-ico modal-extra-voltar hidden">‹</button>
        <!-- As SETAS da ficha da espécie: a anterior e a próxima na ordem da Pokedex (do #001 à
             última mega). Só aparecem na ficha DE ESPÉCIE — ver `pintarSetasDaEspecie` no app.js. -->
        <span id="ficha-setas" class="ficha-setas hidden">
          <button type="button" id="ficha-ant" class="ficha-seta"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M13.6 2.8 4.8 10l8.8 7.2z"></path></svg></button>
          <button type="button" id="ficha-prox" class="ficha-seta"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M6.4 2.8 15.2 10l-8.8 7.2z"></path></svg></button>
        </span>
        <button id="ficha-fechar">×</button>
      </div>
    </div>
    <!-- O menu do ⋮: IRMÃO do topo, e não dentro dele — lá todo botão vira o quadrado de 36 px. -->
    <div id="ficha-menu-lista" class="ficha-menu-lista" role="menu" aria-label="Mover para" data-i18n-attr="aria-label:pasta.moverPara" hidden=""></div>
    <div class="modal-corpo" id="ficha-corpo"></div>
  </div>
</div>

<!-- Calculadora empilhada — abre por cima da ficha (Market, Mercado, equipe…) sem fechar o que
     está atrás, para comparar a nota de vários pokemon seguidos. O atalho da barra lateral
     continua abrindo a calculadora no modal comum. -->
<div id="calc" class="modal modal-acima hidden">
  <div class="modal-caixa caixa-calc">
    <div class="modal-topo"><h2 id="calc-titulo"></h2><button id="calc-fechar" type="button">×</button></div>
    <div class="modal-corpo" id="calc-corpo"></div>
  </div>
</div>

<!-- Envio de coins a um amigo — abre por CIMA da Lista de Amigos (modal-acima), como um
     diálogo de confirmação: valor, detalhamento da taxa de 15% e o que o amigo recebe. -->
<div id="amigo-coins" class="modal modal-acima hidden">
  <div class="modal-caixa caixa-amigo-coins">
    <div class="modal-topo"><h2 id="acoin-titulo"></h2><button id="acoin-fechar" type="button">×</button></div>
    <div class="modal-corpo" id="acoin-corpo"></div>
  </div>
</div>

<!-- REFINO — a bancada do "+1". Abre por CIMA da ficha (modal-acima) porque se chega a ela dos
     dois lados: pelo "+" do painel Em campo e pelo "+" da ficha do próprio pokemon, e nesse
     segundo caso a ficha precisa continuar atrás para o jogador voltar a ela ao fechar. -->
<div id="refino" class="modal modal-acima hidden">
  <div class="modal-caixa caixa-refino">
    <div class="modal-topo">
      <div class="modal-topo-esq">
        <h2 id="refino-titulo"></h2>
      </div>
      <button id="refino-fechar" type="button">×</button>
    </div>
    <div class="modal-corpo" id="refino-corpo"></div>
  </div>
</div>

<!-- MONTAR VITRINE — quais pokemon aparecem na Ficha do Treinador.
     Empilhado sobre a ficha (`modal-acima`) pelo mesmo motivo da bancada de refino: quem
     monta a vitrine está olhando para ela, e fechar o editor tem de devolver a ficha embaixo.
     A escolha é rascunho até o "Salvar" — ver o bloco "o editor" em app.js. -->
<div id="vitrine-editor" class="modal modal-acima hidden">
  <div class="modal-caixa caixa-vitrine-editor">
    <div class="modal-topo">
      <div class="modal-topo-esq">
        <h2 data-i18n="pf.vitrineEditarTitulo">Montar vitrine</h2>
      </div>
      <button id="vitrine-editor-fechar" type="button">×</button>
    </div>
    <div class="modal-corpo vte-corpo">
      <div class="vte-escolhidos-cx">
        <div class="vte-escolhidos" id="vte-escolhidos"></div>
        <p class="vte-vazio" id="vte-vazio" data-i18n="pf.vitrineNadaEscolhido">Nenhum escolhido ainda — clique nos cards abaixo.</p>
      </div>
      <div class="vte-barra">
        <input id="vte-busca" class="cm-busca" maxlength="24" data-i18n-attr="placeholder:pf.vitrineBuscaPh" placeholder="procurar pelo nome…">
        <!-- O "Local" (Equipe / Depot / Coleção): a vitrine é o que se tem de melhor, e é na
             Coleção que o jogador guarda isso. As opções nascem no app.js, traduzidas. -->
        <select id="vte-local" class="filtros-select-el vte-local" data-i18n-attr="aria-label:colecao.filtroLocal" aria-label="Local"></select>
        <span class="vte-conta" id="vte-conta"></span>
      </div>
      <div class="mk-grade vte-grade" id="vte-grade"></div>
      <p class="vte-sem-resultado hidden" id="vte-sem-resultado" data-i18n="pf.vitrineSemResultado">Nenhum pokemon com esse nome.</p>
      <div class="vte-rodape">
        <button id="vte-salvar" type="button" class="vte-salvar" data-i18n="pf.vitrineSalvar">Salvar vitrine</button>
      </div>
    </div>
  </div>
</div>

<!-- O REPLAY da Guerra de Guilds.
     A guerra é decidida no servidor, uma vez por dia, com todo mundo offline — aqui só se
     assiste. O canvas é um segundo `Campo` (o mesmo renderizador do palco), alimentado pela
     gravação em vez de por WebSocket; ver `replay.mjs`.

     Corpo em DUAS colunas: o palco (canvas + controles) e, ao lado, o painel de guildas —
     `#gwr-lateral`, montado por `montarControlesReplay` em app.js, agrupado por guilda e
     clicável para prender a câmera em alguém. Substituiu a tira horizontal de nomes que ficava
     embaixo do palco, ilegível com setenta lutadores espremidos numa linha só.

     Acima do modal comum porque abre de dentro do painel de PvP, que continua atrás. -->
<div id="gwr" class="modal modal-acima hidden">
  <div class="modal-caixa caixa-gwr">
    <div class="modal-topo">
      <h2 id="gwr-titulo"></h2>
      <div class="modal-acoes"><button id="gwr-fechar">×</button></div>
    </div>
    <div class="modal-corpo gwr-corpo">
      <div class="gwr-principal">
        <div class="gwr-palco">
          <canvas id="gwr-campo"></canvas>
          <div class="gwr-guilds" id="gwr-guilds"></div>
          <div class="gwr-feed" id="gwr-feed"></div>
          <div class="gwr-carregando" id="gwr-carregando"></div>
          <div class="gwr-dica-arrasto" id="gwr-dica-arrasto"></div>
          <!-- O "?" do PvP no TABULEIRO (01/11/2026), no canto da dica de arrasto (que o tabuleiro esconde): a legenda
               das cores e das marcas de alcance — ver `montarFaixasTabuleiro`. Escondidos fora do tabuleiro. -->
          <button type="button" class="cfg-ajuda gwr-tab-ajuda hidden" id="gwr-tab-ajuda" aria-expanded="false" aria-controls="gwr-tab-legenda"><b>?</b></button>
          <div class="gwr-tab-legenda hidden" id="gwr-tab-legenda" role="note"></div>
        </div>
        <div class="gwr-controles">
          <button type="button" class="gwr-play" id="gwr-play"></button>
          <span class="gwr-tempo" id="gwr-tempo">0:00 / 0:00</span>
          <input type="range" class="qtd-barra gwr-linha" id="gwr-linha" min="0" max="1000" value="0" step="1">
          <div class="gwr-vels" id="gwr-vels"></div>
          <button type="button" class="gwr-auto" id="gwr-auto"></button>
          <button type="button" class="gwr-recentralizar hidden" id="gwr-recentralizar"></button>
          <div class="gwr-zoom">
            <button type="button" class="gwr-zoom-bt" id="gwr-zoom-menos"></button>
            <button type="button" class="gwr-zoom-bt" id="gwr-zoom-mais"></button>
          </div>
        </div>
      </div>
      <!-- A coluna da direita: a BUSCA por cima, o painel de guildas embaixo.
           A busca só aparece na Guerra de Guilds (ver `montarBuscaReplay`) e mora FORA do
           `#gwr-lateral` de propósito: o painel rola sozinho, e assim o campo continua à vista
           enquanto a lista de centenas de lutadores desce por baixo dele. -->
      <div class="gwr-coluna">
        <div class="gwr-busca hidden" id="gwr-busca" role="search">
          <div class="gwr-busca-campo">
            <svg class="gwr-busca-lupa" viewBox="0 0 20 20" width="17" height="17" aria-hidden="true">
              <circle cx="8.5" cy="8.5" r="6" fill="none" stroke="currentColor" stroke-width="2.2"></circle>
              <line x1="13" y1="13" x2="18.5" y2="18.5" stroke="currentColor" stroke-width="2.8" stroke-linecap="round"></line>
            </svg>
            <input id="gwr-busca-input" class="gwr-busca-input" type="text" maxlength="24" autocomplete="off" spellcheck="false" autocapitalize="off" enterkeyhint="search" aria-controls="gwr-lateral">
            <button type="button" class="gwr-busca-limpar hidden" id="gwr-busca-limpar">×</button>
          </div>
          <p class="gwr-busca-conta hidden" id="gwr-busca-conta" aria-live="polite"></p>
        </div>
        <aside class="gwr-lateral" id="gwr-lateral">
          <!-- O resultado da partida ranqueada. Fica VAZIO no replay da Guerra de Guilds e no
               desafio de ginásio, e só é preenchido quando a fita termina — ver
               `pintarResultadoPvp`. Revelar o ganho antes do último golpe estragaria a fita. -->
          <div class="gwr-pvp-resultado hidden" id="gwr-pvp-resultado"></div>
        </aside>
      </div>
    </div>
  </div>
</div>

<!-- O RAID GIGANTAMAX AO VIVO — o servidor inteiro contra UM (Boss → Semanal).
     O mesmo renderizador do replay da guerra (`raid-replay.mjs` herda o `ReplayGuerra`), com uma SEGUNDA
     camada por cima (`#rgx-efeitos`: a névoa e o clima do TIPO do Gigantamax — a chuva de sangue no fogo, as bolhas
     na água… —, a vinheta da fúria e os clarões) e o HUD de luta em
     HTML: a barra de vida do Gigantamax, a fúria, quantos lutam, o top do dano e o feed. O `#rgx-palco`
     é o que treme. A fita vem por HTTP (`/raid/fita/<id>`) e toca no mesmo segundo para todo mundo. -->
<div id="rgx" class="modal modal-acima hidden">
  <div class="modal-caixa caixa-rgx">
    <div class="modal-topo">
      <h2 id="rgx-titulo"></h2>
      <div class="modal-acoes"><button id="rgx-fechar" type="button">×</button></div>
    </div>
    <div class="modal-corpo rgx-corpo">
      <div class="rgx-tela">
        <div class="rgx-palco" id="rgx-palco">
          <canvas id="rgx-campo"></canvas>
          <canvas id="rgx-efeitos" aria-hidden="true"></canvas>
        </div>
        <div class="rgx-hud">
          <div class="rgx-chefe">
            <div class="rgx-chefe-topo">
              <b id="rgx-chefe-nome"></b>
              <span class="rgx-chefe-pct" id="rgx-chefe-pct"></span>
            </div>
            <div class="rgx-barra"><i class="rgx-barra-rastro" id="rgx-barra-rastro"></i><i class="rgx-barra-vida" id="rgx-barra-vida"></i>
              <span class="rgx-barra-marcas" aria-hidden="true"><i></i><i></i><i></i></span></div>
            <div class="rgx-chefe-baixo">
              <span id="rgx-chefe-hp"></span>
              <span class="rgx-furia" id="rgx-furia"></span>
            </div>
          </div>
          <div class="rgx-status" id="rgx-status"></div>
          <div class="rgx-top" id="rgx-top"></div>
          <div class="rgx-feed" id="rgx-feed"></div>
        </div>
        <div class="rgx-anuncio" id="rgx-anuncio" aria-live="polite"></div>
        <div class="rgx-portal hidden" id="rgx-portal"></div>
        <div class="rgx-fim hidden" id="rgx-fim"></div>
        <div class="rgx-carregando" id="rgx-carregando"></div>
      </div>
      <div class="rgx-controles" id="rgx-controles">
        <span class="rgx-aovivo hidden" id="rgx-aovivo"></span>
        <button type="button" class="gwr-play rgx-so-rever" id="rgx-play"></button>
        <span class="gwr-tempo" id="rgx-tempo">0:00 / 0:00</span>
        <input type="range" class="qtd-barra gwr-linha rgx-so-rever" id="rgx-linha" min="0" max="1000" value="0" step="1">
        <div class="gwr-vels rgx-so-rever" id="rgx-vels"></div>
        <button type="button" class="gwr-auto" id="rgx-meu"></button>
        <button type="button" class="gwr-auto" id="rgx-gigante"></button>
        <div class="gwr-zoom">
          <button type="button" class="gwr-zoom-bt" id="rgx-zoom-menos"></button>
          <button type="button" class="gwr-zoom-bt" id="rgx-zoom-mais"></button>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- A EQUIPE DA RAID: até 5 pokemon, na ordem em que entram em campo (a folha de sempre,
     `montarEscolhaDeEquipe`). Sem escolher, luta a equipe de hunt. Trava segunda 20:00. -->
<div id="raid-time-modal" class="modal modal-acima hidden">
  <div class="modal-caixa caixa-guild-time">
    <div class="modal-topo">
      <h2 id="raid-time-titulo" data-i18n="raid.equipeTitulo">Equipe da Raid</h2>
      <button id="raid-time-fechar" type="button">×</button>
    </div>
    <div class="modal-corpo" id="raid-time-corpo"></div>
  </div>
</div>

<!-- A ANÁLISE DA GUERRA — dano, abates e os pokemon de cada jogador na última Guerra de Guilds.
     Os números chegam prontos do servidor (calculados da fita, ver `game/guild-pvp-analise.mjs`);
     abre pelo botão "Análise da última guerra" do painel PvP Guild. -->
<div id="gwa" class="modal modal-acima hidden">
  <div class="modal-caixa caixa-gwa">
    <div class="modal-topo">
      <h2 id="gwa-titulo"></h2>
      <div class="modal-acoes"><button id="gwa-fechar" aria-label="×">×</button></div>
    </div>
    <div class="modal-corpo gwa-corpo" id="gwa-corpo"></div>
  </div>
</div>

<!-- Vitória em boss — loot, XP e pontos antes de seguir na praça. -->
<div id="boss-loot" class="modal modal-acima hidden">
  <div class="modal-caixa caixa-boss-loot">
    <div class="modal-topo"><h2 id="boss-loot-titulo" data-i18n="bossLoot.titulo">Boss derrotado!</h2></div>
    <div class="modal-corpo">
      <div id="boss-loot-palco"></div>
      <div class="boss-loot-stats" id="boss-loot-stats"></div>
      <div class="boss-loot-secao">
        <b data-i18n="bossLoot.recompensas">Recompensas</b>
        <div class="boss-loot-drops" id="boss-loot-drops"></div>
      </div>
      <button type="button" class="boss-loot-ok" id="boss-loot-ok" data-i18n="bossLoot.ok">Continuar</button>
    </div>
  </div>
</div>

<!-- Revelação de recompensa — Casa/Bicicleta fabricada e a peça de TM do boss. A intensidade
     sobe com a raridade (ver `mostrarRecompensa` no app.js e `.recompensa` no estilo.css). -->
<div id="recompensa" class="recompensa hidden" role="dialog" aria-modal="true" aria-hidden="true">
  <div class="rc-flash"></div>
  <div class="rc-particulas" id="rc-particulas"></div>
  <div class="rc-palco">
    <div class="rc-raios"></div>
    <!-- As cartas atrás da aberta: uma por revelação na fila, até duas (`data-n`). -->
    <div class="rc-pilha" id="rc-pilha" data-n="0"></div>
    <div class="rc-caixa">
      <div class="rc-faixa" id="rc-faixa" hidden=""></div>
      <p class="rc-lead" id="rc-lead"></p>
      <div class="rc-arte" id="rc-arte"></div>
      <div class="rc-nome" id="rc-nome"></div>
      <div class="rc-sub" id="rc-sub"></div>
      <div class="rc-botoes">
        <button type="button" class="rc-ok" id="rc-ok"></button>
        <button type="button" class="rc-ok rc-todos btn-apagado" id="rc-todos" hidden=""></button>
      </div>
    </div>
  </div>
</div>

<!-- TM Researcher — troca peças por discos e aplica no pokemon da equipe. -->
<div id="tm-researcher" class="modal modal-acima hidden">
  <div class="modal-caixa caixa-tm">
    <div class="modal-topo">
      <div class="modal-topo-esq">
        <span class="tm-prof" aria-hidden="true"></span>
        <h2 data-i18n="tm.titulo">Professor Carvalho</h2>
        <button type="button" class="tm-info-bt" id="tm-info-bt" data-i18n-attr="title:tm.infoBtn;aria-label:tm.infoBtn" title="Como funcionam o Z-Move e o TM AoE" aria-label="Como funcionam o Z-Move e o TM AoE">i</button>
      </div>
      <button id="tm-fechar" type="button">×</button>
    </div>
    <div class="modal-corpo">
      <!-- As sete bancadas do Professor. As duas primeiras são o antigo TM Researcher (o
           nome do NPC mudou porque o balcão dele deixou de vender uma coisa só); as outras
           gastam fragmentos — os da Outland, os de Mega (boss) e o de Ovo Shiny (Unova+).
           Cada aba é ÍCONE + rótulo CURTO: com o nome inteiro ("Fabricar Shiny Stone") cinco
           abas não cabiam numa fileira de celular e o texto vazava do botão. O nome inteiro
           fica no `title` e no cabeçalho da bancada. O `data-i18n` mora no `<span>`, e não no
           botão — no botão ele trocaria o conteúdo inteiro e apagaria o ícone. -->
      <nav class="tm-abas" id="tm-abas">
        <button type="button" class="tm-aba on" data-aba="trocar" data-i18n-attr="title:tm.abaTrocar" title="Trocar peças">
          <img class="tm-aba-ico" src="/img/itens/zmove/fragmento.png" alt=""><span data-i18n="tm.abaCurtaTrocar">Trocar</span>
        </button>
        <button type="button" class="tm-aba" data-aba="aplicar" data-i18n-attr="title:tm.abaAplicar" title="Aplicar disco">
          <img class="tm-aba-ico" src="/assets/site/assets/items/tm_disk_elemental.png" alt=""><span data-i18n="tm.abaCurtaAplicar">Aplicar</span>
        </button>
        <button type="button" class="tm-aba" data-aba="casa" data-i18n-attr="title:tm.abaCasa" title="Fabricar Casa">
          <img class="tm-aba-ico liso" src="/img/itens/casa-comum.png" alt=""><span data-i18n="tm.abaCurtaCasa">Casa</span>
        </button>
        <button type="button" class="tm-aba" data-aba="bicicleta" data-i18n-attr="title:tm.abaBicicleta" title="Fabricar Bicicleta">
          <img class="tm-aba-ico" src="/img/itens/bicicleta-comum.png" alt=""><span data-i18n="tm.abaCurtaBicicleta">Bike</span>
        </button>
        <button type="button" class="tm-aba" data-aba="pedra" data-i18n-attr="title:tm.abaPedra" title="Fabricar Shiny Stone">
          <img class="tm-aba-ico" src="/img/itens/shiny-stone.png" alt=""><span data-i18n="tm.abaCurtaPedra">Shiny</span>
        </button>
        <button type="button" class="tm-aba" data-aba="mega" data-i18n-attr="title:tm.abaMega" title="Fabricar Mega Stone">
          <img class="tm-aba-ico" src="/img/itens/fragmento-mega-shiny.png" alt=""><span data-i18n="tm.abaCurtaMega">Mega</span>
        </button>
        <!-- O OVO SHINY: os fragmentos que caem nas hunts de Unova para frente (ver `shared/ovo-shiny.mjs`). -->
        <button type="button" class="tm-aba" data-aba="ovoShiny" data-i18n-attr="title:tm.abaOvoShiny" title="Fabricar Ovo Shiny">
          <img class="tm-aba-ico" src="/img/itens/ovo-shiny.png" alt=""><span data-i18n="tm.abaCurtaOvoShiny">Ovo</span>
        </button>
      </nav>
      <div id="tm-corpo"></div>
    </div>
  </div>
</div>

<!-- Guia de TMs — abre pelo [i] do TM Researcher. -->
<div id="tm-info" class="modal modal-acima hidden">
  <div class="modal-caixa caixa-tm-info">
    <div class="modal-topo">
      <h2 data-i18n="tm.infoTitulo">Guia do Z-Move e do TM AoE</h2>
      <button id="tm-info-fechar" type="button">×</button>
    </div>
    <div class="modal-corpo tm-info-corpo" id="tm-info-corpo"></div>
  </div>
</div>

<!-- As SALAS do Centro Pokemon — cada uma junta treinadores do jogo inteiro (`abrirSalasDaPraca`). -->
<div id="centro-salas-modal" class="modal modal-acima hidden">
  <div class="modal-caixa caixa-salas">
    <div class="modal-topo">
      <h2 data-i18n="praca.titulo">Salas do Centro Pokemon</h2>
      <button id="salas-fechar" type="button">×</button>
    </div>
    <div class="modal-corpo salas-corpo">
      <p class="salas-intro"><span data-i18n="praca.intro">Cada sala junta treinadores do jogo inteiro. Escolha onde quer ficar — e combine o número com os amigos.</span><button class="cfg-ajuda" id="salas-ajuda" type="button" aria-expanded="false" aria-controls="salas-desc" data-i18n-attr="aria-label:praca.ajudaRotulo" aria-label="Como funcionam as salas"><b>?</b></button></p>
      <p class="salas-desc hidden" id="salas-desc"></p>
      <div class="salas-grade" id="salas-grade" role="list"></div>
    </div>
  </div>
</div>

<!-- Depot — equipe e pokemon guardados (só no Centro de Cerulean). -->
<div id="centro-depot-modal" class="modal modal-acima hidden">
  <div class="modal-caixa caixa-depot">
    <div class="modal-topo">
      <!-- O título acompanha a aba dos guardados, "(caixa) Depot" ou "(ícone) Coleção", e quem o escreve
           é o `pintarCabecaDoDepot`: um `data-i18n` aqui apagaria o ícone na troca de idioma. -->
      <h2 id="depot-titulo">Depot</h2>
      <div class="modal-acoes">
        <!-- O "?" do LIMITE de pokemon (3.000 no Depot + 3.000 na Coleção, 27/10/2026): o círculo dourado ao lado do ×
             (DESIGN.md §2). Nasce escondido — um servidor de antes do teto não manda o campo `teto`, e quem o acende é o
             `pintarTetoDoDepot`. -->
        <button id="depot-ajuda" class="modal-extra modal-extra-ajuda hidden" type="button" aria-haspopup="dialog" data-i18n-attr="title:teto.ajudaDica;aria-label:teto.ajudaDica" title="Entenda o limite de pokemon" aria-label="Entenda o limite de pokemon">?</button>
        <button id="depot-fechar" type="button">×</button>
      </div>
    </div>
    <div class="modal-corpo">
      <div class="depot-busca">
        <input id="depot-filtro" type="search" autocomplete="off" data-i18n-attr="placeholder:depot.buscar" placeholder="Buscar no depot…">
        <span class="depot-contagem" id="depot-contagem"></span>
      </div>
      <div class="filtros-select" id="depot-filtros">
        <label class="filtros-select-campo">
          <span data-i18n="depot.filtroTipo">Tipo</span>
          <select id="depot-sel-tipo" class="filtros-select-el"></select>
        </label>
        <label class="filtros-select-campo filtros-select-num">
          <span data-i18n="depot.filtroIv">IV mínimo</span>
          <input id="depot-iv-min" class="filtros-select-el" type="number" inputmode="numeric" step="1" min="6" max="192" data-i18n-attr="placeholder:cm.filtroQualquer" placeholder="Qualquer">
        </label>
        <label class="filtros-select-campo">
          <span data-i18n="depot.ordenarPor">Ordenar por (maior)</span>
          <select id="depot-sel-ordem" class="filtros-select-el"></select>
        </label>
      </div>
      <!-- `data-secao` é a alça do CELULAR: lá as duas seções viram ABAS (uma de cada vez,
           com a altura toda), porque lado a lado numa tela de 390 px cada uma ficava com
           300 px e a lista da equipe vazava por cima da do depot. -->
      <div class="depot-colunas">
        <section class="depot-secao" data-secao="equipe">
          <!-- O texto mora num <span> próprio: com o `data-i18n` no <h3>, a troca de idioma apagava o contador
               (o "1/5" que o `montarDepotModal` escreve) junto com o resto do título. -->
          <h3><img class="ico-equipe" src="/assets/site/assets/ui/ball-poke.png" alt="" width="18" height="18"><span data-i18n="depot.equipe">Equipe</span> <span class="cnt" id="depot-time-cnt"></span></h3>
          <div id="depot-equipe" class="depot-lista depot-scroll"></div>
        </section>
        <!-- Os guardados em DUAS abas, como o PvP (Ranqueado | Guild): o Depot, que é o que vai à
             venda do Market NPC, e a Coleção, que o jogador separou para não vender. É a mesma
             lista de pokemon partida por uma marca — mover entre as duas não troca o pokemon de
             lugar nenhum no banco. O `data-i18n` fica no `span` de dentro: no botão, ele apagaria
             o ícone e a contagem. -->
        <section class="depot-secao" data-secao="guardados">
          <!-- O CONTADOR de cada aba é o `.cnt` de sempre (o número puro, que os testes leem) dentro de um `.teto-n`: com o
               campo `teto` do servidor o `pintarTetoDoDepot` acende o "/ 3.000" (`.teto-de`), a plaquinha e a cor de
               "quase cheio" e "cheio" — sem ele, nada disto aparece e a aba fica como era. -->
          <div class="depot-lados" id="depot-lados" role="tablist">
            <button type="button" class="depot-lado on" data-lado="depot" role="tab" aria-selected="true">
              <span class="depot-lado-ico" data-ico="img:/img/icone-depot.png" data-ico-px="20" data-ico-feito="1"><img src="/img/icone-depot.png" alt="" style="height: 20px; width: 20px; object-fit: contain;"></span>
              <span data-i18n="depot.guardados">Depot</span>
              <span class="teto-n" id="depot-guardados-teto"><b class="cnt" id="depot-guardados-cnt"></b><i class="teto-de"></i></span>
            </button>
            <button type="button" class="depot-lado" data-lado="colecao" role="tab" aria-selected="false">
              <span class="depot-lado-ico" data-ico="img:site/assets/ui/menu-depot.png" data-ico-px="20" data-ico-feito="1"><img src="/assets/site/assets/ui/menu-depot.png" alt="" style="height: 20px; width: 20px; object-fit: contain;"></span>
              <span data-i18n="colecao.titulo">Coleção</span>
              <span class="teto-n" id="depot-colecao-teto"><b class="cnt" id="depot-colecao-cnt"></b><i class="teto-de"></i></span>
            </button>
          </div>
          <!-- O MEDIDOR do teto, um por aba, logo abaixo dela (as duas barras têm a largura das duas abas), e a FAIXA de
               "quase cheio / cheio" do lado que está à vista — o toque nela abre o "?" (`abrirAjudaDoTeto`). Os dois
               nascem escondidos; quem os acende é o `pintarTetoDoDepot`. -->
          <div class="depot-tetos" id="depot-tetos" hidden="">
            <div class="teto-med" data-lado="depot" role="meter" aria-valuemin="0"><i></i></div>
            <div class="teto-med" data-lado="colecao" role="meter" aria-valuemin="0"><i></i></div>
          </div>
          <button type="button" class="teto-faixa" id="depot-teto-faixa" hidden=""></button>
          <p class="depot-lado-nota" id="depot-lado-nota"></p>
          <div id="depot-guardados" class="depot-lista depot-scroll"></div>
          <!-- As PÁGINAS dos guardados, 100 pokemon por vez (pedido do dono, 21/10/2026: com 2 mil pokemon, desenhar
               todos a cada estado travava a tela). Quem pinta é `pintarPaginador` no app.js; com uma página só, some. -->
          <div class="cm-paginas pk-paginas" id="depot-paginas" hidden=""></div>
        </section>
      </div>
    </div>
  </div>
</div>

<!-- Confirmação de ação em lote (vender tudo). Fica acima do modal comum. -->
<div id="confirmar" class="modal modal-acima hidden">
  <div class="modal-caixa caixa-confirmar">
    <div class="modal-topo"><h2 id="confirmar-titulo" data-i18n="confirmar.titulo">Vender todo o Depot</h2></div>
    <div class="modal-corpo">
      <div id="confirmar-texto" class="confirmar-texto"></div>
      <div class="confirmar-botoes">
        <button id="confirmar-nao" class="btn-apagado" data-i18n="confirmar.nao">Cancelar</button>
        <button id="confirmar-sim" data-i18n="confirmar.sim" class="">Confirmar</button>
      </div>
    </div>
  </div>
</div>

<!-- A conta foi aberta noutro aparelho (ou aba) e esta sessão perdeu a vez: o servidor fechou o
     socket com 4001. Fica por cima de tudo e não tem "×" de propósito — atrás dela o jogo está
     parado, e fechar deixaria uma tela congelada que parece travamento. A saída é tomar a conta
     de volta, num clique; nada reconecta sozinho (ver `sessaoTomada` no app.js). -->
<div id="sessao-tomada" class="modal hidden" role="alertdialog" aria-modal="true" aria-labelledby="sessao-tomada-titulo" aria-describedby="sessao-tomada-texto">
  <div class="modal-caixa caixa-confirmar">
    <div class="modal-topo"><h2 id="sessao-tomada-titulo" data-i18n="sessaoTomada.titulo">Conta aberta em outro lugar</h2></div>
    <div class="modal-corpo">
      <!-- As duas telas, a de trás pausada: o desenho da frase de baixo, na medalha do diálogo
           de jogo (ver `dlg-` no estilo.css). SVG aqui mesmo porque esta caixa é estática. -->
      <span class="dlg-medalha tom-azul" aria-hidden="true">
        <svg class="dlg-svg" viewBox="0 0 20 20" width="38" height="38"><rect x="1.6" y="3" width="11.4" height="8.4" rx="1.4" fill="none" stroke="currentColor" stroke-width="1.8"></rect><rect x="7" y="8.2" width="11.4" height="8.4" rx="1.4" fill="currentColor"></rect><path d="M11.6 10.6v3.6M14 10.6v3.6" style="stroke: var(--vao)" stroke-width="1.6" stroke-linecap="round"></path></svg>
      </span>
      <div id="sessao-tomada-texto" class="confirmar-texto" data-i18n="sessaoTomada.texto">Esta conta foi aberta em outro aparelho ou aba. Só uma sessão joga por vez, então esta aqui foi pausada — a hunt e o progresso seguem na outra, sem perder nada.</div>
      <div class="confirmar-botoes">
        <button type="button" id="sessao-tomada-jogar" data-i18n="sessaoTomada.botao">Jogar aqui</button>
      </div>
      <div class="sessao-tomada-dica" data-i18n="sessaoTomada.dica">Jogar aqui desconecta a outra sessão.</div>
    </div>
  </div>
</div>

<!-- O AVISO DE CONTA: o que impede de entrar ou de criar a conta — ban, rede cheia, rede
     bloqueada, e-mail com "+", e-mail que já tem dono, captcha, tentativas demais. Era uma linha
     pequena embaixo do cartão de login (e, no jogo, um toast de 2,6 s); virou um pop-up do jogo,
     com a arte do assunto, o porquê e o botão que resolve. Vale no portal e dentro do jogo.
     Próprio, e não o #confirmar: aquele é um só para ~60 confirmações do jogo, e um aviso chegando
     pelo socket apagaria a confirmação aberta (ou o contrário). Quem monta é `abrirAlerta` no
     app.js; o motivo do ban entra por textContent, nunca como HTML. -->
<div id="alerta-conta" class="modal hidden" role="alertdialog" aria-modal="true" aria-labelledby="alerta-conta-titulo" aria-describedby="alerta-conta-texto">
  <div class="modal-caixa caixa-confirmar alerta-caixa">
    <div class="modal-topo"><h2 id="alerta-conta-titulo"></h2></div>
    <div class="modal-corpo">
      <div id="alerta-conta-arte" class="alerta-arte" aria-hidden="true"></div>
      <div id="alerta-conta-texto" class="confirmar-texto alerta-texto"></div>
      <p id="alerta-conta-motivo" class="alerta-motivo hidden"></p>
      <div id="alerta-conta-botoes" class="confirmar-botoes alerta-botoes"></div>
      <p id="alerta-conta-dica" class="alerta-dica hidden"></p>
    </div>
  </div>
</div>

<!-- O ACEITE DOS TERMOS: a conta que ainda não aceitou a versão de agora (`shared/termos.mjs`) —
     conta antiga, ou criada por Google/Discord, que não passa pela caixa do cadastro — vê isto depois
     do login, POR CIMA do jogo, que conecta e roda normalmente atrás. Sem ×, sem fechar pelo fundo nem
     pelo Esc: sai pelo "Aceitar" (grava a versão e a hora em `accounts`) ou pelo "Recusar" (desconecta
     e volta ao login — e no próximo login o aviso volta). MÍNIMO, por pedido do dono (12/10/2026): a
     pergunta com os links, a declaração dos 18 anos em texto e os dois botões; o que mudou fica nos
     Termos. O servidor NÃO recusa ninguém por isto: o bloqueio é da tela, o registro é do servidor. -->
<div id="termos-aceite" class="modal hidden" role="alertdialog" aria-modal="true" aria-labelledby="termos-aceite-titulo" aria-describedby="termos-aceite-lead">
  <div class="modal-caixa caixa-confirmar termos-caixa">
    <div class="modal-topo"><h2 id="termos-aceite-titulo" data-i18n="termos.titulo">Atualizamos nossos Termos</h2></div>
    <div class="modal-corpo">
      <p id="termos-aceite-lead" class="confirmar-texto termos-lead" data-i18n-html="termos.lead">Você concorda com os novos <a href="/terms" target="_blank" rel="noopener">Termos de Uso</a> e a <a href="/terms#privacidade" target="_blank" rel="noopener">Política de Privacidade</a>?</p>
      <p class="alerta-dica termos-nota" data-i18n="termos.declaracaoCurta">Ao aceitar, você declara ter 18 anos ou mais.</p>
      <p id="termos-aceite-erro" class="termos-erro hidden" role="alert"></p>
      <div class="confirmar-botoes termos-botoes">
        <button type="button" id="termos-aceite-recusar" class="btn-apagado" data-i18n="termos.recusar">Recusar</button>
        <button type="button" id="termos-aceite-aceitar" class="principal" data-i18n="termos.aceitar">Aceitar</button>
      </div>
    </div>
  </div>
</div>

<!-- Painel da guild: criar, convidar, expulsar ou apagar. -->
<div id="guild" class="modal modal-acima hidden">
  <div class="modal-caixa caixa-guild">
    <div class="modal-topo">
      <div class="modal-topo-esq">
        <button id="guild-voltar" type="button" class="guild-topo-voltar hidden" aria-label="Voltar" title="Voltar">←</button>
        <span class="modal-titulo-ico modal-titulo-emoji" aria-hidden="true">🛡️</span>
        <h2 id="guild-titulo" data-i18n="guild.titulo">Guild</h2>
      </div>
      <button id="guild-fechar" type="button">×</button>
    </div>
    <div class="modal-corpo" id="guild-corpo"></div>
  </div>
</div>

<!-- Equipe de guerra da guild — escolha separada da equipe de hunt. -->
<div id="guild-time-modal" class="modal modal-acima hidden">
  <div class="modal-caixa caixa-guild-time">
    <div class="modal-topo">
      <h2 id="guild-time-titulo" data-i18n="guild.timeTitulo">Minha equipe de guerra</h2>
      <button id="guild-time-fechar" type="button">×</button>
    </div>
    <div class="modal-corpo" id="guild-time-corpo"></div>
  </div>
</div>

<!-- O TIME DA GUILD (a escalação): quem, dos membros, entra na Guerra de Guilds.
     É outra coisa do modal acima — lá o jogador escolhe os POKEMON dele; aqui o dono escolhe
     os JOGADORES. A guild não tem teto de membros; o time tem. -->
<div id="guild-escalacao-modal" class="modal modal-acima hidden">
  <div class="modal-caixa caixa-guild-escalacao">
    <div class="modal-topo">
      <h2 id="guild-escalacao-titulo" data-i18n="guild.escalacaoTitulo">Time da Guild</h2>
      <button id="guild-escalacao-fechar" type="button">×</button>
    </div>
    <div class="modal-corpo" id="guild-escalacao-corpo"></div>
  </div>
</div>

<!-- AS DOAÇÕES DA GUILD: o log completo do banco — quanto cada membro já doou na vida da guild
     (inclusive quem saiu e quem nunca doou) e cada doação, por rodada, com o CSV. Só dono e
     sub-dono; abre do "Ver todas as doações" da aba Boost, por cima da janela da guild. -->
<div id="guild-doacoes-modal" class="modal modal-acima hidden">
  <div class="modal-caixa caixa-guild-doacoes">
    <div class="modal-topo">
      <h2 id="guild-doacoes-titulo" data-i18n="guildBanco.logTitulo">Doações da guild</h2>
      <button id="guild-doacoes-fechar" type="button">×</button>
    </div>
    <div class="modal-corpo" id="guild-doacoes-corpo"></div>
  </div>
</div>

<div id="toast" class="toast hidden">comprado: Ultra Ball ×88 (−11.440 ouro)</div>

<!-- AVISO DE MUDANÇA — abre UMA vez por jogador, no primeiro login depois do deploy.
     A versão lida fica em `players.aviso_visto`; ver `shared/aviso-jogo.mjs`. Não tem "×"
     de propósito: o único jeito de fechar é o botão "Entendi", que é o que carimba a
     leitura no servidor. Um × no canto fecharia sem carimbar, e o recado voltaria. -->
<div id="aviso-jogo" class="modal modal-acima hidden" aria-hidden="true" role="dialog" aria-modal="true" aria-labelledby="aviso-jogo-titulo">
  <div class="modal-caixa caixa-aviso-jogo">
    <div class="modal-topo">
      <!-- O título ("Novidades no PokeIdle v1.85.0 — 13/09/2026") é montado pelo `mostrarNovidade`. -->
      <div class="modal-topo-esq"><h2 id="aviso-jogo-titulo">Novidades no PokeIdle</h2></div>
    </div>
    <div class="modal-corpo aviso-jogo-corpo">
      <!-- Um slide por novidade, da mais recente para a mais antiga — a mesma ordem de `NOVIDADES`,
           em `shared/aviso-jogo.mjs`. O `data-aviso` é o número dela lá. -->

      <!-- 10 · v1.126.0 — O MODO ECONOMIA: o palco sem cena, para celular e PC fraco. No destaque, os
           dois números medidos (é o que a pessoa sente: bateria e internet); embaixo, como liga em
           três passos — o terceiro é a Tela sempre acesa, que anda junto —, o PvP Ranqueado que
           virou semanal e o resto do que entrou desde a v1.120.0. -->
      <!-- 11 · v1.128.0 — O PASSE DE BATALHA: os dois cartões (Grátis e VIP) no palco de festa, o
           "um resgate por dia" em três passos, e embaixo o PvP amistoso, a análise da guerra e o
           resto da atualização. -->
      <!-- v12 · CONVIDE & GANHE, e o Campeonato Amador.

           O herói é a ESCADA de convites, e ela é desenhada com as quatro molduras de raridade
           (comum → lendária) de propósito: é a mesma escada que o jogador já lê na Casa, na
           Bicicleta e no Passe, então ele entende "isto cresce" antes de ler uma palavra. O
           degrau lendário é o VIP PERMANENTE — o único prêmio do jogo que não tem prazo.

           Os três passos vêm logo abaixo do herói, e não no fim, porque esta novidade só funciona
           se a pessoa FIZER uma coisa (criar o próprio link). Sem eles, o slide anuncia um
           programa que ninguém sabe como entrar. -->
      <!-- v13 · AS MEGA EVOLUÇÕES.

           O herói é a ESCADA de uma mega só, ponta a ponta: boss → fragmento → pedra → o bicho
           novo. É o que a pessoa precisa entender em três segundos, e é uma história linear —
           por isso quatro molduras em fila, e não a grade das 35. A grade vem depois, como
           lista, para quem quiser saber "o meu tem?".

           As duas famílias (comum e shiny) aparecem lado a lado no bloco das chances, com a
           METADE escrita em número: é a única coisa que muda entre elas, e é o que decide se o
           jogador vai farmar boss para uma ou para a outra. -->
      <!-- v15 · A CAMPANHA DO INSTAGRAM.

           O herói aqui NÃO é montado em marcação como os outros: é a arte da campanha, a mesma
           peça que está publicada no Instagram. Redesenhá-la em HTML faria o jogador ver uma
           coisa aqui e outra no post que o botão abre — e o que faz uma campanha funcionar é ela
           ser reconhecível nos dois lugares. Por isso a imagem inteira, sem corte.

           O CTA vem LOGO ABAIXO da arte, antes de qualquer texto: a arte já explica a promoção
           (o "10 💎" está desenhado nela), e quem se convenceu pelo desenho não deve ter de
           rolar um bloco de regras para achar o botão. As regras ficam embaixo, para quem lê.

           O link é o do POST, e não o do perfil: é lá que está a legenda com as regras
           completas — mandar para o perfil obrigaria a pessoa a procurar o post certo. -->
      <!-- v16 · A NAME TAG.

           O herói é a própria ETIQUETA, em tamanho grande, com os dois números que decidem a
           compra ao lado: quanto custa e quantas letras cabem. Não há arte de campanha aqui
           porque não há campanha — é um produto de balcão, e o que convence é o que ele faz.

           O bloco das REGRAS vem por último e é o mais comprido de propósito. Três das quatro
           linhas são coisas que o jogador só descobriria gastando 15 💎 (é só aparência, é uso
           único, o nome vai junto na venda), e a quarta é o aviso de conduta — que precisa ter
           sido lido ANTES de alguém achar graça em escrever o que não deve. -->
      <!-- v17 · A ESCALAÇÃO SECRETA do PvP Ranqueado.

           O herói são os DOIS lados da regra, lado a lado: o que continua à vista (o time) e o
           que passou a ser só do dono (a ordem, desenhada como "? ? ?"). É a frase inteira da
           novidade em dois cartões — quem só olhar o desenho já entendeu.

           O parágrafo em destaque diz o PORQUÊ antes do "o que mudou": sem ele, esconder a ordem
           parece capricho, e quem estudava o adversário pela ficha acharia que perdeu uma
           ferramenta. Com ele, a pessoa lê que a regra existe para proteger quem busca a luta. -->
      <!-- v19 · O CRAFT DE CASAS E DE BICICLETAS no Professor Carvalho (as casas na v1.179.0, as
           bicicletas logo depois, na mesma novidade — nenhuma das duas tinha ido ao ar).

           O herói é a ESCADA do craft, com as molduras de raridade que o jogador já lê na Casa:
           Comum → Incomum → Rara, e a Rara como o degrau final — o "só até a Rara" é a regra que
           mais surpreende, então ela vai desenhada (o último cartão) e escrita logo abaixo, antes
           do passo a passo. Cada degrau leva a casa E a bicicleta daquela raridade, lado a lado
           (`.ab-par`): a receita é a mesma para as duas peças. O resto da leva (Boss automático, golpes novos, a regra de Gemas do
           Mercado e o Tracker) fica no "Também nesta atualização". -->
      <!-- v20 · O MYSTIC TICKET e os MYSTERY EGGS (v1.182.0 e v1.182.1, no ar em 30/09/2026).

           O herói são as três peças novas, na festa de sempre: o ticket com a moldura dourada (é o
           drop mais raro do jogo), os três ovos juntos na moldura roxa — P2, P3 e P4, nas cores dos
           cards de potência — e a Chocadeira. Embaixo, um bloco para cada: como o ticket cai e o que
           ele abre (a bola ÚNICA é a regra que mais surpreende), e os preços e as horas dos ovos. O
           resto da leva (Tag IDLE com os botões novos do #reedem-codes, troféus de campeonato,
           contador de favoritos e o Mismagius) vai no "Também nesta atualização". -->
      <!-- v23 · O BOOST DA GUILD pelo banco da guild (v1.223.0 e v1.226.0), com o Mercado de
           Diamantes só de comprados (v1.224.0) e a leva de 03/10 (v1.218.0 a v1.225.1).

           A festa de sempre, no VIOLETA do ícone do boost (`--gb`, o roxo das divisas) com o ouro da
           faixa no título — roxo e dourado, as cores do brasão de guild. O ícone quica no alto, como o
           K da Kick na 22, e a fileira são as TRÊS coisas que ele dá, na escada de raridade: o XP do
           treinador (azul), o dos pokemon (roxo) e "a guild toda" (ouro, com o brasão dourado da 14),
           porque o que surpreende é ser de TODOS. A faixa dourada diz as duas regras que mais importam
           (cada um doa o que pode; encher de novo SOMA 7 dias), o "Como ativar" diz onde fica o banco
           e o que acontece quando ele enche, e o bloco do Mercado de Diamantes vem antes do "Também":
           ele mexe no bolso de quem vendia diamante de indicação. -->
      <!-- v24 · A GUERRA DE GUILDS PELA NOTA — 60% de pé, 40% de briga — e a leva de 06/10 (v1.235.0).

           A festa de sempre na BRASA da guerra (`--guerra-*`, o anel e a luz do herói da aba Guild do
           PvP), com o título no ouro de sempre. As espadas cruzadas se chocam no alto, e a fileira é a
           própria regra na escada de raridade: os 60 de ficar de pé (azul, o escudo do painel), os 40 de
           abates (roxo, as espadas — o contador de pokemon derrubados) e a nota de 100 (ouro, com o troféu do Campeonato). A faixa
           dourada diz o que MUDA para quem joga, com as 9 guerras recontadas: a última de pé leva, e quem
           só se esconde não chega mais ao topo. Depois vêm a regra inteira, a aba nova,
           e o BOOST DOS ATRASADOS com a conta aberta (a mediana dos veteranos, o preço pelo XP que falta
           e por que é em XP) — é o bloco que diz a quem chegou agora que dá para alcançar. Os 30 dias, o
           Prêmio do mês e o chat vêm por último. -->
      <!-- v25 · O OVO SHINY (v1.247.0) — o prêmio de quem rusha nível — e a leva de v1.241.0 a v1.245.0.

           O herói é o PRÓPRIO OVO, grande, dentro da áurea que ele tem no jogo (o `.oshy-arte` da bolsa e
           da chocadeira, com o halo, o anel arco-íris e as faíscas): ele é a novidade, e é o que a pessoa
           tem de reconhecer depois na bolsa. A festa vai no DOURADO dessa áurea. A fileira é a escada em
           três molduras, da Rara à Lendária: o fragmento que cai, os 10 que viram o ovo no Professor e o
           shiny que nasce em 7 dias — com a faísca no lugar de um sprite, porque a espécie é sorteada.
           A faixa dourada diz o PORQUÊ (é de quem sobe de região, não de quem fica sugando a Outland), e os
           blocos dizem como conseguir, quem nunca nasce dele e que os dois se negociam. -->
      <!-- v26 · O SHOWDOWN (v1.271.0) — o torneio SEMANAL da comunidade — e a leva de v1.253.0 a v1.270.0.

           O herói é o LOGO do Showdown, grande, na festa das QUATRO cores dele: o vermelho da pokebola e as
           argolas amarela, verde e azul (as mesmas `--sd-*` do card do Torneio). Os raios, o confete, a moldura
           e as faíscas repetem as quatro, e a faixa é o vermelho do logo. A fileira é a escada de raridade, e o
           degrau de cima é o que o torneio PAGA: o ritmo (1 min por rodada, azul), a regra que só ele tem (nível
           máximo 150, roxo) e os 180 💎 do pódio (ouro, com o diamante do jogo). A faixa dourada diz o QUANDO — o
           1º é quarta 14/10 e as inscrições já estão abertas —, e os blocos dizem como funciona, quem pode lutar
           (com o porquê e o exemplo do teto) e o prêmio. Cada bloco abre com uma peça que o jogador já vai ver na
           tela do Showdown, em vez de uma nova: a agenda nas plaquinhas do topo do "Como funciona" (`.sdc-numeros`),
           o que não entra nos selos de regra do card (`.sd-regra`) e o pódio nas plaquinhas do prêmio (`.sdc-lugar`).
           O resto da leva (o Top Catch semanal à frente) vai no "Também nesta atualização". -->
      <!-- v27 · O SAFARI (v1.282.0) — o lugar novo que os Bosses abrem — e a leva de v1.272.0 a v1.282.1.

           O herói é o PRÓPRIO SAFARI TICKET, grande (5× o desenho de 32 px, sem serrilhar), sobre a luz do sol
           baixo da mata: é a peça que a pessoa tem de reconhecer depois na Bolsa e no Mercado, como o ovo na 25 e
           o logo na 26. A festa é no VERDE do capim ao sol — o mesmo da plaquinha da cena e do palco da entrada
           —, com o confete virando folhas. A fileira é a escada de raridade com um
           pictograma por degrau: a HORA (azul), o SORTEIO das 695 espécies (roxo) e a Poke Ball no de cima (ouro,
           3× o desenho de 18 px), porque o Safari é captura (o selvagem vem no Nv 1 e o capturado no dobro do nível de captura). O sorteio
           (14/10/2026, pedido do dono) não é mais um "?": são três pokemon flutuando, um de cada ponta das
           gerações — Clefairy (1ª), Petilil (5ª) e Tinkatink (9ª), sorteados entre os 695 do próprio Safari —,
           para dizer "qualquer um" sem palavra (`.ab-mega`, que `pintarMegasDaNovidade` desenha). A faixa
           dourada diz de ONDE vem o ticket e por onde se entra; os blocos dizem como funciona e a regra que muda
           tudo — não há volta: sair e desmaiar encerram a hora, como na Arena Mística (14/10/2026, pedido do dono;
           o bloco tinha a pele do botão "Voltar ao Safari", que saiu do jogo junto com a volta). A terceira linha
           do bloco é a exceção, pedida na mesma noite: a queda de conexão (o F5, a outra aba) NÃO encerra — a
           volta cai no mesmo ponto.
           O resto da leva vai no "Também nesta atualização". -->
      <!-- v30 · JOHTO DEPOIS DA OUTLAND (v1.309.0, no ar desde 18/10/2026) — e o resto do deploy de 18/10 (v1.305.5 a
           v1.314.2). Escrita depois do deploy, junto com a 31.

           A festa azul-mar da 29 (`aviso-regioes`), com o mapa de Kanto como herói, recortado no continente de cima: é o
           desenho que a aba Johto mostra (as duas regiões dividem o mapa). A fileira é a escada nova, na ordem do Mapa:
           Johto no 200 (Cyndaquil), as Outlands 2 a 8 (o Ancient Dragonite da Outland — o Brave Tyranitar tem a arte do
           Tyranitar de Johto e confundiria o cartão) e a captura pelo estágio (a Beast Ball). A faixa dourada diz os números
           da captura, o que mais muda no dia a dia; os blocos dizem Johto e as Outlands, a regra da captura, o Mercado só
           com fragmentos e os pokemon que mudaram. -->
      <!-- v31 · A LEVA DE SPRITES DE 18/10 (v1.316.0, sobe em 19/10/2026) — e o resto da leva (v1.314.3 a v1.320.0).

           Festa no roxo do mítico (`aviso-leva`), com o Hoopa flutuando grande no meio: é ele que muda o Mystic Ticket, e o
           roxo é a cor dele. A fileira são os três números da leva, cada um com um bicho dela: 5 espécies (Darmanitan), 9
           formas (Shaymin Sky) e 6 megas (Mega Salamence). A faixa dourada diz a regra que mais mexe com quem já tem
           lendário — as formas viraram evolução —; os blocos dizem os pokemon, as evoluções, o Top Gemas (com os selos novos do chat), o chat sem links e o resto, e
           o último item aponta a 30 (a seta ‹), que foi ao ar sem novidade. -->
      <!-- A NOVIDADE 41: o VÍNCULO DE CONTAS (v1.402.0, pokeidle.io/vincular), com a festa — é o foco da leva v1.401.3 a
           v1.408.2 — e o resto em lista, no molde da 40. A festa de sempre (raios, confete, a moldura) no ROXO do botão
           (`--rx-*`, o "ligado" do jogo), com um herói próprio (`.avv-*`): quatro plaquinhas de conta (1 a 4), cada uma
           com o bonequinho do `DLG_ICONES` e o número na receita do botão pixel, presas por elos de corrente dourados
           (CSS puro: dois anéis de `box-shadow` que se cruzam) e a legenda "até 4 contas por pessoa". A faixa dourada diz
           onde fica (Perfil → Vincular contas, ou pokeidle.io/vincular); os blocos dizem como vincular, o que saber ANTES
           (é para sempre; o código não se passa a ninguém), os 332 mapas novos com as hunts embaralhadas e os Bosses por
           região; o "Também nesta atualização" traz o resto, e o último item aponta a 40 (a seta ‹). O primeiro item do
           "Também" é a promoção dos 2 meses de PokeIdle (50% OFF no Boost dos Atrasados) e TEM PRAZO, 08/11 às 00h de
           Brasília: se o deploy passar disso, tirar o item. Ficou de fora o que é da equipe: o Histórico de Banimentos, o
           Desvincular, a Faxina, o painel, o ban com prazo, os detalhes internos da Kick e a frase do reembolso no
           Excluir conta. -->
      <section class="novidade" data-aviso="41">
        <section class="aviso-bikes aviso-vinculo">
          <div class="ab-raios" aria-hidden="true"></div>
          <div class="ab-confete" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
          <span class="ab-fita" data-i18n="aviso.v41Fita">Contas</span>
          <h3 class="ab-titulo" data-i18n="aviso.v41Titulo">VINCULE SUAS CONTAS</h3>
          <div class="avv-heroi">
            <div class="avv-fila" aria-hidden="true">
              <span class="avv-conta"><svg viewBox="0 0 20 20"><circle cx="10" cy="5.8" r="4"></circle><path d="M2.4 18.6c0-4.2 3.4-7 7.6-7s7.6 2.8 7.6 7z"></path></svg><b>1</b></span>
              <i class="avv-elo"><b></b></i>
              <span class="avv-conta"><svg viewBox="0 0 20 20"><circle cx="10" cy="5.8" r="4"></circle><path d="M2.4 18.6c0-4.2 3.4-7 7.6-7s7.6 2.8 7.6 7z"></path></svg><b>2</b></span>
              <i class="avv-elo"><b></b></i>
              <span class="avv-conta"><svg viewBox="0 0 20 20"><circle cx="10" cy="5.8" r="4"></circle><path d="M2.4 18.6c0-4.2 3.4-7 7.6-7s7.6 2.8 7.6 7z"></path></svg><b>3</b></span>
              <i class="avv-elo"><b></b></i>
              <span class="avv-conta"><svg viewBox="0 0 20 20"><circle cx="10" cy="5.8" r="4"></circle><path d="M2.4 18.6c0-4.2 3.4-7 7.6-7s7.6 2.8 7.6 7z"></path></svg><b>4</b></span>
              <i class="avd-faisca f1"></i><i class="avd-faisca f2"></i><i class="avd-faisca f3"></i><i class="avd-faisca f4"></i>
            </div>
            <p class="avv-legenda" data-i18n="aviso.v41Ate">até 4 contas por pessoa</p>
          </div>
          <p class="ab-sub" data-i18n-html="aviso.v41Sub">As regras do PokeIdle permitem <b>até 4 contas por pessoa</b>. Agora você mostra à equipe quais são as suas.</p>
        </section>

        <p class="aviso-lendaria" data-i18n-html="aviso.v41Onde">No jogo: <b>Ficha do Treinador → Vincular contas</b>. Ou direto em <b>pokeidle.io/vincular</b>, logado numa das suas contas.</p>

        <section class="aviso-bloco">
          <h3 data-i18n="aviso.v41ComoTitulo">Como vincular</h3>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v41Passo1">Entre no jogo com uma das suas contas e abra <b>pokeidle.io/vincular</b>.</li>
            <li data-i18n-html="aviso.v41Passo2">Digite o <b>e-mail da outra conta</b>: um <b>código de 6 números</b> chega nesse e-mail e vale <b>15 minutos</b>.</li>
            <li data-i18n-html="aviso.v41Passo3">Digite o código na página e pronto: as duas contas ficam vinculadas. Qualquer conta do grupo vincula a próxima, até <b>4 contas</b>.</li>
            <li data-i18n-html="aviso.v41Perfil">A <b>Ficha do Treinador</b> mostra as suas contas vinculadas.</li>
          </ul>
        </section>

        <section class="aviso-bloco">
          <h3 data-i18n="aviso.v41AntesTitulo">Antes de vincular</h3>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v41Sempre"><b>É para sempre:</b> nenhuma das contas desfaz o vínculo depois, e o espaço de uma conta vinculada que for excluída não volta.</li>
            <li data-i18n-html="aviso.v41Codigo"><b>Nunca passe o código a ninguém.</b> A equipe nunca pede. Quem tem o código prende a sua conta ao grupo de quem pediu. Caiu nisso? Abra um ticket no Discord.</li>
          </ul>
        </section>

        <section class="aviso-bloco">
          <h3 data-i18n="aviso.v41MapasTitulo">332 mapas novos</h3>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v41Mapas"><b>332 mapas novos</b>, desenhados para cada tipo: outono e colmeias no Inseto, rios de lava no Fogo, neve e iglus no Gelo, uma ilha no céu no Voador, covil com ossadas e tesouro no Dragão, cemitério no Fantasma, templos com mosaico no Psíquico — e os outros 11 tipos também.</li>
            <li data-i18n-html="aviso.v41Hunts"><b>Hunts embaralhadas:</b> toda hunt fora da Outland caça agora num mapa do seu tipo, novo ou antigo, e evoluções da mesma família ficam em mapas diferentes. Antes, dezenas de hunts dividiam o mesmo mapa; agora são no máximo 3 por mapa.</li>
            <li data-i18n-html="aviso.v41Fixo"><b>O mapa é fixo:</b> cada hunt tem o seu mapa; sair e entrar de novo abre o mesmo.</li>
            <li data-i18n-html="aviso.v41Ritmo"><b>Ritmo igual em todo mapa:</b> todos estão na mesma régua de caça. Quem caçava num mapa mais rápido que os outros pode ficar um pouco mais lento, e quem caçava num mais lento fica mais rápido.</li>
            <li data-i18n-html="aviso.v41Outland"><b>Outland:</b> as hunts ficam nos mesmos mapas, com o spawn acertado para render igual às outras.</li>
          </ul>
        </section>

        <section class="aviso-bloco">
          <h3 data-i18n="aviso.v41BossTitulo">Bosses por região</h3>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v41Lendarios"><b>27 lendários, três por região</b>, e cada um da trinca dá um prêmio: o 1º, os Fragmentos de Z-Move e de TM AoE; o 2º, os de Mega Stone e Mega Stone Shiny; o 3º, o Mystic Ticket e o Safari Ticket.</li>
            <li data-i18n-html="aviso.v41Niveis"><b>Nível fixo por região:</b> Kanto 300, Johto 650, Hoenn 3.100, Sinnoh 9.750, Unova 22.700, Kalos 44.050, Alola 75.900, Galar 120.350 e Paldea 179.500. A sua equipe não muda mais o nível do boss.</li>
            <li data-i18n-html="aviso.v41Aba">A aba <b>Bosses</b> mostra cada região com a trinca, o nível e os prêmios, e as vitórias aparecem curtas (1k, 141k).</li>
            <li data-i18n-html="aviso.v41BossAuto"><b>Entre um boss e o próximo:</b> agora são <b>10 segundos</b> de espera, no automático e na mão. A primeira luta entra na hora.</li>
            <li data-i18n-html="aviso.v41Saem">Regirock, Regice, Registeel, Uxie, Mesprit, Azelf, Heatran, Regigigas, Cresselia, Cobalion, Terrakion, Virizion, Kartana, Guzzlord, Poipole e Naganadel saem dos Bosses e voltam a ser só do <b>Mystic Ticket</b>.</li>
          </ul>
        </section>

        <section class="aviso-bloco">
          <h3 data-i18n="aviso.tambemTitulo">Também nesta atualização</h3>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v41Aniversario"><b>2 meses de PokeIdle:</b> <b>50% OFF</b> no Boost dos Atrasados até <b>08/11 às 00h</b> (Brasília) — depois o preço volta ao normal.</li>
            <li data-i18n-html="aviso.v41Safari"><b>Safari:</b> lá dentro, <b>+15% de Shiny Secret Lure</b> e <b>+15% de Capture Boost</b>.</li>
            <li data-i18n-html="aviso.v41Guild"><b>Guild:</b> o dono ou o sub-dono troca o nome da guild por <b>50 diamantes</b> (Guild → Guild, embaixo do brasão).</li>
            <li data-i18n-html="aviso.v41Evoluir"><b>Evoluir pela ficha:</b> o pokemon do Depot, da Coleção ou da casa evolui direto na ficha, no botão <b>Evoluir pokemon</b>; os botões da ficha agora ficam em três linhas.</li>
            <li data-i18n-html="aviso.v41Tamanho"><b>Tamanho no campo:</b> cada pokemon aparece no tamanho dele ao lado do treinador, e a shiny no mesmo tamanho da normal. <b>69 pokemon</b> ganharam arte nova, comum e shiny.</li>
            <li data-i18n-html="aviso.v41Komala"><b>Komala</b> chegou, com hunt em Alola.</li>
            <li data-i18n-html="aviso.v41Golpes"><b>Golpes:</b> 356 movesets novos — o primeiro estágio com 7 golpes, a forma do meio com 9 (um de 600) e quem não evolui com 12 — e 26 golpes novos.</li>
            <li data-i18n-html="aviso.v41Lucario"><b>Lucario</b> agora é Lutador/Aço.</li>
            <li data-i18n-html="aviso.v41Venda"><b>Venda ao NPC:</b> quem evoluir daqui em diante vende pelo preço da espécie em que foi capturado (um Garchomp que era Gible vende como Gible). O Market mostra isso no card.</li>
            <li data-i18n-html="aviso.v41Login"><b>Login:</b> a caixa do captcha voltou a aparecer para quem tem internet mais lenta.</li>
            <li data-i18n-html="aviso.v41Economia"><b>Modo Economia:</b> a roda do mouse volta a rolar o Depot, a Coleção e os Itens do cofre.</li>
            <li data-i18n-html="aviso.v41Kick"><b>Bônus da Kick:</b> os pacotes de 3, 5 e 10 horas podem levar até 1 minuto para entrar depois do resgate.</li>
            <li data-i18n-html="aviso.v41Anterior"><b>Perdeu a novidade anterior?</b> A lista de 04/11 (Bônus Twitch pelos pontos do canal e mais) está na seta <b>‹</b>, aqui embaixo.</li>
          </ul>
        </section>
      </section>
      <!-- A NOVIDADE 40: a LISTA do que mudou (v1.399.0 a v1.400.0), sem festa, no molde da 39 — pedido do dono em
           04/11/2026 ("só um patch note igual foi o antes"). Um bloco só: o Bônus Twitch pelos pontos do canal, o vínculo
           da Twitch para sempre, o Conectar canal do Streamer Oficial, o boss no nível do pokemon mais forte da equipe e o
           Mini Games só com o selo de campeão. O último item aponta a 39 (a seta ‹). Ficou de fora o que é da equipe: as
           abas Contas Twitch e Desvincular Twitch do painel. -->
      <section class="novidade" data-aviso="40" hidden="">
        <section class="aviso-bloco">
          <h3 data-i18n="aviso.v40Titulo">O que mudou</h3>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v40Twitch"><b>Bônus Twitch:</b> agora é pelos <b>pontos do canal</b>, como o da Kick. A Twitch só dá pontos a quem assiste com o vídeo rodando na <b>página do canal</b> (ou no app) — o chat destacado sozinho não ganha nada —, e cada canal oficial tem três recompensas: <b>+15% XP</b> (300 pontos), <b>+15% Capture Boost</b> (500) e <b>+15% Secret Lure</b> (1.000). Cada resgate vale <b>1 hora</b>, as horas se somam e o resgate é aprovado sozinho em segundos. O bônus automático pelo chat e o +2,5% por live a mais saíram.</li>
            <li data-i18n-html="aviso.v40Vinculo"><b>Vínculo da Twitch:</b> agora é <b>para sempre</b>, como o da Kick — uma conta da Twitch por treinador, com uma confirmação antes de gravar. Quem já tinha vinculado não precisa fazer nada. Vinculou a conta errada? Fale com o suporte. Resgate feito sem vínculo é recusado, e a Twitch devolve os pontos.</li>
            <li data-i18n-html="aviso.v40Streamer"><b>Streamer Parceiro Oficial:</b> o <b>/mod pokeidlebot</b> não é mais necessário. Autorize o PokeIdle uma vez pelo <b>Conectar canal</b>, na linha <b>Bônus Twitch</b> (é preciso ser Afiliado ou Parceiro da Twitch), e as recompensas aparecem no seu canal sozinhas.</li>
            <li data-i18n-html="aviso.v40Boss"><b>Bosses:</b> o nível da luta agora segue o <b>pokemon mais forte da sua equipe</b>, e não mais o nível do treinador — e nunca fica abaixo do nível do próprio boss. O nível que <b>libera</b> cada boss continua sendo o do treinador.</li>
            <li data-i18n-html="aviso.v40Minigames"><b>Mini Games:</b> o fechamento do dia não paga mais diamantes. O prêmio agora é só o <b>selo de campeão</b> ao lado do nick no chat, no dia seguinte, para o 1º do placar (com as regras de sempre: 50+ pontos no dia e conta com 7+ dias). Diamante de um dia que já fechou e ainda não foi entregue continua saindo no seu próximo login.</li>
            <li data-i18n-html="aviso.v40Anterior"><b>Perdeu a novidade anterior?</b> A lista de 02/11 (Z-Move no PvP, Alcance na Pokedex e mais) está na seta <b>‹</b>, aqui embaixo.</li>
          </ul>
        </section>
      </section>
      <!-- A NOVIDADE 39: a LISTA do que mudou (v1.393.1), sem festa — pedido do dono em 02/11/2026: a leva não tem foco
           principal, "é mais um patch note mesmo". Sem herói, sem raios e sem confete: um bloco só, com o Z-Move no PvP
           (1.800; a caça, os Bosses e o Raid seguem com 2.800), o alcance na Pokedex, o inicial que fica, o som do shiny
           e o bot da Twitch. O último item aponta a 38 (a seta ‹). Ficou de fora o que é da equipe: o helper do chat
           que passou a receber os prêmios (v1.391.3). -->
      <section class="novidade" data-aviso="39" hidden="">
        <section class="aviso-bloco">
          <h3 data-i18n="aviso.v39Titulo">O que mudou</h3>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v39Zmove"><b>Z-Move no PvP:</b> o dano base (power) caiu de 2.800 para <b>1.800</b> em todo PvP — Ranqueado, Amistoso, Ginásio, Guerra de Guilds, Campeonato e Treinamento. Na <b>caça</b>, nos <b>Bosses</b> e no <b>Raid</b> continua <b>2.800</b>. O <b>Poder no PvP</b> da ficha e a força do pódio dos Ginásios já contam com o 1.800, então quem tem Z-Move vê esse número menor.</li>
            <li data-i18n-html="aviso.v39Alcance"><b>Pokedex:</b> a ficha de cada espécie mostra o <b>Alcance no PvP</b> — 🗡️ corpo a corpo, 2🏹, 3🏹 ou 4🏹. Passe o mouse na placa (no celular, toque) para ver a conta.</li>
            <li data-i18n-html="aviso.v39Inicial"><b>Pokemon inicial:</b> ele fica com você — não se vende mais ao NPC (o <b>Vender todo o Depot</b> o deixa de fora) e não vai ao altar do <b>Sacrifício</b>.</li>
            <li data-i18n-html="aviso.v39Som"><b>Som do shiny:</b> agora toca só quando chega um shiny. O prêmio do <b>/resgatar</b>, o Passe, o VIP e o Ovo Shiny fabricado no Professor Carvalho ganharam um som próprio de recompensa.</li>
            <li data-i18n-html="aviso.v39Twitch"><b>Bônus Twitch:</b> o bot que confere quem está na live agora é o <b>pokeidlebot</b>. Streamer Oficial: digite <b>/mod pokeidlebot</b> no chat da sua live para o bônus continuar valendo para quem assiste.</li>
            <li data-i18n-html="aviso.v39Anterior"><b>Perdeu a novidade anterior?</b> O <b>PvP no Tabuleiro</b> está na seta <b>‹</b>, aqui embaixo.</li>
          </ul>
        </section>
      </section>
      <!-- A NOVIDADE 38: o PvP NO TABULEIRO (v1.390.0), com o POSICIONAMENTO como foco. A festa de sempre (raios, confete,
           a moldura dourada) com a escada do ALCANCE no lugar do pódio (`.avc-podio`): quatro degraus, do 🗡️ corpo a corpo
           ao 4🏹, cada um mais alto que o anterior. A faixa dourada diz onde vale; os blocos dizem como montar o tabuleiro,
           o alcance de cada pokemon, os ranks e o prêmio do mês, e o resto; o último item aponta a 37 (a seta ‹). -->
      <section class="novidade" data-aviso="38" hidden="">
        <section class="aviso-bikes aviso-tabuleiro">
          <div class="ab-raios" aria-hidden="true"></div>
          <div class="ab-confete" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
          <span class="ab-fita" data-i18n="aviso.v38Fita">PvP</span>
          <h3 class="ab-titulo" data-i18n="aviso.v38Titulo">PvP NO TABULEIRO</h3>
          <div class="avc-topo">
            <div class="avc-podio avt-escada">
              <div class="avc-lugar alc1"><span aria-hidden="true">🗡️</span><b data-i18n="aviso.v38A1">1 casa</b><small data-i18n="aviso.v38Perto">encostado</small></div>
              <div class="avc-lugar alc2"><span aria-hidden="true">2🏹</span><b data-i18n="aviso.v38A2">2 casas</b><small data-i18n="aviso.v38Longe">de longe</small></div>
              <div class="avc-lugar alc3"><span aria-hidden="true">3🏹</span><b data-i18n="aviso.v38A3">3 casas</b><small data-i18n="aviso.v38Longe">de longe</small></div>
              <div class="avc-lugar alc4"><span aria-hidden="true">4🏹</span><b data-i18n="aviso.v38A4">4 casas</b><small data-i18n="aviso.v38Longe">de longe</small></div>
            </div>
          </div>
          <p class="ab-sub" data-i18n-html="aviso.v38Sub">O PvP agora é num <b>tabuleiro</b>: você <b>posiciona</b> até <b>5 pokemon</b> nas casas da sua metade da arena, e eles <b>nascem juntos</b> e lutam ao mesmo tempo. Quem fica na frente segura a pancada; quem fica atrás ataca de longe.</p>
        </section>

        <p class="aviso-lendaria" data-i18n-html="aviso.v38Vale"><b>Vale em todo PvP:</b> Ranqueado, Amistoso, Ginásio, Treinamento, Campeonato e Showdown. A Guerra de Guilds continua como era.</p>

        <section class="aviso-bloco">
          <h3 data-i18n="aviso.v38MontarTitulo">Monte o seu tabuleiro</h3>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v38Arrastar"><b>Arraste e solte:</b> em PvP › Ranqueado, toque em <b>Editar tabuleiro</b> e arraste os pokemon da Equipe, da Coleção ou do Depot para as casas (no celular, toque no pokemon e depois na casa). Soltar em cima de outro troca os dois, e o <b>Auto-posicionar</b> arruma tudo sozinho: corpo a corpo na frente, quem ataca de longe atrás.</li>
            <li data-i18n-html="aviso.v38Vida"><b>A posição decide:</b> no tabuleiro, o HP de todo pokemon vale <b>×1,5</b>, então a luta dura mais. O treinador fica parado na entrada.</li>
            <li data-i18n-html="aviso.v38Segredo"><b>Casas secretas:</b> ninguém vê onde você pôs cada um, nem na ficha, nem no Tracker; o adversário só descobre na luta. As formações salvas guardam as casas.</li>
          </ul>
        </section>

        <section class="aviso-bloco">
          <h3 data-i18n="aviso.v38AlcTitulo">O alcance de cada pokemon</h3>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v38Alc"><b>🗡️ Corpo a corpo</b> ataca a casa vizinha. <b>N🏹</b> ataca de longe, até N casas (<b>2🏹</b>, <b>3🏹</b> ou <b>4🏹</b>), em qualquer direção, diagonal inclusive.</li>
            <li data-i18n-html="aviso.v38Conta"><b>É da espécie:</b> sai dos stats base, pela conta <b>SP.ATK − o maior entre ATK e HP</b>. ATK ou HP alto luta encostado; SP.ATK alto com pouco HP ataca de longe, e quanto maior a diferença, mais longe.</li>
            <li data-i18n-html="aviso.v38Fixo"><b>Igual para toda a espécie:</b> IV, qualidade, potência, refino, nível, shiny e lendário não mexem no alcance. O selo aparece na ficha do pokemon e em todas as telas do PvP.</li>
          </ul>
        </section>

        <section class="aviso-bloco">
          <h3 data-i18n="aviso.v38RankTitulo">Ranks e o prêmio do mês</h3>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v38GM"><b>Grão Mestre:</b> um rank novo entre o Mestre e o Challenger. Do 1º ao 100º, Challenger; do 101º ao 250º, Grão Mestre; do 251º ao 500º, Mestre.</li>
            <li data-i18n-html="aviso.v38Tabela"><b>Tabela top 1.000:</b> a Tabela do Ranqueado mostra os 1.000 primeiros, em páginas de 100, com o botão <b>Minha posição</b>.</li>
            <li data-i18n-html="aviso.v38Mensal"><b>Top PvP Mensal:</b> o seu <b>PR mensal</b> é a soma do PR que você faz na escada semanal durante o mês, e metade da comissão em Gemas que o Mercado cobra no mês vira prêmio em <b>Gemas</b> para os <b>2.000 primeiros</b>. O topo do mês também aparece em <b>Ranks › PvP Mensal</b>, ao lado do PvP Ranqueado.</li>
            <li data-i18n-html="aviso.v38Relogios"><b>Dois relógios no Ranqueado:</b> no alto da aba, <b>Semanal zera em</b> e <b>Mensal fecha em</b>. Toque no da semana para ver as recompensas semanais e no do mês para ver o Top PvP Mensal.</li>
            <li data-i18n-html="aviso.v38Seeds"><b>Seeds dos campeonatos:</b> no <b>Mundial</b> e no <b>Amador</b>, a sua seed agora é o seu <b>PR mensal</b> entre os inscritos. No Showdown, continua a Tabela do Ranqueado.</li>
          </ul>
        </section>

        <section class="aviso-bloco">
          <h3 data-i18n="aviso.v38DexTitulo">Pokedex: arte e formas novas</h3>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v38Arte"><b>Arte nova em 140 pokemon</b>, cada um com o shiny repintado — e as que estavam trocadas foram consertadas: Popplio e Brionne, Pyukumuku, Palossand, Fomantis, Type: Null, Alolan Marowak, a Giratina e os shiny do Krabby e do Wormadam.</li>
            <li data-i18n-html="aviso.v38Novos"><b>Chegam ao jogo</b> o Stonjourner (hunt em Galar, no nível 42.800) e o Ceruledge (hunt em Paldea, no nível 120.550): o Charcadet agora escolhe entre Armarouge e Ceruledge com a Fire Stone. O Enamorus entra no Mystic Ticket, e Lugia e Poochyena ganham arte nova e shiny.</li>
            <li data-i18n-html="aviso.v38Formas"><b>Formas novas</b>, da base com a pedra do tipo no <b>Nv 100</b>: Giratina Origin (Darkness Stone), Meloetta Pirouette (Sun Stone), Calyrex Ice Rider ou Shadow Rider (Enigma Stone) e as três máscaras do Ogerpon (Leaf Stone). E a <b>Bloodmoon Ursaluna</b> (Earth Stone, Nv 100) — com ela, o Ursaring passa a evoluir no Nv 70.</li>
            <li data-i18n-html="aviso.v38Megas"><b>Mega Glimmora:</b> a Glimmoranite se fabrica no Professor Carvalho, com fragmentos, como as outras. A <b>Mega Zygarde</b> agora sai do Zygarde Complete (o 50% não megaevolui mais), e a <b>Mega Sceptile</b> e a <b>Mega Ampharos</b> foram centralizadas e aumentadas.</li>
          </ul>
        </section>

        <section class="aviso-bloco">
          <h3 data-i18n="aviso.v38TambemTitulo">Também</h3>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v38Zmove"><b>Z-Move Físico ou Especial</b> também no Comparar Pokemon e no Treinamento.</li>
            <li data-i18n-html="aviso.v38Ginasio"><b>Ginásios:</b> um pokemon defende um ginásio só. O que já está em outro aparece bloqueado, com <b>Trazer para este ginásio</b>.</li>
            <li data-i18n-html="aviso.v38Replay"><b>Replay novo:</b> os treinadores arremessam as Poke Balls na entrada, cada lado com a sua cor, e o feed mostra quem derrubou quem.</li>
            <li data-i18n-html="aviso.v38Lendario"><b>Lendário da Arena Mística:</b> o capturado agora nasce com <b>qualidade 1,00</b> ou mais e <b>IV 111</b> ou mais (o mesmo piso do shiny), e a <b>potência</b> é sorteada como em toda captura, de P1 a P5. Quem já tem lendário fica como está.</li>
            <li data-i18n-html="aviso.v38Anterior"><b>Perdeu a novidade anterior?</b> O <b>Pódio dos Ginásios</b> está na seta <b>‹</b>, aqui embaixo.</li>
          </ul>
        </section>
      </section>
      <!-- A NOVIDADE 37: o PÓDIO DOS GINÁSIOS e as HUNTS EM BANDOS (v1.377.0). A festa de sempre (raios, confete, a
           moldura dourada) com o pódio da novidade 7 (`.avc-podio`: prata, ouro e bronze, o 1º no meio e mais alto) — as
           medalhas são as MESMAS do selo do pokemon (👑 do líder, 🥈 e 🥉), e cada degrau diz o bônus. A faixa dourada é a
           outra metade da leva: toda hunt no padrão de Unova (bandos, mesmo ritmo, a bike rendendo igual). Os dois blocos
           explicam um e outro, e o último item aponta a 36 (a seta ‹). -->
      <section class="novidade" data-aviso="37" hidden="">
        <section class="aviso-bikes aviso-podio">
          <div class="ab-raios" aria-hidden="true"></div>
          <div class="ab-confete" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
          <span class="ab-fita" data-i18n="aviso.v37Fita">Ginásios e Hunts</span>
          <h3 class="ab-titulo" data-i18n="aviso.v37Titulo">PÓDIO PREMIADO</h3>
          <div class="avc-topo">
            <div class="avc-podio">
              <div class="avc-lugar prata"><span aria-hidden="true">🥈</span><b data-i18n="aviso.v37P2">+10%</b><small data-i18n="aviso.v37L2">2º lugar</small></div>
              <div class="avc-lugar ouro"><span aria-hidden="true">👑</span><b data-i18n="aviso.v37P1">+25%</b><small data-i18n="aviso.v37L1">o líder</small></div>
              <div class="avc-lugar bronze"><span aria-hidden="true">🥉</span><b data-i18n="aviso.v37P3">+5%</b><small data-i18n="aviso.v37L3">3º lugar</small></div>
            </div>
          </div>
          <p class="ab-sub" data-i18n-html="aviso.v37Sub">Nos <b>Ginásios</b>, o pódio inteiro agora bate mais forte: o <b>líder</b> segue com <b>+25%</b> de dano com os pokemon do tipo do ginásio, e o <b>2º</b> e o <b>3º</b> lugares passam a levar <b>+10%</b> e <b>+5%</b> — na hunt e no boss.</p>
        </section>

        <p class="aviso-lendaria" data-i18n-html="aviso.v37Lendaria"><b>Todas as hunts no padrão de Unova:</b> em Kanto, na Outland, em Johto, em Hoenn e em Sinnoh, os selvagens agora nascem em <b>bandos</b> espalhados pelo mapa, como de Unova em diante — o <b>mesmo ritmo</b> em toda hunt, e a <b>bicicleta</b> rendendo o mesmo em todas.</p>

        <section class="aviso-bloco">
          <h3 data-i18n="aviso.v37GinTitulo">O pódio dos ginásios</h3>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v37Quem"><b>Quem leva:</b> o 1º é o líder, o título que só muda de mão no <b>desafio</b>. O 2º e o 3º são os dois times mais <b>fortes</b> depois dele, sem desafio: o pódio é refeito a cada minuto, e quem passar você em força leva o lugar.</li>
            <li data-i18n-html="aviso.v37Onde"><b>Onde vale:</b> na <b>hunt</b> e no <b>boss</b>, com todo pokemon do tipo do ginásio — o pokemon inteiro, e não só os golpes daquele tipo. Não vale no duelo do ginásio, no PvP nem na Guerra de Guilds.</li>
            <li data-i18n-html="aviso.v37Empilha"><b>Não acumula:</b> pokemon de dois tipos leva o melhor lugar. O Charizard de quem é 2º em FIRE e 3º em FLYING bate +10%.</li>
            <li data-i18n-html="aviso.v37Selo"><b>À vista:</b> o pokemon que está levando o bônus ganha o selo <b>👑</b>, <b>🥈</b> ou <b>🥉</b> no card, e a grade dos Ginásios mostra o seu lugar em cada ginásio.</li>
          </ul>
        </section>

        <section class="aviso-bloco">
          <h3 data-i18n="aviso.v37HuntTitulo">Hunts em bandos</h3>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v37Bandos"><b>O que mudou:</b> só <b>onde</b> os selvagens nascem. Cada hunt segue com os mesmos pokemon, o mesmo nível e os mesmos drops.</li>
            <li data-i18n-html="aviso.v37Ritmo"><b>Mesmo ritmo em todo mapa:</b> antes o ritmo variava muito de um mapa para outro; agora todos foram calibrados para o mesmo time limpar a onda no mesmo tempo. Algumas hunts ficaram mais rápidas, outras mais lentas.</li>
            <li data-i18n-html="aviso.v37Bike"><b>A bicicleta vale em todo lugar:</b> com os bandos espalhados, o golpe em área limpa um bando e o resto da onda é caminhada até o próximo — é isso que a bike encurta. Em alguns mapas ela quase não rendia; agora rende o mesmo em toda hunt.</li>
            <li data-i18n-html="aviso.v37Ovo"><b>Ovo Shiny:</b> o Fragmento de Ovo Shiny continua caindo só de Unova em diante — as hunts de antes ganharam o layout, não o drop.</li>
            <li data-i18n-html="aviso.v37Anterior"><b>Perdeu a novidade anterior?</b> O <b>Sacrifício</b> está na seta <b>‹</b>, aqui embaixo.</li>
          </ul>
        </section>
      </section>
      <!-- A NOVIDADE 36: o SACRIFÍCIO (v1.364.0). O herói é o ALTAR do próprio bolso da Mochila, com as MESMAS peças da
           tela (`.sac-palco`, `.sac-brilho`, `.sac-pedestal`, `.sac-osso` e as `.sac-fagulha`), na luz do Nível 5 (o ouro) e
           com o Rare Bone em 120 px (6× o desenho de 20 px, sem serrilhar) — é a peça que a pessoa reconhece quando abre a
           Mochila —, e as faíscas da 26 em volta. A festa é a noite do altar (`--sac-noite`), com a moldura roxa do selo
           "Boost do Sacrifício" e BRASAS subindo no lugar do confete (na tela, o pokemon que vai ao altar vira cinza e
           sobe). A fileira é a escada de raridade: três pokemon "medianos" (Pidgey, Zubat e Oddish, o trio da 27 — a nota
           3,5+ que entope a vitrine do Mercado), a trilha dos cinco marcos nas cores dos níveis da barra e o raio do boost
           no degrau dourado. A faixa dourada diz o que o boost faz (+20%, multiplica, soma até 30 dias); o bloco diz os
           números (shared/sacrificio.mjs), o resgate que zera, quem vai ao altar, quem fica de fora e onde o boost aparece;
           o "Também" traz o resto da leva v1.361.2–v1.367.0 (menos o Tracker e a trava do saque: ver o aviso-jogo.mjs), e o
           último item aponta a 35 (a seta ‹). -->
      <section class="novidade" data-aviso="36" hidden="">
        <section class="aviso-bikes aviso-sacrificio">
          <div class="ab-raios" aria-hidden="true"></div>
          <div class="ab-confete" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
          <div class="sac-palco avsc-palco" aria-hidden="true">
            <span class="sac-brilho"></span>
            <i class="sac-pedestal"></i>
            <span class="sac-osso"><img src="/img/itens/rare-bone.png" alt="" width="20" height="20" draggable="false"></span>
            <i class="sac-fagulha"></i><i class="sac-fagulha"></i><i class="sac-fagulha"></i>
            <i class="avd-faisca f1"></i><i class="avd-faisca f2"></i><i class="avd-faisca f3"></i><i class="avd-faisca f4"></i>
          </div>
          <span class="ab-fita" data-i18n="aviso.v36Fita">Novo na Mochila</span>
          <h3 class="ab-titulo" data-i18n="aviso.v36Titulo">SACRIFÍCIO</h3>
          <div class="ab-bikes ab-tres">
            <div class="ab-bike rar-rara">
              <span class="avs-trio" aria-hidden="true"><span class="ab-mega" data-look="60016" data-tam="34"></span><span class="ab-mega" data-look="60041" data-tam="34"></span><span class="ab-mega" data-look="60043" data-tam="34"></span></span>
              <b data-i18n="aviso.v36N1">Nota 3,5+</b><span data-i18n="aviso.v36N1S">viram pontos</span>
            </div>
            <div class="ab-bike rar-mitica">
              <span class="avd-ico avsc-trilha" aria-hidden="true"><svg viewBox="0 0 66 26" width="82" height="32"><rect x="6" y="10" width="54" height="6" rx="3" fill="#1e1219" stroke="#14040a" stroke-width="1.5"></rect><circle cx="7.5" cy="13" r="5" style="fill: var(--rar-comum)" stroke="#14040a" stroke-width="1.6"></circle><circle cx="20.5" cy="13" r="5" style="fill: var(--rar-incomum)" stroke="#14040a" stroke-width="1.6"></circle><circle cx="33.5" cy="13" r="5.3" style="fill: var(--rar-rara)" stroke="#14040a" stroke-width="1.6"></circle><circle cx="46.5" cy="13" r="5.7" style="fill: var(--rar-mitica)" stroke="#14040a" stroke-width="1.6"></circle><circle cx="59" cy="13" r="6.3" style="fill: var(--rar-lendaria)" stroke="#14040a" stroke-width="1.6"></circle></svg></span>
              <b data-i18n="aviso.v36N2">5 níveis</b><span data-i18n="aviso.v36N2S">até 14 dias</span>
            </div>
            <div class="ab-bike rar-lendaria">
              <span class="avd-ico avsc-raio" aria-hidden="true"><svg viewBox="0 0 24 24" width="44" height="44"><circle cx="12" cy="12" r="10.4" fill="#3a1d0c" stroke="currentColor" stroke-width="2"></circle><path d="M13.4 3.9 6.7 13.3h4.5l-1.3 6.8 7.2-9.7h-4.6z" fill="currentColor" stroke="#14040a" stroke-width="1" stroke-linejoin="round"></path></svg></span>
              <b data-i18n="aviso.v36N3">+20% de XP</b><span data-i18n="aviso.v36N3S">treinador e pokemon</span>
            </div>
          </div>
          <p class="ab-sub" data-i18n-html="aviso.v36Sub">Na <b>Mochila</b>, ao lado da <b>Coleção</b>, o bolso novo <b>Sacrifício</b> dá um destino ao pokemon de <b>nota 3,5+</b> que fica parado: no altar, ele vira <b>pontos</b> numa barra de 5 níveis — e a barra vira um <b>boost de XP</b> novo.</p>
        </section>

        <p class="aviso-lendaria" data-i18n-html="aviso.v36Lendaria">O <b>Boost do Sacrifício</b> dá <b>+20% de XP</b> no treinador e no pokemon e <b>multiplica</b> com todos os outros bônus (VIP, Loja, guild, lives). Resgatou com um boost valendo? O prazo <b>soma</b>, até <b>30 dias</b> guardados!</p>

        <section class="aviso-bloco">
          <h3 data-i18n="aviso.v36ComoTitulo">Como funciona</h3>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v36Pontos"><b>A nota vira pontos:</b> 3,5 vale <b>10</b>, 4,0 vale <b>25</b>, 5,0 vale <b>110</b> e 6,0 vale <b>320</b> — e um pokemon de nota <b>7,0+</b> enche a barra inteira sozinho. No <b>?</b> do altar, arraste a nota e veja quanto cada uma vale.</li>
            <li data-i18n-html="aviso.v36Niveis"><b>Cinco níveis na barra:</b> 50 · 125 · 250 · 500 · 1.000 pontos, que pagam <b>8h · 1d · 2d&nbsp;12h · 6d · 14d</b> de boost. A partir do Nível 1, o <b>Resgatar</b> fica liberado.</li>
            <li data-i18n-html="aviso.v36Resgate"><b>Resgatar paga o MAIOR nível alcançado e zera a barra</b> — os pontos acima dele se perdem. Esperar compensa: cada nível rende mais horas por ponto que o anterior.</li>
            <li data-i18n-html="aviso.v36Escolha"><b>Quem vai ao altar:</b> escolha um a um (a <b>Coleção ★</b> também pode ir) ou use o <b>Selecionar do Depot</b>, que pega os de menor nota e nunca a Coleção, a Vitrine Pokemon da ficha, shiny, P5, quem tem TM, refino ou item, nem o inicial. Até <b>50 por vez</b>, sempre com confirmação.</li>
            <li data-i18n-html="aviso.v36Fora"><b>Ficam de fora:</b> os lendários, a equipe, quem está lutando, o posto de Casa, quem segura Exp. Share e as equipes do PvP, do campeonato e do Showdown. E atenção: o pokemon sacrificado <b>some para sempre</b> — o suporte não devolve.</li>
            <li data-i18n-html="aviso.v36Onde"><b>O boost à vista:</b> ele aparece na faixa do <b>Bônus de XP</b> e na <b>Ficha do Treinador</b>, com o prazo. Na <b>Wiki</b>, o capítulo <b>Sacrifício</b> tem a tabela inteira.</li>
          </ul>
        </section>

        <section class="aviso-bloco">
          <h3 data-i18n="aviso.tambemTitulo">Também nesta atualização</h3>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v36Golpes"><b>Golpes novos:</b> a <b>Mega Dragonite</b> (que copiava os da Dragonite) e a <b>Mega Raichu X</b> ganharam golpes próprios, e o <b>Milotic</b> foi refeito: os dois golpes de 600 continuam de Água, e o <b>Mystic Maelstrom</b> entra no lugar do Cyclonic Tide.</li>
            <li data-i18n-html="aviso.v36Chat"><b>Chat:</b> quem manda mensagem antes da hora agora vê quanto tempo <b>falta</b> de verdade para a próxima (antes aparecia sempre o tempo inteiro), no Mundo e na guild.</li>
            <li data-i18n-html="aviso.v36Sobre"><b>Sobre mim:</b> a <b>Ficha do Treinador</b> ganhou um texto seu, de até <b>200 caracteres</b> — você escolhe se <b>Todos veem</b> ou <b>Só amigos</b>. Valem as regras do chat (link não passa), e quem lê pode <b>Denunciar</b>.</li>
            <li data-i18n-html="aviso.v36Refresh"><b>Refresh no Mercado da Comunidade:</b> o botão novo no fim da barra da vitrine (no celular, entre o funil e o <b>+</b>) relê a tela com os mesmos filtros e a mesma página — sem precisar ligar e desligar filtro. Depois de usado, ele conta <b>5 s</b>.</li>
            <li data-i18n-html="aviso.v36LootBoss"><b>Loot Boost e Bosses:</b> a Loja agora avisa que o Loot Boost não vale para o loot do boss (<b>Exceto Boss Loots</b>), e a vitória contra o boss mostra <b>Loot Boost não aplicado</b> — antes parecia que ele tinha valido.</li>
            <li data-i18n-html="aviso.v36Historicos"><b>Históricos do Mercado:</b> no computador, o <b>Histórico de vendas</b> e o <b>Histórico de compras</b> abrem na folha grande da <b>Tabela de preços</b>, com as letras maiores.</li>
            <li data-i18n-html="aviso.v36Ultra"><b>Modo ULTRA Economia</b> (Configurações → Desempenho), feito para PC fraco: o jogo inteiro sai da tela e fica só uma caixa com o XP, o Gold, os drops raros e os shinies da sessão, atualizada a cada 10 s. A caça segue normal, e o <b>Voltar ao jogo</b> traz tudo de volta.</li>
            <li data-i18n-html="aviso.v36OvoShiny"><b>Fragmento de Ovo Shiny:</b> a chance por abate agora começa em <b>1 em 80.000</b> na 1ª hunt de Unova (nível de hunt 5.000) e sobe a cada nível de hunt acima — cada um dos <b>32 níveis de hunt</b> de Unova em diante é um degrau —, até <b>0,0028%</b> (1 em 35.714) no nível 160.300. O Loot Boost continua valendo.</li>
            <li data-i18n-html="aviso.v36Inicial"><b>Inicial igual para todos:</b> todo inicial que nasce agora vem com qualidade <b>1,6</b> e <b>IV 27</b> nos seis atributos, sem sorteio — não adianta mais recriar a conta atrás de um inicial melhor. O de quem já escolheu fica como está.</li>
            <li data-i18n-html="aviso.v36Anterior"><b>Perdeu a novidade anterior?</b> Os <b>Mini Games</b> estão na seta <b>‹</b>, aqui embaixo.</li>
          </ul>
        </section>
      </section>
      <!-- A NOVIDADE 35: os MINI GAMES (v1.350.0). O palco é a arena do tipo Psíquico (`.dia-palco PSYCHIC`, a mesma da
           janela do Dia Sazonal), com o Lucky Punch do botão do menu no alto e três pokemon: o Eevee, uma SOMBRA (o
           `.avz-sombra` pinta o sprite do Pikachu de preto, como a Sombra Misteriosa) e o Psyduck. A fileira são as três
           coisas que mais pesam — uma rodada a cada 2 min, descobrir o Pokemon e o prêmio do dia —; a faixa dourada diz a
           escada do prêmio; o bloco explica os três jogos, os estágios (um palpite por estágio), a sala, o placar e o
           nível; o "Também" traz o resto da leva (as telas de carga e login desenhadas, as megas refeitas, o Z-Move Físico ou
           Especial da v1.357.0, o Z-Move do pokemon teste do Treinamento da v1.354.0, os 10 pokemon no Mercado (com o Limpar
           filtros que apaga a busca, da v1.357.1), o aviso de preço dos Favoritos da v1.355.0, o
           aviso da mediana dos Atrasados, o Remover amigos da v1.351.0 e a Coleção ★ no XP Share da Casa da v1.352.0 — a
           Novidade é a MESMA, a pedido do dono), e o último item aponta a 34 (a seta ‹). -->
      <section class="novidade" data-aviso="35" hidden="">
        <section class="aviso-bikes aviso-minigames">
          <div class="ab-raios" aria-hidden="true"></div>
          <div class="gin-arena dia-palco PSYCHIC avz-palco" aria-hidden="true">
            <span class="gin-arena-luz"></span>
            <span class="gin-fx"><i style="--x:8.0%;--a:0.130"></i><i style="--x:59.9%;--a:0.512"></i><i style="--x:27.8%;--a:0.894"></i><i style="--x:79.7%;--a:0.276"></i><i style="--x:47.7%;--a:0.658"></i><i style="--x:15.6%;--a:0.040"></i><i style="--x:67.5%;--a:0.422"></i><i style="--x:35.4%;--a:0.804"></i><i style="--x:87.3%;--a:0.186"></i><i style="--x:55.2%;--a:0.568"></i><i style="--x:23.1%;--a:0.950"></i><i style="--x:75.1%;--a:0.332"></i><i style="--x:43.0%;--a:0.714"></i><i style="--x:10.9%;--a:0.096"></i><i style="--x:62.8%;--a:0.478"></i><i style="--x:30.7%;--a:0.859"></i></span>
            <img class="dia-palco-marca" src="/img/menu-minigames.png" alt="">
            <div class="dia-turma">
              <span class="dia-pk" style="--i:0"><span class="dia-pk-pulo"><i class="dia-emote">!</i><span class="ab-mega" data-look="60133" data-tam="52"></span></span></span>
              <span class="dia-pk" style="--i:1"><span class="dia-pk-pulo"><i class="dia-emote">?</i><span class="ab-mega avz-sombra" data-look="60025" data-tam="52"></span></span></span>
              <span class="dia-pk" style="--i:2"><span class="dia-pk-pulo"><i class="dia-emote">♪</i><span class="ab-mega" data-look="60054" data-tam="52"></span></span></span>
            </div>
          </div>
          <span class="ab-fita" data-i18n="aviso.v35Fita">Novo no menu</span>
          <h3 class="ab-titulo" data-i18n="aviso.v35Titulo">MINI GAMES</h3>
          <div class="ab-bikes ab-tres">
            <div class="ab-bike rar-rara">
              <img src="/img/menu-minigames.png" alt="" width="18" height="18">
              <b data-i18n="aviso.v35N1">A cada 2 minutos</b><span data-i18n="aviso.v35N1S">uma rodada nova</span>
            </div>
            <div class="ab-bike rar-mitica">
              <img class="liso" src="/img/tipos/psychic.svg" alt="" width="18" height="18">
              <b data-i18n="aviso.v35N2">Descubra o Pokemon</b><span data-i18n="aviso.v35N2S">em 3 jogos</span>
            </div>
            <div class="ab-bike rar-lendaria">
              <img src="/img/menu-ranks.png" alt="" width="18" height="18">
              <b data-i18n="aviso.v35N3">Prêmio todo dia</b><span data-i18n="aviso.v35N3S">até 10&nbsp;💎</span>
            </div>
          </div>
          <p class="ab-sub" data-i18n-html="aviso.v35Sub">O botão <b>Mini Games</b>, ao lado do <b>PvP</b>, abre uma rodada nova a cada <b>2 minutos</b>, para o servidor inteiro: descubra o Pokemon e escreva o nome no chat da sala. E ele <b>não atrapalha a hunt</b>: a sua caçada segue enquanto você joga.</p>
        </section>
        <p class="aviso-lendaria" data-i18n-html="aviso.v35Lendaria">Todo dia, quem mais pontua ganha <b>diamantes</b>: o <b>1º leva 10&nbsp;💎</b>, o <b>2º 5&nbsp;💎</b> e do <b>3º ao 50º, 1&nbsp;💎</b> cada — e o campeão do dia ainda ganha um selo ao lado do nome no chat!</p>

        <section class="aviso-bloco">
          <h3 data-i18n="aviso.v35ComoTitulo">Como funciona</h3>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v35Jogos"><b>Três jogos, sorteados a cada rodada:</b> o <b>Zoom Misterioso</b> (um pedaço do sprite, que cresce a cada estágio), a <b>Sombra Misteriosa</b> (a silhueta, com uma pista a mais a cada estágio) e a <b>Pokedex Detetive</b> (só pistas: tipos, região, atributos, evolução e as letras do nome).</li>
            <li data-i18n-html="aviso.v35Estagios"><b>Quatro estágios de 20 segundos:</b> acertar no 1º vale <b>10 pontos</b>, no 2º <b>8</b>, no 3º <b>6</b> e no 4º <b>4</b>. É <b>um palpite por estágio</b> — pense bem antes de mandar!</li>
            <li data-i18n-html="aviso.v35Sala"><b>A sala:</b> você joga com uma turma do seu idioma, com uma mensagem a cada <b>5 segundos</b>. O palpite errado aparece para a sala; quem acerta fica <b>quieto até a revelação</b> — nada de spoiler para quem ainda está tentando — e aí a sala inteira conversa.</li>
            <li data-i18n-html="aviso.v35Placar"><b>O placar do dia</b> fica em <b>Ranks → Mini Games</b>, e o prêmio sai às <b>00:05</b> (horário de Brasília). Para receber, faça pelo menos <b>50 pontos</b> no dia, com a conta criada há <b>7 dias</b> ou mais. Os diamantes chegam na hora — ou no seu próximo login.</li>
            <li data-i18n-html="aviso.v35Nivel">Palpitar pede <b>nível 10</b> de treinador; abaixo disso, dá para assistir e torcer.</li>
          </ul>
        </section>

        <section class="aviso-bloco">
          <h3 data-i18n="aviso.tambemTitulo">Também nesta atualização</h3>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v35Portal"><b>Telas de carga e de login novas:</b> a Beast Ball da logo carrega o jogo (e captura no fim), e no login sete shinys olham o cursor, dançam enquanto você digita e viram de costas quando você digita a senha 🙈. O convite do Discord também ganhou cara nova.</li>
            <li data-i18n-html="aviso.v35Megas"><b>Megas refeitas:</b> a <b>Mega Lucario Z</b>, a <b>Mega Charizard X</b> e a <b>Mega Aggron</b> ganharam golpes novos, e a Mega Aggron voltou a ser só <b>Aço</b> (o TM de Pedra que ela já tinha continua, sem o bônus do tipo).</li>
            <li data-i18n-html="aviso.v35Zmove"><b>Z-Move Físico ou Especial:</b> na ficha de um pokemon seu, toque no selo do Z-Move (<b>E: ROCK</b>) para escolher se ele bate com o <b>ATK</b> (Físico) ou com o <b>SP.ATK</b> (Especial). Todo Z-Move começa Especial, e a escolha vale em toda luta; depois de trocar, aquele pokemon espera <b>5 minutos</b> para trocar de novo.</li>
            <li data-i18n-html="aviso.v35Treino"><b>PvP → Treinamento:</b> o <b>Pokemon teste</b> agora também escolhe um <b>Z-Move</b> — só os dos tipos da espécie, como num pokemon de verdade. É só treino: o pokemon de teste não vai para a sua conta.</li>
            <li data-i18n-html="aviso.v35Mercado"><b>Mercado da Comunidade:</b> agora dá para anunciar até <b>10 pokemon</b> ao mesmo tempo (eram 2), e o <b>Limpar filtros</b> também apaga o nome digitado na busca.</li>
            <li data-i18n-html="aviso.v35FavPreco"><b>Aviso de preço nos Favoritos:</b> quando o vendedor muda o preço de um pokemon da sua <b>★</b>, uma notificação desce no alto da tela — <b>▼ verde</b> se caiu, <b>▲ vermelho</b> se subiu — com o preço de antes e o de agora. Se você estava fora, ela chega quando você voltar.</li>
            <li data-i18n-html="aviso.v35Atrasados"><b>Boost dos Atrasados:</b> a confirmação da compra agora diz até que nível o XP ×10 vale (a mediana de hoje) e o que acontece se a mediana subir depois.</li>
            <li data-i18n-html="aviso.v35Amigos"><b>Remover amigos:</b> o botão novo embaixo de <b>Amigos | Pendentes</b> marca vários amigos de uma vez — com busca, <b>Marcar todos</b> e <b>Sumidos há 7+ dias</b> (quem não entra há uma semana ou mais) — e tira todos da lista num toque só. Quem sai não recebe aviso, e as conversas ficam guardadas por 7 dias.</li>
            <li data-i18n-html="aviso.v35XpShare"><b>Casa:</b> o pokemon da sua <b>Coleção ★</b> agora também ocupa um <b>posto de XP Share</b>, como o da equipe (o do Depot, não), e a folha de escolher ganhou as seções Equipe e Coleção e uma busca.</li>
            <li data-i18n-html="aviso.v35Anterior"><b>Perdeu a novidade anterior?</b> As <b>Skins Sazonais</b> estão na seta <b>‹</b>, aqui embaixo.</li>
          </ul>
        </section>
      </section>
      <!-- A NOVIDADE 34: as SKINS SAZONAIS (v1.345.0). O palco é a arena do tipo Fantasma (`.dia-palco GHOST`, a mesma da
           janela do Dia Sazonal), com três skins de Halloween comemorando — os sprites saem do `pintarMegasDaNovidade` pelo
           looktype da skin (95001 Venusaur Halloween, 95008 Gengar Drácula, 95014 Tyranitar Jason). A faixa dourada diz a
           promessa do dono (a coleção de Halloween volta em 2027, e as outras todo ano); o bloco diz o que muda na Loja e no
           Mercado e o que fica com quem já tem skin; o "Também" traz o resto da leva v1.343.2–v1.345.1 (as páginas do Depot
           e do Market → Vender, o ⋮ da ficha, a tag [STREAMER], a venda do Weavile e do Togekiss) — MENOS o teto do preço
           do NPC, que o dono não quis anunciar —, e o último item aponta a 33 (a seta ‹). -->
      <section class="novidade" data-aviso="34" hidden="">
        <section class="aviso-bikes aviso-skins">
          <div class="ab-raios" aria-hidden="true"></div>
          <div class="gin-arena dia-palco GHOST avz-palco" aria-hidden="true">
            <span class="gin-arena-luz"></span>
            <span class="gin-fx"><i style="--x:8.0%;--a:0.130"></i><i style="--x:59.9%;--a:0.512"></i><i style="--x:27.8%;--a:0.894"></i><i style="--x:79.7%;--a:0.276"></i><i style="--x:47.7%;--a:0.658"></i><i style="--x:15.6%;--a:0.040"></i><i style="--x:67.5%;--a:0.422"></i><i style="--x:35.4%;--a:0.804"></i><i style="--x:87.3%;--a:0.186"></i><i style="--x:55.2%;--a:0.568"></i><i style="--x:23.1%;--a:0.950"></i><i style="--x:75.1%;--a:0.332"></i><i style="--x:43.0%;--a:0.714"></i><i style="--x:10.9%;--a:0.096"></i><i style="--x:62.8%;--a:0.478"></i><i style="--x:30.7%;--a:0.859"></i></span>
            <img class="dia-palco-marca" src="/img/tipos/ghost.svg" alt="">
            <div class="dia-turma">
              <span class="dia-pk" style="--i:0"><span class="dia-pk-pulo"><i class="dia-emote">♪</i><span class="ab-mega" data-look="95001" data-tam="52"></span></span></span>
              <span class="dia-pk" style="--i:1"><span class="dia-pk-pulo"><i class="dia-emote">!</i><span class="ab-mega" data-look="95008" data-tam="52"></span></span></span>
              <span class="dia-pk" style="--i:2"><span class="dia-pk-pulo"><i class="dia-emote">♫</i><span class="ab-mega" data-look="95014" data-tam="52"></span></span></span>
            </div>
          </div>
          <span class="ab-fita" data-i18n="aviso.v34Fita">Skins de temporada</span>
          <h3 class="ab-titulo" data-i18n="aviso.v34Titulo">SKINS SAZONAIS</h3>
          <div class="ab-bikes ab-tres">
            <div class="ab-bike rar-rara">
              <img src="/img/itens/cosmeticos-vestido.png" alt="" width="18" height="18">
              <b data-i18n="aviso.v34N1">Só na Loja</b><span data-i18n="aviso.v34N1S">em cada temporada</span>
            </div>
            <div class="ab-bike rar-mitica">
              <img class="liso" src="/img/tipos/ghost.svg" alt="" width="18" height="18">
              <b data-i18n="aviso.v34N2">Voltam todo ano</b><span data-i18n="aviso.v34N2S">Halloween, Natal…</span>
            </div>
            <div class="ab-bike rar-lendaria">
              <img class="liso" src="/img/tipos/dark.svg" alt="" width="18" height="18">
              <b data-i18n="aviso.v34N3">Fora do Mercado</b><span data-i18n="aviso.v34N3S">voltaram à mochila</span>
            </div>
          </div>
          <p class="ab-sub" data-i18n-html="aviso.v34Sub">As <b>skins</b> agora são <b>sazonais</b>: cada coleção é vendida só na <b>Loja (Cosméticos)</b>, na época dela — e <b>volta todo ano</b>.</p>
        </section>

        <p class="aviso-lendaria" data-i18n-html="aviso.v34Lendaria">As <b>skins de Halloween</b> voltam no <b>Halloween de 2027</b> — e as de <b>Natal</b>, de <b>Páscoa</b> e as outras também voltam todo ano, na época delas. Então não se preocupem!</p>

        <section class="aviso-bloco">
          <h3 data-i18n="aviso.v34ComoTitulo">O que muda</h3>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v34Loja"><b>Na Loja:</b> as skins de Halloween seguem à venda até <b>31 de outubro</b> (horário de Brasília). Depois saem da Loja e voltam no próximo Halloween.</li>
            <li data-i18n-html="aviso.v34Mercado"><b>Fora do Mercado da Comunidade:</b> skin não se anuncia mais. As que estavam anunciadas voltaram para a <b>mochila</b> de quem anunciou, na atualização.</li>
            <li data-i18n-html="aviso.v34Suas"><b>A sua continua sua:</b> quem já tem skin fica com ela para sempre, na aba <b>Skins</b> da mochila — veste e tira quando quiser.</li>
          </ul>
        </section>

        <section class="aviso-bloco">
          <h3 data-i18n="aviso.tambemTitulo">Também nesta atualização</h3>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v34Paginas"><b>Páginas no Depot e no Market → Vender:</b> 100 pokemon por vez, com « ‹ Página X de Y › » embaixo da lista — quem tem milhares de pokemon não trava mais nessas telas. O "Vender todo o Depot" continua valendo para a lista inteira.</li>
            <li data-i18n-html="aviso.v34Ficha"><b>Ficha de quem está na equipe:</b> o menu de pastas (⋮) agora aparece só para os pokemon do Depot — na equipe ele não movia nada.</li>
            <li data-i18n-html="aviso.v34Streamer"><b>Tag [STREAMER] do chat:</b> agora é só dos streamers cadastrados de Twitch e Kick (a conta que vinculou o canal no jogo). O link de Referral Especial dá o selo ★ Influenciador Oficial do PokeIdle.</li>
            <li data-i18n-html="aviso.v34Venda"><b>Weavile e Togekiss:</b> a venda ao NPC agora paga o mesmo valor que o card do Market → Vender mostra.</li>
            <li data-i18n-html="aviso.v34Anterior"><b>Perdeu a novidade anterior?</b> Os <b>Dias Sazonais</b> (a tipagem do dia, 2× mais forte nas hunts) estão na seta <b>‹</b>, aqui embaixo.</li>
          </ul>
        </section>
      </section>
      <section class="novidade" data-aviso="33" hidden="">
        <section class="aviso-bikes aviso-sazonal">
          <div class="ab-raios" aria-hidden="true"></div>
          <!-- O palco do DIA CHUVOSO, o mesmo da janela do dia (`.dia-palco` no estilo.css): a chuva, a poça e três
               pokemon de Água comemorando. Os sprites saem do `pintarMegasDaNovidade` (`.ab-mega`), como nas outras. -->
          <div class="gin-arena dia-palco WATER avz-palco" aria-hidden="true">
            <span class="gin-arena-luz"></span>
            <span class="gin-fx"><i style="--x:8.0%;--a:0.130"></i><i style="--x:59.9%;--a:0.512"></i><i style="--x:27.8%;--a:0.894"></i><i style="--x:79.7%;--a:0.276"></i><i style="--x:47.7%;--a:0.658"></i><i style="--x:15.6%;--a:0.040"></i><i style="--x:67.5%;--a:0.422"></i><i style="--x:35.4%;--a:0.804"></i><i style="--x:87.3%;--a:0.186"></i><i style="--x:55.2%;--a:0.568"></i><i style="--x:23.1%;--a:0.950"></i><i style="--x:75.1%;--a:0.332"></i><i style="--x:43.0%;--a:0.714"></i><i style="--x:10.9%;--a:0.096"></i><i style="--x:62.8%;--a:0.478"></i><i style="--x:30.7%;--a:0.859"></i></span>
            <img class="dia-palco-marca" src="/img/tipos/water.svg" alt="">
            <div class="dia-turma">
              <span class="dia-pk" style="--i:0"><span class="dia-pk-pulo"><i class="dia-emote">♪</i><span class="ab-mega" data-look="60007" data-tam="52"></span></span></span>
              <span class="dia-pk" style="--i:1"><span class="dia-pk-pulo"><i class="dia-emote">!</i><span class="ab-mega" data-look="60054" data-tam="52"></span></span></span>
              <span class="dia-pk" style="--i:2"><span class="dia-pk-pulo"><i class="dia-emote">♫</i><span class="ab-mega" data-look="60393" data-tam="52"></span></span></span>
            </div>
          </div>
          <span class="ab-fita" data-i18n="aviso.v33Fita">Todo dia uma tipagem</span>
          <h3 class="ab-titulo" data-i18n="aviso.v33Titulo">DIAS SAZONAIS</h3>
          <div class="ab-bikes ab-tres">
            <div class="ab-bike rar-rara">
              <img class="liso" src="/img/tipos/water.svg" alt="" width="18" height="18">
              <b data-i18n="aviso.v33N1">Todo dia</b><span data-i18n="aviso.v33N1S">uma das 18 tipagens</span>
            </div>
            <div class="ab-bike rar-mitica">
              <img class="liso" src="/img/tipos/fire.svg" alt="" width="18" height="18">
              <b data-i18n="aviso.v33N2">2× mais forte</b><span data-i18n="aviso.v33N2S">ataque, defesa e vida</span>
            </div>
            <div class="ab-bike rar-lendaria">
              <img class="liso" src="/img/tipos/electric.svg" alt="" width="18" height="18">
              <b data-i18n="aviso.v33N3">Só nas hunts</b><span data-i18n="aviso.v33N3S">selvagens também</span>
            </div>
          </div>
          <p class="ab-sub" data-i18n-html="aviso.v33Sub">Todo dia, à <b>00:00 de Brasília</b>, uma das <b>18 tipagens</b> vira a do dia — e, nas <b>hunts do Mapa</b>, todo pokemon dela fica <b>2× mais forte</b>.</p>
        </section>

        <p class="aviso-lendaria" data-i18n-html="aviso.v33Lendaria">O <b>ícone do tipo do dia</b> fica no canto de baixo da hunt e do Centro Pokemon, ao lado das lupas (no celular, embaixo do <b>C</b>). Toque nele: chove no Dia Chuvoso, neva no Dia de Nevasca, a terra treme no Dia de Terremoto — e três pokemon da tipagem comemoram.</p>

        <section class="aviso-bloco">
          <h3 data-i18n="aviso.v33ComoTitulo">Como funciona</h3>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v33Sorteio"><b>O sorteio:</b> todo dia, à 00:00 de Brasília, sai uma das 18 tipagens — sorteio livre, pode até repetir no dia seguinte. Cada uma tem o seu dia: Dia Chuvoso (Água), Dia Escaldante (Fogo), Noite Eterna (Sombrio) e mais 15.</li>
            <li data-i18n-html="aviso.v33Forca"><b>2× mais forte:</b> o pokemon da tipagem tem o dobro de ataque, de defesa e de vida — na prática, bate o dobro e recebe só <b>¼ do dano</b>. Pokemon de duas tipagens conta se qualquer uma for a do dia.</li>
            <li data-i18n-html="aviso.v33Selvagens"><b>Os selvagens também:</b> num Dia Chuvoso, o Magikarp da hunt também aguenta mais e bate mais forte. Escolher a hunt e a equipe pelo dia faz diferença.</li>
            <li data-i18n-html="aviso.v33Onde"><b>Só nas hunts do Mapa</b> (a Outland inclusive). Não vale em PvP, Guerra de Guilds, Campeonato, Showdown, Bosses, Raid, Safari, Arena Mística nem Ginásios.</li>
          </ul>
        </section>

        <section class="aviso-bloco">
          <h3 data-i18n="aviso.v33SafariTitulo">Safari e Arena Mística</h3>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v33SafariTickets"><b>Vários Safari Tickets de uma vez:</b> cada ticket vale 1 hora, até 24 numa entrada, e a cada 6 vêm <b>30 minutos de presente</b> (6 tickets = 6 h 30).</li>
            <li data-i18n-html="aviso.v33Atualizacao"><b>A atualização do jogo não encerra mais o Safari nem a Arena Mística:</b> no login você volta para onde estava — o mesmo tempo e as mesmas capturas no Safari, o mesmo lendário na Arena —, sem gastar outro ticket.</li>
          </ul>
        </section>

        <section class="aviso-bloco">
          <h3 data-i18n="aviso.v33OvosTitulo">Mystery Eggs</h3>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v33OvosPreco"><b>Mais baratos e mais rápidos:</b> P2 por 20 milhões e 6 horas, P3 por 120 milhões e 12 horas, P4 por 250 milhões e 24 horas. O ovo que já estava chocando passa a abrir no tempo novo.</li>
            <li data-i18n-html="aviso.v33OvosPvp"><b>Ovos no PvP Ranqueado:</b> na virada da semana (sábado, 23:59), o <b>top 100</b> ganha 2 P4; daí para baixo, pelo tier — Diamante 2 P2 + 1 P3 + 1 P4, Platina 2 P2 + 1 P3, Ouro 2 P2, Prata 1 P2. Vale para quem terminou o posicionamento.</li>
          </ul>
        </section>

        <section class="aviso-bloco">
          <h3 data-i18n="aviso.tambemTitulo">Também nesta atualização</h3>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v33Mercado"><b>Mercado da Comunidade:</b> no máximo <b>10 pokemon</b> anunciados por vez; o pokemon tirado da vitrine espera <b>30 min</b> para voltar; e mudar o preço do pokemon o leva de volta ao <b>topo</b> (com a espera de 30 min do Editar).</li>
            <li data-i18n-html="aviso.v33Raid"><b>Raid Gigantamax:</b> cada boss luta numa arena no tema do tipo dele — lava com chuva de fogo, rocha, areia, céu, flores, trevas, aço e água.</li>
            <li data-i18n-html="aviso.v33Som"><b>Som dos drops raros do boss:</b> além das peças de TM, agora tocam o Fragmento de Mega Stone, o Fragmento de Mega Shiny Stone, o Mystic Ticket e o Safari Ticket (Configurações → Áudio).</li>
            <li data-i18n-html="aviso.v33Anterior"><b>Perdeu a novidade anterior?</b> O Raid Gigantamax, o Top Medalhas e os ícones da Mochila estão na seta <b>‹</b>, aqui embaixo.</li>
          </ul>
        </section>
      </section>
      <section class="novidade" data-aviso="32" hidden="">
        <section class="aviso-bikes aviso-raid">
          <div class="ab-raios" aria-hidden="true"></div>
          <!-- O céu da ficha do Semanal (a chuva de sangue do fogo: as camadas .rgx-p1/p2/p3 do estilo.css). -->
          <div class="rgx-ceu" aria-hidden="true"><i class="rgx-p1"></i><i class="rgx-p2"></i><i class="rgx-p3"></i></div>
          <span class="avg-heroi"><span class="rgx-quadro rgx-anima avg-gigante" style="--gx-img:url('/img/gigantamax/815.png');--gx-px:128px" aria-hidden="true"></span><i class="avd-faisca f1" aria-hidden="true"></i><i class="avd-faisca f2" aria-hidden="true"></i><i class="avd-faisca f3" aria-hidden="true"></i><i class="avd-faisca f4" aria-hidden="true"></i></span>
          <span class="ab-fita" data-i18n="aviso.v32Fita">Boss semanal</span>
          <h3 class="ab-titulo" data-i18n="aviso.v32Titulo">RAID GIGANTAMAX</h3>
          <div class="ab-bikes ab-tres">
            <div class="ab-bike rar-lendaria">
              <img src="/assets/site/assets/items/bronze_boss_token.png" alt="" width="18" height="18">
              <b data-i18n="aviso.v32N1">Toda segunda</b><span data-i18n="aviso.v32N1S">20:00, ao vivo</span>
            </div>
            <div class="ab-bike rar-mitica">
              <span class="rgx-quadro rgx-anima" style="--gx-img:url('/img/gigantamax/879.png');--gx-px:46px" aria-hidden="true"></span>
              <b data-i18n="aviso.v32N2">Todos contra um</b><span data-i18n="aviso.v32N2S">o servidor inteiro</span>
            </div>
            <div class="ab-bike rar-rara">
              <img src="/assets/site/assets/loja/exp.png" alt="" width="18" height="18">
              <b data-i18n="aviso.v32N3">+20% XP</b><span data-i18n="aviso.v32N3S">e +5% de farm, 12 h</span>
            </div>
          </div>
          <p class="ab-sub" data-i18n-html="aviso.v32Sub">Toda segunda às <b>20:00</b> um <b>Gigantamax</b> desperta no meio da arena e o <b>servidor inteiro</b> luta contra ele ao mesmo tempo — ao vivo, em <b>Boss → Semanal</b>.</p>
        </section>

        <p class="aviso-lendaria" data-i18n-html="aviso.v32Lendaria">Quanto mais vida o servidor tirar dele, maior o prêmio de <b>todo inscrito</b>: derrubado, <b>+20% de XP e +5% de farm por 12 horas</b>. A primeira batalha é <b>segunda, 26/10, contra o Cinderace</b> — a inscrição custa <b>1 Bronze Boss Token</b> e fecha às 16:00 do mesmo dia.</p>

        <section class="aviso-bloco">
          <h3 data-i18n="aviso.v32ComoTitulo">Como funciona</h3>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v32Inscricao"><b>Inscrição:</b> 1 Bronze Boss Token, de terça 12:00 até segunda 16:00 (Brasília). Luta a sua <b>Equipe da Raid</b> — até 5 pokemon, na ordem que você escolher — ou a sua equipe de hunt, se você não escolher; dá para trocar até as 20:00. Seus pokemon <b>não perdem nada</b>: nem vida, nem XP, nem item.</li>
            <li data-i18n-html="aviso.v32Batalha"><b>A batalha:</b> às 20:00 todos os inscritos lutam ao mesmo tempo, sem limite de dano e sem poção. A cada 35 segundos a <b>fúria</b> dele dobra o dano; o G-Max acerta em área e o rugido varre a arena inteira. A transmissão começa às 20:01 e todo mundo assiste ao mesmo segundo; depois, o <b>Rever a batalha</b> toca do começo.</li>
            <li data-i18n-html="aviso.v32Premio"><b>O prêmio</b> é pela vida que SOBROU a ele: ileso, nada; com 90% sobrando, +2% de XP e +1% de farm; derrubado, <b>+20% de XP e +5% de farm</b> — por 12 horas a partir do fim da batalha, para todo inscrito. O <b>?</b> da ficha mostra a curva inteira, e o bônus aparece na faixa de XP e numa linha laranja na sua ficha.</li>
            <li data-i18n-html="aviso.v32Rotacao"><b>Um Gigantamax por semana</b>, cada um com o céu do tipo dele (chuva de sangue no fogo, tempestade de areia na terra, brilhos na fada…): Cinderace, depois Coalossal, Corviknight, Grimmsnarl, Sandaconda, Hatterene, Centiskorch e Copperajah.</li>
          </ul>
        </section>

        <section class="aviso-bloco">
          <h3 data-i18n="aviso.v32RanksTitulo">Top Medalhas nos Ranks</h3>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v32TopMedalhas"><b>Top Medalhas</b>, placar novo nos Ranks: os pokemon com mais <b>Medalhas de Guerra</b> (o maior dano de cada Guerra de Guilds), de qualquer treinador. No empate, fica na frente quem chegou primeiro ao número.</li>
            <li data-i18n-html="aviso.v32Medalha">O 1º usa o <b>🎖️</b> antes do nome, como a coroa do Pokemon Forte: na ficha, na Equipe, no Em campo e em cima dele na hunt.</li>
          </ul>
        </section>

        <section class="aviso-bloco">
          <h3 data-i18n="aviso.v32MochilaTitulo">Mochila, Depot e Coleção</h3>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v32Rmt"><b>RMT 7 dias na Mochila:</b> o card de cada item que se vende no Mercado da Comunidade mostra o preço médio de venda dos últimos 7 dias, em moedas e em gemas, e quantas unidades venderam. Tocar no rodapé abre as ofertas do item.</li>
            <li data-i18n-html="aviso.v32Icones"><b>Ícones no lugar das setas:</b> a <b>caixa</b> é o Depot em todo lugar, e o ícone da Coleção leva para a Coleção — no Depot, na Mochila, no Market → Vender e no Modo Economia.</li>
            <li data-i18n-html="aviso.v32Equipe"><b>Tirar da Equipe:</b> dois botões, Depot e Coleção. O pokemon só sai da equipe depois de o servidor confirmar o destino.</li>
            <li data-i18n-html="aviso.v32MochilaFicha"><b>Mochila na ficha:</b> virou um quadrado logo abaixo dos Amigos. No celular ela continua na barra de baixo.</li>
          </ul>
        </section>

        <section class="aviso-bloco">
          <h3 data-i18n="aviso.v32ChatTitulo">Bloqueio de verdade</h3>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v32Bloqueio"><b>Quem você bloqueia ou ignora não te chama mais pelo Comércio</b> (o "Enviar DM" do anúncio) — e você também não escreve para essa pessoa. A lista agora fica na sua <b>conta</b>: vale no celular e em qualquer navegador.</li>
            <li data-i18n-html="aviso.v32LinksEquipe"><b>Links da equipe:</b> admin, moderador e helper podem mandar link no Mundo, no Comércio e em Dúvidas (o Discord, o suporte, um print). Para os jogadores, link continua barrado em todo canal.</li>
          </ul>
        </section>

        <section class="aviso-bloco">
          <h3 data-i18n="aviso.tambemTitulo">Também nesta atualização</h3>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v32PrecoMax"><b>Preço máximo no Mercado da Comunidade:</b> o campo de preço para no teto que o servidor aceita, e uma linha dourada mostra qual é o máximo na moeda escolhida.</li>
            <li data-i18n-html="aviso.v32Casas"><b>Casas em uso:</b> os ícones das casas onde seus pokemon treinam aparecem numa faixa logo abaixo do título <b>Em campo</b>; tocar abre a Casa.</li>
            <li data-i18n-html="aviso.v32Carteira"><b>Carteira do projeto</b> (janelas de Depósito e de Saque): o "Aguardando recolha" deixou de contar o que a tesouraria já trocou por SOL para pagar as taxas da rede, e "Taxas Mercado" mostra quanto delas já foi usado.</li>
            <li data-i18n-html="aviso.v32Anterior"><b>Perdeu a novidade anterior?</b> O Hoopa, as megas e formas novas, o Top Gemas e o chat sem links estão na seta <b>‹</b>, aqui embaixo.</li>
          </ul>
        </section>
      </section>
      <section class="novidade" data-aviso="31" hidden="">
        <section class="aviso-bikes aviso-leva">
          <div class="ab-raios" aria-hidden="true"></div>
          <div class="ab-confete" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
          <span class="avn-heroi"><span class="ab-mega" data-look="60720" data-tam="96"></span><i class="avd-faisca f1" aria-hidden="true"></i><i class="avd-faisca f2" aria-hidden="true"></i><i class="avd-faisca f3" aria-hidden="true"></i><i class="avd-faisca f4" aria-hidden="true"></i></span>
          <span class="ab-fita" data-i18n="aviso.v31Fita">Pokemon novos</span>
          <h3 class="ab-titulo" data-i18n="aviso.v31Titulo">HOOPA, MEGAS E FORMAS NOVAS</h3>
          <div class="ab-bikes ab-tres">
            <div class="ab-bike rar-rara">
              <span class="ab-mega" data-look="60555" data-tam="46"></span>
              <b data-i18n="aviso.v31N1">5 espécies</b><span data-i18n="aviso.v31N1S">ganharam arte</span>
            </div>
            <div class="ab-bike rar-mitica">
              <span class="ab-mega" data-look="68492" data-tam="46"></span>
              <b data-i18n="aviso.v31N2">9 formas</b><span data-i18n="aviso.v31N2S">Zen, Origin, Sky…</span>
            </div>
            <div class="ab-bike rar-lendaria">
              <span class="ab-mega" data-look="80373" data-tam="46"></span>
              <b data-i18n="aviso.v31N3">6 megas</b><span data-i18n="aviso.v31N3S">com as Mega Stones</span>
            </div>
          </div>
          <p class="ab-sub" data-i18n-html="aviso.v31Sub">O <b>Hoopa</b> chegou ao <b>Mystic Ticket</b> e aos bosses de evento, e <b>Darmanitan</b>, <b>Sinistea</b>, <b>Polteageist</b> e <b>Palafin</b> ganharam arte e hunt própria.</p>
        </section>

        <p class="aviso-lendaria" data-i18n-html="aviso.v31Lendaria">E as <b>formas viraram evolução</b>, cada uma com a pedra do tipo dela: Shaymin Sky, Dialga e Palkia Origin, os quatro Therian, White e Black Kyurem, Hoopa Unbound, Zacian e Zamazenta Crowned, Aegislash Blade, Minior Core e Palafin Hero. O lendário do Mystic Ticket já nasce no <b>Nv 100</b>: com a pedra, ele evolui na hora.</p>

        <section class="aviso-bloco">
          <h3 data-i18n="aviso.v31NovosTitulo">Pokemon novos</h3>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v31Especies"><b>Com arte e hunt:</b> Darmanitan (Unova, nível 6.950), Sinistea (Galar, 40.000), Polteageist (Galar, 53.350) e Palafin (Paldea, 120.550). O <b>Hoopa</b> sai do Mystic Ticket e dos bosses de evento, como o Arceus.</li>
            <li data-i18n-html="aviso.v31Formas"><b>9 formas novas:</b> Wormadam Sandy e Trash (Sinnoh, 2.000, ou evoluindo o Burmy), Darmanitan Zen (Unova, 8.600), Darmanitan Zen de Galar (Galar, 35.150), Persian de Alola (Alola, 120.550, ou evoluindo o Meowth de Alola) e, por evolução, Shaymin Sky, Black Kyurem, Dialga Origin e Palkia Origin.</li>
            <li data-i18n-html="aviso.v31Megas"><b>6 megas novas:</b> Mega Salamence, Mega Emboar, Mega Audino e Mega Scovillain, e a 2ª mega do Raichu (Mega Raichu X) e do Garchomp (Mega Garchomp Z) — com as Mega Stones e as versões shiny.</li>
            <li data-i18n-html="aviso.v31Arte"><b>Arte refeita:</b> Alomomola, Beheeyem, Crabrawler, Crabominable, Buzzwole, Kleavor, Darumaka e Darmanitan de Galar, Braviary de Hisui e Mega Delphox.</li>
          </ul>
        </section>

        <section class="aviso-bloco">
          <h3 data-i18n="aviso.v31EvolTitulo">Evoluções</h3>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v31Soltas"><b>As que faltavam:</b> Dunsparce → Dudunsparce, Girafarig → Farigiraf, Stantler → Wyrdeer, Scyther → Scizor ou Kleavor, Applin → Flapple, Appletun ou Dipplin, Cosmoem → Solgaleo ou Lunala, Meltan → Melmetal, Keldeo → Keldeo Resolute, Zygarde 10% → Zygarde → Zygarde Complete e Wishiwashi → Wishiwashi School. E com a arte nova: Darumaka → Darmanitan, Sinistea → Polteageist e Finizen → Palafin.</li>
            <li data-i18n-html="aviso.v31Teto"><b>Nível ao capturar:</b> Dunsparce, Girafarig, Stantler, Wishiwashi, Minior e Palafin agora vêm no <b>Nv 40</b> (eram 100), Applin e Finizen no 20, e a Aegislash no 70 — Honedge → Doublade → Aegislash → Aegislash Blade é a primeira cadeia de quatro. Os que passaram para o Nv 40 também ficaram mais fáceis de capturar: 2,35% na Beast Ball (era 1,88%).</li>
            <li data-i18n-html="aviso.v31Preco"><b>Preço no NPC:</b> a pré-evolução vale menos que a evolução, então três caíram — Minior 277.711 (era 537.159), Palafin 180.796 (era 407.199) e Finizen 83.528 (era 342.580).</li>
          </ul>
        </section>

        <section class="aviso-bloco">
          <h3 data-i18n="aviso.v31RanksTitulo">Top Gemas nos Ranks</h3>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v31TopGemas"><b>Top Gemas</b>, placar novo nos Ranks: quem tem mais Gemas na conta. No fechamento do mês (dia 1º, 00:00 de Brasília), o 1º ganha <b>500 💎</b>, o 2º 250, o 3º 100 e do 4º ao 10º, 50 cada. No empate, fica na frente quem está com aquele saldo há mais tempo.</li>
            <li data-i18n-html="aviso.v31Selos"><b>Selos novos no chat:</b> o 1º do Top Gemas usa a Gema do RMT ao lado do nick, e o 1º do PvP Ranqueado, a espada do PvP — como já acontece no Top Treinadores, no Top Catch, no Top Coins e no Top Bosses.</li>
          </ul>
        </section>

        <section class="aviso-bloco">
          <h3 data-i18n="aviso.v31ChatTitulo">Chat sem links</h3>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v31Links"><b>Link não passa mais</b> em lugar nenhum: Mundo, Dúvidas, Comércio, Guild, mensagem privada, conversa do Comércio, recado do pedido de amizade, cartaz da guild e apelido de pokemon (Name Tag). No chat, o texto fica no campo para você tirar só o endereço. O link que já estava num cartaz de guild foi apagado; o resto do texto ficou.</li>
            <li data-i18n-html="aviso.v31Comandos"><b>Comandos do chat:</b> /hunt, /xp, /pokedex e /guia abrem as seções do site <b>pokeidle-gg.pages.dev</b> — o /xp e o /pokedex são novos. A dica “Dúvidas onde farmar?” leva ao mesmo lugar do /hunt.</li>
          </ul>
        </section>

        <section class="aviso-bloco">
          <h3 data-i18n="aviso.tambemTitulo">Também nesta atualização</h3>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v31OrdemRegioes"><b>Alola, Galar e Paldea na ordem das gerações:</b> depois de Kalos agora vem <b>Alola</b> (nível 25.000), depois <b>Galar</b> (40.000) e por último <b>Paldea</b> (75.000). Os pokemon de cada região são os mesmos; mudaram as portas e o nível das hunts, cada uma no mesmo degrau da sua região. Se a sua hunt passou a pedir mais nível, você fica no Centro e escolhe outra no Mapa.</li>
            <li data-i18n-html="aviso.v31Regioes"><b>Cada um na sua região:</b> os sete pokemon de Kanto e Johto que estavam em Sinnoh (no nível 1.000 ou 1.125) foram para a região deles — Ditto e Porygon para <b>Kanto</b> (o Porygon no nível 20, o Ditto no 50), e Porygon2, Murkrow, Sudowoodo, Slowking e Blissey para <b>Johto</b> (o Porygon2 no 320, o Murkrow no 350, o Sudowoodo e o Slowking no 380, a Blissey no 440). O preço base no NPC mudou junto: Ditto 6.207, Porygon 9.799, Porygon2 21.211, Murkrow 19.951, Sudowoodo 60.000, Slowking 55.000 e Blissey 70.000 (eram 37.456, e 40.199 o Porygon2 e a Blissey).</li>
            <li data-i18n-html="aviso.v31Psiquicas"><b>Hunts psíquicas:</b> a pirâmide do Abra saiu do jogo. O Abra e as psíquicas até Sinnoh (Espeon, Ralts, Gardevoir, Gallade…) caçam no mapa do Alakazam, e as de Unova em diante (Munna, Gothita, Elgyem…) no do Brave Alakazam.</li>
            <li data-i18n-html="aviso.v31Config"><b>Configurações em abas:</b> Áudio, Interatividade, HUD e Desempenho, como no cliente de um jogo de PC. Cada opção mostra o nome e o ON/OFF, e a explicação abre no <b>?</b> ao lado. As opções são as mesmas de antes.</li>
            <li data-i18n-html="aviso.v31SoundMode"><b>Sound Mode:</b> o player de músicas saiu do jogo, por direito autoral. Os efeitos sonoros — shiny, captura, peça de TM e mensagem privada — continuam.</li>
            <li data-i18n-html="aviso.v31Arrastar"><b>Equipe do PvP e da guerra:</b> a ordem agora é de arrastar — pegue a casa e solte onde quiser, no mouse ou no dedo; as setinhas saíram. Para tirar um pokemon, o <b>×</b> continua na casa (no celular, toque nela e use o <b>Tirar</b>).</li>
            <li data-i18n-html="aviso.v31PokedexCsv"><b>Pokedex em planilha:</b> o <b>Baixar Pokedex (.csv)</b> agora leva a captura de cada pokemon — a chance em cada pokebola, quantos derrotar na média e o "1 em N" do shiny —, os mesmos números da ficha.</li>
            <li data-i18n-html="aviso.v31MercadoPagina"><b>Mercado:</b> o <b>‹ Todas as espécies</b> volta para a MESMA página — e o mesmo ponto da lista — de onde você abriu a espécie: quem varre a feira pela página 3 não volta mais para a 1.</li>
            <li data-i18n-html="aviso.v31MapaTopCatch"><b>Mapa:</b> o filtro <b>Pokedex</b> ganhou <b>Top Catch: não capturados na semana</b> — só as áreas com pokemon que ainda não entraram no seu Top Catch desta semana, e o mapa se refaz a cada captura nova.</li>
            <li data-i18n-html="aviso.v31GuildPaginas"><b>Guild:</b> a lista de membros mostra a guild INTEIRA, de 60 em 60 (as setas ‹ › embaixo dela), e ganhou a ordem <b>Mais tempo offline</b> — quem não aparece há mais tempo vem primeiro.</li>
            <li data-i18n-html="aviso.v31Anterior"><b>Perdeu a novidade anterior?</b> Johto agora abre no nível 200, as Outlands pedem mais nível, a captura ficou igual em toda região e o Mercado ficou só com fragmentos — está tudo na seta <b>‹</b>, aqui embaixo.</li>
          </ul>
        </section>
      </section>
      <section class="novidade" data-aviso="30" hidden="">
        <section class="aviso-bikes aviso-regioes">
          <div class="ab-raios" aria-hidden="true"></div>
          <div class="ab-confete" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
          <span class="avr-heroi"><img class="avr-mapa avr-johto" src="/assets/site/assets/maps/1kantoe2johto.png" alt="" width="1788" height="3364" loading="lazy" draggable="false"><i class="avd-faisca f1" aria-hidden="true"></i><i class="avd-faisca f2" aria-hidden="true"></i><i class="avd-faisca f3" aria-hidden="true"></i><i class="avd-faisca f4" aria-hidden="true"></i></span>
          <span class="ab-fita" data-i18n="aviso.v30Fita">Nova ordem no Mapa</span>
          <h3 class="ab-titulo" data-i18n="aviso.v30Titulo">JOHTO AGORA ABRE NO NÍVEL 200</h3>
          <div class="ab-bikes ab-tres">
            <div class="ab-bike rar-rara">
              <span class="ab-mega" data-look="321" data-tam="46"></span>
              <b data-i18n="aviso.v30N1">Johto</b><span data-i18n="aviso.v30N1S">nível 200 a 470</span>
            </div>
            <div class="ab-bike rar-mitica">
              <span class="ab-mega" data-look="211" data-tam="46"></span>
              <b data-i18n="aviso.v30N2">Outland 2–8</b><span data-i18n="aviso.v30N2S">nível 1.000 a 36.000</span>
            </div>
            <div class="ab-bike rar-lendaria">
              <img src="/img/ball-beast.png" alt="" width="18" height="18">
              <b data-i18n="aviso.v30N3">Captura</b><span data-i18n="aviso.v30N3S">igual em toda região</span>
            </div>
          </div>
          <p class="ab-sub" data-i18n-html="aviso.v30Sub">A escada do Mapa mudou: <b>Kanto 1 → Outland 150 → Johto 200 → Hoenn 500</b>. Johto vem logo depois da Outland, e as Outlands 2 a 8 passaram a pedir mais nível.</p>
        </section>

        <p class="aviso-lendaria" data-i18n-html="aviso.v30Lendaria">E a <b>captura</b> passou a depender só do <b>estágio evolutivo</b>, igual de Kanto a Alola: com a Beast Ball, <b>2,93%</b> no 1º de uma cadeia de três, <b>2,35%</b> no do meio e <b>1,88%</b> na última evolução.</p>

        <section class="aviso-bloco">
          <h3 data-i18n="aviso.v30RegioesTitulo">Johto e as Outlands</h3>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v30Johto"><b>Johto — nível 200:</b> as 88 hunts vão do nível 200 ao 470, na mesma ordem de antes — o Togepi abre no 200, os iniciais ficam no 260 e o Tyranitar fecha no 470. Kanto não mudou.</li>
            <li data-i18n-html="aviso.v30Abate"><b>O abate paga pelo nível novo:</b> uma hunt de nível 200 dá 19.342 de XP e 998 de ouro; a de 470, 56.278 de XP e 1.667 de ouro.</li>
            <li data-i18n-html="aviso.v30Especies"><b>Pokemon de Johto:</b> o capturado nasce no teto da espécie (o Togepi no Nv 20, o Sunkern no 40), e o NPC paga mais por eles — o Hoppip e o Sunkern valem 14.261 de base (eram 80), a Chikorita 16.692 (era 3.000). Quem estava numa hunt de Johto sem o nível 200 voltou para o Centro Pokemon.</li>
            <li data-i18n-html="aviso.v30Outland"><b>Outlands:</b> a 1 segue no nível 150; a 2 pede 1.000, a 3 2.000, a 4 4.000, a 5 8.000, a 6 16.000, a 7 24.000 e a 8 36.000. O bônus de drop de cada uma não mudou, e quem estava numa Outland que o nível não alcança mais desceu sozinho para a melhor que alcança.</li>
          </ul>
        </section>

        <section class="aviso-bloco">
          <h3 data-i18n="aviso.v30CapturaTitulo">Captura igual em toda região</h3>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v30Captura1"><b>A chance não depende mais do valor da espécie.</b> Todo pokemon de hunt tem a chance do estágio dele: o 1º de uma cadeia de três (Bulbasaur, Turtwig), o do meio — ou o 1º de uma cadeia de dois (Ivysaur, Eevee) — e a última evolução ou quem não evolui (Venusaur, Tauros, as variantes de Outland).</li>
            <li data-i18n-html="aviso.v30Captura2"><b>Beast Ball:</b> 2,93% · 2,35% · 1,88%. <b>Ultra Ball:</b> 1,46% · 1,17% · 0,94%. Kanto ficou mais difícil (o Pidgey tinha 7,93%) e as regiões de cima, mais fáceis (o Rowlet tinha 1,18%). A ficha de cada espécie na Pokedex mostra a chance nova, bola por bola; lendários e míticos seguem a regra deles.</li>
          </ul>
        </section>

        <section class="aviso-bloco">
          <h3 data-i18n="aviso.v30MercadoTitulo">Mercado da Comunidade</h3>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v30Fragmentos"><b>Só fragmentos:</b> o Z-Move, o AoE TM Disk, a Shiny Stone, o Ovo Shiny e as Mega Stones (comum e shiny, da 1ª e da 2ª mega) prontos não se anunciam mais — os fragmentos de cada um continuam no Mercado. O anúncio aberto de um item pronto voltou para a mochila de quem anunciou.</li>
            <li data-i18n-html="aviso.v30Abas">As abas <b>Mega Stones</b>, <b>Z-Move e TM</b> e <b>Ovo Shiny</b> saíram; as peças de TM agora ficam em <b>Fragmentos</b>, e o histórico de vendas chama o TM Disk Piece de Fragmento de Z-Move.</li>
            <li data-i18n-html="aviso.v30Anuncio"><b>Novo anúncio de pokemon:</b> a tela de escolha ficou bem maior, e a regra de quem entra no Mercado foi para o botão <b>?</b>, com um verificador que mostra, pokemon a pokemon, o que falta para ele entrar.</li>
          </ul>
        </section>

        <section class="aviso-bloco">
          <h3 data-i18n="aviso.v30PokemonTitulo">Pokemon</h3>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v30Grimmsnarl"><b>Grimmsnarl</b> chegou a Galar, com hunt no nível 35.150 e shiny próprio. A linha está completa: o Impidimp evolui para o Morgrem (hunt no 28.950) no Nv 40, e o Morgrem para o Grimmsnarl no Nv 100.</li>
            <li data-i18n-html="aviso.v30TypeNull"><b>Type: Null e Silvally são lendários:</b> as hunts deles em Alola saíram, e os dois agora só vêm do <b>Mystic Ticket</b>, com a regra de todo lendário (×4 nos stats).</li>
            <li data-i18n-html="aviso.v30Slakoth"><b>Hoenn:</b> as hunts da linha do Slakoth seguem a evolução — Slakoth 500, Vigoroth 600 e Slaking 700 (o Vigoroth e o Slaking estavam trocados).</li>
          </ul>
        </section>

        <section class="aviso-bloco">
          <h3 data-i18n="aviso.tambemTitulo">Também nesta atualização</h3>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v30Recado"><b>Pedido de amizade com recado:</b> o “Adicionar amigo” abre uma caixa para um recado opcional de até 100 caracteres. Quem recebe vê um 💬 nos Pendentes e, quando aceita, o recado vira a primeira mensagem da conversa.</li>
            <li data-i18n-html="aviso.v30Som"><b>Som de mensagem privada:</b> mensagem de amigo ou do Comércio que chega sem ser lida toca um som — dá para desligar nas Configurações.</li>
            <li data-i18n-html="aviso.v30Transparencia"><b>Transparência do cenário:</b> opção nova nas Configurações. Desligada, a parede, a coluna e o telhado voltam a cobrir quem passa atrás deles.</li>
            <li data-i18n-html="aviso.v30Ficha"><b>Aviso de shiny e de lendário:</b> o clique na caixa do aviso abre a ficha do pokemon que saiu — nível, IV, potência e nota.</li>
            <li data-i18n-html="aviso.v30Regiao"><b>Mapa:</b> a Região voltou a ser um botão por região, numa fileira acima dos filtros, com o nível embaixo e o cadeado nas que você ainda não abriu.</li>
            <li data-i18n-html="aviso.v30Saque"><b>Saque:</b> a avaliação dos pedidos leva em média 2 dias úteis.</li>
          </ul>
        </section>
      </section>
      <section class="novidade" data-aviso="29" hidden="">
        <section class="aviso-bikes aviso-regioes">
          <div class="ab-raios" aria-hidden="true"></div>
          <div class="ab-confete" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
          <span class="avr-heroi"><img class="avr-mapa" src="/assets/site/assets/maps/8alola.png" alt="" width="1999" height="1895" draggable="false"><i class="avd-faisca f1" aria-hidden="true"></i><i class="avd-faisca f2" aria-hidden="true"></i><i class="avd-faisca f3" aria-hidden="true"></i><i class="avd-faisca f4" aria-hidden="true"></i></span>
          <span class="ab-fita" data-i18n="aviso.v29Fita">Mapa novo</span>
          <h3 class="ab-titulo" data-i18n="aviso.v29Titulo">GALAR E PALDEA CHEGARAM</h3>
          <div class="ab-bikes ab-tres">
            <div class="ab-bike rar-rara">
              <span class="ab-mega" data-look="60813" data-tam="46"></span>
              <b data-i18n="aviso.v29N1">Galar</b><span data-i18n="aviso.v29N1S">nível 25.000</span>
            </div>
            <div class="ab-bike rar-mitica">
              <span class="ab-mega" data-look="60912" data-tam="46"></span>
              <b data-i18n="aviso.v29N2">Paldea</b><span data-i18n="aviso.v29N2S">nível 40.000</span>
            </div>
            <div class="ab-bike rar-lendaria">
              <span class="ab-mega" data-look="60722" data-tam="46"></span>
              <b data-i18n="aviso.v29N3">Alola</b><span data-i18n="aviso.v29N3S">nível 75.000</span>
            </div>
          </div>
          <p class="ab-sub" data-i18n-html="aviso.v29Sub">As gerações 8 e 9 ganharam <b>regiões próprias no Mapa</b>. Depois de Kalos agora são três, nesta ordem — <b>Galar</b>, <b>Paldea</b> e <b>Alola</b> —, cada uma no seletor <b>Região</b>.</p>
        </section>

        <p class="aviso-lendaria" data-i18n-html="aviso.v29Lendaria">E chegou muito pokemon novo: <b>279 espécies</b> de Hoenn a Paldea ganharam arte e hunt, <b>88 formas</b> — de Alola, Galar, Hisui e Paldea, e as do Rotom, do Deoxys, do Lycanroc… — viraram espécies, e entraram <b>25 megas novas</b>.</p>

        <section class="aviso-bloco">
          <h3 data-i18n="aviso.v29RegioesTitulo">As regiões</h3>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v29Galar"><b>Galar — nível 25.000:</b> a geração 8 (Grookey, Scorbunny, Corviknight, Toxtricity…), as formas de Galar (Ponyta, Meowth, Slowpoke…) e as de Hisui. Hunts do nível 25.000 ao 35.150.</li>
            <li data-i18n-html="aviso.v29Paldea"><b>Paldea — nível 40.000:</b> a geração 9 (Sprigatito, Quaxly, Lechonk, Tinkatink…) e as formas de Paldea, com o Tauros de Paldea e a Ursaluna Bloodmoon. Hunts do 40.000 ao 64.950.</li>
            <li data-i18n-html="aviso.v29Alola"><b>Alola — nível 75.000:</b> a geração 7 (Rowlet, Litten, Mimikyu, Lycanroc…) e as formas de Alola. Agora é a última região, com hunts do 75.000 ao 160.300 — a hunt mais alta do jogo continua no mesmo nível.</li>
            <li data-i18n-html="aviso.v29Mudou">As três usam o mapa de Alola por enquanto. O nível dos selvagens e a chance de captura seguem a região nova: a geração 7 subiu para o 75.000, e as gerações 8 e 9 ficaram mais perto — quem estava entre o 25.000 e o 75.000 agora caça em Galar e Paldea.</li>
          </ul>
        </section>

        <section class="aviso-bloco">
          <h3 data-i18n="aviso.v29NovosTitulo">Pokemon novos</h3>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v29Arte"><b>279 pokemon</b> de Hoenn a Paldea ganharam arte nova — nas quatro direções e em shiny — e hunt na região deles. Empoleon, Rotom, Liepard, Kyurem, Morelull e Meloetta trocaram de arte.</li>
            <li data-i18n-html="aviso.v29Formas"><b>88 formas</b> viraram espécies, com golpes e evolução próprios, na aba nova <b>Formas</b> da Pokedex: o Pikachu evolui para Raichu ou Raichu de Alola, o Cubone para Marowak ou o de Alola, o Quilava para Typhlosion ou o de Hisui, o Rockruff para um dos três Lycanroc…</li>
            <li data-i18n-html="aviso.v29Megas"><b>25 megas novas</b> — Mewtwo Y, Latias, Latios, Kyogre e Groudon Primal, Rayquaza, Lopunny, Diancie e as de Legends: Z-A — e a <b>2ª mega</b> de Charizard (X), Mewtwo (X) e Lucario (Z): quem tem as duas pedras escolhe qual na hora de megaevoluir. São 28 Mega Stones novas, com a versão shiny.</li>
            <li data-i18n-html="aviso.v29Lendarios"><b>Lendários:</b> Latias, Xerneas, os Tapus, Solgaleo, Zacian, Koraidon e os outros que ganharam arte saem do <b>Mystic Ticket</b>. Na Pokedex, todo lendário e mítico ganhou o selo rosa LENDÁRIO ou MÍTICO; o BOSS fica em quem tem luta no botão Boss, e o MYSTIC TICKET em quem sai do sorteio. As <b>megas de lendário</b> não saem do ticket — ele traz só o lendário, e a mega vem megaevoluindo com a Mega Stone — e têm <b>4 golpes de 600</b>, como o lendário.</li>
            <li data-i18n-html="aviso.v29Chegaram"><b>Bonsly, Happiny, Meloetta e Meowstic</b> entraram no jogo, com a Mega Meowstic; o Chansey e o Sudowoodo passaram a ser 2ª evolução, e o Espurr evolui para o Meowstic.</li>
          </ul>
        </section>

        <section class="aviso-bloco">
          <h3 data-i18n="aviso.tambemTitulo">Também nesta atualização</h3>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v29Retroceder"><b>Retroceder Mega-Evolução:</b> no Professor Carvalho, bancada Mega — por <b>1 bilhão de Coins</b> a mega volta à espécie base, com o mesmo IV, nível, refino, potência e shiny. A Mega Stone gasta não volta.</li>
            <li data-i18n-html="aviso.v29Mercado"><b>Mercado da Comunidade:</b> anúncio de <b>item e de diamante</b> muda de preço no máximo a cada <b>30 minutos</b> — o botão Editar mostra quanto falta. Acabou a guerra de um Coin a menos (19.000, 18.999, 18.998…). Pokemon segue como antes.</li>
            <li data-i18n-html="aviso.v29Mapas"><b>Mapas sem quadrados pretos:</b> o rio cortado do Croconaw, as bordas das cavernas e os outros buracos dos mapas agora mostram o cenário completo.</li>
            <li data-i18n-html="aviso.v29Escala"><b>Tamanho da interface:</b> numa janela baixa, o jogo inteiro encolhe sozinho, como o Ctrl − do navegador, e as janelas param de passar da tela. A escolha fica nas <b>Configurações</b>.</li>
            <li data-i18n-html="aviso.v29Saque"><b>Saque:</b> saiu o × de cancelar. Para desistir de um saque que ainda não foi enviado, abra um ticket e a equipe devolve as Gemas. O endereço que não é de carteira Solana é recusado na hora, com a explicação.</li>
            <li data-i18n-html="aviso.v29Vitrines"><b>Vitrines de Shinys e P5:</b> ordenadas por Nota, abrem e trocam de página na hora. Um shiny ou P5 recém-capturado pode levar até 1 minuto para aparecer nessa ordem.</li>
            <li data-i18n-html="aviso.v29Mais"><b>E mais:</b> o Hisuian Voltorb e o Mega Charizard X pararam de girar; o Rotom não aparece mais com a arte do Wash Rotom, e os lendários de Paldea ganharam a arte certa; o chat da Guild tem a própria espera e não gasta a sua vez no Mundo; e os nomes ficaram em português — “Mercado da Comunidade”, “Saque — Gemas para USDT”.</li>
          </ul>
        </section>
      </section>
      <section class="novidade" data-aviso="28" hidden="">
        <section class="aviso-bikes aviso-loot">
          <div class="ab-raios" aria-hidden="true"></div>
          <div class="ab-confete" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
          <span class="avl-heroi"><i class="avl-sol" aria-hidden="true"></i><img class="avl-mochila" src="/img/itens/mochila.png" alt="Mochila" width="23" height="22" draggable="false"><i class="avd-faisca f1" aria-hidden="true"></i><i class="avd-faisca f2" aria-hidden="true"></i><i class="avd-faisca f3" aria-hidden="true"></i><i class="avd-faisca f4" aria-hidden="true"></i></span>
          <span class="ab-fita" data-i18n="aviso.v28Fita">Fim do loot</span>
          <h3 class="ab-titulo" data-i18n="aviso.v28Titulo">O LOOT VIROU OURO</h3>
          <div class="ab-bikes ab-tres">
            <div class="ab-bike rar-rara">
              <img src="/assets/site/assets/ui/moeda-ouro.png" alt="" width="18" height="18">
              <b data-i18n="aviso.v28N1">+15%</b><span data-i18n="aviso.v28N1S">de ouro por abate</span>
            </div>
            <div class="ab-bike rar-mitica">
              <img src="/assets/site/assets/items/fire_stone.gif" alt="" width="18" height="18">
              <b data-i18n="aviso.v28N2">Pedras</b><span data-i18n="aviso.v28N2S">do tipo de cada um</span>
            </div>
            <div class="ab-bike rar-lendaria">
              <img src="/img/itens/mochila.png" alt="" width="18" height="18">
              <b data-i18n="aviso.v28N3">Mochila</b><span data-i18n="aviso.v28N3S">e Market novos</span>
            </div>
          </div>
          <p class="ab-sub" data-i18n-html="aviso.v28Sub">Os pokemon não soltam mais o loot que só servia para vender ao NPC. O que ele rendia vem <b>direto no ouro de cada abate</b> — e o que estava na sua mochila já virou <b>Coins</b>.</p>
        </section>

        <p class="aviso-lendaria" data-i18n-html="aviso.v28Lendaria">O <b>bônus de loot</b> é <b>+15%</b> do ouro até o nível 25.000 e cresce acima disso, até dobrar o ouro no topo. O <b>Loot Boost</b> multiplica esse bônus — quem tinha boost ativo não perdeu nada.</p>

        <section class="aviso-bloco">
          <h3 data-i18n="aviso.v28ComoTitulo">O que mudou</h3>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v28Como1"><b>Pedras:</b> todo pokemon solta a pedra de cada tipo dele — <b>0,2%</b> na 1ª evolução, <b>0,35%</b> na 2ª e <b>0,5%</b> na 3ª (ou em quem não evolui). O Pidgey solta Sun Stone e Feather Stone.</li>
            <li data-i18n-html="aviso.v28Como2"><b>Market:</b> a chave <b>Comprar | Vender</b>, as categorias à esquerda e cada produto num palanque, com os atalhos <b>×10</b>, <b>×100</b> e <b>Máx</b>. Vender agora é só de pokemon.</li>
            <li data-i18n-html="aviso.v28Como3"><b>Mochila:</b> o antigo inventário abre nos <b>bolsos</b> — Treinador, Itens Raros, Pedras, Skins, Oferenda, Chocadeira e Coleção —, e o <b>‹</b> do topo volta para eles.</li>
            <li data-i18n-html="aviso.v28Como4"><b>Z-Move:</b> o TM Elemental agora se chama Z-Move, com um cristal por tipo. O Fragmento de Z-Move é o cristal cinza, e a peça do AoE ficou cinza também. Na ficha do pokemon, o selo leva o desenho ao lado.</li>
          </ul>
        </section>

        <section class="aviso-bloco">
          <h3 data-i18n="aviso.tambemTitulo">Também nesta atualização</h3>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v28AutoColecao"><b>Auto Coleção:</b> em <b>Market → Vender</b>, um painel com seis regras de liga/desliga — Lendário/Mítico, Shiny, Potência, Qualidade, IV e Nota. Quem passar em qualquer regra ligada vai sozinho para a Coleção, fora da venda. Já vêm ligadas para todos <b>Lendário/Mítico, Shiny e P4+</b>: ao entrar, os que você já tinha e passam nelas foram para a Coleção. Desligar uma regra não devolve ninguém — para tirar algum, é na Coleção, em <b>Devolver ao Depot</b>.</li>
            <li data-i18n-html="aviso.v28Sorteio"><b>Sorteio da liberação:</b> quem pede um anúncio do Mercado da Comunidade nos primeiros 3 segundos da liberação vê uma janela com <b>quem está na disputa</b>, ao vivo, e a roleta para no nick de <b>quem levou</b>. A ordem é sorteada, cada um leva o que pediu enquanto houver estoque, e quem não leva não paga.</li>
            <li data-i18n-html="aviso.v28Ginasios"><b>Ginásios em arena:</b> cada um dos 18 virou um palco na cor do tipo, com o líder num pedestal e o golpe do tipo estourando quando o mouse passa. A página do ginásio é um duelo — você × líder — e o time se monta ali mesmo, com <b>Melhor time</b> e <b>Salvar e desafiar</b>.</li>
            <li data-i18n-html="aviso.v28Mapa"><b>Mapa em modo Lista:</b> a chave <b>Mapa | Lista</b>, ao lado da busca, mostra as áreas em linhas — o pokemon, o nível, os tipos e o ✓ de já capturado —, que se ordenam pelos títulos. Região, Tipo, Pokedex e Nível viraram menus numa fileira só, e o mapa ficou mais alto.</li>
            <li data-i18n-html="aviso.v28Ranking"><b>Ranking:</b> os placares viraram um menu, cada um com o seu ícone, e o pódio é de ouro, prata e bronze. O <b>Top Treinadores</b> mostra o nível (o XP aparece com o mouse em cima, ou num toque) e o <b>Top Coins</b> vem em K/M/B, com o valor exato do mesmo jeito.</li>
            <li data-i18n-html="aviso.v28Guerra"><b>Análise da guerra:</b> o nick de cada jogador abre o perfil, e os pokemon mostram uma mini-ficha com o mouse em cima e a ficha inteira no clique.</li>
            <li data-i18n-html="aviso.v28Chat"><b>Chat:</b> agora são <b>30 segundos</b> entre uma mensagem e outra nos canais abertos (eram 5), numa espera só para os três — Mundo, Comércio e Dúvidas —, para o Mundo voltar a dar para ler. No chat da <b>Guild</b> e nas mensagens privadas (amigos e Comércio), <b>5 segundos</b>.</li>
            <li data-i18n-html="aviso.v28Nick"><b>Nick:</b> a Troca de Nome saiu da Loja VIP. O nick é o que você escolheu no cadastro e não se troca mais — só a equipe troca, em caso excepcional. Os Termos de Uso (seção 4) já dizem assim.</li>
            <li data-i18n-html="aviso.v28Mais"><b>E mais:</b> ícones novos no Vote &amp; Ganhe, na Calculadora, nas Configurações, em Amigos, no RMT e no Shop, e cada janela mostra no título o ícone do botão que a abre (Casa e RMT trocaram de lugar no menu); o atalho do <b>Modo Imersivo</b> fica ao lado da bateria; o Depósito avisa <b>ENVIE SOMENTE USDT</b>; o aviso de reembolso da Loja VIP subiu para o topo da janela; o Depot ganhou altura fixa, como o Market; e o “+N” verde do Market aparece já na primeira compra.</li>
          </ul>
        </section>
      </section>
      <section class="novidade" data-aviso="27" hidden="">
        <section class="aviso-bikes aviso-safari">
          <div class="ab-raios" aria-hidden="true"></div>
          <div class="ab-confete" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
          <span class="avf-heroi"><i class="avf-sol" aria-hidden="true"></i><img class="avf-ticket" src="/img/itens/safari-ticket.png" alt="Safari Ticket" width="32" height="32" draggable="false"><i class="avd-faisca f1" aria-hidden="true"></i><i class="avd-faisca f2" aria-hidden="true"></i><i class="avd-faisca f3" aria-hidden="true"></i><i class="avd-faisca f4" aria-hidden="true"></i></span>
          <span class="ab-fita" data-i18n="aviso.v27Fita">Drop novo dos Bosses</span>
          <h3 class="ab-titulo" data-i18n="aviso.v27Titulo">O SAFARI CHEGOU</h3>
          <div class="ab-bikes ab-tres">
            <div class="ab-bike rar-rara">
              <span class="avd-ico" aria-hidden="true"><svg viewBox="0 0 20 20" width="40" height="40"><circle cx="10" cy="10" r="7.6" fill="none" stroke="currentColor" stroke-width="2.2"></circle><path d="M10 5.4V10l3.2 2.1" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>
              <b data-i18n="aviso.v27N1">1 hora</b><span data-i18n="aviso.v27N1S">desde a entrada</span>
            </div>
            <div class="ab-bike rar-mitica">
              <span class="avs-trio" aria-hidden="true"><span class="ab-mega" data-look="60035" data-tam="34"></span><span class="ab-mega" data-look="60548" data-tam="34"></span><span class="ab-mega" data-look="60957" data-tam="34"></span></span>
              <b data-i18n="aviso.v27N2">695</b><span data-i18n="aviso.v27N2S">espécies</span>
            </div>
            <div class="ab-bike rar-lendaria">
              <img src="/assets/site/assets/ui/ball-poke.png" alt="" width="18" height="18">
              <b data-i18n="aviso.v27N3">Seu nível</b><span data-i18n="aviso.v27N3S">nos selvagens</span>
            </div>
          </div>
          <p class="ab-sub" data-i18n-html="aviso.v27Sub">Um mapa só dele — a ilha tropical do Tropius —, onde <b>cada aparição é uma espécie diferente</b> e você captura com as <b>suas pokebolas</b>.</p>
        </section>

        <p class="aviso-lendaria" data-i18n-html="aviso.v27Lendaria">O <b>Safari Ticket</b> cai dos <b>Bosses</b>, na vitória, com a mesma chance do <b>Fragmento de Mega Shiny Stone</b> — e também se compra e vende no <b>Mercado da Comunidade</b> (aba Tickets). Para entrar: <b>Mochila → Itens raros → Safari Ticket</b>.</p>

        <section class="aviso-bloco">
          <h3 data-i18n="aviso.v27ComoTitulo">Como funciona</h3>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v27Como1">Usou o ticket, entrou: são <b>60 minutos corridos</b> a partir da entrada — o relógio <b>não pausa</b>. O tempo que falta fica na plaquinha da cena.</li>
            <li data-i18n-html="aviso.v27Como2">A cada aparição, uma <b>espécie diferente</b>, sorteada entre uma das hunts — <b>695 espécies</b> no sorteio, todas com a mesma chance, <b>sem Outland, Mega, lendário nem mítico</b>.</li>
            <li data-i18n-html="aviso.v27Como3">Os selvagens vêm no <b>Nv 1</b> — caem num golpe — e se capturam com as <b>suas pokebolas</b>, como numa hunt: o <b>shiny pode aparecer</b>, e o capturado nasce no <b>dobro do nível de captura</b> da espécie (40 vira Nv 80; 100 vira Nv 200, o máximo). Leve bolas — sem nenhuma, o Safari nem abre, e o ticket não é gasto.</li>
            <li data-i18n-html="aviso.v27Como4">Lá dentro é <b>caça para capturar</b>: derrotar <b>não dá XP</b> (nem ao treinador, nem aos pokemon), <b>itens nem Coins</b>. Quando a hora acaba, um resumo mostra tudo o que você levou.</li>
          </ul>
        </section>

        <section class="aviso-bloco">
          <h3 data-i18n="aviso.v27SairTitulo">Sem volta</h3>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v27Sair1"><b>Sair encerra o Safari:</b> ir ao Centro Pokemon, usar a Escape Rope, desistir do combate ou trocar de área pelo Mapa. O jogo pergunta antes de você sair.</li>
            <li data-i18n-html="aviso.v27Sair2"><b>A equipe desmaiou?</b> O Safari também acaba, como na <b>Arena Mística</b> — senão bastaria desmaiar de propósito para trocar de onda até aparecer o pokemon desejado. Para voltar, só com <b>outro ticket</b>.</li>
            <li data-i18n-html="aviso.v27Sair3"><b>A conexão caiu, você recarregou a página (F5) ou abriu o jogo em outra aba?</b> Aí o Safari <b>não acaba</b>: voltando antes de a hora terminar, você continua <b>de onde parou</b> — os mesmos pokemon, com a mesma vida e as mesmas recargas. A hora não pausa enquanto você está fora.</li>
          </ul>
        </section>

        <section class="aviso-bloco">
          <h3 data-i18n="aviso.tambemTitulo">Também nesta atualização</h3>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v27Pastas"><b>Pastas da Coleção:</b> organize a Coleção em até <b>5 pastas</b>, com nome e ícone — PvP, GvG, Torneio, “Evoluir p/ vender”… O <b>⋮</b> de cada card (e da ficha) tem o <b>Mover para</b>. Pasta é só organização: em qualquer uma o pokemon continua na Coleção, fora da venda ao NPC.</li>
            <li data-i18n-html="aviso.v27Mercado"><b>Mercado da Comunidade:</b> a aba Pokemon ganhou os filtros <b>Mega Evolução</b> e <b>Lendários</b> (dá para ligar os dois juntos). E <b>lendário e mítico</b> ganharam <b>passe livre</b>, como o shiny e o P5: entram em qualquer nível e nota.</li>
            <li data-i18n-html="aviso.v27Lendarios"><b>Lendários e míticos com ×4</b> nos atributos, como o ×3 do shiny — na hunt, no ginásio, no PvP e na guerra de guild. A ficha deles mostra <b>INESTIMÁVEL</b>, com o selo <b>GLITCH</b> no lugar da nota. Na <b>Arena Mística</b>, o lendário luta no <b>nível do seu treinador</b> (com o ×4), e o capturado nasce com piso de <b>qualidade 1,20, IV 120 e P2</b>. O <b>Campeonato Amador</b> deixou de aceitar lendário e mítico.</li>
            <li data-i18n-html="aviso.v27Golpes"><b>Golpes novos:</b> 160 espécies — Snorlax, Lapras, Flygon, Mimikyu, Sylveon e mais — ganharam moveset de <b>11 golpes</b>, com <b>dois de poder 600</b>, e 22 variantes da Outland ganharam lista própria (a Toxic Toxicroak puxa para FIGHTING, a Freezing Aurorus para ICE…).</li>
            <li data-i18n-html="aviso.v27Outland"><b>Outland:</b> os pokemon de lá largam só <b>pedras de evolução</b> — o loot comum, que só servia para vender, saiu —, além dos raros de sempre: fragmentos de Shiny Stone, de Bicicleta e de Chave, e o Bronze Boss Token. O <b>Hunt Analyser</b> e a Pokedex já mostram assim.</li>
            <li data-i18n-html="aviso.v27Npc"><b>Preço no NPC:</b> o NPC passa a pagar de base <b>60.000</b> pelo Banshee Misdreavus e pelo Furious Scizor e <b>32.000</b> pelo Furious Scyther (os três da Outland), e <b>88.000</b> pelo Scizor e pelo Mega Scizor — o nível, a qualidade e o shiny multiplicam por cima, como sempre. A ficha da Pokedex agora mostra o que o NPC paga de verdade.</li>
            <li data-i18n-html="aviso.v27Tm"><b>TM:</b> o Z-Move <b>volta a valer depois da Mega e da evolução</b> — ele fica no “DNA” do pokemon. E no <b>Professor Carvalho → Aplicar</b>, cada pokemon da lista mostra os <b>tipos</b> e a fileira <b>P · IV · Q · Nota</b>, para escolher sem abrir a ficha.</li>
            <li data-i18n-html="aviso.v27Boss"><b>Bosses:</b> o <b>Lançar sem Parar</b> não se desliga mais quando a bola acaba (volta a lançar quando o estoque volta); no Modo Economia, o <b>Abandonar arena</b> fica no cabeçalho; os <b>Boss Tokens</b> gastos entram nos Gastos da sessão, e o token só se vende no Mercado (sem preço de NPC).</li>
            <li data-i18n-html="aviso.v27Chat"><b>Chat e nomes:</b> o pesado — preconceito, termo sexual explícito, xingamento pesado — não sai no chat (o palavrão comum continua passando); <b>nick, guild e apelido</b> de pokemon não aceitam palavrão. E a dica automática do chat leva à <b>Extensão Oficial</b>, a mesma do /guia e do /hunt.</li>
            <li data-i18n-html="aviso.v27Termos"><b>Termos de Uso:</b> o jogo é para <b>maiores de 18 anos</b>, as ferramentas de medição só carregam depois do seu “Aceitar” nos cookies, e a regra das contas ficou escrita: até <b>4 contas por pessoa</b>, e entre as suas próprias contas, troca <b>só pelo Mercado da Comunidade</b>.</li>
            <li data-i18n-html="aviso.v27Mais"><b>E mais:</b> as <b>Caixas do Market</b> saíram do jogo (as de Fundador e CoFundador ficam); o Passe VIP agora se chama <b>Passe Premium</b>; no celular, o Hunt Analyser abre a ficha da espécie; no <b>Firefox</b>, o contorno do treinador e do pokemon não treme mais com o zoom; e a tela de saque diz que a avaliação leva <b>em média 1 dia útil</b>.</li>
          </ul>
        </section>
      </section>
      <section class="novidade" data-aviso="26" hidden="">
        <section class="aviso-bikes aviso-showdown">
          <div class="ab-raios" aria-hidden="true"></div>
          <div class="ab-confete" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
          <span class="avd-heroi"><i class="avd-halo" aria-hidden="true"></i><img class="avd-logo" src="/img/showdown-logo.png" srcset="/img/showdown-logo.png 1x, /img/showdown-logo@2x.png 2x" alt="Showdown" width="199" height="204" draggable="false"><i class="avd-faisca f1" aria-hidden="true"></i><i class="avd-faisca f2" aria-hidden="true"></i><i class="avd-faisca f3" aria-hidden="true"></i><i class="avd-faisca f4" aria-hidden="true"></i></span>
          <span class="ab-fita" data-i18n="aviso.v26Fita">Toda quarta · 21:00</span>
          <h3 class="ab-titulo" data-i18n="aviso.v26Titulo">O TORNEIO DA COMUNIDADE</h3>
          <div class="ab-bikes ab-tres">
            <div class="ab-bike rar-rara">
              <span class="avd-ico" aria-hidden="true"><svg viewBox="0 0 20 20" width="40" height="40"><circle cx="10" cy="10" r="7.6" fill="none" stroke="currentColor" stroke-width="2.2"></circle><path d="M10 5.4V10l3.2 2.1" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>
              <b data-i18n="aviso.v26N1">1 min</b><span data-i18n="aviso.v26N1S">por rodada</span>
            </div>
            <div class="ab-bike rar-mitica">
              <span class="avd-ico" aria-hidden="true"><svg viewBox="0 0 20 20" width="40" height="40"><path d="M3.2 2.8h13.6" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"></path><path d="M10 17.4V8.6M5.4 12.6L10 8l4.6 4.6" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>
              <b data-i18n="aviso.v26N2">Nv 150</b><span data-i18n="aviso.v26N2S">nível máximo</span>
            </div>
            <div class="ab-bike rar-lendaria avd-premio">
              <img src="/img/moeda-diamante.png" alt="">
              <b data-i18n="aviso.v26N3">180</b><span data-i18n="aviso.v26N3S">100 · 50 · 30 💎</span>
            </div>
          </div>
          <p class="ab-sub" data-i18n-html="aviso.v26Sub">O torneio <b>semanal da comunidade</b>, com os <b>seus pokemon de verdade</b>: aqui ganha quem <b>monta</b> melhor a equipe — não quem tem o pokemon mais raro.</p>
        </section>

        <p class="aviso-lendaria" data-i18n-html="aviso.v26Lendaria"><b>O 1º Showdown é quarta, 14/10, às 21:00 (horário de Brasília) — as inscrições já estão abertas!</b> Entre em <b>Torneio → Showdown</b> (nível 100 de treinador) e se inscreva até <b>quarta, 20:00</b>.</p>

        <section class="aviso-bloco">
          <h3 data-i18n="aviso.v26ComoTitulo">Como funciona</h3>
          <div class="sdc-numeros avd-agenda">
            <span><b data-i18n="aviso.v26Ag1">7 dias</b><small data-i18n="aviso.v26Ag1S">de inscrições</small></span>
            <span><b data-i18n="aviso.v26Ag2">20:00</b><small data-i18n="aviso.v26Ag2S">chave e trava</small></span>
            <span><b data-i18n="aviso.v26Ag3">21:00</b><small data-i18n="aviso.v26Ag3S">lutas ao vivo</small></span>
          </div>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v26Como1"><b>Toda quarta.</b> As inscrições ficam abertas a <b>semana inteira</b>, até <b>quarta, 20:00</b> (Brasília). Nessa hora a <b>chave é publicada</b> e a <b>equipe trava</b> — ninguém ajusta o time olhando o adversário.</li>
            <li data-i18n-html="aviso.v26Como2"><b>Às 21:00 começam as lutas</b>, ao vivo, com <b>uma rodada por minuto</b> (o Mundial e o Amador vão de 5 em 5). É <b>eliminação dupla</b> — perdeu uma vez, cai na chave dos perdedores; perdeu duas, acabou — e a <b>grande final é única</b>.</li>
            <li data-i18n-html="aviso.v26Como3">As <b>seeds</b> vêm da Tabela do <b>PvP Ranqueado</b>, e a luta também é a dele: mesmas regras, mesma batalha automática. Cada partida fica gravada na aba <b>Bracket</b>, para rever.</li>
            <li data-i18n-html="aviso.v26Como4"><b>Onde:</b> o menu <b>Torneio</b> agora abre numa seleção de três modos — <b>Mundial</b>, <b>Amador</b> e <b>Showdown</b> — e cada um mostra só os torneios dele.</li>
          </ul>
        </section>

        <section class="aviso-bloco">
          <h3 data-i18n="aviso.v26QuemTitulo">Quem pode lutar</h3>
          <div class="sd-regras avd-regras">
            <span class="sd-regra" data-i18n="sd.regra.shiny">Sem shiny</span>
            <span class="sd-regra" data-i18n="sd.regra.p5">Sem P5</span>
            <span class="sd-regra" data-i18n="sd.regra.lendario">Sem lendário</span>
            <span class="sd-regra" data-i18n="sd.regra.outland">Sem Outland</span>
            <span class="sd-regra" data-i18n="sd.regra.tm">Sem TM</span>
            <span class="sd-regra cap" data-i18n="aviso.v26Cap">Nível máx. 150</span>
          </div>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v26Quem1"><b>Nível 100 de treinador</b> e <b>até 5 pokemon seus</b>, os de verdade: nada neles muda, e vender ou anunciar um antes da trava o tira da equipe. Escolha em <b>Selecionar minha Equipe</b>; sem escolher, vale a sua <b>equipe do PvP Ranqueado</b>, sem os proibidos.</li>
            <li data-i18n-html="aviso.v26Quem2"><b>Não entram:</b> shiny, P5, lendário e mítico, variantes de Outland e pokemon com Z-Move ou TM AoE. <b>Mega pode</b>, sem limite, e <b>espécie repetida também</b> — dois Garchomp no mesmo time, por exemplo.</li>
            <li data-i18n-html="aviso.v26Quem3"><b>Nível máximo 150:</b> o pokemon luta com o nível dele <b>até 150</b> — um Nv 100 luta como 100, um Nv 200 luta como 150. É o <b>único torneio com teto</b>: no Mundial e no Amador o nível acima disso ainda ajuda.</li>
            <li data-i18n-html="aviso.v26Quem4"><b>Por quê?</b> É o torneio da comunidade: sem o que só os veteranos juntaram, quem decide é a <b>montagem</b> — que pokemon, em que ordem, contra quem. E toda semana vale ir atrás de um pokemon forte que <b>caiba</b> no Showdown.</li>
          </ul>
        </section>

        <section class="aviso-bloco">
          <h3 data-i18n="aviso.v26PremioTitulo">O prêmio</h3>
          <div class="sdc-lugares avd-lugares">
            <span class="sdc-lugar"><img src="/assets/site/assets/ui/trofeu-1.png" alt="1º"><img class="selo-moeda" src="/img/moeda-diamante.png" alt="" width="16" height="16">100</span>
            <span class="sdc-lugar"><img src="/img/medalha-2.png" alt="2º"><img class="selo-moeda" src="/img/moeda-diamante.png" alt="" width="16" height="16">50</span>
            <span class="sdc-lugar"><img src="/img/medalha-3.png" alt="3º"><img class="selo-moeda" src="/img/moeda-diamante.png" alt="" width="16" height="16">30</span>
          </div>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v26Premio1"><b>180 diamantes</b> por semana para o pódio: <b>100</b> para o 1º&nbsp;lugar, <b>50</b> para o 2º e <b>30</b> para o 3º. Só com <b>8 ou mais participantes com pokemon que podem lutar</b>: numa edição menor a chave roda igual, mas ninguém leva diamante. E quem chega ao pódio <b>sem ter lutado nenhuma partida</b> (só por W.O.) não recebe.</li>
            <li data-i18n-html="aviso.v26Premio2">Cai <b>sozinho</b> na sua conta (se você estiver offline, quando entrar). É <b>diamante de prêmio</b>: serve para usar no jogo e <b>não vai ao Mercado</b> — só diamante comprado entra na cota de venda.</li>
          </ul>
        </section>

        <section class="aviso-bloco">
          <h3 data-i18n="aviso.tambemTitulo">Também nesta atualização</h3>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v26TopCatch"><b>Top Catch semanal:</b> o placar (e não a sua Pokedex) zera <b>todo domingo, 00:00</b> (Brasília, junto com o PvP) e só conta a <b>captura com bola</b>: cada espécie diferente vale 1 ponto. Prêmio na virada: <b>1º&nbsp;50&nbsp;💎</b> e o selo da Poke Ball no chat, <b>2º ao 10º&nbsp;20&nbsp;💎</b>, <b>11º ao 100º&nbsp;5&nbsp;💎</b>. O painel novo fica na <b>Pokedex</b>, e a semana de estreia ainda conta a Pokedex inteira.</li>
            <li data-i18n-html="aviso.v26Pvp"><b>PvP Ranqueado:</b> a semana agora vira no <b>sábado, 23h59</b> (domingo 00:00 de Brasília), e não mais na virada de domingo para segunda — é nesse instante que a escada zera e os prêmios saem.</li>
            <li data-i18n-html="aviso.v26Lendarios"><b>Lendários e míticos:</b> 42 deles — Mewtwo, Rayquaza, Dialga, Reshiram, Kyurem e mais — ganharam moveset novo: <b>14 golpes</b>, <b>quatro de poder 600</b> (Phione e Poipole: 10 golpes e dois de 600). Os clones de Orre herdam a lista.</li>
            <li data-i18n-html="aviso.v26Preco"><b>Mais barato:</b> os pacotes de 30 dias (<b>Treinador 1.000&nbsp;💎</b>, era 1.110; <b>Farmer</b> e <b>Shiny Hunter 2.000&nbsp;💎</b>, eram 2.220) e o <b>Boost da Guild</b>, que agora enche com <b>500&nbsp;💎</b> (era 1.000) pelos mesmos 7 dias.</li>
            <li data-i18n-html="aviso.v26Mercado"><b>Mercado da Comunidade:</b> dá para <b>comprar em quantidade</b> (itens e diamantes) — você diz quantas quer e o jogo junta os anúncios mais baratos, cada um pelo preço dele, sem passar do total que a tela mostrou. E o <b>pokemon shiny</b> só se anuncia em <b>Gemas</b>: o Coins fica travado. O <b>Mystic Ticket</b> ganhou a aba própria <b>Tickets</b> (em Itens), e a aba <b>Boss Tokens</b> deixou de dizer "ninguém vendendo" quando havia ticket à venda.</li>
            <li data-i18n-html="aviso.v26Planilha"><b>Tabela de preços:</b> o botão <b>Exportar planilha</b> baixa em <b>.csv</b> o recorte que está na tela (até 5.000 linhas) — um download por hora, como o CSV da Pokedex.</li>
            <li data-i18n-html="aviso.v26Conta"><b>Aviso de conta:</b> quando não dá para entrar ou criar a conta — ban, rede cheia, e-mail já usado, captcha… —, o jogo mostra num pop-up o <b>motivo</b> e o <b>botão que resolve</b>. E e-mail <b>novo</b> com <b>“+”</b> deixou de ser aceito (quem já tem conta com “+” continua entrando).</li>
            <li data-i18n-html="aviso.v26Xp"><b>Bônus de XP ao lado da Sessão:</b> uma faixa mostra o que está valendo agora (VIP, boosts, guild, Twitch, Kick…), com os que dá para ligar em cinza — toque nela para ver a conta, bônus a bônus. E o <b>filtro por TIPO</b> chegou ao Modo Economia, à Coleção e ao Venda Pokemons.</li>
            <li data-i18n-html="aviso.v26Ficha"><b>Pokedex e fichas:</b> a ficha da espécie ganhou as setas <b>◀&nbsp;▶</b> (e as teclas <b>←&nbsp;→</b>) para folhear de uma espécie à outra. Na ficha do pokemon, o <b>Poder no PvE</b> e o <b>Poder no PvP</b> aparecem lado a lado, o <b>“Capturado por”</b> vira link para o perfil de quem capturou e a evolução diz <b>“Precisa de Nv X/N”</b>.</li>
            <li data-i18n-html="aviso.v26Capturas"><b>Histórico de capturas:</b> cada captura virou um <b>cartão na cor da nota</b>, que dá para ordenar por nota, IV, potência, qualidade e nível (tocar de novo inverte). Os três primeiros ganham medalha, e a <b>maior nota da sessão</b> leva o troféu.</li>
            <li data-i18n-html="aviso.v26Oferenda"><b>Oferenda:</b> virou jogo — a <b>roleta</b> ganhou as pedras desenhadas nas fatias e lâmpadas no aro, a chance num medidor, as casas como pedestais e um giro com a agulha dando tranco e a pedra saltando do eixo.</li>
            <li data-i18n-html="aviso.v26Mais"><b>E mais:</b> a <b>Bless</b> saiu do jogo (agora a morte sempre custa 10% do XP do nível, e quem tinha uma ainda não usada recebeu os diamantes de volta); a <b>Troca de Nome</b> virou uma caixa do jogo; o <b>/guia</b> e o novo <b>/hunt</b> do chat levam à Extensão Oficial do PokeIdle, que ajuda a decidir os melhores lugares de farm; e o seu pokemon, o treinador e os selvagens vivos <b>aparecem atrás de parede e teto</b>.</li>
          </ul>
        </section>
      </section>

      <section class="novidade" data-aviso="25" hidden="">
        <section class="aviso-bikes aviso-oshy">
          <div class="ab-raios" aria-hidden="true"></div>
          <div class="ab-confete" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
          <span class="avs-heroi" aria-hidden="true"><span class="oshy-arte"><i class="oshy-halo"></i><i class="oshy-anel"></i><i class="oshy-faisca f1"></i><i class="oshy-faisca f2"></i><i class="oshy-faisca f3"></i><i class="oshy-faisca f4"></i><img src="/img/itens/ovo-shiny-puro.png" alt=""></span></span>
          <span class="ab-fita" data-i18n="aviso.v25Fita">De Unova em diante</span>
          <h3 class="ab-titulo" data-i18n="aviso.v25Titulo">OVO SHINY</h3>
          <div class="ab-bikes ab-tres">
            <div class="ab-bike rar-rara">
              <img src="/img/itens/fragmento-ovo-shiny.png" alt="">
              <b data-i18n="aviso.v25N1">Fragmento</b><span data-i18n="aviso.v25N1S">cai em Unova+</span>
            </div>
            <div class="ab-bike rar-mitica">
              <img src="/img/itens/ovo-shiny.png" alt="">
              <b data-i18n="aviso.v25N2">Ovo Shiny</b><span data-i18n="aviso.v25N2S">10 fragmentos</span>
            </div>
            <div class="ab-bike rar-lendaria">
              <span class="avs-faisca" aria-hidden="true"><svg viewBox="0 0 20 20" width="44" height="44"><path fill="currentColor" d="M10 0.8l2.1 6.4 6.6.3-5.2 4 1.8 6.4L10 14.1 4.7 17.9l1.8-6.4-5.2-4 6.6-.3z"></path></svg></span>
              <b data-i18n="aviso.v25N3">7 dias</b><span data-i18n="aviso.v25N3S">nasce sempre shiny</span>
            </div>
          </div>
          <p class="ab-sub" data-i18n-html="aviso.v25Sub">Um pokemon <b>shiny garantido</b> para quem sobe de nível: o <b>Fragmento de Ovo Shiny</b> cai em <b>toda hunt de Unova para frente</b>, e quanto mais alta a hunt, maior a chance.</p>
        </section>

        <p class="aviso-lendaria" data-i18n-html="aviso.v25Lendaria"><b>Feito para quem joga de verdade.</b> O fragmento só cai nas hunts de nível alto — Unova, Kalos e Alola — e <b>nunca na Outland</b>: o Ovo Shiny é de quem avança de região, não de quem fica parado sugando a Outland.</p>

        <section class="aviso-bloco">
          <h3 data-i18n="aviso.v25ComoTitulo">Como conseguir</h3>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v25Como1"><b>Cace de Unova para frente</b> (nível de hunt 5.000 ou mais, inclusive Kalos e Alola): cada abate pode soltar <b>1 Fragmento de Ovo Shiny</b>. A chance sobe a cada nível de hunt, e o <b>Loot Boost</b> multiplica.</li>
            <li data-i18n-html="aviso.v25Como2">Com <b>10 fragmentos</b>, vá ao <b>Professor Carvalho</b> (Centro Pokemon): a bancada nova <b>Fabricar Ovo Shiny</b> troca os 10 por <b>1 Ovo Shiny</b>.</li>
            <li data-i18n-html="aviso.v25Como3">Ponha o ovo numa <b>chocadeira</b>: em <b>7 dias</b> (126 h com o Absorb Bulb) nasce um pokemon <b>sempre shiny</b>. A Wiki tem a tabela com a chance de cada nível de hunt.</li>
          </ul>
        </section>

        <section class="aviso-bloco">
          <h3 data-i18n="aviso.v25NasceTitulo">Quem nasce do ovo</h3>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v25Nasce1">Uma espécie sorteada entre as que têm hunt no Mapa e forma shiny — as mesmas dos Mystery Eggs, todas com a mesma chance.</li>
            <li data-i18n-html="aviso.v25Nasce2"><b>Nunca nascem dele:</b> Lendários, Míticos, Megas e as variantes da Outland.</li>
            <li data-i18n-html="aviso.v25Nasce3">A potência gira na roleta de uma captura (P1 a P5), com os IVs de um shiny. Quando ele choca, o servidor inteiro vê: o aviso de shiny aparece na tela de todos e no chat, com o seu nome.</li>
          </ul>
        </section>

        <section class="aviso-bloco">
          <h3 data-i18n="aviso.v25MercadoTitulo">Dá para vender</h3>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v25Mercado1">O <b>fragmento</b> e o <b>Ovo Shiny inteiro</b> se negociam no <b>Mercado da Comunidade</b>: o fragmento na aba Fragmentos, o ovo numa aba própria.</li>
            <li data-i18n-html="aviso.v25Mercado2">O ovo vende enquanto está na mochila: depois que entra na chocadeira, ele já não é item.</li>
          </ul>
        </section>

        <section class="aviso-bloco">
          <h3 data-i18n="aviso.tambemTitulo">Também nesta atualização</h3>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v25Bandos"><b>De Unova em diante, spawns em bandos:</b> os selvagens nascem em grupos espalhados pelo mapa, toda hunt dali tem o mesmo ritmo, e a bicicleta rende o mesmo ganho em qualquer área.</li>
            <li data-i18n-html="aviso.v25Mapa"><b>Mapa e Pokedex:</b> o filtro <b>Pokedex</b> no Mapa (Todos · Capturados · Não capturados) e a contagem de capturados por geração nas abas da Pokedex (“Geração 1 99/151”), com ✓ na geração completa. No Exp. Share, a Coleção aparece antes do Depot.</li>
            <li data-i18n-html="aviso.v25Achados"><b>Achados por lugar:</b> a Sessão e o Modo Economia mostram só o que cai onde você está — shiny na hunt, Boss Token e fragmentos na Outland (lá não cai shiny), Mega, TM e ticket no boss e, de Unova para frente, o Fragmento de Ovo Shiny.</li>
            <li data-i18n-html="aviso.v25Recibo"><b>Mercado:</b> o pagamento de toda venda fica garantido, mesmo se o comprador se desfizer do pokemon antes de você recolher — e a venda continua nos históricos.</li>
            <li data-i18n-html="aviso.v25Time"><b>O time da guild:</b> o editor da escalação virou um palco, com o rosto de cada escalado, o ⚔ do time subindo a cada troca, <b>Os 10 mais fortes</b> num toque e as ordens por ⚔, nível e online.</li>
            <li data-i18n-html="aviso.v25Gp"><b>Guerra de Guilds:</b> o GP de cada guild é a própria nota, arredondada (65,5 → 65; 40,8 → 41), e GP igual no ranking do dia desempata pela colocação na guerra.</li>
            <li data-i18n-html="aviso.v25Tabela"><b>Tabela de preços → Pokemon:</b> busca pelo nome, os 18 selos de tipagem, <b>Só shiny</b>, <b>Apenas P5</b> e <b>Ordenar por</b> (valor, nota, IV, qualidade, potência e nível), sobre as vendas dos últimos 30 dias.</li>
            <li data-i18n-html="aviso.v25Eco"><b>Modo Economia:</b> o cabeçalho do painel ganhou <b>Ir para o Centro Pokemon</b> (com a espera de 3 s sem dano) e <b>Desistir do Combate</b> na hunt, e <b>Curar equipe</b> no Centro.</li>
            <li data-i18n-html="aviso.v25Cofre"><b>Modo Economia → Depot e Coleção:</b> busca pelo nome ou apelido, <b>Shiny</b> e o funil com potência, qualidade e o IV mínimo de cada stat; a <b>setinha dourada</b> do card manda o pokemon para a Coleção (ou de volta), e o <b>Vender todo o Depot</b> — com um filtro ligado, o <b>(Filtrado)</b>, que vende só o que a grade mostra.</li>
          </ul>
        </section>
      </section>

      <section class="novidade" data-aviso="24" hidden="">
        <section class="aviso-bikes aviso-gvg">
          <div class="ab-raios" aria-hidden="true"></div>
          <div class="ab-confete" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
          <span class="avw-espadas" aria-hidden="true"><svg viewBox="0 0 20 20" width="46" height="46"><path d="M3.2 3.2l9.6 9.6M16.8 3.2l-9.6 9.6" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"></path><path d="M10.7 15l4.3-4.3M5 10.7L9.3 15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"></path><path d="M14.4 15.6l2.4 2.4M5.6 15.6L3.2 18" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round"></path></svg></span>
          <span class="ab-fita" data-i18n="aviso.v24Fita">Guerra de Guilds</span>
          <h3 class="ab-titulo" data-i18n="aviso.v24Titulo">DE PÉ E NA BRIGA</h3>
          <div class="ab-bikes ab-tres">
            <div class="ab-bike rar-rara">
              <span class="avw-ico pe" aria-hidden="true"><svg viewBox="0 0 20 20" width="38" height="38"><path fill="currentColor" d="M10 1.6l7.2 2.8v5.2c0 4.4-3 7.6-7.2 8.9-4.2-1.3-7.2-4.5-7.2-8.9V4.4z"></path></svg></span>
              <b data-i18n="aviso.v24N1">60</b><span data-i18n="aviso.v24N1S">por ficar de pé</span>
            </div>
            <div class="ab-bike rar-mitica">
              <span class="avw-ico abate" aria-hidden="true"><svg viewBox="0 0 20 20" width="38" height="38"><path d="M3.2 3.2l9.6 9.6M16.8 3.2l-9.6 9.6" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"></path><path d="M10.7 15l4.3-4.3M5 10.7L9.3 15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"></path><path d="M14.4 15.6l2.4 2.4M5.6 15.6L3.2 18" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round"></path></svg></span>
              <b data-i18n="aviso.v24N2">40</b><span data-i18n="aviso.v24N2S">por abates</span>
            </div>
            <div class="ab-bike rar-lendaria">
              <img src="/assets/site/assets/ui/trofeu-1.png" alt="">
              <b data-i18n="aviso.v24N3">100</b><span data-i18n="aviso.v24N3S">a nota da guerra</span>
            </div>
          </div>
          <p class="ab-sub" data-i18n-html="aviso.v24Sub">A colocação da guerra agora é uma <b>nota de 0 a 100</b>: <b>60</b> são de ficar de pé — a última guild viva leva os 60 — e <b>40</b> são de briga: quantos pokemon inimigos a guild derrubou. Durar continua valendo mais, mas só se esconder não leva mais ninguém ao topo.</p>
        </section>

        <p class="aviso-lendaria" data-i18n-html="aviso.v24Lendaria">Nas 9 guerras de 26/09 a 05/10, recontadas com a nota, <b>a última guild de pé terminaria em 1º em todas</b> — e as guilds de 1 a 3 membros que chegavam ao top 20 só por durar caem de até 6 por guerra para até 4, quase sempre de 0 a 2.</p>

        <section class="aviso-bloco">
          <h3 data-i18n="aviso.v24ComoTitulo">Como a guerra pontua</h3>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v24Como1"><b>Sobrevivência — até 60:</b> 60 ÷ √ da posição em que a guild caiu, contando da última de pé. A última leva <b>60</b>; a 2ª, 42,4; a 3ª, 34,6; a 10ª, 19; a 20ª, 13,4. O peso está no topo: sobreviver à penúltima vale muito, e no meio da tabela quem decide é a briga.</li>
            <li data-i18n-html="aviso.v24Como2"><b>Combate — até 40:</b> um contador de pokemon inimigos derrubados pela guild — o abate de qualquer membro soma. A mesma conta: 40 ÷ √ da posição da guild nesse contador. A que mais derrubou leva <b>40</b>; a 2ª, 28,3; a 3ª, 23,1; a 10ª, 12,6. Quem não derrubou nenhum leva 0, e empate em abates divide a posição.</li>
            <li data-i18n-html="aviso.v24Como3">A <b>nota</b> é a soma das duas e decide a colocação; no empate, leva quem caiu por último. O <b>GP</b> que a guild leva é a própria nota, arredondada — até ,5 para baixo, acima de ,5 para cima: nota 65,5 dá <b>+65 GP</b>, 40,8 dá +41. O bônus do ranking de guild e a Temporada Global seguem iguais.</li>
            <li data-i18n-html="aviso.v24Como4">Ginásio, PvP Ranqueado e Campeonato não mudaram: nos duelos, vence quem fica de pé.</li>
          </ul>
        </section>

        <section class="aviso-bloco">
          <h3 data-i18n="aviso.v24AbaTitulo">A aba Guild do PvP, nova</h3>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v24Aba1">O <b>relógio</b> até a próxima guerra no <b>seu horário</b>, com a fase ao vivo (inscrições abertas, guerra rolando, resultado de hoje) e a inscrição da sua guild.</li>
            <li data-i18n-html="aviso.v24Aba2">O cartão <b>Sua guild na última guerra</b>: a colocação, a <b>nota</b> com as duas partes (sobrevivência e combate), a barra contra o 1º e quanto faltou para subir um degrau — em nota e, quando bastam, em abates.</li>
            <li data-i18n-html="aviso.v24Aba3">O <b>pódio</b> com os brasões, o placar com a barra da nota, o escudinho com a posição de sobrevivência e o botão <b>Minha guild</b>; parando o mouse na nota, a conta aparece. As inscritas viraram cartões com <b>busca</b>.</li>
          </ul>
        </section>

        <section class="aviso-bloco">
          <h3 data-i18n="aviso.v24AtrTitulo">Chegou depois? Boost dos Atrasados</h3>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v24Atr1"><b>XP ×10 (1000%)</b> no treinador e nos pokemon até o seu treinador alcançar o <b>nível-alvo</b>. Chegou lá, o boost acaba sozinho — e, enquanto dura, ele multiplica com XP Boost, VIP, o bônus da guild, eventos, Twitch e Kick, e <b>desmaiar ou desistir do combate não tira XP</b> do treinador.</li>
            <li data-i18n-html="aviso.v24Atr2">O alvo é a <b>mediana dos veteranos</b>: o nível do meio de quem jogou nos últimos 7 dias e tem conta há mais de 30. Ele é <b>recalculado todo dia</b> à meia-noite de Brasília (em 06/10, era o <b>nv 639</b>) — então quem chegar daqui a um ano vê o alvo daquele dia, e não um número congelado.</li>
            <li data-i18n-html="aviso.v24Atr3">O preço é proporcional ao <b>XP que falta</b>: o caminho inteiro, do nível 1 ao alvo, custa <b>1.000 💎</b>, e quem já andou uma parte paga só o resto (mínimo 50 💎). Com o alvo no 639: <b>nv 300 → 898 💎</b>, <b>nv 500 → 523 💎</b>, <b>nv 600 → 173 💎</b>.</li>
            <li data-i18n-html="aviso.v24Atr4">Em XP, e não em níveis, porque cada nível custa mais que o anterior: o nv 300 está na metade do caminho em níveis, mas só a 10% dele em XP — os últimos níveis antes do alvo são a maior parte da subida.</li>
            <li data-i18n-html="aviso.v24Atr5">Justo com quem já está lá: ninguém passa do alvo com ele, então a metade de cima dos veteranos continua na frente. O alvo fica <b>gravado na compra</b>; se a mediana subir depois, dá para comprar de novo e pagar só o pedaço novo. O card fica na <b>Loja de Diamantes</b> para todo mundo: quem já está no alvo vê sem compra, para acompanhar a mediana do servidor.</li>
          </ul>
        </section>

        <section class="aviso-bloco">
          <h3 data-i18n="aviso.v24TrintaTitulo">Boosts e pacotes de 30 dias</h3>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v24Trinta1">Todos os boosts e os três pacotes ganharam a duração de <b>30 dias</b>, com o dia <b>~14% mais barato</b> que o do de 7 dias.</li>
            <li data-i18n-html="aviso.v24Trinta2">XP Boost e XP Boost Pokemon <b>645 💎</b> · Loot, Capture e Shiny Secret Lure <b>1.290 💎</b> · Pacote Treinador <b>1.000 💎</b> (com Exp. Share) · Pacote Farmer e Pacote Shiny Hunter <b>2.000 💎</b>.</li>
          </ul>
        </section>

        <section class="aviso-bloco">
          <h3 data-i18n="aviso.v24RkTitulo">Prêmio do mês no Ranking</h3>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v24Rk1"><b>Top Treinadores, Top Catch, Top Coins e Top Bosses</b> pagam diamante todo dia 1º, às 00:00 de Brasília: <b>1º 100 💎</b>, do 2º ao 10º 50 💎, do 11º ao 100º 25 💎 — em cada placar. O primeiro fechamento é o de 1º de novembro.</li>
            <li data-i18n-html="aviso.v24Rk2">O <b>1º de cada placar</b> usa um <b>selo</b> no chat, entre a tag da guild e o nick — o Ash, a Poke Ball, a moeda ou a coroa de boss — enquanto for o 1º: passou alguém, o selo passa junto.</li>
            <li data-i18n-html="aviso.v24Rk3">A aba <b>Bosses</b> abre em <b>Todos</b>: a soma das vitórias em todos os bosses. É esse placar que leva o prêmio.</li>
          </ul>
        </section>

        <section class="aviso-bloco">
          <h3 data-i18n="aviso.tambemTitulo">Também nesta atualização</h3>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v24Chat"><b>Chat:</b> o painel do jogador (Responder, Ignorar, Ver perfil) abre só ao clicar no <b>nick</b>, e fecha no <b>×</b>, no <b>Esc</b> ou num clique fora.</li>
            <li data-i18n-html="aviso.v24Analise"><b>Análise da guerra:</b> a aba Guilds ganhou a coluna <b>Nota</b>, e o aviso do resultado e o chat dizem a nota da guild.</li>
          </ul>
        </section>
      </section>

      <section class="novidade" data-aviso="23" hidden="">
        <section class="aviso-bikes aviso-gboost">
          <div class="ab-raios" aria-hidden="true"></div>
          <div class="ab-confete" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
          <img class="avg-ico" src="/img/itens/boost-guild.png" width="48" height="48" alt="">
          <span class="ab-fita" data-i18n="aviso.v23Fita">Novo na sua Guild</span>
          <h3 class="ab-titulo" data-i18n="aviso.v23Titulo">BOOST DA GUILD</h3>
          <div class="ab-bikes ab-tres">
            <div class="ab-bike rar-rara">
              <img src="/assets/site/assets/loja/exp.png" alt="">
              <b data-i18n="aviso.v23N1">+10% XP</b><span data-i18n="aviso.v23N1S">do treinador</span>
            </div>
            <div class="ab-bike rar-mitica">
              <img src="/assets/site/assets/loja/boost.png" alt="">
              <b data-i18n="aviso.v23N2">+10% XP</b><span data-i18n="aviso.v23N2S">dos pokemon</span>
            </div>
            <div class="ab-bike rar-lendaria">
              <span class="ab-brasao" data-brasao="1" data-tam="54"></span>
              <b data-i18n="aviso.v23N3">Guild toda</b><span data-i18n="aviso.v23N3S">por 7 dias</span>
            </div>
          </div>
          <p class="ab-sub" data-i18n-html="aviso.v23Sub">Os membros enchem juntos o <b>banco da guild</b>: com <b>500 💎</b>, a <b>guild inteira</b> ganha <b>+10% de XP</b> do treinador e dos pokemon por <b>7 dias</b>.</p>
        </section>

        <p class="aviso-lendaria" data-i18n-html="aviso.v23Lendaria">Cada um doa o que puder — de <b>1 💎</b> até o que falta. Banco cheio com o boost ligado <b>soma mais 7 dias</b>, e o boost <b>multiplica</b> com VIP, XP Boost, o bônus do ranking, eventos, Twitch e Kick!</p>

        <section class="aviso-bloco">
          <h3 data-i18n="aviso.v23ComoTitulo">Como ativar</h3>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v23Como1">Abra a sua <b>Guild</b> e entre na aba nova <b>Boost</b>: lá fica o <b>banco da guild</b>. Escolha quanto doar (atalhos de 10 a 250, ou <b>Completar</b>) e confirme.</li>
            <li data-i18n-html="aviso.v23Como2">Quando o banco bate <b>500 💎</b>, o boost liga na hora para a guild inteira por <b>7 dias</b> e o banco <b>zera</b> para a próxima rodada. Quem completou ganha a festa, e o chat da guild avisa todo mundo.</li>
            <li data-i18n-html="aviso.v23Como3">A barra anda <b>ao vivo</b>: cada doação aparece no banco com quem doou, e a aba mostra os doadores e o histórico. O boost aparece com a <b>contagem regressiva</b> na ficha de cada membro, e no Quadro de guildas quem está com boost leva o selo <b>+10% XP</b>.</li>
            <li data-i18n-html="aviso.v23Como4">A doação é da <b>guild</b>: <b>não volta se você sair ou for expulso</b> — ela fica no banco para o próximo boost. Só volta se a guild for <b>apagada</b> antes de o banco encher; o que já virou boost não volta.</li>
          </ul>
        </section>

        <section class="aviso-bloco">
          <h3 data-i18n="aviso.v23DiaTitulo">Mercado de Diamantes: só os comprados</h3>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v23Dia1">Desde 03/10/2026, no Mercado só se vende diamante <b>comprado</b> (PIX ou cripto). O de <b>comissão de indicação</b> não vende mais — ele continua na sua conta, para gastar na Loja ou doar ao <b>banco da guild</b>.</li>
            <li data-i18n-html="aviso.v23Dia2">Os anúncios que tinham diamante de indicação <b>devolveram essa parte para a conta do dono</b>. Se o resto do lote era comprado, ele segue à venda, no mesmo preço.</li>
          </ul>
        </section>

        <section class="aviso-bloco">
          <h3 data-i18n="aviso.tambemTitulo">Também nesta atualização</h3>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v23Megas"><b>45 megas com moveset próprio</b>, feito para os tipos delas: a Mega Gyarados agora bate de DARK, e a Mega Ampharos ganhou um 600 de DRAGON. As evoluções do Eevee, Gengar, Scizor, Skarmory, Gardevoir e Chandelure estreiam lista de golpes nova, e a <b>Mega Aggron</b> virou STEEL/ROCK.</li>
            <li data-i18n-html="aviso.v23Twitch"><b>Bônus Twitch mais forte:</b> cada live oficial a mais aberta ao mesmo tempo agora soma <b>+2,5%</b> (era +1%) — duas lives dão 17,5% e três, 20%.</li>
            <li data-i18n-html="aviso.v23Estadia"><b>Mercado:</b> em Meus anúncios → Editar, <b>Aumentar a estadia</b> dá mais dias de feira ao pokemon anunciado, pela mesma diária, sem cancelar o anúncio — o preço, as estrelas dos Favoritos e as conversas ficam.</li>
            <li data-i18n-html="aviso.v23Voltar"><b>Voltar entre janelas:</b> toda janela aberta de dentro de outra ganha o <b>‹</b> ao lado do ×, que volta para a de antes na mesma aba, com os filtros e a rolagem de onde você estava.</li>
            <li data-i18n-html="aviso.v23Janela"><b>Selecionar texto não fecha mais a janela:</b> soltar o mouse fora dela, copiando da ficha por exemplo, deixa tudo aberto.</li>
            <li data-i18n-html="aviso.v23Radar"><b>Radar lendário no Discord:</b> o canal 🔮┃radar-lendario conta quem dropou um Mystic Ticket, quem entrou na Arena Mística e como terminou.</li>
            <li data-i18n-html="aviso.v23Moderador"><b>Chat:</b> os Moderadores também fixam mensagens no topo do canal.</li>
            <li data-i18n-html="aviso.v23Burmy"><b>Burmy e Wormadam</b> com a arte corrigida, no normal e no shiny.</li>
          </ul>
        </section>
      </section>

      <!-- v22 · O BÔNUS NA KICK (v1.204.0). A festa da 18 (o Bônus Twitch), no verde da Kick: o K
           da marca no alto e, no lugar da fileira de itens, as TRÊS recompensas que o jogo cria no
           canal de cada Streamer Oficial, na escada de raridade — azul 300, roxo 500, ouro 1.000
           pontos —, cada uma com o ícone do boost da Loja de mesmo nome. A faixa dourada diz a regra
           que mais importa (cada resgate é 1 h, e as horas se somam), o "Como ativar" diz que o
           vínculo é PARA SEMPRE antes de a pessoa clicar, e o convite de Streamer Parceiro vem no
           meio do slide, em verde (`.kk-tom`), como o da Twitch veio na 18. -->
      <section class="novidade" data-aviso="22" hidden="">
        <section class="aviso-bikes aviso-kick">
          <div class="ab-raios" aria-hidden="true"></div>
          <div class="ab-confete" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
          <span class="avk-logo" aria-hidden="true"><svg viewBox="0 0 24 24" width="44" height="44"><path fill="currentColor" d="M1.5 0h8v5.3h2.7V2.7h2.6V0h8v8h-2.6v2.7h-2.7v2.6h2.7V16h2.6v8h-8v-2.7h-2.6v-2.6H9.5V24h-8z"></path></svg></span>
          <span class="ab-fita" data-i18n="aviso.v22Fita">Streamers Oficiais na Kick</span>
          <h3 class="ab-titulo" data-i18n="aviso.v22Titulo">BÔNUS NA KICK</h3>
          <div class="ab-bikes ab-tres avk-recs">
            <div class="ab-bike rar-rara">
              <img src="/assets/site/assets/loja/exp.png" alt="">
              <b data-i18n="aviso.v22N1">+15% XP</b><span data-i18n="aviso.v22N1S">300 pontos</span>
            </div>
            <div class="ab-bike rar-mitica">
              <img src="/assets/site/assets/loja/catch.png" alt="">
              <b data-i18n="aviso.v22N2">+15% Capture Boost</b><span data-i18n="aviso.v22N2S">500 pontos</span>
            </div>
            <div class="ab-bike rar-lendaria">
              <img src="/assets/site/assets/loja/shinysecretlure.png" alt="">
              <b data-i18n="aviso.v22N3">+15% Secret Lure</b><span data-i18n="aviso.v22N3S">1.000 pontos</span>
            </div>
          </div>
          <p class="ab-sub" data-i18n-html="aviso.v22Sub">Assista às lives dos <b>Streamers Oficiais na Kick</b>, junte os <b>pontos do canal</b> e troque por <b>horas de bônus</b> no jogo: XP, captura e shiny.</p>
        </section>

        <p class="aviso-lendaria" data-i18n-html="aviso.v22Lendaria">Cada resgate vale <b>1 hora</b>, e as horas <b>se somam</b>: resgatou o mesmo bônus 3 vezes, são 3 horas. E ele multiplica com VIP, boosts, guild, eventos e o Bônus Twitch!</p>

        <section class="aviso-bloco">
          <h3 data-i18n="aviso.v22ComoTitulo">Como ativar</h3>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v22Como1">Na sua ficha de treinador, clique na linha verde <b>Bônus na Kick</b> e em <b>Vincular Kick</b>. Entre na Kick com a <b>sua conta principal</b> antes: o vínculo é <b>para sempre</b>, uma conta da Kick por treinador.</li>
            <li data-i18n-html="aviso.v22Como2">Assista às lives dos canais oficiais <b>logado na Kick</b>: a cada 5 minutos você ganha <b>10 pontos do canal</b> (assinante ganha 20). Quem está ao vivo aparece em verde no modal da Kick.</li>
            <li data-i18n-html="aviso.v22Como3">Na live, abra os <b>pontos do canal</b> e resgate o bônus que quiser. Em segundos ele aparece na sua ficha, com a <b>contagem regressiva</b>.</li>
            <li data-i18n-html="aviso.v22Como4">Resgatou sem ter vinculado? O resgate é recusado e a Kick <b>devolve os seus pontos</b>.</li>
          </ul>
        </section>

        <div class="tw-parceiro kk-tom">
          <span class="tw-parceiro-brilho" aria-hidden="true"></span>
          <div class="tw-parceiro-ico" aria-hidden="true">
            <svg class="kk-glifo" viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M1.5 0h8v5.3h2.7V2.7h2.6V0h8v8h-2.6v2.7h-2.7v2.6h2.7V16h2.6v8h-8v-2.7h-2.6v-2.6H9.5V24h-8z"></path></svg>
            <i class="tw-faisca f1">✦</i><i class="tw-faisca f2">✦</i><i class="tw-faisca f3">✦</i>
          </div>
          <div class="tw-parceiro-txt">
            <span class="tw-parceiro-selo">★ <span data-i18n="kick.parceiroSelo">Vagas abertas</span></span>
            <b data-i18n="kick.parceiroTitulo">Gostaria de ser Streamer Parceiro Oficial do PokeIdle na Kick?</b>
            <span data-i18n-html="aviso.v22Parceiro">Seu canal entra na lista oficial e os pontos dele viram <b>+15% de bônus</b> pra quem assistir. Chama a gente no Discord!</span>
          </div>
          <a class="tw-parceiro-btn" href="https://discord.gg/pokeidle" target="_blank" rel="noopener noreferrer">
            <img src="/img/social-discord.svg" width="20" height="20" alt="">
            <span>Discord</span>
          </a>
        </div>

        <section class="aviso-bloco">
          <h3 data-i18n="aviso.tambemTitulo">Também nesta atualização</h3>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v22Dialogos"><b>As confirmações viraram cena de jogo:</b> evoluir, Mega, refino, Mercado, Loja, guild, Casa e muito mais mostram o pokemon no palco, a seta com a pedra ou a moeda, os requisitos com ✓/✗ e o preço com o seu saldo antes e depois.</li>
            <li data-i18n-html="aviso.v22Mercado"><b>Mercado:</b> a barraca com a placa do preço, os atalhos <b>menor anúncio</b> e <b>média vendida</b> que preenchem o campo, o recibo da comissão e o preço curto nos cards (20M, 1,5B).</li>
            <li data-i18n-html="aviso.v22Shiny"><b>O seu shiny brilha:</b> na ficha, na Equipe e no Em campo, com um halo dourado que respira e duas faíscas.</li>
            <li data-i18n-html="aviso.v22Fixada"><b>Mensagem fixada no chat:</b> os avisos importantes da staff ficam presos no topo do canal, por cima da conversa — e dá para recolher.</li>
            <li data-i18n-html="aviso.v22Mimikyu"><b>O Mimikyu chegou!</b> Com arte, shiny e golpes próprios (Shadow Claw, Play Rough, Phantom Force e mais), numa hunt nova em <b>Alola</b>.</li>
            <li data-i18n-html="aviso.v22Ficha"><b>Na ficha do pokemon</b>, o nome da Mega e o da evolução viraram link para a Pokedex da espécie.</li>
          </ul>
        </section>
      </section>

      <!-- v21 · A COMISSÃO DO MERCADO DA COMUNIDADE, que caiu e virou FAIXA no pokemon
           (v1.195.0 e v1.196.0).

           O herói são os três degraus da faixa, nas molduras de raridade que o jogador já lê em
           tudo: 13% em azul, 10% em roxo e 7,5% em dourado — quanto maior a venda, mais alto o
           degrau e menor a taxa. É a leitura inteira da mudança numa olhada.

           O primeiro bloco explica a palavra que decide tudo: MARGINAL. Cada faixa vale só
           sobre a sua fatia, e é por isso que cobrar 1 gema a mais nunca pode render menos —
           era o degrau que faria a vitrine inteira encostar em 501 e 5.001. O segundo bloco diz,
           sem rodeio, o que SUBIU (Coins de 10% para 15%) e por quê: enquanto o Mercado cobrava
           menos que a transferência entre amigos, ele era um atalho de transferência, não uma
           feira. Dizer isso aqui é mais barato do que deixar o jogador descobrir na venda. -->
      <section class="novidade" data-aviso="21" hidden="">
        <section class="aviso-bikes">
          <div class="ab-raios" aria-hidden="true"></div>
          <div class="ab-confete" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
          <span class="ab-fita" data-i18n="aviso.v21Fita">Mercado da Comunidade</span>
          <h3 class="ab-titulo" data-i18n="aviso.v21Titulo">A COMISSÃO DO POKEMON CAIU</h3>
          <div class="ab-bikes ab-tres">
            <div class="ab-bike rar-rara">
              <img src="/img/moeda-gema.png" alt="">
              <b data-i18n="aviso.v21N1">13%</b><span data-i18n="aviso.v21N1S">até 500 gemas</span>
            </div>
            <div class="ab-bike rar-mitica">
              <img src="/img/moeda-gema.png" alt="">
              <b data-i18n="aviso.v21N2">10%</b><span data-i18n="aviso.v21N2S">de 501 a 5.000</span>
            </div>
            <div class="ab-bike rar-lendaria">
              <img src="/img/moeda-gema.png" alt="">
              <b data-i18n="aviso.v21N3">7,5%</b><span data-i18n="aviso.v21N3S">acima de 5.000</span>
            </div>
          </div>
          <p class="ab-sub" data-i18n-html="aviso.v21Sub">Vender pokemon em <b>gemas</b> era <b>15%</b> sempre. Agora a comissão é por <b>faixa</b>: quanto maior a venda, <b>menor a taxa</b> — e a venda grande, que é justamente a que fugia do jogo, passa a caber aqui dentro.</p>
        </section>

        <section class="aviso-bloco">
          <h3 data-i18n="aviso.v21FaixaTitulo">Como a faixa funciona</h3>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v21Faixa1">A taxa é <b>marginal</b>, como imposto de renda: cada faixa vale <b>só sobre a sua fatia</b>. Uma venda de 10.000 paga 13% sobre os primeiros 500, 10% sobre o pedaço seguinte e 7,5% só sobre o que passa de 5.000 — alíquota efetiva de <b>9,0%</b>, e não 7,5% sobre tudo.</li>
            <li data-i18n-html="aviso.v21Faixa2">Por isso <b>pedir 1 gema a mais nunca rende menos</b>. Com faixa cheia haveria um degrau em 501 e outro em 5.001, e a vitrine inteira encostaria neles. Aqui o preço maior sempre paga melhor.</li>
            <li data-i18n-html="aviso.v21Faixa3">Vale para o <b>POKEMON</b>, que é peça única: o anúncio inteiro é a venda. <b>Item e diamante</b> seguem em <b>15%</b> plano — eles se compram em lote, e um comprador poderia fatiar a compra só para prender o vendedor na faixa de cima.</li>
          </ul>
        </section>

        <section class="aviso-bloco">
          <h3 data-i18n="aviso.v21CoinsTitulo">E o que subiu: Coins, de 10% para 15%</h3>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v21Coins1">A transferência de Coins entre amigos sempre queimou <b>15%</b>. Enquanto o Mercado cobrava 10%, ele era o <b>atalho mais barato para mover ouro</b> — anunciar qualquer coisa por 1 milhão e o amigo comprar custava 100 mil, contra 150 mil pela porta da frente.</li>
            <li data-i18n-html="aviso.v21Coins2">Os dois números agora são o <b>mesmo</b>, e a escolha entre as duas vias volta a ser por conveniência. O ouro é impresso a cada abate e sofre de inflação — ali a comissão é <b>ralo</b>, e é ela que segura o preço de tudo o que você compra.</li>
          </ul>
        </section>

        <section class="aviso-bloco">
          <h3 data-i18n="aviso.v21BossTitulo">A Pokedex do Boss diz como capturar</h3>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v21Boss1">A ficha de <b>todo Boss</b> trocou o <b>"EM BREVE"</b> por um painel do <b>Mystic Ticket</b>: de onde o ticket cai, a chance de <b>sair justamente aquele</b> lendário, o nível dele na arena e a <b>tabela de captura por pokebola</b>.</li>
            <li data-i18n-html="aviso.v21Boss2">Vale para os <b>25 Bosses com arena</b> e para os <b>de evento</b> — e o <b>Victini</b>, que por um descuido nunca podia sair do ticket, entrou no sorteio.</li>
          </ul>
        </section>

        <section class="aviso-bloco">
          <h3 data-i18n="aviso.v21CdTitulo">A recarga dos golpes agora é do pokemon</h3>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v21Cd1">A recarga <b>só corre com o pokemon em campo</b>. Trocar <b>pausa</b> o que falta e guarda com ele; na volta, continua de onde parou. Trocar por tática (tipo contra tipo) <b>não custa nem rende</b> um décimo de segundo.</li>
            <li data-i18n-html="aviso.v21Cd2">Era possível soltar o golpe de assinatura de cinco pokemon seguidos e voltar ao primeiro com a recarga já vencida — <b>~40% de dano a mais</b> na hunt, e automatizável. Um jogador relatou no Discord: <b>obrigado</b>. A cura no Centro também parou de zerar a recarga; só as <b>arenas pagas</b> (Boss e Mística) zeram, que é o que elas sempre prometeram.</li>
          </ul>
        </section>

        <section class="aviso-bloco">
          <h3 data-i18n="aviso.tambemTitulo">Também nesta atualização</h3>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v21Amigos"><b>Adicionar amigo virou uma busca:</b> digite 3 letras do nick e veja os treinadores, cada um com <b>ver perfil</b>, <b>adicionar</b> e <b>bloquear</b> — sem precisar acertar o nome inteiro de primeira.</li>
            <li data-i18n-html="aviso.v21Fila"><b>A fila do PvP Ranqueado sobrevive ao deploy:</b> quem estava esperando volta para ela com <b>o tempo que já tinha</b>, em vez de ter de clicar de novo.</li>
            <li data-i18n-html="aviso.v21Vitrine"><b>Mercado:</b> a vitrine agrupada por espécie pode ser <b>desligada</b> num botão — quem gosta de varrer a feira inteira atrás de pechincha tem a lista de anúncios de volta.</li>
            <li data-i18n-html="aviso.v21Guild"><b>Guild:</b> o prêmio em diamantes do mês e o resultado da Guerra chegam a <b>todo mundo na hora</b>, em qualquer shard, e o mês passa a virar à <b>meia-noite de Brasília</b> — o mesmo relógio da temporada do PvP.</li>
            <li data-i18n-html="aviso.v21Selos"><b>Os selos de P, IV, Q e Nota</b> ganharam corpo de metal: do azul para cima eles brilham, e o dourado de P5 se lê de relance no meio de uma grade cheia.</li>
            <li data-i18n-html="aviso.v21Calc"><b>Calculadora:</b> além do potencial na evolução final, ela agora projeta a nota do seu pokemon <b>na Mega Evolução</b>.</li>
            <li data-i18n-html="aviso.v21Twitch"><b>Bônus Twitch:</b> o painel mostra <b>em quais lives você já está</b> e marca as que ainda rendem <b>+1%</b> de XP.</li>
            <li data-i18n-html="aviso.v21Revive"><b>Revive comum</b> levanta o pokemon com <b>10% do HP</b> (era metade da barra). O <b>Max Revive</b> continua levantando com tudo.</li>
          </ul>
        </section>
      </section>

      <section class="novidade" data-aviso="20" hidden="">
        <section class="aviso-bikes">
          <div class="ab-raios" aria-hidden="true"></div>
          <div class="ab-confete" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
          <span class="ab-fita" data-i18n="aviso.v20Fita">Bosses e Market NPC</span>
          <h3 class="ab-titulo" data-i18n="aviso.v20Titulo">MYSTIC TICKET E MYSTERY EGGS</h3>
          <div class="ab-bikes ab-tres ab-v20">
            <div class="ab-bike rar-lendaria">
              <img src="/img/itens/mystic-ticket.png" alt="">
              <b data-i18n="aviso.v20N1">Mystic Ticket</b><span data-i18n="aviso.v20N1S">Lendário Nv 100</span>
            </div>
            <div class="ab-bike rar-mitica">
              <span class="ab-par"><img src="/img/itens/ovo-p2.png" alt=""><img src="/img/itens/ovo-p3.png" alt=""><img src="/img/itens/ovo-p4.png" alt=""></span>
              <b data-i18n="aviso.v20N2">Mystery Eggs</b><span data-i18n="aviso.v20N2S">6, 12 ou 24 h</span>
            </div>
            <div class="ab-bike rar-rara">
              <img src="/img/itens/chocadeira.png" alt="">
              <b data-i18n="aviso.v20N3">Chocadeira</b><span data-i18n="aviso.v20N3S">choca até offline</span>
            </div>
          </div>
          <p class="ab-sub" data-i18n-html="aviso.v20Sub">Um <b>ticket raríssimo</b> dos Bosses abre a <b>Arena Mística</b> com um <b>Lendário ou Mítico nível 100</b> — e o Market NPC vende <b>ovos</b> que chocam um <b>pokemon surpresa</b> com a potência garantida.</p>
        </section>

        <section class="aviso-bloco">
          <h3 data-i18n="aviso.v20TicketTitulo">O Mystic Ticket</h3>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v20Ticket1">Cai da <b>vitória em qualquer Boss</b>: 0,0005% no primeiro nível e <b>+0,0005% a cada nível acima</b>. Aparece em Boss → Recompensas e é <b>negociável no Mercado</b> (aba Boss).</li>
            <li data-i18n-html="aviso.v20Ticket2">Use na <b>Mochila → Itens Raros</b>: você entra na <b>Arena Mística</b> contra 1 dos <b>42 Lendários ou Míticos</b>, nível 100. O ticket é gasto na entrada — se a equipe cair ou você sair, ele não volta.</li>
            <li data-i18n-html="aviso.v20Ticket3">Derrubou? Você tem <b>UMA bola</b>: 0,1% na Poke Ball até <b>0,5% na Beast Ball</b> (o dobro com <b>Capture Boost</b>). Capturou, o <b>chat Mundo inteiro</b> fica sabendo.</li>
          </ul>
        </section>

        <section class="aviso-bloco">
          <h3 data-i18n="aviso.v20OvosTitulo">Mystery Eggs e Chocadeira</h3>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v20Ovos1">No <b>Market NPC → Ovos</b>: <b>P2</b> por 20kk (choca em <b>6 h</b>), <b>P3</b> por 120kk (<b>12 h</b>) e <b>P4</b> por 250kk (<b>24 h</b>). O ovo é da sua conta — não vai ao Mercado.</li>
            <li data-i18n-html="aviso.v20Ovos2">Em <b>Mochila → Chocadeira</b>, ponha o ovo para chocar: o tempo conta <b>até com você offline</b>. Pode nascer <b>qualquer um dos 694 pokemon de hunt</b>, de qualquer região do Mapa — só não os da <b>Outland</b>, nem <b>Lendário</b>, <b>Mítico</b> ou <b>Mega</b> —, com <b>qualquer qualidade e qualquer IV</b> e a <b>potência</b> do ovo, direto na sua <b>Coleção</b>.</li>
            <li data-i18n-html="aviso.v20OvosShiny">E ele <b>pode vir shiny</b>, com a mesma chance de uma captura: <b>1 em 24.000</b> — ou <b>1 em 12.000</b> com o <b>Shiny Secret Lure</b> ligado.</li>
            <li data-i18n-html="aviso.v20Ovos3">Toda conta tem <b>1 chocadeira</b>; dá para ter até <b>6</b>, por <b>50 💎</b> cada na Loja.</li>
          </ul>
        </section>

        <section class="aviso-bloco">
          <h3 data-i18n="aviso.tambemTitulo">Também nesta atualização</h3>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v20Tag"><b>Tag IDLE do Discord:</b> coloque a tag <b>IDLE</b> do nosso servidor no seu perfil e ganhe <b>5 💎 na hora</b> — e mais <b>5 💎 a cada 10 dias seguidos</b> com ela. No canal <b>#reedem-codes</b>, o botão <b>Resgatar Recompensa de TAG</b> mostra o seu relógio e o código de vínculo — e o do convite agora se chama <b>Resgatar Recompensa de Referral</b>.</li>
            <li data-i18n-html="aviso.v20Trofeus"><b>Troféus de campeonato:</b> os 5 pokemon da equipe campeã ganham o <b>Troféu Mundial</b> na ficha (e ele vai junto numa venda), e o pódio ganha o troféu e as medalhas de 2º e 3º no perfil.</li>
            <li data-i18n-html="aviso.v20Favoritos"><b>Mercado da Comunidade:</b> o card de pokemon mostra <b>quantas pessoas favoritaram</b> o anúncio.</li>
            <li data-i18n-html="aviso.v20Mismagius"><b>Banshee Mismagius</b> (#2056) agora é só <b>GHOST</b>, como o Mismagius.</li>
          </ul>
        </section>
      </section>

      <section class="novidade" data-aviso="19" hidden="">
        <section class="aviso-bikes">
          <div class="ab-raios" aria-hidden="true"></div>
          <div class="ab-confete" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
          <span class="ab-fita" data-i18n="aviso.v19Fita">Professor Carvalho</span>
          <h3 class="ab-titulo" data-i18n="aviso.v19Titulo">CRAFT DE CASAS E BICICLETAS</h3>
          <div class="ab-bikes ab-tres">
            <div class="ab-bike rar-comum">
              <span class="ab-par"><img src="/img/itens/casa-comum.png" alt=""><img src="/img/itens/bicicleta-comum.png" alt=""></span>
              <b data-i18n="aviso.v19N1">5 Comuns</b><span data-i18n="aviso.v19N1S">viram 1 Incomum</span>
            </div>
            <div class="ab-bike rar-incomum">
              <span class="ab-par"><img src="/img/itens/casa-incomum.png" alt=""><img src="/img/itens/bicicleta-incomum.png" alt=""></span>
              <b data-i18n="aviso.v19N2">5 Incomuns</b><span data-i18n="aviso.v19N2S">viram 1 Rara</span>
            </div>
            <div class="ab-bike rar-rara">
              <span class="ab-par"><img src="/img/itens/casa-rara.png" alt=""><img src="/img/itens/bicicleta-rara.png" alt=""></span>
              <b data-i18n="aviso.v19N3">Rara</b><span data-i18n="aviso.v19N3S">o topo do craft</span>
            </div>
          </div>
          <p class="ab-sub" data-i18n-html="aviso.v19Sub">Junte <b>5 casas</b> ou <b>5 bicicletas</b> da mesma raridade e troque no <b>Professor Carvalho</b> por <b>1 da raridade seguinte</b>.</p>
        </section>

        <p class="aviso-lendaria" data-i18n-html="aviso.v19Lendaria">O craft vai <b>só até a Rara</b>: casa e bicicleta <b>Mítica</b> e <b>Lendária</b> continuam saindo apenas do sorteio com fragmentos.</p>

        <section class="aviso-bloco">
          <h3 data-i18n="aviso.v19ComoTitulo">Como craftar</h3>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v19Como1">No <b>Professor Carvalho</b>, abra <b>Fabricar Casa</b> e escolha <b>Craft de casas</b> — ou <b>Fabricar Bicicleta</b> e <b>Craft de bicicletas</b>. Nas duas estão as receitas <b>Comum → Incomum</b> e <b>Incomum → Rara</b>.</li>
            <li data-i18n-html="aviso.v19Como2">Escolha <b>quais 5</b> entram, pelo número — a casa em uso e a bicicleta equipada também servem (só não dá para usar a casa em que você está dentro, nem peça anunciada no Mercado).</li>
            <li data-i18n-html="aviso.v19Como3">As 5 somem e nasce <b>uma peça nova</b>, com número novo. Os pokemon que estavam no XP Share das casas voltam para a sua <b>Coleção ★</b>, e se a bicicleta equipada entrou no craft, a nova já sai <b>equipada</b>.</li>
          </ul>
        </section>

        <!-- A REGRA com banimento vai na moldura de regra (`aviso-regra`), fora da lista do "também":
             ela cobra algo de quem lê, e no meio de cinco novidades passaria como mais uma. -->
        <section class="aviso-bloco aviso-regra">
          <h3 data-i18n="aviso.v19RegraTitulo">Venda só pelo Mercado da Comunidade</h3>
          <p data-i18n-html="aviso.v19Regra">É <b>estritamente proibido vender contas ou pokemon por fora do Mercado da Comunidade</b>, e isso é passível de <b>banimento</b> ao ser identificado. O motivo é simples: não conseguimos ajudar pessoas que são lesadas ou sofrem golpes nessas transações externas, e isso pode ser prejudicial para o nosso jogo, já que a nossa principal preocupação é a <b>proteção dos nossos jogadores</b>.</p>
        </section>

        <section class="aviso-bloco">
          <h3 data-i18n="aviso.tambemTitulo">Também nesta atualização</h3>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v19Boss"><b>Boss automático:</b> as telas de drop não somem mais sozinhas — elas <b>empilham</b> até você voltar, um botão fecha todas de uma vez, e quando a repetição termina aparece o <b>resumo da série</b> com tudo o que caiu.</li>
            <li data-i18n-html="aviso.v19Golpes"><b>Golpes novos</b> para <b>Electivire, Lucario, Mr. Mime, Drifblim e Camerupt</b>: 11 golpes cada, com os dois de 600 — e o Mega Lucario e o Mega Camerupt herdam a lista nova.</li>
            <li data-i18n-html="aviso.v19Tracker"><b>Tracker</b> (pokeidle.io/tracker): o <b>combate turno a turno</b> de cada partida, o <b>ranking de cada temporada</b> com o top da semana passada, o rank com que cada treinador fechou a temporada e as <b>últimas 20 partidas</b> de cada um na temporada atual e na passada.</li>
          </ul>
        </section>
      </section>

      <!-- O BÔNUS TWITCH (v1.176.0). A festa de sempre no topo (raios e confete), com os TRÊS passos
           no lugar da fileira de itens — vincular, assistir, ganhar —, o terceiro dourado porque é o
           prêmio. No meio do slide vai o MESMO convite de Streamer Parceiro do modal da Twitch
           (`.tw-parceiro`, com o botão do Discord): o público dele, quem faz live, está lendo aqui. -->
      <section class="novidade" data-aviso="18" hidden="">
        <section class="aviso-bikes aviso-twitch">
          <div class="ab-raios" aria-hidden="true"></div>
          <div class="ab-confete" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
          <span class="ab-fita" data-i18n="aviso.v18Fita">Streamers Oficiais</span>
          <h3 class="ab-titulo" data-i18n="aviso.v18Titulo">BÔNUS TWITCH</h3>
          <div class="ab-bikes ab-tres">
            <div class="ab-bike rar-mitica">
              <span class="avt-ico" aria-hidden="true"><svg viewBox="0 0 24 24"><path fill="currentColor" d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"></path></svg></span>
              <b data-i18n="aviso.v18N1">Vincule</b><span data-i18n="aviso.v18N1S">sua Twitch no jogo</span>
            </div>
            <div class="ab-bike avt-verde">
              <span class="avt-ico avt-live" aria-hidden="true"><i class="tw-verde"></i>LIVE</span>
              <b data-i18n="aviso.v18N2">Assista</b><span data-i18n="aviso.v18N2S">um streamer oficial</span>
            </div>
            <div class="ab-bike rar-lendaria">
              <span class="avt-ico avt-pct" aria-hidden="true">+15%</span>
              <b data-i18n="aviso.v18N3">Ganhe</b><span data-i18n="aviso.v18N3S">+15% de XP</span>
            </div>
          </div>
          <p class="ab-sub" data-i18n-html="aviso.v18Sub">Assista à live de um <b>Streamer Oficial do Pokeidle</b> e ganhe <b>+15% de XP Treinador e XP Pokemon</b> enquanto estiver lá.</p>
        </section>

        <p class="aviso-lendaria" data-i18n-html="aviso.v18Lendaria">Seu farm rende mais enquanto você assiste! O bônus soma com VIP, boosts, guild e eventos — é mais um multiplicador em cima de tudo.</p>

        <section class="aviso-bloco">
          <h3 data-i18n="aviso.v18ComoTitulo">Como ativar</h3>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v18Como1">Na sua ficha de treinador, junto dos seus bônus, clique em <b>Conectar Twitch</b> e depois em <b>Vincular Twitch</b> — é só autorizar com a sua conta da Twitch.</li>
            <li data-i18n-html="aviso.v18Como2">Abra a live de <b>qualquer canal da lista de Streamers Oficiais</b> (quem está <b>ao vivo</b> aparece em verde, com o número de espectadores) e assista <b>logado</b> na Twitch.</li>
            <li data-i18n-html="aviso.v18Como3">Em <b>alguns minutos</b> o bônus liga sozinho e a linha da Twitch na sua ficha acende: <b>+15% XP</b> enquanto você estiver na live.</li>
          </ul>
        </section>

        <div class="tw-parceiro">
          <span class="tw-parceiro-brilho" aria-hidden="true"></span>
          <div class="tw-parceiro-ico" aria-hidden="true">
            <svg class="tw-glifo" viewBox="0 0 24 24"><path fill="currentColor" d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"></path></svg>
            <i class="tw-faisca f1">✦</i><i class="tw-faisca f2">✦</i><i class="tw-faisca f3">✦</i>
          </div>
          <div class="tw-parceiro-txt">
            <span class="tw-parceiro-selo">★ <span data-i18n="twitch.parceiroSelo">Vagas abertas</span></span>
            <b data-i18n="twitch.parceiroTitulo">Gostaria de ser Streamer Parceiro Oficial do Pokeidle?</b>
            <span data-i18n-html="aviso.v18Parceiro">Sua live entra na lista oficial e dá <b>+15% de XP</b> pra quem assistir. Chama a gente no Discord!</span>
          </div>
          <a class="tw-parceiro-btn" href="https://discord.gg/pokeidle" target="_blank" rel="noopener noreferrer">
            <img src="/img/social-discord.svg" width="20" height="20" alt="">
            <span>Discord</span>
          </a>
        </div>

        <section class="aviso-bloco">
          <h3 data-i18n="aviso.tambemTitulo">Também nesta atualização</h3>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v18Shiny"><b>Shiny para quase todas as espécies!</b> Chegaram <b>117 formas shiny novas</b> — Articuno, Zapdos, Moltres, Mewtwo, Mew e muito mais: agora são <b>737 espécies da Pokedex</b> com versão shiny.</li>
            <li data-i18n-html="aviso.v18Historico">No <b>PvP Ranqueado</b>, clique numa partida do seu histórico para ver a equipe e o resumo da luta.</li>
          </ul>
        </section>
      </section>

      <section class="novidade" data-aviso="17" hidden="">
        <section class="aviso-bikes">
          <div class="ab-raios" aria-hidden="true"></div>
          <span class="ab-fita" data-i18n="aviso.v17Fita">PvP Ranqueado</span>
          <h3 class="ab-titulo" data-i18n="aviso.v17Titulo">ESCALAÇÃO SECRETA</h3>
          <div class="ab-bikes ab-duas">
            <div class="ab-bike rar-mitica">
              <img class="liso" src="/img/ranks/challenger.webp" alt="">
              <b data-i18n="aviso.v17N1">5 pokemon</b><span data-i18n="aviso.v17N1S">o time continua à vista</span>
            </div>
            <div class="ab-bike rar-lendaria">
              <img src="/img/menu-pvp.png" alt="">
              <b data-i18n="aviso.v17N2">? ? ?</b><span data-i18n="aviso.v17N2S">a ordem de entrada é só sua</span>
            </div>
          </div>
          <p class="ab-sub" data-i18n-html="aviso.v17Sub">Quem abre a sua ficha vê <b>quais</b> pokemon você leva — mas não <b>em que ordem</b> eles entram na luta.</p>
        </section>

        <p class="aviso-lendaria" data-i18n-html="aviso.v17Lendaria">Acabou o counter feito sob medida. No topo da escada a fila tem pouca gente, e dava para abrir a ficha de quem estava buscando partida, montar a resposta exata para a escalação dele e cair contra ele logo em seguida — quem ia atrás da luta saía perdendo. Agora a <b>composição</b> continua à vista para você estudar o adversário, mas a <b>ordem de entrada</b> só o dono vê.</p>

        <section class="aviso-bloco">
          <h3 data-i18n="aviso.v17OndeTitulo">O que mudou</h3>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v17Onde1">Na <b>ficha</b> de outro treinador, a Equipe de PvP aparece na ordem da Pokedex, com o aviso <b>ordem de entrada oculta</b>.</li>
            <li data-i18n-html="aviso.v17Onde2">No <b>Tracker</b> (pokeidle.io/tracker), os times das últimas partidas também saem na ordem da Pokedex.</li>
            <li data-i18n-html="aviso.v17Onde3">A <b>sua</b> ordem continua do jeito que você montou: você vê e edita normalmente no PvP Ranqueado, e a luta segue a ordem que você escolheu.</li>
          </ul>
        </section>

        <section class="aviso-bloco">
          <h3 data-i18n="aviso.tambemTitulo">Também nesta atualização</h3>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v17Diamantes">Diamantes mais baratos em volume: pacotes novos de <b>1.000 por R$ 360</b> (−18%) e <b>2.000 por R$ 680</b> (−23%).</li>
            <li data-i18n-html="aviso.v17Tracker">O <b>Tracker</b> ganhou o filtro de <b>rank</b>: veja o meta do Low elo (Bronze a Platina), do High elo (Diamante+) ou de cada tier.</li>
            <li data-i18n-html="aviso.v17Professor">O <b>Professor Carvalho</b> pergunta antes de gastar: Casa, Bike, Shiny Stone, Mega Stone e discos mostram o que sai e o que entra antes de você confirmar.</li>
            <li data-i18n-html="aviso.v17Mega">Ao <b>Mega Evoluir</b>, o pokemon vai para a sua <b>Coleção</b>.</li>
            <li data-i18n-html="aviso.v17Guia">O <b>/guia</b> no chat agora leva ao novo guia da comunidade.</li>
          </ul>
        </section>

        <!-- A correção do "reset" da hunt, no fim e com a moldura de regra (`aviso-regra`): não é
             novidade para comemorar, é a explicação de por que a troca de área passou a esperar
             10 s — quem esbarrar no aviso precisa achar o porquê aqui. -->
        <section class="aviso-bloco aviso-regra">
          <h3 data-i18n="aviso.v17CorrecaoTitulo">Correção: o "reset" da hunt</h3>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v17Correcao1">Sair e entrar de novo na <b>mesma área</b> logo depois de limpar a onda dava uma onda cheia na hora, com o herói já no meio dela — sem esperar o respawn nem andar até o último selvagem. Alguns jogadores (e bots) usavam isso para ganhar XP a mais.</li>
            <li data-i18n-html="aviso.v17Correcao2">Agora, depois de entrar numa área pelo Mapa, só dá para escolher outra (ou a mesma) <b>10 s</b> depois. E quem chega numa área até 10 s depois de trocar dano — inclusive vindo do Centro — a encontra vazia até completar os 10 s. A onda normal volta em menos de 3 s, então sair e entrar nunca compensa.</li>
          </ul>
        </section>
      </section>

      <section class="novidade" data-aviso="16" hidden="">
        <!-- `width`/`height` são o tamanho de EXIBIÇÃO (570×314), e não o do arquivo
             (1200×660). É de propósito, e é o que impede o acidente: o `estilo.css` é servido
             com `max-age=3600`, então na hora do deploy existe uma janela em que o navegador
             ainda tem a folha velha — e sem a regra `.aviso-arte` a imagem cairia no tamanho
             natural, estouraria a caixa do modal e levaria o slide inteiro junto. Com o
             atributo certo ela já nasce no tamanho final, e o CSS só confirma. O arquivo é
             ~2× disso para não borrar em tela de alta densidade.

             A fonte é `divulgacao/redes-sociais.html` — a arte é montada com o material do
             jogo, e não desenhada à parte. Para regerar, ver o LEIA-ME de lá.

             O `src` vai por i18n (mesmo esquema do pop-up do Discord): o texto está DENTRO da
             imagem, então trocar só o `alt` deixaria o jogador de inglês olhando um cartaz em
             português. São três arquivos, saídos do mesmo HTML com `?lang=`. -->
        <div class="aviso-arte">
          <img src="/img/novidade-redes.png" width="570" height="314" decoding="async" data-i18n-attr="src:aviso.v15Arte;alt:aviso.v15Alt" alt="Arte da campanha: as duas redes do PokeIdle — @pixelidlebr no Instagram, com até 20 diamantes, e @pokeidleio no X.">
        </div>

        <!-- Os dois botões lado a lado, cada um nas cores da sua rede. É a única parte do modal
             que foge da paleta do jogo, e foge de propósito: o que faz alguém reconhecer o
             destino antes de ler o rótulo é o gradiente do Instagram e o preto do X. Num
             botão roxo de madeira os dois seriam o mesmo botão com texto diferente. -->
        <!-- Os glifos são SVG INLINE, e não PNG: eles vivem a 20 px dentro de um botão, e a
             esse tamanho o sprite pixelado da arte (feito para 96 px) vira sujeira. Inline
             também evita dois arquivos novos que envelheceriam sozinhos — há precedente no
             `icon-config.svg`. `currentColor` deixa o glifo herdar a cor do rótulo. -->
        <div class="aviso-ctas">
          <a class="aviso-cta cta-ig" href="https://www.instagram.com/p/DdpJUlCmb39/" target="_blank" rel="noopener noreferrer">
            <svg class="cta-glifo" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <rect x="2.6" y="2.6" width="18.8" height="18.8" rx="5.4" fill="none" stroke="currentColor" stroke-width="2.2"></rect>
              <circle cx="12" cy="12" r="4.6" fill="none" stroke="currentColor" stroke-width="2.2"></circle>
              <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"></circle>
            </svg>
            <span data-i18n="aviso.v15CtaIg">SEGUIR NO INSTAGRAM</span>
          </a>
          <a class="aviso-cta cta-x" href="https://x.com/pokeidleio/status/2102854466152038575" target="_blank" rel="noopener noreferrer">
            <svg class="cta-glifo" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path fill="currentColor" d="M18.2 2.2h3.3l-7.2 8.3 8.5 11.3h-6.7l-5.2-6.9-6 6.9H1.6l7.7-8.8L1.2 2.2H8l4.7 6.3 5.5-6.3Zm-1.2 17.7h1.8L7.1 4H5.2l11.8 15.9Z"></path>
            </svg>
            <span data-i18n="aviso.v15CtaX">SEGUIR NO X</span>
          </a>
        </div>
        <p class="aviso-nota-redes" data-i18n-html="aviso.v15NotaX">Os diamantes são da campanha do <b>Instagram</b>. O <b>X</b> é onde saem manutenção, evento e atualização em primeira mão — seguir lá não pede nada em troca.</p>

        <p class="aviso-lendaria" data-i18n-html="aviso.v15Lendaria">A <b>campanha da comunidade</b> está no ar: siga o PokeIdle no Instagram, comente no post e resgate <b>até 20 💎</b>. Quanto mais gente na comunidade, mais evento, mais movimento no Mercado e mais jogo para todo mundo.<span class="aviso-prazo">⚠️ SOMENTE ATÉ 27/09/2026 23:59 ⚠️</span></p>

        <section class="aviso-bloco ab-passos">
          <h3 data-i18n="aviso.v15ComoTitulo">Como participar</h3>
          <div class="ab-passo">
            <span class="ab-passo-ico ab-passo-emoji" aria-hidden="true">📸</span>
            <div><h4 data-i18n="aviso.v15Passo1T">Siga o perfil</h4><p data-i18n-html="aviso.v15Passo1">O botão acima abre o <b>post da campanha</b> no Instagram. Seguir o perfil é o que vale.</p></div>
          </div>
          <div class="ab-passo">
            <span class="ab-passo-ico ab-passo-emoji" aria-hidden="true">💬</span>
            <div><h4 data-i18n="aviso.v15Passo2T">Comente no post</h4><p data-i18n-html="aviso.v15Passo2">Seguir conta, e <b>comentar também</b> — o resgate pede as duas coisas. É o comentário que faz o post circular para quem ainda não conhece o jogo.</p></div>
          </div>
          <div class="ab-passo">
            <span class="ab-passo-ico ab-passo-emoji" aria-hidden="true">🎫</span>
            <div><h4 data-i18n="aviso.v15Passo3T">Abra um ticket no Discord</h4><p data-i18n-html="aviso.v15Passo3">O resgate é por <b>ticket no nosso Discord</b>: comprove que seguiu e comentou, com o seu <b>nick in-game</b> junto, e leve <b>até 20 💎</b>.</p></div>
          </div>
          <!-- O botão do resgate mora DENTRO do bloco de passos, e não junto dos dois CTAs lá
               em cima. São coisas diferentes: os de cima levam às redes, este é o passo 3
               acontecendo. Ao lado dos outros viraria um terceiro botão de marca disputando o
               mesmo clique — e o resgate só faz sentido DEPOIS dos dois primeiros passos.
               Por isso também é mais baixo que eles. -->
          <a class="aviso-resgate" href="https://discord.gg/pokeidle" target="_blank" rel="noopener noreferrer" data-i18n="aviso.v15Resgate">ABRIR TICKET NO DISCORD</a>
        </section>

        <section class="aviso-bloco">
          <h3 data-i18n="aviso.v15GuildTitulo">A Guerra de Guilds paga mais fundo</h3>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v15Guild1">O <b>bônus do dia</b> não morre mais no 3º lugar: ele desce de um em um, <b>+10% no 1º até +2% no 9º</b>, e do 10º em diante fica o +1% de sempre.</li>
            <li data-i18n-html="aviso.v15Guild2">A <b>Temporada Global</b> deixa de premiar só o pódio: agora paga as <b>8 primeiras</b> — 100, 50, 35, 25, 20, 15, 10 e 5 💎.</li>
            <li data-i18n-html="aviso.v15Guild3">Nos dois casos quem recebe é <b>quem está escalado</b> para a guerra, e não a guild inteira. Continua sendo assim.</li>
          </ul>
        </section>

        <section class="aviso-bloco">
          <h3 data-i18n="aviso.tambemTitulo">Também nesta atualização</h3>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v15Medalha"><b>Medalha de Guerra:</b> o pokemon que foi destaque de dano da Guerra de Guilds carrega isso para sempre — na ficha e numa cápsula dourada no Mercado da Comunidade. A medalha vai junto quando ele troca de dono.</li>
            <li data-i18n-html="aviso.v15Pacote"><b>Pacote Treinador</b> na Loja: XP Boost + XP Boost Pokemon por 24h (50 💎) ou por 7 dias com <b>1x Exp. Share de brinde</b> (300 💎, de 400).</li>
            <li data-i18n-html="aviso.v15Tracker">O <b>Tracker</b> (pokeidle.io/tracker) foi repaginado: superfície escura no lugar da tábua, e cor só onde ela quer dizer alguma coisa. Os selos de tipo voltaram a sair coloridos.</li>
            <li data-i18n-html="aviso.v15Wiki">Na <b>Pokepedia</b>, o capítulo de Combate passa a dizer que a <b>Investida é física</b> (usa Ataque contra Defesa), que ela sempre leva o STAB ×1,5 e que em pokemon de dois tipos ela tenta o primeiro.</li>
          </ul>
        </section>
      </section>

      <section class="novidade" data-aviso="15" hidden="">
        <section class="aviso-bikes">
          <div class="ab-raios" aria-hidden="true"></div>
          <div class="ab-confete" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
          <span class="ab-fita" data-i18n="aviso.v16Fita">Novo na Loja</span>
          <h3 class="ab-titulo" data-i18n="aviso.v16Titulo">NAME TAG</h3>
          <div class="ab-bikes ab-duas">
            <div class="ab-bike rar-lendaria">
              <img src="/img/itens/name-tag.png" alt="">
              <b data-i18n="aviso.v16N1">15 💎</b><span data-i18n="aviso.v16N1S">por etiqueta, uso único</span>
            </div>
            <div class="ab-bike rar-mitica">
              <img src="/img/itens/cosmeticos.png" alt="">
              <b data-i18n="aviso.v16N2">16</b><span data-i18n="aviso.v16N2S">letras no nome</span>
            </div>
          </div>
          <p class="ab-sub" data-i18n-html="aviso.v16Sub">Dê um <b>nome</b> ao seu pokemon. É só aparência — e é para sempre.</p>
        </section>

        <p class="aviso-lendaria" data-i18n-html="aviso.v16Lendaria">Chegou a <b>Name Tag</b>: uma etiqueta que troca o nome do seu pokemon por um que você escolhe. O Charizard continua Charizard em tudo o que importa — espécie, stats, evolução, combate —, mas passa a se chamar <b>Brasa</b> na ficha, no campo, no chat e no Mercado da Comunidade.</p>

        <section class="aviso-bloco ab-passos">
          <h3 data-i18n="aviso.v16ComoTitulo">Como usar</h3>
          <div class="ab-passo">
            <span class="ab-passo-ico"><img src="/img/itens/cosmeticos.png" alt=""></span>
            <div><h4 data-i18n="aviso.v16Passo1T">Compre na Loja</h4><p data-i18n-html="aviso.v16Passo1">Ela está na seção <b>Cosméticos</b>, nova na Loja de diamantes, por <b>15 💎</b>. Comprada, ela espera na mochila — você não precisa decidir em quem gastar na hora.</p></div>
          </div>
          <div class="ab-passo">
            <span class="ab-passo-ico"><img src="/img/itens/name-tag.png" alt=""></span>
            <div><h4 data-i18n="aviso.v16Passo2T">Escolha o pokemon</h4><p data-i18n-html="aviso.v16Passo2">Mochila → <b>Itens Raros</b> → Name Tag. A folha mostra a sua equipe, o Depot e a Coleção, como a do Exp. Share — clique em quem merece um nome.</p></div>
          </div>
          <div class="ab-passo">
            <span class="ab-passo-ico ab-passo-emoji" aria-hidden="true">✨</span>
            <div><h4 data-i18n="aviso.v16Passo3T">Escreva e confirme</h4><p data-i18n-html="aviso.v16Passo3">Até <b>16 letras</b>, com acento, espaço e pontuação simples. A etiqueta some ao confirmar; o nome fica.</p></div>
          </div>
        </section>

        <section class="aviso-bloco">
          <h3 data-i18n="aviso.v16OndeTitulo">Onde o nome aparece</h3>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v16Onde1">Na <b>ficha</b> do pokemon, com a espécie logo abaixo — quem abre a ficha continua vendo o que ele é.</li>
            <li data-i18n-html="aviso.v16Onde2">Em <b>campo</b>, na plaquinha em cima do sprite, e na praça do Centro Pokemon, onde todo mundo vê.</li>
            <li data-i18n-html="aviso.v16Onde3">No <b>chat</b>, quando você compartilha o pokemon, e na <b>equipe</b>, no Depot e na Coleção.</li>
            <li data-i18n-html="aviso.v16Onde4">No <b>Mercado da Comunidade</b> — e ele vai junto quando o pokemon troca de dono.</li>
          </ul>
        </section>

        <section class="aviso-bloco aviso-regra">
          <h3 data-i18n="aviso.v16RegraTitulo">As regras, sem letra miúda</h3>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v16Regra1">É <b>só aparência</b>. Espécie, stats, tipo, evolução e Pokedex não mudam em nada, e o combate não lê o apelido.</li>
            <li data-i18n-html="aviso.v16Regra2"><b>Uso único.</b> Uma etiqueta, um nome. Trocar de novo custa outra etiqueta — e o nome antigo fica registrado.</li>
            <li data-i18n-html="aviso.v16Regra3">Na <b>arena de PvP</b> o seu adversário continua vendo a espécie do seu pokemon. Saber contra o que se luta é informação de jogo, e a etiqueta não mexe nisso.</li>
            <li data-i18n-html="aviso.v16Regra4">Se o nome contiver <b>racismo, preconceito ou qualquer forma de ofensa</b>, o pokemon poderá ser excluído sem aviso prévio e o jogador banido. Toda troca de nome fica registrada.</li>
          </ul>
        </section>
      </section>

      <section class="novidade" data-aviso="14" hidden="">
        <section class="aviso-bikes">
          <div class="ab-raios" aria-hidden="true"></div>
          <div class="ab-confete" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
          <span class="ab-fita" data-i18n="aviso.v14Fita">Mudou no PokeIdle</span>
          <h3 class="ab-titulo" data-i18n="aviso.v14Titulo">GUILD SEM LIMITE</h3>
          <!-- Brasões de verdade, e não um ícone genérico de "grupo": o brasão é a cara da guild
               dentro do jogo, e é ele que o jogador reconhece na barra do treinador. Quem os
               desenha é o `pintarBrasoesDaNovidade` no app.js — são SVG montados pelo
               `guild-crest.mjs`, não PNG. -->
          <div class="ab-bikes ab-duas aviso-brasoes">
            <div class="ab-bike rar-comum"><span class="ab-brasao" data-brasao="0" data-tam="34"></span><b data-i18n="aviso.v14N1">∞</b><span data-i18n="aviso.v14N1S">membros na guild</span></div>
            <div class="ab-bike rar-lendaria"><span class="ab-brasao" data-brasao="1" data-tam="54"></span><b data-i18n="aviso.v14N2">10</b><span data-i18n="aviso.v14N2S">escalados para a guerra</span></div>
          </div>
          <p class="ab-sub" data-i18n-html="aviso.v14Sub">A guild <b>não tem mais teto de gente</b>: chame quantos jogadores quiser. Quem vai à <b>Guerra de Guilds</b> é o <b>TIME</b> — <b>10 jogadores escolhidos pelo dono</b>.</p>
        </section>

        <p class="aviso-lendaria" data-i18n-html="aviso.v14Lendaria">Antes a guild parava em <b>6 membros</b>, e quem queria jogar com vinte amigos abria quatro guilds. Agora é uma só, do tamanho que você quiser — e a arena continua sendo <b>10 contra 10</b>, porque a guerra mede TIME, e não lista de convites.</p>

        <section class="aviso-bloco ab-passos">
          <h3 data-i18n="aviso.v14ComoTitulo">Como funciona agora</h3>
          <div class="ab-passo">
            <span class="ab-passo-ico ab-passo-emoji" aria-hidden="true">👥</span>
            <div><h4 data-i18n="aviso.v14Passo1T">1. Convide quem quiser</h4><p data-i18n-html="aviso.v14Passo1">Sem limite. Todo mundo entra na guild, no chat da guild e no ranking — e o convite continua sendo por nick, na aba <b>Membros</b>.</p></div>
          </div>
          <div class="ab-passo">
            <span class="ab-passo-ico"><img src="/img/menu-pvp.png" alt=""></span>
            <div><h4 data-i18n="aviso.v14Passo2T">2. O dono escala 10</h4><p data-i18n-html="aviso.v14Passo2">Em <b>Guild → Time da Guild</b>, o dono marca os <b>10</b> que vão lutar. Guild com <b>10 membros ou menos já está toda escalada</b> — não há nada a escolher. Vaga que sobrar é preenchida sozinha pelo membro mais antigo que estiver de fora.</p></div>
          </div>
          <div class="ab-passo">
            <span class="ab-passo-ico ab-passo-emoji" aria-hidden="true">🏆</span>
            <div><h4 data-i18n="aviso.v14Passo3T">3. Só os 10 recebem</h4><p data-i18n-html="aviso.v14Passo3">Os escalados lutam a guerra, levam o <b>bônus diário do ranking</b> (XP de treinador, XP de pokemon e farm) e recebem os <b>diamantes do fechamento mensal</b>. Quem é reserva continua na guild — mas não luta e não recebe.</p></div>
          </div>
        </section>

        <section class="aviso-bloco">
          <h3 data-i18n="aviso.v14PainelTitulo">O painel da Guild foi refeito</h3>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v14Tag"><b>A guild ganhou TAG.</b> Até três letras ao lado do seu nick no chat, na cor que o dono escolher — <b>Guild → Guild → TAG da guild</b>. Por padrão é o começo do nome da guild, e já dá para escolher na hora de criar. ADM, MOD e as outras da equipe ficam bloqueadas.</li>
            <li data-i18n-html="aviso.v14Painel1"><b>Uma faixa de identidade no topo</b>: brasão grande, dono, idade da guild e o chip do bônus de ranking — com o motivo escrito quando não há bônus.</li>
            <li data-i18n-html="aviso.v14Painel2"><b>Três placas de número</b>: GP, membros e <b>quantos estão no time</b>. A terceira é botão e abre a escalação direto.</li>
            <li data-i18n-html="aviso.v14Painel3"><b>Três abas</b> no lugar da pilha de botões: <b>Membros</b> (com busca e convite), <b>Guerra</b> (sua equipe em cinco casas, o time da guild e o atalho para o PvP Guild) e <b>Guild</b> (brasão e saída).</li>
            <li data-i18n-html="aviso.v14Painel4">Na lista, a tag <b>no time</b> ou <b>reserva</b> ao lado de cada nick. Expulsar e passar a liderança saíram da linha e moram dentro do membro aberto, junto com a equipe dele.</li>
          </ul>
        </section>

        <section class="aviso-bloco aviso-regra">
          <h3 data-i18n="aviso.v14RegraTitulo">As regras, sem letra miúda</h3>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v14Regra1"><b>Guild com 10 ou menos está toda escalada.</b> Se vocês são oito, os oito entram na guerra — o editor só passa a valer quando a guild passa de 10.</li>
            <li data-i18n-html="aviso.v14Regra2"><b>O bônus é do time, não da lista de membros.</b> Isso vale para o bônus diário do ranking de GP e para o diamante do pódio mensal.</li>
            <li data-i18n-html="aviso.v14Regra3"><b>O time nunca vai à guerra com vaga vazia.</b> Saiu alguém (ou foi expulso), a vaga fecha sozinha com o reserva mais antigo.</li>
          </ul>
        </section>

        <section class="aviso-bloco">
          <h3 data-i18n="aviso.tambemTitulo">Também nesta atualização</h3>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v14Auto"><b>Auto Poção, Auto Revive e Voltar à hunt já vêm LIGADOS</b>, com as poções e os revives marcados do mais barato para o mais caro — e foram ligados para quem já jogava. Quem não quiser, desliga no painel.</li>
            <li data-i18n-html="aviso.v14Dicas"><b>O chat dá duas dicas sozinho</b>, a cada 30 minutos de jogo: o <b>guia de hunts</b> e o nosso <b>Discord</b>, em azul, com o endereço clicável.</li>
            <li data-i18n-html="aviso.v14Coins"><b>O ícone de Coins voltou a aparecer</b> no painel de item do Mercado da Comunidade — ele vinha quebrado na troca entre Coins e Gemas.</li>
          </ul>
        </section>
      </section>

      <section class="novidade" data-aviso="13" hidden="">
        <section class="aviso-bikes">
          <div class="ab-raios" aria-hidden="true"></div>
          <div class="ab-confete" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
          <span class="ab-fita" data-i18n="aviso.v13Fita">Chegaram ao PokeIdle</span>
          <h3 class="ab-titulo" data-i18n="aviso.v13Titulo">MEGA EVOLUÇÕES</h3>
          <!-- As MEGAS em pessoa, e não os ícones das pedras: o que vende a atualização é o
               bicho novo, e o ícone de 32 px de uma pedra não diz nada a quem nunca viu uma.
               O sprite é desenhado pelo `spriteAnimado` (ver `pintarMegasDaNovidade` no app.js),
               porque a arte das megas mora no atlas do asset-pack e não como PNG solto. -->
          <div class="ab-bikes ab-quatro">
            <div class="ab-bike rar-comum"><span class="ab-mega" data-look="80306" data-tam="40"></span><b data-i18n="aviso.v13E1N">Mega Aggron</b><span data-i18n="aviso.v13E1S">230 de Defense</span></div>
            <div class="ab-bike rar-rara"><span class="ab-mega" data-look="80006" data-tam="48"></span><b data-i18n="aviso.v13E2N">Mega Charizard Y</b><span data-i18n="aviso.v13E2S">159 de Sp. Atk</span></div>
            <div class="ab-bike rar-mitica"><span class="ab-mega" data-look="80094" data-tam="52"></span><b data-i18n="aviso.v13E3N">Mega Gengar</b><span data-i18n="aviso.v13E3S">170 de Sp. Atk</span></div>
            <div class="ab-bike rar-lendaria"><span class="ab-mega" data-look="80445" data-tam="60"></span><b data-i18n="aviso.v13E4N">Mega Garchomp</b><span data-i18n="aviso.v13E4S">170 de Attack</span></div>
          </div>
          <p class="ab-sub" data-i18n-html="aviso.v13Sub"><b>35 Mega Evoluções</b> entraram no jogo — com <b>arte própria</b>, <b>forma shiny</b> e uma <b>aba Mega na Pokedex</b> só delas, na faixa <b>#3000</b>.</p>
        </section>

        <p class="aviso-lendaria" data-i18n-html="aviso.v13Lendaria">Mega Gengar com <b>170 de Sp. Atk</b>. Mega Aggron com <b>230 de Defense</b>. Mega Heracross com <b>185 de Attack</b>. Não é bônus de porcentagem: são as bases da Pokedex oficial, inteiras, trocadas no seu bicho — e o seu refino continua valendo por cima.</p>

        <section class="aviso-bloco ab-passos">
          <h3 data-i18n="aviso.v13ComoTitulo">Como conseguir a sua</h3>
          <div class="ab-passo">
            <!-- O ícone do botão BOSS do menu, e não um emoji de espada nem o disco de TM: é a
                 mesma figura que o jogador clica para chegar lá, então o passo aponta para um
                 lugar que ele reconhece em vez de uma ilustração genérica. -->
            <span class="ab-passo-ico"><img src="/assets/site/assets/ui/menu-bosses.png" alt=""></span>
            <div><h4 data-i18n="aviso.v13Passo1T">1. Derrote bosses</h4><p data-i18n-html="aviso.v13Passo1">Todo boss lendário agora solta <b>Fragmento de Mega Stone</b> e <b>Fragmento de Mega Shiny Stone</b>, além da peça de TM de sempre. Quanto mais alto o boss, maior a chance.</p></div>
          </div>
          <div class="ab-passo">
            <span class="ab-passo-ico"><span class="ab-prof"></span></span>
            <div><h4 data-i18n="aviso.v13Passo2T">2. Leve 10 ao Professor Carvalho</h4><p data-i18n-html="aviso.v13Passo2">Na bancada <b>Mega</b>, 10 fragmentos viram a <b>Mega Stone da espécie que VOCÊ escolher</b> — nada de sorteio. São 32 pedras à disposição, e a busca acha a sua pelo nome.</p></div>
          </div>
          <div class="ab-passo">
            <span class="ab-passo-ico ab-passo-emoji" aria-hidden="true">💥</span>
            <div><h4 data-i18n="aviso.v13Passo3T">3. Aperte Mega Evoluir</h4><p data-i18n-html="aviso.v13Passo3">Com a pedra na mochila, o botão dourado aparece no pokemon. Um clique e ele vira a <b>forma Mega</b>: sprite novo, bases novas, tipos novos.</p></div>
          </div>
        </section>

        <section class="aviso-bloco">
          <h3 data-i18n="aviso.v13ChanceTitulo">A chance no Boss, por degrau</h3>
          <div class="ave-numeros">
            <div class="avo-numero"><b>0,50%</b><span data-i18n="aviso.v13ChanceNum1">Fragmento de Mega no boss nv 300</span></div>
            <div class="avo-numero"><b>0,25%</b><span data-i18n="aviso.v13ChanceNum2">Fragmento de Mega SHINY no mesmo boss</span></div>
          </div>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v13Chance1">A chance <b>sobe a cada par de bosses</b>: 0,50% no nv 300, <b>1,00% no nv 650</b>, 1,50% no seguinte, e assim por diante.</li>
            <li data-i18n-html="aviso.v13Chance2">O fragmento <b>shiny</b> é sempre <b>metade</b> do comum — 0,25% no nv 300, 0,50% no nv 650. O dobro do tempo, para a pedra que megaevolui um shiny.</li>
            <li data-i18n-html="aviso.v13Chance3">Os dois fragmentos e <b>todas as 70 pedras</b> são negociáveis no <b>Mercado da Comunidade</b>: quem farma boss vende, quem quer a mega compra.</li>
          </ul>
        </section>

        <section class="aviso-bloco">
          <h3 data-i18n="aviso.v13QuaisTitulo">As 35, e o que muda em cada uma</h3>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v13Golpe"><b>Um GOLPE a mais, de 600, com metade da recarga.</b> A mega mantém o moveset da espécie base inteiro e ganha um golpe novo do tipo primário dela — <b>600 de poder e 30 s</b>, contra os 60 s de todo golpe de 600. São <b>três golpes de 600</b> na mega.</li>
            <li data-i18n-html="aviso.v13Quais1"><b>Venusaur, Charizard Y, Blastoise, Beedrill, Pidgeot, Alakazam, Gengar, Kangaskhan, Pinsir, Gyarados, Aerodactyl, Dragonite, Meganium, Ampharos, Steelix, Scizor, Heracross, Houndoom, Tyranitar</b>…</li>
            <li data-i18n-html="aviso.v13Quais2">…<b>Sceptile, Blaziken, Swampert, Gardevoir, Mawile, Aggron, Manectric, Sharpedo, Camerupt, Banette, Absol, Metagross, Garchomp, Lucario, Gallade, Greninja</b>.</li>
            <li data-i18n-html="aviso.v13Quais3">Muitas <b>trocam de tipo</b>: Mega Gyarados vira WATER/DARK, Mega Ampharos ganha DRAGON, Mega Sceptile ganha DRAGON. Isso muda STAB, efetividade e até a pedra de refino.</li>
            <li data-i18n-html="aviso.v13Quais4">Todas entram na <b>Pokedex, na aba Mega</b>, com número próprio — o Mega Gengar é o <b>#3094</b>. Elas contam na sua Coleção.</li>
          </ul>
        </section>

        <section class="aviso-bloco aviso-regra">
          <h3 data-i18n="aviso.v13RegraTitulo">As regras, sem letra miúda</h3>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v13Regra1"><b>Shiny pede pedra shiny.</b> Um pokemon shiny só megaevolui com a <b>Shiny Mega Stone</b>, e continua shiny depois. A pedra comum recusa shiny, justamente para ninguém perder a cor por engano.</li>
            <li data-i18n-html="aviso.v13Regra2"><b>Não tem volta.</b> Megaevoluir troca a espécie para sempre, como uma evolução normal — e por isso o pokemon fica <b>trancado na venda</b> (dá para destravar num clique).</li>
            <li data-i18n-html="aviso.v13Regra3"><b>A nota nunca cai.</b> Megaevoluir sempre SOBE o N=, como evoluir passou a fazer na v1.143.</li>
            <li data-i18n-html="aviso.v13Regra4">Mega evoluído <b>não evolui de novo</b>, e variantes de <b>Outland não megaevoluem</b>. Clones de Orre megaevoluem normalmente — são a mesma espécie. <b>As 35 têm forma shiny</b>, então nenhuma fica de fora.</li>
          </ul>
        </section>

        <section class="aviso-bloco">
          <h3 data-i18n="aviso.tambemTitulo">Também nesta atualização</h3>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v13Totodile"><b>Totodile ganhou sprite — e forma SHINY.</b> Ele estava sem arte no jogo desde sempre; agora entra no catálogo de shinys como qualquer outro.</li>
            <li data-i18n-html="aviso.v13Radar"><b>Radares no Discord.</b> Três canais novos contam ao vivo o que acontece: <b>shiny capturado</b>, <b>depósito</b> e <b>saque aprovado</b>. O bot lê o banco do jogo e anuncia na ordem, sem perder nada quando fica fora do ar.</li>
            <li data-i18n-html="aviso.v13Mercado">As <b>63 Mega Stones</b> e os <b>2 fragmentos</b> já aparecem no Mercado: as pedras na aba <b>Pedras</b>, os fragmentos na aba <b>Fragmentos</b>.</li>
          </ul>
        </section>
      </section>

      <section class="novidade" data-aviso="12" hidden="">
        <section class="aviso-bikes">
          <div class="ab-raios" aria-hidden="true"></div>
          <div class="ab-confete" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
          <span class="ab-fita" data-i18n="aviso.v12Fita">Programa novo</span>
          <h3 class="ab-titulo" data-i18n="aviso.v12Titulo">Convide &amp; Ganhe</h3>
          <div class="ab-bikes ab-quatro">
            <div class="ab-bike rar-comum"><img src="/img/moeda-diamante.png" alt=""><b data-i18n="aviso.v12E1N">1 amigo</b><span data-i18n="aviso.v12E1S">5 diamantes</span></div>
            <div class="ab-bike rar-rara"><img src="/assets/site/assets/loja/shinysecretlure.png" alt=""><b data-i18n="aviso.v12E2N">10 amigos</b><span data-i18n="aviso.v12E2S">3h de Shiny</span></div>
            <div class="ab-bike rar-mitica"><img src="/img/ball-beast.png" alt=""><b data-i18n="aviso.v12E3N">100 amigos</b><span data-i18n="aviso.v12E3S">VIP 90d + 5.000 Beast</span></div>
            <div class="ab-bike rar-lendaria"><img src="/img/passe-vip.png" alt=""><b data-i18n="aviso.v12E4N">500 amigos</b><span data-i18n="aviso.v12E4S">VIP PARA SEMPRE</span></div>
          </div>
          <p class="ab-sub" data-i18n-html="aviso.v12Sub">Cada pessoa que entrar no nosso <b>Discord pelo SEU link</b> vira ponto — e cada ponto te aproxima do próximo prêmio. Não tem sorteio, não tem sorte: <b>é contagem</b>.</p>
        </section>

        <p class="aviso-lendaria" data-i18n-html="aviso.v12Lendaria">🏆 <b>500 convidados = VIP PERMANENTE.</b> O único prêmio do jogo que nunca expira — mais 10.000 Beast Balls e um mês de TODOS os boosts.</p>

        <section class="aviso-bloco ab-passos">
          <h3 data-i18n="aviso.v12ComoTitulo">Como começar a pontuar hoje</h3>
          <div class="ab-passo">
            <span class="ab-passo-ico ab-passo-emoji" aria-hidden="true">🔗</span>
            <div><h4 data-i18n="aviso.v12Passo1T">1. Crie o SEU link de convite</h4><p data-i18n-html="aviso.v12Passo1">No Discord, botão direito no canal → <b>Convidar Pessoas</b> → <b>Editar link</b> → marque <b>Nunca expirar</b> e <b>Usos ilimitados</b>. <b>O link geral do servidor não conta para ninguém</b> — só o link que VOCÊ criou sabe que a pessoa é sua.</p></div>
          </div>
          <div class="ab-passo">
            <span class="ab-passo-ico ab-passo-emoji" aria-hidden="true">📣</span>
            <div><h4 data-i18n="aviso.v12Passo2T">2. Divulgue onde você quiser</h4><p data-i18n-html="aviso.v12Passo2">Grupo de amigos, clã, stream, vídeo, print no zap. Cada pessoa que entrar pelo seu link aparece no canal <b>#convites</b> com o seu nome do lado e o total que você já trouxe.</p></div>
          </div>
          <div class="ab-passo">
            <span class="ab-passo-ico"><img src="/img/moeda-diamante.png" alt=""></span>
            <div><h4 data-i18n="aviso.v12Passo3T">3. Resgate no chat do jogo</h4><p data-i18n-html="aviso.v12Passo3">A cada marco, o bot manda um <b>código no seu privado</b>. Digite <b>/resgatar &lt;codigo&gt;</b> no chat e o prêmio cai na hora. Digite só <b>/resgatar</b> para ver a escada inteira.</p></div>
          </div>
        </section>

        <section class="aviso-bloco">
          <h3 data-i18n="aviso.v12EscadaTitulo">A escada inteira</h3>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v12Esc1"><b>1 convidado</b> — 5 💎</li>
            <li data-i18n-html="aviso.v12Esc2"><b>5 convidados</b> — 10 💎</li>
            <li data-i18n-html="aviso.v12Esc3"><b>10 convidados</b> — 3h de Shiny Secret Lure</li>
            <li data-i18n-html="aviso.v12Esc4"><b>20 convidados</b> — 6h de Capture Boost + 6h de Shiny Secret Lure</li>
            <li data-i18n-html="aviso.v12Esc5"><b>50 convidados</b> — 3 dias de Shiny Secret Lure + 3 dias de Capture Boost</li>
            <li data-i18n-html="aviso.v12Esc6"><b>100 convidados</b> — VIP 90 dias, 5.000 Beast Balls e 7 dias de Shiny, Capture, XP e XP Pokemon</li>
            <li data-i18n-html="aviso.v12Esc7"><b>500 convidados</b> — <b>VIP PERMANENTE</b>, 10.000 Beast Balls e 1 mês dos cinco boosts</li>
          </ul>
        </section>

        <section class="aviso-bloco aviso-regra">
          <h3 data-i18n="aviso.v12RegraTitulo">As regras, sem letra miúda</h3>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v12Regra1">Só conta quem entra com <b>conta de Discord de mais de 1 ano</b>. Conta criada ontem aparece no canal, mas <b>não pontua</b> — é o que impede fazenda de conta.</li>
            <li data-i18n-html="aviso.v12Regra2">Quem <b>sai do servidor</b> deixa de contar. A contagem é de gente que ficou.</li>
            <li data-i18n-html="aviso.v12Regra3">Cada código vale <b>uma vez só</b>, e os marcos são cumulativos: chegando a 20, você já pegou os de 1, 5 e 10 pelo caminho.</li>
          </ul>
        </section>

        <section class="aviso-bloco">
          <h3 data-i18n="aviso.v12AmadorTitulo">Campeonato Amador — R$ 500 por mês</h3>
          <div class="ave-numeros">
            <div class="avo-numero"><b>R$ 500</b><span data-i18n="aviso.v12AmadorNum1">em prêmio, todo dia 15</span></div>
            <div class="avo-numero"><b>0</b><span data-i18n="aviso.v12AmadorNum2">shinys e P5 na arena</span></div>
          </div>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v12Amador1">O torneio de quem <b>ainda não tem a coleção do topo</b>: shiny e P5 <b>não entram</b> na equipe, e os da sua equipe de PvP não vão a campo. Quem decide é montagem e nível.</li>
            <li data-i18n-html="aviso.v12Amador2"><b>Todo dia 15</b>, à meia-noite. Inscrições do dia 1º ao 13, dia 14 é o de análise, e o requisito é <b>nível 100</b> — um terço do Mundial.</li>
            <li data-i18n-html="aviso.v12Amador3">Prêmio de <b>R$ 300 / R$ 150 / R$ 50</b>, na mesma chave de eliminação dupla do Mundial. E dá para estar inscrito nos <b>dois ao mesmo tempo</b>, com equipes separadas.</li>
          </ul>
        </section>

        <section class="aviso-bloco">
          <h3 data-i18n="aviso.tambemTitulo">Também nesta atualização</h3>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v12Lista">O <b>Mundial virou mensal</b>: todo último dia do mês, com inscrições abrindo no dia 16. <b>Torneio</b> agora abre numa <b>lista de campeonatos</b> — os que vêm por aí e os que já passaram, com o pódio de cada um.</li>
            <li data-i18n-html="aviso.v12Arraste">Na chave, <b>segure e arraste</b> para navegar, como um mapa. Numa chave de 256 vagas era a única coisa que faltava.</li>
            <li data-i18n-html="aviso.v12Replay">Os <b>replays</b> de um campeonato ficam no ar até a chave do seguinte ser publicada. Depois disso fica só o pódio — é o que mantém o servidor leve.</li>
          </ul>
        </section>
      </section>

      <section class="novidade" data-aviso="11" hidden="">
        <section class="aviso-bikes">
          <div class="ab-raios" aria-hidden="true"></div>
          <div class="ab-confete" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
          <span class="ab-fita" data-i18n="aviso.v11Fita">Nova atualização</span>
          <h3 class="ab-titulo" data-i18n="aviso.v11Titulo">Passe de Batalha</h3>
          <div class="ab-bikes ab-duas">
            <div class="ab-bike rar-rara"><img src="/img/passe-free.png" alt=""><b data-i18n="aviso.v11FreeNome">Passe Grátis</b><span data-i18n="aviso.v11FreeSub">30 dias de prêmios</span></div>
            <div class="ab-bike rar-lendaria"><img src="/img/passe-vip.png" alt=""><b data-i18n="aviso.v11VipNome">Passe Premium</b><span data-i18n="aviso.v11VipSub">50 💎 · 30 dias</span></div>
          </div>
          <p class="ab-sub" data-i18n-html="aviso.v11Sub">Botão novo no topo, ao lado do <b>Market</b>: entre todo dia, resgate o prêmio do dia e ande na trilha até o <b>Dia 30 lendário</b>.</p>
        </section>
        <section class="aviso-bloco ab-passos">
          <h3 data-i18n="aviso.v9ComoTitulo">Como funciona</h3>
          <div class="ab-passo">
            <span class="ab-passo-ico ab-passo-emoji" aria-hidden="true">🔥</span>
            <div><h4 data-i18n="aviso.v11Passo1T">Um resgate por dia</h4><p data-i18n-html="aviso.v11Passo1">Cada dia seguido anda um degrau. <b>Faltou um dia, a trilha volta ao Dia 1</b> — o relógio na tela mostra quanto tempo falta.</p></div>
          </div>
          <div class="ab-passo">
            <span class="ab-passo-ico ab-passo-emoji" aria-hidden="true">🎁</span>
            <div><h4 data-i18n="aviso.v11Passo2T">Baús e o Dia 30</h4><p data-i18n-html="aviso.v11Passo2">Os dias <b>7, 14, 21 e 28</b> são baús, e o <b>Dia 30</b> é o lendário: Bronze Boss Token, 5 milhões de Coins e 50 Beast Balls.</p></div>
          </div>
          <div class="ab-passo">
            <span class="ab-passo-ico"><img src="/img/passe-vip.png" alt=""></span>
            <div><h4 data-i18n="aviso.v11Passo3T">Passe Premium</h4><p data-i18n-html="aviso.v11Passo3">Por <b>50 💎</b>, 30 dias corridos de recompensa Premium junto da grátis: dias de VIP, horas de boost, Beast Balls e um <b>Fragmento de Shiny Stone</b> no Dia 30.</p></div>
          </div>
        </section>
        <section class="aviso-bloco">
          <h3 data-i18n="aviso.v11PvpTitulo">PvP amistoso entre amigos</h3>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v11Pvp1">Na conversa da <b>Lista de Amigos</b>, o botão <b>⚔ PvP amistoso</b> desafia o amigo, que tem <b>5 minutos</b> para aceitar.</li>
            <li data-i18n-html="aviso.v11Pvp2">A luta usa as regras do Ranqueado e a sua equipe de PvP — <b>sem PR e sem prêmio</b>, só pela honra.</li>
            <li data-i18n-html="aviso.v11Pvp3">Depois da luta, os dois esperam <b>5 minutos</b> para outro amistoso.</li>
          </ul>
        </section>
        <section class="aviso-bloco">
          <h3 data-i18n="aviso.v11GuerraTitulo">Análise da última guerra</h3>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v11Guerra1">Em <b>PvP → PvP Guild</b>, o botão <b>📊 Análise da última guerra</b>: dano, abates e os pokemon de cada jogador, o Pokemon da guerra, o maior golpe e o placar de todas as guilds.</li>
          </ul>
        </section>
        <section class="aviso-bloco">
          <h3 data-i18n="aviso.tambemTitulo">Também nesta atualização</h3>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v11Mercado">Mercado: o <b>Histórico de vendas e de compras</b> mostra P·IV·Q·N do pokemon (e abre a ficha), e a vitrine ganhou o filtro <b>Omitir Pokemon de Outland</b>.</li>
            <li data-i18n-html="aviso.v11Boosts">Loja: <b>sem limite diário de boosts</b> — compre quantos quiser.</li>
            <li data-i18n-html="aviso.v11Menu">Menu: <b>Campeonato</b> agora é <b>Torneio</b>, e <b>Comunidade</b> virou <b>RMT</b>.</li>
          </ul>
        </section>
      </section>

      <section class="novidade" data-aviso="10" hidden="">
        <section class="aviso-bikes">
          <div class="ab-raios" aria-hidden="true"></div>
          <div class="ab-confete" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
          <span class="ab-fita" data-i18n="aviso.v10Fita">Nova atualização</span>
          <h3 class="ab-titulo" data-i18n="aviso.v10Titulo">Modo Economia</h3>
          <div class="ave-numeros">
            <div class="avo-numero"><b>−87%</b><span data-i18n="aviso.v10NumCpu">de processamento</span></div>
            <div class="avo-numero"><b>−74%</b><span data-i18n="aviso.v10NumRede">de internet</span></div>
          </div>
          <p class="ab-sub" data-i18n-html="aviso.v10Sub">Um interruptor novo nas <b>Configurações</b>: o jogo para de desenhar a batalha — sem mapa, sem pokemon, sem animação — e a <b>caça continua no servidor</b>, com você online e farmando igual. Feito para <b>celular</b> e <b>PC fraco</b>; os números acima foram medidos com a aba aberta caçando.</p>
        </section>
        <section class="aviso-bloco ab-passos">
          <h3 data-i18n="aviso.v9ComoTitulo">Como funciona</h3>
          <div class="ab-passo">
            <span class="ab-passo-ico ab-passo-emoji" aria-hidden="true">⚙️</span>
            <div><h4 data-i18n="aviso.v10Passo1T">Liga nas Configurações</h4><p data-i18n-html="aviso.v10Passo1">Abra a <b>engrenagem</b> e ligue o <b>Modo Economia</b>. O palco vira um painel com o que se acompanha num idle: <b>XP</b>, <b>Coins</b>, <b>abates</b> e <b>capturas por hora</b>, o tempo de sessão, a prancheta e o <b>histórico de capturas</b>. Para voltar, <b>Ligar a cena</b>.</p></div>
          </div>
          <div class="ab-passo">
            <span class="ab-passo-ico"><img src="/img/ball-super.png" alt=""></span>
            <div><h4 data-i18n="aviso.v10Passo2T">A caça não para</h4><p data-i18n-html="aviso.v10Passo2">Nada muda nas regras: o servidor continua caçando, capturando e pagando, e o que ele rende aparece no painel. É só a tela que para de desenhar. Para trocar de área, o <b>Mapa</b> abre pelo próprio painel.</p></div>
          </div>
          <div class="ab-passo">
            <span class="ab-passo-ico ab-passo-emoji" aria-hidden="true">🔆</span>
            <div><h4 data-i18n="aviso.v10Passo3T">Tela sempre acesa (celular)</h4><p data-i18n-html="aviso.v10Passo3">Também nas <b>Configurações</b>, só no celular: impede a tela de apagar sozinha com o jogo aberto — tela apagada suspende a página e tira você do mundo. Ligue junto com o Modo Economia e abaixe o brilho. Funciona no <b>Chrome</b> e no <b>Samsung Internet</b> do Android e no <b>Safari</b> do iPhone (iOS 16.4 ou mais novo).</p></div>
          </div>
        </section>
        <section class="aviso-bloco">
          <h3 class="ave-titulo-pvp"><img src="/img/ranks/challenger.webp" alt=""><span data-i18n="aviso.v10PvpTitulo">PvP Ranqueado agora é semanal</span></h3>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v10Pvp1">A tabela <b>zera toda segunda-feira, 00:00 (horário de Brasília)</b>, e a tabela final daquele instante é a que premia. A primeira virada é a próxima segunda-feira, com a tabela acumulada até lá.</li>
            <li data-i18n-html="aviso.v10Pvp2">Prêmios de toda semana: <b>1º ao 3º</b> → Shiny Secret Lure e Capture Boost por <b>2 dias</b>; <b>4º ao 20º</b> → os mesmos dois por <b>18 horas</b>; <b>21º ao 50º</b> → XP Boost e XP Boost Pokemon por <b>18 horas</b>. Chegam sozinhos, sem precisar estar online.</li>
            <li data-i18n-html="aviso.v10Pvp3"><b>Um dia sem jogar</b> derruba Mestre e Challenger para o <b>Diamante</b> — a vaga vai para quem está jogando. Os pontos ficam, e uma partida devolve a vaga se a posição ainda couber. Só leva prêmio quem jogou nas <b>24 horas</b> antes da virada.</li>
            <li data-i18n-html="aviso.v10Pvp4">Botão novo <b>🏆 Recompensas</b> no <b>Ranqueado</b> (embaixo da Fila automática) e no <b>Guild</b> (embaixo do replay): o que cada posição leva, quanto falta para a virada e em que faixa você está.</li>
          </ul>
        </section>
        <section class="aviso-bloco">
          <h3 data-i18n="aviso.tambemTitulo">Também nesta atualização</h3>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v10Oferenda"><b>Oferenda Rápida:</b> botão novo na Oferenda que pula a animação da roleta e mostra o resultado na hora. O mesmo sorteio e a mesma confirmação.</li>
            <li data-i18n-html="aviso.v10Mercado"><b>Mercado da Comunidade:</b> a diária para anunciar pokemon subiu para <b>100.000 Coins</b>. Anúncio que já estava no ar não muda, e item continua sem diária.</li>
            <li data-i18n-html="aviso.v10Pokedex"><b>Pokedex:</b> Giratina, Meloetta e Meowstic aparecem com o nome e a <b>tipagem certos</b> (vinham como "MALE", "ALTERED FORME"…), e outras 35 espécies ainda sem sprite foram corrigidas junto.</li>
          </ul>
        </section>
      </section>

      <!-- 9 · v1.119.0 — A ÁREA DE TREINAMENTO, a bancada de testes do PvP: o herói sem cartões (o da
           novidade 6), o "Como funciona" em lista e o resto da atualização. O slide abria com as CAIXAS DO
           MARKET (o ralo de Coins), que saíram do jogo em 12/10/2026 — caixa de recompensa sorteada não
           combina com o ECA Digital —, e ficou só com a Área de Treinamento. -->
      <section class="novidade" data-aviso="9" hidden="">
        <section class="aviso-bikes">
          <div class="ab-raios" aria-hidden="true"></div>
          <div class="ab-confete" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
          <span class="ab-fita" data-i18n="aviso.v9Fita">Novo no PvP</span>
          <h3 class="ab-titulo" data-i18n="aviso.v9Titulo">Área de Treinamento</h3>
          <p class="ab-sub" data-i18n-html="aviso.v9Sub">A bancada de testes do PvP: monte <b>dois lados</b>, mande lutar e descubra qual equipe é mais forte de verdade — sem gastar nada e sem mexer nos seus pokemon.</p>
        </section>
        <section class="aviso-bloco">
          <h3 data-i18n="aviso.v9ComoTitulo">Como funciona</h3>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v9Treino1">Aba <b>Treinamento</b>, dentro do <b>PvP</b>: monte <b>dois lados de até 5 pokemon</b>, mande lutar e assista na arena do ginásio. Serve para descobrir qual equipe é mais forte de verdade, e não na conta de cabeça.</li>
            <li data-i18n-html="aviso.v9Treino2">Cada casa aceita <b>um pokemon seu</b> ou um <b>pokemon teste</b> que você inventa — espécie, nível, shiny, potência, qualidade e os seis IVs. Dá para montar o time de quem acabou de te vencer e revidar no laboratório.</li>
            <li data-i18n-html="aviso.v9Treino3"><b>Não dá nada e não grava nada:</b> sem XP, Coin, item, pedra ou ponto de ranking. O seu pokemon não entra na arena — entra uma cópia dele, e o original nem fica sabendo. <b>Uma batalha a cada 5 minutos.</b></li>
          </ul>
        </section>
        <section class="aviso-bloco">
          <h3 data-i18n="aviso.tambemTitulo">Também nesta atualização</h3>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v9Wiki"><b>Wiki:</b> capítulo novo — <b>Área de Treinamento</b>, com os limites da bancada e a espera entre as batalhas.</li>
            <li data-i18n-html="aviso.v9Seguranca"><b>Nos bastidores:</b> uma varredura de segurança na Área de Treinamento — entrada forjada, pokemon de outro jogador na bancada e o custo da batalha mais cara.</li>
          </ul>
        </section>
      </section>

      <!-- 8 · v1.116.0 — UM MÊS: o agradecimento. A foto do post no topo da moldura de festa, o que a
           comunidade movimentou em USDT em número grande, e embaixo o que entrou desde a novidade 7:
           a Coleção em três passos, o celular refeito, o resto da lista e as correções. -->
      <section class="novidade" data-aviso="8" hidden="">
        <section class="aviso-bikes">
          <div class="ab-raios" aria-hidden="true"></div>
          <div class="ab-confete" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
          <span class="ab-fita" data-i18n="aviso.v8Fita">1 mês de PokeIdle</span>
          <h3 class="ab-titulo" data-i18n="aviso.v8Titulo">Obrigado!</h3>
          <img class="avo-foto" src="/img/novidade-obrigado.jpg" alt="" width="900" height="507" loading="lazy" decoding="async">
          <p class="avo-numero"><b data-i18n="aviso.v8Valor">US$ 6.600+</b><span data-i18n="aviso.v8ValorSub">movimentados em USDT no primeiro mês de jogo</span></p>
          <p class="ab-sub" data-i18n-html="aviso.v8Sub">Um mês de jogo, <b>mais de US$ 6.600 em USDT</b> movimentados entre vocês e um Campeonato valendo dinheiro de verdade a caminho. Nada disso existe sem quem caça de madrugada, anuncia no Mercado, briga na guerra e vem avisar quando alguma coisa quebra. <b>Obrigado a cada um de vocês.</b></p>
        </section>
        <section class="aviso-bloco ab-passos">
          <h3 data-i18n="aviso.v8ColecaoTitulo">Nova: a Coleção</h3>
          <div class="ab-passo">
            <span class="ab-passo-ico"><img src="/img/ball-super.png" alt=""></span>
            <div><h4 data-i18n="aviso.v8Col1T">Guarde o que não se vende</h4><p data-i18n-html="aviso.v8Col1">O cadeado virou a <b>Coleção</b>. Na aba <b>Venda Pokemons</b> do Market, a setinha no canto do card manda o pokemon para lá — e ele sai da lista de venda e do <b>vender todo o depot</b>. O NPC não compra pokemon da Coleção.</p></div>
          </div>
          <div class="ab-passo">
            <span class="ab-passo-ico"><img src="/img/itens/wide-lens.png" alt=""></span>
            <div><h4 data-i18n="aviso.v8Col2T">Ache em qualquer lugar</h4><p data-i18n-html="aviso.v8Col2">O <b>Depot</b> ganhou as abas <b>Depot</b> e <b>Coleção</b>, com a contagem de cada uma, e a <b>Mochila</b> ganhou a aba <b>Coleção</b>, que abre de onde você estiver — com busca, filtros e <b>Devolver ao Depot</b> em cada card.</p></div>
          </div>
          <div class="ab-passo">
            <span class="ab-passo-ico"><img src="/img/itens/shiny-stone.png" alt=""></span>
            <div><h4 data-i18n="aviso.v8Col3T">Continua valendo em tudo</h4><p data-i18n-html="aviso.v8Col3">Pokemon da Coleção segue valendo no <b>Mercado da Comunidade</b>, na <b>Oferenda</b>, no anexo da DM, na vitrine, no posto do Exp. Share e nas equipes, com uma ★ no card. O <b>Auto Lock</b> virou <b>Auto Coleção</b>, e o que você compra no Mercado ou refina chega direto lá.</p></div>
          </div>
        </section>
        <section class="aviso-bloco">
          <h3 data-i18n="aviso.v8CelularTitulo">O celular refeito</h3>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v8Cel1"><b>Escolher pokemon</b> (anúncio, DM, Oferenda, equipe do PvP, da guerra e do Campeonato) usa a tela inteira: cabem de <b>8 a 10 cards</b> sem rolar, contra 0 a 2 antes.</li>
            <li data-i18n-html="aviso.v8Cel2"><b>Filtros atrás do funil</b>, como no Mercado: a busca fica à vista e o botão ao lado — com a bolinha de quantos filtros estão ligados — abre Local, Tipo, IV mínimo, Ordem e só shiny.</li>
            <li data-i18n-html="aviso.v8Cel3"><b>Equipe do PvP e da guerra:</b> toque numa casa para marcá-la e use a barra <b>◀ · ✕ Tirar · ▶</b> logo abaixo, em botões de dedo. As setinhas miúdas saíram.</li>
          </ul>
        </section>
        <section class="aviso-bloco">
          <h3 data-i18n="aviso.tambemTitulo">Também nesta atualização</h3>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v8Campeonato"><b>Campeonato:</b> as inscrições vão até <b>29/09</b>, e agora dá para escolher uma <b>equipe só do campeonato</b> — ela não aparece no perfil de ninguém.</li>
            <li data-i18n-html="aviso.v8Guerra"><b>Guerra de Guilds:</b> o teto sobe de 5 para <b>10 minutos</b>. As últimas guerras batiam o tempo com gente ainda de pé e eram decididas no HP restante; agora acabam no wipe, e o replay mostra até o fim.</li>
            <li data-i18n-html="aviso.v8Oferenda"><b>Oferenda:</b> o botão <b>Auto Selecionar</b> enche as casas vazias com os pokemon de <b>menor nota</b> do depot.</li>
            <li data-i18n-html="aviso.v8Faixas"><b>Mercado da Comunidade:</b> os "Mínimos" viraram <b>Faixas</b> — nível, potência, IV total, qualidade e nota, cada um com mín e máx. A nota agora filtra, e não só ordena.</li>
            <li data-i18n-html="aviso.v8Perfil"><b>Perfil:</b> mostra sempre a sua equipe do <b>PvP Ranqueado</b>, inscrito no Campeonato ou não.</li>
          </ul>
        </section>
        <section class="aviso-bloco">
          <h3 data-i18n="aviso.v8CorrecoesTitulo">Correções</h3>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v8FixMercado"><b>Anúncio vencido:</b> o pokemon volta ao Depot <b>na hora</b>, com aviso na tela. Antes ele sumia da sessão até você sair e entrar de novo — F5, limpar o cache ou aba anônima não resolviam.</li>
            <li data-i18n-html="aviso.v8FixOferenda"><b>Oferenda:</b> quem está anunciado no Mercado, segurando Exp. Share ou no posto de uma Casa não entra mais na roleta — e o giro não trava mais por causa disso.</li>
            <li data-i18n-html="aviso.v8FixRoda"><b>Novo anúncio:</b> a roda do mouse rola a lista de pokemon que está debaixo do cursor.</li>
          </ul>
        </section>
      </section>

      <!-- 7 · v1.104.0 — CAMPEONATO: as inscrições abertas até 29/09. A moldura de festa com o logo e o
           pódio em dinheiro, e as três regras que o jogador precisa levar (como entrar, a seed e a
           equipe oculta); embaixo, a Oferenda de Pokemon em três passos e as correções. -->
      <section class="novidade" data-aviso="7" hidden="">
        <section class="aviso-bikes aviso-camp">
          <div class="ab-raios" aria-hidden="true"></div>
          <div class="ab-confete" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
          <span class="ab-fita" data-i18n="aviso.v7Fita">1º Campeonato PokeIdle</span>
          <h3 class="ab-titulo" data-i18n="aviso.v7Titulo">Inscrições abertas!</h3>
          <div class="avc-topo">
            <img class="avc-logo" src="/img/campeonato-logo.png" alt="" width="200" height="204">
            <div class="avc-podio">
              <div class="avc-lugar prata"><span aria-hidden="true">🥈</span><b data-i18n="aviso.v7P2">R$ 500</b></div>
              <div class="avc-lugar ouro"><span aria-hidden="true">🥇</span><b data-i18n="aviso.v7P1">R$ 1.000</b></div>
              <div class="avc-lugar bronze"><span aria-hidden="true">🥉</span><b data-i18n="aviso.v7P3">R$ 250</b></div>
            </div>
          </div>
          <p class="ab-sub" data-i18n-html="aviso.v7Sub">O primeiro torneio valendo <b>dinheiro de verdade</b> é no dia <b>30/09</b>, em eliminação dupla, com as partidas rodando sozinhas e o <b>replay de todas</b> na chave. As inscrições vão <b>até 29/09</b> — nível <b>300</b> de treinador.</p>
        </section>
        <section class="aviso-bloco">
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v7Como"><b>Como entrar:</b> no menu do topo, abra <b>Campeonato</b> e clique em <b>Registrar</b>. Dá para cancelar até 29/09.</li>
            <li data-i18n-html="aviso.v7Seed"><b>Seeds pelo ranqueado:</b> sua posição na Tabela do PvP Ranqueado define a sua seed. A Seed 1 enfrenta a última, a 2 a penúltima — e a chave sai no fim das inscrições, na aba <b>Bracket</b>.</li>
            <li data-i18n-html="aviso.v7Equipe">Depois de se inscrever, use <b>Selecionar minha Equipe</b> no Campeonato para escolher até 5 pokemon — sem escolha, luta a sua <b>equipe do PvP Ranqueado</b>. A equipe fica <b>congelada</b> no fim das inscrições. O perfil mostra só a equipe do PvP Ranqueado: a do campeonato não aparece para ninguém.</li>
          </ul>
        </section>
        <section class="aviso-bloco ab-passos">
          <h3 data-i18n="aviso.v7OferendaTitulo">Nova: Oferenda de Pokemon</h3>
          <div class="ab-passo">
            <span class="ab-passo-ico"><img src="/img/itens/wide-lens.png" alt=""></span>
            <div><h4 data-i18n="aviso.v7Of1T">Abra a Oferenda</h4><p data-i18n-html="aviso.v7Of1">Em <b>Mochila → Oferenda</b>. A roleta tem 5 casas, e só entra pokemon do <b>depot</b>.</p></div>
          </div>
          <div class="ab-passo">
            <span class="ab-passo-ico"><img src="/img/ball-super.png" alt=""></span>
            <div><h4 data-i18n="aviso.v7Of2T">Carregue a roleta</h4><p data-i18n-html="aviso.v7Of2">Cada pokemon vale <b>uma casa (20%)</b>, dividida entre as pedras dos tipos dele: um Charmander dá 20% de Fire Stone; um Charizard, 10% de Fire Stone e 10% de Feather Stone. Casa vazia vira a fatia <b>Nada</b>.</p></div>
          </div>
          <div class="ab-passo">
            <span class="ab-passo-ico"><img src="/img/itens/shiny-stone.png" alt=""></span>
            <div><h4 data-i18n="aviso.v7Of3T">Gire e leve a pedra</h4><p data-i18n-html="aviso.v7Of3">Com as 5 casas cheias, a pedra é garantida. <b>Shiny paga em Shiny Stone</b> do tipo dele. Os pokemon oferecidos <b>não voltam</b>.</p></div>
          </div>
        </section>
        <section class="aviso-bloco">
          <h3 data-i18n="aviso.v7CorrecoesTitulo">Correções</h3>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v7FixShiny"><b>Chat:</b> no aviso "X capturou um shiny", <b>Ver perfil</b> e <b>Adicionar amigo</b> agora abrem quem capturou — antes aparecia "treinador não encontrado".</li>
            <li data-i18n-html="aviso.v7FixBoost"><b>Boosts:</b> o tempo restante do VIP e dos boosts é contado pelo relógio do servidor. Com o relógio do aparelho adiantado, o boost comprado não some mais da tela antes da hora.</li>
            <li data-i18n-html="aviso.v7FixChat"><b>Chat:</b> a espera de 5 segundos entre mensagens passou a valer por conta, e não por conexão.</li>
          </ul>
        </section>
      </section>

      <!-- 6 · v1.99.0 — SERVIDOR NOVO: a máquina 4× maior (16 vCPU / 32 GB) e o que ela muda para o
           jogador; embaixo, a nota do Mercado em 3,0 e a automação liberada nos Termos. -->
      <section class="novidade" data-aviso="6" hidden="">
        <section class="aviso-bikes">
          <div class="ab-raios" aria-hidden="true"></div>
          <div class="ab-confete" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
          <span class="ab-fita" data-i18n="aviso.v6Fita">Servidor novo</span>
          <h3 class="ab-titulo" data-i18n="aviso.v6Titulo">Mais de 10 mil ao mesmo tempo!</h3>
          <p class="ab-sub" data-i18n-html="aviso.v6Sub">O PokeIdle mudou para uma máquina <b>4× maior</b>: agora o jogo comporta <b>mais de 10 mil treinadores simultâneos</b>, com a mesma fluidez de sempre.</p>
        </section>
        <section class="aviso-bloco">
          <h3 data-i18n="aviso.tambemTitulo">Também nesta atualização</h3>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v6Nota"><b>Mercado:</b> a nota mínima para anunciar um pokemon caiu de <b>3,5</b> para <b>3,0</b>.</li>
            <li data-i18n-html="aviso.v6Automacao"><b>Automação liberada:</b> os Termos de Uso permitem automações, e a extensão do PokeIdle está no nosso Discord, no canal <b>#how-to-play</b>.</li>
          </ul>
        </section>
      </section>
      <!-- 5 · v1.96.0 (era a 4, da v1.94.0) — MERCADO JUSTO: a moldura dourada sem confete (é regra nova, não festa), a retenção
           de 8 h e o sorteio de 3 s em três passos — a pokebola é a bolinha do sorteio —; embaixo, a
           pilha que reinicia a retenção, a proteção contra bot, os termos e a janela de infraestrutura. -->
      <section class="novidade" data-aviso="5" hidden="">
        <section class="aviso-bikes">
          <div class="ab-raios" aria-hidden="true"></div>
          <span class="ab-fita" data-i18n="aviso.v4Fita">Mercado da Comunidade</span>
          <h3 class="ab-titulo" data-i18n="aviso.v4Titulo">Compra justa no Mercado!</h3>
          <p class="ab-sub" data-i18n-html="aviso.v4Sub">Clicar mais rápido não ganha mais: quem pede nos <b>primeiros 3 segundos</b> depois de o anúncio liberar entra num <b>sorteio</b> com a mesma chance — acabou a vantagem dos bots de compra.</p>
        </section>
        <section class="aviso-bloco ab-passos">
          <div class="ab-passo">
            <span class="ab-passo-ico"><img src="/img/itens/shiny-stone.png" alt=""></span>
            <div><h4 data-i18n="aviso.v4Passo1T">Anunciou, todo mundo vê</h4><p data-i18n-html="aviso.v4Passo1">O anúncio aparece na hora e fica <b>2 minutos</b> em retenção antes de poder ser comprado. O selo mostra quanto falta, e dá para cancelar durante a retenção.</p></div>
          </div>
          <div class="ab-passo">
            <span class="ab-passo-ico"><img src="/img/ball-super.png" alt=""></span>
            <div><h4 data-i18n="aviso.v4Passo2T">Liberou? 3 segundos de sorteio</h4><p data-i18n-html="aviso.v4Passo2">Todo pedido que chega nos <b>primeiros 3 segundos</b> tem a mesma chance — no primeiro milissegundo ou no segundo 2. O resultado sai em instantes; depois disso, quem pede compra na hora, como sempre.</p></div>
          </div>
          <div class="ab-passo">
            <span class="ab-passo-ico"><img src="/img/moeda-gema.png" alt=""></span>
            <div><h4 data-i18n="aviso.v4Passo3T">Um bilhete por jogador</h4><p data-i18n-html="aviso.v4Passo3">Clicar várias vezes não dá mais chances. Quem perde o sorteio recebe o aviso e <b>não paga nada</b>.</p></div>
          </div>
        </section>
        <section class="aviso-bloco">
          <h3 data-i18n="aviso.tambemTitulo">Também nesta atualização</h3>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v4Pilha"><b>Somar no anúncio:</b> pôr mais unidades num anúncio que já está à venda reinicia os 2 minutos de retenção.</li>
            <li data-i18n-html="aviso.v4Contador"><b>Contador ao vivo:</b> o tempo de retenção do anúncio anda sozinho, sem fechar e abrir o item — e o botão de comprar destrava na hora em que libera.</li>
            <li data-i18n-html="aviso.v4Bots"><b>Limites por conta:</b> o servidor segura rajadas de ações por segundo, e o sorteio da liberação vale para todo mundo — jogando na mão ou com automação.</li>
            <li data-i18n-html="aviso.v4Termos"><b>Automação liberada:</b> os Termos de Uso permitem automações no jogo e no Mercado. A extensão de automação do PokeIdle está no nosso Discord, no canal <b>#how-to-play</b>.</li>
            <li data-i18n-html="aviso.v4Infra"><b>Servidor maior:</b> em <b>15/09, às 20h</b> (horário de Brasília), o servidor ganhou <b>4× mais capacidade</b> para receber muito mais treinadores com a mesma fluidez.</li>
          </ul>
        </section>
      </section>

      <!-- 3 · v1.87.0 — CASAS NUMERADAS: a mesma moldura de festa das bikes, com as cinco casas e a
           fatia de XP Share de cada uma; embaixo, os três passos e o resto da atualização. -->
      <section class="novidade" data-aviso="3" hidden="">
        <section class="aviso-bikes aviso-casas">
          <div class="ab-raios" aria-hidden="true"></div>
          <div class="ab-confete" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
          <span class="ab-fita" data-i18n="aviso.v3Fita">Nova feature</span>
          <h3 class="ab-titulo" data-i18n="aviso.v3Titulo">Casas numeradas!</h3>
          <div class="ab-bikes">
            <div class="ab-bike rar-comum"><img src="/img/itens/casa-comum.png" alt=""><b>25%</b><span data-i18n="casa.rar.comum">Comum</span></div>
            <div class="ab-bike rar-incomum"><img src="/img/itens/casa-incomum.png" alt=""><b>40%</b><span data-i18n="casa.rar.incomum">Incomum</span></div>
            <div class="ab-bike rar-rara"><img src="/img/itens/casa-rara.png" alt=""><b>75%</b><span data-i18n="casa.rar.rara">Rara</span></div>
            <div class="ab-bike rar-mitica"><img src="/img/itens/casa-mitica.png" alt=""><b>100%</b><span data-i18n="casa.rar.mitica">Mítica</span></div>
            <div class="ab-bike rar-lendaria"><img src="/img/itens/casa-lendaria.png" alt=""><b>2×100%</b><span data-i18n="casa.rar.lendaria">Lendária</span></div>
          </div>
          <p class="ab-sub" data-i18n-html="aviso.v3Sub">Cada casa agora tem o <b>número dela no servidor</b> — quem tirou a primeira ficou com a <b>#000001</b>. Junte quantas quiser: até <b>5 ficam em uso</b>, repartindo XP Share.</p>
        </section>
        <section class="aviso-bloco ab-passos">
          <div class="ab-passo">
            <span class="ab-passo-ico"><span class="ab-prof"></span></span>
            <div><h4 data-i18n="aviso.v3Passo1T">Fabrique à vontade</h4><p data-i18n-html="aviso.v3Passo1"><b>10 Fragmentos de Chave</b> no Professor Carvalho viram uma casa sorteada. Não há limite de casas na conta.</p></div>
          </div>
          <div class="ab-passo">
            <span class="ab-passo-ico"><img src="/img/itens/casa-mitica.png" alt=""></span>
            <div><h4 data-i18n="aviso.v3Passo2T">Escolha as 5 em uso</h4><p data-i18n-html="aviso.v3Passo2">No botão <b>Casa</b>, até <b>5 casas</b> ficam em uso, e só elas repartem XP. As outras ficam guardadas — troque quando quiser. Um pokemon ocupa um posto só.</p></div>
          </div>
          <div class="ab-passo">
            <span class="ab-passo-ico"><img src="/img/itens/casa-lendaria.png" alt=""></span>
            <div><h4 data-i18n="aviso.v3Passo3T">Registro do servidor</h4><p data-i18n-html="aviso.v3Passo3">A aba <b>Registro do servidor</b> mostra todas as casas já abertas, quem tirou cada uma e quais estão à venda. O número vai junto quando a casa é vendida no Mercado.</p></div>
          </div>
        </section>
        <section class="aviso-bloco">
          <h3 data-i18n="aviso.tambemTitulo">Também nesta atualização</h3>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.v3Guild"><b>Guerra de Guilds mais justa:</b> onde cada guild nasce agora é chaveado como num campeonato. As 4 mais fortes são cabeças de chave e nascem nas pontas da arena — a 1ª e a 2ª o mais longe possível uma da outra, a pé —, e as demais são repartidas em serpentina para toda região ter a mesma força. As favoritas só se cruzam no fim. Detalhes na Wiki, em <b>Guilds</b>.</li>
            <li data-i18n-html="aviso.v3Bikes"><b>Bikes numeradas:</b> cada bike ganha o número dela no servidor, como as casas, e é pelo número que se equipa e se anuncia. O botão <b>Casa</b> ganhou as abas <b>Registro de Casas</b> e <b>Registro de Bikes</b>, com todas as já abertas e quem tirou cada uma.</li>
            <li data-i18n-html="aviso.v3Favoritos"><b>Favoritos no Mercado:</b> toque na <b>★</b> de um pokemon à venda e ele fica na aba Favoritos. Se alguém comprar ou o vendedor retirar, o card avisa.</li>
            <li data-i18n-html="aviso.v3Precos"><b>Tabela de preços:</b> filtre só as vendas em Coins ou em Gemas, escolha um item específico (Diamantes também) e veja o <b>✨Shiny</b> no nome dos pokemon vendidos.</li>
            <li data-i18n-html="aviso.v3AutoLock"><b>Auto Lock nas compras:</b> todo pokemon comprado no Mercado da Comunidade já chega trancado contra venda.</li>
            <li data-i18n-html="aviso.v3Outland"><b>Outland:</b> 8 variantes novas espalhadas pelo mapa — Ancient Dragonite, Furious Whimsicott, Magma Magcargo, Toxic Toxicroak, Psy Exeggutor, Banshee Mismagius, Freezing Aurorus e War Scrafty —, com as pedras dos dois tipos como drop raro.</li>
            <li data-i18n-html="aviso.v3Pseudo"><b>Pseudo-lendários:</b> Dragonite, Tyranitar, Salamence, Metagross, Garchomp, Hydreigon, Goodra e Kommo-o ganharam golpes revisados.</li>
            <li data-i18n-html="aviso.v3Xp"><b>XP por nível de hunt:</b> todo pokemon do mesmo nível de hunt dá o mesmo XP — a Eevee Nv 40 rende o mesmo que o Ivysaur Nv 40.</li>
            <li data-i18n-html="aviso.v3Wiki"><b>Wiki:</b> capítulo novo das <b>Bicicletas</b>, com a velocidade de cada raridade e como conseguir uma.</li>
          </ul>
        </section>
      </section>

      <!-- 2 · v1.85.0 — AS BIKES CHEGARAM: raios, confete e as cinco bikes crescendo com a raridade. -->
      <section class="novidade" data-aviso="2" hidden="">
        <section class="aviso-bikes">
          <div class="ab-raios" aria-hidden="true"></div>
          <div class="ab-confete" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
          <span class="ab-fita" data-i18n="aviso.bikesFita">Nova feature</span>
          <h3 class="ab-titulo" data-i18n="aviso.bikesTitulo">As bikes chegaram ao PokeIdle!</h3>
          <div class="ab-bikes">
            <div class="ab-bike rar-comum"><img src="/img/itens/bicicleta-comum.png" alt=""><b>+15%</b><span data-i18n="casa.rar.comum">Comum</span></div>
            <div class="ab-bike rar-incomum"><img src="/img/itens/bicicleta-incomum.png" alt=""><b>+25%</b><span data-i18n="casa.rar.incomum">Incomum</span></div>
            <div class="ab-bike rar-rara"><img src="/img/itens/bicicleta-rara.png" alt=""><b>+50%</b><span data-i18n="casa.rar.rara">Rara</span></div>
            <div class="ab-bike rar-mitica"><img src="/img/itens/bicicleta-mitica.png" alt=""><b>+75%</b><span data-i18n="casa.rar.mitica">Mítica</span></div>
            <div class="ab-bike rar-lendaria"><img src="/img/itens/bicicleta-lendaria.png" alt=""><b>+100%</b><span data-i18n="casa.rar.lendaria">Lendária</span></div>
          </div>
          <p class="ab-sub" data-i18n-html="aviso.bikesSub">Cinco raridades, de <b>+15%</b> até <b>+100% de velocidade</b>. Seu pokemon chega mais rápido em cada selvagem da hunt — e agora você também pedala pela praça de Cerulean.</p>
        </section>
        <section class="aviso-bloco ab-passos">
          <div class="ab-passo">
            <span class="ab-passo-ico"><img src="/img/itens/fragmento-bicicleta.png" alt=""></span>
            <div><h4 data-i18n="aviso.bikePasso1T">Cace na Outland</h4><p data-i18n-html="aviso.bikePasso1">Todo abate na Outland pode soltar um <b>Fragmento de Bicicleta</b>. Nas Outlands mais altas a chance vai até <b>×8</b>, e o Loot Boost ajuda.</p></div>
          </div>
          <div class="ab-passo">
            <span class="ab-passo-ico"><span class="ab-prof"></span></span>
            <div><h4 data-i18n="aviso.bikePasso2T">Monte no Professor Carvalho</h4><p data-i18n-html="aviso.bikePasso2"><b>10 fragmentos</b> viram uma bicicleta sorteada, com as mesmas chances da Casa. A Lendária sai 1 vez em 20.000.</p></div>
          </div>
          <div class="ab-passo">
            <span class="ab-passo-ico"><img src="/img/itens/bicicleta-lendaria.png" alt=""></span>
            <div><h4 data-i18n="aviso.bikePasso3T">Equipe e acelere</h4><p data-i18n-html="aviso.bikePasso3">Clique na bike em <b>Mochila → Itens Raros</b>. Dá pra ter várias, mas só uma fica equipada (troca a cada 5 minutos). Vale na hunt e na praça — não no PvP, Ginásio, Guild nem Boss.</p></div>
          </div>
        </section>
        <p class="aviso-lendaria" data-i18n-html="aviso.bikeLendaria">👑 Tirou uma <b>Bike Lendária</b>? O chat Mundo inteiro fica sabendo, em dourado. E bike e fragmento se vendem no <b>Mercado da Comunidade</b>.</p>
        <section class="aviso-bloco">
          <h3 data-i18n="aviso.tambemTitulo">Também nesta atualização</h3>
          <ul class="aviso-lista">
            <li data-i18n-html="aviso.tambemCasa"><b>Casas:</b> dá pra ter várias e escolher em qual morar, clicando nela em Itens Raros. Trocar de casa tira os pokemon do XP Share.</li>
            <li data-i18n-html="aviso.tambemGolpes"><b>Golpes:</b> todo golpe acima de 15 de poder recarrega mais rápido, e a última evolução dos 20 iniciais ganhou 13 golpes novos.</li>
            <li data-i18n-html="aviso.tambemRecompensa"><b>Sorteios:</b> casa e bike sorteadas abrem uma tela de recompensa, e o boss avisa se a peça de TM caiu.</li>
            <li data-i18n-html="aviso.tambemCarvalho"><b>Professor Carvalho</b> de cara nova: maior no computador e com tamanho fixo no celular.</li>
            <li data-i18n-html="aviso.tambemMais"><b>E mais:</b> Auto Lock com a nota que você escolher, aviso antes de anunciar por Coins e a Tabela do PvP com o top 100.</li>
          </ul>
        </section>
      </section>

      <!-- 1 · v1.69.0 — o fim da Pesca, o Campeonato e o limite de contas. -->
      <section class="novidade" data-aviso="1" hidden="">
        <section class="aviso-bloco">
          <h3 data-i18n="aviso.pescaTitulo">Fechamos a Pesca.</h3>
          <p data-i18n-html="aviso.pesca1">A Pesca era um modo de hunt <b>pouco usado</b>, e muito difícil de equilibrar com as hunts normais — cada ajuste num lado mexia no outro, e nunca sobrava tempo para os dois ficarem bons ao mesmo tempo.</p>
          <p data-i18n-html="aviso.pesca2">O foco do PokeIdle.io está indo para o <b>PvP e as disputas entre treinadores</b>. Features que não olham para esse lado — Pesca, Profissão e afins — deixam de ser prioridade daqui para frente.</p>
          <p class="aviso-premio" data-i18n-html="aviso.pesca3">Aos pescadores: você foi ressarcido em <b>1 diamante por nível de Pesca</b> que tinha. Se o seu nível era 100, foram <b>100 diamantes</b> depositados automaticamente na sua conta — não precisa pedir nada.</p>
          <p data-i18n-html="aviso.pesca4">Obrigado a todos que jogaram a Pesca, e obrigado pela compreensão.</p>
        </section>
        <section class="aviso-bloco">
          <h3 data-i18n="aviso.campTitulo">E chega o Campeonato Mundial.</h3>
          <p data-i18n-html="aviso.camp1">O primeiro torneio de verdade do jogo, em <b>eliminação dupla</b>, com <b>R$ 1.000</b> para o campeão, <b>R$ 500</b> para o vice e <b>R$ 250</b> para o terceiro. Quem está fora do Brasil recebe o equivalente em USDT na rede Solana.</p>
          <p data-i18n-html="aviso.camp2">Ainda <b>em desenvolvimento</b> — não dá para se inscrever hoje. O formato inteiro já está na aba <b>Campeonato</b>, no menu do topo, ao lado do Ginásio.</p>
        </section>
        <section class="aviso-bloco aviso-regra">
          <h3 data-i18n="aviso.multiTitulo">Limite de 4 contas por jogador.</h3>
          <p data-i18n-html="aviso.multi1">Para conter o multi-conta, o limite passa a ser de <b>4 contas por pessoa</b>. Vamos identificar os IPs de todas as contas, e as que <b>passarem desse limite serão removidas</b>.</p>
          <p data-i18n-html="aviso.multi2">A medida existe para proteger quem joga de verdade: ranking, Mercado e PvP só fazem sentido quando o placar é entre pessoas, não entre fazendas de contas.</p>
        </section>
      </section>
    </div>
    <div class="aviso-jogo-pe">
      <div class="novidade-nav">
        <button type="button" id="aviso-mais-antiga" class="casa-btn nov-seta">‹</button>
        <div class="novidade-pontos" id="aviso-pontos"></div>
        <button type="button" id="aviso-mais-nova" class="casa-btn nov-seta">›</button>
      </div>
      <button type="button" id="aviso-jogo-ok" class="login-acao">Bora pedalar!</button>
    </div>
  </div>
</div>

<!-- Comunidade Discord — uma vez por visita, salvo se o jogador dispensar.

     Refeito em 21/10/2026: a arte de antes (`img/discord-lancamento-*.jpg`) saiu, a pedido do
     dono, e o pop-up encolheu para um CARTÃO — o convite e os DOIS botões grandes lado a lado.
     O "Já estou dentro!" era um link sublinhado embaixo do botão, e quem já estava no servidor
     fechava o pop-up a cada visita em vez de dispensá-lo de uma vez. O palco do topo é desenhado
     pelo jogo: o símbolo do Discord num disco, balões de conversa subindo e dois shinys da capa do
     portal (montados por `mostrarPopupDiscord` e tirados ao fechar — o relógio deles para junto). -->
<div id="discord-popup" class="modal modal-acima hidden" aria-hidden="true">
  <div class="modal-caixa caixa-discord-popup" role="dialog" aria-labelledby="discord-popup-titulo">
    <button type="button" id="discord-popup-fechar" class="discord-popup-fechar" data-i18n-attr="aria-label:discordPop.fechar" aria-label="Fechar">×</button>
    <div class="discord-popup-palco" aria-hidden="true">
      <span class="dcp-pk dcp-esq"></span>
      <span class="dcp-disco"><span class="dcp-logo"></span></span>
      <span class="dcp-pk dcp-dir"></span>
      <span class="dcp-balao b1">GG</span>
      <span class="dcp-balao b2"><i></i><i></i><i></i></span>
      <span class="dcp-balao b3">✨</span>
    </div>
    <div class="modal-corpo discord-popup-corpo">
      <h2 class="discord-popup-titulo" id="discord-popup-titulo" data-i18n="discordPop.titulo">Entre na comunidade!</h2>
      <p class="discord-popup-sub" data-i18n="discordPop.sub">Sorteios, eventos e dicas: tudo sai primeiro no Discord.</p>
      <div class="discord-popup-botoes">
        <a id="discord-popup-cta" class="discord-popup-cta" href="https://discord.gg/pokeidle" target="_blank" rel="noopener noreferrer">
          <span class="dcp-ico" aria-hidden="true"></span><span data-i18n="discordPop.cta">Entrar no Discord</span>
        </a>
        <button type="button" id="discord-popup-dispensar" class="discord-popup-dispensar" data-i18n-attr="title:discordPop.jaDentroDica" title="Não mostrar este convite de novo">
          <span class="dcp-ok" aria-hidden="true">✓</span><span data-i18n="discordPop.jaNaComunidade">Já estou dentro!</span>
        </button>
      </div>
    </div>
  </div>
</div>

<!-- Captura de shiny — aviso global na tela de todos os jogadores (5 s). -->
<div id="shiny-anuncio" class="shiny-anuncio hidden" aria-live="polite" aria-hidden="true">
  <div class="modal-caixa shiny-anuncio-caixa abre-ficha" role="button">
    <div class="shiny-anuncio-etiqueta">✨ SHINY</div>
    <h2 class="shiny-anuncio-titulo" id="shiny-anuncio-titulo"><b>Joao_Bar</b> capturou um Shiny <b>Silcoon</b>!</h2>
    <div class="shiny-anuncio-sprites">
      <div class="shiny-anuncio-slot" id="shiny-anuncio-jogador"></div>
      <div class="shiny-anuncio-meio" aria-hidden="true">✨</div>
      <div class="shiny-anuncio-slot shiny-anuncio-slot-poke" id="shiny-anuncio-poke"></div>
    </div>
    <!-- "Ver a ficha do pokemon ›" — o clique na caixa abre a ficha dele (`ligarFichaNoAnuncio`). -->
    <p class="anuncio-ficha-dica" id="shiny-anuncio-dica">Ver a ficha do pokemon ›</p>
  </div>
</div>

<!-- O LENDÁRIO CAPTURADO na Arena Mística, na tela de TODO MUNDO online. Irmão do aviso de shiny
     logo acima, com a festa um degrau acima de tudo no jogo: a tela inteira tinge de roxo e
     escurece nas bordas, relâmpagos piscam, raios giram atrás do lendário e faíscas sobem — é o
     acontecimento mais raro do jogo. Só a CAIXA do meio captura clique (abre a ficha do lendário,
     desde 17/10/2026): o resto deixa passar, e quem está caçando segue jogando por baixo. O
     conteúdo é montado por `mostrarAnuncioLendarioCaptura` (app.js). -->
<div id="lendario-anuncio" class="lendario-anuncio hidden" aria-live="polite" aria-hidden="true">
  <div class="la-tinta" aria-hidden="true"></div>
  <div class="la-relampago" aria-hidden="true"></div>
  <div class="la-faiscas" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
  <div class="la-caixa">
    <div class="la-raios" aria-hidden="true"></div>
    <div class="la-selo" id="lendario-anuncio-selo"></div>
    <h2 class="la-titulo" id="lendario-anuncio-titulo"></h2>
    <div class="la-sprites">
      <div class="la-slot" id="lendario-anuncio-jogador"></div>
      <div class="la-slot la-slot-poke" id="lendario-anuncio-poke"></div>
    </div>
    <p class="la-sub" id="lendario-anuncio-sub"></p>
    <p class="anuncio-ficha-dica" id="lendario-anuncio-dica"></p>
  </div>
</div>

<!-- A CASA ou a BICICLETA Mítica/Lendária tirada no Professor Carvalho, na tela de TODO MUNDO online (25/10/2026,
     pedido de jogador: "adiciona aquela msg que treme a tela de todo mundo… pra casa Mística"). Irmã da tela roxa do
     lendário logo acima, na cor da raridade: roxa na Mítica (`.da-mitica`), dourada na Lendária (`.da-lendaria`). A tinta
     respira, as faíscas sobem e a caixa TREME na entrada. Nada captura clique: quem está caçando segue jogando por
     baixo. O conteúdo é montado por `mostrarAnuncioDropRaro` (app.js). -->
<div id="drop-anuncio" class="drop-anuncio hidden" aria-live="polite" aria-hidden="true">
  <div class="da-tinta" aria-hidden="true"></div>
  <div class="da-faiscas" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
  <div class="da-caixa">
    <div class="da-raios" aria-hidden="true"></div>
    <div class="da-selo" id="drop-anuncio-selo"></div>
    <h2 class="da-titulo" id="drop-anuncio-titulo"></h2>
    <div class="da-sprites">
      <div class="da-slot" id="drop-anuncio-jogador"></div>
      <div class="da-slot da-slot-item" id="drop-anuncio-item"></div>
    </div>
    <p class="da-sub" id="drop-anuncio-sub"></p>
  </div>
</div>

<!-- O guia do primeiro login — o caminho do jogador novo, do inicial ao chat. Ver
     `TUTORIAL_PASSOS` no app.js.

     Duas marcas: o RECORTE (`#tutorial-spot`) é o buraco aceso na tela escura, e o ANEL
     (`#tutorial-anel`) é o dedo apontando dentro dele. Nos passos que moram num modal o
     recorte abre a tela inteira e o anel aponta a aba de que o texto fala — com uma marca
     só, o jogador veria um botão aceso sem nada em volta e não aprenderia onde ele fica. -->
<div id="tutorial" class="tutorial hidden" aria-hidden="true">
  <div class="tutorial-spot" id="tutorial-spot"></div>
  <div class="tutorial-anel hidden" id="tutorial-anel" aria-hidden="true"></div>
  <div class="tutorial-caixa modal-caixa" id="tutorial-caixa" role="dialog" aria-labelledby="tutorial-titulo" aria-describedby="tutorial-corpo">
    <div class="tutorial-topo">
      <div class="tutorial-contador" id="tutorial-contador"></div>
      <!-- Pular grava `tutorialVisto` igual a terminar: quem saiu no passo 3 não quer o guia
           de volta no login seguinte. -->
      <button type="button" class="tutorial-pular" id="tutorial-pular" data-i18n="tut.pular">Pular guia</button>
    </div>
    <div class="tutorial-trilho" aria-hidden="true"><i id="tutorial-progresso"></i></div>
    <h2 class="tutorial-titulo" id="tutorial-titulo"></h2>
    <div class="tutorial-corpo" id="tutorial-corpo"></div>
    <div class="tutorial-acoes">
      <button type="button" class="btn-apagado hidden" id="tutorial-voltar" data-i18n="tut.voltar">Voltar</button>
      <button type="button" class="login-acao" id="tutorial-proximo" data-i18n="tut.proximo">Próximo</button>
    </div>
  </div>
</div>

<!-- O mesmo aviso do portal, agora dentro do jogo. Fica no rodapé, pequeno e sempre visível:
     quem chegou direto por uma sessão salva nunca passou pela tela de entrada. -->
<div class="rodape-fan rodape-fan-jogo">
  <span data-i18n="fan.avisoCurto">Fan game — Pokemon © Nintendo / Game Freak / Creatures / The Pokemon Company.</span>
  <a href="/terms" target="_blank" rel="noopener" data-i18n="fan.termos">Termos, Privacidade e Direitos</a>
</div>

<!-- Versão do build. Serve de âncora em relato de bug: dela dá para achar o commit. -->
<div id="versao" class="versao" data-i18n-attr="title:tip.versao" title="versão do jogo">v1.414.1</div>


<!-- Erros de módulo ES são silenciosos na tela; jogar na UI evita depurar no escuro. -->
<script nonce="">
  window.addEventListener('error', (e) => {
    const el = document.getElementById('login-erro');
    if (el) el.textContent = `erro: ${e.message} (${(e.filename || '').split('/').pop()}:${e.lineno})`;
  });
  window.addEventListener('unhandledrejection', (e) => {
    const el = document.getElementById('login-erro');
    if (el) el.textContent = `falha: ${e.reason?.message ?? e.reason}`;
  });
</script>
<script nonce="" type="module" src="app.js?v=1.414.1"></script>
<script type="module" src="https://static.cloudflareinsights.com/beacon.min.js/vce701823e78c4301a35b7e07294d87301792088814092" integrity="sha512-UKNk8GbxkABxKcXYuLkO16EleLGUkcvJWtpSNmExE0Too3ZaFAxTscNWEc1OdAv5/BikHawapSCaiD2XCmp+Bw==" nonce="" data-cf-beacon="{&quot;version&quot;:&quot;2024.11.0&quot;,&quot;token&quot;:&quot;77765626ca37467c98d87fc73e69fc73&quot;,&quot;r&quot;:1,&quot;spa&quot;:2}" crossorigin="anonymous"></script>


<div class="idiomas" title="Idioma"><button type="button" id="btn-sair" class="sair-btn" title="Sair da conta" aria-label="Sair da conta">
    <svg viewBox="0 0 20 20" width="17" height="17" aria-hidden="true">
      <path d="M12 3H5a1.5 1.5 0 0 0-1.5 1.5v11A1.5 1.5 0 0 0 5 17h7" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round"></path>
      <path d="M14 6.5 17.5 10 14 13.5" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"></path>
      <line x1="17" y1="10" x2="8.5" y2="10" stroke="currentColor" stroke-width="2.1" stroke-linecap="round"></line>
    </svg></button><span class="sair-sep"></span><button type="button" class="idioma-btn on" data-idioma="pt" title="Português" aria-label="Português"><svg viewBox="0 0 28 20" aria-hidden="true">
  <rect width="28" height="20" fill="#009c3b"></rect>
  <path d="M14 3 25 10 14 17 3 10Z" fill="#ffdf00"></path>
  <circle cx="14" cy="10" r="4" fill="#002776"></circle>
  <rect x=".5" y=".5" width="27" height="19" fill="none" stroke="#1b0a12" stroke-width="1.4"></rect>
</svg></button><button type="button" class="idioma-btn" data-idioma="en" title="English" aria-label="English"><svg viewBox="0 0 28 20" aria-hidden="true">
  <rect width="28" height="20" fill="#f5f5f5"></rect>
  <g fill="#b22234">
    <rect width="28" height="3"></rect><rect y="6" width="28" height="3"></rect>
    <rect y="12" width="28" height="3"></rect><rect y="17" width="28" height="3"></rect>
  </g>
  <rect width="12" height="11" fill="#3c3b6e"></rect>
  <rect x=".5" y=".5" width="27" height="19" fill="none" stroke="#1b0a12" stroke-width="1.4"></rect>
</svg></button><button type="button" class="idioma-btn" data-idioma="es" title="Español" aria-label="Español"><svg viewBox="0 0 28 20" aria-hidden="true">
  <rect width="28" height="20" fill="#aa151b"></rect>
  <rect y="5" width="28" height="10" fill="#f1bf00"></rect>
  <rect x=".5" y=".5" width="27" height="19" fill="none" stroke="#1b0a12" stroke-width="1.4"></rect>
</svg></button><span class="idiomas-sep"></span><a class="rede-btn discord" href="https://discord.gg/pokeidle" target="_blank" rel="noopener noreferrer" title="Discord" aria-label="Discord"><img src="/img/social-discord.svg" alt="" style="height: 20px; width: 20px; object-fit: contain;"></a><a class="rede-btn x" href="https://x.com/pokeidleio" target="_blank" rel="noopener noreferrer" title="X" aria-label="X"><img src="/img/social-x.png" alt="" style="height: 20px; width: 20px; object-fit: contain;"></a><a class="rede-btn instagram" href="https://www.instagram.com/playidle.io/" target="_blank" rel="noopener noreferrer" title="Instagram" aria-label="Instagram"><img src="/img/social-instagram.png" alt="" style="height: 20px; width: 20px; object-fit: contain;"></a><button type="button" id="btn-novidades" class="rede-btn patchnotes" title="Novidades no PokeIdle" aria-label="Novidades no PokeIdle">!</button></div><div>
        <div id="bot-controle-triplo" style="position: fixed; top: 10px; right: 10px; z-index: 99999; background: #1a1a1a; color: #fff; padding: 12px; border-radius: 10px; font-family: sans-serif; box-shadow: 0 4px 12px rgba(0,0,0,0.5); font-size: 12px; display: flex; flex-direction: column; gap: 10px; width: 220px; border: 1px solid #333;">
            <div style="font-weight: bold; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #333; padding-bottom: 6px; color: #4ade80;">
                <span>Auto Bot Manager</span>
                <button id="btn-minimizar" style="background: #333; color: #fff; border: 1px solid #555; border-radius: 4px; width: 20px; height: 20px; cursor: pointer; font-size: 10px; display: flex; align-items: center; justify-content: center; padding: 0;">+</button>
            </div>
            
            <div id="painel-conteudo" style="display: none; flex-direction: column; gap: 10px;">
                <!-- Auto Hunt -->
                <div style="display: flex; flex-direction: column; gap: 4px;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-weight: 500;">Auto Hunt</span>
                        <button id="btn-auto-hunt" style="background: rgb(34, 197, 94); color: rgb(255, 255, 255); border-width: medium; border-style: none; border-color: currentcolor; border-image: none; padding: 4px 12px; border-radius: 6px; cursor: pointer; font-weight: bold; font-size: 11px;">ON</button>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-size: 10px; color: #888;">Tempo (s):</span>
                        <input type="number" id="input-tempo-hunt" value="600" style="width: 70px; background: #111; color: #fff; border: 1px solid #444; border-radius: 4px; padding: 3px; text-align: center; font-size: 11px;">
                    </div>
                    <label style="cursor: pointer; display: flex; align-items: center; gap: 6px; margin-top: 4px; font-size: 11px;">
                        <input type="checkbox" id="chk-sync-risco" style="cursor: pointer;" checked=""> Sincronizar Poção (100% - Risco)
                    </label>
                </div>

                <!-- Auto Potion -->
                <div style="border-top: 1px solid #333; padding-top: 8px; display: flex; flex-direction: column; gap: 4px;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-weight: 500;">Auto Potion</span>
                        <button id="btn-auto-potion" style="background: rgb(34, 197, 94); color: rgb(255, 255, 255); border-width: medium; border-style: none; border-color: currentcolor; border-image: none; padding: 4px 12px; border-radius: 6px; cursor: pointer; font-weight: bold; font-size: 11px;">ON</button>
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
                        <button id="btn-auto-ball" style="background: rgb(34, 197, 94); color: rgb(255, 255, 255); border-width: medium; border-style: none; border-color: currentcolor; border-image: none; padding: 4px 12px; border-radius: 6px; cursor: pointer; font-weight: bold; font-size: 11px;">ON</button>
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
    </div><button type="button" id="tc-ping" class="tc-ping marco mostra hidden" title="Toque para abrir o painel da semana"></button></body>