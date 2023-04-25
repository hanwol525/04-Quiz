// NEED:
// start button 
//         X- default/start screen = big start button
//         X- when clicked: timer starts and first question is displayed
// timer
//         X- counts down from 100
//         X- stops counting down at the last question
//         X- records value of time remaining for high score
//          - need to implement some kind of delay (maybe when quesIteration=0 or smth) for the questiongen to match timer
// questions
//         X- multiple choice questions - maybe use hidden displays or create html? idk
//         X- answers advance to the next question when clicked
//         X- answers are classified as right answers and wrong answers
//         X- right answers only advance/display "correct"; wrong answers advance and deduct time/display "wrong"
//              X- event listeners for clicking on right/wrong answers with timer reaction for wrong answers
// score box that logs value of time remaining as ur "score"
//          X- function to stop timer at last button click and log the score (for now: console)
//          X- smth to display score (createElement some kinda display box)
// local storage stuff to store names/high scores 
//          X- some kind of box to enter initials
// way to display scores from local storage
//          X- a "try again?" button that loops back to the start of the game
// style lol
//          - prob wanna go thru and have some kinda createElement thing instead of hard coding buttons
// comments and a readme



// global variable declarations:

    // start button variable
var start = document.getElementById("start");

    // question variables
var questionSec = document.getElementById("questions");
var ques1 = document.getElementById("question");
var quesIteration = 0;
var questions = [
    //0
    {
        question: "Which of these selectors represents an element's class in CSS?",
        answers: [".", "#", "$", ";"],
        // correctAnswer: "why",
    },
    //1
    {
        question: "h?",
        answers: ["No", "No", "Yes", "No"],
        correctAnswer: ".",
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
        answers: ["why", "Yes", "No", "No"],
        correctAnswer: "Yes",
    },
    // 10
    {
        question: "",
        answers: [],
        correctAnswer: "No",
    }
];

    // timer/scoreboard variables
var scoreSec = document.getElementById("score");
var highScore = [];
var timer = document.getElementById("timer");
var secondsLeft = 100;
var initials = [];

// generates/adds an event listener to the start button
function startBtn (){
    start.innerHTML = '';
    start.style.display = "flex";
    var startBtn = document.createElement("button");
    startBtn.textContent = "Start!"
    startBtn.addEventListener("click", function() {
        timerStart()
    })
    startBtn.className = "startBtn";
    start.append(startBtn);
};

// maybe add smth that displays previous score/initials on start screen

// call
startBtn();

// starts/counts timer down
function timerStart() {
    start.innerHTML = '';
    questionSec.style.display = "flex";
    start.style.display = "none";
    var timeRemaining = setInterval (function countdown() {
        if (secondsLeft > 0){
            secondsLeft--;};

        timer.textContent = "You have " + secondsLeft + " seconds remaining!";

        if (secondsLeft <= 0) {
            secondsLeft = 0;
            clearInterval(timeRemaining);
        };

        // if (secondsLeft === 0) {
        //     timesUp();
        // }

        if (quesIteration > 9){
            clearInterval(timeRemaining);
            logScore();
            showScore();
        } else if (secondsLeft === 0) {
            timesUp();
        };
    }, 1000);
    questionGen();
};

// generates HTML for questions/answer buttons
function questionGen(){
    ques1.innerHTML = '';
    var questionHead = document.createElement("h2");
    questionHead.textContent = questions[quesIteration].question;
    ques1.append(questionHead);

    for (var i = 0; i < questions[quesIteration].answers.length; i++){
        var btn = document.createElement("button");
        btn.className = "button";
        btn.textContent = questions[quesIteration].answers[i];
        btn.addEventListener("click", buttonClick);
        ques1.append(btn);
    };
};

// questionGen() iterations 
function buttonClick(){

    if (quesIteration <= 9){
        quesIteration++;
    }; 

    for (var i = 0; i <= questions.length; i++){
        questionGen()
    };

    if (this.textContent !== questions[quesIteration].correctAnswer) {
        secondsLeft -= 10;

        if (secondsLeft < 0){
            secondsLeft = 0
        };
    } else {

    };

};

// logs score at the completion of the quiz
function logScore (){
    toString(secondsLeft);
    highScore.push(secondsLeft);
    localStorage.setItem('score', JSON.stringify(highScore));
};

// displays final score and prompts user to input initials
function showScore (){
    ques1.innerHTML = '';
    scoreSec.innerHTML = '';

    var scoreDisplay = document.createElement("p");
    scoreDisplay.textContent = "Congratulations! You have completed the quiz. Your score for this attempt is: " + highScore.join('') + ".";
    scoreDisplay.className = "scoreDisplay";
    scoreSec.append(scoreDisplay);

    var initialPrompt = document.createElement("p");
    initialPrompt.textContent = "Enter your initials below to save your score!";
    initialPrompt.className = "initialPrompt";
    scoreSec.append(initialPrompt);

    var initialBox = document.createElement("textarea");
    initialBox.textContent = '';
    initialBox.className = "textbox";
    scoreSec.append(initialBox);

    var initialSubmit = document.createElement("button");
    initialSubmit.style.display = "block";
    initialSubmit.textContent = "Save";
    initialSubmit.className = "initialSubmit";
    initialSubmit.addEventListener("click", function () {
        initials.push(initialBox.value);
        localStorage.setItem('initials', JSON.stringify(initials));
        scoreBoard();
    });
    scoreSec.append(initialSubmit);
};

// displays "Time's up!" msg and prompts user to try again
function timesUp (){
    ques1.innerHTML = '';
    scoreSec.innerHTML = '';

    var timesupMsg = document.createElement("p");
    timesupMsg.textContent = "Oh no! You have run out of time. Click below to try again!";
    scoreSec.append(timesupMsg);

    var retryBtn = document.createElement("button");
    retryBtn.textContent = "Try again?";
    retryBtn.style.display = "block";
    retryBtn.className = "retryBtn";
    retryBtn.addEventListener("click", function(){
        location.reload();
    });
    scoreSec.append(retryBtn);
};

// creates the scoreboard using locally stored items and prompts user to try again
function scoreBoard (){
    scoreSec.innerHTML = '';
    timer.innerHTML = '';
    var yourScore = JSON.parse(localStorage.getItem('score'));
    var yourInitials = JSON.parse(localStorage.getItem('initials'));

    var scoreboardText = document.createElement("h2");
    scoreboardText.textContent = "Your result:"
    scoreSec.append(scoreboardText);

    var yourscoreText = document.createElement("h3");
    yourscoreText = yourScore;
    // give a class for styling
    scoreSec.append(yourscoreText);

    var yourinitialsText = document.createElement("h3");
    yourinitialsText = yourInitials;
    // give a class for styling
    scoreSec.append(yourinitialsText);

    var redoBtn = document.createElement("button");
    redoBtn.textContent = "Try again?";
    redoBtn.className = "redoBtn";
    redoBtn.style.display = "block";
    redoBtn.addEventListener("click", function(){
        location.reload();
    });
    scoreSec.append(redoBtn);
};