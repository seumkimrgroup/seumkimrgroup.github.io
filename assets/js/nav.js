const navbar = document.querySelector(".navbar");

if (navbar) {
  let lastScrollY = window.scrollY;
  let navbarVisible = true;
  const scrollThreshold = 12;
  const topOffset = 20;

  function updateNavbarOnScroll() {
    const currentScrollY = window.scrollY;
    const diff = currentScrollY - lastScrollY;

    if (currentScrollY <= topOffset) {
      navbar.classList.remove("nav-hidden");
      navbar.classList.remove("nav-scrolled");
      navbarVisible = true;
      lastScrollY = currentScrollY;
      return;
    }

    if (Math.abs(diff) < scrollThreshold) {
      return;
    }

    navbar.classList.add("nav-scrolled");

    if (diff > 0 && navbarVisible) {
      navbar.classList.add("nav-hidden");
      navbarVisible = false;
    } else if (diff < 0 && !navbarVisible) {
      navbar.classList.remove("nav-hidden");
      navbarVisible = true;
    }

    lastScrollY = currentScrollY;
  }

  window.addEventListener("scroll", updateNavbarOnScroll, { passive: true });
  updateNavbarOnScroll();
}
