import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { Exercise, Level, Motion, WeekSize, WorkoutDay, exercises, levels, prescription, routines } from "./data";

type Screen = "home" | "workout" | "exercise" | "history";

type Profile = {
  level: Level;
  weekSize: WeekSize;
  goal: string;
};

type ExerciseLog = {
  id: string;
  date: string;
  dayId: string;
  exerciseId: string;
  exerciseName: string;
  sets: number;
  reps: string;
  load: string;
  notes: string;
};

type DoneWorkout = {
  dayId: string;
  date: string;
};

type Store = {
  logs: ExerciseLog[];
  doneWorkouts: DoneWorkout[];
};

const profileKey = "treino-vivo-profile";
const storeKey = "treino-vivo-store";

const defaultProfile: Profile = {
  level: "iniciante",
  weekSize: 3,
  goal: "Hipertrofia + emagrecimento",
};

const defaultStore: Store = {
  logs: [],
  doneWorkouts: [],
};

const levelAlternatives: Partial<Record<string, string>> = {
  "agachamento-livre": "leg-press",
  "supino-inclinado": "supino-reto",
  "remada-curvada": "remada-baixa",
  stiff: "mesa-flexora",
  "levantamento-terra": "leg-press",
  "triceps-testa": "triceps-corda",
  "burpee-adaptado": "eliptico",
  "kettlebell-swing": "bike",
  remador: "puxada-frente",
};

function readStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function todayLabel() {
  return new Intl.DateTimeFormat("pt-BR", { weekday: "short", day: "2-digit", month: "short" }).format(new Date());
}

