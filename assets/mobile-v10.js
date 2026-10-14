(()=>{'use strict';
// Hide only the floating chat launcher on small screens; preserve the chat dialog and page buttons.
function fix(){if(!matchMedia('(max-width:700px)').matches)return;
 const host=document.getElementById('savrenza-chat-host');if(host&&host.shadowRoot){const root=host.shadowRoot;if(!root.getElementById('sav-v10-launcher-fix')){const style=document.createElement('style');style.id='sav-v10-launcher-fix';style.textContent='.launcher:not([aria-expanded="true"]){display:none!important}';root.appendChild(style)}}
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',fix);else fix();
window.addEventListener('load',fix);setTimeout(fix,500);setTimeout(fix,2000);
// The language control remains visible in the compact header.
})();