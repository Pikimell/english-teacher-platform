import"./assets/main-DXzobtgI.js";import{l as oe,a as Ue,b as ae}from"./assets/custom-lessons-store-BKMVZjuV.js";import{c as me}from"./assets/custom-lesson-presets-BlE7b2P4.js";const Se={"greetings-farewells":[{word:"Hello",translation:"Привіт",example:"Hello, nice to meet you!"},{word:"Hi",translation:"Привіт (неформально)",example:"Hi, are you ready for class?"},{word:"Good morning",translation:"Доброго ранку",example:"Good morning, Mrs Smith."},{word:"Good afternoon",translation:"Доброго дня",example:"Good afternoon, everyone."},{word:"Good evening",translation:"Доброго вечора",example:"Good evening, how was your day?"},{word:"Nice to meet you",translation:"Приємно познайомитися",example:"Nice to meet you, I'm Tom."},{word:"How are you?",translation:"Як справи?",example:"Hi, Anna! How are you?"},{word:"I'm fine, thanks",translation:"У мене все добре, дякую",example:"I'm fine, thanks. And you?"},{word:"See you later",translation:"Побачимось пізніше",example:"I have to go now. See you later!"},{word:"See you soon",translation:"До скорої зустрічі",example:"Thanks for your help. See you soon."},{word:"Goodbye",translation:"До побачення",example:"Goodbye, have a nice evening!"},{word:"Bye",translation:"Бувай",example:"Bye, talk to you tomorrow!"},{word:"Take care",translation:"Бережи себе",example:"I'm heading home now. Take care!"},{word:"Have a nice day",translation:"Гарного дня",example:"Thanks for coming. Have a nice day!"},{word:"Good night",translation:"Надобраніч",example:"It's late. Good night!"}],"personal-info-basics":[{word:"first name",translation:"ім'я",example:"My first name is Olha."},{word:"last name",translation:"прізвище",example:"Her last name is Petrenko."},{word:"full name",translation:"повне ім'я",example:"Please write your full name here."},{word:"nickname",translation:"прізвисько / нікнейм",example:"His friends call him Max; it's his nickname."},{word:"age",translation:"вік",example:"My age is twenty."},{word:"I am ... years old",translation:"мені ... років",example:"I am twenty years old."},{word:"years old",translation:"років (вік)",example:"I'm eleven years old."},{word:"country",translation:"країна",example:"My country is Ukraine."},{word:"city",translation:"місто",example:"I live in the city of Lviv."},{word:"hometown",translation:"рідне місто",example:"My hometown is Poltava."},{word:"place of birth",translation:"місце народження",example:"My place of birth is Kharkiv."},{word:"address",translation:"адреса",example:"My address is 12 Green Street."},{word:"nationality",translation:"національність",example:"She is Italian by nationality."},{word:"native language",translation:"рідна мова",example:"Ukrainian is my native language."},{word:"foreign language",translation:"іноземна мова",example:"English is my first foreign language."},{word:"from",translation:"з / родом із",example:"I am from Ukraine."},{word:"live in",translation:"жити в",example:"I live in Kyiv."},{word:"live with",translation:"жити з",example:"I live with my parents."},{word:"date of birth",translation:"дата народження",example:"My date of birth is May 12, 2005."},{word:"job / occupation",translation:"робота / професія",example:"My job is a student."},{word:"student",translation:"студент / учень",example:"I'm a student at the local school."},{word:"teacher",translation:"вчитель / викладач",example:"My teacher is from Canada."},{word:"grade",translation:"клас (у школі)",example:"I'm in Grade 6."},{word:"single",translation:"неодружений / неодружена",example:"He is single at the moment."},{word:"married",translation:"одружений / заміжня",example:"My parents are married."},{word:"male",translation:"чоловіча стать",example:"He is male."},{word:"female",translation:"жіноча стать",example:"She is female."},{word:"speak",translation:"говорити (мовою)",example:"I speak Ukrainian and English."},{word:"introduce yourself",translation:"представитись",example:"Let me introduce myself."}]},Le=55,_e=5,Te=0,Pe={"custom-no1-mggxs7zo":[{id:"db94624e1c8042ce98760f467377e1ae",themeId:"42",templateId:"70",fontStackId:Te,title:"Wordwall вправа для особових займенників"}],"custom-no2-4db25661":[{id:"110f5ab8bba8415eadefd09fb52c4e87",themeId:"65",templateId:"30",fontStackId:"12",title:"Wordwall вправа для особових займенників",url:"https://wordwall.net/embed/110f5ab8bba8415eadefd09fb52c4e87?themeId=65&templateId=30&fontStackId=12"}],"custom-no3-b9fd7e6c":[{id:"110f5ab8bba8415eadefd09fb52c4e87",themeId:"65",templateId:"30",fontStackId:"12",title:"Wordwall вправа для особових займенників",url:"https://wordwall.net/embed/110f5ab8bba8415eadefd09fb52c4e87?themeId=65&templateId=30&fontStackId=12"}]};function Oe(e){return e?e.url?String(e.url):e.id?`https://wordwall.net/embed/${String(e.id).trim()}`:null:null}function ke(e){const t=Oe(e);if(!t)return null;const n=new URLSearchParams,r=e.themeId??Le,o=e.templateId??_e,a=e.fontStackId??Te;r!=null&&n.set("themeId",String(r)),o!=null&&n.set("templateId",String(o)),a!=null&&n.set("fontStackId",String(a));const s=n.toString();return s?`${t}?${s}`:t}function Ne(e){const t=ke(e);if(!t)return null;const n=document.createElement("iframe");return n.className="lesson-wordwall__iframe",n.src=t,n.width=String(e.width??1e3),n.height=String(e.height??760),n.setAttribute("frameborder","0"),n.setAttribute("allowfullscreen","true"),n.setAttribute("loading","lazy"),n.setAttribute("referrerpolicy","strict-origin-when-cross-origin"),e.title&&n.setAttribute("title",e.title),n}function qe(e){if(!e)return[];const t=Pe[e];return Array.isArray(t)?t.map(n=>({...n})).filter(n=>!!ke(n)):[]}const Re={BASE_URL:"/",DEV:!1,MODE:"production",PROD:!0,SSR:!1},z=typeof import.meta<"u"&&Re&&"/"||"/";function se(e){const t=z.endsWith("/")?z:`${z}/`,n=String(e||"");return n.startsWith(t)?n:`${t}${n.replace(/^\/+/,"")}`}const R=new URLSearchParams(window.location.search),He=e=>e,H=R.get("topic"),ue=R.get("custom"),pe=R.get("title"),he=He(R.get("category")),fe=R.get("level"),ye=R.get("file"),d=H?oe.find(e=>e.id===H):void 0,f=(()=>{if(!ue)return null;const e=[];return Array.isArray(me)&&me.forEach(t=>{if(!t||typeof t!="object")return;const n=Array.isArray(t.topicIds)?[...t.topicIds]:[];!t.id||!n.length||e.push({...t,topicIds:n,source:"preset"})}),Ue().filter(t=>t&&typeof t=="object").forEach(t=>{const n=Array.isArray(t.topicIds)?[...t.topicIds]:[];!t.id||!n.length||e.push({...t,topicIds:n,source:"local"})}),e.find(t=>t.id===ue)??null})(),T=!!f,F=T?f.title:d!=null&&d.title?d.title:pe?decodeURIComponent(pe):"Матеріал уроку",X=T?"custom":d!=null&&d.category?d.category:he?decodeURIComponent(he):"",Z=(()=>{if(T){if(f.level)return f.level;const e=(f.topicIds||[]).map(n=>oe.find(r=>r.id===n)).filter(Boolean);return Array.from(new Set(e.map(n=>n.level))).sort().join(", ")}return d!=null&&d.level?d.level:fe?decodeURIComponent(fe):""})(),ee=(()=>{if(T)return null;const e=(d==null?void 0:d.htmlPath)??(ye?decodeURIComponent(ye):null);return e&&e.startsWith("lessons/")?e:null})();window.lessonContext={id:T?f.id:(d==null?void 0:d.id)??H??null,title:F,category:X,level:Z,htmlPath:ee,source:T?f.source||"custom":"catalog",topicIds:T?[...f.topicIds||[]]:d!=null&&d.id?[d.id]:H?[H]:[],isCustomLesson:T};const ge=document.querySelector("[data-lesson-title]"),we=document.querySelector("[data-lesson-category]"),Ee=document.querySelector("[data-lesson-level]"),A=document.querySelector("[data-lesson-status]"),w=document.getElementById("lesson-content");function Be(){const e=document.querySelector('[data-component="copyright-year"]');e&&(e.textContent=String(new Date().getFullYear()))}function De(){ge&&(ge.textContent=F);const t=(()=>{var r;return T?"Комбінований урок":((r=ae[X])==null?void 0:r.label)??""})()||X;we&&(we.textContent=t||""),Ee&&(Ee.textContent=Z?`Рівень: ${Z}`:"");const n=document.getElementById("practice-title");n&&(n.textContent=F),document.title=`${F} | English Teacher Platform`}function $e(e){return`lesson-topic-${String(e||"").trim().toLowerCase().replace(/[^a-z0-9_-]+/g,"-").replace(/^-+|-+$/g,"")||"topic"}`}function je(e){if(!e.length)return null;const t=document.createElement("section");t.className="lesson-custom-summary";const n=document.createElement("h2");n.textContent="Склад уроку",t.appendChild(n);const r=document.createElement("ol");return r.className="lesson-custom-summary__list",e.forEach((o,a)=>{var L;const s=document.createElement("li");s.className="lesson-custom-summary__item";const i=((L=ae[o.category])==null?void 0:L.label)??o.category,l=$e(o.id),c=document.createElement("a");c.className="lesson-custom-summary__link",c.href=`#${l}`,c.dataset.topicAnchor=l;const y=document.createElement("strong");y.textContent=`${a+1}. ${o.title}`;const b=document.createElement("span");b.textContent=`${i} · ${o.level}`,c.appendChild(y),c.appendChild(b),c.addEventListener("click",k=>{const m=document.getElementById(l);m&&(k.preventDefault(),m.scrollIntoView({behavior:"smooth",block:"start"}),requestAnimationFrame(()=>{try{m.focus({preventScroll:!0})}catch{m.focus()}}))}),s.appendChild(c),r.appendChild(s)}),t.appendChild(r),t}async function Ge(e){if(!e)return null;const t=new Set;if(e.id&&t.add(`data/practice/${e.id}.json`),e.htmlPath){const n=String(e.htmlPath).replace(/^\.?\/?/,"").replace(/\.html?$/i,"");if(n){t.add(`data/practice/${n}.json`);const r=n.split("/"),o=r[r.length-1];o&&t.add(`data/practice/${o}.json`)}}for(const n of t)try{const r=await fetch(se(n),{cache:"no-store"});if(!r.ok)continue;const o=await r.json();if(o&&Array.isArray(o.tasks)&&o.tasks.length)return o}catch(r){console.warn(`Не вдалося завантажити практику за шляхом ${n}`,r)}return null}function J(e){if(!e)return;const t=document.createElement("p");t.className="practice-inline__empty muted",t.textContent="Практика для цієї теми поки відсутня.",e.appendChild(t)}function ve(e){const t=qe(e);if(!t.length)return null;const n=document.createElement("section");n.className="lesson-wordwall";const r=document.createElement("h2");r.className="lesson-wordwall__title",r.textContent="Wordwall",n.appendChild(r);const o=document.createElement("div");o.className="lesson-wordwall__items",n.appendChild(o);let a=!1;return t.forEach((s,i)=>{const l=Ne({...s,title:s.title||`Wordwall вправа ${i+1}`});l&&(a=!0,o.appendChild(l))}),a?n:null}async function We(){var a;if(!w)return;const e=((f==null?void 0:f.topicIds)||[]).map(s=>oe.find(i=>i.id===s)).filter(Boolean);if(!e.length){A&&(A.textContent="Не вдалося знайти вибрані теми. Створіть урок заново.");return}if(w.innerHTML="",f!=null&&f.description){const s=document.createElement("p");s.className="lesson-custom-description",s.textContent=f.description,w.appendChild(s)}const t={grammar:0,lexical:1},n=e.slice().sort((s,i)=>{const l=t[s.category]??99,c=t[i.category]??99;return l!==c?l-c:0}),r=je(n);r&&w.appendChild(r);const o=ve((f==null?void 0:f.id)??null);o&&w.appendChild(o);for(const s of n){const i=document.createElement("section");i.className="lesson-topic",i.dataset.topicId=s.id;const l=$e(s.id);i.id=l,i.setAttribute("tabindex","-1");const c=document.createElement("header");c.className="lesson-topic__header";const y=document.createElement("h3");y.className="lesson-topic__title",y.textContent=s.title,c.appendChild(y);const b=document.createElement("p");b.className="lesson-topic__meta";const L=((a=ae[s.category])==null?void 0:a.label)??s.category;b.textContent=`${L} · Рівень ${s.level}`,c.appendChild(b),i.appendChild(c);const k=document.createElement("div");k.className="lesson-topic__body",i.appendChild(k),w.appendChild(i);try{const p=await fetch(se(s.htmlPath));if(!p.ok)throw new Error(`Не вдалося завантажити файл: ${p.status}`);const $=await p.text();k.innerHTML=$}catch(p){k.innerHTML='<p class="lesson-topic__error">Не вдалося завантажити матеріал цієї теми.</p>',console.error(p)}const m=document.createElement("div");m.className="lesson-topic__practice",i.appendChild(m);try{const p=await Ge(s);if(p&&Array.isArray(p.tasks)&&p.tasks.length){const $=window.practice||{},D=p.title?`Практика: ${p.title}`:`Практика: ${s.title}`,j=p.level||s.level||"";typeof $.renderTaskList=="function"?$.renderTaskList(m,p.tasks,{title:D,level:j,description:p.description,keyPrefix:`${s.id}-practice`}):J(m)}else J(m)}catch(p){console.error("Помилка під час завантаження практики",p),J(m)}}A&&A.remove(),await Ce(w)}async function Fe(){if(w){if(T){await We();return}if(!ee){A&&(A.textContent="Не вдалося визначити файл з матеріалом. Перейдіть назад та оберіть тему зі списку.");return}try{const e=await fetch(se(ee));if(!e.ok)throw new Error(`Не вдалося завантажити файл: ${e.status}`);const t=await e.text();w.innerHTML="";const n=ve((d==null?void 0:d.id)??null);n&&w.appendChild(n);const r=document.createElement("template");r.innerHTML=t,w.appendChild(r.content),await Ce(w)}catch(e){A&&(A.textContent="Сталася помилка під час завантаження матеріалу. Спробуйте пізніше або поверніться до каталогу."),console.error(e)}}}function Qe(e,t){if(!e)return;const n=Array.isArray(t)?t:[];if(!n.length)return;e.classList.add("communication__table");const r=document.createElement("table"),o=document.createElement("thead"),a=document.createElement("tr");["Слово","Переклад","Приклад"].forEach(i=>{const l=document.createElement("th");l.textContent=i,a.appendChild(l)}),o.appendChild(a);const s=document.createElement("tbody");n.forEach(i=>{if(!i)return;const l=document.createElement("tr"),c=document.createElement("td");c.textContent=i.word||i.term||"";const y=document.createElement("td");y.textContent=i.translation||i.meaning||"";const b=document.createElement("td");b.textContent=i.example||i.sentence||"",l.appendChild(c),l.appendChild(y),l.appendChild(b),s.appendChild(l)}),r.appendChild(o),r.appendChild(s),e.innerHTML="",e.appendChild(r)}function Ke(e){var r;if(!e)return null;if(e.dataset.communicationTopic)return e.dataset.communicationTopic;if(e.dataset.topic)return e.dataset.topic;const t=e.closest("[data-communication-topic]");if(t!=null&&t.dataset.communicationTopic)return t.dataset.communicationTopic;const n=(r=window.lessonContext)==null?void 0:r.id;return n&&Se[n]?n:null}async function Ce(e){if(!e)return;const t=Array.from(e.querySelectorAll("[data-communication-words]"));t.length&&t.forEach(n=>{const r=Ke(n);if(!r)return;const o=Se[r]||[];o.length&&Qe(n,o)})}function ze(){Be(),De(),Fe()}ze();const Je=async e=>{const n="https://vq1wtq2d2l.execute-api.us-east-2.amazonaws.com/dev"+"/openai";return await fetch(n,{method:"POST",body:JSON.stringify(e),headers:{"Content-Type":"application/json"}}).then(o=>o.json())},Ye=async(e,t,n={},r=[])=>{const o=Ve(e,t,n,r),a=await Je(o);try{return typeof a=="string"?JSON.parse(a):a}catch{const i=typeof a=="string"?a.match(/\{[\s\S]*\}$/):null;if(i)return JSON.parse(i[0]);throw new Error("Не вдалося розпарсити JSON відповіді моделі")}};function Ve(e,t,n={},r=[]){const o=localStorage.getItem("gptToken");if(!o||(o==null?void 0:o.length)<10){console.warn("⚠️ gptToken відсутній у localStorage");const y=prompt("Enter Your GPT Token");localStorage.setItem("gptToken",y)}const a="gpt-4o-mini",s=String(t||"").trim().toLowerCase(),{system:i,user:l}=Xe(e,s,n),c=tt(l,r);return{token:o,model:a,messages:[{role:"system",content:i},{role:"user",content:c}],temperature:.3,max_tokens:4e3}}function Xe(e,t,n){n.language;const r=Number.isInteger(n.items)?n.items:Ze[t]||10,o=n.seedId||et(e),a=`
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
  "id": "mcq-${o}-1",
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
- ${r} items.
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
Number of items: ${r}.
      `.trim()},gap:{system:`
${a}
OUTPUT SCHEMA:
{
  "id": "gap-${o}-1",
  "type": "gap",
  "prompt": "Fill the gaps with the correct word.",
  "items": [
    { "q": "They ___ (work) on Sundays.", "answer": ["correct_form", "alternative_if_any"] },
    ...
  ]
}
REQUIREMENTS:
- ${r} sentences.
- "q" must be a clean English sentence. Do NOT wrap it in angle brackets, quotes, or markdown — use only plain text with a single blank shown as ___ (three underscores).
- "answer" must be an array with at least one valid solution in lowercase (no angle brackets).
- Keep sentences short, level A1–A2, and connected to "${e}".
      `.trim(),user:h(e,"gap",r)},transform:{system:`
${a}
OUTPUT SCHEMA:
{
  "id": "transform-${o}-1",
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
- ${r} items.
- Answers must follow the prompt instructions (for example, omit the final period).
- Provide a helpful English hint for each item.
      `.trim(),user:h(e,"transform",r)},match:{system:`
${a}
OUTPUT SCHEMA:
{
  "id": "match-${o}-1",
  "type": "match",
  "prompt": "Match the base verb with the third person singular form (he/she/it).",
  "pairs": [
    { "left": "go", "right": "goes" },
    ...
  ]
}
REQUIREMENTS:
- ${Math.max(6,Math.min(12,r))} unique pairs.
- Provide one clear correct match for each pair without duplicates.
- Use vocabulary related to "${e}".
      `.trim(),user:h(e,"match",r)},error:{system:`
${a}
OUTPUT SCHEMA:
{
  "id": "error-${o}-1",
  "type": "error",
  "prompt": "Find and correct the mistake (Present Simple, no final period).",
  "items": [
    { "q": "She don't like tea.", "hint": "use doesn't + base verb", "answer": ["she doesn't like tea", "she does not like tea"] }
  ]
}
REQUIREMENTS:
- ${r} sentences containing a typical error connected to "${e}".
- Provide clear English hints.
- Match the formatting requested in the prompt (for example, omit the period).
      `.trim(),user:h(e,"error",r)},order:{system:`
${a}
OUTPUT SCHEMA:
{
  "id": "order-${o}-1",
  "type": "order",
  "prompt": "Put the words in the correct order.",
  "items": [
    { "q": "Arrange the sentence", "tokens": ["she", "often", "reads", "books"], "answer": "she often reads books" }
  ]
}
REQUIREMENTS:
- ${r} items.
- Provide tokens that form exactly the correct answer (lowercase, no period unless required by the topic).
- Use sentences relevant to "${e}".
      `.trim(),user:h(e,"order",r)},short:{system:`
${a}
OUTPUT SCHEMA:
{
  "id": "short-${o}-1",
  "type": "short",
  "prompt": "Write short answers about ${e}.",
  "items": [
    { "q": "Write 2–3 sentences about your daily routine.", "keywords": ["i", "usually", "every"] }
  ]
}
REQUIREMENTS:
- ${Math.min(6,Math.max(3,Math.floor(r/2)))} tasks that invite short written responses.
- "keywords" act as guidance, not strict scoring rubrics, and must be lowercase English words.
      `.trim(),user:h(e,"short",r)},open:{system:`
${a}
OUTPUT SCHEMA:
{
  "id": "open-${o}-1",
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
- ${Math.max(3,Math.min(10,r))} unique items that require free-form answers.
- Keep each "situation" within 8–14 words, focused on real-life communication linked to "${e}".
- Maintain an A1–A2 learner level and avoid simple yes/no prompts.
- Provide exactly 3 concise scoring criteria phrased for teachers (e.g., "Use two past time expressions").
- Optionally add "example_answers" arrays (1–3 short samples) to model good responses.
- Output JSON only with no surrounding commentary.
      `.trim(),user:h(e,"open",r)},writing:{system:`
${a}
OUTPUT SCHEMA:
{
  "id": "writing-${o}-1",
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
      `.trim(),user:h(e,"writing",r)},roleplay:{system:`
${a}
OUTPUT SCHEMA:
{
  "id": "roleplay-${o}-1",
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
- Include ${Math.max(6,Math.min(10,r))} useful English phrases with brief English explanations or synonyms.
- Do not add bullet symbols inside the strings.
      `.trim(),user:h(e,"roleplay",r)},"dialogue-gap":{system:`
${a}
OUTPUT SCHEMA:
{
  "id": "dialogue-gap-${o}-1",
  "type": "dialogue-gap",
  "prompt": "Fill the blanks in the dialogue using the word bank.",
  "words": ["<word1>", "<word2>", "<word3>"],
  "dialogue": [
    { "speaker": "Student 1", "line": "<Line with one or two ___ blanks>" }
  ],
  "answers": ["<correct word 1>", "<correct word 2>"]
}
REQUIREMENTS:
- ${Math.max(4,Math.min(8,r))} turns in the dialogue.
- Use exactly ${Math.max(4,Math.min(8,r))} blanks "___" across the dialogue.
- "words" must list one entry per blank (repeat words when a blank uses the same word) and contain no unused distractors.
- "answers" must be the same length as "words", list the correct words in blank order, and use only lowercase English words present in "words".
- Keep each line short (maximum 12 words) and on the topic "${e}".
- Do not add extra fields beyond the schema.
      `.trim(),user:h(e,"dialogue-gap",r)},"dialogue-order":{system:`
${a}
OUTPUT SCHEMA:
{
  "id": "dialogue-order-${o}-1",
  "type": "dialogue-order",
  "prompt": "Arrange the dialogue lines in the correct order.",
  "lines": [
    { "speaker": "Student 1", "line": "<Line>" },
    { "speaker": "Student 2", "line": "<Line>" }
  ],
  "solution": [1, 0]
}
REQUIREMENTS:
- ${Math.max(4,Math.min(8,r))} total lines.
- Each line must contain 6–12 words, sound natural, and stay on the topic "${e}".
- "solution" is an array of zero-based indices describing the correct order of the lines.
- Do not add extra fields beyond the schema.
      `.trim(),user:h(e,"dialogue-order",r)},truefalse:{system:`
${a}
OUTPUT SCHEMA:
{
  "id": "truefalse-${o}-1",
  "type": "truefalse",
  "prompt": "Decide if each statement is true or false.",
  "items": [
    { "statement": "<short statement>", "answer": true }
  ]
}
REQUIREMENTS:
- ${Math.max(6,Math.min(12,r))} statements.
- "answer" must be strictly true or false.
- Use simple A1–A2 level sentences in English related to "${e}".
      `.trim(),user:h(e,"truefalse",r)},"definition-match":{system:`
${a}
OUTPUT SCHEMA:
{
  "id": "definition-match-${o}-1",
  "type": "definition-match",
  "prompt": "Match the word with its definition.",
  "pairs": [
    { "left": "<word>", "right": "<short definition>" }
  ]
}
REQUIREMENTS:
- ${Math.max(6,Math.min(10,r))} pairs.
- "left" must be a single lowercase word without articles.
- "right" must be one sentence of up to 14 words.
- Use vocabulary connected to the topic "${e}".
      `.trim(),user:h(e,"definition-match",r)},"synonym-clue":{system:`
${a}
OUTPUT SCHEMA:
{
  "id": "synonym-clue-${o}-1",
  "type": "synonym-clue",
  "prompt": "Choose the correct word based on the clue.",
  "wordBank": ["<word1>", "<word2>", "<word3>"],
  "items": [
    { "clue": "<clue>", "answers": ["<correct word>"] }
  ]
}
REQUIREMENTS:
- ${Math.max(6,Math.min(10,r))} items.
- Provide a word bank of 6–8 lowercase English words that includes all correct answers.
- "answers" may contain 1–2 acceptable synonyms, all in lowercase English.
- Write concise clues; omit the final period if the clue is a fragment.
      `.trim(),user:h(e,"synonym-clue",r)},scramble:{system:`
${a}
OUTPUT SCHEMA:
{
  "id": "scramble-${o}-1",
  "type": "scramble",
  "prompt": "Unscramble the word.",
  "items": [
    { "scrambled": "<jumbled letters>", "answers": ["<correct word>"] }
  ]
}
REQUIREMENTS:
- ${Math.max(6,Math.min(10,r))} items.
- "scrambled" must be a shuffled version of an English word from "${e}".
- "answers" may list 1–2 valid spellings in lowercase English.
      `.trim(),user:h(e,"scramble",r)},wordpairs:{system:`
${a}
OUTPUT SCHEMA:
{
  "id": "wordpairs-${o}-1",
  "type": "wordpairs",
  "prompt": "Match the singular form to the plural form.",
  "pairs": [
    { "left": "<singular>", "right": "<plural>" }
  ]
}
REQUIREMENTS:
- ${Math.max(6,Math.min(10,r))} pairs.
- Use accurate singular/plural pairs relevant to "${e}".
- Do not add extra keys beyond the schema.
      `.trim(),user:h(e,"wordpairs",r)},"odd-one-out":{system:`
${a}
OUTPUT SCHEMA:
{
  "id": "odd-one-out-${o}-1",
  "type": "odd-one-out",
  "prompt": "Find the odd one out.",
  "items": [
    { "options": ["<word1>", "<word2>", "<word3>", "<word4>"], "answer": "2", "explanation": "<reason>" }
  ]
}
REQUIREMENTS:
- ${Math.max(6,Math.min(10,r))} items.
- Provide exactly 4 options per item.
- "answer" must be the index of the odd item as a string ("0"–"3").
- Include a brief English explanation (up to 10 words) for why the option is odd.
- Only one option may be different; the rest must relate to "${e}".
      `.trim(),user:h(e,"odd-one-out",r)},context:{system:`
${a}
OUTPUT SCHEMA:
{
  "id": "context-${o}-1",
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
- Provide ${r} comprehension questions for the passage.
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
}`.trim(),user:h(e,"context",r)}},i=s[t]||s.mcq,l=(n.additionalInstructions||n.extraInstructions||"").trim();return l?{system:i.system,user:`${i.user}

Additional teacher instructions:
${l}`}:i}const Ze={mcq:10,gap:10,transform:10,match:8,error:10,order:10,short:3,open:4,writing:1,roleplay:8,"dialogue-gap":6,"dialogue-order":6,truefalse:8,"definition-match":8,"synonym-clue":8,scramble:8,wordpairs:8,"odd-one-out":8,context:4};function h(e,t,n){return`Topic: ${e}
Generate a task block of type "${t}" with ${n} items. Return JSON only that follows the described schema.`}function et(e){return String(e||"task").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,6)||"task"}function tt(e,t){const n=String(e||"").trim(),r=nt(t);return r?`${n||"Generate the task block."}

STRICT VOCABULARY REQUIREMENTS (communication lesson):
1. Treat the target expressions below as the ONLY lexical focus for the task. Every generated item and every correct answer must contain at least one of these expressions verbatim (you may adapt grammar but keep the core phrase).
2. Do not introduce alternative key phrases or synonyms outside this list; supporting words like articles or pronouns are fine, but the highlighted expression must come from the list.
3. When offering distractors or incorrect options, keep them realistic yet stay close to the topic; never invent brand-new key phrases outside the set.
4. The Ukrainian translations are reference only – the final task must remain fully in English.

Target vocabulary:
${r}`:n||e||""}function nt(e){if(!Array.isArray(e)||!e.length)return"";const t=r=>{if(!r)return"";const o=r.indexOf(" — "),a=r.indexOf(" – "),s=r.indexOf(" - "),i=[o,a,s].filter(y=>y>=0),l=i.length?Math.min(...i):-1;return(l>=0?r.slice(0,l):r).trim()},n=e.map((r,o)=>{if(!r)return"";const a=r.word||r.term||r.phrase||r.text||`Item ${o+1}`,s=r.translation||r.meaning||r.ua||r.uk||"",i=r.example||r.sentence||r.usage||r.sample||"",l=t(i);let c=`${o+1}. ${a}`;return s&&(c+=` — ${s}`),l&&(c+=` (Example: ${l})`),c}).filter(Boolean);return n.length?n.join(`
`):""}const be=document.querySelector(".js-practice-section"),u=document.querySelector("[data-practice-generator]"),Y=u==null?void 0:u.querySelector("[data-practice-status]"),Q=document.querySelector("[data-generator-output]"),B=document.querySelector("[data-generator-json]"),_=document.querySelector("[data-generator-copy]"),P=document.querySelector("[data-generator-download]"),W=u==null?void 0:u.querySelector("[data-types]"),S=u==null?void 0:u.querySelector("[data-types-trigger]"),M=u==null?void 0:u.querySelector("[data-types-panel]"),xe=document.querySelector("[data-practice-placeholder]"),E=window.lessonContext||{};let C=E.title||"Generated Practice",I=E.level||"custom";const O=[],K=[];function N(e){e&&e.classList.add("hidden")}function ie(e){e&&e.classList.remove("hidden")}function Ie(e){return!e||e.classList.contains("hidden")}function le(){return localStorage.getItem("hideGenerateSection")==="true"}function te(){le()?(N(be),N(M),N(Q),U()):(ie(be),re(),q())}function ne(e){return`${e&&typeof e=="object"&&e.id?String(e.id):String((e==null?void 0:e.type)||"task")}-${Date.now()}-${Math.random().toString(16).slice(2,8)}`}function Me(){return{title:C||E.title||"Generated Practice",level:I||E.level||"custom",tasks:[...O,...K].map(e=>e.data)}}function q(){if(B){if(le()){N(Q);return}if(!O.length&&!K.length){B.textContent="",N(Q),_&&(_.disabled=!0),P&&(P.disabled=!0);return}B.textContent=JSON.stringify(Me(),null,2),ie(Q),_&&(_.disabled=!1),P&&(P.disabled=!1)}}function rt(e){const t=ne(e);return K.push({key:t,data:e}),q(),t}function ot(e,t){const n=o=>{const a=o.findIndex(s=>e&&s.key===e||s.data===t);return a!==-1?(o.splice(a,1),!0):!1};(n(K)||n(O))&&q()}function at(){if(!u)return;const e=u.querySelector('[name="topic"]');if(e&&!e.value){const t=E.title||"Lesson topic";e.value=t}}function x(e,t="idle"){Y&&(Y.textContent=e,Y.dataset.state=t)}function st(e){return String(e||"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,8)}function V(e){return String(e||"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")}function ce(){return Array.from(u.querySelectorAll('input[name="types"]'))}function it(e){const t=e.filter(n=>n.checked).map(n=>{var r,o;return(o=(r=n.nextElementSibling)==null?void 0:r.textContent)==null?void 0:o.trim()}).filter(Boolean);return t.length?t.length<=2?t.join(", "):`${t.slice(0,2).join(", ")} +${t.length-2}`:"Оберіть типи"}function re(){if(!S)return;const e=ce();S.textContent=it(e)}function U(){!M||!S||Ie(M)||(N(M),S.setAttribute("aria-expanded","false"))}function lt(){if(!M||!S)return;if(Ie(M)){ie(M),S.setAttribute("aria-expanded","true");const t=M.querySelector('input[name="types"]');t==null||t.focus({preventScroll:!0})}else U()}function ct(){const e=!le();localStorage.setItem("hideGenerateSection",String(e)),te(),q()}function dt(){const e=document.getElementById("practice"),t=e==null?void 0:e.querySelector("#practice-body");if(xe&&xe.remove(),t&&t.children.length===1){const n=t.firstElementChild;n&&/практика поки відсутня/i.test(n.textContent||"")&&n.remove()}}function mt(){const e=document.getElementById("practice");if(!e)return;const t=e.querySelector("#practice-body");if(t&&!t.querySelector(".practice-dynamic-title")){const n=document.createElement("div");n.className="practice-dynamic-title",n.innerHTML=`
      <h2>Згенеровані завдання</h2>
      ${E.level?`<p class="muted">Рівень: ${E.level}</p>`:""}
    `,t.prepend(n)}}async function ut(e){var L,k;if(e.preventDefault(),!u)return;const t=u.querySelector('button[type="submit"]'),n=u.querySelector('[name="topic"]'),r=u.querySelector('[name="count"]'),o=u.querySelector('[name="instructions"]'),a=ce(),s=(L=n==null?void 0:n.value)==null?void 0:L.trim(),i=Number.parseInt((r==null?void 0:r.value)||"10",10)||10,l=((k=o==null?void 0:o.value)==null?void 0:k.trim())||"",c=a.filter(m=>m.checked).map(m=>m.value);if(!s){x("Укажіть тему для генерації завдання.","error"),n==null||n.focus();return}if(!c.length&&typeof U=="function"){x("Оберіть принаймні один тип завдання.","error");return}const y=st(s)||"task";x(`Генеруємо ${c.length} тип(и) завдань…`,"loading"),t&&(t.disabled=!0,t.dataset.originalText=t.dataset.originalText||t.textContent,t.textContent="Генерація…"),String(E.category||"").toLowerCase();const b=void 0;try{const m=c.map(g=>Ye(s,g,{items:i,language:"en",seedId:`${y}-${g}`,...l?{additionalInstructions:l}:{}},b).then(v=>({type:g,task:v}))),p=await Promise.allSettled(m),$=p.map((g,v)=>g.status==="fulfilled"?{type:c[v],task:g.value.task}:null).filter(Boolean),D=p.map((g,v)=>g.status==="rejected"?c[v]:null).filter(Boolean);if(!$.length)throw new Error("Не вдалося згенерувати жодного типу завдань");const j=[];$.forEach(({type:g,task:v})=>{const G={...v};G.id||(G.id=`${g}-${y}-${Date.now().toString(36)}${Math.random().toString(36).slice(2,6)}`);const Ae=rt(G);j.push({task:G,key:Ae})}),dt(),window.practice&&typeof window.practice.appendTask=="function"&&(mt(),j.forEach(({task:g,key:v})=>{window.practice.appendTask(g,{key:v})})),U();const de=$.map(({type:g})=>g).join(", ");D.length?x(`Згенеровано: ${de}. Помилки: ${D.join(", ")}`,"success"):x(`Готово! Додано ${$.length} блок(и): ${de}.`,"success")}catch(m){console.error(m);const p=m instanceof Error&&m.message?`Помилка: ${m.message}`:"Не вдалося згенерувати завдання. Перевірте токен або спробуйте ще раз.";x(p,"error")}finally{if(t){const m=t.dataset.originalText||"Згенерувати завдання";t.disabled=!1,t.textContent=m}}}async function pt(){if(!B)return;const e=B.textContent;if(e)try{await navigator.clipboard.writeText(e),x("JSON скопійовано у буфер.","success")}catch(t){console.error(t),x("Не вдалося скопіювати JSON. Спробуйте вручну.","error")}}function ht(e){return`${V(E.id)||V(e.title)||V(E.title)||"practice"||"practice"}.json`}async function ft(){const e=Me(),t=JSON.stringify(e,null,2);if(!t||t==="{}"||t==="[]"){x("Немає даних для завантаження.","error");return}try{const n=new Blob([t],{type:"application/json"}),r=URL.createObjectURL(n),o=document.createElement("a");o.href=r,o.download=ht(e),document.body.appendChild(o),o.click(),document.body.removeChild(o),URL.revokeObjectURL(r),x("Файл завантажено.","success")}catch(n){console.error(n),x("Не вдалося завантажити файл.","error")}}function yt(){if(u){if(at(),u.addEventListener("submit",ut),_&&(_.addEventListener("click",pt),_.disabled=!0),P&&(P.addEventListener("click",ft),P.disabled=!0),S&&M&&W){S.setAttribute("aria-haspopup","true"),S.setAttribute("aria-expanded","false"),S.addEventListener("click",()=>{lt()});const e=n=>{W.contains(n.target)||U()};document.addEventListener("pointerdown",e);const t=n=>{const r=n.relatedTarget;(!r||!W.contains(r))&&U()};W.addEventListener("focusout",t),document.addEventListener("keydown",n=>{n.key==="Escape"&&(U(),S.focus())}),ce().forEach(n=>{n.addEventListener("change",()=>{re()})}),re(),u.addEventListener("submit",()=>{U()})}document.addEventListener("practice:taskRemoved",e=>{const t=e.detail||{};ot(t.key,t.task)}),document.addEventListener("practice:dataLoaded",e=>{const t=e.detail;O.length=0,t&&Array.isArray(t.entries)?(C=t.title??C,I=t.level??I,t.entries.forEach(({task:n,key:r})=>{const o=r||ne(n);O.push({key:o,data:n})})):t&&Array.isArray(t.tasks)?(C=t.title??C,I=t.level??I,t.tasks.forEach(n=>{const r=n&&n.id?String(n.id):ne(n);O.push({key:r,data:n})})):t?(C=t.title??C,I=t.level??I):(C=E.title||C,I=E.level||I),q(),te()}),te(),q(),document.addEventListener("keydown",e=>{e.code&&e.code==="KeyH"&&e.ctrlKey&&e.shiftKey&&(e.preventDefault(),ct())})}}yt();
//# sourceMappingURL=lesson.js.map
