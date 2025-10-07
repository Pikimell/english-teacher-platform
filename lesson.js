import"./assets/main-Dnzr3yj7.js";import{l as oe,a as xe,b as se}from"./assets/custom-lessons-store-BSttwj8q.js";import{c as de}from"./assets/custom-lesson-presets-B74WAqg2.js";const Ae="modulepreload",Me=function(e){return"/english-teacher-platform/"+e},ue={},F=function(t,n,r){let s=Promise.resolve();if(n&&n.length>0){document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),i=(a==null?void 0:a.nonce)||(a==null?void 0:a.getAttribute("nonce"));s=Promise.allSettled(n.map(c=>{if(c=Me(c),c in ue)return;ue[c]=!0;const f=c.endsWith(".css"),g=f?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${g}`))return;const p=document.createElement("link");if(p.rel=f?"stylesheet":Ae,f||(p.as="script"),p.crossOrigin="",p.href=c,i&&p.setAttribute("nonce",i),document.head.appendChild(p),f)return new Promise((m,h)=>{p.addEventListener("load",m),p.addEventListener("error",()=>h(new Error(`Unable to preload CSS for ${c}`)))})}))}function o(a){const i=new Event("vite:preloadError",{cancelable:!0});if(i.payload=a,window.dispatchEvent(i),!i.defaultPrevented)throw a}return s.then(a=>{for(const i of a||[])i.status==="rejected"&&o(i.reason);return t().catch(o)})},_e={BASE_URL:"/english-teacher-platform/",DEV:!1,MODE:"production",PROD:!0,SSR:!1},Ue={body:()=>F(()=>import("./assets/body-CuWMwF77.js"),[]),"small-talk":()=>F(()=>import("./assets/smallTalk-DDzvHpnt.js"),[]),"problem-solving":()=>F(()=>import("./assets/problemSolving-C-zZWj-W.js"),[]),feedback:()=>F(()=>import("./assets/feedback-CMqLBQCG.js"),[])},J=typeof import.meta<"u"&&_e&&"/english-teacher-platform/"||"/";function ae(e){const t=J.endsWith("/")?J:`${J}/`,n=String(e||"");return n.startsWith(t)?n:`${t}${n.replace(/^\/+/,"")}`}const O=new URLSearchParams(window.location.search),N=O.get("topic"),me=O.get("custom"),pe=O.get("title"),he=O.get("category"),fe=O.get("level"),ye=O.get("file"),d=N?oe.find(e=>e.id===N):void 0,w=(()=>{if(!me)return null;const e=[];return Array.isArray(de)&&de.forEach(t=>{if(!t||typeof t!="object")return;const n=Array.isArray(t.topicIds)?[...t.topicIds]:[];!t.id||!n.length||e.push({...t,topicIds:n,source:"preset"})}),xe().filter(t=>t&&typeof t=="object").forEach(t=>{const n=Array.isArray(t.topicIds)?[...t.topicIds]:[];!t.id||!n.length||e.push({...t,topicIds:n,source:"local"})}),e.find(t=>t.id===me)??null})(),T=!!w,W=T?w.title:d!=null&&d.title?d.title:pe?decodeURIComponent(pe):"Матеріал уроку",X=T?"custom":d!=null&&d.category?d.category:he?decodeURIComponent(he):"",Z=(()=>{if(T){if(w.level)return w.level;const e=(w.topicIds||[]).map(n=>oe.find(r=>r.id===n)).filter(Boolean);return Array.from(new Set(e.map(n=>n.level))).sort().join(", ")}return d!=null&&d.level?d.level:fe?decodeURIComponent(fe):""})(),ee=(()=>{if(T)return null;const e=(d==null?void 0:d.htmlPath)??(ye?decodeURIComponent(ye):null);return e&&e.startsWith("lessons/")?e:null})();window.lessonContext={id:T?w.id:(d==null?void 0:d.id)??N??null,title:W,category:X,level:Z,htmlPath:ee,source:T?w.source||"custom":"catalog",topicIds:T?[...w.topicIds||[]]:d!=null&&d.id?[d.id]:N?[N]:[],isCustomLesson:T};const ge=document.querySelector("[data-lesson-title]"),we=document.querySelector("[data-lesson-category]"),Ee=document.querySelector("[data-lesson-level]"),M=document.querySelector("[data-lesson-status]"),x=document.getElementById("lesson-content");function Le(){const e=document.querySelector('[data-component="copyright-year"]');e&&(e.textContent=String(new Date().getFullYear()))}function Pe(){ge&&(ge.textContent=W);const t=(()=>{var r;return T?"Комбінований урок":((r=se[X])==null?void 0:r.label)??""})()||X;we&&(we.textContent=t||""),Ee&&(Ee.textContent=Z?`Рівень: ${Z}`:"");const n=document.getElementById("practice-title");n&&(n.textContent=W),document.title=`${W} | English Teacher Platform`}function $e(e){return`lesson-topic-${String(e||"").trim().toLowerCase().replace(/[^a-z0-9_-]+/g,"-").replace(/^-+|-+$/g,"")||"topic"}`}function Ie(e){if(!e.length)return null;const t=document.createElement("section");t.className="lesson-custom-summary";const n=document.createElement("h2");n.textContent="Склад уроку",t.appendChild(n);const r=document.createElement("ul");return r.className="lesson-custom-summary__list",e.forEach(s=>{var p;const o=document.createElement("li");o.className="lesson-custom-summary__item";const a=((p=se[s.category])==null?void 0:p.label)??s.category,i=$e(s.id),c=document.createElement("a");c.className="lesson-custom-summary__link",c.href=`#${i}`,c.dataset.topicAnchor=i;const f=document.createElement("strong");f.textContent=s.title;const g=document.createElement("span");g.textContent=`${a} · ${s.level}`,c.appendChild(f),c.appendChild(g),c.addEventListener("click",m=>{const h=document.getElementById(i);h&&(m.preventDefault(),h.scrollIntoView({behavior:"smooth",block:"start"}),requestAnimationFrame(()=>{try{h.focus({preventScroll:!0})}catch{h.focus()}}))}),o.appendChild(c),r.appendChild(o)}),t.appendChild(r),t}async function Re(e){if(!e)return null;const t=new Set;if(e.id&&t.add(`data/practice/${e.id}.json`),e.htmlPath){const n=String(e.htmlPath).replace(/^\.?\/?/,"").replace(/\.html?$/i,"");if(n){t.add(`data/practice/${n}.json`);const r=n.split("/"),s=r[r.length-1];s&&t.add(`data/practice/${s}.json`)}}for(const n of t)try{const r=await fetch(ae(n),{cache:"no-store"});if(!r.ok)continue;const s=await r.json();if(s&&Array.isArray(s.tasks)&&s.tasks.length)return s}catch(r){console.warn(`Не вдалося завантажити практику за шляхом ${n}`,r)}return null}function z(e){if(!e)return;const t=document.createElement("p");t.className="practice-inline__empty muted",t.textContent="Практика для цієї теми поки відсутня.",e.appendChild(t)}async function qe(){var s;if(!x)return;const e=((w==null?void 0:w.topicIds)||[]).map(o=>oe.find(a=>a.id===o)).filter(Boolean);if(!e.length){M&&(M.textContent="Не вдалося знайти вибрані теми. Створіть урок заново.");return}if(x.innerHTML="",w!=null&&w.description){const o=document.createElement("p");o.className="lesson-custom-description",o.textContent=w.description,x.appendChild(o)}const t={communication:0,grammar:1,quick:2},n=e.slice().sort((o,a)=>{const i=t[o.category]??99,c=t[a.category]??99;return i!==c?i-c:0}),r=Ie(n);r&&x.appendChild(r);for(const o of n){const a=document.createElement("section");a.className="lesson-topic",a.dataset.topicId=o.id;const i=$e(o.id);a.id=i,a.setAttribute("tabindex","-1");const c=document.createElement("header");c.className="lesson-topic__header";const f=document.createElement("h3");f.className="lesson-topic__title",f.textContent=o.title,c.appendChild(f);const g=document.createElement("p");g.className="lesson-topic__meta";const p=((s=se[o.category])==null?void 0:s.label)??o.category;g.textContent=`${p} · Рівень ${o.level}`,c.appendChild(g),a.appendChild(c);const m=document.createElement("div");m.className="lesson-topic__body",a.appendChild(m),x.appendChild(a);try{const l=await fetch(ae(o.htmlPath));if(!l.ok)throw new Error(`Не вдалося завантажити файл: ${l.status}`);const U=await l.text();m.innerHTML=U}catch(l){m.innerHTML='<p class="lesson-topic__error">Не вдалося завантажити матеріал цієї теми.</p>',console.error(l)}const h=document.createElement("div");h.className="lesson-topic__practice",a.appendChild(h);try{const l=await Re(o);if(l&&Array.isArray(l.tasks)&&l.tasks.length){const U=window.practice||{},j=l.title?`Практика: ${l.title}`:`Практика: ${o.title}`,B=l.level||o.level||"";typeof U.renderTaskList=="function"?U.renderTaskList(h,l.tasks,{title:j,level:B,description:l.description,keyPrefix:`${o.id}-practice`}):z(h)}else z(h)}catch(l){console.error("Помилка під час завантаження практики",l),z(h)}}M&&M.remove(),await Te(x)}async function Oe(){if(x){if(T){await qe();return}if(!ee){M&&(M.textContent="Не вдалося визначити файл з матеріалом. Перейдіть назад та оберіть тему зі списку.");return}try{const e=await fetch(ae(ee));if(!e.ok)throw new Error(`Не вдалося завантажити файл: ${e.status}`);const t=await e.text();x.innerHTML=t,await Te(x)}catch(e){M&&(M.textContent="Сталася помилка під час завантаження матеріалу. Спробуйте пізніше або поверніться до каталогу."),console.error(e)}}}function Ne(e,t){if(!e)return;const n=Array.isArray(t)?t:[];if(!n.length)return;e.classList.add("communication__table");const r=document.createElement("table"),s=document.createElement("thead"),o=document.createElement("tr");["Слово","Переклад","Приклад"].forEach(i=>{const c=document.createElement("th");c.textContent=i,o.appendChild(c)}),s.appendChild(o);const a=document.createElement("tbody");n.forEach(i=>{if(!i)return;const c=document.createElement("tr"),f=document.createElement("td");f.textContent=i.word||i.term||"";const g=document.createElement("td");g.textContent=i.translation||i.meaning||"";const p=document.createElement("td");p.textContent=i.example||i.sentence||"",c.appendChild(f),c.appendChild(g),c.appendChild(p),a.appendChild(c)}),r.appendChild(s),r.appendChild(a),e.innerHTML="",e.appendChild(r)}async function Te(e){if(!e)return;const t=e.querySelectorAll("[data-communication-words]");if(t.length){window.communicationVocabularyMap=window.communicationVocabularyMap||{};for(const n of t){const r=n.getAttribute("data-module");if(!r)continue;const s=Ue[r];if(typeof s=="function")try{const o=await s(),a=(o==null?void 0:o.default)||(o==null?void 0:o.words)||[];if(!Array.isArray(a)||!a.length)continue;window.communicationVocabularyMap[r]=a,window.communicationCurrentWords=a,Ne(n,a)}catch(o){console.error(`Не вдалося завантажити слова для модуля "${r}"`,o)}}}}function He(){Le(),Pe(),Oe()}He();const je=async e=>{const n="https://vq1wtq2d2l.execute-api.us-east-2.amazonaws.com/dev"+"/openai";return await fetch(n,{method:"POST",body:JSON.stringify(e),headers:{"Content-Type":"application/json"}}).then(s=>s.json())},Be=async(e,t,n={},r=[])=>{const s=De(e,t,n,r),o=await je(s);try{return typeof o=="string"?JSON.parse(o):o}catch{const i=typeof o=="string"?o.match(/\{[\s\S]*\}$/):null;if(i)return JSON.parse(i[0]);throw new Error("Не вдалося розпарсити JSON відповіді моделі")}};function De(e,t,n={},r=[]){const s=localStorage.getItem("gptToken");if(!s||(s==null?void 0:s.length)<10){console.warn("⚠️ gptToken відсутній у localStorage");const g=prompt("Enter Your GPT Token");localStorage.setItem("gptToken",g)}const o="gpt-4o-mini",a=String(t||"").trim().toLowerCase(),{system:i,user:c}=Fe(e,a,n),f=Ve(c,r);return{token:s,model:o,messages:[{role:"system",content:i},{role:"user",content:f}],temperature:.3,max_tokens:4e3}}function Fe(e,t,n){n.language;const r=Number.isInteger(n.items)?n.items:Qe[t]||10,s=n.seedId||We(e),o=`
YOU ARE an ESL task generator.
GOAL: create ONE task block of type "${t}" on the topic "${e}".
OUTPUT ONLY VALID JSON. Keep the language level around A1–A2.
All prompts, questions, answers, hints, and labels must be written in ENGLISH.
Encoding — UTF-8. No explanations, no prefixes, no code fences.
Ensure internal consistency so answers match the task logic.
`,a={mcq:{system:`
${o}
OUTPUT SCHEMA:
{
  "id": "mcq-${s}-1",
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
${o}
OUTPUT SCHEMA:
{
  "id": "gap-${s}-1",
  "type": "gap",
  "prompt": "Fill the gaps with the correct word.",
  "items": [
    { "q": "<They ___ (work) on Sundays.>", "answer": ["<correct_form>", "<alternative_if_any>"] },
    ...
  ]
}
REQUIREMENTS:
- ${r} sentences.
- "answer" must always be an array with at least one valid solution in lowercase.
- Keep sentences short, level A1–A2, and connected to "${e}".
      `.trim(),user:y(e,"gap",r)},transform:{system:`
${o}
OUTPUT SCHEMA:
{
  "id": "transform-${s}-1",
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
      `.trim(),user:y(e,"transform",r)},match:{system:`
${o}
OUTPUT SCHEMA:
{
  "id": "match-${s}-1",
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
      `.trim(),user:y(e,"match",r)},error:{system:`
${o}
OUTPUT SCHEMA:
{
  "id": "error-${s}-1",
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
      `.trim(),user:y(e,"error",r)},order:{system:`
${o}
OUTPUT SCHEMA:
{
  "id": "order-${s}-1",
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
      `.trim(),user:y(e,"order",r)},short:{system:`
${o}
OUTPUT SCHEMA:
{
  "id": "short-${s}-1",
  "type": "short",
  "prompt": "Write short answers about ${e}.",
  "items": [
    { "q": "Write 2–3 sentences about your daily routine.", "keywords": ["i", "usually", "every"] }
  ]
}
REQUIREMENTS:
- ${Math.min(6,Math.max(3,Math.floor(r/2)))} tasks that invite short written responses.
- "keywords" act as guidance, not strict scoring rubrics, and must be lowercase English words.
      `.trim(),user:y(e,"short",r)},writing:{system:`
${o}
OUTPUT SCHEMA:
{
  "id": "writing-${s}-1",
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
      `.trim(),user:y(e,"writing",r)},roleplay:{system:`
${o}
OUTPUT SCHEMA:
{
  "id": "roleplay-${s}-1",
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
      `.trim(),user:y(e,"roleplay",r)},"dialogue-gap":{system:`
${o}
OUTPUT SCHEMA:
{
  "id": "dialogue-gap-${s}-1",
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
- "words" must include every required word once with no extra distractors.
- "answers" list the correct words in the order the blanks appear (lowercase English).
- Keep each line short (maximum 12 words) and on the topic "${e}".
- Do not add extra fields beyond the schema.
      `.trim(),user:y(e,"dialogue-gap",r)},"dialogue-order":{system:`
${o}
OUTPUT SCHEMA:
{
  "id": "dialogue-order-${s}-1",
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
      `.trim(),user:y(e,"dialogue-order",r)},truefalse:{system:`
${o}
OUTPUT SCHEMA:
{
  "id": "truefalse-${s}-1",
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
      `.trim(),user:y(e,"truefalse",r)},"definition-match":{system:`
${o}
OUTPUT SCHEMA:
{
  "id": "definition-match-${s}-1",
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
      `.trim(),user:y(e,"definition-match",r)},"synonym-clue":{system:`
${o}
OUTPUT SCHEMA:
{
  "id": "synonym-clue-${s}-1",
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
      `.trim(),user:y(e,"synonym-clue",r)},scramble:{system:`
${o}
OUTPUT SCHEMA:
{
  "id": "scramble-${s}-1",
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
      `.trim(),user:y(e,"scramble",r)},wordpairs:{system:`
${o}
OUTPUT SCHEMA:
{
  "id": "wordpairs-${s}-1",
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
      `.trim(),user:y(e,"wordpairs",r)},"odd-one-out":{system:`
${o}
OUTPUT SCHEMA:
{
  "id": "odd-one-out-${s}-1",
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
      `.trim(),user:y(e,"odd-one-out",r)},context:{system:`
${o}
OUTPUT SCHEMA:
{
  "id": "context-${s}-1",
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
}`.trim(),user:y(e,"context",r)}},i=a[t];return i||a.mcq}const Qe={mcq:10,gap:10,transform:10,match:8,error:10,order:10,short:3,writing:1,roleplay:8,"dialogue-gap":6,"dialogue-order":6,truefalse:8,"definition-match":8,"synonym-clue":8,scramble:8,wordpairs:8,"odd-one-out":8,context:4};function y(e,t,n){return`Topic: ${e}
Generate a task block of type "${t}" with ${n} items. Return JSON only that follows the described schema.`}function We(e){return String(e||"task").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,6)||"task"}function Ve(e,t){const n=String(e||"").trim(),r=Ge(t);return r?`${n||"Generate the task block."}

Focus on these vocabulary items:
${r}`:n||e||""}function Ge(e){if(!Array.isArray(e)||!e.length)return"";const t=e.map((n,r)=>{if(!n)return"";const s=n.word||n.term||n.phrase||n.text||`Item ${r+1}`,o=n.translation||n.meaning||n.ua||n.uk||"",a=n.example||n.sentence||n.usage||n.sample||"";let i=`${r+1}. ${s}`;return o&&(i+=` — ${o}`),a&&(i+=` (Example: ${a})`),i}).filter(Boolean);return t.length?t.join(`
`):""}const be=document.querySelector(".js-practice-section"),u=document.querySelector("[data-practice-generator]"),K=u==null?void 0:u.querySelector("[data-practice-status]"),V=document.querySelector("[data-generator-output]"),H=document.querySelector("[data-generator-json]"),L=document.querySelector("[data-generator-copy]"),P=document.querySelector("[data-generator-download]"),Q=u==null?void 0:u.querySelector("[data-types]"),$=u==null?void 0:u.querySelector("[data-types-trigger]"),A=u==null?void 0:u.querySelector("[data-types-panel]"),Se=document.querySelector("[data-practice-placeholder]"),b=window.lessonContext||{};let C=b.title||"Generated Practice",k=b.level||"custom";const I=[],G=[];function R(e){e&&e.classList.add("hidden")}function ie(e){e&&e.classList.remove("hidden")}function ve(e){return!e||e.classList.contains("hidden")}function ce(){return localStorage.getItem("hideGenerateSection")==="true"}function te(){ce()?(R(be),R(A),R(V),_()):(ie(be),re(),q())}function ne(e){return`${e&&typeof e=="object"&&e.id?String(e.id):String((e==null?void 0:e.type)||"task")}-${Date.now()}-${Math.random().toString(16).slice(2,8)}`}function Ce(){return{title:C||b.title||"Generated Practice",level:k||b.level||"custom",tasks:[...I,...G].map(e=>e.data)}}function q(){if(H){if(ce()){R(V);return}if(!I.length&&!G.length){H.textContent="",R(V),L&&(L.disabled=!0),P&&(P.disabled=!0);return}H.textContent=JSON.stringify(Ce(),null,2),ie(V),L&&(L.disabled=!1),P&&(P.disabled=!1)}}function Je(e){const t=ne(e);return G.push({key:t,data:e}),q(),t}function ze(e,t){const n=s=>{const o=s.findIndex(a=>e&&a.key===e||a.data===t);return o!==-1?(s.splice(o,1),!0):!1};(n(G)||n(I))&&q()}function Ke(){if(!u)return;const e=u.querySelector('[name="topic"]');if(e&&!e.value){const t=b.title||"Lesson topic";e.value=t}}function S(e,t="idle"){K&&(K.textContent=e,K.dataset.state=t)}function Ye(e){return String(e||"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,8)}function Y(e){return String(e||"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")}function le(){return Array.from(u.querySelectorAll('input[name="types"]'))}function Xe(e){const t=e.filter(n=>n.checked).map(n=>{var r,s;return(s=(r=n.nextElementSibling)==null?void 0:r.textContent)==null?void 0:s.trim()}).filter(Boolean);return t.length?t.length<=2?t.join(", "):`${t.slice(0,2).join(", ")} +${t.length-2}`:"Оберіть типи"}function re(){if(!$)return;const e=le();$.textContent=Xe(e)}function _(){!A||!$||ve(A)||(R(A),$.setAttribute("aria-expanded","false"))}function Ze(){if(!A||!$)return;if(ve(A)){ie(A),$.setAttribute("aria-expanded","true");const t=A.querySelector('input[name="types"]');t==null||t.focus({preventScroll:!0})}else _()}function et(){const e=!ce();localStorage.setItem("hideGenerateSection",String(e)),te(),q()}function tt(){const e=document.getElementById("practice"),t=e==null?void 0:e.querySelector("#practice-body");if(Se&&Se.remove(),t&&t.children.length===1){const n=t.firstElementChild;n&&/практика поки відсутня/i.test(n.textContent||"")&&n.remove()}}function nt(){const e=document.getElementById("practice");if(!e)return;const t=e.querySelector("#practice-body");if(t&&!t.querySelector(".practice-dynamic-title")){const n=document.createElement("div");n.className="practice-dynamic-title",n.innerHTML=`
      <h2>Згенеровані завдання</h2>
      ${b.level?`<p class="muted">Рівень: ${b.level}</p>`:""}
    `,t.prepend(n)}}async function rt(e){var p;if(e.preventDefault(),!u)return;const t=u.querySelector('button[type="submit"]'),n=u.querySelector('[name="topic"]'),r=u.querySelector('[name="count"]'),s=le(),o=(p=n==null?void 0:n.value)==null?void 0:p.trim(),a=Number.parseInt((r==null?void 0:r.value)||"10",10)||10,i=s.filter(m=>m.checked).map(m=>m.value);if(!o){S("Укажіть тему для генерації завдання.","error"),n==null||n.focus();return}if(!i.length&&typeof _=="function"){S("Оберіть принаймні один тип завдання.","error");return}const c=Ye(o)||"task";S(`Генеруємо ${i.length} тип(и) завдань…`,"loading"),t&&(t.disabled=!0,t.dataset.originalText=t.dataset.originalText||t.textContent,t.textContent="Генерація…");const g=String(b.category||"").toLowerCase()==="communication"&&Array.isArray(window.communicationCurrentWords)&&window.communicationCurrentWords.length?window.communicationCurrentWords:void 0;try{const m=i.map(E=>Be(o,E,{items:a,language:"en",seedId:`${c}-${E}`},g).then(v=>({type:E,task:v}))),h=await Promise.allSettled(m),l=h.map((E,v)=>E.status==="fulfilled"?{type:i[v],task:E.value.task}:null).filter(Boolean),U=h.map((E,v)=>E.status==="rejected"?i[v]:null).filter(Boolean);if(!l.length)throw new Error("Не вдалося згенерувати жодного типу завдань");const j=[];l.forEach(({type:E,task:v})=>{const D={...v};D.id||(D.id=`${E}-${c}-${Date.now().toString(36)}${Math.random().toString(36).slice(2,6)}`);const ke=Je(D);j.push({task:D,key:ke})}),tt(),window.practice&&typeof window.practice.appendTask=="function"&&(nt(),j.forEach(({task:E,key:v})=>{window.practice.appendTask(E,{key:v})})),_();const B=l.map(({type:E})=>E).join(", ");U.length?S(`Згенеровано: ${B}. Помилки: ${U.join(", ")}`,"success"):S(`Готово! Додано ${l.length} блок(и): ${B}.`,"success")}catch(m){console.error(m);const h=m instanceof Error&&m.message?`Помилка: ${m.message}`:"Не вдалося згенерувати завдання. Перевірте токен або спробуйте ще раз.";S(h,"error")}finally{if(t){const m=t.dataset.originalText||"Згенерувати завдання";t.disabled=!1,t.textContent=m}}}async function ot(){if(!H)return;const e=H.textContent;if(e)try{await navigator.clipboard.writeText(e),S("JSON скопійовано у буфер.","success")}catch(t){console.error(t),S("Не вдалося скопіювати JSON. Спробуйте вручну.","error")}}function st(e){return`${Y(b.id)||Y(e.title)||Y(b.title)||"practice"||"practice"}.json`}async function at(){const e=Ce(),t=JSON.stringify(e,null,2);if(!t||t==="{}"||t==="[]"){S("Немає даних для завантаження.","error");return}try{const n=new Blob([t],{type:"application/json"}),r=URL.createObjectURL(n),s=document.createElement("a");s.href=r,s.download=st(e),document.body.appendChild(s),s.click(),document.body.removeChild(s),URL.revokeObjectURL(r),S("Файл завантажено.","success")}catch(n){console.error(n),S("Не вдалося завантажити файл.","error")}}function it(){if(u){if(Ke(),u.addEventListener("submit",rt),L&&(L.addEventListener("click",ot),L.disabled=!0),P&&(P.addEventListener("click",at),P.disabled=!0),$&&A&&Q){$.setAttribute("aria-haspopup","true"),$.setAttribute("aria-expanded","false"),$.addEventListener("click",()=>{Ze()});const e=n=>{Q.contains(n.target)||_()};document.addEventListener("pointerdown",e);const t=n=>{const r=n.relatedTarget;(!r||!Q.contains(r))&&_()};Q.addEventListener("focusout",t),document.addEventListener("keydown",n=>{n.key==="Escape"&&(_(),$.focus())}),le().forEach(n=>{n.addEventListener("change",()=>{re()})}),re(),u.addEventListener("submit",()=>{_()})}document.addEventListener("practice:taskRemoved",e=>{const t=e.detail||{};ze(t.key,t.task)}),document.addEventListener("practice:dataLoaded",e=>{const t=e.detail;I.length=0,t&&Array.isArray(t.entries)?(C=t.title??C,k=t.level??k,t.entries.forEach(({task:n,key:r})=>{const s=r||ne(n);I.push({key:s,data:n})})):t&&Array.isArray(t.tasks)?(C=t.title??C,k=t.level??k,t.tasks.forEach(n=>{const r=n&&n.id?String(n.id):ne(n);I.push({key:r,data:n})})):t?(C=t.title??C,k=t.level??k):(C=b.title||C,k=b.level||k),q(),te()}),te(),q(),document.addEventListener("keydown",e=>{e.code&&e.code==="KeyH"&&e.ctrlKey&&e.shiftKey&&(e.preventDefault(),et())})}}it();
//# sourceMappingURL=lesson.js.map
