import { fetchJson, escapeHtml } from "./data-api.js";

const container = document.getElementById("publication-list");
const searchInput = document.getElementById("searchInput");
const typeButtons = document.querySelectorAll(".type-btn");
let currentType = "all";
let publications = [];

function formatMetaLine(pub) {
  let line = "";
  if (pub.source) line += pub.source;
  if (pub.detail) line += line ? ` ${pub.detail}` : pub.detail;
  if (pub.type !== "patent" && pub.year) line += ` (${pub.year})`;
  return line;
}
function renderEmptyState(message) { container.innerHTML = `<div class="type-meta">${escapeHtml(message)}</div>`; }
function renderPublications() {
  const keyword = searchInput.value.trim().toLowerCase();
  container.innerHTML = "";
  const filtered = publications.filter((pub) => {
    const matchesType = currentType === "all" || pub.type === currentType;
    const searchTarget = [pub.title || "", pub.authors || "", pub.source || "", pub.detail || "", String(pub.year || "")].join(" ").toLowerCase();
    return matchesType && searchTarget.includes(keyword);
  });
  if (filtered.length === 0) return renderEmptyState("No publications found.");
  filtered.sort((a, b) => (b.year || 0) - (a.year || 0)).forEach((pub) => {
    const metaLine = formatMetaLine(pub);
    const cardInner = `<div class="type-body publication-title">${escapeHtml(pub.title || "")}</div><div class="type-meta publication-meta">${escapeHtml(metaLine)}</div><div class="type-meta publication-authors">${escapeHtml(pub.authors || "")}</div>`;
    let item;
    if (pub.link) { item = document.createElement("a"); item.href = pub.link; item.target = "_blank"; item.rel = "noopener noreferrer"; item.className = "card card--interactive publication-card clickable"; item.innerHTML = cardInner; }
    else { item = document.createElement("div"); item.className = "card publication-card"; item.innerHTML = cardInner; }
    container.appendChild(item);
  });
}
function bindEvents() {
  typeButtons.forEach((button) => button.addEventListener("click", () => {
    typeButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    currentType = button.dataset.type;
    renderPublications();
  }));
  searchInput.addEventListener("input", renderPublications);
}
async function initPublicationsPage() {
  try {
    publications = await fetchJson("assets/data/publications.json");
    bindEvents();
    renderPublications();
  } catch (error) {
    console.error(error);
    renderEmptyState("Publication data could not be loaded.");
  }
}
initPublicationsPage();
