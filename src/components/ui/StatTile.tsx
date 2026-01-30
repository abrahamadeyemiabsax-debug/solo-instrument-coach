import { colors, radii, spacing, typography } from "../../app/designSystem";

type Props = {
  title: string;
  value: string;
  subtitle?: string;
};

export function StatTile({ title, value, subtitle }: Props) {
  return (
    <div
      style={{
        borderRadius: radii.cardRadius,
        background: colors.surfacePrimary,
        border: `1px solid ${colors.divider}`,
        padding: spacing.md,
        display: "grid",
        gap: spacing.xs,
      }}
    >
      <div style={typography.label}>{title}</div>
      <div style={{ fontSize: "1.2rem", fontWeight: 700 }}>{value}</div>
      {subtitle && <div style={{ color: "#5A5F66", fontSize: "0.85rem" }}>{subtitle}</div>}
    </div>
  );
}
