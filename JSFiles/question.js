console.log("here we can go");

var questions = [
  { qt: "12 / 3 + 5 * 2", ans: ["14", "16", "18", "10"], correctans: "14" },
  { qt: "9 ^ 2 - 15", ans: ["72", "81", "66", "70"], correctans: "66" },
  { qt: "√81 + 5 * 3", ans: ["24", "30", "27", "33"], correctans: "24" },
  { qt: "(8 + 4) * (3 - 1)", ans: ["12", "20", "24", "16"], correctans: "24" },
  { qt: "5 * 2 ^ 3", ans: ["80", "40", "30", "25"], correctans: "40" },
  { qt: "(7 + 3) / (2 + 3)", ans: ["1", "2", "3", "5"], correctans: "2" },
  { qt: "10 * (6 / 3) + 4 + 2", ans: ["22", "20", "26", "24"], correctans: "26" },
  { qt: "15 % 4", ans: ["3", "4", "2", "1"], correctans: "3" },
  { qt: "3 * (4 + 6) - 8 / 2", ans: ["20", "28", "24", "26"], correctans: "26" },
  { qt: "(5 + 3)^2 / 4", ans: ["8", "16", "12", "64"], correctans: "16" }
];
var finalScore = new Array();
var allAns = new Array();
console.log("-------------------");

var allQuestsLabel;
var labelValue;
var questTitle;
var currentQuest = 0;
var currentQuestContainer;

var timeNum = 190
var time = document.getElementById("timer");
setInterval(counterTime,1000)
function counterTime(){
  if(timeNum == 0){
  appearScore();
}
if(timeNum <= 10){
  time.style.color = "red"
}
time.textContent = timeNum-- + " sec";
}



function makeQuest() {
  var checkedNum = getCheckedAns();

  allQuestsLabel = document.getElementById("all-quest");
  questTitle = document.getElementById("quest-title");

allQuestsLabel.innerHTML = "";

  questTitle.textContent = questions[currentQuest].qt;
for(var i=0;i<questions[currentQuest].ans.length;i++){
  allQuestsLabel.innerHTML += `<div class="single-div-ans" onclick="selectAns(this)"><input type="radio" id="ans${i+1}" class="checked-ans ${
    questions[currentQuest].ans[i] == questions[currentQuest].correctans
      ? "correct-ans"
      : "wrong-ans"
  }" name="answer-radio" value="${questions[currentQuest].ans[i]}" ${(checkedNum-1) == i ? "checked" : ""}>
    <label for="ans${i+1}" class="ans-label">${
    questions[currentQuest].ans[i]
  }</label></div>
    <br>`;
}

currentQuestContainer = document.getElementById("cuerrent-quest");
currentQuestContainer.textContent = currentQuest+1;

  allInputValues = document.getElementsByClassName(`checked-ans`);
}

makeQuest();

function next(e) {
  var checkedRadio = document.querySelector(
    'input[name="answer-radio"]:checked'
  );
  if (checkedRadio != null) {

    addAns(checkedRadio.id);

    var flagQuest = checkQuestAns(
      checkedRadio.value,
      getActualAns(currentQuest)
    );
    if (flagQuest) {
      var checkedNext = checkNextQuest(currentQuest);
      if (!checkedNext) {
        appearScore();
      } else {
        currentQuest++;
        makeQuest();
      }
    } else {
      var checkedNext = checkNextQuest(currentQuest);
      if (!checkedNext) {
        appearScore();
      } else {
        currentQuest++;
        makeQuest();
      }
    }
  }
}

function previous(e) {
  var checkedPrevious = checkPreviousQuest(currentQuest);
  if (!checkedPrevious) {
    console.log("You are in the first quest !");
  } else {
    currentQuest--;
    makeQuest();
  }
}

function mark(e) {
  var markQuest = document.getElementById("mark-quest");
  var questMarked = document.getElementById(`q${currentQuest}`);
  if (questMarked == null) {
    markQuest.innerHTML += `<p id="q${currentQuest}" class="marked-quest" onclick="goToMarkQuest(this)">Q ${[currentQuest+1]}</p>`;
  } else {
    markQuest.removeChild(questMarked);
  }
}

function getActualAns(currentQuest) {
  return questions[currentQuest].correctans;
}

function checkQuestAns(ans, actualAns) {
  if (ans == actualAns) {
    makeAnsTrue(currentQuest);
  } else {
    makeAnsFalse(currentQuest);
  }
}

function appearScore() {
  var score = 0;
  for (var i = 0; i < finalScore.length; i++) {
    if (finalScore[i][`quest-title${i}`] == 1) {
      score++;
    }
  }
  document.body.innerHTML = `<div id="final-message"><h1>You finished the exam ! ☺</h1></div><br><div id="score"><h1>Your score is : ${score} / ${questions.length}</h1></div>`;
}

function checkNextQuest(currentQuest) {
  if (currentQuest + 1 > questions.length - 1) {
    return false;
  } else {
    return true;
  }
}

function checkPreviousQuest(currentQuest) {
  if (currentQuest - 1 < 0) {
    return false;
  } else {
    return true;
  }
}

function makeAnsTrue(currentQuest){
  if (
      finalScore.some((obj) => obj.hasOwnProperty(`quest-title${currentQuest}`))
    ) {
      var index = finalScore.findIndex((obj) =>
        obj.hasOwnProperty(`quest-title${currentQuest}`)
      );
      finalScore[index][`quest-title${currentQuest}`] = 1;
    } else {
      var scoreObject = { [`quest-title${currentQuest}`]: 1 };
      finalScore.push(scoreObject);
      return true;
    }
}

function makeAnsFalse(currentQuest){
if (
      finalScore.some((obj) => obj.hasOwnProperty(`quest-title${currentQuest}`))
    ) {
      var index = finalScore.findIndex((obj) =>
        obj.hasOwnProperty(`quest-title${currentQuest}`)
      );
      finalScore[index][`quest-title${currentQuest}`] = 0;
    } else {
      var scoreObject = { [`quest-title${currentQuest}`]: 0 };
      finalScore.push(scoreObject);
      return true;
    }
}

function selectAns(divAns){
var optionRadio = divAns.querySelector('input[type="radio"]');
optionRadio.checked = true;
}

function goToMarkQuest(q){
  currentQuest = Number((q.id).slice(1));
  makeQuest()
}

function addAns(id){
  if (
      allAns.some((obj) => obj.hasOwnProperty(`q${currentQuest}`))
    ) {
      var index = allAns.findIndex((obj) =>
        obj.hasOwnProperty(`q${currentQuest}`)
      );
      allAns[index][`q${currentQuest}`] = id
    }
    else{
      allAns.push({ [`q${currentQuest}`]: `${id}`});
    }
}

function getCheckedAns(){
  if (
      allAns.some((obj) => obj.hasOwnProperty(`q${currentQuest}`))
    ) {
      var index = allAns.findIndex((obj) =>
        obj.hasOwnProperty(`q${currentQuest}`)
      );
      return Number(allAns[index][`q${currentQuest}`].slice(3));
    }
}

