import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  BarChart3,
  BookOpen,
  Brain,
  CheckCircle2,
  ClipboardList,
  GraduationCap,
  LayoutDashboard,
  Lock,
  LogOut,
  Shapes,
  Sparkles,
  Target,
  UserPlus,
  Users,
} from "lucide-react";
import {
  fixedTests,
  generateQuestion,
  gradeAnswer,
  learningModules,
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
          setAttempts(await store.listAttempts(firstChild.id));
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
    setAttempts(nextChild ? await store.listAttempts(nextChild.id) : []);
  }

  async function handleSignedIn(nextSession) {
    setSession(nextSession);
    await refreshChildData(null);
  }

  async function handleCreateChild(profile) {
    const child = await store.createChildProfile(profile);
    await refreshChildData(child);
  }

  async function handleSelectChild(child, pin) {
    await store.verifyChildPin(child.id, pin);
    setActiveChild(child);
    setAttempts(await store.listAttempts(child.id));
  }

  async function handleAttempt(attempt) {
    if (!activeChild) return;
    const savedAttempt = await store.recordAttempt(activeChild.id, attempt);
    setAttempts((current) => [savedAttempt, ...current].slice(0, 200));
  }

  async function handleSignOut() {
    await store.signOut();
    setSession(null);
    setChildren([]);
    setActiveChild(null);
    setAttempts([]);
  }

  if (loading) {
    return <LoadingScreen />;
  }

  if (!session) {
    return <AuthScreen onSignedIn={handleSignedIn} />;
  }

  const summary = summarizeAttempts(attempts);

  return (
    <div className="app-shell">
      <Sidebar view={view} setView={setView} onSignOut={handleSignOut} />
      <main className="workspace">
        <Topbar
          activeChild={activeChild}
          children={children}
          onSelectChild={handleSelectChild}
          onCreateChild={handleCreateChild}
          session={session}
        />

        {view === "lernen" && (
          <LearningView activeChild={activeChild} attempts={attempts} onAttempt={handleAttempt} summary={summary} />
        )}
        {view === "tests" && <TestsView activeChild={activeChild} attempts={attempts} onAttempt={handleAttempt} />}
        {view === "kinder" && (
          <ChildrenView children={children} activeChild={activeChild} onCreateChild={handleCreateChild} onSelectChild={handleSelectChild} />
        )}
        {view === "dashboard" && <AdultDashboard activeChild={activeChild} attempts={attempts} summary={summary} />}
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
        <h1>Mathe üben, Lernstand sehen, gezielt besser werden.</h1>
        <p>
          Eltern und Lehrkräfte melden sich an, legen Kinderprofile mit PIN an und verfolgen Fortschritt,
          Schwächen und Empfehlungen über alle wichtigen Mathe-Themen.
        </p>
        <div className="feature-strip">
          <span>Geometrie</span>
          <span>Brüche</span>
          <span>Prozent</span>
          <span>Tests</span>
        </div>
      </section>

      <form className="auth-card" onSubmit={submit}>
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

function Sidebar({ view, setView, onSignOut }) {
  const items = [
    ["lernen", "Lernen", BookOpen],
    ["tests", "Tests", ClipboardList],
    ["kinder", "Kinder", Users],
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
        <h1>{activeChild ? `${activeChild.name} lernt Mathematik.` : "Erstelle zuerst ein Kinderprofil."}</h1>
        <span className="muted-line">{session.email} · {store.isSupabaseEnabled ? "Supabase verbunden" : "Demo-Modus"}</span>
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

function LearningView({ activeChild, attempts, onAttempt, summary }) {
  const [moduleId, setModuleId] = useState("geometry");
  const [level, setLevel] = useState(activeChild?.grade ?? 3);
  const [question, setQuestion] = useState(() => generateQuestion({ moduleId: "geometry", grade: activeChild?.grade ?? 3 }));
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [startedAt, setStartedAt] = useState(Date.now());

  useEffect(() => {
    const grade = activeChild?.grade ?? 3;
    setLevel(grade);
    setQuestion(generateQuestion({ moduleId, grade }));
    setAnswer("");
    setFeedback(null);
    setStartedAt(Date.now());
  }, [activeChild, moduleId]);

  function nextQuestion(nextModule = moduleId, nextLevel = level) {
    setQuestion(generateQuestion({ moduleId: nextModule, grade: Number(nextLevel) }));
    setAnswer("");
    setFeedback(null);
    setStartedAt(Date.now());
  }

  async function submit(event) {
    event.preventDefault();
    const result = gradeAnswer(question, answer);
    setFeedback(result);
    await onAttempt({
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
      grade_level: level,
    });
  }

  const selectedModule = learningModules.find((item) => item.id === moduleId);

  if (!activeChild) {
    return <EmptyState title="Noch kein Kinderprofil" text="Lege ein Kind an, damit Übungen und Lernstand gespeichert werden können." />;
  }

  return (
    <section className="learning-grid">
      <div className="module-column">
        <div className="panel-head">
          <div>
            <p className="section-label">Themen</p>
            <h2>Module für Klasse {activeChild.grade}</h2>
          </div>
        </div>
        <div className="module-grid">
          {learningModules.map((module) => (
            <button key={module.id} className={`module-card ${module.id === moduleId ? "active" : ""}`} onClick={() => setModuleId(module.id)}>
              {React.createElement(moduleIcons[module.iconKey] ?? BookOpen, { size: 24 })}
              <strong>{module.title}</strong>
              <span>{module.skills.length} Kompetenzen</span>
            </button>
          ))}
        </div>
      </div>

      <section className="practice-panel">
        <div className="panel-head">
          <div>
            <p className="section-label">{selectedModule.title}</p>
            <h2>{question.title}</h2>
          </div>
          <label className="small-select">
            Klasse
            <select value={level} onChange={(event) => { setLevel(event.target.value); nextQuestion(moduleId, event.target.value); }}>
              {Array.from({ length: 10 }, (_, index) => index + 1).map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
        </div>
        <div className="exercise-card">
          <div className="question-visual">{question.visual}</div>
          <p className="question-prompt">{question.prompt}</p>
          <form className="answer-form" onSubmit={submit}>
            <label>
              Deine Antwort
              <input value={answer} onChange={(event) => setAnswer(event.target.value)} placeholder={question.placeholder} />
            </label>
            <button className="primary-button" type="submit">
              <CheckCircle2 size={18} />
              Prüfen
            </button>
          </form>
          {feedback && (
            <div className={`feedback ${feedback.correct ? "correct" : "wrong"}`}>
              <strong>{feedback.correct ? "Richtig." : "Noch nicht."}</strong>
              <span>{feedback.correct ? question.explanation : `Richtige Lösung: ${question.answer}. ${question.hint}`}</span>
            </div>
          )}
          <div className="actions-row">
            <button className="secondary-button" onClick={() => setFeedback({ correct: false })}>Tipp anzeigen</button>
            <button className="secondary-button" onClick={() => nextQuestion()}>Nächste Aufgabe</button>
          </div>
        </div>
      </section>

      <ProgressAside attempts={attempts} summary={summary} />
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

  async function submit(event) {
    event.preventDefault();
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
    };
    await onAttempt(attempt);
    setResults((current) => [...current, result.correct]);
    setAnswer("");
    if (index < test.questions.length - 1) {
      setIndex(index + 1);
    }
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
          <button className="primary-button" type="submit">Antwort speichern</button>
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

function AdultDashboard({ activeChild, attempts, summary }) {
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
          <Metric label="Stärkstes Thema" value={summary.strongest || "offen"} />
        </div>
      </div>
      <div className="panel">
        <p className="section-label">Empfehlungen</p>
        <h2>Als Nächstes üben</h2>
        <RecommendationList summary={summary} />
      </div>
      <div className="panel wide">
        <p className="section-label">Antwortprotokoll</p>
        <h2>Letzte Versuche</h2>
        <AttemptTable attempts={attempts} />
      </div>
    </section>
  );
}

function ProgressAside({ attempts, summary }) {
  return (
    <aside className="progress-aside">
      <section className="panel">
        <p className="section-label">Fortschritt</p>
        <strong className="big-number">{summary.accuracy}%</strong>
        <span className="muted-line">{summary.total} Antworten gespeichert</span>
      </section>
      <section className="panel">
        <p className="section-label">Schwächen</p>
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
  const items = summary.recommendations.length ? summary.recommendations : ["Starte mit Geometrie", "Wiederhole Grundrechenarten", "Mache einen Diagnosetest"];
  return (
    <ul className="recommendation-list">
      {items.map((item) => <li key={item}><Target size={16} />{item}</li>)}
    </ul>
  );
}

function AttemptTable({ attempts, compact = false }) {
  if (!attempts.length) {
    return <p className="muted-line">Noch keine Antworten gespeichert.</p>;
  }
  return (
    <div className="attempt-table">
      {attempts.map((attempt) => (
        <div className="attempt-row" key={attempt.id}>
          <span>{attempt.module_id}</span>
          {!compact && <span>{attempt.prompt}</span>}
          <strong className={attempt.is_correct ? "ok" : "bad"}>{attempt.is_correct ? "richtig" : "üben"}</strong>
        </div>
      ))}
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

function pickAvatar(name) {
  const avatars = ["🟦", "🟨", "🟩", "⭐", "📘", "🔷"];
  const code = Array.from(name || "Math").reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return avatars[code % avatars.length];
}

createRoot(document.getElementById("root")).render(<App />);
