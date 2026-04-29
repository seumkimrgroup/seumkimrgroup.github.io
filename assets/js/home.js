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
    const prevBtn = document.getElementById("research-area-prev");
    const nextBtn = document.getElementById("research-area-next");
    const dotsEl = document.getElementById("research-area-dots");

    const GAP = 16;
    const MOBILE_HIDE_BUTTON_WIDTH = 420;

    let currentPage = 0;
    let resizeTimer = null;

    if (dotsEl) dotsEl.style.display = "none";

    function getCardWidth() {
        const firstCard = researchAreaList.querySelector(".card--content");
        if (!firstCard) return 0;

        return firstCard.getBoundingClientRect().width;
    }

    function getStep() {
        return getCardWidth() + GAP;
    }

    function getVisibleCount() {
        const cardWidth = getCardWidth();
        if (!cardWidth) return 1;

        const visible = Math.floor((clipEl.clientWidth + GAP) / (cardWidth + GAP));
        return Math.max(1, Math.min(3, visible));
    }

    function getPageCount() {
        const visibleCount = getVisibleCount();

        if (visibleCount >= 3) {
            return 1;
        }

        if (visibleCount === 2) {
            return Math.ceil(topics.length / 2);
        }

        return topics.length;
    }

    function updateButtons() {
        const visibleCount = getVisibleCount();
        const shouldHideForMobile = window.innerWidth <= MOBILE_HIDE_BUTTON_WIDTH;

        if (shouldHideForMobile) {
            if (prevBtn) prevBtn.style.display = "none";
            if (nextBtn) nextBtn.style.display = "none";
            return;
        }

        /*
          3개 모드: 버튼 표시
          2개 모드: 버튼 표시
          1개 모드: 버튼 표시
          아주 작은 모바일: 위 조건에서 숨김
        */
        const showButtons = topics.length > 1;

        if (prevBtn) prevBtn.style.display = showButtons ? "flex" : "none";
        if (nextBtn) nextBtn.style.display = showButtons ? "flex" : "none";
    }

    function goToPage(pageIndex) {
        const visibleCount = getVisibleCount();
        const pageCount = getPageCount();
        const step = getStep();

        if (!step || pageCount <= 0) return;

        currentPage = (pageIndex + pageCount) % pageCount;

        let targetLeft = 0;

        if (visibleCount >= 3) {
            /*
              카드가 3개 보이는 경우:
              1,2,3이 이미 전부 보이므로 버튼을 눌러도 같은 화면.
            */
            targetLeft = 0;
        } else if (visibleCount === 2) {
            /*
              카드가 2개 보이는 경우:
              page 0 -> 1,2
              page 1 -> 3, empty
              page 2 -> 5, empty ... 식으로 동작.
              현재 topic이 3개라면 1,2 -> 3,empty -> 1,2 반복.
            */
            targetLeft = currentPage * 2 * step;
        } else {
            /*
              카드가 1개 보이는 경우:
              1 -> 2 -> 3 -> 1 반복.
            */
            targetLeft = currentPage * step;
        }

        clipEl.scrollTo({
            left: targetLeft,
            behavior: "smooth",
        });

        updateButtons();
    }

    function move(direction) {
        goToPage(currentPage + direction);
    }

    function resetPosition() {
        currentPage = 0;
        clipEl.scrollTo({
            left: 0,
            behavior: "auto",
        });
        updateButtons();
    }

    function render() {
        researchAreaList.innerHTML = "";
        researchAreaList.style.gap = `${GAP}px`;

        topics.forEach((topic) => {
            const card = createContentCard(topic);
            researchAreaList.appendChild(card);
        });

        requestAnimationFrame(() => {
            resetPosition();
        });
    }

    prevBtn?.addEventListener("click", () => {
        move(-1);
    });

    nextBtn?.addEventListener("click", () => {
        move(1);
    });

    window.addEventListener("resize", () => {
        clearTimeout(resizeTimer);

        resizeTimer = setTimeout(() => {
            resetPosition();
        }, 120);
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