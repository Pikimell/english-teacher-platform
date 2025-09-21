import { lessons, lessonCategories } from '../data/lessons.js';

const communicationWordLoaders = {
  body: () => import('../public/scripts/communication/words/body.js'),
  'small-talk': () => import('../public/scripts/communication/words/smallTalk.js'),
  'problem-solving': () => import('../public/scripts/communication/words/problemSolving.js'),
  feedback: () => import('../public/scripts/communication/words/feedback.js'),
};

const basePath = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.BASE_URL) || '/';

function resolveAssetPath(path) {
  const normalizedBase = basePath.endsWith('/') ? basePath : `${basePath}/`;
  const rawPath = String(path || '');
  if (rawPath.startsWith(normalizedBase)) return rawPath;
  return `${normalizedBase}${rawPath.replace(/^\/+/, '')}`;
}

const params = new URLSearchParams(window.location.search);
const topicId = params.get('topic');
const fallbackTitle = params.get('title');
const fallbackCategory = params.get('category');
const fallbackLevel = params.get('level');
const fallbackFile = params.get('file');

const lesson = topicId ? lessons.find((item) => item.id === topicId) : undefined;

const resolvedTitle = lesson?.title ?? (fallbackTitle ? decodeURIComponent(fallbackTitle) : 'Матеріал уроку');
const resolvedCategory = lesson?.category ?? (fallbackCategory ? decodeURIComponent(fallbackCategory) : '');
const resolvedLevel = lesson?.level ?? (fallbackLevel ? decodeURIComponent(fallbackLevel) : '');
const resolvedFile = (() => {
  const candidate = lesson?.htmlPath ?? (fallbackFile ? decodeURIComponent(fallbackFile) : null);
  if (!candidate) return null;
  return candidate.startsWith('lessons/') ? candidate : null;
})();

window.lessonContext = {
  id: lesson?.id ?? topicId ?? null,
  title: resolvedTitle,
  category: resolvedCategory,
  level: resolvedLevel,
  htmlPath: resolvedFile,
};

const titleElement = document.querySelector('[data-lesson-title]');
const categoryElement = document.querySelector('[data-lesson-category]');
const levelElement = document.querySelector('[data-lesson-level]');
const statusElement = document.querySelector('[data-lesson-status]');
const contentElement = document.getElementById('lesson-content');

function setCurrentYear() {
  const yearEl = document.querySelector('[data-component="copyright-year"]');
  if (!yearEl) return;
  yearEl.textContent = String(new Date().getFullYear());
}

function renderMeta() {
  if (titleElement) titleElement.textContent = resolvedTitle;
  const categoryLabel = lessonCategories[resolvedCategory]?.label ?? '';
  const categoryText = categoryLabel || resolvedCategory;
  if (categoryElement) {
    categoryElement.textContent = categoryText || '';
  }
  if (levelElement) {
    levelElement.textContent = resolvedLevel ? `Рівень: ${resolvedLevel}` : '';
  }
  document.title = `${resolvedTitle} | English Teacher Platform`;
}

async function loadLesson() {
  if (!contentElement) return;

  if (!resolvedFile) {
    if (statusElement) {
      statusElement.textContent = 'Не вдалося визначити файл з матеріалом. Перейдіть назад та оберіть тему зі списку.';
    }
    return;
  }

  try {
    const response = await fetch(resolveAssetPath(resolvedFile));
    if (!response.ok) {
      throw new Error(`Не вдалося завантажити файл: ${response.status}`);
    }
    const markup = await response.text();
    contentElement.innerHTML = markup;
    await hydrateCommunicationWords(contentElement);
  } catch (error) {
    if (statusElement) {
      statusElement.textContent = 'Сталася помилка під час завантаження матеріалу. Спробуйте пізніше або поверніться до каталогу.';
    }
    console.error(error);
  }
}

function renderCommunicationTable(container, entries) {
  if (!container) return;
  const words = Array.isArray(entries) ? entries : [];
  if (!words.length) return;

  container.classList.add('communication__table');

  const table = document.createElement('table');

  const thead = document.createElement('thead');
  const headRow = document.createElement('tr');
  ['Слово', 'Переклад', 'Приклад'].forEach((label) => {
    const th = document.createElement('th');
    th.textContent = label;
    headRow.appendChild(th);
  });
  thead.appendChild(headRow);

  const tbody = document.createElement('tbody');
  words.forEach((item) => {
    if (!item) return;
    const row = document.createElement('tr');

    const wordCell = document.createElement('td');
    wordCell.textContent = item.word || item.term || '';

    const translationCell = document.createElement('td');
    translationCell.textContent = item.translation || item.meaning || '';

    const exampleCell = document.createElement('td');
    exampleCell.textContent = item.example || item.sentence || '';

    row.appendChild(wordCell);
    row.appendChild(translationCell);
    row.appendChild(exampleCell);
    tbody.appendChild(row);
  });

  table.appendChild(thead);
  table.appendChild(tbody);

  container.innerHTML = '';
  container.appendChild(table);
}

async function hydrateCommunicationWords(root) {
  if (!root) return;
  const placeholders = root.querySelectorAll('[data-communication-words]');
  if (!placeholders.length) return;

  window.communicationVocabularyMap = window.communicationVocabularyMap || {};

  for (const placeholder of placeholders) {
    const moduleName = placeholder.getAttribute('data-module');
    if (!moduleName) continue;
    const loader = communicationWordLoaders[moduleName];
    if (typeof loader !== 'function') continue;
    try {
      const module = await loader();
      const words = module?.default || module?.words || [];
      if (!Array.isArray(words) || !words.length) continue;

      window.communicationVocabularyMap[moduleName] = words;
      window.communicationCurrentWords = words;

      renderCommunicationTable(placeholder, words);
    } catch (error) {
      console.error(`Не вдалося завантажити слова для модуля "${moduleName}"`, error);
    }
  }
}

function init() {
  setCurrentYear();
  renderMeta();
  loadLesson();
}

init();
