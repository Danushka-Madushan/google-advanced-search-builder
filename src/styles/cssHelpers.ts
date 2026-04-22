import { G } from "./g-color";

export const css = {
  // Input base
  input: (focused: boolean, borderColor: string = G.blue, shadowColor: string = G.blueLight): React.CSSProperties => ({
    width: "100%",
    padding: "10px 14px",
    borderRadius: 8,
    border: `1px solid ${focused ? borderColor : G.border}`,
    outline: "none",
    fontSize: 14,
    fontFamily: "'Google Sans', Roboto, Arial, sans-serif",
    color: G.black,
    background: G.white,
    boxShadow: focused ? `0 0 0 3px ${shadowColor}` : "none",
    transition: "border-color 0.15s, box-shadow 0.15s",
    boxSizing: "border-box",
  }),
  label: {
    fontSize: 12,
    fontWeight: 500,
    color: G.textSecondary,
    letterSpacing: "0.01em",
    fontFamily: "'Google Sans', Roboto, Arial, sans-serif",
    marginBottom: 4,
    display: "block",
  } as React.CSSProperties,
  badge: (bg: string, color: string, border: string): React.CSSProperties => ({
    display: "inline-block",
    fontSize: 11,
    fontFamily: "'Roboto Mono', monospace",
    fontWeight: 600,
    background: bg,
    color: color,
    border: `1px solid ${border}`,
    padding: "2px 7px",
    borderRadius: 4,
    lineHeight: "18px",
  }),
  hint: {
    fontSize: 12,
    color: G.grey,
    margin: "4px 0 0",
    fontFamily: "'Google Sans', Roboto, Arial, sans-serif",
  } as React.CSSProperties,
};

export const SECTION_THEMES: Record<string, { [key: string]: string}> = {
  blue: { dot: G.blue, hoverBg: "#F8FAFE", badgeBg: G.blueLight, badgeText: "#1967D2", badgeBorder: "#C5D9F9" },
  red: { dot: G.red, hoverBg: "#FFF9F9", badgeBg: G.redLight, badgeText: "#C5221F", badgeBorder: "#F5C6C4" },
  green: { dot: G.green, hoverBg: "#F7FDF9", badgeBg: G.greenLight, badgeText: "#137333", badgeBorder: "#CEEAD6" },
  yellow: { dot: "#F29900", hoverBg: "#FFFBF0", badgeBg: G.yellowLight, badgeText: "#B05E00", badgeBorder: "#FDE293" },
  grey: { dot: G.grey, hoverBg: "#F8F9FA", badgeBg: "#F1F3F4", badgeText: "#3C4043", badgeBorder: G.border },
};
