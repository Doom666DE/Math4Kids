export const learningModules = [
  {
    id: "arithmetic",
    iconKey: "brain",
    title: "Grundrechenarten",
    skills: ["Plus/Minus", "Mal/Geteilt", "Kopfrechnen", "Reihen"],
  },
  {
    id: "fractions",
    iconKey: "book",
    title: "Brüche",
    skills: ["Bruchteile", "Erweitern/Kürzen", "Brüche vergleichen"],
  },
  {
    id: "decimals",
    iconKey: "bar",
    title: "Dezimalzahlen",
    skills: ["Stellenwerte", "Runden", "Rechnen mit Kommazahlen"],
  },
  {
    id: "percent",
    iconKey: "target",
    title: "Prozent",
    skills: ["Prozentwert", "Grundwert", "Rabatte"],
  },
  {
    id: "geometry",
    iconKey: "shapes",
    title: "Geometrie",
    skills: ["Formen", "Umfang", "Fläche", "Winkel", "Körper"],
  },
  {
    id: "measures",
    iconKey: "ruler",
    title: "Maßeinheiten",
    skills: ["Länge", "Gewicht", "Zeit", "Geld", "Volumen"],
  },
  {
    id: "word-problems",
    iconKey: "book",
    title: "Textaufgaben",
    skills: ["Informationen erkennen", "Rechenweg wählen", "Antwortsatz"],
  },
  {
    id: "equations",
    iconKey: "brain",
    title: "Gleichungen",
    skills: ["Platzhalter", "Umformen", "Probe"],
  },
  {
    id: "coordinates",
    iconKey: "bar",
    title: "Koordinaten",
    skills: ["Punkte lesen", "Punkte eintragen", "Abstände"],
  },
  {
    id: "statistics",
    iconKey: "bar",
    title: "Statistik",
    skills: ["Tabellen", "Diagramme", "Mittelwert"],
  },
];

export const fixedTests = [
  {
    id: "diagnose-klasse-3",
    title: "Diagnose Klasse 3",
    gradeRange: "2-3",
    questions: [
      makeStaticQuestion("arithmetic", "addition", "Berechne 38 + 27.", 65, "65", "Zehner und Einer getrennt addieren."),
      makeStaticQuestion("measures", "time", "Wie viele Minuten sind 2 Stunden?", 120, "120", "Eine Stunde hat 60 Minuten."),
      makeStaticQuestion("geometry", "perimeter", "Ein Rechteck ist 6 cm lang und 4 cm breit. Wie groß ist der Umfang?", 20, "20 cm", "Umfang = 2 · Länge + 2 · Breite."),
      makeStaticQuestion("word-problems", "model", "Mila hat 12 Sticker und bekommt 9 dazu. Wie viele hat sie?", 21, "21", "Zusammen bedeutet Plus."),
    ],
  },
  {
    id: "diagnose-klasse-5",
    title: "Diagnose Klasse 5",
    gradeRange: "4-6",
    questions: [
      makeStaticQuestion("fractions", "fraction-of", "Wie viel ist 3/4 von 20?", 15, "15", "Teile 20 durch 4 und nimm 3 Teile."),
      makeStaticQuestion("percent", "percent-value", "Wie viel sind 25% von 80?", 20, "20", "25% ist ein Viertel."),
      makeStaticQuestion("decimals", "decimal-add", "Berechne 3,5 + 2,75.", 6.25, "6,25", "Stellenwerte sauber untereinander addieren."),
      makeStaticQuestion("geometry", "area", "Ein Rechteck ist 8 cm lang und 5 cm breit. Wie groß ist die Fläche?", 40, "40 cm²", "Fläche = Länge · Breite."),
    ],
  },
  {
    id: "abschluss-sek1",
    title: "Sek I Check",
    gradeRange: "7-10",
    questions: [
      makeStaticQuestion("equations", "linear", "Löse x + 7 = 19.", 12, "x = 12", "Auf beiden Seiten 7 abziehen."),
      makeStaticQuestion("statistics", "mean", "Berechne den Mittelwert von 4, 8, 10, 14.", 9, "9", "Summe 36 durch 4 Werte teilen."),
      makeStaticQuestion("coordinates", "distance-axis", "Wie weit liegen A(2|0) und B(9|0) auseinander?", 7, "7", "Auf einer Achse die Differenz bilden."),
      makeStaticQuestion("percent", "discount", "Ein 60 € Spiel ist 20% günstiger. Wie hoch ist der Rabatt?", 12, "12 €", "20% von 60 berechnen."),
    ],
  },
];

