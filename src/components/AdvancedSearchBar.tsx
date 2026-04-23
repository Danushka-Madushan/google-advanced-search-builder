import React, { useState } from 'react';
import { Search, ExternalLink } from "lucide-react";
import { G } from '../styles/g-color';

interface AdvancedSearchBarProps {
  isMobile: boolean;
  searchText: string;
  onSearchTextChange: (val: string) => void;
  onSearch: () => void;
  canSearch: boolean;
}

const AdvancedSearchBar: React.FC<AdvancedSearchBarProps> = ({
  isMobile,
  searchText,
  onSearchTextChange,
  onSearch,
  canSearch
}) => {
  const [searchFocused, setSearchFocused] = useState<boolean>(false);

  if (isMobile) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
            <Search size={18} style={{ color: searchFocused ? G.blue : G.grey }} />
          </div>
          <input
            type="text"
            value={searchText}
            onChange={e => onSearchTextChange(e.target.value)}
            onKeyDown={e => e.key === "Enter" && onSearch()}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            placeholder="Enter your search query..."
            style={{
              width: "100%",
              padding: "15px 16px 15px 46px",
              borderRadius: 28,
              fontSize: 16,
              fontFamily: "'Google Sans', Roboto, Arial, sans-serif",
              color: G.black,
              background: G.white,
              border: `1px solid ${searchFocused ? "transparent" : G.border}`,
              outline: "none",
              boxShadow: searchFocused
                ? "0 4px 16px rgba(32,33,36,0.2), 0 0 0 3px #E8F0FE"
                : "0 1px 6px rgba(32,33,36,0.1)",
              transition: "box-shadow 0.2s, border-color 0.2s",
              boxSizing: "border-box",
            }}
          />
        </div>
        <button
          onClick={onSearch}
          disabled={!canSearch}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            padding: "14px 16px",
            borderRadius: 28,
            border: "none",
            background: canSearch ? G.blue : "#F1F3F4",
            color: canSearch ? G.white : G.grey,
            fontSize: 15,
            fontWeight: 500,
            fontFamily: "'Google Sans', Roboto, Arial, sans-serif",
            cursor: canSearch ? "pointer" : "not-allowed",
            boxShadow: canSearch ? "0 1px 6px rgba(66,133,244,0.4)" : "none",
            transition: "background 0.15s",
            boxSizing: "border-box",
          }}
        >
          <ExternalLink size={15} /> Google Search
        </button>
      </div>
    );
  }

  return (
    <div style={{ position: "relative" }}>
      <div style={{ position: "absolute", left: 20, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
        <Search size={20} style={{ color: searchFocused ? G.blue : G.grey }} />
      </div>
      <input
        type="text"
        value={searchText}
        onChange={e => onSearchTextChange(e.target.value)}
        onKeyDown={e => e.key === "Enter" && onSearch()}
        onFocus={() => setSearchFocused(true)}
        onBlur={() => setSearchFocused(false)}
        placeholder="Enter your main search query..."
        style={{
          width: "100%",
          padding: "18px 200px 18px 56px",
          borderRadius: 30,
          fontSize: 16,
          fontFamily: "'Google Sans', Roboto, Arial, sans-serif",
          color: G.black,
          background: G.white,
          border: `1px solid ${searchFocused ? "transparent" : G.border}`,
          outline: "none",
          boxShadow: searchFocused
            ? "0 4px 16px rgba(32,33,36,0.2), 0 0 0 3px #E8F0FE"
            : "0 1px 6px rgba(32,33,36,0.1)",
          transition: "box-shadow 0.2s, border-color 0.2s",
          boxSizing: "border-box",
        }}
      />
      <button
        onClick={onSearch}
        disabled={!canSearch}
        style={{
          position: "absolute",
          right: 8,
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "12px 24px",
          borderRadius: 9999,
          border: "none",
          background: canSearch ? G.blue : "#F1F3F4",
          color: canSearch ? G.white : G.grey,
          fontSize: 14,
          fontWeight: 500,
          fontFamily: "'Google Sans', Roboto, Arial, sans-serif",
          cursor: canSearch ? "pointer" : "not-allowed",
          boxShadow: canSearch ? "0 1px 6px rgba(66,133,244,0.4)" : "none",
          transition: "background 0.15s",
        }}
        onMouseEnter={e => { if (canSearch) e.currentTarget.style.background = "#1A73E8"; }}
        onMouseLeave={e => { if (canSearch) e.currentTarget.style.background = G.blue; }}
      >
        <ExternalLink size={15} /> Google Search
      </button>
    </div>
  );
};

export default AdvancedSearchBar;
