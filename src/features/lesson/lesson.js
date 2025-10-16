import { lessons, lessonCategories } from '@data/lessons.js';
import { customLessonPresets } from '@data/custom-lesson-presets.js';
import { loadCustomLessons } from '@features/custom-lessons/custom-lessons-store.js';
import { communicationWords } from '@data/communication-words.js';
import { renderTopicSender } from '@features/lesson/send-lesson';
import {
  createWordwallIframe,
  getWordwallConfigsForLesson,
} from '@data/wordwall.js';

const basePath =
  (typeof import.meta !== 'undefined' &&
    import.meta.env &&
    import.meta.env.BASE_URL) ||
  '/';

function resolveAssetPath(path) {
  const normalizedBase = basePath.endsWith('/') ? basePath : `${basePath}/`;
  const rawPath = String(path || '');
  if (rawPath.startsWith(normalizedBase)) return rawPath;
  return `${normalizedBase}${rawPath.replace(/^\/+/, '')}`;
}

const params = new URLSearchParams(window.location.search);
const normaliseCategoryParam = value => value;
const topicId = params.get('topic');
const customLessonId = params.get('custom');
const fallbackTitle = params.get('title');
const fallbackCategory = normaliseCategoryParam(params.get('category'));
const fallbackLevel = params.get('level');
const fallbackFile = params.get('file');

const lesson = topicId ? lessons.find(item => item.id === topicId) : undefined;
const customLesson = (() => {
  if (!customLessonId) return null;
  const candidates = [];
  if (Array.isArray(customLessonPresets)) {
    customLessonPresets.forEach(preset => {
      if (!preset || typeof preset !== 'object') return;
      const topicIds = Array.isArray(preset.topicIds)
        ? [...preset.topicIds]
        : [];
      if (!preset.id || !topicIds.length) return;
      candidates.push({
        ...preset,
        topicIds,
        source: 'preset',
      });
    });
  }
  loadCustomLessons()
    .filter(item => item && typeof item === 'object')
    .forEach(item => {
      const topicIds = Array.isArray(item.topicIds) ? [...item.topicIds] : [];
      if (!item.id || !topicIds.length) return;
      candidates.push({
        ...item,
        topicIds,
        source: 'local',
      });
    });
  return candidates.find(item => item.id === customLessonId) ?? null;
})();

const isCustomLesson = Boolean(customLesson);

const resolvedTitle = (() => {
  if (isCustomLesson) return customLesson.title;
  if (lesson?.title) return lesson.title;
  return fallbackTitle ? decodeURIComponent(fallbackTitle) : 'Матеріал уроку';
})();

const resolvedCategory = (() => {
  if (isCustomLesson) return 'custom';
  if (lesson?.category) return lesson.category;
  return fallbackCategory ? decodeURIComponent(fallbackCategory) : '';
})();

const resolvedLevel = (() => {
  if (isCustomLesson) {
    if (customLesson.level) return customLesson.level;
    const topics = (customLesson.topicIds || [])
      .map(id => lessons.find(item => item.id === id))
      .filter(Boolean);
    const uniqueLevels = Array.from(
      new Set(topics.map(item => item.level))
    ).sort();
    return uniqueLevels.join(', ');
  }
  if (lesson?.level) return lesson.level;
  return fallbackLevel ? decodeURIComponent(fallbackLevel) : '';
})();

const resolvedFile = (() => {
  if (isCustomLesson) return null;
  const candidate =
    lesson?.htmlPath ??
    (fallbackFile ? decodeURIComponent(fallbackFile) : null);
  if (!candidate) return null;
  return candidate.startsWith('lessons/') ? candidate : null;
})();

window.lessonContext = {
  id: isCustomLesson ? customLesson.id : lesson?.id ?? topicId ?? null,
  title: resolvedTitle,
  category: resolvedCategory,
  level: resolvedLevel,
  htmlPath: resolvedFile,
  source: isCustomLesson ? customLesson.source || 'custom' : 'catalog',
  topicIds: isCustomLesson
    ? [...(customLesson.topicIds || [])]
    : lesson?.id
    ? [lesson.id]
    : topicId
    ? [topicId]
    : [],
  isCustomLesson,
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
  const categoryLabel = (() => {
    if (isCustomLesson) return 'Комбінований урок';
    return lessonCategories[resolvedCategory]?.label ?? '';
  })();
  const categoryText = categoryLabel || resolvedCategory;
  if (categoryElement) {
    categoryElement.textContent = categoryText || '';
  }
  if (levelElement) {
    levelElement.textContent = resolvedLevel ? `Рівень: ${resolvedLevel}` : '';
  }
  const practiceTitleElement = document.getElementById('practice-title');
  if (practiceTitleElement) {
    practiceTitleElement.textContent = resolvedTitle;
  }
  document.title = `${resolvedTitle} | English Teacher Platform`;
}

function makeTopicAnchorId(rawId) {
  const sanitized =
    String(rawId || '')
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9_-]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'topic';
  return `lesson-topic-${sanitized}`;
}

