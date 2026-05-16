import{e as r,d as g,g as f,h as p,i as h,j as I,k as v,l as E}from"./util.data-mXuYSEU2.js";const $={phd:{degree:"Ph.D.",display:"Ph.D. Student",priority:1},ms:{degree:"M.S.",display:"M.S. Student",priority:2},undergraduate:{degree:"B.S.",display:"Undergraduate",priority:3}};function m(e){const t=String(e||"").toLowerCase().replace(/\./g,"").replace(/-/g," ").trim();return t.includes("phd")?"phd":t.includes("ms")?"ms":t.includes("undergraduate")?"undergraduate":""}function o(e){const t=m(e);return $[t]||{degree:e||"",display:e||"",priority:9}}function L(e){return o(e.role).priority}function C(e){return o(e).display}function l(e){window.location.href=`/peopledetail/?id=${encodeURIComponent(e.slug)}`}function N(e){const t=document.createElement("div");t.className="card card--member",t.addEventListener("click",()=>l(e));const i=e.image?`<div class="media"><img src="${e.image}" alt="${r(e.name)}"></div>`:'<div class="media"></div>',n=(e.description||[]).find(a=>a.title==="RESEARCH INTERESTS"),s=n&&n.content&&n.content.length?n.content.map(r).join(", "):"";return t.innerHTML=`
    ${i}
    <div class="stack--xs">
      <h4>${r(e.name)}</h4>
      <p class="text-secondary">${r(C(e.role))}</p>
      ${s?`
      <h5>Research Interests</h5>
      <p>${s}</p>`:""}
    </div>
  `,t}function R(e){const t=document.createElement("div");t.className="card card--alumni",t.addEventListener("click",()=>l(e));const i=o(e.role).degree,n=e.leaveYear||"",s=[i,n].filter(Boolean).join(" "),a=e.nextAffiliation&&String(e.nextAffiliation).trim()!==""?e.nextAffiliation:"";return t.innerHTML=`
    <h4>${r(e.name)}</h4>
    <p class="text-secondary">${r(s)}</p>
    ${a?`
    <div class="row">
        <p class="text-secondary" style="white-space:nowrap">JOINED AT</p>
        <p>${r(a)}</p>
    </div>`:""}
    `,t}const x={email:{label:"Email",href:e=>`mailto:${e}`,external:!1,svg:v},linkedin:{label:"LinkedIn",href:e=>e,external:!0,svg:I},scholar:{label:"Google Scholar",href:e=>e,external:!0,svg:h},website:{label:"Website",href:e=>e,external:!0,svg:p},github:{label:"GitHub",href:e=>e,external:!0,svg:f},orcid:{label:"ORCID",href:e=>e,external:!0,svg:g}};function c(e){return e.map(({type:t,value:i})=>{const n=x[t],s=n?r(n.href(i)):r(i),a=n?n.label:"External link",d=n?n.svg:E,u=!n||n.external;return`<a href="${s}" class="icon" data-type="${r(t)}" aria-label="${r(a)}" title="${r(a)}"${u?' target="_blank" rel="noopener noreferrer"':""}>${d}</a>`}).join("")}function O(e){return!e||!e.length?"":c(e)}function S(e){return!e||!e.length?"":`<div class="group">${c(e)}</div>`}export{R as a,S as b,N as c,C as f,L as g,O as r};
