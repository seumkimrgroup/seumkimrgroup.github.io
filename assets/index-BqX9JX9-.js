import{f as k,e as c}from"./data-C8g29wkK.js";import{r as w,T as U}from"./tags-B1EK2-sT.js";import{c as V}from"./card.publication-BBbN9k__.js";const _=document.querySelector("#projects .carousel__track"),E=document.querySelector("#projects .carousel-nav");async function D(){if(!_)return;const e=await k("/assets/data/projects.json");if(!Array.isArray(e)||e.length===0)return;_.innerHTML="",e.map(r=>{const s=document.createElement("div");return s.className="carousel__panel",s.style.backgroundImage=`url(${r.background||""})`,s.innerHTML=`
          <div class="inner">
            <div class="stack">
              ${r.subtitle?`<h6>${c(r.subtitle)}</h6>`:""}
              <div class="meta-row">
                <h1>${c(r.title||"")}</h1>
                ${w(r.tag)}
              </div>
              <p>${c(r.description||"")}</p>
              ${r.slug?`<div class="group"><a class="btn btn--primary" href="/projectdetail/?slug=${c(r.slug)}">Read more</a></div>`:""}
            </div>
          </div>
        `,_.appendChild(s),s});let t=0;function n(r){t=(r+e.length)%e.length,_.style.transform=`translateX(-${t*100}%)`,a()}function a(){if(!E||e.length<=1)return;E.innerHTML="";const r=document.createElement("button");r.type="button",r.className="carousel-nav-btn",r.setAttribute("aria-label","Previous project"),r.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>',r.addEventListener("click",()=>n(t-1)),E.appendChild(r),e.forEach((d,u)=>{const o=document.createElement("button");o.type="button",o.className="carousel-nav-dot"+(u===t?" is-active":""),o.setAttribute("aria-label",`Go to project ${u+1}`),o.addEventListener("click",()=>n(u)),E.appendChild(o)});const s=document.createElement("button");s.type="button",s.className="carousel-nav-btn",s.setAttribute("aria-label","Next project"),s.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>',s.addEventListener("click",()=>n(t+1)),E.appendChild(s)}n(0)}D();function O(e){if(!Array.isArray(e)||!e.length)return"";const t=e.map(a=>`<a href="${c(a.url)}" target="_blank" rel="noopener noreferrer">${c(a.text)}</a>`);let n;return t.length===1?n=t[0]:t.length===2?n=`${t[0]} and ${t[1]}`:n=`${t.slice(0,-1).join(", ")}, and ${t[t.length-1]}`,`<p class="text-secondary">More information: ${n}.</p>`}function W(e){const t=document.createElement("article");return t.className="card card--update",t.innerHTML=`
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
      ${O(e.links)}
    </div>
  `,t}let f=null;function Y(e){if(!Array.isArray(e)||!e.length)return"";const t=e.map(a=>`<a href="${c(a.url)}" target="_blank" rel="noopener noreferrer">${c(a.text)}</a>`);return`<p class="text-secondary">More information:  ${t.length===1?t[0]:t.length===2?`${t[0]} and ${t[1]}`:`${t.slice(0,-1).join(", ")}, and ${t[t.length-1]}`}.</p>`}function z(){const e=document.createElement("div");return e.className="modal-overlay",e.innerHTML=`
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
  `,e.addEventListener("click",t=>{t.target===e&&C()}),e.querySelector(".modal-close").addEventListener("click",C),document.addEventListener("keydown",t=>{t.key==="Escape"&&C()}),document.body.appendChild(e),e}function C(){f&&(f.classList.remove("is-open"),document.body.classList.remove("modal-open"))}function J(e){f||(f=z());const t=f.querySelector(".media img");t.src=e.image||"",t.alt=c(e.title||"");const n=f.querySelector(".info h6");n.textContent=e.type?e.type.charAt(0).toUpperCase()+e.type.slice(1):"",n.hidden=!e.type;const a=f.querySelector(".info h3");a.textContent=e.title||"",a.hidden=!e.title,f.querySelector(".info > p").textContent=e.description||"",f.querySelector(".links-wrap").innerHTML=Y(e.links),f.classList.add("is-open"),document.body.classList.add("modal-open")}const K='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" class="card--recruit__chevron"><path stroke-linecap="round" stroke-linejoin="round" d="M6 9l6 6 6-6"/></svg>';function x(e,t){const n=e.classList.contains("is-open");document.querySelectorAll(".card--recruit.is-open").forEach(a=>{a.classList.remove("is-open"),a.querySelector(".card--recruit__btn").setAttribute("aria-expanded","false")}),n||(e.classList.add("is-open"),t.setAttribute("aria-expanded","true"))}function Q(e){const t=document.createElement("div");t.className="card card--recruit",t.innerHTML=`
    <div class="card--recruit__main">
      <div class="card--recruit__content">
        <h5>${c(e.program||"")}</h5>
        <div class="card--recruit__body">
          ${w(e.tags)}
          ${e.body_en?`<p>${c(e.body_en)}</p>`:""}
          ${e.body_ko?`<p>${c(e.body_ko)}</p>`:""}
        </div>
      </div>
      <button class="card--recruit__btn" aria-expanded="false" aria-label="Toggle details">
        ${K}
      </button>
    </div>
  `;const n=t.querySelector(".card--recruit__btn");return n.addEventListener("click",a=>{a.stopPropagation(),x(t,n)}),t.addEventListener("click",a=>{a.target.closest("button, a, input, textarea, select, label")||x(t,n)}),t}document.querySelector("#projects .carousel__track");document.querySelector("#projects .carousel-nav");const v=document.querySelector("#lab-updates .carousel__track");function Z(e){if(!v||!Array.isArray(e)||e.length===0)return;const t=v.parentElement,n=t.querySelector(".carousel-nav");if(!t||!n)return;let a=S(),r=[],s=[],d=0,u=0,o=!1,y=null;const q='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>',j='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>';function S(){return window.innerWidth<=500?1:window.innerWidth<=950?2:3}function R(i,l){const g=[];for(let p=0;p<i.length;p+=l)g.push(i.slice(p,p+l));return g}function B(){if(r=R(e,a),r.length<=1){s=[...r],d=0,u=0;return}s=[r[r.length-1],...r,r[0]],d=u+1}function I(i){v.style.transition=i?"transform 0.45s ease":"none"}function b(i=!0){const l=t.clientWidth;l&&(I(i),v.style.transform=`translate3d(-${d*l}px, 0, 0)`)}function F(){if(!(r.length<=1)){if(d===0){d=r.length,u=r.length-1,b(!1);return}d===s.length-1&&(d=1,u=0,b(!1))}}function G(){if(r.length<=1){u=0;return}if(d===0){u=r.length-1;return}if(d===s.length-1){u=0;return}u=d-1}function $(){if(n.innerHTML="",r.length<=1){n.classList.add("is-hidden");return}n.classList.remove("is-hidden");const i=document.createElement("button");i.type="button",i.className="carousel-nav-btn",i.setAttribute("aria-label","Previous page"),i.innerHTML=q,i.addEventListener("click",()=>L(-1)),n.appendChild(i),r.forEach((g,p)=>{const h=document.createElement("button");h.type="button",h.className="carousel-nav-dot",h.setAttribute("aria-label",`Go to page ${p+1}`),p===u&&(h.classList.add("is-active"),h.setAttribute("aria-current","true")),h.addEventListener("click",()=>X(p)),n.appendChild(h)});const l=document.createElement("button");l.type="button",l.className="carousel-nav-btn",l.setAttribute("aria-label","Next page"),l.innerHTML=j,l.addEventListener("click",()=>L(1)),n.appendChild(l)}function X(i){o||r.length<=1||(o=!0,u=i,d=i+1,$(),b(!0))}function L(i){o||r.length<=1||(o=!0,d+=i,G(),$(),b(!0))}function M(){v.innerHTML="",B(),s.forEach(i=>{const l=document.createElement("div");l.className="carousel__panel",i.forEach(g=>{const p=document.createElement("div");p.className="updates-slot",p.style.flexBasis=`${100/a}%`;const h=W(g);h.addEventListener("click",()=>J(g)),p.appendChild(h),l.appendChild(p)}),v.appendChild(l)}),requestAnimationFrame(()=>{requestAnimationFrame(()=>{b(!1),$()})})}let N=0,P=0;t.addEventListener("touchstart",i=>{N=i.changedTouches[0].clientX,P=i.changedTouches[0].clientY},{passive:!0}),t.addEventListener("touchend",i=>{const l=N-i.changedTouches[0].clientX,g=P-i.changedTouches[0].clientY,p=40;Math.abs(g)>Math.abs(l)||Math.abs(l)<p||(l>0?L(1):L(-1))},{passive:!0}),v.addEventListener("transitionend",i=>{i.propertyName==="transform"&&(F(),$(),requestAnimationFrame(()=>{o=!1}))}),window.addEventListener("resize",()=>{clearTimeout(y),y=setTimeout(()=>{const i=S();if(i!==a){a=i,u=0,M();return}b(!1)},120)}),M()}async function ee(){try{const e=await k("/assets/data/contents.json"),t=Array.isArray(e)?e.filter(n=>n.type==="news"||n.type==="highlight"):[];Z(t)}catch(e){console.error(e)}}async function te(){const e=document.getElementById("recruit-cards");if(e)try{(await k("/assets/data/recruit.json")).forEach(n=>e.appendChild(Q(n)))}catch(t){console.error(t)}}ee();te();const A=document.querySelector("#research-areas .group"),m=document.querySelector("#research-areas .carousel__track");function ne(e,t){const n=o=>Array.isArray(o.tags)?o.tags:[],a=(o,y)=>String(y.date||"").localeCompare(String(o.date||"")),r=t.filter(o=>e.some(y=>n(o).includes(y))).sort(a),s=r.filter(o=>n(o).includes("FEATURED"));if(s.length>=4)return s.slice(0,3);const d=r.filter(o=>!n(o).includes("FEATURED")),u=[...s];for(const o of d){if(u.length>=3)break;u.push(o)}return u.sort(a)}function re(e,t){const n=document.createElement("article");n.className="carousel__panel";const a=Array.isArray(e.tag)?e.tag:[];n.innerHTML=`
    <div class="split split--46">
      <div class="media">
        <img src="${c(e.image)}" alt="${c(e.title)}">
      </div>
      <div class="stack--sm">
        <h3>${c(e.title)}</h3>
        ${w(a)}
        <p>${c(e.description)}</p>
      </div>
    </div>
    <div class="stack--sm">
      <h4>Featured Articles</h4>
    </div>
  `;const r=n.querySelector(":scope > .stack--sm"),s=ne(a,t);return s.length?s.forEach(d=>r.appendChild(V(d))):r.innerHTML="<p>No related publications found.</p>",n}function ae(e,t){const n=document.createElement("button");n.type="button",n.className="btn areas-tab",n.dataset.index=String(t);const r=(Array.isArray(e.tag)?e.tag:[]).find(s=>U[s]==="topic")??e.title;return n.innerHTML=`<span class="tab-short">${c(r)}</span><span class="tab-full">${c(e.title)}</span>`,n}let T=null;function H(e){const t=A.querySelectorAll(".areas-tab"),n=m.querySelectorAll(".carousel__panel");m.style.transform=`translateX(-${e*100}%)`,t.forEach((r,s)=>r.classList.toggle("active",s===e));const a=n[e];a&&(T&&T.disconnect(),T=new ResizeObserver(()=>{m.parentElement.style.height=a.offsetHeight+"px"}),T.observe(a))}async function se(){if(!(!A||!m))try{const[e,t]=await Promise.all([k("/assets/data/contents.json"),k("/assets/data/publications.json")]),n=e.filter(a=>a.type==="topic");if(!n.length){m.innerHTML='<article class="carousel__panel"><p>No research topics found.</p></article>';return}A.innerHTML="",m.innerHTML="",n.forEach((a,r)=>{const s=ae(a,r),d=re(a,t);s.addEventListener("click",()=>H(r)),A.appendChild(s),m.appendChild(d)}),H(0)}catch(e){console.error(e),m.innerHTML='<article class="carousel__panel"><p>Research areas could not be loaded.</p></article>'}}se();
