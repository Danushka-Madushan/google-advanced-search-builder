import React, { useState } from "react";
import { ChevronDown, ChevronUp, type LucideIcon } from "lucide-react";
import { G } from "../styles/g-color";
import { css, SECTION_THEMES } from "../styles/cssHelpers";
import { useIsMobile } from '../hooks/useIsMobile';

interface SectionProps {
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
  defaultOpen?: boolean;
  theme?: keyof typeof SECTION_THEMES;
  warningBadge?: string;
}

export const Section: React.FC<SectionProps> = ({ title, icon: Icon, children, defaultOpen = false, theme = "blue", warningBadge }) => {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(defaultOpen);
  const [hovered, setHovered] = useState(false);
  const t = SECTION_THEMES[theme] ?? SECTION_THEMES.blue;

  return (
    <div style={{
      borderRadius: 12,
      border: `1px solid ${open ? "#C5D9F9" : G.border}`,
      background: G.white,
      overflow: "hidden",
      boxShadow: open ? "0 2px 8px rgba(66,133,244,0.08)" : "0 1px 2px rgba(60,64,67,0.06)",
      transition: "border-color 0.2s, box-shadow 0.2s",
    }}>
      <button
        onClick={() => setOpen(v => !v)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          width: "100%", display: "flex", alignItems: "center", gap: 12,
          padding: "16px 20px", background: hovered && !open ? t.hoverBg : open ? "#FAFCFF" : "transparent",
          border: "none", cursor: "pointer", textAlign: "left", transition: "background 0.15s",
        }}
      >
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: t.dot, flexShrink: 0 }} />
        <Icon size={16} style={{ color: t.dot, flexShrink: 0 }} />
        <span style={{ fontWeight: 500, fontSize: 14, color: G.black, flex: 1, fontFamily: "'Google Sans', Roboto, Arial, sans-serif" }}>
          {title}
        </span>
        {warningBadge && (
          <span style={{ ...css.badge("#FEF7E0", "#B05E00", "#FDE293"), marginRight: 4 }}>
            {warningBadge}
          </span>
        )}
        {open
          ? <ChevronUp size={16} style={{ color: G.grey }} />
          : <ChevronDown size={16} style={{ color: G.grey }} />}
      </button>
      {open && (
        <div style={{
          padding: isMobile ? "12px 16px 20px" : "12px 20px 24px",
          borderTop: `1px solid ${G.border}`,
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
          gap: isMobile ? 16 : 20,
        }}>
          {children}
        </div>
      )}
    </div>
  );
};
