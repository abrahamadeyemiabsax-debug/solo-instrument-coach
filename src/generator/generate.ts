import { Exercise, GenerateRequest } from "../models/types";
import { getScale } from "./scales";
import { PATTERNS } from "./patterns";
import { createRng, pickOne } from "./rng";
import { articulationHints, applyStyleRules, toNoteEvents } from "./styleRules";
import { noteNameToMidi } from "../notation/convert";

function buildScalePool(
  tonicMidi: number,
  formula: number[],
  lowMidi: number,
  highMidi: number,
) {
  const pool: number[] = [];
  for (let octave = -2; octave <= 8; octave += 1) {
    for (let i = 0; i < formula.length; i += 1) {
      const midi = tonicMidi + formula[i] + octave * 12;
      if (midi >= lowMidi && midi <= highMidi) {
        pool.push(midi);
      }
    }
  }
  return pool.sort((a, b) => a - b);
}

function degreeToMidi(
  degree: number,
  tonicMidi: number,
  formula: number[],
  lowMidi: number,
  highMidi: number,
  prevMidi: number | null,
  maxLeap: number,
) {
  const scaleIndex = ((degree - 1) % formula.length + formula.length) % formula.length;
  const targetPc = (tonicMidi + formula[scaleIndex]) % 12;
  const candidates: number[] = [];
  for (let m = lowMidi; m <= highMidi; m += 1) {
    if (m % 12 === targetPc) candidates.push(m);
  }

  if (candidates.length === 0) return tonicMidi;
  if (prevMidi === null) return candidates[Math.floor(candidates.length / 2)];

  let best = candidates[0];
  let bestDist = Math.abs(best - prevMidi);
  for (const c of candidates) {
    const dist = Math.abs(c - prevMidi);
    if (dist < bestDist) {
      best = c;
      bestDist = dist;
    }
  }
  if (bestDist <= maxLeap) return best;

  for (const c of candidates) {
    if (Math.abs(c - prevMidi) <= maxLeap) return c;
  }
  return best;
}

function buildDegrees(
  req: GenerateRequest,
  rng: () => number,
  scaleLength: number,
) {
  const stepsPerBeat = req.subdivision === "16ths" ? 4 : req.subdivision === "triplets" ? 3 : 2;
  const totalSteps = req.lengthBars * req.timeSig[0] * stepsPerBeat;

  const pickPattern = () => {
    const pool =
      req.skillFocus === "flexibility"
        ? [...PATTERNS.arpeggios, ...PATTERNS.scaleFragments]
        : req.skillFocus === "speed"
        ? [...PATTERNS.scaleFragments, ...PATTERNS.sequences]
        : req.skillFocus === "accuracy"
        ? [...PATTERNS.scaleFragments, ...PATTERNS.intervals]
        : [...PATTERNS.scaleFragments, ...PATTERNS.sequences];
    const next = pickOne(rng, pool);
    if (req.lastPatternId && next.id === req.lastPatternId) return pickOne(rng, pool);
    return next;
  };

  const pattern = pickPattern();
  const degrees: number[] = [];

  while (degrees.length < totalSteps) {
    if ("degrees" in pattern) {
      degrees.push(...pattern.degrees);
    } else {
      const base = 1 + Math.floor(rng() * scaleLength);
      degrees.push(base, base + pattern.leap);
    }
  }

  return { degrees: degrees.slice(0, totalSteps), patternId: pattern.id };
}

export function generateExercise(req: GenerateRequest, seed: string): Exercise {
  const rng = createRng(seed);
  const scale = getScale(req.scaleId);
  const tonicMidi = noteNameToMidi(req.keyTonic + "4");
  const pool = buildScalePool(
    tonicMidi,
    scale.formula,
    req.instrument.range.lowMidi,
    req.instrument.range.highMidi,
  );
  if (pool.length === 0) {
    throw new Error("Range too small for selected scale");
  }

  const { degrees, patternId } = buildDegrees(req, rng, scale.formula.length);
  const maxLeap = req.difficulty <= 3 ? 5 : req.difficulty <= 6 ? 8 : 12;

  const midiLine: number[] = [];
  let prev: number | null = null;
  for (const deg of degrees) {
    const m = degreeToMidi(
      deg,
      tonicMidi,
      scale.formula,
      req.instrument.range.lowMidi,
      req.instrument.range.highMidi,
      prev,
      maxLeap,
    );
    midiLine.push(m);
    prev = m;
  }

  const styled = applyStyleRules(seed, midiLine, req.style, req.difficulty);
  const noteEvents = toNoteEvents(styled, req.subdivision, req.tempo, req.swing);

  return {
    id: "ex-" + seed,
    seed,
    createdAt: new Date().toISOString(),
    style: req.style,
    skillFocus: req.skillFocus,
    scaleId: req.scaleId,
    keyTonic: req.keyTonic,
    tempo: req.tempo,
    timeSig: req.timeSig,
    swing: req.swing,
    subdivision: req.subdivision,
    difficulty: req.difficulty,
    lengthBars: req.lengthBars,
    instrument: req.instrument,
    notes: noteEvents,
    metadata: {
      articulationHints: articulationHints(req.style, req.skillFocus),
      rhythmicFeel: req.swing ? "swing" : "straight",
      patternId,
    },
  };
}