function randomId() {
  return crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function getWorkoutExercises(day: WorkoutDay, level: Level) {
  return day.exerciseIds
    .map((id) => {
      const base = exercises.find((exercise) => exercise.id === id);
      if (!base) return undefined;
      if (base.level.includes(level)) return base;
      const alternativeId = levelAlternatives[id];
      return exercises.find((exercise) => exercise.id === alternativeId) ?? base;
    })
    .filter(Boolean) as Exercise[];
}

function App() {
  const [profile, setProfile] = useState<Profile>(() => readStorage(profileKey, defaultProfile));
  const [store, setStore] = useState<Store>(() => readStorage(storeKey, defaultStore));
  const [screen, setScreen] = useState<Screen>("home");
  const [activeDayId, setActiveDayId] = useState(routines[profile.weekSize][0].id);
  const [activeExerciseId, setActiveExerciseId] = useState(routines[profile.weekSize][0].exerciseIds[0]);

  const days = routines[profile.weekSize];
  const activeDay = days.find((day) => day.id === activeDayId) ?? days[0];
  const activeExercise = exercises.find((item) => item.id === activeExerciseId) ?? exercises[0];
  const doneIds = new Set(store.doneWorkouts.map((item) => item.dayId));
  const progress = Math.round((days.filter((day) => doneIds.has(day.id)).length / days.length) * 100);

  useEffect(() => {
    localStorage.setItem(profileKey, JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem(storeKey, JSON.stringify(store));
  }, [store]);

  useEffect(() => {
    const nextDays = routines[profile.weekSize];
    if (!nextDays.some((day) => day.id === activeDayId)) {
      setActiveDayId(nextDays[0].id);
      setActiveExerciseId(nextDays[0].exerciseIds[0]);
    }
  }, [activeDayId, profile.weekSize]);

  function updateProfile(next: Partial<Profile>) {
    setProfile((current) => ({ ...current, ...next }));
  }

  function openWorkout(dayId: string) {
    const day = days.find((item) => item.id === dayId) ?? days[0];
    setActiveDayId(day.id);
    setActiveExerciseId(day.exerciseIds[0]);
    setScreen("workout");
  }

  function openExercise(exerciseId: string) {
    setActiveExerciseId(exerciseId);
    setScreen("exercise");
  }

  function saveLog(log: Omit<ExerciseLog, "id" | "date">) {
    const entry: ExerciseLog = {
      ...log,
      id: randomId(),
      date: new Date().toISOString(),
    };
    setStore((current) => ({ ...current, logs: [entry, ...current.logs].slice(0, 300) }));
  }

  function completeWorkout(dayId: string) {
    setStore((current) => ({
      ...current,
      doneWorkouts: [
        { dayId, date: new Date().toISOString() },
        ...current.doneWorkouts.filter((item) => item.dayId !== dayId),
      ],
    }));
    setScreen("home");
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <button className="brand" onClick={() => setScreen("home")} aria-label="Voltar para inicio">
          <span className="brand-mark">TV</span>
          <span>
            <strong>Treino Vivo</strong>
            <small>{todayLabel()}</small>
          </span>
        </button>
        <nav className="tabs" aria-label="Navegacao principal">
          <button className={screen === "home" ? "active" : ""} onClick={() => setScreen("home")}>Semana</button>
          <button className={screen === "history" ? "active" : ""} onClick={() => setScreen("history")}>Historico</button>
        </nav>
      </header>

      {screen === "home" && (
        <Home
          days={days}
          doneIds={doneIds}
          profile={profile}
          progress={progress}
          onProfile={updateProfile}
          onOpenWorkout={openWorkout}
        />
      )}

      {screen === "workout" && (
        <Workout
          day={activeDay}
          level={profile.level}
          logs={store.logs}
          onBack={() => setScreen("home")}
          onComplete={() => completeWorkout(activeDay.id)}
          onOpenExercise={openExercise}
          onSave={saveLog}
        />
      )}

      {screen === "exercise" && (
        <ExerciseDetail
          dayTitle={activeDay.title}
          exercise={activeExercise}
          level={profile.level}
          onBack={() => setScreen("workout")}
        />
      )}

      {screen === "history" && (
        <History logs={store.logs} doneWorkouts={store.doneWorkouts} onOpenExercise={openExercise} />
      )}
    </main>
  );
}

function Home({
  days,
  doneIds,
  profile,
  progress,
  onProfile,
  onOpenWorkout,
}: {
  days: WorkoutDay[];
  doneIds: Set<string>;
  profile: Profile;
  progress: number;
  onProfile: (next: Partial<Profile>) => void;
  onOpenWorkout: (dayId: string) => void;
}) {
  return (
    <section className="screen">
      <div className="hero">
        <div>
          <p className="eyebrow">Plano semanal</p>
          <h1>{profile.goal}</h1>
          <p>Escolha entre 3 ou 5 dias e registre cargas, repeticoes e observacoes direto no treino.</p>
        </div>
        <div className="progress-ring" style={{ "--progress": `${progress}%` } as CSSProperties}>
          <strong>{progress}%</strong>
          <span>feito</span>
        </div>
      </div>

      <section className="control-band" aria-label="Preferencias do treino">
        <div className="field">
          <span>Dias</span>
          <div className="segmented">
            {[3, 5].map((size) => (
              <button
                key={size}
                className={profile.weekSize === size ? "selected" : ""}
                onClick={() => onProfile({ weekSize: size as WeekSize })}
              >
                {size} dias
              </button>
            ))}
          </div>
        </div>
        <div className="field">
          <span>Nivel</span>
          <select value={profile.level} onChange={(event) => onProfile({ level: event.target.value as Level })}>
            {levels.map((level) => (
              <option key={level.id} value={level.id}>{level.label}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <span>Objetivo</span>
          <input value={profile.goal} onChange={(event) => onProfile({ goal: event.target.value })} />
        </div>
      </section>

      <section className="day-grid">
        {days.map((day, index) => (
          <article className="day-card" key={day.id}>
            <div className="day-number">Dia {index + 1}</div>
            <h2>{day.title}</h2>
            <p>{day.focus}</p>
            <div className="chip-row">
              <span>{day.intensity}</span>
              <span>{day.exerciseIds.length} exercicios</span>
              {doneIds.has(day.id) && <span>Concluido</span>}
            </div>
            <button className="primary-action" onClick={() => onOpenWorkout(day.id)}>
              Abrir treino
            </button>
          </article>
        ))}
      </section>
    </section>
  );
}

function Workout({
  day,
  level,
  logs,
  onBack,
  onComplete,
  onOpenExercise,
  onSave,
}: {
  day: WorkoutDay;
  level: Level;
  logs: ExerciseLog[];
  onBack: () => void;
  onComplete: () => void;
  onOpenExercise: (exerciseId: string) => void;
  onSave: (log: Omit<ExerciseLog, "id" | "date">) => void;
}) {
  const workoutExercises = getWorkoutExercises(day, level);

  return (
    <section className="screen">
      <button className="ghost-action" onClick={onBack}>Voltar</button>
      <div className="workout-heading">
        <div>
          <p className="eyebrow">{day.intensity}</p>
          <h1>{day.title}</h1>
          <p>{day.focus}</p>
        </div>
        <RestTimer seconds={75} />
      </div>

      <div className="exercise-list">
        {workoutExercises.map((exercise) => (
          <ExerciseRow
            key={exercise.id}
            dayId={day.id}
            exercise={exercise}
            level={level}
            lastLog={logs.find((log) => log.exerciseId === exercise.id)}
            onOpen={() => onOpenExercise(exercise.id)}
            onSave={onSave}
          />
        ))}
      </div>

      <button className="finish-action" onClick={onComplete}>Concluir treino do dia</button>
    </section>
  );
}

function ExerciseRow({
  dayId,
  exercise,
  level,
  lastLog,
  onOpen,
  onSave,
}: {
  dayId: string;
  exercise: Exercise;
  level: Level;
  lastLog?: ExerciseLog;
  onOpen: () => void;
  onSave: (log: Omit<ExerciseLog, "id" | "date">) => void;
}) {
  const rx = prescription(level, exercise.motion);
  const [sets, setSets] = useState(rx.sets);
  const [reps, setReps] = useState(rx.reps);
  const [load, setLoad] = useState(lastLog?.load ?? "");
  const [notes, setNotes] = useState("");
  const [saved, setSaved] = useState(false);

  function handleSave() {
    onSave({ dayId, exerciseId: exercise.id, exerciseName: exercise.name, sets, reps, load, notes });
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1300);
  }

  return (
    <article className="exercise-row">
      <button className="animation-button" onClick={onOpen} aria-label={`Ver animacao de ${exercise.name}`}>
        <ExerciseAnimation motion={exercise.motion} compact />
      </button>
      <div className="exercise-body">
        <div className="exercise-title">
          <div>
            <h2>{exercise.name}</h2>
            <p>{exercise.group} · {exercise.equipment}</p>
          </div>
          <button className="small-action" onClick={onOpen}>Ver</button>
        </div>
        <div className="rx-line">
          <span>{rx.sets} series</span>
          <span>{rx.reps}</span>
          <span>{rx.rest}</span>
        </div>
        <div className="log-grid">
          <label>
            Series
            <input type="number" min="1" max="8" value={sets} onChange={(event) => setSets(Number(event.target.value))} />
          </label>
          <label>
            Reps
            <input value={reps} onChange={(event) => setReps(event.target.value)} />
          </label>
          <label>
            Carga
            <input placeholder="kg" value={load} onChange={(event) => setLoad(event.target.value)} />
          </label>
        </div>
        <textarea placeholder="Observacao rapida" value={notes} onChange={(event) => setNotes(event.target.value)} />
        <button className={saved ? "saved-action" : "primary-action"} onClick={handleSave}>
          {saved ? "Registrado" : "Salvar exercicio"}
        </button>
      </div>
    </article>
  );
}

function ExerciseDetail({
  dayTitle,
  exercise,
  level,
  onBack,
}: {
  dayTitle: string;
  exercise: Exercise;
  level: Level;
  onBack: () => void;
}) {
  const rx = prescription(level, exercise.motion);

  return (
    <section className="screen detail-screen">
      <button className="ghost-action" onClick={onBack}>Voltar ao treino</button>
      <div className="detail-layout">
        <div className="detail-animation">
          <ExerciseAnimation motion={exercise.motion} />
        </div>
        <div className="detail-copy">
          <p className="eyebrow">{dayTitle}</p>
          <h1>{exercise.name}</h1>
          <div className="chip-row">
            <span>{exercise.group}</span>
            <span>{exercise.equipment}</span>
            <span>{rx.sets}x {rx.reps}</span>
            <span>{rx.rest}</span>
          </div>
          <h2>Como fazer</h2>
          <ol>
            {exercise.instructions.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <h2>Cuidado</h2>
          <p>{exercise.caution}</p>
        </div>
      </div>
    </section>
  );
}

function History({
  logs,
  doneWorkouts,
  onOpenExercise,
}: {
  logs: ExerciseLog[];
  doneWorkouts: DoneWorkout[];
  onOpenExercise: (exerciseId: string) => void;
}) {
  const grouped = useMemo(() => {
    const map = new Map<string, ExerciseLog[]>();
    for (const log of logs) {
      map.set(log.exerciseId, [...(map.get(log.exerciseId) ?? []), log]);
    }
    return [...map.entries()].slice(0, 8);
  }, [logs]);

  return (
    <section className="screen">
      <div className="history-head">
        <div>
          <p className="eyebrow">Evolucao</p>
          <h1>Historico local</h1>
          <p>{logs.length} registros de exercicio e {doneWorkouts.length} treinos concluidos neste aparelho.</p>
        </div>
      </div>

      {logs.length === 0 ? (
        <div className="empty-state">
          <h2>Nenhum registro ainda</h2>
          <p>Abra um treino, salve series, repeticoes e carga. A evolucao aparece aqui.</p>
        </div>
      ) : (
        <div className="history-grid">
          {grouped.map(([exerciseId, items]) => (
            <article className="history-card" key={exerciseId}>
              <button onClick={() => onOpenExercise(exerciseId)}>
                <h2>{items[0].exerciseName}</h2>
                <span>{items.length} registros</span>
              </button>
              <div className="mini-bars" aria-hidden="true">
                {items.slice(0, 6).reverse().map((item) => (
                  <span key={item.id} style={{ height: `${Math.min(96, 26 + Number.parseFloat(item.load || "0") * 1.5)}px` }} />
                ))}
              </div>
              <p>Ultimo: {items[0].sets} series · {items[0].reps} reps · {items[0].load || "sem carga"}</p>
            </article>
          ))}
        </div>
      )}

      <section className="recent-list">
        <h2>Ultimos registros</h2>
        {logs.slice(0, 10).map((log) => (
          <article key={log.id}>
            <span>{new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" }).format(new Date(log.date))}</span>
            <strong>{log.exerciseName}</strong>
            <p>{log.sets} series · {log.reps} reps · {log.load || "sem carga"} {log.notes && `· ${log.notes}`}</p>
          </article>
        ))}
      </section>
    </section>
  );
}

function RestTimer({ seconds }: { seconds: number }) {
  const [remaining, setRemaining] = useState(seconds);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    if (remaining <= 0) {
      setRunning(false);
      return;
    }
    const timer = window.setTimeout(() => setRemaining((value) => value - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [remaining, running]);

  function start() {
    setRemaining(seconds);
    setRunning(true);
  }

  return (
    <div className="timer">
      <span>Descanso</span>
      <strong>{Math.floor(remaining / 60)}:{String(remaining % 60).padStart(2, "0")}</strong>
      <button onClick={start}>{running ? "Reiniciar" : "Iniciar"}</button>
    </div>
  );
}

function ExerciseAnimation({ motion, compact = false }: { motion: Motion; compact?: boolean }) {
  return (
    <div className={`motion motion-${motion} ${compact ? "compact" : ""}`}>
      <svg viewBox="0 0 220 220" role="img" aria-label={`Animacao de movimento ${motion}`}>
        <circle className="floor" cx="110" cy="178" r="58" />
        <g className="body">
          <circle className="head" cx="110" cy="54" r="17" />
          <line className="torso" x1="110" y1="72" x2="110" y2="124" />
          <line className="left-arm limb" x1="110" y1="86" x2="66" y2="112" />
          <line className="right-arm limb" x1="110" y1="86" x2="154" y2="112" />
          <line className="left-leg limb" x1="110" y1="124" x2="76" y2="164" />
          <line className="right-leg limb" x1="110" y1="124" x2="144" y2="164" />
        </g>
        <g className="prop">
          <line x1="58" y1="108" x2="162" y2="108" />
          <circle cx="50" cy="108" r="9" />
          <circle cx="170" cy="108" r="9" />
        </g>
      </svg>
    </div>
  );
}

export default App;
