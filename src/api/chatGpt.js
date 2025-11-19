// tasksGenerator.js

// ---- HTTP wrapper -----------------------------------------------------------
export const getAnswer = async body => {
  const BASE_URL = 'https://vq1wtq2d2l.execute-api.us-east-2.amazonaws.com/dev';
  // const BASE_URL = "http://localhost:3000/dev";
  const url = BASE_URL + '/openai';

  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  }).then(res => res.json());

  return response; // your endpoint returns a JSON string -> we'll JSON.parse later
};

// ---- Public API -------------------------------------------------------------
/**
 * Генерує один блок завдання під конкретний typeQuestion (mcq/gap/...)
 * @param {string} topic - наприклад: "Present Simple"
 * @param {string} typeQuestion - один з: mcq, gap, transform, match, error, order, short, open, writing, roleplay, context, dialogue-gap, dialogue-order, truefalse, definition-match, synonym-clue, scramble, wordpairs, odd-one-out
 * @param {object} opts - { language: 'en', items: 10, seedId: 'ps' } etc.
 * @param {Array<object>} vocabulary - опційний масив слів для фокусування ({ word, translation, example })
 * @returns {Promise<object>} JSON блоку завдання
 */
export const generateTask = async (topic, typeQuestion, opts = {}, vocabulary = []) => {
  const promptBody = buildBody(topic, typeQuestion, opts, vocabulary);
  const raw = await getAnswer(promptBody);

  // API зазвичай повертає строку JSON -> парсимо.
  // Якщо вже об'єкт — просто повернемо як є.
  try {
    if (typeof raw === 'string') return JSON.parse(raw);
    return raw;
  } catch (e) {
    // На випадок якщо модель вивела щось зайве — спроба витягнути JSON через regex
    const jsonMatch =
      typeof raw === 'string' ? raw.match(/\{[\s\S]*\}$/) : null;
    if (jsonMatch) return JSON.parse(jsonMatch[0]);
    throw new Error('Не вдалося розпарсити JSON відповіді моделі');
  }
};

/**
 * Генерує HTML-розмітку теоретичного матеріалу (таблиці з правилами та прикладами)
 * @param {string} topic - назва теми (наприклад: "Present Simple")
 * @param {object} opts - { language: 'uk' | 'en' }
 * @returns {Promise<string>} HTML-фрагмент з <table> блоками
 */
export const generateTheory = async (topic, opts = {}) => {
  const body = buildTheoryBody(topic, opts);
  const raw = await getAnswer(body);
  // Очікуємо чистий HTML-фрагмент (рядок). Якщо об'єкт — дістанемо content
  if (typeof raw === 'string') return raw;
  if (raw && typeof raw.content === 'string') return raw.content;
  // Спроба видобути HTML між першими <table ...> ... (на випадок зайвого тексту)
  const m = String(raw || '').match(/<table[\s\S]*<\/table>/i);
  if (m) return m[0];
  throw new Error('Відповідь не містить HTML');
};

// ---- Prompt builder ---------------------------------------------------------
function buildBody(topic, typeQuestion, opts = {}, vocabulary = []) {
  const token = localStorage.getItem('gptToken');
  if (!token || token?.length < 10) {
    console.warn('⚠️ gptToken відсутній у localStorage');
    const token = prompt('Enter Your GPT Token');
    localStorage.setItem('gptToken', token);
  }

  const model = 'gpt-4o-mini';
  const normalizedType = String(typeQuestion || '')
    .trim()
    .toLowerCase();

  const { system, user } = makeMessages(topic, normalizedType, opts);
  const userWithVocabulary = appendVocabularyToPrompt(user, vocabulary);

  return {
    token,
    model,
    messages: [
      { role: 'system', content: system },
      { role: 'user', content: userWithVocabulary },
    ],
    temperature: 0.3,
    max_tokens: 4000,
  };
}

