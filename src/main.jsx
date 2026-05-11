import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Award,
  BarChart3,
  BookOpen,
  Brain,
  CheckCircle2,
  ClipboardList,
  GraduationCap,
  HelpCircle,
  LayoutDashboard,
  Lock,
  LogOut,
  Play,
  School,
  Shapes,
  Sparkles,
  Star,
  Target,
  Trophy,
  UserPlus,
  Users,
} from "lucide-react";
import {
  fixedTests,
  generateQuestion,
  getMissionProgress,
  gradeAnswer,
  errorTypeLabel,
  learningModules,
  missions,
  nextMissionProgress,
  starsForAttempt,
  skillLabel,
  summarizeAttempts,
} from "./modules/learningEngine.js";
import { createMath4KidsStore } from "./services/store.js";
import "./styles.css";

const store = createMath4KidsStore();
const moduleIcons = {
  bar: BarChart3,
  book: BookOpen,
  brain: Brain,
  ruler: GraduationCap,
  shapes: Shapes,
  target: Target,
};

function App() {
  const [session, setSession] = useState(null);
  const [children, setChildren] = useState([]);
  const [activeChild, setActiveChild] = useState(null);
  const [attempts, setAttempts] = useState([]);
  const [missionProgress, setMissionProgress] = useState([]);
  const [classRooms, setClassRooms] = useState([]);
  const [activeClass, setActiveClass] = useState(null);
  const [classChildren, setClassChildren] = useState([]);
  const [classAttempts, setClassAttempts] = useState([]);
  const [classAttemptOptions, setClassAttemptOptions] = useState([]);
  const [view, setView] = useState("lernen");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function bootstrap() {
      const currentSession = await store.getSession();
      if (cancelled) return;
      setSession(currentSession);
      if (currentSession) {
        const loadedChildren = await store.listChildren();
        const firstChild = loadedChildren[0] ?? null;
        setChildren(loadedChildren);
        setActiveChild(firstChild);
        if (firstChild) {
          const [loadedAttempts, loadedProgress] = await Promise.all([
            store.listAttempts(firstChild.id),
            store.listMissionProgress(firstChild.id),
          ]);
          setAttempts(loadedAttempts);
          setMissionProgress(loadedProgress);
        }
        if (currentSession.role === "teacher") {
          await refreshTeacherData();
          setView("klassen");
        }
      }
      setLoading(false);
    }
    bootstrap();
    return () => {
      cancelled = true;
    };
  }, []);

  async function refreshChildData(child = activeChild) {
    const loadedChildren = await store.listChildren();
    setChildren(loadedChildren);
    const nextChild = child ? loadedChildren.find((item) => item.id === child.id) ?? loadedChildren[0] : loadedChildren[0];
    setActiveChild(nextChild ?? null);
    if (nextChild) {
      const [loadedAttempts, loadedProgress] = await Promise.all([
        store.listAttempts(nextChild.id),
        store.listMissionProgress(nextChild.id),
      ]);
      setAttempts(loadedAttempts);
      setMissionProgress(loadedProgress);
    } else {
      setAttempts([]);
      setMissionProgress([]);
    }
  }

  async function refreshTeacherData(selectedClass = activeClass, filters = {}) {
    const loadedClasses = await store.listClasses();
    const nextClass = selectedClass ? loadedClasses.find((item) => item.id === selectedClass.id) ?? loadedClasses[0] : loadedClasses[0];
    setClassRooms(loadedClasses);
    setActiveClass(nextClass ?? null);
    if (nextClass) {
      const [loadedClassChildren, loadedClassAttempts, loadedClassAttemptOptions] = await Promise.all([
        store.listClassChildren(nextClass.id),
        store.listClassAttempts(nextClass.id, filters),
        store.listClassAttempts(nextClass.id, {}),
      ]);
      setClassChildren(loadedClassChildren);
      setClassAttempts(loadedClassAttempts);
      setClassAttemptOptions(loadedClassAttemptOptions);
    } else {
      setClassChildren([]);
      setClassAttempts([]);
      setClassAttemptOptions([]);
    }
  }

  async function handleSignedIn(nextSession) {
    setSession(nextSession);
    await refreshChildData(null);
    if (nextSession.role === "teacher") {
      await refreshTeacherData(null);
      setView("klassen");
    }
  }

  async function handleCreateChild(profile) {
    const child = await store.createChildProfile(profile);
    await refreshChildData(child);
    if (session?.role === "teacher") await refreshTeacherData();
  }

  async function handleSelectChild(child, pin) {
    await store.verifyChildPin(child.id, pin);
    const [loadedAttempts, loadedProgress] = await Promise.all([
      store.listAttempts(child.id),
      store.listMissionProgress(child.id),
    ]);
    setActiveChild(child);
    setAttempts(loadedAttempts);
    setMissionProgress(loadedProgress);
  }

  async function handleAttempt(attempt, progressUpdate = null) {
    if (!activeChild) return null;
    const savedAttempt = await store.recordAttempt(activeChild.id, attempt);
    setAttempts((current) => [savedAttempt, ...current].slice(0, 200));
    if (!progressUpdate) return null;
    const savedProgress = await store.upsertMissionProgress(activeChild.id, progressUpdate);
    setMissionProgress((current) => {
      const next = current.filter((item) => item.mission_id !== savedProgress.mission_id);
      return [savedProgress, ...next];
    });
    return savedProgress;
  }

  async function handleSignOut() {
    await store.signOut();
    setSession(null);
    setChildren([]);
    setActiveChild(null);
    setAttempts([]);
    setMissionProgress([]);
    setClassRooms([]);
    setActiveClass(null);
    setClassChildren([]);
    setClassAttempts([]);
    setClassAttemptOptions([]);
  }

  async function handleCreateClassRoom(classRoom) {
    const created = await store.createClassRoom(classRoom);
    await refreshTeacherData(created);
  }

  async function handleAssignChildToClass(classId, childId) {
    await store.assignChildToClass(classId, childId);
    await refreshTeacherData(activeClass);
  }

  async function handleSelectClass(classRoom, filters = {}) {
    await refreshTeacherData(classRoom, filters);
  }

  if (loading) {
    return <LoadingScreen />;
  }

  if (!session) {
    return <AuthScreen onSignedIn={handleSignedIn} />;
  }

  const summary = summarizeAttempts(attempts, missionProgress);

  return (
    <div className="app-shell">
      <Sidebar view={view} setView={setView} onSignOut={handleSignOut} session={session} />
      <main className="workspace">
        <Topbar
          activeChild={activeChild}
          children={children}
          onSelectChild={handleSelectChild}
          onCreateChild={handleCreateChild}
          session={session}
        />

        {view === "lernen" && (
          <LearningView
            activeChild={activeChild}
            attempts={attempts}
            missionProgress={missionProgress}
            onAttempt={handleAttempt}
            summary={summary}
          />
        )}
        {view === "tests" && <TestsView activeChild={activeChild} attempts={attempts} onAttempt={handleAttempt} />}
        {view === "kinder" && (
          <ChildrenView children={children} activeChild={activeChild} onCreateChild={handleCreateChild} onSelectChild={handleSelectChild} />
        )}
        {view === "klassen" && session.role === "teacher" && (
          <ClassesView
            classRooms={classRooms}
            activeClass={activeClass}
            classChildren={classChildren}
            classAttempts={classAttempts}
            classAttemptOptions={classAttemptOptions}
            children={children}
            onCreateClassRoom={handleCreateClassRoom}
            onAssignChildToClass={handleAssignChildToClass}
            onSelectClass={handleSelectClass}
          />
        )}
        {view === "dashboard" && (
          <AdultDashboard activeChild={activeChild} attempts={attempts} missionProgress={missionProgress} summary={summary} />
        )}
      </main>
    </div>
  );
}

