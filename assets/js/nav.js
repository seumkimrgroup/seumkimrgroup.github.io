const navbar = document.querySelector(".navbar");
const project = document.querySelector(".project");

if (navbar) {
  let lastScrollY = window.scrollY;
  let navbarVisible = true;
  let hideTimer = null;

  const scrollThreshold = 12;
  const topOffset = 20;
  const autoHideDelay = 1800;

  function showNavbar() {
    navbar.classList.remove("nav-hidden");
    navbarVisible = true;
  }

  function hideNavbar() {
    navbar.classList.add("nav-hidden");
    navbarVisible = false;
  }

  function clearHideTimer() {
    if (hideTimer) {
      clearTimeout(hideTimer);
      hideTimer = null;
    }
  }

  function scheduleAutoHide() {
    clearHideTimer();

    if (window.scrollY <= topOffset) return;

    hideTimer = setTimeout(() => {
      hideNavbar();
    }, autoHideDelay);
  }

  function updateNavbarColor() {
    if (!project) return;

    const projectBottom = project.offsetTop + project.offsetHeight;
    const navbarHeight = navbar.offsetHeight;

    if (window.scrollY + navbarHeight < projectBottom) {
      navbar.classList.add("nav-over-project");
    } else {
      navbar.classList.remove("nav-over-project");
    }
  }

  function updateNavbarOnScroll() {
    const currentScrollY = window.scrollY;
    const diff = currentScrollY - lastScrollY;

    updateNavbarColor();

    if (currentScrollY <= topOffset) {
      showNavbar();
      navbar.classList.remove("nav-scrolled");
      clearHideTimer();
      lastScrollY = currentScrollY;
      return;
    }

    navbar.classList.add("nav-scrolled");

    if (Math.abs(diff) < scrollThreshold) {
      return;
    }

    if (diff > 0) {
      hideNavbar();
      clearHideTimer();
    } else if (diff < 0) {
      showNavbar();
      scheduleAutoHide();
    }

    lastScrollY = currentScrollY;
  }

  window.addEventListener("scroll", updateNavbarOnScroll, { passive: true });
  window.addEventListener("resize", updateNavbarColor);

  updateNavbarColor();
  updateNavbarOnScroll();
}