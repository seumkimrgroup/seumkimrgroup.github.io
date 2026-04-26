import { fetchJson, escapeHtml } from "./data.js";
import { createPublicationCard } from "./publicationcard.js";
import { formatRole } from "./peoplecard.js";

const detailView = document.getElementById("member-detail-view");

let publications = [];

const LINK_CONFIG = {
    email:    { label: "Email",         href: (v) => `mailto:${v}`, external: false, svg: `<svg viewBox="0 0 24 24" aria-hidden="true" class="icon-link__icon"><path d="M4 6h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2zm0 2v.2l8 5.2 8-5.2V8l-8 5-8-5z"/></svg>` },
    linkedin: { label: "LinkedIn",      href: (v) => v,              external: true,  svg: `<svg viewBox="0 0 24 24" aria-hidden="true" class="icon-link__icon"><path d="M6.94 8.5A1.56 1.56 0 1 1 6.94 5.38a1.56 1.56 0 0 1 0 3.12zM5.5 9.75h2.88V18.5H5.5V9.75zm4.56 0h2.76v1.2h.04c.38-.73 1.32-1.5 2.72-1.5 2.9 0 3.42 1.9 3.42 4.37v4.68h-2.88v-4.15c0-.99-.02-2.27-1.38-2.27-1.39 0-1.6 1.08-1.6 2.2v4.22h-2.88V9.75z"/></svg>` },
    scholar:  { label: "Google Scholar",href: (v) => v,              external: true,  svg: `<svg viewBox="0 0 24 24" aria-hidden="true" class="icon-link__icon"><path d="M12 3 1 9l11 6 9-4.91V17h2V9L12 3zm0 13L5.5 12.45V17c0 2.49 3 4.5 6.5 4.5S18.5 19.49 18.5 17v-4.55L12 16z"/></svg>` },
    website:  { label: "Website",       href: (v) => v,              external: true,  svg: `<svg viewBox="0 0 24 24" aria-hidden="true" class="icon-link__icon"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm6.93 9h-3.08a15.7 15.7 0 0 0-1.38-5.02A8.03 8.03 0 0 1 18.93 11zM12 4.04c.98 1.19 1.78 3.1 2.1 5.46H9.9C10.22 7.14 11.02 5.23 12 4.04zM4.99 13h3.08c.14 1.78.57 3.47 1.39 5.02A8.03 8.03 0 0 1 4.99 13zm3.08-2H4.99a8.03 8.03 0 0 1 4.47-5.02A15.6 15.6 0 0 0 8.07 11zm3.93 8.96c-.98-1.19-1.78-3.1-2.1-5.46h4.2c-.32 2.36-1.12 4.27-2.1 5.46zM14.1 13H9.9a13.7 13.7 0 0 1 0-2h4.2a13.7 13.7 0 0 1 0 2zm.37 5.02A15.7 15.7 0 0 0 15.85 13h3.08a8.03 8.03 0 0 1-4.46 5.02z"/></svg>` },
    github:   { label: "GitHub",        href: (v) => v,              external: true,  svg: `<svg viewBox="0 0 24 24" aria-hidden="true" class="icon-link__icon"><path d="M12 .5A12 12 0 0 0 8.2 23.9c.6.1.82-.26.82-.58v-2.03c-3.34.73-4.04-1.41-4.04-1.41-.54-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.72.08-.72 1.2.08 1.84 1.24 1.84 1.24 1.08 1.84 2.82 1.31 3.5 1 .1-.78.42-1.31.76-1.61-2.67-.31-5.47-1.34-5.47-5.94 0-1.31.46-2.38 1.23-3.22-.13-.31-.54-1.56.12-3.24 0 0 1-.32 3.3 1.23a11.3 11.3 0 0 1 6 0c2.3-1.55 3.3-1.23 3.3-1.23.66 1.68.25 2.93.12 3.24.77.84 1.23 1.91 1.23 3.22 0 4.62-2.8 5.63-5.48 5.93.43.37.82 1.11.82 2.24v3.31c0 .32.21.69.83.57A12 12 0 0 0 12 .5z"/></svg>` },
    orcid:    { label: "ORCID",         href: (v) => v,              external: true,  svg: `<svg viewBox="0 0 24 24" aria-hidden="true" class="icon-link__icon"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-4.25 4.75a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5zM9 17H6.5v-6H9v6zm8.2 0h-2.46l-1.88-3.2H12.5V17H10v-6h3.53c1.92 0 3.17 1.07 3.17 2.72 0 1.2-.66 2.12-1.76 2.49L17.2 17zm-3.61-4.03H12.5v-1.94h1.09c.72 0 1.18.37 1.18.97s-.46.97-1.18.97z"/></svg>` },
};