function LoadingScreen() {
  return (
    <div className="center-screen">
      <div className="brand-mark">4</div>
      <h1>Math4Kids lädt...</h1>
    </div>
  );
}

function AuthScreen({ onSignedIn }) {
  const [mode, setMode] = useState("signin");
  const [email, setEmail] = useState("demo@math4kids.local");
  const [password, setPassword] = useState("math4kids-demo");
  const [role, setRole] = useState("parent");
  const [error, setError] = useState("");

  async function submit(event) {
    event.preventDefault();
    setError("");
    try {
      const nextSession =
        mode === "signup"
          ? await store.signUp({ email, password, role })
          : await store.signIn({ email, password });
      onSignedIn(nextSession);
    } catch (err) {
      setError(err.message);
    }
  }

  async function startDemo(nextRole) {
    setError("");
    const demoEmail = nextRole === "teacher" ? "lehrkraft@math4kids.local" : "demo@math4kids.local";
    try {
      const nextSession = await store.signUp({ email: demoEmail, password: "math4kids-demo", role: nextRole });
      onSignedIn(nextSession);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="auth-layout">
      <section className="auth-hero">
        <div className="brand-row">
          <span className="brand-mark">4</span>
          <div>
            <strong>Math4Kids</strong>
            <small>Lernplattform für Grundschule + Sek I</small>
          </div>
        </div>
        <h1>Mathe-Missionen für echte Lernfortschritte.</h1>
        <p>
          Kinder trainieren in Missionen mit Tipps, Sternen und Abzeichen. Erwachsene sehen Lernstand,
          Fehlerarten und die nächste sinnvolle Übung.
        </p>
        <div className="feature-strip">
          <span>Missionen</span>
          <span>Geometrie</span>
          <span>Brüche</span>
          <span>{store.isSupabaseEnabled ? "Supabase verbunden" : "Demo-Modus"}</span>
        </div>
      </section>

      <form className="auth-card" onSubmit={submit}>
        {!store.isSupabaseEnabled && (
          <div className="demo-actions" aria-label="Demo direkt starten">
            <button className="primary-button" type="button" onClick={() => startDemo("parent")}>
              <Play size={18} />
              Demo starten
            </button>
            <button className="secondary-button" type="button" onClick={() => startDemo("teacher")}>
              <School size={18} />
              Lehrkraft-Demo starten
            </button>
          </div>
        )}
        <div className="segment-control">
          <button type="button" className={mode === "signin" ? "active" : ""} onClick={() => setMode("signin")}>
            Anmelden
          </button>
          <button type="button" className={mode === "signup" ? "active" : ""} onClick={() => setMode("signup")}>
            Registrieren
          </button>
        </div>
        <label>
          E-Mail
          <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" required />
        </label>
        <label>
          Passwort
          <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" required minLength={6} />
        </label>
        {mode === "signup" && (
          <label>
            Rolle
            <select value={role} onChange={(event) => setRole(event.target.value)}>
              <option value="parent">Elternteil</option>
              <option value="teacher">Lehrkraft</option>
            </select>
          </label>
        )}
        {error && <p className="form-error">{error}</p>}
        <button className="primary-button" type="submit">
          <Lock size={18} />
          {mode === "signin" ? "Einloggen" : "Konto erstellen"}
        </button>
        {!store.isSupabaseEnabled && (
          <p className="demo-note">Demo-Modus aktiv: Ohne Supabase-Umgebungswerte wird lokal im Browser gespeichert.</p>
        )}
      </form>
    </div>
  );
}

function Sidebar({ view, setView, onSignOut, session }) {
  const items = [
    ["lernen", "Lernen", BookOpen],
    ["tests", "Tests", ClipboardList],
    ["kinder", "Kinder", Users],
    ...(session.role === "teacher" ? [["klassen", "Klassen", School]] : []),
    ["dashboard", "Dashboard", LayoutDashboard],
  ];
  return (
    <aside className="sidebar">
      <a className="brand" href="#" aria-label="Math4Kids Start">
        <span className="brand-mark">4</span>
        <span>
          <strong>Math4Kids</strong>
          <small>Schulisches Mathetraining</small>
        </span>
      </a>
      <nav className="side-nav" aria-label="Bereiche">
        {items.map(([id, label, Icon]) => (
          <button key={id} className={`side-link ${view === id ? "active" : ""}`} type="button" onClick={() => setView(id)}>
            <Icon size={20} />
            {label}
          </button>
        ))}
      </nav>
      <button className="side-link logout" type="button" onClick={onSignOut}>
        <LogOut size={20} />
        Abmelden
      </button>
    </aside>
  );
}

function Topbar({ activeChild, children, onSelectChild, onCreateChild, session }) {
  const [pinTarget, setPinTarget] = useState(null);
  return (
    <header className="topbar">
      <div>
        <p className="section-label">Lernplattform</p>
        <h1>{activeChild ? `${activeChild.name} startet Mathe-Missionen.` : "Erstelle zuerst ein Kinderprofil."}</h1>
        <span className="muted-line">
          {session.email} · {session.role === "teacher" ? "Lehrkraft" : "Elternteil"} · {store.isSupabaseEnabled ? "Supabase verbunden" : "Demo-Modus"}
        </span>
      </div>
      <div className="topbar-actions">
        {children.map((child) => (
          <button className={activeChild?.id === child.id ? "profile-chip active" : "profile-chip"} key={child.id} onClick={() => setPinTarget(child)}>
            <span>{child.avatar}</span>
            {child.name}
          </button>
        ))}
        <ChildProfileForm onCreateChild={onCreateChild} compact />
      </div>
      {pinTarget && <PinDialog child={pinTarget} onClose={() => setPinTarget(null)} onConfirm={onSelectChild} />}
    </header>
  );
}

function ChildProfileForm({ onCreateChild, compact = false }) {
  const [open, setOpen] = useState(!compact);
  const [name, setName] = useState("");
  const [grade, setGrade] = useState(3);
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  async function submit(event) {
    event.preventDefault();
    setError("");
    try {
      await onCreateChild({ name, grade: Number(grade), pin, avatar: pickAvatar(name) });
      setName("");
      setPin("");
      setOpen(false);
    } catch (err) {
      setError(err.message);
    }
  }

  if (!open) {
    return (
      <button className="secondary-button" type="button" onClick={() => setOpen(true)}>
        <UserPlus size={18} />
        Kind anlegen
      </button>
    );
  }

  return (
    <form className="child-form" onSubmit={submit}>
      <label>
        Name
        <input value={name} onChange={(event) => setName(event.target.value)} required placeholder="Mila" />
      </label>
      <label>
        Klasse
        <select value={grade} onChange={(event) => setGrade(event.target.value)}>
          {Array.from({ length: 10 }, (_, index) => index + 1).map((item) => (
            <option key={item} value={item}>Klasse {item}</option>
          ))}
        </select>
      </label>
      <label>
        PIN
        <input value={pin} onChange={(event) => setPin(event.target.value)} required minLength={4} maxLength={8} inputMode="numeric" />
      </label>
      {error && <p className="form-error">{error}</p>}
      <button className="primary-button" type="submit">Speichern</button>
    </form>
  );
}

function PinDialog({ child, onClose, onConfirm }) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  async function submit(event) {
    event.preventDefault();
    setError("");
    try {
      await onConfirm(child, pin);
      onClose();
    } catch (err) {
      setError(err.message);
    }
  }
  return (
    <div className="dialog-backdrop">
      <form className="dialog" onSubmit={submit}>
        <h2>{child.name} auswählen</h2>
        <p>Gib die Profil-PIN ein.</p>
        <input value={pin} onChange={(event) => setPin(event.target.value)} autoFocus inputMode="numeric" />
        {error && <p className="form-error">{error}</p>}
        <div className="dialog-actions">
          <button className="secondary-button" type="button" onClick={onClose}>Abbrechen</button>
          <button className="primary-button" type="submit">Öffnen</button>
        </div>
      </form>
    </div>
  );
}

