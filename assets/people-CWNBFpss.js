import{t as e}from"./jsx-runtime-DmyinQmY.js";import{a as t,i as n,n as r,r as i}from"./util.data-BJfEJwti.js";import{t as a}from"./client-BqOHIkD2.js";import{a as o,n as s,r as c,t as l}from"./component.iconlinks-1LXe0QC5.js";var u=a(),d=e();t(),n(),i();var f=document.getElementById(`members`),p=document.getElementById(`alumni`);function m(){let e=document.querySelector(`#pi`);e&&(e.innerHTML=`
    <h6>Principal Investigator</h6>
    <div class="split">
      <div class="media">
        <img src="/assets/images/people/s-ukim.png" alt="Se-Um Kim" />
      </div>
      <div class="stack--8">
        <h2>Se-Um Kim</h2>
        <p class="color-secondary">Associate Professor, Department of Electrical and Information Engineering, Seoul National University of Science and Technology<br />겸직연구원, KIST 양자기술연구단<br />대표이사, 주식회사 LUXON<br />편집이사, 한국조명·전기설비학회<br />편집이사, 한국전기자동차학회</p>
        <div class="group">${l([{type:`email`,value:`seumkim@seoultech.ac.kr`},{type:`scholar`,value:`https://scholar.google.com/citations?user=SetJCVgAAAAJ&hl=en`},{type:`linkedin`,value:`https://www.linkedin.com/in/seumkim/`}],{wrap:!1})}</div>
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
  `)}m();function h(e,t,n){return e.sort((e,r)=>{let i=o(e)-o(r);if(i!==0)return i;let a=n?(e[t]||9999)-(r[t]||9999):(r[t]||0)-(e[t]||0);return a===0?String(e.name||``).localeCompare(String(r.name||``)):a})}function g(e){f&&(0,u.createRoot)(f).render((0,d.jsx)(d.Fragment,{children:h([...e],`joinYear`,!0).map(e=>(0,d.jsx)(c,{member:e},e.slug))}))}function _(e){p&&(0,u.createRoot)(p).render((0,d.jsx)(d.Fragment,{children:h([...e],`leaveYear`,!1).map(e=>(0,d.jsx)(s,{member:e},e.slug))}))}async function v(){try{let e=await r(`/assets/data/people.json`);g(e.filter(e=>e.status===`current`)),_(e.filter(e=>e.status===`former`))}catch(e){console.error(e),f&&(f.innerHTML=`<h5>Member data could not be loaded.</h5>`)}}v();