var timerEl = document.getElementById("time-left");
var beginQuiz = document.getElementById("quiz-beg");
var quesStart = document.getElementById("question-start");
var btnStart = document.getElementById("begin-btn");
var buttonA = document.getElementById("btn-a");
var buttonB = document.getElementById("btn-b");
var buttonC = document.getElementById("btn-c");
var buttonD = document.getElementById("btn-d");
var questionHead = document.getElementById("question-header");
var timeLeft = 10;
var questionCount = 0;
var questionsArr = [
    { q: "What color is the sky?", a: "blue", b: "green", c: "black", d: "red"},
    { q: "Quesiton2", a: "blue", b: "green", c: "black", d: "red"},
    { q: "Question3", a: "blue", b: "green", c: "black", d: "red"},
    { q: "Question4", a: "blue", b: "green", c: "black", d: "red"},
    { q: "Question5", a: "blue", b: "green", c: "black", d: "red"},
    { q: "Question6", a: "blue", b: "green", c: "black", d: "red"},
    { q: "Question7", a: "blue", b: "green", c: "black", d: "red"},
    { q: "Question8", a: "blue", b: "green", c: "black", d: "red"},
    { q: "Question9", a: "blue", b: "green", c: "black", d: "red"},
    { q: "Question10", a: "blue", b: "green", c: "black", d: "red"}];

var countDown = function(){
    timerEl.textContent = "Time: " + timeLeft;
    var timeInterval = setInterval(function() {
    if(timeLeft > 0){
        timeLeft--;
        timerEl.textContent = "Time: " + timeLeft;
    }
    if(timeLeft === 0){
        clearInterval(timeInterval);
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
var nextQuestion = function(){
    if(questionCount === questionsArr.length - 1){
        endQuiz();
        return;
    }
    questionCount++;
    quizLoop();
}


btnStart.onclick = startQuiz;
buttonA.addEventListener("click",nextQuestion);
buttonB.addEventListener("click",nextQuestion);
buttonC.addEventListener("click",nextQuestion);
buttonD.addEventListener("click",nextQuestion);
console.log(questionsArr.length);