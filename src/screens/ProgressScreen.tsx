import { Exercise, PracticeLog } from "../models/types";
import { AppCard } from "../components/ui/AppCard";
import { EmptyStateCard } from "../components/ui/EmptyStateCard";
import { MiniChartPlaceholder } from "../components/ui/MiniChartPlaceholder";
import { colors, spacing, typography } from "../app/designSystem";

type Props = {
  exercises: Exercise[];
  logs: PracticeLog[];
};

export function ProgressScreen({ exercises, logs }: Props) {
  const streak = logs.length;
  const keys = new Set(exercises.map((e) => e.keyTonic));
  const lastDate = logs.length ? logs[logs.length - 1].date : "No sessions yet";
  const keyCounts = exercises.reduce<Record<string, number>>((acc, ex) => {
    acc[ex.keyTonic] = (acc[ex.keyTonic] ?? 0) + 1;
    return acc;
  }, {});
  const keyOrder = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
  const maxKeyCount = Math.max(1, ...Object.values(keyCounts));
  const suggestions = [
    keys.size < 6 ? "Rotate more keys this week." : "Expand to remote keys.",
    "Increase tempo on patterns by +4 BPM.",
    "Add articulation focus for accuracy.",
  ];

  return (
    <div className="stack">
      <div style={typography.title}>Progress</div>
      <div style={{ color: "#A6ACB3", marginBottom: 24 }}>Track streaks and key coverage.</div>
      <div className="grid">
        <AppCard>
          <div className="stack">
            <div style={typography.sectionTitle}>Streak</div>
            <div style={{ fontSize: "1.4rem", fontWeight: 700 }}>{streak} sessions</div>
            <div style={{ color: "#5A5F66" }}>Last practiced: {lastDate}</div>
            <MiniChartPlaceholder />
          </div>
        </AppCard>
        <AppCard>
          <div className="stack">
            <div style={typography.sectionTitle}>Key Coverage</div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(6, 1fr)",
                gap: spacing.xs,
              }}
            >
              {keyOrder.map((key) => {
                const count = keyCounts[key] ?? 0;
                const intensity = count / maxKeyCount;
                const bg = `rgba(252, 163, 17, ${0.2 + intensity * 0.6})`;
                return (
                  <div
                    key={key}
                    style={{
                      padding: `${spacing.xs}px`,
                      borderRadius: 10,
                      background: bg,
                      color: colors.textOnLight,
                      border: `1px solid ${colors.divider}`,
                      textAlign: "center",
                      fontWeight: 600,
                    }}
                  >
                    {key}
                  </div>
                );
              })}
            </div>
            <div style={{ color: "#5A5F66", fontSize: "0.9rem" }}>
              Intensity shows how often each key appears.
            </div>
          </div>
        </AppCard>
      </div>

      <div className="grid">
        <AppCard>
          <div className="stack">
            <div style={typography.sectionTitle}>Weak Spot Suggestions</div>
            <ul style={{ margin: 0, paddingLeft: 18, color: colors.textOnLight }}>
              {suggestions.map((s, i) => (
                <li key={i} style={{ marginBottom: spacing.xs }}>
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </AppCard>
        <AppCard>
          <div className="stack">
            <div style={typography.sectionTitle}>Practice Logs</div>
            <div className="stack">
              {logs
                .slice()
                .reverse()
                .slice(0, 8)
                .map((l) => (
                  <div
                    key={l.id}
                    style={{ border: `1px solid ${colors.divider}`, borderRadius: 12, padding: 12 }}
                  >
                    <div style={{ fontWeight: 600 }}>{l.date}</div>
                    <div style={{ color: "#5A5F66", fontSize: "0.9rem" }}>
                      Tempo achieved: {l.tempoAchieved} BPM
                    </div>
                    <div style={{ color: "#5A5F66", fontSize: "0.9rem" }}>{l.notes}</div>
                  </div>
                ))}
              {logs.length === 0 && (
                <EmptyStateCard title="No practice logs" message="Save an exercise after practice to see stats here." />
              )}
            </div>
          </div>
        </AppCard>
      </div>
    </div>
  );
}
