import{c as e,i as t,l as n,r,s as i,t as a}from"./jsx-runtime-CdNpcH6_.js";import{i as o,n as s,o as c,r as l}from"./component.iconlinks-B5_8JaUh.js";var u=t(),d=a();n(),e(),i();var f=document.getElementById(`members`),p=document.getElementById(`alumni`);function m(){let e=document.querySelector(`#pi`);e&&(e.innerHTML=`
    <h6>Principal Investigator</h6>
    <div class="split">
      <div class="media">
        <img src="/assets/images/people/s-ukim.png" alt="Se-Um Kim" />
      </div>
      <div class="stack--8">
        <h2>Se-Um Kim</h2>
        <p class="color-secondary">Associate Professor, Department of Electrical and Information Engineering, Seoul National University of Science and Technology<br />겸직연구원, KIST 양자기술연구단<br />대표이사, 주식회사 LUXON<br />편집이사, 한국조명·전기설비학회<br />편집이사, 한국전기자동차학회</p>
        <div class="group">${s([{type:`email`,value:`seumkim@seoultech.ac.kr`},{type:`scholar`,value:`https://scholar.google.com/citations?user=SetJCVgAAAAJ&hl=en`},{type:`orcid`,value:`https://orcid.org/0000-0001-6897-0706`},{type:`linkedin`,value:`https://www.linkedin.com/in/seumkim/`}],{wrap:!1})}</div>
      </div>
    </div>
    <div class="stack--8">
      <h4>Research Career</h4>
      <p>2022-2026: Assistant Professor, SeoulTech<br />2019-2022: Staff Researcher, Samsung Advanced Institute of Technology<br />2018-2019: Postdoctoral Fellow, Department of Materials Science and Engineering, University of Pennsylvania<br />2017-2018: Postdoctoral Fellow, BK21 Creative Research Engineer Development for IT, Seoul National University<br />2016-2017: Postdoctoral Fellow, Inter-University Semiconductor Research Center, Seoul National University</p>
    </div>
    <div class="stack--8">
      <h4>Education</h4>
      <p>Ph.D. in Electrical and Computer Engineering, Seoul National University, 2016<br />B.S. in Electrical Engineering, Seoul National University, 2010</p>
    </div>
  `)}m();function h(e,t,n){return e.sort((e,r)=>{let i=c(e)-c(r);if(i!==0)return i;let a=n?(e[t]||9999)-(r[t]||9999):(r[t]||0)-(e[t]||0);return a===0?String(e.name||``).localeCompare(String(r.name||``)):a})}function g(e){f&&(0,u.createRoot)(f).render((0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(`h6`,{children:`Members`}),(0,d.jsx)(`div`,{className:`list list--members`,children:h([...e],`joinYear`,!0).map(e=>(0,d.jsx)(o,{member:e},e.slug))})]}))}function _(e){p&&(0,u.createRoot)(p).render((0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(`h6`,{children:`Alumni`}),(0,d.jsx)(`div`,{className:`list list--alumni`,children:h([...e],`leaveYear`,!1).map(e=>(0,d.jsx)(l,{member:e},e.slug))})]}))}async function v(){try{let e=await r(`/assets/data/people.json`);g(e.filter(e=>e.status===`current`)),_(e.filter(e=>e.status===`former`))}catch(e){console.error(e),f&&(f.innerHTML=`<h5>Member data could not be loaded.</h5>`)}}v();