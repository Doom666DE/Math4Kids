export const subjects = [
  subject("math", "Mathe", "Zahlen, Formen, Daten und Problemlösen.", "4", "#18a999", 1, 6, 1),
  subject("german", "Deutsch", "Lesen, Schreiben, Grammatik und Sprache.", "Aa", "#ff7568", 1, 6, 2),
  subject("english", "Englisch", "Wortschatz, Sätze, Lesen und Übersetzen.", "EN", "#4d96ff", 1, 6, 3),
  subject("science", "Sachkunde/Naturwissen", "Natur, Körper, Wetter, Energie und Experimente.", "⚗", "#68bd7d", 1, 6, 4),
  subject("history", "Geschichte", "Zeit, Quellen, Epochen und Ereignisse.", "⌛", "#b47dff", 3, 6, 5),
  subject("geography", "Geografie", "Karten, Länder, Klima, Maßstab und Orientierung.", "⌖", "#f5a623", 3, 6, 6),
  subject("computer-science", "Informatik", "Muster, Logik, Daten und Algorithmen.", "01", "#5468ff", 3, 6, 7),
];

export const learningModules = [
  module("arithmetic", "math", "brain", "Grundrechenarten", ["Plus/Minus", "Mal/Geteilt", "Kopfrechnen", "Reihen"], 1, 6),
  module("fractions", "math", "book", "Brüche", ["Bruchteile", "Erweitern/Kürzen", "Brüche vergleichen"], 3, 6),
  module("decimals", "math", "bar", "Dezimalzahlen", ["Stellenwerte", "Runden", "Rechnen mit Kommazahlen"], 4, 6),
  module("percent", "math", "target", "Prozent", ["Prozentwert", "Grundwert", "Rabatte"], 5, 6),
  module("geometry", "math", "shapes", "Geometrie", ["Formen", "Umfang", "Fläche", "Winkel", "Körper"], 2, 6),
  module("measures", "math", "ruler", "Maßeinheiten", ["Länge", "Gewicht", "Zeit", "Geld", "Volumen"], 2, 6),
  module("word-problems", "math", "book", "Textaufgaben", ["Informationen erkennen", "Rechenweg wählen", "Antwortsatz"], 2, 6),
  module("equations", "math", "brain", "Gleichungen", ["Platzhalter", "Umformen", "Probe"], 5, 6),
  module("coordinates", "math", "bar", "Koordinaten", ["Punkte lesen", "Punkte eintragen", "Abstände"], 5, 6),
  module("statistics", "math", "bar", "Statistik", ["Tabellen", "Diagramme", "Mittelwert"], 4, 6),
  module("german-language", "german", "book", "Deutsch-Grundlagen", ["Rechtschreibung", "Wortarten", "Satzglieder", "Leseverständnis"], 1, 6),
  module("german-spelling", "german", "book", "Rechtschreib-Werkstatt", ["Merkwörter", "Doppelkonsonanten", "Dehnung", "Fehler finden"], 1, 6),
  module("german-grammar", "german", "brain", "Grammatik-Labor", ["Wortarten", "Satzglieder", "Zeitformen", "Satzbau"], 2, 6),
  module("german-punctuation", "german", "target", "Zeichensetzung", ["Satzzeichen", "Kommas", "Wörtliche Rede", "Satzarten"], 3, 6),
  module("german-reading", "german", "book", "Lese-Detektiv", ["Hauptaussage", "Details", "Schlussfolgern", "Textsorten"], 2, 6),
  module("english-basics", "english", "book", "Englisch-Basics", ["Vokabeln", "Satzbau", "Übersetzen", "Leseverständnis"], 1, 6),
  module("english-vocabulary", "english", "book", "Vocabulary Quest", ["Alltag", "Schule", "Familie", "Tiere"], 1, 6),
  module("english-grammar", "english", "brain", "Grammar Base", ["to be", "simple present", "Fragen", "Verneinung"], 3, 6),
  module("english-dialogues", "english", "target", "Dialog-Training", ["Begrüßen", "Fragen", "Antworten", "Alltagssätze"], 3, 6),
  module("english-reading", "english", "book", "Reading Corner", ["Kurztexte", "Hauptidee", "Details", "Wortbedeutung"], 4, 6),
  module("science-world", "science", "target", "Naturwissen", ["Körper", "Tiere/Pflanzen", "Wetter", "Energie"], 1, 6),
  module("science-body", "science", "brain", "Körper & Gesundheit", ["Organe", "Sinne", "Ernährung", "Bewegung"], 1, 6),
  module("science-animals", "science", "book", "Tiere & Pflanzen", ["Lebensräume", "Pflanzenteile", "Nahrungsketten", "Anpassung"], 1, 6),
  module("science-weather", "science", "bar", "Wetter & Klima", ["Wettergeräte", "Wasserkreislauf", "Jahreszeiten", "Beobachten"], 2, 6),
  module("science-energy", "science", "target", "Energie & Experimente", ["Strom", "Licht", "Wärme", "Versuche"], 3, 6),
  module("science-space", "science", "bar", "Erde & Weltall", ["Planeten", "Mond", "Tag/Nacht", "Jahreszeiten"], 4, 6),
  module("history-time", "history", "bar", "Geschichte", ["Zeitstrahl", "Quellen", "Epochen", "Begriffe"], 3, 6),
  module("history-timeline", "history", "bar", "Zeitstrahl", ["Reihenfolge", "Jahrhunderte", "früher/später", "Ereignisse"], 3, 6),
  module("history-sources", "history", "book", "Quellen-Forscher", ["Fotos", "Briefe", "Gegenstände", "Berichte"], 4, 6),
  module("history-daily-life", "history", "target", "Alltag früher", ["Schule", "Arbeit", "Wohnen", "Kindheit"], 3, 6),
  module("history-eras", "history", "bar", "Epochen-Reise", ["Steinzeit", "Antike", "Mittelalter", "Neuzeit"], 5, 6),
  module("geography-map", "geography", "ruler", "Geografie", ["Karten", "Länder", "Klima", "Maßstab"], 3, 6),
  module("geography-orientation", "geography", "ruler", "Karten & Orientierung", ["Himmelsrichtungen", "Legende", "Planquadrate", "Kartenzeichen"], 3, 6),
  module("geography-germany", "geography", "book", "Deutschland", ["Bundesländer", "Städte", "Flüsse", "Landschaften"], 3, 6),
  module("geography-europe", "geography", "book", "Europa", ["Länder", "Hauptstädte", "Nachbarn", "Regionen"], 4, 6),
  module("geography-scale", "geography", "ruler", "Maßstab", ["Entfernungen", "Kartenmaßstab", "Vergleichen", "Einheiten"], 5, 6),
  module("geography-climate", "geography", "bar", "Klima & Räume", ["Klimazonen", "Wetterkarten", "Landschaften", "Anpassung"], 4, 6),
  module("coding-logic", "computer-science", "brain", "Informatik-Grundlagen", ["Muster", "Logik", "Algorithmen", "Daten"], 3, 6),
  module("cs-patterns", "computer-science", "brain", "Muster & Logik", ["Folgen", "Bedingungen", "Wahr/Falsch", "Regeln"], 3, 6),
  module("cs-algorithms", "computer-science", "target", "Algorithmen", ["Schritte", "Schleifen", "Bedingungen", "Debugging"], 3, 6),
  module("cs-data", "computer-science", "bar", "Daten verstehen", ["Tabellen", "Sortieren", "Codieren", "Datenschutz"], 4, 6),
  module("cs-binary", "computer-science", "brain", "Binärzahlen", ["Bits", "Zweiersystem", "Codierung", "Umwandeln"], 5, 6),
];

