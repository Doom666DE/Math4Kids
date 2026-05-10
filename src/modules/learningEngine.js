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

export const missions = [
  mission("zahlenwelt", "arithmetic", "Zahlenwelt", "Schnell und sicher mit Plus, Minus, Mal und Geteilt.", "Zahlen-Profi", "4", 1, 6, 1),
  mission("bruch-pizza", "fractions", "Bruch-Pizza", "Teile erkennen, vergleichen und Bruchteile berechnen.", "Bruch-Baecker", "1/2", 3, 8, 2),
  mission("komma-werkstatt", "decimals", "Komma-Werkstatt", "Dezimalzahlen lesen, runden und zusammenrechnen.", "Komma-Meister", "0,5", 4, 8, 3),
  mission("prozent-shop", "percent", "Prozent-Shop", "Rabatte, Prozentwerte und Grundwerte im Alltag.", "Rabatt-Profi", "%", 5, 10, 4),
  mission("geometrie-labor", "geometry", "Geometrie-Labor", "Formen, Umfang, Flaeche, Winkel und Koerper.", "Formen-Forscher", "▭", 2, 10, 5),
  mission("einheiten-reise", "measures", "Einheiten-Reise", "Laengen, Zeiten, Geld, Gewicht und Volumen umwandeln.", "Einheiten-Pilot", "m", 2, 8, 6),
  mission("detektiv-texte", "word-problems", "Textaufgaben-Detektiv", "Wichtige Informationen finden und den Rechenweg waehlen.", "Text-Detektiv", "?", 2, 8, 7),
  mission("gleichungs-dojo", "equations", "Gleichungs-Dojo", "Platzhalter und einfache Gleichungen sauber loesen.", "Gleichungs-Ninja", "x", 5, 10, 8),
  mission("koordinaten-karte", "coordinates", "Koordinaten-Karte", "Punkte lesen, Wege finden und Abstaende bestimmen.", "Karten-Profi", "(x|y)", 5, 10, 9),
  mission("statistik-studio", "statistics", "Statistik-Studio", "Tabellen, Diagramme und Mittelwerte verstehen.", "Daten-Profi", "▥", 4, 10, 10),
];

export const fixedTests = [
  {
    id: "diagnose-klasse-3",
    title: "Diagnose Klasse 3",
    gradeRange: "2-3",
    questions: [
      makeStaticQuestion("arithmetic", "addition", "Berechne 38 + 27.", 65, "65", ["Zerlege 38 und 27 in Zehner und Einer.", "30 + 20 = 50 und 8 + 7 = 15.", "50 + 15 = 65."]),
      makeStaticQuestion("measures", "time", "Wie viele Minuten sind 2 Stunden?", 120, "120", ["Eine Stunde hat 60 Minuten.", "Rechne 2 mal 60.", "2 Stunden sind 120 Minuten."]),
      makeStaticQuestion("geometry", "perimeter", "Ein Rechteck ist 6 cm lang und 4 cm breit. Wie groß ist der Umfang?", 20, "20 cm", ["Ein Rechteck hat jede Seite zweimal.", "Rechne 6 + 4 + 6 + 4.", "Der Umfang ist 20 cm."]),
      makeStaticQuestion("word-problems", "model", "Mila hat 12 Sticker und bekommt 9 dazu. Wie viele hat sie?", 21, "21", ["Dazubekommen bedeutet Plus.", "Rechne 12 + 9.", "Mila hat 21 Sticker."]),
    ],
  },
  {
    id: "diagnose-klasse-5",
    title: "Diagnose Klasse 5",
    gradeRange: "4-6",
    questions: [
      makeStaticQuestion("fractions", "fraction-of", "Wie viel ist 3/4 von 20?", 15, "15", ["Teile 20 zuerst in 4 gleiche Teile.", "20 : 4 = 5, davon nimmst du 3 Teile.", "3 mal 5 = 15."]),
      makeStaticQuestion("percent", "percent-value", "Wie viel sind 25% von 80?", 20, "20", ["25% ist ein Viertel.", "Teile 80 durch 4.", "25% von 80 sind 20."]),
      makeStaticQuestion("decimals", "decimal-add", "Berechne 3,5 + 2,75.", 6.25, "6,25", ["Schreibe die Kommas untereinander.", "3,50 + 2,75 rechnen.", "Das Ergebnis ist 6,25."]),
      makeStaticQuestion("geometry", "area", "Ein Rechteck ist 8 cm lang und 5 cm breit. Wie groß ist die Fläche?", 40, "40 cm²", ["Flaeche Rechteck = Laenge mal Breite.", "Rechne 8 mal 5.", "Die Flaeche ist 40 cm²."]),
    ],
  },
  {
    id: "abschluss-sek1",
    title: "Sek I Check",
    gradeRange: "7-10",
    questions: [
      makeStaticQuestion("equations", "linear", "Löse x + 7 = 19.", 12, "x = 12", ["Du willst x allein haben.", "Ziehe auf beiden Seiten 7 ab.", "x = 12."]),
      makeStaticQuestion("statistics", "mean", "Berechne den Mittelwert von 4, 8, 10, 14.", 9, "9", ["Addiere alle Werte.", "36 geteilt durch 4 Werte.", "Der Mittelwert ist 9."]),
      makeStaticQuestion("coordinates", "distance-axis", "Wie weit liegen A(2|0) und B(9|0) auseinander?", 7, "7", ["Beide Punkte liegen auf derselben Achse.", "Rechne 9 - 2.", "Der Abstand ist 7."]),
      makeStaticQuestion("percent", "discount", "Ein 60 € Spiel ist 20% günstiger. Wie hoch ist der Rabatt?", 12, "12 €", ["Gesucht ist 20% von 60.", "10% sind 6, also sind 20% 12.", "Der Rabatt ist 12 €."]),
    ],
  },
];

