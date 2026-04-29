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
    const AUTO_INTERVAL = 3500;

    let autoTimer = null;
    let resizeTimer = null;

    const prevBtn = document.getElementById("research-area-prev");
    const nextBtn = document.getElementById("research-area-next");
    const dotsEl = document.getElementById("research-area-dots");

    if (dotsEl) dotsEl.style.display = "none";

    function getGap() {
        const style = getComputedStyle(researchAreaList);
        return parseFloat(style.gap) || 0;
    }

    function getCardWidth() {
        const firstCard = researchAreaList.querySelector(".card");
        if (!firstCard) return 0;

        return firstCard.offsetWidth;
    }

    function getStep() {
        const cardWidth = getCardWidth();
        if (!cardWidth) return 0;

        return cardWidth + getGap();
    }

    function getVisibleCount() {
        const cardWidth = getCardWidth();
        const gap = getGap();

        if (!cardWidth) return 1;

        return Math.floor((clipEl.clientWidth + gap) / (cardWidth + gap));
    }

    function isScrollable() {
        return clipEl.scrollWidth > clipEl.clientWidth + 5;
    }

    function stopAuto() {
        clearInterval(autoTimer);
        autoTimer = null;
    }

    function startAuto() {
        stopAuto();

        const visibleCount = getVisibleCount();

        // 3개가 다 보이면 자동 스크롤 안 함
        if (visibleCount >= 3) return;

        // 스크롤할 내용이 없으면 자동 스크롤 안 함
        if (!isScrollable()) return;

        // 2개 또는 1개만 보이는 경우 자동 스크롤
        autoTimer = setInterval(() => {
            scrollOne(1);
        }, AUTO_INTERVAL);
    }

    function updateButtons() {
        const visibleCount = getVisibleCount();

        // 2개 보이는 화면에서만 버튼 표시
        const showButtons = visibleCount === 2 && isScrollable();

        if (prevBtn) prevBtn.style.display = showButtons ? "flex" : "none";
        if (nextBtn) nextBtn.style.display = showButtons ? "flex" : "none";
    }

    function scrollOne(direction) {
        const step = getStep();
        if (!step) return;

        const max = clipEl.scrollWidth - clipEl.clientWidth;
        const current = clipEl.scrollLeft;
        const next = current + direction * step;

        // 오른쪽으로 넘기다가 끝에 도달하면 처음으로
        if (direction > 0 && next >= max - 5) {
            clipEl.scrollTo({
                left: 0,
                behavior: "smooth",
            });
            return;
        }

        // 왼쪽으로 넘기다가 처음보다 앞이면 끝으로
        if (direction < 0 && current <= 5) {
            clipEl.scrollTo({
                left: max,
                behavior: "smooth",
            });
            return;
        }

        clipEl.scrollBy({
            left: direction * step,
            behavior: "smooth",
        });
    }

    function render() {
        researchAreaList.innerHTML = "";

        topics.forEach((topic) => {
            const card = createContentCard(topic);
            researchAreaList.appendChild(card);
        });

        clipEl.scrollLeft = 0;

        requestAnimationFrame(() => {
            updateButtons();
            startAuto();
        });
    }

    prevBtn?.addEventListener("click", () => {
        stopAuto();
        scrollOne(-1);
        startAuto();
    });

    nextBtn?.addEventListener("click", () => {
        stopAuto();
        scrollOne(1);
        startAuto();
    });

    clipEl.addEventListener("touchstart", stopAuto, { passive: true });
    clipEl.addEventListener("touchend", startAuto, { passive: true });

    clipEl.addEventListener("mouseenter", stopAuto);
    clipEl.addEventListener("mouseleave", startAuto);

    window.addEventListener("resize", () => {
        clearTimeout(resizeTimer);

        resizeTimer = setTimeout(() => {
            stopAuto();
            clipEl.scrollLeft = 0;

            updateButtons();
            startAuto();
        }, 100);
    });

    render();
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