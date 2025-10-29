let questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "Madrid", "Rome", "Berlin"],
    correct: 0
  },
  {
    question: "Which planet is known as the Red Planet?",
    choices: ["Earth", "Mars", "Venus"],
    correct: 1
  },
  {
    question: "What does CPU stand for?",
    choices: ["Central Process Unit", "Central Processing Unit", "Computer Processing Utility"],
    correct: 1
  },
  {
    question: "2 + 2 × 2 = ?",
    choices: ["6", "8", "4"],
    correct: 0
  }
];

let current = 0;
let score = 0;

const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const endScreen = document.getElementById('end-screen');

const questionEl = document.getElementById('question');
const choicesEl = document.getElementById('choices');
const progressEl = document.getElementById('progress');
const scoreEl = document.getElementById('score');
const finalScoreEl = document.getElementById('final-score');

startBtn.addEventListener('click', () => {
  startScreen.classList.add('hidden');
  quizScreen.classList.remove('hidden');
  showQuestion();
});

restartBtn.addEventListener('click', () => {
  current = 0;
  score = 0;
  endScreen.classList.add('hidden');
  quizScreen.classList.remove('hidden');
  showQuestion();
});

function showQuestion() {
  const q = questions[current];
  questionEl.textContent = q.question;
  progressEl.textContent = `Question ${current + 1} of ${questions.length}`;
  scoreEl.textContent = `Score: ${score}`;
  choicesEl.innerHTML = '';

  q.choices.forEach((choice, index) => {
    const btn = document.createElement('button');
    btn.textContent = choice;
    btn.classList.add('choice');
    btn.addEventListener('click', () => handleClick(btn, index));
    choicesEl.appendChild(btn);
  });
}

function handleClick(button, index) {
  const q = questions[current];
  const buttons = choicesEl.querySelectorAll('.choice');

  // Show feedback
  if (index === q.correct) {
    button.classList.add('correct');
    score++;
  } else {
    button.classList.add('incorrect');
    buttons[q.correct].classList.add('correct');
  }

  // Disable all buttons to prevent double-clicks
  buttons.forEach(b => b.disabled = true);

  // Wait 3 seconds then go to next question
  setTimeout(() => {
    current++;
    if (current < questions.length) {
      showQuestion();
    } else {
      quizScreen.classList.add('hidden');
      endScreen.classList.remove('hidden');
      finalScoreEl.textContent = `You scored ${score} out of ${questions.length}`;
    }
  }, 3000); // 3000ms = 3 seconds
}
