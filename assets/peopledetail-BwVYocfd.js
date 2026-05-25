import{i as C,d as k,g as E,f as u,e as a}from"./util.data-Bgxvqn9R.js";import{f as L,r as P}from"./component.iconlinks-CU1Moavg.js";import{c as H}from"./component.card.publication-DMpbXVYL.js";C();k();E();let h=[];function o(t){return t.status==="former"}function I(t){const n=String(t.name||"").toLowerCase();return h.filter(i=>String(i.authors||"").toLowerCase().includes(n)).sort((i,s)=>String(s.date||"").localeCompare(String(i.date||"")))}function f(t,n){if(!Array.isArray(t.description))return[];const i=t.description.find(s=>String((s==null?void 0:s.title)||"").trim().toUpperCase()===n.toUpperCase());return!i||!Array.isArray(i.content)?[]:i.content.filter(s=>String(s||"").trim()!=="")}function p(t,n){if(!n.length)return"";const i=`<p>${n.map(a).join(` <br>
            `)}</p>`;return`
    <div class="stack--8">
      <h4>${a(t)}</h4>
      ${i}
    </div>
  `}function T(t){return Array.isArray(t.links)&&t.links.length>0?t.links.filter(n=>n&&n.type&&n.value):t.email?[{type:"email",value:t.email}]:[]}function M(t){return P(T(t))}function N(t,n){const i=I(t),s=p("Education",f(t,"EDUCATION")),e=p("Research Interest",f(t,"RESEARCH INTERESTS")),c=o(t)?"":L(t.role),g=o(t)?"":String(t.currentAffiliation||"").trim(),l=[c,g].filter(Boolean),S=l.length?`<p class="color-secondary">${l.map(a).join(` <br>
          `)}</p>`:"",d=String(t.nextAffiliation||"").trim(),v=o(t)&&d?`<div class="row"><p class="color-secondary" style="white-space:nowrap">Joined</p><p>${a(d)}</p></div>`:"",$=o(t)?"":t.image?`<div class="media"><img src="${t.image}" alt="${a(t.name)}"></div>`:'<div class="media"></div>',y=o(t)?"stack--16":"split",A=o(t)?`${s}`:`${s}${e}`;if(n.innerHTML=`
    <div class="${y}">
      ${$}

      <div class="stack--8">
        <h2>${a(t.name)}</h2>
        ${S}
        ${v}
        ${M(t)}
      </div>
    </div>

    ${A}
  `,i.length){const r=document.createElement("div");r.className="stack--16",r.innerHTML="<h4>Publications</h4>",i.forEach(w=>r.appendChild(H(w,{showType:!1,showAuthors:!0,showTags:!1,highlightAuthor:t.name}))),n.appendChild(r)}}async function R(){const t=new URLSearchParams(window.location.search).get("id");if(!t)return;const n=document.getElementById("profile");if(!n)return;const[i,s]=await Promise.all([u("/assets/data/people.json"),u("/assets/data/publications.json")]);h=s;const e=i.find(c=>c.slug===t);e&&N(e,n)}R();
