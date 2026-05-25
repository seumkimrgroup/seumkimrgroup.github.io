import{i as u,d as f,g as p,f as h}from"./util.data-BPkaIh9F.js";import{r as v,c as g,a as b,g as m}from"./component.iconlinks-zOEY-vbq.js";u();f();p();const t=document.getElementById("members"),a=document.getElementById("alumni");function S(){const e=document.querySelector("#pi");e&&(e.innerHTML=`
    <h6>Principal Investigator</h6>
    <div class="split">
      <div class="media">
        <img src="/assets/images/people/s-ukim.png" alt="Se-Um Kim" />
      </div>
      <div class="stack--8">
        <h2>Se-Um Kim</h2>
        <p class="color-secondary">Associate Professor, Department of Electrical and Information Engineering, Seoul National University of Science and Technology<br />겸직연구원, KIST 양자기술연구단<br />대표이사, 주식회사 LUXON<br />편집이사, 한국조명·전기설비학회<br />편집이사, 한국전기자동차학회</p>
        <div class="group">${v([{type:"email",value:"seumkim@seoultech.ac.kr"},{type:"scholar",value:"https://scholar.google.com/citations?user=SetJCVgAAAAJ&hl=en"},{type:"linkedin",value:"https://www.linkedin.com/in/seumkim/"}],{wrap:!1})}</div>
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
  `)}S();let s=[];function d(e,r,n){return e.sort((i,o)=>{const c=m(i)-m(o);if(c!==0)return c;const l=n?(i[r]||9999)-(o[r]||9999):(o[r]||0)-(i[r]||0);return l!==0?l:String(i.name||"").localeCompare(String(o.name||""))})}function y(e){t&&(t.innerHTML="",d(e,"joinYear",!0).forEach(r=>t.appendChild(g(r))))}function C(e){a&&(a.innerHTML="",d(e,"leaveYear",!1).forEach(r=>a.appendChild(b(r))))}function E(){const e=s.filter(n=>n.status==="current"),r=s.filter(n=>n.status==="former");y(e),C(r)}async function M(){try{s=await h("/assets/data/people.json"),E()}catch(e){console.error(e),t&&(t.innerHTML="<h5>Member data could not be loaded.</h5>")}}M();
