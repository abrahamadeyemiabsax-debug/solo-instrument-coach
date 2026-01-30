import { Exercise } from "../models/types";
import { midiToNoteName, midiToNumber, midiToSolfa, transposeMidi, noteNameToMidi } from "../notation/convert";

type Props = {
  exercise: Exercise | null;
  showNoteNames: boolean;
  showSolfa: boolean;
  showNumbers: boolean;
};

export function ExerciseViewer({ exercise, showNoteNames, showSolfa, showNumbers }: Props) {
  if (!exercise) return <div className="exercise">Generate an exercise to see it here.</div>;

  const tonicMidi = noteNameToMidi(exercise.keyTonic + "4");
  const items = exercise.notes.map((n) => {
    const transposed = transposeMidi(n.midi, exercise.instrument.transposition);
    return {
      note: midiToNoteName(transposed),
      solfa: midiToSolfa(n.midi, tonicMidi),
      degree: midiToNumber(n.midi, tonicMidi),
    };
  });

  return (
    <div className="exercise stack">
      <div>
        <span className="pill">{exercise.style}</span>
        <span className="pill">{exercise.skillFocus}</span>
        <span className="pill">{exercise.keyTonic}</span>
        <span className="pill">{exercise.tempo} BPM</span>
        <span className="pill">{exercise.subdivision}</span>
      </div>
      {exercise.metadata.romanContext && (
        <div className="mono">
          <span className="label">Roman:</span> {exercise.metadata.romanContext.barMap.join(" | ")}
        </div>
      )}
      <div className="mono">
        {showNoteNames && (
          <div>
            <span className="label">Notes:</span> {items.map((i) => i.note).join(" ")}
          </div>
        )}
        {showSolfa && (
          <div>
            <span className="label">Solfa:</span> {items.map((i) => i.solfa).join(" ")}
          </div>
        )}
        {showNumbers && (
          <div>
            <span className="label">Numbers:</span> {items.map((i) => i.degree).join(" ")}
          </div>
        )}
      </div>
      <div className="hint">
        Articulation: {exercise.metadata.articulationHints.join(" • ")}
      </div>
    </div>
  );
}
