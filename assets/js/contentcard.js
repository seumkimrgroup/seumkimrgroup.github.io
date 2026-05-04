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

    return `<p class="text-secondary">Read more at ${joined}.</p>`;
}

export function createContentCard(item) {
    const card = document.createElement("article");
    card.className = "card card--update";

    card.innerHTML = `
    <div class="media">
      <img
        src="${item.image || ""}"
        alt="${escapeHtml(item.title || "")}"
      />
    </div>
    <div class="info">
      ${item.type ? `<h6>${escapeHtml(item.type.charAt(0).toUpperCase() + item.type.slice(1))}</h6>` : ""}
      ${item.title ? `<h4>${escapeHtml(item.title)}</h4>` : ""}
      <p>${escapeHtml(item.description || "")}</p>
      ${renderLinks(item.links)}
    </div>
  `;

    return card;
}