export function generateQuestion({ moduleId, grade = 3, missionId = null, level = null }) {
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
  const module = moduleId ?? missionFor(missionId)?.moduleId ?? "geometry";
  const question = (generators[module] ?? geometryQuestion)(Number(grade), Number(level ?? grade));
  return {
    ...question,
    missionId: missionId ?? missionForModule(question.moduleId)?.id ?? null,
    level: Number(level ?? grade),
  };
}

export function gradeAnswer(question, answer) {
  const normalized = normalizeAnswer(answer);
  const accepted = [question.answer, ...(question.acceptedAnswers ?? [])].map(normalizeAnswer);
  return {
    correct: accepted.includes(normalized),
  };
}

export function starsForAttempt({ correct, hintCount = 0 }) {
  if (!correct) return 0;
  if (hintCount <= 0) return 3;
  if (hintCount === 1) return 2;
  return 1;
}

export function nextMissionProgress(current = {}, { missionId, level, correct, starsAwarded, targetCount = 6 }) {
  const attempts = (current.attempts_count ?? 0) + 1;
  const correctCount = (current.correct_count ?? 0) + (correct ? 1 : 0);
  const stars = (current.stars ?? 0) + starsAwarded;
  const completed = correctCount >= targetCount || current.completed === true;
  return {
    mission_id: missionId,
    level,
    stars,
    attempts_count: attempts,
    correct_count: correctCount,
    completed,
    last_activity_at: new Date().toISOString(),
  };
}

export function summarizeAttempts(attempts, missionProgress = []) {
  const total = attempts.length;
  const correct = attempts.filter((attempt) => attempt.is_correct).length;
  const byModule = attempts.reduce((map, attempt) => {
    const entry = map.get(attempt.module_id) ?? { total: 0, correct: 0 };
    entry.total += 1;
    if (attempt.is_correct) entry.correct += 1;
    map.set(attempt.module_id, entry);
    return map;
  }, new Map());

  const byError = attempts.reduce((map, attempt) => {
    if (!attempt.is_correct && attempt.error_type) {
      map.set(attempt.error_type, (map.get(attempt.error_type) ?? 0) + 1);
    }
    return map;
  }, new Map());

  const moduleScores = Array.from(byModule.entries()).map(([moduleId, value]) => ({
    moduleId,
    total: value.total,
    accuracy: Math.round((value.correct / value.total) * 100),
  }));

  const weak = moduleScores.filter((item) => item.total >= 2 && item.accuracy < 70);
  const strongest = [...moduleScores].sort((a, b) => b.accuracy - a.accuracy)[0]?.moduleId ?? "";
  const nextMission = recommendNextMission(missionProgress, attempts);

  return {
    total,
    correct,
    accuracy: total ? Math.round((correct / total) * 100) : 0,
    strongest,
    moduleScores,
    topErrorTypes: Array.from(byError.entries()).sort((a, b) => b[1] - a[1]).slice(0, 4),
    recommendations: buildRecommendations(weak, byError, nextMission),
    nextMission,
    missionStats: summarizeMissionProgress(missionProgress),
  };
}

