import { NoteEvent } from "../models/types";

export class AudioPlayer {
  private ctx: AudioContext;
  private running = false;
  private nodes: AudioNode[] = [];

  constructor() {
    this.ctx = new AudioContext();
  }

  stop() {
    this.running = false;
    this.nodes.forEach((n) => n.disconnect());
    this.nodes = [];
  }

  async play(notes: NoteEvent[], tempo: number, countInBeats = 4) {
    if (this.ctx.state !== "running") await this.ctx.resume();
    this.stop();
    this.running = true;

    const now = this.ctx.currentTime;
    const beatDur = 60 / tempo;
    const startTime = now + countInBeats * beatDur;
    this.scheduleClicks(now, countInBeats, beatDur);

    for (const n of notes) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "triangle";
      osc.frequency.value = 440 * Math.pow(2, (n.midi - 69) / 12);
      gain.gain.value = 0.0001;

      const noteStart = startTime + n.startBeats * beatDur;
      const noteEnd = noteStart + n.durationBeats * beatDur;

      gain.gain.setTargetAtTime(0.3, noteStart, 0.01);
      gain.gain.setTargetAtTime(0.0001, noteEnd, 0.02);

      osc.connect(gain).connect(this.ctx.destination);
      osc.start(noteStart);
      osc.stop(noteEnd + 0.05);
      this.nodes.push(osc, gain);
    }
  }

  private scheduleClicks(start: number, beats: number, beatDur: number) {
    for (let i = 0; i < beats; i += 1) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "square";
      osc.frequency.value = i === 0 ? 1000 : 800;
      gain.gain.value = 0.2;
      osc.connect(gain).connect(this.ctx.destination);
      const t = start + i * beatDur;
      osc.start(t);
      osc.stop(t + 0.05);
      this.nodes.push(osc, gain);
    }
  }
}
