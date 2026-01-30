export type InstrumentName = "Trumpet" | "Alto Sax" | "Tenor Sax" | "Other";

export type Instrument = {
  id: string;
  name: InstrumentName;
  transposition: "CONCERT" | "BB" | "EB" | "F" | string;
  range: { lowMidi: number; highMidi: number };
};

export type Scale = {
  id: string;
  name: string;
  formula: number[];
  tags: string[];
};

export type Progression = {
  id: string;
  name: string;
  romanNumerals: string[];
  barCount: number;
};

export type NoteEvent = {
  midi: number;
  startBeats: number;
  durationBeats: number;
  velocity: number;
  articulation: "slur" | "tongue" | "staccato" | "accent";
};

export type Exercise = {
  id: string;
  seed: string;
  createdAt: string;
  style: "Highlife" | "Jazz" | "Blues" | "Bebop" | "Any";
  skillFocus: "flexibility" | "patterns" | "speed" | "accuracy" | "phrasing";
  scaleId: string;
  keyTonic: string;
  tempo: number;
  timeSig: [number, number];
  swing: boolean;
  subdivision: "8ths" | "16ths" | "triplets";
  difficulty: number;
  lengthBars: number;
  instrument: Instrument;
  notes: NoteEvent[];
  metadata: {
    articulationHints: string[];
    rhythmicFeel: string;
    romanContext?: { progressionId: string; barMap: string[] };
    patternId: string;
  };
};

export type PracticeLog = {
  id: string;
  exerciseId: string;
  date: string;
  tempoAchieved: number;
  notes: string;
};

export type UserProfile = {
  id: string;
  instruments: Instrument[];
  preferredKeys: string[];
  avoidedKeys: string[];
};

export type GenerateRequest = {
  style: Exercise["style"];
  skillFocus: Exercise["skillFocus"];
  scaleId: string;
  keyTonic: string;
  tempo: number;
  timeSig: [number, number];
  swing: boolean;
  subdivision: Exercise["subdivision"];
  difficulty: number;
  lengthBars: number;
  instrument: Instrument;
  keyMode: "manual" | "rotate";
  preferredKeys: string[];
  avoidedKeys: string[];
  lastPatternId: string | null;
};
