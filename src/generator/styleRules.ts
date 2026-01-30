import { NoteEvent } from "../models/types";
import { createRng } from "./rng";

export function applyStyleRules(
  seed: string,
  notes: number[],
  style: "Highlife" | "Jazz" | "Blues" | "Bebop" | "Any",
  difficulty: number,
) {
  const rng = createRng(seed + ":style");
  const out: number[] = [];

  for (let i = 0; i < notes.length; i += 1) {
    const n = notes[i];
    if (style === "Bebop" && rng() > 0.6 && i > 0) {
      const prev = notes[i - 1];
      out.push(prev + Math.sign(n - prev));
    }
    if (style === "Blues" && rng() > 0.7) {
      out.push(n + (rng() > 0.5 ? 1 : -1));
    }
    if (style === "Highlife" && rng() > 0.65 && difficulty >= 4) {
      out.push(n);
    }
    out.push(n);
  }

  return out;
}

export function articulationHints(
  style: "Highlife" | "Jazz" | "Blues" | "Bebop" | "Any",
  skillFocus: "flexibility" | "patterns" | "speed" | "accuracy" | "phrasing",
) {
  const base = [];
  if (skillFocus === "flexibility") base.push("mostly slur, light tongue on attacks");
  if (skillFocus === "speed") base.push("short tongued bursts, keep air steady");
  if (skillFocus === "accuracy") base.push("separate notes, clean attacks");
  if (skillFocus === "phrasing") base.push("shape in 2-bar arcs, breathe on bar lines");
  if (style === "Highlife") base.push("offbeat accents, light tongue");
  if (style === "Bebop") base.push("even 8ths, accent beat 2 and 4");
  if (style === "Blues") base.push("lean into b3 and b7");
  if (style === "Jazz") base.push("guide tones on strong beats");
  return base;
}

export function toNoteEvents(
  midiNotes: number[],
  subdivision: "8ths" | "16ths" | "triplets",
  tempo: number,
  swing: boolean,
): NoteEvent[] {
  const step = subdivision === "16ths" ? 0.25 : subdivision === "triplets" ? 1 / 3 : 0.5;
  const events: NoteEvent[] = [];

  for (let i = 0; i < midiNotes.length; i += 1) {
    const startBeats = i * step;
    const isSwing = swing && subdivision === "8ths";
    const durationBeats = isSwing && i % 2 === 0 ? step * 1.35 : step * 0.65;
    events.push({
      midi: midiNotes[i],
      startBeats,
      durationBeats,
      velocity: 0.85,
      articulation: "tongue",
    });
  }

  return events;
}
