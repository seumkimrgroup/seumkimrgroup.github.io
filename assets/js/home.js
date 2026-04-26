import { fetchJson, escapeHtml } from "./data.js";
import { createContentCard } from "./contentcard.js";

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

function renderTopics(topics) {
    if (!researchAreaList || !Array.isArray(topics) || topics.length === 0) return;

    researchAreaList.innerHTML = "";
    topics.forEach((topic) => researchAreaList.appendChild(createContentCard(topic)));

    const CARD_WIDTH = 320;
    const GAP = 16;
    let currentIndex = 0;

    const prevBtn = document.getElementById("research-area-prev");
    const nextBtn = document.getElementById("research-area-next");

    function getMaxIndex() {
        const clipWidth = researchAreaList.parentElement.offsetWidth;
        const visible = Math.floor((clipWidth + GAP) / (CARD_WIDTH + GAP));
        return Math.max(0, topics.length - visible);
    }

    function update() {
        researchAreaList.style.transform = `translateX(-${currentIndex * (CARD_WIDTH + GAP)}px)`;
        const max = getMaxIndex();
        if (prevBtn) prevBtn.disabled = currentIndex === 0;
        if (nextBtn) nextBtn.disabled = currentIndex >= max;
    }

    nextBtn?.addEventListener("click", () => {
        currentIndex = Math.min(currentIndex + 1, getMaxIndex());
        update();
    });

    prevBtn?.addEventListener("click", () => {
        currentIndex = Math.max(currentIndex - 1, 0);
        update();
    });

    window.addEventListener("resize", () => {
        currentIndex = Math.min(currentIndex, getMaxIndex());
        update();
    });

    update();
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

        renderProjects(projects);
        renderTopics(topics);
        setupAboutToggle();
    } catch (error) {
        console.error(error);
    }
}

initHomePage();