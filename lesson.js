import"./assets/main-DFnbEuqS.js";import{s as qe,c as Ne,a as Oe,i as Re,b as He}from"./assets/practice-CEIBsXMP.js";import{l as ae,a as De,b as se}from"./assets/custom-lessons-store-BKMVZjuV.js";import{a as me,c as pe}from"./assets/custom-lesson-presets-BtHs6aRX.js";import"./assets/vendor-CWxt7QI6.js";const $e={"greetings-farewells":[{word:"Hello",translation:"Привіт",example:"Hello, nice to meet you!"},{word:"Hi",translation:"Привіт (неформально)",example:"Hi, are you ready for class?"},{word:"Good morning",translation:"Доброго ранку",example:"Good morning, Mrs Smith."},{word:"Good afternoon",translation:"Доброго дня",example:"Good afternoon, everyone."},{word:"Good evening",translation:"Доброго вечора",example:"Good evening, how was your day?"},{word:"Nice to meet you",translation:"Приємно познайомитися",example:"Nice to meet you, I'm Tom."},{word:"How are you?",translation:"Як справи?",example:"Hi, Anna! How are you?"},{word:"I'm fine, thanks",translation:"У мене все добре, дякую",example:"I'm fine, thanks. And you?"},{word:"See you later",translation:"Побачимось пізніше",example:"I have to go now. See you later!"},{word:"See you soon",translation:"До скорої зустрічі",example:"Thanks for your help. See you soon."},{word:"Goodbye",translation:"До побачення",example:"Goodbye, have a nice evening!"},{word:"Bye",translation:"Бувай",example:"Bye, talk to you tomorrow!"},{word:"Take care",translation:"Бережи себе",example:"I'm heading home now. Take care!"},{word:"Have a nice day",translation:"Гарного дня",example:"Thanks for coming. Have a nice day!"},{word:"Good night",translation:"Надобраніч",example:"It's late. Good night!"}],"personal-info-basics":[{word:"first name",translation:"ім'я",example:"My first name is Olha."},{word:"last name",translation:"прізвище",example:"Her last name is Petrenko."},{word:"full name",translation:"повне ім'я",example:"Please write your full name here."},{word:"nickname",translation:"прізвисько / нікнейм",example:"His friends call him Max; it's his nickname."},{word:"age",translation:"вік",example:"My age is twenty."},{word:"I am ... years old",translation:"мені ... років",example:"I am twenty years old."},{word:"years old",translation:"років (вік)",example:"I'm eleven years old."},{word:"country",translation:"країна",example:"My country is Ukraine."},{word:"city",translation:"місто",example:"I live in the city of Lviv."},{word:"hometown",translation:"рідне місто",example:"My hometown is Poltava."},{word:"place of birth",translation:"місце народження",example:"My place of birth is Kharkiv."},{word:"address",translation:"адреса",example:"My address is 12 Green Street."},{word:"nationality",translation:"національність",example:"She is Italian by nationality."},{word:"native language",translation:"рідна мова",example:"Ukrainian is my native language."},{word:"foreign language",translation:"іноземна мова",example:"English is my first foreign language."},{word:"from",translation:"з / родом із",example:"I am from Ukraine."},{word:"live in",translation:"жити в",example:"I live in Kyiv."},{word:"live with",translation:"жити з",example:"I live with my parents."},{word:"date of birth",translation:"дата народження",example:"My date of birth is May 12, 2005."},{word:"job / occupation",translation:"робота / професія",example:"My job is a student."},{word:"student",translation:"студент / учень",example:"I'm a student at the local school."},{word:"teacher",translation:"вчитель / викладач",example:"My teacher is from Canada."},{word:"grade",translation:"клас (у школі)",example:"I'm in Grade 6."},{word:"single",translation:"неодружений / неодружена",example:"He is single at the moment."},{word:"married",translation:"одружений / заміжня",example:"My parents are married."},{word:"male",translation:"чоловіча стать",example:"He is male."},{word:"female",translation:"жіноча стать",example:"She is female."},{word:"speak",translation:"говорити (мовою)",example:"I speak Ukrainian and English."},{word:"introduce yourself",translation:"представитись",example:"Let me introduce myself."}]},z=new Map;let he=!1;function Be(){he||(he=!0,me.subscribe(({user:e})=>{qe(me.isAdmin(e))}))}function je(e){if(!e)return;const t=window.getComputedStyle(e).position;(t==="static"||!t)&&(e.style.position="relative")}function Ge(e){const t=e.querySelector(".lesson-topic__share-controls");if(t)return t;const n=document.createElement("div");return n.className="lesson-topic__share-controls",n.style.position="absolute",n.style.top="0",n.style.right="0",n.style.display="flex",n.style.gap="6px",n.style.alignItems="center",n.style.zIndex="10",e.appendChild(n),n}function We(e){if(!e||z.has(e))return;const t=e.querySelector(".lesson-topic__header")??e;je(t);const n=Ge(t),{button:o,panel:r,unregister:a}=Ne({context:e,triggerClassName:"lesson-topic__share-trigger for-admin js-share-topic-btn",triggerStyle:"border:none;background:#2563eb;color:#fff;padding:4px 12px;border-radius:999px;font-size:12px;line-height:1;cursor:pointer;box-shadow:0 4px 12px rgba(37,99,235,0.24);",onShare:({student:s,context:i})=>{const l=document.createElement("div");l.innerHTML=i.outerHTML;const c=window.location.search.slice(8),h=document.querySelector("h1"),w=h?h.textContent:"",v=l.querySelector(".lesson-topic__share-controls"),S=l.querySelector(".practice-share-panel");v.remove(),S.remove();const d={lessonId:c,userEmail:s.email,lessonName:w,homeworkType:"theory",homeworkData:l.innerHTML};return Oe(d)}});r.style.right="0",r.style.top="38px",n.appendChild(o),t.appendChild(r),z.set(e,{unregister:a,panel:r})}function Fe(){z.forEach((e,t)=>{var n;t.isConnected||(e.panel&&Re(e.panel)&&He(),(n=e.unregister)==null||n.call(e),z.delete(t))})}const fe=()=>{Be(),Fe(),document.querySelectorAll(".lesson-topic").forEach(t=>We(t))},Qe=55,ze=5,Ce=0,Ke={"custom-no1-mggxs7zo":[{id:"db94624e1c8042ce98760f467377e1ae",themeId:"42",templateId:"70",fontStackId:Ce,title:"Wordwall вправа для особових займенників"}],"custom-no2-4db25661":[{id:"110f5ab8bba8415eadefd09fb52c4e87",themeId:"65",templateId:"30",fontStackId:"12",title:"Wordwall вправа для особових займенників",url:"https://wordwall.net/embed/110f5ab8bba8415eadefd09fb52c4e87?themeId=65&templateId=30&fontStackId=12"}],"custom-no3-b9fd7e6c":[{id:"110f5ab8bba8415eadefd09fb52c4e87",themeId:"65",templateId:"30",fontStackId:"12",title:"Wordwall вправа для особових займенників",url:"https://wordwall.net/embed/110f5ab8bba8415eadefd09fb52c4e87?themeId=65&templateId=30&fontStackId=12"}]};function Je(e){return e?e.url?String(e.url):e.id?`https://wordwall.net/embed/${String(e.id).trim()}`:null:null}function Ie(e){const t=Je(e);if(!t)return null;const n=new URLSearchParams,o=e.themeId??Qe,r=e.templateId??ze,a=e.fontStackId??Ce;o!=null&&n.set("themeId",String(o)),r!=null&&n.set("templateId",String(r)),a!=null&&n.set("fontStackId",String(a));const s=n.toString();return s?`${t}?${s}`:t}function Ye(e){const t=Ie(e);if(!t)return null;const n=document.createElement("iframe");return n.className="lesson-wordwall__iframe",n.src=t,n.width=String(e.width??1e3),n.height=String(e.height??760),n.setAttribute("frameborder","0"),n.setAttribute("allowfullscreen","true"),n.setAttribute("loading","lazy"),n.setAttribute("referrerpolicy","strict-origin-when-cross-origin"),e.title&&n.setAttribute("title",e.title),n}function Ve(e){if(!e)return[];const t=Ke[e];return Array.isArray(t)?t.map(n=>({...n})).filter(n=>!!Ie(n)):[]}const Xe={BASE_URL:"/",DEV:!1,MODE:"production",PROD:!0,SSR:!1},J=typeof import.meta<"u"&&Xe&&"/"||"/";function ie(e){const t=J.endsWith("/")?J:`${J}/`,n=String(e||"");return n.startsWith(t)?n:`${t}${n.replace(/^\/+/,"")}`}const R=new URLSearchParams(window.location.search),Ze=e=>e,H=R.get("topic"),ye=R.get("custom"),ge=R.get("title"),we=Ze(R.get("category")),Ee=R.get("level"),be=R.get("file"),u=H?ae.find(e=>e.id===H):void 0,y=(()=>{if(!ye)return null;const e=[];return Array.isArray(pe)&&pe.forEach(t=>{if(!t||typeof t!="object")return;const n=Array.isArray(t.topicIds)?[...t.topicIds]:[];!t.id||!n.length||e.push({...t,topicIds:n,source:"preset"})}),De().filter(t=>t&&typeof t=="object").forEach(t=>{const n=Array.isArray(t.topicIds)?[...t.topicIds]:[];!t.id||!n.length||e.push({...t,topicIds:n,source:"local"})}),e.find(t=>t.id===ye)??null})(),k=!!y,F=k?y.title:u!=null&&u.title?u.title:ge?decodeURIComponent(ge):"Матеріал уроку",Z=k?"custom":u!=null&&u.category?u.category:we?decodeURIComponent(we):"",ee=(()=>{if(k){if(y.level)return y.level;const e=(y.topicIds||[]).map(n=>ae.find(o=>o.id===n)).filter(Boolean);return Array.from(new Set(e.map(n=>n.level))).sort().join(", ")}return u!=null&&u.level?u.level:Ee?decodeURIComponent(Ee):""})(),te=(()=>{if(k)return null;const e=(u==null?void 0:u.htmlPath)??(be?decodeURIComponent(be):null);return e&&e.startsWith("lessons/")?e:null})();window.lessonContext={id:k?y.id:(u==null?void 0:u.id)??H??null,title:F,category:Z,level:ee,htmlPath:te,source:k?y.source||"custom":"catalog",topicIds:k?[...y.topicIds||[]]:u!=null&&u.id?[u.id]:H?[H]:[],isCustomLesson:k};const Se=document.querySelector("[data-lesson-title]"),xe=document.querySelector("[data-lesson-category]"),Te=document.querySelector("[data-lesson-level]"),U=document.querySelector("[data-lesson-status]"),E=document.getElementById("lesson-content");function et(){const e=document.querySelector('[data-component="copyright-year"]');e&&(e.textContent=String(new Date().getFullYear()))}function tt(){Se&&(Se.textContent=F);const t=(()=>{var o;return k?"Комбінований урок":((o=se[Z])==null?void 0:o.label)??""})()||Z;xe&&(xe.textContent=t||""),Te&&(Te.textContent=ee?`Рівень: ${ee}`:"");const n=document.getElementById("practice-title");n&&(n.textContent=F),document.title=`${F} | English Teacher Platform`}function Me(e){return`lesson-topic-${String(e||"").trim().toLowerCase().replace(/[^a-z0-9_-]+/g,"-").replace(/^-+|-+$/g,"")||"topic"}`}function nt(e){if(!e.length)return null;const t=document.createElement("section");t.className="lesson-custom-summary";const n=document.createElement("h2");n.textContent="Склад уроку",t.appendChild(n);const o=document.createElement("ol");return o.className="lesson-custom-summary__list",e.forEach((r,a)=>{var v;const s=document.createElement("li");s.className="lesson-custom-summary__item";const i=((v=se[r.category])==null?void 0:v.label)??r.category,l=Me(r.id),c=document.createElement("a");c.className="lesson-custom-summary__link",c.href=`#${l}`,c.dataset.topicAnchor=l;const h=document.createElement("strong");h.textContent=`${a+1}. ${r.title}`;const w=document.createElement("span");w.textContent=`${i} · ${r.level}`,c.appendChild(h),c.appendChild(w),c.addEventListener("click",S=>{const d=document.getElementById(l);d&&(S.preventDefault(),d.scrollIntoView({behavior:"smooth",block:"start"}),requestAnimationFrame(()=>{try{d.focus({preventScroll:!0})}catch{d.focus()}}))}),s.appendChild(c),o.appendChild(s)}),t.appendChild(o),t}async function ot(e){if(!e)return null;const t=new Set;if(e.id&&t.add(`data/practice/${e.id}.json`),e.htmlPath){const n=String(e.htmlPath).replace(/^\.?\/?/,"").replace(/\.html?$/i,"");if(n){t.add(`data/practice/${n}.json`);const o=n.split("/"),r=o[o.length-1];r&&t.add(`data/practice/${r}.json`)}}for(const n of t)try{const o=await fetch(ie(n),{cache:"no-store"});if(!o.ok)continue;const r=await o.json();if(r&&Array.isArray(r.tasks)&&r.tasks.length)return r}catch(o){console.warn(`Не вдалося завантажити практику за шляхом ${n}`,o)}return null}function Y(e){if(!e)return;const t=document.createElement("p");t.className="practice-inline__empty muted",t.textContent="Практика для цієї теми поки відсутня.",e.appendChild(t)}function Ae(e){const t=Ve(e);if(!t.length)return null;const n=document.createElement("section");n.className="lesson-wordwall";const o=document.createElement("h2");o.className="lesson-wordwall__title",o.textContent="Wordwall",n.appendChild(o);const r=document.createElement("div");r.className="lesson-wordwall__items",n.appendChild(r);let a=!1;return t.forEach((s,i)=>{const l=Ye({...s,title:s.title||`Wordwall вправа ${i+1}`});l&&(a=!0,r.appendChild(l))}),a?n:null}async function rt(){var a;if(!E)return;const e=((y==null?void 0:y.topicIds)||[]).map(s=>ae.find(i=>i.id===s)).filter(Boolean);if(!e.length){U&&(U.textContent="Не вдалося знайти вибрані теми. Створіть урок заново.");return}if(E.innerHTML="",y!=null&&y.description){const s=document.createElement("p");s.className="lesson-custom-description",s.textContent=y.description,E.appendChild(s)}const t={grammar:0,lexical:1},n=e.slice().sort((s,i)=>{const l=t[s.category]??99,c=t[i.category]??99;return l!==c?l-c:0}),o=nt(n);o&&E.appendChild(o);const r=Ae((y==null?void 0:y.id)??null);r&&E.appendChild(r);for(const s of n){const i=document.createElement("section");i.className="lesson-topic",i.dataset.topicId=s.id;const l=Me(s.id);i.id=l,i.setAttribute("tabindex","-1");const c=document.createElement("header");c.className="lesson-topic__header";const h=document.createElement("h3");h.className="lesson-topic__title",h.textContent=s.title,c.appendChild(h);const w=document.createElement("p");w.className="lesson-topic__meta";const v=((a=se[s.category])==null?void 0:a.label)??s.category;w.textContent=`${v} · Рівень ${s.level}`,c.appendChild(w),i.appendChild(c);const S=document.createElement("div");S.className="lesson-topic__body",i.appendChild(S),E.appendChild(i);try{const p=await fetch(ie(s.htmlPath));if(!p.ok)throw new Error(`Не вдалося завантажити файл: ${p.status}`);const $=await p.text();S.innerHTML=$}catch(p){S.innerHTML='<p class="lesson-topic__error">Не вдалося завантажити матеріал цієї теми.</p>',console.error(p)}const d=document.createElement("div");d.className="lesson-topic__practice",i.appendChild(d);try{const p=await ot(s);if(p&&Array.isArray(p.tasks)&&p.tasks.length){const $=window.practice||{},B=p.title?`Практика: ${p.title}`:`Практика: ${s.title}`,j=p.level||s.level||"";typeof $.renderTaskList=="function"?$.renderTaskList(d,p.tasks,{title:B,level:j,description:p.description,keyPrefix:`${s.id}-practice`}):Y(d)}else Y(d)}catch(p){console.error("Помилка під час завантаження практики",p),Y(d)}}U&&U.remove(),await Ue(E)}async function at(){if(E){if(k){await rt(),fe();return}if(!te){U&&(U.textContent="Не вдалося визначити файл з матеріалом. Перейдіть назад та оберіть тему зі списку.");return}try{const e=await fetch(ie(te));if(!e.ok)throw new Error(`Не вдалося завантажити файл: ${e.status}`);const t=await e.text();E.innerHTML="";const n=Ae((u==null?void 0:u.id)??null);n&&E.appendChild(n);const o=document.createElement("template");o.innerHTML=t,E.appendChild(o.content),fe(),await Ue(E)}catch(e){U&&(U.textContent="Сталася помилка під час завантаження матеріалу. Спробуйте пізніше або поверніться до каталогу."),console.error(e)}}}function st(e,t){if(!e)return;const n=Array.isArray(t)?t:[];if(!n.length)return;e.classList.add("communication__table");const o=document.createElement("table"),r=document.createElement("thead"),a=document.createElement("tr");["Слово","Переклад","Приклад"].forEach(i=>{const l=document.createElement("th");l.textContent=i,a.appendChild(l)}),r.appendChild(a);const s=document.createElement("tbody");n.forEach(i=>{if(!i)return;const l=document.createElement("tr"),c=document.createElement("td");c.textContent=i.word||i.term||"";const h=document.createElement("td");h.textContent=i.translation||i.meaning||"";const w=document.createElement("td");w.textContent=i.example||i.sentence||"",l.appendChild(c),l.appendChild(h),l.appendChild(w),s.appendChild(l)}),o.appendChild(r),o.appendChild(s),e.innerHTML="",e.appendChild(o)}function it(e){var o;if(!e)return null;if(e.dataset.communicationTopic)return e.dataset.communicationTopic;if(e.dataset.topic)return e.dataset.topic;const t=e.closest("[data-communication-topic]");if(t!=null&&t.dataset.communicationTopic)return t.dataset.communicationTopic;const n=(o=window.lessonContext)==null?void 0:o.id;return n&&$e[n]?n:null}async function Ue(e){if(!e)return;const t=Array.from(e.querySelectorAll("[data-communication-words]"));t.length&&t.forEach(n=>{const o=it(n);if(!o)return;const r=$e[o]||[];r.length&&st(n,r)})}function lt(){et(),tt(),at()}lt();const ct=async e=>{const n="https://vq1wtq2d2l.execute-api.us-east-2.amazonaws.com/dev"+"/openai";return await fetch(n,{method:"POST",body:JSON.stringify(e),headers:{"Content-Type":"application/json"}}).then(r=>r.json())},dt=async(e,t,n={},o=[])=>{const r=ut(e,t,n,o),a=await ct(r);try{return typeof a=="string"?JSON.parse(a):a}catch{const i=typeof a=="string"?a.match(/\{[\s\S]*\}$/):null;if(i)return JSON.parse(i[0]);throw new Error("Не вдалося розпарсити JSON відповіді моделі")}};function ut(e,t,n={},o=[]){const r=localStorage.getItem("gptToken");if(!r||(r==null?void 0:r.length)<10){console.warn("⚠️ gptToken відсутній у localStorage");const h=prompt("Enter Your GPT Token");localStorage.setItem("gptToken",h)}const a="gpt-4o-mini",s=String(t||"").trim().toLowerCase(),{system:i,user:l}=mt(e,s,n),c=ft(l,o);return{token:r,model:a,messages:[{role:"system",content:i},{role:"user",content:c}],temperature:.3,max_tokens:4e3}}function mt(e,t,n){n.language;const o=Number.isInteger(n.items)?n.items:pt[t]||10,r=n.seedId||ht(e),a=`
YOU ARE an ESL task generator.
GOAL: create ONE task block of type "${t}" on the topic "${e}".
OUTPUT ONLY VALID JSON. Keep the language level around A1–A2.
All prompts, questions, answers, hints, and labels must be written in ENGLISH.
Encoding — UTF-8. No explanations, no prefixes, no code fences.
Ensure internal consistency so answers match the task logic.
`,s={mcq:{system:`
${a}
OUTPUT SCHEMA:
{
  "id": "mcq-${r}-1",
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
- ${o} items.
- Follow the schema exactly.
- Provide exactly 3 answer choices per question with a single correct one.
- "answer" must be the index of the correct option as a string: "0" | "1" | "2".
- Keep questions natural, concise, and on the topic "${e}".
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
Topic: ${e}
Generate a task block of type "mcq" strictly following the OUTPUT SCHEMA.
Number of items: ${o}.
      `.trim()},gap:{system:`
${a}
OUTPUT SCHEMA:
{
  "id": "gap-${r}-1",
  "type": "gap",
  "prompt": "Fill the gaps with the correct word.",
  "items": [
    { "q": "They ___ (work) on Sundays.", "answer": ["correct_form", "alternative_if_any"] },
    ...
  ]
}
REQUIREMENTS:
- ${o} sentences.
- "q" must be a clean English sentence. Do NOT wrap it in angle brackets, quotes, or markdown — use only plain text with a single blank shown as ___ (three underscores).
- "answer" must be an array with at least one valid solution in lowercase (no angle brackets).
- Keep sentences short, level A1–A2, and connected to "${e}".
      `.trim(),user:f(e,"gap",o)},transform:{system:`
${a}
OUTPUT SCHEMA:
{
  "id": "transform-${r}-1",
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
- ${o} items.
- Answers must follow the prompt instructions (for example, omit the final period).
- Provide a helpful English hint for each item.
      `.trim(),user:f(e,"transform",o)},match:{system:`
${a}
OUTPUT SCHEMA:
{
  "id": "match-${r}-1",
  "type": "match",
  "prompt": "Match the base verb with the third person singular form (he/she/it).",
  "pairs": [
    { "left": "go", "right": "goes" },
    ...
  ]
}
REQUIREMENTS:
- ${Math.max(6,Math.min(12,o))} unique pairs.
- Provide one clear correct match for each pair without duplicates.
- Use vocabulary related to "${e}".
      `.trim(),user:f(e,"match",o)},error:{system:`
${a}
OUTPUT SCHEMA:
{
  "id": "error-${r}-1",
  "type": "error",
  "prompt": "Find and correct the mistake (Present Simple, no final period).",
  "items": [
    { "q": "She don't like tea.", "hint": "use doesn't + base verb", "answer": ["she doesn't like tea", "she does not like tea"] }
  ]
}
REQUIREMENTS:
- ${o} sentences containing a typical error connected to "${e}".
- Provide clear English hints.
- Match the formatting requested in the prompt (for example, omit the period).
      `.trim(),user:f(e,"error",o)},order:{system:`
${a}
OUTPUT SCHEMA:
{
  "id": "order-${r}-1",
  "type": "order",
  "prompt": "Put the words in the correct order.",
  "items": [
    { "q": "Arrange the sentence", "tokens": ["she", "often", "reads", "books"], "answer": "she often reads books" }
  ]
}
REQUIREMENTS:
- ${o} items.
- Provide tokens that form exactly the correct answer (lowercase, no period unless required by the topic).
- Use sentences relevant to "${e}".
      `.trim(),user:f(e,"order",o)},short:{system:`
${a}
OUTPUT SCHEMA:
{
  "id": "short-${r}-1",
  "type": "short",
  "prompt": "Write short answers about ${e}.",
  "items": [
    { "q": "Write 2–3 sentences about your daily routine.", "keywords": ["i", "usually", "every"] }
  ]
}
REQUIREMENTS:
- ${Math.min(6,Math.max(3,Math.floor(o/2)))} tasks that invite short written responses.
- "keywords" act as guidance, not strict scoring rubrics, and must be lowercase English words.
      `.trim(),user:f(e,"short",o)},open:{system:`
${a}
OUTPUT SCHEMA:
{
  "id": "open-${r}-1",
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
- ${Math.max(3,Math.min(10,o))} unique items that require free-form answers.
- Keep each "situation" within 8–14 words, focused on real-life communication linked to "${e}".
- Maintain an A1–A2 learner level and avoid simple yes/no prompts.
- Provide exactly 3 concise scoring criteria phrased for teachers (e.g., "Use two past time expressions").
- Optionally add "example_answers" arrays (1–3 short samples) to model good responses.
- Output JSON only with no surrounding commentary.
      `.trim(),user:f(e,"open",o)},writing:{system:`
${a}
OUTPUT SCHEMA:
{
  "id": "writing-${r}-1",
  "type": "writing",
  "prompt": "Short writing task about ${e}.",
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
      `.trim(),user:f(e,"writing",o)},roleplay:{system:`
${a}
OUTPUT SCHEMA:
{
  "id": "roleplay-${r}-1",
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
- The situation must clearly connect to the topic "${e}".
- Exactly two roles: Student 1 and Student 2.
- Provide 3–5 steps describing how the dialogue should develop.
- Include ${Math.max(6,Math.min(10,o))} useful English phrases with brief English explanations or synonyms.
- Do not add bullet symbols inside the strings.
      `.trim(),user:f(e,"roleplay",o)},"dialogue-gap":{system:`
${a}
OUTPUT SCHEMA:
{
  "id": "dialogue-gap-${r}-1",
  "type": "dialogue-gap",
  "prompt": "Fill the blanks in the dialogue using the word bank.",
  "words": ["<word1>", "<word2>", "<word3>"],
  "dialogue": [
    { "speaker": "Student 1", "line": "<Line with one or two ___ blanks>" }
  ],
  "answers": ["<correct word 1>", "<correct word 2>"]
}
REQUIREMENTS:
- ${Math.max(4,Math.min(8,o))} turns in the dialogue.
- Use exactly ${Math.max(4,Math.min(8,o))} blanks "___" across the dialogue.
- "words" must list one entry per blank (repeat words when a blank uses the same word) and contain no unused distractors.
- "answers" must be the same length as "words", list the correct words in blank order, and use only lowercase English words present in "words".
- Keep each line short (maximum 12 words) and on the topic "${e}".
- Do not add extra fields beyond the schema.
      `.trim(),user:f(e,"dialogue-gap",o)},"dialogue-order":{system:`
${a}
OUTPUT SCHEMA:
{
  "id": "dialogue-order-${r}-1",
  "type": "dialogue-order",
  "prompt": "Arrange the dialogue lines in the correct order.",
  "lines": [
    { "speaker": "Student 1", "line": "<Line>" },
    { "speaker": "Student 2", "line": "<Line>" }
  ],
  "solution": [1, 0]
}
REQUIREMENTS:
- ${Math.max(4,Math.min(8,o))} total lines.
- Each line must contain 6–12 words, sound natural, and stay on the topic "${e}".
- "solution" is an array of zero-based indices describing the correct order of the lines.
- Do not add extra fields beyond the schema.
      `.trim(),user:f(e,"dialogue-order",o)},truefalse:{system:`
${a}
OUTPUT SCHEMA:
{
  "id": "truefalse-${r}-1",
  "type": "truefalse",
  "prompt": "Decide if each statement is true or false.",
  "items": [
    { "statement": "<short statement>", "answer": true }
  ]
}
REQUIREMENTS:
- ${Math.max(6,Math.min(12,o))} statements.
- "answer" must be strictly true or false.
- Use simple A1–A2 level sentences in English related to "${e}".
      `.trim(),user:f(e,"truefalse",o)},"definition-match":{system:`
${a}
OUTPUT SCHEMA:
{
  "id": "definition-match-${r}-1",
  "type": "definition-match",
  "prompt": "Match the word with its definition.",
  "pairs": [
    { "left": "<word>", "right": "<short definition>" }
  ]
}
REQUIREMENTS:
- ${Math.max(6,Math.min(10,o))} pairs.
- "left" must be a single lowercase word without articles.
- "right" must be one sentence of up to 14 words.
- Use vocabulary connected to the topic "${e}".
      `.trim(),user:f(e,"definition-match",o)},"synonym-clue":{system:`
${a}
OUTPUT SCHEMA:
{
  "id": "synonym-clue-${r}-1",
  "type": "synonym-clue",
  "prompt": "Choose the correct word based on the clue.",
  "wordBank": ["<word1>", "<word2>", "<word3>"],
  "items": [
    { "clue": "<clue>", "answers": ["<correct word>"] }
  ]
}
REQUIREMENTS:
- ${Math.max(6,Math.min(10,o))} items.
- Provide a word bank of 6–8 lowercase English words that includes all correct answers.
- "answers" may contain 1–2 acceptable synonyms, all in lowercase English.
- Write concise clues; omit the final period if the clue is a fragment.
      `.trim(),user:f(e,"synonym-clue",o)},scramble:{system:`
${a}
OUTPUT SCHEMA:
{
  "id": "scramble-${r}-1",
  "type": "scramble",
  "prompt": "Unscramble the word.",
  "items": [
    { "scrambled": "<jumbled letters>", "answers": ["<correct word>"] }
  ]
}
REQUIREMENTS:
- ${Math.max(6,Math.min(10,o))} items.
- "scrambled" must be a shuffled version of an English word from "${e}".
- "answers" may list 1–2 valid spellings in lowercase English.
      `.trim(),user:f(e,"scramble",o)},wordpairs:{system:`
${a}
OUTPUT SCHEMA:
{
  "id": "wordpairs-${r}-1",
  "type": "wordpairs",
  "prompt": "Match the singular form to the plural form.",
  "pairs": [
    { "left": "<singular>", "right": "<plural>" }
  ]
}
REQUIREMENTS:
- ${Math.max(6,Math.min(10,o))} pairs.
- Use accurate singular/plural pairs relevant to "${e}".
- Do not add extra keys beyond the schema.
      `.trim(),user:f(e,"wordpairs",o)},"odd-one-out":{system:`
${a}
OUTPUT SCHEMA:
{
  "id": "odd-one-out-${r}-1",
  "type": "odd-one-out",
  "prompt": "Find the odd one out.",
  "items": [
    { "options": ["<word1>", "<word2>", "<word3>", "<word4>"], "answer": "2", "explanation": "<reason>" }
  ]
}
REQUIREMENTS:
- ${Math.max(6,Math.min(10,o))} items.
- Provide exactly 4 options per item.
- "answer" must be the index of the odd item as a string ("0"–"3").
- Include a brief English explanation (up to 10 words) for why the option is odd.
- Only one option may be different; the rest must relate to "${e}".
      `.trim(),user:f(e,"odd-one-out",o)},context:{system:`
${a}
OUTPUT SCHEMA:
{
  "id": "context-${r}-1",
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
- Provide ${o} comprehension questions for the passage.
- Keep the text within 200 words using simple A1 English connected to "${e}".
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
}`.trim(),user:f(e,"context",o)}},i=s[t]||s.mcq,l=(n.additionalInstructions||n.extraInstructions||"").trim();return l?{system:i.system,user:`${i.user}

Additional teacher instructions:
${l}`}:i}const pt={mcq:10,gap:10,transform:10,match:8,error:10,order:10,short:3,open:4,writing:1,roleplay:8,"dialogue-gap":6,"dialogue-order":6,truefalse:8,"definition-match":8,"synonym-clue":8,scramble:8,wordpairs:8,"odd-one-out":8,context:4};function f(e,t,n){return`Topic: ${e}
Generate a task block of type "${t}" with ${n} items. Return JSON only that follows the described schema.`}function ht(e){return String(e||"task").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,6)||"task"}function ft(e,t){const n=String(e||"").trim(),o=yt(t);return o?`${n||"Generate the task block."}

STRICT VOCABULARY REQUIREMENTS (communication lesson):
1. Treat the target expressions below as the ONLY lexical focus for the task. Every generated item and every correct answer must contain at least one of these expressions verbatim (you may adapt grammar but keep the core phrase).
2. Do not introduce alternative key phrases or synonyms outside this list; supporting words like articles or pronouns are fine, but the highlighted expression must come from the list.
3. When offering distractors or incorrect options, keep them realistic yet stay close to the topic; never invent brand-new key phrases outside the set.
4. The Ukrainian translations are reference only – the final task must remain fully in English.

Target vocabulary:
${o}`:n||e||""}function yt(e){if(!Array.isArray(e)||!e.length)return"";const t=o=>{if(!o)return"";const r=o.indexOf(" — "),a=o.indexOf(" – "),s=o.indexOf(" - "),i=[r,a,s].filter(h=>h>=0),l=i.length?Math.min(...i):-1;return(l>=0?o.slice(0,l):o).trim()},n=e.map((o,r)=>{if(!o)return"";const a=o.word||o.term||o.phrase||o.text||`Item ${r+1}`,s=o.translation||o.meaning||o.ua||o.uk||"",i=o.example||o.sentence||o.usage||o.sample||"",l=t(i);let c=`${r+1}. ${a}`;return s&&(c+=` — ${s}`),l&&(c+=` (Example: ${l})`),c}).filter(Boolean);return n.length?n.join(`
`):""}const ke=document.querySelector(".js-practice-section"),m=document.querySelector("[data-practice-generator]"),V=m==null?void 0:m.querySelector("[data-practice-status]"),Q=document.querySelector("[data-generator-output]"),D=document.querySelector("[data-generator-json]"),L=document.querySelector("[data-generator-copy]"),P=document.querySelector("[data-generator-download]"),W=m==null?void 0:m.querySelector("[data-types]"),T=m==null?void 0:m.querySelector("[data-types-trigger]"),A=m==null?void 0:m.querySelector("[data-types-panel]"),ve=document.querySelector("[data-practice-placeholder]"),b=window.lessonContext||{};let I=b.title||"Generated Practice",M=b.level||"custom";const q=[],K=[];function N(e){e&&e.classList.add("hidden")}function le(e){e&&e.classList.remove("hidden")}function _e(e){return!e||e.classList.contains("hidden")}function ce(){return localStorage.getItem("hideGenerateSection")==="true"}function ne(){ce()?(N(ke),N(A),N(Q),_()):(le(ke),re(),O())}function oe(e){return`${e&&typeof e=="object"&&e.id?String(e.id):String((e==null?void 0:e.type)||"task")}-${Date.now()}-${Math.random().toString(16).slice(2,8)}`}function Le(){return{title:I||b.title||"Generated Practice",level:M||b.level||"custom",tasks:[...q,...K].map(e=>e.data)}}function O(){if(D){if(ce()){N(Q);return}if(!q.length&&!K.length){D.textContent="",N(Q),L&&(L.disabled=!0),P&&(P.disabled=!0);return}D.textContent=JSON.stringify(Le(),null,2),le(Q),L&&(L.disabled=!1),P&&(P.disabled=!1)}}function gt(e){const t=oe(e);return K.push({key:t,data:e}),O(),t}function wt(e,t){const n=r=>{const a=r.findIndex(s=>e&&s.key===e||s.data===t);return a!==-1?(r.splice(a,1),!0):!1};(n(K)||n(q))&&O()}function Et(){if(!m)return;const e=m.querySelector('[name="topic"]');if(e&&!e.value){const t=b.title||"Lesson topic";e.value=t}}function x(e,t="idle"){V&&(V.textContent=e,V.dataset.state=t)}function bt(e){return String(e||"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,8)}function X(e){return String(e||"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")}function de(){return Array.from(m.querySelectorAll('input[name="types"]'))}function St(e){const t=e.filter(n=>n.checked).map(n=>{var o,r;return(r=(o=n.nextElementSibling)==null?void 0:o.textContent)==null?void 0:r.trim()}).filter(Boolean);return t.length?t.length<=2?t.join(", "):`${t.slice(0,2).join(", ")} +${t.length-2}`:"Оберіть типи"}function re(){if(!T)return;const e=de();T.textContent=St(e)}function _(){!A||!T||_e(A)||(N(A),T.setAttribute("aria-expanded","false"))}function xt(){if(!A||!T)return;if(_e(A)){le(A),T.setAttribute("aria-expanded","true");const t=A.querySelector('input[name="types"]');t==null||t.focus({preventScroll:!0})}else _()}function Tt(){const e=!ce();localStorage.setItem("hideGenerateSection",String(e)),ne(),O()}function kt(){const e=document.getElementById("practice"),t=e==null?void 0:e.querySelector("#practice-body");if(ve&&ve.remove(),t&&t.children.length===1){const n=t.firstElementChild;n&&/практика поки відсутня/i.test(n.textContent||"")&&n.remove()}}function vt(){const e=document.getElementById("practice");if(!e)return;const t=e.querySelector("#practice-body");if(t&&!t.querySelector(".practice-dynamic-title")){const n=document.createElement("div");n.className="practice-dynamic-title",n.innerHTML=`
      <h2>Згенеровані завдання</h2>
      ${b.level?`<p class="muted">Рівень: ${b.level}</p>`:""}
    `,t.prepend(n)}}async function $t(e){var v,S;if(e.preventDefault(),!m)return;const t=m.querySelector('button[type="submit"]'),n=m.querySelector('[name="topic"]'),o=m.querySelector('[name="count"]'),r=m.querySelector('[name="instructions"]'),a=de(),s=(v=n==null?void 0:n.value)==null?void 0:v.trim(),i=Number.parseInt((o==null?void 0:o.value)||"10",10)||10,l=((S=r==null?void 0:r.value)==null?void 0:S.trim())||"",c=a.filter(d=>d.checked).map(d=>d.value);if(!s){x("Укажіть тему для генерації завдання.","error"),n==null||n.focus();return}if(!c.length&&typeof _=="function"){x("Оберіть принаймні один тип завдання.","error");return}const h=bt(s)||"task";x(`Генеруємо ${c.length} тип(и) завдань…`,"loading"),t&&(t.disabled=!0,t.dataset.originalText=t.dataset.originalText||t.textContent,t.textContent="Генерація…"),String(b.category||"").toLowerCase();const w=void 0;try{const d=c.map(g=>dt(s,g,{items:i,language:"en",seedId:`${h}-${g}`,...l?{additionalInstructions:l}:{}},w).then(C=>({type:g,task:C}))),p=await Promise.allSettled(d),$=p.map((g,C)=>g.status==="fulfilled"?{type:c[C],task:g.value.task}:null).filter(Boolean),B=p.map((g,C)=>g.status==="rejected"?c[C]:null).filter(Boolean);if(!$.length)throw new Error("Не вдалося згенерувати жодного типу завдань");const j=[];$.forEach(({type:g,task:C})=>{const G={...C};G.id||(G.id=`${g}-${h}-${Date.now().toString(36)}${Math.random().toString(36).slice(2,6)}`);const Pe=gt(G);j.push({task:G,key:Pe})}),kt(),window.practice&&typeof window.practice.appendTask=="function"&&(vt(),j.forEach(({task:g,key:C})=>{window.practice.appendTask(g,{key:C})})),_();const ue=$.map(({type:g})=>g).join(", ");B.length?x(`Згенеровано: ${ue}. Помилки: ${B.join(", ")}`,"success"):x(`Готово! Додано ${$.length} блок(и): ${ue}.`,"success")}catch(d){console.error(d);const p=d instanceof Error&&d.message?`Помилка: ${d.message}`:"Не вдалося згенерувати завдання. Перевірте токен або спробуйте ще раз.";x(p,"error")}finally{if(t){const d=t.dataset.originalText||"Згенерувати завдання";t.disabled=!1,t.textContent=d}}}async function Ct(){if(!D)return;const e=D.textContent;if(e)try{await navigator.clipboard.writeText(e),x("JSON скопійовано у буфер.","success")}catch(t){console.error(t),x("Не вдалося скопіювати JSON. Спробуйте вручну.","error")}}function It(e){return`${X(b.id)||X(e.title)||X(b.title)||"practice"||"practice"}.json`}async function Mt(){const e=Le(),t=JSON.stringify(e,null,2);if(!t||t==="{}"||t==="[]"){x("Немає даних для завантаження.","error");return}try{const n=new Blob([t],{type:"application/json"}),o=URL.createObjectURL(n),r=document.createElement("a");r.href=o,r.download=It(e),document.body.appendChild(r),r.click(),document.body.removeChild(r),URL.revokeObjectURL(o),x("Файл завантажено.","success")}catch(n){console.error(n),x("Не вдалося завантажити файл.","error")}}function At(){if(m){if(Et(),m.addEventListener("submit",$t),L&&(L.addEventListener("click",Ct),L.disabled=!0),P&&(P.addEventListener("click",Mt),P.disabled=!0),T&&A&&W){T.setAttribute("aria-haspopup","true"),T.setAttribute("aria-expanded","false"),T.addEventListener("click",()=>{xt()});const e=n=>{W.contains(n.target)||_()};document.addEventListener("pointerdown",e);const t=n=>{const o=n.relatedTarget;(!o||!W.contains(o))&&_()};W.addEventListener("focusout",t),document.addEventListener("keydown",n=>{n.key==="Escape"&&(_(),T.focus())}),de().forEach(n=>{n.addEventListener("change",()=>{re()})}),re(),m.addEventListener("submit",()=>{_()})}document.addEventListener("practice:taskRemoved",e=>{const t=e.detail||{};wt(t.key,t.task)}),document.addEventListener("practice:dataLoaded",e=>{const t=e.detail;q.length=0,t&&Array.isArray(t.entries)?(I=t.title??I,M=t.level??M,t.entries.forEach(({task:n,key:o})=>{const r=o||oe(n);q.push({key:r,data:n})})):t&&Array.isArray(t.tasks)?(I=t.title??I,M=t.level??M,t.tasks.forEach(n=>{const o=n&&n.id?String(n.id):oe(n);q.push({key:o,data:n})})):t?(I=t.title??I,M=t.level??M):(I=b.title||I,M=b.level||M),O(),ne()}),ne(),O(),document.addEventListener("keydown",e=>{e.code&&e.code==="KeyH"&&e.ctrlKey&&e.shiftKey&&(e.preventDefault(),Tt())})}}At();
//# sourceMappingURL=lesson.js.map
