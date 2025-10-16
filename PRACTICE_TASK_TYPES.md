# Інструкція з типізації практичних завдань

Цей документ описує, як оформлювати JSON-блоки практики для платформи English Conspect. Інструкція охоплює загальну структуру файлів, обовʼязкові поля та правила для кожного типу завдань, які підтримує генератор (`src/api/chatGpt.js`) та фронтенд.

## 1. Загальна структура файла практики

- Файли лежать у `public/data/practice` та мають формат `*.json`.
- Верхній рівень обʼєкта:
  - `title`: назва набору завдань (англійською або українською).
  - `level`: рівень за CEFR (`A1`, `A2`, тощо).
  - `description` (опційно): короткий коментар для викладача.
  - `tasks`: масив блоків з практикою.
- Кожен елемент `tasks` описує один блок вправ із власним `id`, `type`, інструкцією (`prompt`) та набором пунктів (`items`, `pairs`, `lines` тощо).

Приклад каркаса файла:

```json
{
  "title": "Present Simple: Daily Routine",
  "level": "A1",
  "tasks": [
    {
      "id": "mcq-present-simple-1",
      "type": "mcq",
      "prompt": "Choose the correct option.",
      "items": []
    }
  ]
}
```

## 2. Загальні правила для всіх типів

- Усі інструкції, питання, відповіді та підказки пишемо англійською (рівень A1–A2, якщо не вказано інше).
- `id` має бути унікальним в межах файла. Рекомендований шаблон: `<type>-<topic>-<suffix>`.
- Формат відповіді (`answer`) має точно відповідати вимогам типу (рядок із індексом, булеве значення, масив варіантів тощо).
- Не додавай зайвих полів, яких не очікує рендерер.
- Якщо потрібні пропуски в реченні, використовуй три підкреслення `___`.
- Пояснення або підказки мають бути лаконічними (до 10–12 слів).
- Якщо тип очікує фіксовану кількість опцій (наприклад, рівно три варіанти відповіді), дотримуйся її.

## 3. Короткий довідник типів

| `type`            | Призначення                                     | Рекомендована кількість пунктів | Ключові поля                                      |
|-------------------|-------------------------------------------------|---------------------------------|---------------------------------------------------|
| `mcq`             | Вибір однієї правильної відповіді               | 10                              | `items[].q`, `items[].choices[3]`, `items[].answer["0"|"1"|"2"]` |
| `gap`             | Заповнення пропусків                            | 10                              | `items[].q` з `___`, `items[].answer[]`           |
| `transform`       | Трансформація речення за інструкцією            | 10                              | `items[].q`, `items[].hint`, `items[].answer[]`   |
| `match`           | Парне співвіднесення                            | 8–12                            | `pairs[].left`, `pairs[].right`                   |
| `error`           | Пошук і виправлення помилки                     | 10                              | `items[].q`, `items[].hint`, `items[].answer[]`   |
| `order`           | Відновлення порядку слів                        | 10                              | `items[].q`, `items[].tokens[]`, `items[].answer` |
| `short`           | Коротка письмова відповідь                      | 3–6                             | `items[].q`, `items[].keywords[]`                 |
| `writing`         | Міні writing task з чеклістом                   | 1                               | `description`, `checklist[]`                      |
| `roleplay`        | Рольова гра з ролями та фразами                 | 6–10                            | `scenario`, `phrases[]`                           |
| `dialogue-gap`    | Діалог із пропусками і банком слів              | 4–8 реплік                      | `words[]`, `dialogue[]`, `answers[]`              |
| `dialogue-order`  | Впорядкування реплік діалогу                    | 4–8 реплік                      | `lines[]`, `solution[]`                           |
| `truefalse`       | Судження «правда / неправда»                    | 6–12                            | `items[].statement`, `items[].answer` (bool)      |
| `definition-match`| Підбір слів до визначень                        | 6–10                            | `pairs[].left`, `pairs[].right`                   |
| `synonym-clue`    | Вибір слова за підказкою                        | 6–10                            | `wordBank[]`, `items[].clue`, `items[].answers[]` |
| `scramble`        | Розшифрування переставлених літер               | 6–10                            | `items[].scrambled`, `items[].answers[]`          |
| `wordpairs`       | Парування форм слова (singular/plural тощо)     | 6–10                            | `pairs[].left`, `pairs[].right`                   |
| `odd-one-out`     | Пошук зайвого слова                             | 6–10                            | `items[].options[4]`, `items[].answer`, `items[].explanation` |
| `context`         | Читання/слухання з розумінням + питання         | 4                               | `context`, `questions[]`                          |
| `open`            | Відкриті запитання/активності для спілкування    | 4–10 ситуацій                   | `items[]`, `scoring.criteria[]`, опційно `examples[]` |

