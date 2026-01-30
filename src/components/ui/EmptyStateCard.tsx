import { ReactNode } from "react";
import { colors, radii, spacing, typography } from "../../app/designSystem";

type Props = { title: string; message: string; action?: ReactNode };

export function EmptyStateCard({ title, message, action }: Props) {
  return (
    <div
      style={{
        border: `1px solid ${colors.divider}`,
        borderRadius: radii.cardRadius,
        padding: spacing.md,
        background: colors.surfacePrimary,
        color: colors.textOnLight,
        display: "grid",
        gap: spacing.sm,
      }}
    >
      <div style={typography.sectionTitle}>{title}</div>
      <div style={typography.body}>{message}</div>
      {action}
    </div>
  );
}
