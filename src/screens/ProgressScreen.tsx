import { Exercise, PracticeLog } from "../models/types";

type Props = {
  exercises: Exercise[];
  logs: PracticeLog[];
};

export function ProgressScreen({ exercises, logs }: Props) {
  const streak = logs.length;
  const keys = new Set(exercises.map((e) => e.keyTonic));

  return (
    <div className="card stack">
      <h2>Progress Tracking</h2>
      <div>
        <span className="pill">Streak: {streak} sessions</span>
        <span className="pill">Keys covered: {keys.size}</span>
      </div>
      <div className="hint">
        Weak spots: {keys.size < 6 ? "Try rotating more keys." : "Keep expanding tempo ceilings."}
      </div>
      <div className="stack">
        {logs.slice(-8).map((l) => (
          <div key={l.id} className="exercise">
            <div className="label">{l.date}</div>
            <div className="hint">Tempo achieved: {l.tempoAchieved} BPM</div>
            <div className="hint">{l.notes}</div>
          </div>
        ))}
        {logs.length === 0 && <div className="hint">No practice logs yet.</div>}
      </div>
    </div>
  );
}
