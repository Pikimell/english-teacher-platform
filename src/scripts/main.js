import { lessons, lessonCategories } from '../data/lessons.js';
import { customLessonPresets } from '../data/custom-lesson-presets.js';
import {
  loadCustomLessons,
  subscribeToStorage,
} from './custom-lessons-store.js';

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
const grids = {
  grammar: document.querySelector('[data-category-grid="grammar"]'),
  communication: document.querySelector('[data-category-grid="communication"]'),
  quick: document.querySelector('[data-category-grid="quick"]'),
};
const sections = {
  grammar: document.querySelector('[data-category-section="grammar"]'),
  communication: document.querySelector(
    '[data-category-section="communication"]'
  ),
  quick: document.querySelector('[data-category-section="quick"]'),
};
const emptyMessages = {
  grammar: document.querySelector('[data-category-empty="grammar"]'),
  communication: document.querySelector(
    '[data-category-empty="communication"]'
  ),
  quick: document.querySelector('[data-category-empty="quick"]'),
};
const customSection = document.querySelector('[data-custom-section]');
const customGrid = document.querySelector('[data-custom-grid]');
const customEmpty = document.querySelector('[data-custom-empty]');
const stats = {
  total: document.querySelector('[data-stat-total]'),
  grammar: document.querySelector('[data-stat-grammar]'),
  communication: document.querySelector('[data-stat-communication]'),
  quick: document.querySelector('[data-stat-quick]'),
};

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
  const communicationCount = selectedTopics.filter(
    item => item.category === 'communication'
  ).length;

  return {
    topics: selectedTopics,
    levels,
    grammarCount,
    communicationCount,
  };
}

function createCustomLessonCard(lesson) {
  const meta = summariseCustomLesson(lesson);
  const description =
    lesson.description ||
    meta.topics
      .map(item => item.title)
      .slice(0, 3)
      .join(', ');
  const levelLabel =
    lesson.level ||
    (meta.levels.length ? meta.levels.join(', ') : 'мікси рівнів');
  const counts = [];
  if (meta.grammarCount) counts.push(`Граматика: ${meta.grammarCount}`);
  if (meta.communicationCount)
    counts.push(`Communication: ${meta.communicationCount}`);
  const categoryLabel =
    lesson.source === 'preset' ? 'Готовий комбінований' : 'Мій комбінований';

  return `
    <article class="lesson-card lesson-card--custom" data-custom-lesson-id="${
      lesson.id
    }" data-custom-source="${lesson.source || 'local'}">
      <a class="lesson-card__link" href="lesson.html?custom=${encodeURIComponent(
        lesson.id
      )}">
        
        <h3 class="lesson-card__title">${escapeHtml(lesson.title)}</h3>
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

function renderCustomLessons() {
  if (!customGrid || !customEmpty) return;

  const toTime = value => {
    const timestamp = value ? new Date(value).getTime() : 0;
    return Number.isFinite(timestamp) ? timestamp : 0;
  };

  const lessonsToRender = getAllCustomLessons().sort((a, b) => {
    const timeDiff = toTime(b.createdAt) - toTime(a.createdAt);
    if (timeDiff !== 0) return timeDiff;
    return (a.sortIndex || 0) - (b.sortIndex || 0);
  });

  if (!lessonsToRender.length) {
    customGrid.innerHTML = '';
    customEmpty.hidden = false;
    if (customSection) customSection.dataset.hasCustom = 'false';
    return;
  }

  customEmpty.hidden = true;
  customGrid.innerHTML = lessonsToRender.map(createCustomLessonCard).join('');
  if (customSection) customSection.dataset.hasCustom = 'true';
}

function filterLessons() {
  const searchTerm = normaliseValue(state.search);
  const matches = lessons.filter(lesson => {
    const matchesCategory =
      state.category === 'all' || lesson.category === state.category;
    const matchesLevel = state.level === 'all' || lesson.level === state.level;

    if (!searchTerm) {
      return matchesCategory && matchesLevel;
    }

    const haystack = [lesson.title, lesson.description, ...(lesson.tags ?? [])]
      .filter(Boolean)
      .map(value => normaliseValue(String(value)));

    const matchesSearch = haystack.some(value => value.includes(searchTerm));

    return matchesCategory && matchesLevel && matchesSearch;
  });

  return matches.reduce(
    (acc, lesson) => {
      if (!acc[lesson.category]) {
        acc[lesson.category] = [];
      }
      acc[lesson.category].push(lesson);
      return acc;
    },
    {
      grammar: [],
      communication: [],
      quick: [],
    }
  );
}

function renderLessons() {
  const groupedLessons = filterLessons();

  Object.entries(groupedLessons).forEach(([category, items]) => {
    const grid = grids[category];
    const emptyMessage = emptyMessages[category];
    const section = sections[category];

    if (!grid || !emptyMessage || !section) return;

    grid.innerHTML = items.map(createCardTemplate).join('');
    const isEmpty = items.length === 0;
    emptyMessage.hidden = !isEmpty;
    if (isEmpty) {
      grid.setAttribute('data-empty', 'true');
    } else {
      grid.removeAttribute('data-empty');
    }

    const shouldHideSection =
      state.category !== 'all' && state.category !== category;
    section.hidden = shouldHideSection;
  });
}

function setStats() {
  if (stats.total) stats.total.textContent = String(lessons.length);
  if (stats.grammar)
    stats.grammar.textContent = String(
      lessons.filter(lesson => lesson.category === 'grammar').length
    );
  if (stats.communication)
    stats.communication.textContent = String(
      lessons.filter(lesson => lesson.category === 'communication').length
    );
  if (stats.quick)
    stats.quick.textContent = String(
      lessons.filter(lesson => lesson.category === 'quick').length
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
  renderCustomLessons();
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
    renderCustomLessons();
  });
}

init();
