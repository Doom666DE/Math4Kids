import test from "node:test";
import assert from "node:assert/strict";
import { createDemoStore } from "../src/services/store.js";

function installLocalStorage() {
  const memory = new Map();
  globalThis.localStorage = {
    getItem(key) {
      return memory.has(key) ? memory.get(key) : null;
    },
    setItem(key, value) {
      memory.set(key, value);
    },
    removeItem(key) {
      memory.delete(key);
    },
    clear() {
      memory.clear();
    },
  };
}

test("demo store supports teacher classes and detailed class attempts", async () => {
  installLocalStorage();
  const store = createDemoStore();

  const session = await store.signUp({ email: "teacher@math4kids.local", role: "teacher" });
  assert.equal(session.role, "teacher");

  const child = await store.createChildProfile({ name: "Mila", grade: 5, pin: "1234", avatar: "⭐" });
  const classRoom = await store.createClassRoom({ name: "5a", grade: 5, schoolYear: "2026/2027" });
  await store.assignChildToClass(classRoom.id, child.id);

  await store.recordAttempt(child.id, {
    module_id: "geometry",
    skill_id: "area",
    question_type: "generated",
    prompt: "Ein Rechteck ist 8 cm lang und 5 cm breit. Berechne die Fläche.",
    expected_answer: "40",
    given_answer: "35",
    is_correct: false,
    duration_ms: 12000,
    error_type: "Formelwahl",
    explanation: "Fläche Rechteck = Länge mal Breite.",
    grade_level: "5",
    mission_id: "geometrie-labor",
    level: 5,
    hint_count: 2,
    stars_awarded: 0,
  });

  await store.recordAttempt(child.id, {
    module_id: "statistics",
    skill_id: "mean",
    question_type: "generated",
    prompt: "Berechne den Mittelwert von 4, 8, 10, 14.",
    expected_answer: "9",
    given_answer: "9",
    is_correct: true,
    duration_ms: 8000,
    error_type: null,
    explanation: "Der Mittelwert ist 9.",
    grade_level: "5",
    mission_id: "statistik-studio",
    level: 5,
    hint_count: 0,
    stars_awarded: 3,
    created_at: "2020-01-01T00:00:00.000Z",
  });

  const classChildren = await store.listClassChildren(classRoom.id);
  assert.equal(classChildren.length, 1);
  assert.equal(classChildren[0].name, "Mila");

  const attempts = await store.listClassAttempts(classRoom.id, { result: "wrong", moduleId: "geometry" });
  assert.equal(attempts.length, 1);
  assert.equal(attempts[0].child.name, "Mila");
  assert.equal(attempts[0].given_answer, "35");
  assert.equal(attempts[0].expected_answer, "40");
  assert.equal(attempts[0].hint_count, 2);

  const recentAttempts = await store.listClassAttempts(classRoom.id, { dateRange: "30d" });
  assert.equal(recentAttempts.length, 1);
  assert.equal(recentAttempts[0].module_id, "geometry");
});
