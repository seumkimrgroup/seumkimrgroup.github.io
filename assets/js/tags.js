import { escapeHtml } from "./data.js";

export const TAG_GROUP = {
  JQL: "project", TACTILE: "project", SW: "project",
  "LC-EO": "topic", "LC-COMP": "topic", "ML-FEA": "topic",
  PSLC: "method", CLCE: "method", LCE: "method",
  PIC: "method", THERM: "method", MECH: "method", ELEC: "method",
  FEATURED: "featured",
};

export const GROUP_ORDER = ["project", "topic", "method", "featured"];

export function renderTags(tags) {
  if (!tags || !tags.length) return "";
  const sorted = [...tags].sort((a, b) => {
    const ga = GROUP_ORDER.indexOf(TAG_GROUP[a] ?? "");
    const gb = GROUP_ORDER.indexOf(TAG_GROUP[b] ?? "");
    return (ga === -1 ? 99 : ga) - (gb === -1 ? 99 : gb);
  });
  return `<div class="group">${sorted.map((tag) => {
    const group = TAG_GROUP[tag];
    const cls = group ? `tag tag--${group}` : "tag";
    return `<span class="${cls}">${escapeHtml(tag)}</span>`;
  }).join("")}</div>`;
}
