const projects = [
  {
    subtitle: "Participating in",
    title: "Joint Quantum Lab",
    description:
      "We develop scalable quantum photonic systems using liquid crystal-based phase control.",
    image: "assets/images/project1.jpg"
  },
  {
    subtitle: "Advanced Materials",
    title: "Ferronematic Liquid Crystals",
    description:
      "High-speed electro-optic response using ferroelectric liquid crystal systems.",
    image: "assets/images/project2.jpg"
  },
  {
    subtitle: "Soft Photonics",
    title: "Liquid Crystal Elastomers",
    description:
      "Adaptive photonic structures using mechanically responsive LC materials.",
    image: "assets/images/project3.jpg"
  }
];

const slider = document.getElementById("project-slider");
const prevBtn = document.getElementById("project-prev");
const nextBtn = document.getElementById("project-next");

let currentIndex = 0;

if (slider && prevBtn && nextBtn) {
  projects.forEach((project) => {
    const slide = document.createElement("div");
    slide.className = "project-slide";
    slide.style.backgroundImage = `url(${project.image})`;

    slide.innerHTML = `
      <div class="project-content">
        <div class="project-subtitle">${project.subtitle}</div>
        <div class="project-title">${project.title}</div>
        <div class="project-desc">${project.description}</div>
        <a href="#" class="site-btn site-btn--primary project-readmore">Read More</a>
      </div>
    `;

    slider.appendChild(slide);
  });

  function updateSlide() {
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % projects.length;
    updateSlide();
  });

  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + projects.length) % projects.length;
    updateSlide();
  });

  updateSlide();
}