export const missions = [
  mission("zahlenwelt", "arithmetic", "Zahlenwelt", "Schnell und sicher mit Plus, Minus, Mal und Geteilt.", "Zahlen-Profi", "4", 1, 6, 1),
  mission("bruch-pizza", "fractions", "Bruch-Pizza", "Teile erkennen, vergleichen und Bruchteile berechnen.", "Bruch-Bäcker", "1/2", 3, 8, 2),
  mission("komma-werkstatt", "decimals", "Komma-Werkstatt", "Dezimalzahlen lesen, runden und zusammenrechnen.", "Komma-Meister", "0,5", 4, 8, 3),
  mission("prozent-shop", "percent", "Prozent-Shop", "Rabatte, Prozentwerte und Grundwerte im Alltag.", "Rabatt-Profi", "%", 5, 10, 4),
  mission("geometrie-labor", "geometry", "Geometrie-Labor", "Formen, Umfang, Fläche, Winkel und Körper.", "Formen-Forscher", "▭", 2, 10, 5),
  mission("einheiten-reise", "measures", "Einheiten-Reise", "Längen, Zeiten, Geld, Gewicht und Volumen umwandeln.", "Einheiten-Pilot", "m", 2, 8, 6),
  mission("detektiv-texte", "word-problems", "Textaufgaben-Detektiv", "Wichtige Informationen finden und den Rechenweg wählen.", "Text-Detektiv", "?", 2, 8, 7),
  mission("gleichungs-dojo", "equations", "Gleichungs-Dojo", "Platzhalter und einfache Gleichungen sauber lösen.", "Gleichungs-Ninja", "x", 5, 10, 8),
  mission("koordinaten-karte", "coordinates", "Koordinaten-Karte", "Punkte lesen, Wege finden und Abstände bestimmen.", "Karten-Profi", "(x|y)", 5, 10, 9),
  mission("statistik-studio", "statistics", "Statistik-Studio", "Tabellen, Diagramme und Mittelwerte verstehen.", "Daten-Profi", "▥", 4, 10, 10),
  mission("wort-werkstatt", "german-language", "Wort-Werkstatt", "Wortarten, Rechtschreibung, Satzglieder und Lesen.", "Sprach-Profi", "Aa", 1, 10, 11),
  mission("rechtschreib-agent", "german-spelling", "Rechtschreib-Agent", "Merkwörter, Dehnung und häufige Fehler sicher erkennen.", "Fehler-Finder", "Aa", 1, 6, 12),
  mission("grammatik-labor", "german-grammar", "Grammatik-Labor", "Wortarten, Satzglieder und Zeitformen untersuchen.", "Grammatik-Profi", "S", 2, 6, 13),
  mission("zeichen-detektiv", "german-punctuation", "Zeichen-Detektiv", "Satzzeichen, Kommas und wörtliche Rede üben.", "Zeichen-Profi", "?!", 3, 6, 14),
  mission("lese-detektiv", "german-reading", "Lese-Detektiv", "Kurze Texte verstehen, Details finden und Schlüsse ziehen.", "Lese-Profi", "📖", 2, 6, 15),
  mission("english-quest", "english-basics", "English Quest", "Vokabeln, einfache Sätze und kurze Texte verstehen.", "Word Hero", "EN", 1, 6, 16),
  mission("vocabulary-quest", "english-vocabulary", "Vocabulary Quest", "Alltagswörter sicher verstehen und anwenden.", "Word Champion", "EN", 1, 6, 17),
  mission("grammar-base", "english-grammar", "Grammar Base", "Einfache englische Sätze, Fragen und Verneinungen bauen.", "Grammar Hero", "is", 3, 6, 18),
  mission("dialog-training", "english-dialogues", "Dialog-Training", "Fragen und Antworten in Alltagssituationen ergänzen.", "Talk-Profi", "Hi", 3, 6, 19),
  mission("reading-corner", "english-reading", "Reading Corner", "Kurze englische Texte lesen und verstehen.", "Reading Hero", "EN", 4, 6, 20),
  mission("natur-labor", "science-world", "Natur-Labor", "Körper, Pflanzen, Wetter, Energie und Experimente verstehen.", "Natur-Profi", "⚗", 1, 6, 21),
  mission("koerper-check", "science-body", "Körper-Check", "Organe, Sinne, Ernährung und Bewegung verstehen.", "Körper-Profi", "♥", 1, 6, 22),
  mission("pflanzen-tierwelt", "science-animals", "Pflanzen & Tierwelt", "Lebensräume, Pflanzenteile und Nahrungsketten ordnen.", "Natur-Forscher", "🌱", 1, 6, 23),
  mission("wetter-station", "science-weather", "Wetter-Station", "Wetter messen, Wasserkreislauf und Jahreszeiten erklären.", "Wetter-Profi", "☁", 2, 6, 24),
  mission("energie-labor", "science-energy", "Energie-Labor", "Strom, Licht, Wärme und Versuchsschritte verstehen.", "Energie-Forscher", "⚡", 3, 6, 25),
  mission("weltall-reise", "science-space", "Weltall-Reise", "Erde, Mond, Planeten und Tag/Nacht erforschen.", "Weltall-Profi", "☾", 4, 6, 26),
  mission("zeitreise", "history-time", "Zeitreise", "Epochen, Quellen und Ereignisse in Reihenfolge bringen.", "Zeit-Profi", "⌛", 3, 6, 27),
  mission("zeitstrahl-profi", "history-timeline", "Zeitstrahl-Profi", "Früher, später und Jahrhunderte sicher einordnen.", "Chronologie-Profi", "⌛", 3, 6, 28),
  mission("quellen-forscher", "history-sources", "Quellen-Forscher", "Historische Quellen erkennen und auswerten.", "Quellen-Profi", "✉", 4, 6, 29),
  mission("alltag-frueher", "history-daily-life", "Alltag früher", "Schule, Wohnen und Kindheit früher mit heute vergleichen.", "Alltags-Historiker", "🏠", 3, 6, 30),
  mission("epochen-reise", "history-eras", "Epochen-Reise", "Steinzeit, Antike, Mittelalter und Neuzeit unterscheiden.", "Epochen-Profi", "🏛", 5, 6, 31),
  mission("karten-kompass", "geography-map", "Karten-Kompass", "Karten, Länder, Himmelsrichtungen und Maßstab üben.", "Karten-Profi", "⌖", 3, 6, 32),
  mission("orientierungs-profi", "geography-orientation", "Orientierungs-Profi", "Himmelsrichtungen, Legenden und Kartenzeichen nutzen.", "Kompass-Profi", "N", 3, 6, 33),
  mission("deutschland-tour", "geography-germany", "Deutschland-Tour", "Bundesländer, Städte, Flüsse und Landschaften kennen.", "Deutschland-Profi", "DE", 3, 6, 34),
  mission("europa-reise", "geography-europe", "Europa-Reise", "Länder, Hauptstädte und Nachbarn Europas üben.", "Europa-Profi", "EU", 4, 6, 35),
  mission("massstab-meister", "geography-scale", "Maßstab-Meister", "Entfernungen auf Karten berechnen und vergleichen.", "Maßstab-Profi", "km", 5, 6, 36),
  mission("klima-forscher", "geography-climate", "Klima-Forscher", "Klimazonen, Landschaften und Wetterkarten verstehen.", "Klima-Profi", "☀", 4, 6, 37),
  mission("code-knacker", "coding-logic", "Code-Knacker", "Muster, Logik, Daten und Algorithmen verstehen.", "Logik-Profi", "01", 3, 6, 38),
  mission("muster-logik", "cs-patterns", "Muster & Logik", "Folgen, Bedingungen und Wahr/Falsch-Regeln erkennen.", "Logik-Champion", "◧", 3, 6, 39),
  mission("algorithmus-pfad", "cs-algorithms", "Algorithmus-Pfad", "Schritte sortieren, Schleifen verstehen und Fehler finden.", "Algorithmus-Profi", "↻", 3, 6, 40),
  mission("daten-detektiv", "cs-data", "Daten-Detektiv", "Daten ordnen, Tabellen lesen und Codes verstehen.", "Daten-Profi", "▦", 4, 6, 41),
  mission("binary-bits", "cs-binary", "Binary Bits", "Bits und Binärzahlen in einfache Zahlen umwandeln.", "Bit-Profi", "01", 5, 6, 42),
];

export const skillLabels = {
  addition: "Addition",
  subtraction: "Subtraktion",
  multiplication: "Multiplikation",
  division: "Division",
  "fraction-of": "Bruchteil berechnen",
  compare: "Brüche vergleichen",
  simplify: "Brüche kürzen",
  "decimal-add": "Dezimalzahlen addieren",
  "decimal-place": "Stellenwert erkennen",
  "decimal-round": "Dezimalzahlen runden",
  "percent-value": "Prozentwert berechnen",
  discount: "Rabatt berechnen",
  "basic-percent": "Prozent als Bruch",
  perimeter: "Umfang berechnen",
  area: "Fläche berechnen",
  "shape-sides": "Formen erkennen",
  "angle-type": "Winkel bestimmen",
  time: "Zeit umwandeln",
  money: "Geld umwandeln",
  weight: "Gewicht umwandeln",
  volume: "Volumen umwandeln",
  length: "Länge umwandeln",
  model: "Rechenmodell finden",
  "addition-story": "Plus-Textaufgabe",
  "subtraction-story": "Minus-Textaufgabe",
  "multiplication-story": "Mal-Textaufgabe",
  linear: "Lineare Gleichung",
  "missing-factor": "Platzhalter finden",
  "read-point": "Koordinaten lesen",
  "distance-axis": "Abstand auf Achse",
  "table-sum": "Tabellensumme",
  range: "Spannweite",
  mean: "Mittelwert",
  "number-line": "Zahlenstrahl",
  "math-pyramid": "Rechenmauer",
  "chart-read": "Diagramm lesen",
  spelling: "Rechtschreibung",
  "parts-of-speech": "Wortarten",
  "sentence-parts": "Satzglieder",
  "reading-main-idea": "Leseverständnis",
  punctuation: "Zeichensetzung",
  "direct-speech": "Wörtliche Rede",
  "spelling-error": "Fehler finden",
  "reading-detail": "Textdetails",
  "reading-inference": "Schlussfolgern",
  vocabulary: "Vokabeln",
  translation: "Übersetzen",
  "sentence-order": "Satzbau",
  "english-dialogue": "Dialog ergänzen",
  "english-question": "Frage bilden",
  "english-reading-detail": "Leseverständnis Englisch",
  "body-systems": "Körperwissen",
  "plants-animals": "Tiere und Pflanzen",
  "plant-parts": "Pflanzenteile",
  "food-chain": "Nahrungskette",
  weather: "Wetter",
  "water-cycle": "Wasserkreislauf",
  energy: "Energie",
  experiment: "Experiment verstehen",
  space: "Erde und Weltall",
  timeline: "Zeitstrahl",
  century: "Jahrhundert",
  sources: "Quellen",
  eras: "Epochen",
  "daily-life": "Alltag früher",
  maps: "Karten lesen",
  countries: "Länderwissen",
  "federal-states": "Bundesländer",
  europe: "Europa",
  compass: "Himmelsrichtungen",
  scale: "Maßstab",
  climate: "Klima",
  patterns: "Muster",
  logic: "Logik",
  algorithms: "Algorithmen",
  debugging: "Fehler im Ablauf finden",
  data: "Daten verstehen",
  binary: "Binärzahlen",
};

