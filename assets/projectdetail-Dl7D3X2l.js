import{f as c,e as r}from"./data-Do9LofVd.js";const n=document.getElementById("project-detail"),l=new URLSearchParams(window.location.search),s=l.get("slug");function d(e=[]){return e.length?`
    <div class="project-detail-tags">
      ${e.map(t=>`<span>${r(t)}</span>`).join("")}
    </div>
  `:""}function p(e=[]){return e.length?e.map(t=>{const i=t.title?`<h2>${r(t.title)}</h2>`:"",a=Array.isArray(t.content)?t.content.map(o=>`<p>${r(o)}</p>`).join(""):"";return`
        <section class="project-detail-section">
          ${i}
          ${a}
        </section>
      `}).join(""):""}function u(e=[]){return e.length?`
    <div class="project-detail-images">
      ${e.map(t=>`
            <figure class="project-detail-image">
              <img src="${r(t.src)}" alt="${r(t.alt||"")}" />
            </figure>
          `).join("")}
    </div>
  `:""}function g(e){document.title=`${e.title} | Se-Um Kim Research Group`,n.innerHTML=`
    <header class="project-detail-hero" style="view-transition-name: project-hero">
      ${e.background?`<img class="project-detail-bg" src="${r(e.background)}" alt="" />`:""}

      <div class="project-detail-hero-content">
        ${e.subtitle?`<p class="project-detail-subtitle">${r(e.subtitle)}</p>`:""}
        <h1>${r(e.title)}</h1>
        ${e.description?`<p class="project-detail-desc">${r(e.description)}</p>`:""}
        ${d(e.tag)}
      </div>
    </header>

    <div class="project-detail-body">
      ${p(e.sections)}
      ${u(e.images)}
    </div>
  `}async function m(){if(!s){n.innerHTML='<p class="project-detail-error">Project slug is missing.</p>';return}try{const t=(await c("/assets/data/projects.json")).find(i=>i.slug===s);if(!t){n.innerHTML='<p class="project-detail-error">Project not found.</p>';return}g(t)}catch(e){console.error(e),n.innerHTML='<p class="project-detail-error">Failed to load project data.</p>'}}m();
