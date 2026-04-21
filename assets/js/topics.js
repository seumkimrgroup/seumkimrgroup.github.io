const topics = [
  {
    title: "LC composite materials & systems",
    image: "assets/images/research/topic1.jpg",
    description:
      "Design and application of liquid crystal composites for responsive optical materials and functional device platforms."
  },
  {
    title: "LC-based electro-optical systems",
    image: "assets/images/research/topic2.jpg",
    description:
      "Electro-optical phase control, tunable optical filtering, and hybrid photonic devices based on liquid crystal anisotropy."
  },
  {
    title: "ML-assisted optimization of FEM simulations",
    image: "assets/images/research/topic3.jpg",
    description:
      "Machine learning-assisted simulation workflows for thermal, electrical, and optical FEM analysis and accelerated design optimization."
  }
];

const topicContainer = document.getElementById("research-area-list");

if (topicContainer) {
  topics.forEach((topic) => {
    const item = document.createElement("article");
    item.className = "research-area-card";

    item.innerHTML = `
      <div class="research-area-image-wrap">
        <img
          src="${topic.image}"
          alt="${topic.title}"
          class="research-area-image"
        />
      </div>
      <div class="research-area-body">
        <h3 class="research-area-title">${topic.title}</h3>
        <p class="research-area-text">${topic.description}</p>
      </div>
    `;

    topicContainer.appendChild(item);
  });
}
