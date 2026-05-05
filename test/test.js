const joinCards = document.querySelectorAll(".card--join");
const moreButton = document.getElementById("join-more-btn");

function setOpenCard(targetCard) {
  joinCards.forEach((card) => {
    const toggle = card.querySelector(".join-card-toggle");
    const shouldOpen = card === targetCard;

    card.classList.toggle("is-open", shouldOpen);
    toggle.setAttribute("aria-expanded", String(shouldOpen));
  });
}

joinCards.forEach((card) => {
  const toggle = card.querySelector(".join-card-toggle");

  toggle.addEventListener("click", () => {
    setOpenCard(card);
  });
});

if (moreButton) {
  moreButton.addEventListener("click", () => {
    const firstClosedCard = Array.from(joinCards).find(
      (card) => !card.classList.contains("is-open")
    );

    setOpenCard(firstClosedCard || joinCards[0]);
  });
}
