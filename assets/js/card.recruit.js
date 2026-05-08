import { escapeHtml } from "./data.js";
import { renderTags } from "./tags.js";

const CHEVRON_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" class="card--recruit__chevron"><path stroke-linecap="round" stroke-linejoin="round" d="M6 9l6 6 6-6"/></svg>`;

function toggleCard(card, btn) {
  const isOpen = card.classList.contains("is-open");
  document.querySelectorAll(".card--recruit.is-open").forEach((other) => {
    other.classList.remove("is-open");
    other
      .querySelector(".card--recruit__btn")
      .setAttribute("aria-expanded", "false");
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
    <div class="card--recruit__main">
      <div class="card--recruit__content">
        <h5>${escapeHtml(program.program || "")}</h5>
        <div class="card--recruit__body">
          ${renderTags(program.tags)}
          ${program.body_en ? `<p>${escapeHtml(program.body_en)}</p>` : ""}
          ${program.body_ko ? `<p>${escapeHtml(program.body_ko)}</p>` : ""}
        </div>
      </div>
      <button class="card--recruit__btn" aria-expanded="false" aria-label="Toggle details">
        ${CHEVRON_SVG}
      </button>
    </div>
  `;

  const btn = card.querySelector(".card--recruit__btn");

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
