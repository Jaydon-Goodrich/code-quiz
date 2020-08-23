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
var hsTitle = document.getElementById("hs-title");
var timeLeft = 90;
var playersArr = [];
var playerCounter = 0;
var questionCount = 0;
var lastClick = "";
var questionsArr = [
    { q: "Which of the following type of variable is visible everywhere in your JavaScript code?", a: "Global Variable", b: "Local Variable", c: "Both of the above", d: "None of the above", answer: "Global Variable"},
    { q: "Which of the following type of variable takes precedence over other if names are same?", a: "Global Variable", b: "Local Variable", c: "Both of the above", d: "None of the above", answer: "Local Variable"},
    { q: "Which of the following is not a valid JavaScript variable name?", a: "2names", b: "_first_and_last_names", c: "FirstAndLast", d: "None of the above", answer: "2names"},
    { q: "What are variables used for in JavaScript Programs?", a: "Storing numbers, dates, or other values", b: "Varying randomly", c: "Causing high-school algebra flashbacks", d: "None of the above", answer: "Storing numbers, dates, or other values"},
    { q: "Inside which HTML element do we put the JavaScript?", a: "<js>", b: "<scripting>", c: "<script>", d: "<javascript>", answer: "<script>"},
    { q: "Which of the following are capabilities of functions in JavaScript?", a: "Return a value", b: "Accept parameters and Return a value", c: "Accept parameters", d: "None of the above", answer: "Accept parameters"},
    { q: "What syntax is used when creating an array in JavaScript?", a: "<>", b: "{}", c: "[]", d: "!", answer: "[]"},
    { q: "What syntax is used when creating an object in JavaScript?", a: "<>", b: "{}", c: "[]", d: "!", answer: "{}"},
    { q: "what is a valid keyword to create a variable?", a: "var", b: "let", c: "const", d: "all of the above", answer: "all of the above"},
    { q: "Which are valid keywords to follow a if statement?", a: "then", b: "when", c: "next", d: "else", answer: "else"}];

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
        timeLeft = timeLeft - 10;
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
    hsTitle.style = "display: none";
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
