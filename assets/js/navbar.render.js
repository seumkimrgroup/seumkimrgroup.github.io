const path = window.location.pathname;
const isHome = path === "/" || path.endsWith("/index.html");
const activePath = path.startsWith("/peopledetail") ? "/people/" : path;

function navLink(href, label) {
  const isActive = href === "/" ? isHome : activePath.startsWith(href.replace(/\/$/, ""));
  const cls = isActive ? "active text-nav" : "text-nav";
  return `<a href="${href}" class="${cls}">${label}</a>`;
}

const logoHtml = isHome
  ? `<span class="brand-logo-wrap"><img src="/assets/images/logos/logow.png" alt="Se-Um Kim Research Group" class="brand-logo brand-logo--w"><img src="/assets/images/logos/logod.png" alt="" aria-hidden="true" class="brand-logo brand-logo--d"></span>`
  : `<img src="/assets/images/logos/logow.png" alt="Se-Um Kim Research Group" class="brand-logo">`;

document.querySelector(".navbar").innerHTML = `
  <div class="inner--nav">
    <a href="/" class="brand">${logoHtml}</a>
    <button class="nav-hamburger" id="nav-hamburger" aria-label="Menu" aria-expanded="false">
      <span class="hamburger-icon"></span>
    </button>
    <div class="nav-links">
      ${navLink("/people/", "People")}
      ${navLink("/publications/", "Publications")}
    </div>
  </div>
`;
