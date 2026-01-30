import { colors, spacing, typography } from "../../app/designSystem";

type Props = {
  value: number;
  size?: number;
  stroke?: number;
  label?: string;
};

export function RingProgress({ value, size = 180, stroke = 14, label }: Props) {
  const clamped = Math.max(0, Math.min(100, value));
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clamped / 100) * circumference;

  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={colors.surfaceSecondary}
          strokeWidth={stroke}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={colors.accent}
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "grid",
          placeItems: "center",
          textAlign: "center",
          gap: spacing.xs,
        }}
      >
        {label && <div style={{ ...typography.label, color: "#666" }}>{label}</div>}
        <div style={{ fontSize: "2rem", fontWeight: 700, color: colors.textOnLight }}>{clamped}%</div>
      </div>
    </div>
  );
}
