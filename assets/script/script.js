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
        question: "Which of these operators represents strict equality?",
        answers: ["===", "==", "||", "="],
    },
    //1
    {
        question: "When do locally stored items expire?",
        answers: ["After 24 hours", "After 1 year", "Never", "After 5 minutes"],
        correctAnswer: "===",
    },
    //2
    {
        question: "Which method can you use to prevent even bubbling?",
        answers: ["constrainEvent()", "stopPropagation()", "stopBubbling()", "preventDefault()"],
        correctAnswer: "Never",
    },
    //3
    {
        question: "Which of these is NOT a primitive data type?",
        answers: ["String", "Number", "Undefined", "Object"],
        correctAnswer: "stopPropagation()",
    },
    //4
    {
        question: "Which method can we use to retrieve all elements within a certain class?",
        answers: ["querySelector()", "getElementByID()", "querySelectorAll()", "getElementByClass()"],
        correctAnswer: "Object",
    },
    //5
    {
        question: "What does 'DOM' stand for?",
        answers: ["Document Object Model", "Document Organization Method", "Document Option Model", "Document Organization Mode"],
        correctAnswer: "querySelectorAll()",
    },
    //6
    {
        question: "An array's index, by default, begins at:",
        answers: ["-1", "0", "1", "10"],
        correctAnswer: "Document Object Model",
    },
    //7
    {
        question: "A variable defined within a function is defined:",
        answers: ["Globally", "Functionally", "Locally", "Universally"],
        correctAnswer: "0",
    },
    //8
    {
        question: "console.log('42') will log a(n):",
        answers: ["Number", "Object", "Boolean", "String"],
        correctAnswer: "Locally",
    },
    //9
    {
        question: "Which of these is NOT an example of a keyboard event?",
        answers: ["Keyup", "Touchstart", "Keypress", "Keydown"],
        correctAnswer: "String",
    },
    // 10
    {
        question: "",
        answers: [],
        correctAnswer: "Touchstart",
    }
];

    // timer/scoreboard variables
var scoreSec = document.getElementById("score");
var highScore = [];
var timer = document.getElementById("timer");
var secondsLeft = 100;
var initials = [];
var prevScore = document.getElementById("lastScore");
var prevscoreDisplay = [];
var previnitialsDisplay = [];

// start button
function startBtn (){
    start.innerHTML = '';
    start.style.display = "flex";
    var startBtn = document.createElement("button");
    startBtn.textContent = "Start!"
    startBtn.addEventListener("click", function() {
        timerStart();
        questionGen();
    })
    startBtn.className = "startBtn";
    start.append(startBtn);
};

// call
startBtn();

// timer/countdown
function timerStart() {
    start.innerHTML = '';
    questionSec.style.display = "flex";
    start.style.display = "none";
    timer.textContent = "You have 100 seconds remaining!" 
    var timeRemaining = setInterval (function countdown() {
        if (secondsLeft > 0){
            secondsLeft--;};

        timer.textContent = "You have " + secondsLeft + " seconds remaining!";

        if (secondsLeft <= 0) {
            secondsLeft = 0;
            clearInterval(timeRemaining);
        };

        if (quesIteration > 9){
            clearInterval(timeRemaining);
            logScore();
            showScore();
        } else if (secondsLeft === 0) {
            timesUp();
        };
    }, 1000);
};

// questions/answer buttons
function questionGen(){
    ques1.innerHTML = '';
    var questionHead = document.createElement("h2");
    questionHead.className = "questionHead";
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

// local storage log
function logScore (){
    toString(secondsLeft);
    highScore.push(secondsLeft);
    localStorage.setItem('score', JSON.stringify(highScore));
};

// final score display/initial prompts
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

// "time's up!" msg
function timesUp (){
    ques1.innerHTML = '';
    scoreSec.innerHTML = '';

    var timesupMsg = document.createElement("p");
    timesupMsg.textContent = "Oh no! You have run out of time. Click below to try again!";
    timesupMsg.className = "timesupMsg";
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

// local storage scoreboard
function scoreBoard (){
    scoreSec.innerHTML = '';
    timer.innerHTML = '';
    var yourScore = JSON.parse(localStorage.getItem('score'));
    var yourInitials = JSON.parse(localStorage.getItem('initials'));

    var scoreboardText = document.createElement("h2");
    scoreboardText.textContent = "Your result:";
    scoreboardText.className = "scoreboardText";
    scoreSec.append(scoreboardText);

    var yourscoreText = document.createElement("p");
    yourscoreText.textContent = "Score: " + yourScore;
    yourscoreText.className = "yourscoreText";
    scoreSec.append(yourscoreText);

    var yourinitialsText = document.createElement("p");
    yourinitialsText.textContent = "Initials: " + yourInitials;
    yourinitialsText.className = "yourinitialsText";
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