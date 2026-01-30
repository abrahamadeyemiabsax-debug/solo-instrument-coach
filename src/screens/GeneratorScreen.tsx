import { useMemo, useState } from "react";
import { GenerateRequest, Exercise } from "../models/types";
import { SCALES } from "../generator/scales";
import { generateExercise } from "../generator/generate";

type Props = {
  request: GenerateRequest;
  onRequestChange: (req: GenerateRequest) => void;
  onGenerate: (ex: Exercise, lastPatternId: string) => void;
};

export function GeneratorScreen({ request, onRequestChange, onGenerate }: Props) {
  const [seed, setSeed] = useState(() => String(Date.now()));
  const [error, setError] = useState<string | null>(null);

  const scaleOptions = useMemo(() => SCALES, []);

  const handleGenerate = () => {
    try {
      const ex = generateExercise(request, seed);
      onGenerate(ex, ex.metadata.patternId);
      setError(null);
      setSeed(String(Date.now()));
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className="card stack">
      <h2>Exercise Generator</h2>
      <div className="row">
        <label>
          Style
          <select value={request.style} onChange={(e) => onRequestChange({ ...request, style: e.target.value as any })}>
            <option>Highlife</option>
            <option>Jazz</option>
            <option>Blues</option>
            <option>Bebop</option>
            <option>Any</option>
          </select>
        </label>
        <label>
          Skill Focus
          <select
            value={request.skillFocus}
            onChange={(e) => onRequestChange({ ...request, skillFocus: e.target.value as any })}
          >
            <option>flexibility</option>
            <option>patterns</option>
            <option>speed</option>
            <option>accuracy</option>
            <option>phrasing</option>
          </select>
        </label>
      </div>
      <div className="row-3">
        <label>
          Scale/Mode
          <select value={request.scaleId} onChange={(e) => onRequestChange({ ...request, scaleId: e.target.value })}>
            {scaleOptions.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Key/Tonic
          <select value={request.keyTonic} onChange={(e) => onRequestChange({ ...request, keyTonic: e.target.value })}>
            {["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"].map((k) => (
              <option key={k}>{k}</option>
            ))}
          </select>
        </label>
        <label>
          Difficulty
          <input
            type="number"
            min={1}
            max={10}
            value={request.difficulty}
            onChange={(e) => onRequestChange({ ...request, difficulty: Number(e.target.value) })}
          />
        </label>
      </div>
      <div className="row-3">
        <label>
          Tempo (BPM)
          <input
            type="number"
            value={request.tempo}
            onChange={(e) => onRequestChange({ ...request, tempo: Number(e.target.value) })}
          />
        </label>
        <label>
          Time Sig
          <select
            value={request.timeSig.join("/")}
            onChange={(e) => {
              const parts = e.target.value.split("/").map(Number);
              onRequestChange({ ...request, timeSig: [parts[0], parts[1]] });
            }}
          >
            <option>4/4</option>
            <option>3/4</option>
            <option>6/8</option>
          </select>
        </label>
        <label>
          Subdivision
          <select
            value={request.subdivision}
            onChange={(e) => onRequestChange({ ...request, subdivision: e.target.value as any })}
          >
            <option>8ths</option>
            <option>16ths</option>
            <option>triplets</option>
          </select>
        </label>
      </div>
      <div className="row">
        <label>
          Length (bars)
          <input
            type="number"
            min={1}
            max={16}
            value={request.lengthBars}
            onChange={(e) => onRequestChange({ ...request, lengthBars: Number(e.target.value) })}
          />
        </label>
        <label>
          Swing Feel
          <select value={request.swing ? "on" : "off"} onChange={(e) => onRequestChange({ ...request, swing: e.target.value === "on" })}>
            <option value="on">On</option>
            <option value="off">Off</option>
          </select>
        </label>
      </div>
      <div className="row">
        <label>
          Seed (for reproducibility)
          <input value={seed} onChange={(e) => setSeed(e.target.value)} />
        </label>
        <button onClick={handleGenerate}>Generate Exercise</button>
      </div>
      {error && <div className="hint">Error: {error}</div>}
    </div>
  );
}
