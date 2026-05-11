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
  adaptiveSummary,
  estimateTemplateCapacity,
  fixedTests,
  generateQuestion,
  getMissionProgress,
  gradeAnswer,
  errorTypeLabel,
  learningModules,
  missions,
  nextAdaptiveLevel,
  nextMissionProgress,
  starsForAttempt,
  subjects,
  skillLabel,
  subjectTitle,
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
  const recommendedSubjectId = missions.find((item) => item.id === recommendedMissionId)?.subjectId ?? "math";
  const [subjectId, setSubjectId] = useState(recommendedSubjectId);
  const [missionId, setMissionId] = useState(recommendedMissionId);

  useEffect(() => {
    setMissionId(recommendedMissionId);
    setSubjectId(recommendedSubjectId);
  }, [activeChild?.id]);

  const subjectMissions = missions.filter((item) => item.subjectId === subjectId);
  const activeMission = subjectMissions.find((item) => item.id === missionId) ?? subjectMissions[0] ?? missions[0];

  if (!activeChild) {
    return <EmptyState title="Noch kein Kinderprofil" text="Lege ein Kind an, damit Missionen und Lernstand gespeichert werden können." />;
  }

  function selectSubject(nextSubjectId) {
    const firstMission = missions.find((item) => item.subjectId === nextSubjectId) ?? missions[0];
    setSubjectId(nextSubjectId);
    setMissionId(firstMission.id);
  }

  return (
    <section className="learning-grid mission-layout">
      <div className="mission-map">
        <div className="panel-head">
          <div>
            <p className="section-label">Fächer & Missionen</p>
            <h2>{subjectTitle(subjectId)}-Welten</h2>
          </div>
          <Trophy size={24} />
        </div>
        <SubjectPicker activeSubjectId={subjectId} onSelect={selectSubject} />
        <p className="muted-line capacity-note">
          Template-Engine: mehr als {estimateTemplateCapacity().toLocaleString("de-DE")} kombinierbare Aufgaben.
        </p>
        <div className="mission-list">
          {subjectMissions.map((mission) => (
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

function SubjectPicker({ activeSubjectId, onSelect }) {
  return (
    <div className="subject-strip" aria-label="Fach auswählen">
      {subjects.map((subject) => (
        <button
          key={subject.id}
          className={subject.id === activeSubjectId ? "subject-chip active" : "subject-chip"}
          type="button"
          onClick={() => onSelect(subject.id)}
        >
          <span style={{ background: subject.color }}>{subject.visual}</span>
          {subject.title}
        </button>
      ))}
    </div>
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
      subject_id: question.subjectId,
      topic_id: question.topicId,
      skill_id: question.skillId,
      template_id: question.templateId,
      answer_type: question.answerType,
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
          <p className="section-label">{subjectTitle(mission.subjectId)} · {moduleTitle(mission.moduleId)}</p>
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
          <p>Als Nächstes kannst du die Mission freiwillig wiederholen oder eine neue Themenwelt auswählen.</p>
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
            <AnswerControl question={question} value={answer} onChange={setAnswer} label="Deine Antwort" />
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
  const [mode, setMode] = useState("adaptive");
  const [subjectId, setSubjectId] = useState("math");
  const [selectedGrade, setSelectedGrade] = useState(activeChild?.grade ?? 3);
  const subjectModules = useMemo(() => learningModules.filter((module) => module.subjectId === subjectId), [subjectId]);
  const [activeModuleId, setActiveModuleId] = useState(subjectModules[0]?.id ?? "arithmetic");
  const [activeTestId, setActiveTestId] = useState("diagnose-klasse-5");
  const test = fixedTests.find((item) => item.id === activeTestId);

  useEffect(() => {
    setSelectedGrade(activeChild?.grade ?? 3);
  }, [activeChild?.id, activeChild?.grade]);

  useEffect(() => {
    setActiveModuleId((current) => subjectModules.some((module) => module.id === current) ? current : subjectModules[0]?.id ?? "arithmetic");
  }, [subjectModules]);

  return (
    <section className="two-column">
      <div className="panel">
        <p className="section-label">Tests</p>
        <h2>Adaptive Checks & Modul-Checks</h2>
        <div className="segment-control mode-switch">
          <button type="button" className={mode === "adaptive" ? "active" : ""} onClick={() => setMode("adaptive")}>Adaptiv</button>
          <button type="button" className={mode === "module" ? "active" : ""} onClick={() => setMode("module")}>Modul-Check</button>
          <button type="button" className={mode === "fixed" ? "active" : ""} onClick={() => setMode("fixed")}>Fest</button>
        </div>
        {mode !== "fixed" && (
          <>
            <SubjectPicker activeSubjectId={subjectId} onSelect={setSubjectId} />
            <label className="small-select test-grade-select">
              Klasse
              <select value={selectedGrade} onChange={(event) => setSelectedGrade(Number(event.target.value))}>
                {[1, 2, 3, 4, 5, 6].map((grade) => <option key={grade} value={grade}>{grade}</option>)}
              </select>
            </label>
          </>
        )}
        <div className="test-list">
          {mode === "adaptive" ? (
            <div className="test-item active">
              <ClipboardList size={20} />
              <span>
                <strong>Adaptiver {subjectTitle(subjectId)}-Check</strong>
                <small>6 Aufgaben · Klasse {selectedGrade} · Schwierigkeit passt sich automatisch an</small>
              </span>
            </div>
          ) : mode === "module" ? (
            subjectModules.map((module) => (
              <button key={module.id} className={module.id === activeModuleId ? "test-item active" : "test-item"} onClick={() => setActiveModuleId(module.id)}>
                <ClipboardList size={20} />
                <span>
                  <strong>{module.title}</strong>
                  <small>6 Aufgaben · Klasse {selectedGrade} · {module.skills.slice(0, 2).join(", ")}</small>
                </span>
              </button>
            ))
          ) : (
            fixedTests.map((item) => (
              <button key={item.id} className={item.id === activeTestId ? "test-item active" : "test-item"} onClick={() => setActiveTestId(item.id)}>
                <ClipboardList size={20} />
                <span>
                  <strong>{item.title}</strong>
                  <small>{item.questions.length} Aufgaben · Klasse {item.gradeRange}</small>
                </span>
              </button>
            ))
          )}
        </div>
      </div>
      {mode === "adaptive" ? (
        <AdaptiveTestRunner activeChild={activeChild} subjectId={subjectId} selectedGrade={selectedGrade} onAttempt={onAttempt} />
      ) : mode === "module" ? (
        <ModuleCheckRunner activeChild={activeChild} moduleId={activeModuleId} selectedGrade={selectedGrade} onAttempt={onAttempt} />
      ) : (
        <TestRunner activeChild={activeChild} test={test} onAttempt={onAttempt} attempts={attempts} />
      )}
    </section>
  );
}

function AdaptiveTestRunner({ activeChild, subjectId, selectedGrade, onAttempt }) {
  const initialLevel = Math.max(1, Math.min(6, selectedGrade ?? activeChild?.grade ?? 3));
  const [level, setLevel] = useState(initialLevel);
  const [question, setQuestion] = useState(() => generateQuestion({ subjectId, grade: selectedGrade ?? activeChild?.grade ?? 3, level: initialLevel }));
  const [answer, setAnswer] = useState("");
  const [results, setResults] = useState([]);
  const [startedAt, setStartedAt] = useState(Date.now());

  useEffect(() => {
    const nextLevel = Math.max(1, Math.min(6, selectedGrade ?? activeChild?.grade ?? 3));
    setLevel(nextLevel);
    setQuestion(generateQuestion({ subjectId, grade: selectedGrade ?? activeChild?.grade ?? 3, level: nextLevel }));
    setAnswer("");
    setResults([]);
    setStartedAt(Date.now());
  }, [activeChild?.id, activeChild?.grade, selectedGrade, subjectId]);

  if (!activeChild) {
    return <EmptyState title="Kein Profil ausgewählt" text="Wähle ein Kind aus, um adaptive Tests zu starten." />;
  }

  const finished = results.length >= 6;
  const summary = adaptiveSummary(results);

  async function saveAnswer() {
    if (!answer.trim() || finished) return;
    const result = gradeAnswer(question, answer);
    const nextLevel = nextAdaptiveLevel(level, result.correct);
    await onAttempt({
      module_id: question.moduleId,
      subject_id: question.subjectId,
      topic_id: question.topicId,
      skill_id: question.skillId,
      template_id: question.templateId,
      answer_type: question.answerType,
      question_type: "adaptive-test",
      prompt: question.prompt,
      expected_answer: String(question.answer),
      given_answer: answer,
      is_correct: result.correct,
      duration_ms: Date.now() - startedAt,
      error_type: result.correct ? null : question.errorType,
      explanation: question.explanation,
      grade_level: String(selectedGrade),
      test_id: `adaptive-${subjectId}`,
      mission_id: question.missionId,
      level,
      hint_count: 0,
      stars_awarded: result.correct ? 1 : 0,
    });
    const nextResults = [...results, { correct: result.correct, level, moduleId: question.moduleId, skillId: question.skillId }];
    setResults(nextResults);
    setAnswer("");
    setLevel(nextLevel);
    setQuestion(generateQuestion({ subjectId, grade: selectedGrade, level: nextLevel }));
    setStartedAt(Date.now());
  }

  function submit(event) {
    event.preventDefault();
    saveAnswer();
  }

  return (
    <section className="panel test-runner">
      <p className="section-label">Adaptiver Check · {subjectTitle(subjectId)}</p>
      <h2>{finished ? "Check abgeschlossen" : `Aufgabe ${results.length + 1} von 6 · Level ${level}`}</h2>
      {finished ? (
        <div className="score-result">
          <strong>{summary.accuracy}%</strong>
          <span>{summary.correct}/{summary.total} richtig · {summary.status}</span>
          <button className="primary-button" type="button" onClick={() => {
            setLevel(initialLevel);
            setResults([]);
            setQuestion(generateQuestion({ subjectId, grade: selectedGrade, level: initialLevel }));
            setStartedAt(Date.now());
          }}>Check neu starten</button>
        </div>
      ) : (
        <form className="exercise-card" onSubmit={submit}>
          <div className="question-visual">{question.visual}</div>
          <p className="question-prompt">{question.prompt}</p>
          <AnswerControl question={question} value={answer} onChange={setAnswer} label="Antwort" />
          <button className="primary-button" type="button" onClick={saveAnswer} disabled={!answer.trim()}>Antwort speichern</button>
        </form>
      )}
    </section>
  );
}

function ModuleCheckRunner({ activeChild, moduleId, selectedGrade, onAttempt }) {
  const [questions, setQuestions] = useState(() => buildModuleCheck(moduleId, selectedGrade));
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [results, setResults] = useState([]);
  const [startedAt, setStartedAt] = useState(Date.now());
  const module = learningModules.find((item) => item.id === moduleId);
  const question = questions[index] ?? questions[0];

  useEffect(() => {
    setQuestions(buildModuleCheck(moduleId, selectedGrade));
    setIndex(0);
    setAnswer("");
    setResults([]);
    setStartedAt(Date.now());
  }, [moduleId, selectedGrade, activeChild?.id]);

  if (!activeChild) {
    return <EmptyState title="Kein Profil ausgewählt" text="Wähle ein Kind aus, um Modul-Checks zu starten." />;
  }

  const finished = results.length === questions.length;

  async function saveAnswer() {
    if (!answer.trim() || finished) return;
    const result = gradeAnswer(question, answer);
    await onAttempt({
      module_id: question.moduleId,
      subject_id: question.subjectId,
      topic_id: question.topicId,
      skill_id: question.skillId,
      template_id: question.templateId,
      answer_type: question.answerType,
      question_type: "module-check",
      prompt: question.prompt,
      expected_answer: String(question.answer),
      given_answer: answer,
      is_correct: result.correct,
      duration_ms: Date.now() - startedAt,
      error_type: result.correct ? null : question.errorType,
      explanation: question.explanation,
      grade_level: String(selectedGrade),
      test_id: `module-${moduleId}-klasse-${selectedGrade}`,
      mission_id: question.missionId,
      level: selectedGrade,
      hint_count: 0,
      stars_awarded: result.correct ? 1 : 0,
    });
    setResults((current) => [...current, result.correct]);
    setAnswer("");
    if (index < questions.length - 1) {
      setIndex(index + 1);
      setStartedAt(Date.now());
    }
  }

  function restart() {
    setQuestions(buildModuleCheck(moduleId, selectedGrade));
    setIndex(0);
    setAnswer("");
    setResults([]);
    setStartedAt(Date.now());
  }

  return (
    <section className="panel test-runner">
      <p className="section-label">Modul-Check · {subjectTitle(module?.subjectId)} · Klasse {selectedGrade}</p>
      <h2>{finished ? `${module?.title ?? "Modul"} abgeschlossen` : `Aufgabe ${index + 1} von ${questions.length}`}</h2>
      {finished ? (
        <div className="score-result">
          <strong>{results.filter(Boolean).length}/{questions.length}</strong>
          <span>richtig gelöst</span>
          <button className="primary-button" type="button" onClick={restart}>Modul-Check neu starten</button>
        </div>
      ) : (
        <form className="exercise-card" onSubmit={(event) => { event.preventDefault(); saveAnswer(); }}>
          <div className="question-visual">{question.visual}</div>
          <p className="question-prompt">{question.prompt}</p>
          <AnswerControl question={question} value={answer} onChange={setAnswer} label="Antwort" />
          <button className="primary-button" type="button" onClick={saveAnswer} disabled={!answer.trim()}>Antwort speichern</button>
        </form>
      )}
    </section>
  );
}

function AnswerControl({ question, value, onChange, label }) {
  const choices = question.choices ?? [];
  return (
    <label className={choices.length ? "answer-control with-choices" : "answer-control"}>
      {label}
      {choices.length > 0 && (
        <div className="choice-grid">
          {choices.map((choice) => (
            <button
              key={choice}
              type="button"
              className={value === choice ? "choice-button active" : "choice-button"}
              onClick={() => onChange(choice)}
            >
              {choice}
            </button>
          ))}
        </div>
      )}
      <input value={value} onChange={(event) => onChange(event.target.value)} placeholder={question.placeholder} />
    </label>
  );
}

function buildModuleCheck(moduleId, grade) {
  return Array.from({ length: 6 }, () => generateQuestion({ moduleId, grade, level: grade }));
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
      subject_id: question.subjectId,
      topic_id: question.topicId,
      skill_id: question.skillId,
      template_id: question.templateId,
      answer_type: question.answerType,
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
          <AnswerControl question={question} value={answer} onChange={setAnswer} label="Antwort" />
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
  const [filters, setFilters] = useState({ childId: "", subjectId: "", moduleId: "", result: "", errorType: "", dateRange: "" });
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
    const nextFilters = { ...filters, [key]: value };
    if (key === "subjectId") {
      nextFilters.moduleId = "";
    }
    onChange(nextFilters);
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
        Fach
        <select value={filters.subjectId} onChange={(event) => next("subjectId", event.target.value)}>
          <option value="">Alle</option>
          {subjects.map((subject) => <option key={subject.id} value={subject.id}>{subject.title}</option>)}
        </select>
      </label>
      <label>
        Thema
        <select value={filters.moduleId} onChange={(event) => next("moduleId", event.target.value)}>
          <option value="">Alle</option>
          {learningModules
            .filter((module) => !filters.subjectId || module.subjectId === filters.subjectId)
            .map((module) => <option key={module.id} value={module.id}>{module.title}</option>)}
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
  const [subjectFilter, setSubjectFilter] = useState("");
  const [moduleFilter, setModuleFilter] = useState("");
  if (!activeChild) {
    return <EmptyState title="Kein Lernstand verfügbar" text="Lege ein Kinderprofil an und löse Aufgaben, um Empfehlungen zu sehen." />;
  }
  const filteredAttempts = attempts
    .filter((attempt) => !subjectFilter || (attempt.subject_id ?? subjectForModuleId(attempt.module_id)) === subjectFilter)
    .filter((attempt) => !moduleFilter || attempt.module_id === moduleFilter);
  const filteredProgress = missionProgress.filter((progress) => {
    const mission = missions.find((item) => item.id === progress.mission_id);
    if (subjectFilter && mission?.subjectId !== subjectFilter) return false;
    if (moduleFilter && mission?.moduleId !== moduleFilter) return false;
    return true;
  });
  const dashboardSummary = subjectFilter || moduleFilter ? summarizeAttempts(filteredAttempts, filteredProgress) : summary;
  const moduleOptions = learningModules.filter((module) => !subjectFilter || module.subjectId === subjectFilter);
  return (
    <section className="dashboard-grid">
      <div className="panel hero-panel">
        <p className="section-label">Lernstand</p>
        <h2>{activeChild.name}: Klasse {activeChild.grade}</h2>
        <div className="dashboard-filter-row">
          <label className="small-select dashboard-filter">
            Fachfilter
            <select value={subjectFilter} onChange={(event) => { setSubjectFilter(event.target.value); setModuleFilter(""); }}>
              <option value="">Alle Fächer</option>
              {subjects.map((subject) => <option key={subject.id} value={subject.id}>{subject.title}</option>)}
            </select>
          </label>
          <label className="small-select dashboard-filter">
            Themenfilter
            <select value={moduleFilter} onChange={(event) => setModuleFilter(event.target.value)}>
              <option value="">Alle Themen</option>
              {moduleOptions.map((module) => <option key={module.id} value={module.id}>{module.title}</option>)}
            </select>
          </label>
        </div>
        <div className="metric-row">
          <Metric label="Antworten" value={dashboardSummary.total} />
          <Metric label="Richtig" value={`${dashboardSummary.accuracy}%`} />
          <Metric label="Missionen fertig" value={`${dashboardSummary.missionStats.completed}/${dashboardSummary.missionStats.total}`} />
          <Metric label="Sterne" value={dashboardSummary.missionStats.stars} />
        </div>
      </div>
      <div className="panel">
        <p className="section-label">Empfehlungen</p>
        <h2>Als Nächstes üben</h2>
        <RecommendationList summary={dashboardSummary} />
      </div>
      <div className="panel">
        <p className="section-label">Fehlerarten</p>
        <h2>Woran es hakt</h2>
        <ErrorTypeList summary={dashboardSummary} />
      </div>
      <div className="panel">
        <p className="section-label">Kompetenzlücken</p>
        <h2>Themen mit Übungsbedarf</h2>
        <SkillGapList summary={dashboardSummary} />
      </div>
      <div className="panel">
        <p className="section-label">Missionen</p>
        <h2>Fortschritt</h2>
        <MissionProgressList progressItems={filteredProgress} subjectId={subjectFilter} moduleId={moduleFilter} />
      </div>
      <div className="panel wide">
        <p className="section-label">Antwortprotokoll</p>
        <h2>Letzte Versuche</h2>
        <AttemptTable attempts={filteredAttempts} />
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

function SkillGapList({ summary }) {
  const gaps = [...summary.moduleScores]
    .filter((item) => item.total > 0)
    .sort((a, b) => a.accuracy - b.accuracy)
    .slice(0, 5);
  if (!gaps.length) {
    return <p className="muted-line">Noch keine fachlichen Lücken sichtbar.</p>;
  }
  return (
    <ul className="recommendation-list">
      {gaps.map((gap) => (
        <li key={gap.moduleId}>
          <BarChart3 size={16} />
          {moduleTitle(gap.moduleId)}: {gap.accuracy}% richtig bei {gap.total} Antworten
        </li>
      ))}
    </ul>
  );
}

function MissionProgressList({ progressItems, compact = false, subjectId = "", moduleId = "" }) {
  const rows = useMemo(() => missions
    .filter((mission) => !subjectId || mission.subjectId === subjectId)
    .filter((mission) => !moduleId || mission.moduleId === moduleId)
    .map((mission) => ({
    mission,
    progress: getMissionProgress(progressItems, mission.id),
  })), [progressItems, subjectId, moduleId]);
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
            <span>Fach</span>
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
                <span>{subjectTitle(attempt.subject_id ?? subjectForModuleId(attempt.module_id))}</span>
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
                <span>{subjectTitle(attempt.subject_id ?? subjectForModuleId(attempt.module_id))}</span>
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
          <div><dt>Fach</dt><dd>{subjectTitle(attempt.subject_id ?? subjectForModuleId(attempt.module_id))}</dd></div>
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

function subjectForModuleId(moduleId) {
  return learningModules.find((item) => item.id === moduleId)?.subjectId ?? "math";
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
