import { getAllRevisionTests } from './revision-tests-registry.js';

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatMeta(test) {
  const parts = [];

  if (Number.isFinite(test.duration) && test.duration > 0) {
    parts.push(`~${test.duration} хв`);
  }

  const taskCount = Array.isArray(test.tasks) ? test.tasks.length : 0;
  if (taskCount) {
    parts.push(`${taskCount} завдань`);
  }

  return parts.join(' · ');
}

function renderTags(tags) {
  if (!Array.isArray(tags) || !tags.length) {
    return '';
  }

  const safeTags = tags
    .map(tag => (typeof tag === 'string' ? tag.trim() : ''))
    .filter(Boolean);

  if (!safeTags.length) return '';

  return `<ul class="lesson-card__tags">${safeTags
    .map(tag => `<li>${escapeHtml(tag)}</li>`)
    .join('')}</ul>`;
}

function createTestCard(test) {
  const description = escapeHtml(test.description || '');
  const metaLine = formatMeta(test);
  const tags = renderTags(test.tags);

  return `
    <article class="lesson-card lesson-card--revision" data-test-slug="${escapeHtml(
      test.slug
    )}">
      <a class="lesson-card__link" href="revision-test.html?test=${encodeURIComponent(
        test.slug
      )}">
        <div class="lesson-card__meta">
          <span class="lesson-card__category">Контрольна</span>
          ${
            test.level
              ? `<span class="lesson-card__level">${escapeHtml(test.level)}</span>`
              : ''
          }
        </div>
        <h3 class="lesson-card__title">${escapeHtml(test.title)}</h3>
        <p class="lesson-card__description">${
          description || 'Опис ще не додано.'
        }</p>
        ${metaLine ? `<p class="lesson-card__description">${metaLine}</p>` : ''}
        ${tags}
        <span class="lesson-card__cta">Перейти до завдань</span>
      </a>
    </article>
  `;
}

function renderRevisionTests() {
  const grid = document.querySelector('[data-tests-grid]');
  const emptyState = document.querySelector('[data-tests-empty]');

  if (!grid || !emptyState) return;

  const tests = getAllRevisionTests();
  const hasTests = tests.length > 0;

  if (!hasTests) {
    grid.innerHTML = '';
    grid.setAttribute('data-empty', 'true');
    emptyState.hidden = false;
    return;
  }

  const cardsMarkup = tests.map(createTestCard).join('');
  grid.innerHTML = cardsMarkup;
  grid.removeAttribute('data-empty');
  emptyState.hidden = true;
}

renderRevisionTests();
const footerYear = document.querySelector('[data-component="copyright-year"]');
if (footerYear) {
  footerYear.textContent = String(new Date().getFullYear());
}