export function summarizeMissionProgress(missionProgress = []) {
  const completed = missionProgress.filter((item) => item.completed).length;
  const stars = missionProgress.reduce((sum, item) => sum + (item.stars ?? 0), 0);
  return {
    completed,
    total: missions.length,
    stars,
  };
}

export function getMissionProgress(progressItems, missionId) {
  return progressItems.find((item) => item.mission_id === missionId) ?? null;
}

function mission(id, moduleId, title, description, badge, visual, gradeMin, gradeMax, order) {
  return {
    id,
    moduleId,
    title,
    description,
    badge,
    visual,
    gradeMin,
    gradeMax,
    order,
    targetCount: 6,
  };
}

function arithmeticQuestion(grade) {
  const kind = randomPick(grade <= 2 ? ["addition", "subtraction"] : ["addition", "subtraction", "multiplication", "division"]);
  const max = grade <= 2 ? 20 : grade <= 4 ? 100 : 1000;
  if (kind === "addition") {
    const a = randomInt(4, max);
    const b = randomInt(2, Math.min(max, 99));
    return question("arithmetic", "addition", "Addiere die Zahlen.", `${a} + ${b} = ?`, a + b, [
      "Zerlege beide Zahlen in passende Teile.",
      `Rechne zuerst mit Zehnern oder Hundertern, dann mit dem Rest.`,
      `${a} + ${b} = ${a + b}.`,
    ], "Rechenfehler");
  }
  if (kind === "subtraction") {
    const a = randomInt(4, max);
    const b = randomInt(2, Math.min(max, 99));
    const top = Math.max(a, b);
    const bottom = Math.min(a, b);
    return question("arithmetic", "subtraction", "Subtrahiere die Zahlen.", `${top} - ${bottom} = ?`, top - bottom, [
      "Starte bei der kleineren Zahl und zaehle hoch.",
      `Oder rechne ${top} minus ${bottom} schrittweise.`,
      `${top} - ${bottom} = ${top - bottom}.`,
    ], "Rechenfehler");
  }
  if (kind === "multiplication") {
    const x = randomInt(2, grade <= 4 ? 10 : 15);
    const y = randomInt(2, grade <= 4 ? 10 : 15);
    return question("arithmetic", "multiplication", "Multipliziere.", `${x} × ${y} = ?`, x * y, [
      "Nutze eine bekannte Reihe oder zerlege eine Zahl.",
      `${x} × ${y} bedeutet ${x} Gruppen mit ${y}.`,
      `${x} × ${y} = ${x * y}.`,
    ], "Rechenfehler");
  }
  const divisor = randomInt(2, grade <= 4 ? 10 : 15);
  const answer = randomInt(2, grade <= 4 ? 10 : 15);
  return question("arithmetic", "division", "Dividiere ohne Rest.", `${divisor * answer} ÷ ${divisor} = ?`, answer, [
    "Suche die passende Malaufgabe.",
    `${divisor} mal welche Zahl ergibt ${divisor * answer}?`,
    `${divisor * answer} ÷ ${divisor} = ${answer}.`,
  ], "Rechenfehler");
}

