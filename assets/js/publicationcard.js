import { escapeHtml } from "./data.js";

export function createPublicationCard(pub) {
    const cardInner = `
    <h4>${escapeHtml(pub.title || "")}</h4>
    <h5>${escapeHtml(pub.source || "")}</h5>
    <p>${escapeHtml(pub.authors || "")}</p>
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