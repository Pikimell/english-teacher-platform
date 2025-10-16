import { placementLevels, placementQuestions } from '@data/placement-test.js';

const form = document.querySelector('[data-component="placement-form"]');
const questionContainer = document.querySelector('[data-component="questions"]');
const resultsSection = document.querySelector('[data-component="results"]');
const chartContainer = document.querySelector('[data-component="results-chart"]');
const summaryList = document.querySelector('[data-component="results-summary"]');
const summaryText = document.querySelector('[data-component="results-text"]');

function createAnswerTemplate(question, answer) {
  const inputId = `${question.id}-${answer.id}`;
  return `
    <label class="placement-question__option" for="${inputId}">
      <input type="radio" id="${inputId}" name="${question.id}" value="${answer.id}" aria-labelledby="${inputId}-label" />
      <span id="${inputId}-label">${answer.text}</span>
    </label>
  `;
}

function createQuestionTemplate(question, index) {
  const answerMarkup = question.answers.map((answer) => createAnswerTemplate(question, answer)).join('');

  return `
    <fieldset class="placement-question">
      <legend class="placement-question__title">
        <span class="placement-question__number">${String(index + 1).padStart(2, '0')}</span>
        <div class="placement-question__meta">
          <span class="placement-question__prompt">${question.prompt}</span>
        </div>
      </legend>
      <div class="placement-question__options" role="radiogroup" aria-label="Відповіді на запитання ${index + 1}">
        ${answerMarkup}
      </div>
    </fieldset>
  `;
}

function renderQuestions() {
  const markup = placementQuestions.map((question, index) => createQuestionTemplate(question, index)).join('');
  questionContainer.innerHTML = markup;
}

function calculateResults(formData) {
  const initial = placementLevels.reduce((acc, level) => {
    acc[level.id] = { id: level.id, label: level.label, correct: 0, total: 0 };
    return acc;
  }, {});

  placementQuestions.forEach((question) => {
    const selected = formData.get(question.id);
    const correctAnswer = question.answers.find((answer) => answer.isCorrect);
    const levelStats = initial[question.level];
    if (!levelStats) return;
    levelStats.total += 1;
    if (selected && correctAnswer && selected === correctAnswer.id) {
      levelStats.correct += 1;
    }
  });

  return initial;
}

function renderChart(results) {
  const markup = placementLevels
    .map((level) => {
      const levelStats = results[level.id];
      const ratio = levelStats.total ? levelStats.correct / levelStats.total : 0;
      const percentage = Math.round(ratio * 100);
      const widthPercent = levelStats.total ? percentage : 0;
      return `
        <div class="placement-chart__row">
          <div class="placement-chart__label">${level.id}</div>
          <div class="placement-chart__bar" aria-hidden="true">
            <div class="placement-chart__fill" style="width: ${widthPercent}%"></div>
          </div>
          <div class="placement-chart__value">${levelStats.correct}/${levelStats.total}</div>
          <span class="visually-hidden">${level.label}: ${levelStats.correct} з ${levelStats.total} (${percentage}% правильних)</span>
        </div>
      `;
    })
    .join('');

  chartContainer.innerHTML = markup;
}

function renderSummary(results) {
  const items = placementLevels
    .map((level) => {
      const levelStats = results[level.id];
      const ratio = levelStats.total ? Math.round((levelStats.correct / levelStats.total) * 100) : 0;
      return `
        <li class="placement-summary__item">
          <strong>${level.label}:</strong> ${levelStats.correct}/${levelStats.total} правильних (${ratio}%)
        </li>
      `;
    })
    .join('');

  summaryList.innerHTML = items;
}

function renderResults(results) {
  const stats = Object.values(results);
  const totalCorrect = stats.reduce((sum, item) => sum + item.correct, 0);
  const totalQuestions = stats.reduce((sum, item) => sum + item.total, 0);
  const bestLevel = stats.reduce((acc, item) => {
    if (item.total === 0) return acc;
    const ratio = item.correct / item.total;
    if (!acc || ratio > acc.ratio) {
      return { id: item.id, label: item.label, ratio };
    }
    return acc;
  }, null);

  summaryText.textContent = bestLevel
    ? `Загальний результат: ${totalCorrect}/${totalQuestions}. Найвища точність — на рівні ${bestLevel.label}.`
    : `Загальний результат: ${totalCorrect}/${totalQuestions}.`;

  renderChart(results);
  renderSummary(results);
  resultsSection.hidden = false;
  resultsSection.scrollIntoView({ behavior: 'smooth' });
}

function handleSubmit(event) {
  event.preventDefault();
  const formData = new FormData(form);
  const results = calculateResults(formData);
  renderResults(results);
}

function handleReset() {
  resultsSection.hidden = true;
  chartContainer.innerHTML = '';
  summaryList.innerHTML = '';
  summaryText.textContent = '';
}

function setCurrentYear() {
  const currentYearElement = document.querySelector('[data-component="copyright-year"]');
  if (!currentYearElement) return;
  currentYearElement.textContent = String(new Date().getFullYear());
}

function init() {
  setCurrentYear();
  if (!form || !questionContainer) return;
  renderQuestions();
  form.addEventListener('submit', handleSubmit);
  form.addEventListener('reset', handleReset);
}

init();
