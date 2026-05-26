import{a as e,i as t,n,r}from"./util.data-D8K052RC.js";import{a as i,n as a,r as o,t as s}from"./component.iconlinks-C-9NOZnG.js";e(),t(),r();var c=document.getElementById(`members`),l=document.getElementById(`alumni`);function u(){let e=document.querySelector(`#pi`);e&&(e.innerHTML=`
    <h6>Principal Investigator</h6>
    <div class="split">
      <div class="media">
        <img src="/assets/images/people/s-ukim.png" alt="Se-Um Kim" />
      </div>
      <div class="stack--8">
        <h2>Se-Um Kim</h2>
        <p class="color-secondary">Associate Professor, Department of Electrical and Information Engineering, Seoul National University of Science and Technology<br />겸직연구원, KIST 양자기술연구단<br />대표이사, 주식회사 LUXON<br />편집이사, 한국조명·전기설비학회<br />편집이사, 한국전기자동차학회</p>
        <div class="group">${s([{type:`email`,value:`seumkim@seoultech.ac.kr`},{type:`scholar`,value:`https://scholar.google.com/citations?user=SetJCVgAAAAJ&hl=en`},{type:`linkedin`,value:`https://www.linkedin.com/in/seumkim/`}],{wrap:!1})}</div>
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
  `)}u();var d=[];function f(e,t,n){return e.sort((e,r)=>{let a=i(e)-i(r);if(a!==0)return a;let o=n?(e[t]||9999)-(r[t]||9999):(r[t]||0)-(e[t]||0);return o===0?String(e.name||``).localeCompare(String(r.name||``)):o})}function p(e){c&&(c.innerHTML=``,f(e,`joinYear`,!0).forEach(e=>c.appendChild(o(e))))}function m(e){l&&(l.innerHTML=``,f(e,`leaveYear`,!1).forEach(e=>l.appendChild(a(e))))}function h(){let e=d.filter(e=>e.status===`current`),t=d.filter(e=>e.status===`former`);p(e),m(t)}async function g(){try{d=await n(`/assets/data/people.json`),h()}catch(e){console.error(e),c&&(c.innerHTML=`<h5>Member data could not be loaded.</h5>`)}}g();