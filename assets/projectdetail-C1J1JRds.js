import{f as c,e as r}from"./data-Do9LofVd.js";import{r as l}from"./tags-ONlygREO.js";const i=document.getElementById("project-detail"),d=new URLSearchParams(window.location.search),s=d.get("slug");function u(t=[]){return t.length?t.map(e=>{const n=e.title?`<h2>${r(e.title)}</h2>`:"",a=Array.isArray(e.content)?e.content.map(o=>`<p>${r(o)}</p>`).join(""):"";return`
        <section class="project-detail-section">
          ${n}
          ${a}
        </section>
      `}).join(""):""}function p(t=[]){return t.length?`
    <div class="project-detail-images">
      ${t.map(e=>`
            <figure class="project-detail-image">
              <img src="${r(e.src)}" alt="${r(e.alt||"")}" />
            </figure>
          `).join("")}
    </div>
  `:""}function m(t){document.title=`${t.title} | Se-Um Kim Research Group`,i.innerHTML=`
    <header style="view-transition-name: project-hero">
      ${t.background?`<img src="${r(t.background)}" alt="" />`:""}
      <div class="inner">
        <div class="stack">
          ${t.subtitle?`<h6>${r(t.subtitle)}</h6>`:""}
          <div class="meta-row">
            <h1>${r(t.title)}</h1>
            ${l(t.tag)}
          </div>
          ${t.description?`<p>${r(t.description)}</p>`:""}
        </div>
      </div>
    </header>

    <div class="project-detail-body">
      ${u(t.sections)}
      ${p(t.images)}
    </div>
  `}async function g(){if(!s){i.innerHTML='<p class="project-detail-error">Project slug is missing.</p>';return}try{const e=(await c("/assets/data/projects.json")).find(n=>n.slug===s);if(!e){i.innerHTML='<p class="project-detail-error">Project not found.</p>';return}m(e)}catch(t){console.error(t),i.innerHTML='<p class="project-detail-error">Failed to load project data.</p>'}}g();
