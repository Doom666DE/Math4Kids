import test from "node:test";
import assert from "node:assert/strict";
import {
  adaptiveSummary,
  estimateTemplateCapacity,
  fixedTests,
  generateQuestion,
  gradeAnswer,
  errorTypeLabel,
  learningModules,
  missions,
  nextAdaptiveLevel,
  nextMissionProgress,
  starsForAttempt,
  skillLabel,
  subjects,
  summarizeAttempts,
  taskTemplates,
  validateGeneratedQuestion,
} from "../src/modules/learningEngine.js";

test("covers the planned school subjects and modules", () => {
  assert.deepEqual(subjects.map((subject) => subject.id), [
    "math",
    "german",
    "english",
    "science",
    "history",
    "geography",
    "computer-science",
  ]);
  const ids = learningModules.map((module) => module.id);
  for (const expected of [
    "arithmetic",
    "fractions",
    "decimals",
    "percent",
    "geometry",
    "measures",
    "word-problems",
    "equations",
    "coordinates",
    "statistics",
    "german-language",
    "german-spelling",
    "german-grammar",
    "german-punctuation",
    "german-reading",
    "english-basics",
    "english-vocabulary",
    "english-grammar",
    "english-dialogues",
    "english-reading",
    "science-world",
    "science-body",
    "science-animals",
    "science-weather",
    "science-energy",
    "science-space",
    "history-time",
    "history-timeline",
    "history-sources",
    "history-daily-life",
    "history-eras",
    "geography-map",
    "geography-orientation",
    "geography-germany",
    "geography-europe",
    "geography-scale",
    "geography-climate",
    "coding-logic",
    "cs-patterns",
    "cs-algorithms",
    "cs-data",
    "cs-binary",
  ]) {
    assert.equal(ids.includes(expected), true, `missing module ${expected}`);
  }
  for (const subject of subjects) {
    assert.ok(learningModules.filter((module) => module.subjectId === subject.id).length >= 4, `not enough modules for ${subject.id}`);
  }
});

test("generates valid questions for every module and grade band", () => {
  for (const module of learningModules) {
    const grades = [...new Set([module.gradeMin, Math.ceil((module.gradeMin + module.gradeMax) / 2), module.gradeMax])];
    for (const grade of grades) {
      const question = generateQuestion({ moduleId: module.id, grade });
      assert.equal(question.moduleId, module.id);
      assert.equal(question.subjectId, module.subjectId);
      assert.ok(question.prompt.length > 5);
      assert.notEqual(question.answer, undefined);
      assert.ok(question.hintSteps.length >= 3);
      assert.ok(question.errorType.length > 2);
      assert.ok(validateGeneratedQuestion(question));
      assert.equal(gradeAnswer(question, String(question.answer)).correct, true);
    }
  }
});

test("task templates generate many valid questions per template", () => {
  assert.ok(taskTemplates.length >= 50);
  assert.ok(estimateTemplateCapacity() > 1000000000);
  for (const template of taskTemplates) {
    for (let index = 0; index < 100; index += 1) {
      const grade = Math.max(template.gradeMin, Math.min(template.gradeMax, 5));
      const question = generateQuestion({ moduleId: template.moduleId, templateId: template.id, grade, level: grade });
      assert.equal(question.templateId, template.id);
      assert.equal(validateGeneratedQuestion(question), true);
      assert.equal(gradeAnswer(question, String(question.answer)).correct, true);
      if (question.answerType === "multiple-choice") {
        assert.ok(question.choices.length >= 3);
        assert.ok(question.choices.includes(String(question.answer)));
      }
    }
  }
});

test("grades deeper answer types and localized text variants", () => {
  const multipleChoice = generateQuestion({ moduleId: "german-grammar", templateId: "tpl-german-sentence-parts", grade: 4 });
  assert.equal(multipleChoice.answerType, "multiple-choice");
  assert.equal(gradeAnswer(multipleChoice, multipleChoice.answer).correct, true);

  const ordering = generateQuestion({ moduleId: "cs-algorithms", templateId: "tpl-cs-algorithm-order", grade: 4 });
  assert.equal(ordering.answerType, "ordering");
  assert.equal(gradeAnswer(ordering, "Zahnpasta auftragen, bürsten, ausspucken").correct, true);

  const fillBlank = generateQuestion({ moduleId: "english-grammar", templateId: "tpl-english-grammar-be", grade: 4 });
  assert.equal(fillBlank.answerType, "fill-blank");
  assert.equal(gradeAnswer(fillBlank, String(fillBlank.answer).toUpperCase()).correct, true);
});

