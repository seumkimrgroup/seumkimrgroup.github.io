const navbar = document.querySelector(".navbar");
const project = document.querySelector(".project");
const hamburger = document.getElementById("nav-hamburger");

if (navbar) {
  let lastScrollY = window.scrollY;
  let navbarVisible = true;
  let hideTimer = null;

  const scrollThreshold = 12;
  const topOffset = 20;
  const autoHideDelay = 1800;
  const autoHideDelayAfterMenu = 3600;

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

  function scheduleAutoHide(delay) {
    clearHideTimer();
    if (window.scrollY <= topOffset) return;
    if (navbar.classList.contains("nav-open")) return;
    hideTimer = setTimeout(hideNavbar, delay ?? autoHideDelay);
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

  if (hamburger) {
    hamburger.addEventListener("click", () => {
      const isOpen = navbar.classList.toggle("nav-open");
      hamburger.setAttribute("aria-expanded", String(isOpen));
      hamburger.textContent = isOpen ? "✕" : "☰";
      if (isOpen) {
        clearHideTimer();
        showNavbar();
      }
    });

    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", () => {
        navbar.classList.remove("nav-open");
        hamburger.setAttribute("aria-expanded", "false");
        hamburger.textContent = "☰";
      });
    });
  }

  window.addEventListener("scroll", () => {
    if (navbar.classList.contains("nav-open")) {
      navbar.classList.remove("nav-open");
      if (hamburger) {
        hamburger.setAttribute("aria-expanded", "false");
        hamburger.textContent = "☰";
      }
      scheduleAutoHide(autoHideDelayAfterMenu);
    }
  }, { passive: true });

  window.addEventListener("scroll", updateNavbarOnScroll, { passive: true });
  window.addEventListener("resize", updateNavbarColor);

  updateNavbarColor();
  updateNavbarOnScroll();
}
