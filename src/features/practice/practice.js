// Lightweight practice renderer for topic pages

import { addHomework } from '@api/homework.js';
import { auth } from '@features/auth/auth.js';
import {
  closeActiveSharePanel,
  createShareControl,
  isSharePanelActive,
  setShareAvailability,
} from '@features/helpers/share-panel.js';
import { speakText } from '@features/helpers/speaker.js';

// Convention: for page /X/indexN.html → fetch /X/practice/indexN.json
const practiceAPI = (function () {
  const basePath =
    (typeof import.meta !== 'undefined' &&
      import.meta.env &&
      import.meta.env.BASE_URL) ||
    '/';

  function resolveAssetPath(path) {
    const normalizedBase = basePath.endsWith('/') ? basePath : `${basePath}/`;
    const rawPath = String(path || '');
    if (/^[a-z]+:/i.test(rawPath)) return rawPath;
    if (rawPath.startsWith(normalizedBase)) return rawPath;
    return `${normalizedBase}${rawPath.replace(/^\/+/, '')}`;
  }

  function derivePracticePath() {
    try {
      const url = new URL(window.location.href);
      const parts = url.pathname.split('/');
      let file = parts.pop();
      if (!file || !/\.html?$/i.test(file)) file = 'index.html';
      const json = file.replace(/\.html?$/i, '.json');
      parts.push('practice', json);
      return parts.join('/');
    } catch (e) {
      return null;
    }
  }

  function el(tag, attrs = {}, ...children) {
    const node = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs || {})) {
      if (k === 'class') node.className = v;
      else if (k === 'html') node.innerHTML = v;
      else if (k.startsWith('on') && typeof v === 'function')
        node.addEventListener(k.slice(2), v);
      else node.setAttribute(k, v);
    }
    for (const ch of children) {
      if (ch == null) continue;
      node.appendChild(
        typeof ch === 'string' ? document.createTextNode(ch) : ch
      );
    }
    return node;
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function normalize(s) {
    return String(s || '')
      .trim()
      .toLowerCase()
      .replace(/\s+/g, ' ');
  }

  let inputIdCounter = 0;
  function uniqueInputId(prefix = 'practice-input') {
    inputIdCounter += 1;
    const base =
      String(prefix || 'practice-input')
        .trim()
        .replace(/[^a-z0-9_-]+/gi, '-')
        .replace(/^-+|-+$/g, '') || 'practice-input';
    return `${base}-${inputIdCounter}`;
  }

  auth.subscribe(({ user }) => {
    setShareAvailability(auth.isAdmin(user));
  });
  // Subtle hint toggle: hidden by default, shown on small button click
  function makeHint(hintText) {
    const wrap = el('div', { class: 'hint-wrap', style: 'margin-top:6px;' });
    const btn = el(
      'button',
      {
        type: 'button',
        class: 'hint-toggle',
        'aria-label': 'Показати підказку',
        title: 'Підказка',
        style:
          'border:none;background:transparent;color:#94a3b8;cursor:pointer;padding:0;font-size:14px;line-height:1;',
      },
      '?'
    );
    const box = el(
      'div',
      {
        class: 'hint-box muted',
        style: 'display:none;margin-top:6px;color:#475569;',
      },
      `Підказка: ${hintText}`
    );
    btn.addEventListener('click', () => {
      const isHidden = box.style.display === 'none';
      box.style.display = isHidden ? 'block' : 'none';
      btn.setAttribute('aria-expanded', isHidden ? 'true' : 'false');
    });
    wrap.appendChild(btn);
    wrap.appendChild(box);
    return wrap;
  }

  function renderMCQ(container, task) {
    container.appendChild(
      el('h3', {}, task.prompt || 'Choose the correct option')
    );
    const blocks = [];
    (task.items || []).forEach((item, idx) => {
      const name = `${task.id || 'mcq'}-${idx}`;
      const allowMulti = Array.isArray(item.answer) && item.answer.length > 1;
      const block = el(
        'div',
        {
          class: 'mcq-item',
          style:
            'margin-bottom:10px;padding:10px;border:1px solid #e5e7eb;border-radius:10px;background:#fff;',
        },
        el(
          'div',
          { class: 'q', style: 'margin-bottom:8px;font-weight:600;' },
          item.q
        )
      );
      (item.choices || []).forEach((choice, cIdx) => {
        const id = uniqueInputId(`${name}-${cIdx}`);
        const lbl = el(
          'label',
          {
            for: id,
            style: 'display:flex;align-items:center;gap:8px;margin:4px 0;',
          },
          el('input', {
            type: allowMulti ? 'checkbox' : 'radio',
            name,
            id,
            value: String(cIdx),
          }),
          el('span', {}, choice)
        );
        block.appendChild(lbl);
      });
      if (item.explanation) {
        block.appendChild(
          el(
            'div',
            {
              class: 'exp muted',
              style: 'display:none;margin-top:6px;color:#475569;',
            },
            item.explanation
          )
        );
      }
      blocks.push({ block, item, name });
      container.appendChild(block);
    });
    const result = el('div', {
      class: 'result',
      style: 'margin-top:8px;font-weight:600;',
    });
    const btn = el(
      'button',
      { type: 'button', class: 'btn primary', style: 'margin-top:8px;' },
      'Перевірити'
    );
    btn.addEventListener('click', () => {
      let correct = 0;
      blocks.forEach(({ block, item, name }) => {
        const answers = Array.isArray(item.answer)
          ? item.answer.map(String)
          : [String(item.answer)];
        const inputs = Array.from(
          block.querySelectorAll(`input[name='${name}']`)
        );
        const picked = inputs
          .filter(i => i.checked)
          .map(i => i.value)
          .sort();
        const expected = answers.slice().sort();
        const ok =
          picked.length === expected.length &&
          picked.every((v, i) => v === expected[i]);
        block.style.borderColor = ok ? '#10b981' : '#ef4444';
        const exp = block.querySelector('.exp');
        if (exp) exp.style.display = ok ? 'none' : 'block';
        if (ok) correct++;
      });
      result.textContent = `Результат: ${correct}/${blocks.length}`;
    });
    container.appendChild(btn);
    container.appendChild(result);
  }

  function renderGap(container, task) {
    container.appendChild(el('h3', {}, task.prompt || 'Fill the gaps'));
    const items = [];
    (task.items || []).forEach((it, idx) => {
      const row = el('div', {
        style:
          'margin-bottom:10px;padding:10px;border:1px solid #e5e7eb;border-radius:10px;background:#fff;',
      });
      const parts = String(it.q || '').split(/___/);
      const inputId = uniqueInputId(`${task.id || 'gap'}-${idx}`);
      const input = el('input', {
        type: 'text',
        id: inputId,
        style: 'padding:6px 8px;border:1px solid #cbd5e1;border-radius:6px;',
      });
      if (parts.length > 1) {
        row.appendChild(el('span', {}, parts[0]));
        row.appendChild(input);
        row.appendChild(el('span', {}, parts.slice(1).join('___')));
      } else {
        row.appendChild(
          el('div', { style: 'margin-bottom:6px;font-weight:600;' }, it.q)
        );
        row.appendChild(input);
      }
      if (it.hint) row.appendChild(makeHint(it.hint));
      items.push({
        row,
        input,
        answers: (it.answer || []).map(a => normalize(a)),
      });
      container.appendChild(row);
    });
    const result = el('div', { style: 'margin-top:8px;font-weight:600;' });
    const btn = el(
      'button',
      { type: 'button', class: 'btn primary', style: 'margin-top:8px;' },
      'Перевірити'
    );
    btn.addEventListener('click', () => {
      let correct = 0;
      items.forEach(({ row, input, answers }) => {
        const val = normalize(input.value);
        const ok = answers.includes(val);
        row.style.borderColor = ok ? '#10b981' : '#ef4444';
        if (ok) correct++;
      });
      result.textContent = `Результат: ${correct}/${items.length}`;
    });
    container.appendChild(btn);
    container.appendChild(result);
  }

  function renderMatch(container, task) {
    container.appendChild(el('h3', {}, task.prompt || 'Match pairs'));
    const pairs = task.pairs || [];
    const rights = shuffle(pairs.map(p => p.right));
    const rows = [];
    pairs.forEach((p, index) => {
      const selectId = uniqueInputId(`${task.id || 'match'}-${index}`);
      const select = el(
        'select',
        {
          id: selectId,
          style: 'padding:6px 8px;border:1px solid #cbd5e1;border-radius:6px;',
        },
        el('option', { value: '' }, '— обери —'),
        ...rights.map(r => el('option', { value: r }, r))
      );
      const row = el(
        'div',
        {
          style:
            'display:flex;align-items:center;gap:10px;margin:8px 0;padding:10px;border:1px solid #e5e7eb;border-radius:10px;background:#fff;',
        },
        el(
          'label',
          { for: selectId, style: 'min-width:160px;font-weight:600;' },
          p.left
        ),
        select
      );
      rows.push({ row, select, right: p.right });
      container.appendChild(row);
    });
    const result = el('div', { style: 'margin-top:8px;font-weight:600;' });
    const btn = el(
      'button',
      { type: 'button', class: 'btn primary', style: 'margin-top:8px;' },
      'Перевірити'
    );
    btn.addEventListener('click', () => {
      let correct = 0;
      rows.forEach(({ row, select, right }) => {
        const ok = select.value === right;
        row.style.borderColor = ok ? '#10b981' : '#ef4444';
        if (ok) correct++;
      });
      result.textContent = `Результат: ${correct}/${rows.length}`;
    });
    container.appendChild(btn);
    container.appendChild(result);
  }

  function renderContext(container, task) {
    container.appendChild(
      el('h3', {}, task.prompt || 'Прочитайте текст та дайте відповіді')
    );

    const context = task.context || {};
    const format = String(context.format || 'narrative').toLowerCase();
    const body = Array.isArray(context.body) ? context.body : [];
    const textWrap = el('div', {
      style:
        'margin:12px 0;padding:14px;border:1px solid #cbd5e1;border-radius:10px;background:#f8fafc;',
    });

    if (context.title) {
      textWrap.appendChild(
        el('h4', { style: 'margin:0 0 8px;font-size:18px;' }, context.title)
      );
    }

    if (format === 'dialog') {
      body.forEach(turn => {
        if (!turn) return;
        const speaker =
          typeof turn === 'object' && turn.speaker ? `${turn.speaker}:` : '';
        const line =
          typeof turn === 'object' && 'line' in turn
            ? turn.line
            : typeof turn === 'string'
            ? turn
            : '';
        textWrap.appendChild(
          el(
            'p',
            {
              style:
                'margin:4px 0;display:flex;gap:6px;align-items:flex-start;line-height:1.5;',
            },
            speaker ? el('strong', {}, speaker) : null,
            el('span', {}, line)
          )
        );
      });
    } else {
      body.forEach((paragraph, index) => {
        const text =
          typeof paragraph === 'string'
            ? paragraph
            : paragraph && paragraph.text
            ? paragraph.text
            : '';
        if (!text) return;
        textWrap.appendChild(
          el('p', { style: index ? 'margin:8px 0 0;' : 'margin:0;' }, text)
        );
      });
    }

    container.appendChild(textWrap);

    const questions = Array.isArray(task.questions) ? task.questions : [];
    if (!questions.length) return;

    const blocks = [];
    questions.forEach((question, idx) => {
      const prompt = el(
        'div',
        { style: 'margin-bottom:8px;font-weight:600;' },
        question.q || `Питання ${idx + 1}`
      );
      const block = el(
        'div',
        {
          style:
            'margin-bottom:12px;padding:12px;border:1px solid #e5e7eb;border-radius:10px;background:#fff;',
        },
        prompt
      );

      const answers = Array.isArray(question.answer)
        ? question.answer.map(String)
        : question.answer != null
        ? [String(question.answer)]
        : [];

      if (Array.isArray(question.choices) && question.choices.length) {
        const name = `${task.id || 'context'}-${idx}`;
        const allowMulti = answers.length > 1;
        const expectedIsIndex = answers.every(value => /^\d+$/.test(value));
        question.choices.forEach((choice, cIdx) => {
          const id = uniqueInputId(`${name}-${cIdx}`);
          block.appendChild(
            el(
              'label',
              {
                for: id,
                style: 'display:flex;align-items:center;gap:8px;margin:4px 0;',
              },
              el('input', {
                type: allowMulti ? 'checkbox' : 'radio',
                name,
                id,
                value: String(cIdx),
              }),
              el('span', {}, choice)
            )
          );
        });
        blocks.push({
          block,
          type: 'choices',
          allowMulti,
          getPicked: () => {
            const inputs = Array.from(
              block.querySelectorAll(`input[name='${name}']`)
            );
            const picked = inputs
              .filter(input => input.checked)
              .map(input => input.value);
            if (!expectedIsIndex) {
              return picked.map(index =>
                normalize(question.choices[Number(index)] || '')
              );
            }
            return picked;
          },
          expected: expectedIsIndex
            ? answers
            : answers.map(answer => normalize(answer)),
        });
      } else {
        const promptId = uniqueInputId(`${task.id || 'context-label'}-${idx}`);
        prompt.setAttribute('id', promptId);
        const inputId = uniqueInputId(`${task.id || 'context-text'}-${idx}`);
        const input = el('textarea', {
          id: inputId,
          rows: 2,
          style:
            'width:100%;max-width:640px;padding:6px 8px;border:1px solid #cbd5e1;border-radius:6px;',
        });
        input.setAttribute('aria-labelledby', promptId);
        block.appendChild(input);
        blocks.push({
          block,
          type: 'text',
          input,
          expected: answers.map(answer => normalize(answer)),
        });
      }

      if (question.explanation) {
        block.appendChild(
          el(
            'div',
            {
              class: 'muted',
              style: 'display:none;margin-top:6px;color:#475569;',
            },
            question.explanation
          )
        );
      }

      container.appendChild(block);
    });

    const result = el('div', {
      style: 'margin-top:8px;font-weight:600;',
    });
    const button = el(
      'button',
      { type: 'button', class: 'btn primary', style: 'margin-top:8px;' },
      'Перевірити'
    );

    button.addEventListener('click', () => {
      let correct = 0;
      blocks.forEach(entry => {
        let ok = false;
        if (entry.type === 'choices') {
          const picked = entry.getPicked().sort();
          const expected = entry.expected.slice().sort();
          ok =
            picked.length === expected.length &&
            picked.every((value, index) => value === expected[index]);
        } else {
          const value = normalize(entry.input.value);
          ok = entry.expected.length
            ? entry.expected.includes(value)
            : Boolean(value);
        }
        entry.block.style.borderColor = ok ? '#10b981' : '#ef4444';
        const explanation = entry.block.querySelector('.muted');
        if (explanation) explanation.style.display = ok ? 'none' : 'block';
        if (ok) correct++;
      });
      result.textContent = `Результат: ${correct}/${blocks.length}`;
    });

    container.appendChild(button);
    container.appendChild(result);
  }

  function renderTask(container, task, taskKey, options = {}) {
    const { showRemove = true } = options;
    const keyBase =
      taskKey ||
      (task && task.id
        ? String(task.id)
        : `task-${Math.random().toString(16).slice(2, 8)}`);
    const box = el('section', {
      style: 'position:relative;margin:18px 0 26px;',
      'data-task-id': task && task.id ? String(task.id) : '',
      'data-task-key': keyBase,
    });
    const controls = el('div', {
      style:
        'position:absolute;top:6px;right:6px;display:flex;gap:6px;align-items:center;z-index:5;',
    });

    const {
      button: shareBtn,
      panel: sharePanel,
      unregister: unregisterShareControl,
    } = createShareControl({
      context: task,
      onShare: ({ student, context }) => {
        const lessonId = window.location.search.slice(8);
        const heading = document.querySelector('h1');
        const lessonName = heading ? heading.textContent : '';

        const homework = {
          lessonId,
          userEmail: student.email,
          lessonName,
          homeworkType: 'task',
          homeworkData: JSON.stringify(context),
        };

        return addHomework(homework);
      },
    });

    controls.appendChild(shareBtn);
    // Subtle remove button (top-right), hidden until hover/focus
    if (showRemove) {
      const removeBtn = el(
        'button',
        {
          type: 'button',
          title: 'Видалити завдання',
          'aria-label': 'Видалити завдання',
          class: 'for-admin',
          style:
            'border:none;background:transparent;color:#94a3b8;cursor:pointer;padding:2px;line-height:1;font-size:14px;opacity:0.6;',
          onmouseenter: () => (removeBtn.style.opacity = '1'),
          onmouseleave: () => (removeBtn.style.opacity = '0.6'),
          onclick: () => {
            if (isSharePanelActive(sharePanel)) {
              closeActiveSharePanel();
            }
            document.dispatchEvent(
              new CustomEvent('practice:taskRemoved', {
                detail: { key: keyBase, task },
              })
            );
            unregisterShareControl();
            box.remove();
          },
        },
        '✕'
      );
      controls.appendChild(removeBtn);
    }
    box.appendChild(controls);
    box.appendChild(sharePanel);
    if (task.title) box.appendChild(el('h3', {}, task.title));
    const rawType = task && task.type;
    const normalizedType = String(rawType || '')
      .trim()
      .toLowerCase();
    switch (normalizedType) {
      case 'mcq':
        renderMCQ(box, task);
        break;
      case 'gap':
        renderGap(box, task);
        break;
      case 'match':
        renderMatch(box, task);
        break;
      case 'context':
        renderContext(box, task);
        break;
      case 'transform':
        renderTransform(box, task);
        break;
      case 'error':
        renderError(box, task);
        break;
      case 'order':
        renderOrder(box, task);
        break;
      case 'short':
        renderShort(box, task);
        break;
      case 'roleplay':
        renderRoleplay(box, task);
        break;
      case 'dialogue-gap':
        renderDialogueGap(box, task);
        break;
      case 'dialogue-order':
        renderDialogueOrder(box, task);
        break;
      case 'truefalse':
        renderTrueFalse(box, task);
        break;
      case 'definition-match': {
        const matchTask = {
          ...task,
          prompt: task.prompt || 'Поєднай слово з визначенням',
        };
        renderMatch(box, matchTask);
        break;
      }
      case 'synonym-clue':
        renderSynonymClue(box, task);
        break;
      case 'scramble':
        renderScramble(box, task);
        break;
      case 'wordpairs': {
        const pairsTask = {
          ...task,
          prompt: task.prompt || 'Поєднай форму в однині та множині',
        };
        renderMatch(box, pairsTask);
        break;
      }
      case 'odd-one-out':
        renderOddOneOut(box, task);
        break;
      case 'open':
        renderOpen(box, task);
        break;
      case 'writing':
        renderWriting(box, task);
        break;
      case 'audio':
        renderAudio(box, task);
        break;
      default:
        box.appendChild(
          el('div', { class: 'muted' }, `Невідомий тип завдання: ${rawType}`)
        );
    }
    container.appendChild(box);
    return box;
  }

  // Expose minimal public API for dynamic appends
  function appendTask(task, meta = {}) {
    const root = ensurePracticeContainer();
    if (!root || !task) return;
    const body = root.querySelector('#practice-body') || root;
    const allowRemove = meta.showRemove !== false;
    renderTask(body, task, meta.key, { showRemove: allowRemove });
  }

  function renderTaskList(target, tasks, options = {}) {
    if (!target) return null;
    const entries = Array.isArray(tasks) ? tasks.filter(Boolean) : [];
    const {
      title,
      level,
      description,
      keyPrefix = 'inline',
      showEmptyNote = false,
      showRemove = false,
    } = options;

    if (!entries.length) {
      if (showEmptyNote) {
        const note = el(
          'p',
          { class: 'muted practice-inline__empty' },
          'Практика для цієї теми поки відсутня.'
        );
        target.appendChild(note);
      }
      return null;
    }

    const wrapper = el('section', { class: 'practice-inline' });

    if (title || level || description) {
      const header = el('header', { class: 'practice-inline__header' });
      if (title) {
        header.appendChild(
          el('h3', { class: 'practice-inline__title' }, title)
        );
      }
      if (level) {
        header.appendChild(
          el('span', { class: 'practice-inline__badge' }, level)
        );
      }
      if (description) {
        header.appendChild(
          el('p', { class: 'practice-inline__description muted' }, description)
        );
      }
      wrapper.appendChild(header);
    }

    entries.forEach((task, index) => {
      const key = `${keyPrefix}-${index}`;
      renderTask(wrapper, task, key, { showRemove });
    });

    target.appendChild(wrapper);
    document.dispatchEvent(
      new CustomEvent('practice:inlineRendered', {
        detail: {
          tasks: entries,
          container: target,
          options,
        },
      })
    );
    return wrapper;
  }

  function createTaskElement(task, meta = {}) {
    if (!task) return null;
    const fragment = document.createDocumentFragment();
    const allowRemove = meta.showRemove !== false;
    const element = renderTask(fragment, task, meta.key, {
      showRemove: allowRemove,
    });
    return element;
  }

  async function fetchPracticeCandidate(path) {
    if (!path) return null;
    const resolvedPath = resolveAssetPath(path);
    try {
      const res = await fetch(resolvedPath, { cache: 'no-store' });
      if (!res.ok) return null;
      return await res.json();
    } catch (error) {
      return null;
    }
  }

  async function loadData() {
    const inline = document.getElementById('practice-data');
    if (inline) {
      try {
        return JSON.parse(inline.textContent);
      } catch (error) {
        return null;
      }
    }

    const context = window.lessonContext || {};
    const candidates = new Set();

    if (context.id) {
      candidates.add(`data/practice/${context.id}.json`);
    }

    if (context.htmlPath) {
      const normalized = String(context.htmlPath)
        .replace(/^\.\/?/, '')
        .replace(/\.html?$/i, '');
      if (normalized) {
        candidates.add(`data/practice/${normalized}.json`);
        const segments = normalized.split('/');
        const last = segments[segments.length - 1];
        if (last) {
          candidates.add(`data/practice/${last}.json`);
        }
      }
    }

    for (const candidate of candidates) {
      const data = await fetchPracticeCandidate(candidate);
      if (data) return data;
    }

    const fallbackPath = derivePracticePath();
    if (!fallbackPath) return null;
    return await fetchPracticeCandidate(fallbackPath);
  }

  // ============ Extra renderers (moved inside closure) ============
  function renderTransform(container, task) {
    container.appendChild(
      el('h3', {}, task.prompt || 'Transform the sentence')
    );
    const items = [];
    (task.items || []).forEach((it, idx) => {
      const row = el('div', {
        style:
          'margin-bottom:10px;padding:10px;border:1px solid #e5e7eb;border-radius:10px;background:#fff;',
      });
      row.appendChild(
        el('div', { style: 'margin-bottom:6px;font-weight:600;' }, it.q)
      );
      const inputId = uniqueInputId(`${task.id || 'transform'}-${idx}`);
      const input = el('input', {
        type: 'text',
        id: inputId,
        style:
          'width:100%;max-width:640px;padding:6px 8px;border:1px solid #cbd5e1;border-radius:6px;',
      });
      row.appendChild(input);
      if (it.hint) row.appendChild(makeHint(it.hint));
      items.push({
        row,
        input,
        answers: (it.answer || []).map(a => normalize(a)),
      });
      container.appendChild(row);
    });
    const result = el('div', { style: 'margin-top:8px;font-weight:600;' });
    const btn = el(
      'button',
      { type: 'button', class: 'btn primary', style: 'margin-top:8px;' },
      'Перевірити'
    );
    btn.addEventListener('click', () => {
      let correct = 0;
      items.forEach(({ row, input, answers }) => {
        const ok = answers.includes(normalize(input.value));
        row.style.borderColor = ok ? '#10b981' : '#ef4444';
        if (ok) correct++;
      });
      result.textContent = `Результат: ${correct}/${items.length}`;
    });
    container.appendChild(btn);
    container.appendChild(result);
  }

  function renderError(container, task) {
    container.appendChild(
      el('h3', {}, task.prompt || 'Find and correct the error')
    );
    const items = [];
    (task.items || []).forEach((it, idx) => {
      const row = el('div', {
        style:
          'margin-bottom:10px;padding:10px;border:1px solid #e5e7eb;border-radius:10px;background:#fff;',
      });
      row.appendChild(
        el('div', { style: 'margin-bottom:6px;font-weight:600;' }, it.q)
      );
      const inputId = uniqueInputId(`${task.id || 'error'}-${idx}`);
      const input = el('input', {
        type: 'text',
        id: inputId,
        style:
          'width:100%;max-width:640px;padding:6px 8px;border:1px solid #cbd5e1;border-radius:6px;',
      });
      row.appendChild(input);
      if (it.hint) row.appendChild(makeHint(it.hint));
      items.push({
        row,
        input,
        answers: (it.answer || []).map(a => normalize(a)),
      });
      container.appendChild(row);
    });
    const result = el('div', { style: 'margin-top:8px;font-weight:600;' });
    const btn = el(
      'button',
      { type: 'button', class: 'btn primary', style: 'margin-top:8px;' },
      'Перевірити'
    );
    btn.addEventListener('click', () => {
      let correct = 0;
      items.forEach(({ row, input, answers }) => {
        const ok = answers.includes(normalize(input.value));
        row.style.borderColor = ok ? '#10b981' : '#ef4444';
        if (ok) correct++;
      });
      result.textContent = `Результат: ${correct}/${items.length}`;
    });
    container.appendChild(btn);
    container.appendChild(result);
  }

  function renderOrder(container, task) {
    container.appendChild(
      el('h3', {}, task.prompt || 'Put the words in order')
    );
    const blocks = [];
    (task.items || []).forEach((it, idx) => {
      const correctStr = normalize(
        Array.isArray(it.answer) ? it.answer.join(' ') : it.answer
      );
      const pool = shuffle((it.tokens || []).slice());
      const row = el('div', {
        style:
          'margin:10px 0;padding:10px;border:1px solid #e5e7eb;border-radius:10px;background:#fff;',
      });
      const poolWrap = el('div', {
        style: 'display:flex;flex-wrap:wrap;gap:6px;margin-bottom:6px;',
      });
      const outWrap = el('div', {
        style:
          'display:flex;flex-wrap:wrap;gap:6px;min-height:36px;padding:6px;border:1px dashed #cbd5e1;border-radius:8px;background:#f8fafc;',
      });
      const used = new Set();
      function makeBtn(word, i) {
        const b = el(
          'button',
          {
            type: 'button',
            style:
              'padding:4px 8px;border:1px solid #cbd5e1;border-radius:6px;background:#fff;cursor:pointer;',
          },
          word
        );
        b.addEventListener('click', () => {
          if (used.has(i)) return;
          used.add(i);
          b.style.opacity = 0.5;
          outWrap.appendChild(
            el(
              'span',
              {
                class: 'chip',
                style:
                  'padding:4px 8px;border:1px solid #cbd5e1;border-radius:6px;background:#fff;',
              },
              word
            )
          );
        });
        return b;
      }
      pool.forEach((w, i) => poolWrap.appendChild(makeBtn(w, `${idx}-${i}`)));
      const actions = el('div', {
        style: 'margin-top:6px;display:flex;gap:8px;',
      });
      const reset = el('button', { type: 'button', class: 'btn' }, 'Скинути');
      reset.addEventListener('click', () => {
        used.clear();
        outWrap.innerHTML = '';
        Array.from(poolWrap.children).forEach(ch => (ch.style.opacity = 1));
        row.style.borderColor = '#e5e7eb';
      });
      actions.appendChild(reset);
      row.appendChild(
        el('div', { style: 'margin-bottom:6px;font-weight:600;' }, it.q || '')
      );
      row.appendChild(poolWrap);
      row.appendChild(outWrap);
      row.appendChild(actions);
      blocks.push({ row, outWrap, correctStr });
      container.appendChild(row);
    });
    const result = el('div', { style: 'margin-top:8px;font-weight:600;' });
    const btn = el(
      'button',
      { type: 'button', class: 'btn primary', style: 'margin-top:8px;' },
      'Перевірити'
    );
    btn.addEventListener('click', () => {
      let correct = 0;
      blocks.forEach(({ row, outWrap, correctStr }) => {
        const built = normalize(
          Array.from(outWrap.querySelectorAll('.chip'))
            .map(n => n.textContent)
            .join(' ')
        );
        const ok = built === correctStr;
        row.style.borderColor = ok ? '#10b981' : '#ef4444';
        if (ok) correct++;
      });
      result.textContent = `Результат: ${correct}/${blocks.length}`;
    });
    container.appendChild(btn);
    container.appendChild(result);
  }

  function renderShort(container, task) {
    container.appendChild(el('h3', {}, task.prompt || 'Short answer'));
    const items = [];
    (task.items || []).forEach((it, index) => {
      const row = el('div', {
        style:
          'margin-bottom:10px;padding:10px;border:1px solid #e5e7eb;border-radius:10px;background:#fff;',
      });
      const prompt = el(
        'div',
        { style: 'margin-bottom:6px;font-weight:600;' },
        it.q
      );
      row.appendChild(prompt);
      const promptId = uniqueInputId(`${task.id || 'short-label'}-${index}`);
      prompt.setAttribute('id', promptId);
      const inputId = uniqueInputId(`${task.id || 'short-text'}-${index}`);
      const input = el('textarea', {
        id: inputId,
        rows: 3,
        style:
          'width:100%;max-width:720px;padding:6px 8px;border:1px solid #cbd5e1;border-radius:6px;',
      });
      input.setAttribute('aria-labelledby', promptId);
      row.appendChild(input);
      items.push({
        row,
        input,
        keywords: (it.keywords || []).map(k => normalize(k)),
      });
      container.appendChild(row);
    });
    const result = el('div', { style: 'margin-top:8px;font-weight:600;' });
    const btn = el(
      'button',
      { type: 'button', class: 'btn primary', style: 'margin-top:8px;' },
      'Перевірити'
    );
    btn.addEventListener('click', () => {
      let sum = 0,
        total = 0;
      items.forEach(({ row, input, keywords }) => {
        const text = normalize(input.value);
        const matched = keywords.filter(k => text.includes(k)).length;
        sum += matched;
        total += keywords.length;
        row.style.borderColor =
          matched === keywords.length
            ? '#10b981'
            : matched > 0
            ? '#f59e0b'
            : '#ef4444';
        const info =
          row.querySelector('.short-info') ||
          el('div', {
            class: 'short-info',
            style: 'margin-top:6px;color:#475569;',
          });
        info.textContent = `Збіги ключових слів: ${matched}/${keywords.length}`;
        if (!row.contains(info)) row.appendChild(info);
      });
      result.textContent = `Загальний збіг ключових слів: ${sum}/${total}`;
    });
    container.appendChild(btn);
    container.appendChild(result);
  }

  function renderOpen(container, task) {
    container.appendChild(
      el('h3', {}, task.prompt || 'Відповіді у вільній формі')
    );

    const items = Array.isArray(task && task.items)
      ? task.items.filter(Boolean)
      : [];
    if (items.length) {
      const list = el('div', {
        style: 'display:flex;flex-direction:column;gap:12px;margin-top:12px;',
      });
      items.forEach((item, index) => {
        const entry = el('div', {
          style:
            'padding:12px;border:1px solid #e5e7eb;border-radius:10px;background:#fff;',
        });
        const situation =
          (item && (item.situation || item.prompt || item.q)) ||
          `Ситуація ${index + 1}`;
        entry.appendChild(
          el(
            'div',
            { style: 'margin:0 0 6px;font-weight:600;color:#0f172a;' },
            situation
          )
        );

        const examples =
          item && Array.isArray(item.example_answers)
            ? item.example_answers.filter(Boolean)
            : [];
        if (examples.length) {
          entry.appendChild(
            el(
              'div',
              { class: 'muted', style: 'margin:0 0 6px;color:#64748b;' },
              'Приклад відповіді:'
            )
          );
          const chips = el('div', {
            style: 'display:flex;flex-wrap:wrap;gap:8px;',
          });
          examples.forEach(answer => {
            chips.appendChild(
              el(
                'span',
                {
                  style:
                    'display:inline-flex;align-items:center;padding:4px 10px;border-radius:9999px;background:#e2e8f0;color:#0f172a;font-size:14px;',
                },
                answer
              )
            );
          });
          entry.appendChild(chips);
        }
        list.appendChild(entry);
      });
      container.appendChild(list);
    }

    const criteria =
      task && task.scoring && Array.isArray(task.scoring.criteria)
        ? task.scoring.criteria.filter(Boolean)
        : [];
    if (criteria.length) {
      const scoringBox = el('div', {
        style:
          'margin-top:16px;padding:14px;border:1px dashed #cbd5e1;border-radius:10px;background:#f8fafc;',
      });
      scoringBox.appendChild(
        el(
          'h4',
          {
            style:
              'margin:0 0 8px;font-size:16px;font-weight:600;color:#0f172a;',
          },
          'Критерії оцінювання'
        )
      );
      const list = el('ul', {
        style: 'margin:0;padding-left:18px;color:#475569;',
      });
      criteria.forEach(criterion => {
        list.appendChild(el('li', { style: 'margin:4px 0;' }, criterion));
      });
      scoringBox.appendChild(list);
      container.appendChild(scoringBox);
    }
  }

  function renderRoleplay(container, task) {
    container.appendChild(el('h3', {}, task.prompt || 'Role-play scenario'));

    const scenario =
      task && typeof task.scenario === 'object' ? task.scenario : {};
    const infoBox = el('div', {
      style:
        'margin:12px 0;padding:14px;border:1px solid #cbd5e1;border-radius:10px;background:#f8fafc;',
    });
    let infoAdded = false;

    if (scenario.setting) {
      infoBox.appendChild(
        el(
          'p',
          { style: 'margin:0 0 6px;font-weight:600;' },
          `Локація: ${scenario.setting}`
        )
      );
      infoAdded = true;
    }

    if (scenario.summary) {
      infoBox.appendChild(
        el('p', { style: 'margin:0;color:#334155;' }, scenario.summary)
      );
      infoAdded = true;
    }

    if (infoAdded) {
      container.appendChild(infoBox);
    }

    const roles = Array.isArray(scenario.roles) ? scenario.roles : [];
    if (roles.length) {
      const rolesWrap = el('div', {
        style:
          'display:grid;gap:12px;margin-top:12px;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));',
      });
      roles.forEach((role, index) => {
        const name = (role && role.name) || `Student ${index + 1}`;
        const roleBox = el(
          'div',
          {
            style:
              'padding:14px;border:1px solid #e5e7eb;border-radius:10px;background:#fff;box-shadow:0 1px 0 rgba(148, 163, 184, 0.2);',
          },
          el('div', { style: 'font-weight:600;margin-bottom:6px;' }, name)
        );

        if (role && role.goal) {
          roleBox.appendChild(
            el(
              'p',
              { style: 'margin:0 0 6px;color:#0f172a;' },
              `Мета: ${role.goal}`
            )
          );
        }

        const rawDetails =
          role && Array.isArray(role.details)
            ? role.details
            : typeof role?.details === 'string'
            ? role.details.split(/[;,\n]/)
            : [];
        const details = rawDetails
          .map(item => String(item || '').trim())
          .filter(Boolean);
        if (details.length === 1) {
          roleBox.appendChild(
            el('p', { style: 'margin:0;color:#475569;' }, details[0])
          );
        } else if (details.length > 1) {
          const list = el('ul', {
            style: 'margin:0;padding-left:18px;color:#475569;',
          });
          details.forEach(detail => {
            list.appendChild(el('li', { style: 'margin:2px 0;' }, detail));
          });
          roleBox.appendChild(list);
        }

        rolesWrap.appendChild(roleBox);
      });
      container.appendChild(rolesWrap);
    }

    const steps = Array.isArray(scenario.steps) ? scenario.steps : [];
    if (steps.length) {
      const stepsWrap = el('div', {
        style:
          'margin-top:16px;padding:14px;border:1px solid #e5e7eb;border-radius:10px;background:#fff;',
      });
      stepsWrap.appendChild(
        el(
          'h4',
          {
            style:
              'margin:0 0 6px;font-size:16px;font-weight:600;color:#0f172a;',
          },
          'Покроковий план діалогу'
        )
      );
      const list = el('ol', {
        style: 'margin:0 0 0 18px;padding:0;color:#475569;',
      });
      steps.forEach(step => {
        if (!step) return;
        list.appendChild(el('li', { style: 'margin:4px 0;' }, step));
      });
      stepsWrap.appendChild(list);
      container.appendChild(stepsWrap);
    }

    const phrases = Array.isArray(task && task.phrases) ? task.phrases : [];
    if (phrases.length) {
      container.appendChild(
        el(
          'h4',
          {
            style:
              'margin:18px 0 8px;font-size:16px;font-weight:600;color:#0f172a;',
          },
          'Корисні фрази для діалогу'
        )
      );
      const list = el('div', {
        style: 'display:flex;flex-direction:column;gap:8px;',
      });
      phrases.forEach((item, index) => {
        const phraseText =
          typeof item === 'string'
            ? item
            : item && (item.phrase || item.text || item.value || '');
        const translation =
          item && typeof item === 'object'
            ? item.translation || item.note || item.ua || item.uk || ''
            : '';
        if (!phraseText) return;
        const id = uniqueInputId(`phrase-${index}`);
        list.appendChild(
          el(
            'label',
            {
              for: id,
              style:
                'display:flex;gap:10px;align-items:flex-start;padding:10px 12px;border:1px solid #e5e7eb;border-radius:10px;background:#fff;',
            },
            el('input', { id, type: 'checkbox', style: 'margin-top:4px;' }),
            el(
              'div',
              {},
              el(
                'span',
                { style: 'font-weight:600;color:#0f172a;' },
                phraseText
              ),
              translation
                ? el(
                    'span',
                    {
                      class: 'muted',
                      style: 'display:block;margin-top:4px;color:#475569;',
                    },
                    translation
                  )
                : null
            )
          )
        );
      });
      container.appendChild(list);
    }
  }

  function renderDialogueGap(container, task) {
    container.appendChild(
      el('h3', {}, task.prompt || 'Заповніть пропуски у діалозі')
    );

    const answers = Array.isArray(task?.answers)
      ? task.answers.map(item => normalize(item))
      : [];
    const blanks = [];
    let activeBlank = null;

    function setActive(blank) {
      if (activeBlank && activeBlank !== blank) {
        activeBlank.style.boxShadow = 'none';
      }
      if (blank && activeBlank !== blank) {
        blank.style.boxShadow = '0 0 0 2px rgba(37, 99, 235, 0.35)';
        activeBlank = blank;
      } else {
        if (blank) blank.style.boxShadow = 'none';
        activeBlank = null;
      }
    }

    function clearBlank(blank) {
      if (!blank) return;
      blank.dataset.value = '';
      blank.textContent = '___';
      blank.style.borderColor = '#cbd5e1';
      blank.style.background = '#fff';
      blank.style.boxShadow = 'none';
    }

    const bank = el('div', {
      style:
        'display:flex;flex-wrap:wrap;gap:8px;margin:12px 0;padding:10px;border:1px solid #e2e8f0;border-radius:10px;background:#f8fafc;',
    });
    const words = Array.isArray(task?.words) ? task.words : [];
    const seenWords = new Set();
    const uniqueWords = [];
    words.forEach(word => {
      const value = String(word || '').trim();
      if (!value) return;
      const signature = normalize(value);
      if (seenWords.has(signature)) return;
      seenWords.add(signature);
      uniqueWords.push(value);
    });

    uniqueWords.forEach(value => {
      const btn = el(
        'button',
        {
          type: 'button',
          class: 'btn',
          style:
            'padding:6px 10px;border:1px solid #94a3b8;border-radius:999px;background:#fff;color:#0f172a;cursor:pointer;font-size:14px;line-height:1;',
          onclick: () => {
            const target =
              activeBlank || blanks.find(blank => !blank.dataset.value);
            if (!target) return;

            target.dataset.value = value;
            target.textContent = value;
            target.style.borderColor = '#2563eb';
            target.style.background = '#eef2ff';
            setActive(null);
          },
        },
        value
      );
      btn.dataset.word = value;
      bank.appendChild(btn);
    });
    if (bank.children.length) {
      container.appendChild(bank);
    }

    const dialogueWrap = el('div', {
      style: 'display:flex;flex-direction:column;gap:10px;',
    });
    const dialogue = Array.isArray(task?.dialogue) ? task.dialogue : [];
    let blankIndex = 0;
    dialogue.forEach(turn => {
      if (!turn) return;
      const speaker = turn.speaker || turn.role || '';
      const line = turn.line || turn.text || '';
      const row = el(
        'div',
        {
          style:
            'padding:12px;border:1px solid #e5e7eb;border-radius:10px;background:#fff;display:flex;gap:10px;align-items:flex-start;',
        },
        speaker
          ? el('strong', { style: 'min-width:90px;' }, `${speaker}:`)
          : null
      );
      const textWrap = el('div', {
        style: 'display:flex;flex-wrap:wrap;gap:6px;align-items:center;',
      });
      const parts = String(line || '').split(/___/);
      parts.forEach((part, idx) => {
        if (part) {
          textWrap.appendChild(el('span', {}, part));
        }
        if (idx < parts.length - 1) {
          const expected = answers[blankIndex] || '';
          const blank = el(
            'button',
            {
              type: 'button',
              style:
                'min-width:52px;padding:4px 10px;border:1px solid #cbd5e1;border-radius:8px;background:#fff;color:#0f172a;cursor:pointer;',
              onclick: () => {
                if (blank.dataset.value) {
                  clearBlank(blank);
                  setActive(blank);
                  return;
                }
                if (activeBlank === blank) {
                  setActive(null);
                } else {
                  setActive(blank);
                }
              },
              ondblclick: () => {
                clearBlank(blank);
                setActive(null);
              },
            },
            '___'
          );
          blank.dataset.expected = expected;
          blank.dataset.index = String(blankIndex);
          blanks.push(blank);
          blankIndex += 1;
          textWrap.appendChild(blank);
        }
      });
      row.appendChild(textWrap);
      dialogueWrap.appendChild(row);
    });

    container.appendChild(dialogueWrap);

    const actions = el('div', {
      style:
        'margin-top:14px;display:flex;gap:10px;flex-wrap:wrap;align-items:center;',
    });
    const checkBtn = el(
      'button',
      { type: 'button', class: 'btn primary' },
      'Перевірити'
    );
    const resetBtn = el('button', { type: 'button', class: 'btn' }, 'Скинути');
    const result = el('div', {
      style: 'font-weight:600;color:#0f172a;',
    });

    checkBtn.addEventListener('click', () => {
      let correct = 0;
      blanks.forEach(blank => {
        const expected = blank.dataset.expected || '';
        const value = normalize(blank.dataset.value || blank.textContent || '');
        const ok = expected ? value === expected : Boolean(value);
        blank.style.borderColor = ok ? '#10b981' : '#ef4444';
        blank.style.background = ok ? '#ecfdf5' : '#fee2e2';
        if (ok) correct += 1;
      });
      if (blanks.length) {
        result.textContent = `Результат: ${correct}/${blanks.length}`;
      } else {
        result.textContent = '';
      }
    });

    resetBtn.addEventListener('click', () => {
      blanks.forEach(blank => clearBlank(blank));
      result.textContent = '';
      setActive(null);
    });

    actions.appendChild(checkBtn);
    actions.appendChild(resetBtn);
    actions.appendChild(result);
    container.appendChild(actions);
  }

  function renderDialogueOrder(container, task) {
    container.appendChild(el('h3', {}, task.prompt || 'Упорядкуйте діалог'));

    const lines = Array.isArray(task?.lines)
      ? task.lines.map(line => ({
          speaker: line?.speaker || line?.role || '',
          text: line?.line || line?.text || '',
        }))
      : [];
    const solution = Array.isArray(task?.solution)
      ? task.solution.map(value => Number.parseInt(value, 10))
      : lines.map((_, index) => index);

    const poolWrap = el('div', {
      style:
        'display:flex;flex-direction:column;gap:8px;margin-top:10px;padding:10px;border:1px solid #e2e8f0;border-radius:10px;background:#f8fafc;',
    });
    const outWrap = el('div', {
      style:
        'margin-top:14px;padding:12px;border:1px dashed #cbd5e1;border-radius:10px;min-height:80px;display:flex;flex-direction:column;gap:8px;',
    });
    const used = new Set();

    function makeLabel({ speaker, text }) {
      const content = speaker ? `${speaker}: ${text}` : text;
      return content.trim();
    }

    function removeChip(chip) {
      if (!chip) return;
      const index = Number.parseInt(chip.dataset.index || '-1', 10);
      const sourceId = chip.dataset.buttonId;
      if (sourceId) {
        const btn = poolWrap.querySelector(`[data-id="${sourceId}"]`);
        if (btn) {
          btn.disabled = false;
          btn.style.opacity = '1';
        }
      }
      used.delete(index);
      chip.remove();
    }

    function appendChip(index, label, sourceId) {
      const chip = el(
        'div',
        {
          class: 'dialogue-chip',
          style:
            'padding:10px;border:1px solid #94a3b8;border-radius:10px;background:#fff;display:flex;justify-content:space-between;align-items:center;gap:12px;cursor:pointer;',
          onclick: event => {
            event.stopPropagation();
            removeChip(chip);
          },
        },
        el('span', {}, label),
        el('span', { style: 'color:#94a3b8;font-size:12px;' }, '×')
      );
      chip.dataset.index = String(index);
      chip.dataset.buttonId = sourceId;
      outWrap.appendChild(chip);
    }

    const shuffledIndices = shuffle(lines.map((_, index) => index));
    shuffledIndices.forEach(index => {
      const line = lines[index];
      const label = makeLabel(line);
      const buttonId = `line-${index}-${Math.random()
        .toString(36)
        .slice(2, 6)}`;
      const btn = el(
        'button',
        {
          type: 'button',
          class: 'btn',
          style:
            'text-align:left;padding:10px;border:1px solid #cbd5e1;border-radius:10px;background:#fff;color:#0f172a;cursor:pointer;',
          onclick: () => {
            if (used.has(index)) return;
            used.add(index);
            btn.disabled = true;
            btn.style.opacity = '0.5';
            appendChip(index, label, buttonId);
          },
          'data-id': buttonId,
        },
        label
      );
      poolWrap.appendChild(btn);
    });

    container.appendChild(poolWrap);
    container.appendChild(outWrap);

    const actions = el('div', {
      style:
        'margin-top:14px;display:flex;gap:10px;flex-wrap:wrap;align-items:center;',
    });
    const checkBtn = el(
      'button',
      { type: 'button', class: 'btn primary' },
      'Перевірити'
    );
    const resetBtn = el('button', { type: 'button', class: 'btn' }, 'Скинути');
    const result = el('div', { style: 'font-weight:600;color:#0f172a;' });

    checkBtn.addEventListener('click', () => {
      const built = Array.from(outWrap.children).map(chip =>
        Number.parseInt(chip.dataset.index || '-1', 10)
      );
      const expected = solution.slice();
      const ok =
        built.length === expected.length &&
        built.every((value, idx) => value === expected[idx]);
      outWrap.style.borderColor = ok ? '#10b981' : '#ef4444';
      result.textContent = ok
        ? 'Діалог впорядковано правильно!'
        : `Поточний порядок: ${built.length}/${expected.length} реплік. Перевірте послідовність.`;
    });

    resetBtn.addEventListener('click', () => {
      Array.from(outWrap.children).forEach(chip => removeChip(chip));
      const buttons = poolWrap.querySelectorAll('button');
      buttons.forEach(btn => {
        btn.disabled = false;
        btn.style.opacity = '1';
      });
      used.clear();
      outWrap.style.borderColor = '#cbd5e1';
      result.textContent = '';
    });

    actions.appendChild(checkBtn);
    actions.appendChild(resetBtn);
    actions.appendChild(result);
    container.appendChild(actions);
  }

  function renderTrueFalse(container, task) {
    container.appendChild(el('h3', {}, task.prompt || 'Обери True або False'));

    const rows = [];
    const items = Array.isArray(task?.items) ? task.items : [];
    items.forEach((item, index) => {
      if (!item || !item.statement) return;
      const row = el(
        'div',
        {
          style:
            'margin:8px 0;padding:12px;border:1px solid #e5e7eb;border-radius:10px;background:#fff;',
        },
        el('p', { style: 'margin:0 0 8px;font-weight:600;' }, item.statement)
      );
      const name = `${task.id || 'tf'}-${index}`;
      const expected = Boolean(item.answer);
      const trueId = uniqueInputId(`${name}-true`);
      const trueLabel = el(
        'label',
        {
          for: trueId,
          style:
            'display:inline-flex;align-items:center;gap:6px;margin-right:16px;',
        },
        el('input', { type: 'radio', name, value: 'true', id: trueId }),
        'True'
      );
      const falseId = uniqueInputId(`${name}-false`);
      const falseLabel = el(
        'label',
        {
          for: falseId,
          style: 'display:inline-flex;align-items:center;gap:6px;',
        },
        el('input', { type: 'radio', name, value: 'false', id: falseId }),
        'False'
      );
      const options = el('div', { style: 'display:flex;align-items:center;' });
      options.appendChild(trueLabel);
      options.appendChild(falseLabel);
      row.appendChild(options);
      rows.push({ row, name, expected });
      container.appendChild(row);
    });

    if (!rows.length) return;

    const actions = el('div', {
      style:
        'margin-top:14px;display:flex;gap:10px;align-items:center;flex-wrap:wrap;',
    });
    const btn = el(
      'button',
      { type: 'button', class: 'btn primary' },
      'Перевірити'
    );
    const result = el('div', { style: 'font-weight:600;color:#0f172a;' });
    btn.addEventListener('click', () => {
      let correct = 0;
      rows.forEach(({ row, name, expected }) => {
        const picked = row.querySelector(`input[name="${name}"]:checked`);
        const ok = picked ? picked.value === String(expected) : false;
        row.style.borderColor = ok ? '#10b981' : '#ef4444';
        if (ok) correct += 1;
      });
      result.textContent = `Результат: ${correct}/${rows.length}`;
    });
    actions.appendChild(btn);
    actions.appendChild(result);
    container.appendChild(actions);
  }

  function renderSynonymClue(container, task) {
    container.appendChild(
      el('h3', {}, task.prompt || 'Доберіть слово за описом')
    );

    const wordBank = Array.isArray(task?.wordBank) ? task.wordBank : [];
    if (wordBank.length) {
      const bank = el('div', {
        style:
          'margin:8px 0 12px;padding:10px;border:1px solid #e2e8f0;border-radius:10px;background:#f8fafc;display:flex;flex-wrap:wrap;gap:8px;',
      });
      wordBank.forEach(word => {
        const value = String(word || '').trim();
        if (!value) return;
        bank.appendChild(
          el(
            'span',
            {
              style:
                'padding:6px 10px;border:1px solid #94a3b8;border-radius:999px;background:#fff;font-size:14px;',
            },
            value
          )
        );
      });
      container.appendChild(bank);
    }

    const rows = [];
    const items = Array.isArray(task?.items) ? task.items : [];
    items.forEach((item, index) => {
      if (!item || !item.clue) return;
      const row = el('div', {
        style:
          'margin-bottom:10px;padding:12px;border:1px solid #e5e7eb;border-radius:10px;background:#fff;',
      });
      row.appendChild(
        el('p', { style: 'margin:0 0 6px;font-weight:600;' }, item.clue)
      );
      const inputId = uniqueInputId(`${task.id || 'synonym'}-${index}`);
      const input = el('input', {
        type: 'text',
        id: inputId,
        style:
          'width:100%;max-width:320px;padding:6px 8px;border:1px solid #cbd5e1;border-radius:6px;',
      });
      row.appendChild(input);
      const answers = Array.isArray(item?.answers)
        ? item.answers.map(answer => normalize(answer))
        : Array.isArray(item?.answer)
        ? item.answer.map(answer => normalize(answer))
        : item?.answer
        ? [normalize(item.answer)]
        : [];
      rows.push({ row, input, answers });
      container.appendChild(row);
    });

    if (!rows.length) return;

    const result = el('div', { style: 'font-weight:600;color:#0f172a;' });
    const btn = el(
      'button',
      { type: 'button', class: 'btn primary' },
      'Перевірити'
    );
    btn.addEventListener('click', () => {
      let correct = 0;
      rows.forEach(({ row, input, answers }) => {
        const value = normalize(input.value);
        const ok = answers.length ? answers.includes(value) : Boolean(value);
        row.style.borderColor = ok ? '#10b981' : '#ef4444';
        if (ok) correct += 1;
      });
      result.textContent = `Результат: ${correct}/${rows.length}`;
    });
    container.appendChild(btn);
    container.appendChild(result);
  }

  function renderScramble(container, task) {
    container.appendChild(el('h3', {}, task.prompt || 'Розшифруйте слова'));

    const rows = [];
    const items = Array.isArray(task?.items) ? task.items : [];
    items.forEach((item, index) => {
      if (!item || !item.scrambled) return;
      const row = el('div', {
        style:
          'margin-bottom:10px;padding:12px;border:1px solid #e5e7eb;border-radius:10px;background:#fff;',
      });
      row.appendChild(
        el(
          'div',
          { style: 'margin-bottom:6px;font-weight:600;' },
          item.scrambled
        )
      );
      const inputId = uniqueInputId(`${task.id || 'scramble'}-${index}`);
      const input = el('input', {
        type: 'text',
        id: inputId,
        style:
          'width:100%;max-width:260px;padding:6px 8px;border:1px solid #cbd5e1;border-radius:6px;',
      });
      row.appendChild(input);
      const answers = Array.isArray(item?.answers)
        ? item.answers.map(value => normalize(value))
        : Array.isArray(item?.answer)
        ? item.answer.map(value => normalize(value))
        : item?.answer
        ? [normalize(item.answer)]
        : [];
      rows.push({ row, input, answers });
      container.appendChild(row);
    });

    if (!rows.length) return;

    const btn = el(
      'button',
      { type: 'button', class: 'btn primary' },
      'Перевірити'
    );
    const result = el('div', {
      style: 'margin-top:6px;font-weight:600;color:#0f172a;',
    });
    btn.addEventListener('click', () => {
      let correct = 0;
      rows.forEach(({ row, input, answers }) => {
        const value = normalize(input.value);
        const ok = answers.length ? answers.includes(value) : Boolean(value);
        row.style.borderColor = ok ? '#10b981' : '#ef4444';
        if (ok) correct += 1;
      });
      result.textContent = `Результат: ${correct}/${rows.length}`;
    });
    container.appendChild(btn);
    container.appendChild(result);
  }

  function renderOddOneOut(container, task) {
    container.appendChild(el('h3', {}, task.prompt || 'Знайди зайве слово'));

    const blocks = [];
    const items = Array.isArray(task?.items) ? task.items : [];
    items.forEach((item, index) => {
      const options = Array.isArray(item?.options) ? item.options : [];
      if (!options.length) return;
      const row = el('div', {
        style:
          'margin-bottom:10px;padding:12px;border:1px solid #e5e7eb;border-radius:10px;background:#fff;',
      });
      row.appendChild(
        el(
          'div',
          { style: 'margin-bottom:6px;font-weight:600;' },
          `Набір ${index + 1}`
        )
      );
      const groupName = `${task.id || 'odd'}-${index}`;
      options.forEach((option, optionIndex) => {
        const id = uniqueInputId(`${groupName}-${optionIndex}`);
        row.appendChild(
          el(
            'label',
            {
              for: id,
              style: 'display:flex;align-items:center;gap:6px;margin:4px 0;',
            },
            el('input', {
              type: 'radio',
              name: groupName,
              value: String(optionIndex),
              id,
            }),
            option
          )
        );
      });
      const explanation = String(item?.explanation || '').trim();
      if (explanation) {
        const note = el('div', {
          class: 'muted',
          style: 'display:none;margin-top:6px;color:#475569;',
        });
        note.textContent = `Пояснення: ${explanation}`;
        row.appendChild(note);
      }
      const answerIndex = normalize(item?.answer || '');
      blocks.push({ row, groupName, answerIndex });
      container.appendChild(row);
    });

    if (!blocks.length) return;

    const btn = el(
      'button',
      { type: 'button', class: 'btn primary' },
      'Перевірити'
    );
    const result = el('div', {
      style: 'margin-top:6px;font-weight:600;color:#0f172a;',
    });
    btn.addEventListener('click', () => {
      let correct = 0;
      blocks.forEach(({ row, groupName, answerIndex }) => {
        const picked = row.querySelector(`input[name="${groupName}"]:checked`);
        const value = normalize(picked ? picked.value : '');
        const ok = answerIndex ? value === answerIndex : Boolean(value);
        row.style.borderColor = ok ? '#10b981' : '#ef4444';
        const note = row.querySelector('.muted');
        if (note) note.style.display = ok ? 'none' : 'block';
        if (ok) correct += 1;
      });
      result.textContent = `Результат: ${correct}/${blocks.length}`;
    });
    container.appendChild(btn);
    container.appendChild(result);
  }

  function renderWriting(container, task) {
    container.appendChild(
      el('h3', {}, task.prompt || 'Writing/Speaking prompt')
    );
    if (task.description)
      container.appendChild(el('p', { class: 'muted' }, task.description));
    const list = el('div', { style: 'margin-top:8px;' });
    (task.checklist || []).forEach((ch, index) => {
      const id = uniqueInputId(`${task.id || 'check'}-${index}`);
      const row = el(
        'label',
        {
          for: id,
          style: 'display:flex;align-items:center;gap:8px;margin:6px 0;',
        },
        el('input', { id, type: 'checkbox' }),
        el('span', {}, ch)
      );
      list.appendChild(row);
    });
    container.appendChild(list);
    const btn = el(
      'button',
      { type: 'button', class: 'btn primary', style: 'margin-top:8px;' },
      'Позначити як перевірено'
    );
    const note = el('div', { class: 'muted', style: 'margin-top:6px;' });
    btn.addEventListener('click', () => {
      note.textContent =
        'Готово! Перевір список і за бажанням відправ наставнику.';
    });
    container.appendChild(btn);
    container.appendChild(note);
  }

  function renderAudio(container, task) {
    container.appendChild(el('h3', {}, task.prompt || 'Audio task'));

    const audioCandidates = [];
    const collectAudio = value => {
      if (!value) return;
      if (Array.isArray(value)) {
        value.forEach(collectAudio);
        return;
      }
      const src = String(value).trim();
      if (src) audioCandidates.push(src);
    };

    collectAudio(task.audioSrc);
    collectAudio(task.audioUrl);
    collectAudio(task.audio);
    collectAudio(task.source);
    collectAudio(task.sources);

    const audioSources = Array.from(new Set(audioCandidates));
    if (audioSources.length) {
      const audioWrap = el('div', {
        style:
          'margin-top:8px;padding:12px;border:1px solid #cbd5e1;border-radius:10px;background:#f1f5f9;',
      });
      const player = el('audio', {
        controls: true,
        style: 'width:100%;display:block;',
      });
      audioSources.forEach(src => {
        player.appendChild(el('source', { src: resolveAssetPath(src) }));
      });
      player.appendChild(document.createTextNode('Ваш браузер не підтримує відтворення аудіо.'));
      audioWrap.appendChild(player);
      container.appendChild(audioWrap);
    }

    const rawDialogs = Array.isArray(task.dialogs) ? task.dialogs : [];
    const dialogs = [];
    rawDialogs.forEach(entry => {
      if (!entry) return;
      if (typeof entry === 'string') {
        const text = entry.trim();
        if (text) dialogs.push({ text });
        return;
      }
      if (typeof entry === 'object') {
        const text = 'text' in entry ? String(entry.text || '').trim() : '';
        if (!text) return;
        const normalized = { text };
        if (entry.voice) normalized.voice = entry.voice;
        if (entry.voiceName) normalized.voiceName = entry.voiceName;
        if (entry.gender) normalized.gender = entry.gender;
        if (entry.lang) normalized.lang = entry.lang;
        if (entry.rate != null) normalized.rate = entry.rate;
        if (entry.pitch != null) normalized.pitch = entry.pitch;
        if (entry.volume != null) normalized.volume = entry.volume;
        if (entry.ttsOptions && typeof entry.ttsOptions === 'object') {
          normalized.ttsOptions = { ...entry.ttsOptions };
        }
        dialogs.push(normalized);
      }
    });

    if (!dialogs.length) {
      if (Array.isArray(task.text)) {
        task.text
          .map(segment => String(segment || '').trim())
          .filter(Boolean)
          .forEach(text => dialogs.push({ text }));
      } else if (typeof task.text === 'string') {
        const text = String(task.text || '').trim();
        if (text) dialogs.push({ text });
      }
    }

    const synth =
      typeof window !== 'undefined' && 'speechSynthesis' in window
        ? window.speechSynthesis
        : null;
    const ttsOptions = {};
    if (task.lang) ttsOptions.lang = task.lang;
    if (task.voiceName) ttsOptions.voiceName = task.voiceName;
    if (task.voice) ttsOptions.voice = task.voice;
    if (task.gender) ttsOptions.gender = task.gender;
    if (typeof task.ttsOptions === 'object' && task.ttsOptions)
      Object.assign(ttsOptions, task.ttsOptions);
    if (typeof task.voiceOptions === 'object' && task.voiceOptions)
      Object.assign(ttsOptions, task.voiceOptions);
    if (typeof task.speechOptions === 'object' && task.speechOptions)
      Object.assign(ttsOptions, task.speechOptions);

    if (dialogs.length && synth) {
      const ttsWrap = el('div', {
        style:
          'margin-top:8px;display:flex;align-items:center;gap:10px;flex-wrap:wrap;',
      });
      const playBtn = el(
        'button',
        {
          type: 'button',
          class: 'btn primary',
          style:
            'padding:8px 14px;border-radius:8px;border:1px solid #0284c7;background:#0ea5e9;color:#fff;cursor:pointer;display:inline-flex;align-items:center;gap:6px;',
        },
        '▶ Play'
      );
      playBtn.setAttribute('aria-pressed', 'false');
      let isSpeaking = false;
      let currentIndex = 0;
      let currentUtterance = null;

      const resetState = () => {
        isSpeaking = false;
        currentIndex = 0;
        if (currentUtterance) {
          currentUtterance.onend = null;
          currentUtterance.onerror = null;
          currentUtterance = null;
        }
        playBtn.textContent = '▶ Play';
        playBtn.setAttribute('aria-pressed', 'false');
      };

      const playNext = async () => {
        if (!isSpeaking || currentIndex >= dialogs.length) {
          resetState();
          return;
        }
        const dialog = dialogs[currentIndex];
        const options = { ...ttsOptions };
        if (dialog.lang) options.lang = dialog.lang;
        if (dialog.voiceName) options.voiceName = dialog.voiceName;
        if (dialog.voice) options.voice = dialog.voice;
        if (dialog.gender) options.gender = dialog.gender;
        if (dialog.rate != null) options.rate = dialog.rate;
        if (dialog.pitch != null) options.pitch = dialog.pitch;
        if (dialog.volume != null) options.volume = dialog.volume;
        if (
          dialog.ttsOptions &&
          typeof dialog.ttsOptions === 'object' &&
          dialog.ttsOptions
        ) {
          Object.assign(options, dialog.ttsOptions);
        }
        try {
          const utterance = await speakText(dialog.text, options);
          if (!utterance) {
            currentIndex += 1;
            playNext();
            return;
          }
          currentUtterance = utterance;
          utterance.onend = () => {
            if (!isSpeaking) return;
            currentUtterance = null;
            currentIndex += 1;
            playNext();
          };
          utterance.onerror = resetState;
        } catch (error) {
          resetState();
        }
      };

      playBtn.addEventListener('click', () => {
        if (!isSpeaking) {
          if (!dialogs.length) return;
          isSpeaking = true;
          currentIndex = 0;
          playBtn.textContent = '⏹ Stop';
          playBtn.setAttribute('aria-pressed', 'true');
          playNext();
        } else {
          if (synth) synth.cancel();
          resetState();
        }
      });

      ttsWrap.appendChild(playBtn);
      if (!audioSources.length) {
        ttsWrap.appendChild(
          el(
            'span',
            { class: 'muted', style: 'font-size:14px;' },
            'Прослухайте діалог за допомогою синтезу мовлення.'
          )
        );
      }
      container.appendChild(ttsWrap);
    } else if (!audioSources.length && dialogs.length) {
      container.appendChild(
        el(
          'p',
          { class: 'muted', style: 'margin-top:8px;' },
          'Ваш браузер не підтримує синтез мовлення.'
        )
      );
    }

    const rawQuestions = Array.isArray(task.questions)
      ? task.questions.filter(Boolean)
      : [];
    if (!rawQuestions.length) return;

    const questionsWrap = el('div', { style: 'margin-top:16px;' });
    const checkableEntries = [];

    rawQuestions.forEach((entry, index) => {
      const question =
        typeof entry === 'string'
          ? { prompt: entry }
          : entry && typeof entry === 'object'
          ? entry
          : { prompt: String(entry) };
      const promptText =
        question.prompt || question.q || `Question ${index + 1}`;

      const block = el(
        'div',
        {
          style:
            'margin-bottom:12px;padding:12px;border:1px solid #e5e7eb;border-radius:10px;background:#fff;',
        },
        el('div', { style: 'font-weight:600;margin-bottom:8px;' }, promptText)
      );

      if (question.hint) {
        block.appendChild(makeHint(question.hint));
      }

      if (Array.isArray(question.choices) && question.choices.length) {
        const expectedRaw = Array.isArray(question.answer)
          ? question.answer
          : question.answer != null
          ? [question.answer]
          : [];
        const expected = expectedRaw.map(value => String(value));
        const allowMulti = expected.length > 1;
        const expectedIsIndex = expected.every(value => /^\d+$/.test(value));
        const name = uniqueInputId(`${task.id || 'audio'}-${index}`);
        question.choices.forEach((choice, choiceIndex) => {
          const id = uniqueInputId(`${name}-${choiceIndex}`);
          block.appendChild(
            el(
              'label',
              {
                for: id,
                style:
                  'display:flex;align-items:center;gap:8px;margin:4px 0;',
              },
              el('input', {
                type: allowMulti ? 'checkbox' : 'radio',
                name,
                id,
                value: String(choiceIndex),
              }),
              el('span', {}, choice)
            )
          );
        });
        if (expected.length) {
          checkableEntries.push({
            type: 'choices',
            block,
            getPicked: () => {
              const inputs = Array.from(
                block.querySelectorAll(`input[name='${name}']`)
              );
              const picked = inputs
                .filter(input => input.checked)
                .map(input => input.value);
              if (expectedIsIndex) return picked;
              return picked.map(idx =>
                normalize(question.choices[Number(idx)] || '')
              );
            },
            expected: expectedIsIndex
              ? expected.slice()
              : expected.map(value => normalize(value)),
          });
        }
      } else {
        const input = el('textarea', {
          rows: question.rows || 2,
          style:
            'width:100%;max-width:640px;padding:6px 8px;border:1px solid #cbd5e1;border-radius:6px;',
        });
        block.appendChild(input);
        const expectedRaw = Array.isArray(question.answer)
          ? question.answer
          : question.answer != null
          ? [question.answer]
          : Array.isArray(question.answers)
          ? question.answers
          : [];
        const expected = expectedRaw
          .map(value => normalize(value))
          .filter(Boolean);
        if (expected.length) {
          checkableEntries.push({
            type: 'text',
            block,
            input,
            expected,
          });
        }
      }

      questionsWrap.appendChild(block);
    });

    if (checkableEntries.length) {
      const result = el('div', {
        style: 'margin-top:8px;font-weight:600;',
      });
      const button = el(
        'button',
        {
          type: 'button',
          class: 'btn primary',
          style: 'margin-top:8px;',
        },
        'Перевірити'
      );
      button.addEventListener('click', () => {
        let correct = 0;
        checkableEntries.forEach(entry => {
          if (entry.type === 'choices') {
            const picked = entry.getPicked().sort();
            const expected = entry.expected.slice().sort();
            const ok =
              picked.length === expected.length &&
              picked.every((value, idx) => value === expected[idx]);
            entry.block.style.borderColor = ok ? '#10b981' : '#ef4444';
            if (ok) correct++;
          } else if (entry.type === 'text') {
            const value = normalize(entry.input.value);
            const ok = entry.expected.includes(value);
            entry.block.style.borderColor = ok ? '#10b981' : '#ef4444';
            if (ok) correct++;
          }
        });
        result.textContent = `Результат: ${correct}/${checkableEntries.length}`;
      });
      questionsWrap.appendChild(button);
      questionsWrap.appendChild(result);
    } else {
      questionsWrap.appendChild(
        el(
          'p',
          { class: 'muted', style: 'margin-top:4px;' },
          'Запишіть відповіді — викладач перевірить їх пізніше.'
        )
      );
    }

    container.appendChild(questionsWrap);
  }

  function ensurePracticeContainer() {
    let root = document.getElementById('practice');
    if (!root && /\/grammar\//.test(location.pathname)) {
      const wrap = el('div', { class: 'container' });
      wrap.appendChild(el('hr', { class: 'sep' }));
      root = el('section', { id: 'practice' });
      wrap.appendChild(root);
      document.body.appendChild(wrap);
    }
    return root;
  }

  function init() {
    const root = ensurePracticeContainer();
    if (!root) return;
    // Ensure stable inner container so external toolbars are not wiped
    let body = root.querySelector('#practice-body');
    if (!body) {
      body = el('div', { id: 'practice-body' });
      root.appendChild(body);
    }
    const context = window.lessonContext || {};
    if (context.isCustomLesson) {
      const placeholder = root.querySelector('[data-practice-placeholder]');
      if (placeholder) {
        placeholder.textContent =
          'Практика для кожної теми розміщена одразу після теорії. Тут можете згенерувати додаткові завдання.';
      }
      if (body) {
        body.innerHTML =
          '<p class="muted">Згенеруйте додаткові вправи або додайте власні завдання.</p>';
      }
      document.dispatchEvent(
        new CustomEvent('practice:dataLoaded', { detail: null })
      );
      document.dispatchEvent(
        new CustomEvent('practice:rendered', {
          detail: { ok: false, reason: 'custom-lesson' },
        })
      );
      return;
    }

    loadData().then(data => {
      if (!data) {
        document.dispatchEvent(
          new CustomEvent('practice:dataLoaded', { detail: null })
        );
        body.innerHTML = '<p class="muted">Практика поки відсутня.</p>';
        document.dispatchEvent(
          new CustomEvent('practice:rendered', { detail: { ok: false } })
        );
        return;
      }
      body.innerHTML = '';
      const header = el(
        'div',
        {},
        el(
          'h2',
          {},
          'Practice ',
          el('span', { class: 'badge' }, data.level || 'B1')
        ),
        data.title ? el('p', { class: 'muted' }, data.title) : null
      );
      body.appendChild(header);

      const entries = (data.tasks || []).map((task, index) => ({
        key: task && task.id ? String(task.id) : `base-${index}`,
        task,
      }));

      document.dispatchEvent(
        new CustomEvent('practice:dataLoaded', {
          detail: {
            title: data.title,
            level: data.level,
            entries,
          },
        })
      );

      entries.forEach(({ task, key }) => renderTask(body, task, key));
      document.dispatchEvent(
        new CustomEvent('practice:rendered', { detail: { ok: true } })
      );
    });
  }

  const globalPracticeConfig =
    (typeof window !== 'undefined' && window.practiceConfig) || {};
  if (!globalPracticeConfig.disableAutoInit) {
    document.addEventListener('DOMContentLoaded', init);
  }

  window.practice = window.practice || {};
  Object.assign(window.practice, {
    appendTask,
    renderTaskList,
    createTaskElement,
  });

  return {
    appendTask,
    renderTaskList,
    createTaskElement,
  };
})();

export const createPracticeTaskElement = practiceAPI.createTaskElement;
export const appendPracticeTask = practiceAPI.appendTask;
export const renderPracticeTaskList = practiceAPI.renderTaskList;

document.addEventListener('click', e => {
  const div = e.target.closest('.text-block');
  if (div) {
    const html = div.innerHTML;
    navigator.clipboard.writeText(`<div class="text-block">${html}</div>`);
    console.log('Скопійовано');
  }
});
