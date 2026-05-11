import{f as d,e}from"./util.data-D40mZLs_.js";import{f as w,b as C}from"./component.iconlinks-B6rJV6CZ.js";import{c as y}from"./component.card.publication-DE609ekW.js";function a(t){return t.status==="former"}function k(t){const n=String(t.name||"").toLowerCase();return publications.filter(i=>String(i.authors||"").toLowerCase().includes(n)).sort((i,s)=>String(s.date||"").localeCompare(String(i.date||"")))}function u(t,n){if(!Array.isArray(t.description))return[];const i=t.description.find(s=>String((s==null?void 0:s.title)||"").trim().toUpperCase()===n.toUpperCase());return!i||!Array.isArray(i.content)?[]:i.content.filter(s=>String(s||"").trim()!=="")}function f(t,n){if(!n.length)return"";const i=`<p>${n.map(e).join(` <br>
            `)}</p>`;return`
    <div class="stack--sm">
      <h4>${e(t)}</h4>
      ${i}
    </div>
  `}function E(t){return Array.isArray(t.links)&&t.links.length>0?t.links.filter(n=>n&&n.type&&n.value):t.email?[{type:"email",value:t.email}]:[]}function L(t){return C(E(t))}function P(t){const n=k(t),i=f("Education",u(t,"EDUCATION")),s=f("Research Interest",u(t,"RESEARCH INTERESTS")),r=a(t)?"":w(t.role),p=a(t)?"":String(t.currentAffiliation||"").trim(),c=[r,p].filter(Boolean),g=c.length?`<p class="text-secondary">${c.map(e).join(` <br>
          `)}</p>`:"",l=String(t.nextAffiliation||"").trim(),h=a(t)&&l?`<div class="row"><span class="row__label">JOINED AT</span><span class="row__value">${e(l)}</span></div>`:"",S=a(t)?"":t.image?`<div class="media"><img src="${t.image}" alt="${e(t.name)}"></div>`:'<div class="media"></div>',$=a(t)?"stack":"split split--profile",v=a(t)?`${i}`:`${i}${s}`;if(detailView.innerHTML=`
    <div class="${$}">
      ${S}

      <div class="stack--sm">
        <h2>${e(t.name)}</h2>
        ${g}
        ${h}
        ${L(t)}
      </div>
    </div>

    ${v}
  `,n.length){const o=document.createElement("div");o.className="stack",o.innerHTML="<h4>Publications</h4>",n.forEach(A=>o.appendChild(y(A))),detailView.appendChild(o)}}async function H(){const t=new URLSearchParams(window.location.search).get("id");if(!t)return;const[n,i]=await Promise.all([d("/assets/data/people.json"),d("/assets/data/publications.json")]);publications=i;const s=n.find(r=>r.slug===t);s&&P(s)}H();
