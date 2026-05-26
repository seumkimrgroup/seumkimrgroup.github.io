import{d as e,f as t,g as n,h as r,m as i,p as a,t as o,u as s}from"./util.data-D8K052RC.js";var c={phd:{degree:`Ph.D.`,display:`Ph.D. Student`,priority:1},ms:{degree:`M.S.`,display:`M.S. Student`,priority:2},undergraduate:{degree:`B.S.`,display:`Undergraduate`,priority:3}};function l(e){let t=String(e||``).toLowerCase().replace(/\./g,``).replace(/-/g,` `).trim();return t.includes(`phd`)?`phd`:t.includes(`ms`)?`ms`:t.includes(`undergraduate`)?`undergraduate`:``}function u(e){return c[l(e)]||{degree:e||``,display:e||``,priority:9}}function d(e){return u(e.role).priority}function f(e){return u(e).display}function p(e){window.location.href=`/peopledetail/?id=${encodeURIComponent(e.slug)}`}function m(e){let t=document.createElement(`div`);t.className=`card card--member`,t.addEventListener(`click`,()=>p(e));let n=e.image?`<div class="media"><img src="${e.image}" alt="${o(e.name)}"></div>`:`<div class="media"></div>`,r=(e.description||[]).find(e=>e.title===`RESEARCH INTERESTS`),i=r&&r.content&&r.content.length?r.content.map(o).join(`, `):``;return t.innerHTML=`
    ${n}
    <div class="stack--4">
      <h4>${o(e.name)}</h4>
      <p class="color-secondary">${o(f(e.role))}</p>
      ${i?`
      <h5>Research Interests</h5>
      <p>${i}</p>`:``}
    </div>
  `,t}function h(e){let t=document.createElement(`div`);t.className=`card card--alumni`,t.addEventListener(`click`,()=>p(e));let n=[u(e.role).degree,e.leaveYear||``].filter(Boolean).join(` `),r=e.nextAffiliation&&String(e.nextAffiliation).trim()!==``?e.nextAffiliation:``;return t.innerHTML=`
    <h4>${o(e.name)}</h4>
    <p class="color-secondary">${o(n)}</p>
    ${r?`
    <div class="row">
        <p class="color-secondary" style="white-space:nowrap">Joined</p>
        <p>${o(r)}</p>
    </div>`:``}
    `,t}var g={email:{label:`Email`,href:e=>`mailto:${e}`,external:!1,svg:s},linkedin:{label:`LinkedIn`,href:e=>e,external:!0,svg:a},scholar:{label:`Google Scholar`,href:e=>e,external:!0,svg:r},website:{label:`Website`,href:e=>e,external:!0,svg:n},github:{label:`GitHub`,href:e=>e,external:!0,svg:t},orcid:{label:`ORCID`,href:e=>e,external:!0,svg:i}};function _(t){return t.map(({type:t,value:n})=>{let r=g[t],i=o(r?r.href(n):n),a=r?r.label:`External link`,s=r?r.svg:e,c=!r||r.external;return`<a href="${i}" class="icon" data-type="${o(t)}" aria-label="${o(a)}" title="${o(a)}"${c?` target="_blank" rel="noopener noreferrer"`:``}>${s}</a>`}).join(``)}function v(e,{wrap:t=!0}={}){if(!e||!e.length)return``;let n=_(e);return t?`<div class="group">${n}</div>`:n}export{d as a,f as i,h as n,m as r,v as t};