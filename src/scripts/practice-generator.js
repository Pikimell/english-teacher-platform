import { generateTask } from './api/chatGpt.js';

const adminWrapper = document.querySelector('[data-practice-admin]');
const form = document.querySelector('[data-practice-generator]');
const statusElement = form?.querySelector('[data-practice-status]');
const outputWrapper = document.querySelector('[data-generator-output]');
const jsonElement = document.querySelector('[data-generator-json]');
const copyButton = document.querySelector('[data-generator-copy]');
const downloadButton = document.querySelector('[data-generator-download]');
const typesContainer = form?.querySelector('[data-types]');
const typesTrigger = form?.querySelector('[data-types-trigger]');
const typesPanel = form?.querySelector('[data-types-panel]');
const placeholder = document.querySelector('[data-practice-placeholder]');

const defaultContext = window.lessonContext || {};

let baseTitle = defaultContext.title || 'Generated Practice';
let baseLevel = defaultContext.level || 'custom';
const baseTasks = [];
const generatedTasks = [];

function hideElement(element) {
  if (!element) return;
  element.classList.add('hidden');
}

function showElement(element) {
  if (!element) return;
  element.classList.remove('hidden');
}

function isElementHidden(element) {
  return !element || element.classList.contains('hidden');
}

function isGeneratorHidden() {
  return localStorage.getItem('hideGenerateSection') === 'true';
}

function applyGeneratorVisibility() {
  if (isGeneratorHidden()) {
    hideElement(adminWrapper);
    hideElement(typesPanel);
    hideElement(outputWrapper);
    closeTypesPanel();
  } else {
    showElement(adminWrapper);
    updateTypesTriggerLabel();
    updateJsonPreview();
  }
}