const FALLBACK_SVG = `<svg viewBox="0 0 24 24" aria-hidden="true" class="icon-link__icon"><path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3z"/><path d="M5 5h6v2H7v10h10v-4h2v6H5V5z"/></svg>`;

function isFormer(member) {
    return member.status === "former";
}

function getMemberPublications(member) {
    const memberName = String(member.name || "").toLowerCase();

    return publications
        .filter((pub) => String(pub.authors || "").toLowerCase().includes(memberName))
        .sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")));
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

    const itemsHtml = `<p>${items.map(escapeHtml).join(" <br>\n            ")}</p>`;

    return `
    <div class="container">
      <h3>${escapeHtml(title)}</h3>
      <div class="member-detail-section-body">${itemsHtml}</div>
    </div>
  `;
}

function renderDetailPublications(pubs) {
    if (!pubs.length) return "";

    return `
    <section class="container member-publications-section">
      <h3>Publications</h3>
      <div id="member-publication-list" class="publication-list"></div>
    </section>
  `;
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
        .map((link) => {
            const config = LINK_CONFIG[link.type];
            const href = config ? config.href(link.value) : link.value;
            const label = config ? config.label : "External link";
            const svg = config ? config.svg : FALLBACK_SVG;
            const external = !config || config.external;

            return `
        <a
          href="${escapeHtml(href)}"
          class="icon-link"
          aria-label="${escapeHtml(label)}"
          title="${escapeHtml(label)}"
          ${external ? 'target="_blank" rel="noopener noreferrer"' : ""}
        >${svg}</a>`;
        })
        .join("");

    return `<div class="icon-links">${items}</div>`;
}

function renderMemberDetail(member) {
    const pubs = getMemberPublications(member);

    const educationSection = renderInfoSection(
        "Education",
        getSectionItems(member, "EDUCATION")
    );

    const researchSection = renderInfoSection(
        "Research Interest",
        getSectionItems(member, "RESEARCH INTERESTS")
    );

    const role = !isFormer(member) ? formatRole(member.role) : "";
    const affiliation = String(member.currentAffiliation || "").trim();
    const subtitleParts = [role, affiliation].filter(Boolean);
    const subtitleHtml = subtitleParts.length
        ? `<h5>${subtitleParts.map(escapeHtml).join(" <br>\n          ")}</h5>`
        : "";

    const nextAffiliation = String(member.nextAffiliation || "").trim();
    const joinedAtHtml = isFormer(member) && nextAffiliation
        ? `<div class="member-detail-joined"><span class="member-detail-joined__label">Joined at</span><span class="member-detail-joined__value">${escapeHtml(nextAffiliation)}</span></div>`
        : "";

    const photoBlock = isFormer(member)
        ? ""
        : member.image
            ? `<img src="${member.image}" alt="${escapeHtml(member.name)}" class="people-photo member-detail-photo">`
            : `<div class="people-photo people-photo-placeholder member-detail-photo"></div>`;

    const headerClass = isFormer(member)
        ? "container container--grid two-col two-col--profile no-photo"
        : "container container--grid two-col two-col--profile";

    const detailSections = isFormer(member)
        ? `${educationSection}${renderDetailPublications(pubs)}`
        : `${educationSection}${researchSection}${renderDetailPublications(pubs)}`;

    detailView.innerHTML = `
    <a href="people.html" class="back-link">&lt; Back</a>

    <div class="${headerClass}">
      ${photoBlock}

      <div class="member-detail-main">
        <h2 class="member-detail-name">${escapeHtml(member.name)}</h2>
        ${subtitleHtml}
        ${joinedAtHtml}
        ${renderMemberLinks(member)}
      </div>
    </div>

    ${detailSections}
  `;

    const pubList = document.getElementById("member-publication-list");

    if (pubList) {
        pubs.forEach((pub) => pubList.appendChild(createPublicationCard(pub)));
    }
}

function showError(message, backLink = true) {
    if (!detailView) return;

    detailView.innerHTML = `
    ${backLink ? '<a href="people.html" class="back-link">← Back to People</a>' : ""}
    <h3>${escapeHtml(message)}</h3>
  `;
}

async function initPeopleDetailPage() {
    try {
        const id = new URLSearchParams(window.location.search).get("id");

        if (!id) {
            showError("Member not found.");
            return;
        }

        let members;
        [members, publications] = await Promise.all([
            fetchJson("assets/data/people.json"),
            fetchJson("assets/data/publications.json"),
        ]);

        const member = members.find((m) => m.slug === id);

        if (!member) {
            showError("Member not found.");
            return;
        }

        renderMemberDetail(member);
    } catch (error) {
        console.error(error);
        showError("Member data could not be loaded.");
    }
}

initPeopleDetailPage();
