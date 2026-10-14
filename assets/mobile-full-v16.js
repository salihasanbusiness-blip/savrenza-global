(()=>{'use strict';
function start(){
 const pairs=[['savMobileLanguageV16','localeSelect'],['savMobileCurrencyV16','currencySelect']];
 for(const [mobileId,originalId] of pairs){
  const mobile=document.getElementById(mobileId),original=document.getElementById(originalId);
  if(!mobile||!original){if(mobile)mobile.innerHTML='<option>Unavailable</option>';continue}
  let last='';
  const sync=()=>{
   const options=Array.from(original.options),sig=options.map(o=>o.value+'~'+o.textContent).join('|');
   if(sig!==last){mobile.replaceChildren(...options.map(o=>o.cloneNode(true)));last=sig}
   if(mobile.value!==original.value)mobile.value=original.value;
  };
  mobile.addEventListener('change',()=>{
   original.value=mobile.value;
   original.dispatchEvent(new Event('input',{bubbles:true}));
   original.dispatchEvent(new Event('change',{bubbles:true}));
  });
  original.addEventListener('change',sync);
  new MutationObserver(sync).observe(original,{childList:true,subtree:true,attributes:true,attributeFilter:['selected']});
  sync();setTimeout(sync,500);setTimeout(sync,1600);
 }
 // Modify only the mobile presentation of the existing Shadow DOM chat.
 const fixChat=()=>{
  const host=document.getElementById('savrenza-chat-host');if(!host?.shadowRoot)return;
  const root=host.shadowRoot;if(root.getElementById('savV16ChatCSS'))return;
  const style=document.createElement('style');style.id='savV16ChatCSS';
  style.textContent=`@media(max-width:700px){
    #launch,.launcher{display:none!important}
    :host{pointer-events:none!important}
    #panel:not([hidden]),.panel:not([hidden]){pointer-events:auto!important;position:fixed!important;top:auto!important;bottom:calc(12px + env(safe-area-inset-bottom))!important;left:10px!important;right:10px!important;width:auto!important;height:min(530px,66dvh)!important;max-height:calc(100dvh - 95px)!important;min-height:0!important;border-radius:16px!important}
    .head{padding:9px 12px!important}.brand{height:34px!important;width:34px!important}
  }`;
  root.appendChild(style);
 };
 fixChat();setTimeout(fixChat,350);setTimeout(fixChat,1200);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();