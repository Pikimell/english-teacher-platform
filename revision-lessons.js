import"./assets/main-DbSZpuML.js";import{g as i}from"./assets/revision-tests-registry-CQ-MEpzP.js";function n(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function c(e){const t=[];Number.isFinite(e.duration)&&e.duration>0&&t.push(`~${e.duration} хв`);const s=Array.isArray(e.tasks)?e.tasks.length:0;return s&&t.push(`${s} завдань`),t.join(" · ")}function l(e){if(!Array.isArray(e)||!e.length)return"";const t=e.map(s=>typeof s=="string"?s.trim():"").filter(Boolean);return t.length?`<ul class="lesson-card__tags">${t.map(s=>`<li>${n(s)}</li>`).join("")}</ul>`:""}function d(e){const t=n(e.description||""),s=c(e),r=l(e.tags);return`
    <article class="lesson-card lesson-card--revision" data-test-slug="${n(e.slug)}">
      <a class="lesson-card__link" href="revision-test.html?test=${encodeURIComponent(e.slug)}">
        <div class="lesson-card__meta">
          <span class="lesson-card__category">Контрольна</span>
          ${e.level?`<span class="lesson-card__level">${n(e.level)}</span>`:""}
        </div>
        <h3 class="lesson-card__title">${n(e.title)}</h3>
        <p class="lesson-card__description">${t||"Опис ще не додано."}</p>
        ${s?`<p class="lesson-card__description">${s}</p>`:""}
        ${r}
        <span class="lesson-card__cta">Перейти до завдань</span>
      </a>
    </article>
  `}function p(){const e=document.querySelector("[data-tests-grid]"),t=document.querySelector("[data-tests-empty]");if(!e||!t)return;const s=i();if(!(s.length>0)){e.innerHTML="",e.setAttribute("data-empty","true"),t.hidden=!1;return}const o=s.map(d).join("");e.innerHTML=o,e.removeAttribute("data-empty"),t.hidden=!0}p();const a=document.querySelector('[data-component="copyright-year"]');a&&(a.textContent=String(new Date().getFullYear()));
//# sourceMappingURL=revision-lessons.js.map
