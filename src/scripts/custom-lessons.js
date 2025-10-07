import { lessons } from '../data/lessons.js';
import {
  loadCustomLessons,
  createCustomLesson,
  deleteCustomLesson,
  subscribeToStorage,
} from './custom-lessons-store.js';

const form = document.querySelector('[data-builder-form]');
const statusElement = document.querySelector('[data-builder-status]');
const savedListElement = document.querySelector('[data-saved-list]');
const savedEmptyElement = document.querySelector('[data-saved-empty]');

const groups = Array.from(document.querySelectorAll('[data-builder-group]'));
let currentCustomLessons = [];

function setCurrentYear() {
  const yearEl = document.querySelector('[data-component="copyright-year"]');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
}

function normalise(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

function createTopicOption(lesson) {
  const textContent = `${lesson.title} ${lesson.description || ''} ${(lesson.tags || []).join(' ')}`;
  const label = document.createElement('label');
  label.className = 'checkbox builder-option';
  label.dataset.topicId = lesson.id;
  label.dataset.searchTokens = normalise(textContent);
  label.innerHTML = `
    <input type="checkbox" name="topics" value="${lesson.id}" data-category="${lesson.category}" />
    <span class="builder-option__content">
      <span class="builder-option__title">${lesson.title}</span>
      <span class="builder-option__meta">Рівень: ${lesson.level}${lesson.description ? ` · ${lesson.description}` : ''}</span>
    </span>
  `;
  return label;
}

function populateGroups() {
  groups.forEach((group) => {
    const category = group.dataset.builderGroup;
    const listElement = group.querySelector('[data-group-list]');
    if (!category || !listElement) return;

    const topics = lessons.filter((lesson) => lesson.category === category);
    const fragment = document.createDocumentFragment();
    topics
      .sort((a, b) => a.title.localeCompare(b.title, 'uk'))
      .forEach((topic) => fragment.appendChild(createTopicOption(topic)));

    listElement.appendChild(fragment);
  });
}

function filterGroup(group, query) {
  const normalizedQuery = normalise(query);
  const options = Array.from(group.querySelectorAll('.builder-option'));
  if (!normalizedQuery) {
    options.forEach((option) => {
      option.hidden = false;
    });
    group.dataset.matches = String(options.length);
    return;
  }

  let matches = 0;
  options.forEach((option) => {
    const haystack = option.dataset.searchTokens || '';
    const isMatch = haystack.includes(normalizedQuery);
    option.hidden = !isMatch;
    if (isMatch) matches += 1;
  });
  group.dataset.matches = String(matches);
}

function handleSearchInput(event) {
  const input = event.target;
  const group = input?.closest('[data-builder-group]');
  if (!group) return;
  filterGroup(group, input.value);
}

function toggleGroupVisibility(button) {
  const group = button.closest('[data-builder-group]');
  if (!group) return;
  const body = group.querySelector('[data-group-body]');
  if (!body) return;

  const isHidden = body.hidden;
  body.hidden = !isHidden;
  button.textContent = body.hidden ? 'Розгорнути' : 'Згорнути';
}

function collectSelectedTopics() {
  if (!form) return [];
  return Array.from(form.querySelectorAll('input[name="topics"]:checked')).map(
    (input) => ({
      id: input.value,
      category: input.dataset.category,
    }),
  );
}

function setStatus(message, state = 'idle') {
  if (!statusElement) return;
  statusElement.textContent = message;
  statusElement.dataset.state = state;
}

function createLessonId(title) {
  const base = normalise(title)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 32);
  const suffix = Date.now().toString(36);
  return `custom-${base || 'lesson'}-${suffix}`;
}

function handleFormSubmit(event) {
  event.preventDefault();
  setStatus('Зберігаємо…', 'saving');

  const formData = new FormData(form);
  const title = String(formData.get('title') || '').trim();
  if (!title) {
    setStatus('Вкажіть назву уроку.', 'error');
    return;
  }

  const selected = collectSelectedTopics();
  if (!selected.length) {
    setStatus('Оберіть принаймні одну тему.', 'error');
    return;
  }

  const id = createLessonId(title);
  const topicIds = selected.map((item) => item.id);
  const lesson = createCustomLesson({ id, title, topicIds });
  currentCustomLessons = loadCustomLessons();
  renderSavedLessons();
  form.reset();
  groups.forEach((group) => {
    filterGroup(group, '');
  });
  setStatus(`Урок «${lesson.title}» збережено.`, 'success');
  if (statusElement) {
    const link = document.createElement('a');
    link.href = `lesson.html?custom=${encodeURIComponent(lesson.id)}`;
    link.textContent = ' Відкрити';
    link.className = 'builder-status__link';
    statusElement.appendChild(link);
  }
}

