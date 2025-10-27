const revisionTestModules = import.meta.glob(
  '@data/revision-tests/*.js',
  {
    eager: true,
    import: 'default',
  }
);

function toSlug(filePath = '') {
  const parts = filePath.split('/');
  const fileName = parts[parts.length - 1] || '';
  return fileName.replace(/\.js$/i, '');
}

function normaliseItem(item, index, taskId) {
  if (item && typeof item === 'object') {
    const prompt = item.prompt || item.question || item.text;
    return {
      ...item,
      prompt: String(prompt ?? `Пункт ${index + 1}`),
    };
  }

  return {
    prompt: String(item ?? `Пункт ${index + 1} (${taskId})`),
  };
}

function normaliseTask(task, index, testId) {
  if (!task || typeof task !== 'object') {
    return {
      id: `${testId}-task-${index + 1}`,
      title: `Завдання ${index + 1}`,
      instructions: '',
      items: [],
    };
  }

  const taskId =
    typeof task.id === 'string' && task.id.trim()
      ? task.id.trim()
      : `${testId}-task-${index + 1}`;

  const items = Array.isArray(task.items)
    ? task.items.map((item, itemIndex) =>
        normaliseItem(item, itemIndex, taskId)
      )
    : [];

  return {
    ...task,
    id: taskId,
    title:
      typeof task.title === 'string' && task.title.trim()
        ? task.title.trim()
        : `Завдання ${index + 1}`,
    instructions:
      typeof task.instructions === 'string' ? task.instructions.trim() : '',
    items,
  };
}

function normaliseTest(data, filePath) {
  if (!data || typeof data !== 'object') {
    console.warn(
      '[revision-tests] Очікується обʼєкт за замовчуванням у файлі:',
      filePath
    );
    return null;
  }

  const slug = toSlug(filePath).toLowerCase();
  const id =
    typeof data.id === 'string' && data.id.trim() ? data.id.trim() : slug;

  const tasks = Array.isArray(data.tasks)
    ? data.tasks.map((task, index) => normaliseTask(task, index, id))
    : [];

  return {
    ...data,
    id,
    slug,
    title:
      typeof data.title === 'string' && data.title.trim()
        ? data.title.trim()
        : slug,
    description:
      typeof data.description === 'string' ? data.description.trim() : '',
    tasks,
    sourcePath: filePath,
  };
}

const revisionTests = Object.entries(revisionTestModules)
  .map(([filePath, rawData]) => normaliseTest(rawData, filePath))
  .filter(Boolean)
  .sort((a, b) => {
    const orderA = Number.isFinite(a.order) ? a.order : Number.MAX_SAFE_INTEGER;
    const orderB = Number.isFinite(b.order) ? b.order : Number.MAX_SAFE_INTEGER;
    if (orderA !== orderB) return orderA - orderB;
    return a.title.localeCompare(b.title, 'uk', {
      sensitivity: 'base',
    });
  });

const testsBySlug = new Map(revisionTests.map(test => [test.slug, test]));

export function getAllRevisionTests() {
  return revisionTests.map(test => ({
    ...test,
    tasks: test.tasks.map(task => ({
      ...task,
      items: task.items.map(item => ({
        ...item,
        options: Array.isArray(item.options) ? [...item.options] : item.options,
        answers: Array.isArray(item.answers) ? [...item.answers] : item.answers,
        examples: Array.isArray(item.examples)
          ? [...item.examples]
          : item.examples,
      })),
      materials: Array.isArray(task.materials)
        ? task.materials.map(material =>
            material && typeof material === 'object'
              ? { ...material }
              : material
          )
        : task.materials,
      notes: Array.isArray(task.notes)
        ? [...task.notes]
        : task.notes,
      answerKey: Array.isArray(task.answerKey)
        ? [...task.answerKey]
        : task.answerKey,
    })),
  }));
}

export function findRevisionTestBySlug(slug) {
  if (!slug) return null;
  const normalisedSlug = String(slug).trim().toLowerCase();
  const entry = testsBySlug.get(normalisedSlug);
  return entry ? { ...entry } : null;
}
