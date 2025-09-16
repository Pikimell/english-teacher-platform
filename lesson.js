import{l as me,a as pe}from"./assets/lessons-ClpnWO2D.js";const L=new URLSearchParams(window.location.search),R=L.get("topic"),Z=L.get("title"),ee=L.get("category"),te=L.get("level"),ne=L.get("file"),i=R?me.find(e=>e.id===R):void 0,U=(i==null?void 0:i.title)??(Z?decodeURIComponent(Z):"Матеріал уроку"),J=(i==null?void 0:i.category)??(ee?decodeURIComponent(ee):""),M=(i==null?void 0:i.level)??(te?decodeURIComponent(te):""),G=(()=>{const e=(i==null?void 0:i.htmlPath)??(ne?decodeURIComponent(ne):null);return e&&e.startsWith("lessons/")?e:null})();window.lessonContext={id:(i==null?void 0:i.id)??R??null,title:U,category:J,level:M,htmlPath:G};const re=document.querySelector("[data-lesson-title]"),oe=document.querySelector("[data-lesson-category]"),se=document.querySelector("[data-lesson-level]"),O=document.querySelector("[data-lesson-status]"),ae=document.getElementById("lesson-content");function fe(){const e=document.querySelector('[data-component="copyright-year"]');e&&(e.textContent=String(new Date().getFullYear()))}function ye(){var n;re&&(re.textContent=U);const t=(((n=pe[J])==null?void 0:n.label)??"")||J;oe&&(oe.textContent=t||""),se&&(se.textContent=M?`Рівень: ${M}`:""),document.title=`${U} | English Teacher Platform`}async function ge(){if(ae){if(!G){O&&(O.textContent="Не вдалося визначити файл з матеріалом. Перейдіть назад та оберіть тему зі списку.");return}try{const e=await fetch(G);if(!e.ok)throw new Error(`Не вдалося завантажити файл: ${e.status}`);const t=await e.text();ae.innerHTML=t}catch(e){O&&(O.textContent="Сталася помилка під час завантаження матеріалу. Спробуйте пізніше або поверніться до каталогу."),console.error(e)}}}function he(){fe(),ye(),ge()}he();const Se=async e=>{const n="https://vq1wtq2d2l.execute-api.us-east-2.amazonaws.com/dev"+"/openai";return await fetch(n,{method:"POST",body:JSON.stringify(e),headers:{"Content-Type":"application/json"}}).then(o=>o.json())},we=async(e,t,n={})=>{const r=$e(e,t,n),o=await Se(r);try{return typeof o=="string"?JSON.parse(o):o}catch{const l=typeof o=="string"?o.match(/\{[\s\S]*\}$/):null;if(l)return JSON.parse(l[0]);throw new Error("Не вдалося розпарсити JSON відповіді моделі")}};function $e(e,t,n={}){const r=localStorage.getItem("gptToken");if(!r||(r==null?void 0:r.length)<10){console.warn("⚠️ gptToken відсутній у localStorage");const C=prompt("Enter Your GPT Token");localStorage.setItem("gptToken",C)}const o="gpt-4o-mini",a=String(t||"").trim().toLowerCase(),{system:l,user:f}=be(e,a,n);return{token:r,model:o,messages:[{role:"system",content:l},{role:"user",content:f}],temperature:.3,max_tokens:4e3}}function be(e,t,n){n.language;const r=Number.isInteger(n.items)?n.items:ve[t]||10,o=n.seedId||ke(e),a=`
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
      `.trim(),user:$(e,"writing",r)}},f=l[t];return f||l.mcq}const ve={mcq:10,gap:10,transform:10,match:8,error:10,order:10,short:3,writing:1};function $(e,t,n){return`Тема: ${e}
Згенеруй блок типу "${t}" з кількістю пунктів: ${n}. Поверни строго JSON за описаною схемою.`}function ke(e){return String(e||"task").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,6)||"task"}const ie=document.querySelector("[data-practice-admin]"),s=document.querySelector("[data-practice-generator]"),j=s==null?void 0:s.querySelector("[data-practice-status]"),A=document.querySelector("[data-generator-output]"),T=document.querySelector("[data-generator-json]"),b=document.querySelector("[data-generator-copy]"),v=document.querySelector("[data-generator-download]"),_=s==null?void 0:s.querySelector("[data-types]"),m=s==null?void 0:s.querySelector("[data-types-trigger]"),S=s==null?void 0:s.querySelector("[data-types-panel]"),ce=document.querySelector("[data-practice-placeholder]"),p=window.lessonContext||{};let g=p.title||"Generated Practice",h=p.level||"custom";const k=[],B=[];function E(e){e&&e.classList.add("hidden")}function z(e){e&&e.classList.remove("hidden")}function le(e){return!e||e.classList.contains("hidden")}function K(){return localStorage.getItem("hideGenerateSection")==="true"}function D(){K()?(E(ie),E(S),E(A),w()):(z(ie),H(),q())}function F(e){return`${e&&typeof e=="object"&&e.id?String(e.id):String((e==null?void 0:e.type)||"task")}-${Date.now()}-${Math.random().toString(16).slice(2,8)}`}function de(){return{title:g||p.title||"Generated Practice",level:h||p.level||"custom",tasks:[...k,...B].map(e=>e.data)}}function q(){if(T){if(K()){E(A);return}if(!k.length&&!B.length){T.textContent="",E(A),b&&(b.disabled=!0),v&&(v.disabled=!0);return}T.textContent=JSON.stringify(de(),null,2),z(A),b&&(b.disabled=!1),v&&(v.disabled=!1)}}function Ee(e){const t=F(e);return B.push({key:t,data:e}),q(),t}function qe(e,t){const n=o=>{const a=o.findIndex(l=>e&&l.key===e||l.data===t);return a!==-1?(o.splice(a,1),!0):!1};(n(B)||n(k))&&q()}function Te(){if(!s)return;const e=s.querySelector('[name="topic"]');if(e&&!e.value){const t=p.title||"Lesson topic";e.value=t}}function u(e,t="idle"){j&&(j.textContent=e,j.dataset.state=t)}function Le(e){return String(e||"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,8)}function N(e){return String(e||"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")}function V(){return Array.from(s.querySelectorAll('input[name="types"]'))}function Ce(e){const t=e.filter(n=>n.checked).map(n=>{var r,o;return(o=(r=n.nextElementSibling)==null?void 0:r.textContent)==null?void 0:o.trim()}).filter(Boolean);return t.length?t.length<=2?t.join(", "):`${t.slice(0,2).join(", ")} +${t.length-2}`:"Оберіть типи"}function H(){if(!m)return;const e=V();m.textContent=Ce(e)}function w(){!S||!m||le(S)||(E(S),m.setAttribute("aria-expanded","false"))}function xe(){if(!S||!m)return;if(le(S)){z(S),m.setAttribute("aria-expanded","true");const t=S.querySelector('input[name="types"]');t==null||t.focus({preventScroll:!0})}else w()}function Pe(){const e=!K();localStorage.setItem("hideGenerateSection",String(e)),D(),q()}function Ie(){const e=document.getElementById("practice"),t=e==null?void 0:e.querySelector("#practice-body");if(ce&&ce.remove(),t&&t.children.length===1){const n=t.firstElementChild;n&&/практика поки відсутня/i.test(n.textContent||"")&&n.remove()}}function Oe(){const e=document.getElementById("practice");if(!e)return;const t=e.querySelector("#practice-body");if(t&&!t.querySelector(".practice-dynamic-title")){const n=document.createElement("div");n.className="practice-dynamic-title",n.innerHTML=`
      <h2>Згенеровані завдання</h2>
      ${p.level?`<p class="muted">Рівень: ${p.level}</p>`:""}
    `,t.prepend(n)}}async function _e(e){var W;if(e.preventDefault(),!s)return;const t=s.querySelector('button[type="submit"]'),n=s.querySelector('[name="topic"]'),r=s.querySelector('[name="count"]'),o=V(),a=(W=n==null?void 0:n.value)==null?void 0:W.trim(),l=Number.parseInt((r==null?void 0:r.value)||"10",10)||10,f=o.filter(d=>d.checked).map(d=>d.value);if(!a){u("Укажіть тему для генерації завдання.","error"),n==null||n.focus();return}if(!f.length&&typeof w=="function"){u("Оберіть принаймні один тип завдання.","error");return}const C=Le(a)||"task";u(`Генеруємо ${f.length} тип(и) завдань…`,"loading"),t&&(t.disabled=!0,t.dataset.originalText=t.dataset.originalText||t.textContent,t.textContent="Генерація…");try{const d=f.map(c=>we(a,c,{items:l,language:"uk",seedId:`${C}-${c}`}).then(y=>({type:c,task:y}))),x=await Promise.allSettled(d),P=x.map((c,y)=>c.status==="fulfilled"?{type:f[y],task:c.value.task}:null).filter(Boolean),Y=x.map((c,y)=>c.status==="rejected"?f[y]:null).filter(Boolean);if(!P.length)throw new Error("Не вдалося згенерувати жодного типу завдань");const Q=[];P.forEach(({type:c,task:y})=>{const I={...y};I.id||(I.id=`${c}-${C}-${Date.now().toString(36)}${Math.random().toString(36).slice(2,6)}`);const ue=Ee(I);Q.push({task:I,key:ue})}),Ie(),window.practice&&typeof window.practice.appendTask=="function"&&(Oe(),Q.forEach(({task:c,key:y})=>{window.practice.appendTask(c,{key:y})})),w();const X=P.map(({type:c})=>c).join(", ");Y.length?u(`Згенеровано: ${X}. Помилки: ${Y.join(", ")}`,"success"):u(`Готово! Додано ${P.length} блок(и): ${X}.`,"success")}catch(d){console.error(d);const x=d instanceof Error&&d.message?`Помилка: ${d.message}`:"Не вдалося згенерувати завдання. Перевірте токен або спробуйте ще раз.";u(x,"error")}finally{if(t){const d=t.dataset.originalText||"Згенерувати завдання";t.disabled=!1,t.textContent=d}}}async function Ae(){if(!T)return;const e=T.textContent;if(e)try{await navigator.clipboard.writeText(e),u("JSON скопійовано у буфер.","success")}catch(t){console.error(t),u("Не вдалося скопіювати JSON. Спробуйте вручну.","error")}}function Be(e){return`${N(p.id)||N(e.title)||N(p.title)||"practice"||"practice"}.json`}async function je(){const e=de(),t=JSON.stringify(e,null,2);if(!t||t==="{}"||t==="[]"){u("Немає даних для завантаження.","error");return}try{const n=new Blob([t],{type:"application/json"}),r=URL.createObjectURL(n),o=document.createElement("a");o.href=r,o.download=Be(e),document.body.appendChild(o),o.click(),document.body.removeChild(o),URL.revokeObjectURL(r),u("Файл завантажено.","success")}catch(n){console.error(n),u("Не вдалося завантажити файл.","error")}}function Ne(){if(s){if(Te(),s.addEventListener("submit",_e),b&&(b.addEventListener("click",Ae),b.disabled=!0),v&&(v.addEventListener("click",je),v.disabled=!0),m&&S&&_){m.setAttribute("aria-haspopup","true"),m.setAttribute("aria-expanded","false"),m.addEventListener("click",()=>{xe()});const e=n=>{_.contains(n.target)||w()};document.addEventListener("pointerdown",e);const t=n=>{const r=n.relatedTarget;(!r||!_.contains(r))&&w()};_.addEventListener("focusout",t),document.addEventListener("keydown",n=>{n.key==="Escape"&&(w(),m.focus())}),V().forEach(n=>{n.addEventListener("change",()=>{H()})}),H(),s.addEventListener("submit",()=>{w()})}document.addEventListener("practice:taskRemoved",e=>{const t=e.detail||{};qe(t.key,t.task)}),document.addEventListener("practice:dataLoaded",e=>{const t=e.detail;k.length=0,t&&Array.isArray(t.entries)?(g=t.title??g,h=t.level??h,t.entries.forEach(({task:n,key:r})=>{const o=r||F(n);k.push({key:o,data:n})})):t&&Array.isArray(t.tasks)?(g=t.title??g,h=t.level??h,t.tasks.forEach(n=>{const r=n&&n.id?String(n.id):F(n);k.push({key:r,data:n})})):t?(g=t.title??g,h=t.level??h):(g=p.title||g,h=p.level||h),q(),D()}),D(),q(),document.addEventListener("keydown",e=>{e.code&&e.code==="KeyH"&&e.ctrlKey&&e.shiftKey&&(e.preventDefault(),Pe())})}}Ne();
//# sourceMappingURL=lesson.js.map