function createSummaryList(topics) {
  if (!topics.length) return null;
  const wrapper = document.createElement('section');
  wrapper.className = 'lesson-custom-summary';

  const heading = document.createElement('h2');
  heading.textContent = 'Склад уроку';
  wrapper.appendChild(heading);

  const list = document.createElement('ol');
  list.className = 'lesson-custom-summary__list';

  topics.forEach((topic, index) => {
    const item = document.createElement('li');
    item.className = 'lesson-custom-summary__item';
    const categoryLabel =
      lessonCategories[topic.category]?.label ?? topic.category;
    const anchorId = makeTopicAnchorId(topic.id);
    const link = document.createElement('a');
    link.className = 'lesson-custom-summary__link';
    link.href = `#${anchorId}`;
    link.dataset.topicAnchor = anchorId;

    const title = document.createElement('strong');
    title.textContent = `${index + 1}. ${topic.title}`;
    const meta = document.createElement('span');
    meta.textContent = `${categoryLabel} · ${topic.level}`;

    link.appendChild(title);
    link.appendChild(meta);
    link.addEventListener('click', event => {
      const target = document.getElementById(anchorId);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      requestAnimationFrame(() => {
        try {
          target.focus({ preventScroll: true });
        } catch (error) {
          target.focus();
        }
      });
    });

    item.appendChild(link);
    list.appendChild(item);
  });

  wrapper.appendChild(list);
  return wrapper;
}

async function fetchPracticeDataForTopic(topic) {
  if (!topic) return null;
  const candidates = new Set();
  if (topic.id) {
    candidates.add(`data/practice/${topic.id}.json`);
  }

  if (topic.htmlPath) {
    const normalized = String(topic.htmlPath)
      .replace(/^\.?\/?/, '')
      .replace(/\.html?$/i, '');
    if (normalized) {
      candidates.add(`data/practice/${normalized}.json`);
      const segments = normalized.split('/');
      const last = segments[segments.length - 1];
      if (last) {
        candidates.add(`data/practice/${last}.json`);
      }
    }
  }

  for (const path of candidates) {
    try {
      const response = await fetch(resolveAssetPath(path), {
        cache: 'no-store',
      });
      if (!response.ok) continue;
      const payload = await response.json();
      if (payload && Array.isArray(payload.tasks) && payload.tasks.length) {
        return payload;
      }
    } catch (error) {
      console.warn(`Не вдалося завантажити практику за шляхом ${path}`, error);
    }
  }

  return null;
}

function renderEmptyPracticeState(container) {
  if (!container) return;
  const note = document.createElement('p');
  note.className = 'practice-inline__empty muted';
  note.textContent = 'Практика для цієї теми поки відсутня.';
  container.appendChild(note);
}

function createWordwallSection(lessonId) {
  const configs = getWordwallConfigsForLesson(lessonId);
  if (!configs.length) return null;

  const section = document.createElement('section');
  section.className = 'lesson-wordwall';

  const heading = document.createElement('h2');
  heading.className = 'lesson-wordwall__title';
  heading.textContent = 'Wordwall';
  section.appendChild(heading);

  const itemsWrapper = document.createElement('div');
  itemsWrapper.className = 'lesson-wordwall__items';
  section.appendChild(itemsWrapper);

  let hasEmbeds = false;

  configs.forEach((config, index) => {
    const iframe = createWordwallIframe({
      ...config,
      title: config.title || `Wordwall вправа ${index + 1}`,
    });
    if (!iframe) return;
    hasEmbeds = true;
    itemsWrapper.appendChild(iframe);
  });

  if (!hasEmbeds) return null;

  return section;
}