## 4. Детальні описи за типами

### `mcq` — Multiple Choice
- Мета: перевірити одну правильну відповідь з трьох варіантів.
- Кількість пунктів: 10 (рівно три варіанти на кожне питання).
- `answer` містить індекс правильної опції як рядок (`"0"`, `"1"`, `"2"`).

```json
{
  "id": "mcq-routine-1",
  "type": "mcq",
  "prompt": "Choose the correct option.",
  "items": [
    {
      "q": "She ___ breakfast at 7 a.m.",
      "choices": ["have", "has", "is having"],
      "answer": ["1"]
    }
  ]
}
```

### `gap` — Fill in the Gap
- В реченні один пропуск, позначений `___`.
- `answer` — масив прийнятних відповідей у нижньому регістрі.

```json
{
  "id": "gap-routine-1",
  "type": "gap",
  "prompt": "Fill the gaps with the correct word.",
  "items": [
    { "q": "They ___ (walk) to school together.", "answer": ["walk"] }
  ]
}
```

### `transform` — Sentence Transformation
- Кожен пункт: початкове речення, підказка (`hint`) і очікувана трансформація без крапки (якщо так у вимогах).
- `answer` — масив допустимих перефразованих речень у нижньому регістрі.

```json
{
  "id": "transform-routine-neg-1",
  "type": "transform",
  "prompt": "Rewrite each sentence in the negative form (no final period).",
  "items": [
    {
      "q": "She likes early mornings.",
      "hint": "use doesn't + base verb; no period",
      "answer": ["she doesn't like early mornings"]
    }
  ]
}
```

### `match` — Matching Pairs
- `pairs` містить ліву та праву частини без дублювань.
- Рекомендовано 8–12 пар.

```json
{
  "id": "match-routine-1",
  "type": "match",
  "prompt": "Match the subject with its daily activity.",
  "pairs": [
    { "left": "I", "right": "make breakfast" },
    { "left": "They", "right": "catch the bus" }
  ]
}
```

### `error` — Error Correction
- Речення містить типову помилку, яку треба виправити.
- `hint` пояснює проблему. Відповідь подається без крапки, якщо так вимагає інструкція.

```json
{
  "id": "error-routine-1",
  "type": "error",
  "prompt": "Find and correct the mistake (no final period).",
  "items": [
    {
      "q": "He go to work at eight.",
      "hint": "3rd person singular",
      "answer": ["he goes to work at eight"]
    }
  ]
}
```

### `order` — Sentence Ordering
- `tokens` — масив слів у довільному порядку.
- `answer` — рядок з правильною послідовністю (зазвичай без крапки).

```json
{
  "id": "order-routine-1",
  "type": "order",
  "prompt": "Put the words in the correct order.",
  "items": [
    {
      "q": "Arrange the sentence",
      "tokens": ["always", "we", "dinner", "cook"],
      "answer": "we always cook dinner"
    }
  ]
}
```

### `short` — Short Response
- Короткі відкриті відповіді (2–3 речення). `keywords` допомагають учню сфокусуватися.
- Кількість пунктів: 3–6.

