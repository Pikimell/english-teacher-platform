import { addAnswer } from '@api/homework.js';

const containerElem = document.querySelector('.js-homework-content');

containerElem.addEventListener('change', e => {
  const inputId = e.target.id;
  const taskId = e.target.closest('section').id;
  const value = e.target.value;
  const name = e.target.name;
  let type = e.target.nodeName.toLowerCase();
  if (type === 'input' && e.target.type !== 'input') {
    type = e.target.type;
  }

  const answer = { inputId, taskId, value, type, name };

  addAnswer(answer);
});

export function uploadAnswers(container, answers) {
  for (const answer of answers) {
    try {
      const elemId = answer.inputId;
      const elem = container.querySelector(`#${elemId}`);
      if (answer.type !== 'checkbox' && answer.type != 'radio') {
        elem.setAttribute('value', answer.value);
      } else {
        elem.setAttribute('checked', true);
      }
    } catch (err) {
      console.log(err);
    }
  }
}
