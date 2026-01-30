import { colors, radii, spacing } from "../../app/designSystem";

type Props = {
  date: string;
  tempo: number;
  notes: string;
};

export function LogRow({ date, tempo, notes }: Props) {
  return (
    <div
      style={{
        borderRadius: radii.cardRadius,
        border: `1px solid ${colors.divider}`,
        padding: spacing.md,
        display: "grid",
        gap: spacing.xs,
      }}
    >
      <div style={{ fontWeight: 600 }}>{date}</div>
      <div style={{ color: "#5A5F66", fontSize: "0.9rem" }}>Tempo achieved: {tempo} BPM</div>
      <div style={{ color: "#5A5F66", fontSize: "0.9rem" }}>{notes}</div>
    </div>
  );
}
