import { fetchJson } from "./data.js";
import {
    createCurrentMemberCard,
    createAlumniMemberCard,
    getRolePriority,
} from "./card.people.js";
import { renderIconLinks } from "./icon-links.js";

const currentContainer = document.getElementById("members-list");
const formerContainer = document.getElementById("alumni-list");

const piLinksEl = document.getElementById("pi-links");
if (piLinksEl) {
    piLinksEl.outerHTML = renderIconLinks([
        { type: "email", value: "seumkim@seoultech.ac.kr" },
        { type: "scholar", value: "https://scholar.google.com/citations?user=SetJCVgAAAAJ&hl=en" },
        { type: "linkedin", value: "https://www.linkedin.com/in/seumkim/" },
    ]);
}

let members = [];

function renderCurrentMembers(memberList) {
    if (!currentContainer) return;

    currentContainer.innerHTML = "";

    memberList
        .sort((a, b) => {
            const priorityDiff = getRolePriority(a) - getRolePriority(b);
            if (priorityDiff !== 0) return priorityDiff;

            const yearDiff = (a.joinYear || 9999) - (b.joinYear || 9999);
            if (yearDiff !== 0) return yearDiff;

            return String(a.name || "").localeCompare(String(b.name || ""));
        })
        .forEach((member) => {
            currentContainer.appendChild(createCurrentMemberCard(member));
        });
}

function renderFormerMembers(memberList) {
    if (!formerContainer) return;

    formerContainer.innerHTML = "";

    memberList
        .sort((a, b) => {
            const priorityDiff = getRolePriority(a) - getRolePriority(b);
            if (priorityDiff !== 0) return priorityDiff;

            const yearDiff = (b.leaveYear || 0) - (a.leaveYear || 0);
            if (yearDiff !== 0) return yearDiff;

            return String(a.name || "").localeCompare(String(b.name || ""));
        })
        .forEach((member) => {
            formerContainer.appendChild(createAlumniMemberCard(member));
        });
}

function renderMembers() {
    const currentMembers = members.filter((member) => member.status === "current");
    const formerMembers = members.filter((member) => member.status === "former");

    renderCurrentMembers(currentMembers);
    renderFormerMembers(formerMembers);
}

async function initPeoplePage() {
    try {
        members = await fetchJson("/assets/data/people.json");
        renderMembers();
    } catch (error) {
        console.error(error);

        if (currentContainer) {
            currentContainer.innerHTML =
                '<h5>Member data could not be loaded.</h5>';
        }
    }
}

initPeoplePage();
