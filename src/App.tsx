import React, { useState, useMemo, useCallback } from "react";

import type { SearchOperators, Mode } from "./types";
import { GOOGLE_BASE, INITIAL_OPS } from "./constants";
import { buildQuery, buildSFSQuery } from "./utils/queryBuilders";
import { useIsMobile } from './hooks/useIsMobile';

/* Components */
import Header from './components/Header';
import Footer from './components/Footer';
import Toolbar from './components/Toolbar';
import ActiveOperators from './components/ActiveOperators';
import URLPanel from './components/URLPanel';
import SuperFileSearch from './components/SuperFileSearch';
import AdvancedSearchBar from './components/AdvancedSearchBar';
import QuickReference from './components/QuickReference';
import DeprecatedOperators from './components/DeprecatedOperators';

/* Operator Groups */
import BasicOperators from './components/operators/BasicOperators';
import SiteDomainOperators from './components/operators/SiteDomainOperators';
import PageElementOperators from './components/operators/PageElementOperators';
import ProximityDateOperators from './components/operators/ProximityDateOperators';
import ContentUtilityOperators from './components/operators/ContentUtilityOperators';
import ExternalToolOperators from './components/operators/ExternalToolOperators';

/* App */
const App: React.FC = () => {
  const isMobile = useIsMobile();

  const [searchText, setSearchText] = useState<string>("");
  const [ops, setOpsState] = useState<SearchOperators>(INITIAL_OPS);
  const [sfsQuery, setSfsQuery] = useState<string>("");
  const [sfsFileType, setSfsFileType] = useState<string>("");
  const [mode, setMode] = useState<Mode>("super");
  const [copied, setCopied] = useState<boolean>(false);

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
    setSearchText("");
    setOpsState(INITIAL_OPS);
    setSfsQuery("");
    setSfsFileType("");
    setMode(newMode);
  };

  /* Active chips (advanced mode only) */
  const activeOps = useMemo(() => {
    if (mode !== "advanced") return [];
    const chips: { label: string; key: keyof SearchOperators }[] = [];

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
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleReset = () => {
    setSearchText("");
    setOpsState(INITIAL_OPS);
    setSfsQuery("");
    setSfsFileType("");
  };

  const handleSearch = () => {
    if (query.trim()) window.open(GOOGLE_BASE + encodeURIComponent(query), "_blank");
  };

  const handleRecipeClick = (recipeQuery: string) => {
    setSearchText(recipeQuery);
    if (mode !== "advanced") handleModeChange("advanced");
    setSfsQuery("");
    setSfsFileType("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ─ Render ─ */
  return (
    <div style={{ background: "#F8F9FA", minHeight: "100vh", fontFamily: "'Google Sans', Roboto, Arial, sans-serif" }}>
      <div style={{
        maxWidth: 900,
        margin: "0 auto",
        padding: isMobile ? "24px 16px 32px" : "48px 24px 30px",
        display: "flex",
        flexDirection: "column",
        gap: isMobile ? 12 : 16,
      }}>

        <Header isMobile={isMobile} />

        <Toolbar
          isMobile={isMobile}
          mode={mode}
          onModeChange={handleModeChange}
          onReset={handleReset}
        />

        {mode === "advanced" && (
          <AdvancedSearchBar
            isMobile={isMobile}
            searchText={searchText}
            onSearchTextChange={setSearchText}
            onSearch={handleSearch}
            canSearch={!!query.trim()}
          />
        )}

        <ActiveOperators
          activeOps={activeOps}
          onRemove={(key) => setOp(key, "")}
        />

        <URLPanel
          isMobile={isMobile}
          query={query}
          onCopy={handleCopy}
          onSearch={handleSearch}
          copied={copied}
        />

        {mode === "super" && (
          <SuperFileSearch
            isMobile={isMobile}
            sfsQuery={sfsQuery}
            sfsFileType={sfsFileType}
            onQueryChange={setSfsQuery}
            onFileTypeChange={setSfsFileType}
            onSearch={handleSearch}
          />
        )}

        {mode === "advanced" && (
          <>
            <BasicOperators isMobile={isMobile} ops={ops} onOpChange={setOp} />
            <SiteDomainOperators ops={ops} onOpChange={setOp} isMobile={isMobile} />
            <PageElementOperators ops={ops} onOpChange={setOp} isMobile={isMobile} />
            <ProximityDateOperators isMobile={isMobile} ops={ops} onOpChange={setOp} />
            <ContentUtilityOperators ops={ops} onOpChange={setOp} isMobile={isMobile} />
            <ExternalToolOperators isMobile={isMobile} />
          </>
        )}

        <DeprecatedOperators isMobile={isMobile} />

        <QuickReference
          isMobile={isMobile}
          onRecipeClick={handleRecipeClick}
        />

        <Footer />

      </div>
    </div>
  );
};

export default App;
