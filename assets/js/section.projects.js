import { fetchJson, escapeHtml } from "./util.data.js";
import { renderTags } from "./component.tags.js";

const swiperEl = document.querySelector("#projects");

async function init() {
  if (!swiperEl) return;

  const projects = await fetchJson("/assets/data/projects.json");
  if (!Array.isArray(projects) || projects.length === 0) return;

  const wrapper = swiperEl.querySelector(".swiper-wrapper");
  const navEl = swiperEl.querySelector(".carousel-nav");
  const loop = projects.length > 1;

  if (!loop && navEl) navEl.classList.add("is-hidden");

  projects.forEach((project) => {
    const slide = document.createElement("div");
    slide.className = "swiper-slide";

    const panel = document.createElement("div");
    panel.className = "carousel__panel";
    panel.style.backgroundImage = `url(${project.background || ""})`;
    panel.innerHTML = `
      <div class="inner">
        <div class="stack">
          ${project.subtitle ? `<h6>${escapeHtml(project.subtitle)}</h6>` : ""}
          <div class="row">
            <h1>${escapeHtml(project.title || "")}</h1>
            ${renderTags(project.tag)}
          </div>
          <p>${escapeHtml(project.description || "")}</p>
          ${project.slug ? `<div class="group"><a class="btn btn--primary" href="/project/?slug=${escapeHtml(project.slug)}">Read more</a></div>` : ""}
        </div>
      </div>
    `;

    slide.appendChild(panel);
    wrapper.appendChild(slide);
  });

  new Swiper("#projects", {
    loop,
    speed: 600,
    slidesPerView: 1,
    pagination: { el: ".swiper-pagination", clickable: true },
    navigation: { prevEl: ".swiper-button-prev", nextEl: ".swiper-button-next" },
  });
}

init();
