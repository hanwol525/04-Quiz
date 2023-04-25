// NEED:
// start button 
//         X- default/start screen = big start button
//         X- when clicked: timer starts and first question is displayed
// timer
//         X- counts down from 100
//         X- stops counting down at the last question
//         X- records value of time remaining for high score
// questions
//         X- multiple choice questions - maybe use hidden displays or create html? idk
//         X- answers advance to the next question when clicked
//         X- answers are classified as right answers and wrong answers
//         X- right answers only advance/display "correct"; wrong answers advance and deduct time/display "wrong"
//              X- event listeners for clicking on right/wrong answers with timer reaction for wrong answers
// score box that logs value of time remaining as ur "score"
// local storage stuff to store names/high scores 
// way to display scores from local storage
// style lol



// global variable declarations:

    // start button variable
var startBtn = document.getElementById("start-btn");

    // question variables
var questionSec = document.getElementById("questions");
var ques1 = document.getElementById("question");
var quesIteration = 0;
var questions = [
    //0
    {
        question: "o?",
        answers: ["Yes", "No", "No", "No"],
        correctAnswer: "Yes",
    },
    //1
    {
        question: "h?",
        answers: ["No", "No", "Yes", "No"],
        correctAnswer: "Yes",
    },
    //2
    {
        question: "f?",
        answers: ["No", "Yes", "No", "No"],
        correctAnswer: "Yes",
    },
    //3
    {
        question: "u?",
        answers: ["No", "No", "Yes", "No"],
        correctAnswer: "Yes",
    },
    //4
    {
        question: "c?",
        answers: ["No", "No", "No", "Yes"],
        correctAnswer: "Yes",
    },
    //5
    {
        question: "k?",
        answers: ["Yes", "No", "No", "No"],
        correctAnswer: "Yes",
    },
    //6
    {
        question: "l?",
        answers: ["Yes", "No", "No", "No"],
        correctAnswer: "Yes",
    },
    //7
    {
        question: "m?",
        answers: ["No", "Yes", "No", "No"],
        correctAnswer: "Yes",
    },
    //8
    {
        question: "a?",
        answers: ["No", "No", "Yes", "No"],
        correctAnswer: "Yes",
    },
    //9
    {
        question: "o?",
        answers: ["No", "Yes", "No", "No"],
        correctAnswer: "Yes",
    }
];

    // timer/score variables
var timer = document.getElementById("timer");
var secondsLeft = 100; // ONLY 10SEC FOR TEST PURPOSES--CHANGE TO 100 LATER


// event listener for clicking the start button with timer start/question display functions
startBtn.addEventListener("click", function(){
    document.getElementById("start").style.display = "none";
    timerStart();
    questionGen();
} );


// function for starting and counting timer down
function timerStart() {
    var timeRemaining = setInterval (function() {

        if (secondsLeft > 0){
            secondsLeft--;};

        timer.textContent = "You have " + secondsLeft + " seconds remaining!";

        if (secondsLeft <= 0) {
            secondsLeft = 0;
            clearInterval(timeRemaining);
        };

        if (quesIteration >= 9){
            clearInterval(timeRemaining);
            logScore();
        };
    }, 1000);
};

// function that logs the score at the completion of the quiz
function logScore (){
    toString(secondsLeft);
    console.log(secondsLeft);
}

// function that generates HTML for the questions/buttons
function questionGen(){
    ques1.innerHTML = '';
    var questionHead = document.createElement("h2");
    questionHead.textContent = questions[quesIteration].question;
    ques1.append(questionHead);

    for (var i = 0; i < questions[quesIteration].answers.length; i++){
        var btn = document.createElement("button");
        btn.textContent = questions[quesIteration].answers[i];
        btn.addEventListener("click", buttonClick);
        ques1.append(btn);
    };
}

// function for questionGen() iterations 
function buttonClick(){

    if (quesIteration < 9){
        quesIteration++;
    } 

    for (var i = 0; i < questions.length; i++){
        questionGen()
    };

    if (this.textContent !== questions[quesIteration].correctAnswer) {
        secondsLeft -= 10;

        if (secondsLeft < 0){
            secondsLeft = 0
        };
    };

};