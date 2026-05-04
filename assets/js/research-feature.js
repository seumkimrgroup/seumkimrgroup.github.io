import { fetchJson, escapeHtml } from "./data.js";
import { createPublicationCard } from "./publicationcard.js";

const tabsRoot = document.getElementById("areas-tabs");
const track = document.getElementById("areas-track");

const TAG_GROUP = {
  JQL: "project", TACTILE: "project", SW: "project",
  "LC-EO": "topic", "LC-COMP": "topic", "ML-FEA": "topic",
  PSLC: "method", CLCE: "method", LCE: "method",
  PIC: "method", THERM: "method", MECH: "method", ELEC: "method",
  FEATURED: "featured",
};

const GROUP_ORDER = ["project", "topic", "method", "featured"];

export function renderTags(tags) {
  if (!tags || !tags.length) return "";

  const sorted = [...tags].sort((a, b) => {
    const ga = GROUP_ORDER.indexOf(TAG_GROUP[a] ?? "");
    const gb = GROUP_ORDER.indexOf(TAG_GROUP[b] ?? "");
    return (ga === -1 ? 99 : ga) - (gb === -1 ? 99 : gb);
  });

  return `<div class="group">
    ${sorted.map((tag) => {
      const group = TAG_GROUP[tag];
      const cls = group ? `tag tag--${group}` : "tag";
      return `<span class="${cls}">${escapeHtml(tag)}</span>`;
    }).join("")}
  </div>`;
}

export function selectArticles(topicTags, allPublications) {
  const pubTags = (pub) => (Array.isArray(pub.tags) ? pub.tags : []);
  const byDateDesc = (a, b) => String(b.date || "").localeCompare(String(a.date || ""));

  const matching = allPublications
    .filter((pub) => topicTags.some((t) => pubTags(pub).includes(t)))
    .sort(byDateDesc);

  const featured = matching.filter((pub) => pubTags(pub).includes("FEATURED"));

  if (featured.length >= 4) return featured.slice(0, 3);

  const nonFeatured = matching.filter((pub) => !pubTags(pub).includes("FEATURED"));
  const result = [...featured];
  for (const pub of nonFeatured) {
    if (result.length >= 3) break;
    result.push(pub);
  }

  return result.sort(byDateDesc);
}

export function createPanel(topic, allPublications) {
  const panel = document.createElement("article");
  panel.className = "areas-panel";

  const topicTags = Array.isArray(topic.tag) ? topic.tag : [];

  panel.innerHTML = `
    <div class="areas-main">
      <div class="media">
        <img src="${escapeHtml(topic.image)}" alt="${escapeHtml(topic.title)}">
      </div>
      <div class="info">
        ${renderTags(topicTags)}
        <h3>${escapeHtml(topic.title)}</h3>
        <p>${escapeHtml(topic.description)}</p>
      </div>
    </div>
    <div class="stack">
      <h4>Featured Articles</h4>
    </div>
  `;

  const listEl = panel.querySelector(".stack");
  const articles = selectArticles(topicTags, allPublications);

  if (articles.length) {
    articles.forEach((pub) => listEl.appendChild(createPublicationCard(pub)));
  } else {
    listEl.innerHTML = `<p>No related publications found.</p>`;
  }

  return panel;
}

function createTab(topic, index) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "btn areas-tab";
  button.dataset.index = String(index);

  const tags = Array.isArray(topic.tag) ? topic.tag : [];
  const shortName = tags.find((t) => TAG_GROUP[t] === "topic") ?? topic.title;

  button.innerHTML = `<span class="tab-short">${escapeHtml(shortName)}</span><span class="tab-full">${escapeHtml(topic.title)}</span>`;
  return button;
}

function setActive(index) {
  const tabs = tabsRoot.querySelectorAll(".areas-tab");
  track.style.transform = `translateX(-${index * 100}%)`;
  tabs.forEach((tab, i) => tab.classList.toggle("active", i === index));
}

async function initResearchFeature() {
  if (!tabsRoot || !track) return;

  try {
    const [contents, publications] = await Promise.all([
      fetchJson("assets/data/contents.json"),
      fetchJson("assets/data/publications.json"),
    ]);

    const topics = contents.filter((item) => item.type === "topic");

    if (!topics.length) {
      track.innerHTML = `<article class="areas-panel"><p>No research topics found.</p></article>`;
      return;
    }

    tabsRoot.innerHTML = "";
    track.innerHTML = "";

    topics.forEach((topic, index) => {
      const tab = createTab(topic, index);
      const panel = createPanel(topic, publications);

      tab.addEventListener("click", () => setActive(index));

      tabsRoot.appendChild(tab);
      track.appendChild(panel);
    });

    setActive(0);
  } catch (error) {
    console.error(error);
    track.innerHTML = `<article class="areas-panel"><p>Research areas could not be loaded.</p></article>`;
  }
}

initResearchFeature();
