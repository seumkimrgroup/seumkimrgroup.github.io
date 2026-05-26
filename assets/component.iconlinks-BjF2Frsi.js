import{t as e}from"./jsx-runtime-Y_Ztl3wj.js";import{d as t,f as n,g as r,h as i,m as a,p as o,t as s,u as c}from"./util.data-D8K052RC.js";var l={phd:{degree:`Ph.D.`,display:`Ph.D. Student`,priority:1},ms:{degree:`M.S.`,display:`M.S. Student`,priority:2},undergraduate:{degree:`B.S.`,display:`Undergraduate`,priority:3}};function u(e){let t=String(e||``).toLowerCase().replace(/\./g,``).replace(/-/g,` `).trim();return t.includes(`phd`)?`phd`:t.includes(`ms`)?`ms`:t.includes(`undergraduate`)?`undergraduate`:``}function d(e){return l[u(e)]||{degree:e||``,display:e||``,priority:9}}function f(e){return d(e.role).priority}function p(e){return d(e).display}function m(e){window.location.href=`/peopledetail/?id=${encodeURIComponent(e.slug)}`}function h(e){let t=document.createElement(`div`);t.className=`card card--member`,t.addEventListener(`click`,()=>m(e));let n=e.image?`<div class="media"><img src="${e.image}" alt="${s(e.name)}"></div>`:`<div class="media"></div>`,r=(e.description||[]).find(e=>e.title===`RESEARCH INTERESTS`),i=r&&r.content&&r.content.length?r.content.map(s).join(`, `):``;return t.innerHTML=`
    ${n}
    <div class="stack--4">
      <h4>${s(e.name)}</h4>
      <p class="color-secondary">${s(p(e.role))}</p>
      ${i?`
      <h5>Research Interests</h5>
      <p>${i}</p>`:``}
    </div>
  `,t}function g(e){let t=document.createElement(`div`);t.className=`card card--alumni`,t.addEventListener(`click`,()=>m(e));let n=[d(e.role).degree,e.leaveYear||``].filter(Boolean).join(` `),r=e.nextAffiliation&&String(e.nextAffiliation).trim()!==``?e.nextAffiliation:``;return t.innerHTML=`
    <h4>${s(e.name)}</h4>
    <p class="color-secondary">${s(n)}</p>
    ${r?`
    <div class="row">
        <p class="color-secondary" style="white-space:nowrap">Joined</p>
        <p>${s(r)}</p>
    </div>`:``}
    `,t}e();var _={email:{label:`Email`,href:e=>`mailto:${e}`,external:!1,svg:c},linkedin:{label:`LinkedIn`,href:e=>e,external:!0,svg:o},scholar:{label:`Google Scholar`,href:e=>e,external:!0,svg:i},website:{label:`Website`,href:e=>e,external:!0,svg:r},github:{label:`GitHub`,href:e=>e,external:!0,svg:n},orcid:{label:`ORCID`,href:e=>e,external:!0,svg:a}};function v(e,{wrap:n=!0}={}){if(!e||!e.length)return``;let r=e.map(({type:e,value:n})=>{let r=_[e],i=s(r?r.href(n):n),a=r?r.label:`External link`,o=r?r.svg:t,c=!r||r.external;return`<a href="${i}" class="icon" data-type="${s(e)}" aria-label="${s(a)}" title="${s(a)}"${c?` target="_blank" rel="noopener noreferrer"`:``}>${o}</a>`}).join(``);return n?`<div class="group">${r}</div>`:r}export{f as a,p as i,g as n,h as r,v as t};