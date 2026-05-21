import{e as l}from"./util.data-V7GCWtG-.js";const d={JQL:"project",TACTILE:"project","LC-SW":"project","LC-EO":"topic","LC-COMP":"topic","ML-FEA":"topic",PSLC:"method",CLCE:"method",LCE:"method",PIC:"method",THERM:"method",MECH:"method",ELEC:"method",FEATURED:"featured"},u=["project","topic","method","featured"];function p(t,{filledGroups:s=[]}={}){return!t||!t.length?"":`<div class="group">${[...t].sort((r,e)=>{const n=s.includes(d[r])?0:1,a=s.includes(d[e])?0:1;if(n!==a)return n-a;const i=u.indexOf(d[r]??""),c=u.indexOf(d[e]??"");return(i===-1?99:i)-(c===-1?99:c)}).map(r=>{const e=d[r],n=e&&s.includes(e);return`<span class="${e?`tag tag--${e}${n?" tag--filled":""}`:"tag"}">${l(r)}</span>`}).join("")}</div>`}function E(t,{showType:s=!0,showAuthors:m=!0,showTags:r=!0}={}){var h;const e=s&&t.type?`<h6>${l(t.type)}</h6>`:"",n=m&&t.authors?`<p>${l(t.authors)}</p>`:"",a=r&&((h=t.tags)!=null&&h.length)?p(t.tags):"",i=`
    ${e}
    <h5>${l(t.title||"")}</h5>
    <p class="color-secondary">${l(t.source||"")}</p>
    ${n}
    ${a}
  `;if(t.link){const o=document.createElement("a");return o.href=t.link,o.target="_blank",o.rel="noopener noreferrer",o.className="card card--publication",o.innerHTML=i,o}const c=document.createElement("div");return c.className="card card--publication card--static",c.innerHTML=i,c}export{d as T,E as c,p as r};