export const errorTypeLabels = {
  ok: "keine",
  Rechenfehler: "Rechenfehler",
  Bruchvergleich: "Bruchvergleich",
  Bruchkuerzen: "Brüche kürzen",
  Stellenwert: "Stellenwert",
  Formelwahl: "Formelwahl",
  Formen: "Formen erkennen",
  Winkel: "Winkel",
  Einheiten: "Einheitenfehler",
  Textverstaendnis: "Textverständnis",
  Umformen: "Umformen",
  Vorzeichen: "Vorzeichen",
  Koordinaten: "Koordinaten",
  Diagrammlesen: "Diagramm lesen",
  Mittelwert: "Mittelwert",
  addition: "Addition",
  time: "Zeit umwandeln",
  perimeter: "Umfang berechnen",
  model: "Textverständnis",
  "fraction-of": "Bruchteil berechnen",
  "percent-value": "Prozentwert berechnen",
  "decimal-add": "Dezimalzahlen addieren",
  area: "Fläche berechnen",
  linear: "Lineare Gleichung",
  mean: "Mittelwert",
  "distance-axis": "Abstand auf Achse",
  discount: "Rabatt berechnen",
  spelling: "Rechtschreibung",
  grammar: "Grammatik",
  reading: "Leseverständnis",
  vocabulary: "Wortschatz",
  translation: "Übersetzen",
  punctuation: "Zeichensetzung",
  science: "Naturwissen",
  experiment: "Versuchsverständnis",
  timeline: "Zeitstrahl",
  sources: "Quellen",
  eras: "Epochen",
  geography: "Geografie",
  scale: "Maßstab",
  climate: "Klima",
  logic: "Logik",
  algorithm: "Algorithmus",
  data: "Daten",
};

export function skillLabel(skillId) {
  return skillLabels[skillId] ?? skillId ?? "-";
}

export function errorTypeLabel(errorType) {
  return errorTypeLabels[errorType] ?? skillLabel(errorType) ?? errorType ?? "keine";
}

export const topics = [
  topic("math-arithmetic", "math", "arithmetic", "Zahlen & Rechnen", 1, 6),
  topic("math-geometry", "math", "geometry", "Geometrie & Messen", 2, 6),
  topic("math-data", "math", "statistics", "Daten & Diagramme", 4, 6),
  topic("de-language", "german", "german-language", "Sprache untersuchen", 1, 6),
  topic("de-spelling", "german", "german-spelling", "Richtig schreiben", 1, 6),
  topic("de-grammar", "german", "german-grammar", "Grammatik verstehen", 2, 6),
  topic("de-punctuation", "german", "german-punctuation", "Zeichen setzen", 3, 6),
  topic("de-reading", "german", "german-reading", "Texte verstehen", 2, 6),
  topic("en-basics", "english", "english-basics", "Englisch verstehen", 1, 6),
  topic("en-vocabulary", "english", "english-vocabulary", "Wörter verstehen", 1, 6),
  topic("en-grammar", "english", "english-grammar", "Sätze bauen", 3, 6),
  topic("en-dialogues", "english", "english-dialogues", "Dialoge führen", 3, 6),
  topic("en-reading", "english", "english-reading", "Englische Texte lesen", 4, 6),
  topic("science-basics", "science", "science-world", "Natur erforschen", 1, 6),
  topic("science-body-topic", "science", "science-body", "Körper & Gesundheit", 1, 6),
  topic("science-animals-topic", "science", "science-animals", "Tiere & Pflanzen", 1, 6),
  topic("science-weather-topic", "science", "science-weather", "Wetter & Klima", 2, 6),
  topic("science-energy-topic", "science", "science-energy", "Energie & Experimente", 3, 6),
  topic("science-space-topic", "science", "science-space", "Erde & Weltall", 4, 6),
  topic("history-basics", "history", "history-time", "Zeit verstehen", 3, 6),
  topic("history-timeline-topic", "history", "history-timeline", "Zeitstrahl nutzen", 3, 6),
  topic("history-sources-topic", "history", "history-sources", "Quellen untersuchen", 4, 6),
  topic("history-daily-topic", "history", "history-daily-life", "Alltag früher", 3, 6),
  topic("history-eras-topic", "history", "history-eras", "Epochen kennen", 5, 6),
  topic("geo-basics", "geography", "geography-map", "Räume verstehen", 3, 6),
  topic("geo-orientation", "geography", "geography-orientation", "Karten lesen", 3, 6),
  topic("geo-germany", "geography", "geography-germany", "Deutschland kennen", 3, 6),
  topic("geo-europe", "geography", "geography-europe", "Europa kennen", 4, 6),
  topic("geo-scale", "geography", "geography-scale", "Maßstab nutzen", 5, 6),
  topic("geo-climate", "geography", "geography-climate", "Klima verstehen", 4, 6),
  topic("cs-basics", "computer-science", "coding-logic", "Logisch denken", 3, 6),
  topic("cs-patterns-topic", "computer-science", "cs-patterns", "Muster & Logik", 3, 6),
  topic("cs-algorithms-topic", "computer-science", "cs-algorithms", "Algorithmen bauen", 3, 6),
  topic("cs-data-topic", "computer-science", "cs-data", "Daten verstehen", 4, 6),
  topic("cs-binary-topic", "computer-science", "cs-binary", "Binärzahlen", 5, 6),
];

