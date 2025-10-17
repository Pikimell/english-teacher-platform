import { auth } from '@features/auth/auth.js';
import { getUserHomeworkLessons } from '@api/homework.js';
import { getUserHomework } from '@api/homework.js';
import { createPracticeTaskElement } from '@features/practice/practice.js';
import { uploadAnswers } from '@features/homework/homework-updates.js';

const statusElement = document.querySelector('[data-homework-status]');
const listElement = document.querySelector('[data-homework-list]');

if (statusElement && listElement) {
  let activeRequestId = 0;

  function setStatus(message) {
    statusElement.textContent = message || '';
    statusElement.hidden = !message;
  }

  function clearList() {
    listElement.innerHTML = '';
  }

  function resolveLessonUrl(lesson) {
    if (!lesson || typeof lesson !== 'object') return null;
    if (typeof lesson.url === 'string' && lesson.url) return lesson.url;
    if (typeof lesson.link === 'string' && lesson.link) return lesson.link;

    const params = new URLSearchParams();
    const lessonId = lesson.lessonId || lesson.topicId || lesson.id || null;
    const htmlPath = lesson.htmlPath || lesson.lessonPath || null;
    const category = lesson.category || lesson.lessonCategory || null;
    const level = lesson.level || lesson.lessonLevel || null;
    const title = lesson.title || lesson.lessonTitle || lesson.name || null;

    if (lessonId) params.set('topic', lessonId);
    if (category) params.set('category', category);
    if (level) params.set('level', level);
    if (title) params.set('title', title);
    if (htmlPath) params.set('file', htmlPath);

    if (!params.has('topic')) return null;
    return `lesson.html?${params.toString()}`;
  }

  function formatDueDate(lesson) {
    const due =
      lesson?.dueDate ||
      lesson?.deadline ||
      lesson?.due_at ||
      lesson?.dueAt ||
      null;
    if (!due) return null;
    const date = new Date(due);
    if (Number.isNaN(date.getTime())) return null;
    try {
      return new Intl.DateTimeFormat('uk-UA', {
        dateStyle: 'medium',
      }).format(date);
    } catch (error) {
      return date.toLocaleDateString('uk-UA');
    }
  }

  function createLessonCard(lesson) {
    const card = document.createElement('article');
    card.className = 'homework-card';
    card.setAttribute('role', 'listitem');
    card.dataset.id = lesson?.lessonId;

    const title = document.createElement('h3');
    title.className = 'homework-card__title';
    title.textContent = lesson?.lessonName;
    card.appendChild(title);

    const dueDateLabel = formatDueDate(lesson);
    if (dueDateLabel) {
      const due = document.createElement('p');
      due.className = 'homework-card__meta';
      due.textContent = `Строк: ${dueDateLabel}`;
      card.appendChild(due);
    }

    const description =
      lesson?.description || lesson?.lessonDescription || lesson?.summary || '';
    if (description) {
      const body = document.createElement('p');
      body.className = 'homework-card__description';
      body.textContent = description;
      card.appendChild(body);
    }

    const lessonUrl = resolveLessonUrl(lesson);
    if (lessonUrl) {
      const link = document.createElement('button');
      link.className = 'homework-card__link';
      link.textContent = 'відкрити';
      card.appendChild(link);
      card.addEventListener('click', () => {
        loadHomework(lesson?.lessonId);
      });
    }

    return card;
  }

  function renderLessons(lessons) {
    console.log(lessons);

    if (!Array.isArray(lessons) || !lessons.length) {
      setStatus('Домашніх робіт поки немає.');
      return;
    }

    setStatus('');
    const fragment = document.createDocumentFragment();
    lessons.forEach(lesson => {
      fragment.appendChild(createLessonCard(lesson));
    });

    listElement.appendChild(fragment);
  }

  async function loadLessonsForUser(user) {
    if (!user || !user.email) {
      setStatus('Увійдіть, щоб переглянути призначені домашні роботи.');
      clearList();
      return;
    }

    const requestId = ++activeRequestId;
    setStatus('Завантаження домашніх робіт…');
    clearList();

    try {
      const lessons = await getUserHomeworkLessons(user.email);
      if (requestId !== activeRequestId) return;
      const list = lessons;
      console.log(list);

      renderLessons(list);
    } catch (error) {
      console.log(error);
      if (requestId !== activeRequestId) return;
      console.error('Не вдалося завантажити домашні роботи', error);
      setStatus('Не вдалося завантажити домашні роботи. Спробуйте пізніше.');
      clearList();
    }
  }

  auth.subscribe(snapshot => {
    if (!snapshot.isSignedIn) {
      setStatus('Увійдіть, щоб переглянути призначені домашні роботи.');
      clearList();
      return;
    }
    loadLessonsForUser(snapshot.user);
  });
}

async function loadHomework(lessonId) {
  const user = auth.getUser();
  const userEmail = user.email;
  const res = await getUserHomework({
    userEmail,
    lessonId,
    limit: 1000,
  });

  const items = [...res.items].sort((a, b) => {
    return a.homeworkType === 'task';
  });

  const resContainer = document.createElement('div');

  for (const item of items) {
    console.log(item);

    if (item.homeworkType === 'task') {
      try {
        const data = JSON.parse(item.homeworkData);
        const node = createPracticeTaskElement(data);
        node.id = item._id;
        uploadAnswers(node, item.answers);
        resContainer.appendChild(node);
      } catch {}
    } else if (item.homeworkType === 'theory') {
      const data = item.homeworkData;
      resContainer.insertAdjacentHTML('afterbegin', data);
    }
  }

  const container = document.querySelector('.js-homework-content');

  container.innerHTML = resContainer.innerHTML;
}