function fractionsQuestion(grade) {
  const kind = randomPick(grade <= 4 ? ["fraction-of", "compare"] : ["fraction-of", "compare", "simplify"]);
  if (kind === "compare") {
    const denominator = randomPick([4, 6, 8, 10]);
    const left = randomInt(1, denominator - 1);
    const right = randomInt(1, denominator - 1);
    const answer = left === right ? "=" : left > right ? ">" : "<";
    return question("fractions", "compare", "Vergleiche Brueche.", `${left}/${denominator} __ ${right}/${denominator}. Welches Zeichen passt: <, > oder = ?`, answer, [
      "Die Nenner sind gleich, also vergleichst du die Zaehler.",
      `${left} und ${right} entscheiden ueber die Groesse.`,
      `${left}/${denominator} ${answer} ${right}/${denominator}.`,
    ], "Bruchvergleich", [answer === ">" ? "groesser" : answer === "<" ? "kleiner" : "gleich"], "1/2");
  }
  if (kind === "simplify") {
    const factor = randomPick([2, 3, 4, 5]);
    const numerator = randomInt(1, 5) * factor;
    const denominator = randomInt(numerator / factor + 1, 9) * factor;
    const answer = `${numerator / factor}/${denominator / factor}`;
    return question("fractions", "simplify", "Kuerze den Bruch.", `Kuerze ${numerator}/${denominator} mit ${factor}.`, answer, [
      "Beim Kuerzen teilst du Zaehler und Nenner durch dieselbe Zahl.",
      `${numerator} : ${factor} = ${numerator / factor} und ${denominator} : ${factor} = ${denominator / factor}.`,
      `Gekuerzt ist das ${answer}.`,
    ], "Bruchkuerzen", [answer.replace("/", " / ")], "1/2");
  }
  const denominator = randomPick([2, 3, 4, 5, 8, 10]);
  const whole = denominator * randomInt(2, grade <= 5 ? 8 : 14);
  const numerator = randomInt(1, denominator - 1);
  const answer = (whole / denominator) * numerator;
  return question("fractions", "fraction-of", "Berechne den Bruchteil.", `Wie viel ist ${numerator}/${denominator} von ${whole}?`, answer, [
    `Teile ${whole} zuerst durch ${denominator}.`,
    `Ein Teil ist ${whole / denominator}, davon brauchst du ${numerator}.`,
    `${numerator}/${denominator} von ${whole} ist ${answer}.`,
  ], "Bruchteil", [], "1/2");
}

function decimalsQuestion(grade) {
  const kind = randomPick(grade <= 5 ? ["decimal-add", "decimal-place"] : ["decimal-add", "decimal-round", "decimal-place"]);
  if (kind === "decimal-round") {
    const value = randomInt(120, 990) / 100;
    const answer = Math.round(value * 10) / 10;
    return question("decimals", "decimal-round", "Runde Dezimalzahlen.", `Runde ${formatDecimal(value)} auf eine Nachkommastelle.`, answer, [
      "Eine Nachkommastelle bedeutet: eine Ziffer nach dem Komma bleibt stehen.",
      "Die zweite Ziffer nach dem Komma entscheidet, ob du aufrundest.",
      `${formatDecimal(value)} gerundet ist ${formatDecimal(answer)}.`,
    ], "Stellenwert", [formatDecimal(answer)]);
  }
  if (kind === "decimal-place") {
    const tens = randomInt(1, 9);
    const tenths = randomInt(1, 9);
    const hundredths = randomInt(1, 9);
    const value = `${tens},${tenths}${hundredths}`;
    return question("decimals", "decimal-place", "Erkenne Stellenwerte.", `Welche Ziffer steht bei ${value} an der Hundertstelstelle?`, hundredths, [
      "Nach dem Komma kommt zuerst die Zehntelstelle.",
      "Die zweite Stelle nach dem Komma ist die Hundertstelstelle.",
      `Bei ${value} ist ${hundredths} die Hundertstelziffer.`,
    ], "Stellenwert");
  }
  const a = randomInt(10, grade <= 6 ? 90 : 180) / 10;
  const b = randomInt(10, grade <= 6 ? 90 : 180) / 10;
  const answer = roundTo(a + b, 2);
  return question("decimals", "decimal-add", "Addiere Dezimalzahlen.", `${formatDecimal(a)} + ${formatDecimal(b)} = ?`, answer, [
    "Schreibe die Kommas untereinander.",
    "Addiere Zehntel zu Zehnteln und Einer zu Einern.",
    `${formatDecimal(a)} + ${formatDecimal(b)} = ${formatDecimal(answer)}.`,
  ], "Stellenwert", [formatDecimal(answer)]);
}

