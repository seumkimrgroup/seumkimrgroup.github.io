const navbar = document.querySelector(".navbar");
let lastScrollY = window.scrollY;

function updateNavbarOnScroll() {
  if (!navbar) return;

  const currentScrollY = window.scrollY;
  const scrollingDown = currentScrollY > lastScrollY;
  const nearTop = currentScrollY < 20;

  if (nearTop) {
    navbar.classList.remove("nav-hidden");
    navbar.classList.remove("nav-scrolled");
  } else {
    navbar.classList.add("nav-scrolled");

    if (scrollingDown) {
      navbar.classList.add("nav-hidden");
    } else {
      navbar.classList.remove("nav-hidden");
    }
  }

  lastScrollY = currentScrollY;
}

window.addEventListener("scroll", updateNavbarOnScroll, { passive: true });
updateNavbarOnScroll();
