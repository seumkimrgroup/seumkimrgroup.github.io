import{e as a}from"./util.data-0wJgrHOB.js";const i={JQL:"project",TACTILE:"project",SW:"project","LC-EO":"topic","LC-COMP":"topic","ML-FEA":"topic",PSLC:"method",CLCE:"method",LCE:"method",PIC:"method",THERM:"method",MECH:"method",ELEC:"method",FEATURED:"featured"},l=["project","topic","method","featured"];function m(t){return!t||!t.length?"":`<div class="group">${[...t].sort((e,r)=>{const n=l.indexOf(i[e]??""),o=l.indexOf(i[r]??"");return(n===-1?99:n)-(o===-1?99:o)}).map(e=>{const r=i[e];return`<span class="${r?`tag tag--${r}`:"tag"}">${a(e)}</span>`}).join("")}</div>`}function h(t,{showMeta:s=!0}={}){var d;const e=s&&t.type?`<h6>${a(t.type)}</h6>`:"",r=s&&((d=t.tags)!=null&&d.length)?m(t.tags):"",n=`
    ${e}
    <h5>${a(t.title||"")}</h5>
    <p class="text-secondary">${a(t.source||"")}</p>
    <p>${a(t.authors||"")}</p>
    ${r}
  `;if(t.link){const c=document.createElement("a");return c.href=t.link,c.target="_blank",c.rel="noopener noreferrer",c.className="card card--publication",c.innerHTML=n,c}const o=document.createElement("div");return o.className="card card--publication card--static",o.innerHTML=n,o}export{i as T,h as c,m as r};
