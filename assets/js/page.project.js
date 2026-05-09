import { fetchJson, escapeHtml } from "./data.js";
import { renderTags } from "./tags.js";

const projectsEl = document.querySelector("#projects");
const sliderEl = document.querySelector("#projects .carousel__track");
const navEl = document.querySelector("#projects .carousel-nav");
const innerEl = document.querySelector("#projects > .inner");

const slug = new URLSearchParams(window.location.search).get("slug");

function renderSections(sections = []) {
    if (!innerEl || !sections.length) return;

    const stack = document.createElement("div");
    stack.className = "stack";

    sections.forEach((section) => {
        const el = document.createElement("section");
        if (section.title) {
            el.innerHTML += `<h2>${escapeHtml(section.title)}</h2>`;
        }
        if (Array.isArray(section.content)) {
            section.content.forEach((p) => {
                el.innerHTML += `<p>${escapeHtml(p)}</p>`;
            });
        }
        stack.appendChild(el);
    });

    innerEl.appendChild(stack);
}

async function init() {
    if (!sliderEl || !slug) return;

    const all = await fetchJson("/assets/data/projects.json");
    const project = all.find((p) => p.slug === slug);
    if (!project) return;

    document.title = `${project.title} | Se-Um Kim Research Group`;

    projectsEl.style.backgroundImage = `url(${project.background || ""})`;

    sliderEl.innerHTML = "";

    const slide = document.createElement("div");
    slide.className = "carousel__panel";
    slide.innerHTML = `
      <div class="inner">
        <div class="stack">
          ${project.subtitle ? `<h6>${escapeHtml(project.subtitle)}</h6>` : ""}
          <div class="meta-row">
            <h1>${escapeHtml(project.title || "")}</h1>
            ${renderTags(project.tag)}
          </div>
          <p>${escapeHtml(project.description || "")}</p>
          <a class="btn btn--primary" href="/">← Back</a>
        </div>
      </div>
    `;
    sliderEl.appendChild(slide);

    renderSections(project.sections);
}

init();
