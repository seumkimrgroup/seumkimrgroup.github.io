import{e as r,h as u,j as g,k as p,l as f,m as h,n as I,o as v}from"./util.data-BPkaIh9F.js";const m={phd:{degree:"Ph.D.",display:"Ph.D. Student",priority:1},ms:{degree:"M.S.",display:"M.S. Student",priority:2},undergraduate:{degree:"B.S.",display:"Undergraduate",priority:3}};function E(e){const t=String(e||"").toLowerCase().replace(/\./g,"").replace(/-/g," ").trim();return t.includes("phd")?"phd":t.includes("ms")?"ms":t.includes("undergraduate")?"undergraduate":""}function o(e){const t=E(e);return m[t]||{degree:e||"",display:e||"",priority:9}}function L(e){return o(e.role).priority}function $(e){return o(e).display}function l(e){window.location.href=`/peopledetail/?id=${encodeURIComponent(e.slug)}`}function R(e){const t=document.createElement("div");t.className="card card--member",t.addEventListener("click",()=>l(e));const a=e.image?`<div class="media"><img src="${e.image}" alt="${r(e.name)}"></div>`:'<div class="media"></div>',n=(e.description||[]).find(i=>i.title==="RESEARCH INTERESTS"),s=n&&n.content&&n.content.length?n.content.map(r).join(", "):"";return t.innerHTML=`
    ${a}
    <div class="stack--4">
      <h4>${r(e.name)}</h4>
      <p class="color-secondary">${r($(e.role))}</p>
      ${s?`
      <h5>Research Interests</h5>
      <p>${s}</p>`:""}
    </div>
  `,t}function x(e){const t=document.createElement("div");t.className="card card--alumni",t.addEventListener("click",()=>l(e));const a=o(e.role).degree,n=e.leaveYear||"",s=[a,n].filter(Boolean).join(" "),i=e.nextAffiliation&&String(e.nextAffiliation).trim()!==""?e.nextAffiliation:"";return t.innerHTML=`
    <h4>${r(e.name)}</h4>
    <p class="color-secondary">${r(s)}</p>
    ${i?`
    <div class="row">
        <p class="color-secondary" style="white-space:nowrap">JOINED AT</p>
        <p>${r(i)}</p>
    </div>`:""}
    `,t}const C={email:{label:"Email",href:e=>`mailto:${e}`,external:!1,svg:I},linkedin:{label:"LinkedIn",href:e=>e,external:!0,svg:h},scholar:{label:"Google Scholar",href:e=>e,external:!0,svg:f},website:{label:"Website",href:e=>e,external:!0,svg:p},github:{label:"GitHub",href:e=>e,external:!0,svg:g},orcid:{label:"ORCID",href:e=>e,external:!0,svg:u}};function y(e){return e.map(({type:t,value:a})=>{const n=C[t],s=n?r(n.href(a)):r(a),i=n?n.label:"External link",c=n?n.svg:v,d=!n||n.external;return`<a href="${s}" class="icon" data-type="${r(t)}" aria-label="${r(i)}" title="${r(i)}"${d?' target="_blank" rel="noopener noreferrer"':""}>${c}</a>`}).join("")}function O(e,{wrap:t=!0}={}){if(!e||!e.length)return"";const a=y(e);return t?`<div class="group">${a}</div>`:a}export{x as a,R as c,$ as f,L as g,O as r};
