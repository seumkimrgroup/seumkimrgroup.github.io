import"./components.cards-BPO2N5aJ.js";const i=document.getElementById("project-detail"),l=new URLSearchParams(window.location.search),s=l.get("slug");function r(e=""){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function o(e=[]){return e.length?`
    <div class="project-detail-tags">
      ${e.map(t=>`<span>${r(t)}</span>`).join("")}
    </div>
  `:""}function d(e=[]){return e.length?e.map(t=>{const n=t.title?`<h2>${r(t.title)}</h2>`:"",a=Array.isArray(t.content)?t.content.map(c=>`<p>${r(c)}</p>`).join(""):"";return`
        <section class="project-detail-section">
          ${n}
          ${a}
        </section>
      `}).join(""):""}function p(e=[]){return e.length?`
    <div class="project-detail-images">
      ${e.map(t=>`
            <figure class="project-detail-image">
              <img src="${r(t.src)}" alt="${r(t.alt||"")}" />
            </figure>
          `).join("")}
    </div>
  `:""}function u(e){document.title=`${e.title} | Se-Um Kim Research Group`,i.innerHTML=`
    <header class="project-detail-hero">
      ${e.background?`<img class="project-detail-bg" src="${r(e.background)}" alt="" />`:""}

      <div class="project-detail-hero-content">
        ${e.subtitle?`<p class="project-detail-subtitle">${r(e.subtitle)}</p>`:""}
        <h1>${r(e.title)}</h1>
        ${e.description?`<p class="project-detail-desc">${r(e.description)}</p>`:""}
        ${o(e.tag)}
      </div>
    </header>

    <div class="project-detail-body">
      ${d(e.sections)}
      ${p(e.images)}
    </div>
  `}async function g(){if(!s){i.innerHTML='<p class="project-detail-error">Project slug is missing.</p>';return}try{const n=(await(await fetch("/assets/data/projects.json")).json()).find(a=>a.slug===s);if(!n){i.innerHTML='<p class="project-detail-error">Project not found.</p>';return}u(n)}catch(e){console.error(e),i.innerHTML='<p class="project-detail-error">Failed to load project data.</p>'}}g();
