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
  return `<p class="text-secondary">Read more at ${joined}.</p>`;
}

function build() {
  const el = document.createElement("div");
  el.className = "modal-overlay";
  el.innerHTML = `
    <div class="modal-dialog" role="dialog" aria-modal="true">
      <button class="modal-close" aria-label="Close">&times;</button>
      <div class="media">
        <img src="" alt="">
      </div>
      <div class="info">
        <h6></h6>
        <h3></h3>
        <p></p>
        <div class="links-wrap"></div>
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

  const img = overlayEl.querySelector(".media img");
  img.src = item.image || "";
  img.alt = escapeHtml(item.title || "");

  overlayEl.querySelector(".info h6").textContent =
    item.type ? item.type.charAt(0).toUpperCase() + item.type.slice(1) : "";
  overlayEl.querySelector(".info h3").textContent = item.title || "";
  overlayEl.querySelector(".info > p").textContent = item.description || "";
  overlayEl.querySelector(".links-wrap").innerHTML = renderLinks(item.links);

  overlayEl.classList.add("is-open");
  document.body.classList.add("modal-open");
}
