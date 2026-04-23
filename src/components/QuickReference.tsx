import React from 'react';
import { Layers, ChevronRight } from "lucide-react";
import { G } from '../styles/g-color';

interface QuickReferenceProps {
  isMobile: boolean;
  onRecipeClick: (query: string) => void;
}

const QuickReference: React.FC<QuickReferenceProps> = ({ isMobile, onRecipeClick }) => {
  const recipes = [
    { label: "Find indexing issues", query: "site:example.com -inurl:https" },
    { label: "Find PDFs on a site", query: "site:competitor.com filetype:pdf" },
    { label: "Guest post opportunities", query: 'topic intitle:"write for us" inurl:write-for-us' },
    { label: "Competitor output by year", query: "site:competitor.com after:2023-01-01 before:2023-12-31" },
    { label: "Internal linking opportunities", query: 'site:yoursite.com "target keyword"' },
    { label: "Stats from credible sources", query: "topic research (site:apa.org OR site:psychologytoday.com)" },
    { label: "Find resource pages", query: "[topic] intitle:resources inurl:resources" },
  ];

  return (
    <div style={{
      borderRadius: 12,
      border: `1px solid ${G.border}`,
      background: G.white,
      overflow: "hidden",
      boxShadow: "0 1px 3px rgba(60,64,67,0.06)"
    }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: isMobile ? "14px 16px" : "16px 20px",
        borderBottom: `1px solid #F8F9FA`
      }}>
        <Layers size={16} style={{ color: G.blue, flexShrink: 0 }} />
        <span style={{
          fontSize: isMobile ? 12 : 13,
          fontWeight: 500,
          color: G.textSecondary,
          fontFamily: "'Google Sans', Roboto, Arial, sans-serif",
          flex: 1
        }}>
          Quick Reference — Common Recipes
        </span>
      </div>
      <div style={{
        padding: isMobile ? "6px 12px 16px" : "8px 16px 20px",
        display: "flex",
        flexDirection: "column"
      }}>
        {recipes.map(r => (
          <div
            key={r.label}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: isMobile ? 8 : 12,
              padding: "10px 4px",
              borderRadius: 8,
              transition: "background 0.1s",
              cursor: "default"
            }}
            onMouseEnter={e => e.currentTarget.style.background = "#F8F9FA"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
          >
            <ChevronRight size={14} style={{ color: G.grey, marginTop: 2, flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{
                fontSize: isMobile ? 12 : 13,
                color: G.textSecondary,
                margin: "0 0 3px",
                fontFamily: "'Google Sans', Roboto, Arial, sans-serif",
                fontWeight: 500
              }}>
                {r.label}
              </p>
              <button
                onClick={() => onRecipeClick(r.query)}
                style={{
                  fontFamily: "'Roboto Mono', monospace",
                  fontSize: isMobile ? 11 : 12,
                  color: G.blue,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  wordBreak: "break-all",
                  textAlign: "left",
                  transition: "color 0.15s"
                }}
                onMouseEnter={e => e.currentTarget.style.color = "#1A73E8"}
                onMouseLeave={e => e.currentTarget.style.color = G.blue}
              >
                {r.query}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickReference;
