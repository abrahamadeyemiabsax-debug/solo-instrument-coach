import { useEffect, useMemo, useState } from "react";
import { defaultInstrument, defaultRequest } from "./state";
import { Exercise, GenerateRequest, PracticeLog } from "../models/types";
import { InstrumentSetup } from "../screens/InstrumentSetup";
import { GeneratorScreen } from "../screens/GeneratorScreen";
import { PracticeScreen } from "../screens/PracticeScreen";
import { ProgressScreen } from "../screens/ProgressScreen";
import { db } from "../storage/db";
import { AppScaffold } from "../components/ui/AppScaffold";
import { typography } from "./designSystem";

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
  const [showRoman, setShowRoman] = useState(true);

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

  const handleLog = async () => {
    if (!exercise) return;
    const log: PracticeLog = {
      id: "log-" + Date.now(),
      exerciseId: exercise.id,
      date: new Date().toLocaleDateString(),
      tempoAchieved: exercise.tempo,
      notes: "Logged practice session.",
    };
    await db.logs.put(log);
    setLogs(await db.logs.toArray());
  };

  const handleVariation = () => {
    setScreen("generate");
  };

  const toggle = (key: "notes" | "solfa" | "numbers") => {
    if (key === "notes") setShowNoteNames((v) => !v);
    if (key === "solfa") setShowSolfa((v) => !v);
    if (key === "numbers") setShowNumbers((v) => !v);
  };

  const toggleWithRoman = (key: "notes" | "solfa" | "numbers" | "roman") => {
    if (key === "roman") setShowRoman((v) => !v);
    else toggle(key);
  };

  const navItems: { key: ScreenKey; label: string }[] = useMemo(
    () => [
      { key: "setup", label: "Setup" },
      { key: "generate", label: "Generate" },
      { key: "practice", label: "Practice" },
      { key: "progress", label: "Progress" },
    ],
    [],
  );

  return (
    <AppScaffold
      header={
        <div style={{ marginBottom: 24 }}>
          <div style={typography.title}>Solo Instrument Exercise Coach</div>
        </div>
      }
      navItems={navItems}
      activeKey={screen}
      onNavChange={(key) => setScreen(key as ScreenKey)}
    >
      <div className="stack">
        {screen === "setup" && (
          <InstrumentSetup
            instrument={instrument}
            onChange={updateInstrument}
            preferredKeys={request.preferredKeys}
            avoidedKeys={request.avoidedKeys}
            onPreferredKeysChange={(keys) => setRequest({ ...request, preferredKeys: keys })}
            onAvoidedKeysChange={(keys) => setRequest({ ...request, avoidedKeys: keys })}
          />
        )}
        {screen === "generate" && (
          <GeneratorScreen request={request} onRequestChange={setRequest} onGenerate={handleGenerate} />
        )}
        {screen === "practice" && (
          <PracticeScreen
            exercise={exercise}
            onSave={handleSave}
            onGenerateVariation={handleVariation}
            onLogPractice={handleLog}
            showNoteNames={showNoteNames}
            showSolfa={showSolfa}
            showNumbers={showNumbers}
            showRoman={showRoman}
            onToggle={toggleWithRoman}
          />
        )}
        {screen === "progress" && <ProgressScreen exercises={library} logs={logs} />}
      </div>
    </AppScaffold>
  );
}