export const taskTemplates = [
  template("tpl-addition-flex", "math", "arithmetic", "math-arithmetic", "addition", "Zahlen addieren", "number", 1, 10, "✦", "Rechenfehler", ({ grade }) => {
    const max = grade <= 2 ? 20 : grade <= 4 ? 100 : 1000;
    const a = randomInt(2, max);
    const b = randomInt(2, Math.min(max, 150));
    return task(`${a} + ${b} = ?`, a + b, [`Zerlege ${a} und ${b}.`, "Addiere erst die größeren Stellen.", `${a} + ${b} = ${a + b}.`]);
  }),
  template("tpl-fraction-of-flex", "math", "fractions", "math-arithmetic", "fraction-of", "Bruchteil berechnen", "number", 3, 10, "1/2", "Bruchteil", ({ grade }) => {
    const denominator = randomPick([2, 3, 4, 5, 8, 10]);
    const whole = denominator * randomInt(2, grade <= 5 ? 8 : 14);
    const numerator = randomInt(1, denominator - 1);
    const answer = (whole / denominator) * numerator;
    return task(`Wie viel ist ${numerator}/${denominator} von ${whole}?`, answer, [`Teile ${whole} durch ${denominator}.`, `Ein Teil ist ${whole / denominator}; nimm ${numerator} Teile.`, `${numerator}/${denominator} von ${whole} ist ${answer}.`]);
  }),
  template("tpl-area-flex", "math", "geometry", "math-geometry", "area", "Fläche berechnen", "unit", 4, 10, "▭", "Formelwahl", ({ grade }) => {
    const length = randomInt(4, grade <= 5 ? 12 : 24);
    const width = randomInt(3, grade <= 5 ? 10 : 18);
    const answer = length * width;
    return task(`Ein Rechteck ist ${length} cm lang und ${width} cm breit. Berechne die Fläche.`, answer, ["Fläche Rechteck = Länge mal Breite.", `Rechne ${length} mal ${width}.`, `Die Fläche ist ${answer} cm².`], [`${answer} cm²`, `${answer} cm2`]);
  }),
  template("tpl-mean-flex", "math", "statistics", "math-data", "mean", "Mittelwert berechnen", "decimal", 5, 10, "▥", "Mittelwert", () => {
    const values = [randomInt(2, 20), randomInt(2, 20), randomInt(2, 20), randomInt(2, 20)];
    const answer = roundTo(values.reduce((sum, value) => sum + value, 0) / values.length, 2);
    return task(`Berechne den Mittelwert von ${values.join(", ")}.`, answer, ["Addiere alle Werte.", `Teile die Summe durch ${values.length}.`, `Der Mittelwert ist ${formatDecimal(answer)}.`], [formatDecimal(answer)]);
  }),
  template("tpl-german-word-type", "german", "german-language", "de-language", "parts-of-speech", "Wortarten bestimmen", "multiple-choice", 1, 10, "Aa", "grammar", () => {
    const item = randomPick([
      ["laufen", "Verb", "Tunwort"],
      ["schnell", "Adjektiv", "Wiewort"],
      ["Haus", "Nomen", "Namenwort"],
      ["unter", "Präposition", "Verhältniswort"],
    ]);
    return task(`Welche Wortart hat "${item[0]}"?`, item[1], [`Frage dich, was das Wort leistet.`, `${item[0]} ist ein ${item[2]}.`, `Die richtige Wortart ist ${item[1]}.`], [item[2]], ["Nomen", "Verb", "Adjektiv", "Präposition"]);
  }),
  template("tpl-german-spelling", "german", "german-language", "de-language", "spelling", "Rechtschreibung", "text", 1, 10, "Aa", "spelling", () => {
    const item = randomPick([["Fahrrad", "Fahrad"], ["nämlich", "nemlich"], ["Rhythmus", "Rythmus"], ["Schlüssel", "Schlüsel"]]);
    return task(`Welches Wort ist richtig geschrieben: ${item[0]} oder ${item[1]}?`, item[0], ["Lies beide Wörter langsam.", "Achte auf doppelte Buchstaben und Merkwörter.", `Richtig ist: ${item[0]}.`]);
  }),
  template("tpl-english-vocabulary", "english", "english-basics", "en-basics", "vocabulary", "Vokabeln", "text", 1, 10, "EN", "vocabulary", () => {
    const item = randomPick([["Hund", "dog"], ["Katze", "cat"], ["Apfel", "apple"], ["Schule", "school"], ["Wasser", "water"], ["Freund", "friend"]]);
    return task(`Wie heißt "${item[0]}" auf Englisch?`, item[1], ["Denke an bekannte Alltagswörter.", `Das deutsche Wort ist ${item[0]}.`, `${item[0]} heißt auf Englisch ${item[1]}.`]);
  }),
  template("tpl-english-sentence-order", "english", "english-basics", "en-basics", "sentence-order", "Satzbau", "text", 3, 10, "EN", "translation", () => {
    const item = randomPick([["I like apples.", "Ich mag Äpfel."], ["She plays football.", "Sie spielt Fußball."], ["We are friends.", "Wir sind Freunde."]]);
    return task(`Übersetze: ${item[1]}`, item[0], ["Beginne mit dem Subjekt.", "Im Englischen folgt danach meist das Verb.", `Eine passende Übersetzung ist: ${item[0]}`]);
  }),
  template("tpl-english-vocabulary-deep", "english", "english-vocabulary", "en-vocabulary", "vocabulary", "Vocabulary Quest", "text", 1, 6, "EN", "vocabulary", () => {
    const item = randomPick([["Tisch", "table"], ["Buch", "book"], ["rot", "red"], ["spielen", "play"], ["Mutter", "mother"], ["Fenster", "window"]]);
    return task(`Wie heißt "${item[0]}" auf Englisch?`, item[1], ["Denke an Grundwörter aus Alltag und Schule.", `Das deutsche Wort ist ${item[0]}.`, `${item[0]} heißt auf Englisch ${item[1]}.`]);
  }),
  template("tpl-science-body", "science", "science-world", "science-basics", "body-systems", "Körperwissen", "text", 1, 10, "⚗", "science", () => {
    const item = randomPick([["Welches Organ pumpt Blut durch den Körper?", "Herz"], ["Womit atmen Menschen?", "Lunge"], ["Welches Sinnesorgan nutzt du zum Hören?", "Ohr"]]);
    return task(item[0], item[1], ["Denke an die Aufgabe des Organs.", "Ordne Funktion und Körperteil zu.", `Die Antwort ist: ${item[1]}.`]);
  }),
  template("tpl-science-body-deep", "science", "science-body", "science-body-topic", "body-systems", "Körper & Gesundheit", "multiple-choice", 1, 6, "♥", "science", () => {
    const item = randomPick([
      ["Welches Organ pumpt Blut durch den Körper?", "Herz", ["Herz", "Magen", "Ohr"]],
      ["Welches Sinnesorgan nutzt du zum Hören?", "Ohr", ["Ohr", "Auge", "Zunge"]],
      ["Was hilft dem Körper beim Wachsen und Gesundbleiben?", "ausgewogene Ernährung", ["ausgewogene Ernährung", "nur Süßigkeiten", "nie schlafen"]],
    ]);
    return task(item[0], item[1], ["Denke an die Aufgabe im Körper.", "Ordne Funktion und Körperteil zu.", `Richtig ist ${item[1]}.`], [], item[2]);
  }),
  template("tpl-science-weather", "science", "science-world", "science-basics", "weather", "Wetter", "multiple-choice", 1, 10, "☁", "science", () => {
    const item = randomPick([
      ["Welches Gerät misst Temperatur?", "Thermometer", ["Thermometer", "Windfahne", "Lineal"]],
      ["Welches Gerät misst Windrichtung?", "Windfahne", ["Windfahne", "Thermometer", "Waage"]],
      ["Was entsteht aus verdunstetem Wasser in der Höhe?", "Wolken", ["Wolken", "Steine", "Sand"]],
    ]);
    return task(item[0], item[1], ["Suche das passende Wetterwort.", "Denke an Messen und Beobachten.", `Richtig ist: ${item[1]}.`], [], item[2]);
  }),
  template("tpl-history-timeline", "history", "history-time", "history-basics", "timeline", "Zeitstrahl", "text", 5, 10, "⌛", "timeline", () => {
    const item = randomPick([["Was kommt früher: Mittelalter oder Neuzeit?", "Mittelalter"], ["Was kommt früher: Steinzeit oder Römerzeit?", "Steinzeit"], ["Was kommt später: Antike oder Mittelalter?", "Mittelalter"]]);
    return task(item[0], item[1], ["Ordne die Begriffe auf einem Zeitstrahl.", "Früher steht links, später rechts.", `Die richtige Antwort ist: ${item[1]}.`]);
  }),
  template("tpl-history-sources", "history", "history-time", "history-basics", "sources", "Quellen verstehen", "text", 5, 10, "⌛", "timeline", () => {
    const item = randomPick([["Ist ein Tagebuch eher Quelle oder Epoche?", "Quelle"], ["Ist ein altes Foto eine Quelle oder eine Himmelsrichtung?", "Quelle"], ["Ist die Antike eine Quelle oder eine Epoche?", "Epoche"]]);
    return task(item[0], item[1], ["Frage dich, ob es ein Zeugnis aus der Zeit ist.", "Quellen helfen, Vergangenheit zu untersuchen.", `Die Antwort ist: ${item[1]}.`]);
  }),
  template("tpl-geography-compass", "geography", "geography-map", "geo-basics", "compass", "Himmelsrichtungen", "text", 3, 10, "⌖", "geography", () => {
    const item = randomPick([["Welche Himmelsrichtung liegt auf Karten meistens oben?", "Norden"], ["Welche Richtung liegt gegenüber von Osten?", "Westen"], ["Welche Richtung liegt gegenüber von Süden?", "Norden"]]);
    return task(item[0], item[1], ["Denke an die Windrose.", "Gegenüberliegende Richtungen stehen sich auf der Karte gegenüber.", `Richtig ist: ${item[1]}.`]);
  }),
  template("tpl-geography-scale", "geography", "geography-map", "geo-basics", "scale", "Maßstab", "unit", 5, 10, "⌖", "geography", () => {
    const cm = randomInt(2, 9);
    const km = cm * 2;
    return task(`Auf einer Karte entsprechen 1 cm genau 2 km. Wie viele Kilometer sind ${cm} cm?`, km, ["Jeder Zentimeter steht für 2 km.", `Rechne ${cm} mal 2.`, `${cm} cm entsprechen ${km} km.`], [`${km} km`]);
  }),
  template("tpl-cs-patterns", "computer-science", "coding-logic", "cs-basics", "patterns", "Muster erkennen", "number", 3, 10, "01", "logic", () => {
    const start = randomInt(1, 8);
    const step = randomInt(2, 6);
    const values = [start, start + step, start + 2 * step, start + 3 * step];
    const answer = start + 4 * step;
    return task(`Setze die Zahlenfolge fort: ${values.join(", ")}, ?`, answer, [`Die Folge wächst immer um ${step}.`, `Addiere ${step} zur letzten Zahl.`, `Die nächste Zahl ist ${answer}.`]);
  }),
  template("tpl-cs-binary", "computer-science", "coding-logic", "cs-basics", "binary", "Binärzahlen", "number", 5, 10, "01", "logic", () => {
    const item = randomPick([["10", 2], ["11", 3], ["100", 4], ["101", 5], ["110", 6]]);
    return task(`Welche Dezimalzahl ist die Binärzahl ${item[0]}?`, item[1], ["Binärzahlen nutzen Zweierstellen.", "Lies von rechts: 1, 2, 4, 8 ...", `${item[0]} entspricht ${item[1]}.`]);
  }),
  template("tpl-number-line", "math", "arithmetic", "math-arithmetic", "number-line", "Zahlenstrahl", "number", 1, 6, "↔", "Rechenfehler", ({ grade }) => {
    const step = grade <= 2 ? 2 : grade <= 4 ? 5 : 25;
    const start = randomInt(0, grade <= 2 ? 20 : 200);
    const jumps = randomInt(2, 5);
    const answer = start + step * jumps;
    return task(`Am Zahlenstrahl startest du bei ${start} und gehst ${jumps} Sprünge zu je ${step} weiter. Wo landest du?`, answer, [`Ein Sprung ist ${step}.`, `Rechne ${jumps} mal ${step} und addiere zu ${start}.`, `Du landest bei ${answer}.`]);
  }),
  template("tpl-math-pyramid", "math", "arithmetic", "math-arithmetic", "math-pyramid", "Rechenmauer", "number", 2, 6, "▵", "Rechenfehler", ({ grade }) => {
    const a = randomInt(2, grade <= 3 ? 12 : 40);
    const b = randomInt(2, grade <= 3 ? 12 : 40);
    const c = randomInt(2, grade <= 3 ? 12 : 40);
    const answer = a + 2 * b + c;
    return task(`Rechenmauer: unten stehen ${a}, ${b}, ${c}. Jeder Stein ist die Summe der zwei darunter. Welche Zahl steht oben?`, answer, [`Berechne zuerst ${a} + ${b} und ${b} + ${c}.`, "Die obere Zahl ist die Summe der beiden mittleren Steine.", `Oben steht ${answer}.`]);
  }),
  template("tpl-chart-read", "math", "statistics", "math-data", "chart-read", "Diagramm lesen", "number", 4, 6, "▥", "Diagrammlesen", () => {
    const labels = ["Montag", "Dienstag", "Mittwoch", "Donnerstag"];
    const values = labels.map(() => randomInt(3, 18));
    const maxIndex = values.indexOf(Math.max(...values));
    return task(`Diagrammwerte: ${labels.map((label, index) => `${label} ${values[index]}`).join(", ")}. Wie viele Punkte hat der stärkste Tag?`, values[maxIndex], ["Suche den größten Wert.", `Der stärkste Tag ist ${labels[maxIndex]}.`, `Der größte Wert ist ${values[maxIndex]}.`]);
  }),
  template("tpl-decimal-place-deep", "math", "decimals", "math-arithmetic", "decimal-place", "Dezimalstellen", "number", 4, 6, "0,5", "Stellenwert", () => {
    const hundredths = randomInt(1, 9);
    const value = `${randomInt(1, 9)},${randomInt(1, 9)}${hundredths}`;
    return task(`Welche Ziffer steht bei ${value} an der Hundertstelstelle?`, hundredths, ["Nach dem Komma kommt zuerst die Zehntelstelle.", "Die zweite Stelle nach dem Komma ist die Hundertstelstelle.", `Die Hundertstelziffer ist ${hundredths}.`]);
  }),
  template("tpl-percent-discount-deep", "math", "percent", "math-arithmetic", "discount", "Rabatt berechnen", "unit", 5, 6, "%", "percent-value", () => {
    const base = randomPick([40, 60, 80, 100, 120]);
    const percent = randomPick([10, 20, 25, 50]);
    const answer = (base * percent) / 100;
    return task(`Ein Artikel kostet ${base} €. Es gibt ${percent}% Rabatt. Wie viele Euro werden abgezogen?`, answer, [`Gesucht ist ${percent}% von ${base}.`, `Rechne ${base} mal ${percent} geteilt durch 100.`, `Der Rabatt beträgt ${answer} €.`], [`${answer} €`, `${answer} euro`]);
  }),
  template("tpl-measures-length-deep", "math", "measures", "math-geometry", "length", "Länge umwandeln", "unit", 2, 6, "m", "Einheiten", () => {
    const meters = randomInt(2, 20);
    const answer = meters * 100;
    return task(`Wie viele Zentimeter sind ${meters} Meter?`, answer, ["Ein Meter hat 100 Zentimeter.", `Rechne ${meters} mal 100.`, `${meters} m sind ${answer} cm.`], [`${answer} cm`]);
  }),
  template("tpl-word-problem-model-deep", "math", "word-problems", "math-arithmetic", "model", "Rechenweg wählen", "number", 2, 6, "?", "Textverstaendnis", () => {
    const groups = randomInt(3, 8);
    const perGroup = randomInt(4, 9);
    const answer = groups * perGroup;
    return task(`${groups} Kinder bekommen jeweils ${perGroup} Karten. Wie viele Karten sind es zusammen?`, answer, ["Jeweils ist ein Hinweis auf Malrechnen.", `Rechne ${groups} mal ${perGroup}.`, `Zusammen sind es ${answer} Karten.`]);
  }),
  template("tpl-equation-deep", "math", "equations", "math-arithmetic", "linear", "Gleichung lösen", "number", 5, 6, "x", "Umformen", () => {
    const x = randomInt(4, 30);
    const add = randomInt(2, 15);
    return task(`x + ${add} = ${x + add}. Wie groß ist x?`, x, ["Du willst x allein haben.", `Ziehe ${add} auf beiden Seiten ab.`, `x = ${x}.`], [`x=${x}`, `x = ${x}`]);
  }),
  template("tpl-coordinate-read-deep", "math", "coordinates", "math-data", "read-point", "Koordinaten lesen", "text", 5, 6, "(x|y)", "Koordinaten", () => {
    const x = randomInt(0, 8);
    const y = randomInt(0, 8);
    return task(`Ein Punkt liegt ${x} Schritte nach rechts und ${y} Schritte nach oben. Wie lautet er als (x|y)?`, `(${x}|${y})`, ["Zuerst kommt die x-Koordinate.", "Danach kommt die y-Koordinate.", `Der Punkt lautet (${x}|${y}).`], [`${x}|${y}`, `(${x},${y})`]);
  }),
  template("tpl-german-find-error", "german", "german-spelling", "de-spelling", "spelling-error", "Rechtschreibfehler finden", "text", 1, 6, "Aa", "spelling", () => {
    const item = randomPick([["Fahrrad", "Fahrad"], ["Sonne", "Sone"], ["Schlüssel", "Schlüsel"], ["kommen", "komen"]]);
    return task(`In welchem Wort steckt der Fehler: "${item[0]}" oder "${item[1]}"?`, item[1], ["Vergleiche beide Wörter genau.", "Achte auf doppelte Buchstaben oder Merkwörter.", `Falsch geschrieben ist: ${item[1]}.`]);
  }),
  template("tpl-german-sentence-parts", "german", "german-grammar", "de-grammar", "sentence-parts", "Satzglieder bestimmen", "multiple-choice", 3, 6, "S", "grammar", () => {
    const item = randomPick([
      ["Mila liest ein Buch.", "Mila", "Subjekt", ["Subjekt", "Prädikat", "Objekt"]],
      ["Der Hund schläft.", "schläft", "Prädikat", ["Subjekt", "Prädikat", "Objekt"]],
      ["Tom findet den Ball.", "den Ball", "Objekt", ["Subjekt", "Prädikat", "Objekt"]],
    ]);
    return task(`Welche Satzglied-Rolle hat "${item[1]}" in: ${item[0]}`, item[2], ["Frage nach dem Satzglied.", "Wer oder was ist Subjekt, was geschieht ist Prädikat.", `Die richtige Rolle ist ${item[2]}.`], [], item[3]);
  }),
  template("tpl-german-punctuation", "german", "german-punctuation", "de-punctuation", "punctuation", "Satzzeichen wählen", "multiple-choice", 3, 6, "?!", "punctuation", () => {
    const item = randomPick([
      ["Wie spät ist es", "?", ["?", ".", "!"]],
      ["Pass auf", "!", ["?", ".", "!"]],
      ["Heute regnet es", ".", ["?", ".", "!"]],
    ]);
    return task(`Welches Satzzeichen passt am Ende: "${item[0]}"`, item[1], ["Frage, Aussage oder Ausruf?", "Fragen enden mit Fragezeichen, Ausrufe mit Ausrufezeichen.", `Richtig ist ${item[1]}`], [], item[2]);
  }),
  template("tpl-german-direct-speech", "german", "german-punctuation", "de-punctuation", "direct-speech", "Wörtliche Rede", "fill-blank", 4, 6, "„“", "punctuation", () => {
    return task('Ergänze das fehlende Satzzeichen: Tom sagt: „Ich komme gleich__“', ".", ["Der Begleitsatz ist eine Aussage.", "Die wörtliche Rede endet als Aussagesatz.", "Es fehlt ein Punkt."], ["Punkt"]);
  }),
  template("tpl-german-reading-detail", "german", "german-reading", "de-reading", "reading-detail", "Textdetails finden", "text", 2, 6, "📖", "reading", () => {
    const item = randomPick([
      ["Lena packt Brot, Wasser und einen Apfel in ihren Rucksack. Danach geht sie zum Sportplatz.", "Was packt Lena zu trinken ein?", "Wasser"],
      ["Im Garten blühen Tulpen. Neben dem Zaun steht eine rote Gießkanne.", "Welche Farbe hat die Gießkanne?", "rot"],
    ]);
    return task(`${item[0]} ${item[1]}`, item[2], ["Lies den kurzen Text noch einmal.", "Suche genau die Stelle mit der Information.", `Die Antwort ist ${item[2]}.`]);
  }),
  template("tpl-german-reading-inference", "german", "german-reading", "de-reading", "reading-inference", "Schlussfolgern", "multiple-choice", 3, 6, "📖", "reading", () => {
    const item = randomPick([
      ["Mara zieht Gummistiefel an und nimmt einen Schirm mit.", "Es regnet wahrscheinlich.", ["Es regnet wahrscheinlich.", "Es ist sehr heiß.", "Sie geht schwimmen."]],
      ["Ben legt Lineal, Heft und Mäppchen in die Tasche.", "Er geht wahrscheinlich zur Schule.", ["Er geht wahrscheinlich zur Schule.", "Er kocht Mittagessen.", "Er schläft ein."]],
    ]);
    return task(`Was kann man schließen? ${item[0]}`, item[1], ["Nutze Hinweise aus dem Satz.", "Welche Situation passt am besten?", item[1]], [], item[2]);
  }),
  template("tpl-english-grammar-be", "english", "english-grammar", "en-grammar", "english-question", "to be einsetzen", "fill-blank", 3, 6, "is", "grammar", () => {
    const item = randomPick([["I __ happy.", "am"], ["She __ my friend.", "is"], ["We __ in class.", "are"]]);
    return task(`Setze am, is oder are ein: ${item[0]}`, item[1], ["Suche das Subjekt.", "I passt zu am, he/she/it zu is, we/you/they zu are.", `Richtig ist ${item[1]}.`], item[1] === "am" ? ["'m"] : []);
  }),
  template("tpl-english-dialogue", "english", "english-dialogues", "en-dialogues", "english-dialogue", "Dialog ergänzen", "multiple-choice", 3, 6, "Hi", "vocabulary", () => {
    const item = randomPick([
      ["Hello, how are you?", "I am fine.", ["I am fine.", "It is blue.", "She is ten."]],
      ["What is your name?", "My name is Tom.", ["My name is Tom.", "I like apples.", "It is raining."]],
    ]);
    return task(`Welche Antwort passt? ${item[0]}`, item[1], ["Achte auf die Frage.", "Die Antwort muss inhaltlich passen.", `Passend ist: ${item[1]}`], [], item[2]);
  }),
  template("tpl-english-reading-detail", "english", "english-reading", "en-reading", "english-reading-detail", "Englischen Text verstehen", "text", 4, 6, "EN", "reading", () => {
    const item = randomPick([
      ["Tom has a red bike. He rides to school.", "What color is the bike?", "red"],
      ["Anna likes cats and apples. Her cat is black.", "Which animal does Anna like?", "cats"],
    ]);
    return task(`${item[0]} ${item[1]}`, item[2], ["Read the short text again.", "Look for the exact word.", `The answer is ${item[2]}.`]);
  }),
  template("tpl-science-plant-parts", "science", "science-animals", "science-animals-topic", "plant-parts", "Pflanzenteile", "multiple-choice", 1, 6, "🌱", "science", () => {
    const item = randomPick([
      ["Welcher Pflanzenteil nimmt Wasser aus dem Boden auf?", "Wurzel", ["Wurzel", "Blüte", "Frucht"]],
      ["Welcher Pflanzenteil bildet oft Samen?", "Blüte", ["Wurzel", "Blüte", "Stängel"]],
    ]);
    return task(item[0], item[1], ["Denke an die Aufgabe des Pflanzenteils.", "Wurzel, Stängel, Blatt und Blüte haben verschiedene Aufgaben.", `Richtig ist ${item[1]}.`], [], item[2]);
  }),
  template("tpl-science-food-chain", "science", "science-animals", "science-animals-topic", "food-chain", "Nahrungskette", "ordering", 3, 6, "🌱", "science", () => {
    return task("Ordne die Nahrungskette: Fuchs, Gras, Hase. Beginne mit der Pflanze.", "Gras > Hase > Fuchs", ["Pflanzen stehen am Anfang.", "Der Hase frisst Gras, der Fuchs jagt den Hasen.", "Richtig: Gras > Hase > Fuchs."], ["Gras,Hase,Fuchs", "Gras Hase Fuchs"]);
  }),
  template("tpl-science-water-cycle", "science", "science-weather", "science-weather-topic", "water-cycle", "Wasserkreislauf", "multiple-choice", 2, 6, "☁", "science", () => {
    const item = randomPick([
      ["Was passiert, wenn Wasser durch Wärme gasförmig wird?", "Verdunstung", ["Verdunstung", "Gefrieren", "Schmelzen"]],
      ["Wie nennt man Wasser, das aus Wolken fällt?", "Niederschlag", ["Niederschlag", "Schatten", "Erdkern"]],
    ]);
    return task(item[0], item[1], ["Denke an den Weg des Wassers.", "Wasser verdunstet, bildet Wolken und fällt als Niederschlag.", `Richtig ist ${item[1]}.`], [], item[2]);
  }),
  template("tpl-science-experiment", "science", "science-energy", "science-energy-topic", "experiment", "Experiment verstehen", "multiple-choice", 3, 6, "⚡", "experiment", () => {
    const item = randomPick([
      ["Warum verändert man in einem fairen Versuch immer nur eine Sache?", "Damit man die Ursache erkennt.", ["Damit man die Ursache erkennt.", "Damit es schneller geht.", "Damit man nichts messen muss."]],
      ["Was brauchst du, um eine Vermutung zu prüfen?", "Beobachtung und Messung", ["Beobachtung und Messung", "Nur Glück", "Eine Landkarte"]],
    ]);
    return task(item[0], item[1], ["Ein Experiment soll eine Frage klären.", "Wenn zu viel gleichzeitig verändert wird, bleibt die Ursache unklar.", item[1]], [], item[2]);
  }),
  template("tpl-science-space", "science", "science-space", "science-space-topic", "space", "Erde und Weltall", "multiple-choice", 4, 6, "☾", "science", () => {
    const item = randomPick([
      ["Warum gibt es Tag und Nacht?", "Die Erde dreht sich.", ["Die Erde dreht sich.", "Der Mond leuchtet.", "Die Sonne geht aus."]],
      ["Was umkreist die Erde?", "der Mond", ["der Mond", "der Mars", "ein Kompass"]],
    ]);
    return task(item[0], item[1], ["Denke an Bewegungen im Weltall.", "Die Erde dreht sich, der Mond umkreist die Erde.", `Richtig ist ${item[1]}.`], [], item[2]);
  }),
  template("tpl-history-century", "history", "history-timeline", "history-timeline-topic", "century", "Jahrhundert erkennen", "number", 4, 6, "⌛", "timeline", () => {
    const year = randomPick([1450, 1789, 1914, 2020]);
    const answer = Math.floor((year - 1) / 100) + 1;
    return task(`In welchem Jahrhundert liegt das Jahr ${year}?`, answer, ["Die Jahre 1-100 sind das 1. Jahrhundert.", "Rechne grob: Jahr durch 100 und aufrunden.", `${year} liegt im ${answer}. Jahrhundert.`], [`${answer}. Jahrhundert`]);
  }),
  template("tpl-history-source-type", "history", "history-sources", "history-sources-topic", "sources", "Quelle erkennen", "multiple-choice", 4, 6, "✉", "sources", () => {
    const item = randomPick([
      ["Ein Brief aus dem Jahr 1910 ist ...", "schriftliche Quelle", ["schriftliche Quelle", "Himmelsrichtung", "Klimazone"]],
      ["Ein alter Krug aus einer Ausgrabung ist ...", "Sachquelle", ["Sachquelle", "Satzzeichen", "Bundesland"]],
    ]);
    return task(item[0], item[1], ["Quellen sind Spuren aus der Vergangenheit.", "Unterscheide Texte, Bilder und Gegenstände.", `Richtig ist ${item[1]}.`], [], item[2]);
  }),
  template("tpl-history-daily-life", "history", "history-daily-life", "history-daily-topic", "daily-life", "Alltag vergleichen", "multiple-choice", 3, 6, "🏠", "eras", () => {
    const item = randomPick([
      ["Was gab es in Schulen früher oft statt Tablets?", "Schiefertafeln", ["Schiefertafeln", "Raumschiffe", "Smartwatches"]],
      ["Was war früher häufiger als heute?", "Wäsche mit der Hand waschen", ["Wäsche mit der Hand waschen", "Online-Unterricht", "E-Mails schreiben"]],
    ]);
    return task(item[0], item[1], ["Vergleiche Alltag früher und heute.", "Technik und Arbeit haben sich verändert.", `Richtig ist ${item[1]}.`], [], item[2]);
  }),
  template("tpl-history-eras", "history", "history-eras", "history-eras-topic", "eras", "Epochen ordnen", "ordering", 5, 6, "🏛", "eras", () => {
    return task("Ordne von früh nach spät: Mittelalter, Steinzeit, Neuzeit.", "Steinzeit > Mittelalter > Neuzeit", ["Die Steinzeit ist sehr früh.", "Das Mittelalter liegt vor der Neuzeit.", "Richtig: Steinzeit > Mittelalter > Neuzeit."], ["Steinzeit,Mittelalter,Neuzeit", "Steinzeit Mittelalter Neuzeit"]);
  }),
  template("tpl-geo-map-symbols", "geography", "geography-orientation", "geo-orientation", "maps", "Kartenzeichen", "multiple-choice", 3, 6, "⌖", "geography", () => {
    const item = randomPick([
      ["Wo erklärt eine Karte ihre Zeichen?", "Legende", ["Legende", "Titelbild", "Rechenmauer"]],
      ["Welche Farbe steht auf Karten oft für Wasser?", "blau", ["blau", "rot", "schwarz"]],
    ]);
    return task(item[0], item[1], ["Karten haben Zeichen und Farben.", "Die Legende erklärt die Zeichen.", `Richtig ist ${item[1]}.`], [], item[2]);
  }),
  template("tpl-geo-federal-states", "geography", "geography-germany", "geo-germany", "federal-states", "Bundesländer", "text", 3, 6, "DE", "geography", () => {
    const item = randomPick([["München", "Bayern"], ["Hannover", "Niedersachsen"], ["Dresden", "Sachsen"]]);
    return task(`Zu welchem Bundesland gehört ${item[0]}?`, item[1], ["Denke an bekannte Landeshauptstädte.", `${item[0]} ist Hauptstadt oder wichtige Stadt in ${item[1]}.`, `Richtig ist ${item[1]}.`]);
  }),
  template("tpl-geo-europe", "geography", "geography-europe", "geo-europe", "europe", "Europa", "text", 4, 6, "EU", "geography", () => {
    const item = randomPick([["Paris", "Frankreich"], ["Rom", "Italien"], ["Madrid", "Spanien"], ["Wien", "Österreich"]]);
    return task(`In welchem Land liegt ${item[0]}?`, item[1], ["Ordne die Hauptstadt dem Land zu.", "Nutze bekannte Hauptstädte Europas.", `${item[0]} liegt in ${item[1]}.`]);
  }),
  template("tpl-geo-scale-deep", "geography", "geography-scale", "geo-scale", "scale", "Maßstab vertiefen", "unit", 5, 6, "km", "scale", () => {
    const cm = randomInt(2, 9);
    const factor = randomPick([2, 5, 10]);
    const answer = cm * factor;
    return task(`Auf einer Karte entsprechen 1 cm genau ${factor} km. Wie viele Kilometer sind ${cm} cm?`, answer, ["Multipliziere Kartenlänge mit dem Maßstabswert.", `Rechne ${cm} mal ${factor}.`, `${cm} cm entsprechen ${answer} km.`], [`${answer} km`]);
  }),
  template("tpl-geo-climate", "geography", "geography-climate", "geo-climate", "climate", "Klima verstehen", "multiple-choice", 4, 6, "☀", "climate", () => {
    const item = randomPick([
      ["Wo ist es meist sehr trocken?", "Wüste", ["Wüste", "Regenwald", "Nordsee"]],
      ["Wo wachsen besonders viele Pflanzen wegen Wärme und Regen?", "Regenwald", ["Regenwald", "Gletscher", "Parkplatz"]],
    ]);
    return task(item[0], item[1], ["Denke an Temperatur und Niederschlag.", "Klima prägt Landschaften.", `Richtig ist ${item[1]}.`], [], item[2]);
  }),
  template("tpl-cs-logic", "computer-science", "cs-patterns", "cs-patterns-topic", "logic", "Logik", "multiple-choice", 3, 6, "◧", "logic", () => {
    const item = randomPick([
      ["Aussage: Alle roten Formen werden markiert. Ein blaues Quadrat ist ...", "nicht markiert", ["markiert", "nicht markiert", "immer rot"]],
      ["Wenn es regnet, nimm den Schirm. Es regnet. Was tust du?", "Schirm nehmen", ["Schirm nehmen", "Schirm wegwerfen", "nichts prüfen"]],
    ]);
    return task(item[0], item[1], ["Achte auf die Bedingung.", "Wenn die Bedingung gilt, folgt die Aktion.", `Richtig ist ${item[1]}.`], [], item[2]);
  }),
  template("tpl-cs-algorithm-order", "computer-science", "cs-algorithms", "cs-algorithms-topic", "algorithms", "Schritte sortieren", "ordering", 3, 6, "↻", "algorithm", () => {
    return task("Ordne den Ablauf zum Zähneputzen: ausspucken, Zahnpasta auftragen, bürsten.", "Zahnpasta auftragen > bürsten > ausspucken", ["Ein Algorithmus ist eine sinnvolle Reihenfolge.", "Erst vorbereiten, dann ausführen, dann beenden.", "Richtig: Zahnpasta auftragen > bürsten > ausspucken."], ["Zahnpasta auftragen,bürsten,ausspucken", "Zahnpasta auftragen bürsten ausspucken"]);
  }),
  template("tpl-cs-debugging", "computer-science", "cs-algorithms", "cs-algorithms-topic", "debugging", "Fehler finden", "multiple-choice", 4, 6, "↻", "algorithm", () => {
    const item = randomPick([
      ["Roboter soll vorwärts gehen, dann rechts abbiegen. Programm: rechts, vorwärts. Was ist falsch?", "Reihenfolge", ["Reihenfolge", "Farbe", "Rechtschreibung"]],
      ["Eine Schleife soll 3-mal laufen, läuft aber 30-mal. Was prüfst du?", "Wiederholungszahl", ["Wiederholungszahl", "Landkarte", "Satzzeichen"]],
    ]);
    return task(item[0], item[1], ["Debugging heißt Fehler suchen.", "Prüfe Reihenfolge, Bedingung oder Wiederholung.", `Richtig ist ${item[1]}.`], [], item[2]);
  }),
  template("tpl-cs-data-sort", "computer-science", "cs-data", "cs-data-topic", "data", "Daten sortieren", "ordering", 4, 6, "▦", "data", () => {
    return task("Sortiere die Zahlen aufsteigend: 8, 3, 5.", "3 > 5 > 8", ["Aufsteigend heißt klein nach groß.", "Suche zuerst die kleinste Zahl.", "Richtig: 3 > 5 > 8."], ["3,5,8", "3 5 8"]);
  }),
  template("tpl-cs-binary-deep", "computer-science", "cs-binary", "cs-binary-topic", "binary", "Binärzahlen vertiefen", "number", 5, 6, "01", "logic", () => {
    const item = randomPick([["111", 7], ["1000", 8], ["1001", 9], ["1010", 10]]);
    return task(`Welche Dezimalzahl ist die Binärzahl ${item[0]}?`, item[1], ["Nutze Zweierstellen.", "Von rechts zählen die Stellen 1, 2, 4, 8.", `${item[0]} entspricht ${item[1]}.`]);
  }),
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
      makeStaticQuestion("geometry", "area", "Ein Rechteck ist 8 cm lang und 5 cm breit. Wie groß ist die Fläche?", 40, "40 cm²", ["Fläche Rechteck = Länge mal Breite.", "Rechne 8 mal 5.", "Die Fläche ist 40 cm²."]),
    ],
  },
  {
    id: "faecher-check-klasse-6",
    title: "Fächer-Check Klasse 6",
    gradeRange: "5-6",
    questions: [
      makeStaticQuestion("equations", "linear", "Löse x + 7 = 19.", 12, "x = 12", ["Du willst x allein haben.", "Ziehe auf beiden Seiten 7 ab.", "x = 12."]),
      makeStaticQuestion("statistics", "mean", "Berechne den Mittelwert von 4, 8, 10, 14.", 9, "9", ["Addiere alle Werte.", "36 geteilt durch 4 Werte.", "Der Mittelwert ist 9."]),
      makeStaticQuestion("german-reading", "reading-detail", "Tom packt einen Apfel und Wasser ein. Was packt Tom zu trinken ein?", "Wasser", "Wasser", ["Lies den Satz genau.", "Suche das Getränk.", "Tom packt Wasser ein."]),
      makeStaticQuestion("english-vocabulary", "vocabulary", "Wie heißt Hund auf Englisch?", "dog", "dog", ["Denke an ein bekanntes Tierwort.", "Hund heißt dog.", "Die richtige Antwort ist dog."]),
      makeStaticQuestion("science-weather", "water-cycle", "Wie nennt man Wasser, das aus Wolken fällt?", "Niederschlag", "Niederschlag", ["Denke an Regen und Schnee.", "Beides fällt aus Wolken.", "Das heißt Niederschlag."]),
      makeStaticQuestion("history-sources", "sources", "Ist ein altes Foto eher Quelle oder Himmelsrichtung?", "Quelle", "Quelle", ["Fotos können Vergangenheit zeigen.", "Solche Spuren heißen Quellen.", "Die Antwort ist Quelle."]),
      makeStaticQuestion("geography-scale", "scale", "Auf einer Karte sind 1 cm = 2 km. Wie viel sind 4 cm?", 8, "8 km", ["Jeder Zentimeter steht für 2 km.", "Rechne 4 mal 2.", "4 cm sind 8 km."]),
      makeStaticQuestion("cs-algorithms", "algorithms", "Was ist bei einem Algorithmus besonders wichtig: Reihenfolge oder Farbe?", "Reihenfolge", "Reihenfolge", ["Ein Algorithmus besteht aus Schritten.", "Die Schritte müssen sinnvoll geordnet sein.", "Wichtig ist die Reihenfolge."]),
    ],
  },
];

