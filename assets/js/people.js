import { fetchJson, escapeHtml } from "./data.js";

const listView = document.getElementById("people-list-view");
const detailView = document.getElementById("member-detail-view");
const piContainer = document.getElementById("pi-members");
const currentContainer = document.getElementById("current-members");
const formerContainer = document.getElementById("former-members");

let members = [];
let publications = [];

const ROLE_META = {
  professor: {
    degree: "Professor",
    display: "Associate Professor",
    priority: 0,
  },
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
  const value = (role || "")
    .toLowerCase()
    .replace(/\./g, "")
    .replace(/-/g, " ")
    .trim();

  if (value.includes("professor")) return "professor";
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

function isProfessor(member) {
  return normalizeRole(member.role) === "professor";
}

function isFormer(member) {
  return member.status === "former";
}

function getRolePriority(member) {
  return getRoleMeta(member.role).priority;
}

function getDegreeLabel(role) {
  return getRoleMeta(role).degree;
}

function formatRole(role) {
  return getRoleMeta(role).display;
}

function goToMember(member) {
  window.location.href = `people.html?id=${encodeURIComponent(member.slug)}`;
}

function formatMetaLine(pub) {
  let line = "";
  if (pub.source) line += pub.source;
  if (pub.detail) line += line ? ` ${pub.detail}` : pub.detail;
  if (pub.type !== "patent" && pub.year) line += ` (${pub.year})`;
  return line;
}

function getMemberPublications(member) {
  const memberName = (member.name || "").toLowerCase();

  return publications
    .filter((pub) => (pub.authors || "").toLowerCase().includes(memberName))
    .sort((a, b) => (b.year || 0) - (a.year || 0));
}

function createPublicationCard(pub) {
  const metaLine = formatMetaLine(pub);
  const cardInner = `
    <div class="type-body publication-title">${escapeHtml(pub.title || "")}</div>
    <div class="type-meta publication-meta">${escapeHtml(metaLine)}</div>
    <div class="type-meta publication-authors">${escapeHtml(pub.authors || "")}</div>
  `;

  let item;
  if (pub.link) {
    item = document.createElement("a");
    item.href = pub.link;
    item.target = "_blank";
    item.rel = "noopener noreferrer";
    item.className = "card card--interactive publication-card clickable";
    item.innerHTML = cardInner;
  } else {
    item = document.createElement("div");
    item.className = "card publication-card";
    item.innerHTML = cardInner;
  }

  return item;
}

function createMemberCard(member, former = false) {
  const item = document.createElement("div");
  item.className = former
    ? "card card--interactive people-card people-card-member former-people-card"
    : "card card--interactive people-card people-card-member";

  item.addEventListener("click", () => goToMember(member));

  if (former) {
    const statusLine = [getDegreeLabel(member.role), member.leaveYear || ""]
      .filter(Boolean)
      .join(" · ");

    item.innerHTML = `
      <div class="people-info">
        <div class="type-title people-name">${escapeHtml(member.name)}</div>
        <div class="type-meta people-status">${escapeHtml(statusLine)}</div>
      </div>
    `;
    return item;
  }

  const imageHtml = member.image
    ? `<img src="${member.image}" alt="${escapeHtml(member.name)}" class="people-photo">`
    : `<div class="people-photo people-photo-placeholder"></div>`;

  item.innerHTML = `
    ${imageHtml}
    <div class="people-info">
      <div class="type-title people-name">${escapeHtml(member.name)}</div>
      <div class="type-meta people-role">${escapeHtml(formatRole(member.role))}</div>
    </div>
  `;

  return item;
}

function getSectionItems(member, targetTitle) {
  if (!Array.isArray(member.description)) return [];

  const section = member.description.find(
    (item) =>
      String(item?.title || "").trim().toUpperCase() ===
      targetTitle.toUpperCase()
  );

  if (!section || !Array.isArray(section.content)) return [];

  return section.content.filter((item) => String(item || "").trim() !== "");
}

function renderInfoSection(title, items) {
  if (!items.length) return "";

  const itemsHtml = items
    .map((item) => `<div class="type-body member-detail-item">${escapeHtml(item)}</div>`)
    .join("");

  return `
    <section class="member-detail-section">
      <div class="type-title member-detail-section-title">${escapeHtml(title)}</div>
      <div class="member-detail-section-body">${itemsHtml}</div>
    </section>
  `;
}

function toTitleCase(text) {
  const value = String(text || "").toLowerCase();
  if (value === "research interests") return "Research Interest";
  return value.replace(/\b\w/g, (char) => char.toUpperCase());
}

function renderAllSections(member) {
  if (!Array.isArray(member.description)) return "";

  return member.description
    .filter(
      (section) =>
        section &&
        section.title &&
        Array.isArray(section.content) &&
        section.content.some((item) => String(item || "").trim() !== "")
    )
    .map((section) =>
      renderInfoSection(
        toTitleCase(section.title),
        section.content.filter((item) => String(item || "").trim() !== "")
      )
    )
    .join("");
}

function renderDetailPublications(member) {
  if (isProfessor(member)) return "";

  const pubs = getMemberPublications(member);
  if (!pubs.length) return "";

  return `
    <section class="member-detail-section member-publications-section">
      <div class="type-title member-publications-title">Publications</div>
      <div id="member-publication-list"></div>
    </section>
  `;
}

function getAffiliationText(member) {
  if (member.currentAffiliation && String(member.currentAffiliation).trim() !== "") {
    return member.currentAffiliation;
  }

  if (isFormer(member) && member.nextAffiliation && String(member.nextAffiliation).trim() !== "") {
    return member.nextAffiliation;
  }

  return "";
}

function getLinkHref(link) {
  if (!link || !link.type || !link.value) return "";
  if (link.type === "email") return `mailto:${link.value}`;
  return link.value;
}

function getLinkLabel(link) {
  if (!link || !link.type) return "External link";
  if (link.type === "email") return "Email";
  if (link.type === "linkedin") return "LinkedIn";
  if (link.type === "scholar") return "Google Scholar";
  if (link.type === "website") return "Website";
  if (link.type === "github") return "GitHub";
  if (link.type === "orcid") return "ORCID";
  return "External link";
}

function getLinkIcon(type) {
  if (type === "email") {
    return `<svg viewBox="0 0 24 24" aria-hidden="true" class="icon-link__icon"><path d="M4 6h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2zm0 2v.2l8 5.2 8-5.2V8l-8 5-8-5z"/></svg>`;
  }
  if (type === "linkedin") {
    return `<svg viewBox="0 0 24 24" aria-hidden="true" class="icon-link__icon"><path d="M6.94 8.5A1.56 1.56 0 1 1 6.94 5.38a1.56 1.56 0 0 1 0 3.12zM5.5 9.75h2.88V18.5H5.5V9.75zm4.56 0h2.76v1.2h.04c.38-.73 1.32-1.5 2.72-1.5 2.9 0 3.42 1.9 3.42 4.37v4.68h-2.88v-4.15c0-.99-.02-2.27-1.38-2.27-1.39 0-1.6 1.08-1.6 2.2v4.22h-2.88V9.75z"/></svg>`;
  }
  if (type === "scholar") {
    return `<svg viewBox="0 0 24 24" aria-hidden="true" class="icon-link__icon"><path d="M12 3 1 9l11 6 9-4.91V17h2V9L12 3zm0 13L5.5 12.45V17c0 2.49 3 4.5 6.5 4.5S18.5 19.49 18.5 17v-4.55L12 16z"/></svg>`;
  }
  if (type === "website") {
    return `<svg viewBox="0 0 24 24" aria-hidden="true" class="icon-link__icon"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm6.93 9h-3.08a15.7 15.7 0 0 0-1.38-5.02A8.03 8.03 0 0 1 18.93 11zM12 4.04c.98 1.19 1.78 3.1 2.1 5.46H9.9C10.22 7.14 11.02 5.23 12 4.04zM4.99 13h3.08c.14 1.78.57 3.47 1.39 5.02A8.03 8.03 0 0 1 4.99 13zm3.08-2H4.99a8.03 8.03 0 0 1 4.47-5.02A15.6 15.6 0 0 0 8.07 11zm3.93 8.96c-.98-1.19-1.78-3.1-2.1-5.46h4.2c-.32 2.36-1.12 4.27-2.1 5.46zM14.1 13H9.9a13.7 13.7 0 0 1 0-2h4.2a13.7 13.7 0 0 1 0 2zm.37 5.02A15.7 15.7 0 0 0 15.85 13h3.08a8.03 8.03 0 0 1-4.46 5.02z"/></svg>`;
  }
  if (type === "github") {
    return `<svg viewBox="0 0 24 24" aria-hidden="true" class="icon-link__icon"><path d="M12 .5A12 12 0 0 0 8.2 23.9c.6.1.82-.26.82-.58v-2.03c-3.34.73-4.04-1.41-4.04-1.41-.54-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.72.08-.72 1.2.08 1.84 1.24 1.84 1.24 1.08 1.84 2.82 1.31 3.5 1 .1-.78.42-1.31.76-1.61-2.67-.31-5.47-1.34-5.47-5.94 0-1.31.46-2.38 1.23-3.22-.13-.31-.54-1.56.12-3.24 0 0 1-.32 3.3 1.23a11.3 11.3 0 0 1 6 0c2.3-1.55 3.3-1.23 3.3-1.23.66 1.68.25 2.93.12 3.24.77.84 1.23 1.91 1.23 3.22 0 4.62-2.8 5.63-5.48 5.93.43.37.82 1.11.82 2.24v3.31c0 .32.21.69.83.57A12 12 0 0 0 12 .5z"/></svg>`;
  }
  if (type === "orcid") {
    return `<svg viewBox="0 0 24 24" aria-hidden="true" class="icon-link__icon"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-4.25 4.75a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5zM9 17H6.5v-6H9v6zm8.2 0h-2.46l-1.88-3.2H12.5V17H10v-6h3.53c1.92 0 3.17 1.07 3.17 2.72 0 1.2-.66 2.12-1.76 2.49L17.2 17zm-3.61-4.03H12.5v-1.94h1.09c.72 0 1.18.37 1.18.97s-.46.97-1.18.97z"/></svg>`;
  }

  return `<svg viewBox="0 0 24 24" aria-hidden="true" class="icon-link__icon"><path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3z"/><path d="M5 5h6v2H7v10h10v-4h2v6H5V5z"/></svg>`;
}

function getMemberLinks(member) {
  if (Array.isArray(member.links) && member.links.length > 0) {
    return member.links.filter((link) => link && link.type && link.value);
  }

  if (member.email) {
    return [{ type: "email", value: member.email }];
  }

  return [];
}

function renderMemberLinks(member) {
  const links = getMemberLinks(member);
  if (!links.length) return "";

  const items = links
    .map(
      (link) => `
        <a
          href="${getLinkHref(link)}"
          class="icon-link"
          aria-label="${escapeHtml(getLinkLabel(link))}"
          title="${escapeHtml(getLinkLabel(link))}"
          ${link.type === "email" ? "" : 'target="_blank" rel="noopener noreferrer"'}
        >
          ${getLinkIcon(link.type)}
        </a>
      `
    )
    .join("");

  return `<div class="icon-links member-links">${items}</div>`;
}

function renderProfileHeader(member, centered = false) {
  const imageHtml = member.image
    ? `<img src="${member.image}" alt="${escapeHtml(member.name)}" class="people-photo member-detail-photo">`
    : `<div class="people-photo people-photo-placeholder member-detail-photo"></div>`;

  const roleText = isFormer(member) ? getDegreeLabel(member.role) : formatRole(member.role);
  const roleHtml = roleText
    ? `<div class="type-meta member-detail-role">${escapeHtml(roleText)}</div>`
    : "";

  const affiliation = getAffiliationText(member);
  const affiliationHtml = affiliation
    ? `<div class="type-meta member-detail-affiliation">${escapeHtml(affiliation)}</div>`
    : "";

  return `
    <div class="member-detail-profile ${centered ? "member-detail-profile--centered" : ""}">
      <div class="member-detail-header ${centered ? "member-detail-header--centered" : "member-detail-header--inset"}">
        <div class="member-detail-photo-wrap">${imageHtml}</div>
        <div class="member-detail-main">
          <div class="member-detail-header-text">
            <div class="type-heading member-detail-name">${escapeHtml(member.name)}</div>
            ${roleHtml}
            ${affiliationHtml}
          </div>
          ${renderMemberLinks(member)}
        </div>
      </div>
    </div>
  `;
}

function renderProfessorInline(member) {
  piContainer.innerHTML = `
    ${renderProfileHeader(member, true)}
    <div class="member-detail-sections member-detail-sections--pi">
      ${renderAllSections(member)}
    </div>
  `;
}

function renderPI(allMembers) {
  const pi = allMembers.find((member) => isProfessor(member));
  piContainer.innerHTML = "";
  if (pi) renderProfessorInline(pi);
}

function renderMemberList(container, memberList, former = false) {
  container.innerHTML = "";

  const listDiv = document.createElement("div");
  listDiv.className = former
    ? "people-list people-members-list people-alumni-list"
    : "people-list people-members-list";

  memberList
    .sort((a, b) => {
      const priorityDiff = getRolePriority(a) - getRolePriority(b);
      if (priorityDiff !== 0) return priorityDiff;

      if (former) {
        const yearDiff = (b.leaveYear || 0) - (a.leaveYear || 0);
        if (yearDiff !== 0) return yearDiff;
      } else {
        const yearDiff = (a.joinYear || 9999) - (b.joinYear || 9999);
        if (yearDiff !== 0) return yearDiff;
      }

      return a.name.localeCompare(b.name);
    })
    .forEach((member) => listDiv.appendChild(createMemberCard(member, former)));

  container.appendChild(listDiv);
}

function renderMembers() {
  const currentMembers = members.filter((member) => member.status === "current");
  const professors = currentMembers.filter((member) => isProfessor(member));
  const nonProfessors = currentMembers.filter((member) => !isProfessor(member));
  const formerMembers = members.filter((member) => member.status === "former");

  renderPI(professors);
  renderMemberList(currentContainer, nonProfessors, false);
  renderMemberList(formerContainer, formerMembers, true);
}

function renderMemberDetail(member) {
  const educationSection = renderInfoSection("Education", getSectionItems(member, "EDUCATION"));
  const researchSection = renderInfoSection(
    "Research Interest",
    getSectionItems(member, "RESEARCH INTERESTS")
  );

  let detailSections = "";
  let roleHtml = isFormer(member)
    ? ""
    : formatRole(member.role)
      ? `<div class="type-meta member-detail-role">${escapeHtml(formatRole(member.role))}</div>`
      : "";

  let affiliationHtml = "";
  let joinedAtHtml = "";

  if (isFormer(member)) {
    const joinedAt =
      member.nextAffiliation && String(member.nextAffiliation).trim() !== ""
        ? member.nextAffiliation
        : "";

    joinedAtHtml = joinedAt
      ? `<div class="member-detail-joined"><span class="member-detail-joined-label">Joined at</span><span class="member-detail-joined-value">${escapeHtml(joinedAt)}</span></div>`
      : "";

    detailSections = `
      <div class="member-detail-sections">
        ${educationSection}
        ${renderDetailPublications(member)}
      </div>
    `;
  } else {
    const affiliation = getAffiliationText(member);
    affiliationHtml = affiliation
      ? `<div class="type-meta member-detail-affiliation">${escapeHtml(affiliation)}</div>`
      : "";

    detailSections = `
      <div class="member-detail-sections">
        ${educationSection}
        ${researchSection}
        ${renderDetailPublications(member)}
      </div>
    `;
  }

  const photoBlock = isFormer(member)
    ? ""
    : `<div class="member-detail-photo-wrap">${
        member.image
          ? `<img src="${member.image}" alt="${escapeHtml(member.name)}" class="people-photo member-detail-photo">`
          : `<div class="people-photo people-photo-placeholder member-detail-photo"></div>`
      }</div>`;

  const headerClass = isFormer(member)
    ? "member-detail-header member-detail-header--inset no-photo"
    : "member-detail-header member-detail-header--inset";

  detailView.innerHTML = `
    <a href="people.html" class="back-link">&lt; Back</a>
    <div class="member-detail-profile">
      <div class="${headerClass}">
        ${photoBlock}
        <div class="member-detail-main">
          <div class="member-detail-header-text">
            <div class="type-heading member-detail-name">${escapeHtml(member.name)}</div>
            ${roleHtml}
            ${affiliationHtml}
            ${joinedAtHtml}
          </div>
          ${renderMemberLinks(member)}
        </div>
      </div>
    </div>
    ${detailSections}
  `;

  const pubList = document.getElementById("member-publication-list");
  if (pubList) {
    getMemberPublications(member).forEach((pub) => {
      pubList.appendChild(createPublicationCard(pub));
    });
  }
}

function showListView() {
  listView.style.removeProperty("display");
  detailView.style.display = "none";
  renderMembers();
}

function showDetailView(member) {
  listView.style.display = "none";
  detailView.style.display = "flex";
  renderMemberDetail(member);
}

function showError(message, backLink = false) {
  listView.style.display = "none";
  detailView.style.display = "flex";
  detailView.innerHTML = `
    ${backLink ? '<a href="people.html" class="back-link type-body">← Back to People</a>' : ""}
    <div class="type-title">${escapeHtml(message)}</div>
  `;
}

async function initPeoplePage() {
  try {
    [members, publications] = await Promise.all([
      fetchJson("assets/data/members.json"),
      fetchJson("assets/data/publications.json"),
    ]);

    const id = new URLSearchParams(window.location.search).get("id");

    if (!id) {
      showListView();
      return;
    }

    const member = members.find((m) => m.slug === id);

    if (!member) {
      showError("Member not found.", true);
      return;
    }

    showDetailView(member);
  } catch (error) {
    console.error(error);
    showError("Member data could not be loaded.");
  }
}

initPeoplePage();
