import"./assets/main-Cs3pyMuT.js";const i=[],d=[],s=document.querySelector('[data-component="placement-form"]'),m=document.querySelector('[data-component="questions"]'),l=document.querySelector('[data-component="results"]'),p=document.querySelector('[data-component="results-chart"]'),$=document.querySelector('[data-component="results-summary"]'),f=document.querySelector('[data-component="results-text"]');function _(n,r){const t=`${n.id}-${r.id}`;return`
    <label class="placement-question__option" for="${t}">
      <input type="radio" id="${t}" name="${n.id}" value="${r.id}" aria-labelledby="${t}-label" />
      <span id="${t}-label">${r.text}</span>
    </label>
  `}function v(n,r){const t=n.answers.map(e=>_(n,e)).join("");return`
    <fieldset class="placement-question">
      <legend class="placement-question__title">
        <span class="placement-question__number">${String(r+1).padStart(2,"0")}</span>
        <div class="placement-question__meta">
          <span class="placement-question__prompt">${n.prompt}</span>
        </div>
      </legend>
      <div class="placement-question__options" role="radiogroup" aria-label="Відповіді на запитання ${r+1}">
        ${t}
      </div>
    </fieldset>
  `}function b(){const n=d.map((r,t)=>v(r,t)).join("");m.innerHTML=n}function h(n){const r=i.reduce((t,e)=>(t[e.id]={id:e.id,label:e.label,correct:0,total:0},t),{});return d.forEach(t=>{const e=n.get(t.id),c=t.answers.find(o=>o.isCorrect),a=r[t.level];a&&(a.total+=1,e&&c&&e===c.id&&(a.correct+=1))}),r}function y(n){const r=i.map(t=>{const e=n[t.id],c=e.total?e.correct/e.total:0,a=Math.round(c*100),o=e.total?a:0;return`
        <div class="placement-chart__row">
          <div class="placement-chart__label">${t.id}</div>
          <div class="placement-chart__bar" aria-hidden="true">
            <div class="placement-chart__fill" style="width: ${o}%"></div>
          </div>
          <div class="placement-chart__value">${e.correct}/${e.total}</div>
          <span class="visually-hidden">${t.label}: ${e.correct} з ${e.total} (${a}% правильних)</span>
        </div>
      `}).join("");p.innerHTML=r}function S(n){const r=i.map(t=>{const e=n[t.id],c=e.total?Math.round(e.correct/e.total*100):0;return`
        <li class="placement-summary__item">
          <strong>${t.label}:</strong> ${e.correct}/${e.total} правильних (${c}%)
        </li>
      `}).join("");$.innerHTML=r}function g(n){const r=Object.values(n),t=r.reduce((a,o)=>a+o.correct,0),e=r.reduce((a,o)=>a+o.total,0),c=r.reduce((a,o)=>{if(o.total===0)return a;const u=o.correct/o.total;return!a||u>a.ratio?{id:o.id,label:o.label,ratio:u}:a},null);f.textContent=c?`Загальний результат: ${t}/${e}. Найвища точність — на рівні ${c.label}.`:`Загальний результат: ${t}/${e}.`,y(n),S(n),l.hidden=!1,l.scrollIntoView({behavior:"smooth"})}function q(n){n.preventDefault();const r=new FormData(s),t=h(r);g(t)}function L(){l.hidden=!0,p.innerHTML="",$.innerHTML="",f.textContent=""}function w(){const n=document.querySelector('[data-component="copyright-year"]');n&&(n.textContent=String(new Date().getFullYear()))}function C(){w(),!(!s||!m)&&(b(),s.addEventListener("submit",q),s.addEventListener("reset",L))}C();
//# sourceMappingURL=placement-test.js.map
