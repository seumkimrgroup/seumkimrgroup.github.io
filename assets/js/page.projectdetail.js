import { fetchJson, escapeHtml } from "./data.js";
import { renderTags } from "./tags.js";

const detailRoot = document.getElementById("project-detail");

const params = new URLSearchParams(window.location.search);
const slug = params.get("slug");

function renderSections(sections = []) {
  if (!sections.length) return "";

  return sections
    .map((section) => {
      const title = section.title
        ? `<h2>${escapeHtml(section.title)}</h2>`
        : "";

      const content = Array.isArray(section.content)
        ? section.content
            .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
            .join("")
        : "";

      return `
        <section class="project-detail-section">
          ${title}
          ${content}
        </section>
      `;
    })
    .join("");
}

function renderImages(images = []) {
  if (!images.length) return "";

  return `
    <div class="project-detail-images">
      ${images
        .map(
          (image) => `
            <figure class="project-detail-image">
              <img src="${escapeHtml(image.src)}" alt="${escapeHtml(image.alt || "")}" />
            </figure>
          `,
        )
        .join("")}
    </div>
  `;
}

function renderProject(project) {
  document.title = `${project.title} | Se-Um Kim Research Group`;

  detailRoot.innerHTML = `
    <header style="view-transition-name: project-hero">
      ${project.background ? `<img src="${escapeHtml(project.background)}" alt="" />` : ""}
      <div class="inner">
        <div class="stack">
          ${project.subtitle ? `<h6>${escapeHtml(project.subtitle)}</h6>` : ""}
          <div class="meta-row">
            <h1>${escapeHtml(project.title)}</h1>
            ${renderTags(project.tag)}
          </div>
          ${project.description ? `<p>${escapeHtml(project.description)}</p>` : ""}
        </div>
      </div>
    </header>

    <div class="project-detail-body">
      ${renderSections(project.sections)}
      ${renderImages(project.images)}
    </div>
  `;
}

async function initProjectDetail() {
  if (!slug) {
    detailRoot.innerHTML = `<p class="project-detail-error">Project slug is missing.</p>`;
    return;
  }

  try {
    const projects = await fetchJson("/assets/data/projects.json");
    const project = projects.find((item) => item.slug === slug);

    if (!project) {
      detailRoot.innerHTML = `<p class="project-detail-error">Project not found.</p>`;
      return;
    }

    renderProject(project);
  } catch (error) {
    console.error(error);
    detailRoot.innerHTML = `<p class="project-detail-error">Failed to load project data.</p>`;
  }
}

initProjectDetail();
