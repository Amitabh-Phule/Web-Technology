const quizData = [
    {
        question: "Which language runs in browser?",
        options: ["Java", "C", "Python", "JavaScript"],
        correct: 3
    },
    {
        question: "What does DOM stand for?",
        options: ["Document Object Model", "Data Object Method", "Desktop Mode", "Digital Model"],
        correct: 0
    },
    {
        question: "Which is used for styling?",
        options: ["HTML", "CSS", "JS", "Python"],
        correct: 1
    },
    {
        question: "Which is programming language?",
        options: ["HTML", "CSS", "JavaScript", "XML"],
        correct: 2
    },
    {
        question: "Which tag is used for button?",
        options: ["<btn>", "<button>", "<click>", "<input>"],
        correct: 1
    }
];

// Login elements
const loginScreen = document.getElementById("loginScreen");
const quizScreen = document.getElementById("quizScreen");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const startBtn = document.getElementById("startBtn");

// Quiz elements
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const scoreEl = document.getElementById("score");
const progressEl = document.getElementById("progress");

// Variables
let currentQuestion = 0;
let score = 0;
let answered = false;
let userName = "";

// Start Quiz
startBtn.addEventListener("click", () => {

    const name = nameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;

    if (name === "" || email === "" || password === "") {
        alert("Please fill all fields");
        return;
    }

    userName = name;

    loginScreen.style.display = "none";
    quizScreen.style.display = "block";

    loadQuestion();
});

// Load Question
function loadQuestion() {
    answered = false;
    nextBtn.style.display = "none";
    optionsEl.innerHTML = "";

    const current = quizData[currentQuestion];

    questionEl.innerText = current.question;

    progressEl.innerText =
        `Question ${currentQuestion + 1} / ${quizData.length}`;

    current.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.innerText = option;

        button.addEventListener("click", () => selectAnswer(index));

        optionsEl.appendChild(button);
    });
}

// Check Answer
function selectAnswer(index) {
    if (answered) return;

    answered = true;

    const correctIndex = quizData[currentQuestion].correct;
    const buttons = optionsEl.querySelectorAll("button");

    buttons.forEach((btn, i) => {
        if (i === correctIndex) {
            btn.classList.add("correct");
        }
        if (i === index && index !== correctIndex) {
            btn.classList.add("wrong");
        }
        btn.disabled = true;
    });

    if (index === correctIndex) {
        score++;
    }

    nextBtn.style.display = "block";
}

// Next Question
nextBtn.addEventListener("click", () => {
    currentQuestion++;

    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showResult();
    }
});

// Show Result
function showResult() {
    questionEl.innerText = `Quiz Finished, ${userName}!`;
    optionsEl.innerHTML = "";
    nextBtn.style.display = "none";

    const percent = Math.round((score / quizData.length) * 100);

    scoreEl.innerText = `Your Score: ${score}/${quizData.length} (${percent}%)`;
}