import { escapeHtml } from "./data.js";

export function createPublicationCard(pub) {
    const cardInner = `
    <p class="publication-title">${escapeHtml(pub.title || "")}</p>
    <h5 class="publication-meta">${escapeHtml(pub.source || "")}</h5>
    <h5 class="publication-authors">${escapeHtml(pub.authors || "")}</h5>
  `;

    if (pub.link) {
        const item = document.createElement("a");
        item.href = pub.link;
        item.target = "_blank";
        item.rel = "noopener noreferrer";
        item.className = "card card--interactive card--publication clickable";
        item.innerHTML = cardInner;
        return item;
    }

    const item = document.createElement("div");
    item.className = "card card--publication";
    item.innerHTML = cardInner;
    return item;
}