const levelSelect = document.querySelector("#levelSelect");
const operationSelect = document.querySelector("#operationSelect");
const answerForm = document.querySelector("#answerForm");
const answerInput = document.querySelector("#answerInput");
const equationEl = document.querySelector("#equation");
const questionMeta = document.querySelector("#questionMeta");
const feedbackText = document.querySelector("#feedbackText");
const hintButton = document.querySelector("#hintButton");
const nextButton = document.querySelector("#nextButton");
const hintBox = document.querySelector("#hintBox");
const questionCounter = document.querySelector("#questionCounter");
const progressDots = document.querySelector("#progressDots");
const scoreCount = document.querySelector("#scoreCount");
const streakCount = document.querySelector("#streakCount");
const dailyGoal = document.querySelector("#dailyGoal");
const dailyGoalBar = document.querySelector("#dailyGoalBar");
const accuracyText = document.querySelector("#accuracyText");
const historyList = document.querySelector("#historyList");
const resetButton = document.querySelector("#resetButton");
const rewardIcon = document.querySelector("#rewardIcon");
const rewardTitle = document.querySelector("#rewardTitle");
const rewardText = document.querySelector("#rewardText");

const levelRanges = {
  easy: { min: 1, max: 10, label: "Leicht" },
  medium: { min: 5, max: 25, label: "Mittel" },
  hard: { min: 10, max: 99, label: "Knifflig" },
};

const operations = {
  add: { symbol: "+", label: "Plusaufgabe" },
  subtract: { symbol: "-", label: "Minusaufgabe" },
  multiply: { symbol: "x", label: "Malaufgabe" },
  divide: { symbol: ":", label: "Geteiltaufgabe" },
};

const rewards = [
  {
    min: 0,
    icon: "1",
    title: "Sternensammler",
    text: "Löse Aufgaben, um neue Abzeichen freizuschalten.",
  },
  {
    min: 3,
    icon: "5",
    title: "Zahlenprofi",
    text: "Stark. Drei richtige Antworten sind geschafft.",
  },
  {
    min: 7,
    icon: "10",
    title: "Rechenheld",
    text: "Du kommst deinem Tagesziel sehr nah.",
  },
  {
    min: 10,
    icon: "A+",
    title: "Mathemeister",
    text: "Tagesziel erreicht. Zeit für die Bonusrunde.",
  },
];

let state = {
  question: null,
  score: 0,
  streak: 0,
  attempts: 0,
  correct: 0,
  answered: false,
  history: [],
};

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickOperation() {
  const selected = operationSelect.value;
  if (selected !== "mixed") {
    return selected;
  }
  const available = ["add", "subtract", "multiply", "divide"];
  return available[randomInt(0, available.length - 1)];
}

function makeQuestion() {
  const range = levelRanges[levelSelect.value];
  const operation = pickOperation();
  let a = randomInt(range.min, range.max);
  let b = randomInt(range.min, range.max);
  let answer;

  if (operation === "add") {
    answer = a + b;
  }

  if (operation === "subtract") {
    if (b > a) {
      [a, b] = [b, a];
    }
    answer = a - b;
  }

  if (operation === "multiply") {
    const maxFactor = levelSelect.value === "hard" ? 12 : levelSelect.value === "medium" ? 10 : 5;
    a = randomInt(1, maxFactor);
    b = randomInt(1, maxFactor);
    answer = a * b;
  }

  if (operation === "divide") {
    const maxDivisor = levelSelect.value === "hard" ? 12 : levelSelect.value === "medium" ? 10 : 5;
    b = randomInt(1, maxDivisor);
    answer = randomInt(1, maxDivisor);
    a = b * answer;
  }

  return {
    a,
    b,
    answer,
    operation,
    expression: `${a} ${operations[operation].symbol} ${b} = ?`,
  };
}

function hintFor(question) {
  if (question.operation === "add") {
    return `Tipp: Starte bei ${question.a} und zähle ${question.b} Schritte weiter.`;
  }
  if (question.operation === "subtract") {
    return `Tipp: Frage dich, wie viele Schritte von ${question.b} bis ${question.a} fehlen.`;
  }
  if (question.operation === "multiply") {
    return `Tipp: ${question.a} x ${question.b} bedeutet ${question.a} Gruppen mit je ${question.b}.`;
  }
  return `Tipp: Suche die Zahl, die mit ${question.b} multipliziert ${question.a} ergibt.`;
}

