import { fetchJson, escapeHtml } from "./data.js";
import { renderTags } from "./tags.js";

const sliderEl = document.querySelector("#projects .carousel__track");
const navEl = document.querySelector("#projects .carousel-nav");

async function init() {
    if (!sliderEl) return;

    const projects = await fetchJson("/assets/data/projects.json");
    if (!Array.isArray(projects) || projects.length === 0) return;

    sliderEl.innerHTML = "";

    const slides = projects.map((project) => {
        const slide = document.createElement("div");
        slide.className = "carousel__panel";
        slide.style.backgroundImage = `url(${project.background || ""})`;
        slide.innerHTML = `
          <div class="inner">
            <div class="stack">
              ${project.subtitle ? `<h6>${escapeHtml(project.subtitle)}</h6>` : ""}
              <div class="meta-row">
                <h1>${escapeHtml(project.title || "")}</h1>
                ${renderTags(project.tag)}
              </div>
              <p>${escapeHtml(project.description || "")}</p>
              // ${project.slug ? `<a class="btn btn--primary" href="/projectdetail/?slug=${escapeHtml(project.slug)}">Read more</a>` : ""}
            </div>
          </div>
        `;
        sliderEl.appendChild(slide);
        return slide;
    });

    let currentIndex = 0;

    function goTo(index) {
        currentIndex = (index + projects.length) % projects.length;
        sliderEl.style.transform = `translateX(-${currentIndex * 100}%)`;
        renderNav();
    }

    function renderNav() {
        if (!navEl || projects.length <= 1) return;

        navEl.innerHTML = "";

        const prevBtn = document.createElement("button");
        prevBtn.type = "button";
        prevBtn.className = "carousel-nav-btn";
        prevBtn.setAttribute("aria-label", "Previous project");
        prevBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>`;
        prevBtn.addEventListener("click", () => goTo(currentIndex - 1));
        navEl.appendChild(prevBtn);

        projects.forEach((_, i) => {
            const dot = document.createElement("button");
            dot.type = "button";
            dot.className = "carousel-nav-dot" + (i === currentIndex ? " is-active" : "");
            dot.setAttribute("aria-label", `Go to project ${i + 1}`);
            dot.addEventListener("click", () => goTo(i));
            navEl.appendChild(dot);
        });

        const nextBtn = document.createElement("button");
        nextBtn.type = "button";
        nextBtn.className = "carousel-nav-btn";
        nextBtn.setAttribute("aria-label", "Next project");
        nextBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>`;
        nextBtn.addEventListener("click", () => goTo(currentIndex + 1));
        navEl.appendChild(nextBtn);
    }

    goTo(0);
}

init();
