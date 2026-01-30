import { ReactNode } from "react";
import { colors, spacing } from "../../app/designSystem";

type NavItem = { key: string; label: string };

type Props = {
  header?: ReactNode;
  children: ReactNode;
  navItems: NavItem[];
  activeKey: string;
  onNavChange: (key: string) => void;
};

export function AppScaffold({ header, children, navItems, activeKey, onNavChange }: Props) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: `radial-gradient(1200px 600px at 10% -10%, #1b2a54, ${colors.bgPrimary}) fixed`,
        color: colors.textOnDark,
        padding: `${spacing.lg}px ${spacing.md}px ${spacing.lg * 2}px`,
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {header}
        {children}
      </div>
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          background: colors.bgDeep,
          borderTop: `1px solid #1b2a54`,
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          padding: `${spacing.sm}px ${spacing.md}px ${spacing.md}px`,
          gap: spacing.xs,
          zIndex: 10,
        }}
      >
        {navItems.map((item) => (
          <button
            key={item.key}
            onClick={() => onNavChange(item.key)}
            style={{
              background: activeKey === item.key ? "#0f1830" : "transparent",
              color: activeKey === item.key ? colors.textOnDark : "#A6ACB3",
              border: `1px solid ${activeKey === item.key ? "#24345c" : "transparent"}`,
              borderRadius: 12,
              padding: `${spacing.xs}px ${spacing.sm}px`,
              cursor: "pointer",
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
