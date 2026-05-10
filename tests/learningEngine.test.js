import test from "node:test";
import assert from "node:assert/strict";
import {
  fixedTests,
  generateQuestion,
  gradeAnswer,
  learningModules,
  missions,
  nextMissionProgress,
  starsForAttempt,
  summarizeAttempts,
} from "../src/modules/learningEngine.js";

test("covers the planned school modules", () => {
  const ids = learningModules.map((module) => module.id);
  assert.deepEqual(ids, [
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
  ]);
});

test("generates valid questions for every module and grade band", () => {
  for (const module of learningModules) {
    for (const grade of [2, 5, 9]) {
      const question = generateQuestion({ moduleId: module.id, grade });
      assert.equal(question.moduleId, module.id);
      assert.ok(question.prompt.length > 5);
      assert.notEqual(question.answer, undefined);
      assert.ok(question.hintSteps.length >= 3);
      assert.ok(question.errorType.length > 2);
      assert.equal(gradeAnswer(question, String(question.answer)).correct, true);
    }
  }
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
