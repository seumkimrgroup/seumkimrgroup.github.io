import { fetchJson } from "./util.data.js";
import { createRecruitCard } from "./component.card.recruit.js";

const container = document.getElementById("recruit-cards");

async function initRecruit() {
  if (!container) return;
  try {
    const programs = await fetchJson("assets/data/recruit.json");
    programs.forEach((program) => container.appendChild(createRecruitCard(program)));
  } catch (e) {
    console.error(e);
  }
}

initRecruit();
