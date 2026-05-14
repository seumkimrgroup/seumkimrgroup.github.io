import{e as a,f as h}from"./util.data-DUVNLu_I.js";import{c as L}from"./component.card.publication-BXZMg7LN.js";const f={JQL:"project",TACTILE:"project",SW:"project","LC-EO":"topic","LC-COMP":"topic","ML-FEA":"topic",PSLC:"method",CLCE:"method",LCE:"method",PIC:"method",THERM:"method",MECH:"method",ELEC:"method",FEATURED:"featured"},b=["project","topic","method","featured"];function y(e){return!e||!e.length?"":`<div class="group">${[...e].sort((s,n)=>{const r=b.indexOf(f[s]??""),i=b.indexOf(f[n]??"");return(r===-1?99:r)-(i===-1?99:i)}).map(s=>{const n=f[s];return`<span class="${n?`tag tag--${n}`:"tag"}">${a(s)}</span>`}).join("")}</div>`}const m=document.querySelector("#projects");async function k(){if(!m)return;const e=await h("/assets/data/projects.json");if(!Array.isArray(e)||e.length===0)return;const t=m.querySelector(".swiper-wrapper"),s=m.querySelector(".carousel-nav"),n=e.length>1;!n&&s&&s.classList.add("is-hidden"),e.forEach(r=>{const i=document.createElement("div");i.className="swiper-slide",i.style.backgroundImage=`url(${r.background||""})`,i.innerHTML=`
      <div class="inner">
        <div class="stack">
          ${r.subtitle?`<h6>${a(r.subtitle)}</h6>`:""}
          <div class="row">
            <h1>${a(r.title||"")}</h1>
            ${y(r.tag)}
          </div>
          <p>${a(r.description||"")}</p>
          ${r.slug?`<div class="group"><a class="btn btn--primary" href="/project/?slug=${a(r.slug)}">Read more</a></div>`:""}
        </div>
      </div>
    `,t.appendChild(i)}),new Swiper("#projects",{loop:n,speed:600,slidesPerView:1,pagination:{el:".swiper-pagination",clickable:!0},navigation:{prevEl:".swiper-button-prev",nextEl:".swiper-button-next"}})}k();const C='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';function E(e,t){const s=e.classList.contains("is-open");document.querySelectorAll(".card--recruit.is-open").forEach(n=>{n.classList.remove("is-open"),n.querySelector(".split > button").setAttribute("aria-expanded","false")}),s||(e.classList.add("is-open"),t.setAttribute("aria-expanded","true"))}function A(e){const t=document.createElement("div");t.className="card card--recruit",t.innerHTML=`
    <div class="split">
      <h5>${a(e.program||"")}</h5>
      <button class="icon" aria-expanded="false" aria-label="Toggle details">
        ${C}
      </button>
    </div>
    <div class="stack--sm">
      ${y(e.tags)}
      ${e.body_en?`<p>${a(e.body_en)}</p>`:""}
      ${e.body_ko?`<p>${a(e.body_ko)}</p>`:""}
    </div>
  `;const s=t.querySelector(".split > button");return s.addEventListener("click",n=>{n.stopPropagation(),E(t,s)}),t.addEventListener("click",n=>{n.target.closest("button, a, input, textarea, select, label")||E(t,s)}),t}async function S(){const e=document.getElementById("recruit-cards");if(e)try{(await h("/assets/data/recruit.json")).forEach(s=>e.appendChild(A(s)))}catch(t){console.error(t)}}S();var $;($=document.getElementById("btn-contact"))==null||$.addEventListener("click",e=>{var t;e.preventDefault(),(t=document.querySelector(".footer"))==null||t.scrollIntoView({behavior:"smooth"})});const p=document.querySelector("#research-areas .group"),u=document.querySelector("#research-swiper .swiper-wrapper");function T(e,t){const s=o=>Array.isArray(o.tags)?o.tags:[],n=(o,g)=>String(g.date||"").localeCompare(String(o.date||"")),r=t.filter(o=>e.some(g=>s(o).includes(g))).sort(n),i=r.filter(o=>s(o).includes("FEATURED"));if(i.length>=4)return i.slice(0,3);const d=r.filter(o=>!s(o).includes("FEATURED")),l=[...i];for(const o of d){if(l.length>=3)break;l.push(o)}return l.sort(n)}function x(e,t,s){const n=Array.isArray(t.tag)?t.tag:[];e.innerHTML=`
    <div class="split split--46">
      <div class="media">
        <img src="${a(t.image)}" alt="${a(t.title)}">
      </div>
      <div class="stack--sm">
        <h3>${a(t.title)}</h3>
        ${y(n)}
        <p>${a(t.description)}</p>
      </div>
    </div>
    <div class="stack">
      <h4>Featured Articles</h4>
    </div>
  `;const r=e.querySelector(":scope > .stack"),i=T(n,s);i.length?i.forEach(d=>r.appendChild(L(d))):r.innerHTML="<p>No related publications found.</p>"}function q(e,t){const s=document.createElement("button");s.type="button",s.className="btn areas-tab",s.dataset.index=String(t);const r=(Array.isArray(e.tag)?e.tag:[]).find(i=>f[i]==="topic")??e.title;return s.innerHTML=`<span class="tab-short">${a(r)}</span><span class="tab-full">${a(e.title)}</span>`,s}async function M(){if(!(!p||!u))try{const[e,t]=await Promise.all([h("/assets/data/contents.json"),h("/assets/data/publications.json")]),s=e.filter(r=>r.type==="topic");if(!s.length){u.innerHTML='<div class="swiper-slide"><p>No research topics found.</p></div>';return}p.innerHTML="",u.innerHTML="",s.forEach((r,i)=>{const d=q(r,i);i===0&&d.classList.add("active"),p.appendChild(d);const l=document.createElement("div");l.className="swiper-slide",x(l,r,t),u.appendChild(l)});const n=new Swiper("#research-swiper",{autoHeight:!0,speed:460,loop:!1,on:{slideChange(r){p.querySelectorAll(".areas-tab").forEach((d,l)=>d.classList.toggle("active",l===r.activeIndex))}}});p.querySelectorAll(".areas-tab").forEach((r,i)=>{r.addEventListener("click",()=>n.slideTo(i))})}catch(e){console.error(e),u.innerHTML='<div class="swiper-slide"><p>Research areas could not be loaded.</p></div>'}}M();function H(e){if(!Array.isArray(e)||!e.length)return"";const t=e.map(n=>`<a href="${a(n.url)}" target="_blank" rel="noopener noreferrer">${a(n.text)}</a>`);let s;return t.length===1?s=t[0]:t.length===2?s=`${t[0]} and ${t[1]}`:s=`${t.slice(0,-1).join(", ")}, and ${t[t.length-1]}`,`<p class="text-secondary">More information: ${s}.</p>`}function R(e){const t=document.createElement("article");return t.className="card card--update",t.innerHTML=`
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
      ${H(e.links)}
    </div>
  `,t}let c=null;function j(e){if(!Array.isArray(e)||!e.length)return"";const t=e.map(n=>`<a href="${a(n.url)}" target="_blank" rel="noopener noreferrer">${a(n.text)}</a>`);return`<p class="text-secondary">More information:  ${t.length===1?t[0]:t.length===2?`${t[0]} and ${t[1]}`:`${t.slice(0,-1).join(", ")}, and ${t[t.length-1]}`}.</p>`}function P(){const e=document.createElement("div");return e.className="modal-overlay",e.innerHTML=`
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
  `,e.addEventListener("click",t=>{t.target===e&&v()}),e.querySelector(".modal-close").addEventListener("click",v),document.addEventListener("keydown",t=>{t.key==="Escape"&&v()}),document.body.appendChild(e),e}function v(){c&&(c.classList.remove("is-open"),document.body.classList.remove("modal-open"))}function N(e){c||(c=P());const t=c.querySelector(".media img");t.src=e.image||"",t.alt=a(e.title||"");const s=c.querySelector(".stack--sm h6");s.textContent=e.type?e.type.charAt(0).toUpperCase()+e.type.slice(1):"",s.hidden=!e.type;const n=c.querySelector(".stack--sm h3");n.textContent=e.title||"",n.hidden=!e.title,c.querySelector(".stack--sm > p").textContent=e.description||"",c.querySelector(".links-wrap").innerHTML=j(e.links),c.classList.add("is-open"),document.body.classList.add("modal-open")}const w=document.querySelector("#updates-swiper .swiper-wrapper");async function O(){if(!w)return;const e=await h("/assets/data/contents.json"),t=Array.isArray(e)?e.filter(s=>s.type==="news"||s.type==="highlight"):[];t.length&&(t.forEach(s=>{const n=document.createElement("div");n.className="swiper-slide";const r=R(s);r.style.cursor="pointer",r.addEventListener("click",()=>N(s)),n.appendChild(r),w.appendChild(n)}),new Swiper("#updates-swiper",{loop:!0,breakpoints:{0:{slidesPerView:1,spaceBetween:12},501:{slidesPerView:2,spaceBetween:16},951:{slidesPerView:3,spaceBetween:16}},pagination:{el:".swiper-pagination",clickable:!0},navigation:{prevEl:".swiper-button-prev",nextEl:".swiper-button-next"}}))}O();
