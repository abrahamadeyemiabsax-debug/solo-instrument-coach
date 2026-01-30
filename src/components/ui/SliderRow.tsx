import { colors, radii, spacing, typography } from "../../app/designSystem";

type Props = {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
};

export function SliderRow({ label, value, min, max, step = 1, onChange }: Props) {
  return (
    <div style={{ display: "grid", gap: spacing.xs }}>
      <div style={{ display: "flex", justifyContent: "space-between", ...typography.label }}>
        <span>{label}</span>
        <span style={{ color: colors.textOnLight }}>{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ accentColor: colors.accent, borderRadius: radii.controlRadius }}
      />
    </div>
  );
}
