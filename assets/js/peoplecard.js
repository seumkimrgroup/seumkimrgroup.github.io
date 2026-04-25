import { escapeHtml } from "./data.js";

const ROLE_META = {
    phd: {
        degree: "Ph.D.",
        display: "Ph.D. Student",
        priority: 1,
    },
    ms: {
        degree: "M.S.",
        display: "M.S. Student",
        priority: 2,
    },
    undergraduate: {
        degree: "B.S.",
        display: "Undergraduate",
        priority: 3,
    },
};

function normalizeRole(role) {
    const value = String(role || "")
        .toLowerCase()
        .replace(/\./g, "")
        .replace(/-/g, " ")
        .trim();

    if (value.includes("phd")) return "phd";
    if (value.includes("ms")) return "ms";
    if (value.includes("undergraduate")) return "undergraduate";

    return "";
}

function getRoleMeta(role) {
    const key = normalizeRole(role);

    return (
        ROLE_META[key] || {
            degree: role || "",
            display: role || "",
            priority: 9,
        }
    );
}

export function getRolePriority(member) {
    return getRoleMeta(member.role).priority;
}

export function formatRole(role) {
    return getRoleMeta(role).display;
}

function getDegreeLabel(role) {
    return getRoleMeta(role).degree;
}

function goToMember(member) {
    window.location.href = `peopledetail.html?id=${encodeURIComponent(member.slug)}`;
}

export function createCurrentMemberCard(member) {
    const item = document.createElement("div");
    item.className = "card card--interactive card--person";
    item.addEventListener("click", () => goToMember(member));

    const imageHtml = member.image
        ? `<img src="${member.image}" alt="${escapeHtml(member.name)}" class="people-photo">`
        : `<div class="people-photo people-photo-placeholder"></div>`;

    item.innerHTML = `
    ${imageHtml}
    <div class="people-info">
      <h3 class="people-name">${escapeHtml(member.name)}</h3>
      <h5 class="people-role">${escapeHtml(formatRole(member.role))}</h5>
    </div>
  `;

    return item;
}

export function createAlumniMemberCard(member) {
    const item = document.createElement("div");
    item.className = "card card--interactive card--person card--person-alumni";
    item.addEventListener("click", () => goToMember(member));

    const degree = getDegreeLabel(member.role);
    const leaveYear = member.leaveYear || "";
    const statusLine = [degree, leaveYear].filter(Boolean).join(" · ");

    const joinedAt =
        member.nextAffiliation && String(member.nextAffiliation).trim() !== ""
            ? member.nextAffiliation
            : "";

    item.innerHTML = `
    <div class="people-info">
      <h3 class="people-name">${escapeHtml(member.name)}</h3>
      <h5 class="people-status">${escapeHtml(statusLine)}</h5>
      ${joinedAt
            ? `
        <div class="people-joined-at">
          <span class="people-joined-at__label">JOINED AT</span>
          <span class="people-joined-at__value">${escapeHtml(joinedAt)}</span>
        </div>
      `
            : ""
        }
    </div>
  `;

    return item;
}