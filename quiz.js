// select all elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

// create our questions
let questions = [
    {
        question : "National game of India is",
        imgSrc : "hockey.jpg",
        choiceA : "Cricket",
        choiceB : "Hockey",
        choiceC : "Badminton",
        correct : "B"
    },{
        question : "The Constitution of India came into force on …",
        imgSrc : "c).jpg",
        choiceA : "August 15, 1947",
        choiceB : "January 26, 1952 ",
        choiceC : "January 26, 1950",
        correct : "C"
    },{
        question : "Who was the first Indian who received the Bharat Ratna Award?",
        imgSrc : "s.radhkrishnan.jpg",
        choiceA : "S. Radhakrishnan",
        choiceB : "Dr. Nagendra Singh",
        choiceC : "Shankar Shwarup",
        correct : "A"
    },{
        question : "Kirti Stambh is located in …",
        imgSrc : "kirti_stambh.jpg",
        choiceA : "Rajasthan",
        choiceB : "Maharastra",
        choiceC : "Tamil Nadu",
        correct : "A"
    },{
        question : "Who is this actor?",
        imgSrc : "Sunny_deol_2012.jpg",
        choiceA : "Sunny Deol",
        choiceB : "Rajinikanth",
        choiceC : "Amitabh Bachchan",
        correct : "A"
    },{
        question : "Who won nobel prize 2 times? (Hint : He/she won in the field of science and belongs to poland)",
        imgSrc : "marie_curie.jpg",
        choiceA : "Albert Einstein",
        choiceB : "Maria Goeppert Mayer",
        choiceC : "Marie Curie",
        correct : "C"
    },{
        question : "First Indian cricketer to score a century in IPL",
        imgSrc : "ipl.png",
        choiceA : "Gautam Gambhir",
        choiceB : "Manish Pandey",
        choiceC : "Sachin Tendulkar",
        correct : "B"
    }
];

// create some variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 15; // 10s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// render a question
function renderQuestion(){
    let q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    qImg.innerHTML = "<img src="+ q.imgSrc +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click",startQuiz);

// start quiz
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}

// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// counter render

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnwer

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    }else{
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score render
function scoreRender(){
    scoreDiv.style.display = "block";
    
    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score/questions.length);
    
    // choose the image based on the scorePerCent
    let img = (scorePerCent >= 80) ? "img/5.png" :
              (scorePerCent >= 60) ? "img/4.png" :
              (scorePerCent >= 40) ? "img/3.png" :
              (scorePerCent >= 20) ? "img/2.png" :
              "img/1.png";
    
    scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
}





















