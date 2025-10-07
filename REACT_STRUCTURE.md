# React-Architecture Blueprint для English Conspect

Документ описує цільову структуру застосунку після міграції на React, перелік функціональних можливостей, а також рекомендації щодо організації коду, стану та сервісів. Мета — зберегти всі поточні можливості статичної платформи й зробити їх масштабованими, керованими та повторно використовуваними в екосистемі React.

## Поточні функціональні можливості
- **Головна (`index.html`)**: каталог уроків із пошуком, фільтрами за категоріями та рівнями, статистикою та блоком «Мої уроки» для збережених комбінацій.
- **Конструктор уроків (`custom-lessons.html`)**: створення власних добірок тем, пошук по темах, збереження в `localStorage`, перегляд і видалення уроків, підтримка пресетів.
- **Сторінка уроку (`lesson.html`)**: завантаження теорії з HTML-файлів, рендеринг практики із JSON, автоматичне підвантаження словників для Communication-модулів, інтеграція з генератором завдань та збереження контексту уроку.
- **Практика**: відображення різних типів завдань (MCQ, Gap, Transform, Match, Error, Order, Short, Writing тощо), миттєва перевірка відповідей, хінти, агрегація згенерованих чи базових завдань.
- **Генератор завдань / теорії**: звернення до ChatGPT API через проксі (`api/chatGpt.js`), генерація JSON блоку практики або HTML-таблиць теорії, робота з токеном у `localStorage`.
- **Placement Test**: форма з питаннями за рівнями CEFR, підрахунок результатів, побудова «діаграми» прогресу, текстовий підсумок.
- **Дані та контент**: великі словники уроків (`lessons.js`), пресети, питання тесту, статичні HTML-уроки (`public/lessons/**`) і JSON-практика (`public/data/practice/**`), а також аудіо/іконки/зображення.

## Цілі міграції на React
- Уніфікований рендеринг сторінок через маршрутизацію й компоненти.
- Модульність: розділення на features/entities/shared для спрощення підтримки.
- Центральний контроль стану (каталог, фільтри, збережені уроки, практика).
- Розмежування даних: статичні (lessons, practice) vs динамічні (генератор через API).
- Підготовка до SSR/SSG чи lazy loading для великих списків.

## Пропонована структура директорій

```text
src/
  app/
    App.tsx
    router.tsx
    providers/
      QueryProvider.tsx
      ThemeProvider.tsx
    layout/
      BaseLayout.tsx
      Header.tsx
      Footer.tsx
  pages/
    Home/
      HomePage.tsx
      HomePage.module.css
    Lesson/
      LessonPage.tsx
      CustomLessonView.tsx
    CustomLessons/
      CustomLessonsPage.tsx
    Generator/
      GeneratorPage.tsx
    PlacementTest/
      PlacementTestPage.tsx
  features/
    lessonCatalog/
      components/
        LessonCard.tsx
        CatalogFilters.tsx
        StatsPanel.tsx
      hooks/
        useLessonFilters.ts
        useLessonStats.ts
      state/
        catalogSlice.ts
    customLessons/
      components/
        BuilderForm.tsx
        TopicSelector.tsx
        SavedLessonList.tsx
      hooks/
        useCustomLessons.ts
      services/
        localStorageClient.ts
    lessonContent/
      components/
        TopicSection.tsx
        PracticeSection.tsx
        CommunicationTable.tsx
      hooks/
        useLessonContent.ts
        usePracticeLoader.ts
    practice/
      components/
        tasks/
          McqTask.tsx
          GapTask.tsx
          ...
      hooks/
        usePracticeEvaluation.ts
      utils/
        normalizers.ts
        taskFactories.ts
    generator/
      components/
        TaskGeneratorForm.tsx
        TheoryGeneratorForm.tsx
        GeneratedJsonPreview.tsx
      hooks/
        useTaskGenerator.ts
        useTheoryGenerator.ts
    placementTest/
      components/
        QuestionList.tsx
        ResultChart.tsx
        SummaryList.tsx
      hooks/
        usePlacementTest.ts
  entities/
    lesson/
      types.ts
      selectors.ts
      adapters.ts
    practiceTask/
      types.ts
      validators.ts
    placementQuestion/
      types.ts
  shared/
    api/
      httpClient.ts
      chatGptClient.ts
    config/
      routes.ts
      constants.ts
    hooks/
      useLocalStorage.ts
      useToggle.ts
    lib/
      url.ts
      html.ts
    ui/
      Button.tsx
      Card.tsx
      Dropdown.tsx
      Tabs.tsx
    styles/
      globals.css
      theme.css
  data/
    lessons.json
    customLessonPresets.json
    placementTest.json
  assets/
    images/
    audio/
    icons/
  routes/
    index.ts
    HomeRoute.tsx
    LessonRoute.tsx
    ...
  test/
    fixtures/
    mocks/
```

> **Примітка:** назви можна адаптувати під ваш стиль. Ключова ідея — чітке розділення шарів:
> - `pages/` — контейнерні сторінки, які композиціюють features.
> - `features/` — бізнес-функціональність з композицією компонентів, стану та сервісів.
> - `entities/` — типи, моделі й адаптери для повторного використання даних.
> - `shared/` — інфраструктурні частини та UI-бібліотека.

