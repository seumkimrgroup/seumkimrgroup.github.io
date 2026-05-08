import{f as l,e as r}from"./data-ilf2-1_R.js";import{r as d}from"./tags-BuE_WSLd.js";const u=document.querySelector("#projects"),s=document.querySelector("#projects .carousel__track");document.querySelector("#projects .carousel-nav");const a=document.querySelector("#projects > .inner"),o=new URLSearchParams(window.location.search).get("slug");function m(c=[]){if(!a||!c.length)return;const e=document.createElement("div");e.className="stack",c.forEach(t=>{const n=document.createElement("section");t.title&&(n.innerHTML+=`<h2>${r(t.title)}</h2>`),Array.isArray(t.content)&&t.content.forEach(i=>{n.innerHTML+=`<p>${r(i)}</p>`}),e.appendChild(n)}),a.appendChild(e)}async function p(){if(!s||!o)return;const e=(await l("/assets/data/projects.json")).find(n=>n.slug===o);if(!e)return;document.title=`${e.title} | Se-Um Kim Research Group`,u.style.backgroundImage=`url(${e.background||""})`,s.innerHTML="";const t=document.createElement("div");t.className="carousel__panel",t.innerHTML=`
      <div class="inner">
        <div class="stack">
          ${e.subtitle?`<h6>${r(e.subtitle)}</h6>`:""}
          <div class="meta-row">
            <h1>${r(e.title||"")}</h1>
            ${d(e.tag)}
          </div>
          <p>${r(e.description||"")}</p>
          <a class="btn btn--primary" href="/">← Back</a>
        </div>
      </div>
    `,s.appendChild(t),m(e.sections)}p();
