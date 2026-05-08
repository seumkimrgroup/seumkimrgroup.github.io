import{e as l,f as k}from"./data-Do9LofVd.js";import{c as G}from"./card.publication-BpNUUTd7.js";function U(e){if(!Array.isArray(e)||!e.length)return"";const t=e.map(r=>`<a href="${l(r.url)}" target="_blank" rel="noopener noreferrer">${l(r.text)}</a>`);let n;return t.length===1?n=t[0]:t.length===2?n=`${t[0]} and ${t[1]}`:n=`${t.slice(0,-1).join(", ")}, and ${t[t.length-1]}`,`<p class="text-secondary">More information: ${n}.</p>`}function X(e){const t=document.createElement("article");return t.className="card card--update",t.innerHTML=`
    <div class="media">
      <img
        src="${e.image||""}"
        alt="${l(e.title||"")}"
      />
    </div>
    <div class="info">
      ${e.type?`<h6>${l(e.type.charAt(0).toUpperCase()+e.type.slice(1))}</h6>`:""}
      ${e.title?`<h4>${l(e.title)}</h4>`:""}
      <p>${l(e.description||"")}</p>
      ${U(e.links)}
    </div>
  `,t}let g=null;function D(e){if(!Array.isArray(e)||!e.length)return"";const t=e.map(r=>`<a href="${l(r.url)}" target="_blank" rel="noopener noreferrer">${l(r.text)}</a>`);return`<p class="text-secondary">More information:  ${t.length===1?t[0]:t.length===2?`${t[0]} and ${t[1]}`:`${t.slice(0,-1).join(", ")}, and ${t[t.length-1]}`}.</p>`}function V(){const e=document.createElement("div");return e.className="modal-overlay",e.innerHTML=`
    <div class="modal-dialog" role="dialog" aria-modal="true">
      <button class="modal-close" aria-label="Close">&times;</button>
      <div class="media">
        <img src="" alt="">
      </div>
      <div class="info">
        <h6></h6>
        <h3></h3>
        <p></p>
        <div class="links-wrap"></div>
      </div>
    </div>
  `,e.addEventListener("click",t=>{t.target===e&&P()}),e.querySelector(".modal-close").addEventListener("click",P),document.addEventListener("keydown",t=>{t.key==="Escape"&&P()}),document.body.appendChild(e),e}function P(){g&&(g.classList.remove("is-open"),document.body.classList.remove("modal-open"))}function W(e){g||(g=V());const t=g.querySelector(".media img");t.src=e.image||"",t.alt=l(e.title||"");const n=g.querySelector(".info h6");n.textContent=e.type?e.type.charAt(0).toUpperCase()+e.type.slice(1):"",n.hidden=!e.type;const r=g.querySelector(".info h3");r.textContent=e.title||"",r.hidden=!e.title,g.querySelector(".info > p").textContent=e.description||"",g.querySelector(".links-wrap").innerHTML=D(e.links),g.classList.add("is-open"),document.body.classList.add("modal-open")}const A={JQL:"project",TACTILE:"project",SW:"project","LC-EO":"topic","LC-COMP":"topic","ML-FEA":"topic",PSLC:"method",CLCE:"method",LCE:"method",PIC:"method",THERM:"method",MECH:"method",ELEC:"method",FEATURED:"featured"},N=["project","topic","method","featured"];function M(e){return!e||!e.length?"":`<div class="group">${[...e].sort((n,r)=>{const a=N.indexOf(A[n]??""),i=N.indexOf(A[r]??"");return(a===-1?99:a)-(i===-1?99:i)}).map(n=>{const r=A[n];return`<span class="${r?`tag tag--${r}`:"tag"}">${l(n)}</span>`}).join("")}</div>`}const Y='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" class="card--recruit__chevron"><path stroke-linecap="round" stroke-linejoin="round" d="M6 9l6 6 6-6"/></svg>';function H(e,t){const n=e.classList.contains("is-open");document.querySelectorAll(".card--recruit.is-open").forEach(r=>{r.classList.remove("is-open"),r.querySelector(".card--recruit__btn").setAttribute("aria-expanded","false")}),n||(e.classList.add("is-open"),t.setAttribute("aria-expanded","true"))}function z(e){const t=document.createElement("div");t.className="card card--recruit",t.innerHTML=`
    <div class="card--recruit__main">
      <div class="card--recruit__content">
        <h5>${l(e.program||"")}</h5>
        <div class="card--recruit__body">
          ${M(e.tags)}
          ${e.body_en?`<p>${l(e.body_en)}</p>`:""}
          ${e.body_ko?`<p class="text-secondary">${l(e.body_ko)}</p>`:""}
        </div>
      </div>
      <button class="card--recruit__btn" aria-expanded="false" aria-label="Toggle details">
        ${Y}
      </button>
    </div>
  `;const n=t.querySelector(".card--recruit__btn");return n.addEventListener("click",r=>{r.stopPropagation(),H(t,n)}),t.addEventListener("click",r=>{r.target.closest("button, a, input, textarea, select, label")||H(t,n)}),t}function J(e,t,n){if(!t||!Array.isArray(e)||e.length===0)return;t.innerHTML="";const r=e.map(s=>{const d=document.createElement("div");return d.className="carousel__panel",d.style.backgroundImage=`url(${s.background||""})`,d.innerHTML=`
          <div class="inner">
            <div class="stack">
              ${s.subtitle?`<h6>${l(s.subtitle)}</h6>`:""}
              <div class="meta-row">
                <h1>${l(s.title||"")}</h1>
                ${M(s.tag)}
              </div>
              <p>${l(s.description||"")}</p>
              ${s.slug?`<a class="btn btn--primary" href="/projectdetail/?slug=${l(s.slug)}">Read more</a>`:""}
            </div>
          </div>
        `,t.appendChild(d),d});let a=0;function i(s){r.forEach((d,$)=>{d.style.setProperty("view-transition-name",$===s?"project-hero":"none")})}function c(s){a=(s+e.length)%e.length,t.style.transform=`translateX(-${a*100}%)`,i(a),p()}function p(){if(!n||e.length<=1)return;n.innerHTML="";const s=document.createElement("button");s.type="button",s.className="carousel-nav-btn",s.setAttribute("aria-label","Previous project"),s.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>',s.addEventListener("click",()=>c(a-1)),n.appendChild(s),e.forEach(($,L)=>{const m=document.createElement("button");m.type="button",m.className="carousel-nav-dot"+(L===a?" is-active":""),m.setAttribute("aria-label",`Go to project ${L+1}`),m.addEventListener("click",()=>c(L)),n.appendChild(m)});const d=document.createElement("button");d.type="button",d.className="carousel-nav-btn",d.setAttribute("aria-label","Next project"),d.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>',d.addEventListener("click",()=>c(a+1)),n.appendChild(d)}c(0)}const Q=document.querySelector("#projects .carousel__track"),K=document.querySelector("#projects .carousel-nav"),b=document.querySelector("#lab-updates .carousel__track");function Z(e){if(!b||!Array.isArray(e)||e.length===0)return;const t=b.parentElement,n=t.querySelector(".carousel-nav");if(!t||!n)return;let r=m(),a=[],i=[],c=0,p=0,s=!1,d=null;const $='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>',L='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>';function m(){return window.innerWidth<=500?1:window.innerWidth<=950?2:3}function j(o,u){const v=[];for(let h=0;h<o.length;h+=u)v.push(o.slice(h,h+u));return v}function R(){if(a=j(e,r),a.length<=1){i=[...a],c=0,p=0;return}i=[a[a.length-1],...a,a[0]],c=p+1}function I(o){b.style.transition=o?"transform 0.45s ease":"none"}function E(o=!0){const u=t.clientWidth;u&&(I(o),b.style.transform=`translate3d(-${c*u}px, 0, 0)`)}function B(){if(!(a.length<=1)){if(c===0){c=a.length,p=a.length-1,E(!1);return}c===i.length-1&&(c=1,p=0,E(!1))}}function F(){if(a.length<=1){p=0;return}if(c===0){p=a.length-1;return}if(c===i.length-1){p=0;return}p=c-1}function T(){if(n.innerHTML="",a.length<=1){n.classList.add("is-hidden");return}n.classList.remove("is-hidden");const o=document.createElement("button");o.type="button",o.className="carousel-nav-btn",o.setAttribute("aria-label","Previous page"),o.innerHTML=$,o.addEventListener("click",()=>_(-1)),n.appendChild(o),a.forEach((v,h)=>{const f=document.createElement("button");f.type="button",f.className="carousel-nav-dot",f.setAttribute("aria-label",`Go to page ${h+1}`),h===p&&(f.classList.add("is-active"),f.setAttribute("aria-current","true")),f.addEventListener("click",()=>O(h)),n.appendChild(f)});const u=document.createElement("button");u.type="button",u.className="carousel-nav-btn",u.setAttribute("aria-label","Next page"),u.innerHTML=L,u.addEventListener("click",()=>_(1)),n.appendChild(u)}function O(o){s||a.length<=1||(s=!0,p=o,c=o+1,T(),E(!0))}function _(o){s||a.length<=1||(s=!0,c+=o,F(),T(),E(!0))}function w(){b.innerHTML="",R(),i.forEach(o=>{const u=document.createElement("div");u.className="carousel__panel",o.forEach(v=>{const h=document.createElement("div");h.className="updates-slot",h.style.flexBasis=`${100/r}%`;const f=X(v);f.addEventListener("click",()=>W(v)),h.appendChild(f),u.appendChild(h)}),b.appendChild(u)}),requestAnimationFrame(()=>{requestAnimationFrame(()=>{E(!1),T()})})}let S=0,x=0;t.addEventListener("touchstart",o=>{S=o.changedTouches[0].clientX,x=o.changedTouches[0].clientY},{passive:!0}),t.addEventListener("touchend",o=>{const u=S-o.changedTouches[0].clientX,v=x-o.changedTouches[0].clientY,h=40;Math.abs(v)>Math.abs(u)||Math.abs(u)<h||(u>0?_(1):_(-1))},{passive:!0}),b.addEventListener("transitionend",o=>{o.propertyName==="transform"&&(B(),T(),requestAnimationFrame(()=>{s=!1}))}),window.addEventListener("resize",()=>{clearTimeout(d),d=setTimeout(()=>{const o=m();if(o!==r){r=o,p=0,w();return}E(!1)},120)}),w()}async function ee(){try{const[e,t]=await Promise.all([k("/assets/data/projects.json"),k("/assets/data/contents.json")]),n=Array.isArray(t)?t.filter(r=>r.type==="news"||r.type==="highlight"):[];J(e,Q,K),Z(n)}catch(e){console.error(e)}}async function te(){const e=document.getElementById("recruit-cards");if(e)try{(await k("/assets/data/recruit.json")).forEach(n=>e.appendChild(z(n)))}catch(t){console.error(t)}}ee();te();const C=document.querySelector("#research-areas .group"),y=document.querySelector("#research-areas .carousel__track");function ne(e,t){const n=s=>Array.isArray(s.tags)?s.tags:[],r=(s,d)=>String(d.date||"").localeCompare(String(s.date||"")),a=t.filter(s=>e.some(d=>n(s).includes(d))).sort(r),i=a.filter(s=>n(s).includes("FEATURED"));if(i.length>=4)return i.slice(0,3);const c=a.filter(s=>!n(s).includes("FEATURED")),p=[...i];for(const s of c){if(p.length>=3)break;p.push(s)}return p.sort(r)}function re(e,t){const n=document.createElement("article");n.className="carousel__panel";const r=Array.isArray(e.tag)?e.tag:[];n.innerHTML=`
    <div class="split split--46">
      <div class="media">
        <img src="${l(e.image)}" alt="${l(e.title)}">
      </div>
      <div class="stack stack--sm">
        <h3>${l(e.title)}</h3>
        ${M(r)}
        <p>${l(e.description)}</p>
      </div>
    </div>
    <div class="stack">
      <h4>Featured Articles</h4>
    </div>
  `;const a=n.querySelector(":scope > .stack"),i=ne(r,t);return i.length?i.forEach(c=>a.appendChild(G(c))):a.innerHTML="<p>No related publications found.</p>",n}function ae(e,t){const n=document.createElement("button");n.type="button",n.className="btn areas-tab",n.dataset.index=String(t);const a=(Array.isArray(e.tag)?e.tag:[]).find(i=>A[i]==="topic")??e.title;return n.innerHTML=`<span class="tab-short">${l(a)}</span><span class="tab-full">${l(e.title)}</span>`,n}function q(e){const t=C.querySelectorAll(".areas-tab"),n=y.querySelectorAll(".carousel__panel");y.style.transform=`translateX(-${e*100}%)`,t.forEach((a,i)=>a.classList.toggle("active",i===e));const r=n[e];r&&(y.parentElement.style.height=r.offsetHeight+"px")}async function se(){if(!(!C||!y))try{const[e,t]=await Promise.all([k("/assets/data/contents.json"),k("/assets/data/publications.json")]),n=e.filter(r=>r.type==="topic");if(!n.length){y.innerHTML='<article class="carousel__panel"><p>No research topics found.</p></article>';return}C.innerHTML="",y.innerHTML="",n.forEach((r,a)=>{const i=ae(r,a),c=re(r,t);i.addEventListener("click",()=>q(a)),C.appendChild(i),y.appendChild(c)}),q(0)}catch(e){console.error(e),y.innerHTML='<article class="carousel__panel"><p>Research areas could not be loaded.</p></article>'}}se();
