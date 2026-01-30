import { Exercise } from "../models/types";
import { ExerciseViewer } from "../components/ExerciseViewer";
import { AppCard } from "../components/ui/AppCard";
import { PrimaryButton, SecondaryButton } from "../components/ui/Buttons";
import { SegmentedToggle } from "../components/ui/SegmentedToggle";
import { SliderRow } from "../components/ui/SliderRow";
import { ChipsRow } from "../components/ui/ChipsRow";
import { InputRow } from "../components/ui/InputRow";
import { controlStyle, colors, spacing, typography } from "../app/designSystem";
import { AudioPlayer } from "../audio/player";
import { useEffect, useMemo, useState } from "react";

type Props = {
  exercise: Exercise | null;
  onSave: () => void;
  onGenerateVariation: () => void;
  onLogPractice: () => void;
  showNoteNames: boolean;
  showSolfa: boolean;
  showNumbers: boolean;
  showRoman: boolean;
  onToggle: (key: "notes" | "solfa" | "numbers" | "roman") => void;
};

export function PracticeScreen({
  exercise,
  onSave,
  onGenerateVariation,
  onLogPractice,
  showNoteNames,
  showSolfa,
  showNumbers,
  showRoman,
  onToggle,
}: Props) {
  const [loop, setLoop] = useState(false);
  const [metronome, setMetronome] = useState(true);
  const [metroVolume, setMetroVolume] = useState(70);
  const [countInBars, setCountInBars] = useState(1);
  const [bpm, setBpm] = useState(exercise?.tempo ?? 100);
  const [slowMode, setSlowMode] = useState(1);
  const player = useMemo(() => new AudioPlayer(), []);

  useEffect(() => {
    if (exercise) setBpm(exercise.tempo);
  }, [exercise]);

  const play = async () => {
    if (!exercise) return;
    const beatsPerBar = exercise.timeSig[0];
    const countInBeats = countInBars * beatsPerBar;
    await player.play(exercise.notes, bpm * slowMode, countInBeats);
  };

  const stop = () => player.stop();

  return (
    <div className="stack">
      <div style={typography.title}>Practice</div>
      <div style={{ color: "#A6ACB3", marginBottom: 24 }}>Playback, loop, and store daily work.</div>
      <AppCard>
        <div className="stack">
          <div style={typography.sectionTitle}>Exercise Display</div>
          <SegmentedToggle
            options={[
              { key: "notes", label: "Notes" },
              { key: "solfa", label: "Solfa" },
              { key: "numbers", label: "Numbers" },
              ...(exercise?.metadata.romanContext ? [{ key: "roman", label: "Roman" }] : []),
            ]}
            selected={new Set([
              ...(showNoteNames ? ["notes"] : []),
              ...(showSolfa ? ["solfa"] : []),
              ...(showNumbers ? ["numbers"] : []),
              ...(showRoman ? ["roman"] : []),
            ])}
            onToggle={(key) => onToggle(key as any)}
          />
          <ExerciseViewer
            exercise={exercise}
            showNoteNames={showNoteNames}
            showSolfa={showSolfa}
            showNumbers={showNumbers}
            showRoman={showRoman}
          />
        </div>
      </AppCard>

      <AppCard>
        <div className="stack">
          <div style={typography.sectionTitle}>Playback Controls</div>
          <div className="row">
            <PrimaryButton onClick={play} disabled={!exercise}>
              Play
            </PrimaryButton>
            <SecondaryButton onClick={stop}>Stop</SecondaryButton>
          </div>
          <div className="row">
            <InputRow label="Loop">
              <ChipsRow
                options={[
                  { key: "off", label: "Off" },
                  { key: "on", label: "On" },
                ]}
                selectedKey={loop ? "on" : "off"}
                variant="neutral"
                onSelect={(key) => setLoop(key === "on")}
              />
            </InputRow>
            <InputRow label="Count-in">
              <select value={countInBars} onChange={(e) => setCountInBars(Number(e.target.value))} style={controlStyle}>
                <option value={0}>0 bars</option>
                <option value={1}>1 bar</option>
                <option value={2}>2 bars</option>
              </select>
            </InputRow>
          </div>
          <div className="row">
            <InputRow label="Metronome">
              <ChipsRow
                options={[
                  { key: "off", label: "Off" },
                  { key: "on", label: "On" },
                ]}
                selectedKey={metronome ? "on" : "off"}
                variant="neutral"
                onSelect={(key) => setMetronome(key === "on")}
              />
            </InputRow>
            <SliderRow
              label="Metronome Volume"
              value={metroVolume}
              min={0}
              max={100}
              onChange={setMetroVolume}
            />
          </div>
          {!metronome && <div style={{ color: "#5A5F66" }}>Metronome is off.</div>}
        </div>
      </AppCard>

      <AppCard>
        <div className="stack">
          <div style={typography.sectionTitle}>Tempo Controls</div>
          <SliderRow label="BPM" value={bpm} min={40} max={220} onChange={setBpm} />
          <div style={{ display: "flex", gap: spacing.sm }}>
            <SecondaryButton onClick={() => setBpm((v) => Math.max(40, v - 1))}>-</SecondaryButton>
            <SecondaryButton onClick={() => setBpm((v) => Math.min(220, v + 1))}>+</SecondaryButton>
            <div style={{ alignSelf: "center", color: colors.textOnLight }}>Current: {bpm} BPM</div>
          </div>
          <InputRow label="Slow Practice">
            <select value={slowMode} onChange={(e) => setSlowMode(Number(e.target.value))} style={controlStyle}>
              <option value={0.5}>50%</option>
              <option value={0.6}>60%</option>
              <option value={0.7}>70%</option>
              <option value={0.8}>80%</option>
              <option value={0.9}>90%</option>
              <option value={1}>100%</option>
            </select>
          </InputRow>
          <InputRow label="Tempo ladder presets">
            <ChipsRow
              options={[
                { key: "80", label: "80" },
                { key: "84", label: "84" },
                { key: "88", label: "88" },
                { key: "92", label: "92" },
                { key: "96", label: "96" },
                { key: "100", label: "100" },
              ]}
              selectedKey={String(bpm)}
              variant="neutral"
              onSelect={(key) => setBpm(Number(key))}
            />
          </InputRow>
        </div>
      </AppCard>

      <div style={{ display: "flex", gap: spacing.sm, flexWrap: "wrap" }}>
        <SecondaryButton onClick={onGenerateVariation}>Generate Variation</SecondaryButton>
        <SecondaryButton onClick={onSave} disabled={!exercise}>
          Save to Library
        </SecondaryButton>
        <SecondaryButton onClick={onLogPractice} disabled={!exercise}>
          Log Practice
        </SecondaryButton>
      </div>
    </div>
  );
}
