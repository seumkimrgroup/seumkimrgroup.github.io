import { fetchJson } from "./data.js";
import {
    createCurrentMemberCard,
    createAlumniMemberCard,
    getRolePriority,
} from "./peoplecard.js";

const currentContainer = document.getElementById("current-members");
const formerContainer = document.getElementById("former-members");

let members = [];

function renderCurrentMembers(memberList) {
    if (!currentContainer) return;

    currentContainer.innerHTML = "";

    const listDiv = document.createElement("div");
    listDiv.className = "people-list people-members-list";

    memberList
        .sort((a, b) => {
            const priorityDiff = getRolePriority(a) - getRolePriority(b);
            if (priorityDiff !== 0) return priorityDiff;

            const yearDiff = (a.joinYear || 9999) - (b.joinYear || 9999);
            if (yearDiff !== 0) return yearDiff;

            return String(a.name || "").localeCompare(String(b.name || ""));
        })
        .forEach((member) => {
            listDiv.appendChild(createCurrentMemberCard(member));
        });

    currentContainer.appendChild(listDiv);
}

function renderFormerMembers(memberList) {
    if (!formerContainer) return;

    formerContainer.innerHTML = "";

    const listDiv = document.createElement("div");
    listDiv.className = "people-list people-members-list people-alumni-list";

    memberList
        .sort((a, b) => {
            const priorityDiff = getRolePriority(a) - getRolePriority(b);
            if (priorityDiff !== 0) return priorityDiff;

            const yearDiff = (b.leaveYear || 0) - (a.leaveYear || 0);
            if (yearDiff !== 0) return yearDiff;

            return String(a.name || "").localeCompare(String(b.name || ""));
        })
        .forEach((member) => {
            listDiv.appendChild(createAlumniMemberCard(member));
        });

    formerContainer.appendChild(listDiv);
}

function renderMembers() {
    const currentMembers = members.filter((member) => member.status === "current");
    const formerMembers = members.filter((member) => member.status === "former");

    renderCurrentMembers(currentMembers);
    renderFormerMembers(formerMembers);
}

async function initPeoplePage() {
    try {
        members = await fetchJson("assets/data/people.json");
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