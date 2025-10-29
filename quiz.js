const questions = [
  { question: "Capital of France?", choices: ["Paris", "Madrid", "Rome"], correct: 0 },
  { question: "Red Planet?", choices: ["Earth", "Mars", "Venus"], correct: 1 },
  { question: "CPU stands for?", choices: ["Central Process Unit", "Central Processing Unit", "Computer Processing Utility"], correct: 1 },
  { question: "2 + 2 × 2 = ?", choices: ["6", "8", "4"], correct: 0 }
];

let current = 0;
let score = 0;
let timeoutId = null;

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

startBtn.addEventListener('click', startQuiz);
restartBtn.addEventListener('click', startQuiz);

function startQuiz() {
  startScreen.classList.add('hidden');
  endScreen.classList.add('hidden');
  quizScreen.classList.remove('hidden');
  current = 0;
  score = 0;
  showQuestion();
}

function showQuestion() {
  clearTimeout(timeoutId); // Clear any previous timeout

  const q = questions[current];
  questionEl.textContent = q.question;
  progressEl.textContent = `Question ${current + 1} of ${questions.length}`;
  scoreEl.textContent = `Score: ${score}`;
  choicesEl.innerHTML = '';

  q.choices.forEach((choice, i) => {
    const btn = document.createElement('button');
    btn.textContent = choice;
    btn.classList.add('choice');
    btn.onclick = () => handleAnswer(i);
    choicesEl.appendChild(btn);
  });
}

function handleAnswer(selected) {
  const q = questions[current];
  const buttons = choicesEl.querySelectorAll('button');

  // Disable all buttons immediately
  buttons.forEach(btn => btn.disabled = true);

  // Show correct/incorrect feedback
  if (selected === q.correct) {
    buttons[selected].classList.add('correct');
    score++;
  } else {
    buttons[selected].classList.add('incorrect');
    buttons[q.correct].classList.add('correct');
  }
  scoreEl.textContent = `Score: ${score}`;

  // Auto-move after 3 seconds
  timeoutId = setTimeout(() => {
    current++;
    if (current < questions.length) {
      showQuestion();
    } else {
      quizScreen.classList.add('hidden');
      endScreen.classList.remove('hidden');
      finalScoreEl.textContent = `You scored ${score} out of ${questions.length}`;
    }
  }, 3000);
}
