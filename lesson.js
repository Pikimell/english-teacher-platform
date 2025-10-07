import"./assets/main-Dnzr3yj7.js";import{l as ae,a as Pe,b as ie}from"./assets/custom-lessons-store-KcM_Qa8C.js";import{c as fe}from"./assets/custom-lesson-presets-gU5JSAO6.js";const Ie="modulepreload",Re=function(e){return"/english-teacher-platform/"+e},ye={},D=function(t,o,n){let r=Promise.resolve();if(o&&o.length>0){document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),i=(a==null?void 0:a.nonce)||(a==null?void 0:a.getAttribute("nonce"));r=Promise.allSettled(o.map(c=>{if(c=Re(c),c in ye)return;ye[c]=!0;const l=c.endsWith(".css"),h=l?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${h}`))return;const p=document.createElement("link");if(p.rel=l?"stylesheet":Ie,l||(p.as="script"),p.crossOrigin="",p.href=c,i&&p.setAttribute("nonce",i),document.head.appendChild(p),l)return new Promise((T,E)=>{p.addEventListener("load",T),p.addEventListener("error",()=>E(new Error(`Unable to preload CSS for ${c}`)))})}))}function s(a){const i=new Event("vite:preloadError",{cancelable:!0});if(i.payload=a,window.dispatchEvent(i),!i.defaultPrevented)throw a}return r.then(a=>{for(const i of a||[])i.status==="rejected"&&s(i.reason);return t().catch(s)})},ge=["animals-and-pets","body-and-health","city-and-places","colours-and-shapes","daily-routines","days-months-seasons","describing-people","directions-and-location","environment-and-surroundings","family-and-friends","feelings-and-emotions","food-and-drinks","free-time-and-hobbies","holidays-and-traditions","home-and-household","jobs-and-professions","nature-and-weather","numbers-dates-time","personal-information","rooms-and-furniture","school-and-learning","shopping-and-money","sports-basics","technology-and-gadgets","travel-and-transport"],Oe={BASE_URL:"/english-teacher-platform/",DEV:!1,MODE:"production",PROD:!0,SSR:!1},Z={body:()=>D(()=>import("./assets/body-CuWMwF77.js"),[]),"small-talk":()=>D(()=>import("./assets/smallTalk-DDzvHpnt.js"),[]),"problem-solving":()=>D(()=>import("./assets/problemSolving-C-zZWj-W.js"),[]),feedback:()=>D(()=>import("./assets/feedback-CMqLBQCG.js"),[])};Array.isArray(ge)&&ge.forEach(e=>{!e||Z[e]||(Z[e]=()=>D(()=>import(`../public/scripts/communication/words/${e}.js`),[]))});const z=typeof import.meta<"u"&&Oe&&"/english-teacher-platform/"||"/";function ce(e){const t=z.endsWith("/")?z:`${z}/`,o=String(e||"");return o.startsWith(t)?o:`${t}${o.replace(/^\/+/,"")}`}const H=new URLSearchParams(window.location.search),qe=e=>e==="lexical"?"communication":e,j=H.get("topic"),we=H.get("custom"),Ee=H.get("title"),be=qe(H.get("category")),Se=H.get("level"),$e=H.get("file"),m=j?ae.find(e=>e.id===j):void 0,y=(()=>{if(!we)return null;const e=[];return Array.isArray(fe)&&fe.forEach(t=>{if(!t||typeof t!="object")return;const o=Array.isArray(t.topicIds)?[...t.topicIds]:[];!t.id||!o.length||e.push({...t,topicIds:o,source:"preset"})}),Pe().filter(t=>t&&typeof t=="object").forEach(t=>{const o=Array.isArray(t.topicIds)?[...t.topicIds]:[];!t.id||!o.length||e.push({...t,topicIds:o,source:"local"})}),e.find(t=>t.id===we)??null})(),v=!!y,F=v?y.title:m!=null&&m.title?m.title:Ee?decodeURIComponent(Ee):"Матеріал уроку",ee=v?"custom":m!=null&&m.category?m.category:be?decodeURIComponent(be):"",te=(()=>{if(v){if(y.level)return y.level;const e=(y.topicIds||[]).map(o=>ae.find(n=>n.id===o)).filter(Boolean);return Array.from(new Set(e.map(o=>o.level))).sort().join(", ")}return m!=null&&m.level?m.level:Se?decodeURIComponent(Se):""})(),ne=(()=>{if(v)return null;const e=(m==null?void 0:m.htmlPath)??($e?decodeURIComponent($e):null);return e&&e.startsWith("lessons/")?e:null})();window.lessonContext={id:v?y.id:(m==null?void 0:m.id)??j??null,title:F,category:ee,level:te,htmlPath:ne,source:v?y.source||"custom":"catalog",topicIds:v?[...y.topicIds||[]]:m!=null&&m.id?[m.id]:j?[j]:[],isCustomLesson:v};const Te=document.querySelector("[data-lesson-title]"),ve=document.querySelector("[data-lesson-category]"),ke=document.querySelector("[data-lesson-level]"),U=document.querySelector("[data-lesson-status]"),A=document.getElementById("lesson-content");function Ne(){const e=document.querySelector('[data-component="copyright-year"]');e&&(e.textContent=String(new Date().getFullYear()))}function He(){Te&&(Te.textContent=F);const t=(()=>{var n;return v?"Комбінований урок":((n=ie[ee])==null?void 0:n.label)??""})()||ee;ve&&(ve.textContent=t||""),ke&&(ke.textContent=te?`Рівень: ${te}`:"");const o=document.getElementById("practice-title");o&&(o.textContent=F),document.title=`${F} | English Teacher Platform`}function Ae(e){return`lesson-topic-${String(e||"").trim().toLowerCase().replace(/[^a-z0-9_-]+/g,"-").replace(/^-+|-+$/g,"")||"topic"}`}function De(e){if(!e.length)return null;const t=document.createElement("section");t.className="lesson-custom-summary";const o=document.createElement("h2");o.textContent="Склад уроку",t.appendChild(o);const n=document.createElement("ol");return n.className="lesson-custom-summary__list",e.forEach((r,s)=>{var T;const a=document.createElement("li");a.className="lesson-custom-summary__item";const i=((T=ie[r.category])==null?void 0:T.label)??r.category,c=Ae(r.id),l=document.createElement("a");l.className="lesson-custom-summary__link",l.href=`#${c}`,l.dataset.topicAnchor=c;const h=document.createElement("strong");h.textContent=`${s+1}. ${r.title}`;const p=document.createElement("span");p.textContent=`${i} · ${r.level}`,l.appendChild(h),l.appendChild(p),l.addEventListener("click",E=>{const d=document.getElementById(c);d&&(E.preventDefault(),d.scrollIntoView({behavior:"smooth",block:"start"}),requestAnimationFrame(()=>{try{d.focus({preventScroll:!0})}catch{d.focus()}}))}),a.appendChild(l),n.appendChild(a)}),t.appendChild(n),t}async function je(e){if(!e)return null;const t=new Set;if(e.id&&t.add(`data/practice/${e.id}.json`),e.htmlPath){const o=String(e.htmlPath).replace(/^\.?\/?/,"").replace(/\.html?$/i,"");if(o){t.add(`data/practice/${o}.json`);const n=o.split("/"),r=n[n.length-1];r&&t.add(`data/practice/${r}.json`)}}for(const o of t)try{const n=await fetch(ce(o),{cache:"no-store"});if(!n.ok)continue;const r=await n.json();if(r&&Array.isArray(r.tasks)&&r.tasks.length)return r}catch(n){console.warn(`Не вдалося завантажити практику за шляхом ${o}`,n)}return null}function Y(e){if(!e)return;const t=document.createElement("p");t.className="practice-inline__empty muted",t.textContent="Практика для цієї теми поки відсутня.",e.appendChild(t)}async function Be(){var r;if(!A)return;const e=((y==null?void 0:y.topicIds)||[]).map(s=>ae.find(a=>a.id===s)).filter(Boolean);if(!e.length){U&&(U.textContent="Не вдалося знайти вибрані теми. Створіть урок заново.");return}if(A.innerHTML="",y!=null&&y.description){const s=document.createElement("p");s.className="lesson-custom-description",s.textContent=y.description,A.appendChild(s)}const t={grammar:0,communication:1,quick:2},o=e.slice().sort((s,a)=>{const i=t[s.category]??99,c=t[a.category]??99;return i!==c?i-c:0}),n=De(o);n&&A.appendChild(n);for(const s of o){const a=document.createElement("section");a.className="lesson-topic",a.dataset.topicId=s.id;const i=Ae(s.id);a.id=i,a.setAttribute("tabindex","-1");const c=document.createElement("header");c.className="lesson-topic__header";const l=document.createElement("h3");l.className="lesson-topic__title",l.textContent=s.title,c.appendChild(l);const h=document.createElement("p");h.className="lesson-topic__meta";const p=((r=ie[s.category])==null?void 0:r.label)??s.category;h.textContent=`${p} · Рівень ${s.level}`,c.appendChild(h),a.appendChild(c);const T=document.createElement("div");T.className="lesson-topic__body",a.appendChild(T),A.appendChild(a);try{const d=await fetch(ce(s.htmlPath));if(!d.ok)throw new Error(`Не вдалося завантажити файл: ${d.status}`);const M=await d.text();T.innerHTML=M}catch(d){T.innerHTML='<p class="lesson-topic__error">Не вдалося завантажити матеріал цієї теми.</p>',console.error(d)}const E=document.createElement("div");E.className="lesson-topic__practice",a.appendChild(E);try{const d=await je(s);if(d&&Array.isArray(d.tasks)&&d.tasks.length){const M=window.practice||{},g=d.title?`Практика: ${d.title}`:`Практика: ${s.title}`,R=d.level||s.level||"";typeof M.renderTaskList=="function"?M.renderTaskList(E,d.tasks,{title:g,level:R,description:d.description,keyPrefix:`${s.id}-practice`}):Y(E)}else Y(E)}catch(d){console.error("Помилка під час завантаження практики",d),Y(E)}}U&&U.remove(),await _e(A)}async function We(){if(A){if(v){await Be();return}if(!ne){U&&(U.textContent="Не вдалося визначити файл з матеріалом. Перейдіть назад та оберіть тему зі списку.");return}try{const e=await fetch(ce(ne));if(!e.ok)throw new Error(`Не вдалося завантажити файл: ${e.status}`);const t=await e.text();A.innerHTML=t,await _e(A)}catch(e){U&&(U.textContent="Сталася помилка під час завантаження матеріалу. Спробуйте пізніше або поверніться до каталогу."),console.error(e)}}}function Qe(e,t){if(!e)return;const o=Array.isArray(t)?t:[];if(!o.length)return;e.classList.add("communication__table");const n=document.createElement("table"),r=document.createElement("thead"),s=document.createElement("tr");["Слово","Переклад","Приклад"].forEach(i=>{const c=document.createElement("th");c.textContent=i,s.appendChild(c)}),r.appendChild(s);const a=document.createElement("tbody");o.forEach(i=>{if(!i)return;const c=document.createElement("tr"),l=document.createElement("td");l.textContent=i.word||i.term||"";const h=document.createElement("td");h.textContent=i.translation||i.meaning||"";const p=document.createElement("td");p.textContent=i.example||i.sentence||"",c.appendChild(l),c.appendChild(h),c.appendChild(p),a.appendChild(c)}),n.appendChild(r),n.appendChild(a),e.innerHTML="",e.appendChild(n)}async function _e(e){if(!e)return;const t=e.querySelectorAll("[data-communication-words]");if(window.communicationVocabularyMap=window.communicationVocabularyMap||{},window.communicationCurrentWords=void 0,window.communicationCurrentModule=void 0,!!t.length)for(const o of t){const n=o.getAttribute("data-module");if(!n)continue;const r=Z[n];if(typeof r=="function")try{const s=await r(),a=(s==null?void 0:s.default)||(s==null?void 0:s.words)||[];if(!Array.isArray(a)||!a.length)continue;window.communicationVocabularyMap[n]=a,window.communicationCurrentWords=a,window.communicationCurrentModule=n,Qe(o,a)}catch(s){console.error(`Не вдалося завантажити слова для модуля "${n}"`,s)}}}function Ve(){Ne(),He(),We()}Ve();const Fe=async e=>{const o="https://vq1wtq2d2l.execute-api.us-east-2.amazonaws.com/dev"+"/openai";return await fetch(o,{method:"POST",body:JSON.stringify(e),headers:{"Content-Type":"application/json"}}).then(r=>r.json())},Ge=async(e,t,o={},n=[])=>{const r=Je(e,t,o,n),s=await Fe(r);try{return typeof s=="string"?JSON.parse(s):s}catch{const i=typeof s=="string"?s.match(/\{[\s\S]*\}$/):null;if(i)return JSON.parse(i[0]);throw new Error("Не вдалося розпарсити JSON відповіді моделі")}};function Je(e,t,o={},n=[]){const r=localStorage.getItem("gptToken");if(!r||(r==null?void 0:r.length)<10){console.warn("⚠️ gptToken відсутній у localStorage");const h=prompt("Enter Your GPT Token");localStorage.setItem("gptToken",h)}const s="gpt-4o-mini",a=String(t||"").trim().toLowerCase(),{system:i,user:c}=ze(e,a,o),l=Xe(c,n);return{token:r,model:s,messages:[{role:"system",content:i},{role:"user",content:l}],temperature:.3,max_tokens:4e3}}function ze(e,t,o){o.language;const n=Number.isInteger(o.items)?o.items:Ye[t]||10,r=o.seedId||Ke(e),s=`
YOU ARE an ESL task generator.
GOAL: create ONE task block of type "${t}" on the topic "${e}".
OUTPUT ONLY VALID JSON. Keep the language level around A1–A2.
All prompts, questions, answers, hints, and labels must be written in ENGLISH.
Encoding — UTF-8. No explanations, no prefixes, no code fences.
Ensure internal consistency so answers match the task logic.
`,a={mcq:{system:`
${s}
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
- ${n} items.
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
Number of items: ${n}.
      `.trim()},gap:{system:`
${s}
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
- ${n} sentences.
- "q" must be a clean English sentence. Do NOT wrap it in angle brackets, quotes, or markdown — use only plain text with a single blank shown as ___ (three underscores).
- "answer" must be an array with at least one valid solution in lowercase (no angle brackets).
- Keep sentences short, level A1–A2, and connected to "${e}".
      `.trim(),user:f(e,"gap",n)},transform:{system:`
${s}
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
- ${n} items.
- Answers must follow the prompt instructions (for example, omit the final period).
- Provide a helpful English hint for each item.
      `.trim(),user:f(e,"transform",n)},match:{system:`
${s}
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
- ${Math.max(6,Math.min(12,n))} unique pairs.
- Provide one clear correct match for each pair without duplicates.
- Use vocabulary related to "${e}".
      `.trim(),user:f(e,"match",n)},error:{system:`
${s}
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
- ${n} sentences containing a typical error connected to "${e}".
- Provide clear English hints.
- Match the formatting requested in the prompt (for example, omit the period).
      `.trim(),user:f(e,"error",n)},order:{system:`
${s}
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
- ${n} items.
- Provide tokens that form exactly the correct answer (lowercase, no period unless required by the topic).
- Use sentences relevant to "${e}".
      `.trim(),user:f(e,"order",n)},short:{system:`
${s}
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
- ${Math.min(6,Math.max(3,Math.floor(n/2)))} tasks that invite short written responses.
- "keywords" act as guidance, not strict scoring rubrics, and must be lowercase English words.
      `.trim(),user:f(e,"short",n)},writing:{system:`
${s}
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
      `.trim(),user:f(e,"writing",n)},roleplay:{system:`
${s}
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
- Include ${Math.max(6,Math.min(10,n))} useful English phrases with brief English explanations or synonyms.
- Do not add bullet symbols inside the strings.
      `.trim(),user:f(e,"roleplay",n)},"dialogue-gap":{system:`
${s}
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
- ${Math.max(4,Math.min(8,n))} turns in the dialogue.
- Use exactly ${Math.max(4,Math.min(8,n))} blanks "___" across the dialogue.
- "words" must include every required word once with no extra distractors.
- "answers" list the correct words in the order the blanks appear (lowercase English).
- Keep each line short (maximum 12 words) and on the topic "${e}".
- Do not add extra fields beyond the schema.
      `.trim(),user:f(e,"dialogue-gap",n)},"dialogue-order":{system:`
${s}
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
- ${Math.max(4,Math.min(8,n))} total lines.
- Each line must contain 6–12 words, sound natural, and stay on the topic "${e}".
- "solution" is an array of zero-based indices describing the correct order of the lines.
- Do not add extra fields beyond the schema.
      `.trim(),user:f(e,"dialogue-order",n)},truefalse:{system:`
${s}
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
- ${Math.max(6,Math.min(12,n))} statements.
- "answer" must be strictly true or false.
- Use simple A1–A2 level sentences in English related to "${e}".
      `.trim(),user:f(e,"truefalse",n)},"definition-match":{system:`
${s}
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
- ${Math.max(6,Math.min(10,n))} pairs.
- "left" must be a single lowercase word without articles.
- "right" must be one sentence of up to 14 words.
- Use vocabulary connected to the topic "${e}".
      `.trim(),user:f(e,"definition-match",n)},"synonym-clue":{system:`
${s}
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
- ${Math.max(6,Math.min(10,n))} items.
- Provide a word bank of 6–8 lowercase English words that includes all correct answers.
- "answers" may contain 1–2 acceptable synonyms, all in lowercase English.
- Write concise clues; omit the final period if the clue is a fragment.
      `.trim(),user:f(e,"synonym-clue",n)},scramble:{system:`
${s}
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
- ${Math.max(6,Math.min(10,n))} items.
- "scrambled" must be a shuffled version of an English word from "${e}".
- "answers" may list 1–2 valid spellings in lowercase English.
      `.trim(),user:f(e,"scramble",n)},wordpairs:{system:`
${s}
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
- ${Math.max(6,Math.min(10,n))} pairs.
- Use accurate singular/plural pairs relevant to "${e}".
- Do not add extra keys beyond the schema.
      `.trim(),user:f(e,"wordpairs",n)},"odd-one-out":{system:`
${s}
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
- ${Math.max(6,Math.min(10,n))} items.
- Provide exactly 4 options per item.
- "answer" must be the index of the odd item as a string ("0"–"3").
- Include a brief English explanation (up to 10 words) for why the option is odd.
- Only one option may be different; the rest must relate to "${e}".
      `.trim(),user:f(e,"odd-one-out",n)},context:{system:`
${s}
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
- Provide ${n} comprehension questions for the passage.
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
}`.trim(),user:f(e,"context",n)}},i=a[t]||a.mcq,c=(o.additionalInstructions||o.extraInstructions||"").trim();return c?{system:i.system,user:`${i.user}

Additional teacher instructions:
${c}`}:i}const Ye={mcq:10,gap:10,transform:10,match:8,error:10,order:10,short:3,writing:1,roleplay:8,"dialogue-gap":6,"dialogue-order":6,truefalse:8,"definition-match":8,"synonym-clue":8,scramble:8,wordpairs:8,"odd-one-out":8,context:4};function f(e,t,o){return`Topic: ${e}
Generate a task block of type "${t}" with ${o} items. Return JSON only that follows the described schema.`}function Ke(e){return String(e||"task").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,6)||"task"}function Xe(e,t){const o=String(e||"").trim(),n=Ze(t);return n?`${o||"Generate the task block."}

STRICT VOCABULARY REQUIREMENTS (communication lesson):
1. Treat the target expressions below as the ONLY lexical focus for the task. Every generated item and every correct answer must contain at least one of these expressions verbatim (you may adapt grammar but keep the core phrase).
2. Do not introduce alternative key phrases or synonyms outside this list; supporting words like articles or pronouns are fine, but the highlighted expression must come from the list.
3. When offering distractors or incorrect options, keep them realistic yet stay close to the topic; never invent brand-new key phrases outside the set.
4. The Ukrainian translations are reference only – the final task must remain fully in English.

Target vocabulary:
${n}`:o||e||""}function Ze(e){if(!Array.isArray(e)||!e.length)return"";const t=n=>{if(!n)return"";const r=n.indexOf(" — "),s=n.indexOf(" – "),a=n.indexOf(" - "),i=[r,s,a].filter(h=>h>=0),c=i.length?Math.min(...i):-1;return(c>=0?n.slice(0,c):n).trim()},o=e.map((n,r)=>{if(!n)return"";const s=n.word||n.term||n.phrase||n.text||`Item ${r+1}`,a=n.translation||n.meaning||n.ua||n.uk||"",i=n.example||n.sentence||n.usage||n.sample||"",c=t(i);let l=`${r+1}. ${s}`;return a&&(l+=` — ${a}`),c&&(l+=` (Example: ${c})`),l}).filter(Boolean);return o.length?o.join(`
`):""}const Ce=document.querySelector(".js-practice-section"),u=document.querySelector("[data-practice-generator]"),K=u==null?void 0:u.querySelector("[data-practice-status]"),G=document.querySelector("[data-generator-output]"),B=document.querySelector("[data-generator-json]"),P=document.querySelector("[data-generator-copy]"),I=document.querySelector("[data-generator-download]"),V=u==null?void 0:u.querySelector("[data-types]"),$=u==null?void 0:u.querySelector("[data-types-trigger]"),_=u==null?void 0:u.querySelector("[data-types-panel]"),xe=document.querySelector("[data-practice-placeholder]"),b=window.lessonContext||{};let C=b.title||"Generated Practice",x=b.level||"custom";const O=[],J=[];function q(e){e&&e.classList.add("hidden")}function le(e){e&&e.classList.remove("hidden")}function Me(e){return!e||e.classList.contains("hidden")}function de(){return localStorage.getItem("hideGenerateSection")==="true"}function oe(){de()?(q(Ce),q(_),q(G),L()):(le(Ce),se(),N())}function re(e){return`${e&&typeof e=="object"&&e.id?String(e.id):String((e==null?void 0:e.type)||"task")}-${Date.now()}-${Math.random().toString(16).slice(2,8)}`}function Ue(){return{title:C||b.title||"Generated Practice",level:x||b.level||"custom",tasks:[...O,...J].map(e=>e.data)}}function N(){if(B){if(de()){q(G);return}if(!O.length&&!J.length){B.textContent="",q(G),P&&(P.disabled=!0),I&&(I.disabled=!0);return}B.textContent=JSON.stringify(Ue(),null,2),le(G),P&&(P.disabled=!1),I&&(I.disabled=!1)}}function et(e){const t=re(e);return J.push({key:t,data:e}),N(),t}function tt(e,t){const o=r=>{const s=r.findIndex(a=>e&&a.key===e||a.data===t);return s!==-1?(r.splice(s,1),!0):!1};(o(J)||o(O))&&N()}function nt(){if(!u)return;const e=u.querySelector('[name="topic"]');if(e&&!e.value){const t=b.title||"Lesson topic";e.value=t}}function S(e,t="idle"){K&&(K.textContent=e,K.dataset.state=t)}function ot(e){return String(e||"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,8)}function X(e){return String(e||"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")}function ue(){return Array.from(u.querySelectorAll('input[name="types"]'))}function rt(e){const t=e.filter(o=>o.checked).map(o=>{var n,r;return(r=(n=o.nextElementSibling)==null?void 0:n.textContent)==null?void 0:r.trim()}).filter(Boolean);return t.length?t.length<=2?t.join(", "):`${t.slice(0,2).join(", ")} +${t.length-2}`:"Оберіть типи"}function se(){if(!$)return;const e=ue();$.textContent=rt(e)}function L(){!_||!$||Me(_)||(q(_),$.setAttribute("aria-expanded","false"))}function st(){if(!_||!$)return;if(Me(_)){le(_),$.setAttribute("aria-expanded","true");const t=_.querySelector('input[name="types"]');t==null||t.focus({preventScroll:!0})}else L()}function at(){const e=!de();localStorage.setItem("hideGenerateSection",String(e)),oe(),N()}function it(){const e=document.getElementById("practice"),t=e==null?void 0:e.querySelector("#practice-body");if(xe&&xe.remove(),t&&t.children.length===1){const o=t.firstElementChild;o&&/практика поки відсутня/i.test(o.textContent||"")&&o.remove()}}function ct(){const e=document.getElementById("practice");if(!e)return;const t=e.querySelector("#practice-body");if(t&&!t.querySelector(".practice-dynamic-title")){const o=document.createElement("div");o.className="practice-dynamic-title",o.innerHTML=`
      <h2>Згенеровані завдання</h2>
      ${b.level?`<p class="muted">Рівень: ${b.level}</p>`:""}
    `,t.prepend(o)}}async function lt(e){var d,M;if(e.preventDefault(),!u)return;const t=u.querySelector('button[type="submit"]'),o=u.querySelector('[name="topic"]'),n=u.querySelector('[name="count"]'),r=u.querySelector('[name="instructions"]'),s=ue(),a=(d=o==null?void 0:o.value)==null?void 0:d.trim(),i=Number.parseInt((n==null?void 0:n.value)||"10",10)||10,c=((M=r==null?void 0:r.value)==null?void 0:M.trim())||"",l=s.filter(g=>g.checked).map(g=>g.value);if(!a){S("Укажіть тему для генерації завдання.","error"),o==null||o.focus();return}if(!l.length&&typeof L=="function"){S("Оберіть принаймні один тип завдання.","error");return}const h=ot(a)||"task";S(`Генеруємо ${l.length} тип(и) завдань…`,"loading"),t&&(t.disabled=!0,t.dataset.originalText=t.dataset.originalText||t.textContent,t.textContent="Генерація…");const E=(String(b.category||"").toLowerCase()==="communication"||!!window.communicationCurrentModule)&&Array.isArray(window.communicationCurrentWords)&&window.communicationCurrentWords.length?window.communicationCurrentWords:void 0;try{const g=l.map(w=>Ge(a,w,{items:i,language:"en",seedId:`${h}-${w}`,...c?{additionalInstructions:c}:{}},E).then(k=>({type:w,task:k}))),R=await Promise.allSettled(g),W=R.map((w,k)=>w.status==="fulfilled"?{type:l[k],task:w.value.task}:null).filter(Boolean),me=R.map((w,k)=>w.status==="rejected"?l[k]:null).filter(Boolean);if(!W.length)throw new Error("Не вдалося згенерувати жодного типу завдань");const he=[];W.forEach(({type:w,task:k})=>{const Q={...k};Q.id||(Q.id=`${w}-${h}-${Date.now().toString(36)}${Math.random().toString(36).slice(2,6)}`);const Le=et(Q);he.push({task:Q,key:Le})}),it(),window.practice&&typeof window.practice.appendTask=="function"&&(ct(),he.forEach(({task:w,key:k})=>{window.practice.appendTask(w,{key:k})})),L();const pe=W.map(({type:w})=>w).join(", ");me.length?S(`Згенеровано: ${pe}. Помилки: ${me.join(", ")}`,"success"):S(`Готово! Додано ${W.length} блок(и): ${pe}.`,"success")}catch(g){console.error(g);const R=g instanceof Error&&g.message?`Помилка: ${g.message}`:"Не вдалося згенерувати завдання. Перевірте токен або спробуйте ще раз.";S(R,"error")}finally{if(t){const g=t.dataset.originalText||"Згенерувати завдання";t.disabled=!1,t.textContent=g}}}async function dt(){if(!B)return;const e=B.textContent;if(e)try{await navigator.clipboard.writeText(e),S("JSON скопійовано у буфер.","success")}catch(t){console.error(t),S("Не вдалося скопіювати JSON. Спробуйте вручну.","error")}}function ut(e){return`${X(b.id)||X(e.title)||X(b.title)||"practice"||"practice"}.json`}async function mt(){const e=Ue(),t=JSON.stringify(e,null,2);if(!t||t==="{}"||t==="[]"){S("Немає даних для завантаження.","error");return}try{const o=new Blob([t],{type:"application/json"}),n=URL.createObjectURL(o),r=document.createElement("a");r.href=n,r.download=ut(e),document.body.appendChild(r),r.click(),document.body.removeChild(r),URL.revokeObjectURL(n),S("Файл завантажено.","success")}catch(o){console.error(o),S("Не вдалося завантажити файл.","error")}}function ht(){if(u){if(nt(),u.addEventListener("submit",lt),P&&(P.addEventListener("click",dt),P.disabled=!0),I&&(I.addEventListener("click",mt),I.disabled=!0),$&&_&&V){$.setAttribute("aria-haspopup","true"),$.setAttribute("aria-expanded","false"),$.addEventListener("click",()=>{st()});const e=o=>{V.contains(o.target)||L()};document.addEventListener("pointerdown",e);const t=o=>{const n=o.relatedTarget;(!n||!V.contains(n))&&L()};V.addEventListener("focusout",t),document.addEventListener("keydown",o=>{o.key==="Escape"&&(L(),$.focus())}),ue().forEach(o=>{o.addEventListener("change",()=>{se()})}),se(),u.addEventListener("submit",()=>{L()})}document.addEventListener("practice:taskRemoved",e=>{const t=e.detail||{};tt(t.key,t.task)}),document.addEventListener("practice:dataLoaded",e=>{const t=e.detail;O.length=0,t&&Array.isArray(t.entries)?(C=t.title??C,x=t.level??x,t.entries.forEach(({task:o,key:n})=>{const r=n||re(o);O.push({key:r,data:o})})):t&&Array.isArray(t.tasks)?(C=t.title??C,x=t.level??x,t.tasks.forEach(o=>{const n=o&&o.id?String(o.id):re(o);O.push({key:n,data:o})})):t?(C=t.title??C,x=t.level??x):(C=b.title||C,x=b.level||x),N(),oe()}),oe(),N(),document.addEventListener("keydown",e=>{e.code&&e.code==="KeyH"&&e.ctrlKey&&e.shiftKey&&(e.preventDefault(),at())})}}ht();
//# sourceMappingURL=lesson.js.map