function percentQuestion() {
  const kind = randomPick(["percent-value", "discount", "basic-percent"]);
  const base = randomPick([40, 50, 60, 80, 100, 120, 200]);
  const percent = randomPick([10, 20, 25, 50, 75]);
  const value = (base * percent) / 100;
  if (kind === "discount") {
    return question("percent", "discount", "Berechne den Rabatt.", `Ein Artikel kostet ${base} €. Es gibt ${percent}% Rabatt. Wie viele Euro werden abgezogen?`, value, [
      `Gesucht ist ${percent}% von ${base}.`,
      `Rechne ${base} mal ${percent} geteilt durch 100.`,
      `Der Rabatt betraegt ${value} €.`,
    ], "Prozentwert", [`${value} €`, `${value} euro`], "%");
  }
  if (kind === "basic-percent") {
    return question("percent", "basic-percent", "Verstehe Prozent.", `Wie schreibt man ${percent}% als Bruch mit dem Nenner 100?`, `${percent}/100`, [
      "Prozent bedeutet von hundert.",
      `${percent}% sind ${percent} von 100 Teilen.`,
      `${percent}% = ${percent}/100.`,
    ], "Prozentbegriff", [`${percent} / 100`], "%");
  }
  return question("percent", "percent-value", "Berechne den Prozentwert.", `Wie viel sind ${percent}% von ${base}?`, value, [
    `${percent}% bedeutet ${percent} von 100 Teilen.`,
    `Rechne ${base} mal ${percent} geteilt durch 100.`,
    `${percent}% von ${base} sind ${value}.`,
  ], "Prozentwert", [], "%");
}

function geometryQuestion(grade) {
  const kind = randomPick(grade <= 4 ? ["perimeter", "shape"] : ["perimeter", "area", "angle"]);
  if (kind === "shape") {
    const sides = randomPick([
      ["Dreieck", 3],
      ["Viereck", 4],
      ["Fuenfeck", 5],
      ["Sechseck", 6],
    ]);
    return question("geometry", "shape-sides", "Erkenne Formen.", `Wie viele Seiten hat ein ${sides[0]}?`, sides[1], [
      "Zaehle die geraden Randlinien der Form.",
      `Der Name ${sides[0]} gibt oft einen Hinweis.`,
      `Ein ${sides[0]} hat ${sides[1]} Seiten.`,
    ], "Formen", [], "△");
  }
  if (kind === "angle") {
    const angle = randomPick([30, 45, 60, 90, 120, 150]);
    const answer = angle < 90 ? "spitz" : angle === 90 ? "recht" : "stumpf";
    return question("geometry", "angle-type", "Bestimme Winkel.", `Ein Winkel ist ${angle}°. Ist er spitz, recht oder stumpf?`, answer, [
      "Ein rechter Winkel hat genau 90°.",
      "Kleiner als 90° ist spitz, groesser als 90° ist stumpf.",
      `${angle}° ist ${answer}.`,
    ], "Winkel", [answer === "recht" ? "rechter" : answer], "∠");
  }
  const length = randomInt(4, grade <= 4 ? 12 : 18);
  const width = randomInt(2, grade <= 4 ? 9 : 14);
  if (kind === "area") {
    return question("geometry", "area", "Geometrie: Flaeche", `Ein Rechteck ist ${length} cm lang und ${width} cm breit. Berechne die Flaeche.`, length * width, [
      "Flaeche Rechteck = Laenge mal Breite.",
      `Rechne ${length} mal ${width}.`,
      `Die Flaeche ist ${length * width} cm².`,
    ], "Formelwahl", [`${length * width} cm²`, `${length * width} cm2`], "▭");
  }
  const answer = 2 * length + 2 * width;
  return question("geometry", "perimeter", "Geometrie: Umfang", `Ein Rechteck ist ${length} cm lang und ${width} cm breit. Berechne den Umfang.`, answer, [
    "Umfang bedeutet: alle Seiten zusammen.",
    `Rechne ${length} + ${width} + ${length} + ${width}.`,
    `Der Umfang ist ${answer} cm.`,
  ], "Formelwahl", [`${answer} cm`], "▭");
}

