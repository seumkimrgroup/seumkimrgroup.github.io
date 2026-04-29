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
    const GAP = 16;
    const AUTO_INTERVAL = 10000;

    let itemsPerPage = 1;
    let cardWidth = 0;
    let step = 0;
    let cloneCount = 0;
    let isJumping = false;
    let autoTimer = null;
    let snapTimer = null;
    let resizeTimer = null;

    const prevBtn = document.getElementById("research-area-prev");
    const nextBtn = document.getElementById("research-area-next");
    const dotsEl = document.getElementById("research-area-dots");

    if (dotsEl) dotsEl.style.display = "none";

    function getItemsPerPage(width, total) {
        let n;

        if (width > 1200) n = 4;
        else if (width > 800) n = 3;
        else if (width > 500) n = 2;
        else n = 1;

        return Math.min(n, total);
    }

    function rebuild() {
        const width = clipEl.clientWidth;

        itemsPerPage = getItemsPerPage(width, topics.length);
        cloneCount = itemsPerPage;
        cardWidth = (width - (itemsPerPage - 1) * GAP) / itemsPerPage;
        step = cardWidth + GAP;

        const allTopics = [
            ...topics.slice(-cloneCount),
            ...topics,
            ...topics.slice(0, cloneCount),
        ];

        researchAreaList.innerHTML = "";
        researchAreaList.style.gap = `${GAP}px`;

        allTopics.forEach((topic) => {
            const card = createContentCard(topic);
            card.style.flex = `0 0 ${cardWidth}px`;
            card.style.minWidth = `${cardWidth}px`;
            researchAreaList.appendChild(card);
        });

        jumpTo(cloneCount * step);
    }

    function getNearestIndex() {
        return Math.round(clipEl.scrollLeft / step);
    }

    function snapToNearest() {
        if (isJumping || !step) return;

        const nearest = getNearestIndex();

        clipEl.scrollTo({
            left: nearest * step,
            behavior: "smooth",
        });
    }

    function jumpTo(left) {
        isJumping = true;

        clipEl.classList.add("is-jumping");
        clipEl.scrollLeft = left;

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                clipEl.classList.remove("is-jumping");
                isJumping = false;
            });
        });
    }

    function normalizeScroll() {
        if (isJumping || !step) return;

        const start = cloneCount * step;
        const end = (cloneCount + topics.length) * step;

        if (clipEl.scrollLeft >= end) {
            jumpTo(clipEl.scrollLeft - topics.length * step);
        } else if (clipEl.scrollLeft < start) {
            jumpTo(clipEl.scrollLeft + topics.length * step);
        }
    }

    function scrollStep(direction) {
        if (!step) return;

        const current = getNearestIndex();
        const next = current + direction;

        clipEl.scrollTo({
            left: next * step,
            behavior: "smooth",
        });
    }

    function startAuto() {
        clearInterval(autoTimer);
        autoTimer = setInterval(() => scrollStep(1), AUTO_INTERVAL);
    }

    function stopAuto() {
        clearInterval(autoTimer);
    }

    clipEl.addEventListener("scroll", () => {
        if (isJumping) return;

        clearTimeout(snapTimer);

        snapTimer = setTimeout(() => {
            snapToNearest();

            setTimeout(() => {
                normalizeScroll();
            }, 160);
        }, 120);
    });

    clipEl.addEventListener("touchstart", stopAuto, { passive: true });
    clipEl.addEventListener("touchend", startAuto, { passive: true });

    clipEl.addEventListener("mouseenter", stopAuto);
    clipEl.addEventListener("mouseleave", startAuto);

    prevBtn?.addEventListener("click", () => {
        startAuto();
        scrollStep(-1);
    });

    nextBtn?.addEventListener("click", () => {
        startAuto();
        scrollStep(1);
    });

    window.addEventListener("resize", () => {
        clearTimeout(resizeTimer);

        resizeTimer = setTimeout(() => {
            rebuild();
        }, 100);
    });

    rebuild();
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