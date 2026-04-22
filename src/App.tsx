import { useState, useMemo, useCallback, useEffect, type FC } from "react";
import {
  Search, ExternalLink, Copy, Check, RotateCcw, Globe, Hash, Clock, Zap, Mail,
  HardDrive, AlertTriangle, ChevronRight, Link2, Layers, Tag, Folder
} from "lucide-react";
import { G } from './styles/g-color';
import GoogleLogo from './icons/GoogleLogo';

import type { SearchOperators, Mode } from "./types";
import { GOOGLE_BASE, FILE_TYPES, INITIAL_OPS } from "./constants";
import { buildQuery, buildSFSQuery } from "./utils/queryBuilders";
import { css } from "./styles/cssHelpers";
import { InputField } from "./components/InputField";
import { Section } from "./components/Section";
import { ActiveChip } from "./components/ActiveChip";
import { ModeSwitcher } from "./components/ModeSwitcher";

/** 
 * Responsive hook
 * Returns true when viewport width < breakpoint (default 640 px = "sm")
*/
const useIsMobile = (breakpoint = 640): boolean => {
  const [isMobile, setIsMobile] = useState<boolean>(
    () => typeof window !== "undefined" ? window.innerWidth < breakpoint : false
  );
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", handler, { passive: true });
    return () => window.removeEventListener("resize", handler);
  }, [breakpoint]);
  return isMobile;
}