async function renderCustomLesson() {
  if (!contentElement) return;

  const topics = (customLesson?.topicIds || [])
    .map(id => lessons.find(item => item.id === id))
    .filter(Boolean);

  if (!topics.length) {
    if (statusElement) {
      statusElement.textContent =
        'Не вдалося знайти вибрані теми. Створіть урок заново.';
    }
    return;
  }

  contentElement.innerHTML = '';

  if (customLesson?.description) {
    const intro = document.createElement('p');
    intro.className = 'lesson-custom-description';
    intro.textContent = customLesson.description;
    contentElement.appendChild(intro);
  }

  const categoryOrder = {
    grammar: 0,
    lexical: 1,
  };

  const orderedTopics = topics.slice().sort((a, b) => {
    const orderA = categoryOrder[a.category] ?? 99;
    const orderB = categoryOrder[b.category] ?? 99;
    if (orderA !== orderB) return orderA - orderB;
    return 0;
  });

  const summary = createSummaryList(orderedTopics);
  if (summary) {
    contentElement.appendChild(summary);
  }

  const wordwallSection = createWordwallSection(customLesson?.id ?? null);
  if (wordwallSection) {
    contentElement.appendChild(wordwallSection);
  }

  for (const topic of orderedTopics) {
    const section = document.createElement('section');
    section.className = 'lesson-topic';
    section.dataset.topicId = topic.id;
    const sectionAnchorId = makeTopicAnchorId(topic.id);
    section.id = sectionAnchorId;
    section.setAttribute('tabindex', '-1');

    const header = document.createElement('header');
    header.className = 'lesson-topic__header';

    const title = document.createElement('h3');
    title.className = 'lesson-topic__title';
    title.textContent = topic.title;
    header.appendChild(title);

    const meta = document.createElement('p');
    meta.className = 'lesson-topic__meta';
    const categoryLabel =
      lessonCategories[topic.category]?.label ?? topic.category;
    meta.textContent = `${categoryLabel} · Рівень ${topic.level}`;
    header.appendChild(meta);

    section.appendChild(header);

    const body = document.createElement('div');
    body.className = 'lesson-topic__body';
    section.appendChild(body);

    contentElement.appendChild(section);

    try {
      const response = await fetch(resolveAssetPath(topic.htmlPath));
      if (!response.ok) {
        throw new Error(`Не вдалося завантажити файл: ${response.status}`);
      }
      const markup = await response.text();
      body.innerHTML = markup;
    } catch (error) {
      body.innerHTML =
        '<p class="lesson-topic__error">Не вдалося завантажити матеріал цієї теми.</p>';
      console.error(error);
    }

    const practiceWrapper = document.createElement('div');
    practiceWrapper.className = 'lesson-topic__practice';
    section.appendChild(practiceWrapper);

    try {
      const practiceData = await fetchPracticeDataForTopic(topic);
      if (
        practiceData &&
        Array.isArray(practiceData.tasks) &&
        practiceData.tasks.length
      ) {
        const practiceApi = window.practice || {};
        const heading = practiceData.title
          ? `Практика: ${practiceData.title}`
          : `Практика: ${topic.title}`;
        const level = practiceData.level || topic.level || '';
        if (typeof practiceApi.renderTaskList === 'function') {
          practiceApi.renderTaskList(practiceWrapper, practiceData.tasks, {
            title: heading,
            level,
            description: practiceData.description,
            keyPrefix: `${topic.id}-practice`,
          });
        } else {
          renderEmptyPracticeState(practiceWrapper);
        }
      } else {
        renderEmptyPracticeState(practiceWrapper);
      }
    } catch (error) {
      console.error('Помилка під час завантаження практики', error);
      renderEmptyPracticeState(practiceWrapper);
    }
  }

  if (statusElement) {
    statusElement.remove();
  }

  await hydrateCommunicationWords(contentElement);
}

async function loadLesson() {
  if (!contentElement) return;

  if (isCustomLesson) {
    await renderCustomLesson();
    renderTopicSender();
    return;
  }

  if (!resolvedFile) {
    if (statusElement) {
      statusElement.textContent =
        'Не вдалося визначити файл з матеріалом. Перейдіть назад та оберіть тему зі списку.';
    }
    return;
  }

  try {
    const response = await fetch(resolveAssetPath(resolvedFile));
    if (!response.ok) {
      throw new Error(`Не вдалося завантажити файл: ${response.status}`);
    }
    const markup = await response.text();
    contentElement.innerHTML = '';

    const wordwallSection = createWordwallSection(lesson?.id ?? null);
    if (wordwallSection) {
      contentElement.appendChild(wordwallSection);
    }

    const template = document.createElement('template');
    template.innerHTML = markup;
    contentElement.appendChild(template.content);
    renderTopicSender();
    await hydrateCommunicationWords(contentElement);
  } catch (error) {
    if (statusElement) {
      statusElement.textContent =
        'Сталася помилка під час завантаження матеріалу. Спробуйте пізніше або поверніться до каталогу.';
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
  ['Слово', 'Переклад', 'Приклад'].forEach(label => {
    const th = document.createElement('th');
    th.textContent = label;
    headRow.appendChild(th);
  });
  thead.appendChild(headRow);

  const tbody = document.createElement('tbody');
  words.forEach(item => {
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

function resolveCommunicationTopic(container) {
  if (!container) return null;
  if (container.dataset.communicationTopic)
    return container.dataset.communicationTopic;
  if (container.dataset.topic) return container.dataset.topic;
  const ancestor = container.closest('[data-communication-topic]');
  if (ancestor?.dataset.communicationTopic)
    return ancestor.dataset.communicationTopic;
  const contextId = window.lessonContext?.id;
  if (contextId && communicationWords[contextId]) return contextId;
  return null;
}

async function hydrateCommunicationWords(root) {
  if (!root) return;
  const containers = Array.from(
    root.querySelectorAll('[data-communication-words]')
  );
  if (!containers.length) return;

  containers.forEach(container => {
    const topicKey = resolveCommunicationTopic(container);
    if (!topicKey) return;
    const entries = communicationWords[topicKey] || [];
    if (!entries.length) return;
    renderCommunicationTable(container, entries);
  });
}

function init() {
  setCurrentYear();
  renderMeta();
  loadLesson();
}

init();
