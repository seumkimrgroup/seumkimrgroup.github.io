import{i as C,d as E,g as k,f,e}from"./util.data-BPkaIh9F.js";import{f as I,r as L}from"./component.iconlinks-zOEY-vbq.js";import{c as P}from"./component.card.publication-CUr9vUxl.js";C();E();k();let h=[];function o(t){return t.status==="former"}function T(t){const n=String(t.name||"").toLowerCase();return h.filter(i=>String(i.authors||"").toLowerCase().includes(n)).sort((i,s)=>String(s.date||"").localeCompare(String(i.date||"")))}function u(t,n){if(!Array.isArray(t.description))return[];const i=t.description.find(s=>String((s==null?void 0:s.title)||"").trim().toUpperCase()===n.toUpperCase());return!i||!Array.isArray(i.content)?[]:i.content.filter(s=>String(s||"").trim()!=="")}function p(t,n){if(!n.length)return"";const i=`<p>${n.map(e).join(` <br>
            `)}</p>`;return`
    <div class="stack--8">
      <h4>${e(t)}</h4>
      ${i}
    </div>
  `}function H(t){return Array.isArray(t.links)&&t.links.length>0?t.links.filter(n=>n&&n.type&&n.value):t.email?[{type:"email",value:t.email}]:[]}function N(t){return L(H(t))}function M(t,n){const i=T(t),s=p("Education",u(t,"EDUCATION")),a=p("Research Interest",u(t,"RESEARCH INTERESTS")),c=o(t)?"":I(t.role),g=o(t)?"":String(t.currentAffiliation||"").trim(),l=[c,g].filter(Boolean),S=l.length?`<p class="color-secondary">${l.map(e).join(` <br>
          `)}</p>`:"",d=String(t.nextAffiliation||"").trim(),v=o(t)&&d?`<div class="row"><p class="color-secondary" style="white-space:nowrap">JOINED AT</p><p>${e(d)}</p></div>`:"",$=o(t)?"":t.image?`<div class="media"><img src="${t.image}" alt="${e(t.name)}"></div>`:'<div class="media"></div>',y=o(t)?"stack--16":"split split--profile",A=o(t)?`${s}`:`${s}${a}`;if(n.innerHTML=`
    <div class="${y}">
      ${$}

      <div class="stack--8">
        <h2>${e(t.name)}</h2>
        ${S}
        ${v}
        ${N(t)}
      </div>
    </div>

    ${A}
  `,i.length){const r=document.createElement("div");r.className="stack--16",r.innerHTML="<h4>Publications</h4>",i.forEach(w=>r.appendChild(P(w,{showType:!1,showAuthors:!0,showTags:!1}))),n.appendChild(r)}}async function R(){const t=new URLSearchParams(window.location.search).get("id");if(!t)return;const n=document.getElementById("profile");if(!n)return;const[i,s]=await Promise.all([f("/assets/data/people.json"),f("/assets/data/publications.json")]);h=s;const a=i.find(c=>c.slug===t);a&&M(a,n)}R();
