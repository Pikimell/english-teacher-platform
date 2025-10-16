import"./assets/main-CaafORs5.js";import{a as kt}from"./assets/homework-Pg0SBuxt.js";import{i as Tt,a as De,c as We}from"./assets/custom-lesson-presets-B4NuEc3i.js";import{l as _e,a as At,b as Ue}from"./assets/custom-lessons-store-BKMVZjuV.js";import"./assets/vendor-CWxt7QI6.js";const Lt=async(n=1,o=1e3)=>(await Tt.get("/user")).data,It={BASE_URL:"/",DEV:!1,MODE:"production",PROD:!0,SSR:!1};(function(){const n=typeof import.meta<"u"&&It&&"/"||"/";function o(r){const t=n.endsWith("/")?n:`${n}/`,s=String(r||"");return/^[a-z]+:/i.test(s)||s.startsWith(t)?s:`${t}${s.replace(/^\/+/,"")}`}function i(){try{const t=new URL(window.location.href).pathname.split("/");let s=t.pop();(!s||!/\.html?$/i.test(s))&&(s="index.html");const h=s.replace(/\.html?$/i,".json");return t.push("practice",h),t.join("/")}catch{return null}}function e(r,t={},...s){const h=document.createElement(r);for(const[p,l]of Object.entries(t||{}))p==="class"?h.className=l:p==="html"?h.innerHTML=l:p.startsWith("on")&&typeof l=="function"?h.addEventListener(p.slice(2),l):h.setAttribute(p,l);for(const p of s)p!=null&&h.appendChild(typeof p=="string"?document.createTextNode(p):p);return h}function m(r){const t=r.slice();for(let s=t.length-1;s>0;s--){const h=Math.floor(Math.random()*(s+1));[t[s],t[h]]=[t[h],t[s]]}return t}function g(r){return String(r||"").trim().toLowerCase().replace(/\s+/g," ")}const x={users:null,request:null,active:null};function E(){return x.users?Promise.resolve(x.users):(x.request||(x.request=Lt().then(r=>{const t=Array.isArray(r==null?void 0:r.items)?r.items:[];return x.users=t,t}).catch(r=>{throw console.error("Не вдалося завантажити список студентів",r),r}).finally(()=>{x.request=null})),x.request)}function T(r){if(!r||typeof r!="object")return"Невідомий студент";const t=r.firstName||r.firstname||r.nameFirst||"",s=r.lastName||r.lastname||r.nameLast||"";return[t,s].map(l=>String(l||"").trim()).filter(Boolean).join(" ")||r.displayName||r.fullName||r.username||r.email||(r.id?`ID ${r.id}`:"")||"Без імені"}function $(){if(!x.active)return;const{panel:r,button:t}=x.active;r.style.display="none",r.dataset.open="false",t.setAttribute("aria-expanded","false"),x.active=null}const P=new Set;let N=!1;function Q(r){const{button:t,panel:s}=r;if(!(!t||!s)){if(!t.isConnected&&!s.isConnected){P.delete(r);return}if(N){t.hidden=!1;return}t.hidden=!0,s.style.display="none",s.dataset.open="false"}}function W(r,t){const s={button:r,panel:t};return P.add(s),Q(s),()=>{P.delete(s)}}function I(r){const t=!!r;N!==t&&(N=t,N||$(),P.forEach(s=>Q(s)))}De.subscribe(({user:r})=>{I(De.isAdmin(r))});function _(r){if(!x.active)return;const{panel:t,button:s}=x.active,h=r.target;t.contains(h)||s.contains(h)||$()}function z(r){r.key==="Escape"&&$()}function ae(r,t,s){if(r.innerHTML="",!t.length){r.appendChild(e("div",{class:"muted",style:"font-size:13px;text-align:center;padding:12px 8px;"},"Список студентів порожній"));return}const h=e("ul",{style:"list-style:none;margin:0;padding:0;max-height:220px;overflow:auto;"});t.forEach(p=>{const l=e("button",{type:"button",style:"width:100%;background:transparent;border:none;text-align:left;padding:8px 10px;border-radius:8px;cursor:pointer;display:flex;flex-direction:column;gap:2px;",onmouseenter:()=>{l.style.backgroundColor="#f1f5f9"},onmouseleave:()=>{l.style.backgroundColor="transparent"},onclick:()=>{const d=window.location.search.slice(8),y=document.querySelector("h1").textContent;console.log(d);const c={lessonId:d,userEmail:p.email,lessonName:y,homeworkType:"task",homeworkData:JSON.stringify(s)};kt(c),$()}},e("span",{style:"font-size:14px;font-weight:600;color:#0f172a;"},T(p)),p.email?e("span",{class:"muted",style:"font-size:12px;color:#475569;"},p.email):null),a=e("li",{style:"margin:0;padding:0;"},l);h.appendChild(a)}),r.appendChild(h)}function ie(){return e("div",{class:"practice-share-panel",role:"dialog","aria-label":"Надсилання завдання студенту",style:"position:absolute;top:38px;right:0;min-width:240px;max-width:280px;border:1px solid #e2e8f0;border-radius:12px;background:#fff;box-shadow:0 18px 40px rgba(15,23,42,0.18);padding:8px;z-index:30;display:none;","data-open":"false"})}function me(r,t,s){if(t.dataset.open==="true"){$();return}x.active&&x.active.panel!==t&&$(),t.dataset.open="true",t.style.display="block",r.setAttribute("aria-expanded","true"),t.innerHTML="",t.appendChild(e("div",{class:"muted",style:"font-size:13px;padding:12px 8px;text-align:center;"},"Завантаження…")),x.active={panel:t,button:r},E().then(p=>{ae(t,p,s)}).catch(()=>{t.innerHTML="",t.appendChild(e("div",{style:"color:#ef4444;font-size:13px;text-align:center;padding:12px 8px;"},"Не вдалося завантажити студентів. Спробуйте ще раз."))})}function R(r){const t=ie(),s=e("button",{type:"button",class:"practice-share-trigger for-admin js-share-homework-btn",title:"Надіслати студенту","aria-haspopup":"dialog","aria-expanded":"false",style:"border:none;background:#2563eb;color:#fff;padding:4px 10px;border-radius:999px;font-size:12px;line-height:1;cursor:pointer;box-shadow:0 4px 12px rgba(37,99,235,0.24);",onclick:h=>{h.preventDefault(),me(s,t,r)}},"Надіслати");return{button:s,panel:t}}document.addEventListener("click",_),document.addEventListener("keydown",z);function B(r){const t=e("div",{class:"hint-wrap",style:"margin-top:6px;"}),s=e("button",{type:"button",class:"hint-toggle","aria-label":"Показати підказку",title:"Підказка",style:"border:none;background:transparent;color:#94a3b8;cursor:pointer;padding:0;font-size:14px;line-height:1;"},"?"),h=e("div",{class:"hint-box muted",style:"display:none;margin-top:6px;color:#475569;"},`Підказка: ${r}`);return s.addEventListener("click",()=>{const p=h.style.display==="none";h.style.display=p?"block":"none",s.setAttribute("aria-expanded",p?"true":"false")}),t.appendChild(s),t.appendChild(h),t}function se(r,t){r.appendChild(e("h3",{},t.prompt||"Choose the correct option"));const s=[];(t.items||[]).forEach((l,a)=>{const d=`${t.id||"mcq"}-${a}`,y=Array.isArray(l.answer)&&l.answer.length>1,c=e("div",{class:"mcq-item",style:"margin-bottom:10px;padding:10px;border:1px solid #e5e7eb;border-radius:10px;background:#fff;"},e("div",{class:"q",style:"margin-bottom:8px;font-weight:600;"},l.q));(l.choices||[]).forEach((u,f)=>{const w=`${d}-${f}`,v=e("label",{for:w,style:"display:flex;align-items:center;gap:8px;margin:4px 0;"},e("input",{type:y?"checkbox":"radio",name:d,id:w,value:String(f)}),e("span",{},u));c.appendChild(v)}),l.explanation&&c.appendChild(e("div",{class:"exp muted",style:"display:none;margin-top:6px;color:#475569;"},l.explanation)),s.push({block:c,item:l,name:d}),r.appendChild(c)});const h=e("div",{class:"result",style:"margin-top:8px;font-weight:600;"}),p=e("button",{type:"button",class:"btn primary",style:"margin-top:8px;"},"Перевірити");p.addEventListener("click",()=>{let l=0;s.forEach(({block:a,item:d,name:y})=>{const c=Array.isArray(d.answer)?d.answer.map(String):[String(d.answer)],f=Array.from(a.querySelectorAll(`input[name='${y}']`)).filter(b=>b.checked).map(b=>b.value).sort(),w=c.slice().sort(),v=f.length===w.length&&f.every((b,S)=>b===w[S]);a.style.borderColor=v?"#10b981":"#ef4444";const k=a.querySelector(".exp");k&&(k.style.display=v?"none":"block"),v&&l++}),h.textContent=`Результат: ${l}/${s.length}`}),r.appendChild(p),r.appendChild(h)}function be(r,t){r.appendChild(e("h3",{},t.prompt||"Fill the gaps"));const s=[];(t.items||[]).forEach((l,a)=>{const d=e("div",{style:"margin-bottom:10px;padding:10px;border:1px solid #e5e7eb;border-radius:10px;background:#fff;"}),y=String(l.q||"").split(/___/),c=e("input",{type:"text",style:"padding:6px 8px;border:1px solid #cbd5e1;border-radius:6px;"});y.length>1?(d.appendChild(e("span",{},y[0])),d.appendChild(c),d.appendChild(e("span",{},y.slice(1).join("___")))):(d.appendChild(e("div",{style:"margin-bottom:6px;font-weight:600;"},l.q)),d.appendChild(c)),l.hint&&d.appendChild(B(l.hint)),s.push({row:d,input:c,answers:(l.answer||[]).map(u=>g(u))}),r.appendChild(d)});const h=e("div",{style:"margin-top:8px;font-weight:600;"}),p=e("button",{type:"button",class:"btn primary",style:"margin-top:8px;"},"Перевірити");p.addEventListener("click",()=>{let l=0;s.forEach(({row:a,input:d,answers:y})=>{const c=g(d.value),u=y.includes(c);a.style.borderColor=u?"#10b981":"#ef4444",u&&l++}),h.textContent=`Результат: ${l}/${s.length}`}),r.appendChild(p),r.appendChild(h)}function we(r,t){r.appendChild(e("h3",{},t.prompt||"Match pairs"));const s=t.pairs||[],h=m(s.map(d=>d.right)),p=[];s.forEach(d=>{const y=e("select",{style:"padding:6px 8px;border:1px solid #cbd5e1;border-radius:6px;"},e("option",{value:""},"— обери —"),...h.map(u=>e("option",{value:u},u))),c=e("div",{style:"display:flex;align-items:center;gap:10px;margin:8px 0;padding:10px;border:1px solid #e5e7eb;border-radius:10px;background:#fff;"},e("div",{style:"min-width:160px;font-weight:600;"},d.left),y);p.push({row:c,select:y,right:d.right}),r.appendChild(c)});const l=e("div",{style:"margin-top:8px;font-weight:600;"}),a=e("button",{type:"button",class:"btn primary",style:"margin-top:8px;"},"Перевірити");a.addEventListener("click",()=>{let d=0;p.forEach(({row:y,select:c,right:u})=>{const f=c.value===u;y.style.borderColor=f?"#10b981":"#ef4444",f&&d++}),l.textContent=`Результат: ${d}/${p.length}`}),r.appendChild(a),r.appendChild(l)}function lt(r,t){r.appendChild(e("h3",{},t.prompt||"Прочитайте текст та дайте відповіді"));const s=t.context||{},h=String(s.format||"narrative").toLowerCase(),p=Array.isArray(s.body)?s.body:[],l=e("div",{style:"margin:12px 0;padding:14px;border:1px solid #cbd5e1;border-radius:10px;background:#f8fafc;"});s.title&&l.appendChild(e("h4",{style:"margin:0 0 8px;font-size:18px;"},s.title)),h==="dialog"?p.forEach(u=>{if(!u)return;const f=typeof u=="object"&&u.speaker?`${u.speaker}:`:"",w=typeof u=="object"&&"line"in u?u.line:typeof u=="string"?u:"";l.appendChild(e("p",{style:"margin:4px 0;display:flex;gap:6px;align-items:flex-start;line-height:1.5;"},f?e("strong",{},f):null,e("span",{},w)))}):p.forEach((u,f)=>{const w=typeof u=="string"?u:u&&u.text?u.text:"";w&&l.appendChild(e("p",{style:f?"margin:8px 0 0;":"margin:0;"},w))}),r.appendChild(l);const a=Array.isArray(t.questions)?t.questions:[];if(!a.length)return;const d=[];a.forEach((u,f)=>{const w=e("div",{style:"margin-bottom:12px;padding:12px;border:1px solid #e5e7eb;border-radius:10px;background:#fff;"},e("div",{style:"margin-bottom:8px;font-weight:600;"},u.q||`Питання ${f+1}`)),v=Array.isArray(u.answer)?u.answer.map(String):u.answer!=null?[String(u.answer)]:[];if(Array.isArray(u.choices)&&u.choices.length){const k=`${t.id||"context"}-${f}`,b=v.length>1,S=v.every(L=>/^\d+$/.test(L));u.choices.forEach((L,C)=>{const A=`${k}-${C}`;w.appendChild(e("label",{for:A,style:"display:flex;align-items:center;gap:8px;margin:4px 0;"},e("input",{type:b?"checkbox":"radio",name:k,id:A,value:String(C)}),e("span",{},L)))}),d.push({block:w,type:"choices",allowMulti:b,getPicked:()=>{const C=Array.from(w.querySelectorAll(`input[name='${k}']`)).filter(A=>A.checked).map(A=>A.value);return S?C:C.map(A=>g(u.choices[Number(A)]||""))},expected:S?v:v.map(L=>g(L))})}else{const k=e("textarea",{rows:2,style:"width:100%;max-width:640px;padding:6px 8px;border:1px solid #cbd5e1;border-radius:6px;"});w.appendChild(k),d.push({block:w,type:"text",input:k,expected:v.map(b=>g(b))})}u.explanation&&w.appendChild(e("div",{class:"muted",style:"display:none;margin-top:6px;color:#475569;"},u.explanation)),r.appendChild(w)});const y=e("div",{style:"margin-top:8px;font-weight:600;"}),c=e("button",{type:"button",class:"btn primary",style:"margin-top:8px;"},"Перевірити");c.addEventListener("click",()=>{let u=0;d.forEach(f=>{let w=!1;if(f.type==="choices"){const k=f.getPicked().sort(),b=f.expected.slice().sort();w=k.length===b.length&&k.every((S,L)=>S===b[L])}else{const k=g(f.input.value);w=f.expected.length?f.expected.includes(k):!!k}f.block.style.borderColor=w?"#10b981":"#ef4444";const v=f.block.querySelector(".muted");v&&(v.style.display=w?"none":"block"),w&&u++}),y.textContent=`Результат: ${u}/${d.length}`}),r.appendChild(c),r.appendChild(y)}function Ce(r,t,s,h={}){const{showRemove:p=!0}=h,l=s||(t&&t.id?String(t.id):`task-${Math.random().toString(16).slice(2,8)}`),a=e("section",{style:"position:relative;margin:18px 0 26px;","data-task-id":t&&t.id?String(t.id):"","data-task-key":l}),d=e("div",{style:"position:absolute;top:6px;right:6px;display:flex;gap:6px;align-items:center;z-index:5;"}),{button:y,panel:c}=R(t),u=W(y,c);if(d.appendChild(y),p){const v=e("button",{type:"button",title:"Видалити завдання","aria-label":"Видалити завдання",style:"border:none;background:transparent;color:#94a3b8;cursor:pointer;padding:2px;line-height:1;font-size:14px;opacity:0.6;",onmouseenter:()=>v.style.opacity="1",onmouseleave:()=>v.style.opacity="0.6",onclick:()=>{x.active&&x.active.panel===c&&$(),document.dispatchEvent(new CustomEvent("practice:taskRemoved",{detail:{key:l,task:t}})),u(),a.remove()}},"✕");d.appendChild(v)}a.appendChild(d),a.appendChild(c),t.title&&a.appendChild(e("h3",{},t.title));const f=t&&t.type;switch(String(f||"").trim().toLowerCase()){case"mcq":se(a,t);break;case"gap":be(a,t);break;case"match":we(a,t);break;case"context":lt(a,t);break;case"transform":ct(a,t);break;case"error":pt(a,t);break;case"order":ut(a,t);break;case"short":ht(a,t);break;case"roleplay":ft(a,t);break;case"dialogue-gap":yt(a,t);break;case"dialogue-order":gt(a,t);break;case"truefalse":xt(a,t);break;case"definition-match":{const v={...t,prompt:t.prompt||"Поєднай слово з визначенням"};we(a,v);break}case"synonym-clue":bt(a,t);break;case"scramble":wt(a,t);break;case"wordpairs":{const v={...t,prompt:t.prompt||"Поєднай форму в однині та множині"};we(a,v);break}case"odd-one-out":Ct(a,t);break;case"open":mt(a,t);break;case"writing":vt(a,t);break;default:a.appendChild(e("div",{class:"muted"},`Невідомий тип завдання: ${f}`))}r.appendChild(a)}window.practice=window.practice||{},window.practice.appendTask=function(r,t={}){const s=Be();if(!s||!r)return;const h=s.querySelector("#practice-body")||s,p=t.showRemove!==!1;Ce(h,r,t.key,{showRemove:p})},window.practice.renderTaskList=function(r,t,s={}){if(!r)return null;const h=Array.isArray(t)?t.filter(Boolean):[],{title:p,level:l,description:a,keyPrefix:d="inline",showEmptyNote:y=!1,showRemove:c=!1}=s;if(!h.length){if(y){const f=e("p",{class:"muted practice-inline__empty"},"Практика для цієї теми поки відсутня.");r.appendChild(f)}return null}const u=e("section",{class:"practice-inline"});if(p||l||a){const f=e("header",{class:"practice-inline__header"});p&&f.appendChild(e("h3",{class:"practice-inline__title"},p)),l&&f.appendChild(e("span",{class:"practice-inline__badge"},l)),a&&f.appendChild(e("p",{class:"practice-inline__description muted"},a)),u.appendChild(f)}return h.forEach((f,w)=>{const v=`${d}-${w}`;Ce(u,f,v,{showRemove:c})}),r.appendChild(u),document.dispatchEvent(new CustomEvent("practice:inlineRendered",{detail:{tasks:h,container:r,options:s}})),u};async function Re(r){if(!r)return null;const t=o(r);try{const s=await fetch(t,{cache:"no-store"});return s.ok?await s.json():null}catch{return null}}async function dt(){const r=document.getElementById("practice-data");if(r)try{return JSON.parse(r.textContent)}catch{return null}const t=window.lessonContext||{},s=new Set;if(t.id&&s.add(`data/practice/${t.id}.json`),t.htmlPath){const p=String(t.htmlPath).replace(/^\.\/?/,"").replace(/\.html?$/i,"");if(p){s.add(`data/practice/${p}.json`);const l=p.split("/"),a=l[l.length-1];a&&s.add(`data/practice/${a}.json`)}}for(const p of s){const l=await Re(p);if(l)return l}const h=i();return h?await Re(h):null}function ct(r,t){r.appendChild(e("h3",{},t.prompt||"Transform the sentence"));const s=[];(t.items||[]).forEach(l=>{const a=e("div",{style:"margin-bottom:10px;padding:10px;border:1px solid #e5e7eb;border-radius:10px;background:#fff;"});a.appendChild(e("div",{style:"margin-bottom:6px;font-weight:600;"},l.q));const d=e("input",{type:"text",style:"width:100%;max-width:640px;padding:6px 8px;border:1px solid #cbd5e1;border-radius:6px;"});a.appendChild(d),l.hint&&a.appendChild(B(l.hint)),s.push({row:a,input:d,answers:(l.answer||[]).map(y=>g(y))}),r.appendChild(a)});const h=e("div",{style:"margin-top:8px;font-weight:600;"}),p=e("button",{type:"button",class:"btn primary",style:"margin-top:8px;"},"Перевірити");p.addEventListener("click",()=>{let l=0;s.forEach(({row:a,input:d,answers:y})=>{const c=y.includes(g(d.value));a.style.borderColor=c?"#10b981":"#ef4444",c&&l++}),h.textContent=`Результат: ${l}/${s.length}`}),r.appendChild(p),r.appendChild(h)}function pt(r,t){r.appendChild(e("h3",{},t.prompt||"Find and correct the error"));const s=[];(t.items||[]).forEach(l=>{const a=e("div",{style:"margin-bottom:10px;padding:10px;border:1px solid #e5e7eb;border-radius:10px;background:#fff;"});a.appendChild(e("div",{style:"margin-bottom:6px;font-weight:600;"},l.q));const d=e("input",{type:"text",style:"width:100%;max-width:640px;padding:6px 8px;border:1px solid #cbd5e1;border-radius:6px;"});a.appendChild(d),l.hint&&a.appendChild(B(l.hint)),s.push({row:a,input:d,answers:(l.answer||[]).map(y=>g(y))}),r.appendChild(a)});const h=e("div",{style:"margin-top:8px;font-weight:600;"}),p=e("button",{type:"button",class:"btn primary",style:"margin-top:8px;"},"Перевірити");p.addEventListener("click",()=>{let l=0;s.forEach(({row:a,input:d,answers:y})=>{const c=y.includes(g(d.value));a.style.borderColor=c?"#10b981":"#ef4444",c&&l++}),h.textContent=`Результат: ${l}/${s.length}`}),r.appendChild(p),r.appendChild(h)}function ut(r,t){r.appendChild(e("h3",{},t.prompt||"Put the words in order"));const s=[];(t.items||[]).forEach((l,a)=>{const d=g(Array.isArray(l.answer)?l.answer.join(" "):l.answer),y=m((l.tokens||[]).slice()),c=e("div",{style:"margin:10px 0;padding:10px;border:1px solid #e5e7eb;border-radius:10px;background:#fff;"}),u=e("div",{style:"display:flex;flex-wrap:wrap;gap:6px;margin-bottom:6px;"}),f=e("div",{style:"display:flex;flex-wrap:wrap;gap:6px;min-height:36px;padding:6px;border:1px dashed #cbd5e1;border-radius:8px;background:#f8fafc;"}),w=new Set;function v(S,L){const C=e("button",{type:"button",style:"padding:4px 8px;border:1px solid #cbd5e1;border-radius:6px;background:#fff;cursor:pointer;"},S);return C.addEventListener("click",()=>{w.has(L)||(w.add(L),C.style.opacity=.5,f.appendChild(e("span",{class:"chip",style:"padding:4px 8px;border:1px solid #cbd5e1;border-radius:6px;background:#fff;"},S)))}),C}y.forEach((S,L)=>u.appendChild(v(S,`${a}-${L}`)));const k=e("div",{style:"margin-top:6px;display:flex;gap:8px;"}),b=e("button",{type:"button",class:"btn"},"Скинути");b.addEventListener("click",()=>{w.clear(),f.innerHTML="",Array.from(u.children).forEach(S=>S.style.opacity=1),c.style.borderColor="#e5e7eb"}),k.appendChild(b),c.appendChild(e("div",{style:"margin-bottom:6px;font-weight:600;"},l.q||"")),c.appendChild(u),c.appendChild(f),c.appendChild(k),s.push({row:c,outWrap:f,correctStr:d}),r.appendChild(c)});const h=e("div",{style:"margin-top:8px;font-weight:600;"}),p=e("button",{type:"button",class:"btn primary",style:"margin-top:8px;"},"Перевірити");p.addEventListener("click",()=>{let l=0;s.forEach(({row:a,outWrap:d,correctStr:y})=>{const u=g(Array.from(d.querySelectorAll(".chip")).map(f=>f.textContent).join(" "))===y;a.style.borderColor=u?"#10b981":"#ef4444",u&&l++}),h.textContent=`Результат: ${l}/${s.length}`}),r.appendChild(p),r.appendChild(h)}function ht(r,t){r.appendChild(e("h3",{},t.prompt||"Short answer"));const s=[];(t.items||[]).forEach(l=>{const a=e("div",{style:"margin-bottom:10px;padding:10px;border:1px solid #e5e7eb;border-radius:10px;background:#fff;"});a.appendChild(e("div",{style:"margin-bottom:6px;font-weight:600;"},l.q));const d=e("textarea",{rows:3,style:"width:100%;max-width:720px;padding:6px 8px;border:1px solid #cbd5e1;border-radius:6px;"});a.appendChild(d),s.push({row:a,input:d,keywords:(l.keywords||[]).map(y=>g(y))}),r.appendChild(a)});const h=e("div",{style:"margin-top:8px;font-weight:600;"}),p=e("button",{type:"button",class:"btn primary",style:"margin-top:8px;"},"Перевірити");p.addEventListener("click",()=>{let l=0,a=0;s.forEach(({row:d,input:y,keywords:c})=>{const u=g(y.value),f=c.filter(v=>u.includes(v)).length;l+=f,a+=c.length,d.style.borderColor=f===c.length?"#10b981":f>0?"#f59e0b":"#ef4444";const w=d.querySelector(".short-info")||e("div",{class:"short-info",style:"margin-top:6px;color:#475569;"});w.textContent=`Збіги ключових слів: ${f}/${c.length}`,d.contains(w)||d.appendChild(w)}),h.textContent=`Загальний збіг ключових слів: ${l}/${a}`}),r.appendChild(p),r.appendChild(h)}function mt(r,t){r.appendChild(e("h3",{},t.prompt||"Відповіді у вільній формі"));const s=Array.isArray(t&&t.items)?t.items.filter(Boolean):[];if(s.length){const p=e("div",{style:"display:flex;flex-direction:column;gap:12px;margin-top:12px;"});s.forEach((l,a)=>{const d=e("div",{style:"padding:12px;border:1px solid #e5e7eb;border-radius:10px;background:#fff;"}),y=l&&(l.situation||l.prompt||l.q)||`Ситуація ${a+1}`;d.appendChild(e("div",{style:"margin:0 0 6px;font-weight:600;color:#0f172a;"},y));const c=l&&Array.isArray(l.example_answers)?l.example_answers.filter(Boolean):[];if(c.length){d.appendChild(e("div",{class:"muted",style:"margin:0 0 6px;color:#64748b;"},"Приклад відповіді:"));const u=e("div",{style:"display:flex;flex-wrap:wrap;gap:8px;"});c.forEach(f=>{u.appendChild(e("span",{style:"display:inline-flex;align-items:center;padding:4px 10px;border-radius:9999px;background:#e2e8f0;color:#0f172a;font-size:14px;"},f))}),d.appendChild(u)}p.appendChild(d)}),r.appendChild(p)}const h=t&&t.scoring&&Array.isArray(t.scoring.criteria)?t.scoring.criteria.filter(Boolean):[];if(h.length){const p=e("div",{style:"margin-top:16px;padding:14px;border:1px dashed #cbd5e1;border-radius:10px;background:#f8fafc;"});p.appendChild(e("h4",{style:"margin:0 0 8px;font-size:16px;font-weight:600;color:#0f172a;"},"Критерії оцінювання"));const l=e("ul",{style:"margin:0;padding-left:18px;color:#475569;"});h.forEach(a=>{l.appendChild(e("li",{style:"margin:4px 0;"},a))}),p.appendChild(l),r.appendChild(p)}}function ft(r,t){r.appendChild(e("h3",{},t.prompt||"Role-play scenario"));const s=t&&typeof t.scenario=="object"?t.scenario:{},h=e("div",{style:"margin:12px 0;padding:14px;border:1px solid #cbd5e1;border-radius:10px;background:#f8fafc;"});let p=!1;s.setting&&(h.appendChild(e("p",{style:"margin:0 0 6px;font-weight:600;"},`Локація: ${s.setting}`)),p=!0),s.summary&&(h.appendChild(e("p",{style:"margin:0;color:#334155;"},s.summary)),p=!0),p&&r.appendChild(h);const l=Array.isArray(s.roles)?s.roles:[];if(l.length){const y=e("div",{style:"display:grid;gap:12px;margin-top:12px;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));"});l.forEach((c,u)=>{const f=c&&c.name||`Student ${u+1}`,w=e("div",{style:"padding:14px;border:1px solid #e5e7eb;border-radius:10px;background:#fff;box-shadow:0 1px 0 rgba(148, 163, 184, 0.2);"},e("div",{style:"font-weight:600;margin-bottom:6px;"},f));c&&c.goal&&w.appendChild(e("p",{style:"margin:0 0 6px;color:#0f172a;"},`Мета: ${c.goal}`));const k=(c&&Array.isArray(c.details)?c.details:typeof(c==null?void 0:c.details)=="string"?c.details.split(/[;,\n]/):[]).map(b=>String(b||"").trim()).filter(Boolean);if(k.length===1)w.appendChild(e("p",{style:"margin:0;color:#475569;"},k[0]));else if(k.length>1){const b=e("ul",{style:"margin:0;padding-left:18px;color:#475569;"});k.forEach(S=>{b.appendChild(e("li",{style:"margin:2px 0;"},S))}),w.appendChild(b)}y.appendChild(w)}),r.appendChild(y)}const a=Array.isArray(s.steps)?s.steps:[];if(a.length){const y=e("div",{style:"margin-top:16px;padding:14px;border:1px solid #e5e7eb;border-radius:10px;background:#fff;"});y.appendChild(e("h4",{style:"margin:0 0 6px;font-size:16px;font-weight:600;color:#0f172a;"},"Покроковий план діалогу"));const c=e("ol",{style:"margin:0 0 0 18px;padding:0;color:#475569;"});a.forEach(u=>{u&&c.appendChild(e("li",{style:"margin:4px 0;"},u))}),y.appendChild(c),r.appendChild(y)}const d=Array.isArray(t&&t.phrases)?t.phrases:[];if(d.length){r.appendChild(e("h4",{style:"margin:18px 0 8px;font-size:16px;font-weight:600;color:#0f172a;"},"Корисні фрази для діалогу"));const y=e("div",{style:"display:flex;flex-direction:column;gap:8px;"});d.forEach(c=>{const u=typeof c=="string"?c:c&&(c.phrase||c.text||c.value||""),f=c&&typeof c=="object"&&(c.translation||c.note||c.ua||c.uk)||"";if(!u)return;const w=`phrase-${Math.random().toString(36).slice(2,8)}`;y.appendChild(e("label",{for:w,style:"display:flex;gap:10px;align-items:flex-start;padding:10px 12px;border:1px solid #e5e7eb;border-radius:10px;background:#fff;"},e("input",{id:w,type:"checkbox",style:"margin-top:4px;"}),e("div",{},e("span",{style:"font-weight:600;color:#0f172a;"},u),f?e("span",{class:"muted",style:"display:block;margin-top:4px;color:#475569;"},f):null)))}),r.appendChild(y)}}function yt(r,t){r.appendChild(e("h3",{},t.prompt||"Заповніть пропуски у діалозі"));const s=Array.isArray(t==null?void 0:t.answers)?t.answers.map(C=>g(C)):[],h=[];let p=null;function l(C){p&&p!==C&&(p.style.boxShadow="none"),C&&p!==C?(C.style.boxShadow="0 0 0 2px rgba(37, 99, 235, 0.35)",p=C):(C&&(C.style.boxShadow="none"),p=null)}function a(C){C&&(C.dataset.value="",C.textContent="___",C.style.borderColor="#cbd5e1",C.style.background="#fff",C.style.boxShadow="none")}const d=e("div",{style:"display:flex;flex-wrap:wrap;gap:8px;margin:12px 0;padding:10px;border:1px solid #e2e8f0;border-radius:10px;background:#f8fafc;"}),y=Array.isArray(t==null?void 0:t.words)?t.words:[],c=new Set,u=[];y.forEach(C=>{const A=String(C||"").trim();if(!A)return;const H=g(A);c.has(H)||(c.add(H),u.push(A))}),u.forEach(C=>{const A=e("button",{type:"button",class:"btn",style:"padding:6px 10px;border:1px solid #94a3b8;border-radius:999px;background:#fff;color:#0f172a;cursor:pointer;font-size:14px;line-height:1;",onclick:()=>{const H=p||h.find(te=>!te.dataset.value);H&&(H.dataset.value=C,H.textContent=C,H.style.borderColor="#2563eb",H.style.background="#eef2ff",l(null))}},C);A.dataset.word=C,d.appendChild(A)}),d.children.length&&r.appendChild(d);const f=e("div",{style:"display:flex;flex-direction:column;gap:10px;"}),w=Array.isArray(t==null?void 0:t.dialogue)?t.dialogue:[];let v=0;w.forEach(C=>{if(!C)return;const A=C.speaker||C.role||"",H=C.line||C.text||"",te=e("div",{style:"padding:12px;border:1px solid #e5e7eb;border-radius:10px;background:#fff;display:flex;gap:10px;align-items:flex-start;"},A?e("strong",{style:"min-width:90px;"},`${A}:`):null),ne=e("div",{style:"display:flex;flex-wrap:wrap;gap:6px;align-items:center;"}),He=String(H||"").split(/___/);He.forEach((je,St)=>{if(je&&ne.appendChild(e("span",{},je)),St<He.length-1){const $t=s[v]||"",K=e("button",{type:"button",style:"min-width:52px;padding:4px 10px;border:1px solid #cbd5e1;border-radius:8px;background:#fff;color:#0f172a;cursor:pointer;",onclick:()=>{if(K.dataset.value){a(K),l(K);return}l(p===K?null:K)},ondblclick:()=>{a(K),l(null)}},"___");K.dataset.expected=$t,K.dataset.index=String(v),h.push(K),v+=1,ne.appendChild(K)}}),te.appendChild(ne),f.appendChild(te)}),r.appendChild(f);const k=e("div",{style:"margin-top:14px;display:flex;gap:10px;flex-wrap:wrap;align-items:center;"}),b=e("button",{type:"button",class:"btn primary"},"Перевірити"),S=e("button",{type:"button",class:"btn"},"Скинути"),L=e("div",{style:"font-weight:600;color:#0f172a;"});b.addEventListener("click",()=>{let C=0;h.forEach(A=>{const H=A.dataset.expected||"",te=g(A.dataset.value||A.textContent||""),ne=H?te===H:!!te;A.style.borderColor=ne?"#10b981":"#ef4444",A.style.background=ne?"#ecfdf5":"#fee2e2",ne&&(C+=1)}),h.length?L.textContent=`Результат: ${C}/${h.length}`:L.textContent=""}),S.addEventListener("click",()=>{h.forEach(C=>a(C)),L.textContent="",l(null)}),k.appendChild(b),k.appendChild(S),k.appendChild(L),r.appendChild(k)}function gt(r,t){r.appendChild(e("h3",{},t.prompt||"Упорядкуйте діалог"));const s=Array.isArray(t==null?void 0:t.lines)?t.lines.map(b=>({speaker:(b==null?void 0:b.speaker)||(b==null?void 0:b.role)||"",text:(b==null?void 0:b.line)||(b==null?void 0:b.text)||""})):[],h=Array.isArray(t==null?void 0:t.solution)?t.solution.map(b=>Number.parseInt(b,10)):s.map((b,S)=>S),p=e("div",{style:"display:flex;flex-direction:column;gap:8px;margin-top:10px;padding:10px;border:1px solid #e2e8f0;border-radius:10px;background:#f8fafc;"}),l=e("div",{style:"margin-top:14px;padding:12px;border:1px dashed #cbd5e1;border-radius:10px;min-height:80px;display:flex;flex-direction:column;gap:8px;"}),a=new Set;function d({speaker:b,text:S}){return(b?`${b}: ${S}`:S).trim()}function y(b){if(!b)return;const S=Number.parseInt(b.dataset.index||"-1",10),L=b.dataset.buttonId;if(L){const C=p.querySelector(`[data-id="${L}"]`);C&&(C.disabled=!1,C.style.opacity="1")}a.delete(S),b.remove()}function c(b,S,L){const C=e("div",{class:"dialogue-chip",style:"padding:10px;border:1px solid #94a3b8;border-radius:10px;background:#fff;display:flex;justify-content:space-between;align-items:center;gap:12px;cursor:pointer;",onclick:A=>{A.stopPropagation(),y(C)}},e("span",{},S),e("span",{style:"color:#94a3b8;font-size:12px;"},"×"));C.dataset.index=String(b),C.dataset.buttonId=L,l.appendChild(C)}m(s.map((b,S)=>S)).forEach(b=>{const S=s[b],L=d(S),C=`line-${b}-${Math.random().toString(36).slice(2,6)}`,A=e("button",{type:"button",class:"btn",style:"text-align:left;padding:10px;border:1px solid #cbd5e1;border-radius:10px;background:#fff;color:#0f172a;cursor:pointer;",onclick:()=>{a.has(b)||(a.add(b),A.disabled=!0,A.style.opacity="0.5",c(b,L,C))},"data-id":C},L);p.appendChild(A)}),r.appendChild(p),r.appendChild(l);const f=e("div",{style:"margin-top:14px;display:flex;gap:10px;flex-wrap:wrap;align-items:center;"}),w=e("button",{type:"button",class:"btn primary"},"Перевірити"),v=e("button",{type:"button",class:"btn"},"Скинути"),k=e("div",{style:"font-weight:600;color:#0f172a;"});w.addEventListener("click",()=>{const b=Array.from(l.children).map(C=>Number.parseInt(C.dataset.index||"-1",10)),S=h.slice(),L=b.length===S.length&&b.every((C,A)=>C===S[A]);l.style.borderColor=L?"#10b981":"#ef4444",k.textContent=L?"Діалог впорядковано правильно!":`Поточний порядок: ${b.length}/${S.length} реплік. Перевірте послідовність.`}),v.addEventListener("click",()=>{Array.from(l.children).forEach(S=>y(S)),p.querySelectorAll("button").forEach(S=>{S.disabled=!1,S.style.opacity="1"}),a.clear(),l.style.borderColor="#cbd5e1",k.textContent=""}),f.appendChild(w),f.appendChild(v),f.appendChild(k),r.appendChild(f)}function xt(r,t){r.appendChild(e("h3",{},t.prompt||"Обери True або False"));const s=[];if((Array.isArray(t==null?void 0:t.items)?t.items:[]).forEach((d,y)=>{if(!d||!d.statement)return;const c=e("div",{style:"margin:8px 0;padding:12px;border:1px solid #e5e7eb;border-radius:10px;background:#fff;"},e("p",{style:"margin:0 0 8px;font-weight:600;"},d.statement)),u=`${t.id||"tf"}-${y}`,f=!!d.answer,w=e("label",{style:"display:inline-flex;align-items:center;gap:6px;margin-right:16px;"},e("input",{type:"radio",name:u,value:"true"}),"True"),v=e("label",{style:"display:inline-flex;align-items:center;gap:6px;"},e("input",{type:"radio",name:u,value:"false"}),"False"),k=e("div",{style:"display:flex;align-items:center;"});k.appendChild(w),k.appendChild(v),c.appendChild(k),s.push({row:c,name:u,expected:f}),r.appendChild(c)}),!s.length)return;const p=e("div",{style:"margin-top:14px;display:flex;gap:10px;align-items:center;flex-wrap:wrap;"}),l=e("button",{type:"button",class:"btn primary"},"Перевірити"),a=e("div",{style:"font-weight:600;color:#0f172a;"});l.addEventListener("click",()=>{let d=0;s.forEach(({row:y,name:c,expected:u})=>{const f=y.querySelector(`input[name="${c}"]:checked`),w=f?f.value===String(u):!1;y.style.borderColor=w?"#10b981":"#ef4444",w&&(d+=1)}),a.textContent=`Результат: ${d}/${s.length}`}),p.appendChild(l),p.appendChild(a),r.appendChild(p)}function bt(r,t){r.appendChild(e("h3",{},t.prompt||"Доберіть слово за описом"));const s=Array.isArray(t==null?void 0:t.wordBank)?t.wordBank:[];if(s.length){const d=e("div",{style:"margin:8px 0 12px;padding:10px;border:1px solid #e2e8f0;border-radius:10px;background:#f8fafc;display:flex;flex-wrap:wrap;gap:8px;"});s.forEach(y=>{const c=String(y||"").trim();c&&d.appendChild(e("span",{style:"padding:6px 10px;border:1px solid #94a3b8;border-radius:999px;background:#fff;font-size:14px;"},c))}),r.appendChild(d)}const h=[];if((Array.isArray(t==null?void 0:t.items)?t.items:[]).forEach(d=>{if(!d||!d.clue)return;const y=e("div",{style:"margin-bottom:10px;padding:12px;border:1px solid #e5e7eb;border-radius:10px;background:#fff;"});y.appendChild(e("p",{style:"margin:0 0 6px;font-weight:600;"},d.clue));const c=e("input",{type:"text",style:"width:100%;max-width:320px;padding:6px 8px;border:1px solid #cbd5e1;border-radius:6px;"});y.appendChild(c);const u=Array.isArray(d==null?void 0:d.answers)?d.answers.map(f=>g(f)):Array.isArray(d==null?void 0:d.answer)?d.answer.map(f=>g(f)):d!=null&&d.answer?[g(d.answer)]:[];h.push({row:y,input:c,answers:u}),r.appendChild(y)}),!h.length)return;const l=e("div",{style:"font-weight:600;color:#0f172a;"}),a=e("button",{type:"button",class:"btn primary"},"Перевірити");a.addEventListener("click",()=>{let d=0;h.forEach(({row:y,input:c,answers:u})=>{const f=g(c.value),w=u.length?u.includes(f):!!f;y.style.borderColor=w?"#10b981":"#ef4444",w&&(d+=1)}),l.textContent=`Результат: ${d}/${h.length}`}),r.appendChild(a),r.appendChild(l)}function wt(r,t){r.appendChild(e("h3",{},t.prompt||"Розшифруйте слова"));const s=[];if((Array.isArray(t==null?void 0:t.items)?t.items:[]).forEach(a=>{if(!a||!a.scrambled)return;const d=e("div",{style:"margin-bottom:10px;padding:12px;border:1px solid #e5e7eb;border-radius:10px;background:#fff;"});d.appendChild(e("div",{style:"margin-bottom:6px;font-weight:600;"},a.scrambled));const y=e("input",{type:"text",style:"width:100%;max-width:260px;padding:6px 8px;border:1px solid #cbd5e1;border-radius:6px;"});d.appendChild(y);const c=Array.isArray(a==null?void 0:a.answers)?a.answers.map(u=>g(u)):Array.isArray(a==null?void 0:a.answer)?a.answer.map(u=>g(u)):a!=null&&a.answer?[g(a.answer)]:[];s.push({row:d,input:y,answers:c}),r.appendChild(d)}),!s.length)return;const p=e("button",{type:"button",class:"btn primary"},"Перевірити"),l=e("div",{style:"margin-top:6px;font-weight:600;color:#0f172a;"});p.addEventListener("click",()=>{let a=0;s.forEach(({row:d,input:y,answers:c})=>{const u=g(y.value),f=c.length?c.includes(u):!!u;d.style.borderColor=f?"#10b981":"#ef4444",f&&(a+=1)}),l.textContent=`Результат: ${a}/${s.length}`}),r.appendChild(p),r.appendChild(l)}function Ct(r,t){r.appendChild(e("h3",{},t.prompt||"Знайди зайве слово"));const s=[];if((Array.isArray(t==null?void 0:t.items)?t.items:[]).forEach((a,d)=>{const y=Array.isArray(a==null?void 0:a.options)?a.options:[];if(!y.length)return;const c=e("div",{style:"margin-bottom:10px;padding:12px;border:1px solid #e5e7eb;border-radius:10px;background:#fff;"});c.appendChild(e("div",{style:"margin-bottom:6px;font-weight:600;"},`Набір ${d+1}`));const u=`${t.id||"odd"}-${d}`;y.forEach((v,k)=>{const b=`${u}-${k}`;c.appendChild(e("label",{for:b,style:"display:flex;align-items:center;gap:6px;margin:4px 0;"},e("input",{type:"radio",name:u,value:String(k),id:b}),v))});const f=String((a==null?void 0:a.explanation)||"").trim();if(f){const v=e("div",{class:"muted",style:"display:none;margin-top:6px;color:#475569;"});v.textContent=`Пояснення: ${f}`,c.appendChild(v)}const w=g((a==null?void 0:a.answer)||"");s.push({row:c,groupName:u,answerIndex:w}),r.appendChild(c)}),!s.length)return;const p=e("button",{type:"button",class:"btn primary"},"Перевірити"),l=e("div",{style:"margin-top:6px;font-weight:600;color:#0f172a;"});p.addEventListener("click",()=>{let a=0;s.forEach(({row:d,groupName:y,answerIndex:c})=>{const u=d.querySelector(`input[name="${y}"]:checked`),f=g(u?u.value:""),w=c?f===c:!!f;d.style.borderColor=w?"#10b981":"#ef4444";const v=d.querySelector(".muted");v&&(v.style.display=w?"none":"block"),w&&(a+=1)}),l.textContent=`Результат: ${a}/${s.length}`}),r.appendChild(p),r.appendChild(l)}function vt(r,t){r.appendChild(e("h3",{},t.prompt||"Writing/Speaking prompt")),t.description&&r.appendChild(e("p",{class:"muted"},t.description));const s=e("div",{style:"margin-top:8px;"});(t.checklist||[]).forEach(l=>{const a=Math.random().toString(36).slice(2),d=e("label",{for:a,style:"display:flex;align-items:center;gap:8px;margin:6px 0;"},e("input",{id:a,type:"checkbox"}),e("span",{},l));s.appendChild(d)}),r.appendChild(s);const h=e("button",{type:"button",class:"btn primary",style:"margin-top:8px;"},"Позначити як перевірено"),p=e("div",{class:"muted",style:"margin-top:6px;"});h.addEventListener("click",()=>{p.textContent="Готово! Перевір список і за бажанням відправ наставнику."}),r.appendChild(h),r.appendChild(p)}function Be(){let r=document.getElementById("practice");if(!r&&/\/grammar\//.test(location.pathname)){const t=e("div",{class:"container"});t.appendChild(e("hr",{class:"sep"})),r=e("section",{id:"practice"}),t.appendChild(r),document.body.appendChild(t)}return r}function Et(){const r=Be();if(!r)return;let t=r.querySelector("#practice-body");if(t||(t=e("div",{id:"practice-body"}),r.appendChild(t)),(window.lessonContext||{}).isCustomLesson){const h=r.querySelector("[data-practice-placeholder]");h&&(h.textContent="Практика для кожної теми розміщена одразу після теорії. Тут можете згенерувати додаткові завдання."),t&&(t.innerHTML='<p class="muted">Згенеруйте додаткові вправи або додайте власні завдання.</p>'),document.dispatchEvent(new CustomEvent("practice:dataLoaded",{detail:null})),document.dispatchEvent(new CustomEvent("practice:rendered",{detail:{ok:!1,reason:"custom-lesson"}}));return}dt().then(h=>{if(!h){document.dispatchEvent(new CustomEvent("practice:dataLoaded",{detail:null})),t.innerHTML='<p class="muted">Практика поки відсутня.</p>',document.dispatchEvent(new CustomEvent("practice:rendered",{detail:{ok:!1}}));return}t.innerHTML="";const p=e("div",{},e("h2",{},"Practice ",e("span",{class:"badge"},h.level||"B1")),h.title?e("p",{class:"muted"},h.title):null);t.appendChild(p);const l=(h.tasks||[]).map((a,d)=>({key:a&&a.id?String(a.id):`base-${d}`,task:a}));document.dispatchEvent(new CustomEvent("practice:dataLoaded",{detail:{title:h.title,level:h.level,entries:l}})),l.forEach(({task:a,key:d})=>Ce(t,a,d)),document.dispatchEvent(new CustomEvent("practice:rendered",{detail:{ok:!0}}))})}document.addEventListener("DOMContentLoaded",Et)})();document.addEventListener("click",n=>{const o=n.target.closest(".text-block");if(o){const i=o.innerHTML;navigator.clipboard.writeText(`<div class="text-block">${i}</div>`),console.log("Скопійовано")}});const et={"greetings-farewells":[{word:"Hello",translation:"Привіт",example:"Hello, nice to meet you!"},{word:"Hi",translation:"Привіт (неформально)",example:"Hi, are you ready for class?"},{word:"Good morning",translation:"Доброго ранку",example:"Good morning, Mrs Smith."},{word:"Good afternoon",translation:"Доброго дня",example:"Good afternoon, everyone."},{word:"Good evening",translation:"Доброго вечора",example:"Good evening, how was your day?"},{word:"Nice to meet you",translation:"Приємно познайомитися",example:"Nice to meet you, I'm Tom."},{word:"How are you?",translation:"Як справи?",example:"Hi, Anna! How are you?"},{word:"I'm fine, thanks",translation:"У мене все добре, дякую",example:"I'm fine, thanks. And you?"},{word:"See you later",translation:"Побачимось пізніше",example:"I have to go now. See you later!"},{word:"See you soon",translation:"До скорої зустрічі",example:"Thanks for your help. See you soon."},{word:"Goodbye",translation:"До побачення",example:"Goodbye, have a nice evening!"},{word:"Bye",translation:"Бувай",example:"Bye, talk to you tomorrow!"},{word:"Take care",translation:"Бережи себе",example:"I'm heading home now. Take care!"},{word:"Have a nice day",translation:"Гарного дня",example:"Thanks for coming. Have a nice day!"},{word:"Good night",translation:"Надобраніч",example:"It's late. Good night!"}],"personal-info-basics":[{word:"first name",translation:"ім'я",example:"My first name is Olha."},{word:"last name",translation:"прізвище",example:"Her last name is Petrenko."},{word:"full name",translation:"повне ім'я",example:"Please write your full name here."},{word:"nickname",translation:"прізвисько / нікнейм",example:"His friends call him Max; it's his nickname."},{word:"age",translation:"вік",example:"My age is twenty."},{word:"I am ... years old",translation:"мені ... років",example:"I am twenty years old."},{word:"years old",translation:"років (вік)",example:"I'm eleven years old."},{word:"country",translation:"країна",example:"My country is Ukraine."},{word:"city",translation:"місто",example:"I live in the city of Lviv."},{word:"hometown",translation:"рідне місто",example:"My hometown is Poltava."},{word:"place of birth",translation:"місце народження",example:"My place of birth is Kharkiv."},{word:"address",translation:"адреса",example:"My address is 12 Green Street."},{word:"nationality",translation:"національність",example:"She is Italian by nationality."},{word:"native language",translation:"рідна мова",example:"Ukrainian is my native language."},{word:"foreign language",translation:"іноземна мова",example:"English is my first foreign language."},{word:"from",translation:"з / родом із",example:"I am from Ukraine."},{word:"live in",translation:"жити в",example:"I live in Kyiv."},{word:"live with",translation:"жити з",example:"I live with my parents."},{word:"date of birth",translation:"дата народження",example:"My date of birth is May 12, 2005."},{word:"job / occupation",translation:"робота / професія",example:"My job is a student."},{word:"student",translation:"студент / учень",example:"I'm a student at the local school."},{word:"teacher",translation:"вчитель / викладач",example:"My teacher is from Canada."},{word:"grade",translation:"клас (у школі)",example:"I'm in Grade 6."},{word:"single",translation:"неодружений / неодружена",example:"He is single at the moment."},{word:"married",translation:"одружений / заміжня",example:"My parents are married."},{word:"male",translation:"чоловіча стать",example:"He is male."},{word:"female",translation:"жіноча стать",example:"She is female."},{word:"speak",translation:"говорити (мовою)",example:"I speak Ukrainian and English."},{word:"introduce yourself",translation:"представитись",example:"Let me introduce myself."}]},Mt=55,_t=5,tt=0,Ut={"custom-no1-mggxs7zo":[{id:"db94624e1c8042ce98760f467377e1ae",themeId:"42",templateId:"70",fontStackId:tt,title:"Wordwall вправа для особових займенників"}],"custom-no2-4db25661":[{id:"110f5ab8bba8415eadefd09fb52c4e87",themeId:"65",templateId:"30",fontStackId:"12",title:"Wordwall вправа для особових займенників",url:"https://wordwall.net/embed/110f5ab8bba8415eadefd09fb52c4e87?themeId=65&templateId=30&fontStackId=12"}],"custom-no3-b9fd7e6c":[{id:"110f5ab8bba8415eadefd09fb52c4e87",themeId:"65",templateId:"30",fontStackId:"12",title:"Wordwall вправа для особових займенників",url:"https://wordwall.net/embed/110f5ab8bba8415eadefd09fb52c4e87?themeId=65&templateId=30&fontStackId=12"}]};function Pt(n){return n?n.url?String(n.url):n.id?`https://wordwall.net/embed/${String(n.id).trim()}`:null:null}function nt(n){const o=Pt(n);if(!o)return null;const i=new URLSearchParams,e=n.themeId??Mt,m=n.templateId??_t,g=n.fontStackId??tt;e!=null&&i.set("themeId",String(e)),m!=null&&i.set("templateId",String(m)),g!=null&&i.set("fontStackId",String(g));const x=i.toString();return x?`${o}?${x}`:o}function qt(n){const o=nt(n);if(!o)return null;const i=document.createElement("iframe");return i.className="lesson-wordwall__iframe",i.src=o,i.width=String(n.width??1e3),i.height=String(n.height??760),i.setAttribute("frameborder","0"),i.setAttribute("allowfullscreen","true"),i.setAttribute("loading","lazy"),i.setAttribute("referrerpolicy","strict-origin-when-cross-origin"),n.title&&i.setAttribute("title",n.title),i}function Ot(n){if(!n)return[];const o=Ut[n];return Array.isArray(o)?o.map(i=>({...i})).filter(i=>!!nt(i)):[]}const Nt={BASE_URL:"/",DEV:!1,MODE:"production",PROD:!0,SSR:!1},ve=typeof import.meta<"u"&&Nt&&"/"||"/";function Pe(n){const o=ve.endsWith("/")?ve:`${ve}/`,i=String(n||"");return i.startsWith(o)?i:`${o}${i.replace(/^\/+/,"")}`}const pe=new URLSearchParams(window.location.search),Rt=n=>n,ue=pe.get("topic"),ze=pe.get("custom"),Fe=pe.get("title"),Ge=Rt(pe.get("category")),Qe=pe.get("level"),Ke=pe.get("file"),M=ue?_e.find(n=>n.id===ue):void 0,O=(()=>{if(!ze)return null;const n=[];return Array.isArray(We)&&We.forEach(o=>{if(!o||typeof o!="object")return;const i=Array.isArray(o.topicIds)?[...o.topicIds]:[];!o.id||!i.length||n.push({...o,topicIds:i,source:"preset"})}),At().filter(o=>o&&typeof o=="object").forEach(o=>{const i=Array.isArray(o.topicIds)?[...o.topicIds]:[];!o.id||!i.length||n.push({...o,topicIds:i,source:"local"})}),n.find(o=>o.id===ze)??null})(),J=!!O,ye=J?O.title:M!=null&&M.title?M.title:Fe?decodeURIComponent(Fe):"Матеріал уроку",ke=J?"custom":M!=null&&M.category?M.category:Ge?decodeURIComponent(Ge):"",Te=(()=>{if(J){if(O.level)return O.level;const n=(O.topicIds||[]).map(i=>_e.find(e=>e.id===i)).filter(Boolean);return Array.from(new Set(n.map(i=>i.level))).sort().join(", ")}return M!=null&&M.level?M.level:Qe?decodeURIComponent(Qe):""})(),Ae=(()=>{if(J)return null;const n=(M==null?void 0:M.htmlPath)??(Ke?decodeURIComponent(Ke):null);return n&&n.startsWith("lessons/")?n:null})();window.lessonContext={id:J?O.id:(M==null?void 0:M.id)??ue??null,title:ye,category:ke,level:Te,htmlPath:Ae,source:J?O.source||"custom":"catalog",topicIds:J?[...O.topicIds||[]]:M!=null&&M.id?[M.id]:ue?[ue]:[],isCustomLesson:J};const Je=document.querySelector("[data-lesson-title]"),Ye=document.querySelector("[data-lesson-category]"),Ve=document.querySelector("[data-lesson-level]"),Z=document.querySelector("[data-lesson-status]"),j=document.getElementById("lesson-content");function Bt(){const n=document.querySelector('[data-component="copyright-year"]');n&&(n.textContent=String(new Date().getFullYear()))}function Ht(){Je&&(Je.textContent=ye);const o=(()=>{var e;return J?"Комбінований урок":((e=Ue[ke])==null?void 0:e.label)??""})()||ke;Ye&&(Ye.textContent=o||""),Ve&&(Ve.textContent=Te?`Рівень: ${Te}`:"");const i=document.getElementById("practice-title");i&&(i.textContent=ye),document.title=`${ye} | English Teacher Platform`}function rt(n){return`lesson-topic-${String(n||"").trim().toLowerCase().replace(/[^a-z0-9_-]+/g,"-").replace(/^-+|-+$/g,"")||"topic"}`}function jt(n){if(!n.length)return null;const o=document.createElement("section");o.className="lesson-custom-summary";const i=document.createElement("h2");i.textContent="Склад уроку",o.appendChild(i);const e=document.createElement("ol");return e.className="lesson-custom-summary__list",n.forEach((m,g)=>{var Q;const x=document.createElement("li");x.className="lesson-custom-summary__item";const E=((Q=Ue[m.category])==null?void 0:Q.label)??m.category,T=rt(m.id),$=document.createElement("a");$.className="lesson-custom-summary__link",$.href=`#${T}`,$.dataset.topicAnchor=T;const P=document.createElement("strong");P.textContent=`${g+1}. ${m.title}`;const N=document.createElement("span");N.textContent=`${E} · ${m.level}`,$.appendChild(P),$.appendChild(N),$.addEventListener("click",W=>{const I=document.getElementById(T);I&&(W.preventDefault(),I.scrollIntoView({behavior:"smooth",block:"start"}),requestAnimationFrame(()=>{try{I.focus({preventScroll:!0})}catch{I.focus()}}))}),x.appendChild($),e.appendChild(x)}),o.appendChild(e),o}async function Dt(n){if(!n)return null;const o=new Set;if(n.id&&o.add(`data/practice/${n.id}.json`),n.htmlPath){const i=String(n.htmlPath).replace(/^\.?\/?/,"").replace(/\.html?$/i,"");if(i){o.add(`data/practice/${i}.json`);const e=i.split("/"),m=e[e.length-1];m&&o.add(`data/practice/${m}.json`)}}for(const i of o)try{const e=await fetch(Pe(i),{cache:"no-store"});if(!e.ok)continue;const m=await e.json();if(m&&Array.isArray(m.tasks)&&m.tasks.length)return m}catch(e){console.warn(`Не вдалося завантажити практику за шляхом ${i}`,e)}return null}function Ee(n){if(!n)return;const o=document.createElement("p");o.className="practice-inline__empty muted",o.textContent="Практика для цієї теми поки відсутня.",n.appendChild(o)}function ot(n){const o=Ot(n);if(!o.length)return null;const i=document.createElement("section");i.className="lesson-wordwall";const e=document.createElement("h2");e.className="lesson-wordwall__title",e.textContent="Wordwall",i.appendChild(e);const m=document.createElement("div");m.className="lesson-wordwall__items",i.appendChild(m);let g=!1;return o.forEach((x,E)=>{const T=qt({...x,title:x.title||`Wordwall вправа ${E+1}`});T&&(g=!0,m.appendChild(T))}),g?i:null}async function Wt(){var g;if(!j)return;const n=((O==null?void 0:O.topicIds)||[]).map(x=>_e.find(E=>E.id===x)).filter(Boolean);if(!n.length){Z&&(Z.textContent="Не вдалося знайти вибрані теми. Створіть урок заново.");return}if(j.innerHTML="",O!=null&&O.description){const x=document.createElement("p");x.className="lesson-custom-description",x.textContent=O.description,j.appendChild(x)}const o={grammar:0,lexical:1},i=n.slice().sort((x,E)=>{const T=o[x.category]??99,$=o[E.category]??99;return T!==$?T-$:0}),e=jt(i);e&&j.appendChild(e);const m=ot((O==null?void 0:O.id)??null);m&&j.appendChild(m);for(const x of i){const E=document.createElement("section");E.className="lesson-topic",E.dataset.topicId=x.id;const T=rt(x.id);E.id=T,E.setAttribute("tabindex","-1");const $=document.createElement("header");$.className="lesson-topic__header";const P=document.createElement("h3");P.className="lesson-topic__title",P.textContent=x.title,$.appendChild(P);const N=document.createElement("p");N.className="lesson-topic__meta";const Q=((g=Ue[x.category])==null?void 0:g.label)??x.category;N.textContent=`${Q} · Рівень ${x.level}`,$.appendChild(N),E.appendChild($);const W=document.createElement("div");W.className="lesson-topic__body",E.appendChild(W),j.appendChild(E);try{const _=await fetch(Pe(x.htmlPath));if(!_.ok)throw new Error(`Не вдалося завантажити файл: ${_.status}`);const z=await _.text();W.innerHTML=z}catch(_){W.innerHTML='<p class="lesson-topic__error">Не вдалося завантажити матеріал цієї теми.</p>',console.error(_)}const I=document.createElement("div");I.className="lesson-topic__practice",E.appendChild(I);try{const _=await Dt(x);if(_&&Array.isArray(_.tasks)&&_.tasks.length){const z=window.practice||{},ae=_.title?`Практика: ${_.title}`:`Практика: ${x.title}`,ie=_.level||x.level||"";typeof z.renderTaskList=="function"?z.renderTaskList(I,_.tasks,{title:ae,level:ie,description:_.description,keyPrefix:`${x.id}-practice`}):Ee(I)}else Ee(I)}catch(_){console.error("Помилка під час завантаження практики",_),Ee(I)}}Z&&Z.remove(),await at(j)}async function zt(){if(j){if(J){await Wt();return}if(!Ae){Z&&(Z.textContent="Не вдалося визначити файл з матеріалом. Перейдіть назад та оберіть тему зі списку.");return}try{const n=await fetch(Pe(Ae));if(!n.ok)throw new Error(`Не вдалося завантажити файл: ${n.status}`);const o=await n.text();j.innerHTML="";const i=ot((M==null?void 0:M.id)??null);i&&j.appendChild(i);const e=document.createElement("template");e.innerHTML=o,j.appendChild(e.content),await at(j)}catch(n){Z&&(Z.textContent="Сталася помилка під час завантаження матеріалу. Спробуйте пізніше або поверніться до каталогу."),console.error(n)}}}function Ft(n,o){if(!n)return;const i=Array.isArray(o)?o:[];if(!i.length)return;n.classList.add("communication__table");const e=document.createElement("table"),m=document.createElement("thead"),g=document.createElement("tr");["Слово","Переклад","Приклад"].forEach(E=>{const T=document.createElement("th");T.textContent=E,g.appendChild(T)}),m.appendChild(g);const x=document.createElement("tbody");i.forEach(E=>{if(!E)return;const T=document.createElement("tr"),$=document.createElement("td");$.textContent=E.word||E.term||"";const P=document.createElement("td");P.textContent=E.translation||E.meaning||"";const N=document.createElement("td");N.textContent=E.example||E.sentence||"",T.appendChild($),T.appendChild(P),T.appendChild(N),x.appendChild(T)}),e.appendChild(m),e.appendChild(x),n.innerHTML="",n.appendChild(e)}function Gt(n){var e;if(!n)return null;if(n.dataset.communicationTopic)return n.dataset.communicationTopic;if(n.dataset.topic)return n.dataset.topic;const o=n.closest("[data-communication-topic]");if(o!=null&&o.dataset.communicationTopic)return o.dataset.communicationTopic;const i=(e=window.lessonContext)==null?void 0:e.id;return i&&et[i]?i:null}async function at(n){if(!n)return;const o=Array.from(n.querySelectorAll("[data-communication-words]"));o.length&&o.forEach(i=>{const e=Gt(i);if(!e)return;const m=et[e]||[];m.length&&Ft(i,m)})}function Qt(){Bt(),Ht(),zt()}Qt();const Kt=async n=>{const i="https://vq1wtq2d2l.execute-api.us-east-2.amazonaws.com/dev"+"/openai";return await fetch(i,{method:"POST",body:JSON.stringify(n),headers:{"Content-Type":"application/json"}}).then(m=>m.json())},Jt=async(n,o,i={},e=[])=>{const m=Yt(n,o,i,e),g=await Kt(m);try{return typeof g=="string"?JSON.parse(g):g}catch{const E=typeof g=="string"?g.match(/\{[\s\S]*\}$/):null;if(E)return JSON.parse(E[0]);throw new Error("Не вдалося розпарсити JSON відповіді моделі")}};function Yt(n,o,i={},e=[]){const m=localStorage.getItem("gptToken");if(!m||(m==null?void 0:m.length)<10){console.warn("⚠️ gptToken відсутній у localStorage");const P=prompt("Enter Your GPT Token");localStorage.setItem("gptToken",P)}const g="gpt-4o-mini",x=String(o||"").trim().toLowerCase(),{system:E,user:T}=Vt(n,x,i),$=en(T,e);return{token:m,model:g,messages:[{role:"system",content:E},{role:"user",content:$}],temperature:.3,max_tokens:4e3}}function Vt(n,o,i){i.language;const e=Number.isInteger(i.items)?i.items:Xt[o]||10,m=i.seedId||Zt(n),g=`
YOU ARE an ESL task generator.
GOAL: create ONE task block of type "${o}" on the topic "${n}".
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
- Keep questions natural, concise, and on the topic "${n}".
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
Topic: ${n}
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
- Keep sentences short, level A1–A2, and connected to "${n}".
      `.trim(),user:q(n,"gap",e)},transform:{system:`
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
      `.trim(),user:q(n,"transform",e)},match:{system:`
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
- Use vocabulary related to "${n}".
      `.trim(),user:q(n,"match",e)},error:{system:`
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
- ${e} sentences containing a typical error connected to "${n}".
- Provide clear English hints.
- Match the formatting requested in the prompt (for example, omit the period).
      `.trim(),user:q(n,"error",e)},order:{system:`
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
- Use sentences relevant to "${n}".
      `.trim(),user:q(n,"order",e)},short:{system:`
${g}
OUTPUT SCHEMA:
{
  "id": "short-${m}-1",
  "type": "short",
  "prompt": "Write short answers about ${n}.",
  "items": [
    { "q": "Write 2–3 sentences about your daily routine.", "keywords": ["i", "usually", "every"] }
  ]
}
REQUIREMENTS:
- ${Math.min(6,Math.max(3,Math.floor(e/2)))} tasks that invite short written responses.
- "keywords" act as guidance, not strict scoring rubrics, and must be lowercase English words.
      `.trim(),user:q(n,"short",e)},open:{system:`
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
- Keep each "situation" within 8–14 words, focused on real-life communication linked to "${n}".
- Maintain an A1–A2 learner level and avoid simple yes/no prompts.
- Provide exactly 3 concise scoring criteria phrased for teachers (e.g., "Use two past time expressions").
- Optionally add "example_answers" arrays (1–3 short samples) to model good responses.
- Output JSON only with no surrounding commentary.
      `.trim(),user:q(n,"open",e)},writing:{system:`
${g}
OUTPUT SCHEMA:
{
  "id": "writing-${m}-1",
  "type": "writing",
  "prompt": "Short writing task about ${n}.",
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
      `.trim(),user:q(n,"writing",e)},roleplay:{system:`
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
- The situation must clearly connect to the topic "${n}".
- Exactly two roles: Student 1 and Student 2.
- Provide 3–5 steps describing how the dialogue should develop.
- Include ${Math.max(6,Math.min(10,e))} useful English phrases with brief English explanations or synonyms.
- Do not add bullet symbols inside the strings.
      `.trim(),user:q(n,"roleplay",e)},"dialogue-gap":{system:`
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
- Keep each line short (maximum 12 words) and on the topic "${n}".
- Do not add extra fields beyond the schema.
      `.trim(),user:q(n,"dialogue-gap",e)},"dialogue-order":{system:`
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
- Each line must contain 6–12 words, sound natural, and stay on the topic "${n}".
- "solution" is an array of zero-based indices describing the correct order of the lines.
- Do not add extra fields beyond the schema.
      `.trim(),user:q(n,"dialogue-order",e)},truefalse:{system:`
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
- Use simple A1–A2 level sentences in English related to "${n}".
      `.trim(),user:q(n,"truefalse",e)},"definition-match":{system:`
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
- Use vocabulary connected to the topic "${n}".
      `.trim(),user:q(n,"definition-match",e)},"synonym-clue":{system:`
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
      `.trim(),user:q(n,"synonym-clue",e)},scramble:{system:`
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
- "scrambled" must be a shuffled version of an English word from "${n}".
- "answers" may list 1–2 valid spellings in lowercase English.
      `.trim(),user:q(n,"scramble",e)},wordpairs:{system:`
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
- Use accurate singular/plural pairs relevant to "${n}".
- Do not add extra keys beyond the schema.
      `.trim(),user:q(n,"wordpairs",e)},"odd-one-out":{system:`
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
- Only one option may be different; the rest must relate to "${n}".
      `.trim(),user:q(n,"odd-one-out",e)},context:{system:`
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
- Keep the text within 200 words using simple A1 English connected to "${n}".
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
}`.trim(),user:q(n,"context",e)}},E=x[o]||x.mcq,T=(i.additionalInstructions||i.extraInstructions||"").trim();return T?{system:E.system,user:`${E.user}

Additional teacher instructions:
${T}`}:E}const Xt={mcq:10,gap:10,transform:10,match:8,error:10,order:10,short:3,open:4,writing:1,roleplay:8,"dialogue-gap":6,"dialogue-order":6,truefalse:8,"definition-match":8,"synonym-clue":8,scramble:8,wordpairs:8,"odd-one-out":8,context:4};function q(n,o,i){return`Topic: ${n}
Generate a task block of type "${o}" with ${i} items. Return JSON only that follows the described schema.`}function Zt(n){return String(n||"task").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,6)||"task"}function en(n,o){const i=String(n||"").trim(),e=tn(o);return e?`${i||"Generate the task block."}

STRICT VOCABULARY REQUIREMENTS (communication lesson):
1. Treat the target expressions below as the ONLY lexical focus for the task. Every generated item and every correct answer must contain at least one of these expressions verbatim (you may adapt grammar but keep the core phrase).
2. Do not introduce alternative key phrases or synonyms outside this list; supporting words like articles or pronouns are fine, but the highlighted expression must come from the list.
3. When offering distractors or incorrect options, keep them realistic yet stay close to the topic; never invent brand-new key phrases outside the set.
4. The Ukrainian translations are reference only – the final task must remain fully in English.

Target vocabulary:
${e}`:i||n||""}function tn(n){if(!Array.isArray(n)||!n.length)return"";const o=e=>{if(!e)return"";const m=e.indexOf(" — "),g=e.indexOf(" – "),x=e.indexOf(" - "),E=[m,g,x].filter(P=>P>=0),T=E.length?Math.min(...E):-1;return(T>=0?e.slice(0,T):e).trim()},i=n.map((e,m)=>{if(!e)return"";const g=e.word||e.term||e.phrase||e.text||`Item ${m+1}`,x=e.translation||e.meaning||e.ua||e.uk||"",E=e.example||e.sentence||e.usage||e.sample||"",T=o(E);let $=`${m+1}. ${g}`;return x&&($+=` — ${x}`),T&&($+=` (Example: ${T})`),$}).filter(Boolean);return i.length?i.join(`
`):""}const Xe=document.querySelector(".js-practice-section"),U=document.querySelector("[data-practice-generator]"),Se=U==null?void 0:U.querySelector("[data-practice-status]"),ge=document.querySelector("[data-generator-output]"),he=document.querySelector("[data-generator-json]"),re=document.querySelector("[data-generator-copy]"),oe=document.querySelector("[data-generator-download]"),fe=U==null?void 0:U.querySelector("[data-types]"),G=U==null?void 0:U.querySelector("[data-types-trigger]"),X=U==null?void 0:U.querySelector("[data-types-panel]"),Ze=document.querySelector("[data-practice-placeholder]"),D=window.lessonContext||{};let Y=D.title||"Generated Practice",V=D.level||"custom";const le=[],xe=[];function de(n){n&&n.classList.add("hidden")}function qe(n){n&&n.classList.remove("hidden")}function it(n){return!n||n.classList.contains("hidden")}function Oe(){return localStorage.getItem("hideGenerateSection")==="true"}function Le(){Oe()?(de(Xe),de(X),de(ge),ee()):(qe(Xe),Me(),ce())}function Ie(n){return`${n&&typeof n=="object"&&n.id?String(n.id):String((n==null?void 0:n.type)||"task")}-${Date.now()}-${Math.random().toString(16).slice(2,8)}`}function st(){return{title:Y||D.title||"Generated Practice",level:V||D.level||"custom",tasks:[...le,...xe].map(n=>n.data)}}function ce(){if(he){if(Oe()){de(ge);return}if(!le.length&&!xe.length){he.textContent="",de(ge),re&&(re.disabled=!0),oe&&(oe.disabled=!0);return}he.textContent=JSON.stringify(st(),null,2),qe(ge),re&&(re.disabled=!1),oe&&(oe.disabled=!1)}}function nn(n){const o=Ie(n);return xe.push({key:o,data:n}),ce(),o}function rn(n,o){const i=m=>{const g=m.findIndex(x=>n&&x.key===n||x.data===o);return g!==-1?(m.splice(g,1),!0):!1};(i(xe)||i(le))&&ce()}function on(){if(!U)return;const n=U.querySelector('[name="topic"]');if(n&&!n.value){const o=D.title||"Lesson topic";n.value=o}}function F(n,o="idle"){Se&&(Se.textContent=n,Se.dataset.state=o)}function an(n){return String(n||"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,8)}function $e(n){return String(n||"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")}function Ne(){return Array.from(U.querySelectorAll('input[name="types"]'))}function sn(n){const o=n.filter(i=>i.checked).map(i=>{var e,m;return(m=(e=i.nextElementSibling)==null?void 0:e.textContent)==null?void 0:m.trim()}).filter(Boolean);return o.length?o.length<=2?o.join(", "):`${o.slice(0,2).join(", ")} +${o.length-2}`:"Оберіть типи"}function Me(){if(!G)return;const n=Ne();G.textContent=sn(n)}function ee(){!X||!G||it(X)||(de(X),G.setAttribute("aria-expanded","false"))}function ln(){if(!X||!G)return;if(it(X)){qe(X),G.setAttribute("aria-expanded","true");const o=X.querySelector('input[name="types"]');o==null||o.focus({preventScroll:!0})}else ee()}function dn(){const n=!Oe();localStorage.setItem("hideGenerateSection",String(n)),Le(),ce()}function cn(){const n=document.getElementById("practice"),o=n==null?void 0:n.querySelector("#practice-body");if(Ze&&Ze.remove(),o&&o.children.length===1){const i=o.firstElementChild;i&&/практика поки відсутня/i.test(i.textContent||"")&&i.remove()}}function pn(){const n=document.getElementById("practice");if(!n)return;const o=n.querySelector("#practice-body");if(o&&!o.querySelector(".practice-dynamic-title")){const i=document.createElement("div");i.className="practice-dynamic-title",i.innerHTML=`
      <h2>Згенеровані завдання</h2>
      ${D.level?`<p class="muted">Рівень: ${D.level}</p>`:""}
    `,o.prepend(i)}}async function un(n){var Q,W;if(n.preventDefault(),!U)return;const o=U.querySelector('button[type="submit"]'),i=U.querySelector('[name="topic"]'),e=U.querySelector('[name="count"]'),m=U.querySelector('[name="instructions"]'),g=Ne(),x=(Q=i==null?void 0:i.value)==null?void 0:Q.trim(),E=Number.parseInt((e==null?void 0:e.value)||"10",10)||10,T=((W=m==null?void 0:m.value)==null?void 0:W.trim())||"",$=g.filter(I=>I.checked).map(I=>I.value);if(!x){F("Укажіть тему для генерації завдання.","error"),i==null||i.focus();return}if(!$.length&&typeof ee=="function"){F("Оберіть принаймні один тип завдання.","error");return}const P=an(x)||"task";F(`Генеруємо ${$.length} тип(и) завдань…`,"loading"),o&&(o.disabled=!0,o.dataset.originalText=o.dataset.originalText||o.textContent,o.textContent="Генерація…"),String(D.category||"").toLowerCase();const N=void 0;try{const I=$.map(R=>Jt(x,R,{items:E,language:"en",seedId:`${P}-${R}`,...T?{additionalInstructions:T}:{}},N).then(B=>({type:R,task:B}))),_=await Promise.allSettled(I),z=_.map((R,B)=>R.status==="fulfilled"?{type:$[B],task:R.value.task}:null).filter(Boolean),ae=_.map((R,B)=>R.status==="rejected"?$[B]:null).filter(Boolean);if(!z.length)throw new Error("Не вдалося згенерувати жодного типу завдань");const ie=[];z.forEach(({type:R,task:B})=>{const se={...B};se.id||(se.id=`${R}-${P}-${Date.now().toString(36)}${Math.random().toString(36).slice(2,6)}`);const be=nn(se);ie.push({task:se,key:be})}),cn(),window.practice&&typeof window.practice.appendTask=="function"&&(pn(),ie.forEach(({task:R,key:B})=>{window.practice.appendTask(R,{key:B})})),ee();const me=z.map(({type:R})=>R).join(", ");ae.length?F(`Згенеровано: ${me}. Помилки: ${ae.join(", ")}`,"success"):F(`Готово! Додано ${z.length} блок(и): ${me}.`,"success")}catch(I){console.error(I);const _=I instanceof Error&&I.message?`Помилка: ${I.message}`:"Не вдалося згенерувати завдання. Перевірте токен або спробуйте ще раз.";F(_,"error")}finally{if(o){const I=o.dataset.originalText||"Згенерувати завдання";o.disabled=!1,o.textContent=I}}}async function hn(){if(!he)return;const n=he.textContent;if(n)try{await navigator.clipboard.writeText(n),F("JSON скопійовано у буфер.","success")}catch(o){console.error(o),F("Не вдалося скопіювати JSON. Спробуйте вручну.","error")}}function mn(n){return`${$e(D.id)||$e(n.title)||$e(D.title)||"practice"||"practice"}.json`}async function fn(){const n=st(),o=JSON.stringify(n,null,2);if(!o||o==="{}"||o==="[]"){F("Немає даних для завантаження.","error");return}try{const i=new Blob([o],{type:"application/json"}),e=URL.createObjectURL(i),m=document.createElement("a");m.href=e,m.download=mn(n),document.body.appendChild(m),m.click(),document.body.removeChild(m),URL.revokeObjectURL(e),F("Файл завантажено.","success")}catch(i){console.error(i),F("Не вдалося завантажити файл.","error")}}function yn(){if(U){if(on(),U.addEventListener("submit",un),re&&(re.addEventListener("click",hn),re.disabled=!0),oe&&(oe.addEventListener("click",fn),oe.disabled=!0),G&&X&&fe){G.setAttribute("aria-haspopup","true"),G.setAttribute("aria-expanded","false"),G.addEventListener("click",()=>{ln()});const n=i=>{fe.contains(i.target)||ee()};document.addEventListener("pointerdown",n);const o=i=>{const e=i.relatedTarget;(!e||!fe.contains(e))&&ee()};fe.addEventListener("focusout",o),document.addEventListener("keydown",i=>{i.key==="Escape"&&(ee(),G.focus())}),Ne().forEach(i=>{i.addEventListener("change",()=>{Me()})}),Me(),U.addEventListener("submit",()=>{ee()})}document.addEventListener("practice:taskRemoved",n=>{const o=n.detail||{};rn(o.key,o.task)}),document.addEventListener("practice:dataLoaded",n=>{const o=n.detail;le.length=0,o&&Array.isArray(o.entries)?(Y=o.title??Y,V=o.level??V,o.entries.forEach(({task:i,key:e})=>{const m=e||Ie(i);le.push({key:m,data:i})})):o&&Array.isArray(o.tasks)?(Y=o.title??Y,V=o.level??V,o.tasks.forEach(i=>{const e=i&&i.id?String(i.id):Ie(i);le.push({key:e,data:i})})):o?(Y=o.title??Y,V=o.level??V):(Y=D.title||Y,V=D.level||V),ce(),Le()}),Le(),ce(),document.addEventListener("keydown",n=>{n.code&&n.code==="KeyH"&&n.ctrlKey&&n.shiftKey&&(n.preventDefault(),dn())})}}yn();
//# sourceMappingURL=lesson.js.map