```json
{
  "id": "short-routine-1",
  "type": "short",
  "prompt": "Write short answers about your routine.",
  "items": [
    { "q": "Describe your morning in 2 sentences.", "keywords": ["wake up", "breakfast"] }
  ]
}
```

### `writing` — Guided Writing
- Один блок із розгорнутим завданням та чеклістом із 4–6 критеріїв оцінювання.

```json
{
  "id": "writing-routine-1",
  "type": "writing",
  "prompt": "Short writing task about daily routine.",
  "description": "Write 80-100 words about your weekday morning.",
  "checklist": [
    "Include time references",
    "Use at least three Present Simple verbs",
    "Add one connective (and, then, next)",
    "Check spelling and punctuation"
  ]
}
```

### `roleplay` — Role Play Scenario
- Два ролі (`Student 1`, `Student 2`), сеттинг, короткий сюжет (`summary`), 3–5 кроків (`steps`) та банк корисних фраз (`phrases`).

```json
{
  "id": "roleplay-routine-1",
  "type": "roleplay",
  "prompt": "Plan a short roleplay about morning routines.",
  "scenario": {
    "setting": "Shared apartment kitchen",
    "summary": "Two roommates plan their busy morning.",
    "roles": [
      { "name": "Student 1", "goal": "prepare breakfast quickly", "details": "needs to leave by 8" },
      { "name": "Student 2", "goal": "fit in a workout", "details": "shares the kitchen space" }
    ],
    "steps": ["Greet each other", "Discuss tasks", "Agree on timing"]
  },
  "phrases": [
    { "phrase": "I usually wake up at...", "translation": "Use to share routine" }
  ]
}
```

### `dialogue-gap` — Dialogue with Blanks
- `words` — банк слів (стільки ж, скільки пропусків; дублюй слова, якщо відповідь повторюється).
- `dialogue` — репліки з одним-двома пропусками `___`.
- `answers` — правильні слова в порядку появи (кожне має бути у `words`).

```json
{
  "id": "dialogue-gap-routine-1",
  "type": "dialogue-gap",
  "prompt": "Fill the blanks in the dialogue using the word bank.",
  "words": ["usually", "coffee", "bus", "early"],
  "dialogue": [
    { "speaker": "Student 1", "line": "Do you ___ wake up this ___?" },
    { "speaker": "Student 2", "line": "Yes, so I can catch the ___." }
  ],
  "answers": ["usually", "early", "bus"]
}
```

### `dialogue-order` — Dialogue Ordering
- `lines` — масив реплік (6–12 слів кожна).
- `solution` — масив індексів у правильному порядку (zero-based).

```json
{
  "id": "dialogue-order-routine-1",
  "type": "dialogue-order",
  "prompt": "Arrange the dialogue lines in the correct order.",
  "lines": [
    { "speaker": "Student 1", "line": "Do you wake up early on weekends?" },
    { "speaker": "Student 2", "line": "Sometimes, but I love sleeping in." }
  ],
  "solution": [0, 1]
}
```

### `truefalse` — True or False
- `statement` — просте речення, `answer` — булеве значення (`true` або `false`).

```json
{
  "id": "truefalse-routine-1",
  "type": "truefalse",
  "prompt": "Decide if each statement is true or false.",
  "items": [
    { "statement": "Emma has breakfast at 7 a.m.", "answer": true }
  ]
}
```

### `definition-match` — Definition Matching
- `left` — окреме слово (без артиклів), `right` — коротке визначення до 14 слів.

```json
{
  "id": "definition-match-routine-1",
  "type": "definition-match",
  "prompt": "Match the word with its definition.",
  "pairs": [
    { "left": "schedule", "right": "a plan of activities with times" }
  ]
}
```

### `synonym-clue` — Word Bank with Clues
- `wordBank` — 6–8 слів у нижньому регістрі.
- `items[].answers` може містити 1–2 прийнятних варіанти.

