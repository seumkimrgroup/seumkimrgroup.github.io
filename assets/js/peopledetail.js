import { fetchJson, escapeHtml } from "./data.js";
import { createPublicationCard } from "./card.publication.js";
import { formatRole } from "./card.people.js";
import { renderIconLinks } from "./icon-links.js";

function isFormer(member) {
  return member.status === "former";
}

function getMemberPublications(member) {
  const memberName = String(member.name || "").toLowerCase();

  return publications
    .filter((pub) =>
      String(pub.authors || "")
        .toLowerCase()
        .includes(memberName),
    )
    .sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")));
}

function getSectionItems(member, targetTitle) {
  if (!Array.isArray(member.description)) return [];

  const section = member.description.find(
    (item) =>
      String(item?.title || "")
        .trim()
        .toUpperCase() === targetTitle.toUpperCase(),
  );

  if (!section || !Array.isArray(section.content)) return [];

  return section.content.filter((item) => String(item || "").trim() !== "");
}

function renderInfoSection(title, items) {
  if (!items.length) return "";

  const itemsHtml = `<p>${items.map(escapeHtml).join(" <br>\n            ")}</p>`;

  return `
    <div class="stack--sm">
      <h4>${escapeHtml(title)}</h4>
      ${itemsHtml}
    </div>
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
  return renderIconLinks(getMemberLinks(member));
}

function renderMemberDetail(member) {
  const pubs = getMemberPublications(member);

  const educationSection = renderInfoSection(
    "Education",
    getSectionItems(member, "EDUCATION"),
  );

  const researchSection = renderInfoSection(
    "Research Interest",
    getSectionItems(member, "RESEARCH INTERESTS"),
  );

  const role = !isFormer(member) ? formatRole(member.role) : "";
  const affiliation = !isFormer(member)
    ? String(member.currentAffiliation || "").trim()
    : "";
  const subtitleParts = [role, affiliation].filter(Boolean);
  const subtitleHtml = subtitleParts.length
    ? `<p class="text-secondary">${subtitleParts.map(escapeHtml).join(" <br>\n          ")}</p>`
    : "";

  const nextAffiliation = String(member.nextAffiliation || "").trim();
  const joinedAtHtml =
    isFormer(member) && nextAffiliation
      ? `<div class="meta-row"><span class="meta-row__label">JOINED AT</span><span class="meta-row__value">${escapeHtml(nextAffiliation)}</span></div>`
      : "";

  const photoBlock = isFormer(member)
    ? ""
    : member.image
      ? `<div class="media"><img src="${member.image}" alt="${escapeHtml(member.name)}"></div>`
      : `<div class="media"></div>`;

  const headerClass = isFormer(member) ? "stack" : "split split--profile";

  const detailSections = isFormer(member)
    ? `${educationSection}`
    : `${educationSection}${researchSection}`;

  detailView.innerHTML = `
    <div class="${headerClass}">
      ${photoBlock}

      <div class="stack--sm">
        <h2>${escapeHtml(member.name)}</h2>
        ${subtitleHtml}
        ${joinedAtHtml}
        ${renderMemberLinks(member)}
      </div>
    </div>

    ${detailSections}
  `;

  if (pubs.length) {
    const pubSection = document.createElement("div");
    pubSection.className = "stack";
    pubSection.innerHTML = "<h4>Publications</h4>";
    pubs.forEach((pub) => pubSection.appendChild(createPublicationCard(pub)));
    detailView.appendChild(pubSection);
  }
}

async function initPeopleDetailPage() {
  const id = new URLSearchParams(window.location.search).get("id");
  if (!id) return;

  const [members, pubs] = await Promise.all([
    fetchJson("/assets/data/people.json"),
    fetchJson("/assets/data/publications.json"),
  ]);
  publications = pubs;

  const member = members.find((m) => m.slug === id);
  if (member) renderMemberDetail(member);
}

initPeopleDetailPage();
