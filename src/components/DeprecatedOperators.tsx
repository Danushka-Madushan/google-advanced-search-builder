import React from 'react';
import { AlertTriangle } from "lucide-react";
import { Section } from './Section';
import { G } from '../styles/g-color';
import { css } from '../styles/cssHelpers';

interface DeprecatedOperatorsProps {
  isMobile: boolean;
}

const DeprecatedOperators: React.FC<DeprecatedOperatorsProps> = ({ isMobile }) => {
  const unreliableOps = ["inanchor:", "allinanchor:", "loc:", "location:", "daterange:"];
  const deprecatedOps = ["link:", "info:", "id:", "+ (plus)", "~ (tilde)", "related:", "phonebook:", "blogurl:", "inpostauthor:", "inposttitle:", "#", "filetype:mp3", "filetype:csv"];

  return (
    <Section title="Unreliable / Deprecated Operators" icon={AlertTriangle} theme="grey" warningBadge="⚠ Reference Only" isMobile={isMobile}>
      <div style={{ gridColumn: "1 / -1", display: "flex", flexDirection: "column", gap: 20 }}>
        <div>
          <p style={{
            fontSize: 13,
            fontWeight: 600,
            color: "#B05E00",
            marginBottom: 10,
            fontFamily: "'Google Sans', Roboto, Arial, sans-serif",
            display: "flex",
            alignItems: "center",
            gap: 6
          }}>
            ⚠ Unreliable — Results may be incomplete or inconsistent
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
            {unreliableOps.map(op => (
              <span key={op} style={css.badge(G.yellowLight, "#B05E00", "#FDE293")}>{op}</span>
            ))}
          </div>
        </div>
        <div>
          <p style={{
            fontSize: 13,
            fontWeight: 600,
            color: "#C5221F",
            marginBottom: 10,
            fontFamily: "'Google Sans', Roboto, Arial, sans-serif"
          }}>
            Deprecated — Officially removed, no longer function
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
            {deprecatedOps.map(op => (
              <span key={op} style={{ ...css.badge(G.redLight, "#C5221F", "#F5C6C4"), textDecoration: "line-through" }}>{op}</span>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default DeprecatedOperators;
