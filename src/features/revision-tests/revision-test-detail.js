import { renderPracticeTaskList } from '@features/practice/practice.js';
import { findRevisionTestBySlug } from './revision-tests-registry.js';

function setTextContent(element, value, options = {}) {
  if (!element) return;
  const { prefix = '', suffix = '' } = options;
  if (value) {
    element.textContent = `${prefix}${value}${suffix}`;
    element.hidden = false;
  } else {
    element.textContent = '';
    element.hidden = true;
  }
}

function collectMetaItems(test) {
  const items = [];
  if (test.level) {
    items.push(`Рівень: ${test.level}`);
  }
  if (Number.isFinite(test.duration) && test.duration > 0) {
    items.push(`Тривалість: ~${test.duration} хв`);
  }
  const taskCount = Array.isArray(test.tasks) ? test.tasks.length : 0;
  if (taskCount) {
    items.push(`Кількість завдань: ${taskCount}`);
  }
  if (Array.isArray(test.tags) && test.tags.length) {
    items.push(`Мітки: ${test.tags.join(', ')}`);
  }
  return items;
}

function renderSummary(test) {
  const summarySection = document.querySelector('[data-test-summary]');
  const descriptionElement = document.querySelector('[data-test-description]');
  const metaElement = document.querySelector('[data-test-meta]');

  if (!summarySection || !descriptionElement || !metaElement) return;

  const hasDescription =
    typeof test.description === 'string' && test.description.trim().length > 0;
  const metaItems = collectMetaItems(test);

  if (!hasDescription && metaItems.length === 0) {
    summarySection.hidden = true;
    descriptionElement.textContent = '';
    metaElement.innerHTML = '';
    return;
  }

  const taglineElement = document.querySelector('[data-test-tagline]');
  const trimmedDescription = hasDescription ? test.description.trim() : '';
  const showDescription =
    hasDescription &&
    (!taglineElement || taglineElement.textContent !== trimmedDescription);
  descriptionElement.textContent = showDescription ? trimmedDescription : '';
  descriptionElement.hidden = !showDescription;

  if (metaItems.length) {
    metaElement.innerHTML = metaItems.map(item => `<li>${item}</li>`).join('');
    metaElement.hidden = false;
  } else {
    metaElement.innerHTML = '';
    metaElement.hidden = true;
  }

  summarySection.hidden = false;
}

function renderPractice(test) {
  const practiceRoot = document.querySelector('[data-test-practice]');
  const practiceNote = document.querySelector('.revision-practice__note');
  if (!practiceRoot) return;

  practiceRoot.innerHTML = '';
  const tasks = Array.isArray(test.tasks) ? test.tasks.filter(Boolean) : [];
  if (!tasks.length) {
    if (practiceNote) {
      practiceNote.hidden = true;
    }
    const note = document.createElement('p');
    note.className = 'muted';
    note.textContent =
      'Для цієї контрольної роботи поки що немає завдань. Додайте їх у відповідний файл у `src/data/revision-tests`.';
    practiceRoot.appendChild(note);
    return;
  }

  if (practiceNote) {
    practiceNote.hidden = false;
  }

  renderPracticeTaskList(practiceRoot, tasks, {
    title: test.title,
    level: test.level,
    description: test.description,
    keyPrefix: test.id || test.slug,
    showRemove: false,
  });
}

function showError(message) {
  const container = document.querySelector('[data-test-content]');
  if (container) {
    container.innerHTML = `<p class="muted">${message}</p>`;
  }
}

function init() {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('test');

  if (!slug) {
    showError(
      'Не вдалося визначити, яку контрольну роботу потрібно відкрити. Перейдіть зі списку на сторінці контрольних.'
    );
    return;
  }

  const test = findRevisionTestBySlug(slug);
  if (!test) {
    showError(
      'Контрольну роботу не знайдено. Перевірте, чи правильно вказано посилання, або відкрийте список контрольних.'
    );
    return;
  }

  const titleElement = document.querySelector('[data-test-title]');
  const eyebrowElement = document.querySelector('[data-test-eyebrow]');
  const taglineElement = document.querySelector('[data-test-tagline]');
  const levelElement = document.querySelector('[data-test-level]');
  const durationElement = document.querySelector('[data-test-duration]');
  const tagsElement = document.querySelector('[data-test-tags]');

  if (titleElement) {
    titleElement.textContent = test.title || 'Контрольна робота';
  }

  if (eyebrowElement) {
    eyebrowElement.textContent = 'Контрольна робота';
  }

  const metaItems = collectMetaItems(test);
  const trimmedDescription =
    typeof test.description === 'string' ? test.description.trim() : '';
  if (taglineElement) {
    if (trimmedDescription) {
      taglineElement.textContent = trimmedDescription;
    } else if (metaItems.length) {
      taglineElement.textContent = metaItems.join(' • ');
    } else {
      taglineElement.textContent =
        'Використайте завдання нижче, щоб перевірити знання учня.';
    }
  }

  setTextContent(levelElement, test.level, { prefix: 'Рівень: ' });
  setTextContent(durationElement, Number.isFinite(test.duration) ? `~${test.duration} хв` : '', {
    prefix: 'Тривалість: ',
  });
  setTextContent(
    tagsElement,
    Array.isArray(test.tags) && test.tags.length ? test.tags.join(', ') : '',
    { prefix: 'Мітки: ' }
  );

  renderSummary(test);
  renderPractice(test);
}

init();

const footerYear = document.querySelector('[data-component="copyright-year"]');
if (footerYear) {
  footerYear.textContent = String(new Date().getFullYear());
}
