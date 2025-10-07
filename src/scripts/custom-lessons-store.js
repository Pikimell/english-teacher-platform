const STORAGE_KEY = 'etp.customLessons';

function safeParse(value, fallback) {
  try {
    return value ? JSON.parse(value) : fallback;
  } catch (error) {
    console.warn('Не вдалося прочитати кастомні уроки з localStorage', error);
    return fallback;
  }
}

export function loadCustomLessons() {
  if (typeof localStorage === 'undefined') return [];
  const raw = localStorage.getItem(STORAGE_KEY);
  const parsed = safeParse(raw, []);
  if (!Array.isArray(parsed)) return [];
  return parsed
    .map((item) => ({ ...item }))
    .filter((item) => item && typeof item.id === 'string' && Array.isArray(item.topicIds));
}

export function saveCustomLessons(list) {
  if (typeof localStorage === 'undefined') return;
  const safeList = Array.isArray(list) ? list : [];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(safeList));
}

export function createCustomLesson(data) {
  const lessons = loadCustomLessons();
  const newLesson = {
    id: data.id,
    title: data.title,
    topicIds: data.topicIds,
    createdAt: data.createdAt ?? new Date().toISOString(),
  };
  lessons.push(newLesson);
  saveCustomLessons(lessons);
  return newLesson;
}

export function deleteCustomLesson(id) {
  const lessons = loadCustomLessons();
  const next = lessons.filter((lesson) => lesson.id !== id);
  saveCustomLessons(next);
  return lessons.length !== next.length;
}

export function subscribeToStorage(callback) {
  if (typeof window === 'undefined' || typeof callback !== 'function') return () => {};

  const handler = (event) => {
    if (event.storageArea !== localStorage) return;
    if (event.key && event.key !== STORAGE_KEY) return;
    callback(loadCustomLessons());
  };

  window.addEventListener('storage', handler);
  return () => window.removeEventListener('storage', handler);
}

export function clearAllCustomLessons() {
  if (typeof localStorage === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}
