(()=>{'use strict';
const bg={
'Energy decisions.':'Енергийни решения.','Made smarter.':'По-интелигентни.','Powering ideas.':'Захранваме идеите.','Inspiring progress.':'Вдъхновяваме напредъка.','Explore solutions':'Разгледайте решенията','Explore the network':'Разгледайте мрежата','Ask our AI assistant':'Попитайте AI асистента','Ask SAVRENZA AI':'Попитайте SAVRENZA AI','Open AI assistant':'Отворете AI асистента','Solutions':'Решения','Partner network':'Партньорска мрежа','Business case':'Бизнес анализ','Our vision':'Нашата визия','AI Assistant':'AI асистент',"Let's talk":'Свържете се','Company status':'Статус на компанията','Energy savings':'Енергийни спестявания','Partnerships':'Партньорства','Your full name':'Вашите имена','Business email':'Служебен имейл','Country':'Държава','Area of interest':'Област на интерес','Tell us a little about the opportunity':'Разкажете ни за възможността','Select an area':'Изберете област','Monthly energy expenditure':'Месечен разход за енергия','Assumed bill reduction':'Предполагаемо намаление на сметката','Illustrative annual gross difference':'Примерна годишна брутна разлика','Current annual spend':'Текущ годишен разход','Illustrative adjusted spend':'Примерен разход след промяната','Discuss this scenario':'Обсъдете този сценарий','ILLUSTRATIVE SAVINGS SCENARIO':'ПРИМЕРЕН СЦЕНАРИЙ ЗА СПЕСТЯВАНИЯ','NOT A FORECAST':'НЕ Е ПРОГНОЗА','Based solely on your two assumptions.':'Изчислено само по двете ви допускания.','Better energy':'По-добрата енергия','starts with a':'започва с','conversation.':'разговор.','Local knowledge.':'Местни познания.','Global ambition.':'Глобални амбиции.','Four directions.':'Четири направления.','One clear purpose.':'Една ясна цел.','THE FUTURE OF BUSINESS ENERGY':'БЪДЕЩЕТО НА БИЗНЕС ЕНЕРГИЯТА','A CLEANER ENERGY FUTURE':'ПО-ЧИСТО ЕНЕРГИЙНО БЪДЕЩЕ','Building connections.':'Изграждаме връзки.','Powering progress.':'Движим напредъка.','Type a question...':'Напишете въпрос...','Display currency (scenario only — no exchange conversion)':'Валута на показване (без валутно преизчисление)','Website language':'Език на сайта','Language':'Език','Currency':'Валута','Prepare enquiry email':'Подгответе имейл запитване','Privacy':'Поверителност','Need follow-up?':'Имате нужда от съдействие?'};
const source=new WeakMap();
function language(){return document.getElementById('localeSelect')?.value||'en'}
function run(){const lang=language();document.documentElement.lang=lang;
 const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let node;
 while(node=walker.nextNode()){
  const parent=node.parentElement;if(!parent||parent.closest('script,style,svg,option'))continue;
  if(parent.closest('#savrenza-chat-host'))continue;
  const value=node.textContent,clean=value.trim();if(!clean||clean.length>180)continue;
  if(!source.has(node))source.set(node,clean);
  const original=source.get(node);
  if(lang==='bg'&&bg[original])node.textContent=value.replace(clean,bg[original]);
  else if(lang==='en'&&bg[original])node.textContent=value.replace(clean,original);
 }
 document.querySelectorAll('input[placeholder],textarea[placeholder]').forEach(el=>{if(!el.dataset.v19Placeholder)el.dataset.v19Placeholder=el.placeholder;const original=el.dataset.v19Placeholder;if(lang==='bg'&&bg[original])el.placeholder=bg[original];else if(lang==='en')el.placeholder=original});
}
function init(){const sel=document.getElementById('localeSelect');if(!sel)return;sel.addEventListener('change',()=>setTimeout(run,0));document.getElementById('savMobileLanguageV16')?.addEventListener('change',()=>setTimeout(run,0));run();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();