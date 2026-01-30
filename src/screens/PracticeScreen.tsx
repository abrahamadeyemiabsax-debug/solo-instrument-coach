import { Exercise } from "../models/types";
import { ExerciseViewer } from "../components/ExerciseViewer";
import { TransportControls } from "../components/TransportControls";

type Props = {
  exercise: Exercise | null;
  onSave: () => void;
  showNoteNames: boolean;
  showSolfa: boolean;
  showNumbers: boolean;
  onToggle: (key: "notes" | "solfa" | "numbers") => void;
};

export function PracticeScreen({
  exercise,
  onSave,
  showNoteNames,
  showSolfa,
  showNumbers,
  onToggle,
}: Props) {
  return (
    <div className="grid">
      <div className="card stack">
        <h2>Playback + Practice</h2>
        <div className="row">
          <label>
            <input type="checkbox" checked={showNoteNames} onChange={() => onToggle("notes")} /> Note names
          </label>
          <label>
            <input type="checkbox" checked={showSolfa} onChange={() => onToggle("solfa")} /> Solfa
          </label>
          <label>
            <input type="checkbox" checked={showNumbers} onChange={() => onToggle("numbers")} /> Numbers
          </label>
        </div>
        <ExerciseViewer
          exercise={exercise}
          showNoteNames={showNoteNames}
          showSolfa={showSolfa}
          showNumbers={showNumbers}
        />
        <button onClick={onSave} disabled={!exercise}>
          Save to Library
        </button>
      </div>
      <TransportControls exercise={exercise} />
    </div>
  );
}
