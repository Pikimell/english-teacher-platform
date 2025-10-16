import { lessons, lessonCategories } from '../data/lessons.js';
import { customLessonPresets } from '../data/custom-lesson-presets.js';
import {
  loadCustomLessons,
  subscribeToStorage,
} from './custom-lessons-store.js';
import { auth } from './auth.js';
import './header-actions.js';

const state = {
  search: '',
  category: 'all',
  level: 'all',
};

const searchInput = document.querySelector('[data-filter="search"]');
const levelSelect = document.querySelector('[data-filter="level"]');
const categoryButtons = Array.from(
  document.querySelectorAll('[data-category]')
);
const lessonsSection = document.querySelector('[data-lessons-section]');
const lessonsGrid = document.querySelector('[data-lessons-grid]');
const lessonsEmpty = document.querySelector('[data-lessons-empty]');
const stats = {
  total: document.querySelector('[data-stat-total]'),
  grammar: document.querySelector('[data-stat-grammar]'),
  lexical: document.querySelector('[data-stat-lexical]'),
};

auth.init();

function normaliseValue(value) {
  return value.trim().toLowerCase();
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function updateCategoryButtons() {
  categoryButtons.forEach(button => {
    const isActive = button.dataset.category === state.category;
    const isAll = button.dataset.category === 'all';
    const active = isAll ? state.category === 'all' : isActive;
    button.classList.toggle('chip--filled', active);
    button.setAttribute('aria-pressed', String(active));
  });
}

function createCardTemplate(lesson) {
  const categoryLabel =
    lessonCategories[lesson.category]?.label ?? lesson.category;
  const link = `lesson.html?topic=${encodeURIComponent(
    lesson.id
  )}&category=${encodeURIComponent(lesson.category)}&level=${encodeURIComponent(
    lesson.level
  )}&title=${encodeURIComponent(lesson.title)}&file=${encodeURIComponent(
    lesson.htmlPath
  )}`;
  const tags = Array.isArray(lesson.tags) ? lesson.tags : [];

  return `
    <article class="lesson-card" data-lesson-id="${lesson.id}" data-category="${
    lesson.category
  }" data-level="${lesson.level}">
      <a class="lesson-card__link" href="${link}">
        <div class="lesson-card__meta">
          <span class="lesson-card__category">${categoryLabel}</span>
          <span class="lesson-card__level" aria-label="Рівень">${
            lesson.level
          }</span>
        </div>
        <h3 class="lesson-card__title">${lesson.title}</h3>
        <p class="lesson-card__description">${lesson.description}</p>
        ${
          tags.length
            ? `<ul class="lesson-card__tags">${tags
                .map(tag => `<li>${tag}</li>`)
                .join('')}</ul>`
            : ''
        }
        <span class="lesson-card__cta">Перейти до матеріалу</span>
      </a>
    </article>
  `;
}

function summariseCustomLesson(lesson) {
  const selectedTopics = (lesson.topicIds || [])
    .map(id => lessons.find(item => item.id === id))
    .filter(Boolean);

  const levels = Array.from(
    new Set(selectedTopics.map(item => item.level))
  ).sort();
  const grammarCount = selectedTopics.filter(
    item => item.category === 'grammar'
  ).length;
  const lexicalCount = selectedTopics.filter(
    item => item.category === 'lexical'
  ).length;

  return {
    topics: selectedTopics,
    levels,
    grammarCount,
    lexicalCount,
  };
}

function createCustomLessonCard(lesson, meta = summariseCustomLesson(lesson)) {
  const description =
    lesson.description ||
    meta.topics
      .map(item => item.title)
      .slice(0, 3)
      .join(', ');
  const levelLabel =
    lesson.level ||
    (meta.levels.length ? meta.levels.join(', ') : 'мікси рівнів');
  const metaParts = [];
  if (levelLabel) metaParts.push(`Рівні: ${escapeHtml(levelLabel)}`);
  if (meta.grammarCount) metaParts.push(`Граматика: ${meta.grammarCount}`);
  if (meta.lexicalCount) metaParts.push(`Лексика: ${meta.lexicalCount}`);

  return `
    <article class="lesson-card lesson-card--custom" data-custom-lesson-id="${
      lesson.id
    }" data-custom-source="${lesson.source || 'local'}">
      <a class="lesson-card__link" href="lesson.html?custom=${encodeURIComponent(
        lesson.id
      )}">
        
       <h3 class="lesson-card__title">${escapeHtml(lesson.title)}</h3>
        ${
          metaParts.length
            ? `<p class="lesson-card__meta">${metaParts.join(' · ')}</p>`
            : ''
        }
        <p class="lesson-card__description">${escapeHtml(
          description || 'Урок містить кілька тем.'
        )}</p>
        
        <span class="lesson-card__cta">Відкрити комбінований урок</span>
      </a>
    </article>
  `;
}

function collectPresetLessons() {
  if (!Array.isArray(customLessonPresets)) return [];
  return customLessonPresets
    .filter(item => item && typeof item === 'object' && item.id)
    .map((item, index) => ({
      ...item,
      topicIds: Array.isArray(item.topicIds) ? [...item.topicIds] : [],
      source: 'preset',
      sortIndex: index,
    }));
}

function collectLocalCustomLessons() {
  return loadCustomLessons()
    .filter(item => item && typeof item === 'object' && item.id)
    .map((item, index) => ({
      ...item,
      topicIds: Array.isArray(item.topicIds) ? [...item.topicIds] : [],
      source: 'local',
      sortIndex: 1000 + index,
    }));
}

function getAllCustomLessons() {
  const byId = new Map();
  collectPresetLessons().forEach(lesson => {
    if (!byId.has(lesson.id)) {
      byId.set(lesson.id, lesson);
    }
  });
  collectLocalCustomLessons().forEach(lesson => {
    byId.set(lesson.id, lesson);
  });
  return Array.from(byId.values());
}

function collectCombinedLessons() {
  const toTime = value => {
    const timestamp = value ? new Date(value).getTime() : 0;
    return Number.isFinite(timestamp) ? timestamp : 0;
  };

  const customSource = getAllCustomLessons()
    .slice()
    .sort((a, b) => {
      const timeDiff = toTime(b.createdAt) - toTime(a.createdAt);
      if (timeDiff !== 0) return timeDiff;
      return (a.sortIndex || 0) - (b.sortIndex || 0);
    });

  const customItems = customSource.map(lesson => {
    const meta = summariseCustomLesson(lesson);
    return {
      type: 'custom',
      lesson,
      meta,
    };
  });

  const catalogItems = lessons.map(lesson => ({
    type: 'catalog',
    lesson,
  }));

  return [...customItems, ...catalogItems];
}

function lessonMatchesCategory(item) {
  if (state.category === 'all') return true;
  if (item.type === 'catalog') {
    return item.lesson.category === state.category;
  }
  return false;
}

function lessonMatchesLevel(item) {
  if (state.level === 'all') return true;
  if (item.type === 'catalog') {
    return item.lesson.level === state.level;
  }

  const lessonLevel = item.lesson.level;
  if (lessonLevel) return lessonLevel === state.level;

  const derivedLevels = item.meta?.levels ?? [];
  return derivedLevels.includes(state.level);
}

function collectCustomSearchTokens(lesson, meta) {
  const topics = meta?.topics ?? [];
  const topicTokens = topics.flatMap(topic =>
    [topic.title, topic.description, ...(topic.tags || [])].filter(Boolean)
  );
  return [
    lesson.title,
    lesson.description,
    ...(lesson.tags || []),
    lesson.level,
    ...topicTokens,
  ]
    .filter(Boolean)
    .map(value => normaliseValue(String(value)));
}

function lessonMatchesSearch(item, searchTerm) {
  if (!searchTerm) return true;

  if (item.type === 'catalog') {
    const haystack = [
      item.lesson.title,
      item.lesson.description,
      ...(item.lesson.tags ?? []),
    ]
      .filter(Boolean)
      .map(value => normaliseValue(String(value)));
    return haystack.some(value => value.includes(searchTerm));
  }

  const customTokens = collectCustomSearchTokens(item.lesson, item.meta);
  return customTokens.some(value => value.includes(searchTerm));
}

function filterLessons() {
  const combined = collectCombinedLessons();
  const searchTerm = normaliseValue(state.search);
  return combined.filter(item => {
    if (!lessonMatchesCategory(item)) return false;
    if (!lessonMatchesLevel(item)) return false;
    return lessonMatchesSearch(item, searchTerm);
  });
}

function renderLessons() {
  if (!lessonsGrid || !lessonsEmpty) return;

  const items = filterLessons();

  if (!items.length) {
    lessonsGrid.innerHTML = '';
    lessonsEmpty.hidden = false;
    if (lessonsSection) lessonsSection.dataset.hasResults = 'false';
    return;
  }

  const markup = items
    .map(item =>
      item.type === 'custom'
        ? createCustomLessonCard(item.lesson, item.meta)
        : createCardTemplate(item.lesson)
    )
    .join('');

  lessonsGrid.innerHTML = markup;
  lessonsEmpty.hidden = true;
  if (lessonsSection) lessonsSection.dataset.hasResults = 'true';
}

function setStats() {
  if (stats.total) stats.total.textContent = String(lessons.length);
  if (stats.grammar)
    stats.grammar.textContent = String(
      lessons.filter(lesson => lesson.category === 'grammar').length
    );
  if (stats.lexical)
    stats.lexical.textContent = String(
      lessons.filter(lesson => lesson.category === 'lexical').length
    );
}

function handleSearch(event) {
  state.search = event.target.value;
  renderLessons();
}

function handleLevelChange(event) {
  state.level = event.target.value;
  renderLessons();
}

function handleCategoryClick(event) {
  const category = event.currentTarget.dataset.category;
  if (!category) return;

  state.category = category;
  updateCategoryButtons();
  renderLessons();
}

function setCurrentYear() {
  const currentYearElement = document.querySelector(
    '[data-component="copyright-year"]'
  );
  if (!currentYearElement) return;
  currentYearElement.textContent = String(new Date().getFullYear());
}

function init() {
  setStats();
  updateCategoryButtons();
  renderLessons();
  setCurrentYear();

  if (searchInput) {
    searchInput.addEventListener('input', handleSearch);
  }

  if (levelSelect) {
    levelSelect.addEventListener('change', handleLevelChange);
  }

  categoryButtons.forEach(button => {
    button.addEventListener('click', handleCategoryClick);
  });

  subscribeToStorage(() => {
    renderLessons();
  });
}

init();
