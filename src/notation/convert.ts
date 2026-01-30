const NOTE_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const SOLFA = ["Do", "Di", "Re", "Ri", "Mi", "Fa", "Fi", "Sol", "Si", "La", "Li", "Ti"];
const DEGREE_MAP = [
  "1",
  "#1",
  "2",
  "b3",
  "3",
  "4",
  "#4",
  "5",
  "b6",
  "6",
  "b7",
  "7",
];

export function noteNameToMidi(note: string) {
  const match = note.match(/^([A-G])(#{1}|b{1})?(\d)$/);
  if (!match) return 60;
  const base = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 }[match[1]];
  const accidental = match[2] === "#" ? 1 : match[2] === "b" ? -1 : 0;
  const octave = Number(match[3]);
  return (octave + 1) * 12 + base + accidental;
}

export function midiToNoteName(midi: number) {
  const octave = Math.floor(midi / 12) - 1;
  const pc = ((midi % 12) + 12) % 12;
  return `${NOTE_NAMES[pc]}${octave}`;
}

export function midiToSolfa(midi: number, tonicMidi: number) {
  const pc = ((midi - tonicMidi) % 12 + 12) % 12;
  return SOLFA[pc];
}

export function midiToNumber(midi: number, tonicMidi: number) {
  const pc = ((midi - tonicMidi) % 12 + 12) % 12;
  return DEGREE_MAP[pc];
}

export function transposeMidi(midi: number, transposition: string) {
  const map: Record<string, number> = {
    CONCERT: 0,
    BB: 2,
    EB: 9,
    F: 7,
  };
  const semis = map[transposition] ?? 0;
  return midi + semis;
}
