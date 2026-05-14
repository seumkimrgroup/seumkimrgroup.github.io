import{e as r,c as g,d as f,g as p,h,i as I,j as v,k as E}from"./util.data-CEvnEvZz.js";const $={phd:{degree:"Ph.D.",display:"Ph.D. Student",priority:1},ms:{degree:"M.S.",display:"M.S. Student",priority:2},undergraduate:{degree:"B.S.",display:"Undergraduate",priority:3}};function m(e){const t=String(e||"").toLowerCase().replace(/\./g,"").replace(/-/g," ").trim();return t.includes("phd")?"phd":t.includes("ms")?"ms":t.includes("undergraduate")?"undergraduate":""}function l(e){const t=m(e);return $[t]||{degree:e||"",display:e||"",priority:9}}function x(e){return l(e.role).priority}function C(e){return l(e).display}function o(e){window.location.href=`/peopledetail/?id=${encodeURIComponent(e.slug)}`}function y(e){const t=document.createElement("div");t.className="card card--member",t.addEventListener("click",()=>o(e));const i=e.image?`<div class="media"><img src="${e.image}" alt="${r(e.name)}"></div>`:'<div class="media"></div>',n=(e.description||[]).find(a=>a.title==="RESEARCH INTERESTS"),s=n&&n.content&&n.content.length?n.content.map(r).join(", "):"";return t.innerHTML=`
    ${i}
    <div class="stack--xs">
      <h4>${r(e.name)}</h4>
      <p class="text-secondary">${r(C(e.role))}</p>
      ${s?`
      <h5>Research Interests</h5>
      <p>${s}</p>`:""}
    </div>
  `,t}function _(e){const t=document.createElement("div");t.className="card card--alumni",t.addEventListener("click",()=>o(e));const i=l(e.role).degree,n=e.leaveYear||"",s=[i,n].filter(Boolean).join(" "),a=e.nextAffiliation&&String(e.nextAffiliation).trim()!==""?e.nextAffiliation:"";return t.innerHTML=`
    <h4>${r(e.name)}</h4>
    <p class="text-secondary">${r(s)}</p>
    ${a?`
    <div class="row">
        <span class="row__label">JOINED AT</span>
        <span class="row__value">${r(a)}</span>
    </div>`:""}
    `,t}const L={email:{label:"Email",href:e=>`mailto:${e}`,external:!1,svg:v},linkedin:{label:"LinkedIn",href:e=>e,external:!0,svg:I},scholar:{label:"Google Scholar",href:e=>e,external:!0,svg:h},website:{label:"Website",href:e=>e,external:!0,svg:p},github:{label:"GitHub",href:e=>e,external:!0,svg:f},orcid:{label:"ORCID",href:e=>e,external:!0,svg:g}};function c(e){return e.map(({type:t,value:i})=>{const n=L[t],s=n?r(n.href(i)):r(i),a=n?n.label:"External link",d=n?n.svg:E,u=!n||n.external;return`<a href="${s}" class="icon" data-type="${r(t)}" aria-label="${r(a)}" title="${r(a)}"${u?' target="_blank" rel="noopener noreferrer"':""}>${d}</a>`}).join("")}function R(e){return!e||!e.length?"":c(e)}function O(e){return!e||!e.length?"":`<div class="group">${c(e)}</div>`}export{_ as a,O as b,y as c,C as f,x as g,R as r};
