import{e as c,f as k}from"./util.data-CRqJUDr4.js";import{c as V}from"./component.card.publication-DauljxCc.js";const C={JQL:"project",TACTILE:"project",SW:"project","LC-EO":"topic","LC-COMP":"topic","ML-FEA":"topic",PSLC:"method",CLCE:"method",LCE:"method",PIC:"method",THERM:"method",MECH:"method",ELEC:"method",FEATURED:"featured"},N=["project","topic","method","featured"];function M(e){return!e||!e.length?"":`<div class="group">${[...e].sort((n,a)=>{const r=N.indexOf(C[n]??""),s=N.indexOf(C[a]??"");return(r===-1?99:r)-(s===-1?99:s)}).map(n=>{const a=C[n];return`<span class="${a?`tag tag--${a}`:"tag"}">${c(n)}</span>`}).join("")}</div>`}const T=document.querySelector("#projects .carousel__track"),E=document.querySelector("#projects .carousel-nav");async function W(){if(!T)return;const e=await k("/assets/data/projects.json");if(!Array.isArray(e)||e.length===0)return;T.innerHTML="",e.map(r=>{const s=document.createElement("div");return s.className="carousel__panel",s.style.backgroundImage=`url(${r.background||""})`,s.innerHTML=`
          <div class="inner">
            <div class="stack">
              ${r.subtitle?`<h6>${c(r.subtitle)}</h6>`:""}
              <div class="row">
                <h1>${c(r.title||"")}</h1>
                ${M(r.tag)}
              </div>
              <p>${c(r.description||"")}</p>
              ${r.slug?`<div class="group"><a class="btn btn--primary" href="/project/?slug=${c(r.slug)}">Read more</a></div>`:""}
            </div>
          </div>
        `,T.appendChild(s),s});let t=0;function n(r){t=(r+e.length)%e.length,T.style.transform=`translateX(-${t*100}%)`,a()}function a(){if(!E||e.length<=1)return;E.innerHTML="";const r=document.createElement("button");r.type="button",r.className="carousel-nav-btn",r.setAttribute("aria-label","Previous project"),r.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>',r.addEventListener("click",()=>n(t-1)),E.appendChild(r),e.forEach((d,u)=>{const i=document.createElement("button");i.type="button",i.className="carousel-nav-dot"+(u===t?" is-active":""),i.setAttribute("aria-label",`Go to project ${u+1}`),i.addEventListener("click",()=>n(u)),E.appendChild(i)});const s=document.createElement("button");s.type="button",s.className="carousel-nav-btn",s.setAttribute("aria-label","Next project"),s.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>',s.addEventListener("click",()=>n(t+1)),E.appendChild(s)}n(0)}W();function Y(e){if(!Array.isArray(e)||!e.length)return"";const t=e.map(a=>`<a href="${c(a.url)}" target="_blank" rel="noopener noreferrer">${c(a.text)}</a>`);let n;return t.length===1?n=t[0]:t.length===2?n=`${t[0]} and ${t[1]}`:n=`${t.slice(0,-1).join(", ")}, and ${t[t.length-1]}`,`<p class="text-secondary">More information: ${n}.</p>`}function z(e){const t=document.createElement("article");return t.className="card card--update",t.innerHTML=`
    <div class="media">
      <img
        src="${e.image||""}"
        alt="${c(e.title||"")}"
      />
    </div>
    <div class="stack--xs">
      ${e.type?`<h6>${c(e.type.charAt(0).toUpperCase()+e.type.slice(1))}</h6>`:""}
      ${e.title?`<h4>${c(e.title)}</h4>`:""}
      <p>${c(e.description||"")}</p>
      ${Y(e.links)}
    </div>
  `,t}let f=null;function J(e){if(!Array.isArray(e)||!e.length)return"";const t=e.map(a=>`<a href="${c(a.url)}" target="_blank" rel="noopener noreferrer">${c(a.text)}</a>`);return`<p class="text-secondary">More information:  ${t.length===1?t[0]:t.length===2?`${t[0]} and ${t[1]}`:`${t.slice(0,-1).join(", ")}, and ${t[t.length-1]}`}.</p>`}function Q(){const e=document.createElement("div");return e.className="modal-overlay",e.innerHTML=`
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
  `,e.addEventListener("click",t=>{t.target===e&&w()}),e.querySelector(".modal-close").addEventListener("click",w),document.addEventListener("keydown",t=>{t.key==="Escape"&&w()}),document.body.appendChild(e),e}function w(){f&&(f.classList.remove("is-open"),document.body.classList.remove("modal-open"))}function K(e){f||(f=Q());const t=f.querySelector(".media img");t.src=e.image||"",t.alt=c(e.title||"");const n=f.querySelector(".stack--sm h6");n.textContent=e.type?e.type.charAt(0).toUpperCase()+e.type.slice(1):"",n.hidden=!e.type;const a=f.querySelector(".stack--sm h3");a.textContent=e.title||"",a.hidden=!e.title,f.querySelector(".stack--sm > p").textContent=e.description||"",f.querySelector(".links-wrap").innerHTML=J(e.links),f.classList.add("is-open"),document.body.classList.add("modal-open")}const Z='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M6 9l6 6 6-6"/></svg>';function q(e,t){const n=e.classList.contains("is-open");document.querySelectorAll(".card--recruit.is-open").forEach(a=>{a.classList.remove("is-open"),a.querySelector(".split > button").setAttribute("aria-expanded","false")}),n||(e.classList.add("is-open"),t.setAttribute("aria-expanded","true"))}function ee(e){const t=document.createElement("div");t.className="card card--recruit",t.innerHTML=`
    <div class="split">
      <h5>${c(e.program||"")}</h5>
      <button class="icon" aria-expanded="false" aria-label="Toggle details">
        ${Z}
      </button>
    </div>
    <div class="stack--sm">
      ${M(e.tags)}
      ${e.body_en?`<p>${c(e.body_en)}</p>`:""}
      ${e.body_ko?`<p>${c(e.body_ko)}</p>`:""}
    </div>
  `;const n=t.querySelector(".split > button");return n.addEventListener("click",a=>{a.stopPropagation(),q(t,n)}),t.addEventListener("click",a=>{a.target.closest("button, a, input, textarea, select, label")||q(t,n)}),t}document.querySelector("#projects .carousel__track");document.querySelector("#projects .carousel-nav");const v=document.querySelector("#lab-updates .carousel__track");function te(e){if(!v||!Array.isArray(e)||e.length===0)return;const t=v.parentElement,n=t.querySelector(".carousel-nav");if(!t||!n)return;let a=S(),r=[],s=[],d=0,u=0,i=!1,y=null;const I='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>',B='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>';function S(){return window.innerWidth<=500?1:window.innerWidth<=950?2:3}function F(o,l){const g=[];for(let p=0;p<o.length;p+=l)g.push(o.slice(p,p+l));return g}function O(){if(r=F(e,a),r.length<=1){s=[...r],d=0,u=0;return}s=[r[r.length-1],...r,r[0]],d=u+1}function G(o){v.style.transition=o?"transform 0.45s ease":"none"}function b(o=!0){const l=t.clientWidth;l&&(G(o),v.style.transform=`translate3d(-${d*l}px, 0, 0)`)}function U(){if(!(r.length<=1)){if(d===0){d=r.length,u=r.length-1,b(!1);return}d===s.length-1&&(d=1,u=0,b(!1))}}function D(){if(r.length<=1){u=0;return}if(d===0){u=r.length-1;return}if(d===s.length-1){u=0;return}u=d-1}function L(){if(n.innerHTML="",r.length<=1){n.classList.add("is-hidden");return}n.classList.remove("is-hidden");const o=document.createElement("button");o.type="button",o.className="carousel-nav-btn",o.setAttribute("aria-label","Previous page"),o.innerHTML=I,o.addEventListener("click",()=>$(-1)),n.appendChild(o),r.forEach((g,p)=>{const h=document.createElement("button");h.type="button",h.className="carousel-nav-dot",h.setAttribute("aria-label",`Go to page ${p+1}`),p===u&&(h.classList.add("is-active"),h.setAttribute("aria-current","true")),h.addEventListener("click",()=>X(p)),n.appendChild(h)});const l=document.createElement("button");l.type="button",l.className="carousel-nav-btn",l.setAttribute("aria-label","Next page"),l.innerHTML=B,l.addEventListener("click",()=>$(1)),n.appendChild(l)}function X(o){i||r.length<=1||(i=!0,u=o,d=o+1,L(),b(!0))}function $(o){i||r.length<=1||(i=!0,d+=o,D(),L(),b(!0))}function P(){v.innerHTML="",O(),s.forEach(o=>{const l=document.createElement("div");l.className="carousel__panel",o.forEach(g=>{const p=document.createElement("div");p.className="updates-slot",p.style.flexBasis=`${100/a}%`;const h=z(g);h.addEventListener("click",()=>K(g)),p.appendChild(h),l.appendChild(p)}),v.appendChild(l)}),requestAnimationFrame(()=>{requestAnimationFrame(()=>{b(!1),L()})})}let x=0,H=0;t.addEventListener("touchstart",o=>{x=o.changedTouches[0].clientX,H=o.changedTouches[0].clientY},{passive:!0}),t.addEventListener("touchend",o=>{const l=x-o.changedTouches[0].clientX,g=H-o.changedTouches[0].clientY,p=40;Math.abs(g)>Math.abs(l)||Math.abs(l)<p||(l>0?$(1):$(-1))},{passive:!0}),v.addEventListener("transitionend",o=>{o.propertyName==="transform"&&(U(),L(),requestAnimationFrame(()=>{i=!1}))}),window.addEventListener("resize",()=>{clearTimeout(y),y=setTimeout(()=>{const o=S();if(o!==a){a=o,u=0,P();return}b(!1)},120)}),P()}async function ne(){try{const e=await k("/assets/data/contents.json"),t=Array.isArray(e)?e.filter(n=>n.type==="news"||n.type==="highlight"):[];te(t)}catch(e){console.error(e)}}async function re(){const e=document.getElementById("recruit-cards");if(e)try{(await k("/assets/data/recruit.json")).forEach(n=>e.appendChild(ee(n)))}catch(t){console.error(t)}}ne();re();var R;(R=document.getElementById("btn-contact"))==null||R.addEventListener("click",e=>{var t;e.preventDefault(),(t=document.querySelector(".footer"))==null||t.scrollIntoView({behavior:"smooth"})});const _=document.querySelector("#research-areas .group"),m=document.querySelector("#research-areas .carousel__track");function ae(e,t){const n=i=>Array.isArray(i.tags)?i.tags:[],a=(i,y)=>String(y.date||"").localeCompare(String(i.date||"")),r=t.filter(i=>e.some(y=>n(i).includes(y))).sort(a),s=r.filter(i=>n(i).includes("FEATURED"));if(s.length>=4)return s.slice(0,3);const d=r.filter(i=>!n(i).includes("FEATURED")),u=[...s];for(const i of d){if(u.length>=3)break;u.push(i)}return u.sort(a)}function se(e,t){const n=document.createElement("article");n.className="carousel__panel";const a=Array.isArray(e.tag)?e.tag:[];n.innerHTML=`
    <div class="split split--46">
      <div class="media">
        <img src="${c(e.image)}" alt="${c(e.title)}">
      </div>
      <div class="stack--sm">
        <h3>${c(e.title)}</h3>
        ${M(a)}
        <p>${c(e.description)}</p>
      </div>
    </div>
    <div class="stack">
      <h4>Featured Articles</h4>
    </div>
  `;const r=n.querySelector(":scope > .stack"),s=ae(a,t);return s.length?s.forEach(d=>r.appendChild(V(d))):r.innerHTML="<p>No related publications found.</p>",n}function oe(e,t){const n=document.createElement("button");n.type="button",n.className="btn areas-tab",n.dataset.index=String(t);const r=(Array.isArray(e.tag)?e.tag:[]).find(s=>C[s]==="topic")??e.title;return n.innerHTML=`<span class="tab-short">${c(r)}</span><span class="tab-full">${c(e.title)}</span>`,n}let A=null;function j(e){const t=_.querySelectorAll(".areas-tab"),n=m.querySelectorAll(".carousel__panel");m.style.transform=`translateX(-${e*100}%)`,t.forEach((r,s)=>r.classList.toggle("active",s===e));const a=n[e];a&&(A&&A.disconnect(),A=new ResizeObserver(()=>{m.parentElement.style.height=a.offsetHeight+"px"}),A.observe(a))}async function ie(){if(!(!_||!m))try{const[e,t]=await Promise.all([k("/assets/data/contents.json"),k("/assets/data/publications.json")]),n=e.filter(a=>a.type==="topic");if(!n.length){m.innerHTML='<article class="carousel__panel"><p>No research topics found.</p></article>';return}_.innerHTML="",m.innerHTML="",n.forEach((a,r)=>{const s=oe(a,r),d=se(a,t);s.addEventListener("click",()=>j(r)),_.appendChild(s),m.appendChild(d)}),j(0)}catch(e){console.error(e),m.innerHTML='<article class="carousel__panel"><p>Research areas could not be loaded.</p></article>'}}ie();
