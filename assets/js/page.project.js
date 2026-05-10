import { fetchJson, escapeHtml } from "./data.js";

const introEl = document.querySelector("#project-intro");
const bodyEl = document.querySelector("#project-body");
const slug = new URLSearchParams(window.location.search).get("slug");

function renderIntro(section, background) {
    if (background) introEl.style.backgroundImage = `url(${escapeHtml(background)})`;

    const inner = document.createElement("div");
    inner.className = "inner--60";

    const stack = document.createElement("div");
    stack.className = "stack";

    let html = "";
    if (section.title) html += `<h1>${escapeHtml(section.title)}</h1>`;
    if (Array.isArray(section.content)) {
        section.content.forEach((p) => { html += `<p>${escapeHtml(p)}</p>`; });
    }
    if (section.image) {
        html += `<div class="media"><img src="${escapeHtml(section.image)}" alt="" /></div>`;
    }

    stack.innerHTML = html;
    inner.appendChild(stack);
    introEl.appendChild(inner);
}

function renderBody(section) {
    const stack = document.createElement("div");
    stack.className = "stack";

    let html = "";
    if (section.title) html += `<h2>${escapeHtml(section.title)}</h2>`;
    if (Array.isArray(section.content)) {
        section.content.forEach((p) => { html += `<p>${escapeHtml(p)}</p>`; });
    }
    if (section.image) {
        html += `<div class="media"><img src="${escapeHtml(section.image)}" alt="${escapeHtml(section.title || "")}" /></div>`;
    }

    stack.innerHTML = html;
    return stack;
}

async function init() {
    if (!introEl || !bodyEl || !slug) return;

    const all = await fetchJson("/assets/data/projects.json");
    const project = all.find((p) => p.slug === slug);
    if (!project) return;

    document.title = `${project.title} | Se-Um Kim Research Group`;

    (project.sections || []).forEach((section, i) => {
        if (i === 0) renderIntro(section, project.background);
        else bodyEl.appendChild(renderBody(section));
    });

}

init();