test("defines one playable mission for every module", () => {
  assert.equal(missions.length, learningModules.length);
  for (const module of learningModules) {
    const mission = missions.find((item) => item.moduleId === module.id);
    assert.ok(mission, `missing mission for ${module.id}`);
    assert.ok(mission.targetCount >= 3);
    const question = generateQuestion({ moduleId: module.id, missionId: mission.id, grade: 5, level: 5 });
    assert.equal(question.missionId, mission.id);
    assert.equal(question.level, 5);
  }
});

test("accepts localized decimal and unit answers", () => {
  const decimalQuestion = generateQuestion({ moduleId: "decimals", grade: 6 });
  assert.equal(gradeAnswer(decimalQuestion, String(decimalQuestion.answer).replace(".", ",")).correct, true);

  let geometryQuestion = generateQuestion({ moduleId: "geometry", grade: 6 });
  for (let index = 0; index < 30 && geometryQuestion.skillId !== "area"; index += 1) {
    geometryQuestion = generateQuestion({ moduleId: "geometry", grade: 6 });
  }
  assert.equal(geometryQuestion.skillId, "area");
  assert.equal(gradeAnswer(geometryQuestion, `${geometryQuestion.answer} cm²`).correct, true);
});

test("calculates stars and mission progress", () => {
  assert.equal(starsForAttempt({ correct: true, hintCount: 0 }), 3);
  assert.equal(starsForAttempt({ correct: true, hintCount: 2 }), 1);
  assert.equal(starsForAttempt({ correct: false, hintCount: 0 }), 0);

  const first = nextMissionProgress({}, { missionId: "zahlenwelt", level: 3, correct: true, starsAwarded: 3, targetCount: 2 });
  const second = nextMissionProgress(first, { missionId: "zahlenwelt", level: 3, correct: true, starsAwarded: 2, targetCount: 2 });
  assert.equal(second.correct_count, 2);
  assert.equal(second.stars, 5);
  assert.equal(second.completed, true);
});

test("adaptive tests adjust difficulty and summarize results", () => {
  assert.equal(nextAdaptiveLevel(5, true), 6);
  assert.equal(nextAdaptiveLevel(5, false), 4);
  assert.equal(nextAdaptiveLevel(10, true), 10);
  assert.equal(nextAdaptiveLevel(1, false), 1);

  const summary = adaptiveSummary([
    { correct: true, level: 5 },
    { correct: true, level: 6 },
    { correct: false, level: 7 },
  ]);
  assert.equal(summary.total, 3);
  assert.equal(summary.correct, 2);
  assert.equal(summary.accuracy, 67);
  assert.equal(summary.status, "weiter üben");
});

test("fixed tests include broad diagnosis coverage", () => {
  assert.ok(fixedTests.length >= 3);
  const coveredModules = new Set(fixedTests.flatMap((item) => item.questions.map((question) => question.moduleId)));
  for (const expected of ["geometry", "fractions", "percent", "equations", "statistics"]) {
    assert.equal(coveredModules.has(expected), true);
  }
});

test("summarizes attempts into accuracy and recommendations", () => {
  const summary = summarizeAttempts([
    { module_id: "geometry", is_correct: false },
    { module_id: "geometry", is_correct: true },
    { module_id: "fractions", is_correct: false },
    { module_id: "fractions", is_correct: false },
  ], [{ mission_id: "zahlenwelt", stars: 4, correct_count: 2, completed: false }]);
  assert.equal(summary.total, 4);
  assert.equal(summary.accuracy, 25);
  assert.equal(summary.recommendations.some((item) => item.includes("Brüche")), true);
  assert.equal(summary.missionStats.stars, 4);
});

test("maps internal skill and error keys to German UI labels", () => {
  assert.equal(skillLabel("mean"), "Mittelwert");
  assert.equal(skillLabel("table-sum"), "Tabellensumme");
  assert.equal(skillLabel("range"), "Spannweite");
  assert.equal(errorTypeLabel("Textverstaendnis"), "Textverständnis");
  assert.equal(errorTypeLabel("Bruchkuerzen"), "Brüche kürzen");
});
