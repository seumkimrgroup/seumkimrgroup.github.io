import { fetchJson, escapeHtml } from "./util.data.js";

const heroEl = document.querySelector("#project-intro");
const introBodyEl = heroEl?.querySelector(".stack");
const bodyEl = document.querySelector("#project-body");
const slug = new URLSearchParams(window.location.search).get("slug");

function animateHeroText(container) {
    const WINDOW = 700;

    container.querySelectorAll("p").forEach((el) => {
        const words = el.textContent.trim().split(/\s+/);
        el.innerHTML = "";

        for (let i = 0; i < words.length; i++) {
            const span = document.createElement("span");
            span.className = "word-pair";
            span.style.animationDelay = `${Math.random() * WINDOW}ms`;
            span.textContent = words[i];
            el.appendChild(span);
            if (i < words.length - 1) el.appendChild(document.createTextNode(" "));
        }
    });
}

function renderIntro(section, background) {
    if (background) heroEl.style.backgroundImage = `url(${escapeHtml(background)})`;

    let html = "";
    if (section.title) html += `<h1>${escapeHtml(section.title)}</h1>`;
    if (Array.isArray(section.content)) {
        section.content.forEach((p) => { html += `<p>${escapeHtml(p)}</p>`; });
    }
    if (section.image) {
        html += `<div class="media"><img src="${escapeHtml(section.image)}" alt="" /></div>`;
    }
    introBodyEl.innerHTML = html;
    animateHeroText(introBodyEl);
}

function renderBody(section) {
    const sec = document.createElement("section");
    sec.className = "section";

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
    sec.appendChild(stack);
    return sec;
}

async function init() {
    if (!heroEl || !introBodyEl || !bodyEl || !slug) return;

    const all = await fetchJson("/assets/data/projects.json");
    const project = all.find((p) => p.slug === slug);
    if (!project) return;

    (project.sections || []).forEach((section, i) => {
        if (i === 0) renderIntro(section, project.background);
        else {
            const el = renderBody(section);
            bodyEl.appendChild(el);
            if (i === 1) animateHeroText(el);
        }
    });

}

init();
