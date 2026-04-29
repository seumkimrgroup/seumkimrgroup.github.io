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
    const AUTO_INTERVAL = 3500;

    let itemsPerPage = 1;
    let cardWidth = 0;
    let step = 0;
    let autoTimer = null;
    let resizeTimer = null;
    let scrollTimer = null;

    const prevBtn = document.getElementById("research-area-prev");
    const nextBtn = document.getElementById("research-area-next");
    const dotsEl = document.getElementById("research-area-dots");

    if (dotsEl) dotsEl.style.display = "none";

    function getItemsPerPage(width, total) {
        let n;

        if (width > 1200) n = 3;
        else if (width > 600) n = 2;
        else n = 1;

        return Math.min(n, total);
    }

    function stopAuto() {
        clearInterval(autoTimer);
        autoTimer = null;
    }

    function startAuto() {
        stopAuto();

        // 화면에 3개 보이면 자동 스크롤 안 함
        if (itemsPerPage >= 3) return;

        // 카드가 1개뿐이면 자동 스크롤 안 함
        if (topics.length <= 1) return;

        autoTimer = setInterval(() => {
            scrollOne(1);
        }, AUTO_INTERVAL);
    }

    function updateButtons() {
        // 화면에 1개 보이면 버튼 숨김
        const showButtons = itemsPerPage > 1 && topics.length > itemsPerPage;

        if (prevBtn) prevBtn.style.display = showButtons ? "flex" : "none";
        if (nextBtn) nextBtn.style.display = showButtons ? "flex" : "none";
    }

    function render() {
        const width = clipEl.clientWidth;

        itemsPerPage = getItemsPerPage(width, topics.length);
        cardWidth = (width - (itemsPerPage - 1) * GAP) / itemsPerPage;
        step = cardWidth + GAP;

        researchAreaList.innerHTML = "";
        researchAreaList.style.gap = `${GAP}px`;

        topics.forEach((topic) => {
            const card = createContentCard(topic);
            card.style.flex = `0 0 ${cardWidth}px`;
            card.style.minWidth = `${cardWidth}px`;
            researchAreaList.appendChild(card);
        });

        clipEl.scrollLeft = 0;

        updateButtons();
        startAuto();
    }

    function scrollOne(direction) {
        if (!step) return;

        const max = clipEl.scrollWidth - clipEl.clientWidth;
        const next = clipEl.scrollLeft + direction * step;

        if (direction > 0 && next >= max) {
            clipEl.scrollTo({
                left: 0,
                behavior: "smooth",
            });
        } else if (direction < 0 && next <= 0) {
            clipEl.scrollTo({
                left: max,
                behavior: "smooth",
            });
        } else {
            clipEl.scrollBy({
                left: direction * step,
                behavior: "smooth",
            });
        }
    }

    function resetIfAtEnd() {
        const max = clipEl.scrollWidth - clipEl.clientWidth;

        if (clipEl.scrollLeft >= max - 5) {
            clipEl.scrollTo({
                left: 0,
                behavior: "smooth",
            });
        }
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

    clipEl.addEventListener("scroll", () => {
        clearTimeout(scrollTimer);

        scrollTimer = setTimeout(() => {
            resetIfAtEnd();
        }, 250);
    });

    clipEl.addEventListener("touchstart", stopAuto, { passive: true });
    clipEl.addEventListener("touchend", startAuto, { passive: true });

    clipEl.addEventListener("mouseenter", stopAuto);
    clipEl.addEventListener("mouseleave", startAuto);

    window.addEventListener("resize", () => {
        clearTimeout(resizeTimer);

        resizeTimer = setTimeout(() => {
            render();
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