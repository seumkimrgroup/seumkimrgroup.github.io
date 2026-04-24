import { fetchJson } from "./data.js";
import { createPublicationCard } from "./publicationcard.js";

const container = document.getElementById("publication-list");
const searchInput = document.getElementById("searchInput");
const typeButtons = document.querySelectorAll(".type-btn");

let publications = [];
let currentType = "all";

function getSearchTarget(pub) {
    return [
        pub.title || "",
        pub.authors || "",
        pub.source || "",
        pub.date || "",
        ...(Array.isArray(pub.tags) ? pub.tags : []),
    ]
        .join(" ")
        .toLowerCase();
}

function getFilteredPublications() {
    const keyword = (searchInput?.value || "").trim().toLowerCase();

    return publications
        .filter((pub) => {
            const matchesType = currentType === "all" || pub.type === currentType;
            const matchesKeyword = getSearchTarget(pub).includes(keyword);

            return matchesType && matchesKeyword;
        })
        .sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")));
}

function renderPublications() {
    if (!container) return;

    container.innerHTML = "";

    const filtered = getFilteredPublications();

    if (filtered.length === 0) {
        container.innerHTML = '<div class="type-meta">No publications found.</div>';
        return;
    }

    filtered.forEach((pub) => {
        container.appendChild(createPublicationCard(pub));
    });
}

function setupFilters() {
    if (searchInput) {
        searchInput.addEventListener("input", renderPublications);
    }

    typeButtons.forEach((button) => {
        button.addEventListener("click", () => {
            currentType = button.dataset.type || "all";

            typeButtons.forEach((btn) => btn.classList.remove("active"));
            button.classList.add("active");

            renderPublications();
        });
    });
}

async function initPublicationsPage() {
    try {
        publications = await fetchJson("assets/data/publications.json");
        setupFilters();
        renderPublications();
    } catch (error) {
        console.error(error);

        if (container) {
            container.innerHTML =
                '<div class="type-meta">Publication data could not be loaded.</div>';
        }
    }
}

initPublicationsPage();