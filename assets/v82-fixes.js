(()=>{'use strict';const $=s=>document.querySelector(s);const sel=$('#localeSelect'),toggle=$('#localeToggle'),grid=$('#languageFlagGrid');if(!sel||!toggle||!grid)return;
const flags={en:'gb',bg:'bg',de:'de',fr:'fr',es:'es',tr:'tr',ar:'sa',zh:'cn',ja:'jp',hi:'in'};
const flag=(code)=>{const img=document.createElement('img');img.src='/assets/flags/'+flags[code]+'.png';img.width=24;img.height=17;img.alt='';img.className='locale-flag-image';return img};
// Single flag in the toggle, no emoji duplicate.
const current=flag(sel.value);current.id='v82-current-flag';toggle.querySelectorAll('img, .locale-flag-image, .flag-emoji').forEach(el=>el.remove());toggle.prepend(current);
for(const opt of sel.options){const b=document.createElement('button');b.type='button';b.className='language-flag-choice';b.dataset.lang=opt.value;b.append(flag(opt.value),document.createTextNode(opt.textContent.trim()));b.addEventListener('click',()=>{sel.value=opt.value;sel.dispatchEvent(new Event('change',{bubbles:true}));});grid.append(b)}
sel.hidden=true;sel.setAttribute('aria-hidden','true');sel.tabIndex=-1;
function update(){toggle.querySelectorAll('img:not(#v82-current-flag), .flag-emoji').forEach(el=>el.remove());current.src='/assets/flags/'+flags[sel.value]+'.png';grid.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.lang===sel.value)));document.documentElement.dir=sel.value==='ar'?'rtl':'ltr';const labels={en:'Language',bg:'Език',de:'Sprache',fr:'Langue',es:'Idioma',tr:'Dil',ar:'اللغة',zh:'语言',ja:'言語',hi:'भाषा'};const nodes=[...toggle.childNodes].filter(n=>n.nodeType===Node.TEXT_NODE);for(const n of nodes)n.textContent=' · '+(labels[sel.value]||'Language')+' ▾'}
sel.addEventListener('change',update);update();
const phone=$('#phoneCountryToggle'),country=$('#countryToggle');if(phone&&country){phone.addEventListener('click',()=>{country.scrollIntoView({behavior:'smooth',block:'center'});country.click();});}
})();