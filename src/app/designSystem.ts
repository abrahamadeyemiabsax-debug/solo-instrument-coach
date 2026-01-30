import { CSSProperties } from "react";

export const colors = {
  bgPrimary: "#14213D",
  bgDeep: "#000000",
  surfacePrimary: "#FFFFFF",
  surfaceSecondary: "#E5E5E5",
  accent: "#FCA311",
  textOnDark: "#FFFFFF",
  textOnLight: "#0B0B0B",
  divider: "#E5E5E5",
};

export const typography: Record<
  "title" | "sectionTitle" | "body" | "label" | "mono",
  CSSProperties
> = {
  title: { fontSize: "1.15rem", fontWeight: 600, color: colors.textOnDark },
  sectionTitle: { fontSize: "1rem", fontWeight: 600, color: colors.textOnLight },
  body: { fontSize: "0.95rem", color: colors.textOnLight },
  label: { fontSize: "0.85rem", fontWeight: 600, color: "#2A2F36" },
  mono: { fontFamily: "\"Consolas\", \"Courier New\", monospace" },
};

export const spacing = {
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
};

export const radii = {
  cardRadius: 18,
  controlRadius: 14,
  chipRadius: 12,
};

export const shadows = {
  card: "0 18px 38px rgba(0, 0, 0, 0.2)",
};

export const tokens = { colors, typography, spacing, radii, shadows };

export const controlStyle: CSSProperties = {
  borderRadius: radii.controlRadius,
  border: `1px solid ${colors.divider}`,
  padding: `${spacing.xs}px ${spacing.sm}px`,
  background: colors.surfacePrimary,
  color: colors.textOnLight,
};
