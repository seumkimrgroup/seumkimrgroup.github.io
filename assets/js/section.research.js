import { fetchJson, escapeHtml } from "./util.data.js";
import { createPublicationCard } from "./component.card.publication.js";
import { TAG_GROUP, renderTags } from "./component.tags.js";

const tabsRoot = document.querySelector("#research-areas .group");
const wrapperEl = document.querySelector("#research-swiper .swiper-wrapper");

export function selectArticles(topicTags, allPublications) {
  const pubTags = (pub) => (Array.isArray(pub.tags) ? pub.tags : []);
  const byDateDesc = (a, b) =>
    String(b.date || "").localeCompare(String(a.date || ""));

  const matching = allPublications
    .filter((pub) => topicTags.some((t) => pubTags(pub).includes(t)))
    .sort(byDateDesc);

  const featured = matching.filter((pub) => pubTags(pub).includes("FEATURED"));

  if (featured.length >= 4) return featured.slice(0, 3);

  const nonFeatured = matching.filter(
    (pub) => !pubTags(pub).includes("FEATURED"),
  );
  const result = [...featured];
  for (const pub of nonFeatured) {
    if (result.length >= 3) break;
    result.push(pub);
  }

  return result.sort(byDateDesc);
}

export function createPanel(slideEl, topic, allPublications) {
  const topicTags = Array.isArray(topic.tag) ? topic.tag : [];

  slideEl.innerHTML = `
    <div class="split split--46">
      <div class="media">
        <img src="${escapeHtml(topic.image)}" alt="${escapeHtml(topic.title)}">
      </div>
      <div class="stack--sm">
        <h3>${escapeHtml(topic.title)}</h3>
        ${renderTags(topicTags)}
        <p>${escapeHtml(topic.description)}</p>
      </div>
    </div>
    <div class="stack">
      <h4>Featured Articles</h4>
    </div>
  `;

  const listEl = slideEl.querySelector(":scope > .stack");
  const articles = selectArticles(topicTags, allPublications);

  if (articles.length) {
    articles.forEach((pub) => listEl.appendChild(createPublicationCard(pub)));
  } else {
    listEl.innerHTML = `<p>No related publications found.</p>`;
  }
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

async function initResearchFeature() {
  if (!tabsRoot || !wrapperEl) return;

  try {
    const [contents, publications] = await Promise.all([
      fetchJson("/assets/data/contents.json"),
      fetchJson("/assets/data/publications.json"),
    ]);

    const topics = contents.filter((item) => item.type === "topic");

    if (!topics.length) {
      wrapperEl.innerHTML = `<div class="swiper-slide"><p>No research topics found.</p></div>`;
      return;
    }

    tabsRoot.innerHTML = "";
    wrapperEl.innerHTML = "";

    topics.forEach((topic, index) => {
      const tab = createTab(topic, index);
      if (index === 0) tab.classList.add("active");
      tabsRoot.appendChild(tab);

      const slide = document.createElement("div");
      slide.className = "swiper-slide";
      createPanel(slide, topic, publications);
      wrapperEl.appendChild(slide);
    });

    const swiper = new Swiper("#research-swiper", {
      autoHeight: true,
      speed: 460,
      loop: false,
      on: {
        slideChange(sw) {
          const tabs = tabsRoot.querySelectorAll(".areas-tab");
          tabs.forEach((tab, i) =>
            tab.classList.toggle("active", i === sw.activeIndex),
          );
        },
      },
    });

    tabsRoot.querySelectorAll(".areas-tab").forEach((tab, i) => {
      tab.addEventListener("click", () => swiper.slideTo(i));
    });
  } catch (error) {
    console.error(error);
    wrapperEl.innerHTML = `<div class="swiper-slide"><p>Research areas could not be loaded.</p></div>`;
  }
}

initResearchFeature();
