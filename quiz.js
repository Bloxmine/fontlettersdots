// Kahoot-style Quiz System
const questions = [
    {
        question: "What letter is shown?",
        choices: ["A", "B", "C", "D"],
        answer: 0,
        flipdot: "A"
    },
    {
        question: "Which is a vowel?",
        choices: ["B", "E", "G", "Z"],
        answer: 1,
        flipdot: "E"
    },
    {
        question: "What number is shown?",
        choices: ["1", "2", "3", "4"],
        answer: 2,
        flipdot: "3"
    }
];

let current = 0;
let score = 0;
let timer = null;
let timeLeft = 15;

const questionDisplay = document.getElementById('questionDisplay');
const answersDisplay = document.getElementById('answersDisplay');
const timerDisplay = document.getElementById('timerDisplay');
const scoreDisplay = document.getElementById('scoreDisplay');
const nextButton = document.getElementById('nextButton');

function showQuestion() {
    const q = questions[current];
    questionDisplay.innerHTML = `<div class='quiz-question'>${q.question}</div>`;
    answersDisplay.innerHTML = '';
    q.choices.forEach((choice, i) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-answer';
        btn.textContent = choice;
        btn.onclick = () => selectAnswer(i);
        answersDisplay.appendChild(btn);
    });
    timerDisplay.textContent = `Time left: ${timeLeft}s`;
    nextButton.style.display = 'none';
    renderFlipdot(q.flipdot);
    startTimer();
}

function selectAnswer(i) {
    stopTimer();
    const q = questions[current];
    if (i === q.answer) {
        score++;
        scoreDisplay.textContent = 'Correct! Score: ' + score;
    } else {
        scoreDisplay.textContent = 'Wrong! Score: ' + score;
    }
    Array.from(answersDisplay.children).forEach((btn, idx) => {
        btn.disabled = true;
        btn.classList.add(idx === q.answer ? 'correct' : 'incorrect');
    });
    nextButton.style.display = 'block';
}

function startTimer() {
    timeLeft = 15;
    timerDisplay.textContent = `Time left: ${timeLeft}s`;
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `Time left: ${timeLeft}s`;
        if (timeLeft <= 0) {
            stopTimer();
            selectAnswer(-1);
        }
    }, 1000);
}
function stopTimer() {
    if (timer) clearInterval(timer);
    timer = null;
}

nextButton.onclick = () => {
    current++;
    if (current < questions.length) {
        showQuestion();
    } else {
        questionDisplay.innerHTML = '<div class="quiz-question">Quiz Finished!</div>';
        answersDisplay.innerHTML = '';
        timerDisplay.innerHTML = '';
        scoreDisplay.innerHTML = 'Final Score: ' + score + ' / ' + questions.length;
        nextButton.style.display = 'none';
    }
};

function renderFlipdot(char) {
    // Optionally, you can use the flipdot canvas here
    // For now, just show the character as text
    let fd = document.getElementById('flipdotQuiz');
    if (!fd) {
        fd = document.createElement('div');
        fd.id = 'flipdotQuiz';
        fd.style.fontSize = '120px';
        fd.style.textAlign = 'center';
        fd.style.margin = '20px';
        questionDisplay.appendChild(fd);
    }
    fd.textContent = char;
}

// Start quiz
showQuestion();
