import { ReactNode } from "react";
import { colors, radii, shadows, spacing } from "../../app/designSystem";

type Props = { children: ReactNode; style?: React.CSSProperties };

export function AppCard({ children, style }: Props) {
  return (
    <div
      style={{
        background: colors.surfacePrimary,
        border: `1px solid ${colors.divider}`,
        borderRadius: radii.cardRadius,
        padding: spacing.md,
        color: colors.textOnLight,
        boxShadow: shadows.card,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
