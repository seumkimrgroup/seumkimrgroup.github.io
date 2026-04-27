import { escapeHtml } from "./data.js";

export function createContentCard(item) {
    const card = document.createElement("article");
    card.className = `card card--content card--${item.type || "default"}`;

    card.innerHTML = `
    <div class="card-media">
      <img
        src="${item.image || ""}"
        alt="${escapeHtml(item.title || "")}"
        class="card-media-image"
      />
    </div>
    <div class="card-body">
      <h4 class="card-title">${escapeHtml(item.title || "")}</h4>
      <p class="card-description">${escapeHtml(item.description || "")}</p>
    </div>
  `;

    return card;
}
