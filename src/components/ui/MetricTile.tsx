import { colors, radii, spacing, typography } from "../../app/designSystem";

type Props = {
  label: string;
  value: string;
  accent?: boolean;
};

export function MetricTile({ label, value, accent }: Props) {
  return (
    <div
      style={{
        padding: `${spacing.sm}px ${spacing.md}px`,
        borderRadius: radii.cardRadius,
        border: `1px solid ${colors.divider}`,
        background: colors.surfacePrimary,
      }}
    >
      <div style={typography.label}>{label}</div>
      <div style={{ fontSize: "1.1rem", fontWeight: 700, color: accent ? colors.accent : colors.textOnLight }}>
        {value}
      </div>
    </div>
  );
}
