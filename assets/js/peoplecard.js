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

function goToMember(member) {
    window.location.href = `peopledetail.html?id=${encodeURIComponent(member.slug)}`;
}

export function createCurrentMemberCard(member) {
    const item = document.createElement("div");
    item.className = "card card--interactive card--people";
    item.addEventListener("click", () => goToMember(member));

    const imageHtml = member.image
        ? `<img src="${member.image}" alt="${escapeHtml(member.name)}" class="people-photo">`
        : `<div class="people-photo people-photo-placeholder"></div>`;

    item.innerHTML = `
    ${imageHtml}
    <div class="people-info">
      <h4>${escapeHtml(member.name)}</h4>
      <p>${escapeHtml(formatRole(member.role))}</p>
    </div>
  `;

    return item;
}

export function createAlumniMemberCard(member) {
    const item = document.createElement("div");
    item.className = "card card--interactive card--people card--people-alumni";
    item.addEventListener("click", () => goToMember(member));

    const degree = getRoleMeta(member.role).degree;
    const leaveYear = member.leaveYear || "";
    const statusLine = [degree, leaveYear].filter(Boolean).join(" · ");

    const joinedAt =
        member.nextAffiliation && String(member.nextAffiliation).trim() !== ""
            ? member.nextAffiliation
            : "";

    item.innerHTML = `
    <div class="people-info">
      <h4>${escapeHtml(member.name)}</h4>
      <p>${escapeHtml(statusLine)}</p>
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