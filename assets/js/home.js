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
        <h6 class="project-subtitle">${escapeHtml(project.subtitle || "")}</h6>
        <h1 class="project-title">${escapeHtml(project.title || "")}</h1>
        <p class="project-desc">${escapeHtml(project.description || "")}</p>
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

function createContentCard(item) {
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
      <h3 class="card-title">${escapeHtml(item.title || "")}</h3>
      <p class="card-description">${escapeHtml(item.description || "")}</p>
    </div>
  `;

    return card;
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
        const isOpen = aboutMore.classList.toggle("is-open");
        aboutMoreBtn.textContent = isOpen ? "Less" : "More";
    });
}

async function initHomePage() {
    try {
        const items = await fetchJson("assets/data/content.json");

        if (!Array.isArray(items)) return;

        const projects = items.filter((item) => item.type === "project");
        const topics = items.filter((item) => item.type === "topic");
        // const notices = items.filter((item) => item.type === "notice");

        renderProjects(projects);
        renderTopics(topics);
        setupAboutToggle();
    } catch (error) {
        console.error(error);
    }
}

initHomePage();