import { colors, radii, spacing } from "../../app/designSystem";

export function MiniChartPlaceholder() {
  return (
    <div
      style={{
        height: 120,
        borderRadius: radii.cardRadius,
        background: `linear-gradient(135deg, ${colors.surfaceSecondary}, ${colors.surfacePrimary})`,
        border: `1px solid ${colors.divider}`,
        display: "grid",
        placeItems: "center",
        color: "#666",
        fontSize: "0.9rem",
      }}
    >
      Mini Chart Placeholder
    </div>
  );
}
