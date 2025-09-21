import{l as ge,a as we}from"./assets/lessons-BF2nmHKJ.js";const Ee="modulepreload",be=function(e){return"/english-teacher-platform/"+e},re={},_=function(t,n,o){let r=Promise.resolve();if(n&&n.length>0){document.getElementsByTagName("link");const i=document.querySelector("meta[property=csp-nonce]"),a=(i==null?void 0:i.nonce)||(i==null?void 0:i.getAttribute("nonce"));r=Promise.allSettled(n.map(l=>{if(l=be(l),l in re)return;re[l]=!0;const w=l.endsWith(".css"),$=w?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${$}`))return;const m=document.createElement("link");if(m.rel=w?"stylesheet":Ee,w||(m.as="script"),m.crossOrigin="",m.href=l,a&&m.setAttribute("nonce",a),document.head.appendChild(m),w)return new Promise((h,C)=>{m.addEventListener("load",h),m.addEventListener("error",()=>C(new Error(`Unable to preload CSS for ${l}`)))})}))}function s(i){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=i,window.dispatchEvent(a),!a.defaultPrevented)throw i}return r.then(i=>{for(const a of i||[])a.status==="rejected"&&s(a.reason);return t().catch(s)})},Se={BASE_URL:"/english-teacher-platform/",DEV:!1,MODE:"production",PROD:!0,SSR:!1},Te={body:()=>_(()=>import("./assets/body-CuWMwF77.js"),[]),"small-talk":()=>_(()=>import("./assets/smallTalk-DDzvHpnt.js"),[]),"problem-solving":()=>_(()=>import("./assets/problemSolving-C-zZWj-W.js"),[]),feedback:()=>_(()=>import("./assets/feedback-CMqLBQCG.js"),[])},D=typeof import.meta<"u"&&Se&&"/english-teacher-platform/"||"/";function $e(e){const t=D.endsWith("/")?D:`${D}/`,n=String(e||"");return n.startsWith(t)?n:`${t}${n.replace(/^\/+/,"")}`}const L=new URLSearchParams(window.location.search),W=L.get("topic"),se=L.get("title"),ae=L.get("category"),ie=L.get("level"),ce=L.get("file"),u=W?ge.find(e=>e.id===W):void 0,F=(u==null?void 0:u.title)??(se?decodeURIComponent(se):"Матеріал уроку"),V=(u==null?void 0:u.category)??(ae?decodeURIComponent(ae):""),G=(u==null?void 0:u.level)??(ie?decodeURIComponent(ie):""),J=(()=>{const e=(u==null?void 0:u.htmlPath)??(ce?decodeURIComponent(ce):null);return e&&e.startsWith("lessons/")?e:null})();window.lessonContext={id:(u==null?void 0:u.id)??W??null,title:F,category:V,level:G,htmlPath:J};const le=document.querySelector("[data-lesson-title]"),de=document.querySelector("[data-lesson-category]"),ue=document.querySelector("[data-lesson-level]"),q=document.querySelector("[data-lesson-status]"),B=document.getElementById("lesson-content");function ve(){const e=document.querySelector('[data-component="copyright-year"]');e&&(e.textContent=String(new Date().getFullYear()))}function ke(){var n;le&&(le.textContent=F);const t=(((n=we[V])==null?void 0:n.label)??"")||V;de&&(de.textContent=t||""),ue&&(ue.textContent=G?`Рівень: ${G}`:""),document.title=`${F} | English Teacher Platform`}async function xe(){if(B){if(!J){q&&(q.textContent="Не вдалося визначити файл з матеріалом. Перейдіть назад та оберіть тему зі списку.");return}try{const e=await fetch($e(J));if(!e.ok)throw new Error(`Не вдалося завантажити файл: ${e.status}`);const t=await e.text();B.innerHTML=t,await Ue(B)}catch(e){q&&(q.textContent="Сталася помилка під час завантаження матеріалу. Спробуйте пізніше або поверніться до каталогу."),console.error(e)}}}function Ce(e,t){if(!e)return;const n=Array.isArray(t)?t:[];if(!n.length)return;e.classList.add("communication__table");const o=document.createElement("table"),r=document.createElement("thead"),s=document.createElement("tr");["Слово","Переклад","Приклад"].forEach(a=>{const l=document.createElement("th");l.textContent=a,s.appendChild(l)}),r.appendChild(s);const i=document.createElement("tbody");n.forEach(a=>{if(!a)return;const l=document.createElement("tr"),w=document.createElement("td");w.textContent=a.word||a.term||"";const $=document.createElement("td");$.textContent=a.translation||a.meaning||"";const m=document.createElement("td");m.textContent=a.example||a.sentence||"",l.appendChild(w),l.appendChild($),l.appendChild(m),i.appendChild(l)}),o.appendChild(r),o.appendChild(i),e.innerHTML="",e.appendChild(o)}async function Ue(e){if(!e)return;const t=e.querySelectorAll("[data-communication-words]");if(t.length){window.communicationVocabularyMap=window.communicationVocabularyMap||{};for(const n of t){const o=n.getAttribute("data-module");if(!o)continue;const r=Te[o];if(typeof r=="function")try{const s=await r(),i=(s==null?void 0:s.default)||(s==null?void 0:s.words)||[];if(!Array.isArray(i)||!i.length)continue;window.communicationVocabularyMap[o]=i,window.communicationCurrentWords=i,Ce(n,i)}catch(s){console.error(`Не вдалося завантажити слова для модуля "${o}"`,s)}}}}function Me(){ve(),ke(),xe()}Me();const Ae=async e=>{const n="https://vq1wtq2d2l.execute-api.us-east-2.amazonaws.com/dev"+"/openai";return await fetch(n,{method:"POST",body:JSON.stringify(e),headers:{"Content-Type":"application/json"}}).then(r=>r.json())},Pe=async(e,t,n={},o=[])=>{const r=Le(e,t,n,o),s=await Ae(r);try{return typeof s=="string"?JSON.parse(s):s}catch{const a=typeof s=="string"?s.match(/\{[\s\S]*\}$/):null;if(a)return JSON.parse(a[0]);throw new Error("Не вдалося розпарсити JSON відповіді моделі")}};function Le(e,t,n={},o=[]){const r=localStorage.getItem("gptToken");if(!r||(r==null?void 0:r.length)<10){console.warn("⚠️ gptToken відсутній у localStorage");const $=prompt("Enter Your GPT Token");localStorage.setItem("gptToken",$)}const s="gpt-4o-mini",i=String(t||"").trim().toLowerCase(),{system:a,user:l}=Re(e,i,n),w=qe(l,o);return{token:r,model:s,messages:[{role:"system",content:a},{role:"user",content:w}],temperature:.3,max_tokens:4e3}}function Re(e,t,n){n.language;const o=Number.isInteger(n.items)?n.items:Oe[t]||10,r=n.seedId||_e(e),s=`
YOU ARE an ESL task generator.
GOAL: create ONE task block of type "${t}" on the topic "${e}".
OUTPUT ONLY VALID JSON. Keep the language level around A1–A2.
All prompts, questions, answers, hints, and labels must be written in ENGLISH.
Encoding — UTF-8. No explanations, no prefixes, no code fences.
Ensure internal consistency so answers match the task logic.
`,i={mcq:{system:`
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
${s}
OUTPUT SCHEMA:
{
  "id": "gap-${r}-1",
  "type": "gap",
  "prompt": "Fill the gaps with the correct word.",
  "items": [
    { "q": "<They ___ (work) on Sundays.>", "answer": ["<correct_form>", "<alternative_if_any>"] },
    ...
  ]
}
REQUIREMENTS:
- ${o} sentences.
- "answer" must always be an array with at least one valid solution in lowercase.
- Keep sentences short, level A1–A2, and connected to "${e}".
      `.trim(),user:d(e,"gap",o)},transform:{system:`
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
- ${o} items.
- Answers must follow the prompt instructions (for example, omit the final period).
- Provide a helpful English hint for each item.
      `.trim(),user:d(e,"transform",o)},match:{system:`
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
- ${Math.max(6,Math.min(12,o))} unique pairs.
- Provide one clear correct match for each pair without duplicates.
- Use vocabulary related to "${e}".
      `.trim(),user:d(e,"match",o)},error:{system:`
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
- ${o} sentences containing a typical error connected to "${e}".
- Provide clear English hints.
- Match the formatting requested in the prompt (for example, omit the period).
      `.trim(),user:d(e,"error",o)},order:{system:`
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
- ${o} items.
- Provide tokens that form exactly the correct answer (lowercase, no period unless required by the topic).
- Use sentences relevant to "${e}".
      `.trim(),user:d(e,"order",o)},short:{system:`
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
- ${Math.min(6,Math.max(3,Math.floor(o/2)))} tasks that invite short written responses.
- "keywords" act as guidance, not strict scoring rubrics, and must be lowercase English words.
      `.trim(),user:d(e,"short",o)},writing:{system:`
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
      `.trim(),user:d(e,"writing",o)},roleplay:{system:`
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
- Include ${Math.max(6,Math.min(10,o))} useful English phrases with brief English explanations or synonyms.
- Do not add bullet symbols inside the strings.
      `.trim(),user:d(e,"roleplay",o)},"dialogue-gap":{system:`
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
- ${Math.max(4,Math.min(8,o))} turns in the dialogue.
- Use exactly ${Math.max(4,Math.min(8,o))} blanks "___" across the dialogue.
- "words" must include every required word once with no extra distractors.
- "answers" list the correct words in the order the blanks appear (lowercase English).
- Keep each line short (maximum 12 words) and on the topic "${e}".
- Do not add extra fields beyond the schema.
      `.trim(),user:d(e,"dialogue-gap",o)},"dialogue-order":{system:`
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
- ${Math.max(4,Math.min(8,o))} total lines.
- Each line must contain 6–12 words, sound natural, and stay on the topic "${e}".
- "solution" is an array of zero-based indices describing the correct order of the lines.
- Do not add extra fields beyond the schema.
      `.trim(),user:d(e,"dialogue-order",o)},truefalse:{system:`
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
- ${Math.max(6,Math.min(12,o))} statements.
- "answer" must be strictly true or false.
- Use simple A1–A2 level sentences in English related to "${e}".
      `.trim(),user:d(e,"truefalse",o)},"definition-match":{system:`
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
- ${Math.max(6,Math.min(10,o))} pairs.
- "left" must be a single lowercase word without articles.
- "right" must be one sentence of up to 14 words.
- Use vocabulary connected to the topic "${e}".
      `.trim(),user:d(e,"definition-match",o)},"synonym-clue":{system:`
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
- ${Math.max(6,Math.min(10,o))} items.
- Provide a word bank of 6–8 lowercase English words that includes all correct answers.
- "answers" may contain 1–2 acceptable synonyms, all in lowercase English.
- Write concise clues; omit the final period if the clue is a fragment.
      `.trim(),user:d(e,"synonym-clue",o)},scramble:{system:`
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
- ${Math.max(6,Math.min(10,o))} items.
- "scrambled" must be a shuffled version of an English word from "${e}".
- "answers" may list 1–2 valid spellings in lowercase English.
      `.trim(),user:d(e,"scramble",o)},wordpairs:{system:`
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
- ${Math.max(6,Math.min(10,o))} pairs.
- Use accurate singular/plural pairs relevant to "${e}".
- Do not add extra keys beyond the schema.
      `.trim(),user:d(e,"wordpairs",o)},"odd-one-out":{system:`
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
- ${Math.max(6,Math.min(10,o))} items.
- Provide exactly 4 options per item.
- "answer" must be the index of the odd item as a string ("0"–"3").
- Include a brief English explanation (up to 10 words) for why the option is odd.
- Only one option may be different; the rest must relate to "${e}".
      `.trim(),user:d(e,"odd-one-out",o)},context:{system:`
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
}`.trim(),user:d(e,"context",o)}},a=i[t];return a||i.mcq}const Oe={mcq:10,gap:10,transform:10,match:8,error:10,order:10,short:3,writing:1,roleplay:8,"dialogue-gap":6,"dialogue-order":6,truefalse:8,"definition-match":8,"synonym-clue":8,scramble:8,wordpairs:8,"odd-one-out":8,context:4};function d(e,t,n){return`Topic: ${e}
Generate a task block of type "${t}" with ${n} items. Return JSON only that follows the described schema.`}function _e(e){return String(e||"task").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,6)||"task"}function qe(e,t){const n=String(e||"").trim(),o=Ie(t);return o?`${n||"Generate the task block."}

Focus on these vocabulary items:
${o}`:n||e||""}function Ie(e){if(!Array.isArray(e)||!e.length)return"";const t=e.map((n,o)=>{if(!n)return"";const r=n.word||n.term||n.phrase||n.text||`Item ${o+1}`,s=n.translation||n.meaning||n.ua||n.uk||"",i=n.example||n.sentence||n.usage||n.sample||"";let a=`${o+1}. ${r}`;return s&&(a+=` — ${s}`),i&&(a+=` (Example: ${i})`),a}).filter(Boolean);return t.length?t.join(`
`):""}const me=document.querySelector(".js-practice-section"),c=document.querySelector("[data-practice-generator]"),j=c==null?void 0:c.querySelector("[data-practice-status]"),N=document.querySelector("[data-generator-output]"),P=document.querySelector("[data-generator-json]"),k=document.querySelector("[data-generator-copy]"),x=document.querySelector("[data-generator-download]"),I=c==null?void 0:c.querySelector("[data-types]"),g=c==null?void 0:c.querySelector("[data-types-trigger]"),T=c==null?void 0:c.querySelector("[data-types-panel]"),he=document.querySelector("[data-practice-placeholder]"),f=window.lessonContext||{};let b=f.title||"Generated Practice",S=f.level||"custom";const U=[],H=[];function M(e){e&&e.classList.add("hidden")}function X(e){e&&e.classList.remove("hidden")}function pe(e){return!e||e.classList.contains("hidden")}function Z(){return localStorage.getItem("hideGenerateSection")==="true"}function K(){Z()?(M(me),M(T),M(N),v()):(X(me),z(),A())}function Y(e){return`${e&&typeof e=="object"&&e.id?String(e.id):String((e==null?void 0:e.type)||"task")}-${Date.now()}-${Math.random().toString(16).slice(2,8)}`}function fe(){return{title:b||f.title||"Generated Practice",level:S||f.level||"custom",tasks:[...U,...H].map(e=>e.data)}}function A(){if(P){if(Z()){M(N);return}if(!U.length&&!H.length){P.textContent="",M(N),k&&(k.disabled=!0),x&&(x.disabled=!0);return}P.textContent=JSON.stringify(fe(),null,2),X(N),k&&(k.disabled=!1),x&&(x.disabled=!1)}}function Ne(e){const t=Y(e);return H.push({key:t,data:e}),A(),t}function He(e,t){const n=r=>{const s=r.findIndex(i=>e&&i.key===e||i.data===t);return s!==-1?(r.splice(s,1),!0):!1};(n(H)||n(U))&&A()}function De(){if(!c)return;const e=c.querySelector('[name="topic"]');if(e&&!e.value){const t=f.title||"Lesson topic";e.value=t}}function y(e,t="idle"){j&&(j.textContent=e,j.dataset.state=t)}function Be(e){return String(e||"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,8)}function Q(e){return String(e||"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")}function ee(){return Array.from(c.querySelectorAll('input[name="types"]'))}function je(e){const t=e.filter(n=>n.checked).map(n=>{var o,r;return(r=(o=n.nextElementSibling)==null?void 0:o.textContent)==null?void 0:r.trim()}).filter(Boolean);return t.length?t.length<=2?t.join(", "):`${t.slice(0,2).join(", ")} +${t.length-2}`:"Оберіть типи"}function z(){if(!g)return;const e=ee();g.textContent=je(e)}function v(){!T||!g||pe(T)||(M(T),g.setAttribute("aria-expanded","false"))}function Qe(){if(!T||!g)return;if(pe(T)){X(T),g.setAttribute("aria-expanded","true");const t=T.querySelector('input[name="types"]');t==null||t.focus({preventScroll:!0})}else v()}function We(){const e=!Z();localStorage.setItem("hideGenerateSection",String(e)),K(),A()}function Fe(){const e=document.getElementById("practice"),t=e==null?void 0:e.querySelector("#practice-body");if(he&&he.remove(),t&&t.children.length===1){const n=t.firstElementChild;n&&/практика поки відсутня/i.test(n.textContent||"")&&n.remove()}}function Ve(){const e=document.getElementById("practice");if(!e)return;const t=e.querySelector("#practice-body");if(t&&!t.querySelector(".practice-dynamic-title")){const n=document.createElement("div");n.className="practice-dynamic-title",n.innerHTML=`
      <h2>Згенеровані завдання</h2>
      ${f.level?`<p class="muted">Рівень: ${f.level}</p>`:""}
    `,t.prepend(n)}}async function Ge(e){var m;if(e.preventDefault(),!c)return;const t=c.querySelector('button[type="submit"]'),n=c.querySelector('[name="topic"]'),o=c.querySelector('[name="count"]'),r=ee(),s=(m=n==null?void 0:n.value)==null?void 0:m.trim(),i=Number.parseInt((o==null?void 0:o.value)||"10",10)||10,a=r.filter(h=>h.checked).map(h=>h.value);if(!s){y("Укажіть тему для генерації завдання.","error"),n==null||n.focus();return}if(!a.length&&typeof v=="function"){y("Оберіть принаймні один тип завдання.","error");return}const l=Be(s)||"task";y(`Генеруємо ${a.length} тип(и) завдань…`,"loading"),t&&(t.disabled=!0,t.dataset.originalText=t.dataset.originalText||t.textContent,t.textContent="Генерація…");const $=String(f.category||"").toLowerCase()==="communication"&&Array.isArray(window.communicationCurrentWords)&&window.communicationCurrentWords.length?window.communicationCurrentWords:void 0;try{const h=a.map(p=>Pe(s,p,{items:i,language:"en",seedId:`${l}-${p}`},$).then(E=>({type:p,task:E}))),C=await Promise.allSettled(h),R=C.map((p,E)=>p.status==="fulfilled"?{type:a[E],task:p.value.task}:null).filter(Boolean),te=C.map((p,E)=>p.status==="rejected"?a[E]:null).filter(Boolean);if(!R.length)throw new Error("Не вдалося згенерувати жодного типу завдань");const ne=[];R.forEach(({type:p,task:E})=>{const O={...E};O.id||(O.id=`${p}-${l}-${Date.now().toString(36)}${Math.random().toString(36).slice(2,6)}`);const ye=Ne(O);ne.push({task:O,key:ye})}),Fe(),window.practice&&typeof window.practice.appendTask=="function"&&(Ve(),ne.forEach(({task:p,key:E})=>{window.practice.appendTask(p,{key:E})})),v();const oe=R.map(({type:p})=>p).join(", ");te.length?y(`Згенеровано: ${oe}. Помилки: ${te.join(", ")}`,"success"):y(`Готово! Додано ${R.length} блок(и): ${oe}.`,"success")}catch(h){console.error(h);const C=h instanceof Error&&h.message?`Помилка: ${h.message}`:"Не вдалося згенерувати завдання. Перевірте токен або спробуйте ще раз.";y(C,"error")}finally{if(t){const h=t.dataset.originalText||"Згенерувати завдання";t.disabled=!1,t.textContent=h}}}async function Je(){if(!P)return;const e=P.textContent;if(e)try{await navigator.clipboard.writeText(e),y("JSON скопійовано у буфер.","success")}catch(t){console.error(t),y("Не вдалося скопіювати JSON. Спробуйте вручну.","error")}}function Ke(e){return`${Q(f.id)||Q(e.title)||Q(f.title)||"practice"||"practice"}.json`}async function Ye(){const e=fe(),t=JSON.stringify(e,null,2);if(!t||t==="{}"||t==="[]"){y("Немає даних для завантаження.","error");return}try{const n=new Blob([t],{type:"application/json"}),o=URL.createObjectURL(n),r=document.createElement("a");r.href=o,r.download=Ke(e),document.body.appendChild(r),r.click(),document.body.removeChild(r),URL.revokeObjectURL(o),y("Файл завантажено.","success")}catch(n){console.error(n),y("Не вдалося завантажити файл.","error")}}function ze(){if(c){if(De(),c.addEventListener("submit",Ge),k&&(k.addEventListener("click",Je),k.disabled=!0),x&&(x.addEventListener("click",Ye),x.disabled=!0),g&&T&&I){g.setAttribute("aria-haspopup","true"),g.setAttribute("aria-expanded","false"),g.addEventListener("click",()=>{Qe()});const e=n=>{I.contains(n.target)||v()};document.addEventListener("pointerdown",e);const t=n=>{const o=n.relatedTarget;(!o||!I.contains(o))&&v()};I.addEventListener("focusout",t),document.addEventListener("keydown",n=>{n.key==="Escape"&&(v(),g.focus())}),ee().forEach(n=>{n.addEventListener("change",()=>{z()})}),z(),c.addEventListener("submit",()=>{v()})}document.addEventListener("practice:taskRemoved",e=>{const t=e.detail||{};He(t.key,t.task)}),document.addEventListener("practice:dataLoaded",e=>{const t=e.detail;U.length=0,t&&Array.isArray(t.entries)?(b=t.title??b,S=t.level??S,t.entries.forEach(({task:n,key:o})=>{const r=o||Y(n);U.push({key:r,data:n})})):t&&Array.isArray(t.tasks)?(b=t.title??b,S=t.level??S,t.tasks.forEach(n=>{const o=n&&n.id?String(n.id):Y(n);U.push({key:o,data:n})})):t?(b=t.title??b,S=t.level??S):(b=f.title||b,S=f.level||S),A(),K()}),K(),A(),document.addEventListener("keydown",e=>{e.code&&e.code==="KeyH"&&e.ctrlKey&&e.shiftKey&&(e.preventDefault(),We())})}}ze();
//# sourceMappingURL=lesson.js.map
