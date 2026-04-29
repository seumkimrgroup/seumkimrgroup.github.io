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

    const prevBtn = document.getElementById("research-area-prev");
    const nextBtn = document.getElementById("research-area-next");
    const dotsEl = document.getElementById("research-area-dots");

    const MOBILE_HIDE_BUTTON_WIDTH = 420;
    const LOOP_SET_COUNT = 3;
    const MIDDLE_SET_INDEX = 1;

    let currentIndex = topics.length * MIDDLE_SET_INDEX;
    let isAnimating = false;
    let resizeTimer = null;

    if (dotsEl) dotsEl.style.display = "none";

    function getCards() {
        return researchAreaList.querySelectorAll(".card--content");
    }

    function getStep() {
        const cards = getCards();

        const currentCard = cards[currentIndex];
        const nextCard = cards[currentIndex + 1];

        if (currentCard && nextCard) {
            return nextCard.offsetLeft - currentCard.offsetLeft;
        }

        const firstCard = cards[0];
        const secondCard = cards[1];

        if (firstCard && secondCard) {
            return secondCard.offsetLeft - firstCard.offsetLeft;
        }

        return firstCard ? firstCard.getBoundingClientRect().width : 0;
    }

    function updateButtons() {
        const shouldHideForMobile = window.innerWidth <= MOBILE_HIDE_BUTTON_WIDTH;
        const showButtons = topics.length > 1 && !shouldHideForMobile;

        if (prevBtn) prevBtn.style.display = showButtons ? "flex" : "none";
        if (nextBtn) nextBtn.style.display = showButtons ? "flex" : "none";
    }

    function setTrackTransition(enabled) {
        researchAreaList.style.transition = enabled
            ? "transform 0.45s ease"
            : "none";
    }

    function updateTrackPosition(withTransition = true) {
        const step = Math.round(getStep());

        if (!step) return;

        setTrackTransition(withTransition);
        researchAreaList.style.transform = `translateX(-${currentIndex * step}px)`;
    }

    function normalizeIndexIfNeeded() {
        const realStart = topics.length * MIDDLE_SET_INDEX;
        const realEnd = realStart + topics.length;

        if (currentIndex >= realEnd) {
            currentIndex -= topics.length;
            updateTrackPosition(false);
            return;
        }

        if (currentIndex < realStart) {
            currentIndex += topics.length;
            updateTrackPosition(false);
        }
    }

    function move(direction) {
        if (isAnimating) return;

        const step = getStep();
        if (!step) return;

        isAnimating = true;
        currentIndex += direction;

        updateTrackPosition(true);
    }

    function render() {
        researchAreaList.innerHTML = "";

        const loopItems = Array.from(
            { length: LOOP_SET_COUNT },
            () => topics
        ).flat();

        loopItems.forEach((topic, loopIndex) => {
            const topicIndex = loopIndex % topics.length;
            const card = createContentCard(topic);

            card.dataset.topicIndex = String(topicIndex);
            card.dataset.loopIndex = String(loopIndex);

            researchAreaList.appendChild(card);
        });

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                updateTrackPosition(false);
                updateButtons();
            });
        });
    }

    prevBtn?.addEventListener("click", () => {
        move(-1);
    });

    nextBtn?.addEventListener("click", () => {
        move(1);
    });

    researchAreaList.addEventListener("transitionend", (event) => {
        if (event.propertyName !== "transform") return;

        normalizeIndexIfNeeded();

        requestAnimationFrame(() => {
            isAnimating = false;
        });
    });

    window.addEventListener("resize", () => {
        clearTimeout(resizeTimer);

        resizeTimer = setTimeout(() => {
            updateTrackPosition(false);
            updateButtons();
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