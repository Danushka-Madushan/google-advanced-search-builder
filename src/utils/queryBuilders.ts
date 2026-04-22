import type { SearchOperators } from "../types";

const OPEN_DIR_EXCLUSIONS =
  `-inurl:(jsp|pl|php|html|aspx|htm|cf|shtml) intitle:index.of -inurl:(listen77|mp3raid|mp3toss|mp3drug|index_of|index-of|wallywashis|downloadmana)`;

export const buildQuery = (text: string, ops: SearchOperators): string => {
  const parts: string[] = [];
  if (text.trim()) parts.push(text.trim());
  if (ops.exactPhrase.trim()) parts.push(`"${ops.exactPhrase.trim()}"`);
  if (ops.orTerms.trim()) {
    const terms = ops.orTerms.split(/[,|]/).map(t => t.trim()).filter(Boolean);
    if (terms.length > 1) parts.push(`(${terms.join(" OR ")})`);
    else if (terms.length === 1) parts.push(terms[0]);
  }
  if (ops.andTerms.trim()) ops.andTerms.split(",").map(t => t.trim()).filter(Boolean).forEach(t => parts.push(t));
  if (ops.excludeTerms.trim()) ops.excludeTerms.split(",").map(t => t.trim()).filter(Boolean).forEach(t => parts.push(`-${t}`));
  if (ops.numberFrom.trim() && ops.numberTo.trim()) parts.push(`${ops.numberFrom.trim()}..${ops.numberTo.trim()}`);
  if (ops.priceValue.trim() && ops.priceCurrency) parts.push(`${ops.priceCurrency}${ops.priceValue.trim()}`);
  if (ops.site.trim()) parts.push(`site:${ops.site.trim()}`);
  if (ops.related.trim()) parts.push(`related:${ops.related.trim()}`);
  if (ops.filetype.trim()) parts.push(`filetype:${ops.filetype.trim()}`);
  if (ops.intitle.trim()) parts.push(`intitle:${ops.intitle.trim()}`);
  if (ops.allintitle.trim()) parts.push(`allintitle:${ops.allintitle.trim()}`);
  if (ops.inurl.trim()) parts.push(`inurl:${ops.inurl.trim()}`);
  if (ops.allinurl.trim()) parts.push(`allinurl:${ops.allinurl.trim()}`);
  if (ops.intext.trim()) parts.push(`intext:${ops.intext.trim()}`);
  if (ops.allintext.trim()) parts.push(`allintext:${ops.allintext.trim()}`);
  if (ops.inanchor.trim()) parts.push(`inanchor:${ops.inanchor.trim()}`);
  if (ops.aroundTerm1.trim() && ops.aroundTerm2.trim()) parts.push(`${ops.aroundTerm1.trim()} AROUND(${ops.aroundDistance}) ${ops.aroundTerm2.trim()}`);
  if (ops.before.trim()) parts.push(`before:${ops.before.trim()}`);
  if (ops.after.trim()) parts.push(`after:${ops.after.trim()}`);
  if (ops.define.trim()) parts.push(`define:${ops.define.trim()}`);
  if (ops.cache.trim()) parts.push(`cache:${ops.cache.trim()}`);
  if (ops.weather.trim()) parts.push(`weather:${ops.weather.trim()}`);
  if (ops.stocks.trim()) parts.push(`stocks:${ops.stocks.trim()}`);
  if (ops.map.trim()) parts.push(`map:${ops.map.trim()}`);
  if (ops.movie.trim()) parts.push(`movie:${ops.movie.trim()}`);
  if (ops.source.trim()) parts.push(`source:${ops.source.trim()}`);
  if (ops.unitConvert.trim()) parts.push(ops.unitConvert.trim());
  return parts.join(" ");
};

export const buildSFSQuery = (q: string, ft: string): string => {
  const base = q.trim();
  if (!base) return "";
  return ft ? `${base} +(${ft}) ${OPEN_DIR_EXCLUSIONS}` : `${base} ${OPEN_DIR_EXCLUSIONS}`;
};