function createTaskKey(task) {
  const base =
    task && typeof task === 'object' && task.id
      ? String(task.id)
      : String(task?.type || 'task');
  return `${base}-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
}

function buildAggregatePayload() {
  return {
    title: baseTitle || defaultContext.title || 'Generated Practice',
    level: baseLevel || defaultContext.level || 'custom',
    tasks: [...baseTasks, ...generatedTasks].map(item => item.data),
  };
}

function updateJsonPreview() {
  if (!jsonElement) return;

  if (isGeneratorHidden()) {
    hideElement(outputWrapper);
    return;
  }

  if (!baseTasks.length && !generatedTasks.length) {
    jsonElement.textContent = '';
    hideElement(outputWrapper);
    if (copyButton) copyButton.disabled = true;
    if (downloadButton) downloadButton.disabled = true;
    return;
  }

  jsonElement.textContent = JSON.stringify(buildAggregatePayload(), null, 2);
  showElement(outputWrapper);
  if (copyButton) copyButton.disabled = false;
  if (downloadButton) downloadButton.disabled = false;
}

function addGeneratedTask(task) {
  const key = createTaskKey(task);
  generatedTasks.push({ key, data: task });
  updateJsonPreview();
  return key;
}

function removeTask(key, task) {
  const removeFrom = list => {
    const index = list.findIndex(
      item => (key && item.key === key) || item.data === task
    );
    if (index !== -1) {
      list.splice(index, 1);
      return true;
    }
    return false;
  };

  const removed = removeFrom(generatedTasks) || removeFrom(baseTasks);
  if (removed) {
    updateJsonPreview();
  }
}

function setInitialTopic() {
  if (!form) return;
  const topicInput = form.querySelector('[name="topic"]');
  if (topicInput && !topicInput.value) {
    const initialTopic = defaultContext.title || 'Lesson topic';
    topicInput.value = initialTopic;
  }
}

function setStatus(message, state = 'idle') {
  if (!statusElement) return;
  statusElement.textContent = message;
  statusElement.dataset.state = state;
}

function slugify(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 8);
}

function toFileSlug(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function getTypeInputs() {
  return Array.from(form.querySelectorAll('input[name="types"]'));
}

function formatTypesLabel(inputs) {
  const selected = inputs
    .filter(input => input.checked)
    .map(input => input.nextElementSibling?.textContent?.trim())
    .filter(Boolean);

  if (!selected.length) return 'Оберіть типи';
  if (selected.length <= 2) return selected.join(', ');
  return `${selected.slice(0, 2).join(', ')} +${selected.length - 2}`;
}

function updateTypesTriggerLabel() {
  if (!typesTrigger) return;
  const inputs = getTypeInputs();
  typesTrigger.textContent = formatTypesLabel(inputs);
}

function closeTypesPanel() {
  if (!typesPanel || !typesTrigger) return;
  if (!isElementHidden(typesPanel)) {
    hideElement(typesPanel);
    typesTrigger.setAttribute('aria-expanded', 'false');
  }
}

function toggleTypesPanel() {
  if (!typesPanel || !typesTrigger) return;
  const willOpen = isElementHidden(typesPanel);
  if (willOpen) {
    showElement(typesPanel);
    typesTrigger.setAttribute('aria-expanded', 'true');
    const firstInput = typesPanel.querySelector('input[name="types"]');
    firstInput?.focus({ preventScroll: true });
  } else {
    closeTypesPanel();
  }
}

function toggleGeneratorVisibility() {
  const shouldHide = !isGeneratorHidden();
  localStorage.setItem('hideGenerateSection', String(shouldHide));
  applyGeneratorVisibility();
  updateJsonPreview();
}

function clearPracticeEmptyState() {
  const practiceRoot = document.getElementById('practice');
  const body = practiceRoot?.querySelector('#practice-body');
  if (placeholder) {
    placeholder.remove();
  }
  if (body && body.children.length === 1) {
    const first = body.firstElementChild;
    if (first && /практика поки відсутня/i.test(first.textContent || '')) {
      first.remove();
    }
  }
}

function ensurePracticeHeader() {
  const practiceRoot = document.getElementById('practice');
  if (!practiceRoot) return;
  const body = practiceRoot.querySelector('#practice-body');
  if (body && !body.querySelector('.practice-dynamic-title')) {
    const header = document.createElement('div');
    header.className = 'practice-dynamic-title';
    header.innerHTML = `
      <h2>Згенеровані завдання</h2>
      ${
        defaultContext.level
          ? `<p class="muted">Рівень: ${defaultContext.level}</p>`
          : ''
      }
    `;
    body.prepend(header);
  }
}

async function handleSubmit(event) {
  event.preventDefault();
  if (!form) return;

  const submitButton = form.querySelector('button[type="submit"]');
  const topicInput = form.querySelector('[name="topic"]');
  const countInput = form.querySelector('[name="count"]');
  const typeInputs = getTypeInputs();

  const topic = topicInput?.value?.trim();
  const count = Number.parseInt(countInput?.value || '10', 10) || 10;
  const selectedTypes = typeInputs
    .filter(input => input.checked)
    .map(input => input.value);

  if (!topic) {
    setStatus('Укажіть тему для генерації завдання.', 'error');
    topicInput?.focus();
    return;
  }

  if (!selectedTypes.length && typeof closeTypesPanel === 'function') {
    setStatus('Оберіть принаймні один тип завдання.', 'error');
    return;
  }

  const seedBase = slugify(topic) || 'task';
  setStatus(`Генеруємо ${selectedTypes.length} тип(и) завдань…`, 'loading');
  if (submitButton) {
    submitButton.disabled = true;
    submitButton.dataset.originalText =
      submitButton.dataset.originalText || submitButton.textContent;
    submitButton.textContent = 'Генерація…';
  }

  try {
    const generationPromises = selectedTypes.map(type =>
      generateTask(topic, type, {
        items: count,
        language: 'uk',
        seedId: `${seedBase}-${type}`,
      }).then(task => ({ type, task }))
    );

    const settled = await Promise.allSettled(generationPromises);
    const successful = settled
      .map((result, index) =>
        result.status === 'fulfilled'
          ? { type: selectedTypes[index], task: result.value.task }
          : null
      )
      .filter(Boolean);
    const failed = settled
      .map((result, index) =>
        result.status === 'rejected' ? selectedTypes[index] : null
      )
      .filter(Boolean);

    if (!successful.length) {
      throw new Error('Не вдалося згенерувати жодного типу завдань');
    }

    const appended = [];
    successful.forEach(({ type, task }) => {
      const normalizedTask = { ...task };
      if (!normalizedTask.id) {
        normalizedTask.id = `${type}-${seedBase}-${Date.now().toString(
          36
        )}${Math.random().toString(36).slice(2, 6)}`;
      }
      const key = addGeneratedTask(normalizedTask);
      appended.push({ task: normalizedTask, key });
    });

    clearPracticeEmptyState();
    if (window.practice && typeof window.practice.appendTask === 'function') {
      ensurePracticeHeader();
      appended.forEach(({ task: generatedTask, key }) => {
        window.practice.appendTask(generatedTask, { key });
      });
    }

    closeTypesPanel();

    const successTypes = successful.map(({ type }) => type).join(', ');
    if (failed.length) {
      setStatus(
        `Згенеровано: ${successTypes}. Помилки: ${failed.join(', ')}`,
        'success'
      );
    } else {
      setStatus(
        `Готово! Додано ${successful.length} блок(и): ${successTypes}.`,
        'success'
      );
    }
  } catch (error) {
    console.error(error);
    const message =
      error instanceof Error && error.message
        ? `Помилка: ${error.message}`
        : 'Не вдалося згенерувати завдання. Перевірте токен або спробуйте ще раз.';
    setStatus(message, 'error');
  } finally {
    if (submitButton) {
      const original =
        submitButton.dataset.originalText || 'Згенерувати завдання';
      submitButton.disabled = false;
      submitButton.textContent = original;
    }
  }
}

async function handleCopy() {
  if (!jsonElement) return;
  const content = jsonElement.textContent;
  if (!content) return;
  try {
    await navigator.clipboard.writeText(content);
    setStatus('JSON скопійовано у буфер.', 'success');
  } catch (error) {
    console.error(error);
    setStatus('Не вдалося скопіювати JSON. Спробуйте вручну.', 'error');
  }
}

function getDownloadFilename(payload) {
  const base =
    toFileSlug(defaultContext.id) ||
    toFileSlug(payload.title) ||
    toFileSlug(defaultContext.title) ||
    'practice';
  return `${base || 'practice'}.json`;
}

async function handleDownload() {
  const payload = buildAggregatePayload();
  const content = JSON.stringify(payload, null, 2);
  if (!content || content === '{}' || content === '[]') {
    setStatus('Немає даних для завантаження.', 'error');
    return;
  }

  try {
    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = getDownloadFilename(payload);
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
    setStatus('Файл завантажено.', 'success');
  } catch (error) {
    console.error(error);
    setStatus('Не вдалося завантажити файл.', 'error');
  }
}

function init() {
  if (!form) return;
  setInitialTopic();
  form.addEventListener('submit', handleSubmit);
  if (copyButton) {
    copyButton.addEventListener('click', handleCopy);
    copyButton.disabled = true;
  }
  if (downloadButton) {
    downloadButton.addEventListener('click', handleDownload);
    downloadButton.disabled = true;
  }

  if (typesTrigger && typesPanel && typesContainer) {
    typesTrigger.setAttribute('aria-haspopup', 'true');
    typesTrigger.setAttribute('aria-expanded', 'false');
    typesTrigger.addEventListener('click', () => {
      toggleTypesPanel();
    });

    const handlePointerDown = event => {
      if (!typesContainer.contains(event.target)) {
        closeTypesPanel();
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);

    const handleFocusOut = event => {
      const next = event.relatedTarget;
      if (!next || !typesContainer.contains(next)) {
        closeTypesPanel();
      }
    };

    typesContainer.addEventListener('focusout', handleFocusOut);

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        closeTypesPanel();
        typesTrigger.focus();
      }
    });

    getTypeInputs().forEach(input => {
      input.addEventListener('change', () => {
        updateTypesTriggerLabel();
      });
    });
    updateTypesTriggerLabel();

    form.addEventListener('submit', () => {
      closeTypesPanel();
    });
  }

  document.addEventListener('practice:taskRemoved', event => {
    const detail = event.detail || {};
    removeTask(detail.key, detail.task);
  });

  document.addEventListener('practice:dataLoaded', event => {
    const detail = event.detail;
    baseTasks.length = 0;
    if (detail && Array.isArray(detail.entries)) {
      baseTitle = detail.title ?? baseTitle;
      baseLevel = detail.level ?? baseLevel;
      detail.entries.forEach(({ task, key }) => {
        const entryKey = key || createTaskKey(task);
        baseTasks.push({ key: entryKey, data: task });
      });
    } else if (detail && Array.isArray(detail.tasks)) {
      baseTitle = detail.title ?? baseTitle;
      baseLevel = detail.level ?? baseLevel;
      detail.tasks.forEach(task => {
        const entryKey =
          task && task.id ? String(task.id) : createTaskKey(task);
        baseTasks.push({ key: entryKey, data: task });
      });
    } else {
      if (!detail) {
        baseTitle = defaultContext.title || baseTitle;
        baseLevel = defaultContext.level || baseLevel;
      } else {
        baseTitle = detail.title ?? baseTitle;
        baseLevel = detail.level ?? baseLevel;
      }
    }
    updateJsonPreview();
    applyGeneratorVisibility();
  });

  applyGeneratorVisibility();
  updateJsonPreview();

  document.addEventListener('keydown', event => {
    if (
      event.code &&
      event.code === 'KeyH' &&
      event.ctrlKey &&
      event.shiftKey
    ) {
      event.preventDefault();
      toggleGeneratorVisibility();
    }
  });
}

init();
