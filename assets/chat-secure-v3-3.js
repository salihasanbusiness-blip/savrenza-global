/* SAVRENZA ENERGY — isolated, floating, accessible customer-support widget.
   The API key must remain on the Cloudflare server; never place it in this file. */
(() => {
  "use strict";
  if (document.getElementById("savrenza-chat-host")) return;

  const host = document.createElement("div");
  host.id = "savrenza-chat-host";
  document.body.appendChild(host);
  const root = host.attachShadow({mode: "open"});
  root.innerHTML = `
  <style>
    @media(max-width:700px) {
      :host { pointer-events:none }
      :host .launcher { display:none!important }
      :host .panel:not([hidden]) { pointer-events:auto }
    }
    :host { all: initial; position:fixed; right:24px; bottom:23px; z-index:2147483000;
      font-family:Inter,ui-sans-serif,system-ui,-apple-system,"Segoe UI",Arial,sans-serif;
      color:#f4fbff; font-synthesis:none }
    /* Suppress the floating launcher only while the contact form is on-screen.
       The navigation and the form's own chat link remain available. */
    :host(.contact-in-view) .launcher, :host(.hero-in-view) .launcher {display:none}
    /* Mobile visitors use the visible in-page AI buttons instead.
       Keep the panel functional after opening from those buttons. */
    @media(max-width:700px) { .launcher {display:none!important} }
    *,*::before,*::after { box-sizing:border-box }
    button,textarea { font:inherit }
    button { cursor:pointer; -webkit-tap-highlight-color:transparent }
    button:focus-visible,textarea:focus-visible {outline:3px solid #b0ed84;outline-offset:3px}
    [hidden] {display:none!important}
    .launcher {display:flex; align-items:center; gap:11px; border:1px solid rgba(255,255,255,.2);
      color:#0a2526; background:linear-gradient(125deg,#b6f27e 2%,#d7f9a4 100%);
      border-radius:999px; padding:12px 18px 12px 11px; box-shadow:0 10px 38px #0007, 0 0 0 4px #88ce6c17;
      min-height:58px; font-size:13px; font-weight:800; transition:transform .16s ease,box-shadow .16s }
    .launcher:hover {transform:translateY(-2px);box-shadow:0 16px 40px #0008}
    .launchmark {height:36px;width:36px;background:#092b32;border-radius:50%;display:grid;place-items:center;color:#c0f690}
    .launchmark svg {width:22px;height:22px}
    .launchlabel{white-space:nowrap}
    .launchdot {width:8px;height:8px;border-radius:50%;background:#368d5b;box-shadow:0 0 0 3px #358f6022}
    .panel {position:absolute; right:0; bottom:74px; width:min(395px,calc(100vw - 22px));
      height:min(625px,calc(100dvh - 116px)); background:#0b1e2b;
      border:1px solid #3b6661; border-radius:22px; overflow:hidden; box-shadow:0 24px 85px #000b;
      display:flex; flex-direction:column; isolation:isolate; animation:slideUp .18s ease-out}
    @keyframes slideUp {from{opacity:.45;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
    .head {flex:none;display:flex;align-items:center;gap:12px;padding:16px 15px;
      background:linear-gradient(110deg,#0d3440,#0d2532 70%,#132f35);
      border-bottom:1px solid #3f645e}
    .brand {width:45px;height:45px;border-radius:13px;display:grid;place-items:center;
      color:#09231b;background:linear-gradient(135deg,#a6ed7c,#f3d49a);font-weight:1000;font-size:25px;
      box-shadow:inset 0 0 0 1px #e3fca6}
    .brandtext {min-width:0;flex:1;display:flex;flex-direction:column;gap:3px}
    .brandtext strong {font-weight:850;font-size:15px;letter-spacing:.035em;color:#fff}
    .brandtext small {color:#bdcfd4;font-size:11px;letter-spacing:.005em}
    .close {flex:none;display:grid;place-items:center;width:34px;height:34px;
      border-radius:10px;border:1px solid #3b6264;background:#ffffff0c;color:#e6f3f4;font-size:23px;line-height:1}
    .close:hover {background:#ffffff19}
    .bar {flex:none;display:flex;align-items:center;gap:8px;background:#122e39;color:#c9dce0;
      padding:9px 15px;border-bottom:1px solid #274954;font-size:11px;line-height:1.3}
    .statusdot {flex:none;width:7px;height:7px;border-radius:50%;background:#e4c076}
    .statusdot.ready {background:#88e3a4}
    .conversation {flex:1;min-height:0;overflow:auto;padding:20px 14px 12px;display:flex;
      align-items:flex-start;flex-direction:column;gap:13px;scrollbar-width:thin;scrollbar-color:#365e5a transparent;
      overscroll-behavior:contain;background:radial-gradient(circle at top right,#173744 0%,#0b1e2b 62%)}
    .intro {align-self:center;text-align:center;padding:5px 15px 10px;color:#aebfc7;font-size:11px;line-height:1.5}
    .intro b {display:block;color:#eff9f5;font-size:17px;line-height:1.4;letter-spacing:-.02em;margin:7px 0 6px}
    .message {max-width:89%;white-space:pre-wrap;overflow-wrap:anywhere;font-size:13px;line-height:1.65;
      padding:12px 14px;border-radius:16px}
    .message.bot {align-self:flex-start;background:#1a3b46;border:1px solid #315963;color:#e9f3f5;
      border-bottom-left-radius:5px}
    .message.user {align-self:flex-end;background:#b8f289;color:#0a2520;font-weight:550;
      border-bottom-right-radius:5px}
    .message.notice {align-self:flex-start;background:#344331;color:#f0f8dc;
      border:1px solid #748f59;border-bottom-left-radius:5px}
    .message.typing {color:#bcced1;font-style:italic}
    .quick {display:flex;gap:7px;flex-wrap:wrap;padding:11px 14px 12px;background:#0e2532;
      border-top:1px solid #244552}
    .quick button {background:#1a3c42;border:1px solid #456a5a;border-radius:999px;color:#def0e5;
      padding:8px 11px;font-size:11px;white-space:nowrap}
    .quick button:hover {border-color:#c3f39a;background:#244d46}
    .escalation {margin:0 14px 12px;padding:12px;border-radius:13px;background:#25342e;border:1px solid #5b8464}
    .escalation strong{font-size:12px;color:#eff9e3}
    .escalation p{margin:7px 0 10px;font-size:11px;line-height:1.55;color:#cedfd5}
    .email {border:0;background:#bff28d;border-radius:9px;color:#0d2920;
      font-size:12px;font-weight:800;padding:10px 13px}
    .verification{background:#102938;padding:8px 14px;display:flex;flex-wrap:wrap;align-items:center;gap:6px;border-top:1px solid #2b4e50}
    .verification small{font-size:10px;color:#bfcfd3;line-height:1.45}
    .form {flex:none;display:flex;align-items:flex-end;gap:9px;padding:12px 13px 10px;
      background:#102938;border-top:1px solid #365860}
    .form textarea {width:100%;flex:1;min-width:0;resize:none;max-height:108px;min-height:43px;
      border-radius:12px;background:#091e2b;color:white;border:1px solid #3c6167;
      padding:11px 12px;outline:none;font-size:13px;line-height:20px}
    .form textarea::placeholder {color:#a9bcc4}
    .form textarea:focus {border-color:#a9ea83}
    .submit {flex:none;width:43px;height:43px;border:0;border-radius:11px;background:#b8f18a;
      display:grid;place-items:center;color:#0b2b21}
    .submit svg {width:19px;height:19px}
    .submit:disabled {opacity:.45;cursor:wait}
    .foot {display:flex;align-items:center;justify-content:space-between;gap:4px;padding:0 15px 12px;
      background:#102938;color:#9db9c1;font-size:10px}
    .foot a,.foot button {background:none;border:0;color:#c6efad;font-size:10px;padding:0;text-decoration:none}
    .foot a:hover,.foot button:hover{text-decoration:underline}
    /* Keep the assistant accessible without obscuring page content. */
    @media(max-width:600px) {
      .launcher{width:49px;height:49px;min-height:49px;padding:5px;justify-content:center;gap:0;box-shadow:0 6px 22px #0008}
      .launchmark{width:37px;height:37px;flex:none}
      .launchlabel,.launchdot{display:none}
      .panel{bottom:59px}

      :host {right:12px;bottom:12px}
      .panel {right:0;bottom:69px;width:calc(100vw - 24px);height:min(600px,calc(100dvh - 94px));border-radius:18px}
      .launcher {min-height:53px;padding:9px 14px 9px 9px}
      .launchmark {width:34px;height:34px}
    }
    @media(max-width:600px) and (max-height:690px){.panel{height:calc(100dvh - 87px)}.intro{padding:0 8px 2px}.conversation{padding-top:10px}}
    @media(max-width:330px) {.launchlabel{font-size:11px}.panel{width:calc(100vw - 14px);right:-5px}}
    @media(prefers-reduced-motion:reduce){.panel{animation:none}.launcher{transition:none}}
    @media screen and (max-width: 900px) {
      button#launch.launcher {display:none!important;visibility:hidden!important;pointer-events:none!important}
    }
  </style>
  <button id="launch" class="launcher" type="button" aria-label="Open SAVRENZA AI chat"
    aria-controls="panel" aria-expanded="false">
    <span class="launchmark" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M12 2.5 14.5 9.5 21.5 12 14.5 14.5 12 21.5 9.5 14.5 2.5 12 9.5 9.5 12 2.5Z" fill="currentColor"/></svg></span>
    <span class="launchlabel">Chat with SAVRENZA AI</span><span class="launchdot" aria-hidden="true"></span>
  </button>
  <section id="panel" class="panel" role="dialog" aria-modal="false" aria-label="SAVRENZA AI support" hidden>
    <header class="head"><span class="brand" aria-hidden="true">S</span>
      <span class="brandtext"><strong>SAVRENZA ENERGY</strong><small>Digital support · AI when available</small></span>
      <button id="close" class="close" type="button" aria-label="Close chat">×</button>
    </header>
    <div class="bar"><span class="statusdot" id="dot"></span><span id="status">Checking AI service…</span></div>
    <main class="conversation" id="messages" role="log" aria-live="polite" aria-relevant="additions text">
      <div class="intro"><span aria-hidden="true">✦ &nbsp; SAVRENZA AI &nbsp; ✦</span>
        <b>How can we help you today?</b>
        Explore cleaner energy, battery storage, and possible collaborations.</div>
      <div class="message bot">Welcome to SAVRENZA ENERGY. Ask about solar, storage or partnerships. Live AI responses are available only when activated.</div>
    </main>
    <div id="chips" class="quick"><button type="button" data-q="Tell me about commercial solar energy.">☀ Solar</button>
      <button type="button" data-q="What should a business know about battery storage?">▣ Battery storage</button>
      <button type="button" data-q="How can I discuss a partnership with SAVRENZA ENERGY?">↗ Partnerships</button></div>
    <div id="followup" class="escalation" hidden><strong>Need more help?</strong>
      <p>No live agent is available. We can prepare an email with your question and chat summary. You must send the email yourself.</p>
      <button id="email" class="email" type="button">Prepare an email ↗</button></div>
    <div id="verify" class="verification" hidden><div id="turnstile-holder"></div><small>Human verification helps protect this AI service.</small></div>
    <form id="form" class="form"><textarea id="input" rows="1" maxlength="800"
      aria-label="Write your question" placeholder="Write your message…" required></textarea>
      <button id="send" class="submit" type="submit" aria-label="Send message">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
      </button></form>
    <footer class="foot"><span>Automated support · No sensitive information</span>
      <span><a href="/privacy.html" target="_blank" rel="noopener">Privacy</a> · <button id="help" type="button">Need follow-up?</button></span></footer>
  </section>`;

  const $ = id => root.getElementById(id);
  const panel = $("panel"), launch=$("launch"), input=$("input"), log=$("messages"), form=$("form");
  const status=$("status"), dot=$("dot"), followup=$("followup"), submit=$("send");
  const setMobileLauncherVisibility=()=>{
    const mobile=window.matchMedia("(max-width: 900px)").matches;
    launch.hidden=mobile;
    launch.style.setProperty("display",mobile?"none":"",mobile?"important":"");
  };
  setMobileLauncherVisibility();
  window.addEventListener("resize",setMobileLauncherVisibility,{passive:true});
  let history=[], pending=false, aiConfigured=false, touched=false, turnstileKey=null, challengeToken=null, challengeWidget=null, pendingQuestion=null;
  let contactInView=false, heroInView=false;
  let lastOpener=launch;
  const isBg = t => /[\u0400-\u04ff]/.test(t);
  const syncLauncher = () => {
    host.classList.toggle("contact-in-view", contactInView && panel.hidden);
    host.classList.toggle("hero-in-view", heroInView && panel.hidden && window.matchMedia("(max-width: 700px)").matches);
  };
  const contactCard=document.querySelector(".contact-card");
  if(contactCard && "IntersectionObserver" in window){
    const observer=new IntersectionObserver(entries=>{
      contactInView=entries.some(entry=>entry.isIntersecting);
      syncLauncher();
    }, {threshold:0});
    observer.observe(contactCard);
  }

  // The hero already contains an accessible AI chat button. On small screens,
  // hide the duplicate fixed launcher while the hero is visible.
  const heroSection=document.querySelector(".hero");
  if(heroSection && "IntersectionObserver" in window){
    const heroObserver=new IntersectionObserver(entries=>{
      heroInView=entries.some(entry=>entry.isIntersecting);
      syncLauncher();
    }, {threshold:0});
    heroObserver.observe(heroSection);
  }
  window.addEventListener("resize",syncLauncher,{passive:true});

  function openChat(focus=true,opener=launch){
    lastOpener=opener;
    panel.hidden=false;launch.setAttribute("aria-expanded","true");
    touched=true;syncLauncher();
    if(focus) input.focus({preventScroll:true});
  }
  function closeChat(){
    panel.hidden=true;launch.setAttribute("aria-expanded","false");
    try{sessionStorage.setItem("savrenza-chat-dismissed-v2","1")}catch(e){}
    syncLauncher();
    // Do not move keyboard focus to a button that is hidden over the contact form.
    if(lastOpener && lastOpener!==launch && lastOpener.isConnected)lastOpener.focus({preventScroll:true});
    else if(!contactInView)launch.focus({preventScroll:true});
    else document.querySelector(".contact-chat-link")?.focus({preventScroll:true});
  }
  launch.addEventListener("click",()=>panel.hidden?openChat(true,launch):closeChat());
  $("close").addEventListener("click",closeChat);
  document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!panel.hidden)closeChat()});
  document.querySelectorAll("[data-sav-open-chat]").forEach(a=>a.addEventListener("click",e=>{e.preventDefault();openChat(true,a)}));
  // Never open a dialog automatically: users should control when support appears.

  function loadTurnstile(sitekey){
    turnstileKey=sitekey;
    $("verify").hidden=false;
    const mount=()=>{
      if(!window.turnstile){window.setTimeout(mount,250);return}
      try{challengeWidget=window.turnstile.render($("turnstile-holder"),{
        sitekey,theme:"dark",size:"flexible",callback:token=>{challengeToken=token; if(pendingQuestion){const q=pendingQuestion;pendingQuestion=null;ask(q,true)}},
        "expired-callback":()=>{challengeToken=null},"error-callback":()=>{challengeToken=null}
      })}catch(e){status.textContent="Security verification could not load"}
    };
    if(window.turnstile){mount();return}
    const s=document.createElement("script");s.src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    s.async=true;s.defer=true;s.onload=mount;s.onerror=()=>{status.textContent="Security verification unavailable"};document.head.appendChild(s);
  }
  async function checkHealth(){
    try{
      const c=new AbortController();const timer=setTimeout(()=>c.abort(),6000);
      let r;try{r=await fetch("/api/health",{signal:c.signal,cache:"no-store"})}finally{clearTimeout(timer)}
      if(!r.ok)throw Error("status");
      const data=await r.json();aiConfigured=data.ai_enabled===true;
      status.textContent=aiConfigured?"AI enabled · Verification required":
        data.status==="security_pending"?"AI security setup pending":
        data.status==="missing_key"?"AI key missing": "AI paused · Guided answers only";
      dot.classList.toggle("ready",aiConfigured);
      const greeting=root.querySelector(".message.bot");
      if(greeting){greeting.textContent=aiConfigured
        ?"Welcome to SAVRENZA ENERGY. Ask a question about our energy-solutions concept. Replies are automated, not live human support."
        :"Welcome to SAVRENZA ENERGY. Live AI is currently paused. Choose a topic for general guidance, or prepare an enquiry email.";}
      if(aiConfigured&&data.turnstile_site_key)loadTurnstile(data.turnstile_site_key);
    }catch(e){aiConfigured=false;status.textContent="AI currently offline"}
  }
  checkHealth();

  function message(text,kind="bot"){
    const el=document.createElement("div");el.className="message "+kind;
    el.textContent=text;log.appendChild(el);log.scrollTop=log.scrollHeight;return el;
  }
  function offerEmail(){followup.hidden=false;log.scrollTop=log.scrollHeight;}
  const fallback = q => {
    const s=q.toLocaleLowerCase(),bg=isBg(q);
    // Factual offline guidance, not a generative AI reply.
    if(/(?:\bkw\b|\bkwh\b|kilowatt|kilovat|киловат|киловатчас|мощност.{0,20}енергия|енергия.{0,20}мощност)/iu.test(s))return bg
      ?"Киловат (kW) измерва мощност — колко бързо се използва или произвежда енергия. Киловатчас (kWh) измерва количество енергия. Например уред с мощност 1 kW, работещ един час, използва 1 kWh. Това е общо обяснение, не техническа оферта."
      :"A kilowatt (kW) measures power — the rate of producing or using energy. A kilowatt-hour (kWh) measures energy used over time. For example, a 1 kW device operating for one hour uses 1 kWh.";
    if(/solar|солар|фотоволта|панел/.test(s))return bg
      ?"Соларните системи могат да намалят зависимостта от мрежата. Реалната полза зависи от потреблението, сградата, цените и проектното решение. SAVRENZA ENERGY все още е концепция в развитие."
      :"Commercial solar may reduce grid purchases, but feasibility depends on demand, roof or land area, tariffs and engineering. SAVRENZA ENERGY is still a development-stage concept.";
    if(/battery|storage|батери|съхран/.test(s))return bg
      ?"Батериите могат да помогнат за управление на пиково потребление и използване на собствена слънчева енергия. Рентабилността изисква анализ на натоварването и тарифите."
      :"Battery storage can shift energy use and manage peak demand, but its business case depends on usage patterns, tariffs, technical design and costs.";
    if(/partner|collaborat|партньор|сътруд/.test(s))return bg
      ?"За предложения за партньорство пишете на info@savrenzaplatform.com с държава, опит и кратко описание. Това е проучвателна инициатива, не обявено партньорство."
      :"For an exploratory partnership enquiry, write to info@savrenzaplatform.com with your country, experience, and proposal. No established partner network is implied.";
    if(/supplier|licen|register|компани|фирма|лиценз|регистрира/.test(s))return bg
      ?"SAVRENZA ENERGY е бранд и концепция в развитие, а не обявен лицензиран доставчик на електроенергия или отделно регистрирано дружество."
      :"SAVRENZA ENERGY is a development-stage project, not a separately registered company or licensed electricity supplier.";
    if(/sav|bill|cost|price|save|спест|сметк|цен|гаран/.test(s))return bg
      ?"Конкретни спестявания и цени не могат да се гарантират. Нужна е техническа и финансова оценка на конкретния обект."
      :"No savings or price can be guaranteed. A site-specific technical and financial assessment would be required.";
    return null;
  };
  function upset(q){return /(?:angry|furious|upset|ridiculous|useless|stupid|idiot|scam|hate|terrible|real person|human agent|live agent|manager|complaint|некадър|бесен|ядосан|измама|ужас|безполез|оператор|истински човек|представител|жалба|мениджър|сърдит|глупак|искам човек)/iu.test(q)}
  async function ask(q, alreadyShown=false) {
    q=String(q||"").trim().slice(0,800);
    if(!q||pending)return;
    if(aiConfigured&&!challengeToken&&pendingQuestion){
      status.textContent="Complete verification before sending another message";
      return;
    }
    openChat(false);
    if(!alreadyShown){message(q,"user");input.value="";}
    if(aiConfigured&&!challengeToken){
      pendingQuestion=q;status.textContent="Complete verification to send your message";
      return;
    }
    history.push({role:"user",content:q});history=history.slice(-7);
    if(upset(q)){
      const reply=isBg(q)
        ?"Разбирам, че искате решение. В момента няма оператор на живо и няма да ви подвеждам, че може да ви прехвърлим. Можете да подготвите имейл с историята на разговора."
        :"I understand you want this resolved. There is no live agent available, so I cannot transfer you. You can prepare an email containing the chat history for follow-up.";
      message(reply,"notice");history.push({role:"assistant",content:reply});history=history.slice(-8);offerEmail();return;
    }
    if(!aiConfigured){
      const guided=fallback(q);
      const reply=guided || (isBg(q)
        ?"AI услугата още не е активирана. Засега мога да помогна с основни проверени въпроси или да подготвя имейл запитване."
        :"The full AI service has not yet been activated. I can answer a few basic FAQs or help prepare an email enquiry.");
      message(reply,"notice");history.push({role:"assistant",content:reply});
      if(!guided)offerEmail();history=history.slice(-8);return;
    }
    pending=true;submit.disabled=true;
    const typing=message(isBg(q)?"Подготвям отговор…":"Thinking…","typing");
    try{
      const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),23000);
      let response;
      try{response=await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},
         credentials:"same-origin",body:JSON.stringify({messages:history,turnstileToken:challengeToken}),signal:controller.signal})}
      finally{clearTimeout(timer)}
      const result=await response.json();typing.remove();
      if(!response.ok) {
        if(result.code==="NOT_CONFIGURED"){aiConfigured=false;status.textContent="AI not yet connected · Limited FAQ mode";}
        const reply=fallback(q) || (isBg(q)
          ?"В момента не мога да се свържа с AI услугата. Можете да подготвите запитване по имейл."
          :"I can't reach the AI service right now. You can prepare an email enquiry instead.");
        message(reply,"notice");history.push({role:"assistant",content:reply});history=history.slice(-8);offerEmail();return;
      }
      const reply=String(result.reply||"").trim().slice(0,3000);
      if(!reply)throw Error("empty");
      message(reply);history.push({role:"assistant",content:reply});
      if(result.needs_followup)offerEmail();
    }catch(e){
      typing.remove();
      const reply=fallback(q) || (isBg(q)
        ?"AI услугата временно не е достъпна. Можете да подготвите имейл запитване."
        :"The AI service is temporarily unavailable. You can prepare an email enquiry.");
      message(reply,"notice");history.push({role:"assistant",content:reply});offerEmail();
    }finally{
      challengeToken=null;
      if(challengeWidget!==null&&window.turnstile){try{window.turnstile.reset(challengeWidget)}catch(e){}}
      history=history.slice(-8);pending=false;submit.disabled=false;input.focus({preventScroll:true})
    }
  }
  form.addEventListener("submit",e=>{e.preventDefault();ask(input.value)});
  input.addEventListener("keydown",e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();form.requestSubmit()}});
  root.querySelectorAll("[data-q]").forEach(b=>b.addEventListener("click",()=>ask(b.dataset.q)));
  $("help").addEventListener("click",offerEmail);
  $("email").addEventListener("click",()=>{
    const summary=history.slice(-8).map(x=>(x.role==="user"?"Visitor":"AI assistant")+": "+x.content).join("\n\n").slice(0,3200);
    const body="Hello SAVRENZA ENERGY,\n\nI would like further help with this enquiry.\n\n"+summary+
      "\n\nMy name:\nMy country:\n\n(Please review and send this email from your email app.)";
    window.location.href="mailto:info@savrenzaplatform.com?subject="+
      encodeURIComponent("SAVRENZA ENERGY — customer enquiry")+"&body="+encodeURIComponent(body);
  });
})();
