import{f,e as a}from"./util.data-QMv_boDC.js";import{f as E,b as k}from"./component.iconlinks-Ded1VgdJ.js";import{c as w}from"./component.card.publication-DcH_z2u1.js";let g=[];function e(t){return t.status==="former"}function I(t){const n=String(t.name||"").toLowerCase();return g.filter(i=>String(i.authors||"").toLowerCase().includes(n)).sort((i,s)=>String(s.date||"").localeCompare(String(i.date||"")))}function p(t,n){if(!Array.isArray(t.description))return[];const i=t.description.find(s=>String((s==null?void 0:s.title)||"").trim().toUpperCase()===n.toUpperCase());return!i||!Array.isArray(i.content)?[]:i.content.filter(s=>String(s||"").trim()!=="")}function u(t,n){if(!n.length)return"";const i=`<p>${n.map(a).join(` <br>
            `)}</p>`;return`
    <div class="stack--sm">
      <h4>${a(t)}</h4>
      ${i}
    </div>
  `}function L(t){return Array.isArray(t.links)&&t.links.length>0?t.links.filter(n=>n&&n.type&&n.value):t.email?[{type:"email",value:t.email}]:[]}function P(t){return k(L(t))}function H(t,n){const i=I(t),s=u("Education",p(t,"EDUCATION")),o=u("Research Interest",p(t,"RESEARCH INTERESTS")),c=e(t)?"":E(t.role),h=e(t)?"":String(t.currentAffiliation||"").trim(),l=[c,h].filter(Boolean),S=l.length?`<p class="text-secondary">${l.map(a).join(` <br>
          `)}</p>`:"",d=String(t.nextAffiliation||"").trim(),$=e(t)&&d?`<div class="row"><p class="text-secondary" style="white-space:nowrap">JOINED AT</p><p>${a(d)}</p></div>`:"",v=e(t)?"":t.image?`<div class="media"><img src="${t.image}" alt="${a(t.name)}"></div>`:'<div class="media"></div>',y=e(t)?"stack":"split split--profile",A=e(t)?`${s}`:`${s}${o}`;if(n.innerHTML=`
    <div class="${y}">
      ${v}

      <div class="stack--sm">
        <h2>${a(t.name)}</h2>
        ${S}
        ${$}
        ${P(t)}
      </div>
    </div>

    ${A}
  `,i.length){const r=document.createElement("div");r.className="stack",r.innerHTML="<h4>Publications</h4>",i.forEach(C=>r.appendChild(w(C))),n.appendChild(r)}}async function m(){const t=new URLSearchParams(window.location.search).get("id");if(!t)return;const n=document.getElementById("profile");if(!n)return;const[i,s]=await Promise.all([f("/assets/data/people.json"),f("/assets/data/publications.json")]);g=s;const o=i.find(c=>c.slug===t);o&&H(o,n)}m();