function measuresQuestion(grade) {
  const kind = randomPick(grade <= 4 ? ["time", "money"] : ["length", "weight", "volume"]);
  if (kind === "time") {
    const hours = randomInt(1, 5);
    return question("measures", "time", "Wandle Zeit um.", `Wie viele Minuten sind ${hours} Stunden?`, hours * 60, [
      "Eine Stunde hat 60 Minuten.",
      `Rechne ${hours} mal 60.`,
      `${hours} Stunden sind ${hours * 60} Minuten.`,
    ], "Einheiten");
  }
  if (kind === "money") {
    const euro = randomInt(2, 20);
    return question("measures", "money", "Wandle Geld um.", `Wie viele Cent sind ${euro} €?`, euro * 100, [
      "Ein Euro hat 100 Cent.",
      `Rechne ${euro} mal 100.`,
      `${euro} € sind ${euro * 100} Cent.`,
    ], "Einheiten", [`${euro * 100} ct`, `${euro * 100} cent`], "€");
  }
  if (kind === "weight") {
    const kilograms = randomInt(1, 12);
    return question("measures", "weight", "Wandle Gewicht um.", `Wie viele Gramm sind ${kilograms} kg?`, kilograms * 1000, [
      "Ein Kilogramm hat 1000 Gramm.",
      `Rechne ${kilograms} mal 1000.`,
      `${kilograms} kg sind ${kilograms * 1000} g.`,
    ], "Einheiten", [`${kilograms * 1000} g`], "kg");
  }
  if (kind === "volume") {
    const liters = randomInt(1, 8);
    return question("measures", "volume", "Wandle Volumen um.", `Wie viele Milliliter sind ${liters} Liter?`, liters * 1000, [
      "Ein Liter hat 1000 Milliliter.",
      `Rechne ${liters} mal 1000.`,
      `${liters} Liter sind ${liters * 1000} ml.`,
    ], "Einheiten", [`${liters * 1000} ml`], "l");
  }
  const meters = randomInt(2, 20);
  return question("measures", "length", "Wandle Laenge um.", `Wie viele Zentimeter sind ${meters} Meter?`, meters * 100, [
    "Ein Meter hat 100 Zentimeter.",
    `Rechne ${meters} mal 100.`,
    `${meters} m sind ${meters * 100} cm.`,
  ], "Einheiten", [`${meters * 100} cm`], "m");
}

function wordProblemQuestion() {
  const kind = randomPick(["addition-story", "subtraction-story", "multiplication-story"]);
  if (kind === "subtraction-story") {
    const start = randomInt(25, 120);
    const gone = randomInt(5, Math.min(40, start - 2));
    return question("word-problems", "subtraction-story", "Textaufgabe", `Im Bus sitzen ${start} Kinder. An der Haltestelle steigen ${gone} aus. Wie viele bleiben sitzen?`, start - gone, [
      "Aussteigen bedeutet: Es werden weniger.",
      `Rechne ${start} - ${gone}.`,
      `Es bleiben ${start - gone} Kinder sitzen.`,
    ], "Textverstaendnis", [], "?");
  }
  if (kind === "multiplication-story") {
    const boxes = randomInt(3, 9);
    const perBox = randomInt(4, 12);
    return question("word-problems", "multiplication-story", "Textaufgabe", `In ${boxes} Kisten liegen jeweils ${perBox} Baelle. Wie viele Baelle sind es insgesamt?`, boxes * perBox, [
      "Jeweils ist ein Hinweis auf Malrechnen.",
      `Rechne ${boxes} mal ${perBox}.`,
      `Insgesamt sind es ${boxes * perBox} Baelle.`,
    ], "Textverstaendnis", [], "?");
  }
  const start = randomInt(12, 80);
  const added = randomInt(5, 30);
  return question("word-problems", "addition-story", "Textaufgabe", `Eine Klasse sammelt ${start} Punkte und bekommt ${added} Bonuspunkte. Wie viele Punkte sind es zusammen?`, start + added, [
    "Zusammen ist ein Plus-Hinweis.",
    `Rechne ${start} + ${added}.`,
    `Zusammen sind es ${start + added} Punkte.`,
  ], "Textverstaendnis", [], "?");
}

