import { auth } from '@features/auth/auth.js';
import { getUsers } from '@api/user.js';
import {
  getUserHomeworkLessons,
  getUserHomework,
} from '@api/homework.js';
import { createPracticeTaskElement } from '@features/practice/practice.js';
import { uploadAnswers } from '@features/homework/homework-updates.js';

const studentSelect = document.querySelector('[data-student-select]');
const statusElement = document.querySelector('[data-homework-status]');
const hintElement = document.querySelector('[data-student-hint]');
const listElement = document.querySelector('[data-homework-list]');
const contentElement = document.querySelector('.js-homework-content');

if (
  studentSelect &&
  statusElement &&
  listElement &&
  contentElement
) {
  auth.init();

  const state = {
    students: [],
    studentByEmail: new Map(),
    selectedEmail: null,
    lessonsRequestId: 0,
    homeworkRequestId: 0,
    activeLessonCard: null,
    activeLessonId: null,
    studentsLoaded: false,
  };

  function setStatus(message) {
    if (!statusElement) return;
    statusElement.textContent = message || '';
    statusElement.hidden = !message;
  }

  function setHintVisible(isVisible) {
    if (!hintElement) return;
    hintElement.hidden = !isVisible;
  }

  function clearLessonsList() {
    listElement.innerHTML = '';
  }

  function clearHomeworkContent() {
    contentElement.innerHTML = '';
  }

  function setActiveLessonCard(card) {
    if (state.activeLessonCard && state.activeLessonCard !== card) {
      state.activeLessonCard.classList.remove('homework-card--active');
    }
    state.activeLessonCard = card;
    if (card) {
      card.classList.add('homework-card--active');
    }
  }

  function formatStudentName(student) {
    if (!student || typeof student !== 'object') return 'Без імені';
    const first =
      student.firstName ||
      student.firstname ||
      student.nameFirst ||
      student.givenName ||
      '';
    const last =
      student.lastName ||
      student.lastname ||
      student.nameLast ||
      student.familyName ||
      '';
    const trimmed = [first, last]
      .map(part => String(part || '').trim())
      .filter(Boolean)
      .join(' ');
    const fallback =
      student.displayName ||
      student.fullName ||
      student.username ||
      student.name ||
      student.email ||
      (student.id ? `ID ${student.id}` : '');
    return trimmed || fallback || 'Без імені';
  }

  function updateStudentSelectPlaceholder(text, { disabled = true } = {}) {
    studentSelect.innerHTML = '';
    const option = document.createElement('option');
    option.value = '';
    option.textContent = text;
    option.disabled = true;
    option.selected = true;
    studentSelect.appendChild(option);
    studentSelect.disabled = disabled;
  }

  function renderStudentOptions(students) {
    state.students = students;
    state.studentByEmail.clear();
    students.forEach(student => {
      if (student?.email) {
        state.studentByEmail.set(student.email, student);
      }
    });

    if (!students.length) {
      updateStudentSelectPlaceholder(
        'Список студентів порожній',
        { disabled: true }
      );
      setHintVisible(false);
      return;
    }

    studentSelect.innerHTML = '';
    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = 'Оберіть студента';
    placeholder.disabled = true;
    placeholder.selected = true;
    studentSelect.appendChild(placeholder);

    students
      .slice()
      .sort((a, b) => {
        const nameA = formatStudentName(a).toLowerCase();
        const nameB = formatStudentName(b).toLowerCase();
        return nameA.localeCompare(nameB, 'uk');
      })
      .forEach(student => {
        if (!student?.email) return;
        const label = formatStudentName(student);
        const email = String(student.email || '').trim();
        const option = document.createElement('option');
        option.value = email;
        option.textContent =
          email && email !== label ? `${label} — ${email}` : label;
        studentSelect.appendChild(option);
      });

    studentSelect.disabled = false;
    setHintVisible(true);
  }

  async function loadStudents() {
    if (state.studentsLoaded) return;
    state.studentsLoaded = true;

    updateStudentSelectPlaceholder('Завантаження списку студентів…', {
      disabled: true,
    });
    setStatus('Завантаження списку студентів…');

    try {
      const response = await getUsers();
      const items = Array.isArray(response?.items) ? response.items : [];
      const students = items.filter(
        user => user && typeof user === 'object' && user.email
      );
      renderStudentOptions(students);
      if (students.length) {
        setStatus('Оберіть студента, щоб переглянути уроки.');
      } else {
        setStatus('Не знайдено студентів для перегляду.');
      }
    } catch (error) {
      console.error('Не вдалося завантажити список студентів', error);
      updateStudentSelectPlaceholder(
        'Не вдалося завантажити студентів',
        { disabled: true }
      );
      setHintVisible(false);
      setStatus('Не вдалося завантажити список студентів. Спробуйте пізніше.');
      state.studentsLoaded = false;
    }
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

  function createLessonCard(lesson, studentEmail) {
    const card = document.createElement('article');
    card.className = 'homework-card';
    card.setAttribute('role', 'listitem');
    if (lesson?.lessonId) {
      card.dataset.id = lesson.lessonId;
    }

    const title = document.createElement('h3');
    title.className = 'homework-card__title';
    title.textContent = lesson?.lessonName || lesson?.title || 'Без назви';
    card.appendChild(title);

    const dueDateLabel = formatDueDate(lesson);
    if (dueDateLabel) {
      const due = document.createElement('p');
      due.className = 'homework-card__meta';
      due.textContent = `Строк: ${dueDateLabel}`;
      card.appendChild(due);
    }

    const description =
      lesson?.description ||
      lesson?.lessonDescription ||
      lesson?.summary ||
      '';
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
      link.type = 'button';
      link.textContent = 'відкрити';
      card.appendChild(link);
    }

    card.addEventListener('click', () => {
      if (!lesson?.lessonId || !studentEmail) return;
      setActiveLessonCard(card);
      loadHomeworkForStudent(lesson.lessonId, studentEmail);
    });

    return card;
  }

  function renderLessons(lessons, studentEmail) {
    clearLessonsList();
    if (!Array.isArray(lessons) || !lessons.length) {
      setStatus('У цього студента поки немає призначених уроків.');
      return;
    }

    const fragment = document.createDocumentFragment();
    lessons.forEach(lesson => {
      fragment.appendChild(createLessonCard(lesson, studentEmail));
    });
    listElement.appendChild(fragment);
    setStatus('Оберіть урок, щоб переглянути практичні завдання.');
  }

  async function loadLessonsForStudent(studentEmail) {
    const requestId = ++state.lessonsRequestId;
    state.activeLessonId = null;
    setActiveLessonCard(null);
    clearLessonsList();
    clearHomeworkContent();

    if (!studentEmail) {
      setStatus('Оберіть студента, щоб переглянути уроки.');
      return;
    }

    setStatus('Завантаження уроків…');

    try {
      const lessons = await getUserHomeworkLessons(studentEmail);
      if (
        requestId !== state.lessonsRequestId ||
        state.selectedEmail !== studentEmail
      ) {
        return;
      }
      renderLessons(lessons, studentEmail);
    } catch (error) {
      if (requestId !== state.lessonsRequestId) return;
      console.error(
        `Не вдалося завантажити уроки для ${studentEmail}`,
        error
      );
      setStatus('Не вдалося завантажити уроки. Спробуйте пізніше.');
    }
  }

  function renderHomeworkItems(items) {
    clearHomeworkContent();
    if (!Array.isArray(items) || !items.length) {
      const emptyMessage = document.createElement('p');
      emptyMessage.className = 'muted';
      emptyMessage.textContent =
        'Для цього уроку поки немає практичних завдань.';
      contentElement.appendChild(emptyMessage);
      return;
    }

    const container = document.createElement('div');
    for (const item of items) {
      if (item.homeworkType === 'task') {
        try {
          const data = JSON.parse(item.homeworkData);
          const node = createPracticeTaskElement(data);
          node.id = item._id;
          uploadAnswers(node, item.answers);
          container.appendChild(node);
        } catch (error) {
          console.error('Не вдалося відрендерити завдання', error);
        }
      } else if (item.homeworkType === 'theory') {
        const data = item.homeworkData;
        if (typeof data === 'string') {
          container.insertAdjacentHTML('afterbegin', data);
        }
      }
    }

    contentElement.append(...container.children);
  }

  async function loadHomeworkForStudent(lessonId, studentEmail) {
    if (!lessonId || !studentEmail) return;

    const requestId = ++state.homeworkRequestId;
    state.activeLessonId = lessonId;
    setStatus('Завантаження завдань…');

    try {
      const result = await getUserHomework({
        userEmail: studentEmail,
        lessonId,
        limit: 1000,
      });
      if (
        requestId !== state.homeworkRequestId ||
        state.selectedEmail !== studentEmail ||
        state.activeLessonId !== lessonId
      ) {
        return;
      }

      const items = Array.isArray(result?.items) ? [...result.items] : [];
      items.sort((a, b) => {
        if (a.homeworkType === b.homeworkType) return 0;
        if (a.homeworkType === 'task') return -1;
        if (b.homeworkType === 'task') return 1;
        return 0;
      });
      renderHomeworkItems(items);

      if (!items.length) {
        setStatus('Для цього уроку поки немає практичних завдань.');
      } else {
        setStatus('');
      }
    } catch (error) {
      if (requestId !== state.homeworkRequestId) return;
      console.error(
        `Не вдалося завантажити завдання для уроку ${lessonId}`,
        error
      );
      setStatus('Не вдалося завантажити завдання. Спробуйте пізніше.');
    }
  }

  function handleStudentChange(event) {
    const email = event.target.value;
    if (!email || email === state.selectedEmail) return;
    state.selectedEmail = email;
    setHintVisible(false);
    loadLessonsForStudent(email);
  }

  function applyAdminAccess(isAllowed) {
    if (!isAllowed) {
      state.selectedEmail = null;
      state.studentsLoaded = false;
      clearLessonsList();
      clearHomeworkContent();
      updateStudentSelectPlaceholder(
        'Доступно лише для адміністраторів',
        { disabled: true }
      );
      setHintVisible(false);
      return;
    }
    loadStudents();
  }

  studentSelect.addEventListener('change', handleStudentChange);

  auth.subscribe(snapshot => {
    if (!snapshot.isSignedIn) {
      setStatus(
        'Увійдіть у свій адміністративний акаунт, щоб переглядати домашні роботи студентів.'
      );
      applyAdminAccess(false);
      return;
    }

    if (!auth.isAdmin(snapshot.user)) {
      setStatus('Ця сторінка доступна лише адміністраторам.');
      applyAdminAccess(false);
      return;
    }

    applyAdminAccess(true);
    if (!state.selectedEmail) {
      setStatus('Оберіть студента, щоб переглянути уроки.');
    }
  });
}
