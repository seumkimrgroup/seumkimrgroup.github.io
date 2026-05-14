import{f,e}from"./util.data-CEvnEvZz.js";import{f as E,b as k}from"./component.iconlinks-BPpp47BE.js";import{c as w}from"./component.card.publication-D_AYDFnM.js";let g=[];function a(t){return t.status==="former"}function I(t){const n=String(t.name||"").toLowerCase();return g.filter(i=>String(i.authors||"").toLowerCase().includes(n)).sort((i,s)=>String(s.date||"").localeCompare(String(i.date||"")))}function u(t,n){if(!Array.isArray(t.description))return[];const i=t.description.find(s=>String((s==null?void 0:s.title)||"").trim().toUpperCase()===n.toUpperCase());return!i||!Array.isArray(i.content)?[]:i.content.filter(s=>String(s||"").trim()!=="")}function p(t,n){if(!n.length)return"";const i=`<p>${n.map(e).join(` <br>
            `)}</p>`;return`
    <div class="stack--sm">
      <h4>${e(t)}</h4>
      ${i}
    </div>
  `}function L(t){return Array.isArray(t.links)&&t.links.length>0?t.links.filter(n=>n&&n.type&&n.value):t.email?[{type:"email",value:t.email}]:[]}function P(t){return k(L(t))}function H(t,n){const i=I(t),s=p("Education",u(t,"EDUCATION")),o=p("Research Interest",u(t,"RESEARCH INTERESTS")),c=a(t)?"":E(t.role),h=a(t)?"":String(t.currentAffiliation||"").trim(),l=[c,h].filter(Boolean),S=l.length?`<p class="text-secondary">${l.map(e).join(` <br>
          `)}</p>`:"",d=String(t.nextAffiliation||"").trim(),$=a(t)&&d?`<div class="row"><span class="row__label">JOINED AT</span><span class="row__value">${e(d)}</span></div>`:"",v=a(t)?"":t.image?`<div class="media"><img src="${t.image}" alt="${e(t.name)}"></div>`:'<div class="media"></div>',A=a(t)?"stack":"split split--profile",y=a(t)?`${s}`:`${s}${o}`;if(n.innerHTML=`
    <div class="${A}">
      ${v}

      <div class="stack--sm">
        <h2>${e(t.name)}</h2>
        ${S}
        ${$}
        ${P(t)}
      </div>
    </div>

    ${y}
  `,i.length){const r=document.createElement("div");r.className="stack",r.innerHTML="<h4>Publications</h4>",i.forEach(C=>r.appendChild(w(C))),n.appendChild(r)}}async function m(){const t=new URLSearchParams(window.location.search).get("id");if(!t)return;const n=document.getElementById("profile");if(!n)return;const[i,s]=await Promise.all([f("/assets/data/people.json"),f("/assets/data/publications.json")]);g=s;const o=i.find(c=>c.slug===t);o&&H(o,n)}m();
