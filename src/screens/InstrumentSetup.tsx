import { Instrument } from "../models/types";
import { AppCard } from "../components/ui/AppCard";
import { InputRow } from "../components/ui/InputRow";
import { SliderRow } from "../components/ui/SliderRow";
import { ChipsRow } from "../components/ui/ChipsRow";
import { controlStyle, typography } from "../app/designSystem";
import { midiToNoteName, transposeMidi } from "../notation/convert";

type Props = {
  instrument: Instrument;
  onChange: (inst: Instrument) => void;
  preferredKeys: string[];
  avoidedKeys: string[];
  onPreferredKeysChange: (keys: string[]) => void;
  onAvoidedKeysChange: (keys: string[]) => void;
};

const presets: Record<string, Instrument> = {
  Trumpet: { id: "inst-1", name: "Trumpet", transposition: "BB", range: { lowMidi: 58, highMidi: 82 } },
  "Alto Sax": { id: "inst-2", name: "Alto Sax", transposition: "EB", range: { lowMidi: 56, highMidi: 82 } },
  "Tenor Sax": { id: "inst-3", name: "Tenor Sax", transposition: "BB", range: { lowMidi: 50, highMidi: 78 } },
  Other: { id: "inst-4", name: "Other", transposition: "CONCERT", range: { lowMidi: 48, highMidi: 84 } },
};

const KEYS = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];

export function InstrumentSetup({
  instrument,
  onChange,
  preferredKeys,
  avoidedKeys,
  onPreferredKeysChange,
  onAvoidedKeysChange,
}: Props) {
  const concertLow = midiToNoteName(instrument.range.lowMidi);
  const concertHigh = midiToNoteName(instrument.range.highMidi);
  const writtenLow = midiToNoteName(transposeMidi(instrument.range.lowMidi, instrument.transposition));
  const writtenHigh = midiToNoteName(transposeMidi(instrument.range.highMidi, instrument.transposition));

  const toggleKey = (list: string[], key: string) =>
    list.includes(key) ? list.filter((k) => k !== key) : [...list, key];

  return (
    <div className="stack">
      <div style={typography.title}>Setup</div>
      <div style={{ color: "#A6ACB3", marginBottom: 24 }}>Instrument, transposition, and comfortable range.</div>
      <AppCard>
        <div className="stack">
          <div style={typography.sectionTitle}>Instrument</div>
          <InputRow label="Instrument">
            <select
              value={instrument.name}
              onChange={(e) => onChange({ ...presets[e.target.value], id: instrument.id })}
              style={controlStyle}
            >
              {Object.keys(presets).map((k) => (
                <option key={k}>{k}</option>
              ))}
            </select>
          </InputRow>
          <div className="row">
            <InputRow label="Transposition">
              <select
                value={instrument.transposition}
                onChange={(e) => onChange({ ...instrument, transposition: e.target.value })}
                style={controlStyle}
              >
                <option value="CONCERT">Concert</option>
                <option value="BB">Bb</option>
                <option value="EB">Eb</option>
                <option value="F">F</option>
              </select>
            </InputRow>
            <InputRow label="Custom Transposition">
              <input
                type="text"
                placeholder="e.g. A"
                style={controlStyle}
                onBlur={(e) =>
                  e.target.value ? onChange({ ...instrument, transposition: e.target.value.toUpperCase() }) : null
                }
              />
            </InputRow>
          </div>
          <div style={typography.sectionTitle}>Comfortable Range</div>
          <div className="row">
            <SliderRow
              label="Lowest MIDI"
              value={instrument.range.lowMidi}
              min={36}
              max={96}
              onChange={(value) => onChange({ ...instrument, range: { ...instrument.range, lowMidi: value } })}
            />
            <SliderRow
              label="Highest MIDI"
              value={instrument.range.highMidi}
              min={36}
              max={96}
              onChange={(value) => onChange({ ...instrument, range: { ...instrument.range, highMidi: value } })}
            />
          </div>
          <div className="row">
            <InputRow label="Lowest MIDI">
              <input
                type="number"
                value={instrument.range.lowMidi}
                style={controlStyle}
                onChange={(e) =>
                  onChange({ ...instrument, range: { ...instrument.range, lowMidi: Number(e.target.value) } })
                }
              />
            </InputRow>
            <InputRow label="Highest MIDI">
              <input
                type="number"
                value={instrument.range.highMidi}
                style={controlStyle}
                onChange={(e) =>
                  onChange({ ...instrument, range: { ...instrument.range, highMidi: Number(e.target.value) } })
                }
              />
            </InputRow>
          </div>
          <div style={{ fontSize: "0.9rem", color: "#5A5F66" }}>C4=60</div>
          <div style={{ fontSize: "0.9rem", color: "#2A2F36" }}>
            Concert range: {concertLow}–{concertHigh} | Transposed: {writtenLow}–{writtenHigh}
          </div>
          <div style={typography.sectionTitle}>Key Preferences</div>
          <InputRow label="Preferred keys">
            <ChipsRow
              options={KEYS.map((k) => ({ key: k, label: k }))}
              selectedKeys={new Set(preferredKeys)}
              multi
              onSelect={(key) => onPreferredKeysChange(toggleKey(preferredKeys, key))}
            />
          </InputRow>
          <InputRow label="Keys to avoid">
            <ChipsRow
              options={KEYS.map((k) => ({ key: k, label: k }))}
              selectedKeys={new Set(avoidedKeys)}
              multi
              onSelect={(key) => onAvoidedKeysChange(toggleKey(avoidedKeys, key))}
            />
          </InputRow>
        </div>
      </AppCard>
    </div>
  );
}
