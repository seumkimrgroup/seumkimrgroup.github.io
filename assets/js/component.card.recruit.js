import { escapeHtml } from "./util.data.js";
import { renderTags } from "./component.tags.js";

const CHEVRON_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>`;

function toggleCard(card, btn) {
  const isOpen = card.classList.contains("is-open");
  document.querySelectorAll(".card--recruit.is-open").forEach((other) => {
    other.classList.remove("is-open");
    other.querySelector(".split > button").setAttribute("aria-expanded", "false");
  });
  if (!isOpen) {
    card.classList.add("is-open");
    btn.setAttribute("aria-expanded", "true");
  }
}

export function createRecruitCard(program) {
  const card = document.createElement("div");
  card.className = "card card--recruit";

  card.innerHTML = `
    <div class="split">
      <h5>${escapeHtml(program.program || "")}</h5>
      <button class="icon" aria-expanded="false" aria-label="Toggle details">
        ${CHEVRON_SVG}
      </button>
    </div>
    <div class="stack--sm">
      ${renderTags(program.tags)}
      ${program.body_en ? `<p>${escapeHtml(program.body_en)}</p>` : ""}
      ${program.body_ko ? `<p>${escapeHtml(program.body_ko)}</p>` : ""}
    </div>
  `;

  const btn = card.querySelector(".split > button");

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleCard(card, btn);
  });

  card.addEventListener("click", (e) => {
    if (e.target.closest("button, a, input, textarea, select, label")) return;
    toggleCard(card, btn);
  });

  return card;
}