function buildTheoryBody(topic, opts = {}) {
  let token = localStorage.getItem('gptToken');
  if (!token || token?.length < 10) {
    console.warn('⚠️ gptToken відсутній у localStorage');
    token = prompt('Enter Your GPT Token');
    if (token) localStorage.setItem('gptToken', token);
  }
  const model = 'gpt-4o-mini';
  const lang = (opts.language || 'uk').toLowerCase();

  const system = `You are an ESL (English as a Second Language) content generator.  
Create a **detailed study guide in HTML tables** for the following grammar/vocabulary topic:

TOPIC: ${topic}
LEVEL: A1-C2
LANGUAGE OF EXPLANATION: English
ACCENT_COLOR: #00837f

REQUIREMENTS:
1. Output only valid HTML <table> structures (border="1" cellpadding="1" cellspacing="1" style="width:100%").  
2. Use clear headers inside tables with <span style="color: #00837f"><strong>…</strong></span>.  
3. Highlight key grammar points in <strong>bold</strong>.  
4. Use examples in simple everyday vocabulary, 1–2 per point.  
5. You may generate ANY number of tables depending on how much detail the topic requires.  
6. Tables should cover different aspects such as:
   - Forms (affirmative, negative, questions)  
   - Usage (rules, functions, signal words, time markers)  
   - Common mistakes ("Use it right!")  
   - Exceptions/irregularities/special cases  
   - Practical examples or mini-dialogues  
   - Vocabulary lists (if relevant to the topic)  
   - Comparison with similar grammar points (if relevant)  
7. Make the content structured like a mini-textbook chapter:  
   - Start with a table that introduces the main concept and its basic forms.  
   - Add extra tables for usage, examples, pitfalls, exceptions, etc.  
   - End with a summary/revision table.  
8. Keep everything inside tables, do NOT output free text outside tables.  

GOAL:
Produce a **ready-to-use study guide** in HTML tables, so that learners can read it as a digital textbook.  
Be as detailed as possible, but keep the language simple and level-appropriate.  `;

  const user = `Generate the full HTML tables for topic: ${topic}.`;

  return {
    token,
    model,
    messages: [
      { role: 'system', content: system },
      { role: 'user', content: user },
    ],
    temperature: 0.4,
    max_tokens: 16384,
  };
}

// ---- Templates: system + user by task type ---------------------------------

/**
 * Кожен тип завдання має:
 * - коротку інструкцію (що генеруємо, які поля)
 * - приклад (few-shot) у system
 * - суворі вимоги: лише JSON, українська, без крапок у відповідях де потрібно тощо
 */
