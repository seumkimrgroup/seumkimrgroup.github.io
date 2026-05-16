import{e as a}from"./util.data-0wJgrHOB.js";const l={JQL:"project",TACTILE:"project",SW:"project","LC-EO":"topic","LC-COMP":"topic","ML-FEA":"topic",PSLC:"method",CLCE:"method",LCE:"method",PIC:"method",THERM:"method",MECH:"method",ELEC:"method",FEATURED:"featured"},m=["project","topic","method","featured"];function u(t){return!t||!t.length?"":`<div class="group">${[...t].sort((e,o)=>{const r=m.indexOf(l[e]??""),c=m.indexOf(l[o]??"");return(r===-1?99:r)-(c===-1?99:c)}).map(e=>{const o=l[e];return`<span class="${o?`tag tag--${o}`:"tag"}">${a(e)}</span>`}).join("")}</div>`}const f={full:{showType:!0,showAuthors:!0,showTags:!0},compact:{showType:!1,showAuthors:!0,showTags:!1},research:{showType:!1,showAuthors:!1,showTags:!1}};function T(t,{showType:h,showAuthors:e,showTags:o}=f.full){var d;const r=h&&t.type?`<h6>${a(t.type)}</h6>`:"",c=e&&t.authors?`<p>${a(t.authors)}</p>`:"",p=o&&((d=t.tags)!=null&&d.length)?u(t.tags):"",i=`
    ${r}
    <h5>${a(t.title||"")}</h5>
    <p class="text-secondary">${a(t.source||"")}</p>
    ${c}
    ${p}
  `;if(t.link){const s=document.createElement("a");return s.href=t.link,s.target="_blank",s.rel="noopener noreferrer",s.className="card card--publication",s.innerHTML=i,s}const n=document.createElement("div");return n.className="card card--publication card--static",n.innerHTML=i,n}export{f as C,l as T,T as c,u as r};
