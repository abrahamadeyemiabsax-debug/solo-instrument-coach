import { colors, radii, spacing, typography } from "../../app/designSystem";

type Option = { key: string; label: string };

type Props = {
  options: Option[];
  selected: Set<string>;
  onToggle: (key: string) => void;
};

export function SegmentedToggle({ options, selected, onToggle }: Props) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${options.length}, 1fr)`,
        gap: spacing.xs,
      }}
    >
      {options.map((opt) => {
        const active = selected.has(opt.key);
        return (
          <button
            key={opt.key}
            onClick={() => onToggle(opt.key)}
            style={{
              background: active ? colors.accent : colors.surfaceSecondary,
              color: active ? "#1b1b1b" : colors.textOnLight,
              border: `1px solid ${active ? colors.accent : colors.divider}`,
              borderRadius: radii.controlRadius,
              padding: `${spacing.xs}px ${spacing.sm}px`,
              cursor: "pointer",
              fontWeight: 600,
              ...typography.body,
            }}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
