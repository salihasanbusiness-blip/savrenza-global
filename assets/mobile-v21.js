(()=>{'use strict';
/* Remove duplicate floating chat launchers on narrow screens, not in-page CTAs. */
const mobile=()=>matchMedia('(max-width:700px)').matches;
function apply(){
 const host=document.getElementById('savrenza-chat-host');
 if(host?.shadowRoot && !host.shadowRoot.getElementById('savV21Launcher')){
  const s=document.createElement('style');s.id='savV21Launcher';
  s.textContent='@media(max-width:700px){#launch,.launcher,[part="launcher"]{display:none!important;visibility:hidden!important;pointer-events:none!important}}';
  host.shadowRoot.appendChild(s);
 }
 if(!mobile())return;
 document.querySelectorAll('body a,body button,body [role="button"]').forEach(el=>{
  if(el.closest('.hero-buttons,.vision-banner-text,.contact-left,.navlinks,.navigation,.site-header,.sav-mobile-controls-v16'))return;
  const label=(el.innerText||el.textContent||'').replace(/\s+/g,' ').trim();
  if(!/^(?:✦|✧|✳|✴|✨|\*)?\s*(?:Ask SAVRENZA AI|Chat with SAVRENZA AI)\s*(?:↗|→|✦|\*)?$/.test(label))return;
  let p=el;
  for(let i=0;i<5&&p&&p!==document.body;i++,p=p.parentElement){
   const cs=getComputedStyle(p);
   if(cs.position==='fixed'||cs.position==='sticky'&&p!==el){p.style.setProperty('display','none','important');break}
  }
 });
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply);else apply();
window.addEventListener('load',apply);window.addEventListener('resize',apply,{passive:true});
setTimeout(apply,500);setTimeout(apply,1600);
const watcher=new MutationObserver(()=>{if(mobile())apply()});
watcher.observe(document.documentElement,{childList:true,subtree:true});
})();
