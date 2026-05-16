import{e as a}from"./util.data-0wJgrHOB.js";const s={JQL:"project",TACTILE:"project",SW:"project","LC-EO":"topic","LC-COMP":"topic","ML-FEA":"topic",PSLC:"method",CLCE:"method",LCE:"method",PIC:"method",THERM:"method",MECH:"method",ELEC:"method",FEATURED:"featured"},d=["project","topic","method","featured"];function l(t){return!t||!t.length?"":`<div class="group">${[...t].sort((n,e)=>{const r=d.indexOf(s[n]??""),c=d.indexOf(s[e]??"");return(r===-1?99:r)-(c===-1?99:c)}).map(n=>{const e=s[n];return`<span class="${e?`tag tag--${e}`:"tag"}">${a(n)}</span>`}).join("")}</div>`}function p(t){var c;const i=t.type?`<h6>${a(t.type)}</h6>`:"",n=(c=t.tags)!=null&&c.length?l(t.tags):"",e=`
    ${i}
    <h5>${a(t.title||"")}</h5>
    <p class="text-secondary">${a(t.source||"")}</p>
    <p>${a(t.authors||"")}</p>
    ${n}
  `;if(t.link){const o=document.createElement("a");return o.href=t.link,o.target="_blank",o.rel="noopener noreferrer",o.className="card card--publication",o.innerHTML=e,o}const r=document.createElement("div");return r.className="card card--publication card--static",r.innerHTML=e,r}export{s as T,p as c,l as r};
