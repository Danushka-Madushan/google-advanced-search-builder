import React, { useState } from 'react';
import { Link2, Zap, Search, Copy, Check, ExternalLink } from "lucide-react";
import { G } from '../styles/g-color';
import { css } from '../styles/cssHelpers';
import { GOOGLE_BASE } from '../constants';

interface URLPanelProps {
  isMobile: boolean;
  query: string;
  onCopy: () => void;
  onSearch: () => void;
  copied: boolean;
}

const URLPanel: React.FC<URLPanelProps> = ({ isMobile, query, onCopy, onSearch, copied }) => {
  const [urlExpanded, setUrlExpanded] = useState<boolean>(false);
  const [urlPanelHov, setUrlPanelHov] = useState<boolean>(false);

  const trimmedQuery = query.trim();

  return (
    <div style={{
      borderRadius: 12,
      border: `1px solid ${G.border}`,
      background: G.white,
      overflow: "hidden",
      boxShadow: "0 1px 3px rgba(60,64,67,0.07)",
    }}>
      <button
        onClick={() => setUrlExpanded(v => !v)}
        onMouseEnter={() => setUrlPanelHov(true)}
        onMouseLeave={() => setUrlPanelHov(false)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: isMobile ? "0 14px" : "0 20px",
          minHeight: isMobile ? 50 : 52,
          background: urlPanelHov ? "#F8F9FA" : "transparent",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          transition: "background 0.15s",
          boxSizing: "border-box",
        }}
      >
        <Link2 size={15} style={{ color: G.blue, flexShrink: 0 }} />
        <span style={{
          fontSize: isMobile ? 12 : 13,
          fontWeight: 500,
          color: G.textSecondary,
          flex: 1,
          fontFamily: "'Google Sans', Roboto, Arial, sans-serif",
          letterSpacing: "0.01em",
        }}>
          Generated Search URL
        </span>
        {trimmedQuery && (
          <span style={{ ...css.badge(G.blueLight, "#1967D2", "#C5D9F9"), marginRight: 4, whiteSpace: "nowrap" }}>
            {trimmedQuery.length} chars
          </span>
        )}
        {urlExpanded
          ? <Zap size={15} style={{ color: G.grey, flexShrink: 0 }} />
          : <Search size={15} style={{ color: G.grey, flexShrink: 0 }} />}
      </button>

      {urlExpanded && (
        <div style={{ borderTop: `1px solid ${G.border}` }}>
          {/* Query string */}
          <div style={{ padding: isMobile ? "12px 14px" : "14px 20px", borderBottom: `1px solid #F8F9FA` }}>
            <p style={{
              fontSize: 11,
              fontWeight: 600,
              color: G.grey,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: 8,
              fontFamily: "'Google Sans', Roboto, Arial, sans-serif"
            }}>
              Query String
            </p>
            <div style={{
              fontFamily: "'Roboto Mono', monospace",
              fontSize: isMobile ? 12 : 13,
              color: "#137333",
              background: "#F6FBF8",
              borderRadius: 8,
              padding: "12px 14px",
              minHeight: 42,
              wordBreak: "break-all",
              border: "1px solid #D6EFE0"
            }}>
              {trimmedQuery || <span style={{ color: G.grey, fontStyle: "italic" }}>No query yet…</span>}
            </div>
          </div>

          {/* Full URL */}
          <div style={{ padding: isMobile ? "12px 14px" : "14px 20px" }}>
            <p style={{
              fontSize: 11,
              fontWeight: 600,
              color: G.grey,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: 8,
              fontFamily: "'Google Sans', Roboto, Arial, sans-serif"
            }}>
              Full URL
            </p>
            <div style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              alignItems: isMobile ? "stretch" : "center",
              gap: 10
            }}>
              <div style={{
                flex: 1,
                fontFamily: "'Roboto Mono', monospace",
                fontSize: isMobile ? 11 : 12,
                background: "#F8F9FA",
                borderRadius: 8,
                padding: "12px 14px",
                wordBreak: "break-all",
                border: `1px solid ${G.border}`,
                minHeight: 42
              }}>
                {trimmedQuery
                  ? <><span style={{ color: G.grey }}>{GOOGLE_BASE}</span><span style={{ color: G.blue }}>{encodeURIComponent(trimmedQuery)}</span></>
                  : <span style={{ color: G.grey, fontStyle: "italic" }}>Enter a search to generate URL…</span>}
              </div>

              <div style={{
                display: "flex",
                flexDirection: "row",
                gap: isMobile ? 8 : 10,
              }}>
                <button
                  onClick={onCopy}
                  disabled={!trimmedQuery}
                  style={{
                    flex: isMobile ? 1 : undefined,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                    padding: "10px 16px",
                    borderRadius: 8,
                    background: G.white,
                    border: `1px solid ${G.border}`,
                    cursor: trimmedQuery ? "pointer" : "not-allowed",
                    fontSize: 13,
                    color: G.textSecondary,
                    fontFamily: "'Google Sans', Roboto, Arial, sans-serif",
                    opacity: trimmedQuery ? 1 : 0.4,
                    fontWeight: 500,
                    transition: "all 0.15s",
                    whiteSpace: "nowrap",
                  }}
                  onMouseEnter={e => {
                    if (trimmedQuery) {
                      e.currentTarget.style.borderColor = G.blue;
                      e.currentTarget.style.color = G.blue;
                      e.currentTarget.style.background = G.blueLight;
                    }
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = G.border;
                    e.currentTarget.style.color = G.textSecondary;
                    e.currentTarget.style.background = G.white;
                  }}
                >
                  {copied ? <Check size={14} style={{ color: G.green }} /> : <Copy size={14} />}
                  {copied ? "Copied!" : "Copy"}
                </button>
                <button
                  onClick={onSearch}
                  disabled={!trimmedQuery}
                  style={{
                    flex: isMobile ? 1 : undefined,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                    padding: "10px 16px",
                    borderRadius: 8,
                    background: trimmedQuery ? G.blue : "#F1F3F4",
                    border: "none",
                    cursor: trimmedQuery ? "pointer" : "not-allowed",
                    fontSize: 13,
                    color: trimmedQuery ? G.white : G.grey,
                    fontFamily: "'Google Sans', Roboto, Arial, sans-serif",
                    fontWeight: 500,
                    transition: "background 0.15s",
                    whiteSpace: "nowrap",
                  }}
                  onMouseEnter={e => { if (trimmedQuery) e.currentTarget.style.background = "#1A73E8"; }}
                  onMouseLeave={e => { if (trimmedQuery) e.currentTarget.style.background = G.blue; }}
                >
                  <ExternalLink size={14} /> Open
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default URLPanel;