export function generateQuestion({ moduleId, grade = 3 }) {
  const generators = {
    arithmetic: arithmeticQuestion,
    fractions: fractionsQuestion,
    decimals: decimalsQuestion,
    percent: percentQuestion,
    geometry: geometryQuestion,
    measures: measuresQuestion,
    "word-problems": wordProblemQuestion,
    equations: equationsQuestion,
    coordinates: coordinatesQuestion,
    statistics: statisticsQuestion,
  };
  return (generators[moduleId] ?? geometryQuestion)(Number(grade));
}

export function gradeAnswer(question, answer) {
  const normalized = normalizeAnswer(answer);
  const accepted = [question.answer, ...(question.acceptedAnswers ?? [])].map(normalizeAnswer);
  return {
    correct: accepted.includes(normalized),
  };
}

export function summarizeAttempts(attempts) {
  const total = attempts.length;
  const correct = attempts.filter((attempt) => attempt.is_correct).length;
  const byModule = attempts.reduce((map, attempt) => {
    const entry = map.get(attempt.module_id) ?? { total: 0, correct: 0 };
    entry.total += 1;
    if (attempt.is_correct) entry.correct += 1;
    map.set(attempt.module_id, entry);
    return map;
  }, new Map());

  const moduleScores = Array.from(byModule.entries()).map(([moduleId, value]) => ({
    moduleId,
    total: value.total,
    accuracy: Math.round((value.correct / value.total) * 100),
  }));

  const weak = moduleScores.filter((item) => item.total >= 2 && item.accuracy < 70);
  const strongest = moduleScores.sort((a, b) => b.accuracy - a.accuracy)[0]?.moduleId ?? "";

  return {
    total,
    correct,
    accuracy: total ? Math.round((correct / total) * 100) : 0,
    strongest,
    recommendations: weak.map((item) => `${titleFor(item.moduleId)} wiederholen (${item.accuracy}% richtig)`),
  };
}

function arithmeticQuestion(grade) {
  const max = grade <= 2 ? 20 : grade <= 4 ? 100 : 1000;
  const a = randomInt(4, max);
  const b = randomInt(2, Math.min(max, 99));
  const operation = randomPick(["+", "-", "×", "÷"]);
  if (operation === "+") {
    return question("arithmetic", "addition", "Addiere die Zahlen.", `${a} + ${b} = ?`, a + b, "Zerlege in Zehner und Einer.", "Rechenfehler");
  }
  if (operation === "-") {
    const top = Math.max(a, b);
    const bottom = Math.min(a, b);
    return question("arithmetic", "subtraction", "Subtrahiere die Zahlen.", `${top} - ${bottom} = ?`, top - bottom, "Zähle vom kleineren Wert hoch.", "Rechenfehler");
  }
  if (operation === "×") {
    const x = randomInt(2, grade <= 4 ? 10 : 15);
    const y = randomInt(2, grade <= 4 ? 10 : 15);
    return question("arithmetic", "multiplication", "Multipliziere.", `${x} × ${y} = ?`, x * y, "Nutze Reihen oder Verdoppeln.", "Einmaleins");
  }
  const divisor = randomInt(2, grade <= 4 ? 10 : 15);
  const answer = randomInt(2, grade <= 4 ? 10 : 15);
  return question("arithmetic", "division", "Dividiere ohne Rest.", `${divisor * answer} ÷ ${divisor} = ?`, answer, "Suche die passende Malaufgabe.", "Division");
}

function fractionsQuestion(grade) {
  const denominator = randomPick([2, 3, 4, 5, 8, 10]);
  const whole = denominator * randomInt(2, grade <= 5 ? 8 : 14);
  const numerator = randomInt(1, denominator - 1);
  const answer = (whole / denominator) * numerator;
  return question("fractions", "fraction-of", "Berechne den Bruchteil.", `Wie viel ist ${numerator}/${denominator} von ${whole}?`, answer, `Teile ${whole} durch ${denominator} und nimm ${numerator} Teile.`, "Bruchteil");
}

function decimalsQuestion(grade) {
  const a = randomInt(10, grade <= 6 ? 90 : 180) / 10;
  const b = randomInt(10, grade <= 6 ? 90 : 180) / 10;
  const answer = roundTo(a + b, 2);
  return question("decimals", "decimal-add", "Addiere Dezimalzahlen.", `${formatDecimal(a)} + ${formatDecimal(b)} = ?`, answer, "Achte auf die Kommas und Stellenwerte.", "Stellenwert", [formatDecimal(answer)]);
}

function percentQuestion() {
  const base = randomPick([40, 50, 60, 80, 100, 120, 200]);
  const percent = randomPick([10, 20, 25, 50, 75]);
  const answer = (base * percent) / 100;
  return question("percent", "percent-value", "Berechne den Prozentwert.", `Wie viel sind ${percent}% von ${base}?`, answer, `${percent}% bedeutet ${percent} von 100 Teilen.`, "Prozentwert");
}

