import { fetchJson } from "./util.data.js";
import { createRecruitCard } from "./component.card.recruit.js";

async function initRecruit() {
    const container = document.getElementById("recruit-cards");
    if (!container) return;
    try {
        const programs = await fetchJson("/assets/data/recruit.json");
        programs.forEach((p) => container.appendChild(createRecruitCard(p)));
    } catch (e) {
        console.error(e);
    }
}

initRecruit();

document.getElementById("btn-contact")?.addEventListener("click", (e) => {
  e.preventDefault();
  document.querySelector(".footer")?.scrollIntoView({ behavior: "smooth" });
});
