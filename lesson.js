import"./assets/main-1VYSZ_bt.js";import{a as wt}from"./assets/homework-DBTzO_AD.js";import{i as Ct,c as Be}from"./assets/custom-lesson-presets-OYBmjNse.js";import{l as Ie,a as vt,b as Me}from"./assets/custom-lessons-store-BKMVZjuV.js";import"./assets/vendor-CWxt7QI6.js";const Et=async(t=1,o=1e3)=>(await Ct.get("/user")).data,St={BASE_URL:"/",DEV:!1,MODE:"production",PROD:!0,SSR:!1};(function(){const t=typeof import.meta<"u"&&St&&"/"||"/";function o(r){const n=t.endsWith("/")?t:`${t}/`,d=String(r||"");return/^[a-z]+:/i.test(d)||d.startsWith(n)?d:`${n}${d.replace(/^\/+/,"")}`}function i(){try{const n=new URL(window.location.href).pathname.split("/");let d=n.pop();(!d||!/\.html?$/i.test(d))&&(d="index.html");const h=d.replace(/\.html?$/i,".json");return n.push("practice",h),n.join("/")}catch{return null}}function e(r,n={},...d){const h=document.createElement(r);for(const[p,s]of Object.entries(n||{}))p==="class"?h.className=s:p==="html"?h.innerHTML=s:p.startsWith("on")&&typeof s=="function"?h.addEventListener(p.slice(2),s):h.setAttribute(p,s);for(const p of d)p!=null&&h.appendChild(typeof p=="string"?document.createTextNode(p):p);return h}function m(r){const n=r.slice();for(let d=n.length-1;d>0;d--){const h=Math.floor(Math.random()*(d+1));[n[d],n[h]]=[n[h],n[d]]}return n}function g(r){return String(r||"").trim().toLowerCase().replace(/\s+/g," ")}const x={users:null,request:null,active:null};function v(){return x.users?Promise.resolve(x.users):(x.request||(x.request=Et().then(r=>{const n=Array.isArray(r==null?void 0:r.items)?r.items:[];return x.users=n,n}).catch(r=>{throw console.error("Не вдалося завантажити список студентів",r),r}).finally(()=>{x.request=null})),x.request)}function T(r){if(!r||typeof r!="object")return"Невідомий студент";const n=r.firstName||r.firstname||r.nameFirst||"",d=r.lastName||r.lastname||r.nameLast||"";return[n,d].map(s=>String(s||"").trim()).filter(Boolean).join(" ")||r.displayName||r.fullName||r.username||r.email||(r.id?`ID ${r.id}`:"")||"Без імені"}function $(){if(!x.active)return;const{panel:r,button:n}=x.active;r.style.display="none",r.dataset.open="false",n.setAttribute("aria-expanded","false"),x.active=null}function P(r){if(!x.active)return;const{panel:n,button:d}=x.active,h=r.target;n.contains(h)||d.contains(h)||$()}function R(r){r.key==="Escape"&&$()}function J(r,n,d){if(r.innerHTML="",!n.length){r.appendChild(e("div",{class:"muted",style:"font-size:13px;text-align:center;padding:12px 8px;"},"Список студентів порожній"));return}const h=e("ul",{style:"list-style:none;margin:0;padding:0;max-height:220px;overflow:auto;"});n.forEach(p=>{const s=e("button",{type:"button",style:"width:100%;background:transparent;border:none;text-align:left;padding:8px 10px;border-radius:8px;cursor:pointer;display:flex;flex-direction:column;gap:2px;",onmouseenter:()=>{s.style.backgroundColor="#f1f5f9"},onmouseleave:()=>{s.style.backgroundColor="transparent"},onclick:()=>{const l=window.location.search.slice(8),y=document.querySelector("h1").textContent;console.log(l);const c={lessonId:l,userEmail:p.email,lessonName:y,homeworkType:"task",homeworkData:JSON.stringify(d)};wt(c),$()}},e("span",{style:"font-size:14px;font-weight:600;color:#0f172a;"},T(p)),p.email?e("span",{class:"muted",style:"font-size:12px;color:#475569;"},p.email):null),a=e("li",{style:"margin:0;padding:0;"},s);h.appendChild(a)}),r.appendChild(h)}function z(){return e("div",{class:"practice-share-panel",role:"dialog","aria-label":"Надсилання завдання студенту",style:"position:absolute;top:38px;right:0;min-width:240px;max-width:280px;border:1px solid #e2e8f0;border-radius:12px;background:#fff;box-shadow:0 18px 40px rgba(15,23,42,0.18);padding:8px;z-index:30;display:none;","data-open":"false"})}function I(r,n,d){if(n.dataset.open==="true"){$();return}x.active&&x.active.panel!==n&&$(),n.dataset.open="true",n.style.display="block",r.setAttribute("aria-expanded","true"),n.innerHTML="",n.appendChild(e("div",{class:"muted",style:"font-size:13px;padding:12px 8px;text-align:center;"},"Завантаження…")),x.active={panel:n,button:r},v().then(p=>{J(n,p,d)}).catch(()=>{n.innerHTML="",n.appendChild(e("div",{style:"color:#ef4444;font-size:13px;text-align:center;padding:12px 8px;"},"Не вдалося завантажити студентів. Спробуйте ще раз."))})}function _(r){const n=z(),d=e("button",{type:"button",class:"practice-share-trigger",title:"Надіслати студенту","aria-haspopup":"dialog","aria-expanded":"false",style:"border:none;background:#2563eb;color:#fff;padding:4px 10px;border-radius:999px;font-size:12px;line-height:1;cursor:pointer;box-shadow:0 4px 12px rgba(37,99,235,0.24);",onclick:h=>{h.preventDefault(),I(d,n,r)}},"Надіслати");return{button:d,panel:n}}document.addEventListener("click",P),document.addEventListener("keydown",R);function B(r){const n=e("div",{class:"hint-wrap",style:"margin-top:6px;"}),d=e("button",{type:"button",class:"hint-toggle","aria-label":"Показати підказку",title:"Підказка",style:"border:none;background:transparent;color:#94a3b8;cursor:pointer;padding:0;font-size:14px;line-height:1;"},"?"),h=e("div",{class:"hint-box muted",style:"display:none;margin-top:6px;color:#475569;"},`Підказка: ${r}`);return d.addEventListener("click",()=>{const p=h.style.display==="none";h.style.display=p?"block":"none",d.setAttribute("aria-expanded",p?"true":"false")}),n.appendChild(d),n.appendChild(h),n}function ie(r,n){r.appendChild(e("h3",{},n.prompt||"Choose the correct option"));const d=[];(n.items||[]).forEach((s,a)=>{const l=`${n.id||"mcq"}-${a}`,y=Array.isArray(s.answer)&&s.answer.length>1,c=e("div",{class:"mcq-item",style:"margin-bottom:10px;padding:10px;border:1px solid #e5e7eb;border-radius:10px;background:#fff;"},e("div",{class:"q",style:"margin-bottom:8px;font-weight:600;"},s.q));(s.choices||[]).forEach((u,f)=>{const b=`${l}-${f}`,k=e("label",{for:b,style:"display:flex;align-items:center;gap:8px;margin:4px 0;"},e("input",{type:y?"checkbox":"radio",name:l,id:b,value:String(f)}),e("span",{},u));c.appendChild(k)}),s.explanation&&c.appendChild(e("div",{class:"exp muted",style:"display:none;margin-top:6px;color:#475569;"},s.explanation)),d.push({block:c,item:s,name:l}),r.appendChild(c)});const h=e("div",{class:"result",style:"margin-top:8px;font-weight:600;"}),p=e("button",{type:"button",class:"btn primary",style:"margin-top:8px;"},"Перевірити");p.addEventListener("click",()=>{let s=0;d.forEach(({block:a,item:l,name:y})=>{const c=Array.isArray(l.answer)?l.answer.map(String):[String(l.answer)],f=Array.from(a.querySelectorAll(`input[name='${y}']`)).filter(w=>w.checked).map(w=>w.value).sort(),b=c.slice().sort(),k=f.length===b.length&&f.every((w,E)=>w===b[E]);a.style.borderColor=k?"#10b981":"#ef4444";const S=a.querySelector(".exp");S&&(S.style.display=k?"none":"block"),k&&s++}),h.textContent=`Результат: ${s}/${d.length}`}),r.appendChild(p),r.appendChild(h)}function se(r,n){r.appendChild(e("h3",{},n.prompt||"Fill the gaps"));const d=[];(n.items||[]).forEach((s,a)=>{const l=e("div",{style:"margin-bottom:10px;padding:10px;border:1px solid #e5e7eb;border-radius:10px;background:#fff;"}),y=String(s.q||"").split(/___/),c=e("input",{type:"text",style:"padding:6px 8px;border:1px solid #cbd5e1;border-radius:6px;"});y.length>1?(l.appendChild(e("span",{},y[0])),l.appendChild(c),l.appendChild(e("span",{},y.slice(1).join("___")))):(l.appendChild(e("div",{style:"margin-bottom:6px;font-weight:600;"},s.q)),l.appendChild(c)),s.hint&&l.appendChild(B(s.hint)),d.push({row:l,input:c,answers:(s.answer||[]).map(u=>g(u))}),r.appendChild(l)});const h=e("div",{style:"margin-top:8px;font-weight:600;"}),p=e("button",{type:"button",class:"btn primary",style:"margin-top:8px;"},"Перевірити");p.addEventListener("click",()=>{let s=0;d.forEach(({row:a,input:l,answers:y})=>{const c=g(l.value),u=y.includes(c);a.style.borderColor=u?"#10b981":"#ef4444",u&&s++}),h.textContent=`Результат: ${s}/${d.length}`}),r.appendChild(p),r.appendChild(h)}function le(r,n){r.appendChild(e("h3",{},n.prompt||"Match pairs"));const d=n.pairs||[],h=m(d.map(l=>l.right)),p=[];d.forEach(l=>{const y=e("select",{style:"padding:6px 8px;border:1px solid #cbd5e1;border-radius:6px;"},e("option",{value:""},"— обери —"),...h.map(u=>e("option",{value:u},u))),c=e("div",{style:"display:flex;align-items:center;gap:10px;margin:8px 0;padding:10px;border:1px solid #e5e7eb;border-radius:10px;background:#fff;"},e("div",{style:"min-width:160px;font-weight:600;"},l.left),y);p.push({row:c,select:y,right:l.right}),r.appendChild(c)});const s=e("div",{style:"margin-top:8px;font-weight:600;"}),a=e("button",{type:"button",class:"btn primary",style:"margin-top:8px;"},"Перевірити");a.addEventListener("click",()=>{let l=0;p.forEach(({row:y,select:c,right:u})=>{const f=c.value===u;y.style.borderColor=f?"#10b981":"#ef4444",f&&l++}),s.textContent=`Результат: ${l}/${p.length}`}),r.appendChild(a),r.appendChild(s)}function N(r,n){r.appendChild(e("h3",{},n.prompt||"Прочитайте текст та дайте відповіді"));const d=n.context||{},h=String(d.format||"narrative").toLowerCase(),p=Array.isArray(d.body)?d.body:[],s=e("div",{style:"margin:12px 0;padding:14px;border:1px solid #cbd5e1;border-radius:10px;background:#f8fafc;"});d.title&&s.appendChild(e("h4",{style:"margin:0 0 8px;font-size:18px;"},d.title)),h==="dialog"?p.forEach(u=>{if(!u)return;const f=typeof u=="object"&&u.speaker?`${u.speaker}:`:"",b=typeof u=="object"&&"line"in u?u.line:typeof u=="string"?u:"";s.appendChild(e("p",{style:"margin:4px 0;display:flex;gap:6px;align-items:flex-start;line-height:1.5;"},f?e("strong",{},f):null,e("span",{},b)))}):p.forEach((u,f)=>{const b=typeof u=="string"?u:u&&u.text?u.text:"";b&&s.appendChild(e("p",{style:f?"margin:8px 0 0;":"margin:0;"},b))}),r.appendChild(s);const a=Array.isArray(n.questions)?n.questions:[];if(!a.length)return;const l=[];a.forEach((u,f)=>{const b=e("div",{style:"margin-bottom:12px;padding:12px;border:1px solid #e5e7eb;border-radius:10px;background:#fff;"},e("div",{style:"margin-bottom:8px;font-weight:600;"},u.q||`Питання ${f+1}`)),k=Array.isArray(u.answer)?u.answer.map(String):u.answer!=null?[String(u.answer)]:[];if(Array.isArray(u.choices)&&u.choices.length){const S=`${n.id||"context"}-${f}`,w=k.length>1,E=k.every(L=>/^\d+$/.test(L));u.choices.forEach((L,C)=>{const A=`${S}-${C}`;b.appendChild(e("label",{for:A,style:"display:flex;align-items:center;gap:8px;margin:4px 0;"},e("input",{type:w?"checkbox":"radio",name:S,id:A,value:String(C)}),e("span",{},L)))}),l.push({block:b,type:"choices",allowMulti:w,getPicked:()=>{const C=Array.from(b.querySelectorAll(`input[name='${S}']`)).filter(A=>A.checked).map(A=>A.value);return E?C:C.map(A=>g(u.choices[Number(A)]||""))},expected:E?k:k.map(L=>g(L))})}else{const S=e("textarea",{rows:2,style:"width:100%;max-width:640px;padding:6px 8px;border:1px solid #cbd5e1;border-radius:6px;"});b.appendChild(S),l.push({block:b,type:"text",input:S,expected:k.map(w=>g(w))})}u.explanation&&b.appendChild(e("div",{class:"muted",style:"display:none;margin-top:6px;color:#475569;"},u.explanation)),r.appendChild(b)});const y=e("div",{style:"margin-top:8px;font-weight:600;"}),c=e("button",{type:"button",class:"btn primary",style:"margin-top:8px;"},"Перевірити");c.addEventListener("click",()=>{let u=0;l.forEach(f=>{let b=!1;if(f.type==="choices"){const S=f.getPicked().sort(),w=f.expected.slice().sort();b=S.length===w.length&&S.every((E,L)=>E===w[L])}else{const S=g(f.input.value);b=f.expected.length?f.expected.includes(S):!!S}f.block.style.borderColor=b?"#10b981":"#ef4444";const k=f.block.querySelector(".muted");k&&(k.style.display=b?"none":"block"),b&&u++}),y.textContent=`Результат: ${u}/${l.length}`}),r.appendChild(c),r.appendChild(y)}function H(r,n,d,h={}){const{showRemove:p=!0}=h,s=d||(n&&n.id?String(n.id):`task-${Math.random().toString(16).slice(2,8)}`),a=e("section",{style:"position:relative;margin:18px 0 26px;","data-task-id":n&&n.id?String(n.id):"","data-task-key":s}),l=e("div",{style:"position:absolute;top:6px;right:6px;display:flex;gap:6px;align-items:center;z-index:5;"}),{button:y,panel:c}=_(n);if(l.appendChild(y),p){const b=e("button",{type:"button",title:"Видалити завдання","aria-label":"Видалити завдання",style:"border:none;background:transparent;color:#94a3b8;cursor:pointer;padding:2px;line-height:1;font-size:14px;opacity:0.6;",onmouseenter:()=>b.style.opacity="1",onmouseleave:()=>b.style.opacity="0.6",onclick:()=>{x.active&&x.active.panel===c&&$(),document.dispatchEvent(new CustomEvent("practice:taskRemoved",{detail:{key:s,task:n}})),a.remove()}},"✕");l.appendChild(b)}a.appendChild(l),a.appendChild(c),n.title&&a.appendChild(e("h3",{},n.title));const u=n&&n.type;switch(String(u||"").trim().toLowerCase()){case"mcq":ie(a,n);break;case"gap":se(a,n);break;case"match":le(a,n);break;case"context":N(a,n);break;case"transform":ot(a,n);break;case"error":at(a,n);break;case"order":it(a,n);break;case"short":st(a,n);break;case"roleplay":dt(a,n);break;case"dialogue-gap":ct(a,n);break;case"dialogue-order":pt(a,n);break;case"truefalse":ut(a,n);break;case"definition-match":{const b={...n,prompt:n.prompt||"Поєднай слово з визначенням"};le(a,b);break}case"synonym-clue":ht(a,n);break;case"scramble":mt(a,n);break;case"wordpairs":{const b={...n,prompt:n.prompt||"Поєднай форму в однині та множині"};le(a,b);break}case"odd-one-out":ft(a,n);break;case"open":lt(a,n);break;case"writing":yt(a,n);break;default:a.appendChild(e("div",{class:"muted"},`Невідомий тип завдання: ${u}`))}r.appendChild(a)}window.practice=window.practice||{},window.practice.appendTask=function(r,n={}){const d=Oe();if(!d||!r)return;const h=d.querySelector("#practice-body")||d,p=n.showRemove!==!1;H(h,r,n.key,{showRemove:p})},window.practice.renderTaskList=function(r,n,d={}){if(!r)return null;const h=Array.isArray(n)?n.filter(Boolean):[],{title:p,level:s,description:a,keyPrefix:l="inline",showEmptyNote:y=!1,showRemove:c=!1}=d;if(!h.length){if(y){const f=e("p",{class:"muted practice-inline__empty"},"Практика для цієї теми поки відсутня.");r.appendChild(f)}return null}const u=e("section",{class:"practice-inline"});if(p||s||a){const f=e("header",{class:"practice-inline__header"});p&&f.appendChild(e("h3",{class:"practice-inline__title"},p)),s&&f.appendChild(e("span",{class:"practice-inline__badge"},s)),a&&f.appendChild(e("p",{class:"practice-inline__description muted"},a)),u.appendChild(f)}return h.forEach((f,b)=>{const k=`${l}-${b}`;H(u,f,k,{showRemove:c})}),r.appendChild(u),document.dispatchEvent(new CustomEvent("practice:inlineRendered",{detail:{tasks:h,container:r,options:d}})),u};async function te(r){if(!r)return null;const n=o(r);try{const d=await fetch(n,{cache:"no-store"});return d.ok?await d.json():null}catch{return null}}async function be(){const r=document.getElementById("practice-data");if(r)try{return JSON.parse(r.textContent)}catch{return null}const n=window.lessonContext||{},d=new Set;if(n.id&&d.add(`data/practice/${n.id}.json`),n.htmlPath){const p=String(n.htmlPath).replace(/^\.\/?/,"").replace(/\.html?$/i,"");if(p){d.add(`data/practice/${p}.json`);const s=p.split("/"),a=s[s.length-1];a&&d.add(`data/practice/${a}.json`)}}for(const p of d){const s=await te(p);if(s)return s}const h=i();return h?await te(h):null}function ot(r,n){r.appendChild(e("h3",{},n.prompt||"Transform the sentence"));const d=[];(n.items||[]).forEach(s=>{const a=e("div",{style:"margin-bottom:10px;padding:10px;border:1px solid #e5e7eb;border-radius:10px;background:#fff;"});a.appendChild(e("div",{style:"margin-bottom:6px;font-weight:600;"},s.q));const l=e("input",{type:"text",style:"width:100%;max-width:640px;padding:6px 8px;border:1px solid #cbd5e1;border-radius:6px;"});a.appendChild(l),s.hint&&a.appendChild(B(s.hint)),d.push({row:a,input:l,answers:(s.answer||[]).map(y=>g(y))}),r.appendChild(a)});const h=e("div",{style:"margin-top:8px;font-weight:600;"}),p=e("button",{type:"button",class:"btn primary",style:"margin-top:8px;"},"Перевірити");p.addEventListener("click",()=>{let s=0;d.forEach(({row:a,input:l,answers:y})=>{const c=y.includes(g(l.value));a.style.borderColor=c?"#10b981":"#ef4444",c&&s++}),h.textContent=`Результат: ${s}/${d.length}`}),r.appendChild(p),r.appendChild(h)}function at(r,n){r.appendChild(e("h3",{},n.prompt||"Find and correct the error"));const d=[];(n.items||[]).forEach(s=>{const a=e("div",{style:"margin-bottom:10px;padding:10px;border:1px solid #e5e7eb;border-radius:10px;background:#fff;"});a.appendChild(e("div",{style:"margin-bottom:6px;font-weight:600;"},s.q));const l=e("input",{type:"text",style:"width:100%;max-width:640px;padding:6px 8px;border:1px solid #cbd5e1;border-radius:6px;"});a.appendChild(l),s.hint&&a.appendChild(B(s.hint)),d.push({row:a,input:l,answers:(s.answer||[]).map(y=>g(y))}),r.appendChild(a)});const h=e("div",{style:"margin-top:8px;font-weight:600;"}),p=e("button",{type:"button",class:"btn primary",style:"margin-top:8px;"},"Перевірити");p.addEventListener("click",()=>{let s=0;d.forEach(({row:a,input:l,answers:y})=>{const c=y.includes(g(l.value));a.style.borderColor=c?"#10b981":"#ef4444",c&&s++}),h.textContent=`Результат: ${s}/${d.length}`}),r.appendChild(p),r.appendChild(h)}function it(r,n){r.appendChild(e("h3",{},n.prompt||"Put the words in order"));const d=[];(n.items||[]).forEach((s,a)=>{const l=g(Array.isArray(s.answer)?s.answer.join(" "):s.answer),y=m((s.tokens||[]).slice()),c=e("div",{style:"margin:10px 0;padding:10px;border:1px solid #e5e7eb;border-radius:10px;background:#fff;"}),u=e("div",{style:"display:flex;flex-wrap:wrap;gap:6px;margin-bottom:6px;"}),f=e("div",{style:"display:flex;flex-wrap:wrap;gap:6px;min-height:36px;padding:6px;border:1px dashed #cbd5e1;border-radius:8px;background:#f8fafc;"}),b=new Set;function k(E,L){const C=e("button",{type:"button",style:"padding:4px 8px;border:1px solid #cbd5e1;border-radius:6px;background:#fff;cursor:pointer;"},E);return C.addEventListener("click",()=>{b.has(L)||(b.add(L),C.style.opacity=.5,f.appendChild(e("span",{class:"chip",style:"padding:4px 8px;border:1px solid #cbd5e1;border-radius:6px;background:#fff;"},E)))}),C}y.forEach((E,L)=>u.appendChild(k(E,`${a}-${L}`)));const S=e("div",{style:"margin-top:6px;display:flex;gap:8px;"}),w=e("button",{type:"button",class:"btn"},"Скинути");w.addEventListener("click",()=>{b.clear(),f.innerHTML="",Array.from(u.children).forEach(E=>E.style.opacity=1),c.style.borderColor="#e5e7eb"}),S.appendChild(w),c.appendChild(e("div",{style:"margin-bottom:6px;font-weight:600;"},s.q||"")),c.appendChild(u),c.appendChild(f),c.appendChild(S),d.push({row:c,outWrap:f,correctStr:l}),r.appendChild(c)});const h=e("div",{style:"margin-top:8px;font-weight:600;"}),p=e("button",{type:"button",class:"btn primary",style:"margin-top:8px;"},"Перевірити");p.addEventListener("click",()=>{let s=0;d.forEach(({row:a,outWrap:l,correctStr:y})=>{const u=g(Array.from(l.querySelectorAll(".chip")).map(f=>f.textContent).join(" "))===y;a.style.borderColor=u?"#10b981":"#ef4444",u&&s++}),h.textContent=`Результат: ${s}/${d.length}`}),r.appendChild(p),r.appendChild(h)}function st(r,n){r.appendChild(e("h3",{},n.prompt||"Short answer"));const d=[];(n.items||[]).forEach(s=>{const a=e("div",{style:"margin-bottom:10px;padding:10px;border:1px solid #e5e7eb;border-radius:10px;background:#fff;"});a.appendChild(e("div",{style:"margin-bottom:6px;font-weight:600;"},s.q));const l=e("textarea",{rows:3,style:"width:100%;max-width:720px;padding:6px 8px;border:1px solid #cbd5e1;border-radius:6px;"});a.appendChild(l),d.push({row:a,input:l,keywords:(s.keywords||[]).map(y=>g(y))}),r.appendChild(a)});const h=e("div",{style:"margin-top:8px;font-weight:600;"}),p=e("button",{type:"button",class:"btn primary",style:"margin-top:8px;"},"Перевірити");p.addEventListener("click",()=>{let s=0,a=0;d.forEach(({row:l,input:y,keywords:c})=>{const u=g(y.value),f=c.filter(k=>u.includes(k)).length;s+=f,a+=c.length,l.style.borderColor=f===c.length?"#10b981":f>0?"#f59e0b":"#ef4444";const b=l.querySelector(".short-info")||e("div",{class:"short-info",style:"margin-top:6px;color:#475569;"});b.textContent=`Збіги ключових слів: ${f}/${c.length}`,l.contains(b)||l.appendChild(b)}),h.textContent=`Загальний збіг ключових слів: ${s}/${a}`}),r.appendChild(p),r.appendChild(h)}function lt(r,n){r.appendChild(e("h3",{},n.prompt||"Відповіді у вільній формі"));const d=Array.isArray(n&&n.items)?n.items.filter(Boolean):[];if(d.length){const p=e("div",{style:"display:flex;flex-direction:column;gap:12px;margin-top:12px;"});d.forEach((s,a)=>{const l=e("div",{style:"padding:12px;border:1px solid #e5e7eb;border-radius:10px;background:#fff;"}),y=s&&(s.situation||s.prompt||s.q)||`Ситуація ${a+1}`;l.appendChild(e("div",{style:"margin:0 0 6px;font-weight:600;color:#0f172a;"},y));const c=s&&Array.isArray(s.example_answers)?s.example_answers.filter(Boolean):[];if(c.length){l.appendChild(e("div",{class:"muted",style:"margin:0 0 6px;color:#64748b;"},"Приклад відповіді:"));const u=e("div",{style:"display:flex;flex-wrap:wrap;gap:8px;"});c.forEach(f=>{u.appendChild(e("span",{style:"display:inline-flex;align-items:center;padding:4px 10px;border-radius:9999px;background:#e2e8f0;color:#0f172a;font-size:14px;"},f))}),l.appendChild(u)}p.appendChild(l)}),r.appendChild(p)}const h=n&&n.scoring&&Array.isArray(n.scoring.criteria)?n.scoring.criteria.filter(Boolean):[];if(h.length){const p=e("div",{style:"margin-top:16px;padding:14px;border:1px dashed #cbd5e1;border-radius:10px;background:#f8fafc;"});p.appendChild(e("h4",{style:"margin:0 0 8px;font-size:16px;font-weight:600;color:#0f172a;"},"Критерії оцінювання"));const s=e("ul",{style:"margin:0;padding-left:18px;color:#475569;"});h.forEach(a=>{s.appendChild(e("li",{style:"margin:4px 0;"},a))}),p.appendChild(s),r.appendChild(p)}}function dt(r,n){r.appendChild(e("h3",{},n.prompt||"Role-play scenario"));const d=n&&typeof n.scenario=="object"?n.scenario:{},h=e("div",{style:"margin:12px 0;padding:14px;border:1px solid #cbd5e1;border-radius:10px;background:#f8fafc;"});let p=!1;d.setting&&(h.appendChild(e("p",{style:"margin:0 0 6px;font-weight:600;"},`Локація: ${d.setting}`)),p=!0),d.summary&&(h.appendChild(e("p",{style:"margin:0;color:#334155;"},d.summary)),p=!0),p&&r.appendChild(h);const s=Array.isArray(d.roles)?d.roles:[];if(s.length){const y=e("div",{style:"display:grid;gap:12px;margin-top:12px;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));"});s.forEach((c,u)=>{const f=c&&c.name||`Student ${u+1}`,b=e("div",{style:"padding:14px;border:1px solid #e5e7eb;border-radius:10px;background:#fff;box-shadow:0 1px 0 rgba(148, 163, 184, 0.2);"},e("div",{style:"font-weight:600;margin-bottom:6px;"},f));c&&c.goal&&b.appendChild(e("p",{style:"margin:0 0 6px;color:#0f172a;"},`Мета: ${c.goal}`));const S=(c&&Array.isArray(c.details)?c.details:typeof(c==null?void 0:c.details)=="string"?c.details.split(/[;,\n]/):[]).map(w=>String(w||"").trim()).filter(Boolean);if(S.length===1)b.appendChild(e("p",{style:"margin:0;color:#475569;"},S[0]));else if(S.length>1){const w=e("ul",{style:"margin:0;padding-left:18px;color:#475569;"});S.forEach(E=>{w.appendChild(e("li",{style:"margin:2px 0;"},E))}),b.appendChild(w)}y.appendChild(b)}),r.appendChild(y)}const a=Array.isArray(d.steps)?d.steps:[];if(a.length){const y=e("div",{style:"margin-top:16px;padding:14px;border:1px solid #e5e7eb;border-radius:10px;background:#fff;"});y.appendChild(e("h4",{style:"margin:0 0 6px;font-size:16px;font-weight:600;color:#0f172a;"},"Покроковий план діалогу"));const c=e("ol",{style:"margin:0 0 0 18px;padding:0;color:#475569;"});a.forEach(u=>{u&&c.appendChild(e("li",{style:"margin:4px 0;"},u))}),y.appendChild(c),r.appendChild(y)}const l=Array.isArray(n&&n.phrases)?n.phrases:[];if(l.length){r.appendChild(e("h4",{style:"margin:18px 0 8px;font-size:16px;font-weight:600;color:#0f172a;"},"Корисні фрази для діалогу"));const y=e("div",{style:"display:flex;flex-direction:column;gap:8px;"});l.forEach(c=>{const u=typeof c=="string"?c:c&&(c.phrase||c.text||c.value||""),f=c&&typeof c=="object"&&(c.translation||c.note||c.ua||c.uk)||"";if(!u)return;const b=`phrase-${Math.random().toString(36).slice(2,8)}`;y.appendChild(e("label",{for:b,style:"display:flex;gap:10px;align-items:flex-start;padding:10px 12px;border:1px solid #e5e7eb;border-radius:10px;background:#fff;"},e("input",{id:b,type:"checkbox",style:"margin-top:4px;"}),e("div",{},e("span",{style:"font-weight:600;color:#0f172a;"},u),f?e("span",{class:"muted",style:"display:block;margin-top:4px;color:#475569;"},f):null)))}),r.appendChild(y)}}function ct(r,n){r.appendChild(e("h3",{},n.prompt||"Заповніть пропуски у діалозі"));const d=Array.isArray(n==null?void 0:n.answers)?n.answers.map(C=>g(C)):[],h=[];let p=null;function s(C){p&&p!==C&&(p.style.boxShadow="none"),C&&p!==C?(C.style.boxShadow="0 0 0 2px rgba(37, 99, 235, 0.35)",p=C):(C&&(C.style.boxShadow="none"),p=null)}function a(C){C&&(C.dataset.value="",C.textContent="___",C.style.borderColor="#cbd5e1",C.style.background="#fff",C.style.boxShadow="none")}const l=e("div",{style:"display:flex;flex-wrap:wrap;gap:8px;margin:12px 0;padding:10px;border:1px solid #e2e8f0;border-radius:10px;background:#f8fafc;"}),y=Array.isArray(n==null?void 0:n.words)?n.words:[],c=new Set,u=[];y.forEach(C=>{const A=String(C||"").trim();if(!A)return;const j=g(A);c.has(j)||(c.add(j),u.push(A))}),u.forEach(C=>{const A=e("button",{type:"button",class:"btn",style:"padding:6px 10px;border:1px solid #94a3b8;border-radius:999px;background:#fff;color:#0f172a;cursor:pointer;font-size:14px;line-height:1;",onclick:()=>{const j=p||h.find(ne=>!ne.dataset.value);j&&(j.dataset.value=C,j.textContent=C,j.style.borderColor="#2563eb",j.style.background="#eef2ff",s(null))}},C);A.dataset.word=C,l.appendChild(A)}),l.children.length&&r.appendChild(l);const f=e("div",{style:"display:flex;flex-direction:column;gap:10px;"}),b=Array.isArray(n==null?void 0:n.dialogue)?n.dialogue:[];let k=0;b.forEach(C=>{if(!C)return;const A=C.speaker||C.role||"",j=C.line||C.text||"",ne=e("div",{style:"padding:12px;border:1px solid #e5e7eb;border-radius:10px;background:#fff;display:flex;gap:10px;align-items:flex-start;"},A?e("strong",{style:"min-width:90px;"},`${A}:`):null),re=e("div",{style:"display:flex;flex-wrap:wrap;gap:6px;align-items:center;"}),Ne=String(j||"").split(/___/);Ne.forEach((Re,xt)=>{if(Re&&re.appendChild(e("span",{},Re)),xt<Ne.length-1){const bt=d[k]||"",Q=e("button",{type:"button",style:"min-width:52px;padding:4px 10px;border:1px solid #cbd5e1;border-radius:8px;background:#fff;color:#0f172a;cursor:pointer;",onclick:()=>{if(Q.dataset.value){a(Q),s(Q);return}s(p===Q?null:Q)},ondblclick:()=>{a(Q),s(null)}},"___");Q.dataset.expected=bt,Q.dataset.index=String(k),h.push(Q),k+=1,re.appendChild(Q)}}),ne.appendChild(re),f.appendChild(ne)}),r.appendChild(f);const S=e("div",{style:"margin-top:14px;display:flex;gap:10px;flex-wrap:wrap;align-items:center;"}),w=e("button",{type:"button",class:"btn primary"},"Перевірити"),E=e("button",{type:"button",class:"btn"},"Скинути"),L=e("div",{style:"font-weight:600;color:#0f172a;"});w.addEventListener("click",()=>{let C=0;h.forEach(A=>{const j=A.dataset.expected||"",ne=g(A.dataset.value||A.textContent||""),re=j?ne===j:!!ne;A.style.borderColor=re?"#10b981":"#ef4444",A.style.background=re?"#ecfdf5":"#fee2e2",re&&(C+=1)}),h.length?L.textContent=`Результат: ${C}/${h.length}`:L.textContent=""}),E.addEventListener("click",()=>{h.forEach(C=>a(C)),L.textContent="",s(null)}),S.appendChild(w),S.appendChild(E),S.appendChild(L),r.appendChild(S)}function pt(r,n){r.appendChild(e("h3",{},n.prompt||"Упорядкуйте діалог"));const d=Array.isArray(n==null?void 0:n.lines)?n.lines.map(w=>({speaker:(w==null?void 0:w.speaker)||(w==null?void 0:w.role)||"",text:(w==null?void 0:w.line)||(w==null?void 0:w.text)||""})):[],h=Array.isArray(n==null?void 0:n.solution)?n.solution.map(w=>Number.parseInt(w,10)):d.map((w,E)=>E),p=e("div",{style:"display:flex;flex-direction:column;gap:8px;margin-top:10px;padding:10px;border:1px solid #e2e8f0;border-radius:10px;background:#f8fafc;"}),s=e("div",{style:"margin-top:14px;padding:12px;border:1px dashed #cbd5e1;border-radius:10px;min-height:80px;display:flex;flex-direction:column;gap:8px;"}),a=new Set;function l({speaker:w,text:E}){return(w?`${w}: ${E}`:E).trim()}function y(w){if(!w)return;const E=Number.parseInt(w.dataset.index||"-1",10),L=w.dataset.buttonId;if(L){const C=p.querySelector(`[data-id="${L}"]`);C&&(C.disabled=!1,C.style.opacity="1")}a.delete(E),w.remove()}function c(w,E,L){const C=e("div",{class:"dialogue-chip",style:"padding:10px;border:1px solid #94a3b8;border-radius:10px;background:#fff;display:flex;justify-content:space-between;align-items:center;gap:12px;cursor:pointer;",onclick:A=>{A.stopPropagation(),y(C)}},e("span",{},E),e("span",{style:"color:#94a3b8;font-size:12px;"},"×"));C.dataset.index=String(w),C.dataset.buttonId=L,s.appendChild(C)}m(d.map((w,E)=>E)).forEach(w=>{const E=d[w],L=l(E),C=`line-${w}-${Math.random().toString(36).slice(2,6)}`,A=e("button",{type:"button",class:"btn",style:"text-align:left;padding:10px;border:1px solid #cbd5e1;border-radius:10px;background:#fff;color:#0f172a;cursor:pointer;",onclick:()=>{a.has(w)||(a.add(w),A.disabled=!0,A.style.opacity="0.5",c(w,L,C))},"data-id":C},L);p.appendChild(A)}),r.appendChild(p),r.appendChild(s);const f=e("div",{style:"margin-top:14px;display:flex;gap:10px;flex-wrap:wrap;align-items:center;"}),b=e("button",{type:"button",class:"btn primary"},"Перевірити"),k=e("button",{type:"button",class:"btn"},"Скинути"),S=e("div",{style:"font-weight:600;color:#0f172a;"});b.addEventListener("click",()=>{const w=Array.from(s.children).map(C=>Number.parseInt(C.dataset.index||"-1",10)),E=h.slice(),L=w.length===E.length&&w.every((C,A)=>C===E[A]);s.style.borderColor=L?"#10b981":"#ef4444",S.textContent=L?"Діалог впорядковано правильно!":`Поточний порядок: ${w.length}/${E.length} реплік. Перевірте послідовність.`}),k.addEventListener("click",()=>{Array.from(s.children).forEach(E=>y(E)),p.querySelectorAll("button").forEach(E=>{E.disabled=!1,E.style.opacity="1"}),a.clear(),s.style.borderColor="#cbd5e1",S.textContent=""}),f.appendChild(b),f.appendChild(k),f.appendChild(S),r.appendChild(f)}function ut(r,n){r.appendChild(e("h3",{},n.prompt||"Обери True або False"));const d=[];if((Array.isArray(n==null?void 0:n.items)?n.items:[]).forEach((l,y)=>{if(!l||!l.statement)return;const c=e("div",{style:"margin:8px 0;padding:12px;border:1px solid #e5e7eb;border-radius:10px;background:#fff;"},e("p",{style:"margin:0 0 8px;font-weight:600;"},l.statement)),u=`${n.id||"tf"}-${y}`,f=!!l.answer,b=e("label",{style:"display:inline-flex;align-items:center;gap:6px;margin-right:16px;"},e("input",{type:"radio",name:u,value:"true"}),"True"),k=e("label",{style:"display:inline-flex;align-items:center;gap:6px;"},e("input",{type:"radio",name:u,value:"false"}),"False"),S=e("div",{style:"display:flex;align-items:center;"});S.appendChild(b),S.appendChild(k),c.appendChild(S),d.push({row:c,name:u,expected:f}),r.appendChild(c)}),!d.length)return;const p=e("div",{style:"margin-top:14px;display:flex;gap:10px;align-items:center;flex-wrap:wrap;"}),s=e("button",{type:"button",class:"btn primary"},"Перевірити"),a=e("div",{style:"font-weight:600;color:#0f172a;"});s.addEventListener("click",()=>{let l=0;d.forEach(({row:y,name:c,expected:u})=>{const f=y.querySelector(`input[name="${c}"]:checked`),b=f?f.value===String(u):!1;y.style.borderColor=b?"#10b981":"#ef4444",b&&(l+=1)}),a.textContent=`Результат: ${l}/${d.length}`}),p.appendChild(s),p.appendChild(a),r.appendChild(p)}function ht(r,n){r.appendChild(e("h3",{},n.prompt||"Доберіть слово за описом"));const d=Array.isArray(n==null?void 0:n.wordBank)?n.wordBank:[];if(d.length){const l=e("div",{style:"margin:8px 0 12px;padding:10px;border:1px solid #e2e8f0;border-radius:10px;background:#f8fafc;display:flex;flex-wrap:wrap;gap:8px;"});d.forEach(y=>{const c=String(y||"").trim();c&&l.appendChild(e("span",{style:"padding:6px 10px;border:1px solid #94a3b8;border-radius:999px;background:#fff;font-size:14px;"},c))}),r.appendChild(l)}const h=[];if((Array.isArray(n==null?void 0:n.items)?n.items:[]).forEach(l=>{if(!l||!l.clue)return;const y=e("div",{style:"margin-bottom:10px;padding:12px;border:1px solid #e5e7eb;border-radius:10px;background:#fff;"});y.appendChild(e("p",{style:"margin:0 0 6px;font-weight:600;"},l.clue));const c=e("input",{type:"text",style:"width:100%;max-width:320px;padding:6px 8px;border:1px solid #cbd5e1;border-radius:6px;"});y.appendChild(c);const u=Array.isArray(l==null?void 0:l.answers)?l.answers.map(f=>g(f)):Array.isArray(l==null?void 0:l.answer)?l.answer.map(f=>g(f)):l!=null&&l.answer?[g(l.answer)]:[];h.push({row:y,input:c,answers:u}),r.appendChild(y)}),!h.length)return;const s=e("div",{style:"font-weight:600;color:#0f172a;"}),a=e("button",{type:"button",class:"btn primary"},"Перевірити");a.addEventListener("click",()=>{let l=0;h.forEach(({row:y,input:c,answers:u})=>{const f=g(c.value),b=u.length?u.includes(f):!!f;y.style.borderColor=b?"#10b981":"#ef4444",b&&(l+=1)}),s.textContent=`Результат: ${l}/${h.length}`}),r.appendChild(a),r.appendChild(s)}function mt(r,n){r.appendChild(e("h3",{},n.prompt||"Розшифруйте слова"));const d=[];if((Array.isArray(n==null?void 0:n.items)?n.items:[]).forEach(a=>{if(!a||!a.scrambled)return;const l=e("div",{style:"margin-bottom:10px;padding:12px;border:1px solid #e5e7eb;border-radius:10px;background:#fff;"});l.appendChild(e("div",{style:"margin-bottom:6px;font-weight:600;"},a.scrambled));const y=e("input",{type:"text",style:"width:100%;max-width:260px;padding:6px 8px;border:1px solid #cbd5e1;border-radius:6px;"});l.appendChild(y);const c=Array.isArray(a==null?void 0:a.answers)?a.answers.map(u=>g(u)):Array.isArray(a==null?void 0:a.answer)?a.answer.map(u=>g(u)):a!=null&&a.answer?[g(a.answer)]:[];d.push({row:l,input:y,answers:c}),r.appendChild(l)}),!d.length)return;const p=e("button",{type:"button",class:"btn primary"},"Перевірити"),s=e("div",{style:"margin-top:6px;font-weight:600;color:#0f172a;"});p.addEventListener("click",()=>{let a=0;d.forEach(({row:l,input:y,answers:c})=>{const u=g(y.value),f=c.length?c.includes(u):!!u;l.style.borderColor=f?"#10b981":"#ef4444",f&&(a+=1)}),s.textContent=`Результат: ${a}/${d.length}`}),r.appendChild(p),r.appendChild(s)}function ft(r,n){r.appendChild(e("h3",{},n.prompt||"Знайди зайве слово"));const d=[];if((Array.isArray(n==null?void 0:n.items)?n.items:[]).forEach((a,l)=>{const y=Array.isArray(a==null?void 0:a.options)?a.options:[];if(!y.length)return;const c=e("div",{style:"margin-bottom:10px;padding:12px;border:1px solid #e5e7eb;border-radius:10px;background:#fff;"});c.appendChild(e("div",{style:"margin-bottom:6px;font-weight:600;"},`Набір ${l+1}`));const u=`${n.id||"odd"}-${l}`;y.forEach((k,S)=>{const w=`${u}-${S}`;c.appendChild(e("label",{for:w,style:"display:flex;align-items:center;gap:6px;margin:4px 0;"},e("input",{type:"radio",name:u,value:String(S),id:w}),k))});const f=String((a==null?void 0:a.explanation)||"").trim();if(f){const k=e("div",{class:"muted",style:"display:none;margin-top:6px;color:#475569;"});k.textContent=`Пояснення: ${f}`,c.appendChild(k)}const b=g((a==null?void 0:a.answer)||"");d.push({row:c,groupName:u,answerIndex:b}),r.appendChild(c)}),!d.length)return;const p=e("button",{type:"button",class:"btn primary"},"Перевірити"),s=e("div",{style:"margin-top:6px;font-weight:600;color:#0f172a;"});p.addEventListener("click",()=>{let a=0;d.forEach(({row:l,groupName:y,answerIndex:c})=>{const u=l.querySelector(`input[name="${y}"]:checked`),f=g(u?u.value:""),b=c?f===c:!!f;l.style.borderColor=b?"#10b981":"#ef4444";const k=l.querySelector(".muted");k&&(k.style.display=b?"none":"block"),b&&(a+=1)}),s.textContent=`Результат: ${a}/${d.length}`}),r.appendChild(p),r.appendChild(s)}function yt(r,n){r.appendChild(e("h3",{},n.prompt||"Writing/Speaking prompt")),n.description&&r.appendChild(e("p",{class:"muted"},n.description));const d=e("div",{style:"margin-top:8px;"});(n.checklist||[]).forEach(s=>{const a=Math.random().toString(36).slice(2),l=e("label",{for:a,style:"display:flex;align-items:center;gap:8px;margin:6px 0;"},e("input",{id:a,type:"checkbox"}),e("span",{},s));d.appendChild(l)}),r.appendChild(d);const h=e("button",{type:"button",class:"btn primary",style:"margin-top:8px;"},"Позначити як перевірено"),p=e("div",{class:"muted",style:"margin-top:6px;"});h.addEventListener("click",()=>{p.textContent="Готово! Перевір список і за бажанням відправ наставнику."}),r.appendChild(h),r.appendChild(p)}function Oe(){let r=document.getElementById("practice");if(!r&&/\/grammar\//.test(location.pathname)){const n=e("div",{class:"container"});n.appendChild(e("hr",{class:"sep"})),r=e("section",{id:"practice"}),n.appendChild(r),document.body.appendChild(n)}return r}function gt(){const r=Oe();if(!r)return;let n=r.querySelector("#practice-body");if(n||(n=e("div",{id:"practice-body"}),r.appendChild(n)),(window.lessonContext||{}).isCustomLesson){const h=r.querySelector("[data-practice-placeholder]");h&&(h.textContent="Практика для кожної теми розміщена одразу після теорії. Тут можете згенерувати додаткові завдання."),n&&(n.innerHTML='<p class="muted">Згенеруйте додаткові вправи або додайте власні завдання.</p>'),document.dispatchEvent(new CustomEvent("practice:dataLoaded",{detail:null})),document.dispatchEvent(new CustomEvent("practice:rendered",{detail:{ok:!1,reason:"custom-lesson"}}));return}be().then(h=>{if(!h){document.dispatchEvent(new CustomEvent("practice:dataLoaded",{detail:null})),n.innerHTML='<p class="muted">Практика поки відсутня.</p>',document.dispatchEvent(new CustomEvent("practice:rendered",{detail:{ok:!1}}));return}n.innerHTML="";const p=e("div",{},e("h2",{},"Practice ",e("span",{class:"badge"},h.level||"B1")),h.title?e("p",{class:"muted"},h.title):null);n.appendChild(p);const s=(h.tasks||[]).map((a,l)=>({key:a&&a.id?String(a.id):`base-${l}`,task:a}));document.dispatchEvent(new CustomEvent("practice:dataLoaded",{detail:{title:h.title,level:h.level,entries:s}})),s.forEach(({task:a,key:l})=>H(n,a,l)),document.dispatchEvent(new CustomEvent("practice:rendered",{detail:{ok:!0}}))})}document.addEventListener("DOMContentLoaded",gt)})();document.addEventListener("click",t=>{const o=t.target.closest(".text-block");if(o){const i=o.innerHTML;navigator.clipboard.writeText(`<div class="text-block">${i}</div>`),console.log("Скопійовано")}});const Ye={"greetings-farewells":[{word:"Hello",translation:"Привіт",example:"Hello, nice to meet you!"},{word:"Hi",translation:"Привіт (неформально)",example:"Hi, are you ready for class?"},{word:"Good morning",translation:"Доброго ранку",example:"Good morning, Mrs Smith."},{word:"Good afternoon",translation:"Доброго дня",example:"Good afternoon, everyone."},{word:"Good evening",translation:"Доброго вечора",example:"Good evening, how was your day?"},{word:"Nice to meet you",translation:"Приємно познайомитися",example:"Nice to meet you, I'm Tom."},{word:"How are you?",translation:"Як справи?",example:"Hi, Anna! How are you?"},{word:"I'm fine, thanks",translation:"У мене все добре, дякую",example:"I'm fine, thanks. And you?"},{word:"See you later",translation:"Побачимось пізніше",example:"I have to go now. See you later!"},{word:"See you soon",translation:"До скорої зустрічі",example:"Thanks for your help. See you soon."},{word:"Goodbye",translation:"До побачення",example:"Goodbye, have a nice evening!"},{word:"Bye",translation:"Бувай",example:"Bye, talk to you tomorrow!"},{word:"Take care",translation:"Бережи себе",example:"I'm heading home now. Take care!"},{word:"Have a nice day",translation:"Гарного дня",example:"Thanks for coming. Have a nice day!"},{word:"Good night",translation:"Надобраніч",example:"It's late. Good night!"}],"personal-info-basics":[{word:"first name",translation:"ім'я",example:"My first name is Olha."},{word:"last name",translation:"прізвище",example:"Her last name is Petrenko."},{word:"full name",translation:"повне ім'я",example:"Please write your full name here."},{word:"nickname",translation:"прізвисько / нікнейм",example:"His friends call him Max; it's his nickname."},{word:"age",translation:"вік",example:"My age is twenty."},{word:"I am ... years old",translation:"мені ... років",example:"I am twenty years old."},{word:"years old",translation:"років (вік)",example:"I'm eleven years old."},{word:"country",translation:"країна",example:"My country is Ukraine."},{word:"city",translation:"місто",example:"I live in the city of Lviv."},{word:"hometown",translation:"рідне місто",example:"My hometown is Poltava."},{word:"place of birth",translation:"місце народження",example:"My place of birth is Kharkiv."},{word:"address",translation:"адреса",example:"My address is 12 Green Street."},{word:"nationality",translation:"національність",example:"She is Italian by nationality."},{word:"native language",translation:"рідна мова",example:"Ukrainian is my native language."},{word:"foreign language",translation:"іноземна мова",example:"English is my first foreign language."},{word:"from",translation:"з / родом із",example:"I am from Ukraine."},{word:"live in",translation:"жити в",example:"I live in Kyiv."},{word:"live with",translation:"жити з",example:"I live with my parents."},{word:"date of birth",translation:"дата народження",example:"My date of birth is May 12, 2005."},{word:"job / occupation",translation:"робота / професія",example:"My job is a student."},{word:"student",translation:"студент / учень",example:"I'm a student at the local school."},{word:"teacher",translation:"вчитель / викладач",example:"My teacher is from Canada."},{word:"grade",translation:"клас (у школі)",example:"I'm in Grade 6."},{word:"single",translation:"неодружений / неодружена",example:"He is single at the moment."},{word:"married",translation:"одружений / заміжня",example:"My parents are married."},{word:"male",translation:"чоловіча стать",example:"He is male."},{word:"female",translation:"жіноча стать",example:"She is female."},{word:"speak",translation:"говорити (мовою)",example:"I speak Ukrainian and English."},{word:"introduce yourself",translation:"представитись",example:"Let me introduce myself."}]},$t=55,kt=5,Ve=0,Tt={"custom-no1-mggxs7zo":[{id:"db94624e1c8042ce98760f467377e1ae",themeId:"42",templateId:"70",fontStackId:Ve,title:"Wordwall вправа для особових займенників"}],"custom-no2-4db25661":[{id:"110f5ab8bba8415eadefd09fb52c4e87",themeId:"65",templateId:"30",fontStackId:"12",title:"Wordwall вправа для особових займенників",url:"https://wordwall.net/embed/110f5ab8bba8415eadefd09fb52c4e87?themeId=65&templateId=30&fontStackId=12"}],"custom-no3-b9fd7e6c":[{id:"110f5ab8bba8415eadefd09fb52c4e87",themeId:"65",templateId:"30",fontStackId:"12",title:"Wordwall вправа для особових займенників",url:"https://wordwall.net/embed/110f5ab8bba8415eadefd09fb52c4e87?themeId=65&templateId=30&fontStackId=12"}]};function At(t){return t?t.url?String(t.url):t.id?`https://wordwall.net/embed/${String(t.id).trim()}`:null:null}function Xe(t){const o=At(t);if(!o)return null;const i=new URLSearchParams,e=t.themeId??$t,m=t.templateId??kt,g=t.fontStackId??Ve;e!=null&&i.set("themeId",String(e)),m!=null&&i.set("templateId",String(m)),g!=null&&i.set("fontStackId",String(g));const x=i.toString();return x?`${o}?${x}`:o}function Lt(t){const o=Xe(t);if(!o)return null;const i=document.createElement("iframe");return i.className="lesson-wordwall__iframe",i.src=o,i.width=String(t.width??1e3),i.height=String(t.height??760),i.setAttribute("frameborder","0"),i.setAttribute("allowfullscreen","true"),i.setAttribute("loading","lazy"),i.setAttribute("referrerpolicy","strict-origin-when-cross-origin"),t.title&&i.setAttribute("title",t.title),i}function It(t){if(!t)return[];const o=Tt[t];return Array.isArray(o)?o.map(i=>({...i})).filter(i=>!!Xe(i)):[]}const Mt={BASE_URL:"/",DEV:!1,MODE:"production",PROD:!0,SSR:!1},we=typeof import.meta<"u"&&Mt&&"/"||"/";function _e(t){const o=we.endsWith("/")?we:`${we}/`,i=String(t||"");return i.startsWith(o)?i:`${o}${i.replace(/^\/+/,"")}`}const ue=new URLSearchParams(window.location.search),_t=t=>t,he=ue.get("topic"),He=ue.get("custom"),je=ue.get("title"),De=_t(ue.get("category")),We=ue.get("level"),ze=ue.get("file"),M=he?Ie.find(t=>t.id===he):void 0,O=(()=>{if(!He)return null;const t=[];return Array.isArray(Be)&&Be.forEach(o=>{if(!o||typeof o!="object")return;const i=Array.isArray(o.topicIds)?[...o.topicIds]:[];!o.id||!i.length||t.push({...o,topicIds:i,source:"preset"})}),vt().filter(o=>o&&typeof o=="object").forEach(o=>{const i=Array.isArray(o.topicIds)?[...o.topicIds]:[];!o.id||!i.length||t.push({...o,topicIds:i,source:"local"})}),t.find(o=>o.id===He)??null})(),K=!!O,ye=K?O.title:M!=null&&M.title?M.title:je?decodeURIComponent(je):"Матеріал уроку",Se=K?"custom":M!=null&&M.category?M.category:De?decodeURIComponent(De):"",$e=(()=>{if(K){if(O.level)return O.level;const t=(O.topicIds||[]).map(i=>Ie.find(e=>e.id===i)).filter(Boolean);return Array.from(new Set(t.map(i=>i.level))).sort().join(", ")}return M!=null&&M.level?M.level:We?decodeURIComponent(We):""})(),ke=(()=>{if(K)return null;const t=(M==null?void 0:M.htmlPath)??(ze?decodeURIComponent(ze):null);return t&&t.startsWith("lessons/")?t:null})();window.lessonContext={id:K?O.id:(M==null?void 0:M.id)??he??null,title:ye,category:Se,level:$e,htmlPath:ke,source:K?O.source||"custom":"catalog",topicIds:K?[...O.topicIds||[]]:M!=null&&M.id?[M.id]:he?[he]:[],isCustomLesson:K};const Fe=document.querySelector("[data-lesson-title]"),Ge=document.querySelector("[data-lesson-category]"),Qe=document.querySelector("[data-lesson-level]"),Z=document.querySelector("[data-lesson-status]"),D=document.getElementById("lesson-content");function Ut(){const t=document.querySelector('[data-component="copyright-year"]');t&&(t.textContent=String(new Date().getFullYear()))}function Pt(){Fe&&(Fe.textContent=ye);const o=(()=>{var e;return K?"Комбінований урок":((e=Me[Se])==null?void 0:e.label)??""})()||Se;Ge&&(Ge.textContent=o||""),Qe&&(Qe.textContent=$e?`Рівень: ${$e}`:"");const i=document.getElementById("practice-title");i&&(i.textContent=ye),document.title=`${ye} | English Teacher Platform`}function Ze(t){return`lesson-topic-${String(t||"").trim().toLowerCase().replace(/[^a-z0-9_-]+/g,"-").replace(/^-+|-+$/g,"")||"topic"}`}function qt(t){if(!t.length)return null;const o=document.createElement("section");o.className="lesson-custom-summary";const i=document.createElement("h2");i.textContent="Склад уроку",o.appendChild(i);const e=document.createElement("ol");return e.className="lesson-custom-summary__list",t.forEach((m,g)=>{var J;const x=document.createElement("li");x.className="lesson-custom-summary__item";const v=((J=Me[m.category])==null?void 0:J.label)??m.category,T=Ze(m.id),$=document.createElement("a");$.className="lesson-custom-summary__link",$.href=`#${T}`,$.dataset.topicAnchor=T;const P=document.createElement("strong");P.textContent=`${g+1}. ${m.title}`;const R=document.createElement("span");R.textContent=`${v} · ${m.level}`,$.appendChild(P),$.appendChild(R),$.addEventListener("click",z=>{const I=document.getElementById(T);I&&(z.preventDefault(),I.scrollIntoView({behavior:"smooth",block:"start"}),requestAnimationFrame(()=>{try{I.focus({preventScroll:!0})}catch{I.focus()}}))}),x.appendChild($),e.appendChild(x)}),o.appendChild(e),o}async function Ot(t){if(!t)return null;const o=new Set;if(t.id&&o.add(`data/practice/${t.id}.json`),t.htmlPath){const i=String(t.htmlPath).replace(/^\.?\/?/,"").replace(/\.html?$/i,"");if(i){o.add(`data/practice/${i}.json`);const e=i.split("/"),m=e[e.length-1];m&&o.add(`data/practice/${m}.json`)}}for(const i of o)try{const e=await fetch(_e(i),{cache:"no-store"});if(!e.ok)continue;const m=await e.json();if(m&&Array.isArray(m.tasks)&&m.tasks.length)return m}catch(e){console.warn(`Не вдалося завантажити практику за шляхом ${i}`,e)}return null}function Ce(t){if(!t)return;const o=document.createElement("p");o.className="practice-inline__empty muted",o.textContent="Практика для цієї теми поки відсутня.",t.appendChild(o)}function et(t){const o=It(t);if(!o.length)return null;const i=document.createElement("section");i.className="lesson-wordwall";const e=document.createElement("h2");e.className="lesson-wordwall__title",e.textContent="Wordwall",i.appendChild(e);const m=document.createElement("div");m.className="lesson-wordwall__items",i.appendChild(m);let g=!1;return o.forEach((x,v)=>{const T=Lt({...x,title:x.title||`Wordwall вправа ${v+1}`});T&&(g=!0,m.appendChild(T))}),g?i:null}async function Nt(){var g;if(!D)return;const t=((O==null?void 0:O.topicIds)||[]).map(x=>Ie.find(v=>v.id===x)).filter(Boolean);if(!t.length){Z&&(Z.textContent="Не вдалося знайти вибрані теми. Створіть урок заново.");return}if(D.innerHTML="",O!=null&&O.description){const x=document.createElement("p");x.className="lesson-custom-description",x.textContent=O.description,D.appendChild(x)}const o={grammar:0,lexical:1},i=t.slice().sort((x,v)=>{const T=o[x.category]??99,$=o[v.category]??99;return T!==$?T-$:0}),e=qt(i);e&&D.appendChild(e);const m=et((O==null?void 0:O.id)??null);m&&D.appendChild(m);for(const x of i){const v=document.createElement("section");v.className="lesson-topic",v.dataset.topicId=x.id;const T=Ze(x.id);v.id=T,v.setAttribute("tabindex","-1");const $=document.createElement("header");$.className="lesson-topic__header";const P=document.createElement("h3");P.className="lesson-topic__title",P.textContent=x.title,$.appendChild(P);const R=document.createElement("p");R.className="lesson-topic__meta";const J=((g=Me[x.category])==null?void 0:g.label)??x.category;R.textContent=`${J} · Рівень ${x.level}`,$.appendChild(R),v.appendChild($);const z=document.createElement("div");z.className="lesson-topic__body",v.appendChild(z),D.appendChild(v);try{const _=await fetch(_e(x.htmlPath));if(!_.ok)throw new Error(`Не вдалося завантажити файл: ${_.status}`);const B=await _.text();z.innerHTML=B}catch(_){z.innerHTML='<p class="lesson-topic__error">Не вдалося завантажити матеріал цієї теми.</p>',console.error(_)}const I=document.createElement("div");I.className="lesson-topic__practice",v.appendChild(I);try{const _=await Ot(x);if(_&&Array.isArray(_.tasks)&&_.tasks.length){const B=window.practice||{},ie=_.title?`Практика: ${_.title}`:`Практика: ${x.title}`,se=_.level||x.level||"";typeof B.renderTaskList=="function"?B.renderTaskList(I,_.tasks,{title:ie,level:se,description:_.description,keyPrefix:`${x.id}-practice`}):Ce(I)}else Ce(I)}catch(_){console.error("Помилка під час завантаження практики",_),Ce(I)}}Z&&Z.remove(),await tt(D)}async function Rt(){if(D){if(K){await Nt();return}if(!ke){Z&&(Z.textContent="Не вдалося визначити файл з матеріалом. Перейдіть назад та оберіть тему зі списку.");return}try{const t=await fetch(_e(ke));if(!t.ok)throw new Error(`Не вдалося завантажити файл: ${t.status}`);const o=await t.text();D.innerHTML="";const i=et((M==null?void 0:M.id)??null);i&&D.appendChild(i);const e=document.createElement("template");e.innerHTML=o,D.appendChild(e.content),await tt(D)}catch(t){Z&&(Z.textContent="Сталася помилка під час завантаження матеріалу. Спробуйте пізніше або поверніться до каталогу."),console.error(t)}}}function Bt(t,o){if(!t)return;const i=Array.isArray(o)?o:[];if(!i.length)return;t.classList.add("communication__table");const e=document.createElement("table"),m=document.createElement("thead"),g=document.createElement("tr");["Слово","Переклад","Приклад"].forEach(v=>{const T=document.createElement("th");T.textContent=v,g.appendChild(T)}),m.appendChild(g);const x=document.createElement("tbody");i.forEach(v=>{if(!v)return;const T=document.createElement("tr"),$=document.createElement("td");$.textContent=v.word||v.term||"";const P=document.createElement("td");P.textContent=v.translation||v.meaning||"";const R=document.createElement("td");R.textContent=v.example||v.sentence||"",T.appendChild($),T.appendChild(P),T.appendChild(R),x.appendChild(T)}),e.appendChild(m),e.appendChild(x),t.innerHTML="",t.appendChild(e)}function Ht(t){var e;if(!t)return null;if(t.dataset.communicationTopic)return t.dataset.communicationTopic;if(t.dataset.topic)return t.dataset.topic;const o=t.closest("[data-communication-topic]");if(o!=null&&o.dataset.communicationTopic)return o.dataset.communicationTopic;const i=(e=window.lessonContext)==null?void 0:e.id;return i&&Ye[i]?i:null}async function tt(t){if(!t)return;const o=Array.from(t.querySelectorAll("[data-communication-words]"));o.length&&o.forEach(i=>{const e=Ht(i);if(!e)return;const m=Ye[e]||[];m.length&&Bt(i,m)})}function jt(){Ut(),Pt(),Rt()}jt();const Dt=async t=>{const i="https://vq1wtq2d2l.execute-api.us-east-2.amazonaws.com/dev"+"/openai";return await fetch(i,{method:"POST",body:JSON.stringify(t),headers:{"Content-Type":"application/json"}}).then(m=>m.json())},Wt=async(t,o,i={},e=[])=>{const m=zt(t,o,i,e),g=await Dt(m);try{return typeof g=="string"?JSON.parse(g):g}catch{const v=typeof g=="string"?g.match(/\{[\s\S]*\}$/):null;if(v)return JSON.parse(v[0]);throw new Error("Не вдалося розпарсити JSON відповіді моделі")}};function zt(t,o,i={},e=[]){const m=localStorage.getItem("gptToken");if(!m||(m==null?void 0:m.length)<10){console.warn("⚠️ gptToken відсутній у localStorage");const P=prompt("Enter Your GPT Token");localStorage.setItem("gptToken",P)}const g="gpt-4o-mini",x=String(o||"").trim().toLowerCase(),{system:v,user:T}=Ft(t,x,i),$=Kt(T,e);return{token:m,model:g,messages:[{role:"system",content:v},{role:"user",content:$}],temperature:.3,max_tokens:4e3}}function Ft(t,o,i){i.language;const e=Number.isInteger(i.items)?i.items:Gt[o]||10,m=i.seedId||Qt(t),g=`
YOU ARE an ESL task generator.
GOAL: create ONE task block of type "${o}" on the topic "${t}".
OUTPUT ONLY VALID JSON. Keep the language level around A1–A2.
All prompts, questions, answers, hints, and labels must be written in ENGLISH.
Encoding — UTF-8. No explanations, no prefixes, no code fences.
Ensure internal consistency so answers match the task logic.
`,x={mcq:{system:`
${g}
OUTPUT SCHEMA:
{
  "id": "mcq-${m}-1",
  "type": "mcq",
  "prompt": "Choose the correct option.",
  "items": [
    {
      "q": "<short question with one missing form>",
      "choices": ["<option0>", "<option1>", "<option2>"],
      "answer": ["<index_of_correct_choice_as_string>"]
    },
    ...
  ]
}

REQUIREMENTS:
- ${e} items.
- Follow the schema exactly.
- Provide exactly 3 answer choices per question with a single correct one.
- "answer" must be the index of the correct option as a string: "0" | "1" | "2".
- Keep questions natural, concise, and on the topic "${t}".
- Return JSON only, no additional commentary.

EXAMPLE (FORMAT ONLY; DO NOT COPY CONTENT):
{
  "id": "mcq-ps-1",
  "type": "mcq",
  "prompt": "Choose the correct Present Simple form.",
  "items": [
    { "q": "He usually ___ the bus to work.", "choices": ["take", "takes", "is taking"], "answer": ["1"] },
    { "q": "They ___ coffee in the morning.", "choices": ["have", "haves", "are having"], "answer": ["0"] }
  ]
}
      `.trim(),user:`
Topic: ${t}
Generate a task block of type "mcq" strictly following the OUTPUT SCHEMA.
Number of items: ${e}.
      `.trim()},gap:{system:`
${g}
OUTPUT SCHEMA:
{
  "id": "gap-${m}-1",
  "type": "gap",
  "prompt": "Fill the gaps with the correct word.",
  "items": [
    { "q": "They ___ (work) on Sundays.", "answer": ["correct_form", "alternative_if_any"] },
    ...
  ]
}
REQUIREMENTS:
- ${e} sentences.
- "q" must be a clean English sentence. Do NOT wrap it in angle brackets, quotes, or markdown — use only plain text with a single blank shown as ___ (three underscores).
- "answer" must be an array with at least one valid solution in lowercase (no angle brackets).
- Keep sentences short, level A1–A2, and connected to "${t}".
      `.trim(),user:q(t,"gap",e)},transform:{system:`
${g}
OUTPUT SCHEMA:
{
  "id": "transform-${m}-1",
  "type": "transform",
  "prompt": "Rewrite each sentence in the negative form (no final period).",
  "items": [
    {
      "q": "She likes coffee.",
      "hint": "use doesn't + base verb; no period",
      "answer": ["she doesn't like coffee", "she does not like coffee"]
    }
  ]
}
REQUIREMENTS:
- ${e} items.
- Answers must follow the prompt instructions (for example, omit the final period).
- Provide a helpful English hint for each item.
      `.trim(),user:q(t,"transform",e)},match:{system:`
${g}
OUTPUT SCHEMA:
{
  "id": "match-${m}-1",
  "type": "match",
  "prompt": "Match the base verb with the third person singular form (he/she/it).",
  "pairs": [
    { "left": "go", "right": "goes" },
    ...
  ]
}
REQUIREMENTS:
- ${Math.max(6,Math.min(12,e))} unique pairs.
- Provide one clear correct match for each pair without duplicates.
- Use vocabulary related to "${t}".
      `.trim(),user:q(t,"match",e)},error:{system:`
${g}
OUTPUT SCHEMA:
{
  "id": "error-${m}-1",
  "type": "error",
  "prompt": "Find and correct the mistake (Present Simple, no final period).",
  "items": [
    { "q": "She don't like tea.", "hint": "use doesn't + base verb", "answer": ["she doesn't like tea", "she does not like tea"] }
  ]
}
REQUIREMENTS:
- ${e} sentences containing a typical error connected to "${t}".
- Provide clear English hints.
- Match the formatting requested in the prompt (for example, omit the period).
      `.trim(),user:q(t,"error",e)},order:{system:`
${g}
OUTPUT SCHEMA:
{
  "id": "order-${m}-1",
  "type": "order",
  "prompt": "Put the words in the correct order.",
  "items": [
    { "q": "Arrange the sentence", "tokens": ["she", "often", "reads", "books"], "answer": "she often reads books" }
  ]
}
REQUIREMENTS:
- ${e} items.
- Provide tokens that form exactly the correct answer (lowercase, no period unless required by the topic).
- Use sentences relevant to "${t}".
      `.trim(),user:q(t,"order",e)},short:{system:`
${g}
OUTPUT SCHEMA:
{
  "id": "short-${m}-1",
  "type": "short",
  "prompt": "Write short answers about ${t}.",
  "items": [
    { "q": "Write 2–3 sentences about your daily routine.", "keywords": ["i", "usually", "every"] }
  ]
}
REQUIREMENTS:
- ${Math.min(6,Math.max(3,Math.floor(e/2)))} tasks that invite short written responses.
- "keywords" act as guidance, not strict scoring rubrics, and must be lowercase English words.
      `.trim(),user:q(t,"short",e)},open:{system:`
${g}
OUTPUT SCHEMA:
{
  "id": "open-${m}-1",
  "type": "open",
  "prompt": "<brief classroom instruction in English>",
  "items": [
    { "situation": "<open-ended question or scenario related to the topic>" }
  ],
  "scoring": {
    "criteria": [
      "<criterion 1>",
      "<criterion 2>",
      "<criterion 3>"
    ]
  }
}
REQUIREMENTS:
- ${Math.max(3,Math.min(10,e))} unique items that require free-form answers.
- Keep each "situation" within 8–14 words, focused on real-life communication linked to "${t}".
- Maintain an A1–A2 learner level and avoid simple yes/no prompts.
- Provide exactly 3 concise scoring criteria phrased for teachers (e.g., "Use two past time expressions").
- Optionally add "example_answers" arrays (1–3 short samples) to model good responses.
- Output JSON only with no surrounding commentary.
      `.trim(),user:q(t,"open",e)},writing:{system:`
${g}
OUTPUT SCHEMA:
{
  "id": "writing-${m}-1",
  "type": "writing",
  "prompt": "Short writing task about ${t}.",
  "description": "<1–2 sentences describing the assignment>",
  "checklist": [
    "<criterion 1>",
    "<criterion 2>",
    "<criterion 3>"
  ]
}
REQUIREMENTS:
- Provide a clear English description of the task.
- Include 4–6 checklist items with concrete evaluation criteria.
      `.trim(),user:q(t,"writing",e)},roleplay:{system:`
${g}
OUTPUT SCHEMA:
{
  "id": "roleplay-${m}-1",
  "type": "roleplay",
  "prompt": "<short instruction in English>",
  "scenario": {
    "setting": "<where the situation takes place>",
    "summary": "<1–2 sentences describing the task>",
    "roles": [
      {
        "name": "Student 1",
        "goal": "<goal to achieve>",
        "details": "<two facts or prompts>"
      },
      {
        "name": "Student 2",
        "goal": "<goal to achieve>",
        "details": "<two facts or prompts>"
      }
    ],
    "steps": [
      "<step 1>",
      "<step 2>",
      "<step 3>",
      "<step 4>"
    ]
  },
  "phrases": [
    { "phrase": "<useful English phrase>", "translation": "<short explanation or translation in English>" }
  ]
}
REQUIREMENTS:
- The situation must clearly connect to the topic "${t}".
- Exactly two roles: Student 1 and Student 2.
- Provide 3–5 steps describing how the dialogue should develop.
- Include ${Math.max(6,Math.min(10,e))} useful English phrases with brief English explanations or synonyms.
- Do not add bullet symbols inside the strings.
      `.trim(),user:q(t,"roleplay",e)},"dialogue-gap":{system:`
${g}
OUTPUT SCHEMA:
{
  "id": "dialogue-gap-${m}-1",
  "type": "dialogue-gap",
  "prompt": "Fill the blanks in the dialogue using the word bank.",
  "words": ["<word1>", "<word2>", "<word3>"],
  "dialogue": [
    { "speaker": "Student 1", "line": "<Line with one or two ___ blanks>" }
  ],
  "answers": ["<correct word 1>", "<correct word 2>"]
}
REQUIREMENTS:
- ${Math.max(4,Math.min(8,e))} turns in the dialogue.
- Use exactly ${Math.max(4,Math.min(8,e))} blanks "___" across the dialogue.
- "words" must list one entry per blank (repeat words when a blank uses the same word) and contain no unused distractors.
- "answers" must be the same length as "words", list the correct words in blank order, and use only lowercase English words present in "words".
- Keep each line short (maximum 12 words) and on the topic "${t}".
- Do not add extra fields beyond the schema.
      `.trim(),user:q(t,"dialogue-gap",e)},"dialogue-order":{system:`
${g}
OUTPUT SCHEMA:
{
  "id": "dialogue-order-${m}-1",
  "type": "dialogue-order",
  "prompt": "Arrange the dialogue lines in the correct order.",
  "lines": [
    { "speaker": "Student 1", "line": "<Line>" },
    { "speaker": "Student 2", "line": "<Line>" }
  ],
  "solution": [1, 0]
}
REQUIREMENTS:
- ${Math.max(4,Math.min(8,e))} total lines.
- Each line must contain 6–12 words, sound natural, and stay on the topic "${t}".
- "solution" is an array of zero-based indices describing the correct order of the lines.
- Do not add extra fields beyond the schema.
      `.trim(),user:q(t,"dialogue-order",e)},truefalse:{system:`
${g}
OUTPUT SCHEMA:
{
  "id": "truefalse-${m}-1",
  "type": "truefalse",
  "prompt": "Decide if each statement is true or false.",
  "items": [
    { "statement": "<short statement>", "answer": true }
  ]
}
REQUIREMENTS:
- ${Math.max(6,Math.min(12,e))} statements.
- "answer" must be strictly true or false.
- Use simple A1–A2 level sentences in English related to "${t}".
      `.trim(),user:q(t,"truefalse",e)},"definition-match":{system:`
${g}
OUTPUT SCHEMA:
{
  "id": "definition-match-${m}-1",
  "type": "definition-match",
  "prompt": "Match the word with its definition.",
  "pairs": [
    { "left": "<word>", "right": "<short definition>" }
  ]
}
REQUIREMENTS:
- ${Math.max(6,Math.min(10,e))} pairs.
- "left" must be a single lowercase word without articles.
- "right" must be one sentence of up to 14 words.
- Use vocabulary connected to the topic "${t}".
      `.trim(),user:q(t,"definition-match",e)},"synonym-clue":{system:`
${g}
OUTPUT SCHEMA:
{
  "id": "synonym-clue-${m}-1",
  "type": "synonym-clue",
  "prompt": "Choose the correct word based on the clue.",
  "wordBank": ["<word1>", "<word2>", "<word3>"],
  "items": [
    { "clue": "<clue>", "answers": ["<correct word>"] }
  ]
}
REQUIREMENTS:
- ${Math.max(6,Math.min(10,e))} items.
- Provide a word bank of 6–8 lowercase English words that includes all correct answers.
- "answers" may contain 1–2 acceptable synonyms, all in lowercase English.
- Write concise clues; omit the final period if the clue is a fragment.
      `.trim(),user:q(t,"synonym-clue",e)},scramble:{system:`
${g}
OUTPUT SCHEMA:
{
  "id": "scramble-${m}-1",
  "type": "scramble",
  "prompt": "Unscramble the word.",
  "items": [
    { "scrambled": "<jumbled letters>", "answers": ["<correct word>"] }
  ]
}
REQUIREMENTS:
- ${Math.max(6,Math.min(10,e))} items.
- "scrambled" must be a shuffled version of an English word from "${t}".
- "answers" may list 1–2 valid spellings in lowercase English.
      `.trim(),user:q(t,"scramble",e)},wordpairs:{system:`
${g}
OUTPUT SCHEMA:
{
  "id": "wordpairs-${m}-1",
  "type": "wordpairs",
  "prompt": "Match the singular form to the plural form.",
  "pairs": [
    { "left": "<singular>", "right": "<plural>" }
  ]
}
REQUIREMENTS:
- ${Math.max(6,Math.min(10,e))} pairs.
- Use accurate singular/plural pairs relevant to "${t}".
- Do not add extra keys beyond the schema.
      `.trim(),user:q(t,"wordpairs",e)},"odd-one-out":{system:`
${g}
OUTPUT SCHEMA:
{
  "id": "odd-one-out-${m}-1",
  "type": "odd-one-out",
  "prompt": "Find the odd one out.",
  "items": [
    { "options": ["<word1>", "<word2>", "<word3>", "<word4>"], "answer": "2", "explanation": "<reason>" }
  ]
}
REQUIREMENTS:
- ${Math.max(6,Math.min(10,e))} items.
- Provide exactly 4 options per item.
- "answer" must be the index of the odd item as a string ("0"–"3").
- Include a brief English explanation (up to 10 words) for why the option is odd.
- Only one option may be different; the rest must relate to "${t}".
      `.trim(),user:q(t,"odd-one-out",e)},context:{system:`
${g}
OUTPUT SCHEMA:
{
  "id": "context-${m}-1",
  "type": "context",
  "prompt": "<instruction in English>",
  "context": {
    "title": "<2–4 words>",
    "format": "dialog" | "narrative",
    "body": []
  },
  "questions": [
    {
      "q": "<question>",
      "choices": ["<option0>", "<option1>", "<option2>"],
      "answer": ["<index_of_correct_choice_as_string>"]
    },
    ...
  ]
}

REQUIREMENTS:
- Provide ${e} comprehension questions for the passage.
- Keep the text within 200 words using simple A1 English connected to "${t}".
- If "format" is "dialog", use objects {"speaker": "...", "line": "..."}.
- If "format" is "narrative", use an array of short paragraph strings.
- Each question must offer exactly 3 choices and a single correct answer.
- Return the index of the correct choice as a string ("0" | "1" | "2").
- Output only JSON, no extra commentary.

EXAMPLE (FORMAT ONLY; DO NOT COPY CONTENT):
{
  "id": "context-ps-1",
  "type": "context",
  "prompt": "Read the dialogue and choose the correct answer.",
  "context": {
    "title": "Morning Chat",
    "format": "dialog",
    "body": [
      { "speaker": "Emma", "line": "Hi, Leo! Are you ready for school?" },
      { "speaker": "Leo", "line": "Yes, but I can't find my maths book." },
      { "speaker": "Emma", "line": "Check your bag again." }
    ]
  },
  "questions": [
    {
      "q": "What did Leo lose?",
      "choices": ["Pencil case", "Math textbook", "English notebook"],
      "answer": ["1"]
    }
  ]
}`.trim(),user:q(t,"context",e)}},v=x[o]||x.mcq,T=(i.additionalInstructions||i.extraInstructions||"").trim();return T?{system:v.system,user:`${v.user}

Additional teacher instructions:
${T}`}:v}const Gt={mcq:10,gap:10,transform:10,match:8,error:10,order:10,short:3,open:4,writing:1,roleplay:8,"dialogue-gap":6,"dialogue-order":6,truefalse:8,"definition-match":8,"synonym-clue":8,scramble:8,wordpairs:8,"odd-one-out":8,context:4};function q(t,o,i){return`Topic: ${t}
Generate a task block of type "${o}" with ${i} items. Return JSON only that follows the described schema.`}function Qt(t){return String(t||"task").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,6)||"task"}function Kt(t,o){const i=String(t||"").trim(),e=Jt(o);return e?`${i||"Generate the task block."}

STRICT VOCABULARY REQUIREMENTS (communication lesson):
1. Treat the target expressions below as the ONLY lexical focus for the task. Every generated item and every correct answer must contain at least one of these expressions verbatim (you may adapt grammar but keep the core phrase).
2. Do not introduce alternative key phrases or synonyms outside this list; supporting words like articles or pronouns are fine, but the highlighted expression must come from the list.
3. When offering distractors or incorrect options, keep them realistic yet stay close to the topic; never invent brand-new key phrases outside the set.
4. The Ukrainian translations are reference only – the final task must remain fully in English.

Target vocabulary:
${e}`:i||t||""}function Jt(t){if(!Array.isArray(t)||!t.length)return"";const o=e=>{if(!e)return"";const m=e.indexOf(" — "),g=e.indexOf(" – "),x=e.indexOf(" - "),v=[m,g,x].filter(P=>P>=0),T=v.length?Math.min(...v):-1;return(T>=0?e.slice(0,T):e).trim()},i=t.map((e,m)=>{if(!e)return"";const g=e.word||e.term||e.phrase||e.text||`Item ${m+1}`,x=e.translation||e.meaning||e.ua||e.uk||"",v=e.example||e.sentence||e.usage||e.sample||"",T=o(v);let $=`${m+1}. ${g}`;return x&&($+=` — ${x}`),T&&($+=` (Example: ${T})`),$}).filter(Boolean);return i.length?i.join(`
`):""}const Ke=document.querySelector(".js-practice-section"),U=document.querySelector("[data-practice-generator]"),ve=U==null?void 0:U.querySelector("[data-practice-status]"),ge=document.querySelector("[data-generator-output]"),me=document.querySelector("[data-generator-json]"),oe=document.querySelector("[data-generator-copy]"),ae=document.querySelector("[data-generator-download]"),fe=U==null?void 0:U.querySelector("[data-types]"),G=U==null?void 0:U.querySelector("[data-types-trigger]"),X=U==null?void 0:U.querySelector("[data-types-panel]"),Je=document.querySelector("[data-practice-placeholder]"),W=window.lessonContext||{};let Y=W.title||"Generated Practice",V=W.level||"custom";const de=[],xe=[];function ce(t){t&&t.classList.add("hidden")}function Ue(t){t&&t.classList.remove("hidden")}function nt(t){return!t||t.classList.contains("hidden")}function Pe(){return localStorage.getItem("hideGenerateSection")==="true"}function Te(){Pe()?(ce(Ke),ce(X),ce(ge),ee()):(Ue(Ke),Le(),pe())}function Ae(t){return`${t&&typeof t=="object"&&t.id?String(t.id):String((t==null?void 0:t.type)||"task")}-${Date.now()}-${Math.random().toString(16).slice(2,8)}`}function rt(){return{title:Y||W.title||"Generated Practice",level:V||W.level||"custom",tasks:[...de,...xe].map(t=>t.data)}}function pe(){if(me){if(Pe()){ce(ge);return}if(!de.length&&!xe.length){me.textContent="",ce(ge),oe&&(oe.disabled=!0),ae&&(ae.disabled=!0);return}me.textContent=JSON.stringify(rt(),null,2),Ue(ge),oe&&(oe.disabled=!1),ae&&(ae.disabled=!1)}}function Yt(t){const o=Ae(t);return xe.push({key:o,data:t}),pe(),o}function Vt(t,o){const i=m=>{const g=m.findIndex(x=>t&&x.key===t||x.data===o);return g!==-1?(m.splice(g,1),!0):!1};(i(xe)||i(de))&&pe()}function Xt(){if(!U)return;const t=U.querySelector('[name="topic"]');if(t&&!t.value){const o=W.title||"Lesson topic";t.value=o}}function F(t,o="idle"){ve&&(ve.textContent=t,ve.dataset.state=o)}function Zt(t){return String(t||"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,8)}function Ee(t){return String(t||"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")}function qe(){return Array.from(U.querySelectorAll('input[name="types"]'))}function en(t){const o=t.filter(i=>i.checked).map(i=>{var e,m;return(m=(e=i.nextElementSibling)==null?void 0:e.textContent)==null?void 0:m.trim()}).filter(Boolean);return o.length?o.length<=2?o.join(", "):`${o.slice(0,2).join(", ")} +${o.length-2}`:"Оберіть типи"}function Le(){if(!G)return;const t=qe();G.textContent=en(t)}function ee(){!X||!G||nt(X)||(ce(X),G.setAttribute("aria-expanded","false"))}function tn(){if(!X||!G)return;if(nt(X)){Ue(X),G.setAttribute("aria-expanded","true");const o=X.querySelector('input[name="types"]');o==null||o.focus({preventScroll:!0})}else ee()}function nn(){const t=!Pe();localStorage.setItem("hideGenerateSection",String(t)),Te(),pe()}function rn(){const t=document.getElementById("practice"),o=t==null?void 0:t.querySelector("#practice-body");if(Je&&Je.remove(),o&&o.children.length===1){const i=o.firstElementChild;i&&/практика поки відсутня/i.test(i.textContent||"")&&i.remove()}}function on(){const t=document.getElementById("practice");if(!t)return;const o=t.querySelector("#practice-body");if(o&&!o.querySelector(".practice-dynamic-title")){const i=document.createElement("div");i.className="practice-dynamic-title",i.innerHTML=`
      <h2>Згенеровані завдання</h2>
      ${W.level?`<p class="muted">Рівень: ${W.level}</p>`:""}
    `,o.prepend(i)}}async function an(t){var J,z;if(t.preventDefault(),!U)return;const o=U.querySelector('button[type="submit"]'),i=U.querySelector('[name="topic"]'),e=U.querySelector('[name="count"]'),m=U.querySelector('[name="instructions"]'),g=qe(),x=(J=i==null?void 0:i.value)==null?void 0:J.trim(),v=Number.parseInt((e==null?void 0:e.value)||"10",10)||10,T=((z=m==null?void 0:m.value)==null?void 0:z.trim())||"",$=g.filter(I=>I.checked).map(I=>I.value);if(!x){F("Укажіть тему для генерації завдання.","error"),i==null||i.focus();return}if(!$.length&&typeof ee=="function"){F("Оберіть принаймні один тип завдання.","error");return}const P=Zt(x)||"task";F(`Генеруємо ${$.length} тип(и) завдань…`,"loading"),o&&(o.disabled=!0,o.dataset.originalText=o.dataset.originalText||o.textContent,o.textContent="Генерація…"),String(W.category||"").toLowerCase();const R=void 0;try{const I=$.map(N=>Wt(x,N,{items:v,language:"en",seedId:`${P}-${N}`,...T?{additionalInstructions:T}:{}},R).then(H=>({type:N,task:H}))),_=await Promise.allSettled(I),B=_.map((N,H)=>N.status==="fulfilled"?{type:$[H],task:N.value.task}:null).filter(Boolean),ie=_.map((N,H)=>N.status==="rejected"?$[H]:null).filter(Boolean);if(!B.length)throw new Error("Не вдалося згенерувати жодного типу завдань");const se=[];B.forEach(({type:N,task:H})=>{const te={...H};te.id||(te.id=`${N}-${P}-${Date.now().toString(36)}${Math.random().toString(36).slice(2,6)}`);const be=Yt(te);se.push({task:te,key:be})}),rn(),window.practice&&typeof window.practice.appendTask=="function"&&(on(),se.forEach(({task:N,key:H})=>{window.practice.appendTask(N,{key:H})})),ee();const le=B.map(({type:N})=>N).join(", ");ie.length?F(`Згенеровано: ${le}. Помилки: ${ie.join(", ")}`,"success"):F(`Готово! Додано ${B.length} блок(и): ${le}.`,"success")}catch(I){console.error(I);const _=I instanceof Error&&I.message?`Помилка: ${I.message}`:"Не вдалося згенерувати завдання. Перевірте токен або спробуйте ще раз.";F(_,"error")}finally{if(o){const I=o.dataset.originalText||"Згенерувати завдання";o.disabled=!1,o.textContent=I}}}async function sn(){if(!me)return;const t=me.textContent;if(t)try{await navigator.clipboard.writeText(t),F("JSON скопійовано у буфер.","success")}catch(o){console.error(o),F("Не вдалося скопіювати JSON. Спробуйте вручну.","error")}}function ln(t){return`${Ee(W.id)||Ee(t.title)||Ee(W.title)||"practice"||"practice"}.json`}async function dn(){const t=rt(),o=JSON.stringify(t,null,2);if(!o||o==="{}"||o==="[]"){F("Немає даних для завантаження.","error");return}try{const i=new Blob([o],{type:"application/json"}),e=URL.createObjectURL(i),m=document.createElement("a");m.href=e,m.download=ln(t),document.body.appendChild(m),m.click(),document.body.removeChild(m),URL.revokeObjectURL(e),F("Файл завантажено.","success")}catch(i){console.error(i),F("Не вдалося завантажити файл.","error")}}function cn(){if(U){if(Xt(),U.addEventListener("submit",an),oe&&(oe.addEventListener("click",sn),oe.disabled=!0),ae&&(ae.addEventListener("click",dn),ae.disabled=!0),G&&X&&fe){G.setAttribute("aria-haspopup","true"),G.setAttribute("aria-expanded","false"),G.addEventListener("click",()=>{tn()});const t=i=>{fe.contains(i.target)||ee()};document.addEventListener("pointerdown",t);const o=i=>{const e=i.relatedTarget;(!e||!fe.contains(e))&&ee()};fe.addEventListener("focusout",o),document.addEventListener("keydown",i=>{i.key==="Escape"&&(ee(),G.focus())}),qe().forEach(i=>{i.addEventListener("change",()=>{Le()})}),Le(),U.addEventListener("submit",()=>{ee()})}document.addEventListener("practice:taskRemoved",t=>{const o=t.detail||{};Vt(o.key,o.task)}),document.addEventListener("practice:dataLoaded",t=>{const o=t.detail;de.length=0,o&&Array.isArray(o.entries)?(Y=o.title??Y,V=o.level??V,o.entries.forEach(({task:i,key:e})=>{const m=e||Ae(i);de.push({key:m,data:i})})):o&&Array.isArray(o.tasks)?(Y=o.title??Y,V=o.level??V,o.tasks.forEach(i=>{const e=i&&i.id?String(i.id):Ae(i);de.push({key:e,data:i})})):o?(Y=o.title??Y,V=o.level??V):(Y=W.title||Y,V=W.level||V),pe(),Te()}),Te(),pe(),document.addEventListener("keydown",t=>{t.code&&t.code==="KeyH"&&t.ctrlKey&&t.shiftKey&&(t.preventDefault(),nn())})}}cn();
//# sourceMappingURL=lesson.js.map
