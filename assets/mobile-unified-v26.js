(()=>{'use strict';
// Keep the dialog functional, but prevent floating launchers from covering the mobile viewport.
const mobile=()=>window.matchMedia('(max-width:900px)').matches;
const shadowStyle='@media(max-width:900px){.launcher,button.launcher,#launch,[part="launcher"],.chat-launcher,.floating-launcher{display:none!important;visibility:hidden!important;pointer-events:none!important}}';
function fix(){const host=document.getElementById('savrenza-chat-host');if(!host)return;
 const shadow=host.shadowRoot;if(shadow&&!shadow.getElementById('savV26Guard')){let style=document.createElement('style');style.id='savV26Guard';style.textContent=shadowStyle;shadow.appendChild(style)}
 if(mobile()){document.querySelectorAll('.sav-chat-launch').forEach(e=>{e.style.setProperty('display','none','important')})}
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',fix);else fix();
window.addEventListener('load',fix);window.addEventListener('resize',fix,{passive:true});
const obs=new MutationObserver(fix);obs.observe(document.documentElement,{childList:true,subtree:true});
})();
