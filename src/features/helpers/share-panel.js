import { getUsers } from '@api/user.js';

const shareState = {
  users: null,
  request: null,
  active: null,
};

function defaultFetchStudents() {
  if (shareState.users) return Promise.resolve(shareState.users);
  if (shareState.request) return shareState.request;

  shareState.request = getUsers()
    .then(data => {
      const items = Array.isArray(data?.items) ? data.items : [];
      shareState.users = items;
      return items;
    })
    .catch(error => {
      console.error('Не вдалося завантажити список студентів', error);
      throw error;
    })
    .finally(() => {
      shareState.request = null;
    });

  return shareState.request;
}

function defaultFormatStudentName(student) {
  if (!student || typeof student !== 'object') return 'Невідомий студент';
  const possibleFirst =
    student.firstName || student.firstname || student.nameFirst || '';
  const possibleLast =
    student.lastName || student.lastname || student.nameLast || '';
  const full = [possibleFirst, possibleLast]
    .map(part => String(part || '').trim())
    .filter(Boolean)
    .join(' ');
  const display =
    full ||
    student.displayName ||
    student.fullName ||
    student.username ||
    student.email ||
    (student.id ? `ID ${student.id}` : '');
  return display || 'Без імені';
}

export function closeActiveSharePanel() {
  if (!shareState.active) return;
  const { panel, button } = shareState.active;
  panel.style.display = 'none';
  panel.dataset.open = 'false';
  button.setAttribute('aria-expanded', 'false');
  shareState.active = null;
}

const shareControls = new Set();
let canShare = false;

function applyShareVisibility(control) {
  const { button, panel } = control;
  if (!button || !panel) return;
  if (!button.isConnected && !panel.isConnected) {
    shareControls.delete(control);
    return;
  }
  if (canShare) {
    button.hidden = false;
    return;
  }
  button.hidden = true;
  panel.style.display = 'none';
  panel.dataset.open = 'false';
}

function registerShareControl(button, panel) {
  const control = { button, panel };
  shareControls.add(control);
  applyShareVisibility(control);
  return () => {
    shareControls.delete(control);
  };
}

export function setShareAvailability(isAllowed) {
  const next = Boolean(isAllowed);
  if (canShare === next) return;
  canShare = next;
  if (!canShare) {
    closeActiveSharePanel();
  }
  shareControls.forEach(control => applyShareVisibility(control));
}

function handleOutsideShareClick(event) {
  if (!shareState.active) return;
  const { panel, button } = shareState.active;
  const target = event.target;
  if (panel.contains(target) || button.contains(target)) return;
  closeActiveSharePanel();
}

function handleShareKeydown(event) {
  if (event.key === 'Escape') {
    closeActiveSharePanel();
  }
}

document.addEventListener('click', handleOutsideShareClick);
document.addEventListener('keydown', handleShareKeydown);

function el(tag, attrs = {}, ...children) {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs || {})) {
    if (key === 'class') node.className = value;
    else if (key === 'html') node.innerHTML = value;
    else if (key.startsWith('on') && typeof value === 'function')
      node.addEventListener(key.slice(2), value);
    else node.setAttribute(key, value);
  }
  for (const child of children) {
    if (child == null) continue;
    node.appendChild(
      typeof child === 'string' ? document.createTextNode(child) : child
    );
  }
  return node;
}

const defaultOptions = {
  triggerLabel: 'Надіслати',
  triggerClassName: 'practice-share-trigger for-admin js-share-homework-btn',
  triggerStyle:
    'border:none;background:#2563eb;color:#fff;padding:4px 10px;border-radius:999px;font-size:12px;line-height:1;cursor:pointer;box-shadow:0 4px 12px rgba(37,99,235,0.24);',
  panelClassName: 'practice-share-panel',
  panelStyle:
    'position:absolute;top:38px;right:0;min-width:240px;max-width:280px;border:1px solid #e2e8f0;border-radius:12px;background:#fff;box-shadow:0 18px 40px rgba(15,23,42,0.18);padding:8px;z-index:30;display:none;',
  emptyMessage: 'Список студентів порожній',
  loadingMessage: 'Завантаження…',
  errorMessage: 'Не вдалося завантажити студентів. Спробуйте ще раз.',
  formatStudentName: defaultFormatStudentName,
  fetchStudents: defaultFetchStudents,
  getContext: null,
  onShare: () => undefined,
  renderDetails: student =>
    student?.email
      ? el(
          'span',
          { class: 'muted', style: 'font-size:12px;color:#475569;' },
          student.email
        )
      : null,
};