## Маршрути та сторінки
- `/` → `HomePage`  
  - Підʼєднує `lessonCatalog` для фільтрів, карток, статистики.  
  - Рендерить блок `customLessons` із збереженими уроками.
- `/lessons/:lessonId` → `LessonPage`  
  - Визначає чи відображається одиночна тема або комбінований урок.  
  - Завантажує HTML/Markdown контент теми (через `useLessonContent`).  
  - Додає практику (`practice` feature) та словники Communication.
- `/custom-lessons` → `CustomLessonsPage`  
  - Містить конструктор, список збережених уроків, CRUD через `customLessons`.
- `/generator` → `GeneratorPage`  
  - Форми для генерації теорії/практики, відображення JSON, копіювання/завантаження.
- `/placement-test` → `PlacementTestPage`  
  - Рендерить питання, обробляє відправлення, показує результати.
- `/quick/:slug` або `/communication/:slug` → підмаршрути для тематичних сторінок (опційно).

Маршрути бажано декларативно описати в `app/router.tsx` (React Router v6.4+) або альтернативі (TanStack Router) із підтримкою lazy-loaded сторінок.

## Дані та стан
- **Статичні дані** (`lessons`, `presets`, `placementQuestions`, практики) зручно зберігати у форматі `.json`, імпортувати на рівні build (Vite дозволяє `import lessons from '../data/lessons.json';`).  
- **Локальний стан (UI)** — React useState/useReducer у компонентах, напр. фільтри каталогу.  
- **Глобальний state**:  
  - `customLessons` → контекст + `useLocalStorage` гак або легка бібліотека (`zustand`) для синхронізації між вкладками.  
  - `practice` → внутрішній стан кожного блоку (вибрані відповіді, результати).  
  - `generator` → `React Query` / `useMutation` для запитів до ChatGPT, кешування результатів, статуси завантаження.  
- **Дані уроку**: `useLessonContent` перевіряє, чи це комбінований урок (id з `localStorage`/пресету), чи звичайний, підтягує відповідні теми і практику.  
- **Ініціалізація**: глобальні провайдери (`QueryProvider`, `CustomLessonProvider`) огортають `App`.

## Робота з сервісами
- **ChatGPT API**: винесений клієнт у `shared/api/chatGptClient.ts` з методами `generateTask` і `generateTheory`.  
  - Токен зберігається безпосередньо в `localStorage`, гак `useGptToken()` обгортає читання/запис.  
  - Мутації через `React Query` дають статуси `isLoading`, `isError`, повторні запити, кешування.
- **Завантаження HTML контенту уроків**:  
  - Використати `fetch` у `useLessonContent`, конвертація HTML у React через `dangerouslySetInnerHTML` або попередню конвертацію у Markdown + рендерер (remark/rehype).  
  - Для Communication модулів: динамічний імпорт JSON/JS зі словником, кешування у `lessonContent` feature.
- **Persistence**:  
  - `customLessons` → `localStorage`.  
  - Опційно зробити `IndexedDB` для великих JSON-практик або прогресу користувача.

## Компоненти та UI-шар
- **Картки уроків**: окрема бібліотека компонентів (`LessonCard`, `PracticeCard`).  
- **Фільтри**: `CatalogFilters` з контрольованими елементами, працює з `useLessonFilters`.  
- **Практика**: кожен тип завдання — окремий компонент із чітким контрактом (`props` з масивом питань, callback onSubmit).  
- **Формовані блоки**: `SavedLessonCard`, `TopicSelector`, `PracticeGeneratorPanel`, `PlacementResultCard`.  
- **Юніфікований стиль**: CSS Modules, Tailwind або styled-components. Для швидкого старту — залишити витягнуті стилі з поточного `main.css` і поступово рефакторити.

## Рекомендації щодо тестування
- **Юніт-тести**: перевірка утиліт (`normaliseValue`, перевірка відповідей, генерація ідентифікаторів).  
- **Component tests**: `@testing-library/react` для ключових компонентів (`LessonCard`, `PracticeTask`, `PlacementTest` форма).  
- **E2E**: Playwright/Cypress для smoke-сценаріїв (пошук на головній, створення уроку, проходження тесту).

## Збірка та деплой
- Використати `Vite` з `React` / `TypeScript` шаблоном, налаштувати `base` для GitHub Pages чи іншого статичного хостингу.  
- Статичні дані (`public/lessons/**`, `public/data/practice/**`) копіюються в `/public` або обробляються через `import.meta.glob`.  
- Налаштувати `code splitting` для lazy-маршрутів і важких модулів (Communication словники, генератор).  
- CI/CD: лінтери (`eslint`, `prettier`), тести, білд, деплой на Pages/Netlify/Vercel.

## Подальші кроки
1. Ініціалізувати новий React-проєкт (Vite + TypeScript).  
2. Перенести статичні дані в `data/` і налаштувати типи.  
3. Реалізувати маршрути та базові сторінки з порожніми станами.  
4. Поступово переносити features (каталог → урок → практика → конструктор → генератор → тест).  
5. Налаштувати інтеграції (ChatGPT, localStorage sync).  
6. Додати тести, впорядкувати стилі, оптимізувати performance (lazy, memo).  
7. Перевірити білд, задеплоїти оновлену версію.

Такий план забезпечує поетапну міграцію без втрати поточних можливостей і створює фундамент для масштабування (нові теми, типи завдань, прогрес користувачів).
