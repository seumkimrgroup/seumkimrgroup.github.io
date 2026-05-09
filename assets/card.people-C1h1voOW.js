import{e as n}from"./data-BMiHhx5Y.js";const d={phd:{degree:"Ph.D.",display:"Ph.D. Student",priority:1},ms:{degree:"M.S.",display:"M.S. Student",priority:2},undergraduate:{degree:"B.S.",display:"Undergraduate",priority:3}};function l(e){const t=String(e||"").toLowerCase().replace(/\./g,"").replace(/-/g," ").trim();return t.includes("phd")?"phd":t.includes("ms")?"ms":t.includes("undergraduate")?"undergraduate":""}function o(e){const t=l(e);return d[t]||{degree:e||"",display:e||"",priority:9}}function g(e){return o(e.role).priority}function u(e){return o(e).display}function c(e){window.location.href=`/peopledetail/?id=${encodeURIComponent(e.slug)}`}function f(e){const t=document.createElement("div");t.className="card card--member",t.addEventListener("click",()=>c(e));const s=e.image?`<div class="media"><img src="${e.image}" alt="${n(e.name)}"></div>`:'<div class="media"></div>',a=(e.description||[]).find(r=>r.title==="RESEARCH INTERESTS"),i=a&&a.content&&a.content.length?a.content.map(n).join(", "):"";return t.innerHTML=`
    ${s}
    <div class="info">
      <h4>${n(e.name)}</h4>
      <p class="text-secondary">${n(u(e.role))}</p>
      ${i?`
      <h5>Research Interests</h5>
      <p>${i}</p>`:""}
    </div>
  `,t}function h(e){const t=document.createElement("div");t.className="card card--alumni",t.addEventListener("click",()=>c(e));const s=o(e.role).degree,a=e.leaveYear||"",i=[s,a].filter(Boolean).join(" "),r=e.nextAffiliation&&String(e.nextAffiliation).trim()!==""?e.nextAffiliation:"";return t.innerHTML=`
    <h4>${n(e.name)}</h4>
    <p class="text-secondary">${n(i)}</p>
    ${r?`
    <div class="meta-row">
        <span class="meta-row__label">JOINED AT</span>
        <span class="meta-row__value">${n(r)}</span>
    </div>`:""}
    `,t}export{h as a,f as c,u as f,g};
