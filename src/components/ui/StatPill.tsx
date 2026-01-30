import { colors, radii, spacing, typography } from "../../app/designSystem";

type Props = { text: string };

export function StatPill({ text }: Props) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: `${spacing.xs / 2}px ${spacing.sm}px`,
        borderRadius: radii.chipRadius,
        background: colors.surfaceSecondary,
        color: colors.textOnLight,
        marginRight: spacing.xs,
        ...typography.body,
      }}
    >
      {text}
    </span>
  );
}
