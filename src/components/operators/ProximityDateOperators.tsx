import React, { useState } from 'react';
import { Clock } from "lucide-react";
import { Section } from '../Section';
import { InputField } from '../InputField';
import { G } from '../../styles/g-color';
import { css } from '../../styles/cssHelpers';
import type { SearchOperators } from '../../types';

interface ProximityDateOperatorsProps {
  isMobile: boolean;
  ops: SearchOperators;
  onOpChange: (key: keyof SearchOperators, val: string | number) => void;
}

const ProximityDateOperators: React.FC<ProximityDateOperatorsProps> = ({ isMobile, ops, onOpChange }) => {
  const [ar1F, setAr1F] = useState<boolean>(false);
  const [ar2F, setAr2F] = useState<boolean>(false);

  return (
    <Section title="Proximity & Date Filtering" icon={Clock} theme="yellow" isMobile={isMobile}>
      <div style={{ gridColumn: "1 / -1", display: "flex", flexDirection: "column", gap: 8 }}>
        <label style={{ ...css.label, display: "flex", alignItems: "center", gap: 8 }}>
          AROUND(X) Proximity
          <span style={css.badge(G.yellowLight, "#B05E00", "#FDE293")}>AROUND(X)</span>
        </label>
        {/* Mobile: stack vertically; Desktop: single row */}
        <div style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: isMobile ? 8 : 10,
          alignItems: isMobile ? "stretch" : "center",
        }}>
          <input
            type="text"
            value={ops.aroundTerm1}
            onChange={e => onOpChange("aroundTerm1", e.target.value)}
            onFocus={() => setAr1F(true)}
            onBlur={() => setAr1F(false)}
            placeholder="First term"
            style={{
              flex: 1,
              ...css.input(ar1F, "#F29900", G.yellowLight),
              borderColor: ar1F ? "#F29900" : G.border
            }}
          />
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            background: G.yellowLight,
            border: "1px solid #FDE293",
            padding: isMobile ? "8px 12px" : "9px 14px",
            borderRadius: 8,
            flexShrink: 0,
            alignSelf: isMobile ? "center" : "auto",
          }}>
            <span style={{
              fontSize: 13,
              color: "#B05E00",
              fontFamily: "'Roboto Mono', monospace",
              fontWeight: 700
            }}>AROUND</span>
            <span style={{ color: G.grey, fontSize: 14 }}>(</span>
            <input
              type="number"
              min={1}
              max={20}
              value={ops.aroundDistance}
              onChange={e => onOpChange("aroundDistance", parseInt(e.target.value) || 5)}
              style={{
                width: 38,
                textAlign: "center",
                fontSize: 14,
                color: "#B05E00",
                background: "transparent",
                border: "none",
                outline: "none",
                fontFamily: "'Roboto Mono', monospace",
                fontWeight: 700
              }}
            />
            <span style={{ color: G.grey, fontSize: 14 }}>)</span>
          </div>
          <input
            type="text"
            value={ops.aroundTerm2}
            onChange={e => onOpChange("aroundTerm2", e.target.value)}
            onFocus={() => setAr2F(true)}
            onBlur={() => setAr2F(false)}
            placeholder="Second term"
            style={{
              flex: 1,
              ...css.input(ar2F, "#F29900", G.yellowLight),
              borderColor: ar2F ? "#F29900" : G.border
            }}
          />
        </div>
        <p style={css.hint}>Finds pages where both terms appear within X words of each other</p>
      </div>
      <InputField
        label="Before Date"
        badge="before:"
        value={ops.before}
        onChange={v => onOpChange("before", v)}
        placeholder="e.g. 2020 or 2020-06-15"
        hint="Results published before this date"
        monospace
        themeColor="#F29900"
        themeLight={G.yellowLight}
      />
      <InputField
        label="After Date"
        badge="after:"
        value={ops.after}
        onChange={v => onOpChange("after", v)}
        placeholder="e.g. 2023-01-01"
        hint="Results published after this date"
        monospace
        themeColor="#F29900"
        themeLight={G.yellowLight}
      />
    </Section>
  );
};

export default ProximityDateOperators;
