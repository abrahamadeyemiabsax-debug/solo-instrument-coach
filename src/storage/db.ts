import Dexie, { Table } from "dexie";
import { Exercise, PracticeLog } from "../models/types";

export class CoachDB extends Dexie {
  exercises!: Table<Exercise, string>;
  logs!: Table<PracticeLog, string>;

  constructor() {
    super("coachdb");
    this.version(1).stores({
      exercises: "id, createdAt, style, skillFocus, keyTonic",
      logs: "id, exerciseId, date",
    });
  }
}

export const db = new CoachDB();
