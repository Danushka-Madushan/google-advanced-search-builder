import React, { useState } from 'react';
import { Folder, ExternalLink } from "lucide-react";
import { G } from '../styles/g-color';
import { css } from '../styles/cssHelpers';
import { FILE_TYPES } from '../constants';

interface SuperFileSearchProps {
  isMobile: boolean;
  sfsQuery: string;
  sfsFileType: string;
  onQueryChange: (val: string) => void;
  onFileTypeChange: (val: string) => void;
  onSearch: () => void;
}

const SuperFileSearch: React.FC<SuperFileSearchProps> = ({
  isMobile,
  sfsQuery,
  sfsFileType,
  onQueryChange,
  onFileTypeChange,
  onSearch
}) => {
  const [sfsFocused, setSfsFocused] = useState<boolean>(false);

  return (
    <div style={{
      borderRadius: 12,
      border: "2px solid #C8BFFF",
      background: G.white,
      overflow: "hidden",
      boxShadow: "0 2px 12px rgba(123,97,255,0.12)",
    }}>
      {/* Card header */}
      <div style={{
        padding: isMobile ? "14px 16px" : "18px 24px",
        background: "linear-gradient(135deg, #F0EDFF 0%, #F8F7FF 100%)",
        borderBottom: "1px solid #DDD8FF",
        display: "flex",
        alignItems: "center",
        gap: 10,
      }}>
        <span style={{
          width: 10,
          height: 10,
          borderRadius: "50%",
          background: "#7B61FF",
          flexShrink: 0,
          boxShadow: "0 0 0 3px #E8E4FF"
        }} />
        <Folder size={isMobile ? 16 : 18} style={{ color: "#7B61FF", flexShrink: 0 }} />
        <span style={{
          fontWeight: 600,
          fontSize: isMobile ? 14 : 15,
          color: "#3D0099",
          fontFamily: "'Google Sans', Roboto, Arial, sans-serif",
          flex: 1
        }}>
          Super File Search
        </span>
        <span style={{
          ...css.badge("#EDE9FF", "#5B21B6", "#C8BFFF"),
          fontSize: isMobile ? 10 : 12,
          whiteSpace: "nowrap"
        }}>
          Open Directories
        </span>
      </div>

      {/* Card body */}
      <div style={{
        padding: isMobile ? "16px 16px 20px" : "20px 24px 28px",
        display: "flex",
        flexDirection: "column",
        gap: isMobile ? 14 : 20
      }}>
        {/* Info banner */}
        <div style={{
          fontSize: isMobile ? 12 : 13,
          textAlign: "justify",
          color: "#3D0099",
          background: "#F5F2FF",
          borderRadius: 8,
          padding: "12px 14px",
          border: "1px solid #DDD8FF",
          fontFamily: "'Google Sans', Roboto, Arial, sans-serif",
          lineHeight: 1.7
        }}>
          Finds direct download links in open directory listings using{" "}
          <code style={{
            fontFamily: "'Roboto Mono', monospace",
            background: "#EDE9FF",
            color: "#5B21B6",
            padding: "2px 6px",
            borderRadius: 4,
            fontSize: 11
          }}>
            intitle:index.of
          </code>{" "}
          and file-type filtering. Select a category then enter your search term.
        </div>

        {/* File type pills */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <label style={{
            ...css.label,
            color: "#5B21B6",
            fontWeight: 600,
            fontSize: 12,
            textTransform: "uppercase",
            letterSpacing: "0.07em"
          }}>
            File Category
          </label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: isMobile ? 6 : 8 }}>
            {FILE_TYPES.map(({ Icon, label, value }) => {
              const sel = sfsFileType === value;
              return (
                <button
                  key={value || "__any__"}
                  onClick={() => onFileTypeChange(value)}
                  style={{
                    padding: isMobile ? "8px 12px" : "9px 18px",
                    borderRadius: 9999,
                    fontSize: isMobile ? 12 : 13,
                    fontFamily: "'Google Sans', Roboto, Arial, sans-serif",
                    border: `1px solid ${sel ? "#7B61FF" : G.border}`,
                    background: sel ? "#EDE9FF" : G.white,
                    color: sel ? "#5B21B6" : G.textSecondary,
                    cursor: "pointer",
                    fontWeight: 500,
                    transition: "all 0.15s",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    boxShadow: sel ? "0 0 0 2px #C8BFFF" : "none",
                  }}
                  onMouseEnter={e => {
                    if (!sel) {
                      e.currentTarget.style.borderColor = "#7B61FF";
                      e.currentTarget.style.background = "#F5F2FF";
                    }
                  }}
                  onMouseLeave={e => {
                    if (!sel) {
                      e.currentTarget.style.borderColor = G.border;
                      e.currentTarget.style.background = G.white;
                    }
                  }}
                >
                  <Icon size={isMobile ? 13 : 15} color={sel ? "#7B61FF" : G.grey} />
                  {label}
                </button>
              );
            })}
          </div>
          {sfsFileType && (
            <p style={{
              ...css.hint,
              fontFamily: "'Roboto Mono', monospace",
              color: "#7B61FF",
              fontSize: 11
            }}>
              Extensions: {sfsFileType}
            </p>
          )}
        </div>

        {/* Search input + button */}
        <div style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: isMobile ? 10 : 12,
          alignItems: isMobile ? "stretch" : "center",
        }}>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{
              ...css.label,
              fontWeight: 600,
              color: "#5B21B6",
              textTransform: "uppercase",
              letterSpacing: "0.07em",
              fontSize: 12
            }}>
              Search Query
            </label>
            <input
              type="text"
              value={sfsQuery}
              onChange={e => onQueryChange(e.target.value)}
              onKeyDown={e => e.key === "Enter" && onSearch()}
              onFocus={() => setSfsFocused(true)}
              onBlur={() => setSfsFocused(false)}
              placeholder={isMobile ? "e.g. The.Blacklist.S01.E01" : "e.g.  The.Blacklist.S01.E01  ·  1984 George Orwell  ·  GTA V"}
              style={{
                width: "100%",
                padding: isMobile ? "14px 14px" : "12px 16px",
                borderRadius: 8,
                fontSize: 16,
                border: `1px solid ${sfsFocused ? "#7B61FF" : G.border}`,
                outline: "none",
                fontFamily: "'Google Sans', Roboto, Arial, sans-serif",
                color: G.black,
                background: G.white,
                boxShadow: sfsFocused ? "0 0 0 3px #EDE9FF" : "none",
                transition: "border-color 0.15s, box-shadow 0.15s",
                boxSizing: "border-box",
              }}
            />
            <p style={css.hint}>Searches open directory listings across the web via Google</p>
          </div>
          <button
            onClick={onSearch}
            disabled={!sfsQuery.trim()}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 7,
              padding: isMobile ? "14px 16px" : "12px 24px",
              borderRadius: 8,
              border: "none",
              background: sfsQuery.trim() ? "#7B61FF" : "#F1F3F4",
              color: sfsQuery.trim() ? G.white : G.grey,
              fontSize: 14,
              fontWeight: 500,
              fontFamily: "'Google Sans', Roboto, Arial, sans-serif",
              cursor: sfsQuery.trim() ? "pointer" : "not-allowed",
              boxShadow: sfsQuery.trim() ? "0 2px 8px rgba(123,97,255,0.4)" : "none",
              transition: "background 0.15s",
              whiteSpace: "nowrap",
              width: isMobile ? "100%" : undefined,
              flexShrink: 0,
            }}
            onMouseEnter={e => { if (sfsQuery.trim()) e.currentTarget.style.background = "#6D4FE8"; }}
            onMouseLeave={e => { if (sfsQuery.trim()) e.currentTarget.style.background = "#7B61FF"; }}
          >
            <ExternalLink size={15} /> Search on Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuperFileSearch;
