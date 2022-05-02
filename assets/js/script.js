
// button elements
const startButton = document.getElementById('start-btn');
const choiceContainerEl = document.getElementById('choice-buttons');
const answerButtonEL = document.getElementById('answer-button');

// container elements
const questionContainerEl = document.getElementById('questions-container');
const startContainerEL = document.getElementById('start-container');
const scoreContainerEl = document.getElementById('score-container');
const leaderboardEl = document.getElementById('leaderboard');

// results elements
const resultDiv = document.querySelector("#result-div");
const resultText = document.querySelector("#result-text");

let shuffledQuestions;
let currentQuestion = 0;
var intervalID;
var time;

// Function for starting the quiz
function startQuiz() {
    console.log("started");
    //to hide all containers
    hideContainers();

    // To reveal question container
    questionContainerEl.removeAttribute("hidden");
   
    
    // To provide random questions and to make sure question starts at 0 when reset
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestion = 0;
    showQuestion();

    // set total time/score depending on number of questions
    time = questions.length * 15;
    
    // To start the timer when quiz begins
    intervalID = setInterval(startTimer, 1000);
    
    displayTime();
    
};

// array of questions and answers
var questions = [
    {
        question: "What is the supreme law of the land?",
        choices: [
            'the Constitution',
            'the Preamble',
            'the Declearation of Independence',
            'the Star-Spangled Banner'],
        answer:'the Constitution'

    },
    {
        question: "What do we call the first ten amendments to the Constitution?",
        choices: [
            'the Declearation of Independence',
            'the Preamble',
            'the Bill of Rights',
            'the Articles of Federation'],
        answer:'the Bill of Rights'
    },
    {
        question: "How many amendments does the Constitution have?",
        choices: [
            'thirty-two (32)',
            'twenty-seven (27)',
            'ten (10)',
            'one hundred (100)'],
        answer:'twenty-seven (27)'
    },
    {
        question: "How many U.S. Senators are there?",
        choices: [
            'two hundred (200)',
            'one hundred (100)',
            'fifty (50)',
            'four hundred thirty-five (435)', ],
        answer:'one hundred (100)'
    },
    {
        question: "What is the highest court in the United States?",
        choices: [
            'the White House',
            'Capital Hill',
            'Independece Hall',
            'the Supreme Court'],
        answer:'the Supreme Court'
    },
    {
        question: "Who is the “Father of Our Country”?",
        choices: [
            'Abraham Lincon',
            'Benjamin Franklin',
            'George Washington',
            'Thomas Jefferson'],
        answer:'George Washington'
    },
    {
        question: "What is the capital of the United States?",
        choices: [
            'Washington, D.C.',
            'Philidelphia, PA',
            'New York City, NY',
            'Los Angeles, CA'],
        answer:'Washington, D.C.'
    },
    {
        question: "What is the name of the national anthem?",
        choices: [
            'Born in the USA',
            'My Country Tis of Thee',
            'America the Beautiful',
            'The Star-Spangled Banner'],
        answer:'The Star-Spangled Banner'
    },
    {
        question: "When was the Constitution written?",
        choices: [
            '1776',
            '1787',
            '1865',
            '1945'],
        answer:'1787'
    },
    {
        question: "When was the Declaration of Independence adopted?",
        choices: [
            'September 17, 1787',
            'Decemeber 25, 1776',
            'July 4, 1776',
            'September 3, 1783'],
        answer:'July 4, 1776'
    },
]

//function to hide all containers
function hideContainers() {
    startContainerEL.setAttribute("hidden", true);
    questionContainerEl.setAttribute("hidden", true);
    scoreContainerEl.setAttribute("hidden", true);
    leaderboardEl.setAttribute("hidden", true);
};

// display the question and answer options for the current question
function showQuestion () {
   let question = questions[currentQuestion];
   let choices = question.choices;

   let h2QuestionEl = document.querySelector('#question');
   h2QuestionEl.textContent = question.question;
   for (let i = 0; i < choices.length; i++) {
       let choice = choices[i];
       let choiceButton = document.querySelector('#choice' + i)
       choiceButton.textContent = choice;
   };

};

// when answer button is clicked, it will run the check answer function to see if it correct
document.querySelector('#choice-buttons').addEventListener('click', checkAnswer);

// compare text content of the choices for the current question answer
function correctChoice(choiceButton) {
    console.log(questions[currentQuestion].answer)
    return choiceButton.textContent === questions[currentQuestion].answer;
};
function checkAnswer (eventObject) {
    let choiceButton = eventObject.target;
    
    if (correctChoice(choiceButton)){
        choiceButton.style.backgroundColor = '#499F68';
        setTimeout(nextQuestion,500);
    } else {
        choiceButton.style.backgroundColor = '#DF5E6B';
        setTimeout(nextQuestion,500);
        if (time >=10) {
            time = time - 10;
            displayTime()
        } else {
            // in case time is less than 5 seconds, end quiz
            time = 0;
            displayTime;
            endQuiz();
        }
    }  

}

