'use strict';
(() => {
  const $ = (s) => document.querySelector(s);
  $('#year').textContent = new Date().getFullYear();
  const toggle = $('.menu-toggle');
  const nav = $('#navigation');
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
  }));
  const money = (value) => { const currency=window.savCurrency||'EUR';try{return new Intl.NumberFormat(document.documentElement.lang||'en',{style:'currency',currency,maximumFractionDigits:0}).format(value)}catch(e){return `${currency} ${Math.round(value).toLocaleString()}`}};
  const spend = $('#monthly'), reduction = $('#reduction');
  let savings = 0;
  function recalculate() {
    const monthly = Math.max(0, Math.min(1000000000, Number(spend.value) || 0));
    const cut = Math.min(30,Math.max(0,Number(reduction.value)||0));
    const annual = monthly * 12;
    savings = annual * cut / 100;
    $('#reductionDisplay').textContent = `${cut}%`;
    $('#savings').textContent = money(savings);
    $('#currentSpend').textContent = money(annual);
    $('#adjustedSpend').textContent = money(annual-savings);
  }
  window.savRecalculate=recalculate;
  spend.addEventListener('input',recalculate); reduction.addEventListener('input',recalculate); recalculate();
  $('#calcContact').addEventListener('click', () => {
    $('#topic').value='Other opportunity';
    const msg = document.querySelector('[name=message]');
    msg.value=`I'd like to discuss an illustrative energy scenario: monthly spend ${money(Math.max(0, Number(spend.value)||0))}, assumed reduction ${reduction.value}%, illustrative annual gross difference ${money(savings)}. I understand that this is not a forecast or quotation.\n\nBusiness details: `;
    $('#contact').scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
  });
  document.querySelectorAll('[data-topic]').forEach(a => a.addEventListener('click',() => { $('#topic').value=a.dataset.topic; }));

  // Local ISO 3166 list: all 249 entries, with flags in the native country selector.
  const countryData=[["AF","Afghanistan"],["AL","Albania"],["DZ","Algeria"],["AS","American Samoa"],["AD","Andorra"],["AO","Angola"],["AI","Anguilla"],["AQ","Antarctica"],["AG","Antigua and Barbuda"],["AR","Argentina"],["AM","Armenia"],["AW","Aruba"],["AU","Australia"],["AT","Austria"],["AZ","Azerbaijan"],["BS","Bahamas"],["BH","Bahrain"],["BD","Bangladesh"],["BB","Barbados"],["BY","Belarus"],["BE","Belgium"],["BZ","Belize"],["BJ","Benin"],["BM","Bermuda"],["BT","Bhutan"],["BO","Bolivia, Plurinational State of"],["BQ","Bonaire, Sint Eustatius and Saba"],["BA","Bosnia and Herzegovina"],["BW","Botswana"],["BV","Bouvet Island"],["BR","Brazil"],["IO","British Indian Ocean Territory"],["BN","Brunei Darussalam"],["BG","Bulgaria"],["BF","Burkina Faso"],["BI","Burundi"],["CV","Cabo Verde"],["KH","Cambodia"],["CM","Cameroon"],["CA","Canada"],["KY","Cayman Islands"],["CF","Central African Republic"],["TD","Chad"],["CL","Chile"],["CN","China"],["CX","Christmas Island"],["CC","Cocos (Keeling) Islands"],["CO","Colombia"],["KM","Comoros"],["CG","Congo"],["CD","Congo, The Democratic Republic of the"],["CK","Cook Islands"],["CR","Costa Rica"],["HR","Croatia"],["CU","Cuba"],["CW","Curaçao"],["CY","Cyprus"],["CZ","Czechia"],["CI","Côte d'Ivoire"],["DK","Denmark"],["DJ","Djibouti"],["DM","Dominica"],["DO","Dominican Republic"],["EC","Ecuador"],["EG","Egypt"],["SV","El Salvador"],["GQ","Equatorial Guinea"],["ER","Eritrea"],["EE","Estonia"],["SZ","Eswatini"],["ET","Ethiopia"],["FK","Falkland Islands (Malvinas)"],["FO","Faroe Islands"],["FJ","Fiji"],["FI","Finland"],["FR","France"],["GF","French Guiana"],["PF","French Polynesia"],["TF","French Southern Territories"],["GA","Gabon"],["GM","Gambia"],["GE","Georgia"],["DE","Germany"],["GH","Ghana"],["GI","Gibraltar"],["GR","Greece"],["GL","Greenland"],["GD","Grenada"],["GP","Guadeloupe"],["GU","Guam"],["GT","Guatemala"],["GG","Guernsey"],["GN","Guinea"],["GW","Guinea-Bissau"],["GY","Guyana"],["HT","Haiti"],["HM","Heard Island and McDonald Islands"],["VA","Holy See (Vatican City State)"],["HN","Honduras"],["HK","Hong Kong"],["HU","Hungary"],["IS","Iceland"],["IN","India"],["ID","Indonesia"],["IR","Iran, Islamic Republic of"],["IQ","Iraq"],["IE","Ireland"],["IM","Isle of Man"],["IL","Israel"],["IT","Italy"],["JM","Jamaica"],["JP","Japan"],["JE","Jersey"],["JO","Jordan"],["KZ","Kazakhstan"],["KE","Kenya"],["KI","Kiribati"],["KP","Korea, Democratic People's Republic of"],["KR","Korea, Republic of"],["KW","Kuwait"],["KG","Kyrgyzstan"],["LA","Lao People's Democratic Republic"],["LV","Latvia"],["LB","Lebanon"],["LS","Lesotho"],["LR","Liberia"],["LY","Libya"],["LI","Liechtenstein"],["LT","Lithuania"],["LU","Luxembourg"],["MO","Macao"],["MG","Madagascar"],["MW","Malawi"],["MY","Malaysia"],["MV","Maldives"],["ML","Mali"],["MT","Malta"],["MH","Marshall Islands"],["MQ","Martinique"],["MR","Mauritania"],["MU","Mauritius"],["YT","Mayotte"],["MX","Mexico"],["FM","Micronesia, Federated States of"],["MD","Moldova, Republic of"],["MC","Monaco"],["MN","Mongolia"],["ME","Montenegro"],["MS","Montserrat"],["MA","Morocco"],["MZ","Mozambique"],["MM","Myanmar"],["NA","Namibia"],["NR","Nauru"],["NP","Nepal"],["NL","Netherlands"],["NC","New Caledonia"],["NZ","New Zealand"],["NI","Nicaragua"],["NE","Niger"],["NG","Nigeria"],["NU","Niue"],["NF","Norfolk Island"],["MK","North Macedonia"],["MP","Northern Mariana Islands"],["NO","Norway"],["OM","Oman"],["PK","Pakistan"],["PW","Palau"],["PS","Palestine, State of"],["PA","Panama"],["PG","Papua New Guinea"],["PY","Paraguay"],["PE","Peru"],["PH","Philippines"],["PN","Pitcairn"],["PL","Poland"],["PT","Portugal"],["PR","Puerto Rico"],["QA","Qatar"],["RO","Romania"],["RU","Russian Federation"],["RW","Rwanda"],["RE","Réunion"],["BL","Saint Barthélemy"],["SH","Saint Helena, Ascension and Tristan da Cunha"],["KN","Saint Kitts and Nevis"],["LC","Saint Lucia"],["MF","Saint Martin (French part)"],["PM","Saint Pierre and Miquelon"],["VC","Saint Vincent and the Grenadines"],["WS","Samoa"],["SM","San Marino"],["ST","Sao Tome and Principe"],["SA","Saudi Arabia"],["SN","Senegal"],["RS","Serbia"],["SC","Seychelles"],["SL","Sierra Leone"],["SG","Singapore"],["SX","Sint Maarten (Dutch part)"],["SK","Slovakia"],["SI","Slovenia"],["SB","Solomon Islands"],["SO","Somalia"],["ZA","South Africa"],["GS","South Georgia and the South Sandwich Islands"],["SS","South Sudan"],["ES","Spain"],["LK","Sri Lanka"],["SD","Sudan"],["SR","Suriname"],["SJ","Svalbard and Jan Mayen"],["SE","Sweden"],["CH","Switzerland"],["SY","Syrian Arab Republic"],["TW","Taiwan, Province of China"],["TJ","Tajikistan"],["TZ","Tanzania, United Republic of"],["TH","Thailand"],["TL","Timor-Leste"],["TG","Togo"],["TK","Tokelau"],["TO","Tonga"],["TT","Trinidad and Tobago"],["TN","Tunisia"],["TM","Turkmenistan"],["TC","Turks and Caicos Islands"],["TV","Tuvalu"],["TR","Türkiye"],["UG","Uganda"],["UA","Ukraine"],["AE","United Arab Emirates"],["GB","United Kingdom"],["US","United States"],["UM","United States Minor Outlying Islands"],["UY","Uruguay"],["UZ","Uzbekistan"],["VU","Vanuatu"],["VE","Venezuela, Bolivarian Republic of"],["VN","Viet Nam"],["VG","Virgin Islands, British"],["VI","Virgin Islands, U.S."],["WF","Wallis and Futuna"],["EH","Western Sahara"],["YE","Yemen"],["ZM","Zambia"],["ZW","Zimbabwe"],["AX","Åland Islands"]];
  const dialCodes={"BG":"+359","US":"+1","CA":"+1","GB":"+44","DE":"+49","FR":"+33","IT":"+39","ES":"+34","PT":"+351","NL":"+31","BE":"+32","AT":"+43","CH":"+41","PL":"+48","RO":"+40","GR":"+30","TR":"+90","UA":"+380","RU":"+7","RS":"+381","MK":"+389","AL":"+355","HR":"+385","SI":"+386","SK":"+421","CZ":"+420","HU":"+36","DK":"+45","SE":"+46","NO":"+47","FI":"+358","IE":"+353","IS":"+354","EE":"+372","LV":"+371","LT":"+370","LU":"+352","MT":"+356","CY":"+357","IL":"+972","AE":"+971","SA":"+966","QA":"+974","KW":"+965","BH":"+973","OM":"+968","IN":"+91","PK":"+92","BD":"+880","NP":"+977","LK":"+94","CN":"+86","JP":"+81","KR":"+82","SG":"+65","MY":"+60","TH":"+66","VN":"+84","PH":"+63","ID":"+62","AU":"+61","NZ":"+64","ZA":"+27","NG":"+234","KE":"+254","EG":"+20","MA":"+212","TN":"+216","BR":"+55","AR":"+54","CL":"+56","CO":"+57","PE":"+51","MX":"+52","CR":"+506","PA":"+507","CU":"+53","DO":"+1","JM":"+1"};
  Object.assign(dialCodes,{"AF": "+93", "AL": "+355", "DZ": "+213", "AD": "+376", "AO": "+244", "AG": "+1", "AM": "+374", "AZ": "+994", "BS": "+1", "BB": "+1", "BY": "+375", "BZ": "+501", "BJ": "+229", "BT": "+975", "BO": "+591", "BA": "+387", "BW": "+267", "BN": "+673", "BF": "+226", "BI": "+257", "CV": "+238", "KH": "+855", "CM": "+237", "CF": "+236", "TD": "+235", "KM": "+269", "CG": "+242", "CD": "+243", "CK": "+682", "CI": "+225", "DJ": "+253", "DM": "+1", "EC": "+593", "SV": "+503", "GQ": "+240", "ER": "+291", "SZ": "+268", "ET": "+251", "FJ": "+679", "GA": "+241", "GM": "+220", "GE": "+995", "GH": "+233", "GD": "+1", "GT": "+502", "GN": "+224", "GW": "+245", "GY": "+592", "HT": "+509", "HN": "+504", "HK": "+852", "IR": "+98", "IQ": "+964", "JO": "+962", "KZ": "+7", "KI": "+686", "KP": "+850", "KG": "+996", "LA": "+856", "LB": "+961", "LS": "+266", "LR": "+231", "LY": "+218", "LI": "+423", "MO": "+853", "MG": "+261", "MW": "+265", "MV": "+960", "ML": "+223", "MH": "+692", "MR": "+222", "MU": "+230", "FM": "+691", "MD": "+373", "MC": "+377", "MN": "+976", "ME": "+382", "MA": "+212", "MZ": "+258", "MM": "+95", "NA": "+264", "NR": "+674", "NI": "+505", "NE": "+227", "NU": "+683", "OM": "+968", "PW": "+680", "PS": "+970", "PG": "+675", "PY": "+595", "PR": "+1", "RW": "+250", "KN": "+1", "LC": "+1", "VC": "+1", "WS": "+685", "SM": "+378", "ST": "+239", "SN": "+221", "SC": "+248", "SL": "+232", "SO": "+252", "SS": "+211", "SD": "+249", "SR": "+597", "SY": "+963", "TW": "+886", "TJ": "+992", "TZ": "+255", "TL": "+670", "TG": "+228", "TO": "+676", "TT": "+1", "TM": "+993", "UG": "+256", "UY": "+598", "UZ": "+998", "VU": "+678", "VE": "+58", "YE": "+967", "ZM": "+260", "ZW": "+263", "AX": "+358", "FO": "+298", "GL": "+299", "GI": "+350", "JE": "+44", "GG": "+44", "IM": "+44", "RE": "+262", "YT": "+262", "GP": "+590", "MQ": "+596", "GF": "+594", "PF": "+689", "NC": "+687", "WF": "+681", "TK": "+690", "TV": "+688", "SB": "+677", "FK": "+500", "SH": "+290", "AI": "+1", "BM": "+1", "KY": "+1", "TC": "+1", "VG": "+1", "VI": "+1", "AS": "+1", "GU": "+1", "MP": "+1", "SX": "+1", "BQ": "+599", "CW": "+599", "AW": "+297", "BL": "+590", "MF": "+590", "PM": "+508", "IO": "+246", "CC": "+61", "CX": "+61", "NF": "+672", "PN": "+64", "EH": "+212"});
  const countrySelect=$('#countrySelect'), countryFlag=$('#countryFlag'), phoneFlag=$('#phoneFlag'), dialCode=$('#dialCode');
  const flagFor=code=>code ? String.fromCodePoint(...[...code].map(c=>127397+c.charCodeAt(0))) : '🌐';
  const flagImage=code=>{const img=document.createElement('img');img.className='flag-img';img.width=28;img.height=20;img.loading='lazy';img.alt='';img.src=`/assets/flags/${code.toLowerCase()}.png`;img.onerror=()=>{const fallback=document.createElement('span');fallback.className='flag-placeholder';fallback.textContent=flagFor(code);img.replaceWith(fallback)};return img};
  const setFlag=(target,code)=>{target.replaceChildren(code?flagImage(code):document.createTextNode('🌐'))};
  for(const [code,name] of countryData){
    const option=document.createElement('option');
    option.value=name;option.textContent=`${flagFor(code)} ${name}`;option.dataset.code=code;
    countrySelect.append(option);
  }
  const countrySearch=$('#countrySearch');
  const countryToggle=$('#countryToggle'), countryDropdown=$('#countryDropdown'), countryOptions=$('#countryOptions'), countryLabel=$('#countryLabel'), countryPicker=$('#countryPicker');
  const setOpen=open=>{
    countryDropdown.hidden=!open;countryToggle.setAttribute('aria-expanded',String(open));
    if(open){countrySearch.focus();renderCountries(countrySearch.value)}
  };
  const renderCountries=query=>{
    const needle=(query||'').trim().toLocaleLowerCase();
    countryOptions.replaceChildren();
    let count=0;
    for(const [code,name] of countryData){
      if(needle&&!name.toLocaleLowerCase().includes(needle)&&!code.toLowerCase().includes(needle))continue;
      const item=document.createElement('button');item.type='button';item.className='country-option';item.setAttribute('role','option');
      item.setAttribute('aria-selected',String(countrySelect.value===name));
      const flag=document.createElement('span');flag.className='country-option-flag';flag.append(flagImage(code));
      const label=document.createElement('span');label.textContent=name;
      item.append(flag,label);
      item.addEventListener('click',()=>{
        countrySelect.value=name;countryLabel.textContent=name;$('#countryError').hidden=true;
        setFlag(countryFlag,code);setFlag(phoneFlag,code);
        dialCode.value=dialCodes[code]||'';
        setOpen(false);countryToggle.focus();
      });
      countryOptions.append(item);count++;
    }
    if(!count){const msg=document.createElement('p');msg.className='country-empty';msg.textContent='No matching countries';countryOptions.append(msg)}
  };
  countryToggle.addEventListener('click',()=>setOpen(countryDropdown.hidden));
  countrySearch.addEventListener('input',()=>renderCountries(countrySearch.value));
  countrySearch.addEventListener('keydown',e=>{if(e.key==='Escape'){setOpen(false);countryToggle.focus()}});
  document.addEventListener('pointerdown',e=>{if(!countryPicker.contains(e.target))setOpen(false)});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!countryDropdown.hidden){setOpen(false);countryToggle.focus()}});
  dialCode.addEventListener('input',()=>dialCode.setCustomValidity(''));
  renderCountries('');
  const form = $('#contactForm'), status=$('#mailStatus');
  function emailBody(){
    const d = new FormData(form);
    return `Name: ${d.get('name')||''}\nBusiness email: ${d.get('email')||''}\nCountry: ${d.get('country')||''}\nPhone: ${d.get('phone') ? (dialCode.value+' '+d.get('phone')) : 'Not provided'}\nArea of interest: ${d.get('topic')||''}\n\nOpportunity summary:\n${d.get('message')||''}\n\nSent by the sender from their own email application; no automatic website submission.`;
  }
  form.addEventListener('submit',event => {
    event.preventDefault();
    if(!form.reportValidity())return;
    if(!countrySelect.value){$('#countryError').hidden=false;setOpen(true);return}
    if(form.elements.phone.value.trim()&&!/^\+[0-9]{1,5}$/.test(dialCode.value.trim())){dialCode.setCustomValidity('Enter a valid international dialing code, such as +359.');dialCode.reportValidity();return}
    dialCode.setCustomValidity('');
    const subject=`SAVRENZA ENERGY enquiry — ${$('#topic').value}`;
    const mailto=`mailto:info@savrenzaplatform.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody())}`;
    status.textContent='Your email app should open with a prepared draft. Please review and SEND it from your email app. If nothing opens, use the copy option below and email info@savrenzaplatform.com directly.';
    window.location.href=mailto;
  });
  $('#copyEmail').addEventListener('click',async () => {
    if(!form.reportValidity())return;
    if(!countrySelect.value){$('#countryError').hidden=false;setOpen(true);return}
    if(form.elements.phone.value.trim()&&!/^\+[0-9]{1,5}$/.test(dialCode.value.trim())){dialCode.setCustomValidity('Enter a valid international dialing code, such as +359.');dialCode.reportValidity();return}
    dialCode.setCustomValidity('');
    try {
      await navigator.clipboard.writeText(emailBody());
      status.textContent='Enquiry copied. Open your email app and send it to info@savrenzaplatform.com.';
    } catch(e) {
      // iOS and privacy-restricted browsers can block Clipboard API access.
      // Keep the entire prepared enquiry visible and selectable as a fallback.
      let fallback = $('#copyFallback');
      if(!fallback){
        fallback=document.createElement('textarea');
        fallback.id='copyFallback';
        fallback.className='copy-fallback';
        fallback.readOnly=true;
        fallback.setAttribute('aria-label','Prepared enquiry text to copy');
        status.insertAdjacentElement('afterend',fallback);
      }
      fallback.value=emailBody();
      fallback.focus();
      fallback.select();
      status.textContent='Automatic copying is unavailable. Your entire enquiry is selected below. Choose Copy, then paste it into an email addressed to info@savrenzaplatform.com.';
    }
  });
})();
