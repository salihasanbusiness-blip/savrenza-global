(()=>{'use strict';
const mobile=()=>window.matchMedia('(max-width:700px)').matches;
function setup(){
for(const [mobileId,desktopId] of [['savMobileLanguageV16','localeSelect'],['savMobileCurrencyV16','currencySelect']]){
 const m=document.getElementById(mobileId),d=document.getElementById(desktopId);if(!m||!d||m.dataset.v20Ready)return;
 m.dataset.v20Ready='1';let signature='';
 const sync=()=>{const options=Array.from(d.options),sig=options.map(o=>o.value+'|'+o.textContent).join('~');if(sig!==signature){m.replaceChildren(...options.map(o=>o.cloneNode(true)));signature=sig}if(m.value!==d.value)m.value=d.value};
 m.addEventListener('change',()=>{d.value=m.value;d.dispatchEvent(new Event('input',{bubbles:true}));d.dispatchEvent(new Event('change',{bubbles:true}));sync()});
 d.addEventListener('change',sync);new MutationObserver(sync).observe(d,{childList:true,subtree:true,characterData:true});sync();setTimeout(sync,1000);
 }
}
function chat(){const host=document.getElementById('savrenza-chat-host');if(!host?.shadowRoot)return;const root=host.shadowRoot;if(root.getElementById('sav-v20-chat'))return;const style=document.createElement('style');style.id='sav-v20-chat';style.textContent=`@media(max-width:700px){#launch,.launcher{display:none!important;visibility:hidden!important;pointer-events:none!important}#panel,.panel{max-width:calc(100vw - 20px)!important;box-sizing:border-box!important}#panel:not([hidden]),.panel:not([hidden]){position:fixed!important;left:10px!important;right:10px!important;top:auto!important;bottom:calc(10px + env(safe-area-inset-bottom))!important;width:auto!important;height:min(70dvh,560px)!important;max-height:calc(100dvh - 30px)!important;overflow:auto!important}}`;root.appendChild(style)}
function run(){setup();if(mobile())chat()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);else run();window.addEventListener('load',run);setTimeout(run,1200);
})();
