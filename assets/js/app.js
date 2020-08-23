var timerEl = document.getElementById("time-left");
var beginQuiz = document.getElementById("quiz-beg");
var quesStart = document.getElementById("question-start");
var btnStart = document.getElementById("begin-btn");
var buttonA = document.getElementById("btn-a");
var buttonB = document.getElementById("btn-b");
var buttonC = document.getElementById("btn-c");
var buttonD = document.getElementById("btn-d");
var questionHead = document.getElementById("question-header");
var quizEnd = document.getElementById("quiz-end-section");
var scoreHead = document.getElementById("score-head");
var answerBox = document.getElementById("ansCorrect");
var listEl = document.getElementById("list-container");
var scoreButton = document.getElementById("score-btn");
var inBox = document.getElementById("in-box");
var showScores = document.getElementById("display-hs");
var timeLeft = 20;
var playersArr = [];
var playerCounter = 0;
var questionCount = 0;
var lastClick = "";
var questionsArr = [
    { q: "What color is the sky?", a: "blue", b: "green", c: "black", d: "red", answer: "blue"},
    { q: "Quesiton2", a: "blue", b: "green", c: "black", d: "red", answer: "blue"},
    { q: "Question3", a: "blue", b: "green", c: "black", d: "red", answer: "blue"},
    { q: "Question4", a: "blue", b: "green", c: "black", d: "red", answer: "blue"},
    { q: "Question5", a: "blue", b: "green", c: "black", d: "red", answer: "blue"},
    { q: "Question6", a: "blue", b: "green", c: "black", d: "red", answer: "blue"},
    { q: "Question7", a: "blue", b: "green", c: "black", d: "red", answer: "blue"},
    { q: "Question8", a: "blue", b: "green", c: "black", d: "red", answer: "blue"},
    { q: "Question9", a: "blue", b: "green", c: "black", d: "red", answer: "blue"},
    { q: "Question10", a: "blue", b: "green", c: "black", d: "red", answer: "blue"}];

var countDown = function(stop){
    timerEl.textContent = "Time: " + timeLeft;
    var timeInterval = setInterval(function() {
        if(timeLeft > 0){
            timeLeft--;
            timerEl.textContent = "Time: " + timeLeft;
        }
        if(timeLeft === null){
            clearInterval(timeInterval);
        }
        if(timeLeft === 0){
            clearInterval(timeInterval);
            endQuiz();
        }
    }, 1000);
}

var startQuiz = function(){
    beginQuiz.style = "display: none";
    quizLoop();
    countDown();
}

var quizLoop = function(){
    quesStart.style = "display: block";
    questionHead.textContent = questionsArr[questionCount].q;
    buttonA.textContent = questionsArr[questionCount].a;
    buttonB.textContent = questionsArr[questionCount].b;
    buttonC.textContent = questionsArr[questionCount].c;
    buttonD.textContent = questionsArr[questionCount].d;
}
var nextQuestion = function(event){
    var targetEl = event.target;
    if (targetEl.textContent === questionsArr[questionCount].answer){
        answerBox.textContent = "CORRECT!"
        answerBox.style = "display: block";
    }
    else{
        answerBox.style = "display: block";
        answerBox.textContent = "WRONG!"
        timeLeft = timeLeft - 2;
    }
    if(questionCount === questionsArr.length - 1){
        endQuiz();
        return;
    }
    questionCount++;
    quizLoop();
}
var endQuiz = function(){
    quesStart.style = "display: none";
    var score = timeLeft;
    timeLeft = null;
    quizEnd.style = "display: block";
    scoreHead.textContent = "You Scored: " + score + " points!";
    var userName = prompt("Enter your initials");
    var player = {
        id: playerCounter,
        name: userName,
        score: score
    }
    storePlayer(player);
    playerCounter++;

}
var highScores = function(){
    var score = timeLeft;
    timeLeft = null;
    beginQuiz.style = "display: none";
    quesStart.style = "display: none";
    quizEnd.style = "display: block";
    scoreHead.style = "display: none";
    showScores.style = "display: none";
    scoreButton.style = "display: none";
    getPlayers();
}

var storePlayer = function(obj){
    debugger;
    var playerObj = obj;
    var newArr = [];
    var oldArr = localStorage.getItem("player");
    if (oldArr === null){
        oldArr = [];
        oldArr.push(playerObj);
        localStorage.setItem("player", JSON.stringify(oldArr));
    }
    else{
        oldArr = JSON.parse(oldArr);
        newArr = oldArr;
        newArr.push(playerObj);
        localStorage.setItem("player", JSON.stringify(newArr));
    }
    
}
var getPlayers = function(){
    var players = localStorage.getItem("player");
    if (players === null){
        players = [];
        return false;
    }
    else{
        players = JSON.parse(players);
    }
    for(var i = 0; i < players.length; i++){
        var listItem = document.createElement("li");
        listItem.textContent = players[i].name + " --- " + players[i].score + " points";
        listEl.appendChild(listItem);
    }
}

showScores.onclick = highScores;
scoreButton.onclick = highScores;
btnStart.onclick = startQuiz;
buttonA.addEventListener("click",nextQuestion);
buttonB.addEventListener("click",nextQuestion);
buttonC.addEventListener("click",nextQuestion);
buttonD.addEventListener("click",nextQuestion);
