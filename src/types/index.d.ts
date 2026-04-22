import { LucideIcon } from "lucide-react";

export interface SearchOperators {
  exactPhrase: string;
  orTerms: string;
  andTerms: string;
  excludeTerms: string;
  numberFrom: string;
  numberTo: string;
  priceValue: string;
  priceCurrency: string;
  site: string;
  related: string;
  filetype: string;
  intitle: string;
  allintitle: string;
  inurl: string;
  allinurl: string;
  intext: string;
  allintext: string;
  inanchor: string;
  aroundTerm1: string;
  aroundTerm2: string;
  aroundDistance: number;
  before: string;
  after: string;
  define: string;
  cache: string;
  weather: string;
  stocks: string;
  map: string;
  movie: string;
  source: string;
  unitConvert: string;
}

export type Mode = "super" | "advanced";

export interface FileTypeConfig {
  label: string;
  value: string;
  Icon: LucideIcon;
}

export interface SectionTheme {
  dot: string;
  hoverBg: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
}
