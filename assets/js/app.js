var timerEl = document.getElementById("time-left");
var timeLeft = 10;

var countDown = function(){
    timerEl.textContent = "Time: " + timeLeft;
    var timeInterval = setInterval(function() {
    if(timeLeft > 0){
        timeLeft--;
        timerEl.textContent = "Time: " + timeLeft;
    }
    if(timeLeft === 0){
        console.log("This worked");
        clearInterval(timeInterval);
    }

    }, 1000);
}


countDown();