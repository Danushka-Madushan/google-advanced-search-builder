import React from "react";
import { Zap, Microscope, type LucideIcon } from "lucide-react";
import { G } from "../styles/g-color";
import type { Mode } from "../types";
import { useIsMobile } from '../hooks/useIsMobile';

interface ModeConfig {
  id: Mode;
  label: string;
  Icon: LucideIcon;
  color: string;
  lightColor: string;
  borderColor: string;
}

interface ModeSwitcherProps {
  mode: Mode;
  onChange: (mode: Mode) => void;
}

export const ModeSwitcher: React.FC<ModeSwitcherProps> = ({ mode, onChange }) => {
  const isMobile = useIsMobile();

  const modes: ModeConfig[] = [
    { id: "super", label: "Super File Search", Icon: Zap, color: "#7B61FF", lightColor: "#F0EDFF", borderColor: "#C8BFFF" },
    { id: "advanced", label: "Advanced Search", Icon: Microscope, color: G.blue, lightColor: G.blueLight, borderColor: "#C5D9F9" },
  ];

  return (
    <div style={{
      display: "inline-flex", background: G.greyLight, borderRadius: 12,
      padding: 4, gap: 2,
    }}>
      {modes.map(({ id, label, Icon, color, borderColor }) => {
        const active = mode === id;
        return (
          <button
            key={id}
            onClick={() => onChange(id)}
            style={{
              display: "flex", alignItems: "center", gap: isMobile ? 6 : 8,
              padding: isMobile ? "8px 12px" : "10px 20px", borderRadius: 10,
              border: `1px solid ${active ? borderColor : "transparent"}`,
              background: active ? G.white : "transparent",
              color: active ? color : G.grey,
              fontSize: isMobile ? 13 : 14, fontWeight: 500,
              fontFamily: "'Google Sans', Roboto, Arial, sans-serif",
              cursor: "pointer", transition: "all 0.2s",
              boxShadow: active ? "0 1px 4px rgba(60,64,67,0.12)" : "none",
              whiteSpace: "nowrap",
            }}
          >
            <Icon size={16} style={{ color: active ? color : G.grey }} />
            {label}
          </button>
        );
      })}
    </div>
  );
};