/* App */
const App: FC = () => {
  const isMobile = useIsMobile();

  const [searchText, setSearchText] = useState<string>("");
  const [ops, setOpsState] = useState<SearchOperators>(INITIAL_OPS);
  const [sfsQuery, setSfsQuery] = useState<string>("");
  const [sfsFileType, setSfsFileType] = useState<string>("");
  const [mode, setMode] = useState<Mode>("super");
  const [urlExpanded, setUrlExpanded] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [searchFocused, setSearchFocused] = useState<boolean>(false);
  const [sfsFocused, setSfsFocused] = useState<boolean>(false);
  const [urlPanelHov, setUrlPanelHov] = useState<boolean>(false);
  const [numFromF, setNumFromF] = useState<boolean>(false);
  const [numToF, setNumToF] = useState<boolean>(false);
  const [ar1F, setAr1F] = useState<boolean>(false);
  const [ar2F, setAr2F] = useState<boolean>(false);

  const setOp = useCallback(
    (key: keyof SearchOperators, val: string | number) =>
      setOpsState(prev => ({ ...prev, [key]: val })),
    []
  );

  const sfsQueryString = useMemo(() => buildSFSQuery(sfsQuery, sfsFileType), [sfsQuery, sfsFileType]);
  const advancedQuery = useMemo(() => buildQuery(searchText, ops), [searchText, ops]);
  const query = mode === "super" ? sfsQueryString : advancedQuery;
  const fullUrl = useMemo(() => query.trim() ? GOOGLE_BASE + encodeURIComponent(query) : "", [query]);

  /* Mode switching */
  const handleModeChange = (newMode: Mode) => {
    if (newMode === mode) return;
    setSearchText(""); setOpsState(INITIAL_OPS);
    setSfsQuery(""); setSfsFileType("");
    setMode(newMode);
  };

  /* Active chips (advanced mode only) */
  interface Chip { label: string; key: keyof SearchOperators; }
  const activeOps = useMemo<Chip[]>(() => {
    if (mode !== "advanced") return [];
    const chips: Chip[] = [];

    const add = (cond: string | number | boolean, label: string, key: keyof SearchOperators) => {
      if (cond) chips.push({ label, key });
    };

    add(ops.exactPhrase, `"${ops.exactPhrase}"`, "exactPhrase");
    add(ops.orTerms, `OR: ${ops.orTerms}`, "orTerms");
    add(ops.excludeTerms, `-${ops.excludeTerms}`, "excludeTerms");
    add(ops.site, `site:${ops.site}`, "site");
    add(ops.filetype, `filetype:${ops.filetype}`, "filetype");
    add(ops.intitle, `intitle:${ops.intitle}`, "intitle");
    add(ops.allintitle, `allintitle:${ops.allintitle}`, "allintitle");
    add(ops.inurl, `inurl:${ops.inurl}`, "inurl");
    add(ops.allinurl, `allinurl:${ops.allinurl}`, "allinurl");
    add(ops.intext, `intext:${ops.intext}`, "intext");
    add(ops.allintext, `allintext:${ops.allintext}`, "allintext");
    add(ops.inanchor, `inanchor:${ops.inanchor}`, "inanchor");
    add(ops.before, `before:${ops.before}`, "before");
    add(ops.after, `after:${ops.after}`, "after");
    add(ops.aroundTerm1 && ops.aroundTerm2, `AROUND(${ops.aroundDistance})`, "aroundTerm1");
    add(ops.define, `define:${ops.define}`, "define");
    add(ops.cache, `cache:${ops.cache}`, "cache");
    add(ops.weather, `weather:${ops.weather}`, "weather");
    add(ops.stocks, `stocks:${ops.stocks}`, "stocks");
    add(ops.map, `map:${ops.map}`, "map");
    add(ops.movie, `movie:${ops.movie}`, "movie");
    add(ops.source, `source:${ops.source}`, "source");
    add(ops.related, `related:${ops.related}`, "related");
    add(ops.numberFrom && ops.numberTo, `${ops.numberFrom}..${ops.numberTo}`, "numberFrom");
    add(ops.priceValue, `${ops.priceCurrency}${ops.priceValue}`, "priceValue");
    add(ops.unitConvert, ops.unitConvert, "unitConvert");

    return chips;
  }, [ops, mode]);

  const handleCopy = () => {
    if (!fullUrl) return;
    navigator.clipboard.writeText(fullUrl).then(() => {
      setCopied(true); setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleReset = () => {
    setSearchText(""); setOpsState(INITIAL_OPS); setSfsQuery(""); setSfsFileType("");
  };

  const handleSearch = () => {
    if (query.trim()) window.open(GOOGLE_BASE + encodeURIComponent(query), "_blank");
  };

  /* Shared text-input base style */
  const mkInput = (
    focused: boolean,
    themeColor: string = G.blue,
    themeLight: string = G.blueLight
  ): React.CSSProperties => ({
    padding: "11px 14px",
    borderRadius: 8,
    border: `1px solid ${focused ? themeColor : G.border}`,
    outline: "none",
    /* 16 px prevents iOS Safari from auto-zooming on focus */
    fontSize: 16,
    fontFamily: "'Google Sans', Roboto, Arial, sans-serif",
    color: G.black,
    background: G.white,
    boxShadow: focused ? `0 0 0 3px ${themeLight}` : "none",
    transition: "border-color 0.15s, box-shadow 0.15s",
    boxSizing: "border-box",
  });

  /* ─ Render ─ */
  return (
    <>
      <div style={{ background: "#F8F9FA", minHeight: "100vh", fontFamily: "'Google Sans', Roboto, Arial, sans-serif" }}>
        <div style={{
          maxWidth: 900,
          margin: "0 auto",
          padding: isMobile ? "24px 16px 32px" : "48px 24px 30px",
          display: "flex",
          flexDirection: "column",
          gap: isMobile ? 12 : 16,
        }}>

          {/* ── Header ── */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, paddingBottom: isMobile ? 2 : 8 }}>
            <GoogleLogo />
            <div style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: isMobile ? 6 : 10,
              marginTop: isMobile ? 2 : 6,
            }}>
              <span style={{
                fontSize: isMobile ? 20 : 28,
                fontWeight: 400,
                color: G.black,
                letterSpacing: "-0.5px",
                fontFamily: "'Google Sans', Roboto, Arial, sans-serif",
                textAlign: "center",
              }}>
                Advanced Search Builder
              </span>
              <span style={{
                fontSize: 11, fontWeight: 600,
                background: G.blueLight, color: "#1967D2",
                border: "1px solid #C5D9F9",
                padding: "3px 10px", borderRadius: 9999,
                fontFamily: "'Google Sans', Roboto, Arial, sans-serif",
                letterSpacing: "0.02em",
                whiteSpace: "nowrap",
              }}>
                Query Builder
              </span>
            </div>
            <p style={{
              fontSize: isMobile ? 13 : 14,
              color: G.grey,
              margin: 0,
              textAlign: "center",
              fontFamily: "'Google Sans', Roboto, Arial, sans-serif",
              paddingInline: isMobile ? 4 : 0,
              lineHeight: 1.5,
            }}>
              Visual builder for all Google search operators — generates a live search URL
            </p>
          </div>

          {/* ── Mode Switcher + Reset ── */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 8,
            padding: "4px 0",
          }}>
            <ModeSwitcher mode={mode} onChange={handleModeChange} />
            <button
              onClick={handleReset}
              style={{
                display: "flex", alignItems: "center", gap: 5,
                fontSize: isMobile ? 12 : 13,
                color: G.grey, background: G.white,
                border: `1px solid ${G.border}`,
                padding: isMobile ? "7px 12px" : "8px 18px",
                borderRadius: 9999, cursor: "pointer",
                fontFamily: "'Google Sans', Roboto, Arial, sans-serif",
                transition: "all 0.15s",
                whiteSpace: "nowrap", flexShrink: 0,
              }}
              onMouseEnter={e => { e.currentTarget.style.color = G.red; e.currentTarget.style.borderColor = G.red; e.currentTarget.style.background = G.redLight; }}
              onMouseLeave={e => { e.currentTarget.style.color = G.grey; e.currentTarget.style.borderColor = G.border; e.currentTarget.style.background = G.white; }}
            >
              <RotateCcw size={isMobile ? 11 : 13} /> Reset all
            </button>
          </div>

          {/* ─ Advanced mode search bar ─ */}
          {mode === "advanced" && (
            isMobile ? (
              /* Mobile: input + full-width button stacked */
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ position: "relative" }}>
                  <div style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
                    <Search size={18} style={{ color: searchFocused ? G.blue : G.grey }} />
                  </div>
                  <input
                    type="text" value={searchText}
                    onChange={e => setSearchText(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && handleSearch()}
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setSearchFocused(false)}
                    placeholder="Enter your search query..."
                    style={{
                      width: "100%", padding: "15px 16px 15px 46px",
                      borderRadius: 28, fontSize: 16,
                      fontFamily: "'Google Sans', Roboto, Arial, sans-serif",
                      color: G.black, background: G.white,
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
                  onClick={handleSearch}
                  disabled={!query.trim()}
                  style={{
                    width: "100%",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                    padding: "14px 16px",
                    borderRadius: 28, border: "none",
                    background: query.trim() ? G.blue : "#F1F3F4",
                    color: query.trim() ? G.white : G.grey,
                    fontSize: 15, fontWeight: 500,
                    fontFamily: "'Google Sans', Roboto, Arial, sans-serif",
                    cursor: query.trim() ? "pointer" : "not-allowed",
                    boxShadow: query.trim() ? "0 1px 6px rgba(66,133,244,0.4)" : "none",
                    transition: "background 0.15s",
                    boxSizing: "border-box",
                  }}
                >
                  <ExternalLink size={15} /> Google Search
                </button>
              </div>
            ) : (
              /* Desktop: button overlaid inside input */
              <div style={{ position: "relative" }}>
                <div style={{ position: "absolute", left: 20, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
                  <Search size={20} style={{ color: searchFocused ? G.blue : G.grey }} />
                </div>
                <input
                  type="text" value={searchText}
                  onChange={e => setSearchText(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleSearch()}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  placeholder="Enter your main search query..."
                  style={{
                    width: "100%", padding: "18px 200px 18px 56px",
                    borderRadius: 30, fontSize: 16,
                    fontFamily: "'Google Sans', Roboto, Arial, sans-serif",
                    color: G.black, background: G.white,
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
                  onClick={handleSearch} disabled={!query.trim()}
                  style={{
                    position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)",
                    display: "flex", alignItems: "center", gap: 6, padding: "12px 24px",
                    borderRadius: 9999, border: "none",
                    background: query.trim() ? G.blue : "#F1F3F4",
                    color: query.trim() ? G.white : G.grey,
                    fontSize: 14, fontWeight: 500,
                    fontFamily: "'Google Sans', Roboto, Arial, sans-serif",
                    cursor: query.trim() ? "pointer" : "not-allowed",
                    boxShadow: query.trim() ? "0 1px 6px rgba(66,133,244,0.4)" : "none",
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={e => { if (query.trim()) e.currentTarget.style.background = "#1A73E8"; }}
                  onMouseLeave={e => { if (query.trim()) e.currentTarget.style.background = G.blue; }}
                >
                  <ExternalLink size={15} /> Google Search
                </button>
              </div>
            )
          )}

          {/* ─ Active operator chips ─ */}
          {activeOps.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, padding: "2px 0" }}>
              {activeOps.map(chip => (
                <ActiveChip key={chip.key} label={chip.label} onRemove={() => setOp(chip.key, "")} />
              ))}
            </div>
          )}

          {/* ─ URL Panel ─ */}
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
                width: "100%", display: "flex", alignItems: "center", gap: 10,
                padding: isMobile ? "13px 14px" : "14px 20px",
                background: urlPanelHov ? "#F8F9FA" : "transparent",
                border: "none", cursor: "pointer", textAlign: "left",
                transition: "background 0.15s",
              }}
            >
              <Link2 size={15} style={{ color: G.blue, flexShrink: 0 }} />
              <span style={{
                fontSize: isMobile ? 12 : 13,
                fontWeight: 500, color: G.textSecondary, flex: 1,
                fontFamily: "'Google Sans', Roboto, Arial, sans-serif",
                letterSpacing: "0.01em",
              }}>
                Generated Search URL
              </span>
              {query.trim() && (
                <span style={{ ...css.badge(G.blueLight, "#1967D2", "#C5D9F9"), marginRight: 4, whiteSpace: "nowrap" }}>
                  {query.trim().length} chars
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
                  <p style={{ fontSize: 11, fontWeight: 600, color: G.grey, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8, fontFamily: "'Google Sans', Roboto, Arial, sans-serif" }}>
                    Query String
                  </p>
                  <div style={{ fontFamily: "'Roboto Mono', monospace", fontSize: isMobile ? 12 : 13, color: "#137333", background: "#F6FBF8", borderRadius: 8, padding: "12px 14px", minHeight: 42, wordBreak: "break-all", border: "1px solid #D6EFE0" }}>
                    {query.trim() || <span style={{ color: G.grey, fontStyle: "italic" }}>No query yet…</span>}
                  </div>
                </div>
                {/* Full URL */}
                <div style={{ padding: isMobile ? "12px 14px" : "14px 20px" }}>
                  <p style={{ fontSize: 11, fontWeight: 600, color: G.grey, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8, fontFamily: "'Google Sans', Roboto, Arial, sans-serif" }}>
                    Full URL
                  </p>
                  {/* On mobile: URL box full-width, then Copy+Open side-by-side below */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <div style={{ fontFamily: "'Roboto Mono', monospace", fontSize: isMobile ? 11 : 12, background: "#F8F9FA", borderRadius: 8, padding: "12px 14px", wordBreak: "break-all", border: `1px solid ${G.border}`, minHeight: 42 }}>
                      {query.trim()
                        ? <><span style={{ color: G.grey }}>{GOOGLE_BASE}</span><span style={{ color: G.blue }}>{encodeURIComponent(query)}</span></>
                        : <span style={{ color: G.grey, fontStyle: "italic" }}>Enter a search to generate URL…</span>}
                    </div>
                    <div style={{
                      display: "flex",
                      /* Mobile: row (Copy | Open side by side); Desktop: column (stacked) */
                      flexDirection: isMobile ? "row" : "column",
                      gap: isMobile ? 8 : 6,
                      alignSelf: isMobile ? "stretch" : "flex-end",
                    }}>
                      <button
                        onClick={handleCopy} disabled={!query.trim()}
                        style={{
                          flex: isMobile ? 1 : undefined,
                          display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                          padding: "10px 16px", borderRadius: 8,
                          background: G.white, border: `1px solid ${G.border}`,
                          cursor: query.trim() ? "pointer" : "not-allowed",
                          fontSize: 13, color: G.textSecondary,
                          fontFamily: "'Google Sans', Roboto, Arial, sans-serif",
                          opacity: query.trim() ? 1 : 0.4, fontWeight: 500,
                          transition: "all 0.15s", whiteSpace: "nowrap",
                        }}
                        onMouseEnter={e => { if (query.trim()) { e.currentTarget.style.borderColor = G.blue; e.currentTarget.style.color = G.blue; e.currentTarget.style.background = G.blueLight; } }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = G.border; e.currentTarget.style.color = G.textSecondary; e.currentTarget.style.background = G.white; }}
                      >
                        {copied ? <Check size={14} style={{ color: G.green }} /> : <Copy size={14} />}
                        {copied ? "Copied!" : "Copy"}
                      </button>
                      <button
                        onClick={handleSearch} disabled={!query.trim()}
                        style={{
                          flex: isMobile ? 1 : undefined,
                          display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                          padding: "10px 16px", borderRadius: 8,
                          background: query.trim() ? G.blue : "#F1F3F4", border: "none",
                          cursor: query.trim() ? "pointer" : "not-allowed",
                          fontSize: 13, color: query.trim() ? G.white : G.grey,
                          fontFamily: "'Google Sans', Roboto, Arial, sans-serif",
                          fontWeight: 500, transition: "background 0.15s",
                          whiteSpace: "nowrap",
                        }}
                        onMouseEnter={e => { if (query.trim()) e.currentTarget.style.background = "#1A73E8"; }}
                        onMouseLeave={e => { if (query.trim()) e.currentTarget.style.background = G.blue; }}
                      >
                        <ExternalLink size={14} /> Open
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* SUPER FILE SEARCH MODE */}
          {mode === "super" && (
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
                display: "flex", alignItems: "center", gap: 10,
              }}>
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#7B61FF", flexShrink: 0, boxShadow: "0 0 0 3px #E8E4FF" }} />
                <Folder size={isMobile ? 16 : 18} style={{ color: "#7B61FF", flexShrink: 0 }} />
                <span style={{ fontWeight: 600, fontSize: isMobile ? 14 : 15, color: "#3D0099", fontFamily: "'Google Sans', Roboto, Arial, sans-serif", flex: 1 }}>
                  Super File Search
                </span>
                <span style={{ ...css.badge("#EDE9FF", "#5B21B6", "#C8BFFF"), fontSize: isMobile ? 10 : 12, whiteSpace: "nowrap" }}>
                  Open Directories
                </span>
              </div>

              {/* Card body */}
              <div style={{ padding: isMobile ? "16px 16px 20px" : "20px 24px 28px", display: "flex", flexDirection: "column", gap: isMobile ? 14 : 20 }}>
                {/* Info banner */}
                <div style={{ fontSize: isMobile ? 12 : 13, color: "#3D0099", background: "#F5F2FF", borderRadius: 8, padding: "12px 14px", border: "1px solid #DDD8FF", fontFamily: "'Google Sans', Roboto, Arial, sans-serif", lineHeight: 1.7 }}>
                  Finds direct download links in open directory listings using{" "}
                  <code style={{ fontFamily: "'Roboto Mono', monospace", background: "#EDE9FF", color: "#5B21B6", padding: "2px 6px", borderRadius: 4, fontSize: 11 }}>
                    intitle:index.of
                  </code>{" "}
                  and file-type filtering. Select a category then enter your search term.
                </div>

                {/* File type pills */}
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <label style={{ ...css.label, color: "#5B21B6", fontWeight: 600, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.07em" }}>
                    File Category
                  </label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: isMobile ? 6 : 8 }}>
                    {FILE_TYPES.map(({ Icon, label, value }) => {
                      const sel = sfsFileType === value;
                      return (
                        <button
                          key={value || "__any__"}
                          onClick={() => setSfsFileType(value)}
                          style={{
                            padding: isMobile ? "8px 12px" : "9px 18px",
                            borderRadius: 9999,
                            fontSize: isMobile ? 12 : 13,
                            fontFamily: "'Google Sans', Roboto, Arial, sans-serif",
                            border: `1px solid ${sel ? "#7B61FF" : G.border}`,
                            background: sel ? "#EDE9FF" : G.white,
                            color: sel ? "#5B21B6" : G.textSecondary,
                            cursor: "pointer", fontWeight: 500,
                            transition: "all 0.15s",
                            display: "flex", alignItems: "center", gap: 6,
                            boxShadow: sel ? "0 0 0 2px #C8BFFF" : "none",
                          }}
                          onMouseEnter={e => { if (!sel) { e.currentTarget.style.borderColor = "#7B61FF"; e.currentTarget.style.background = "#F5F2FF"; } }}
                          onMouseLeave={e => { if (!sel) { e.currentTarget.style.borderColor = G.border; e.currentTarget.style.background = G.white; } }}
                        >
                          <Icon size={isMobile ? 13 : 15} color={sel ? "#7B61FF" : G.grey} />
                          {label}
                        </button>
                      );
                    })}
                  </div>
                  {sfsFileType && (
                    <p style={{ ...css.hint, fontFamily: "'Roboto Mono', monospace", color: "#7B61FF", fontSize: 11 }}>
                      Extensions: {sfsFileType}
                    </p>
                  )}
                </div>

                {/* Search input + button — stacked on mobile, row on desktop */}
                <div style={{
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  gap: isMobile ? 10 : 12,
                  alignItems: isMobile ? "stretch" : "flex-end",
                }}>
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
                    <label style={{ ...css.label, fontWeight: 600, color: "#5B21B6", textTransform: "uppercase", letterSpacing: "0.07em", fontSize: 12 }}>
                      Search Query
                    </label>
                    <input
                      type="text" value={sfsQuery}
                      onChange={e => setSfsQuery(e.target.value)}
                      onKeyDown={e => e.key === "Enter" && handleSearch()}
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
                        color: G.black, background: G.white,
                        boxShadow: sfsFocused ? "0 0 0 3px #EDE9FF" : "none",
                        transition: "border-color 0.15s, box-shadow 0.15s",
                        boxSizing: "border-box",
                      }}
                    />
                    <p style={css.hint}>Searches open directory listings across the web via Google</p>
                  </div>
                  <button
                    onClick={handleSearch} disabled={!sfsQuery.trim()}
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
                      padding: isMobile ? "14px 16px" : "12px 24px",
                      borderRadius: 8, border: "none",
                      background: sfsQuery.trim() ? "#7B61FF" : "#F1F3F4",
                      color: sfsQuery.trim() ? G.white : G.grey,
                      fontSize: 14, fontWeight: 500,
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
          )}

          {/* ADVANCED SEARCH MODE — Operator Sections */}
          {mode === "advanced" && (
            <>
              {/* 2. Basic Operators */}
              <Section title="Basic Operators" icon={Hash} theme="blue">
                <InputField label="Exact Phrase" badge={`"phrase"`} value={ops.exactPhrase} onChange={v => setOp("exactPhrase", v)}
                  placeholder="e.g. steve jobs" hint='Wraps in quotes — matches exact word order' themeColor={G.blue} themeLight={G.blueLight} />
                <InputField label="OR Terms" badge="OR / |" value={ops.orTerms} onChange={v => setOp("orTerms", v)}
                  placeholder="e.g. jobs, gates" hint="Comma or pipe-separated — finds X OR Y" themeColor={G.blue} themeLight={G.blueLight} />
                <InputField label="AND Terms" badge="AND" value={ops.andTerms} onChange={v => setOp("andTerms", v)}
                  placeholder="e.g. seo, content" hint="All terms must appear in results" themeColor={G.blue} themeLight={G.blueLight} />
                <InputField label="Exclude Terms" badge="-term" value={ops.excludeTerms} onChange={v => setOp("excludeTerms", v)}
                  placeholder="e.g. apple, twitter" hint="Comma-separated — prefixed with minus" themeColor={G.blue} themeLight={G.blueLight} />

                {/* Number range — always full-width via gridColumn */}
                <div style={{ gridColumn: "1 / -1", display: "flex", flexDirection: "column", gap: 6 }}>
                  <label style={{ ...css.label, display: "flex", alignItems: "center", gap: 8 }}>
                    Number Range
                    <span style={css.badge(G.blueLight, "#1967D2", "#C5D9F9")}>#..#</span>
                  </label>
                  <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <input type="text" value={ops.numberFrom} onChange={e => setOp("numberFrom", e.target.value)}
                      onFocus={() => setNumFromF(true)} onBlur={() => setNumFromF(false)}
                      placeholder="From" style={{ flex: 1, ...mkInput(numFromF) }} />
                    <span style={{ fontFamily: "'Roboto Mono', monospace", color: G.grey, fontWeight: 700, fontSize: 18, flexShrink: 0 }}>..</span>
                    <input type="text" value={ops.numberTo} onChange={e => setOp("numberTo", e.target.value)}
                      onFocus={() => setNumToF(true)} onBlur={() => setNumToF(false)}
                      placeholder="To" style={{ flex: 1, ...mkInput(numToF) }} />
                  </div>
                  <p style={css.hint}>e.g. 50..100 for dates, prices, or measurements</p>
                </div>

                {/* Price */}
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label style={{ ...css.label, display: "flex", alignItems: "center", gap: 8 }}>
                    Price Search
                    <span style={css.badge(G.blueLight, "#1967D2", "#C5D9F9")}>$ / Rs</span>
                  </label>
                  <div style={{ display: "flex", gap: 8 }}>
                    <select
                      value={ops.priceCurrency} onChange={e => setOp("priceCurrency", e.target.value)}
                      style={{ padding: "11px 12px", borderRadius: 8, border: `1px solid ${G.border}`, fontFamily: "'Google Sans', Roboto, Arial, sans-serif", fontSize: 16, color: G.black, background: G.white, cursor: "pointer", flexShrink: 0 }}
                    >
                      <option value="$">$ USD</option>
                      <option value="Rs">Rs LKR</option>
                    </select>
                    <InputField label="" value={ops.priceValue} onChange={v => setOp("priceValue", v)} placeholder="e.g. 500" themeColor={G.blue} themeLight={G.blueLight} />
                  </div>
                  <p style={css.hint}>Search for products at a specific price</p>
                </div>

                <InputField label="Unit / Currency Conversion" badge="in" value={ops.unitConvert} onChange={v => setOp("unitConvert", v)}
                  placeholder="e.g. $100 in gbp" hint="Convert currency or units inline" themeColor={G.blue} themeLight={G.blueLight} />
              </Section>

              {/* Site & Domain */}
              <Section title="Site & Domain" icon={Globe} theme="green">
                <InputField label="Limit to Site / Domain" badge="site:" value={ops.site} onChange={v => setOp("site", v)}
                  placeholder="e.g. nasa.gov or .edu" hint="Restrict results to a specific site or TLD" monospace themeColor={G.green} themeLight={G.greenLight} />
                <InputField label="File Type" badge="filetype:" value={ops.filetype} onChange={v => setOp("filetype", v)}
                  placeholder="e.g. pdf, docx, xlsx, pptx" hint="Return specific file format results" monospace themeColor={G.green} themeLight={G.greenLight} />
                <InputField label="Related Sites" badge="related:" value={ops.related} onChange={v => setOp("related", v)}
                  placeholder="e.g. nytimes.com" hint="Find sites similar to this domain" monospace themeColor={G.green} themeLight={G.greenLight} />
              </Section>

              {/* Page Element Operators */}
              <Section title="Page Element Operators" icon={Tag} theme="blue">
                <InputField label="Word in Title" badge="intitle:" value={ops.intitle} onChange={v => setOp("intitle", v)}
                  placeholder="e.g. apple" hint="Page title must contain this word" themeColor={G.blue} themeLight={G.blueLight} />
                <InputField label="All Words in Title" badge="allintitle:" value={ops.allintitle} onChange={v => setOp("allintitle", v)}
                  placeholder="e.g. best coffee beans" hint="All these words must be in the title" themeColor={G.blue} themeLight={G.blueLight} />
                <InputField label="Word in URL" badge="inurl:" value={ops.inurl} onChange={v => setOp("inurl", v)}
                  placeholder="e.g. author/joshua" hint="This word must appear in the URL" monospace themeColor={G.blue} themeLight={G.blueLight} />
                <InputField label="All Words in URL" badge="allinurl:" value={ops.allinurl} onChange={v => setOp("allinurl", v)}
                  placeholder="e.g. microsoft office support" hint="All these words must be in the URL" monospace themeColor={G.blue} themeLight={G.blueLight} />
                <InputField label="Word in Body Text" badge="intext:" value={ops.intext} onChange={v => setOp("intext", v)}
                  placeholder="e.g. quantum" hint="This word must appear in the page body" themeColor={G.blue} themeLight={G.blueLight} />
                <InputField label="All Words in Body" badge="allintext:" value={ops.allintext} onChange={v => setOp("allintext", v)}
                  placeholder="e.g. ingredients flour water salt" hint="All these words must be in page body" themeColor={G.blue} themeLight={G.blueLight} />
                <InputField label="Anchor Text in Backlinks" badge="inanchor:" value={ops.inanchor} onChange={v => setOp("inanchor", v)}
                  placeholder="e.g. apple" hint="⚠ Hit-and-miss — inconsistent results" themeColor={G.blue} themeLight={G.blueLight} />
              </Section>

              {/* Proximity & Date */}
              <Section title="Proximity & Date Filtering" icon={Clock} theme="yellow">
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
                    <input type="text" value={ops.aroundTerm1} onChange={e => setOp("aroundTerm1", e.target.value)}
                      onFocus={() => setAr1F(true)} onBlur={() => setAr1F(false)}
                      placeholder="First term"
                      style={{ flex: 1, ...mkInput(ar1F, "#F29900", G.yellowLight), borderColor: ar1F ? "#F29900" : G.border }} />
                    <div style={{
                      display: "flex", alignItems: "center", gap: 4,
                      background: G.yellowLight, border: "1px solid #FDE293",
                      padding: "9px 14px", borderRadius: 8,
                      flexShrink: 0,
                      alignSelf: isMobile ? "flex-start" : "auto",
                    }}>
                      <span style={{ fontSize: 13, color: "#B05E00", fontFamily: "'Roboto Mono', monospace", fontWeight: 700 }}>AROUND</span>
                      <span style={{ color: G.grey, fontSize: 14 }}>(</span>
                      <input type="number" min={1} max={20} value={ops.aroundDistance}
                        onChange={e => setOp("aroundDistance", parseInt(e.target.value) || 5)}
                        style={{ width: 38, textAlign: "center", fontSize: 14, color: "#B05E00", background: "transparent", border: "none", outline: "none", fontFamily: "'Roboto Mono', monospace", fontWeight: 700 }} />
                      <span style={{ color: G.grey, fontSize: 14 }}>)</span>
                    </div>
                    <input type="text" value={ops.aroundTerm2} onChange={e => setOp("aroundTerm2", e.target.value)}
                      onFocus={() => setAr2F(true)} onBlur={() => setAr2F(false)}
                      placeholder="Second term"
                      style={{ flex: 1, ...mkInput(ar2F, "#F29900", G.yellowLight), borderColor: ar2F ? "#F29900" : G.border }} />
                  </div>
                  <p style={css.hint}>Finds pages where both terms appear within X words of each other</p>
                </div>
                <InputField label="Before Date" badge="before:" value={ops.before} onChange={v => setOp("before", v)}
                  placeholder="e.g. 2020 or 2020-06-15" hint="Results published before this date" monospace themeColor="#F29900" themeLight={G.yellowLight} />
                <InputField label="After Date" badge="after:" value={ops.after} onChange={v => setOp("after", v)}
                  placeholder="e.g. 2023-01-01" hint="Results published after this date" monospace themeColor="#F29900" themeLight={G.yellowLight} />
              </Section>

              {/* Content & Utility */}
              <Section title="Content & Utility Operators" icon={Zap} theme="red">
                <InputField label="Dictionary Definition" badge="define:" value={ops.define} onChange={v => setOp("define", v)}
                  placeholder="e.g. entrepreneur" hint="Triggers Google dictionary card" themeColor={G.red} themeLight={G.redLight} />
                <InputField label="Cached Page" badge="cache:" value={ops.cache} onChange={v => setOp("cache", v)}
                  placeholder="e.g. apple.com" hint="Shows Google's cached version of a page" monospace themeColor={G.red} themeLight={G.redLight} />
                <InputField label="Weather" badge="weather:" value={ops.weather} onChange={v => setOp("weather", v)}
                  placeholder="e.g. london" hint="Shows weather forecast card" themeColor={G.red} themeLight={G.redLight} />
                <InputField label="Stock Info" badge="stocks:" value={ops.stocks} onChange={v => setOp("stocks", v)}
                  placeholder="e.g. GOOGL" hint="Shows stock ticker card" monospace themeColor={G.red} themeLight={G.redLight} />
                <InputField label="Map" badge="map:" value={ops.map} onChange={v => setOp("map", v)}
                  placeholder="e.g. silicon valley" hint="Forces map results for a location" themeColor={G.red} themeLight={G.redLight} />
                <InputField label="Movie Info" badge="movie:" value={ops.movie} onChange={v => setOp("movie", v)}
                  placeholder="e.g. oppenheimer" hint="Shows movie showtimes and info" themeColor={G.red} themeLight={G.redLight} />
                <InputField label="News Source" badge="source:" value={ops.source} onChange={v => setOp("source", v)}
                  placeholder="e.g. the_verge" hint="Limits Google News to a specific source" monospace themeColor={G.red} themeLight={G.redLight} />
              </Section>

              {/* Google Drive */}
              <Section title="Google Drive Operators" icon={HardDrive} theme="green">
                <div style={{ gridColumn: "1 / -1", fontSize: 13, color: G.textSecondary, background: "#F8F9FA", border: `1px solid ${G.border}`, borderRadius: 8, padding: "10px 14px", fontFamily: "'Roboto Mono', monospace" }}>
                  Use these operators in the <strong>Google Drive</strong> search bar directly
                </div>
                {[
                  { badge: "type:", examples: "spreadsheet, document, presentation, folder, pdf, form, drawing, script", desc: "Filter by file type" },
                  { badge: "owner:", examples: "me, someone@gmail.com", desc: "Filter by file owner" },
                  { badge: "to:", examples: "colleague@company.com", desc: "Files shared with a person" },
                  { badge: "is:", examples: "starred, trashed", desc: "Filter by file status" },
                ].map(item => (
                  <div key={item.badge} style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                      <span style={css.badge(G.greenLight, "#137333", "#CEEAD6")}>{item.badge}</span>
                      <span style={{ fontSize: 13, color: G.textSecondary, fontFamily: "'Google Sans', Roboto, Arial, sans-serif" }}>{item.desc}</span>
                    </div>
                    <p style={{ fontSize: 12, color: G.grey, margin: 0, fontFamily: "'Roboto Mono', monospace" }}>{item.examples}</p>
                  </div>
                ))}
              </Section>

              {/* Gmail */}
              <Section title="Gmail Operators" icon={Mail} theme="red">
                <div style={{ gridColumn: "1 / -1", fontSize: 13, color: G.textSecondary, background: "#F8F9FA", border: `1px solid ${G.border}`, borderRadius: 8, padding: "10px 14px", fontFamily: "'Roboto Mono', monospace" }}>
                  Use these operators in the <strong>Gmail</strong> search bar directly
                </div>
                {[
                  { badge: "from: / to: / cc: / bcc:", desc: "Filter by sender or recipient" },
                  { badge: "subject:", desc: "Search keywords in email subject" },
                  { badge: "has:attachment", desc: "Emails with file attachments" },
                  { badge: "has:drive / has:document / has:youtube", desc: "Filter by attachment source" },
                  { badge: "larger: / smaller: / size:", desc: "Filter by size — e.g. larger:10m" },
                  { badge: "is:unread / is:read / is:important / is:snoozed", desc: "Filter by read / importance status" },
                  { badge: "category:", desc: "primary, social, promotions, updates, forums" },
                  { badge: "label:", desc: "Filter by Gmail label" },
                  { badge: "deliveredto: / list:", desc: "Filter by delivery address or mailing list" },
                  { badge: "older: / newer:", desc: "Filter by date — e.g. older:2022/06/01" },
                ].map(item => (
                  <div key={item.badge} style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                    <span style={{ ...css.badge(G.redLight, "#C5221F", "#F5C6C4"), alignSelf: "flex-start" }}>{item.badge}</span>
                    <p style={{ fontSize: 13, color: G.textSecondary, margin: 0, fontFamily: "'Google Sans', Roboto, Arial, sans-serif" }}>{item.desc}</p>
                  </div>
                ))}
              </Section>
            </>
          )}

          {/* SHARED SECTIONS (both modes) */}

          {/* Unreliable / Deprecated */}
          <Section title="Unreliable / Deprecated Operators" icon={AlertTriangle} theme="grey" warningBadge="⚠ Reference Only">
            <div style={{ gridColumn: "1 / -1", display: "flex", flexDirection: "column", gap: 20 }}>
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, color: "#B05E00", marginBottom: 10, fontFamily: "'Google Sans', Roboto, Arial, sans-serif", display: "flex", alignItems: "center", gap: 6 }}>
                  ⚠ Unreliable — Results may be incomplete or inconsistent
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                  {["inanchor:", "allinanchor:", "loc:", "location:", "daterange:"].map(op => (
                    <span key={op} style={css.badge(G.yellowLight, "#B05E00", "#FDE293")}>{op}</span>
                  ))}
                </div>
              </div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, color: "#C5221F", marginBottom: 10, fontFamily: "'Google Sans', Roboto, Arial, sans-serif" }}>
                  Deprecated — Officially removed, no longer function
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                  {["link:", "info:", "id:", "+ (plus)", "~ (tilde)", "related:", "phonebook:", "blogurl:", "inpostauthor:", "inposttitle:", "#", "filetype:mp3", "filetype:csv"].map(op => (
                    <span key={op} style={{ ...css.badge(G.redLight, "#C5221F", "#F5C6C4"), textDecoration: "line-through" }}>{op}</span>
                  ))}
                </div>
              </div>
            </div>
          </Section>

          {/* Quick Reference */}
          <div style={{ borderRadius: 12, border: `1px solid ${G.border}`, background: G.white, overflow: "hidden", boxShadow: "0 1px 3px rgba(60,64,67,0.06)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: isMobile ? "14px 16px" : "16px 20px", borderBottom: `1px solid #F8F9FA` }}>
              <Layers size={16} style={{ color: G.blue, flexShrink: 0 }} />
              <span style={{ fontSize: isMobile ? 12 : 13, fontWeight: 500, color: G.textSecondary, fontFamily: "'Google Sans', Roboto, Arial, sans-serif", flex: 1 }}>
                Quick Reference — Common Recipes
              </span>
            </div>
            <div style={{ padding: isMobile ? "6px 12px 16px" : "8px 16px 20px", display: "flex", flexDirection: "column" }}>
              {[
                { label: "Find indexing issues", query: "site:example.com -inurl:https" },
                { label: "Find PDFs on a site", query: "site:competitor.com filetype:pdf" },
                { label: "Guest post opportunities", query: 'topic intitle:"write for us" inurl:write-for-us' },
                { label: "Competitor output by year", query: "site:competitor.com after:2023-01-01 before:2023-12-31" },
                { label: "Internal linking opportunities", query: 'site:yoursite.com "target keyword"' },
                { label: "Stats from credible sources", query: "topic research (site:apa.org OR site:psychologytoday.com)" },
                { label: "Find resource pages", query: "[topic] intitle:resources inurl:resources" },
              ].map(r => (
                <div
                  key={r.label}
                  style={{ display: "flex", alignItems: "flex-start", gap: isMobile ? 8 : 12, padding: "10px 4px", borderRadius: 8, transition: "background 0.1s", cursor: "default" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#F8F9FA"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                >
                  <ChevronRight size={14} style={{ color: G.grey, marginTop: 2, flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: isMobile ? 12 : 13, color: G.textSecondary, margin: "0 0 3px", fontFamily: "'Google Sans', Roboto, Arial, sans-serif", fontWeight: 500 }}>
                      {r.label}
                    </p>
                    <button
                      onClick={() => {
                        setSearchText(r.query);
                        if (mode !== "advanced") handleModeChange("advanced");
                        setSfsQuery(""); setSfsFileType("");
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      style={{ fontFamily: "'Roboto Mono', monospace", fontSize: isMobile ? 11 : 12, color: G.blue, background: "none", border: "none", cursor: "pointer", padding: 0, wordBreak: "break-all", textAlign: "left", transition: "color 0.15s" }}
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

          {/* Footer */}
          <div style={{ textAlign: "center", fontSize: 12, color: G.grey, paddingTop: 8, fontFamily: "'Google Sans', Roboto, Arial, sans-serif", lineHeight: 1.8 }}>
            Google Advanced Search Builder · All operators sourced from Google's official documentation
            <div style={{ marginTop: 8 }}>
              Made with ❤️ by{" "}
              <a
                href="https://github.com/Danushka-Madushan/google-advanced-search-builder"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: G.blue, textDecoration: "none" }}
              >
                Danushka Madushan
              </a>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default App;
