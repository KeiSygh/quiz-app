const instructionsDOM = document.querySelector("section#instructions");
const quizDOM = document.querySelector("section#quiz");
const questionDOM = document.querySelector("h2#question");
const optionsDOM = document.querySelector("div#options");
const scoreDOM = document.querySelector("section#score");
const userScoreDOM = document.querySelector("span#user-score");
const startBtnDOM = document.querySelector("button#start-btn");
const resultDOM = document.querySelector("span#result");
const countdownDOM = document.querySelector("span#countdown");
const intialsInputDOM = document.querySelector("input#user-initials");
const scoreSubmitButtonDOM = document.querySelector("button#score-submit-button");
const highscoreDOM = document.querySelector("section#highscores");
const highscoreListDOM = document.querySelector("ol#saved-scores");
const backButtonDOM = document.querySelector("button#back");
const clearScoresButtonDOM = document.querySelector("button#clear-scores");
const navScoresDOM = document.querySelector("a#leaderboard");


const questions = [
  {
    questionText: "Commonly used data types DO NOT include:",
    options: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
    answer: "3. alerts",
  },
  {
    questionText: "Arrays in JavaScript can be used to store ______.",
    options: [
      "1. numbers and strings",
      "2. other arrays",
      "3. booleans",
      "4. all of the above",
    ],
    answer: "4. all of the above",
  },
  {
    questionText:
      "String values must be enclosed within _____ when being assigned to variables.",
    options: ["1. commas", "2. curly brackets", "3. quotes", "4. parentheses"],
    answer: "3. quotes",
  },
  {
    questionText:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    options: [
      "1. JavaScript",
      "2. terminal/bash",
      "3. for loops",
      "4. console.log",
    ],
    answer: "4. console.log",
  },
  {
    questionText:
      "Which of the following is a statement that can be used to terminate a loop, switch or label statement?",
    options: ["1. break", "2. stop", "3. halt", "4. exit"],
    answer: "1. break",
  },
];
const maxTime = 61;


let questionIndex = 0;
let timeRemaining = maxTime;
let currentQuestion = null;
let quizTimer = null;


const renderQuestion = () => {
  optionsDOM.innerHTML = "";
  resultDOM.innerHTML = "";

  currentQuestion = questions[questionIndex];


  questionDOM.textContent = currentQuestion.questionText;

  currentQuestion.options.forEach(answer => {
    const option = document.createElement("button");

    option.textContent = answer;

    option.addEventListener("click", function (event) {
      const targetButton = event.target;

      
      if (targetButton.textContent === currentQuestion.answer){
        resultDOM.textContent = "correct";
      } else {
        resultDOM.textContent = "incorrect";
        timeRemaining -= 10;
      } 

      setTimeout(() => {
        if (questionIndex <= questions.length - 1 ){
          renderQuestion();
        } else {
          clearInterval(quizTimer);
          renderScore();
        }
      }, 1300);
    });

    optionsDOM.append(option);
  });
  
  if ((questionIndex < questions.length) && (timeRemaining > 0)) {
    questionIndex++;
  }
}

const renderScore = () => {
  quizDOM.classList.toggle("hidden");
  scoreDOM.classList.toggle("hidden");

  countdownDOM.textContent = 0;
  userScoreDOM.textContent = timeRemaining;
}

const renderHighScores = () => {

  highscoreDOM.classList.remove("hidden");
  scoreDOM.classList.add("hidden");
  highscoreListDOM.innerHTML = "";

  let savedScores = localStorage.getItem("highscores") ? localStorage.getItem("highscores").split(";") : [];

  savedScores.forEach(item => {
    const listItem = document.createElement("li");
    listItem.textContent = `${item.split(":")[0]}  -  ${item.split(":")[1]}`;
    highscoreListDOM.appendChild(listItem);
  })
}


backButtonDOM.addEventListener("click", () => {
  highscoreDOM.classList.toggle("hidden");
  instructionsDOM.classList.toggle("hidden");
})

clearScoresButtonDOM.addEventListener("click", () => {
  localStorage.setItem("highscores", "");
  renderHighScores();
})

navScoresDOM.addEventListener("click", () => {
  clearInterval(quizTimer);
  countdownDOM.textContent = 0;

  instructionsDOM.classList.add("hidden");
  quizDOM.classList.add("hidden");
  scoreDOM.classList.add("hidden");

  highscoreDOM.classList.remove("hidden");
  renderHighScores()
})

scoreSubmitButtonDOM.addEventListener("click", function() {

  const userInitials = intialsInputDOM.value;
  const userScore = timeRemaining;

  let savedScores = localStorage.getItem("highscores") ? localStorage.getItem("highscores").split(";") : [];

  savedScores.push(`${userInitials}:${userScore}`)

  localStorage.setItem("highscores", savedScores.join(';'))

  renderHighScores()
})


startBtnDOM.addEventListener("click", function () {
  instructionsDOM.classList.toggle("hidden");
  quizDOM.classList.toggle("hidden");

  questionIndex = 0;
  timeRemaining = maxTime;

  quizTimer = setInterval(() => {
    if (timeRemaining > 0){
      timeRemaining--;
    } else  {
      clearInterval(quizTimer);
      renderScore();
    }
    countdownDOM.textContent = timeRemaining;
  }, 1000)

  renderQuestion();
})

