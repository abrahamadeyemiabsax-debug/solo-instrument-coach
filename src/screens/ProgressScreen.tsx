import { Exercise, PracticeLog } from "../models/types";
import { AppCard } from "../components/ui/AppCard";
import { EmptyStateCard } from "../components/ui/EmptyStateCard";
import { RingProgress } from "../components/ui/RingProgress";
import { MetricTile } from "../components/ui/MetricTile";
import { StatTile } from "../components/ui/StatTile";
import { LogRow } from "../components/ui/LogRow";
import { colors, spacing, typography } from "../app/designSystem";

type Props = {
  exercises: Exercise[];
  logs: PracticeLog[];
};

export function ProgressScreen({ exercises, logs }: Props) {
  const streak = logs.length;
  const keys = new Set(exercises.map((e) => e.keyTonic));
  const lastDate = logs.length ? logs[logs.length - 1].date : "No sessions yet";
  const todayPercent = Math.min(100, Math.round((logs.length / 7) * 100));

  return (
    <div className="stack">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={typography.title}>Progress</div>
          <div style={{ color: "#A6ACB3" }}>Your practice dashboard</div>
        </div>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: colors.surfacePrimary,
            border: `1px solid ${colors.divider}`,
          }}
        />
      </div>

      <AppCard>
        <div className="stack" style={{ alignItems: "center", textAlign: "center" }}>
          <div style={typography.label}>TODAY</div>
          <div style={{ fontSize: "2rem", fontWeight: 700, color: colors.textOnLight }}>
            {streak} sessions
          </div>
          <RingProgress value={todayPercent} label="Goal" />
        </div>
      </AppCard>

      <div className="row">
        <MetricTile label="Tempo Best" value="128 BPM" />
        <MetricTile label="Keys This Week" value={`${keys.size}`} />
        <MetricTile label="Sessions" value={`${streak}`} accent />
      </div>

      <div>
        <div style={typography.sectionTitle}>My Practice</div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: spacing.sm,
            marginTop: spacing.sm,
          }}
        >
          <StatTile title="Key Coverage" value={`${keys.size} keys`} subtitle="This week" />
          <StatTile title="Weak Spots" value="2 areas" subtitle="Review articulation" />
          <StatTile title="Tempo Ladder" value="80–120" subtitle="Active range" />
          <StatTile title="Consistency" value={`${streak} days`} subtitle="Keep it steady" />
        </div>
      </div>

      <AppCard>
        <div className="stack">
          <div style={typography.sectionTitle}>Recent Logs</div>
          <div className="stack">
            {logs
              .slice()
              .reverse()
              .slice(0, 6)
              .map((l) => (
                <LogRow key={l.id} date={l.date} tempo={l.tempoAchieved} notes={l.notes} />
              ))}
            {logs.length === 0 && (
              <EmptyStateCard title="No practice logs" message="Save an exercise after practice to see stats here." />
            )}
          </div>
        </div>
      </AppCard>
    </div>
  );
}
