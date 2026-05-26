import{a as e,i as t,n,r,t as i}from"./util.data-BJfEJwti.js";import{t as a}from"./component.card.publication-DMaMfMJ2.js";import{i as o,t as s}from"./component.iconlinks-997AOZGl.js";e(),t(),r();var c=[];function l(e){return e.status===`former`}function u(e){let t=String(e.name||``).toLowerCase();return c.filter(e=>String(e.authors||``).toLowerCase().includes(t)).sort((e,t)=>String(t.date||``).localeCompare(String(e.date||``)))}function d(e,t){if(!Array.isArray(e.description))return[];let n=e.description.find(e=>String(e?.title||``).trim().toUpperCase()===t.toUpperCase());return!n||!Array.isArray(n.content)?[]:n.content.filter(e=>String(e||``).trim()!==``)}function f(e,t){if(!t.length)return``;let n=`<p>${t.map(i).join(` <br>
            `)}</p>`;return`
    <div class="stack--8">
      <h4>${i(e)}</h4>
      ${n}
    </div>
  `}function p(e){return Array.isArray(e.links)&&e.links.length>0?e.links.filter(e=>e&&e.type&&e.value):e.email?[{type:`email`,value:e.email}]:[]}function m(e){return s(p(e))}function h(e,t){let n=u(e),r=f(`Education`,d(e,`EDUCATION`)),s=f(`Research Interest`,d(e,`RESEARCH INTERESTS`)),c=[l(e)?``:o(e.role),l(e)?``:String(e.currentAffiliation||``).trim()].filter(Boolean),p=c.length?`<p class="color-secondary">${c.map(i).join(` <br>
          `)}</p>`:``,h=String(e.nextAffiliation||``).trim(),g=l(e)&&h?`<div class="row"><p class="color-secondary" style="white-space:nowrap">Joined</p><p>${i(h)}</p></div>`:``,_=l(e)?``:e.image?`<div class="media"><img src="${e.image}" alt="${i(e.name)}"></div>`:`<div class="media"></div>`,v=l(e)?`stack--16`:`split`,y=l(e)?`${r}`:`${r}${s}`;if(t.innerHTML=`
    <div class="${v}">
      ${_}

      <div class="stack--8">
        <h2>${i(e.name)}</h2>
        ${p}
        ${g}
        ${m(e)}
      </div>
    </div>

    ${y}
  `,n.length){let r=document.createElement(`div`);r.className=`stack--16`,r.innerHTML=`<h4>Publications</h4>`,n.forEach(t=>r.appendChild(a(t,{showType:!1,showAuthors:!0,showTags:!1,highlightAuthor:e.name}))),t.appendChild(r)}}async function g(){let e=new URLSearchParams(window.location.search).get(`id`);if(!e)return;let t=document.getElementById(`profile`);if(!t)return;let[r,i]=await Promise.all([n(`/assets/data/people.json`),n(`/assets/data/publications.json`)]);c=i;let a=r.find(t=>t.slug===e);a&&h(a,t)}g();