function LearningView({ activeChild, attempts, missionProgress, onAttempt, summary }) {
  const recommendedMissionId = summary.nextMission?.id ?? missions[0].id;
  const [missionId, setMissionId] = useState(recommendedMissionId);

  useEffect(() => {
    setMissionId(recommendedMissionId);
  }, [activeChild?.id]);

  const activeMission = missions.find((item) => item.id === missionId) ?? missions[0];

  if (!activeChild) {
    return <EmptyState title="Noch kein Kinderprofil" text="Lege ein Kind an, damit Missionen und Lernstand gespeichert werden können." />;
  }

  return (
    <section className="learning-grid mission-layout">
      <div className="mission-map">
        <div className="panel-head">
          <div>
            <p className="section-label">Missionen</p>
            <h2>Alle Mathe-Welten</h2>
          </div>
          <Trophy size={24} />
        </div>
        <div className="mission-list">
          {missions.map((mission) => (
            <MissionCard
              key={mission.id}
              mission={mission}
              progress={getMissionProgress(missionProgress, mission.id)}
              selected={mission.id === activeMission.id}
              onSelect={() => setMissionId(mission.id)}
            />
          ))}
        </div>
      </div>

      <MissionPlayer
        activeChild={activeChild}
        mission={activeMission}
        progress={getMissionProgress(missionProgress, activeMission.id)}
        onAttempt={onAttempt}
      />

      <ProgressAside attempts={attempts} summary={summary} missionProgress={missionProgress} />
    </section>
  );
}

