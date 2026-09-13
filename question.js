import { getTeam, loadCurrentQuestion, assignRandomQuestion, updateTeam } from "./app.js";

const teamLabel=document.getElementById("teamLabel");
const scoreLabel=document.getElementById("scoreLabel");
const levelLabel=document.getElementById("levelLabel");
const questionText=document.getElementById("questionText");
const options=document.getElementById("options");
const submitBtn=document.getElementById("submitBtn");
const status=document.getElementById("status");

let team=null, question=null, busy=false;

async function init(){
  try{
    team=await getTeam();
    teamLabel.textContent=team.name;
    scoreLabel.textContent=`Score: ${team.score||0}`;
    if(team.finished){window.location.href="finish.html";return;}
    if(!team.currentQuestionId){
      question=await assignRandomQuestion(team);
    }else{
      question=await loadCurrentQuestion(team);
      if(!question) question=await assignRandomQuestion(team);
    }
    render();
  }catch(err){
    console.error(err);
    status.textContent=err.message;
    status.className="status error";
  }
}

function render(){
  levelLabel.textContent=`LEVEL ${team.level||1}`;
  questionText.textContent=question.question;
  options.innerHTML="";
  const opts=question.options||[];
  opts.forEach((text,i)=>{
    const label=document.createElement("label");
    label.className="option";
    label.innerHTML=`<input type="radio" name="answer" value="${i}"><span>${text}</span>`;
    options.appendChild(label);
  });
}

submitBtn.addEventListener("click",async()=>{
  if(busy)return;
  const selected=document.querySelector('input[name="answer"]:checked');
  if(!selected){status.textContent="Select an option first.";status.className="status error";return;}
  busy=true; submitBtn.disabled=true; status.textContent="Checking...";
  try{
    const answer=Number(selected.value);
    if(answer===Number(question.answerIndex)){
      const nextLevel=(team.level||1)+1;
      const nextLocation=question.nextLocation||"finish";
      await updateTeam(team.id,{
        score:(team.score||0)+10,
        level:nextLevel,
        expectedLocation:nextLocation,
        lastHint:question.hint||"",
        currentQuestionId:null
      });
      localStorage.setItem("lastHint",question.hint||"");
      localStorage.setItem("lastLocation",nextLocation);
      if(nextLocation==="finish"){
        window.location.href="finish.html";
      }else{
        window.location.href="result.html";
      }
    }else{
      status.textContent="❌ Wrong answer! Try again — a new question will appear.";
      status.className="status error";
      question=await assignRandomQuestion(team,{countAttempt:true});
      team.currentQuestionId=question.id;
      submitBtn.disabled=false; busy=false;
      setTimeout(()=>{status.textContent="";render();},700);
    }
  }catch(err){
    console.error(err);
    status.textContent="Something went wrong. Try again.";
    status.className="status error";
    submitBtn.disabled=false;busy=false;
  }
});

init();