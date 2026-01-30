import { useMemo, useState } from "react";
import { GenerateRequest, Exercise } from "../models/types";
import { SCALES } from "../generator/scales";
import { generateExercise } from "../generator/generate";
import { AppCard } from "../components/ui/AppCard";
import { InputRow } from "../components/ui/InputRow";
import { PrimaryButton, SecondaryButton } from "../components/ui/Buttons";
import { SliderRow } from "../components/ui/SliderRow";
import { ChipsRow } from "../components/ui/ChipsRow";
import { StatPill } from "../components/ui/StatPill";
import { controlStyle, typography, spacing } from "../app/designSystem";
import { PROGRESSIONS } from "../generator/progressions";

type Props = {
  request: GenerateRequest;
  onRequestChange: (req: GenerateRequest) => void;
  onGenerate: (ex: Exercise, lastPatternId: string) => void;
};

export function GeneratorScreen({ request, onRequestChange, onGenerate }: Props) {
  const [seed, setSeed] = useState(() => String(Date.now()));
  const [error, setError] = useState<string | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [overrideRange, setOverrideRange] = useState(false);
  const [progressionEnabled, setProgressionEnabled] = useState(false);
  const [progressionId, setProgressionId] = useState(PROGRESSIONS[0]?.id ?? "ii-v-i");

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
    <div className="stack">
      <div style={typography.title}>Generate</div>
      <div style={{ color: "#A6ACB3", marginBottom: 24 }}>Dial in style, skill focus, and length.</div>
      <div>
        <StatPill text={request.style} />
        <StatPill text={scaleOptions.find((s) => s.id === request.scaleId)?.name ?? "Scale"} />
        <StatPill text={request.keyTonic} />
        <StatPill text={`${request.tempo} BPM`} />
        <StatPill text={request.subdivision} />
      </div>

      <AppCard>
        <div className="stack">
          <div style={typography.sectionTitle}>Musical Context</div>
          <InputRow label="Style">
            <ChipsRow
              options={[
                { key: "Highlife", label: "Highlife" },
                { key: "Jazz", label: "Jazz" },
                { key: "Blues", label: "Blues" },
                { key: "Bebop", label: "Bebop" },
                { key: "Any", label: "Any" },
              ]}
              selectedKey={request.style}
              onSelect={(key) => onRequestChange({ ...request, style: key as any })}
            />
          </InputRow>
          <div className="row">
            <InputRow label="Skill Focus">
              <select
                value={request.skillFocus}
                onChange={(e) => onRequestChange({ ...request, skillFocus: e.target.value as any })}
                style={controlStyle}
              >
                <option>flexibility</option>
                <option>patterns</option>
                <option>speed</option>
                <option>accuracy</option>
                <option>phrasing</option>
              </select>
            </InputRow>
            <InputRow label="Scale/Mode">
              <select
                value={request.scaleId}
                onChange={(e) => onRequestChange({ ...request, scaleId: e.target.value })}
                style={controlStyle}
              >
                {scaleOptions.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </InputRow>
          </div>
          <InputRow label="Key/Tonic">
            <select
              value={request.keyTonic}
              onChange={(e) => onRequestChange({ ...request, keyTonic: e.target.value })}
              style={controlStyle}
            >
              {["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"].map((k) => (
                <option key={k}>{k}</option>
              ))}
            </select>
          </InputRow>
        </div>
      </AppCard>

      <AppCard>
        <div className="stack">
          <div style={typography.sectionTitle}>Rhythm &amp; Feel</div>
          <div className="row">
            <SliderRow
              label="BPM"
              value={request.tempo}
              min={50}
              max={200}
              onChange={(value) => onRequestChange({ ...request, tempo: value })}
            />
            <InputRow label="Time Sig">
              <select
                value={request.timeSig.join("/")}
                onChange={(e) => {
                  const parts = e.target.value.split("/").map(Number);
                  onRequestChange({ ...request, timeSig: [parts[0], parts[1]] });
                }}
                style={controlStyle}
              >
                <option>4/4</option>
                <option>3/4</option>
                <option>6/8</option>
              </select>
            </InputRow>
          </div>
          <div className="row">
            <InputRow label="Subdivision">
              <ChipsRow
                options={[
                  { key: "8ths", label: "8ths" },
                  { key: "16ths", label: "16ths" },
                  { key: "triplets", label: "triplets" },
                ]}
                selectedKey={request.subdivision}
                onSelect={(key) => onRequestChange({ ...request, subdivision: key as any })}
              />
            </InputRow>
            <InputRow label="Swing">
              <select
                value={request.swing ? "on" : "off"}
                onChange={(e) => onRequestChange({ ...request, swing: e.target.value === "on" })}
                style={controlStyle}
              >
                <option value="on">On</option>
                <option value="off">Off</option>
              </select>
            </InputRow>
          </div>
        </div>
      </AppCard>

      <AppCard>
        <div className="stack">
          <div style={typography.sectionTitle}>Difficulty &amp; Length</div>
          <div className="row">
            <SliderRow
              label="Difficulty"
              value={request.difficulty}
              min={1}
              max={10}
              onChange={(value) => onRequestChange({ ...request, difficulty: value })}
            />
            <InputRow label="Bars">
              <input
                type="number"
                min={1}
                max={16}
                value={request.lengthBars}
                style={controlStyle}
                onChange={(e) => onRequestChange({ ...request, lengthBars: Number(e.target.value) })}
              />
            </InputRow>
          </div>
        </div>
      </AppCard>

      <AppCard>
        <div className="stack">
          <SecondaryButton onClick={() => setShowAdvanced((v) => !v)}>
            Advanced {showAdvanced ? "^" : "v"}
          </SecondaryButton>
          {showAdvanced && (
            <div className="stack">
              <InputRow label="Seed">
                <input value={seed} onChange={(e) => setSeed(e.target.value)} style={controlStyle} />
              </InputRow>
              <InputRow label="Rotate keys">
                <select
                  value={request.keyMode}
                  onChange={(e) => onRequestChange({ ...request, keyMode: e.target.value as any })}
                  style={controlStyle}
                >
                  <option value="manual">Manual</option>
                  <option value="rotate">Rotate</option>
                </select>
              </InputRow>
              <InputRow label="Range override">
                <select
                  value={overrideRange ? "on" : "off"}
                  onChange={(e) => setOverrideRange(e.target.value === "on")}
                  style={controlStyle}
                >
                  <option value="off">Off</option>
                  <option value="on">On</option>
                </select>
              </InputRow>
              {overrideRange && (
                <div className="row">
                  <InputRow label="Lowest MIDI">
                    <input
                      type="number"
                      value={request.instrument.range.lowMidi}
                      style={controlStyle}
                      onChange={(e) =>
                        onRequestChange({
                          ...request,
                          instrument: {
                            ...request.instrument,
                            range: { ...request.instrument.range, lowMidi: Number(e.target.value) },
                          },
                        })
                      }
                    />
                  </InputRow>
                  <InputRow label="Highest MIDI">
                    <input
                      type="number"
                      value={request.instrument.range.highMidi}
                      style={controlStyle}
                      onChange={(e) =>
                        onRequestChange({
                          ...request,
                          instrument: {
                            ...request.instrument,
                            range: { ...request.instrument.range, highMidi: Number(e.target.value) },
                          },
                        })
                      }
                    />
                  </InputRow>
                </div>
              )}
              <InputRow label="Progression template">
                <select
                  value={progressionId}
                  onChange={(e) => setProgressionId(e.target.value)}
                  style={controlStyle}
                  disabled={!progressionEnabled}
                >
                  {PROGRESSIONS.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </InputRow>
              <InputRow label="Use progression">
                <select
                  value={progressionEnabled ? "on" : "off"}
                  onChange={(e) => setProgressionEnabled(e.target.value === "on")}
                  style={controlStyle}
                >
                  <option value="off">Off</option>
                  <option value="on">On</option>
                </select>
              </InputRow>
            </div>
          )}
        </div>
      </AppCard>

      {error && <div style={{ color: "#5A5F66" }}>Error: {error}</div>}

      <div style={{ height: 72 }} />
      <div
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 64,
          padding: `${spacing.sm}px ${spacing.md}px`,
          display: "flex",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        <div style={{ maxWidth: 900, width: "100%", pointerEvents: "auto" }}>
          <PrimaryButton onClick={handleGenerate} style={{ width: "100%" }}>
            Generate Exercise
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
