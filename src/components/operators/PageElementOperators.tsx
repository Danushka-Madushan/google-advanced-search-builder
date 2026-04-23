import React from 'react';
import { Tag } from "lucide-react";
import { Section } from '../Section';
import { InputField } from '../InputField';
import { G } from '../../styles/g-color';
import type { SearchOperators } from '../../types';

interface PageElementOperatorsProps {
  ops: SearchOperators;
  onOpChange: (key: keyof SearchOperators, val: string | number) => void;
  isMobile: boolean;
}

const PageElementOperators: React.FC<PageElementOperatorsProps> = ({ ops, onOpChange, isMobile }) => {
  return (
    <Section title="Page Element Operators" icon={Tag} theme="blue" isMobile={isMobile}>
      <InputField
        label="Word in Title"
        badge="intitle:"
        value={ops.intitle}
        onChange={v => onOpChange("intitle", v)}
        placeholder="e.g. apple"
        hint="Page title must contain this word"
        themeColor={G.blue}
        themeLight={G.blueLight}
      />
      <InputField
        label="All Words in Title"
        badge="allintitle:"
        value={ops.allintitle}
        onChange={v => onOpChange("allintitle", v)}
        placeholder="e.g. best coffee beans"
        hint="All these words must be in the title"
        themeColor={G.blue}
        themeLight={G.blueLight}
      />
      <InputField
        label="Word in URL"
        badge="inurl:"
        value={ops.inurl}
        onChange={v => onOpChange("inurl", v)}
        placeholder="e.g. author/joshua"
        hint="This word must appear in the URL"
        monospace
        themeColor={G.blue}
        themeLight={G.blueLight}
      />
      <InputField
        label="All Words in URL"
        badge="allinurl:"
        value={ops.allinurl}
        onChange={v => onOpChange("allinurl", v)}
        placeholder="e.g. microsoft office support"
        hint="All these words must be in the URL"
        monospace
        themeColor={G.blue}
        themeLight={G.blueLight}
      />
      <InputField
        label="Word in Body Text"
        badge="intext:"
        value={ops.intext}
        onChange={v => onOpChange("intext", v)}
        placeholder="e.g. quantum"
        hint="This word must appear in the page body"
        themeColor={G.blue}
        themeLight={G.blueLight}
      />
      <InputField
        label="All Words in Body"
        badge="allintext:"
        value={ops.allintext}
        onChange={v => onOpChange("allintext", v)}
        placeholder="e.g. ingredients flour water salt"
        hint="All these words must be in page body"
        themeColor={G.blue}
        themeLight={G.blueLight}
      />
      <InputField
        label="Anchor Text in Backlinks"
        badge="inanchor:"
        value={ops.inanchor}
        onChange={v => onOpChange("inanchor", v)}
        placeholder="e.g. apple"
        hint="⚠ Hit-and-miss — inconsistent results"
        themeColor={G.blue}
        themeLight={G.blueLight}
      />
    </Section>
  );
};

export default PageElementOperators;