function equationsQuestion() {
  const kind = randomPick(["linear-add", "linear-subtract", "missing-factor"]);
  if (kind === "linear-subtract") {
    const x = randomInt(8, 30);
    const sub = randomInt(2, 10);
    return question("equations", "linear", "Loese die Gleichung.", `x - ${sub} = ${x - sub}. Wie groß ist x?`, x, [
      "Du willst x allein haben.",
      `Addiere ${sub} auf beiden Seiten.`,
      `x = ${x}.`,
    ], "Vorzeichen", [`x=${x}`, `x = ${x}`], "x");
  }
  if (kind === "missing-factor") {
    const x = randomInt(2, 12);
    const factor = randomInt(2, 10);
    return question("equations", "missing-factor", "Finde den Platzhalter.", `□ × ${factor} = ${x * factor}. Welche Zahl gehoert in das Feld?`, x, [
      "Suche die passende Geteiltaufgabe.",
      `Rechne ${x * factor} geteilt durch ${factor}.`,
      `In das Feld gehoert ${x}.`,
    ], "Umformen", [], "x");
  }
  const x = randomInt(3, 25);
  const add = randomInt(2, 15);
  return question("equations", "linear", "Loese die Gleichung.", `x + ${add} = ${x + add}. Wie groß ist x?`, x, [
    "Du willst x allein haben.",
    `Ziehe ${add} auf beiden Seiten ab.`,
    `x = ${x}.`,
  ], "Vorzeichen", [`x=${x}`, `x = ${x}`], "x");
}

function coordinatesQuestion() {
  const kind = randomPick(["distance-axis", "read-point"]);
  if (kind === "read-point") {
    const x = randomInt(0, 9);
    const y = randomInt(0, 9);
    return question("coordinates", "read-point", "Lies Koordinaten.", `Ein Punkt liegt ${x} Schritte nach rechts und ${y} Schritte nach oben. Wie lautet er als (x|y)?`, `(${x}|${y})`, [
      "Zuerst kommt die x-Koordinate.",
      "Danach kommt die y-Koordinate.",
      `Der Punkt lautet (${x}|${y}).`,
    ], "Koordinaten", [`${x}|${y}`, `(${x},${y})`], "(x|y)");
  }
  const a = randomInt(0, 8);
  const b = randomInt(a + 2, 15);
  return question("coordinates", "distance-axis", "Koordinaten", `Wie weit liegen A(${a}|0) und B(${b}|0) auseinander?`, b - a, [
    "Beide Punkte liegen auf einer Achse.",
    `Bilde die Differenz: ${b} - ${a}.`,
    `Der Abstand ist ${b - a}.`,
  ], "Koordinaten", [], "(x|y)");
}

function statisticsQuestion() {
  const kind = randomPick(["mean", "table-sum", "range"]);
  const values = [randomInt(2, 12), randomInt(2, 12), randomInt(2, 12), randomInt(2, 12)];
  if (kind === "table-sum") {
    const sum = values.reduce((acc, value) => acc + value, 0);
    return question("statistics", "table-sum", "Lies Daten.", `In vier Runden wurden ${values.join(", ")} Punkte erzielt. Wie viele Punkte sind es zusammen?`, sum, [
      "Zusammen bedeutet: alle Werte addieren.",
      `Rechne ${values.join(" + ")}.`,
      `Zusammen sind es ${sum} Punkte.`,
    ], "Diagrammlesen", [], "▥");
  }
  if (kind === "range") {
    const min = Math.min(...values);
    const max = Math.max(...values);
    return question("statistics", "range", "Bestimme die Spannweite.", `Die Werte sind ${values.join(", ")}. Wie groß ist der Unterschied zwischen groesstem und kleinstem Wert?`, max - min, [
      "Suche den kleinsten und den groessten Wert.",
      `Rechne ${max} - ${min}.`,
      `Die Spannweite ist ${max - min}.`,
    ], "Diagrammlesen", [], "▥");
  }
  const answer = roundTo(values.reduce((acc, value) => acc + value, 0) / values.length, 2);
  return question("statistics", "mean", "Statistik", `Berechne den Mittelwert von ${values.join(", ")}.`, answer, [
    "Addiere alle Werte.",
    `Teile die Summe durch ${values.length} Werte.`,
    `Der Mittelwert ist ${formatDecimal(answer)}.`,
  ], "Mittelwert", [formatDecimal(answer)], "▥");
}

