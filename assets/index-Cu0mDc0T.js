import{e as o,f as h}from"./util.data-DUVNLu_I.js";import{c as A}from"./component.card.publication-BXZMg7LN.js";const g={JQL:"project",TACTILE:"project",SW:"project","LC-EO":"topic","LC-COMP":"topic","ML-FEA":"topic",PSLC:"method",CLCE:"method",LCE:"method",PIC:"method",THERM:"method",MECH:"method",ELEC:"method",FEATURED:"featured"},$=["project","topic","method","featured"];function E(e){return!e||!e.length?"":`<div class="group">${[...e].sort((n,r)=>{const s=$.indexOf(g[n]??""),a=$.indexOf(g[r]??"");return(s===-1?99:s)-(a===-1?99:a)}).map(n=>{const r=g[n];return`<span class="${r?`tag tag--${r}`:"tag"}">${o(n)}</span>`}).join("")}</div>`}const f=document.querySelector("#projects .carousel__track"),p=document.querySelector("#projects .carousel-nav");async function T(){if(!f)return;const e=await h("/assets/data/projects.json");if(!Array.isArray(e)||e.length===0)return;f.innerHTML="",e.map(s=>{const a=document.createElement("div");return a.className="carousel__panel",a.style.backgroundImage=`url(${s.background||""})`,a.innerHTML=`
          <div class="inner">
            <div class="stack">
              ${s.subtitle?`<h6>${o(s.subtitle)}</h6>`:""}
              <div class="row">
                <h1>${o(s.title||"")}</h1>
                ${E(s.tag)}
              </div>
              <p>${o(s.description||"")}</p>
              ${s.slug?`<div class="group"><a class="btn btn--primary" href="/project/?slug=${o(s.slug)}">Read more</a></div>`:""}
            </div>
          </div>
        `,f.appendChild(a),a});let t=0;function n(s){t=(s+e.length)%e.length,f.style.transform=`translateX(-${t*100}%)`,r()}function r(){if(!p||e.length<=1)return;p.innerHTML="";const s=document.createElement("button");s.type="button",s.className="carousel-nav-btn",s.setAttribute("aria-label","Previous project"),s.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>',s.addEventListener("click",()=>n(t-1)),p.appendChild(s),e.forEach((u,d)=>{const c=document.createElement("button");c.type="button",c.className="carousel-nav-dot"+(d===t?" is-active":""),c.setAttribute("aria-label",`Go to project ${d+1}`),c.addEventListener("click",()=>n(d)),p.appendChild(c)});const a=document.createElement("button");a.type="button",a.className="carousel-nav-btn",a.setAttribute("aria-label","Next project"),a.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>',a.addEventListener("click",()=>n(t+1)),p.appendChild(a)}n(0)}T();const S='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';function k(e,t){const n=e.classList.contains("is-open");document.querySelectorAll(".card--recruit.is-open").forEach(r=>{r.classList.remove("is-open"),r.querySelector(".split > button").setAttribute("aria-expanded","false")}),n||(e.classList.add("is-open"),t.setAttribute("aria-expanded","true"))}function _(e){const t=document.createElement("div");t.className="card card--recruit",t.innerHTML=`
    <div class="split">
      <h5>${o(e.program||"")}</h5>
      <button class="icon" aria-expanded="false" aria-label="Toggle details">
        ${S}
      </button>
    </div>
    <div class="stack--sm">
      ${E(e.tags)}
      ${e.body_en?`<p>${o(e.body_en)}</p>`:""}
      ${e.body_ko?`<p>${o(e.body_ko)}</p>`:""}
    </div>
  `;const n=t.querySelector(".split > button");return n.addEventListener("click",r=>{r.stopPropagation(),k(t,n)}),t.addEventListener("click",r=>{r.target.closest("button, a, input, textarea, select, label")||k(t,n)}),t}async function M(){const e=document.getElementById("recruit-cards");if(e)try{(await h("/assets/data/recruit.json")).forEach(n=>e.appendChild(_(n)))}catch(t){console.error(t)}}M();var w;(w=document.getElementById("btn-contact"))==null||w.addEventListener("click",e=>{var t;e.preventDefault(),(t=document.querySelector(".footer"))==null||t.scrollIntoView({behavior:"smooth"})});const v=document.querySelector("#research-areas .group"),l=document.querySelector("#research-areas .carousel__track");function x(e,t){const n=c=>Array.isArray(c.tags)?c.tags:[],r=(c,y)=>String(y.date||"").localeCompare(String(c.date||"")),s=t.filter(c=>e.some(y=>n(c).includes(y))).sort(r),a=s.filter(c=>n(c).includes("FEATURED"));if(a.length>=4)return a.slice(0,3);const u=s.filter(c=>!n(c).includes("FEATURED")),d=[...a];for(const c of u){if(d.length>=3)break;d.push(c)}return d.sort(r)}function H(e,t){const n=document.createElement("article");n.className="carousel__panel";const r=Array.isArray(e.tag)?e.tag:[];n.innerHTML=`
    <div class="split split--46">
      <div class="media">
        <img src="${o(e.image)}" alt="${o(e.title)}">
      </div>
      <div class="stack--sm">
        <h3>${o(e.title)}</h3>
        ${E(r)}
        <p>${o(e.description)}</p>
      </div>
    </div>
    <div class="stack">
      <h4>Featured Articles</h4>
    </div>
  `;const s=n.querySelector(":scope > .stack"),a=x(r,t);return a.length?a.forEach(u=>s.appendChild(A(u))):s.innerHTML="<p>No related publications found.</p>",n}function j(e,t){const n=document.createElement("button");n.type="button",n.className="btn areas-tab",n.dataset.index=String(t);const s=(Array.isArray(e.tag)?e.tag:[]).find(a=>g[a]==="topic")??e.title;return n.innerHTML=`<span class="tab-short">${o(s)}</span><span class="tab-full">${o(e.title)}</span>`,n}let m=null;function L(e){const t=v.querySelectorAll(".areas-tab"),n=l.querySelectorAll(".carousel__panel");l.style.transform=`translateX(-${e*100}%)`,t.forEach((s,a)=>s.classList.toggle("active",a===e));const r=n[e];r&&(m&&m.disconnect(),m=new ResizeObserver(()=>{l.parentElement.style.height=r.offsetHeight+"px"}),m.observe(r))}async function q(){if(!(!v||!l))try{const[e,t]=await Promise.all([h("/assets/data/contents.json"),h("/assets/data/publications.json")]),n=e.filter(r=>r.type==="topic");if(!n.length){l.innerHTML='<article class="carousel__panel"><p>No research topics found.</p></article>';return}v.innerHTML="",l.innerHTML="",n.forEach((r,s)=>{const a=j(r,s),u=H(r,t);a.addEventListener("click",()=>L(s)),v.appendChild(a),l.appendChild(u)}),L(0)}catch(e){console.error(e),l.innerHTML='<article class="carousel__panel"><p>Research areas could not be loaded.</p></article>'}}q();function N(e){if(!Array.isArray(e)||!e.length)return"";const t=e.map(r=>`<a href="${o(r.url)}" target="_blank" rel="noopener noreferrer">${o(r.text)}</a>`);let n;return t.length===1?n=t[0]:t.length===2?n=`${t[0]} and ${t[1]}`:n=`${t.slice(0,-1).join(", ")}, and ${t[t.length-1]}`,`<p class="text-secondary">More information: ${n}.</p>`}function R(e){const t=document.createElement("article");return t.className="card card--update",t.innerHTML=`
    <div class="media">
      <img
        src="${e.image||""}"
        alt="${o(e.title||"")}"
      />
    </div>
    <div class="stack--xs">
      ${e.type?`<h6>${o(e.type.charAt(0).toUpperCase()+e.type.slice(1))}</h6>`:""}
      ${e.title?`<h4>${o(e.title)}</h4>`:""}
      <p>${o(e.description||"")}</p>
      ${N(e.links)}
    </div>
  `,t}let i=null;function P(e){if(!Array.isArray(e)||!e.length)return"";const t=e.map(r=>`<a href="${o(r.url)}" target="_blank" rel="noopener noreferrer">${o(r.text)}</a>`);return`<p class="text-secondary">More information:  ${t.length===1?t[0]:t.length===2?`${t[0]} and ${t[1]}`:`${t.slice(0,-1).join(", ")}, and ${t[t.length-1]}`}.</p>`}function B(){const e=document.createElement("div");return e.className="modal-overlay",e.innerHTML=`
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
  `,e.addEventListener("click",t=>{t.target===e&&b()}),e.querySelector(".modal-close").addEventListener("click",b),document.addEventListener("keydown",t=>{t.key==="Escape"&&b()}),document.body.appendChild(e),e}function b(){i&&(i.classList.remove("is-open"),document.body.classList.remove("modal-open"))}function O(e){i||(i=B());const t=i.querySelector(".media img");t.src=e.image||"",t.alt=o(e.title||"");const n=i.querySelector(".stack--sm h6");n.textContent=e.type?e.type.charAt(0).toUpperCase()+e.type.slice(1):"",n.hidden=!e.type;const r=i.querySelector(".stack--sm h3");r.textContent=e.title||"",r.hidden=!e.title,i.querySelector(".stack--sm > p").textContent=e.description||"",i.querySelector(".links-wrap").innerHTML=P(e.links),i.classList.add("is-open"),document.body.classList.add("modal-open")}const C=document.querySelector("#updates-swiper .swiper-wrapper");async function D(){if(!C)return;const e=await h("/assets/data/contents.json"),t=Array.isArray(e)?e.filter(n=>n.type==="news"||n.type==="highlight"):[];t.length&&(t.forEach(n=>{const r=document.createElement("div");r.className="swiper-slide";const s=R(n);s.style.cursor="pointer",s.addEventListener("click",()=>O(n)),r.appendChild(s),C.appendChild(r)}),new Swiper("#updates-swiper",{loop:!0,breakpoints:{0:{slidesPerView:1,spaceBetween:12},501:{slidesPerView:2,spaceBetween:16},951:{slidesPerView:3,spaceBetween:16}},pagination:{el:"#upd-pagination",clickable:!0},navigation:{prevEl:"#upd-prev",nextEl:"#upd-next"}}))}D();