function describeLessonTopics(topicIds) {
  const topics = topicIds
    .map((id) => lessons.find((lesson) => lesson.id === id))
    .filter(Boolean);
  const grammarCount = topics.filter((topic) => topic.category === 'grammar').length;
  const communicationCount = topics.filter((topic) => topic.category === 'communication').length;
  const titles = topics.map((topic) => topic.title);

  return {
    grammarCount,
    communicationCount,
    titles,
  };
}

function renderSavedLessons() {
  if (!savedListElement || !savedEmptyElement) return;

  const lessonsToRender = currentCustomLessons
    .slice()
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  savedListElement.innerHTML = '';

  if (!lessonsToRender.length) {
    savedEmptyElement.hidden = false;
    return;
  }

  savedEmptyElement.hidden = true;

  const fragment = document.createDocumentFragment();
  lessonsToRender.forEach((lesson) => {
    const meta = describeLessonTopics(lesson.topicIds || []);
    const card = document.createElement('article');
    card.className = 'builder-card';

    const title = document.createElement('h3');
    title.className = 'builder-card__title';
    title.textContent = lesson.title;

    const metaEl = document.createElement('p');
    metaEl.className = 'builder-card__meta';
    const metaParts = [];
    if (meta.grammarCount) metaParts.push(`Граматика: ${meta.grammarCount}`);
    if (meta.communicationCount) metaParts.push(`Communication: ${meta.communicationCount}`);
    metaEl.textContent = metaParts.join(' · ');

    const topics = document.createElement('p');
    topics.className = 'builder-card__topics';
    topics.textContent = meta.titles.join(', ');

    const actions = document.createElement('div');
    actions.className = 'builder-card__actions';

    const openLink = document.createElement('a');
    openLink.className = 'button button--ghost';
    openLink.href = `lesson.html?custom=${encodeURIComponent(lesson.id)}`;
    openLink.textContent = 'Відкрити';

    const deleteButton = document.createElement('button');
    deleteButton.className = 'button button--danger';
    deleteButton.type = 'button';
    deleteButton.dataset.deleteId = lesson.id;
    deleteButton.textContent = 'Видалити';

    actions.appendChild(openLink);
    actions.appendChild(deleteButton);

    card.appendChild(title);
    if (metaParts.length) {
      card.appendChild(metaEl);
    }
    if (meta.titles.length) {
      card.appendChild(topics);
    }
    card.appendChild(actions);
    fragment.appendChild(card);
  });

  savedListElement.appendChild(fragment);
}

function handleSavedListClick(event) {
  const button = event.target.closest('button[data-delete-id]');
  if (!button) return;
  const { deleteId } = button.dataset;
  if (!deleteId) return;
  const removed = deleteCustomLesson(deleteId);
  if (removed) {
    currentCustomLessons = loadCustomLessons();
    renderSavedLessons();
  }
}

function syncWithStorage() {
  currentCustomLessons = loadCustomLessons();
  renderSavedLessons();
}

function initControls() {
  groups.forEach((group) => {
    const searchInput = group.querySelector('[data-group-search]');
    const toggleButton = group.querySelector('[data-group-toggle]');

    searchInput?.addEventListener('input', handleSearchInput);
    toggleButton?.addEventListener('click', (event) => {
      toggleGroupVisibility(event.currentTarget);
    });
  });

  form?.addEventListener('submit', handleFormSubmit);
  savedListElement?.addEventListener('click', handleSavedListClick);

  subscribeToStorage((lessonsFromStorage) => {
    currentCustomLessons = lessonsFromStorage;
    renderSavedLessons();
  });
}

function init() {
  setCurrentYear();
  populateGroups();
  syncWithStorage();
  initControls();
}

init();
