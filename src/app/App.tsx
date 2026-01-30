import { useEffect, useMemo, useState } from "react";
import { defaultInstrument, defaultRequest } from "./state";
import { Exercise, GenerateRequest, PracticeLog } from "../models/types";
import { InstrumentSetup } from "../screens/InstrumentSetup";
import { GeneratorScreen } from "../screens/GeneratorScreen";
import { PracticeScreen } from "../screens/PracticeScreen";
import { ProgressScreen } from "../screens/ProgressScreen";
import { db } from "../storage/db";

type ScreenKey = "setup" | "generate" | "practice" | "progress";

export function App() {
  const [screen, setScreen] = useState<ScreenKey>("setup");
  const [instrument, setInstrument] = useState(defaultInstrument);
  const [request, setRequest] = useState<GenerateRequest>({
    ...defaultRequest,
    instrument: defaultInstrument,
  });
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [library, setLibrary] = useState<Exercise[]>([]);
  const [logs, setLogs] = useState<PracticeLog[]>([]);
  const [showNoteNames, setShowNoteNames] = useState(true);
  const [showSolfa, setShowSolfa] = useState(true);
  const [showNumbers, setShowNumbers] = useState(true);

  useEffect(() => {
    db.exercises.toArray().then(setLibrary);
    db.logs.toArray().then(setLogs);
  }, []);

  const updateInstrument = (next: typeof instrument) => {
    setInstrument(next);
    setRequest({ ...request, instrument: next });
  };

  const handleGenerate = (ex: Exercise, lastPatternId: string) => {
    setExercise(ex);
    setRequest({ ...request, lastPatternId });
    setScreen("practice");
  };

  const handleSave = async () => {
    if (!exercise) return;
    await db.exercises.put(exercise);
    setLibrary(await db.exercises.toArray());
    const log: PracticeLog = {
      id: "log-" + Date.now(),
      exerciseId: exercise.id,
      date: new Date().toLocaleDateString(),
      tempoAchieved: exercise.tempo,
      notes: "Felt comfortable, increase tempo next time.",
    };
    await db.logs.put(log);
    setLogs(await db.logs.toArray());
  };

  const toggle = (key: "notes" | "solfa" | "numbers") => {
    if (key === "notes") setShowNoteNames((v) => !v);
    if (key === "solfa") setShowSolfa((v) => !v);
    if (key === "numbers") setShowNumbers((v) => !v);
  };

  const navItems: { key: ScreenKey; label: string }[] = useMemo(
    () => [
      { key: "setup", label: "Instrument Setup" },
      { key: "generate", label: "Exercise Generator" },
      { key: "practice", label: "Playback + Practice" },
      { key: "progress", label: "Progress" },
    ],
    [],
  );

  return (
    <div className="app">
      <h1>Solo Instrument Exercise Coach</h1>
      <div className="nav">
        {navItems.map((item) => (
          <button
            key={item.key}
            className={screen === item.key ? "active" : ""}
            onClick={() => setScreen(item.key)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="stack">
        {screen === "setup" && <InstrumentSetup instrument={instrument} onChange={updateInstrument} />}
        {screen === "generate" && (
          <GeneratorScreen request={request} onRequestChange={setRequest} onGenerate={handleGenerate} />
        )}
        {screen === "practice" && (
          <PracticeScreen
            exercise={exercise}
            onSave={handleSave}
            showNoteNames={showNoteNames}
            showSolfa={showSolfa}
            showNumbers={showNumbers}
            onToggle={toggle}
          />
        )}
        {screen === "progress" && <ProgressScreen exercises={library} logs={logs} />}
      </div>
    </div>
  );
}
