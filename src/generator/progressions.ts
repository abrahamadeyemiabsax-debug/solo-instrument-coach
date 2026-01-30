import { Progression } from "../models/types";

export const PROGRESSIONS: Progression[] = [
  { id: "ii-v-i", name: "ii–V–I", romanNumerals: ["ii7", "V7", "Imaj7"], barCount: 3 },
  { id: "i-vi-ii-v", name: "I–vi–ii–V", romanNumerals: ["Imaj7", "vi7", "ii7", "V7"], barCount: 4 },
  { id: "blues-12", name: "12-bar Blues", romanNumerals: ["I7", "I7", "I7", "I7", "IV7", "IV7", "I7", "I7", "V7", "IV7", "I7", "V7"], barCount: 12 },
  { id: "highlife-1", name: "Highlife Common", romanNumerals: ["I", "V", "vi", "IV"], barCount: 4 },
];
