import{l as pe,a as fe}from"./assets/lessons-BF2nmHKJ.js";const ye={BASE_URL:"/english-teacher-platform/",DEV:!1,MODE:"production",PROD:!0,SSR:!1},j=typeof import.meta<"u"&&ye&&"/english-teacher-platform/"||"/";function he(e){const t=j.endsWith("/")?j:`${j}/`,n=String(e||"");return n.startsWith(t)?n:`${t}${n.replace(/^\/+/,"")}`}const T=new URLSearchParams(window.location.search),N=T.get("topic"),ee=T.get("title"),te=T.get("category"),ne=T.get("level"),re=T.get("file"),i=N?pe.find(e=>e.id===N):void 0,U=(i==null?void 0:i.title)??(ee?decodeURIComponent(ee):"Матеріал уроку"),J=(i==null?void 0:i.category)??(te?decodeURIComponent(te):""),D=(i==null?void 0:i.level)??(ne?decodeURIComponent(ne):""),G=(()=>{const e=(i==null?void 0:i.htmlPath)??(re?decodeURIComponent(re):null);return e&&e.startsWith("lessons/")?e:null})();window.lessonContext={id:(i==null?void 0:i.id)??N??null,title:U,category:J,level:D,htmlPath:G};const oe=document.querySelector("[data-lesson-title]"),se=document.querySelector("[data-lesson-category]"),ae=document.querySelector("[data-lesson-level]"),A=document.querySelector("[data-lesson-status]"),ie=document.getElementById("lesson-content");function ge(){const e=document.querySelector('[data-component="copyright-year"]');e&&(e.textContent=String(new Date().getFullYear()))}function Se(){var n;oe&&(oe.textContent=U);const t=(((n=fe[J])==null?void 0:n.label)??"")||J;se&&(se.textContent=t||""),ae&&(ae.textContent=D?`Рівень: ${D}`:""),document.title=`${U} | English Teacher Platform`}async function we(){if(ie){if(!G){A&&(A.textContent="Не вдалося визначити файл з матеріалом. Перейдіть назад та оберіть тему зі списку.");return}try{const e=await fetch(he(G));if(!e.ok)throw new Error(`Не вдалося завантажити файл: ${e.status}`);const t=await e.text();ie.innerHTML=t}catch(e){A&&(A.textContent="Сталася помилка під час завантаження матеріалу. Спробуйте пізніше або поверніться до каталогу."),console.error(e)}}}function $e(){ge(),Se(),we()}$e();const be=async e=>{const n="https://vq1wtq2d2l.execute-api.us-east-2.amazonaws.com/dev"+"/openai";return await fetch(n,{method:"POST",body:JSON.stringify(e),headers:{"Content-Type":"application/json"}}).then(o=>o.json())},ke=async(e,t,n={})=>{const r=ve(e,t,n),o=await be(r);try{return typeof o=="string"?JSON.parse(o):o}catch{const l=typeof o=="string"?o.match(/\{[\s\S]*\}$/):null;if(l)return JSON.parse(l[0]);throw new Error("Не вдалося розпарсити JSON відповіді моделі")}};function ve(e,t,n={}){const r=localStorage.getItem("gptToken");if(!r||(r==null?void 0:r.length)<10){console.warn("⚠️ gptToken відсутній у localStorage");const L=prompt("Enter Your GPT Token");localStorage.setItem("gptToken",L)}const o="gpt-4o-mini",a=String(t||"").trim().toLowerCase(),{system:l,user:f}=Ee(e,a,n);return{token:r,model:o,messages:[{role:"system",content:l},{role:"user",content:f}],temperature:.3,max_tokens:4e3}}function Ee(e,t,n){n.language;const r=Number.isInteger(n.items)?n.items:qe[t]||10,o=n.seedId||xe(e),a=`
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
      `.trim(),user:w(e,"gap",r)},transform:{system:`
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
      `.trim(),user:w(e,"transform",r)},match:{system:`
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
      `.trim(),user:w(e,"match",r)},error:{system:`
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
      `.trim(),user:w(e,"error",r)},order:{system:`
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
      `.trim(),user:w(e,"order",r)},short:{system:`
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
      `.trim(),user:w(e,"short",r)},writing:{system:`
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
      `.trim(),user:w(e,"writing",r)},context:{system:`
${a}
СХЕМА ВИХОДУ:
{
  "id": "context-${o}-1",
  "type": "context",
  "prompt": "<інструкція англійською>",
  "context": {
    "title": "<2–4 слова>",
    "format": "dialog" | "narrative",
    "body": []
  },
  "questions": [
    {
      "q": "<питання>",
      "choices": ["<варіант0>", "<варіант1>", "<варіант2>"],
      "answer": ["<index_правильної_відповіді_рядком>"]
    },
    ...
  ]
}

ВИМОГИ:
- ${r} питань для тексту.
- Текст максимум 200 слів, простими фразами рівня A1.
- Якщо format = "dialog" — масив об'єктів {"speaker": "...", "line": "..."}.
- Якщо format = "narrative" — масив рядків, кожен рядок = короткий абзац.
- Питання перевіряють розуміння тексту.
- У choices завжди 3 варіанти, лише один правильний.
- Правильна відповідь — індекс рядком ("0" | "1" | "2").
- ЖОДНОГО додаткового тексту поза JSON.

ПРИКЛАД (АНАЛОГІЧНИЙ; НЕ КОПІЮВАТИ ЗМІСТ):
{
  "id": "context-ps-1",
  "type": "context",
  "prompt": "Прочитайте діалог та оберіть правильну відповідь.",
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
}`.trim(),user:w(e,"context",r)}},f=l[t];return f||l.mcq}const qe={mcq:10,gap:10,transform:10,match:8,error:10,order:10,short:3,writing:1,context:4};function w(e,t,n){return`Тема: ${e}
Згенеруй блок типу "${t}" з кількістю пунктів: ${n}. Поверни строго JSON за описаною схемою.`}function xe(e){return String(e||"task").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,6)||"task"}const ce=document.querySelector(".js-practice-section"),s=document.querySelector("[data-practice-generator]"),R=s==null?void 0:s.querySelector("[data-practice-status]"),I=document.querySelector("[data-generator-output]"),x=document.querySelector("[data-generator-json]"),b=document.querySelector("[data-generator-copy]"),k=document.querySelector("[data-generator-download]"),O=s==null?void 0:s.querySelector("[data-types]"),m=s==null?void 0:s.querySelector("[data-types-trigger]"),S=s==null?void 0:s.querySelector("[data-types-panel]"),le=document.querySelector("[data-practice-placeholder]"),p=window.lessonContext||{};let h=p.title||"Generated Practice",g=p.level||"custom";const v=[],B=[];function E(e){e&&e.classList.add("hidden")}function K(e){e&&e.classList.remove("hidden")}function de(e){return!e||e.classList.contains("hidden")}function W(){return localStorage.getItem("hideGenerateSection")==="true"}function H(){W()?(E(ce),E(S),E(I),$()):(K(ce),z(),q())}function F(e){return`${e&&typeof e=="object"&&e.id?String(e.id):String((e==null?void 0:e.type)||"task")}-${Date.now()}-${Math.random().toString(16).slice(2,8)}`}function ue(){return{title:h||p.title||"Generated Practice",level:g||p.level||"custom",tasks:[...v,...B].map(e=>e.data)}}function q(){if(x){if(W()){E(I);return}if(!v.length&&!B.length){x.textContent="",E(I),b&&(b.disabled=!0),k&&(k.disabled=!0);return}x.textContent=JSON.stringify(ue(),null,2),K(I),b&&(b.disabled=!1),k&&(k.disabled=!1)}}function Te(e){const t=F(e);return B.push({key:t,data:e}),q(),t}function Le(e,t){const n=o=>{const a=o.findIndex(l=>e&&l.key===e||l.data===t);return a!==-1?(o.splice(a,1),!0):!1};(n(B)||n(v))&&q()}function Ce(){if(!s)return;const e=s.querySelector('[name="topic"]');if(e&&!e.value){const t=p.title||"Lesson topic";e.value=t}}function u(e,t="idle"){R&&(R.textContent=e,R.dataset.state=t)}function _e(e){return String(e||"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,8)}function M(e){return String(e||"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")}function V(){return Array.from(s.querySelectorAll('input[name="types"]'))}function Pe(e){const t=e.filter(n=>n.checked).map(n=>{var r,o;return(o=(r=n.nextElementSibling)==null?void 0:r.textContent)==null?void 0:o.trim()}).filter(Boolean);return t.length?t.length<=2?t.join(", "):`${t.slice(0,2).join(", ")} +${t.length-2}`:"Оберіть типи"}function z(){if(!m)return;const e=V();m.textContent=Pe(e)}function $(){!S||!m||de(S)||(E(S),m.setAttribute("aria-expanded","false"))}function Ae(){if(!S||!m)return;if(de(S)){K(S),m.setAttribute("aria-expanded","true");const t=S.querySelector('input[name="types"]');t==null||t.focus({preventScroll:!0})}else $()}function Oe(){const e=!W();localStorage.setItem("hideGenerateSection",String(e)),H(),q()}function Ie(){const e=document.getElementById("practice"),t=e==null?void 0:e.querySelector("#practice-body");if(le&&le.remove(),t&&t.children.length===1){const n=t.firstElementChild;n&&/практика поки відсутня/i.test(n.textContent||"")&&n.remove()}}function Be(){const e=document.getElementById("practice");if(!e)return;const t=e.querySelector("#practice-body");if(t&&!t.querySelector(".practice-dynamic-title")){const n=document.createElement("div");n.className="practice-dynamic-title",n.innerHTML=`
      <h2>Згенеровані завдання</h2>
      ${p.level?`<p class="muted">Рівень: ${p.level}</p>`:""}
    `,t.prepend(n)}}async function je(e){var Y;if(e.preventDefault(),!s)return;const t=s.querySelector('button[type="submit"]'),n=s.querySelector('[name="topic"]'),r=s.querySelector('[name="count"]'),o=V(),a=(Y=n==null?void 0:n.value)==null?void 0:Y.trim(),l=Number.parseInt((r==null?void 0:r.value)||"10",10)||10,f=o.filter(d=>d.checked).map(d=>d.value);if(!a){u("Укажіть тему для генерації завдання.","error"),n==null||n.focus();return}if(!f.length&&typeof $=="function"){u("Оберіть принаймні один тип завдання.","error");return}const L=_e(a)||"task";u(`Генеруємо ${f.length} тип(и) завдань…`,"loading"),t&&(t.disabled=!0,t.dataset.originalText=t.dataset.originalText||t.textContent,t.textContent="Генерація…");try{const d=f.map(c=>ke(a,c,{items:l,language:"uk",seedId:`${L}-${c}`}).then(y=>({type:c,task:y}))),C=await Promise.allSettled(d),_=C.map((c,y)=>c.status==="fulfilled"?{type:f[y],task:c.value.task}:null).filter(Boolean),Q=C.map((c,y)=>c.status==="rejected"?f[y]:null).filter(Boolean);if(!_.length)throw new Error("Не вдалося згенерувати жодного типу завдань");const X=[];_.forEach(({type:c,task:y})=>{const P={...y};P.id||(P.id=`${c}-${L}-${Date.now().toString(36)}${Math.random().toString(36).slice(2,6)}`);const me=Te(P);X.push({task:P,key:me})}),Ie(),window.practice&&typeof window.practice.appendTask=="function"&&(Be(),X.forEach(({task:c,key:y})=>{window.practice.appendTask(c,{key:y})})),$();const Z=_.map(({type:c})=>c).join(", ");Q.length?u(`Згенеровано: ${Z}. Помилки: ${Q.join(", ")}`,"success"):u(`Готово! Додано ${_.length} блок(и): ${Z}.`,"success")}catch(d){console.error(d);const C=d instanceof Error&&d.message?`Помилка: ${d.message}`:"Не вдалося згенерувати завдання. Перевірте токен або спробуйте ще раз.";u(C,"error")}finally{if(t){const d=t.dataset.originalText||"Згенерувати завдання";t.disabled=!1,t.textContent=d}}}async function Re(){if(!x)return;const e=x.textContent;if(e)try{await navigator.clipboard.writeText(e),u("JSON скопійовано у буфер.","success")}catch(t){console.error(t),u("Не вдалося скопіювати JSON. Спробуйте вручну.","error")}}function Me(e){return`${M(p.id)||M(e.title)||M(p.title)||"practice"||"practice"}.json`}async function Ne(){const e=ue(),t=JSON.stringify(e,null,2);if(!t||t==="{}"||t==="[]"){u("Немає даних для завантаження.","error");return}try{const n=new Blob([t],{type:"application/json"}),r=URL.createObjectURL(n),o=document.createElement("a");o.href=r,o.download=Me(e),document.body.appendChild(o),o.click(),document.body.removeChild(o),URL.revokeObjectURL(r),u("Файл завантажено.","success")}catch(n){console.error(n),u("Не вдалося завантажити файл.","error")}}function Ue(){if(s){if(Ce(),s.addEventListener("submit",je),b&&(b.addEventListener("click",Re),b.disabled=!0),k&&(k.addEventListener("click",Ne),k.disabled=!0),m&&S&&O){m.setAttribute("aria-haspopup","true"),m.setAttribute("aria-expanded","false"),m.addEventListener("click",()=>{Ae()});const e=n=>{O.contains(n.target)||$()};document.addEventListener("pointerdown",e);const t=n=>{const r=n.relatedTarget;(!r||!O.contains(r))&&$()};O.addEventListener("focusout",t),document.addEventListener("keydown",n=>{n.key==="Escape"&&($(),m.focus())}),V().forEach(n=>{n.addEventListener("change",()=>{z()})}),z(),s.addEventListener("submit",()=>{$()})}document.addEventListener("practice:taskRemoved",e=>{const t=e.detail||{};Le(t.key,t.task)}),document.addEventListener("practice:dataLoaded",e=>{const t=e.detail;v.length=0,t&&Array.isArray(t.entries)?(h=t.title??h,g=t.level??g,t.entries.forEach(({task:n,key:r})=>{const o=r||F(n);v.push({key:o,data:n})})):t&&Array.isArray(t.tasks)?(h=t.title??h,g=t.level??g,t.tasks.forEach(n=>{const r=n&&n.id?String(n.id):F(n);v.push({key:r,data:n})})):t?(h=t.title??h,g=t.level??g):(h=p.title||h,g=p.level||g),q(),H()}),H(),q(),document.addEventListener("keydown",e=>{e.code&&e.code==="KeyH"&&e.ctrlKey&&e.shiftKey&&(e.preventDefault(),Oe())})}}Ue();
//# sourceMappingURL=lesson.js.map
