export const lessonCategories = {
  "grammar": {
    "id": "grammar",
    "label": "Граматика"
  },
  "communication": {
    "id": "communication",
    "label": "Комунікація"
  },
  "lexical": {
    "id": "lexical",
    "label": "Лексика"
  },
  "quick": {
    "id": "quick",
    "label": "Швидкий доступ"
  }
};

export const lessonLevels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

export const lessons = [
  {
    "id": "articles-a-an-the-zero",
    "category": "grammar",
    "level": "A1",
    "title": "Артиклі — a/an, the, zero article",
    "description": "Коли вживати і коли опускати; професії, предмети, країни",
    "htmlPath": "lessons/grammar/articles-a-an-the-zero.html",
    "tags": [
      "articles",
      "a/an",
      "the"
    ]
  },
  {
    "id": "indefinite-pronouns",
    "category": "grammar",
    "level": "B1",
    "title": "Неозначені займенники — Indefinite Pronouns",
    "description": "some / any / no / every + body / thing / where",
    "htmlPath": "lessons/grammar/indefinite-pronouns.html",
    "tags": [
      "pronouns",
      "someone",
      "anyone"
    ]
  },
  {
    "id": "object-pronouns",
    "category": "grammar",
    "level": "A1",
    "title": "Об’єктні займенники — Object Pronouns",
    "description": "me, you, him, her, it, us, them — після дієслів і прийменників",
    "htmlPath": "lessons/grammar/object-pronouns.html",
    "tags": [
      "pronouns",
      "object",
      "practice"
    ]
  },
  {
    "id": "singular-plural",
    "category": "grammar",
    "level": "A2",
    "title": "Однина / Множина — Singular / Plural",
    "description": "Регулярні закінчення, правопис, неправильні множини",
    "htmlPath": "lessons/grammar/singular-plural.html",
    "tags": [
      "nouns",
      "ending",
      "plural"
    ]
  },
  {
    "id": "personal-pronouns",
    "category": "grammar",
    "level": "A1",
    "title": "Особові займенники — Personal Pronouns",
    "description": "I, you, he, she, it, we, they",
    "htmlPath": "lessons/grammar/personal-pronouns.html",
    "tags": [
      "pronouns",
      "subject",
      "basics"
    ]
  },
  {
    "id": "going-to-vs-present-continuous",
    "category": "grammar",
    "level": "B1",
    "title": "Плани на майбутнє — Going to vs Present Continuous",
    "description": "Наміри, розклади та домовленості",
    "htmlPath": "lessons/grammar/going-to-vs-present-continuous.html",
    "tags": [
      "future",
      "plans",
      "schedule"
    ]
  },
  {
    "id": "possessive-pronouns",
    "category": "grammar",
    "level": "A1",
    "title": "Присвійні займенники — Possessive",
    "description": "my, your, his, her, its, our, their — вживання та приклади",
    "htmlPath": "lessons/grammar/possessive-pronouns.html",
    "tags": [
      "pronouns",
      "ownership",
      "basics"
    ]
  },
  {
    "id": "possessive-constructions-s-of",
    "category": "grammar",
    "level": "A2",
    "title": "Присвійні конструкції — 's / of",
    "description": "Tom’s book, the door of the room; коли 's, а коли of",
    "htmlPath": "lessons/grammar/possessive-constructions-s-of.html",
    "tags": [
      "possessive",
      "apostrophe-s",
      "structure"
    ]
  },
  {
    "id": "adjectives-basics-order",
    "category": "grammar",
    "level": "A2",
    "title": "Прості прикметники + порядок прикметників",
    "description": "Як описувати і ставити прикметники в природному порядку",
    "htmlPath": "lessons/grammar/adjectives-basics-order.html",
    "tags": [
      "adjectives",
      "order",
      "descriptions"
    ]
  },
  {
    "id": "adverbs-of-frequency",
    "category": "grammar",
    "level": "A1",
    "title": "Adverbs of Frequency — прислівники частоти",
    "description": "always, usually, often, sometimes, never — позиція у реченні",
    "htmlPath": "lessons/grammar/adverbs-of-frequency.html",
    "tags": [
      "adverbs",
      "routine",
      "percentage"
    ]
  },
  {
    "id": "cardinal-numbers",
    "category": "grammar",
    "level": "A1",
    "title": "Cardinal Numbers — кількісні числівники",
    "description": "1, 2, 3 …; читання й написання",
    "htmlPath": "lessons/grammar/cardinal-numbers.html",
    "tags": [
      "numbers",
      "counting",
      "basics"
    ]
  },
  {
    "id": "comparatives-and-superlatives",
    "category": "grammar",
    "level": "A2",
    "title": "Comparative & Superlative adjectives",
    "description": "bigger / the biggest; правила правопису та вживання",
    "htmlPath": "lessons/grammar/comparatives-and-superlatives.html",
    "tags": [
      "adjectives",
      "comparison",
      "forms"
    ]
  },
  {
    "id": "dates-days-months",
    "category": "grammar",
    "level": "A1",
    "title": "Dates — дати і прийменники",
    "description": "on Monday, in January, on 5th May",
    "htmlPath": "lessons/grammar/dates-days-months.html",
    "tags": [
      "calendar",
      "prepositions",
      "time"
    ]
  },
  {
    "id": "first-conditional",
    "category": "grammar",
    "level": "B1",
    "title": "First Conditional — if + Present, will + V",
    "description": "Реальні умови у майбутньому, варіанти з модальними",
    "htmlPath": "lessons/grammar/first-conditional.html",
    "tags": [
      "conditionals",
      "future",
      "if-sentences"
    ]
  },
  {
    "id": "future-will-may-might",
    "category": "grammar",
    "level": "B1",
    "title": "Future — will, may/might та прислівники ймовірності",
    "description": "Прогнози, ступені впевненості, порядок слів",
    "htmlPath": "lessons/grammar/future-will-may-might.html",
    "tags": [
      "future",
      "modals",
      "predictions"
    ]
  },
  {
    "id": "be-going-to",
    "category": "grammar",
    "level": "A2",
    "title": "Future with “be going to”",
    "description": "Наміри, плани та передбачення на підставі доказів",
    "htmlPath": "lessons/grammar/be-going-to.html",
    "tags": [
      "future",
      "plans",
      "intentions"
    ]
  },
  {
    "id": "gerunds-and-infinitives",
    "category": "grammar",
    "level": "B1",
    "title": "Gerunds & Infinitives — базове вживання",
    "description": "want to do / like doing — типові патерни",
    "htmlPath": "lessons/grammar/gerunds-and-infinitives.html",
    "tags": [
      "verbs",
      "patterns",
      "practice"
    ]
  },
  {
    "id": "have-got",
    "category": "grammar",
    "level": "A1",
    "title": "Have got — володіння",
    "description": "Форми, скорочення, заперечення, запитання",
    "htmlPath": "lessons/grammar/have-got.html",
    "tags": [
      "have got",
      "possession",
      "family"
    ]
  },
  {
    "id": "how-often-how-much-many",
    "category": "grammar",
    "level": "A2",
    "title": "How often? How much/many?",
    "description": "Питання про частоту та кількість (злічувані/незлічувані)",
    "htmlPath": "lessons/grammar/how-often-how-much-many.html",
    "tags": [
      "questions",
      "frequency",
      "quantity"
    ]
  },
  {
    "id": "imperatives",
    "category": "grammar",
    "level": "A1",
    "title": "Imperatives — наказовий спосіб",
    "description": "Open the window! Don’t touch! Please …",
    "htmlPath": "lessons/grammar/imperatives.html",
    "tags": [
      "commands",
      "requests",
      "classroom"
    ]
  },
  {
    "id": "irregular",
    "category": "grammar",
    "level": "A2",
    "title": "Irregular Verbs — Неправильні дієслова",
    "description": "Base form — Past Simple — Past Participle",
    "htmlPath": "lessons/grammar/irregular.html",
    "tags": [
      "verbs",
      "practice",
      "list"
    ]
  },
  {
    "id": "like-love-hate-ving",
    "category": "grammar",
    "level": "A2",
    "title": "Like / Love / Hate + Ving",
    "description": "Звички та вподобання з герундієм",
    "htmlPath": "lessons/grammar/like-love-hate-ving.html",
    "tags": [
      "gerund",
      "preferences",
      "speaking"
    ]
  },
  {
    "id": "modal-verbs",
    "category": "grammar",
    "level": "B1",
    "title": "Modal verbs — can, must, have to, should",
    "description": "Значення, форма, використання, приклади",
    "htmlPath": "lessons/grammar/modal-verbs.html",
    "tags": [
      "modals",
      "obligation",
      "ability"
    ]
  },
  {
    "id": "ordinal-numbers",
    "category": "grammar",
    "level": "A1",
    "title": "Ordinal Numbers — порядкові числівники",
    "description": "1st, 2nd, 3rd … 21st — дати, черги, поверхи",
    "htmlPath": "lessons/grammar/ordinal-numbers.html",
    "tags": [
      "numbers",
      "order",
      "dates"
    ]
  },
  {
    "id": "passive-voice",
    "category": "grammar",
    "level": "B2",
    "title": "Passive Voice — загальна форма і вживання",
    "description": "Правило to be + V3, коли вживаємо пасив",
    "htmlPath": "lessons/grammar/passive-voice.html",
    "tags": [
      "voice",
      "transformation",
      "forms"
    ]
  },
  {
    "id": "past-continuous",
    "category": "grammar",
    "level": "B1",
    "title": "Past Continuous — тривала дія в минулому",
    "description": "Перервані дії, одночасні дії, зразки питань",
    "htmlPath": "lessons/grammar/past-continuous.html",
    "tags": [
      "tenses",
      "past",
      "storytelling"
    ]
  },
  {
    "id": "past-simple",
    "category": "grammar",
    "level": "A2",
    "title": "Past Simple — was/were та інші дієслова",
    "description": "Форми, заперечення, запитання, приклади",
    "htmlPath": "lessons/grammar/past-simple.html",
    "tags": [
      "tenses",
      "past",
      "regular/irregular"
    ]
  },
  {
    "id": "past-simple-vs-present-perfect",
    "category": "grammar",
    "level": "B1",
    "title": "Past Simple vs Present Perfect",
    "description": "Різниця у вживанні, приклади та маркери часу",
    "htmlPath": "lessons/grammar/past-simple-vs-present-perfect.html",
    "tags": [
      "tenses",
      "contrast",
      "reference"
    ]
  },
  {
    "id": "prepositions-of-place",
    "category": "grammar",
    "level": "A1",
    "title": "Prepositions of Place — місцезнаходження",
    "description": "in, on, under, next to, between, opposite, behind, in front of",
    "htmlPath": "lessons/grammar/prepositions-of-place.html",
    "tags": [
      "prepositions",
      "location",
      "in/on/under"
    ]
  },
  {
    "id": "prepositions-of-time",
    "category": "grammar",
    "level": "A1",
    "title": "Prepositions of Time — at / on / in",
    "description": "Точний час, дні/дати, місяці/роки/пори року",
    "htmlPath": "lessons/grammar/prepositions-of-time.html",
    "tags": [
      "prepositions",
      "time",
      "at/on/in"
    ]
  },
  {
    "id": "present-continuous",
    "category": "grammar",
    "level": "A1",
    "title": "Present Continuous — форма та вживання",
    "description": "Ствердження, заперечення, запитання, signal words",
    "htmlPath": "lessons/grammar/present-continuous.html",
    "tags": [
      "tenses",
      "present",
      "progressive"
    ]
  },
  {
    "id": "present-simple",
    "category": "grammar",
    "level": "A1",
    "title": "Present Simple — форма та вживання",
    "description": "Ствердження, заперечення, запитання, signal words",
    "htmlPath": "lessons/grammar/present-simple.html",
    "tags": [
      "tenses",
      "present",
      "basics"
    ]
  },
  {
    "id": "question-tags",
    "category": "grammar",
    "level": "B1",
    "title": "Question Tags — розділові запитання",
    "description": "It’s cold, isn’t it? — базові правила узгодження",
    "htmlPath": "lessons/grammar/question-tags.html",
    "tags": [
      "questions",
      "communication",
      "intonation"
    ]
  },
  {
    "id": "second-conditional",
    "category": "grammar",
    "level": "B2",
    "title": "Second Conditional — if + Past, would + V",
    "description": "Гіпотетичні ситуації, поради If I were you",
    "htmlPath": "lessons/grammar/second-conditional.html",
    "tags": [
      "conditionals",
      "hypothesis",
      "if-sentences"
    ]
  },
  {
    "id": "short-answers",
    "category": "grammar",
    "level": "A1",
    "title": "Short Answers — короткі відповіді",
    "description": "Yes, I do. / No, I’m not. — базові схеми",
    "htmlPath": "lessons/grammar/short-answers.html",
    "tags": [
      "questions",
      "responses",
      "speaking"
    ]
  },
  {
    "id": "quantifiers-some-any-much-many",
    "category": "grammar",
    "level": "A2",
    "title": "Some / Any / Much / Many / A lot of / Few / Little",
    "description": "Кількість для злічуваних і незлічуваних іменників",
    "htmlPath": "lessons/grammar/quantifiers-some-any-much-many.html",
    "tags": [
      "quantifiers",
      "countable",
      "uncountable"
    ]
  },
  {
    "id": "time-oclock-past-to",
    "category": "grammar",
    "level": "A1",
    "title": "Telling the Time — як казати час",
    "description": "It’s five o’clock; half past; quarter to",
    "htmlPath": "lessons/grammar/time-oclock-past-to.html",
    "tags": [
      "time",
      "speaking",
      "clock"
    ]
  },
  {
    "id": "there-is-there-are",
    "category": "grammar",
    "level": "A1",
    "title": "There is / There are",
    "description": "Як описати кімнату, офіс, місто; форма, заперечення, запитання",
    "htmlPath": "lessons/grammar/there-is-there-are.html",
    "tags": [
      "structure",
      "describing",
      "places"
    ]
  },
  {
    "id": "this-that-these-those",
    "category": "grammar",
    "level": "A1",
    "title": "This / That / These / Those",
    "description": "Вказівні займенники: близько/далеко, однина/множина",
    "htmlPath": "lessons/grammar/this-that-these-those.html",
    "tags": [
      "demonstratives",
      "distance",
      "basics"
    ]
  },
  {
    "id": "too-enough",
    "category": "grammar",
    "level": "B1",
    "title": "Too / Enough",
    "description": "It’s too cold. She isn’t old enough.",
    "htmlPath": "lessons/grammar/too-enough.html",
    "tags": [
      "adjectives",
      "quantifiers",
      "comparison"
    ]
  },
  {
    "id": "used-to",
    "category": "grammar",
    "level": "B1",
    "title": "Used to — минулі звички та стани",
    "description": "Форма, вживання, відмінність від Past Simple",
    "htmlPath": "lessons/grammar/used-to.html",
    "tags": [
      "habits",
      "past",
      "contrast"
    ]
  },
  {
    "id": "wh-questions",
    "category": "grammar",
    "level": "A1",
    "title": "Wh‑questions — питальні слова",
    "description": "Who, What, Where, When, Why, How — базові шаблони",
    "htmlPath": "lessons/grammar/wh-questions.html",
    "tags": [
      "questions",
      "wh-words",
      "information"
    ]
  },
  {
    "id": "yes-no-questions",
    "category": "grammar",
    "level": "A1",
    "title": "Yes/No Questions",
    "description": "Do/Does, Is/Are, Was/Were, Did, Will, Can",
    "htmlPath": "lessons/grammar/yes-no-questions.html",
    "tags": [
      "questions",
      "auxiliaries",
      "basics"
    ]
  },
  {
    "id": "small-talk-starters",
    "category": "communication",
    "level": "A2",
    "title": "Small Talk Starters",
    "description": "Скрипти для знайомств, світські питання та розігрівні вправи.",
    "htmlPath": "lessons/communication/small-talk.html",
    "tags": [
      "speaking",
      "ice breakers"
    ]
  },
  {
    "id": "problem-solving-meetings",
    "category": "communication",
    "level": "B2",
    "title": "Problem-Solving Meetings",
    "description": "Мова для опису проблем, висування рішень та погодження плану дій.",
    "htmlPath": "lessons/communication/problem-solving.html",
    "tags": [
      "business",
      "meetings"
    ]
  },
  {
    "id": "giving-constructive-feedback",
    "category": "communication",
    "level": "B1",
    "title": "Giving Constructive Feedback",
    "description": "Фрейми для позитивного та коригувального зворотного звʼязку з прикладами.",
    "htmlPath": "lessons/communication/feedback.html",
    "tags": [
      "soft skills",
      "business"
    ]
  },
  {
    "id": "numbers-dates-time",
    "category": "lexical",
    "level": "A1",
    "title": "Числа, дати та час",
    "description": "Слова і фрази для лічби, календаря та запиту часу.",
    "htmlPath": "lessons/lexical/numbers-dates-time.html",
    "tags": [
      "numbers",
      "dates",
      "time"
    ]
  },
  {
    "id": "colours-and-shapes",
    "category": "lexical",
    "level": "A1",
    "title": "Кольори та форми",
    "description": "Базові прикметники для опису кольорів і простих геометричних фігур.",
    "htmlPath": "lessons/lexical/colours-and-shapes.html",
    "tags": [
      "colors",
      "shapes",
      "adjectives"
    ]
  },
  {
    "id": "days-months-seasons",
    "category": "lexical",
    "level": "A1",
    "title": "Дні тижня, місяці, пори року",
    "description": "Назви календарних одиниць і ключові фрази для розкладів.",
    "htmlPath": "lessons/lexical/days-months-seasons.html",
    "tags": [
      "calendar",
      "days",
      "seasons"
    ]
  },
  {
    "id": "feelings-and-emotions",
    "category": "lexical",
    "level": "A1",
    "title": "Почуття та емоції",
    "description": "Прості слова для опису настрою, стану та базових емоційних реакцій.",
    "htmlPath": "lessons/lexical/feelings-and-emotions.html",
    "tags": [
      "feelings",
      "emotions",
      "adjectives"
    ]
  },
  {
    "id": "personal-information",
    "category": "lexical",
    "level": "A1",
    "title": "Особиста інформація",
    "description": "Лексика для знайомства: імʼя, вік, країна, адреса та контактні дані.",
    "htmlPath": "lessons/lexical/personal-information.html",
    "tags": [
      "introductions",
      "personal",
      "details"
    ]
  },
  {
    "id": "family-and-friends",
    "category": "lexical",
    "level": "A1",
    "title": "Сімʼя та друзі",
    "description": "Слова для опису членів родини, дружніх стосунків та родинних звʼязків.",
    "htmlPath": "lessons/lexical/family-and-friends.html",
    "tags": [
      "family",
      "friends",
      "relationships"
    ]
  },
  {
    "id": "describing-people",
    "category": "lexical",
    "level": "A1",
    "title": "Опис людей",
    "description": "Ключові слова для зовнішності, одягу та простих характеристик характеру.",
    "htmlPath": "lessons/lexical/describing-people.html",
    "tags": [
      "appearance",
      "clothes",
      "character"
    ]
  },
  {
    "id": "home-and-household",
    "category": "lexical",
    "level": "A1",
    "title": "Дім та побут",
    "description": "Назви кімнат, побутових предметів та основних домашніх занять.",
    "htmlPath": "lessons/lexical/home-and-household.html",
    "tags": [
      "home",
      "household",
      "rooms"
    ]
  },
  {
    "id": "city-and-places",
    "category": "lexical",
    "level": "A1",
    "title": "Місто та місця",
    "description": "Словник для орієнтування у місті: магазини, заклади, транспорт.",
    "htmlPath": "lessons/lexical/city-and-places.html",
    "tags": [
      "city",
      "places",
      "town"
    ]
  },
  {
    "id": "school-and-learning",
    "category": "lexical",
    "level": "A1",
    "title": "Школа та навчання",
    "description": "Лексика про шкільні предмети, класну кімнату та розклад уроків.",
    "htmlPath": "lessons/lexical/school-and-learning.html",
    "tags": [
      "school",
      "classroom",
      "subjects"
    ]
  },
  {
    "id": "food-and-drinks",
    "category": "lexical",
    "level": "A1",
    "title": "Їжа та напої",
    "description": "Прості назви продуктів, страв і напоїв для замовлення чи покупки.",
    "htmlPath": "lessons/lexical/food-and-drinks.html",
    "tags": [
      "food",
      "drinks",
      "meals"
    ]
  },
  {
    "id": "shopping-and-money",
    "category": "lexical",
    "level": "A1",
    "title": "Покупки та гроші",
    "description": "Вирази для магазину, одягу, цін та базових транзакцій.",
    "htmlPath": "lessons/lexical/shopping-and-money.html",
    "tags": [
      "shopping",
      "money",
      "store"
    ]
  },
  {
    "id": "daily-routines",
    "category": "lexical",
    "level": "A1",
    "title": "Щоденні справи",
    "description": "Фрази для опису ранкових, денних та вечірніх звичок.",
    "htmlPath": "lessons/lexical/daily-routines.html",
    "tags": [
      "routine",
      "daily",
      "habits"
    ]
  },
  {
    "id": "free-time-and-hobbies",
    "category": "lexical",
    "level": "A1",
    "title": "Вільний час і хобі",
    "description": "Лексика для розмов про інтереси, дозвілля та плани на вихідні.",
    "htmlPath": "lessons/lexical/free-time-and-hobbies.html",
    "tags": [
      "hobbies",
      "leisure",
      "activities"
    ]
  },
  {
    "id": "sports-basics",
    "category": "lexical",
    "level": "A1",
    "title": "Спорт",
    "description": "Основні види спорту, інвентар та прості дієслова для рухливих занять.",
    "htmlPath": "lessons/lexical/sports-basics.html",
    "tags": [
      "sports",
      "games",
      "exercise"
    ]
  },
  {
    "id": "animals-and-pets",
    "category": "lexical",
    "level": "A1",
    "title": "Тварини",
    "description": "Домашні, фермерські та дикі тварини із базовими характеристиками.",
    "htmlPath": "lessons/lexical/animals-and-pets.html",
    "tags": [
      "animals",
      "pets",
      "wildlife"
    ]
  },
  {
    "id": "nature-and-weather",
    "category": "lexical",
    "level": "A1",
    "title": "Природа та погода",
    "description": "Слова для опису погоди, природних явищ та пейзажів.",
    "htmlPath": "lessons/lexical/nature-and-weather.html",
    "tags": [
      "nature",
      "weather",
      "seasons"
    ]
  },
  {
    "id": "body-and-health",
    "category": "lexical",
    "level": "A1",
    "title": "Тіло та здоровʼя",
    "description": "Частини тіла, прості симптоми та фрази для візиту до лікаря.",
    "htmlPath": "lessons/lexical/body-and-health.html",
    "tags": [
      "body",
      "health",
      "doctor"
    ]
  },
  {
    "id": "jobs-and-professions",
    "category": "lexical",
    "level": "A1",
    "title": "Професії та робота",
    "description": "Назви професій, місць роботи та ключові обовʼязки.",
    "htmlPath": "lessons/lexical/jobs-and-professions.html",
    "tags": [
      "jobs",
      "work",
      "career"
    ]
  },
  {
    "id": "technology-and-gadgets",
    "category": "lexical",
    "level": "A1",
    "title": "Технології та гаджети",
    "description": "Базові пристрої, програми та дії для щоденного користування.",
    "htmlPath": "lessons/lexical/technology-and-gadgets.html",
    "tags": [
      "technology",
      "gadgets",
      "devices"
    ]
  },
  {
    "id": "holidays-and-traditions",
    "category": "lexical",
    "level": "A1",
    "title": "Свята та традиції",
    "description": "Лексика для опису святкувань, подарунків та сімейних традицій.",
    "htmlPath": "lessons/lexical/holidays-and-traditions.html",
    "tags": [
      "holidays",
      "traditions",
      "celebrations"
    ]
  },
  {
    "id": "travel-and-transport",
    "category": "lexical",
    "level": "A1",
    "title": "Подорожі та транспорт",
    "description": "Слова для бронювання, поїздок і користування громадським транспортом.",
    "htmlPath": "lessons/lexical/travel-and-transport.html",
    "tags": [
      "travel",
      "transport",
      "trips"
    ]
  },
  {
    "id": "directions-and-location",
    "category": "lexical",
    "level": "A1",
    "title": "Напрямки та розташування",
    "description": "Фрази для пояснення маршруту та опису розташування обʼєктів.",
    "htmlPath": "lessons/lexical/directions-and-location.html",
    "tags": [
      "directions",
      "location",
      "map"
    ]
  },
  {
    "id": "rooms-and-furniture",
    "category": "lexical",
    "level": "A1",
    "title": "Кімнати та меблі",
    "description": "Словник для опису кімнат, меблів та предметів інтерʼєру.",
    "htmlPath": "lessons/lexical/rooms-and-furniture.html",
    "tags": [
      "rooms",
      "furniture",
      "home"
    ]
  },
  {
    "id": "environment-and-surroundings",
    "category": "lexical",
    "level": "A1",
    "title": "Довкілля та оточення",
    "description": "Базові контрасти місто/село, країна/місто та опис природного середовища.",
    "htmlPath": "lessons/lexical/environment-and-surroundings.html",
    "tags": [
      "environment",
      "surroundings",
      "places"
    ]
  },
  {
    "id": "body-communication",
    "category": "communication",
    "level": "B1",
    "title": "Body Communication Essentials",
    "description": "Лексика та вправи для опису частин тіла і самопочуття.",
    "htmlPath": "lessons/communication/body.html",
    "tags": [
      "body",
      "health",
      "speaking"
    ]
  },
  {
    "id": "irregular-verbs-sprint",
    "category": "quick",
    "level": "A2",
    "title": "Irregular Verb Sprint",
    "description": "Таблиця найуживаніших неправильних дієслів із прикладами та міні-тестом.",
    "htmlPath": "lessons/quick/irregular-verbs.html",
    "tags": [
      "vocabulary",
      "revision"
    ]
  },
  {
    "id": "exam-day-checklist",
    "category": "quick",
    "level": "B2",
    "title": "Exam Day Checklist",
    "description": "План підготовки до іспиту з англійської: тайм-менеджмент, техніки та нагадування.",
    "htmlPath": "lessons/quick/exam-checklist.html",
    "tags": [
      "exam prep",
      "planning"
    ]
  },
  {
    "id": "pronunciation-warmup",
    "category": "quick",
    "level": "A1",
    "title": "Pronunciation Warm-up",
    "description": "Комплект артикуляційних вправ, скоромовки та аудіо-нагріви.",
    "htmlPath": "lessons/quick/pronunciation-warmup.html",
    "tags": [
      "pronunciation",
      "warm up"
    ]
  }
];
