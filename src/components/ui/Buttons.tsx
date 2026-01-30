import { ButtonHTMLAttributes } from "react";
import { colors, radii, spacing } from "../../app/designSystem";

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export function PrimaryButton({ style, ...props }: Props) {
  return (
    <button
      {...props}
      style={{
        background: colors.accent,
        color: "#1b1b1b",
        borderRadius: radii.controlRadius,
        padding: `${spacing.sm}px ${spacing.md}px`,
        border: "1px solid transparent",
        fontWeight: 600,
        cursor: "pointer",
        ...style,
      }}
    />
  );
}

export function SecondaryButton({ style, ...props }: Props) {
  return (
    <button
      {...props}
      style={{
        background: "#0b1222",
        color: colors.textOnDark,
        borderRadius: radii.controlRadius,
        padding: `${spacing.sm}px ${spacing.md}px`,
        border: "1px solid #1e2a45",
        cursor: "pointer",
        ...style,
      }}
    />
  );
}
