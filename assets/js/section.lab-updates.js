import { fetchJson } from "./util.data.js";
import { createContentCard } from "./component.card.content.js";
import { openModal } from "./component.modal.js";

const wrapperEl = document.querySelector("#updates-swiper .swiper-wrapper");

async function init() {
  if (!wrapperEl) return;

  const items = await fetchJson("/assets/data/contents.json");
  const updates = Array.isArray(items)
    ? items.filter((item) => item.type === "news" || item.type === "highlight")
    : [];
  if (!updates.length) return;

  updates.forEach((item) => {
    const slide = document.createElement("div");
    slide.className = "swiper-slide";
    const card = createContentCard(item);
    card.style.cursor = "pointer";
    card.addEventListener("click", () => openModal(item));
    slide.appendChild(card);
    wrapperEl.appendChild(slide);
  });

  new Swiper("#updates-swiper", {
    loop: true,
    breakpoints: {
      0:   { slidesPerView: 1, spaceBetween: 12 },
      501: { slidesPerView: 2, spaceBetween: 16 },
      951: { slidesPerView: 3, spaceBetween: 16 },
    },
    pagination: { el: ".swiper-pagination", clickable: true },
    navigation: { prevEl: ".swiper-button-prev", nextEl: ".swiper-button-next" },
  });
}

init();
