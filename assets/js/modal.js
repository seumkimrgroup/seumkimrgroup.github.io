import { escapeHtml } from "./data.js";

let overlayEl = null;

function renderLinks(links) {
  if (!Array.isArray(links) || !links.length) return "";
  const anchors = links.map(
    (l) => `<a href="${escapeHtml(l.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(l.text)}</a>`
  );
  const joined =
    anchors.length === 1
      ? anchors[0]
      : anchors.length === 2
      ? `${anchors[0]} and ${anchors[1]}`
      : `${anchors.slice(0, -1).join(", ")}, and ${anchors[anchors.length - 1]}`;
  return `<p class="modal-links">Read more at ${joined}.</p>`;
}

function build() {
  const el = document.createElement("div");
  el.className = "modal-overlay";
  el.innerHTML = `
    <div class="modal-dialog" role="dialog" aria-modal="true">
      <button class="modal-close" aria-label="Close">&times;</button>
      <div class="modal-media">
        <img class="modal-img" src="" alt="">
      </div>
      <div class="modal-body">
        <h6 class="modal-type"></h6>
        <h3 class="modal-title"></h3>
        <p class="modal-description"></p>
        <div class="modal-links-wrap"></div>
      </div>
    </div>
  `;

  el.addEventListener("click", (e) => {
    if (e.target === el) close();
  });

  el.querySelector(".modal-close").addEventListener("click", close);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });

  document.body.appendChild(el);
  return el;
}

function close() {
  if (!overlayEl) return;
  overlayEl.classList.remove("is-open");
  document.body.classList.remove("modal-open");
}

export function openModal(item) {
  if (!overlayEl) overlayEl = build();

  const img = overlayEl.querySelector(".modal-img");
  img.src = item.image || "";
  img.alt = escapeHtml(item.title || "");

  overlayEl.querySelector(".modal-type").textContent =
    item.type ? item.type.charAt(0).toUpperCase() + item.type.slice(1) : "";
  overlayEl.querySelector(".modal-title").textContent = item.title || "";
  overlayEl.querySelector(".modal-description").textContent = item.description || "";
  overlayEl.querySelector(".modal-links-wrap").innerHTML = renderLinks(item.links);

  overlayEl.classList.add("is-open");
  document.body.classList.add("modal-open");
}
