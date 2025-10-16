import { auth } from '@features/auth/auth.js';
import {
  createShareControl,
  isSharePanelActive,
  closeActiveSharePanel,
  setShareAvailability,
} from '@features/helpers/share-panel.js';
import { addHomework } from '@api/homework.js';

const shareRegistry = new Map();
let hasSubscribedToAuth = false;

function ensureShareAvailabilitySubscription() {
  if (hasSubscribedToAuth) return;
  hasSubscribedToAuth = true;
  auth.subscribe(({ user }) => {
    setShareAvailability(auth.isAdmin(user));
  });
}

function ensureRelativePosition(element) {
  if (!element) return;
  const current = window.getComputedStyle(element).position;
  if (current === 'static' || !current) {
    element.style.position = 'relative';
  }
}

function ensureShareControlsWrapper(target) {
  const existing = target.querySelector('.lesson-topic__share-controls');
  if (existing) return existing;
  const controls = document.createElement('div');
  controls.className = 'lesson-topic__share-controls';
  controls.style.position = 'absolute';
  controls.style.top = '0';
  controls.style.right = '0';
  controls.style.display = 'flex';
  controls.style.gap = '6px';
  controls.style.alignItems = 'center';
  controls.style.zIndex = '10';
  target.appendChild(controls);
  return controls;
}

function attachShareToTopic(topic) {
  if (!topic || shareRegistry.has(topic)) return;
  const header = topic.querySelector('.lesson-topic__header') ?? topic;

  ensureRelativePosition(header);
  const controls = ensureShareControlsWrapper(header);

  const {
    button: shareButton,
    panel: sharePanel,
    unregister,
  } = createShareControl({
    context: topic,
    triggerClassName:
      'lesson-topic__share-trigger for-admin js-share-topic-btn',
    triggerStyle:
      'border:none;background:#2563eb;color:#fff;padding:4px 12px;border-radius:999px;font-size:12px;line-height:1;cursor:pointer;box-shadow:0 4px 12px rgba(37,99,235,0.24);',
    onShare: ({ student, context }) => {
      const container = document.createElement('div'); //lesson-topic__share-controls //practice-share-panel
      container.innerHTML = context.outerHTML;

      const lessonId = window.location.search.slice(8);
      const heading = document.querySelector('h1');
      const lessonName = heading ? heading.textContent : '';

      const el1 = container.querySelector('.lesson-topic__share-controls');
      const el2 = container.querySelector('.practice-share-panel');

      el1.remove();
      el2.remove();

      const homework = {
        lessonId,
        userEmail: student.email,
        lessonName,
        homeworkType: 'theory',
        homeworkData: container.innerHTML,
      };

      return addHomework(homework);
    },
  });

  sharePanel.style.right = '0';
  sharePanel.style.top = '38px';

  controls.appendChild(shareButton);
  header.appendChild(sharePanel);

  shareRegistry.set(topic, {
    unregister,
    panel: sharePanel,
  });
}

function cleanupDetachedTopics() {
  shareRegistry.forEach((entry, topic) => {
    if (topic.isConnected) return;
    if (entry.panel && isSharePanelActive(entry.panel)) {
      closeActiveSharePanel();
    }
    entry.unregister?.();
    shareRegistry.delete(topic);
  });
}

export const renderTopicSender = () => {
  ensureShareAvailabilitySubscription();
  cleanupDetachedTopics();
  const topics = document.querySelectorAll('.lesson-topic');
  topics.forEach(topic => attachShareToTopic(topic));
};
