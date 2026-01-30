import { colors, radii, spacing, typography } from "../../app/designSystem";

type Option = { key: string; label: string };

type Props = {
  options: Option[];
  selectedKey?: string;
  selectedKeys?: Set<string>;
  multi?: boolean;
  variant?: "accent" | "neutral";
  onSelect: (key: string) => void;
};

export function ChipsRow({
  options,
  selectedKey,
  selectedKeys,
  multi,
  variant = "accent",
  onSelect,
}: Props) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: spacing.xs }}>
      {options.map((opt) => {
        const active = multi ? selectedKeys?.has(opt.key) : opt.key === selectedKey;
        const activeBg = variant === "accent" ? colors.accent : colors.surfaceSecondary;
        const activeBorder = variant === "accent" ? colors.accent : colors.divider;
        const activeText = variant === "accent" ? "#1b1b1b" : colors.textOnLight;
        const baseBg = variant === "accent" ? colors.surfaceSecondary : colors.surfacePrimary;
        return (
          <button
            key={opt.key}
            onClick={() => onSelect(opt.key)}
            style={{
              background: active ? activeBg : baseBg,
              color: active ? activeText : colors.textOnLight,
              border: `1px solid ${active ? activeBorder : colors.divider}`,
              borderRadius: radii.chipRadius,
              padding: `${spacing.xs / 2}px ${spacing.sm}px`,
              cursor: "pointer",
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
