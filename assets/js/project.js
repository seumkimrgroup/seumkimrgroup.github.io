const projects = [
  {
    subtitle: "Exploring Future Photonics",
    title: "Quantum Photonic Circuits",
    description: "We develop scalable quantum photonic systems using liquid crystal-based phase control.",
    image: "assets/images/project1.jpg"
  },
  {
    subtitle: "Advanced Materials",
    title: "Ferronematic Liquid Crystals",
    description: "High-speed electro-optic response using ferroelectric liquid crystal systems.",
    image: "assets/images/project2.jpg"
  },
  {
    subtitle: "Soft Photonics",
    title: "Liquid Crystal Elastomers",
    description: "Adaptive photonic structures using mechanically responsive LC materials.",
    image: "assets/images/project3.jpg"
  }
];

const slider = document.getElementById("project-slider");
let index = 0;

/* 슬라이드 생성 */
projects.forEach(p => {
  const slide = document.createElement("div");
  slide.className = "project-slide";
  slide.style.backgroundImage = `url(${p.image})`;

  slide.innerHTML = `
    <div class="project-content">
      <div class="project-subtitle">${p.subtitle}</div>
      <div class="project-title">${p.title}</div>
      <div class="project-desc">${p.description}</div>
      <button class="project-readmore">Read More</button>
    </div>
  `;

  slider.appendChild(slide);
});

/* 슬라이드 이동 */
function updateSlide() {
  slider.style.transform = `translateX(-${index * 100}%)`;
}

/* 버튼 */
document.getElementById("project-next").onclick = () => {
  index = (index + 1) % projects.length;
  updateSlide();
};

document.getElementById("project-prev").onclick = () => {
  index = (index - 1 + projects.length) % projects.length;
  updateSlide();
};
