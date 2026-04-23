import React from 'react';
import { Globe } from "lucide-react";
import { Section } from '../Section';
import { InputField } from '../InputField';
import { G } from '../../styles/g-color';
import type { SearchOperators } from '../../types';

interface SiteDomainOperatorsProps {
  ops: SearchOperators;
  onOpChange: (key: keyof SearchOperators, val: string | number) => void;
  isMobile: boolean;
}

const SiteDomainOperators: React.FC<SiteDomainOperatorsProps> = ({ ops, onOpChange, isMobile }) => {
  return (
    <Section title="Site & Domain" icon={Globe} theme="green" isMobile={isMobile}>
      <InputField
        label="Limit to Site / Domain"
        badge="site:"
        value={ops.site}
        onChange={v => onOpChange("site", v)}
        placeholder="e.g. nasa.gov or .edu"
        hint="Restrict results to a specific site or TLD"
        monospace
        themeColor={G.green}
        themeLight={G.greenLight}
      />
      <InputField
        label="File Type"
        badge="filetype:"
        value={ops.filetype}
        onChange={v => onOpChange("filetype", v)}
        placeholder="e.g. pdf, docx, xlsx, pptx"
        hint="Return specific file format results"
        monospace
        themeColor={G.green}
        themeLight={G.greenLight}
      />
      <InputField
        label="Related Sites"
        badge="related:"
        value={ops.related}
        onChange={v => onOpChange("related", v)}
        placeholder="e.g. nytimes.com"
        hint="Find sites similar to this domain"
        monospace
        themeColor={G.green}
        themeLight={G.greenLight}
      />
    </Section>
  );
};

export default SiteDomainOperators;
