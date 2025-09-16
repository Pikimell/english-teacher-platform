import{l as pe,a as fe}from"./assets/lessons-ClpnWO2D.js";const ye={BASE_URL:"/english-teacher-platform/",DEV:!1,MODE:"production",PROD:!0,SSR:!1},R=typeof import.meta<"u"&&ye&&"/english-teacher-platform/"||"/";function ge(e){const t=R.endsWith("/")?R:`${R}/`,n=String(e||"");return n.startsWith(t)?n:`${t}${n.replace(/^\/+/,"")}`}const L=new URLSearchParams(window.location.search),U=L.get("topic"),ee=L.get("title"),te=L.get("category"),ne=L.get("level"),re=L.get("file"),i=U?pe.find(e=>e.id===U):void 0,M=(i==null?void 0:i.title)??(ee?decodeURIComponent(ee):"Матеріал уроку"),J=(i==null?void 0:i.category)??(te?decodeURIComponent(te):""),D=(i==null?void 0:i.level)??(ne?decodeURIComponent(ne):""),G=(()=>{const e=(i==null?void 0:i.htmlPath)??(re?decodeURIComponent(re):null);return e&&e.startsWith("lessons/")?e:null})();window.lessonContext={id:(i==null?void 0:i.id)??U??null,title:M,category:J,level:D,htmlPath:G};const oe=document.querySelector("[data-lesson-title]"),se=document.querySelector("[data-lesson-category]"),ae=document.querySelector("[data-lesson-level]"),O=document.querySelector("[data-lesson-status]"),ie=document.getElementById("lesson-content");function he(){const e=document.querySelector('[data-component="copyright-year"]');e&&(e.textContent=String(new Date().getFullYear()))}function Se(){var n;oe&&(oe.textContent=M);const t=(((n=fe[J])==null?void 0:n.label)??"")||J;se&&(se.textContent=t||""),ae&&(ae.textContent=D?`Рівень: ${D}`:""),document.title=`${M} | English Teacher Platform`}async function we(){if(ie){if(!G){O&&(O.textContent="Не вдалося визначити файл з матеріалом. Перейдіть назад та оберіть тему зі списку.");return}try{const e=await fetch(ge(G));if(!e.ok)throw new Error(`Не вдалося завантажити файл: ${e.status}`);const t=await e.text();ie.innerHTML=t}catch(e){O&&(O.textContent="Сталася помилка під час завантаження матеріалу. Спробуйте пізніше або поверніться до каталогу."),console.error(e)}}}function $e(){he(),Se(),we()}$e();const ve=async e=>{const n="https://vq1wtq2d2l.execute-api.us-east-2.amazonaws.com/dev"+"/openai";return await fetch(n,{method:"POST",body:JSON.stringify(e),headers:{"Content-Type":"application/json"}}).then(o=>o.json())},be=async(e,t,n={})=>{const r=ke(e,t,n),o=await ve(r);try{return typeof o=="string"?JSON.parse(o):o}catch{const l=typeof o=="string"?o.match(/\{[\s\S]*\}$/):null;if(l)return JSON.parse(l[0]);throw new Error("Не вдалося розпарсити JSON відповіді моделі")}};function ke(e,t,n={}){const r=localStorage.getItem("gptToken");if(!r||(r==null?void 0:r.length)<10){console.warn("⚠️ gptToken відсутній у localStorage");const C=prompt("Enter Your GPT Token");localStorage.setItem("gptToken",C)}const o="gpt-4o-mini",a=String(t||"").trim().toLowerCase(),{system:l,user:f}=Ee(e,a,n);return{token:r,model:o,messages:[{role:"system",content:l},{role:"user",content:f}],temperature:.3,max_tokens:4e3}}function Ee(e,t,n){n.language;const r=Number.isInteger(n.items)?n.items:qe[t]||10,o=n.seedId||Te(e),a=`
ТИ — генератор навчальних завдань з англійської мови.
МЕТА: Згенерувати ОДИН блок завдань типу "${t}" по темі "${e}".
ПОВЕРТАЙ ЛИШЕ ВАЛІДНИЙ JSON. Узгоджуйся рівнем А1–A2.
Мова інтерфейсу — українська.
Кодування — UTF-8. Без пояснень, без префіксів, без \`\`\`.
Верифікуй внутрішню узгодженість (варіанти відповіді відповідають правилу/темі).
`,l={mcq:{system:`
${a}
СХЕМА ВИХОДУ:
{
  "id": "mcq-${o}-1",
  "type": "mcq",
  "prompt": "<коротка інструкція українською>",
  "items": [
    {
      "q": "<питання зі зниклою формою>",
      "choices": ["<варіант0>", "<варіант1>", "<варіант2>"],
      "answer": ["<index_правильної_відповіді_рядком>"]
    },
    ...
  ]
}

ВИМОГИ:
- ${r} пунктів.
- Формат як у прикладі нижче.
- У choices рівно 3 варіанти, лише один правильний.
- Правильна відповідь — індекс як рядок: "0" | "1" | "2".
- Питання та варіанти короткі, природні, у темі "${e}".
- ЖОДНОГО додаткового тексту поза JSON.

ПРИКЛАД (АНАЛОГІЧНИЙ; НЕ КОПІЮВАТИ ДОКЛАДНО ЗМІСТ):
{
  "id": "mcq-ps-1",
  "type": "mcq",
  "prompt": "Обери правильну форму (Present Simple)",
  "items": [
    { "q": "He usually ___ the bus to work.", "choices": ["take", "takes", "is taking"], "answer": ["1"] },
    { "q": "They ___ coffee in the morning.", "choices": ["have", "haves", "are having"], "answer": ["0"] }
  ]
}
      `.trim(),user:`
Тема: ${e}
Згенеруй блок типу "mcq" строго за СХЕМОЮ ВИХОДУ.
Кількість пунктів: ${r}.
      `.trim()},gap:{system:`
${a}
СХЕМА ВИХОДУ:
{
  "id": "gap-${o}-1",
  "type": "gap",
  "prompt": "<інструкція>",
  "items": [
    { "q": "<They ___ (work) on Sundays.>", "answer": ["<правильна форма>", "<альтернатива_якщо_є>"] },
    ...
  ]
}
ВИМОГИ:
- ${r} пунктів.
- В полі "answer" завжди масив зі щонайменше одним варіантом.
- Коротко, рівень А1–A2.
      `.trim(),user:$(e,"gap",r)},transform:{system:`
${a}
СХЕМА ВИХОДУ:
{
  "id": "transform-${o}-1",
  "type": "transform",
  "prompt": "Перетвори на заперечення (Present Simple, без крапки)",
  "items": [
    {
      "q": "She likes coffee.",
      "hint": "використай doesn't; без крапки",
      "answer": ["she doesn't like coffee", "she does not like coffee"]
    }
  ]
}
ВИМОГИ:
- ${r} пунктів.
- Усі відповіді — без фінальної крапки (якщо так вказано в prompt).
- Дай корисний "hint".
      `.trim(),user:$(e,"transform",r)},match:{system:`
${a}
СХЕМА ВИХОДУ:
{
  "id": "match-${o}-1",
  "type": "match",
  "prompt": "Зістав: дієслово → форма 3-ї особи (he/she/it)",
  "pairs": [
    { "left": "go", "right": "goes" },
    ...
  ]
}
ВИМОГИ:
- Кількість пар: ${Math.max(6,Math.min(12,r))}.
- Однозначні відповідності (без омонімії у межах набору).
      `.trim(),user:$(e,"match",r)},error:{system:`
${a}
СХЕМА ВИХОДУ:
{
  "id": "error-${o}-1",
  "type": "error",
  "prompt": "Знайди й виправ помилку (Present Simple, без крапки)",
  "items": [
    { "q": "She don't like tea.", "hint": "doesn't + V", "answer": ["she doesn't like tea", "she does not like tea"] }
  ]
}
ВИМОГИ:
- ${r} пунктів.
- У кожному "q" повинна бути типова помилка саме з теми "${e}".
- "answer" — без фінальної крапки, якщо так зазначено в prompt.
      `.trim(),user:$(e,"error",r)},order:{system:`
${a}
СХЕМА ВИХОДУ:
{
  "id": "order-${o}-1",
  "type": "order",
  "prompt": "Постав слова в правильному порядку",
  "items": [
    { "q": "Впорядкуй речення", "tokens": ["she", "often", "reads", "books"], "answer": "she often reads books" }
  ]
}
ВИМОГИ:
- ${r} пунктів.
- "tokens" мають складати саме правильну відповідь.
- Відповідь без крапки, якщо не потрібно.
      `.trim(),user:$(e,"order",r)},short:{system:`
${a}
СХЕМА ВИХОДУ:
{
  "id": "short-${o}-1",
  "type": "short",
  "prompt": "Короткі відповіді: ${e}",
  "items": [
    { "q": "Напиши 2–3 речення про свою щоденну рутину.", "keywords": ["i", "usually", "every"] }
  ]
}
ВИМОГИ:
- ${Math.min(6,Math.max(3,Math.floor(r/2)))} пунктів (короткі письмові міні-завдання).
- Ключові слова — підказка, а не жорстка вимога.
      `.trim(),user:$(e,"short",r)},writing:{system:`
${a}
СХЕМА ВИХОДУ:
{
  "id": "writing-${o}-1",
  "type": "writing",
  "prompt": "Міні-письмо по темі ${e}",
  "description": "<1–2 речення з умовою>",
  "checklist": [
    "<критерій 1>",
    "<критерій 2>",
    "<критерій 3>"
  ]
}
ВИМОГИ:
- Чітка інструкція в "description".
- 4–6 пунктів у "checklist" з конкретними критеріями перевірки.
      `.trim(),user:$(e,"writing",r)}},f=l[t];return f||l.mcq}const qe={mcq:10,gap:10,transform:10,match:8,error:10,order:10,short:3,writing:1};function $(e,t,n){return`Тема: ${e}
Згенеруй блок типу "${t}" з кількістю пунктів: ${n}. Поверни строго JSON за описаною схемою.`}function Te(e){return String(e||"task").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,6)||"task"}const ce=document.querySelector("[data-practice-admin]"),s=document.querySelector("[data-practice-generator]"),j=s==null?void 0:s.querySelector("[data-practice-status]"),B=document.querySelector("[data-generator-output]"),T=document.querySelector("[data-generator-json]"),v=document.querySelector("[data-generator-copy]"),b=document.querySelector("[data-generator-download]"),A=s==null?void 0:s.querySelector("[data-types]"),m=s==null?void 0:s.querySelector("[data-types-trigger]"),S=s==null?void 0:s.querySelector("[data-types-panel]"),le=document.querySelector("[data-practice-placeholder]"),p=window.lessonContext||{};let g=p.title||"Generated Practice",h=p.level||"custom";const k=[],I=[];function E(e){e&&e.classList.add("hidden")}function K(e){e&&e.classList.remove("hidden")}function de(e){return!e||e.classList.contains("hidden")}function W(){return localStorage.getItem("hideGenerateSection")==="true"}function F(){W()?(E(ce),E(S),E(B),w()):(K(ce),z(),q())}function H(e){return`${e&&typeof e=="object"&&e.id?String(e.id):String((e==null?void 0:e.type)||"task")}-${Date.now()}-${Math.random().toString(16).slice(2,8)}`}function ue(){return{title:g||p.title||"Generated Practice",level:h||p.level||"custom",tasks:[...k,...I].map(e=>e.data)}}function q(){if(T){if(W()){E(B);return}if(!k.length&&!I.length){T.textContent="",E(B),v&&(v.disabled=!0),b&&(b.disabled=!0);return}T.textContent=JSON.stringify(ue(),null,2),K(B),v&&(v.disabled=!1),b&&(b.disabled=!1)}}function Le(e){const t=H(e);return I.push({key:t,data:e}),q(),t}function Ce(e,t){const n=o=>{const a=o.findIndex(l=>e&&l.key===e||l.data===t);return a!==-1?(o.splice(a,1),!0):!1};(n(I)||n(k))&&q()}function xe(){if(!s)return;const e=s.querySelector('[name="topic"]');if(e&&!e.value){const t=p.title||"Lesson topic";e.value=t}}function u(e,t="idle"){j&&(j.textContent=e,j.dataset.state=t)}function Pe(e){return String(e||"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,8)}function N(e){return String(e||"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")}function V(){return Array.from(s.querySelectorAll('input[name="types"]'))}function _e(e){const t=e.filter(n=>n.checked).map(n=>{var r,o;return(o=(r=n.nextElementSibling)==null?void 0:r.textContent)==null?void 0:o.trim()}).filter(Boolean);return t.length?t.length<=2?t.join(", "):`${t.slice(0,2).join(", ")} +${t.length-2}`:"Оберіть типи"}function z(){if(!m)return;const e=V();m.textContent=_e(e)}function w(){!S||!m||de(S)||(E(S),m.setAttribute("aria-expanded","false"))}function Oe(){if(!S||!m)return;if(de(S)){K(S),m.setAttribute("aria-expanded","true");const t=S.querySelector('input[name="types"]');t==null||t.focus({preventScroll:!0})}else w()}function Ae(){const e=!W();localStorage.setItem("hideGenerateSection",String(e)),F(),q()}function Be(){const e=document.getElementById("practice"),t=e==null?void 0:e.querySelector("#practice-body");if(le&&le.remove(),t&&t.children.length===1){const n=t.firstElementChild;n&&/практика поки відсутня/i.test(n.textContent||"")&&n.remove()}}function Ie(){const e=document.getElementById("practice");if(!e)return;const t=e.querySelector("#practice-body");if(t&&!t.querySelector(".practice-dynamic-title")){const n=document.createElement("div");n.className="practice-dynamic-title",n.innerHTML=`
      <h2>Згенеровані завдання</h2>
      ${p.level?`<p class="muted">Рівень: ${p.level}</p>`:""}
    `,t.prepend(n)}}async function Re(e){var Y;if(e.preventDefault(),!s)return;const t=s.querySelector('button[type="submit"]'),n=s.querySelector('[name="topic"]'),r=s.querySelector('[name="count"]'),o=V(),a=(Y=n==null?void 0:n.value)==null?void 0:Y.trim(),l=Number.parseInt((r==null?void 0:r.value)||"10",10)||10,f=o.filter(d=>d.checked).map(d=>d.value);if(!a){u("Укажіть тему для генерації завдання.","error"),n==null||n.focus();return}if(!f.length&&typeof w=="function"){u("Оберіть принаймні один тип завдання.","error");return}const C=Pe(a)||"task";u(`Генеруємо ${f.length} тип(и) завдань…`,"loading"),t&&(t.disabled=!0,t.dataset.originalText=t.dataset.originalText||t.textContent,t.textContent="Генерація…");try{const d=f.map(c=>be(a,c,{items:l,language:"uk",seedId:`${C}-${c}`}).then(y=>({type:c,task:y}))),x=await Promise.allSettled(d),P=x.map((c,y)=>c.status==="fulfilled"?{type:f[y],task:c.value.task}:null).filter(Boolean),Q=x.map((c,y)=>c.status==="rejected"?f[y]:null).filter(Boolean);if(!P.length)throw new Error("Не вдалося згенерувати жодного типу завдань");const X=[];P.forEach(({type:c,task:y})=>{const _={...y};_.id||(_.id=`${c}-${C}-${Date.now().toString(36)}${Math.random().toString(36).slice(2,6)}`);const me=Le(_);X.push({task:_,key:me})}),Be(),window.practice&&typeof window.practice.appendTask=="function"&&(Ie(),X.forEach(({task:c,key:y})=>{window.practice.appendTask(c,{key:y})})),w();const Z=P.map(({type:c})=>c).join(", ");Q.length?u(`Згенеровано: ${Z}. Помилки: ${Q.join(", ")}`,"success"):u(`Готово! Додано ${P.length} блок(и): ${Z}.`,"success")}catch(d){console.error(d);const x=d instanceof Error&&d.message?`Помилка: ${d.message}`:"Не вдалося згенерувати завдання. Перевірте токен або спробуйте ще раз.";u(x,"error")}finally{if(t){const d=t.dataset.originalText||"Згенерувати завдання";t.disabled=!1,t.textContent=d}}}async function je(){if(!T)return;const e=T.textContent;if(e)try{await navigator.clipboard.writeText(e),u("JSON скопійовано у буфер.","success")}catch(t){console.error(t),u("Не вдалося скопіювати JSON. Спробуйте вручну.","error")}}function Ne(e){return`${N(p.id)||N(e.title)||N(p.title)||"practice"||"practice"}.json`}async function Ue(){const e=ue(),t=JSON.stringify(e,null,2);if(!t||t==="{}"||t==="[]"){u("Немає даних для завантаження.","error");return}try{const n=new Blob([t],{type:"application/json"}),r=URL.createObjectURL(n),o=document.createElement("a");o.href=r,o.download=Ne(e),document.body.appendChild(o),o.click(),document.body.removeChild(o),URL.revokeObjectURL(r),u("Файл завантажено.","success")}catch(n){console.error(n),u("Не вдалося завантажити файл.","error")}}function Me(){if(s){if(xe(),s.addEventListener("submit",Re),v&&(v.addEventListener("click",je),v.disabled=!0),b&&(b.addEventListener("click",Ue),b.disabled=!0),m&&S&&A){m.setAttribute("aria-haspopup","true"),m.setAttribute("aria-expanded","false"),m.addEventListener("click",()=>{Oe()});const e=n=>{A.contains(n.target)||w()};document.addEventListener("pointerdown",e);const t=n=>{const r=n.relatedTarget;(!r||!A.contains(r))&&w()};A.addEventListener("focusout",t),document.addEventListener("keydown",n=>{n.key==="Escape"&&(w(),m.focus())}),V().forEach(n=>{n.addEventListener("change",()=>{z()})}),z(),s.addEventListener("submit",()=>{w()})}document.addEventListener("practice:taskRemoved",e=>{const t=e.detail||{};Ce(t.key,t.task)}),document.addEventListener("practice:dataLoaded",e=>{const t=e.detail;k.length=0,t&&Array.isArray(t.entries)?(g=t.title??g,h=t.level??h,t.entries.forEach(({task:n,key:r})=>{const o=r||H(n);k.push({key:o,data:n})})):t&&Array.isArray(t.tasks)?(g=t.title??g,h=t.level??h,t.tasks.forEach(n=>{const r=n&&n.id?String(n.id):H(n);k.push({key:r,data:n})})):t?(g=t.title??g,h=t.level??h):(g=p.title||g,h=p.level||h),q(),F()}),F(),q(),document.addEventListener("keydown",e=>{e.code&&e.code==="KeyH"&&e.ctrlKey&&e.shiftKey&&(e.preventDefault(),Ae())})}}Me();
//# sourceMappingURL=lesson.js.map
