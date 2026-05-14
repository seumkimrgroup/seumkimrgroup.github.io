import{e as a,f as p}from"./util.data-DUVNLu_I.js";import{c as C}from"./component.card.publication-BXZMg7LN.js";const h={JQL:"project",TACTILE:"project",SW:"project","LC-EO":"topic","LC-COMP":"topic","ML-FEA":"topic",PSLC:"method",CLCE:"method",LCE:"method",PIC:"method",THERM:"method",MECH:"method",ELEC:"method",FEATURED:"featured"},E=["project","topic","method","featured"];function b(e){return!e||!e.length?"":`<div class="group">${[...e].sort((n,s)=>{const r=E.indexOf(h[n]??""),o=E.indexOf(h[s]??"");return(r===-1?99:r)-(o===-1?99:o)}).map(n=>{const s=h[n];return`<span class="${s?`tag tag--${s}`:"tag"}">${a(n)}</span>`}).join("")}</div>`}const y=document.querySelector("#projects");async function A(){if(!y)return;const e=await p("/assets/data/projects.json");if(!Array.isArray(e)||e.length===0)return;const t=y.querySelector(".swiper-wrapper"),n=y.querySelector(".carousel-nav"),s=e.length>1;!s&&n&&n.classList.add("is-hidden"),e.forEach(r=>{const o=document.createElement("div");o.className="swiper-slide";const i=document.createElement("div");i.className="carousel__panel",i.style.backgroundImage=`url(${r.background||""})`,i.innerHTML=`
      <div class="inner">
        <div class="stack">
          ${r.subtitle?`<h6>${a(r.subtitle)}</h6>`:""}
          <div class="row">
            <h1>${a(r.title||"")}</h1>
            ${b(r.tag)}
          </div>
          <p>${a(r.description||"")}</p>
          ${r.slug?`<div class="group"><a class="btn btn--primary" href="/project/?slug=${a(r.slug)}">Read more</a></div>`:""}
        </div>
      </div>
    `,o.appendChild(i),t.appendChild(o)}),new Swiper("#projects",{loop:s,speed:600,slidesPerView:1,pagination:{el:".swiper-pagination",clickable:!0},navigation:{prevEl:".swiper-button-prev",nextEl:".swiper-button-next"}})}A();const S='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';function $(e,t){const n=e.classList.contains("is-open");document.querySelectorAll(".card--recruit.is-open").forEach(s=>{s.classList.remove("is-open"),s.querySelector(".split > button").setAttribute("aria-expanded","false")}),n||(e.classList.add("is-open"),t.setAttribute("aria-expanded","true"))}function T(e){const t=document.createElement("div");t.className="card card--recruit",t.innerHTML=`
    <div class="split">
      <h5>${a(e.program||"")}</h5>
      <button class="icon" aria-expanded="false" aria-label="Toggle details">
        ${S}
      </button>
    </div>
    <div class="stack--sm">
      ${b(e.tags)}
      ${e.body_en?`<p>${a(e.body_en)}</p>`:""}
      ${e.body_ko?`<p>${a(e.body_ko)}</p>`:""}
    </div>
  `;const n=t.querySelector(".split > button");return n.addEventListener("click",s=>{s.stopPropagation(),$(t,n)}),t.addEventListener("click",s=>{s.target.closest("button, a, input, textarea, select, label")||$(t,n)}),t}async function _(){const e=document.getElementById("recruit-cards");if(e)try{(await p("/assets/data/recruit.json")).forEach(n=>e.appendChild(T(n)))}catch(t){console.error(t)}}_();var k;(k=document.getElementById("btn-contact"))==null||k.addEventListener("click",e=>{var t;e.preventDefault(),(t=document.querySelector(".footer"))==null||t.scrollIntoView({behavior:"smooth"})});const f=document.querySelector("#research-areas .group"),d=document.querySelector("#research-areas .carousel__track");function q(e,t){const n=c=>Array.isArray(c.tags)?c.tags:[],s=(c,m)=>String(m.date||"").localeCompare(String(c.date||"")),r=t.filter(c=>e.some(m=>n(c).includes(m))).sort(s),o=r.filter(c=>n(c).includes("FEATURED"));if(o.length>=4)return o.slice(0,3);const i=r.filter(c=>!n(c).includes("FEATURED")),g=[...o];for(const c of i){if(g.length>=3)break;g.push(c)}return g.sort(s)}function M(e,t){const n=document.createElement("article");n.className="carousel__panel";const s=Array.isArray(e.tag)?e.tag:[];n.innerHTML=`
    <div class="split split--46">
      <div class="media">
        <img src="${a(e.image)}" alt="${a(e.title)}">
      </div>
      <div class="stack--sm">
        <h3>${a(e.title)}</h3>
        ${b(s)}
        <p>${a(e.description)}</p>
      </div>
    </div>
    <div class="stack">
      <h4>Featured Articles</h4>
    </div>
  `;const r=n.querySelector(":scope > .stack"),o=q(s,t);return o.length?o.forEach(i=>r.appendChild(C(i))):r.innerHTML="<p>No related publications found.</p>",n}function x(e,t){const n=document.createElement("button");n.type="button",n.className="btn areas-tab",n.dataset.index=String(t);const r=(Array.isArray(e.tag)?e.tag:[]).find(o=>h[o]==="topic")??e.title;return n.innerHTML=`<span class="tab-short">${a(r)}</span><span class="tab-full">${a(e.title)}</span>`,n}let u=null;function w(e){const t=f.querySelectorAll(".areas-tab"),n=d.querySelectorAll(".carousel__panel");d.style.transform=`translateX(-${e*100}%)`,t.forEach((r,o)=>r.classList.toggle("active",o===e));const s=n[e];s&&(u&&u.disconnect(),u=new ResizeObserver(()=>{d.parentElement.style.height=s.offsetHeight+"px"}),u.observe(s))}async function H(){if(!(!f||!d))try{const[e,t]=await Promise.all([p("/assets/data/contents.json"),p("/assets/data/publications.json")]),n=e.filter(s=>s.type==="topic");if(!n.length){d.innerHTML='<article class="carousel__panel"><p>No research topics found.</p></article>';return}f.innerHTML="",d.innerHTML="",n.forEach((s,r)=>{const o=x(s,r),i=M(s,t);o.addEventListener("click",()=>w(r)),f.appendChild(o),d.appendChild(i)}),w(0)}catch(e){console.error(e),d.innerHTML='<article class="carousel__panel"><p>Research areas could not be loaded.</p></article>'}}H();function R(e){if(!Array.isArray(e)||!e.length)return"";const t=e.map(s=>`<a href="${a(s.url)}" target="_blank" rel="noopener noreferrer">${a(s.text)}</a>`);let n;return t.length===1?n=t[0]:t.length===2?n=`${t[0]} and ${t[1]}`:n=`${t.slice(0,-1).join(", ")}, and ${t[t.length-1]}`,`<p class="text-secondary">More information: ${n}.</p>`}function j(e){const t=document.createElement("article");return t.className="card card--update",t.innerHTML=`
    <div class="media">
      <img
        src="${e.image||""}"
        alt="${a(e.title||"")}"
      />
    </div>
    <div class="stack--xs">
      ${e.type?`<h6>${a(e.type.charAt(0).toUpperCase()+e.type.slice(1))}</h6>`:""}
      ${e.title?`<h4>${a(e.title)}</h4>`:""}
      <p>${a(e.description||"")}</p>
      ${R(e.links)}
    </div>
  `,t}let l=null;function P(e){if(!Array.isArray(e)||!e.length)return"";const t=e.map(s=>`<a href="${a(s.url)}" target="_blank" rel="noopener noreferrer">${a(s.text)}</a>`);return`<p class="text-secondary">More information:  ${t.length===1?t[0]:t.length===2?`${t[0]} and ${t[1]}`:`${t.slice(0,-1).join(", ")}, and ${t[t.length-1]}`}.</p>`}function N(){const e=document.createElement("div");return e.className="modal-overlay",e.innerHTML=`
    <div class="modal-dialog" role="dialog" aria-modal="true">
      <button class="modal-close" aria-label="Close">&times;</button>
      <div class="media">
        <img src="" alt="">
      </div>
      <div class="stack--sm">
        <h6></h6>
        <h3></h3>
        <p></p>
        <div class="links-wrap"></div>
      </div>
    </div>
  `,e.addEventListener("click",t=>{t.target===e&&v()}),e.querySelector(".modal-close").addEventListener("click",v),document.addEventListener("keydown",t=>{t.key==="Escape"&&v()}),document.body.appendChild(e),e}function v(){l&&(l.classList.remove("is-open"),document.body.classList.remove("modal-open"))}function O(e){l||(l=N());const t=l.querySelector(".media img");t.src=e.image||"",t.alt=a(e.title||"");const n=l.querySelector(".stack--sm h6");n.textContent=e.type?e.type.charAt(0).toUpperCase()+e.type.slice(1):"",n.hidden=!e.type;const s=l.querySelector(".stack--sm h3");s.textContent=e.title||"",s.hidden=!e.title,l.querySelector(".stack--sm > p").textContent=e.description||"",l.querySelector(".links-wrap").innerHTML=P(e.links),l.classList.add("is-open"),document.body.classList.add("modal-open")}const L=document.querySelector("#updates-swiper .swiper-wrapper");async function D(){if(!L)return;const e=await p("/assets/data/contents.json"),t=Array.isArray(e)?e.filter(n=>n.type==="news"||n.type==="highlight"):[];t.length&&(t.forEach(n=>{const s=document.createElement("div");s.className="swiper-slide";const r=j(n);r.style.cursor="pointer",r.addEventListener("click",()=>O(n)),s.appendChild(r),L.appendChild(s)}),new Swiper("#updates-swiper",{loop:!0,breakpoints:{0:{slidesPerView:1,spaceBetween:12},501:{slidesPerView:2,spaceBetween:16},951:{slidesPerView:3,spaceBetween:16}},pagination:{el:".swiper-pagination",clickable:!0},navigation:{prevEl:".swiper-button-prev",nextEl:".swiper-button-next"}}))}D();