```json
{
  "id": "synonym-clue-routine-1",
  "type": "synonym-clue",
  "prompt": "Choose the correct word based on the clue.",
  "wordBank": ["schedule", "alarm", "routine", "exercise", "coffee", "commute"],
  "items": [
    { "clue": "Daily plan of activities", "answers": ["schedule"] }
  ]
}
```

### `scramble` — Word Scramble
- `scrambled` — переставлені літери слова з теми.
- `answers` — 1–2 правильні варіанти.

```json
{
  "id": "scramble-routine-1",
  "type": "scramble",
  "prompt": "Unscramble the word.",
  "items": [
    { "scrambled": "trauine", "answers": ["routine"] }
  ]
}
```

### `wordpairs` — Word Pairs
- Використовується для парування форм (singular/plural, базова форма/3rd person тощо).

```json
{
  "id": "wordpairs-routine-1",
  "type": "wordpairs",
  "prompt": "Match the singular form to the plural form.",
  "pairs": [
    { "left": "bus", "right": "buses" },
    { "left": "class", "right": "classes" }
  ]
}
```

### `odd-one-out` — Odd One Out
- `options` — рівно 4 слова, лише одне неправильне.
- `answer` — індекс зайвого елемента як рядок (наприклад, `"2"`).
- `explanation` — коротка причина (до 10 слів).

```json
{
  "id": "odd-one-out-routine-1",
  "type": "odd-one-out",
  "prompt": "Find the odd one out.",
  "items": [
    {
      "options": ["toothbrush", "alarm clock", "pillow", "breakfast"],
      "answer": "2",
      "explanation": "Only pillow is used at night"
    }
  ]
}
```

### `context` — Reading/Listening with Comprehension Questions
- `context` містить назву (`title`), формат (`"dialog"` або `"narrative"`) і текст:
  - для `dialog` — масив обʼєктів `{ "speaker": "...", "line": "..." }`;
  - для `narrative` — масив коротких параграфів.
- `questions` — кожне питання з трьома варіантами та єдиною правильною відповіддю (індекс як рядок).
- Загальний текст не перевищує 200 слів.

```json
{
  "id": "context-routine-1",
  "type": "context",
  "prompt": "Read the text and answer the questions.",
  "context": {
    "title": "Busy Morning",
    "format": "narrative",
    "body": [
      "Emma wakes up at six because she trains before work.",
      "She drinks coffee, checks her planner, and leaves at seven."
    ]
  },
  "questions": [
    {
      "q": "Why does Emma wake up early?",
      "choices": ["She studies", "She trains", "She watches TV"],
      "answer": ["1"]
    }
  ]
}
```

### `open` — Open-Ended Classroom Tasks
- Для speaking/writing активностей, які перевіряються вручну.
- `items` містить ситуації або запитання (поле `situation`, `question` чи іншу зрозумілу назву).
- `scoring.criteria` — 3–5 критеріїв оцінювання. Опційно додаються приклади (`examples`) або інші допоміжні поля.

```json
{
  "id": "open-routine-1",
  "type": "open",
  "prompt": "Warm-up: share two things you do every morning.",
  "items": [
    { "situation": "Talk to a partner and exchange routines." },
    { "situation": "Ask follow-up questions about times and places." }
  ],
  "scoring": {
    "criteria": [
      "Uses two routine verbs",
      "Asks one follow-up question",
      "Keeps to A1 vocabulary"
    ]
  }
}
```

## 5. Перевірка перед додаванням у репозиторій

- Валідність JSON (немає зайвих ком або неправильних лапок).
- Відповіді відповідають інструкції й темі.
- Кількість пунктів відповідає рекомендаціям.
- Усі рядки англійською, без змішаних мов (окрім назв або службових пояснень для викладача).
- Якщо використовувався генератор, додатково перечитати та відредагувати неточності вручну.

Дотримання цих правил забезпечить коректне рендерення завдань і єдині стандарти для майбутніх доповнень.