function makeMessages(topic, type, opts) {
  const lang = opts.language || 'en';
  const itemsCount = Number.isInteger(opts.items)
    ? opts.items
    : defaultItemsByType[type] || 10;
  const seedId = opts.seedId || shortSeed(topic);

  const commonRules = `
YOU ARE an ESL task generator.
GOAL: create ONE task block of type "${type}" on the topic "${topic}".
OUTPUT ONLY VALID JSON. Keep the language level around A1–A2.
All prompts, questions, answers, hints, and labels must be written in ENGLISH.
Encoding — UTF-8. No explanations, no prefixes, no code fences.
Ensure internal consistency so answers match the task logic.
`;

  const templates = {
    mcq: {
      system: `
${commonRules}
OUTPUT SCHEMA:
{
  "id": "mcq-${seedId}-1",
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
- ${itemsCount} items.
- Follow the schema exactly.
- Provide exactly 3 answer choices per question with a single correct one.
- "answer" must be the index of the correct option as a string: "0" | "1" | "2".
- Keep questions natural, concise, and on the topic "${topic}".
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
      `.trim(),
      user: `
Topic: ${topic}
Generate a task block of type "mcq" strictly following the OUTPUT SCHEMA.
Number of items: ${itemsCount}.
      `.trim(),
    },

    gap: {
      system: `
${commonRules}
OUTPUT SCHEMA:
{
  "id": "gap-${seedId}-1",
  "type": "gap",
  "prompt": "Fill the gaps with the correct word.",
  "items": [
    { "q": "They ___ (work) on Sundays.", "answer": ["correct_form", "alternative_if_any"] },
    ...
  ]
}
REQUIREMENTS:
- ${itemsCount} sentences.
- "q" must be a clean English sentence. Do NOT wrap it in angle brackets, quotes, or markdown — use only plain text with a single blank shown as ___ (three underscores).
- "answer" must be an array with at least one valid solution in lowercase (no angle brackets).
- Keep sentences short, level A1–A2, and connected to "${topic}".
      `.trim(),
      user: oneLineUser(topic, 'gap', itemsCount),
    },

    transform: {
      system: `
${commonRules}
OUTPUT SCHEMA:
{
  "id": "transform-${seedId}-1",
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
- ${itemsCount} items.
- Answers must follow the prompt instructions (for example, omit the final period).
- Provide a helpful English hint for each item.
      `.trim(),
      user: oneLineUser(topic, 'transform', itemsCount),
    },

    match: {
      system: `
${commonRules}
OUTPUT SCHEMA:
{
  "id": "match-${seedId}-1",
  "type": "match",
  "prompt": "Match the base verb with the third person singular form (he/she/it).",
  "pairs": [
    { "left": "go", "right": "goes" },
    ...
  ]
}
REQUIREMENTS:
- ${Math.max(6, Math.min(12, itemsCount))} unique pairs.
- Provide one clear correct match for each pair without duplicates.
- Use vocabulary related to "${topic}".
      `.trim(),
      user: oneLineUser(topic, 'match', itemsCount),
    },

    error: {
      system: `
${commonRules}
OUTPUT SCHEMA:
{
  "id": "error-${seedId}-1",
  "type": "error",
  "prompt": "Find and correct the mistake (Present Simple, no final period).",
  "items": [
    { "q": "She don't like tea.", "hint": "use doesn't + base verb", "answer": ["she doesn't like tea", "she does not like tea"] }
  ]
}
REQUIREMENTS:
- ${itemsCount} sentences containing a typical error connected to "${topic}".
- Provide clear English hints.
- Match the formatting requested in the prompt (for example, omit the period).
      `.trim(),
      user: oneLineUser(topic, 'error', itemsCount),
    },

    order: {
      system: `
${commonRules}
OUTPUT SCHEMA:
{
  "id": "order-${seedId}-1",
  "type": "order",
  "prompt": "Put the words in the correct order.",
  "items": [
    { "q": "Arrange the sentence", "tokens": ["she", "often", "reads", "books"], "answer": "she often reads books" }
  ]
}
REQUIREMENTS:
- ${itemsCount} items.
- Provide tokens that form exactly the correct answer (lowercase, no period unless required by the topic).
- Use sentences relevant to "${topic}".
      `.trim(),
      user: oneLineUser(topic, 'order', itemsCount),
    },

    short: {
      system: `
${commonRules}
OUTPUT SCHEMA:
{
  "id": "short-${seedId}-1",
  "type": "short",
  "prompt": "Write short answers about ${topic}.",
  "items": [
    { "q": "Write 2–3 sentences about your daily routine.", "keywords": ["i", "usually", "every"] }
  ]
}
REQUIREMENTS:
- ${Math.min(
        6,
        Math.max(3, Math.floor(itemsCount / 2))
      )} tasks that invite short written responses.
- "keywords" act as guidance, not strict scoring rubrics, and must be lowercase English words.
      `.trim(),
      user: oneLineUser(topic, 'short', itemsCount),
    },

    open: {
      system: `
${commonRules}
OUTPUT SCHEMA:
{
  "id": "open-${seedId}-1",
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
- ${Math.max(3, Math.min(10, itemsCount))} unique items that require free-form answers.
- Keep each "situation" within 8–14 words, focused on real-life communication linked to "${topic}".
- Maintain an A1–A2 learner level and avoid simple yes/no prompts.
- Provide exactly 3 concise scoring criteria phrased for teachers (e.g., "Use two past time expressions").
- Optionally add "example_answers" arrays (1–3 short samples) to model good responses.
- Output JSON only with no surrounding commentary.
      `.trim(),
      user: oneLineUser(topic, 'open', itemsCount),
    },

    writing: {
      system: `
${commonRules}
OUTPUT SCHEMA:
{
  "id": "writing-${seedId}-1",
  "type": "writing",
  "prompt": "Short writing task about ${topic}.",
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
      `.trim(),
      user: oneLineUser(topic, 'writing', itemsCount),
    },
    roleplay: {
      system: `
${commonRules}
OUTPUT SCHEMA:
{
  "id": "roleplay-${seedId}-1",
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
- The situation must clearly connect to the topic "${topic}".
- Exactly two roles: Student 1 and Student 2.
- Provide 3–5 steps describing how the dialogue should develop.
- Include ${Math.max(6, Math.min(10, itemsCount))} useful English phrases with brief English explanations or synonyms.
- Do not add bullet symbols inside the strings.
      `.trim(),
      user: oneLineUser(topic, 'roleplay', itemsCount),
    },
    'dialogue-gap': {
      system: `
${commonRules}
OUTPUT SCHEMA:
{
  "id": "dialogue-gap-${seedId}-1",
  "type": "dialogue-gap",
  "prompt": "Fill the blanks in the dialogue using the word bank.",
  "words": ["<word1>", "<word2>", "<word3>"],
  "dialogue": [
    { "speaker": "Student 1", "line": "<Line with one or two ___ blanks>" }
  ],
  "answers": ["<correct word 1>", "<correct word 2>"]
}
REQUIREMENTS:
- ${Math.max(4, Math.min(8, itemsCount))} turns in the dialogue.
- Use exactly ${Math.max(4, Math.min(8, itemsCount))} blanks "___" across the dialogue.
- "words" must list one entry per blank (repeat words when a blank uses the same word) and contain no unused distractors.
- "answers" must be the same length as "words", list the correct words in blank order, and use only lowercase English words present in "words".
- Keep each line short (maximum 12 words) and on the topic "${topic}".
- Do not add extra fields beyond the schema.
      `.trim(),
      user: oneLineUser(topic, 'dialogue-gap', itemsCount),
    },
    'dialogue-order': {
      system: `
${commonRules}
OUTPUT SCHEMA:
{
  "id": "dialogue-order-${seedId}-1",
  "type": "dialogue-order",
  "prompt": "Arrange the dialogue lines in the correct order.",
  "lines": [
    { "speaker": "Student 1", "line": "<Line>" },
    { "speaker": "Student 2", "line": "<Line>" }
  ],
  "solution": [1, 0]
}
REQUIREMENTS:
- ${Math.max(4, Math.min(8, itemsCount))} total lines.
- Each line must contain 6–12 words, sound natural, and stay on the topic "${topic}".
- "solution" is an array of zero-based indices describing the correct order of the lines.
- Do not add extra fields beyond the schema.
      `.trim(),
      user: oneLineUser(topic, 'dialogue-order', itemsCount),
    },
    truefalse: {
      system: `
${commonRules}
OUTPUT SCHEMA:
{
  "id": "truefalse-${seedId}-1",
  "type": "truefalse",
  "prompt": "Decide if each statement is true or false.",
  "items": [
    { "statement": "<short statement>", "answer": true }
  ]
}
REQUIREMENTS:
- ${Math.max(6, Math.min(12, itemsCount))} statements.
- "answer" must be strictly true or false.
- Use simple A1–A2 level sentences in English related to "${topic}".
      `.trim(),
      user: oneLineUser(topic, 'truefalse', itemsCount),
    },
    'definition-match': {
      system: `
${commonRules}
OUTPUT SCHEMA:
{
  "id": "definition-match-${seedId}-1",
  "type": "definition-match",
  "prompt": "Match the word with its definition.",
  "pairs": [
    { "left": "<word>", "right": "<short definition>" }
  ]
}
REQUIREMENTS:
- ${Math.max(6, Math.min(10, itemsCount))} pairs.
- "left" must be a single lowercase word without articles.
- "right" must be one sentence of up to 14 words.
- Use vocabulary connected to the topic "${topic}".
      `.trim(),
      user: oneLineUser(topic, 'definition-match', itemsCount),
    },
    'synonym-clue': {
      system: `
${commonRules}
OUTPUT SCHEMA:
{
  "id": "synonym-clue-${seedId}-1",
  "type": "synonym-clue",
  "prompt": "Choose the correct word based on the clue.",
  "wordBank": ["<word1>", "<word2>", "<word3>"],
  "items": [
    { "clue": "<clue>", "answers": ["<correct word>"] }
  ]
}
REQUIREMENTS:
- ${Math.max(6, Math.min(10, itemsCount))} items.
- Provide a word bank of 6–8 lowercase English words that includes all correct answers.
- "answers" may contain 1–2 acceptable synonyms, all in lowercase English.
- Write concise clues; omit the final period if the clue is a fragment.
      `.trim(),
      user: oneLineUser(topic, 'synonym-clue', itemsCount),
    },
    scramble: {
      system: `
${commonRules}
OUTPUT SCHEMA:
{
  "id": "scramble-${seedId}-1",
  "type": "scramble",
  "prompt": "Unscramble the word.",
  "items": [
    { "scrambled": "<jumbled letters>", "answers": ["<correct word>"] }
  ]
}
REQUIREMENTS:
- ${Math.max(6, Math.min(10, itemsCount))} items.
- "scrambled" must be a shuffled version of an English word from "${topic}".
- "answers" may list 1–2 valid spellings in lowercase English.
      `.trim(),
      user: oneLineUser(topic, 'scramble', itemsCount),
    },
    wordpairs: {
      system: `
${commonRules}
OUTPUT SCHEMA:
{
  "id": "wordpairs-${seedId}-1",
  "type": "wordpairs",
  "prompt": "Match the singular form to the plural form.",
  "pairs": [
    { "left": "<singular>", "right": "<plural>" }
  ]
}
REQUIREMENTS:
- ${Math.max(6, Math.min(10, itemsCount))} pairs.
- Use accurate singular/plural pairs relevant to "${topic}".
- Do not add extra keys beyond the schema.
      `.trim(),
      user: oneLineUser(topic, 'wordpairs', itemsCount),
    },
    'odd-one-out': {
      system: `
${commonRules}
OUTPUT SCHEMA:
{
  "id": "odd-one-out-${seedId}-1",
  "type": "odd-one-out",
  "prompt": "Find the odd one out.",
  "items": [
    { "options": ["<word1>", "<word2>", "<word3>", "<word4>"], "answer": "2", "explanation": "<reason>" }
  ]
}
REQUIREMENTS:
- ${Math.max(6, Math.min(10, itemsCount))} items.
- Provide exactly 4 options per item.
- "answer" must be the index of the odd item as a string ("0"–"3").
- Include a brief English explanation (up to 10 words) for why the option is odd.
- Only one option may be different; the rest must relate to "${topic}".
      `.trim(),
      user: oneLineUser(topic, 'odd-one-out', itemsCount),
    },
    audio: {
      system: `
${commonRules}
OUTPUT SCHEMA:
{
  "id": "audio-${seedId}-1",
  "type": "audio",
  "prompt": "Listen to the conversation and answer the questions.",
  "voices": ["female", "male"],
  "dialogs": [
    { "speaker": "<Name>", "voice": "female", "text": "<1–2 short sentences>" }
  ],
  "questions": [
    {
      "prompt": "<question text>",
      "choices": ["<option0>", "<option1>", "<option2>"],
      "answer": ["<index_of_correct_choice_as_string>"]
    },
    {
      "prompt": "<short-question>",
      "answer": ["<expected text answer>"]
    }
  ]
}

REQUIREMENTS:
- Create a coherent listening script (dialogue or monologue) of 120–160 words tied to "${topic}".
- Use 2 speakers whenever possible and alternate their lines in "dialogs". Every entry must supply "speaker", "voice" ("female" or "male"), and "text" under 20 words.
- Provide the "voices" array listing the genders you use (e.g., ["female","male"]).
- Generate ${itemsCount} comprehension questions in "questions". Mix multiple-choice and short-answer prompts.
- Multiple-choice questions must include exactly 3 choices and return the correct index as a string ("0" | "1" | "2").
- Short-answer questions must keep answers within 2–5 words. Provide text solutions using "answer": "<text>" or an array of acceptable phrasings.
- Return only JSON following the schema—no commentary, markdown, or extra keys.

EXAMPLE (FORMAT ONLY; DO NOT COPY CONTENT):
{
  "id": "audio-ps-1",
  "type": "audio",
  "prompt": "Listen to the chat and answer the questions.",
  "voices": ["female", "male"],
  "dialogs": [
    { "speaker": "Emma", "voice": "female", "text": "Hi, Leo! Ready for the quiz today?" },
    { "speaker": "Leo", "voice": "male", "text": "Almost. I still need to review the verbs." }
  ],
  "questions": [
    {
      "prompt": "What are Emma and Leo talking about?",
      "choices": ["A movie night", "A school quiz", "A family visit"],
      "answer": ["1"]
    },
    {
      "prompt": "Where will Leo study after school?",
      "answer": ["in the library", "at the library"]
    }
  ]
}`.trim(),
      user: oneLineUser(topic, 'audio', itemsCount),
    },
    context: {
      system: `
${commonRules}
OUTPUT SCHEMA:
{
  "id": "context-${seedId}-1",
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
- Provide ${itemsCount} comprehension questions for the passage.
- Keep the text within 200 words using simple A1 English connected to "${topic}".
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
}`.trim(),
      user: oneLineUser(topic, 'context', itemsCount),
    },
  };

  const baseTemplate = templates[type] || templates.mcq;
  const extraInstructions =
    (opts.additionalInstructions || opts.extraInstructions || '').trim();

  if (!extraInstructions) {
    return baseTemplate;
  }

  return {
    system: baseTemplate.system,
    user: `${baseTemplate.user}\n\nAdditional teacher instructions:\n${extraInstructions}`,
  };
}

