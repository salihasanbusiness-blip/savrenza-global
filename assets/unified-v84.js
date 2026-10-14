(()=>{'use strict';
const sel=document.getElementById('localeSelect'),toggle=document.getElementById('localeToggle');if(!sel||!toggle)return;
const countries={en:'gb',bg:'bg',de:'de',fr:'fr',es:'es',tr:'tr',ar:'sa',zh:'cn',ja:'jp',hi:'in'};
const names={en:'Language',bg:'Език',de:'Sprache',fr:'Langue',es:'Idioma',tr:'Dil',ar:'اللغة',zh:'语言',ja:'言語',hi:'भाषा'};
const grid=document.getElementById('languageFlagGrid');
// Keep only one flag image and never prepend duplicate icons on subsequent changes.
let flag=document.createElement('img');flag.className='v84-language-flag';flag.alt='';flag.width=25;flag.height=18;
function updateButton(){toggle.querySelectorAll('img,.locale-flag-image,.flag-emoji').forEach(n=>n.remove());
 toggle.querySelectorAll('.v84-language-flag').forEach(n=>n.remove());
 flag.src='/assets/flags/'+(countries[sel.value]||'gb')+'.png';toggle.prepend(flag);
 const text=document.getElementById('localeCurrent');if(text)text.textContent=sel.value.toUpperCase();
 document.documentElement.dir=sel.value==='ar'?'rtl':'ltr';
 const textNodes=[...toggle.childNodes].filter(n=>n.nodeType===3);for(const n of textNodes)n.textContent=' · '+(names[sel.value]||'Language')+' ▾';
 if(grid)grid.querySelectorAll('[data-lang]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.lang===sel.value)));
}
if(grid){grid.replaceChildren();for(const option of sel.options){if(!countries[option.value])continue;
 const b=document.createElement('button');b.type='button';b.className='language-flag-choice';b.dataset.lang=option.value;
 const img=document.createElement('img');img.src='/assets/flags/'+countries[option.value]+'.png';img.alt='';img.width=24;img.height=17;
 b.append(img,document.createTextNode(option.textContent.trim()));b.addEventListener('click',()=>{sel.value=option.value;sel.dispatchEvent(new Event('change',{bubbles:true}));});grid.append(b);
 }sel.hidden=true;sel.tabIndex=-1;}
// Translation text is exclusively managed by global-experience.js.
// Do not modify text nodes here: multiple translators previously caused mixed languages.
sel.addEventListener('change',()=>setTimeout(updateButton,0));updateButton();
})();
