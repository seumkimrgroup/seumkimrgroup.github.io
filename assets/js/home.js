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
      <div class="project-slide-inner">
        <div class="project-content">
          <h6 class="project-subtitle">${escapeHtml(project.subtitle || "")}</h6>
          <h1 class="project-title">${escapeHtml(project.title || "")}</h1>
          <p class="project-desc">${escapeHtml(project.description || "")}</p>
        </div>
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

    const clipEl = researchAreaList.parentElement;
    const AUTO_INTERVAL = 10000;
    const GAP = 16;
    const TRANSITION_MS = 400;

    let currentIndex = 0;
    let cloneCount = 0;
    let step = 0;
    let isDragging = false;
    let startX = 0;
    let autoTimer = null;
    let isChanging = false;

    const prevBtn = document.getElementById("research-area-prev");
    const nextBtn = document.getElementById("research-area-next");
    const dotsEl = document.getElementById("research-area-dots");

    if (dotsEl) dotsEl.style.display = "none";

    function getItemsPerPage(width) {
        if (width > 1200) return 4;
        if (width > 800) return 3;
        if (width > 500) return 2;
        return 1;
    }

    function rebuild() {
        const carouselWidth = clipEl.offsetWidth;
        const n = getItemsPerPage(carouselWidth);
        cloneCount = n;
        const cardWidth = (carouselWidth - (n - 1) * GAP) / n;
        step = cardWidth + GAP;

        // prefix: last n topics, real: all topics, suffix: first n topics
        const allTopics = [
            ...topics.slice(-cloneCount),
            ...topics,
            ...topics.slice(0, cloneCount),
        ];

        researchAreaList.innerHTML = "";
        researchAreaList.style.gap = `${GAP}px`;
        allTopics.forEach((topic) => {
            const card = createContentCard(topic);
            card.style.width = `${cardWidth}px`;
            card.style.minWidth = `${cardWidth}px`;
            card.style.flexShrink = "0";
            researchAreaList.appendChild(card);
        });

        currentIndex = cloneCount;
    }

    function applyTranslate(instant) {
        researchAreaList.style.transition = instant ? "none" : `transform ${TRANSITION_MS}ms ease`;
        researchAreaList.style.transform = `translateX(${-currentIndex * step}px)`;
    }

    function changePage(direction) {
        if (isChanging) return;
        isChanging = true;
        currentIndex += direction;
        applyTranslate(false);

        setTimeout(() => {
            if (currentIndex >= cloneCount + topics.length) {
                currentIndex -= topics.length;
                applyTranslate(true);
            } else if (currentIndex < cloneCount) {
                currentIndex += topics.length;
                applyTranslate(true);
            }
            isChanging = false;
        }, TRANSITION_MS);
    }

    function startAuto() {
        clearInterval(autoTimer);
        autoTimer = setInterval(() => {
            if (!isDragging) changePage(1);
        }, AUTO_INTERVAL);
    }

    prevBtn?.addEventListener("click", () => { startAuto(); changePage(-1); });
    nextBtn?.addEventListener("click", () => { startAuto(); changePage(1); });

    researchAreaList.addEventListener("mousedown", (e) => {
        isDragging = true;
        startX = e.clientX;
        clearInterval(autoTimer);
        researchAreaList.style.cursor = "grabbing";
    });

    window.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        researchAreaList.style.transition = "none";
        researchAreaList.style.transform = `translateX(${-currentIndex * step + e.clientX - startX}px)`;
    });

    window.addEventListener("mouseup", (e) => {
        if (!isDragging) return;
        isDragging = false;
        researchAreaList.style.cursor = "grab";
        const delta = e.clientX - startX;
        if (Math.abs(delta) > 50) changePage(delta < 0 ? 1 : -1);
        else applyTranslate(false);
        startAuto();
    });

    researchAreaList.addEventListener("dragstart", (e) => e.preventDefault());

    let startY = 0;
    let touchAxis = null; // "h" | "v" | null

    researchAreaList.addEventListener("touchstart", (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        touchAxis = null;
        isDragging = false;
        clearInterval(autoTimer);
    }, { passive: true });

    researchAreaList.addEventListener("touchmove", (e) => {
        const dx = e.touches[0].clientX - startX;
        const dy = e.touches[0].clientY - startY;

        if (!touchAxis) {
            if (Math.abs(dx) < 5 && Math.abs(dy) < 5) return;
            touchAxis = Math.abs(dx) >= Math.abs(dy) ? "h" : "v";
        }

        if (touchAxis === "v") return;

        e.preventDefault();
        isDragging = true;
        researchAreaList.style.transition = "none";
        researchAreaList.style.transform = `translateX(${-currentIndex * step + dx}px)`;
    }, { passive: false });

    researchAreaList.addEventListener("touchend", (e) => {
        if (!isDragging) {
            startAuto();
            return;
        }
        isDragging = false;
        const delta = e.changedTouches[0].clientX - startX;
        if (Math.abs(delta) > 50) changePage(delta < 0 ? 1 : -1);
        else applyTranslate(false);
        startAuto();
    });

    let resizeTimer = null;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            rebuild();
            applyTranslate(true);
        }, 50);
    });

    rebuild();
    applyTranslate(true);
    startAuto();
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
        const items = await fetchJson("assets/data/contents.json");

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