function geometryQuestion(grade) {
  if (grade <= 4) {
    const length = randomInt(4, 12);
    const width = randomInt(2, 9);
    return question("geometry", "perimeter", "Geometrie: Umfang", `Ein Rechteck ist ${length} cm lang und ${width} cm breit. Berechne den Umfang.`, 2 * length + 2 * width, "Umfang = alle Seiten zusammenzählen.", "Umfang", [`${2 * length + 2 * width} cm`], "▭");
  }
  const length = randomInt(5, 16);
  const width = randomInt(3, 12);
  return question("geometry", "area", "Geometrie: Fläche", `Ein Rechteck ist ${length} cm lang und ${width} cm breit. Berechne die Fläche.`, length * width, "Fläche Rechteck = Länge · Breite.", "Fläche", [`${length * width} cm²`, `${length * width} cm2`], "▭");
}

function measuresQuestion(grade) {
  if (grade <= 4) {
    const hours = randomInt(1, 5);
    return question("measures", "time", "Wandle Zeit um.", `Wie viele Minuten sind ${hours} Stunden?`, hours * 60, "Eine Stunde hat 60 Minuten.", "Einheiten");
  }
  const meters = randomInt(2, 20);
  return question("measures", "length", "Wandle Länge um.", `Wie viele Zentimeter sind ${meters} Meter?`, meters * 100, "Ein Meter hat 100 Zentimeter.", "Einheiten");
}

function wordProblemQuestion() {
  const start = randomInt(12, 80);
  const added = randomInt(5, 30);
  return question("word-problems", "addition-story", "Textaufgabe", `Eine Klasse sammelt ${start} Punkte und bekommt ${added} Bonuspunkte. Wie viele Punkte sind es zusammen?`, start + added, "Zusammen ist ein Plus-Hinweis.", "Rechenweg");
}

function equationsQuestion() {
  const x = randomInt(3, 25);
  const add = randomInt(2, 15);
  return question("equations", "linear", "Löse die Gleichung.", `x + ${add} = ${x + add}. Wie groß ist x?`, x, `Ziehe ${add} auf beiden Seiten ab.`, "Umformen", [`x=${x}`, `x = ${x}`]);
}

function coordinatesQuestion() {
  const a = randomInt(0, 8);
  const b = randomInt(a + 2, 15);
  return question("coordinates", "distance-axis", "Koordinaten", `Wie weit liegen A(${a}|0) und B(${b}|0) auseinander?`, b - a, "Auf einer Achse die Differenz bilden.", "Koordinaten");
}

function statisticsQuestion() {
  const values = [randomInt(2, 12), randomInt(2, 12), randomInt(2, 12)];
  const sum = values.reduce((acc, value) => acc + value, 0);
  const fourth = randomInt(2, 12);
  const all = [...values, fourth];
  const answer = roundTo(all.reduce((acc, value) => acc + value, 0) / all.length, 2);
  return question("statistics", "mean", "Statistik", `Berechne den Mittelwert von ${all.join(", ")}.`, answer, `Addiere alle Werte und teile durch ${all.length}.`, "Mittelwert", [formatDecimal(answer)], "▥");
}

function question(moduleId, skillId, title, prompt, answer, hint, errorType, acceptedAnswers = [], visual = "✦") {
  return {
    id: cryptoSafeId(),
    moduleId,
    skillId,
    title,
    prompt,
    answer,
    acceptedAnswers,
    hint,
    explanation: `${prompt} Die Lösung ist ${answer}.`,
    errorType,
    placeholder: "Antwort",
    visual,
    type: "generated",
  };
}

function makeStaticQuestion(moduleId, skillId, prompt, answer, accepted, hint) {
  return {
    id: `${moduleId}-${skillId}-${answer}`,
    moduleId,
    skillId,
    title: titleFor(moduleId),
    prompt,
    answer,
    acceptedAnswers: [accepted],
    hint,
    explanation: hint,
    errorType: skillId,
    placeholder: "Antwort",
    visual: moduleId === "geometry" ? "▭" : "✦",
    type: "fixed",
  };
}

function normalizeAnswer(value) {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(",", ".")
    .replace(/\s+/g, "")
    .replace(/cm²/g, "cm2");
}

function titleFor(moduleId) {
  return learningModules.find((item) => item.id === moduleId)?.title ?? moduleId;
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomPick(values) {
  return values[randomInt(0, values.length - 1)];
}

function roundTo(value, digits) {
  return Number(value.toFixed(digits));
}

function formatDecimal(value) {
  return String(value).replace(".", ",");
}

function cryptoSafeId() {
  if (globalThis.crypto?.randomUUID) {
    return globalThis.crypto.randomUUID();
  }
  return `q-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}
