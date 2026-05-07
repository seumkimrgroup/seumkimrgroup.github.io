import"./components.cards-tGjZ0gJw.js";import{e as c,f as C}from"./data-S4SCuinP.js";import{c as X}from"./card.publication-CirH_ktY.js";function D(e){if(!Array.isArray(e)||!e.length)return"";const t=e.map(r=>`<a href="${c(r.url)}" target="_blank" rel="noopener noreferrer">${c(r.text)}</a>`);let n;return t.length===1?n=t[0]:t.length===2?n=`${t[0]} and ${t[1]}`:n=`${t.slice(0,-1).join(", ")}, and ${t[t.length-1]}`,`<p class="text-secondary">More information: ${n}.</p>`}function V(e){const t=document.createElement("article");return t.className="card card--update",t.innerHTML=`
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
      ${D(e.links)}
    </div>
  `,t}let f=null;function W(e){if(!Array.isArray(e)||!e.length)return"";const t=e.map(r=>`<a href="${c(r.url)}" target="_blank" rel="noopener noreferrer">${c(r.text)}</a>`);return`<p class="text-secondary">More information:  ${t.length===1?t[0]:t.length===2?`${t[0]} and ${t[1]}`:`${t.slice(0,-1).join(", ")}, and ${t[t.length-1]}`}.</p>`}function Y(){const e=document.createElement("div");return e.className="modal-overlay",e.innerHTML=`
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
  `,e.addEventListener("click",t=>{t.target===e&&_()}),e.querySelector(".modal-close").addEventListener("click",_),document.addEventListener("keydown",t=>{t.key==="Escape"&&_()}),document.body.appendChild(e),e}function _(){f&&(f.classList.remove("is-open"),document.body.classList.remove("modal-open"))}function z(e){f||(f=Y());const t=f.querySelector(".media img");t.src=e.image||"",t.alt=c(e.title||"");const n=f.querySelector(".info h6");n.textContent=e.type?e.type.charAt(0).toUpperCase()+e.type.slice(1):"",n.hidden=!e.type;const r=f.querySelector(".info h3");r.textContent=e.title||"",r.hidden=!e.title,f.querySelector(".info > p").textContent=e.description||"",f.querySelector(".links-wrap").innerHTML=W(e.links),f.classList.add("is-open"),document.body.classList.add("modal-open")}const T={JQL:"project",TACTILE:"project",SW:"project","LC-EO":"topic","LC-COMP":"topic","ML-FEA":"topic",PSLC:"method",CLCE:"method",LCE:"method",PIC:"method",THERM:"method",MECH:"method",ELEC:"method",FEATURED:"featured"},H=["project","topic","method","featured"];function S(e){return!e||!e.length?"":`<div class="group">${[...e].sort((n,r)=>{const a=H.indexOf(T[n]??""),s=H.indexOf(T[r]??"");return(a===-1?99:a)-(s===-1?99:s)}).map(n=>{const r=T[n];return`<span class="${r?`tag tag--${r}`:"tag"}">${c(n)}</span>`}).join("")}</div>`}const J='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" class="card--recruit__chevron"><path stroke-linecap="round" stroke-linejoin="round" d="M6 9l6 6 6-6"/></svg>';function N(e,t){const n=e.classList.contains("is-open");document.querySelectorAll(".card--recruit.is-open").forEach(r=>{r.classList.remove("is-open"),r.querySelector(".card--recruit__btn").setAttribute("aria-expanded","false")}),n||(e.classList.add("is-open"),t.setAttribute("aria-expanded","true"))}function Q(e){const t=document.createElement("div");t.className="card card--recruit",t.innerHTML=`
    <div class="card--recruit__main">
      <div class="card--recruit__content">
        <h5>${c(e.program||"")}</h5>
        <div class="card--recruit__body">
          ${S(e.tags)}
          ${e.body_en?`<p>${c(e.body_en)}</p>`:""}
          ${e.body_ko?`<p class="text-secondary">${c(e.body_ko)}</p>`:""}
        </div>
      </div>
      <button class="card--recruit__btn" aria-expanded="false" aria-label="Toggle details">
        ${J}
      </button>
    </div>
  `;const n=t.querySelector(".card--recruit__btn");return n.addEventListener("click",r=>{r.stopPropagation(),N(t,n)}),t.addEventListener("click",r=>{r.target.closest("button, a, input, textarea, select, label")||N(t,n)}),t}const $=document.getElementById("project-slider"),E=document.getElementById("project-nav"),v=document.getElementById("updates-track");function K(e){if(!$||!Array.isArray(e)||e.length===0)return;$.innerHTML="",e.forEach(a=>{const s=document.createElement("div");s.className="carousel__panel",s.style.backgroundImage=`url(${a.image||""})`,s.innerHTML=`
          <div class="inner">
            <div class="project-content">
              <h6 class="project-subtitle">${c(a.subtitle||"")}</h6>
              <h1 class="project-title">${c(a.title||"")}</h1>
              <p class="project-desc">${c(a.description||"")}</p>
            </div>
          </div>
        `,$.appendChild(s)});let t=0;function n(a){t=(a+e.length)%e.length,$.style.transform=`translateX(-${t*100}%)`,r()}function r(){if(!E||e.length<=1)return;E.innerHTML="";const a=document.createElement("button");a.type="button",a.className="carousel-nav-btn",a.setAttribute("aria-label","Previous project"),a.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>',a.addEventListener("click",()=>n(t-1)),E.appendChild(a),e.forEach((d,u)=>{const i=document.createElement("button");i.type="button",i.className="carousel-nav-dot"+(u===t?" is-active":""),i.setAttribute("aria-label",`Go to project ${u+1}`),i.addEventListener("click",()=>n(u)),E.appendChild(i)});const s=document.createElement("button");s.type="button",s.className="carousel-nav-btn",s.setAttribute("aria-label","Next project"),s.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>',s.addEventListener("click",()=>n(t+1)),E.appendChild(s)}n(0)}function Z(e){if(!v||!Array.isArray(e)||e.length===0)return;const t=v.parentElement,n=document.getElementById("updates-nav");if(!t||!n)return;let r=M(),a=[],s=[],d=0,u=0,i=!1,y=null;const I='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>',B='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>';function M(){return window.innerWidth<=500?1:window.innerWidth<=950?2:3}function R(o,l){const g=[];for(let p=0;p<o.length;p+=l)g.push(o.slice(p,p+l));return g}function q(){if(a=R(e,r),a.length<=1){s=[...a],d=0,u=0;return}s=[a[a.length-1],...a,a[0]],d=u+1}function F(o){v.style.transition=o?"transform 0.45s ease":"none"}function b(o=!0){const l=t.clientWidth;l&&(F(o),v.style.transform=`translate3d(-${d*l}px, 0, 0)`)}function O(){if(!(a.length<=1)){if(d===0){d=a.length,u=a.length-1,b(!1);return}d===s.length-1&&(d=1,u=0,b(!1))}}function G(){if(a.length<=1){u=0;return}if(d===0){u=a.length-1;return}if(d===s.length-1){u=0;return}u=d-1}function L(){if(n.innerHTML="",a.length<=1){n.classList.add("is-hidden");return}n.classList.remove("is-hidden");const o=document.createElement("button");o.type="button",o.className="carousel-nav-btn",o.setAttribute("aria-label","Previous page"),o.innerHTML=I,o.addEventListener("click",()=>k(-1)),n.appendChild(o),a.forEach((g,p)=>{const h=document.createElement("button");h.type="button",h.className="carousel-nav-dot",h.setAttribute("aria-label",`Go to page ${p+1}`),p===u&&(h.classList.add("is-active"),h.setAttribute("aria-current","true")),h.addEventListener("click",()=>U(p)),n.appendChild(h)});const l=document.createElement("button");l.type="button",l.className="carousel-nav-btn",l.setAttribute("aria-label","Next page"),l.innerHTML=B,l.addEventListener("click",()=>k(1)),n.appendChild(l)}function U(o){i||a.length<=1||(i=!0,u=o,d=o+1,L(),b(!0))}function k(o){i||a.length<=1||(i=!0,d+=o,G(),L(),b(!0))}function P(){v.innerHTML="",q(),s.forEach(o=>{const l=document.createElement("div");l.className="carousel__panel",o.forEach(g=>{const p=document.createElement("div");p.className="updates-slot",p.style.flexBasis=`${100/r}%`;const h=V(g);h.addEventListener("click",()=>z(g)),p.appendChild(h),l.appendChild(p)}),v.appendChild(l)}),requestAnimationFrame(()=>{requestAnimationFrame(()=>{b(!1),L()})})}let w=0,x=0;t.addEventListener("touchstart",o=>{w=o.changedTouches[0].clientX,x=o.changedTouches[0].clientY},{passive:!0}),t.addEventListener("touchend",o=>{const l=w-o.changedTouches[0].clientX,g=x-o.changedTouches[0].clientY,p=40;Math.abs(g)>Math.abs(l)||Math.abs(l)<p||(l>0?k(1):k(-1))},{passive:!0}),v.addEventListener("transitionend",o=>{o.propertyName==="transform"&&(O(),L(),requestAnimationFrame(()=>{i=!1}))}),window.addEventListener("resize",()=>{clearTimeout(y),y=setTimeout(()=>{const o=M();if(o!==r){r=o,u=0,P();return}b(!1)},120)}),P()}async function ee(){try{const e=await C("/assets/data/contents.json");if(!Array.isArray(e))return;const t=e.filter(r=>r.type==="project"),n=e.filter(r=>r.type==="news"||r.type==="highlight");K(t),Z(n)}catch(e){console.error(e)}}async function te(){const e=document.getElementById("recruit-cards");if(e)try{(await C("/assets/data/recruit.json")).forEach(n=>e.appendChild(Q(n)))}catch(t){console.error(t)}}ee();te();const A=document.getElementById("areas-tabs"),m=document.getElementById("areas-track");function ne(e,t){const n=i=>Array.isArray(i.tags)?i.tags:[],r=(i,y)=>String(y.date||"").localeCompare(String(i.date||"")),a=t.filter(i=>e.some(y=>n(i).includes(y))).sort(r),s=a.filter(i=>n(i).includes("FEATURED"));if(s.length>=4)return s.slice(0,3);const d=a.filter(i=>!n(i).includes("FEATURED")),u=[...s];for(const i of d){if(u.length>=3)break;u.push(i)}return u.sort(r)}function re(e,t){const n=document.createElement("article");n.className="carousel__panel";const r=Array.isArray(e.tag)?e.tag:[];n.innerHTML=`
    <div class="split split--46">
      <div class="media">
        <img src="${c(e.image)}" alt="${c(e.title)}">
      </div>
      <div class="stack stack--sm">
        <h3>${c(e.title)}</h3>
        ${S(r)}
        <p>${c(e.description)}</p>
      </div>
    </div>
    <div class="stack">
      <h4>Featured Articles</h4>
    </div>
  `;const a=n.querySelector(":scope > .stack"),s=ne(r,t);return s.length?s.forEach(d=>a.appendChild(X(d))):a.innerHTML="<p>No related publications found.</p>",n}function ae(e,t){const n=document.createElement("button");n.type="button",n.className="btn areas-tab",n.dataset.index=String(t);const a=(Array.isArray(e.tag)?e.tag:[]).find(s=>T[s]==="topic")??e.title;return n.innerHTML=`<span class="tab-short">${c(a)}</span><span class="tab-full">${c(e.title)}</span>`,n}function j(e){const t=A.querySelectorAll(".areas-tab"),n=m.querySelectorAll(".carousel__panel");m.style.transform=`translateX(-${e*100}%)`,t.forEach((a,s)=>a.classList.toggle("active",s===e));const r=n[e];r&&(m.parentElement.style.height=r.offsetHeight+"px")}async function se(){if(!(!A||!m))try{const[e,t]=await Promise.all([C("/assets/data/contents.json"),C("/assets/data/publications.json")]),n=e.filter(r=>r.type==="topic");if(!n.length){m.innerHTML='<article class="carousel__panel"><p>No research topics found.</p></article>';return}A.innerHTML="",m.innerHTML="",n.forEach((r,a)=>{const s=ae(r,a),d=re(r,t);s.addEventListener("click",()=>j(a)),A.appendChild(s),m.appendChild(d)}),j(0)}catch(e){console.error(e),m.innerHTML='<article class="carousel__panel"><p>Research areas could not be loaded.</p></article>'}}se();
