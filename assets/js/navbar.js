const page = window.location.pathname.split('/').pop() || 'index.html';
const activePage = page === 'peopledetail.html' ? 'people.html' : page;
const isHome = page === 'index.html' || page === '';

function navLink(href, label) {
    const cls = href === activePage ? 'active text-nav' : 'text-nav';
    return `<a href="${href}" class="${cls}">${label}</a>`;
}

const logoHtml = isHome
    ? `<span class="brand-logo-wrap"><img src="assets/images/logos/logow.png" alt="Se-Um Kim Research Group" class="brand-logo brand-logo--w"><img src="assets/images/logos/logod.png" alt="" aria-hidden="true" class="brand-logo brand-logo--d"></span>`
    : `<img src="assets/images/logos/logow.png" alt="Se-Um Kim Research Group" class="brand-logo">`;

document.querySelector('.navbar').innerHTML = `
  <div class="inner inner--nav">
    <a href="index.html" class="brand">${logoHtml}</a>
    <button class="nav-hamburger" id="nav-hamburger" aria-label="Menu" aria-expanded="false">
      <span class="hamburger-icon"></span>
    </button>
    <div class="nav-links">
      ${navLink('people.html', 'People')}
      ${navLink('publications.html', 'Publications')}
    </div>
  </div>
`;
