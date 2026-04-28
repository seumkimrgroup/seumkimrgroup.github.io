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

// role 문자열을 소문자·특수문자 제거 후 표준 키(phd / ms / undergraduate)로 변환
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

// role에 해당하는 ROLE_META 객체(degree, display, priority)를 반환; 미등록 role은 원문을 그대로 사용
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

// 멤버 목록 정렬에 사용할 role 우선순위 숫자를 반환 (낮을수록 상위)
export function getRolePriority(member) {
    return getRoleMeta(member.role).priority;
}

// role 키를 화면 표시용 문자열(예: "Ph.D. Student")로 변환
export function formatRole(role) {
    return getRoleMeta(role).display;
}

// 멤버의 slug를 쿼리 파라미터로 붙여 상세 페이지로 이동
function goToMember(member) {
    window.location.href = `peopledetail.html?id=${encodeURIComponent(member.slug)}`;
}

// 현재 재학 중인 멤버용 카드 DOM 요소를 생성해 반환 (사진 좌측 · 이름·역할·연구관심사 우측 grid 배치)
export function createCurrentMemberCard(member) {
    const item = document.createElement("div");
    item.className = "card card--interactive card--people";
    item.addEventListener("click", () => goToMember(member));

    const imageHtml = member.image
        ? `<img src="${member.image}" alt="${escapeHtml(member.name)}" class="people-photo">`
        : `<div class="people-photo people-photo-placeholder"></div>`;

    const researchEntry = (member.description || []).find(
        (d) => d.title === "RESEARCH INTERESTS"
    );
    const researchContent =
        researchEntry && researchEntry.content && researchEntry.content.length
            ? researchEntry.content.map(escapeHtml).join(", ")
            : "";

    item.innerHTML = `
    ${imageHtml}
    <div class="people-info">
      <h4>${escapeHtml(member.name)}</h4>
      <p>${escapeHtml(formatRole(member.role))}</p>
      ${researchContent ? `<h5 class="people-info__section-title">${escapeHtml(researchEntry.title)}</h5>` : ""}
      ${researchContent ? `<p class="people-info__research">${researchContent}</p>` : ""}
    </div>
  `;

    return item;
}

// 졸업생용 카드 DOM 요소를 생성해 반환 (이름 + 학위·졸업연도 + 다음 소속 기관 표시)
export function createAlumniMemberCard(member) {
    const item = document.createElement("div");
    item.className = "card card--interactive card--people card--people-alumni";
    item.addEventListener("click", () => goToMember(member));

    const degree = getRoleMeta(member.role).degree;
    const leaveYear = member.leaveYear || "";
    const statusLine = [degree, leaveYear].filter(Boolean).join(" ");

    const joinedAt =
        member.nextAffiliation && String(member.nextAffiliation).trim() !== ""
            ? member.nextAffiliation
            : "";

    item.innerHTML = `
    <div class="people-info">
      <h4>${escapeHtml(member.name)}</h4>
      <p>${escapeHtml(statusLine)}</p>
      ${joinedAt ? `<h6>JOINED AT</h6><h5>${escapeHtml(joinedAt)}</h5>` : ""}
    </div>
  `;

    return item;
}