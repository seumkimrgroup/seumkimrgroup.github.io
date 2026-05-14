(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&l(n)}).observe(document,{childList:!0,subtree:!0});function d(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function l(e){if(e.ep)return;e.ep=!0;const t=d(e);fetch(e.href,t)}})();const f=window.location.pathname,w=f==="/"||f.endsWith("/index.html"),L=f.startsWith("/peopledetail")?"/people/":f;function m(a,o){const l=(a==="/"?w:L.startsWith(a.replace(/\/$/,"")))?"active text-nav":"text-nav";return`<a href="${a}" class="${l}">${o}</a>`}const y='<span class="brand-logo-wrap"><img src="/assets/images/logos/logow.png" alt="Se-Um Kim Research Group" class="brand-logo brand-logo--w"><img src="/assets/images/logos/logod.png" alt="" aria-hidden="true" class="brand-logo brand-logo--d"></span>';document.querySelector(".navbar").innerHTML=`
  <div class="inner--nav">
    <a href="/" class="brand">${y}</a>
    <button class="nav-hamburger" id="nav-hamburger" aria-label="Menu" aria-expanded="false">
      <span class="hamburger-icon"></span>
    </button>
    <div class="nav-links">
      ${m("/people/","People")}
      ${m("/publications/","Publications")}
    </div>
  </div>
`;document.querySelector(".footer").innerHTML=`
  <div class="inner--90">
    <div class="split split--footer">
      <div class="footer-brand">
        <a href="https://www.seoultech.ac.kr" class="footer-logo-link" aria-label="SeoulTech">
          <img src="/assets/images/logos/seoultechlogo1.svg" alt="SeoulTech logo" class="footer-logo footer-logo--school">
        </a>
        <a href="/" class="footer-logo-link" aria-label="Se-Um Kim Research Group">
          <img src="/assets/images/logos/logofooter.png" alt="Se-Um Kim Research Group logo" class="footer-logo footer-logo--lab">
        </a>
      </div>
      <div class="footer-contact">
        <h2 class="footer-heading">Contact</h2>
        <div class="stack" style="gap: var(--space-sm);">
          <div class="row">
            <span class="row__label">Email</span>
            <a href="mailto:seumkim@seoultech.ac.kr" class="row__value">seumkim@seoultech.ac.kr</a>
          </div>
          <div class="row">
            <span class="row__label">Phone</span>
            <a href="tel:+8229706425" class="row__value">+82-2-970-6415</a>
          </div>
          <div class="row">
            <span class="row__label">Office</span>
            <span class="row__value">Mirae-Hall Unit 523</span>
          </div>
          <div class="row">
            <span class="row__label">Address</span>
            <span class="row__value">Seoul National University of Science and Technology, 232 Gongneung-ro, Nowon-gu, Seoul 01811, Republic of Korea</span>
          </div>
        </div>
      </div>
      <div class="footer-links">
        <h2 class="footer-heading">Quick Links</h2>
        <nav class="footer-nav" aria-label="Footer navigation">
          <a href="/">Home</a>
          <a href="/people/">People</a>
          <a href="/publications/">Publications</a>
        </nav>
      </div>
    </div>
  </div>
  <div class="footer-divider"></div>
  <div class="inner--90">
    <p class="footer-copy">©2026 Se-Um Kim Research Group in Seoultech. All rights reserved.</p>
  </div>
`;const s=document.querySelector(".navbar"),b=document.querySelector(".hero"),i=document.getElementById("nav-hamburger");if(s){let n=function(){s.classList.remove("nav-hidden")},p=function(){s.classList.add("nav-hidden")},u=function(){o&&(clearTimeout(o),o=null)},g=function(r){u(),!(window.scrollY<=l)&&(s.classList.contains("nav-open")||(o=setTimeout(p,r??e)))},v=function(){if(!b)return;const r=b.getBoundingClientRect(),c=s.offsetHeight;r.bottom>c?s.classList.add("nav-over-project"):s.classList.remove("nav-over-project")},h=function(){const r=window.scrollY,c=r-a;if(v(),r<=l){n(),s.classList.remove("nav-scrolled"),u(),a=r;return}s.classList.add("nav-scrolled"),!(Math.abs(c)<d)&&(c>0?(p(),u()):c<0&&(n(),g()),a=r)},a=window.scrollY,o=null;const d=12,l=20,e=1800,t=3600;i&&(i.addEventListener("click",()=>{const r=s.classList.toggle("nav-open");i.setAttribute("aria-expanded",String(r)),r?(u(),n(),window.scrollY<=l&&s.classList.add("nav-scrolled")):window.scrollY<=l&&s.classList.remove("nav-scrolled")}),document.querySelectorAll(".nav-links a").forEach(r=>{r.addEventListener("click",()=>{s.classList.remove("nav-open"),i.setAttribute("aria-expanded","false")})})),window.addEventListener("scroll",()=>{s.classList.contains("nav-open")&&(s.classList.remove("nav-open"),i&&i.setAttribute("aria-expanded","false"),g(t))},{passive:!0}),window.addEventListener("scroll",h,{passive:!0}),window.addEventListener("resize",v),v(),h()}async function S(a){const o=await fetch(a,{cache:"no-store"});if(!o.ok)throw new Error(`Failed to load ${a}: ${o.status}`);return await o.json()}function A(a){return String(a??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}export{A as e,S as f};
