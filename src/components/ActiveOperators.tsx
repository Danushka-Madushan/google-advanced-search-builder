import React from 'react';
import { ActiveChip } from './ActiveChip';
import type { SearchOperators } from '../types';

interface Chip {
  label: string;
  key: keyof SearchOperators;
}

interface ActiveOperatorsProps {
  activeOps: Chip[];
  onRemove: (key: keyof SearchOperators) => void;
}

const ActiveOperators: React.FC<ActiveOperatorsProps> = ({ activeOps, onRemove }) => {
  if (activeOps.length === 0) return null;

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, padding: "2px 0" }}>
      {activeOps.map(chip => (
        <ActiveChip
          key={chip.key}
          label={chip.label}
          onRemove={() => onRemove(chip.key)}
        />
      ))}
    </div>
  );
};

export default ActiveOperators;
