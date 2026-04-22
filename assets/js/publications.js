import { fetchJson, escapeHtml } from "./data.js";

const container = document.getElementById("publication-list");
const searchInput = document.getElementById("searchInput");
const typeButtons = document.querySelectorAll(".type-btn");

let publications = [];
let currentType = "all";

function formatMetaLine(pub) {
  let line = "";

  if (pub.source) line += pub.source;
  if (pub.detail) line += line ? ` ${pub.detail}` : pub.detail;
  if (pub.type !== "patent" && pub.year) line += ` (${pub.year})`;

  return line;
}

function createPublicationCard(pub) {
  const metaLine = formatMetaLine(pub);
  const cardInner = `
    <div class="type-body publication-title">${escapeHtml(pub.title || "")}</div>
    <div class="type-meta publication-meta">${escapeHtml(metaLine)}</div>
    <div class="type-meta publication-authors">${escapeHtml(pub.authors || "")}</div>
  `;

  let item;

  if (pub.link) {
    item = document.createElement("a");
    item.href = pub.link;
    item.target = "_blank";
    item.rel = "noopener noreferrer";
    item.className = "card card--interactive card--publication clickable";
    item.innerHTML = cardInner;
  } else {
    item = document.createElement("div");
    item.className = "card card--publication";
    item.innerHTML = cardInner;
  }

  return item;
}

function getFilteredPublications() {
  const keyword = (searchInput?.value || "").trim().toLowerCase();

  return publications
    .filter((pub) => {
      const matchesType = currentType === "all" || pub.type === currentType;

      const searchTarget = [
        pub.title || "",
        pub.authors || "",
        pub.source || "",
        pub.detail || "",
        String(pub.year || ""),
      ]
        .join(" ")
        .toLowerCase();

      return matchesType && searchTarget.includes(keyword);
    })
    .sort((a, b) => (b.year || 0) - (a.year || 0));
}

function renderPublications() {
  if (!container) return;

  container.innerHTML = "";

  const filtered = getFilteredPublications();

  if (filtered.length === 0) {
    container.innerHTML = '<div class="type-meta">No publications found.</div>';
    return;
  }

  filtered.forEach((pub) => {
    container.appendChild(createPublicationCard(pub));
  });
}

function setupFilters() {
  if (searchInput) {
    searchInput.addEventListener("input", renderPublications);
  }

  typeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      currentType = button.dataset.type || "all";

      typeButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      renderPublications();
    });
  });
}

async function initPublicationsPage() {
  try {
    publications = await fetchJson("assets/data/publications.json");
    setupFilters();
    renderPublications();
  } catch (error) {
    console.error(error);
    if (container) {
      container.innerHTML = '<div class="type-meta">Publication data could not be loaded.</div>';
    }
  }
}

initPublicationsPage();
