import React, { useState } from "react";
import { X } from "lucide-react";
import { G } from "../styles/g-color";

interface ActiveChipProps {
  label: string;
  onRemove: () => void;
}

export const ActiveChip: React.FC<ActiveChipProps> = ({ label, onRemove }) => {
  const [hov, setHov] = useState(false);
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 4,
      padding: "5px 10px 5px 12px", borderRadius: 9999,
      background: G.blueLight, border: `1px solid #C5D9F9`,
      fontSize: 12, fontFamily: "'Roboto Mono', monospace", color: "#1967D2", fontWeight: 600,
    }}>
      {label}
      <button onClick={onRemove}
        onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
        style={{ background: "none", border: "none", cursor: "pointer", padding: "0 2px", color: hov ? G.red : "#1967D2", display: "flex", lineHeight: 1, transition: "color 0.1s" }}>
        <X size={12} />
      </button>
    </span>
  );
};
