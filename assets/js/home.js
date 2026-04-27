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

    let pageIndex = 1;
    let isDragging = false;
    let startX = 0;
    let autoTimer = null;
    let pages = [];
    let totalRealPages = 0;
    let carouselWidth = 0;
    let isChanging = false;

    const prevBtn = document.getElementById("research-area-prev");
    const nextBtn = document.getElementById("research-area-next");
    const dotsEl = document.getElementById("research-area-dots");

    function getItemsPerPage(width) {
        if (width > 1200) return 4;
        if (width > 800) return 3;
        if (width > 500) return 2;
        return 1;
    }

    function rebuild() {
        carouselWidth = clipEl.offsetWidth;
        const n = getItemsPerPage(carouselWidth);

        const realPages = [];
        for (let i = 0; i < topics.length; i += n) {
            realPages.push(topics.slice(i, i + n));
        }
        totalRealPages = realPages.length;

        pages = [realPages[totalRealPages - 1], ...realPages, realPages[0]];

        researchAreaList.innerHTML = "";
        pages.forEach((page) => {
            const pageEl = document.createElement("div");
            pageEl.className = "research-area-page";
            pageEl.style.width = `${carouselWidth}px`;
            pageEl.style.minWidth = `${carouselWidth}px`;
            pageEl.style.gap = `${GAP}px`;
            page.forEach((topic) => pageEl.appendChild(createContentCard(topic)));
            for (let j = page.length; j < n; j++) {
                const spacer = document.createElement("div");
                spacer.style.flex = "1";
                spacer.style.minWidth = "0";
                pageEl.appendChild(spacer);
            }
            researchAreaList.appendChild(pageEl);
        });

        if (dotsEl) {
            dotsEl.innerHTML = "";
            for (let i = 0; i < totalRealPages; i++) {
                const dot = document.createElement("button");
                dot.className = "research-area-dot";
                dot.setAttribute("aria-label", `Page ${i + 1}`);
                const capturedI = i;
                dot.addEventListener("click", () => changePage(capturedI + 1));
                dotsEl.appendChild(dot);
            }
        }

        updateDots();
    }

    function updateDots() {
        if (!dotsEl) return;
        const dots = dotsEl.querySelectorAll(".research-area-dot");
        let realIdx = pageIndex - 1;
        if (realIdx < 0) realIdx = totalRealPages - 1;
        if (realIdx >= totalRealPages) realIdx = 0;
        dots.forEach((dot, i) => dot.classList.toggle("is-active", i === realIdx));
    }

    function applyTranslate(instant) {
        researchAreaList.style.transition = instant ? "none" : `transform ${TRANSITION_MS}ms ease`;
        researchAreaList.style.transform = `translateX(${-pageIndex * carouselWidth}px)`;
    }

    function changePage(newIdx) {
        if (isChanging) return;
        isChanging = true;
        pageIndex = newIdx;
        applyTranslate(false);
        updateDots();

        setTimeout(() => {
            let jumped = false;
            if (pageIndex === pages.length - 1) { pageIndex = 1; jumped = true; }
            else if (pageIndex === 0) { pageIndex = totalRealPages; jumped = true; }
            if (jumped) { applyTranslate(true); updateDots(); }
            isChanging = false;
        }, TRANSITION_MS);
    }

    function startAuto() {
        clearInterval(autoTimer);
        autoTimer = setInterval(() => {
            if (!isDragging) changePage(pageIndex + 1);
        }, AUTO_INTERVAL);
    }

    prevBtn?.addEventListener("click", () => changePage(pageIndex - 1));
    nextBtn?.addEventListener("click", () => changePage(pageIndex + 1));

    // Mouse drag
    researchAreaList.addEventListener("mousedown", (e) => {
        isDragging = true;
        startX = e.clientX;
        clearInterval(autoTimer);
        researchAreaList.style.cursor = "grabbing";
    });

    window.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        researchAreaList.style.transition = "none";
        researchAreaList.style.transform = `translateX(${-pageIndex * carouselWidth + e.clientX - startX}px)`;
    });

    window.addEventListener("mouseup", (e) => {
        if (!isDragging) return;
        isDragging = false;
        researchAreaList.style.cursor = "grab";
        const delta = e.clientX - startX;
        if (Math.abs(delta) > 50) changePage(delta < 0 ? pageIndex + 1 : pageIndex - 1);
        else applyTranslate(false);
        startAuto();
    });

    researchAreaList.addEventListener("dragstart", (e) => e.preventDefault());

    // Touch drag
    researchAreaList.addEventListener("touchstart", (e) => {
        isDragging = true;
        startX = e.touches[0].clientX;
        clearInterval(autoTimer);
    }, { passive: true });

    researchAreaList.addEventListener("touchmove", (e) => {
        if (!isDragging) return;
        researchAreaList.style.transition = "none";
        researchAreaList.style.transform = `translateX(${-pageIndex * carouselWidth + e.touches[0].clientX - startX}px)`;
    }, { passive: true });

    researchAreaList.addEventListener("touchend", (e) => {
        if (!isDragging) return;
        isDragging = false;
        const delta = e.changedTouches[0].clientX - startX;
        if (Math.abs(delta) > 50) changePage(delta < 0 ? pageIndex + 1 : pageIndex - 1);
        else applyTranslate(false);
        startAuto();
    });

    // Resize
    let resizeTimer = null;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            pageIndex = 1;
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