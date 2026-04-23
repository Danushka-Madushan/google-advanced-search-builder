import React from 'react';
import { RotateCcw } from "lucide-react";
import { ModeSwitcher } from './ModeSwitcher';
import { G } from '../styles/g-color';
import type { Mode } from '../types';

interface ToolbarProps {
  isMobile: boolean;
  mode: Mode;
  onModeChange: (newMode: Mode) => void;
  onReset: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ isMobile, mode, onModeChange, onReset }) => {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: isMobile ? "center" : "space-between",
      flexWrap: "wrap",
      gap: 12,
      padding: "4px 0",
    }}>
      <ModeSwitcher mode={mode} onChange={onModeChange} isMobile={isMobile} />
      <button
        onClick={onReset}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 5,
          fontSize: isMobile ? 12 : 13,
          color: G.grey,
          background: G.white,
          border: `1px solid ${G.border}`,
          padding: isMobile ? "7px 12px" : "8px 18px",
          borderRadius: 9999,
          cursor: "pointer",
          fontFamily: "'Google Sans', Roboto, Arial, sans-serif",
          transition: "all 0.15s",
          whiteSpace: "nowrap",
          flexShrink: 0,
        }}
        onMouseEnter={e => {
          e.currentTarget.style.color = G.red;
          e.currentTarget.style.borderColor = G.red;
          e.currentTarget.style.background = G.redLight;
        }}
        onMouseLeave={e => {
          e.currentTarget.style.color = G.grey;
          e.currentTarget.style.borderColor = G.border;
          e.currentTarget.style.background = G.white;
        }}
      >
        <RotateCcw size={isMobile ? 11 : 13} /> Reset all
      </button>
    </div>
  );
};

export default Toolbar;