// ---- Helpers ----------------------------------------------------------------
const defaultItemsByType = {
  mcq: 10,
  gap: 10,
  transform: 10,
  match: 8,
  error: 10,
  order: 10,
  short: 3,
  open: 4,
  writing: 1,
  audio: 6,
  roleplay: 8,
  'dialogue-gap': 6,
  'dialogue-order': 6,
  truefalse: 8,
  'definition-match': 8,
  'synonym-clue': 8,
  scramble: 8,
  wordpairs: 8,
  'odd-one-out': 8,
  context: 4,
};

function oneLineUser(topic, type, itemsCount) {
  return `Topic: ${topic}\nGenerate a task block of type "${type}" with ${itemsCount} items. Return JSON only that follows the described schema.`;
}

function shortSeed(s) {
  return (
    String(s || 'task')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 6) || 'task'
  );
}

function appendVocabularyToPrompt(userContent, vocabulary) {
  const trimmed = String(userContent || '').trim();
  const formattedList = formatVocabularyList(vocabulary);
  if (!formattedList) return trimmed || userContent || '';
  const base = trimmed || 'Generate the task block.';
  return `${base}

STRICT VOCABULARY REQUIREMENTS (communication lesson):
1. Treat the target expressions below as the ONLY lexical focus for the task. Every generated item and every correct answer must contain at least one of these expressions verbatim (you may adapt grammar but keep the core phrase).
2. Do not introduce alternative key phrases or synonyms outside this list; supporting words like articles or pronouns are fine, but the highlighted expression must come from the list.
3. When offering distractors or incorrect options, keep them realistic yet stay close to the topic; never invent brand-new key phrases outside the set.
4. The Ukrainian translations are reference only – the final task must remain fully in English.

Target vocabulary:\n${formattedList}`;
}

function formatVocabularyList(list) {
  if (!Array.isArray(list) || !list.length) return '';
  const extractEnglishExample = (value) => {
    if (!value) return '';
    const dashIdx = value.indexOf(' — ');
    const enDashIdx = value.indexOf(' – ');
    const hyphenIdx = value.indexOf(' - ');
    const candidates = [dashIdx, enDashIdx, hyphenIdx].filter((idx) => idx >= 0);
    const cutIndex = candidates.length ? Math.min(...candidates) : -1;
    const result = cutIndex >= 0 ? value.slice(0, cutIndex) : value;
    return result.trim();
  };
  const lines = list
    .map((entry, index) => {
      if (!entry) return '';
      const word = entry.word || entry.term || entry.phrase || entry.text || `Item ${index + 1}`;
      const translation = entry.translation || entry.meaning || entry.ua || entry.uk || '';
      const rawExample = entry.example || entry.sentence || entry.usage || entry.sample || '';
      const example = extractEnglishExample(rawExample);
      let line = `${index + 1}. ${word}`;
      if (translation) line += ` — ${translation}`;
      if (example) line += ` (Example: ${example})`;
      return line;
    })
    .filter(Boolean);
  if (!lines.length) return '';
  return lines.join('\n');
}
