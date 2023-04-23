// NEED:
// start button 
//         X- default/start screen = big start button
//         X- when clicked: timer starts and first question is displayed
// timer
//         X- counts down from 100
//         - stops counting down at the last question
//         - records value of time remaining for high score
// questions
//         - multiple choice questions - maybe use hidden displays or create html? idk
//         - answers advance to the next question when clicked
//         - answers are classified as right answers and wrong answers
//         - right answers only advance/display "correct"; wrong answers advance and deduct time/display "wrong"
//              - event listeners for clicking on right/wrong answers with timer reaction for wrong answers
// score box that logs value of time remaining as ur "score"
// local storage stuff to store names/high scores 
// way to display scores from local storage

// global variable declarations:

    // start button variable
var startBtn = document.getElementById("start-btn");

    // question variables
var questionSec = document.getElementById("questions");
var ques1 = document.getElementById("ques1");
var ques2 = document.getElementById("ques2");
var ques3 = document.getElementById("ques3");
var ques4 = document.getElementById("ques4");
var ques5 = document.getElementById("ques5");
var correctChoice = document.querySelectorAll(".correct");
var incorrectChoice = document.querySelectorAll(".incorrect");

    // timer/score variables
var timer = document.getElementById("timer");
var secondsLeft = 20; // ONLY 10SEC FOR TEST PURPOSES--CHANGE TO 100 LATER
var highScore = []; // BLANK ARRAY TO PUSH TIMER TXT CONTENT TO AFTER ALL Q'S DONE


// event listener for clicking the start button with timer start/question display functions
startBtn.addEventListener("click", function(){
    document.getElementById("start").style.display = "none";
    questionSec.style.display = "flex";
    timerStart();
} );


// function for starting and counting timer down
function timerStart () {
    var timeRemaining = setInterval (function() {
        secondsLeft--;
        timer.textContent = "You have " + secondsLeft + " seconds remaining!";

        if (secondsLeft === 0) {
            clearInterval(timeRemaining);
            console.log("hold this L idiot LMAOOOOOO get good"); // CHANGE TO A REAL MSG LOL
        }
    }, 1000)
};