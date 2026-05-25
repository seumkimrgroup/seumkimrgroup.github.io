import{f,e as o}from"./util.data-DWoenNad.js";import{f as C,b as E}from"./component.iconlinks-BtestZ2J.js";import{c as k}from"./component.card.publication-fmjl1lg8.js";let h=[];function e(t){return t.status==="former"}function I(t){const n=String(t.name||"").toLowerCase();return h.filter(i=>String(i.authors||"").toLowerCase().includes(n)).sort((i,s)=>String(s.date||"").localeCompare(String(i.date||"")))}function u(t,n){if(!Array.isArray(t.description))return[];const i=t.description.find(s=>String((s==null?void 0:s.title)||"").trim().toUpperCase()===n.toUpperCase());return!i||!Array.isArray(i.content)?[]:i.content.filter(s=>String(s||"").trim()!=="")}function p(t,n){if(!n.length)return"";const i=`<p>${n.map(o).join(` <br>
            `)}</p>`;return`
    <div class="stack--sm">
      <h4>${o(t)}</h4>
      ${i}
    </div>
  `}function L(t){return Array.isArray(t.links)&&t.links.length>0?t.links.filter(n=>n&&n.type&&n.value):t.email?[{type:"email",value:t.email}]:[]}function P(t){return E(L(t))}function T(t,n){const i=I(t),s=p("Education",u(t,"EDUCATION")),a=p("Research Interest",u(t,"RESEARCH INTERESTS")),c=e(t)?"":C(t.role),g=e(t)?"":String(t.currentAffiliation||"").trim(),l=[c,g].filter(Boolean),S=l.length?`<p class="color-secondary">${l.map(o).join(` <br>
          `)}</p>`:"",d=String(t.nextAffiliation||"").trim(),$=e(t)&&d?`<div class="row"><p class="color-secondary" style="white-space:nowrap">JOINED AT</p><p>${o(d)}</p></div>`:"",v=e(t)?"":t.image?`<div class="media"><img src="${t.image}" alt="${o(t.name)}"></div>`:'<div class="media"></div>',y=e(t)?"stack":"split split--profile",A=e(t)?`${s}`:`${s}${a}`;if(n.innerHTML=`
    <div class="${y}">
      ${v}

      <div class="stack--sm">
        <h2>${o(t.name)}</h2>
        ${S}
        ${$}
        ${P(t)}
      </div>
    </div>

    ${A}
  `,i.length){const r=document.createElement("div");r.className="stack",r.innerHTML="<h4>Publications</h4>",i.forEach(w=>r.appendChild(k(w,{showType:!1,showAuthors:!0,showTags:!1}))),n.appendChild(r)}}async function H(){const t=new URLSearchParams(window.location.search).get("id");if(!t)return;const n=document.getElementById("profile");if(!n)return;const[i,s]=await Promise.all([f("/assets/data/people.json"),f("/assets/data/publications.json")]);h=s;const a=i.find(c=>c.slug===t);a&&T(a,n)}H();