function MissionCard({ mission, progress, selected, onSelect }) {
  const correct = progress?.correct_count ?? 0;
  const percent = Math.min(100, Math.round((correct / mission.targetCount) * 100));
  const Icon = moduleIcons[learningModules.find((item) => item.id === mission.moduleId)?.iconKey] ?? BookOpen;
  return (
    <button className={`mission-card ${selected ? "active" : ""} ${progress?.completed ? "completed" : ""}`} onClick={onSelect}>
      <span className="mission-visual">{mission.visual}</span>
      <span className="mission-copy">
        <strong>{mission.title}</strong>
        <small>{mission.description}</small>
      </span>
      <span className="mission-meta">
        <Icon size={18} />
        {progress?.completed ? "Fertig" : `${percent}%`}
      </span>
      <span className="progress-track"><span style={{ width: `${percent}%` }} /></span>
    </button>
  );
}

function MissionPlayer({ activeChild, mission, progress, onAttempt }) {
  const initialLevel = progress?.level ?? activeChild.grade;
  const [level, setLevel] = useState(initialLevel);
  const [question, setQuestion] = useState(() => generateQuestion({ moduleId: mission.moduleId, missionId: mission.id, grade: activeChild.grade, level: initialLevel }));
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [visibleHints, setVisibleHints] = useState(0);
  const [sessionStats, setSessionStats] = useState({ answered: 0, correct: 0, stars: 0 });
  const [lastProgress, setLastProgress] = useState(progress);
  const [practiceAfterComplete, setPracticeAfterComplete] = useState(false);
  const [startedAt, setStartedAt] = useState(Date.now());

  useEffect(() => {
    const nextLevel = progress?.level ?? activeChild.grade;
    setLevel(nextLevel);
    setQuestion(generateQuestion({ moduleId: mission.moduleId, missionId: mission.id, grade: activeChild.grade, level: nextLevel }));
    setAnswer("");
    setFeedback(null);
    setVisibleHints(0);
    setSessionStats({ answered: 0, correct: 0, stars: 0 });
    setLastProgress(progress);
    setPracticeAfterComplete(false);
    setStartedAt(Date.now());
  }, [activeChild.id, activeChild.grade, mission.id, mission.moduleId]);

  const currentProgress = lastProgress ?? progress ?? {};
  const correctCount = currentProgress.correct_count ?? 0;
  const completed = currentProgress.completed || correctCount >= mission.targetCount;
  const showCompletion = completed && !practiceAfterComplete && !feedback;
  const progressPercent = Math.min(100, Math.round((correctCount / mission.targetCount) * 100));

  function nextQuestion(nextLevel = level) {
    if (completed) setPracticeAfterComplete(true);
    setQuestion(generateQuestion({ moduleId: mission.moduleId, missionId: mission.id, grade: activeChild.grade, level: nextLevel }));
    setAnswer("");
    setFeedback(null);
    setVisibleHints(0);
    setStartedAt(Date.now());
  }

  async function submitAnswer() {
    if (feedback || !answer.trim()) return;
    const result = gradeAnswer(question, answer);
    const starsAwarded = starsForAttempt({ correct: result.correct, hintCount: visibleHints });
    const progressUpdate = nextMissionProgress(currentProgress, {
      missionId: mission.id,
      level: Number(level),
      correct: result.correct,
      starsAwarded,
      targetCount: mission.targetCount,
    });
    setFeedback({ correct: result.correct, starsAwarded, progress: progressUpdate });
    setSessionStats((current) => ({
      answered: current.answered + 1,
      correct: current.correct + (result.correct ? 1 : 0),
      stars: current.stars + starsAwarded,
    }));
    const savedProgress = await onAttempt({
      module_id: question.moduleId,
      skill_id: question.skillId,
      question_type: question.type,
      prompt: question.prompt,
      expected_answer: String(question.answer),
      given_answer: answer,
      is_correct: result.correct,
      duration_ms: Date.now() - startedAt,
      error_type: result.correct ? null : question.errorType,
      explanation: question.explanation,
      grade_level: String(level),
      mission_id: mission.id,
      level: Number(level),
      hint_count: visibleHints,
      stars_awarded: starsAwarded,
    }, progressUpdate);
    setLastProgress(savedProgress ?? progressUpdate);
  }

  function submit(event) {
    event.preventDefault();
    submitAnswer();
  }

  return (
    <section className="practice-panel mission-player">
      <div className="panel-head">
        <div>
          <p className="section-label">{moduleTitle(mission.moduleId)}</p>
          <h2>{mission.title}</h2>
        </div>
        <label className="small-select">
          Level
          <select value={level} onChange={(event) => { setLevel(Number(event.target.value)); nextQuestion(Number(event.target.value)); }}>
            {Array.from({ length: 10 }, (_, index) => index + 1).map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
      </div>

      <div className="mission-status">
        <span><Star size={18} />{currentProgress.stars ?? 0} Sterne</span>
        <span><CheckCircle2 size={18} />{correctCount}/{mission.targetCount} richtig</span>
        <span><Award size={18} />{completed ? mission.badge : "Badge offen"}</span>
      </div>
      <div className="progress-track large"><span style={{ width: `${progressPercent}%` }} /></div>

      {showCompletion ? (
        <div className="mission-complete">
          <Trophy size={42} />
          <h3>Mission abgeschlossen</h3>
          <p>Das kannst du schon: {mission.description}</p>
          <p>Als Nächstes kannst du die Mission freiwillig wiederholen oder eine neue Mathe-Welt auswählen.</p>
          <button className="primary-button" type="button" onClick={nextQuestion}>
            <Play size={18} />
            Weiter trainieren
          </button>
        </div>
      ) : (
        <div className="exercise-card">
          <div className="question-visual">{question.visual}</div>
          <p className="question-prompt">{question.prompt}</p>
          <form className="answer-form" onSubmit={submit}>
            <label>
              Deine Antwort
              <input value={answer} onChange={(event) => setAnswer(event.target.value)} placeholder={question.placeholder} />
            </label>
            <button className="primary-button" type="button" onClick={submitAnswer} disabled={!answer.trim()}>
              <CheckCircle2 size={18} />
              Prüfen
            </button>
          </form>

          <div className="hint-stack">
            {question.hintSteps.slice(0, visibleHints).map((hint, index) => (
              <div className="hint" key={hint}>
                <HelpCircle size={16} />
                <span>Tipp {index + 1}: {hint}</span>
              </div>
            ))}
          </div>

          {feedback && (
            <div className={`feedback ${feedback.correct ? "correct" : "wrong"}`}>
              <strong>{feedback.correct ? `Richtig. ${feedback.starsAwarded} Sterne verdient.` : "Noch nicht."}</strong>
              <span>{feedback.correct ? question.explanation : `Richtige Lösung: ${question.answer}. ${question.explanation}`}</span>
            </div>
          )}

          <div className="actions-row">
            <button
              className="secondary-button"
              type="button"
              onClick={() => setVisibleHints((current) => Math.min(question.hintSteps.length, current + 1))}
              disabled={visibleHints >= question.hintSteps.length}
            >
              <HelpCircle size={18} />
              Hilfe
            </button>
            <button className="secondary-button" type="button" onClick={nextQuestion}>
              <Play size={18} />
              Nächste Aufgabe
            </button>
          </div>
        </div>
      )}

      <div className="mission-recap">
        <Metric label="Heute gelöst" value={sessionStats.answered} />
        <Metric label="Heute richtig" value={sessionStats.correct} />
        <Metric label="Heute Sterne" value={sessionStats.stars} />
      </div>
    </section>
  );
}

function TestsView({ activeChild, attempts, onAttempt }) {
  const [activeTestId, setActiveTestId] = useState("diagnose-klasse-5");
  const test = fixedTests.find((item) => item.id === activeTestId);
  return (
    <section className="two-column">
      <div className="panel">
        <p className="section-label">Tests</p>
        <h2>Diagnose- und Abschlusstests</h2>
        <div className="test-list">
          {fixedTests.map((item) => (
            <button key={item.id} className={item.id === activeTestId ? "test-item active" : "test-item"} onClick={() => setActiveTestId(item.id)}>
              <ClipboardList size={20} />
              <span>
                <strong>{item.title}</strong>
                <small>{item.questions.length} Aufgaben · Klasse {item.gradeRange}</small>
              </span>
            </button>
          ))}
        </div>
      </div>
      <TestRunner activeChild={activeChild} test={test} onAttempt={onAttempt} attempts={attempts} />
    </section>
  );
}

function TestRunner({ activeChild, test, onAttempt }) {
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [results, setResults] = useState([]);
  const question = test.questions[index];

  useEffect(() => {
    setIndex(0);
    setAnswer("");
    setResults([]);
  }, [test.id]);

  async function saveAnswer() {
    if (!answer.trim()) return;
    const result = gradeAnswer(question, answer);
    const attempt = {
      module_id: question.moduleId,
      skill_id: question.skillId,
      question_type: "fixed-test",
      prompt: question.prompt,
      expected_answer: String(question.answer),
      given_answer: answer,
      is_correct: result.correct,
      duration_ms: 0,
      error_type: result.correct ? null : question.errorType,
      explanation: question.explanation,
      grade_level: test.gradeRange,
      test_id: test.id,
      mission_id: question.missionId,
      level: null,
      hint_count: 0,
      stars_awarded: result.correct ? 1 : 0,
    };
    await onAttempt(attempt);
    setResults((current) => [...current, result.correct]);
    setAnswer("");
    if (index < test.questions.length - 1) {
      setIndex(index + 1);
    }
  }

  function submit(event) {
    event.preventDefault();
    saveAnswer();
  }

  if (!activeChild) {
    return <EmptyState title="Kein Profil ausgewählt" text="Wähle ein Kind aus, um Tests zu starten." />;
  }

  const finished = results.length === test.questions.length;
  return (
    <section className="panel test-runner">
      <p className="section-label">{test.title}</p>
      <h2>{finished ? "Test abgeschlossen" : `Aufgabe ${index + 1} von ${test.questions.length}`}</h2>
      {finished ? (
        <div className="score-result">
          <strong>{results.filter(Boolean).length}/{test.questions.length}</strong>
          <span>richtig gelöst</span>
          <button className="primary-button" onClick={() => { setIndex(0); setResults([]); }}>Test wiederholen</button>
        </div>
      ) : (
        <form className="exercise-card" onSubmit={submit}>
          <div className="question-visual">{question.visual}</div>
          <p className="question-prompt">{question.prompt}</p>
          <label>
            Antwort
            <input value={answer} onChange={(event) => setAnswer(event.target.value)} placeholder={question.placeholder} />
          </label>
          <button className="primary-button" type="button" onClick={saveAnswer} disabled={!answer.trim()}>Antwort speichern</button>
        </form>
      )}
    </section>
  );
}

function ChildrenView({ children, activeChild, onCreateChild, onSelectChild }) {
  const [pinTarget, setPinTarget] = useState(null);
  return (
    <section className="two-column">
      <div className="panel">
        <p className="section-label">Kinderprofile</p>
        <h2>Profile mit PIN verwalten</h2>
        <div className="child-list">
          {children.map((child) => (
            <button key={child.id} className={`child-card ${activeChild?.id === child.id ? "active" : ""}`} onClick={() => setPinTarget(child)}>
              <span>{child.avatar}</span>
              <strong>{child.name}</strong>
              <small>Klasse {child.grade}</small>
            </button>
          ))}
        </div>
      </div>
      <div className="panel">
        <p className="section-label">Neu</p>
        <h2>Kind anlegen</h2>
        <ChildProfileForm onCreateChild={onCreateChild} />
      </div>
      {pinTarget && <PinDialog child={pinTarget} onClose={() => setPinTarget(null)} onConfirm={onSelectChild} />}
    </section>
  );
}

function ClassesView({ classRooms, activeClass, classChildren, classAttempts, classAttemptOptions, children, onCreateClassRoom, onAssignChildToClass, onSelectClass }) {
  const [filters, setFilters] = useState({ childId: "", moduleId: "", result: "", errorType: "", dateRange: "" });
  const [childToAssign, setChildToAssign] = useState("");
  const classSummary = summarizeAttempts(classAttempts);
  const assignableChildren = children.filter((child) => !classChildren.some((classChild) => classChild.id === child.id));

  async function updateFilters(nextFilters) {
    setFilters(nextFilters);
    if (activeClass) await onSelectClass(activeClass, nextFilters);
  }

  async function assignChild(event) {
    event.preventDefault();
    if (!activeClass || !childToAssign) return;
    await onAssignChildToClass(activeClass.id, childToAssign);
    setChildToAssign("");
  }

  return (
    <section className="teacher-grid">
      <div className="panel">
        <p className="section-label">Klassen</p>
        <h2>Eigene Klassen</h2>
        <div className="class-list">
          {classRooms.map((classRoom) => (
            <button
              key={classRoom.id}
              className={activeClass?.id === classRoom.id ? "class-card active" : "class-card"}
              type="button"
              onClick={() => onSelectClass(classRoom, filters)}
            >
              <School size={22} />
              <span>
                <strong>{classRoom.name}</strong>
                <small>Klasse {classRoom.grade} · {classRoom.school_year}</small>
              </span>
            </button>
          ))}
        </div>
        <ClassRoomForm onCreateClassRoom={onCreateClassRoom} />
      </div>

      <div className="panel">
        <p className="section-label">Schüler</p>
        <h2>{activeClass ? activeClass.name : "Keine Klasse ausgewählt"}</h2>
        {activeClass ? (
          <>
            <form className="inline-form" onSubmit={assignChild}>
              <label>
                Kind zuordnen
                <select value={childToAssign} onChange={(event) => setChildToAssign(event.target.value)}>
                  <option value="">Auswählen</option>
                  {assignableChildren.map((child) => (
                    <option key={child.id} value={child.id}>{child.name} · Klasse {child.grade}</option>
                  ))}
                </select>
              </label>
              <button className="primary-button" type="submit" disabled={!childToAssign}>Zuordnen</button>
            </form>
            <div className="child-list compact-list">
              {classChildren.map((child) => (
                <div className="child-card static" key={child.id}>
                  <span>{child.avatar}</span>
                  <strong>{child.name}</strong>
                  <small>Klasse {child.grade}</small>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p className="muted-line">Lege eine Klasse an, um Kinder zuzuordnen.</p>
        )}
      </div>

      <div className="panel hero-panel">
        <p className="section-label">Klassenlernstand</p>
        <h2>{activeClass ? `${activeClass.name}: Übersicht` : "Noch keine Daten"}</h2>
        <div className="metric-row">
          <Metric label="Antworten" value={classSummary.total} />
          <Metric label="Richtig" value={`${classSummary.accuracy}%`} />
          <Metric label="Kinder" value={classChildren.length} />
          <Metric label="Fehlerarten" value={classSummary.topErrorTypes.length} />
        </div>
      </div>

      <div className="panel wide">
        <div className="panel-head">
          <div>
            <p className="section-label">Antwortdetails</p>
            <h2>Alle Eingaben der Klasse</h2>
          </div>
        </div>
        <ClassAttemptFilters filters={filters} children={classChildren} attempts={classAttemptOptions} onChange={updateFilters} />
        <AttemptTable attempts={classAttempts} detailed showChild />
      </div>
    </section>
  );
}

function ClassRoomForm({ onCreateClassRoom }) {
  const [name, setName] = useState("");
  const [grade, setGrade] = useState(5);
  const [schoolYear, setSchoolYear] = useState("2026/2027");
  const [error, setError] = useState("");

  async function submit(event) {
    event.preventDefault();
    setError("");
    try {
      await onCreateClassRoom({ name, grade: Number(grade), schoolYear });
      setName("");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <form className="class-form" onSubmit={submit}>
      <label>
        Klassenname
        <input value={name} onChange={(event) => setName(event.target.value)} placeholder="5a" required />
      </label>
      <div className="form-row">
        <label>
          Stufe
          <select value={grade} onChange={(event) => setGrade(event.target.value)}>
            {Array.from({ length: 10 }, (_, index) => index + 1).map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
        <label>
          Schuljahr
          <input value={schoolYear} onChange={(event) => setSchoolYear(event.target.value)} required />
        </label>
      </div>
      {error && <p className="form-error">{error}</p>}
      <button className="primary-button" type="submit">Klasse anlegen</button>
    </form>
  );
}

function ClassAttemptFilters({ filters, children, attempts, onChange }) {
  const errorTypes = [...new Set(attempts.map((attempt) => attempt.error_type).filter(Boolean))].sort();
  function next(key, value) {
    onChange({ ...filters, [key]: value });
  }
  return (
    <div className="filter-grid">
      <label>
        Kind
        <select value={filters.childId} onChange={(event) => next("childId", event.target.value)}>
          <option value="">Alle</option>
          {children.map((child) => <option key={child.id} value={child.id}>{child.name}</option>)}
        </select>
      </label>
      <label>
        Thema
        <select value={filters.moduleId} onChange={(event) => next("moduleId", event.target.value)}>
          <option value="">Alle</option>
          {learningModules.map((module) => <option key={module.id} value={module.id}>{module.title}</option>)}
        </select>
      </label>
      <label>
        Ergebnis
        <select value={filters.result} onChange={(event) => next("result", event.target.value)}>
          <option value="">Alle</option>
          <option value="correct">Richtig</option>
          <option value="wrong">Falsch</option>
        </select>
      </label>
      <label>
        Fehlerart
        <select value={filters.errorType} onChange={(event) => next("errorType", event.target.value)}>
          <option value="">Alle</option>
          {errorTypes.map((type) => <option key={type} value={type}>{errorTypeLabel(type)}</option>)}
        </select>
      </label>
      <label>
        Zeitraum
        <select value={filters.dateRange} onChange={(event) => next("dateRange", event.target.value)}>
          <option value="">Alles</option>
          <option value="today">Heute</option>
          <option value="7d">Letzte 7 Tage</option>
          <option value="30d">Letzte 30 Tage</option>
        </select>
      </label>
    </div>
  );
}

function AdultDashboard({ activeChild, attempts, missionProgress, summary }) {
  if (!activeChild) {
    return <EmptyState title="Kein Lernstand verfügbar" text="Lege ein Kinderprofil an und löse Aufgaben, um Empfehlungen zu sehen." />;
  }
  return (
    <section className="dashboard-grid">
      <div className="panel hero-panel">
        <p className="section-label">Lernstand</p>
        <h2>{activeChild.name}: Klasse {activeChild.grade}</h2>
        <div className="metric-row">
          <Metric label="Antworten" value={summary.total} />
          <Metric label="Richtig" value={`${summary.accuracy}%`} />
          <Metric label="Missionen fertig" value={`${summary.missionStats.completed}/${summary.missionStats.total}`} />
          <Metric label="Sterne" value={summary.missionStats.stars} />
        </div>
      </div>
      <div className="panel">
        <p className="section-label">Empfehlungen</p>
        <h2>Als Nächstes üben</h2>
        <RecommendationList summary={summary} />
      </div>
      <div className="panel">
        <p className="section-label">Fehlerarten</p>
        <h2>Woran es hakt</h2>
        <ErrorTypeList summary={summary} />
      </div>
      <div className="panel">
        <p className="section-label">Missionen</p>
        <h2>Fortschritt</h2>
        <MissionProgressList progressItems={missionProgress} />
      </div>
      <div className="panel wide">
        <p className="section-label">Antwortprotokoll</p>
        <h2>Letzte Versuche</h2>
        <AttemptTable attempts={attempts} />
      </div>
    </section>
  );
}

function ProgressAside({ attempts, summary, missionProgress }) {
  return (
    <aside className="progress-aside">
      <section className="panel">
        <p className="section-label">Fortschritt</p>
        <strong className="big-number">{summary.accuracy}%</strong>
        <span className="muted-line">{summary.total} Antworten gespeichert</span>
      </section>
      <section className="panel">
        <p className="section-label">Missionen</p>
        <div className="compact-mission-stats">
          <span><Trophy size={18} />{summary.missionStats.completed}/{summary.missionStats.total}</span>
          <span><Star size={18} />{summary.missionStats.stars}</span>
        </div>
        <MissionProgressList progressItems={missionProgress} compact />
      </section>
      <section className="panel">
        <p className="section-label">Nächste Übung</p>
        <RecommendationList summary={summary} />
      </section>
      <section className="panel">
        <p className="section-label">Aktivität</p>
        <AttemptTable attempts={attempts.slice(0, 5)} compact />
      </section>
    </aside>
  );
}

function RecommendationList({ summary }) {
  const items = summary.recommendations.length ? summary.recommendations : ["Starte mit Zahlenwelt", "Probiere Geometrie-Labor", "Mache einen Diagnosetest"];
  return (
    <ul className="recommendation-list">
      {items.map((item) => <li key={item}><Target size={16} />{item}</li>)}
    </ul>
  );
}

function ErrorTypeList({ summary }) {
  if (!summary.topErrorTypes.length) {
    return <p className="muted-line">Noch keine Fehlerschwerpunkte. Nach ein paar Aufgaben wird das genauer.</p>;
  }
  return (
    <ul className="recommendation-list">
      {summary.topErrorTypes.map(([type, count]) => <li key={type}><HelpCircle size={16} />{errorTypeLabel(type)}: {count}</li>)}
    </ul>
  );
}

function MissionProgressList({ progressItems, compact = false }) {
  const rows = useMemo(() => missions.map((mission) => ({
    mission,
    progress: getMissionProgress(progressItems, mission.id),
  })), [progressItems]);
  return (
    <div className={compact ? "mission-progress-list compact" : "mission-progress-list"}>
      {rows.map(({ mission, progress }) => {
        const correct = progress?.correct_count ?? 0;
        const percent = Math.min(100, Math.round((correct / mission.targetCount) * 100));
        return (
          <div className="mission-progress-row" key={mission.id}>
            <span>{mission.title}</span>
            <strong>{progress?.completed ? "fertig" : `${correct}/${mission.targetCount}`}</strong>
            <span className="progress-track"><span style={{ width: `${percent}%` }} /></span>
          </div>
        );
      })}
    </div>
  );
}

function AttemptTable({ attempts, compact = false, detailed = false, showChild = false }) {
  const [selectedAttempt, setSelectedAttempt] = useState(null);
  if (!attempts.length) {
    return <p className="muted-line">Noch keine Antworten gespeichert.</p>;
  }
  return (
    <>
      <div className={detailed ? "attempt-table detailed" : "attempt-table"}>
        {detailed && (
          <div className="attempt-row header">
            {showChild && <span>Kind</span>}
            <span>Aufgabe</span>
            <span>Eingabe</span>
            <span>Lösung</span>
            <span>Hilfen</span>
            <span>Dauer</span>
            <span>Fehlerart</span>
            <span>Zeitpunkt</span>
            <span>Ergebnis</span>
          </div>
        )}
        {attempts.map((attempt) => (
          <button
            className={detailed ? "attempt-row detailed-row" : "attempt-row"}
            key={attempt.id}
            type="button"
            onClick={() => setSelectedAttempt(attempt)}
          >
            {detailed ? (
              <>
                {showChild && <span>{attempt.child?.name ?? "Kind"}</span>}
                <span>{attempt.prompt}</span>
                <span>{attempt.given_answer || "-"}</span>
                <span>{attempt.expected_answer}</span>
                <span>{attempt.hint_count ?? 0}</span>
                <span>{formatDuration(attempt.duration_ms)}</span>
                <span>{attempt.error_type ? errorTypeLabel(attempt.error_type) : "keine"}</span>
                <span>{formatDateTime(attempt.created_at)}</span>
                <strong className={attempt.is_correct ? "ok" : "bad"}>{attempt.is_correct ? "richtig" : "falsch"}</strong>
              </>
            ) : (
              <>
                <span>{moduleTitle(attempt.module_id)}</span>
                {!compact && <span>{attempt.prompt}</span>}
                {!compact && <span>{attempt.error_type ? errorTypeLabel(attempt.error_type) : "keine"}</span>}
                <strong className={attempt.is_correct ? "ok" : "bad"}>{attempt.is_correct ? "richtig" : "üben"}</strong>
              </>
            )}
          </button>
        ))}
      </div>
      {selectedAttempt && (
        <AttemptDetailDialog attempt={selectedAttempt} onClose={() => setSelectedAttempt(null)} />
      )}
    </>
  );
}

function AttemptDetailDialog({ attempt, onClose }) {
  return (
    <div className="dialog-backdrop">
      <section className="dialog attempt-detail">
        <div className="panel-head">
          <div>
            <p className="section-label">Aufgabendetail</p>
            <h2>{attempt.child?.name ? `${attempt.child.name}: ${moduleTitle(attempt.module_id)}` : moduleTitle(attempt.module_id)}</h2>
          </div>
        </div>
        <dl className="detail-grid">
          <div><dt>Aufgabe</dt><dd>{attempt.prompt}</dd></div>
          <div><dt>Eingabe</dt><dd>{attempt.given_answer || "-"}</dd></div>
          <div><dt>Richtige Lösung</dt><dd>{attempt.expected_answer}</dd></div>
          <div><dt>Ergebnis</dt><dd className={attempt.is_correct ? "ok" : "bad"}>{attempt.is_correct ? "richtig" : "falsch"}</dd></div>
          <div><dt>Mission</dt><dd>{missionTitle(attempt.mission_id)}</dd></div>
          <div><dt>Modul / Kompetenz</dt><dd>{moduleTitle(attempt.module_id)} · {skillLabel(attempt.skill_id)}</dd></div>
          <div><dt>Level</dt><dd>{attempt.level ?? attempt.grade_level ?? "-"}</dd></div>
          <div><dt>Hilfen</dt><dd>{attempt.hint_count ?? 0}</dd></div>
          <div><dt>Sterne</dt><dd>{attempt.stars_awarded ?? 0}</dd></div>
          <div><dt>Dauer</dt><dd>{formatDuration(attempt.duration_ms)}</dd></div>
          <div><dt>Fehlerart</dt><dd>{attempt.error_type ? errorTypeLabel(attempt.error_type) : "keine"}</dd></div>
          <div><dt>Zeitpunkt</dt><dd>{formatDateTime(attempt.created_at)}</dd></div>
          <div className="full"><dt>Erklärung</dt><dd>{attempt.explanation || "Keine Erklärung gespeichert."}</dd></div>
        </dl>
        <div className="dialog-actions">
          <button className="primary-button" type="button" onClick={onClose}>Schließen</button>
        </div>
      </section>
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div className="metric">
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

function EmptyState({ title, text }) {
  return (
    <section className="panel empty-state">
      <Sparkles size={34} />
      <h2>{title}</h2>
      <p>{text}</p>
    </section>
  );
}

function moduleTitle(moduleId) {
  return learningModules.find((item) => item.id === moduleId)?.title ?? moduleId;
}

function missionTitle(missionId) {
  return missions.find((item) => item.id === missionId)?.title ?? missionId ?? "-";
}

function formatDuration(durationMs = 0) {
  if (!durationMs) return "-";
  const seconds = Math.max(1, Math.round(durationMs / 1000));
  return seconds < 60 ? `${seconds}s` : `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
}

function formatDateTime(value) {
  if (!value) return "-";
  return new Intl.DateTimeFormat("de-DE", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(value));
}

function pickAvatar(name) {
  const avatars = ["🟦", "🟨", "🟩", "⭐", "📘", "🔷"];
  const code = Array.from(name || "Math").reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return avatars[code % avatars.length];
}

createRoot(document.getElementById("root")).render(<App />);
