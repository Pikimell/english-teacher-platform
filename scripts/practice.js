// Lightweight practice renderer for topic pages
// Convention: for page /X/indexN.html → fetch /X/practice/indexN.json
(function () {
  const scriptUrl = (() => {
    if (document.currentScript && document.currentScript.src) {
      return document.currentScript.src;
    }
    const fallback = Array.from(document.querySelectorAll('script[src]')).find((script) =>
      script.src.includes('scripts/practice.js'),
    );
    return fallback?.src || window.location.href;
  })();

  const basePath = (() => {
    try {
      const url = new URL(scriptUrl, window.location.href);
      const pathname = url.pathname.replace(/scripts\/practice\.js.*$/, '');
      const normalizedPath = pathname.endsWith('/') ? pathname : `${pathname}/`;
      return `${url.origin}${normalizedPath}`;
    } catch (error) {
      console.warn('Не вдалося визначити базовий шлях, використовується /', error);
      return '/';
    }
  })();

  function resolveAssetPath(path) {
    const normalizedBase = basePath.endsWith('/') ? basePath : `${basePath}/`;
    const rawPath = String(path || '');
    if (rawPath.startsWith(normalizedBase)) return rawPath;
    return `${normalizedBase}${rawPath.replace(/^\/+/, '')}`;
  }
  function derivePracticePath() {
    try {
      const url = new URL(window.location.href);
      const parts = url.pathname.split("/");
      let file = parts.pop();
      if (!file || !/\.html?$/i.test(file)) file = "index.html";
      const json = file.replace(/\.html?$/i, ".json");
      parts.push("practice", json);
      return parts.join("/");
    } catch (e) {
      return null;
    }
  }

  function el(tag, attrs = {}, ...children) {
    const node = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs || {})) {
      if (k === "class") node.className = v;
      else if (k === "html") node.innerHTML = v;
      else if (k.startsWith("on") && typeof v === "function")
        node.addEventListener(k.slice(2), v);
      else node.setAttribute(k, v);
    }
    for (const ch of children) {
      if (ch == null) continue;
      node.appendChild(
        typeof ch === "string" ? document.createTextNode(ch) : ch
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
    return String(s || "")
      .trim()
      .toLowerCase()
      .replace(/\s+/g, " ");
  }

  // Subtle hint toggle: hidden by default, shown on small button click
  function makeHint(hintText) {
    const wrap = el("div", { class: "hint-wrap", style: "margin-top:6px;" });
    const btn = el(
      "button",
      {
        type: "button",
        class: "hint-toggle",
        "aria-label": "Показати підказку",
        title: "Підказка",
        style:
          "border:none;background:transparent;color:#94a3b8;cursor:pointer;padding:0;font-size:14px;line-height:1;",
      },
      "?"
    );
    const box = el(
      "div",
      { class: "hint-box muted", style: "display:none;margin-top:6px;color:#475569;" },
      `Підказка: ${hintText}`
    );
    btn.addEventListener("click", () => {
      const isHidden = box.style.display === "none";
      box.style.display = isHidden ? "block" : "none";
      btn.setAttribute("aria-expanded", isHidden ? "true" : "false");
    });
    wrap.appendChild(btn);
    wrap.appendChild(box);
    return wrap;
  }

  function renderMCQ(container, task) {
    container.appendChild(
      el("h3", {}, task.prompt || "Choose the correct option")
    );
    const blocks = [];
    (task.items || []).forEach((item, idx) => {
      const name = `${task.id || "mcq"}-${idx}`;
      const allowMulti = Array.isArray(item.answer) && item.answer.length > 1;
      const block = el(
        "div",
        {
          class: "mcq-item",
          style:
            "margin-bottom:10px;padding:10px;border:1px solid #e5e7eb;border-radius:10px;background:#fff;",
        },
        el(
          "div",
          { class: "q", style: "margin-bottom:8px;font-weight:600;" },
          item.q
        )
      );
      (item.choices || []).forEach((choice, cIdx) => {
        const id = `${name}-${cIdx}`;
        const lbl = el(
          "label",
          {
            for: id,
            style: "display:flex;align-items:center;gap:8px;margin:4px 0;",
          },
          el("input", {
            type: allowMulti ? "checkbox" : "radio",
            name,
            id,
            value: String(cIdx),
          }),
          el("span", {}, choice)
        );
        block.appendChild(lbl);
      });
      if (item.explanation) {
        block.appendChild(
          el(
            "div",
            {
              class: "exp muted",
              style: "display:none;margin-top:6px;color:#475569;",
            },
            item.explanation
          )
        );
      }
      blocks.push({ block, item, name });
      container.appendChild(block);
    });
    const result = el("div", {
      class: "result",
      style: "margin-top:8px;font-weight:600;",
    });
    const btn = el(
      "button",
      { type: "button", class: "btn primary", style: "margin-top:8px;" },
      "Перевірити"
    );
    btn.addEventListener("click", () => {
      let correct = 0;
      blocks.forEach(({ block, item, name }) => {
        const answers = Array.isArray(item.answer)
          ? item.answer.map(String)
          : [String(item.answer)];
        const inputs = Array.from(
          block.querySelectorAll(`input[name='${name}']`)
        );
        const picked = inputs
          .filter((i) => i.checked)
          .map((i) => i.value)
          .sort();
        const expected = answers.slice().sort();
        const ok =
          picked.length === expected.length &&
          picked.every((v, i) => v === expected[i]);
        block.style.borderColor = ok ? "#10b981" : "#ef4444";
        const exp = block.querySelector(".exp");
        if (exp) exp.style.display = ok ? "none" : "block";
        if (ok) correct++;
      });
      result.textContent = `Результат: ${correct}/${blocks.length}`;
    });
    container.appendChild(btn);
    container.appendChild(result);
  }

  function renderGap(container, task) {
    container.appendChild(el("h3", {}, task.prompt || "Fill the gaps"));
    const items = [];
    (task.items || []).forEach((it, idx) => {
      const row = el("div", {
        style:
          "margin-bottom:10px;padding:10px;border:1px solid #e5e7eb;border-radius:10px;background:#fff;",
      });
      const parts = String(it.q || "").split(/___/);
      const input = el("input", {
        type: "text",
        style: "padding:6px 8px;border:1px solid #cbd5e1;border-radius:6px;",
      });
      if (parts.length > 1) {
        row.appendChild(el("span", {}, parts[0]));
        row.appendChild(input);
        row.appendChild(el("span", {}, parts.slice(1).join("___")));
      } else {
        row.appendChild(
          el("div", { style: "margin-bottom:6px;font-weight:600;" }, it.q)
        );
        row.appendChild(input);
      }
      if (it.hint) row.appendChild(makeHint(it.hint));
      items.push({
        row,
        input,
        answers: (it.answer || []).map((a) => normalize(a)),
      });
      container.appendChild(row);
    });
    const result = el("div", { style: "margin-top:8px;font-weight:600;" });
    const btn = el(
      "button",
      { type: "button", class: "btn primary", style: "margin-top:8px;" },
      "Перевірити"
    );
    btn.addEventListener("click", () => {
      let correct = 0;
      items.forEach(({ row, input, answers }) => {
        const val = normalize(input.value);
        const ok = answers.includes(val);
        row.style.borderColor = ok ? "#10b981" : "#ef4444";
        if (ok) correct++;
      });
      result.textContent = `Результат: ${correct}/${items.length}`;
    });
    container.appendChild(btn);
    container.appendChild(result);
  }

  function renderMatch(container, task) {
    container.appendChild(el("h3", {}, task.prompt || "Match pairs"));
    const pairs = task.pairs || [];
    const rights = shuffle(pairs.map((p) => p.right));
    const rows = [];
    pairs.forEach((p) => {
      const select = el(
        "select",
        {
          style: "padding:6px 8px;border:1px solid #cbd5e1;border-radius:6px;",
        },
        el("option", { value: "" }, "— обери —"),
        ...rights.map((r) => el("option", { value: r }, r))
      );
      const row = el(
        "div",
        {
          style:
            "display:flex;align-items:center;gap:10px;margin:8px 0;padding:10px;border:1px solid #e5e7eb;border-radius:10px;background:#fff;",
        },
        el("div", { style: "min-width:160px;font-weight:600;" }, p.left),
        select
      );
      rows.push({ row, select, right: p.right });
      container.appendChild(row);
    });
    const result = el("div", { style: "margin-top:8px;font-weight:600;" });
    const btn = el(
      "button",
      { type: "button", class: "btn primary", style: "margin-top:8px;" },
      "Перевірити"
    );
    btn.addEventListener("click", () => {
      let correct = 0;
      rows.forEach(({ row, select, right }) => {
        const ok = select.value === right;
        row.style.borderColor = ok ? "#10b981" : "#ef4444";
        if (ok) correct++;
      });
      result.textContent = `Результат: ${correct}/${rows.length}`;
    });
    container.appendChild(btn);
    container.appendChild(result);
  }

  function renderTask(container, task, taskKey) {
    const keyBase = taskKey || (task && task.id ? String(task.id) : `task-${Math.random().toString(16).slice(2, 8)}`);
    const box = el("section", {
      style: "position:relative;margin:18px 0 26px;",
      "data-task-id": task && task.id ? String(task.id) : "",
      "data-task-key": keyBase,
    });
    // Subtle remove button (top-right), hidden until hover/focus
    const removeBtn = el(
      "button",
      {
        type: "button",
        title: "Видалити завдання",
        "aria-label": "Видалити завдання",
        style:
          "position:absolute;top:6px;right:6px;border:none;background:transparent;color:#94a3b8;cursor:pointer;padding:2px;line-height:1;font-size:14px;opacity:0.6;",
        onmouseenter: () => (removeBtn.style.opacity = "1"),
        onmouseleave: () => (removeBtn.style.opacity = "0.6"),
        onclick: () => {
          document.dispatchEvent(
            new CustomEvent("practice:taskRemoved", {
              detail: { key: keyBase, task },
            })
          );
          box.remove();
        },
      },
      "✕"
    );
    box.appendChild(removeBtn);
    if (task.title) box.appendChild(el("h3", {}, task.title));
    switch (task.type) {
      case "mcq":
        renderMCQ(box, task);
        break;
      case "gap":
        renderGap(box, task);
        break;
      case "match":
        renderMatch(box, task);
        break;
      case "transform":
        renderTransform(box, task);
        break;
      case "error":
        renderError(box, task);
        break;
      case "order":
        renderOrder(box, task);
        break;
      case "short":
        renderShort(box, task);
        break;
      case "writing":
        renderWriting(box, task);
        break;
      default:
        box.appendChild(
          el("div", { class: "muted" }, `Невідомий тип завдання: ${task.type}`)
        );
    }
    container.appendChild(box);
  }

  // Expose minimal public API for dynamic appends
  window.practice = window.practice || {};
  window.practice.appendTask = function (task, meta = {}) {
    const root = ensurePracticeContainer();
    if (!root || !task) return;
    const body = root.querySelector('#practice-body') || root;
    renderTask(body, task, meta.key);
  };

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
      el("h3", {}, task.prompt || "Transform the sentence")
    );
    const items = [];
    (task.items || []).forEach((it) => {
      const row = el("div", {
        style:
          "margin-bottom:10px;padding:10px;border:1px solid #e5e7eb;border-radius:10px;background:#fff;",
      });
      row.appendChild(
        el("div", { style: "margin-bottom:6px;font-weight:600;" }, it.q)
      );
      const input = el("input", {
        type: "text",
        style:
          "width:100%;max-width:640px;padding:6px 8px;border:1px solid #cbd5e1;border-radius:6px;",
      });
      row.appendChild(input);
      if (it.hint) row.appendChild(makeHint(it.hint));
      items.push({
        row,
        input,
        answers: (it.answer || []).map((a) => normalize(a)),
      });
      container.appendChild(row);
    });
    const result = el("div", { style: "margin-top:8px;font-weight:600;" });
    const btn = el(
      "button",
      { type: "button", class: "btn primary", style: "margin-top:8px;" },
      "Перевірити"
    );
    btn.addEventListener("click", () => {
      let correct = 0;
      items.forEach(({ row, input, answers }) => {
        const ok = answers.includes(normalize(input.value));
        row.style.borderColor = ok ? "#10b981" : "#ef4444";
        if (ok) correct++;
      });
      result.textContent = `Результат: ${correct}/${items.length}`;
    });
    container.appendChild(btn);
    container.appendChild(result);
  }

  function renderError(container, task) {
    container.appendChild(
      el("h3", {}, task.prompt || "Find and correct the error")
    );
    const items = [];
    (task.items || []).forEach((it) => {
      const row = el("div", {
        style:
          "margin-bottom:10px;padding:10px;border:1px solid #e5e7eb;border-radius:10px;background:#fff;",
      });
      row.appendChild(
        el("div", { style: "margin-bottom:6px;font-weight:600;" }, it.q)
      );
      const input = el("input", {
        type: "text",
        style:
          "width:100%;max-width:640px;padding:6px 8px;border:1px solid #cbd5e1;border-radius:6px;",
      });
      row.appendChild(input);
      if (it.hint) row.appendChild(makeHint(it.hint));
      items.push({
        row,
        input,
        answers: (it.answer || []).map((a) => normalize(a)),
      });
      container.appendChild(row);
    });
    const result = el("div", { style: "margin-top:8px;font-weight:600;" });
    const btn = el(
      "button",
      { type: "button", class: "btn primary", style: "margin-top:8px;" },
      "Перевірити"
    );
    btn.addEventListener("click", () => {
      let correct = 0;
      items.forEach(({ row, input, answers }) => {
        const ok = answers.includes(normalize(input.value));
        row.style.borderColor = ok ? "#10b981" : "#ef4444";
        if (ok) correct++;
      });
      result.textContent = `Результат: ${correct}/${items.length}`;
    });
    container.appendChild(btn);
    container.appendChild(result);
  }

  function renderOrder(container, task) {
    container.appendChild(
      el("h3", {}, task.prompt || "Put the words in order")
    );
    const blocks = [];
    (task.items || []).forEach((it, idx) => {
      const correctStr = normalize(
        Array.isArray(it.answer) ? it.answer.join(" ") : it.answer
      );
      const pool = shuffle((it.tokens || []).slice());
      const row = el("div", {
        style:
          "margin:10px 0;padding:10px;border:1px solid #e5e7eb;border-radius:10px;background:#fff;",
      });
      const poolWrap = el("div", {
        style: "display:flex;flex-wrap:wrap;gap:6px;margin-bottom:6px;",
      });
      const outWrap = el("div", {
        style:
          "display:flex;flex-wrap:wrap;gap:6px;min-height:36px;padding:6px;border:1px dashed #cbd5e1;border-radius:8px;background:#f8fafc;",
      });
      const used = new Set();
      function makeBtn(word, i) {
        const b = el(
          "button",
          {
            type: "button",
            style:
              "padding:4px 8px;border:1px solid #cbd5e1;border-radius:6px;background:#fff;cursor:pointer;",
          },
          word
        );
        b.addEventListener("click", () => {
          if (used.has(i)) return;
          used.add(i);
          b.style.opacity = 0.5;
          outWrap.appendChild(
            el(
              "span",
              {
                class: "chip",
                style:
                  "padding:4px 8px;border:1px solid #cbd5e1;border-radius:6px;background:#fff;",
              },
              word
            )
          );
        });
        return b;
      }
      pool.forEach((w, i) => poolWrap.appendChild(makeBtn(w, `${idx}-${i}`)));
      const actions = el("div", {
        style: "margin-top:6px;display:flex;gap:8px;",
      });
      const reset = el("button", { type: "button", class: "btn" }, "Скинути");
      reset.addEventListener("click", () => {
        used.clear();
        outWrap.innerHTML = "";
        Array.from(poolWrap.children).forEach((ch) => (ch.style.opacity = 1));
        row.style.borderColor = "#e5e7eb";
      });
      actions.appendChild(reset);
      row.appendChild(
        el("div", { style: "margin-bottom:6px;font-weight:600;" }, it.q || "")
      );
      row.appendChild(poolWrap);
      row.appendChild(outWrap);
      row.appendChild(actions);
      blocks.push({ row, outWrap, correctStr });
      container.appendChild(row);
    });
    const result = el("div", { style: "margin-top:8px;font-weight:600;" });
    const btn = el(
      "button",
      { type: "button", class: "btn primary", style: "margin-top:8px;" },
      "Перевірити"
    );
    btn.addEventListener("click", () => {
      let correct = 0;
      blocks.forEach(({ row, outWrap, correctStr }) => {
        const built = normalize(
          Array.from(outWrap.querySelectorAll(".chip"))
            .map((n) => n.textContent)
            .join(" ")
        );
        const ok = built === correctStr;
        row.style.borderColor = ok ? "#10b981" : "#ef4444";
        if (ok) correct++;
      });
      result.textContent = `Результат: ${correct}/${blocks.length}`;
    });
    container.appendChild(btn);
    container.appendChild(result);
  }

  function renderShort(container, task) {
    container.appendChild(el("h3", {}, task.prompt || "Short answer"));
    const items = [];
    (task.items || []).forEach((it) => {
      const row = el("div", {
        style:
          "margin-bottom:10px;padding:10px;border:1px solid #e5e7eb;border-radius:10px;background:#fff;",
      });
      row.appendChild(
        el("div", { style: "margin-bottom:6px;font-weight:600;" }, it.q)
      );
      const input = el("textarea", {
        rows: 3,
        style:
          "width:100%;max-width:720px;padding:6px 8px;border:1px solid #cbd5e1;border-radius:6px;",
      });
      row.appendChild(input);
      items.push({
        row,
        input,
        keywords: (it.keywords || []).map((k) => normalize(k)),
      });
      container.appendChild(row);
    });
    const result = el("div", { style: "margin-top:8px;font-weight:600;" });
    const btn = el(
      "button",
      { type: "button", class: "btn primary", style: "margin-top:8px;" },
      "Перевірити"
    );
    btn.addEventListener("click", () => {
      let sum = 0,
        total = 0;
      items.forEach(({ row, input, keywords }) => {
        const text = normalize(input.value);
        const matched = keywords.filter((k) => text.includes(k)).length;
        sum += matched;
        total += keywords.length;
        row.style.borderColor =
          matched === keywords.length
            ? "#10b981"
            : matched > 0
            ? "#f59e0b"
            : "#ef4444";
        const info =
          row.querySelector(".short-info") ||
          el("div", {
            class: "short-info",
            style: "margin-top:6px;color:#475569;",
          });
        info.textContent = `Збіги ключових слів: ${matched}/${keywords.length}`;
        if (!row.contains(info)) row.appendChild(info);
      });
      result.textContent = `Загальний збіг ключових слів: ${sum}/${total}`;
    });
    container.appendChild(btn);
    container.appendChild(result);
  }

  function renderWriting(container, task) {
    container.appendChild(
      el("h3", {}, task.prompt || "Writing/Speaking prompt")
    );
    if (task.description)
      container.appendChild(el("p", { class: "muted" }, task.description));
    const list = el("div", { style: "margin-top:8px;" });
    (task.checklist || []).forEach((ch) => {
      const id = Math.random().toString(36).slice(2);
      const row = el(
        "label",
        {
          for: id,
          style: "display:flex;align-items:center;gap:8px;margin:6px 0;",
        },
        el("input", { id, type: "checkbox" }),
        el("span", {}, ch)
      );
      list.appendChild(row);
    });
    container.appendChild(list);
    const btn = el(
      "button",
      { type: "button", class: "btn primary", style: "margin-top:8px;" },
      "Позначити як перевірено"
    );
    const note = el("div", { class: "muted", style: "margin-top:6px;" });
    btn.addEventListener("click", () => {
      note.textContent =
        "Готово! Перевір список і за бажанням відправ наставнику.";
    });
    container.appendChild(btn);
    container.appendChild(note);
  }

  function ensurePracticeContainer() {
    let root = document.getElementById("practice");
    if (!root && /\/grammar\//.test(location.pathname)) {
      const wrap = el("div", { class: "container" });
      wrap.appendChild(el("hr", { class: "sep" }));
      root = el("section", { id: "practice" });
      wrap.appendChild(root);
      document.body.appendChild(wrap);
    }
    return root;
  }

  function init() {
    const root = ensurePracticeContainer();
    if (!root) return;
    // Ensure stable inner container so external toolbars are not wiped
    let body = root.querySelector("#practice-body");
    if (!body) {
      body = el("div", { id: "practice-body" });
      root.appendChild(body);
    }
    loadData().then((data) => {
      if (!data) {
        document.dispatchEvent(new CustomEvent('practice:dataLoaded', { detail: null }));
        body.innerHTML = '<p class="muted">Практика поки відсутня.</p>';
        document.dispatchEvent(new CustomEvent('practice:rendered', { detail: { ok: false } }));
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
      document.dispatchEvent(new CustomEvent('practice:rendered', { detail: { ok: true } }));
    });
  }

  document.addEventListener("DOMContentLoaded", init);
})();

document.addEventListener("click", (e) => {
  const div = e.target.closest(".text-block");
  if (div) {
    const html = div.innerHTML;
    navigator.clipboard.writeText(`<div class="text-block">${html}</div>`);
    console.log("Скопійовано");
  }
});
