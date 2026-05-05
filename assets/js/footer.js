document.querySelector('.footer').innerHTML = `
  <div class="inner inner--footer">
    <div class="split split--footer">
      <div class="footer-brand">
        <a href="https://www.seoultech.ac.kr" class="footer-logo-link" aria-label="SeoulTech">
          <img src="assets/images/logos/seoultechlogo1.svg" alt="SeoulTech logo" class="footer-logo footer-logo--school">
        </a>
        <a href="index.html" class="footer-logo-link" aria-label="Se-Um Kim Research Group">
          <img src="assets/images/logos/logofooter.png" alt="Se-Um Kim Research Group logo" class="footer-logo footer-logo--lab">
        </a>
      </div>
      <div class="footer-contact">
        <h2 class="footer-heading">Contact Us</h2>
        <div class="footer-contact-list">
          <div class="meta-row">
            <span class="meta-row__label">Email</span>
            <a href="mailto:seumkim@seoultech.ac.kr" class="meta-row__value">seumkim@seoultech.ac.kr</a>
          </div>
          <div class="meta-row">
            <span class="meta-row__label">Phone</span>
            <a href="tel:+8229706425" class="meta-row__value">+82-2-970-6425</a>
          </div>
          <div class="meta-row">
            <span class="meta-row__label">Office</span>
            <span class="meta-row__value">Mirae-Hall Unit 523</span>
          </div>
          <div class="meta-row">
            <span class="meta-row__label">Address</span>
            <span class="meta-row__value">Seoul National University of Science and Technology, 232 Gongneung-ro, Nowon-gu, Seoul 01811, Republic of Korea</span>
          </div>
        </div>
      </div>
      <div class="footer-links">
        <h2 class="footer-heading">Quick Links</h2>
        <nav class="footer-nav" aria-label="Footer navigation">
          <a href="index.html">Home</a>
          <a href="people.html">People</a>
          <a href="publications.html">Publications</a>
        </nav>
      </div>
    </div>
  </div>
  <div class="footer-divider"></div>
  <div class="inner">
    <p class="footer-copy">©2026 Se-Um Kim Research Group, Seoul National University of Science and Technology. All rights reserved.</p>
  </div>
`;
