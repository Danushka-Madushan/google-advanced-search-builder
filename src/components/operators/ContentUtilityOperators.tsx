import React from 'react';
import { Zap } from "lucide-react";
import { Section } from '../Section';
import { InputField } from '../InputField';
import { G } from '../../styles/g-color';
import type { SearchOperators } from '../../types';

interface ContentUtilityOperatorsProps {
  ops: SearchOperators;
  onOpChange: (key: keyof SearchOperators, val: string | number) => void;
  isMobile: boolean;
}

const ContentUtilityOperators: React.FC<ContentUtilityOperatorsProps> = ({ ops, onOpChange, isMobile }) => {
  return (
    <Section title="Content & Utility Operators" icon={Zap} theme="red" isMobile={isMobile}>
      <InputField
        label="Dictionary Definition"
        badge="define:"
        value={ops.define}
        onChange={v => onOpChange("define", v)}
        placeholder="e.g. entrepreneur"
        hint="Triggers Google dictionary card"
        themeColor={G.red}
        themeLight={G.redLight}
      />
      <InputField
        label="Cached Page"
        badge="cache:"
        value={ops.cache}
        onChange={v => onOpChange("cache", v)}
        placeholder="e.g. apple.com"
        hint="Shows Google's cached version of a page"
        monospace
        themeColor={G.red}
        themeLight={G.redLight}
      />
      <InputField
        label="Weather"
        badge="weather:"
        value={ops.weather}
        onChange={v => onOpChange("weather", v)}
        placeholder="e.g. london"
        hint="Shows weather forecast card"
        themeColor={G.red}
        themeLight={G.redLight}
      />
      <InputField
        label="Stock Info"
        badge="stocks:"
        value={ops.stocks}
        onChange={v => onOpChange("stocks", v)}
        placeholder="e.g. GOOGL"
        hint="Shows stock ticker card"
        monospace
        themeColor={G.red}
        themeLight={G.redLight}
      />
      <InputField
        label="Map"
        badge="map:"
        value={ops.map}
        onChange={v => onOpChange("map", v)}
        placeholder="e.g. silicon valley"
        hint="Forces map results for a location"
        themeColor={G.red}
        themeLight={G.redLight}
      />
      <InputField
        label="Movie Info"
        badge="movie:"
        value={ops.movie}
        onChange={v => onOpChange("movie", v)}
        placeholder="e.g. oppenheimer"
        hint="Shows movie showtimes and info"
        themeColor={G.red}
        themeLight={G.redLight}
      />
      <InputField
        label="News Source"
        badge="source:"
        value={ops.source}
        onChange={v => onOpChange("source", v)}
        placeholder="e.g. the_verge"
        hint="Limits Google News to a specific source"
        monospace
        themeColor={G.red}
        themeLight={G.redLight}
      />
    </Section>
  );
};

export default ContentUtilityOperators;
