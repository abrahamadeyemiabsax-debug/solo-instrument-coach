import { Scale } from "../models/types";

export const SCALES: Scale[] = [
  { id: "major", name: "Major", formula: [0, 2, 4, 5, 7, 9, 11], tags: ["diatonic"] },
  { id: "natural-minor", name: "Natural Minor", formula: [0, 2, 3, 5, 7, 8, 10], tags: ["diatonic"] },
  { id: "harmonic-minor", name: "Harmonic Minor", formula: [0, 2, 3, 5, 7, 8, 11], tags: ["diatonic"] },
  { id: "melodic-minor", name: "Melodic Minor", formula: [0, 2, 3, 5, 7, 9, 11], tags: ["diatonic"] },
  { id: "dorian", name: "Dorian", formula: [0, 2, 3, 5, 7, 9, 10], tags: ["mode"] },
  { id: "mixolydian", name: "Mixolydian", formula: [0, 2, 4, 5, 7, 9, 10], tags: ["mode"] },
  { id: "blues", name: "Blues", formula: [0, 3, 5, 6, 7, 10], tags: ["blues"] },
  { id: "minor-pent", name: "Minor Pentatonic", formula: [0, 3, 5, 7, 10], tags: ["pentatonic"] },
  { id: "major-pent", name: "Major Pentatonic", formula: [0, 2, 4, 7, 9], tags: ["pentatonic"] },
  { id: "bebop-major", name: "Bebop Major", formula: [0, 2, 4, 5, 7, 8, 9, 11], tags: ["bebop"] },
  { id: "bebop-dominant", name: "Bebop Dominant", formula: [0, 2, 4, 5, 7, 9, 10, 11], tags: ["bebop"] }
];

export function getScale(id: string): Scale {
  return SCALES.find((s) => s.id === id) ?? SCALES[0];
}
