import React, { useState } from 'react';
import { Hash } from "lucide-react";
import { Section } from '../Section';
import { InputField } from '../InputField';
import { G } from '../../styles/g-color';
import { css } from '../../styles/cssHelpers';
import type { SearchOperators } from '../../types';

interface BasicOperatorsProps {
  isMobile: boolean;
  ops: SearchOperators;
  onOpChange: (key: keyof SearchOperators, val: string | number) => void;
}

const BasicOperators: React.FC<BasicOperatorsProps> = ({ isMobile, ops, onOpChange }) => {
  const [numFromF, setNumFromF] = useState<boolean>(false);
  const [numToF, setNumToF] = useState<boolean>(false);

  return (
    <Section title="Basic Operators" icon={Hash} theme="blue" isMobile={isMobile}>
      <InputField
        label="Exact Phrase"
        badge={`"phrase"`}
        value={ops.exactPhrase}
        onChange={v => onOpChange("exactPhrase", v)}
        placeholder="e.g. steve jobs"
        hint='Wraps in quotes — matches exact word order'
        themeColor={G.blue}
        themeLight={G.blueLight}
      />
      <InputField
        label="OR Terms"
        badge="OR / |"
        value={ops.orTerms}
        onChange={v => onOpChange("orTerms", v)}
        placeholder="e.g. jobs, gates"
        hint="Comma or pipe-separated — finds X OR Y"
        themeColor={G.blue}
        themeLight={G.blueLight}
      />
      <InputField
        label="AND Terms"
        badge="AND"
        value={ops.andTerms}
        onChange={v => onOpChange("andTerms", v)}
        placeholder="e.g. seo, content"
        hint="All terms must appear in results"
        themeColor={G.blue}
        themeLight={G.blueLight}
      />
      <InputField
        label="Exclude Terms"
        badge="-term"
        value={ops.excludeTerms}
        onChange={v => onOpChange("excludeTerms", v)}
        placeholder="e.g. apple, twitter"
        hint="Comma-separated — prefixed with minus"
        themeColor={G.blue}
        themeLight={G.blueLight}
      />

      {/* Number range */}
      <div style={{ gridColumn: "1 / -1", display: "flex", flexDirection: "column", gap: 6 }}>
        <label style={{ ...css.label, display: "flex", alignItems: "center", gap: 8 }}>
          Number Range
          <span style={css.badge(G.blueLight, "#1967D2", "#C5D9F9")}>#..#</span>
        </label>
        <div style={{
          display: "flex",
          flexWrap: isMobile ? "wrap" : undefined,
          gap: isMobile ? 6 : 10,
          alignItems: "center"
        }}>
          <input
            type="text"
            value={ops.numberFrom}
            onChange={e => onOpChange("numberFrom", e.target.value)}
            onFocus={() => setNumFromF(true)}
            onBlur={() => setNumFromF(false)}
            placeholder="From"
            style={{ flex: 1, ...css.input(numFromF) }}
          />
          {!isMobile && <span style={{
            fontFamily: "'Roboto Mono', monospace",
            color: G.grey,
            fontWeight: 700,
            fontSize: isMobile ? 16 : 18,
            flexShrink: 0
          }}>..</span>}
          <input
            type="text"
            value={ops.numberTo}
            onChange={e => onOpChange("numberTo", e.target.value)}
            onFocus={() => setNumToF(true)}
            onBlur={() => setNumToF(false)}
            placeholder="To"
            style={{ flex: 1, ...css.input(numToF) }}
          />
        </div>
        <p style={css.hint}>e.g. 50..100 for dates, prices, or measurements</p>
      </div>

      {/* Price */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <label style={{ ...css.label, display: "flex", alignItems: "center", gap: 8 }}>
          Price Search
          <span style={css.badge(G.blueLight, "#1967D2", "#C5D9F9")}>$ / Rs</span>
        </label>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <select
            value={ops.priceCurrency}
            onChange={e => onOpChange("priceCurrency", e.target.value)}
            style={{
              padding: "11px 12px",
              borderRadius: 8,
              border: `1px solid ${G.border}`,
              fontFamily: "'Google Sans', Roboto, Arial, sans-serif",
              fontSize: 14,
              color: G.black,
              background: G.white,
              cursor: "pointer",
              flexShrink: 0
            }}
          >
            <option value="$">$ USD</option>
            <option value="Rs">Rs LKR</option>
          </select>
          <div style={{ flex: 1 }}>
            <InputField
              label=""
              value={ops.priceValue}
              onChange={v => onOpChange("priceValue", v)}
              placeholder="e.g. 500"
              themeColor={G.blue}
              themeLight={G.blueLight}
            />
          </div>
        </div>
        <p style={css.hint}>Search for products at a specific price</p>
      </div>

      <InputField
        label="Unit / Currency Conversion"
        badge="in"
        value={ops.unitConvert}
        onChange={v => onOpChange("unitConvert", v)}
        placeholder="e.g. $100 in gbp"
        hint="Convert currency or units inline"
        themeColor={G.blue}
        themeLight={G.blueLight}
      />
    </Section>
  );
};

export default BasicOperators;
