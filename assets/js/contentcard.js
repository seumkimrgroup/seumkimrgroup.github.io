import { escapeHtml } from "./data.js";

function renderLinks(links) {
    if (!Array.isArray(links) || !links.length) return "";

    const anchors = links.map((link) =>
        `<a href="${escapeHtml(link.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(link.text)}</a>`
    );

    let joined;
    if (anchors.length === 1) {
        joined = anchors[0];
    } else if (anchors.length === 2) {
        joined = `${anchors[0]} and ${anchors[1]}`;
    } else {
        joined = `${anchors.slice(0, -1).join(", ")}, and ${anchors[anchors.length - 1]}`;
    }

    return `<p class="card-links">Read more at ${joined}.</p>`;
}

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
      ${renderLinks(item.links)}
    </div>
  `;

    return card;
}
