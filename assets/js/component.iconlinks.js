import { escapeHtml } from "./util.data.js";

const LINK_CONFIG = {
  email: {
    label: "Email",
    href: (v) => `mailto:${v}`,
    external: false,
    svg: `<img src="/assets/icons/email.png" alt="" aria-hidden="true">`,
  },
  linkedin: {
    label: "LinkedIn",
    href: (v) => v,
    external: true,
    svg: `<img src="/assets/icons/linkedin.png" alt="" aria-hidden="true">`,
  },
  scholar: {
    label: "Google Scholar",
    href: (v) => v,
    external: true,
    svg: `<svg viewBox="0 0 512 512" aria-hidden="true"><rect width="512" height="512" rx="15%" fill="#4285f4"/><path fill="#fff" d="M213 111l-107 94h69c5 45 41 64 78 67-7 18-4 27 7 39-43 1-103 26-103 67 4 45 63 54 92 54 38 1 81-19 90-54 4-35-10-54-31-71-23-18-28-28-21-40 15-17 35-27 39-51 2-17-2-28-6-43l45-38-1 16c-3 2-5 6-5 9v103c2 13 22 11 23 0V160c0-3-2-7-5-8v-25l16-16zm58 141c-61 10-87-87-38-99 56-11 83 86 38 99zm-5 73c60 13 61 63 10 78-44 9-82-4-81-30 0-25 35-48 71-48z"/></svg>`,
  },
  website: {
    label: "Website",
    href: (v) => v,
    external: true,
    svg: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm6.93 9h-3.08a15.7 15.7 0 0 0-1.38-5.02A8.03 8.03 0 0 1 18.93 11zM12 4.04c.98 1.19 1.78 3.1 2.1 5.46H9.9C10.22 7.14 11.02 5.23 12 4.04zM4.99 13h3.08c.14 1.78.57 3.47 1.39 5.02A8.03 8.03 0 0 1 4.99 13zm3.08-2H4.99a8.03 8.03 0 0 1 4.47-5.02A15.6 15.6 0 0 0 8.07 11zm3.93 8.96c-.98-1.19-1.78-3.1-2.1-5.46h4.2c-.32 2.36-1.12 4.27-2.1 5.46zM14.1 13H9.9a13.7 13.7 0 0 1 0-2h4.2a13.7 13.7 0 0 1 0 2zm.37 5.02A15.7 15.7 0 0 0 15.85 13h3.08a8.03 8.03 0 0 1-4.46 5.02z"/></svg>`,
  },
  github: {
    label: "GitHub",
    href: (v) => v,
    external: true,
    svg: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .5A12 12 0 0 0 8.2 23.9c.6.1.82-.26.82-.58v-2.03c-3.34.73-4.04-1.41-4.04-1.41-.54-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.72.08-.72 1.2.08 1.84 1.24 1.84 1.24 1.08 1.84 2.82 1.31 3.5 1 .1-.78.42-1.31.76-1.61-2.67-.31-5.47-1.34-5.47-5.94 0-1.31.46-2.38 1.23-3.22-.13-.31-.54-1.56.12-3.24 0 0 1-.32 3.3 1.23a11.3 11.3 0 0 1 6 0c2.3-1.55 3.3-1.23 3.3-1.23.66 1.68.25 2.93.12 3.24.77.84 1.23 1.91 1.23 3.22 0 4.62-2.8 5.63-5.48 5.93.43.37.82 1.11.82 2.24v3.31c0 .32.21.69.83.57A12 12 0 0 0 12 .5z"/></svg>`,
  },
  orcid: {
    label: "ORCID",
    href: (v) => v,
    external: true,
    svg: `<svg viewBox="0 0 32 32" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M32 16c0 8.837-7.163 16-16 16-8.838 0-16-7.163-16-16C0 7.162 7.162 0 16 0c8.837 0 16 7.162 16 16Z" fill="#A6CE39"/><path fill-rule="evenodd" clip-rule="evenodd" d="M18.813 9.637h-5.45v13.9h5.474c4.555 0 7.35-3.378 7.35-6.95 0-1.635-.562-3.372-1.77-4.704-1.215-1.336-3.065-2.246-5.605-2.246ZM18.6 21.3h-2.813v-9.425H18.5c1.823 0 3.12.552 3.96 1.4.842.849 1.252 2.021 1.252 3.312 0 .784-.239 1.967-.993 2.948-.745.969-2.01 1.765-4.119 1.765Zm5.311-4.026c-.251 1.74-1.494 4.276-5.311 4.276h-3.063H18.6c3.817 0 5.06-2.536 5.311-4.276Zm1.812-2.405c-.657-2.601-2.85-4.982-6.91-4.982h-5.2 5.2c4.06 0 6.253 2.38 6.91 4.982Zm.215 1.718ZM8.363 9.675v13.887h2.425V9.675H8.363Zm2.175 13.637H8.612h1.925ZM9.575 8.65c.84 0 1.513-.689 1.513-1.513 0-.823-.673-1.512-1.513-1.512-.838 0-1.512.674-1.512 1.513 0 .823.672 1.512 1.512 1.512Z" fill="#fff"/></svg>`,
  },
};

const FALLBACK_SVG = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3z"/><path d="M5 5h6v2H7v10h10v-4h2v6H5V5z"/></svg>`;

export function renderIconLinks(links) {
  if (!links || !links.length) return "";
  const items = links.map(({ type, value }) => {
    const config = LINK_CONFIG[type];
    const href = config ? escapeHtml(config.href(value)) : escapeHtml(value);
    const label = config ? config.label : "External link";
    const svg = config ? config.svg : FALLBACK_SVG;
    const external = !config || config.external;
    return `<a href="${href}" class="icon-link" data-type="${escapeHtml(type)}" aria-label="${escapeHtml(label)}" title="${escapeHtml(label)}"${external ? ' target="_blank" rel="noopener noreferrer"' : ""}><span class="icon-link__icon">${svg}</span></a>`;
  }).join("");
  return `<div class="group">${items}</div>`;
}
