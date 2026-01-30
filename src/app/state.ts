import { Exercise, GenerateRequest, Instrument, UserProfile } from "../models/types";

export const defaultInstrument: Instrument = {
  id: "inst-1",
  name: "Trumpet",
  transposition: "BB",
  range: { lowMidi: 58, highMidi: 82 }, // Bb3 to Bb5
};

export const defaultProfile: UserProfile = {
  id: "user-1",
  instruments: [defaultInstrument],
  preferredKeys: ["C", "F", "Bb", "Eb", "G", "D"],
  avoidedKeys: [],
};

export const defaultRequest: GenerateRequest = {
  style: "Any",
  skillFocus: "patterns",
  scaleId: "major",
  keyTonic: "C",
  tempo: 100,
  timeSig: [4, 4],
  swing: true,
  subdivision: "8ths",
  difficulty: 4,
  lengthBars: 4,
  instrument: defaultInstrument,
  keyMode: "rotate",
  avoidedKeys: [],
  preferredKeys: [],
  lastPatternId: null,
};

export const emptyExercise: Exercise | null = null;
