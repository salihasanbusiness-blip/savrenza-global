(()=>{'use strict';
// Ensure any floating AI launcher inside open shadow DOM does not obstruct mobile content.
const mobile=()=>matchMedia('(max-width:900px)').matches;
function fix(){
 const host=document.getElementById('savrenza-chat-host');
 if(!host||!host.shadowRoot)return;
 const root=host.shadowRoot;
 if(!root.getElementById('savV25MobileGuard')){
  const style=document.createElement('style');style.id='savV25MobileGuard';
  style.textContent='@media(max-width:900px){.launcher,button.launcher,#launch,[part="launcher"]{display:none!important;visibility:hidden!important;pointer-events:none!important}}';
  root.append(style);
 }
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',fix);else fix();
window.addEventListener('load',fix);window.addEventListener('resize',fix,{passive:true});
let runs=0;const timer=setInterval(()=>{fix();if(++runs>=20)clearInterval(timer)},500);
})();