function question(moduleId, skillId, title, prompt, answer, hintSteps, errorType, acceptedAnswers = [], visual = "✦") {
  return {
    id: cryptoSafeId(),
    moduleId,
    skillId,
    title,
    prompt,
    answer,
    acceptedAnswers,
    hint: hintSteps[0],
    hintSteps,
    explanation: hintSteps[hintSteps.length - 1],
    errorType,
    placeholder: "Antwort",
    visual,
    type: "generated",
  };
}

function makeStaticQuestion(moduleId, skillId, prompt, answer, accepted, hintSteps) {
  return {
    id: `${moduleId}-${skillId}-${answer}`,
    moduleId,
    skillId,
    missionId: missionForModule(moduleId)?.id ?? null,
    level: null,
    title: titleFor(moduleId),
    prompt,
    answer,
    acceptedAnswers: [accepted],
    hint: hintSteps[0],
    hintSteps,
    explanation: hintSteps[hintSteps.length - 1],
    errorType: skillId,
    placeholder: "Antwort",
    visual: moduleId === "geometry" ? "▭" : "✦",
    type: "fixed",
  };
}

function buildRecommendations(weak, byError, nextMission) {
  const items = weak.map((item) => `${titleFor(item.moduleId)} wiederholen (${item.accuracy}% richtig)`);
  for (const [errorType, count] of Array.from(byError.entries()).sort((a, b) => b[1] - a[1]).slice(0, 2)) {
    items.push(`${errorType} gezielt ueben (${count} Fehler)`);
  }
  if (nextMission) {
    items.unshift(`Naechste Mission: ${nextMission.title}`);
  }
  return [...new Set(items)].slice(0, 5);
}

function recommendNextMission(progressItems, attempts) {
  const incomplete = missions
    .map((missionItem) => ({ mission: missionItem, progress: getMissionProgress(progressItems, missionItem.id) }))
    .filter(({ progress }) => !progress?.completed)
    .sort((a, b) => {
      const aCorrect = a.progress?.correct_count ?? 0;
      const bCorrect = b.progress?.correct_count ?? 0;
      if (aCorrect !== bCorrect) return bCorrect - aCorrect;
      return a.mission.order - b.mission.order;
    })[0]?.mission;

  if (incomplete) return incomplete;
  const weakest = summarizeAttemptsWithoutMissions(attempts).moduleScores.sort((a, b) => a.accuracy - b.accuracy)[0];
  return weakest ? missionForModule(weakest.moduleId) : missions[0];
}

function summarizeAttemptsWithoutMissions(attempts) {
  const byModule = attempts.reduce((map, attempt) => {
    const entry = map.get(attempt.module_id) ?? { total: 0, correct: 0 };
    entry.total += 1;
    if (attempt.is_correct) entry.correct += 1;
    map.set(attempt.module_id, entry);
    return map;
  }, new Map());
  return {
    moduleScores: Array.from(byModule.entries()).map(([moduleId, value]) => ({
      moduleId,
      total: value.total,
      accuracy: Math.round((value.correct / value.total) * 100),
    })),
  };
}

function normalizeAnswer(value) {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(",", ".")
    .replace(/\s+/g, "")
    .replace(/€/g, "euro")
    .replace(/cm²/g, "cm2")
    .replace(/[^0-9a-z<>/=().|,-]/g, "");
}

function titleFor(moduleId) {
  return learningModules.find((item) => item.id === moduleId)?.title ?? moduleId;
}

function missionFor(missionId) {
  return missions.find((item) => item.id === missionId);
}

function missionForModule(moduleId) {
  return missions.find((item) => item.moduleId === moduleId);
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
