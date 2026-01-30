import { ReactNode } from "react";
import { spacing, typography } from "../../app/designSystem";

type Props = {
  label: string;
  children: ReactNode;
};

export function InputRow({ label, children }: Props) {
  return (
    <label
      style={{
        display: "grid",
        gap: spacing.xs,
        ...typography.label,
      }}
    >
      {label}
      {children}
    </label>
  );
}
