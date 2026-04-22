import { fetchJson, escapeHtml } from "./data.js";

const projectSlider = document.getElementById("project-slider");
const projectPrev = document.getElementById("project-prev");
const projectNext = document.getElementById("project-next");
const researchAreaList = document.getElementById("research-area-list");
const aboutMore = document.getElementById("about-more");
const aboutMoreBtn = document.getElementById("about-more-btn");

function renderProjects(projects) {
  if (!projectSlider || !Array.isArray(projects) || projects.length === 0) return;
  projectSlider.innerHTML = "";

  projects.forEach((project) => {
    const slide = document.createElement("div");
    slide.className = "project-slide";
    slide.style.backgroundImage = `url(${project.image || ""})`;
    slide.innerHTML = `
      <div class="project-content">
        <div class="type-eyebrow project-subtitle">${escapeHtml(project.subtitle || "")}</div>
        <div class="type-display project-title">${escapeHtml(project.title || "")}</div>
        <div class="type-body project-desc">${escapeHtml(project.description || "")}</div>
      </div>
    `;
    projectSlider.appendChild(slide);
  });

  let currentIndex = 0;

  function updateSlide() {
    projectSlider.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  projectNext?.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % projects.length;
    updateSlide();
  });

  projectPrev?.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + projects.length) % projects.length;
    updateSlide();
  });

  updateSlide();
}

function createContentCard(topic) {
  const item = document.createElement("article");
  item.className = "card card--content";

  item.innerHTML = `
    <div class="card-media">
      <img
        src="${topic.image || ""}"
        alt="${escapeHtml(topic.title || "")}"
        class="card-media-image"
      />
    </div>
    <div class="card-body">
      <h3 class="type-title card-title">${escapeHtml(topic.title || "")}</h3>
      <p class="type-body card-description">${escapeHtml(topic.description || "")}</p>
    </div>
  `;

  return item;
}

function renderTopics(topics) {
  if (!researchAreaList || !Array.isArray(topics)) return;
  researchAreaList.innerHTML = "";

  topics.forEach((topic) => {
    researchAreaList.appendChild(createContentCard(topic));
  });
}

function setupAboutToggle() {
  if (!aboutMore || !aboutMoreBtn) return;

  aboutMoreBtn.addEventListener("click", () => {
    const open = aboutMore.classList.toggle("is-open");
    aboutMoreBtn.textContent = open ? "Less" : "More";
  });
}

async function initHomePage() {
  try {
    const [projects, topics] = await Promise.all([
      fetchJson("assets/data/projects.json"),
      fetchJson("assets/data/topics.json")
    ]);

    renderProjects(projects);
    renderTopics(topics);
    setupAboutToggle();
  } catch (error) {
    console.error(error);
  }
}

initHomePage();
