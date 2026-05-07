import{e as a}from"./data-S4SCuinP.js";function i(r){const n=`
    <h5>${a(r.title||"")}</h5>
    <p class="text-secondary">${a(r.source||"")}</p>
    <p>${a(r.authors||"")}</p>
  `;if(r.link){const e=document.createElement("a");return e.href=r.link,e.target="_blank",e.rel="noopener noreferrer",e.className="card card--publication",e.innerHTML=n,e}const t=document.createElement("div");return t.className="card card--publication card--static",t.innerHTML=n,t}export{i as c};
