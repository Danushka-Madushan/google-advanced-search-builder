import React, { useState } from "react";
import { G } from "../styles/g-color";
import { css } from "../styles/cssHelpers";

interface InputFieldProps {
  label?: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  hint?: string;
  monospace?: boolean;
  badge?: string;
  themeColor?: string;
  themeLight?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  label, value, onChange, placeholder, hint,
  monospace = false, badge, themeColor = G.blue, themeLight = G.blueLight
}) => {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {(label || badge) && (
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6, flexWrap: "wrap" }}>
          {label && <label style={css.label}>{label}</label>}
          {badge && (
            <span style={{
              ...css.badge(focused ? themeLight : "#F1F3F4", focused ? themeColor : G.textSecondary, focused ? themeLight : G.border),
              transition: "all 0.15s",
            }}>
              {badge}
            </span>
          )}
        </div>
      )}
      <input
        type="text" value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        style={{
          ...css.input(focused, themeColor, themeLight),
          fontFamily: monospace ? "'Roboto Mono', monospace" : "'Google Sans', Roboto, Arial, sans-serif",
        }}
      />
      {hint && <p style={css.hint}>{hint}</p>}
    </div>
  );
};
