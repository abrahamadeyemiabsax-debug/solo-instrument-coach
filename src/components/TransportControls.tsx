import { useMemo, useState } from "react";
import { Exercise } from "../models/types";
import { AudioPlayer } from "../audio/player";

type Props = {
  exercise: Exercise | null;
};

export function TransportControls({ exercise }: Props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [countIn, setCountIn] = useState(4);
  const [slow, setSlow] = useState(1);
  const player = useMemo(() => new AudioPlayer(), []);

  const play = async () => {
    if (!exercise) return;
    setIsPlaying(true);
    await player.play(exercise.notes, exercise.tempo * slow, countIn);
  };

  const stop = () => {
    player.stop();
    setIsPlaying(false);
  };

  return (
    <div className="card stack">
      <div className="label">Playback</div>
      <div className="row">
        <button onClick={play} disabled={!exercise || isPlaying}>
          Play
        </button>
        <button onClick={stop} disabled={!isPlaying}>
          Stop
        </button>
      </div>
      <div className="row-3">
        <label>
          Count-in
          <select value={countIn} onChange={(e) => setCountIn(Number(e.target.value))}>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={4}>4</option>
          </select>
        </label>
        <label>
          Slow Mode
          <select value={slow} onChange={(e) => setSlow(Number(e.target.value))}>
            <option value={0.5}>50%</option>
            <option value={0.75}>75%</option>
            <option value={1}>100%</option>
          </select>
        </label>
      </div>
    </div>
  );
}
