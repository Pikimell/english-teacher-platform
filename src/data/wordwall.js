const DEFAULT_THEME_ID = 55;
const DEFAULT_TEMPLATE_ID = 5;
const DEFAULT_FONT_STACK_ID = 0;

export const lessonWordwalls = {
  'custom-no1-mggxs7zo': [
    {
      id: 'db94624e1c8042ce98760f467377e1ae',
      themeId: '42',
      templateId: '70',
      fontStackId: DEFAULT_FONT_STACK_ID,
      title: 'Wordwall вправа для особових займенників',
    },
  ],
  'custom-no2-4db25661': [
    {
      id: '110f5ab8bba8415eadefd09fb52c4e87',
      themeId: '65',
      templateId: '30',
      fontStackId: '12',
      title: 'Wordwall вправа для особових займенників',
      url: 'https://wordwall.net/embed/110f5ab8bba8415eadefd09fb52c4e87?themeId=65&templateId=30&fontStackId=12',
    },
  ],
};

function buildBaseUrl(config) {
  if (!config) return null;
  if (config.url) return String(config.url);
  if (config.id) {
    return `https://wordwall.net/embed/${String(config.id).trim()}`;
  }
  return null;
}

export function buildWordwallUrl(config) {
  const baseUrl = buildBaseUrl(config);
  if (!baseUrl) return null;
  const params = new URLSearchParams();
  const themeId = config.themeId ?? DEFAULT_THEME_ID;
  const templateId = config.templateId ?? DEFAULT_TEMPLATE_ID;
  const fontStackId = config.fontStackId ?? DEFAULT_FONT_STACK_ID;

  if (themeId != null) params.set('themeId', String(themeId));
  if (templateId != null) params.set('templateId', String(templateId));
  if (fontStackId != null) params.set('fontStackId', String(fontStackId));

  const query = params.toString();
  return query ? `${baseUrl}?${query}` : baseUrl;
}

export function createWordwallIframe(config) {
  const src = buildWordwallUrl(config);
  if (!src) return null;

  const iframe = document.createElement('iframe');
  iframe.className = 'lesson-wordwall__iframe';
  iframe.src = src;
  iframe.width = String(config.width ?? 1000);
  iframe.height = String(config.height ?? 760);
  iframe.setAttribute('frameborder', '0');
  iframe.setAttribute('allowfullscreen', 'true');
  iframe.setAttribute('loading', 'lazy');
  iframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
  if (config.title) {
    iframe.setAttribute('title', config.title);
  }

  return iframe;
}

export function getWordwallConfigsForLesson(lessonId) {
  if (!lessonId) return [];
  const entries = lessonWordwalls[lessonId];
  if (!Array.isArray(entries)) return [];
  return entries
    .map(entry => ({ ...entry }))
    .filter(entry => Boolean(buildWordwallUrl(entry)));
}