function renderQuestion() {
  const question = state.question;
  equationEl.textContent = question.expression;
  questionMeta.textContent = `${operations[question.operation].label} · ${levelRanges[levelSelect.value].label}`;
  answerInput.value = "";
  answerInput.disabled = false;
  feedbackText.className = "feedback neutral";
  feedbackText.textContent = "Gib deine Antwort ein und drücke Prüfen.";
  hintBox.hidden = true;
  hintBox.textContent = "";
  state.answered = false;
  answerInput.focus();
}

function renderStats() {
  scoreCount.textContent = state.score;
  streakCount.textContent = state.streak;
  dailyGoal.textContent = Math.min(state.correct, 10);
  dailyGoalBar.style.width = `${Math.min(state.correct * 10, 100)}%`;

  if (state.attempts === 0) {
    accuracyText.textContent = "Noch keine Antworten";
  } else {
    const accuracy = Math.round((state.correct / state.attempts) * 100);
    accuracyText.textContent = `${accuracy}% richtig bei ${state.attempts} Antworten`;
  }

  const currentQuestion = Math.min(state.attempts + 1, 10);
  questionCounter.textContent = `Aufgabe ${currentQuestion} von 10`;
  progressDots.innerHTML = Array.from({ length: 10 }, (_, index) => {
    const number = index + 1;
    const className = number <= state.correct ? "done" : number === currentQuestion ? "current" : "";
    const label = number <= state.correct ? "✓" : number;
    return `<span class="${className}">${label}</span>`;
  }).join("");

  const reward = rewards
    .slice()
    .reverse()
    .find((item) => state.correct >= item.min);
  rewardIcon.textContent = reward.icon;
  rewardTitle.textContent = reward.title;
  rewardText.textContent = reward.text;

  if (state.history.length === 0) {
    historyList.innerHTML = "<li>Noch keine Runde gespielt.</li>";
    return;
  }

  historyList.innerHTML = state.history
    .slice(0, 5)
    .map((item) => {
      const marker = item.correct ? "Richtig" : "Nochmal";
      return `<li><span>${item.expression}</span><strong>${marker}</strong></li>`;
    })
    .join("");
}

function nextQuestion() {
  state.question = makeQuestion();
  renderQuestion();
  renderStats();
}

function checkAnswer(event) {
  event.preventDefault();
  if (state.answered) {
    nextQuestion();
    return;
  }

  const value = Number(answerInput.value);
  if (answerInput.value.trim() === "") {
    feedbackText.className = "feedback wrong";
    feedbackText.textContent = "Bitte trage zuerst eine Zahl ein.";
    return;
  }

  const isCorrect = value === state.question.answer;
  state.answered = true;
  state.attempts += 1;
  answerInput.disabled = true;

  if (isCorrect) {
    state.correct += 1;
    state.score += 10 + Math.min(state.streak * 2, 10);
    state.streak += 1;
    feedbackText.className = "feedback correct";
    feedbackText.textContent = "Richtig gerechnet. Weiter so!";
  } else {
    state.streak = 0;
    feedbackText.className = "feedback wrong";
    feedbackText.textContent = `Fast. Die richtige Antwort ist ${state.question.answer}.`;
  }

  state.history.unshift({
    expression: state.question.expression.replace("?", state.question.answer),
    correct: isCorrect,
  });

  renderStats();
}

function resetGame() {
  state = {
    question: null,
    score: 0,
    streak: 0,
    attempts: 0,
    correct: 0,
    answered: false,
    history: [],
  };
  nextQuestion();
}

answerForm.addEventListener("submit", checkAnswer);
nextButton.addEventListener("click", nextQuestion);
hintButton.addEventListener("click", () => {
  hintBox.hidden = false;
  hintBox.textContent = hintFor(state.question);
});
resetButton.addEventListener("click", resetGame);
levelSelect.addEventListener("change", nextQuestion);
operationSelect.addEventListener("change", nextQuestion);

nextQuestion();
