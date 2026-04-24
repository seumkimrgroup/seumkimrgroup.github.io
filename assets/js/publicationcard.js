import { escapeHtml } from "./data.js";

export function createPublicationCard(pub) {
    const cardInner = `
    <div class="type-body publication-title">${escapeHtml(pub.title || "")}</div>
    <div class="type-meta publication-meta">${escapeHtml(pub.source || "")}</div>
    <div class="type-meta publication-authors">${escapeHtml(pub.authors || "")}</div>
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