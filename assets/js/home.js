import { fetchJson, escapeHtml } from "./data.js";

const projectSlider = document.getElementById("project-slider");
const projectPrev = document.getElementById("project-prev");
const projectNext = document.getElementById("project-next");
const researchAreaList = document.getElementById("research-area-list");
const aboutMore = document.getElementById("about-more");
const aboutMoreBtn = document.getElementById("about-more-btn");
const contactGrid = document.getElementById("contact-grid");

function renderProjects(projects) {
  if (!projectSlider || !Array.isArray(projects) || projects.length === 0) return;
  projectSlider.innerHTML = "";

  projects.forEach((project) => {
    const slide = document.createElement("div");
    slide.className = "project-slide";
    slide.style.backgroundImage = `url(${project.image || ""})`;
    slide.innerHTML = `
      <div class="project-content">
        <div class="type-eyebrow project-subtitle">${escapeHtml(project.subtitle || "")}</div>
        <div class="type-display project-title">${escapeHtml(project.title || "")}</div>
        <div class="type-body project-desc">${escapeHtml(project.description || "")}</div>
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
  if (!researchAreaList || !Array.isArray(topics)) return;
  researchAreaList.innerHTML = "";

  topics.forEach((topic) => {
    const item = document.createElement("article");
    item.className = "card research-area-card";
    item.innerHTML = `
      <div class="research-area-image-wrap">
        <img src="${topic.image || ""}" alt="${escapeHtml(topic.title || "")}" class="research-area-image" />
      </div>
      <div class="research-area-body">
        <h3 class="type-title research-area-title">${escapeHtml(topic.title || "")}</h3>
        <p class="type-body research-area-text">${escapeHtml(topic.description || "")}</p>
      </div>
    `;
    researchAreaList.appendChild(item);
  });
}

function renderContactRow(label, value, isEmail = false) {
  if (!value) return "";

  const valueHtml = isEmail
    ? `<a href="mailto:${escapeHtml(value)}" class="type-meta contact-value">${escapeHtml(value)}</a>`
    : `<span class="type-meta contact-value">${escapeHtml(value)}</span>`;

  return `
    <div class="contact-row">
      <span class="type-ui contact-label">${escapeHtml(label)}</span>
      ${valueHtml}
    </div>
  `;
}

function renderContact(contact) {
  if (!contactGrid || !contact) return;

  const addressHtml = Array.isArray(contact.addressLines) && contact.addressLines.length
    ? contact.addressLines.map((line) => escapeHtml(line)).join("<br>")
    : "";

  contactGrid.innerHTML = `
    <div class="contact-list">
      ${renderContactRow("Email", contact.email, true)}
      ${renderContactRow("Phone", contact.phone)}
      ${renderContactRow("Office", contact.office)}
      ${
        addressHtml
          ? `
        <div class="contact-row">
          <span class="type-ui contact-label">Address</span>
          <span class="type-meta contact-value">${addressHtml}</span>
        </div>
      `
          : ""
      }
    </div>

    ${
      contact.mapEmbedUrl
        ? `
      <div class="contact-map-wrap">
        <iframe
          class="contact-map"
          src="${contact.mapEmbedUrl}"
          loading="lazy"
          allowfullscreen
          referrerpolicy="no-referrer-when-downgrade">
        </iframe>
      </div>
    `
        : ""
    }
  `;
}

function setupAboutToggle() {
  if (!aboutMore || !aboutMoreBtn) return;

  aboutMoreBtn.addEventListener("click", () => {
    const open = aboutMore.classList.toggle("is-open");
    aboutMoreBtn.textContent = open ? "Less" : "More";
  });
}

async function initHomePage() {
  try {
    const [projects, topics, contact] = await Promise.all([
      fetchJson("assets/data/projects.json"),
      fetchJson("assets/data/topics.json"),
      fetchJson("assets/data/contact.json")
    ]);

    renderProjects(projects);
    renderTopics(topics);
    renderContact(contact);
    setupAboutToggle();
  } catch (error) {
    console.error(error);
  }
}

initHomePage();