// to remove background style before nextQuestion
function hideResultBackground() {
    var choiceEl0 = document.getElementById('choice0')
    choiceEl0.style.backgroundColor = null;

    var choiceEl1 = document.getElementById('choice1')
    choiceEl1.style.backgroundColor = null;
    
    var choiceEl2 = document.getElementById('choice2')
    choiceEl2.style.backgroundColor = null;
    
    var choiceEl3 = document.getElementById('choice3')
    choiceEl3.style.backgroundColor = null;
}

// upon clicking answer, will launch next question
function nextQuestion() {
    
    ++currentQuestion;

    if (currentQuestion < questions.length) {
    showQuestion(shuffledQuestions[currentQuestion]);
    hideResultBackground();
    } else {
        endQuiz();
    }
}


// end quiz
function endQuiz() {
    clearInterval(intervalID);
    hideContainers();
    hideResultBackground();
    scoreContainerEl.removeAttribute("hidden");
}


//to display score container and hide all others
const score = document.getElementById('score');
const submitButton = document.getElementById('submit-btn');
const inputInitials = document.getElementById('initials');

//event to submit score and initials
submitButton.addEventListener('click', storeScore);

function storeScore(event) {
    // prevent default behavior of form submissions
    event.preventDefault();

    // check for input
    if (!inputInitials.value) {
        alert("Hold on there! Enter your initials before hitting 'Submit'")
        return;
    }

    //Store score and initials in an object
    let leaderBoardItem = {
        initials: inputInitials.value,
        score: time,
    };

    updateStoredLeaderBoard(leaderBoardItem);

    //hide all containers and display leaderboard
    hideContainers();
    leaderboardEl.removeAttribute("hidden");
    renderLeaderboard();

};

// updates leaderboard and saved in local storage
function updateStoredLeaderBoard(leaderBoardItem) {
    let leaderboardArray = getLeaderboard();
    
    // append new leaderboard item to leaderboard array
    leaderboardArray.push(leaderBoardItem);
    localStorage.setItem("leaderboardArray", JSON.stringify(leaderboardArray));
};

//get "leaderboardArray" from local storage (if it exists) and parse it into a javascript object using JSON.parse
function getLeaderboard() {
    let storedLeaderboard = localStorage.getItem("leaderboardArray");
    if (storedLeaderboard !== null) {
      let leaderboardArray = JSON.parse(storedLeaderboard);
      return leaderboardArray;
    } else {
      leaderboardArray = [];
    }
    return leaderboardArray;
  };

//display leaderboard on leaderboard container
function renderLeaderboard() {
    let sortedLeaderboardArray = sortLeaderboard();
    const highscoreList = document.querySelector("#highscore-list");
    highscoreList.innerHTML = "";
    for (let i = 0; i < sortedLeaderboardArray.length; i++) {
      let leaderboardEntry = sortedLeaderboardArray[i];
      let newListItem = document.createElement("li");
      newListItem.textContent =
        leaderboardEntry.initials + " - " + leaderboardEntry.score;
      highscoreList.append(newListItem);
    }
};

  //sort leaderboard array from highest to lowest
function sortLeaderboard() {
    let leaderboardArray = getLeaderboard();
    if (!leaderboardArray) {
      return;
    }
  
    leaderboardArray.sort(function (a, b) {
      return b.score - a.score;
    });
    return leaderboardArray;
};

const clearButton = document.querySelector("#clear-btn");
clearButton.addEventListener("click", clearHighscores);

// clear local storage and display empty learderboard
function clearHighscores () {
    localStorage.clear();
    renderLeaderboard();
};


const backButton = document.getElementById('back-btn');
backButton.addEventListener('click', returnToStart);

// hide leaderboard container to show start container
function returnToStart() {
    hideContainers();
    startContainerEL.removeAttribute('hidden');
}; 

// Link to view highscore from any container
const leaderboardLink = document.getElementById('highScores');
leaderboardLink.addEventListener('click', showLeaderboard);

function showLeaderboard() {
    hideContainers();
    leaderboardEl.removeAttribute("hidden");

    // stop countdown
    clearInterval(intervalID);

    // assign undefined to time 
    time = undefined;

    // display leaderboard
    renderLeaderboard();

};

// Timer coundown
function startTimer() {
    time--;
    displayTime()
    if (time < 1) {
        endQuiz();
    }
};
const timeDisplay = document.querySelector("#timer")
function displayTime() {
    timeDisplay.textContent = time;
}

// main event listener
startButton.addEventListener('click', startQuiz);
