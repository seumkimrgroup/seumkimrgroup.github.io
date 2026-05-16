import{e as c}from"./util.data-DBRRqw2K.js";const i={JQL:"project",TACTILE:"project",SW:"project","LC-EO":"topic","LC-COMP":"topic","ML-FEA":"topic",PSLC:"method",CLCE:"method",LCE:"method",PIC:"method",THERM:"method",MECH:"method",ELEC:"method",FEATURED:"featured"},h=["project","topic","method","featured"];function u(t){return!t||!t.length?"":`<div class="group">${[...t].sort((e,r)=>{const n=h.indexOf(i[e]??""),a=h.indexOf(i[r]??"");return(n===-1?99:n)-(a===-1?99:a)}).map(e=>{const r=i[e];return`<span class="${r?`tag tag--${r}`:"tag"}">${c(e)}</span>`}).join("")}</div>`}function C(t,{showType:d=!0,showAuthors:e=!0,showTags:r=!0}={}){var m;const n=d&&t.type?`<h6>${c(t.type)}</h6>`:"",a=e&&t.authors?`<p>${c(t.authors)}</p>`:"",p=r&&((m=t.tags)!=null&&m.length)?u(t.tags):"",l=`
    ${n}
    <h5>${c(t.title||"")}</h5>
    <p class="color-secondary">${c(t.source||"")}</p>
    ${a}
    ${p}
  `;if(t.link){const o=document.createElement("a");return o.href=t.link,o.target="_blank",o.rel="noopener noreferrer",o.className="card card--publication",o.innerHTML=l,o}const s=document.createElement("div");return s.className="card card--publication card--static",s.innerHTML=l,s}export{i as T,C as c,u as r};
