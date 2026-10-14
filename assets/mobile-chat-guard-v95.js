/* SAVRENZA V9.5 mobile-only duplicate chat control guard.
   Matches fixed overlays, not the in-page CTA. */
(()=>{"use strict";
const mq=matchMedia("(max-width:700px)");
const label=/Ask\s+SAVRENZA\s+AI/i;
const ignored='[data-sav-open-chat],.button-primary,.contact-chat-link';
function scan(){
 if(!mq.matches)return;
 const roots=[document];
 for(let i=0;i<roots.length;i++){
   const root=roots[i];
   for(const el of root.querySelectorAll('*')){
     if(el.shadowRoot)roots.push(el.shadowRoot);
   }
 }
 for(const root of roots){
   for(const el of root.querySelectorAll('button,a,[role="button"]')){
     if(!label.test((el.innerText||el.textContent||'').trim()))continue;
     if(el.closest(ignored))continue;
     let current=el, fixed=null;
     for(let i=0;current&&i<7;i++,current=current.parentElement){
       const style=getComputedStyle(current);
       if(style.position==='fixed'){fixed=current;break}
     }
     if(fixed){
       fixed.style.setProperty('display','none','important');
       fixed.setAttribute('data-savrenza-mobile-overlay-hidden','true');
     }
   }
 }
}
let scheduled=false;
function schedule(){if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{scheduled=false;scan()})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',schedule,{once:true});
else schedule();
new MutationObserver(schedule).observe(document.documentElement,{childList:true,subtree:true});
window.addEventListener('load',schedule,{once:true});
mq.addEventListener?.('change',schedule);
})();