function resolveShareOptions(options = {}) {
  const resolved = { ...defaultOptions, ...options };
  resolved.fetchStudents =
    typeof options.fetchStudents === 'function'
      ? options.fetchStudents
      : defaultOptions.fetchStudents;
  resolved.formatStudentName =
    typeof options.formatStudentName === 'function'
      ? options.formatStudentName
      : defaultOptions.formatStudentName;
  resolved.renderDetails =
    typeof options.renderDetails === 'function'
      ? options.renderDetails
      : defaultOptions.renderDetails;
  resolved.onShare =
    typeof options.onShare === 'function'
      ? options.onShare
      : defaultOptions.onShare;

  resolved.getContext =
    typeof options.getContext === 'function'
      ? options.getContext
      : () => options.context;

  return resolved;
}

function renderStudentOptions(panel, students, options) {
  panel.innerHTML = '';
  if (!students.length) {
    panel.appendChild(
      el(
        'div',
        {
          class: 'muted',
          style: 'font-size:13px;text-align:center;padding:12px 8px;',
        },
        options.emptyMessage
      )
    );
    return;
  }

  const list = el('ul', {
    style: 'list-style:none;margin:0;padding:0;max-height:220px;overflow:auto;',
  });

  const getContext =
    typeof options.getContext === 'function'
      ? options.getContext
      : defaultOptions.getContext;

  students.forEach(student => {
    const button = el(
      'button',
      {
        type: 'button',
        style:
          'width:100%;background:transparent;border:none;text-align:left;padding:8px 10px;border-radius:8px;cursor:pointer;display:flex;flex-direction:column;gap:2px;',
        onmouseenter: () => {
          button.style.backgroundColor = '#f1f5f9';
        },
        onmouseleave: () => {
          button.style.backgroundColor = 'transparent';
        },
        onclick: () => {
          const context =
            typeof getContext === 'function' ? getContext(student) : undefined;
          try {
            const result = options.onShare({ student, context });
            if (result && typeof result.then === 'function') {
              button.disabled = true;
              Promise.resolve(result)
                .then(value => {
                  if (value !== false) {
                    closeActiveSharePanel();
                  }
                })
                .catch(error => {
                  console.error('Помилка під час надсилання завдання', error);
                  closeActiveSharePanel();
                })
                .finally(() => {
                  button.disabled = false;
                });
              return;
            }
            if (result !== false) {
              closeActiveSharePanel();
            }
          } catch (error) {
            console.error('Помилка під час надсилання завдання', error);
            closeActiveSharePanel();
          }
        },
      },
      el(
        'span',
        { style: 'font-size:14px;font-weight:600;color:#0f172a;' },
        options.formatStudentName(student)
      ),
      options.renderDetails ? options.renderDetails(student) : null
    );
    const item = el('li', { style: 'margin:0;padding:0;' }, button);
    list.appendChild(item);
  });

  panel.appendChild(list);
}

function createSharePanelElement(options) {
  return el('div', {
    class: options.panelClassName,
    role: 'dialog',
    'aria-label': 'Надсилання завдання студенту',
    style: options.panelStyle,
    'data-open': 'false',
  });
}

function toggleSharePanel(button, panel, options) {
  const isOpen = panel.dataset.open === 'true';
  if (isOpen) {
    closeActiveSharePanel();
    return;
  }
  if (shareState.active && shareState.active.panel !== panel) {
    closeActiveSharePanel();
  }

  panel.dataset.open = 'true';
  panel.style.display = 'block';
  button.setAttribute('aria-expanded', 'true');

  panel.innerHTML = '';
  panel.appendChild(
    el(
      'div',
      {
        class: 'muted',
        style: 'font-size:13px;padding:12px 8px;text-align:center;',
      },
      options.loadingMessage
    )
  );

  shareState.active = { panel, button };

  Promise.resolve(options.fetchStudents())
    .then(students => {
      renderStudentOptions(
        panel,
        Array.isArray(students) ? students : [],
        options
      );
    })
    .catch(() => {
      panel.innerHTML = '';
      panel.appendChild(
        el(
          'div',
          {
            style:
              'color:#ef4444;font-size:13px;text-align:center;padding:12px 8px;',
          },
          options.errorMessage
        )
      );
    });
}

function createShareTrigger(panel, options) {
  const button = el(
    'button',
    {
      type: 'button',
      class: options.triggerClassName,
      title: 'Надіслати студенту',
      'aria-haspopup': 'dialog',
      'aria-expanded': 'false',
      style: options.triggerStyle,
      onclick: event => {
        event.preventDefault();
        toggleSharePanel(button, panel, options);
      },
    },
    options.triggerLabel
  );
  return button;
}

export function createShareControl(options = {}) {
  const resolvedOptions = resolveShareOptions(options);
  const panel = createSharePanelElement(resolvedOptions);
  const button = createShareTrigger(panel, resolvedOptions);
  const unregister = registerShareControl(button, panel);
  return { button, panel, unregister };
}

export function isSharePanelActive(panel) {
  return Boolean(shareState.active && shareState.active.panel === panel);
}
