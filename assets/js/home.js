import { fetchJson, escapeHtml } from "./data.js";
import { createContentCard } from "./contentcard.js";
import { openModal } from "./modal.js";

const projectSlider = document.getElementById("project-slider");
const projectPrev = document.getElementById("project-prev");
const projectNext = document.getElementById("project-next");
const updatesTrack = document.getElementById("updates-track");
const aboutMore = document.getElementById("about-more");
const aboutMoreBtn = document.getElementById("about-more-btn");

function renderProjects(projects) {
    if (!projectSlider || !Array.isArray(projects) || projects.length === 0) return;

    projectSlider.innerHTML = "";

    projects.forEach((project) => {
        const slide = document.createElement("div");
        slide.className = "carousel__panel";
        slide.style.backgroundImage = `url(${project.image || ""})`;

        slide.innerHTML = `
      <div class="carousel__inner">
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

function renderUpdates(topics) {
    if (!updatesTrack || !Array.isArray(topics) || topics.length === 0) return;

    const clipEl = updatesTrack.parentElement;
    const prevBtn = document.getElementById("updates-prev");
    const nextBtn = document.getElementById("updates-next");
    const dotsEl = document.getElementById("updates-dots");

    if (!clipEl || !prevBtn || !nextBtn || !dotsEl) return;

    let itemsPerPage = getItemsPerPage();
    let realPages = [];
    let pages = [];
    let pageIndex = 0;
    let activePageIndex = 0;
    let isAnimating = false;
    let resizeTimer = null;

    function getItemsPerPage() {
        if (window.innerWidth <= 500) return 1;
        if (window.innerWidth <= 950) return 2;
        return 3;
    }

    function chunkItems(items, size) {
        const chunks = [];

        for (let i = 0; i < items.length; i += size) {
            chunks.push(items.slice(i, i + size));
        }

        return chunks;
    }

    function buildPages() {
        realPages = chunkItems(topics, itemsPerPage);

        if (realPages.length <= 1) {
            pages = [...realPages];
            pageIndex = 0;
            activePageIndex = 0;
            return;
        }

        pages = [
            realPages[realPages.length - 1],
            ...realPages,
            realPages[0],
        ];

        pageIndex = activePageIndex + 1;
    }

    function setTrackTransition(enabled) {
        updatesTrack.style.transition = enabled
            ? "transform 0.45s ease"
            : "none";
    }

    function updateTrackPosition(withTransition = true) {
        const pageWidth = clipEl.clientWidth;

        if (!pageWidth) return;

        setTrackTransition(withTransition);
        updatesTrack.style.transform = `translate3d(-${pageIndex * pageWidth}px, 0, 0)`;
    }

    function normalizePageIndexIfNeeded() {
        if (realPages.length <= 1) return;

        if (pageIndex === 0) {
            pageIndex = realPages.length;
            activePageIndex = realPages.length - 1;
            updateTrackPosition(false);
            return;
        }

        if (pageIndex === pages.length - 1) {
            pageIndex = 1;
            activePageIndex = 0;
            updateTrackPosition(false);
        }
    }

    function updateActivePageFromPageIndex() {
        if (realPages.length <= 1) {
            activePageIndex = 0;
            return;
        }

        if (pageIndex === 0) {
            activePageIndex = realPages.length - 1;
            return;
        }

        if (pageIndex === pages.length - 1) {
            activePageIndex = 0;
            return;
        }

        activePageIndex = pageIndex - 1;
    }

    function updateNavigator() {
        dotsEl.innerHTML = "";

        if (realPages.length <= 1) {
            dotsEl.classList.add("is-hidden");
            return;
        }

        dotsEl.classList.remove("is-hidden");

        prevBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>`;
        nextBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>`;
        prevBtn.setAttribute("type", "button");
        nextBtn.setAttribute("type", "button");
        prevBtn.setAttribute("aria-label", "Previous page");
        nextBtn.setAttribute("aria-label", "Next page");

        dotsEl.appendChild(prevBtn);

        realPages.forEach((_, index) => {
            const dot = document.createElement("button");

            dot.type = "button";
            dot.className = "updates-dot";
            dot.setAttribute("aria-label", `Go to page ${index + 1}`);

            if (index === activePageIndex) {
                dot.classList.add("is-active");
                dot.setAttribute("aria-current", "true");
            }

            dot.addEventListener("click", () => {
                goToRealPage(index);
            });

            dotsEl.appendChild(dot);
        });

        dotsEl.appendChild(nextBtn);
    }

    function goToRealPage(targetIndex) {
        if (isAnimating || realPages.length <= 1) return;

        isAnimating = true;
        activePageIndex = targetIndex;
        pageIndex = targetIndex + 1;

        updateNavigator();
        updateTrackPosition(true);
    }

    function move(direction) {
        if (isAnimating || realPages.length <= 1) return;

        isAnimating = true;
        pageIndex += direction;

        updateActivePageFromPageIndex();
        updateNavigator();
        updateTrackPosition(true);
    }

    function renderPages() {
        updatesTrack.innerHTML = "";

        buildPages();

        pages.forEach((page) => {
            const pageEl = document.createElement("div");
            pageEl.className = "carousel__panel";

            page.forEach((topic) => {
                const slot = document.createElement("div");
                slot.className = "updates-slot";
                slot.style.flexBasis = `${100 / itemsPerPage}%`;

                const card = createContentCard(topic);
                card.addEventListener("click", () => openModal(topic));
                slot.appendChild(card);
                pageEl.appendChild(slot);
            });

            updatesTrack.appendChild(pageEl);
        });

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                updateTrackPosition(false);
                updateNavigator();
            });
        });
    }

    prevBtn.onclick = () => {
        move(-1);
    };

    nextBtn.onclick = () => {
        move(1);
    };

    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;

    clipEl.addEventListener(
        "touchstart",
        (event) => {
            touchStartX = event.changedTouches[0].clientX;
            touchStartY = event.changedTouches[0].clientY;
        },
        { passive: true }
    );

    clipEl.addEventListener(
        "touchend",
        (event) => {
            touchEndX = event.changedTouches[0].clientX;
            touchEndY = event.changedTouches[0].clientY;

            const diffX = touchStartX - touchEndX;
            const diffY = touchStartY - touchEndY;
            const threshold = 40;

            // 세로 스크롤 의도가 더 크면 무시
            if (Math.abs(diffY) > Math.abs(diffX)) return;

            // 너무 짧은 움직임은 무시
            if (Math.abs(diffX) < threshold) return;

            if (diffX > 0) {
                move(1);
            } else {
                move(-1);
            }
        },
        { passive: true }
    );

    updatesTrack.addEventListener("transitionend", (event) => {
        if (event.propertyName !== "transform") return;

        normalizePageIndexIfNeeded();
        updateNavigator();

        requestAnimationFrame(() => {
            isAnimating = false;
        });
    });

    window.addEventListener("resize", () => {
        clearTimeout(resizeTimer);

        resizeTimer = setTimeout(() => {
            const nextItemsPerPage = getItemsPerPage();

            if (nextItemsPerPage !== itemsPerPage) {
                itemsPerPage = nextItemsPerPage;
                activePageIndex = 0;
                renderPages();
                return;
            }

            updateTrackPosition(false);
        }, 120);
    });

    renderPages();
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
        const updates = items.filter((item) => item.type === "news" || item.type === "highlight");

        renderProjects(projects);
        renderUpdates(updates);
        setupAboutToggle();
    } catch (error) {
        console.error(error);
    }
}

initHomePage();