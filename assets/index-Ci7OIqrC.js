import{e as c,f as E}from"./data-Do9LofVd.js";import{r as w,T as F}from"./tags-ONlygREO.js";import{c as G}from"./card.publication-BpNUUTd7.js";function X(e){if(!Array.isArray(e)||!e.length)return"";const t=e.map(r=>`<a href="${c(r.url)}" target="_blank" rel="noopener noreferrer">${c(r.text)}</a>`);let n;return t.length===1?n=t[0]:t.length===2?n=`${t[0]} and ${t[1]}`:n=`${t.slice(0,-1).join(", ")}, and ${t[t.length-1]}`,`<p class="text-secondary">More information: ${n}.</p>`}function U(e){const t=document.createElement("article");return t.className="card card--update",t.innerHTML=`
    <div class="media">
      <img
        src="${e.image||""}"
        alt="${c(e.title||"")}"
      />
    </div>
    <div class="info">
      ${e.type?`<h6>${c(e.type.charAt(0).toUpperCase()+e.type.slice(1))}</h6>`:""}
      ${e.title?`<h4>${c(e.title)}</h4>`:""}
      <p>${c(e.description||"")}</p>
      ${X(e.links)}
    </div>
  `,t}let g=null;function V(e){if(!Array.isArray(e)||!e.length)return"";const t=e.map(r=>`<a href="${c(r.url)}" target="_blank" rel="noopener noreferrer">${c(r.text)}</a>`);return`<p class="text-secondary">More information:  ${t.length===1?t[0]:t.length===2?`${t[0]} and ${t[1]}`:`${t.slice(0,-1).join(", ")}, and ${t[t.length-1]}`}.</p>`}function D(){const e=document.createElement("div");return e.className="modal-overlay",e.innerHTML=`
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
  `,e.addEventListener("click",t=>{t.target===e&&C()}),e.querySelector(".modal-close").addEventListener("click",C),document.addEventListener("keydown",t=>{t.key==="Escape"&&C()}),document.body.appendChild(e),e}function C(){g&&(g.classList.remove("is-open"),document.body.classList.remove("modal-open"))}function W(e){g||(g=D());const t=g.querySelector(".media img");t.src=e.image||"",t.alt=c(e.title||"");const n=g.querySelector(".info h6");n.textContent=e.type?e.type.charAt(0).toUpperCase()+e.type.slice(1):"",n.hidden=!e.type;const r=g.querySelector(".info h3");r.textContent=e.title||"",r.hidden=!e.title,g.querySelector(".info > p").textContent=e.description||"",g.querySelector(".links-wrap").innerHTML=V(e.links),g.classList.add("is-open"),document.body.classList.add("modal-open")}const Y='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" class="card--recruit__chevron"><path stroke-linecap="round" stroke-linejoin="round" d="M6 9l6 6 6-6"/></svg>';function N(e,t){const n=e.classList.contains("is-open");document.querySelectorAll(".card--recruit.is-open").forEach(r=>{r.classList.remove("is-open"),r.querySelector(".card--recruit__btn").setAttribute("aria-expanded","false")}),n||(e.classList.add("is-open"),t.setAttribute("aria-expanded","true"))}function O(e){const t=document.createElement("div");t.className="card card--recruit",t.innerHTML=`
    <div class="card--recruit__main">
      <div class="card--recruit__content">
        <h5>${c(e.program||"")}</h5>
        <div class="card--recruit__body">
          ${w(e.tags)}
          ${e.body_en?`<p>${c(e.body_en)}</p>`:""}
          ${e.body_ko?`<p class="text-secondary">${c(e.body_ko)}</p>`:""}
        </div>
      </div>
      <button class="card--recruit__btn" aria-expanded="false" aria-label="Toggle details">
        ${Y}
      </button>
    </div>
  `;const n=t.querySelector(".card--recruit__btn");return n.addEventListener("click",r=>{r.stopPropagation(),N(t,n)}),t.addEventListener("click",r=>{r.target.closest("button, a, input, textarea, select, label")||N(t,n)}),t}function z(e,t,n){if(!t||!Array.isArray(e)||e.length===0)return;t.innerHTML="";const r=e.map(a=>{const d=document.createElement("div");return d.className="carousel__panel",d.style.backgroundImage=`url(${a.background||""})`,d.innerHTML=`
          <div class="inner">
            <div class="stack">
              ${a.subtitle?`<h6>${c(a.subtitle)}</h6>`:""}
              <div class="meta-row">
                <h1>${c(a.title||"")}</h1>
                ${w(a.tag)}
              </div>
              <p>${c(a.description||"")}</p>
              ${a.slug?`<a class="btn btn--primary" href="/projectdetail/?slug=${c(a.slug)}">Read more</a>`:""}
            </div>
          </div>
        `,t.appendChild(d),d});let s=0;function l(a){r.forEach((d,L)=>{d.style.setProperty("view-transition-name",L===a?"project-hero":"none")})}function o(a){s=(a+e.length)%e.length,t.style.transform=`translateX(-${s*100}%)`,l(s),p()}function p(){if(!n||e.length<=1)return;n.innerHTML="";const a=document.createElement("button");a.type="button",a.className="carousel-nav-btn",a.setAttribute("aria-label","Previous project"),a.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>',a.addEventListener("click",()=>o(s-1)),n.appendChild(a),e.forEach((L,$)=>{const m=document.createElement("button");m.type="button",m.className="carousel-nav-dot"+($===s?" is-active":""),m.setAttribute("aria-label",`Go to project ${$+1}`),m.addEventListener("click",()=>o($)),n.appendChild(m)});const d=document.createElement("button");d.type="button",d.className="carousel-nav-btn",d.setAttribute("aria-label","Next project"),d.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>',d.addEventListener("click",()=>o(s+1)),n.appendChild(d)}o(0)}const J=document.querySelector("#projects .carousel__track"),K=document.querySelector("#projects .carousel-nav"),b=document.querySelector("#lab-updates .carousel__track");function Q(e){if(!b||!Array.isArray(e)||e.length===0)return;const t=b.parentElement,n=t.querySelector(".carousel-nav");if(!t||!n)return;let r=m(),s=[],l=[],o=0,p=0,a=!1,d=null;const L='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>',$='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>';function m(){return window.innerWidth<=500?1:window.innerWidth<=950?2:3}function H(i,u){const v=[];for(let h=0;h<i.length;h+=u)v.push(i.slice(h,h+u));return v}function q(){if(s=H(e,r),s.length<=1){l=[...s],o=0,p=0;return}l=[s[s.length-1],...s,s[0]],o=p+1}function j(i){b.style.transition=i?"transform 0.45s ease":"none"}function k(i=!0){const u=t.clientWidth;u&&(j(i),b.style.transform=`translate3d(-${o*u}px, 0, 0)`)}function R(){if(!(s.length<=1)){if(o===0){o=s.length,p=s.length-1,k(!1);return}o===l.length-1&&(o=1,p=0,k(!1))}}function B(){if(s.length<=1){p=0;return}if(o===0){p=s.length-1;return}if(o===l.length-1){p=0;return}p=o-1}function T(){if(n.innerHTML="",s.length<=1){n.classList.add("is-hidden");return}n.classList.remove("is-hidden");const i=document.createElement("button");i.type="button",i.className="carousel-nav-btn",i.setAttribute("aria-label","Previous page"),i.innerHTML=L,i.addEventListener("click",()=>_(-1)),n.appendChild(i),s.forEach((v,h)=>{const f=document.createElement("button");f.type="button",f.className="carousel-nav-dot",f.setAttribute("aria-label",`Go to page ${h+1}`),h===p&&(f.classList.add("is-active"),f.setAttribute("aria-current","true")),f.addEventListener("click",()=>I(h)),n.appendChild(f)});const u=document.createElement("button");u.type="button",u.className="carousel-nav-btn",u.setAttribute("aria-label","Next page"),u.innerHTML=$,u.addEventListener("click",()=>_(1)),n.appendChild(u)}function I(i){a||s.length<=1||(a=!0,p=i,o=i+1,T(),k(!0))}function _(i){a||s.length<=1||(a=!0,o+=i,B(),T(),k(!0))}function P(){b.innerHTML="",q(),l.forEach(i=>{const u=document.createElement("div");u.className="carousel__panel",i.forEach(v=>{const h=document.createElement("div");h.className="updates-slot",h.style.flexBasis=`${100/r}%`;const f=U(v);f.addEventListener("click",()=>W(v)),h.appendChild(f),u.appendChild(h)}),b.appendChild(u)}),requestAnimationFrame(()=>{requestAnimationFrame(()=>{k(!1),T()})})}let S=0,M=0;t.addEventListener("touchstart",i=>{S=i.changedTouches[0].clientX,M=i.changedTouches[0].clientY},{passive:!0}),t.addEventListener("touchend",i=>{const u=S-i.changedTouches[0].clientX,v=M-i.changedTouches[0].clientY,h=40;Math.abs(v)>Math.abs(u)||Math.abs(u)<h||(u>0?_(1):_(-1))},{passive:!0}),b.addEventListener("transitionend",i=>{i.propertyName==="transform"&&(R(),T(),requestAnimationFrame(()=>{a=!1}))}),window.addEventListener("resize",()=>{clearTimeout(d),d=setTimeout(()=>{const i=m();if(i!==r){r=i,p=0,P();return}k(!1)},120)}),P()}async function Z(){try{const[e,t]=await Promise.all([E("/assets/data/projects.json"),E("/assets/data/contents.json")]),n=Array.isArray(t)?t.filter(r=>r.type==="news"||r.type==="highlight"):[];z(e,J,K),Q(n)}catch(e){console.error(e)}}async function ee(){const e=document.getElementById("recruit-cards");if(e)try{(await E("/assets/data/recruit.json")).forEach(n=>e.appendChild(O(n)))}catch(t){console.error(t)}}Z();ee();const A=document.querySelector("#research-areas .group"),y=document.querySelector("#research-areas .carousel__track");function te(e,t){const n=a=>Array.isArray(a.tags)?a.tags:[],r=(a,d)=>String(d.date||"").localeCompare(String(a.date||"")),s=t.filter(a=>e.some(d=>n(a).includes(d))).sort(r),l=s.filter(a=>n(a).includes("FEATURED"));if(l.length>=4)return l.slice(0,3);const o=s.filter(a=>!n(a).includes("FEATURED")),p=[...l];for(const a of o){if(p.length>=3)break;p.push(a)}return p.sort(r)}function ne(e,t){const n=document.createElement("article");n.className="carousel__panel";const r=Array.isArray(e.tag)?e.tag:[];n.innerHTML=`
    <div class="split split--46">
      <div class="media">
        <img src="${c(e.image)}" alt="${c(e.title)}">
      </div>
      <div class="stack stack--sm">
        <h3>${c(e.title)}</h3>
        ${w(r)}
        <p>${c(e.description)}</p>
      </div>
    </div>
    <div class="stack">
      <h4>Featured Articles</h4>
    </div>
  `;const s=n.querySelector(":scope > .stack"),l=te(r,t);return l.length?l.forEach(o=>s.appendChild(G(o))):s.innerHTML="<p>No related publications found.</p>",n}function re(e,t){const n=document.createElement("button");n.type="button",n.className="btn areas-tab",n.dataset.index=String(t);const s=(Array.isArray(e.tag)?e.tag:[]).find(l=>F[l]==="topic")??e.title;return n.innerHTML=`<span class="tab-short">${c(s)}</span><span class="tab-full">${c(e.title)}</span>`,n}function x(e){const t=A.querySelectorAll(".areas-tab"),n=y.querySelectorAll(".carousel__panel");y.style.transform=`translateX(-${e*100}%)`,t.forEach((s,l)=>s.classList.toggle("active",l===e));const r=n[e];r&&(y.parentElement.style.height=r.offsetHeight+"px")}async function ae(){if(!(!A||!y))try{const[e,t]=await Promise.all([E("/assets/data/contents.json"),E("/assets/data/publications.json")]),n=e.filter(r=>r.type==="topic");if(!n.length){y.innerHTML='<article class="carousel__panel"><p>No research topics found.</p></article>';return}A.innerHTML="",y.innerHTML="",n.forEach((r,s)=>{const l=re(r,s),o=ne(r,t);l.addEventListener("click",()=>x(s)),A.appendChild(l),y.appendChild(o)}),x(0)}catch(e){console.error(e),y.innerHTML='<article class="carousel__panel"><p>Research areas could not be loaded.</p></article>'}}ae();
