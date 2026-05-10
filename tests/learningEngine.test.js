import test from "node:test";
import assert from "node:assert/strict";
import {
  fixedTests,
  generateQuestion,
  gradeAnswer,
  learningModules,
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
      assert.equal(gradeAnswer(question, String(question.answer)).correct, true);
    }
  }
});

test("accepts localized decimal and unit answers", () => {
  const decimalQuestion = generateQuestion({ moduleId: "decimals", grade: 6 });
  assert.equal(gradeAnswer(decimalQuestion, String(decimalQuestion.answer).replace(".", ",")).correct, true);

  const geometryQuestion = generateQuestion({ moduleId: "geometry", grade: 6 });
  assert.equal(gradeAnswer(geometryQuestion, `${geometryQuestion.answer} cm²`).correct, true);
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
  ]);
  assert.equal(summary.total, 4);
  assert.equal(summary.accuracy, 25);
  assert.equal(summary.recommendations.some((item) => item.includes("Brüche")), true);
});
