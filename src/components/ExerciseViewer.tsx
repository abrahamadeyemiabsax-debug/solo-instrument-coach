import { Exercise } from "../models/types";
import { midiToNoteName, midiToNumber, midiToSolfa, transposeMidi, noteNameToMidi } from "../notation/convert";
import { EmptyStateCard } from "./ui/EmptyStateCard";
import { StatPill } from "./ui/StatPill";
import { typography } from "../app/designSystem";

type Props = {
  exercise: Exercise | null;
  showNoteNames: boolean;
  showSolfa: boolean;
  showNumbers: boolean;
  showRoman?: boolean;
};

export function ExerciseViewer({ exercise, showNoteNames, showSolfa, showNumbers, showRoman = true }: Props) {
  if (!exercise)
    return (
      <EmptyStateCard
        title="No exercise yet"
        message="Generate an exercise to see notation and playback controls here."
      />
    );

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
    <div className="stack">
      <div>
        <StatPill text={exercise.style} />
        <StatPill text={exercise.skillFocus} />
        <StatPill text={exercise.keyTonic} />
        <StatPill text={`${exercise.tempo} BPM`} />
        <StatPill text={exercise.subdivision} />
      </div>
      {exercise.metadata.romanContext && showRoman && (
        <div style={typography.mono}>
          <span style={typography.label}>Roman:</span> {exercise.metadata.romanContext.barMap.join(" | ")}
        </div>
      )}
      <div style={typography.mono}>
        {showNoteNames && (
          <div>
            <span style={typography.label}>Notes:</span> {items.map((i) => i.note).join(" ")}
          </div>
        )}
        {showSolfa && (
          <div>
            <span style={typography.label}>Solfa:</span> {items.map((i) => i.solfa).join(" ")}
          </div>
        )}
        {showNumbers && (
          <div>
            <span style={typography.label}>Numbers:</span> {items.map((i) => i.degree).join(" ")}
          </div>
        )}
      </div>
      <div style={{ ...typography.body, color: "#5A5F66" }}>
        Articulation: {exercise.metadata.articulationHints.join(" • ")}
      </div>
    </div>
  );
}
