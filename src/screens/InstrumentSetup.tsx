import { Instrument } from "../models/types";

type Props = {
  instrument: Instrument;
  onChange: (inst: Instrument) => void;
};

const presets: Record<string, Instrument> = {
  Trumpet: { id: "inst-1", name: "Trumpet", transposition: "BB", range: { lowMidi: 58, highMidi: 82 } },
  "Alto Sax": { id: "inst-2", name: "Alto Sax", transposition: "EB", range: { lowMidi: 56, highMidi: 82 } },
  "Tenor Sax": { id: "inst-3", name: "Tenor Sax", transposition: "BB", range: { lowMidi: 50, highMidi: 78 } },
  Other: { id: "inst-4", name: "Other", transposition: "CONCERT", range: { lowMidi: 48, highMidi: 84 } },
};

export function InstrumentSetup({ instrument, onChange }: Props) {
  return (
    <div className="card stack">
      <h2>Instrument Setup</h2>
      <label className="label">Instrument</label>
      <select
        value={instrument.name}
        onChange={(e) => onChange({ ...presets[e.target.value], id: instrument.id })}
      >
        {Object.keys(presets).map((k) => (
          <option key={k}>{k}</option>
        ))}
      </select>
      <div className="row">
        <label>
          Transposition
          <select
            value={instrument.transposition}
            onChange={(e) => onChange({ ...instrument, transposition: e.target.value })}
          >
            <option value="CONCERT">Concert</option>
            <option value="BB">Bb</option>
            <option value="EB">Eb</option>
            <option value="F">F</option>
          </select>
        </label>
        <label>
          Custom Transposition
          <input
            type="text"
            placeholder="e.g. A"
            onBlur={(e) =>
              e.target.value ? onChange({ ...instrument, transposition: e.target.value.toUpperCase() }) : null
            }
          />
        </label>
      </div>
      <div className="row">
        <label>
          Lowest MIDI
          <input
            type="number"
            value={instrument.range.lowMidi}
            onChange={(e) => onChange({ ...instrument, range: { ...instrument.range, lowMidi: Number(e.target.value) } })}
          />
        </label>
        <label>
          Highest MIDI
          <input
            type="number"
            value={instrument.range.highMidi}
            onChange={(e) => onChange({ ...instrument, range: { ...instrument.range, highMidi: Number(e.target.value) } })}
          />
        </label>
      </div>
      <div className="hint">
        MIDI reference: C4 = 60. Set range to your comfortable notes.
      </div>
    </div>
  );
}