export function generateQuestion({ subjectId = null, moduleId, grade = 3, missionId = null, level = null, templateId = null }) {
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
  const selectedSubject = subjectId ?? missionFor(missionId)?.subjectId ?? subjectForModule(moduleId)?.id ?? "math";
  const module = moduleId ?? missionFor(missionId)?.moduleId ?? firstModuleForSubject(selectedSubject)?.id ?? "geometry";
  const templateQuestion = generateFromTemplate({ subjectId: selectedSubject, moduleId: module, grade, level, templateId });
  const question = templateQuestion ?? (generators[module] ?? geometryQuestion)(Number(grade), Number(level ?? grade));
  const subject = question.subjectId ?? subjectForModule(question.moduleId)?.id ?? selectedSubject;
  return {
    ...question,
    subjectId: subject,
    topicId: question.topicId ?? topicForModule(question.moduleId)?.id ?? null,
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

export function nextAdaptiveLevel(level, correct) {
  const current = Number(level) || 1;
  return Math.max(1, Math.min(10, current + (correct ? 1 : -1)));
}

export function adaptiveSummary(results = []) {
  const total = results.length;
  const correct = results.filter((item) => item.correct).length;
  const accuracy = total ? Math.round((correct / total) * 100) : 0;
  const lastLevel = results[results.length - 1]?.level ?? 1;
  return {
    total,
    correct,
    accuracy,
    level: lastLevel,
    status: accuracy >= 80 ? "bereit für schwere Aufgaben" : accuracy >= 50 ? "weiter üben" : "Grundlagen wiederholen",
  };
}

export function estimateTemplateCapacity() {
  return taskTemplates.length * subjects.length * 10 * 1000000;
}

export function validateGeneratedQuestion(questionItem) {
  return Boolean(
    questionItem?.subjectId &&
      questionItem?.moduleId &&
      questionItem?.skillId &&
      questionItem?.prompt &&
      questionItem?.answer !== undefined &&
      questionItem?.hintSteps?.length >= 3 &&
      questionItem?.errorType &&
      questionItem?.answerType
  );
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
  const subjectId = subjectForModule(moduleId)?.id ?? "math";
  return {
    id,
    subjectId,
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

function subject(id, title, description, visual, color, gradeMin, gradeMax, order) {
  return { id, title, description, visual, color, gradeMin, gradeMax, order };
}

function module(id, subjectId, iconKey, title, skills, gradeMin, gradeMax) {
  return { id, subjectId, iconKey, title, skills, gradeMin, gradeMax };
}

function topic(id, subjectId, moduleId, title, gradeMin, gradeMax) {
  return { id, subjectId, moduleId, title, gradeMin, gradeMax };
}

function template(id, subjectId, moduleId, topicId, skillId, title, answerType, gradeMin, gradeMax, visual, errorType, create) {
  return { id, subjectId, moduleId, topicId, skillId, title, answerType, gradeMin, gradeMax, visual, errorType, create };
}

function task(prompt, answer, hintSteps, acceptedAnswers = [], choices = []) {
  return { prompt, answer, hintSteps, acceptedAnswers, choices };
}

function generateFromTemplate({ subjectId, moduleId, grade = 3, level = null, templateId = null }) {
  const numericGrade = Number(level ?? grade);
  const matchesScope = (item) => {
    if (templateId && item.id !== templateId) return false;
    if (!templateId && moduleId && item.moduleId !== moduleId) return false;
    if (!templateId && !moduleId && subjectId && item.subjectId !== subjectId) return false;
    return true;
  };
  let candidates = taskTemplates.filter((item) => {
    if (!matchesScope(item)) return false;
    return numericGrade >= item.gradeMin && numericGrade <= item.gradeMax;
  });
  if (!candidates.length) candidates = taskTemplates.filter(matchesScope);
  const selected = candidates.length ? randomPick(candidates) : null;
  if (!selected) return null;
  const generated = selected.create({ grade: Number(grade), level: numericGrade });
  return {
    id: cryptoSafeId(),
    subjectId: selected.subjectId,
    moduleId: selected.moduleId,
    topicId: selected.topicId,
    skillId: selected.skillId,
    templateId: selected.id,
    answerType: selected.answerType,
    title: selected.title,
    prompt: generated.prompt,
    answer: generated.answer,
    acceptedAnswers: generated.acceptedAnswers ?? [],
    choices: generated.choices ?? [],
    hint: generated.hintSteps[0],
    hintSteps: generated.hintSteps,
    explanation: generated.hintSteps[generated.hintSteps.length - 1],
    errorType: selected.errorType,
    placeholder: placeholderForAnswerType(selected.answerType),
    visual: selected.visual,
    type: "template-generated",
  };
}

function placeholderForAnswerType(answerType) {
  if (answerType === "multiple-choice") return "Option auswählen oder eintippen";
  if (answerType === "ordering") return "z. B. A > B > C";
  if (answerType === "matching") return "z. B. A-B, C-D";
  if (answerType === "fill-blank") return "Lücke ergänzen";
  if (answerType === "unit") return "Antwort mit Einheit möglich";
  if (answerType === "text") return "Wort oder kurzer Satz";
  return "Antwort";
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
      "Starte bei der kleineren Zahl und zähle hoch.",
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
    return question("fractions", "compare", "Vergleiche Brüche.", `${left}/${denominator} __ ${right}/${denominator}. Welches Zeichen passt: <, > oder = ?`, answer, [
      "Die Nenner sind gleich, also vergleichst du die Zähler.",
      `${left} und ${right} entscheiden über die Größe.`,
      `${left}/${denominator} ${answer} ${right}/${denominator}.`,
    ], "Bruchvergleich", [answer === ">" ? "größer" : answer === "<" ? "kleiner" : "gleich"], "1/2");
  }
  if (kind === "simplify") {
    const factor = randomPick([2, 3, 4, 5]);
    const numerator = randomInt(1, 5) * factor;
    const denominator = randomInt(numerator / factor + 1, 9) * factor;
    const answer = `${numerator / factor}/${denominator / factor}`;
    return question("fractions", "simplify", "Kürze den Bruch.", `Kürze ${numerator}/${denominator} mit ${factor}.`, answer, [
      "Beim Kürzen teilst du Zähler und Nenner durch dieselbe Zahl.",
      `${numerator} : ${factor} = ${numerator / factor} und ${denominator} : ${factor} = ${denominator / factor}.`,
      `Gekürzt ist das ${answer}.`,
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
      `Der Rabatt beträgt ${value} €.`,
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
      ["Fünfeck", 5],
      ["Sechseck", 6],
    ]);
    return question("geometry", "shape-sides", "Erkenne Formen.", `Wie viele Seiten hat ein ${sides[0]}?`, sides[1], [
      "Zähle die geraden Randlinien der Form.",
      `Der Name ${sides[0]} gibt oft einen Hinweis.`,
      `Ein ${sides[0]} hat ${sides[1]} Seiten.`,
    ], "Formen", [], "△");
  }
  if (kind === "angle") {
    const angle = randomPick([30, 45, 60, 90, 120, 150]);
    const answer = angle < 90 ? "spitz" : angle === 90 ? "recht" : "stumpf";
    return question("geometry", "angle-type", "Bestimme Winkel.", `Ein Winkel ist ${angle}°. Ist er spitz, recht oder stumpf?`, answer, [
      "Ein rechter Winkel hat genau 90°.",
      "Kleiner als 90° ist spitz, größer als 90° ist stumpf.",
      `${angle}° ist ${answer}.`,
    ], "Winkel", [answer === "recht" ? "rechter" : answer], "∠");
  }
  const length = randomInt(4, grade <= 4 ? 12 : 18);
  const width = randomInt(2, grade <= 4 ? 9 : 14);
  if (kind === "area") {
    return question("geometry", "area", "Geometrie: Fläche", `Ein Rechteck ist ${length} cm lang und ${width} cm breit. Berechne die Fläche.`, length * width, [
      "Fläche Rechteck = Länge mal Breite.",
      `Rechne ${length} mal ${width}.`,
      `Die Fläche ist ${length * width} cm².`,
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
  return question("measures", "length", "Wandle Länge um.", `Wie viele Zentimeter sind ${meters} Meter?`, meters * 100, [
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
    return question("word-problems", "multiplication-story", "Textaufgabe", `In ${boxes} Kisten liegen jeweils ${perBox} Bälle. Wie viele Bälle sind es insgesamt?`, boxes * perBox, [
      "Jeweils ist ein Hinweis auf Malrechnen.",
      `Rechne ${boxes} mal ${perBox}.`,
      `Insgesamt sind es ${boxes * perBox} Bälle.`,
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
    return question("equations", "linear", "Löse die Gleichung.", `x - ${sub} = ${x - sub}. Wie groß ist x?`, x, [
      "Du willst x allein haben.",
      `Addiere ${sub} auf beiden Seiten.`,
      `x = ${x}.`,
    ], "Vorzeichen", [`x=${x}`, `x = ${x}`], "x");
  }
  if (kind === "missing-factor") {
    const x = randomInt(2, 12);
    const factor = randomInt(2, 10);
    return question("equations", "missing-factor", "Finde den Platzhalter.", `□ × ${factor} = ${x * factor}. Welche Zahl gehört in das Feld?`, x, [
      "Suche die passende Geteiltaufgabe.",
      `Rechne ${x * factor} geteilt durch ${factor}.`,
      `In das Feld gehört ${x}.`,
    ], "Umformen", [], "x");
  }
  const x = randomInt(3, 25);
  const add = randomInt(2, 15);
  return question("equations", "linear", "Löse die Gleichung.", `x + ${add} = ${x + add}. Wie groß ist x?`, x, [
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
    return question("statistics", "range", "Bestimme die Spannweite.", `Die Werte sind ${values.join(", ")}. Wie groß ist der Unterschied zwischen größtem und kleinstem Wert?`, max - min, [
      "Suche den kleinsten und den größten Wert.",
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
  const subjectId = subjectForModule(moduleId)?.id ?? "math";
  return {
    id: cryptoSafeId(),
    subjectId,
    moduleId,
    topicId: topicForModule(moduleId)?.id ?? null,
    skillId,
    templateId: null,
    answerType: inferAnswerType(answer, acceptedAnswers),
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
  const subjectId = subjectForModule(moduleId)?.id ?? "math";
  return {
    id: `${moduleId}-${skillId}-${answer}`,
    subjectId,
    moduleId,
    topicId: topicForModule(moduleId)?.id ?? null,
    skillId,
    templateId: null,
    answerType: inferAnswerType(answer, [accepted]),
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
    items.push(`${errorTypeLabel(errorType)} gezielt üben (${count} Fehler)`);
  }
  if (nextMission) {
    items.unshift(`Nächste Mission: ${nextMission.title}`);
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
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(",", ".")
    .replace(/\s+/g, "")
    .replace(/€/g, "euro")
    .replace(/cm²/g, "cm2")
    .replace(/[^0-9a-z<>/=().|,-]/g, "");
}

function titleFor(moduleId) {
  return learningModules.find((item) => item.id === moduleId)?.title ?? moduleId;
}

export function subjectTitle(subjectId) {
  return subjects.find((item) => item.id === subjectId)?.title ?? subjectId ?? "-";
}

function missionFor(missionId) {
  return missions.find((item) => item.id === missionId);
}

function missionForModule(moduleId) {
  return missions.find((item) => item.moduleId === moduleId);
}

function subjectForModule(moduleId) {
  const moduleItem = learningModules.find((item) => item.id === moduleId);
  return subjects.find((item) => item.id === moduleItem?.subjectId) ?? null;
}

function topicForModule(moduleId) {
  return topics.find((item) => item.moduleId === moduleId) ?? null;
}

function firstModuleForSubject(subjectId) {
  return learningModules.find((item) => item.subjectId === subjectId);
}

function inferAnswerType(answer, acceptedAnswers = []) {
  if (typeof answer === "number") return Number.isInteger(answer) ? "number" : "decimal";
  if ([String(answer), ...acceptedAnswers.map(String)].some((item) => /\d+\s*(cm|km|kg|g|ml|l|€|euro|ct|cm²|cm2)/i.test(item))) return "unit";
  return "text";
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
