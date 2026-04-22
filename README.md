<div align="center">

<img src="https://raw.githubusercontent.com/Danushka-Madushan/google-advanced-search-builder/refs/heads/main/public/favicon.svg" alt="Google Advanced Search Builder" width="72" height="72" />

# Google Advanced Search Builder

**A visual query builder for every Google search operator — generates a live, shareable search URL.**

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=white&labelColor=20232a)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
[![License](https://img.shields.io/badge/License-MIT-34A853?style=flat-square)](LICENSE)

</div>

---

## Overview

Google Advanced Search Builder eliminates the need to memorise operator syntax. Pick your operators from organised, clearly-labelled controls, watch the query string update in real time, then launch straight to Google — or copy the URL to share.

The app ships with two distinct modes:

| Mode | Description |
|---|---|
| **Advanced Search** | Full access to every documented Google search operator across 8 categorised sections |
| **Super File Search** | Specialised open-directory finder using `intitle:index.of` with one-click file-type filtering |

---

## Features

- **Live URL generation** — every keystroke updates the full encoded Google Search URL instantly
- **Active operator chips** — see all active operators at a glance; remove any with a single click
- **8 operator categories** — Basic, Site & Domain, Page Elements, Proximity & Date, Content & Utility, Google Drive, Gmail, Unreliable/Deprecated
- **Super File Search mode** — find open directory listings for any file type with a single search term
- **Quick Recipes panel** — 7 pre-built SEO and research queries you can load in one click
- **Copy or Open** — copy the generated URL to clipboard or open it directly in Google
- **Deprecated reference** — clearly marks unreliable and officially-retired operators so you never waste a query
- **Google design language** — built with the official Google colour palette, Google Sans typography, and familiar interaction patterns

---

## Operator Coverage

<details>
<summary><strong>Basic Operators</strong></summary>

| Operator | Purpose |
|---|---|
| `"phrase"` | Exact match — forces word order, prevents synonyms |
| `OR` / `\|` | Boolean OR across two or more terms |
| `AND` | Explicit AND (Google's default) |
| `-term` | Exclude a word or phrase from results |
| `*` | Wildcard placeholder (up to 5 words) |
| `#..#` | Number range for prices, dates, or measurements |
| `$ / €` | Price search in USD or EUR |
| `X in Y` | Unit and currency conversion |

</details>

<details>
<summary><strong>Site & Domain</strong></summary>

| Operator | Purpose |
|---|---|
| `site:` | Restrict results to a domain or TLD |
| `filetype:` / `ext:` | Return a specific file format (PDF, DOCX, XLSX…) |
| `related:` | Find sites similar to a given domain |

</details>

<details>
<summary><strong>Page Element Operators</strong></summary>

| Operator | Purpose |
|---|---|
| `intitle:` | Word must appear in the page title |
| `allintitle:` | All words must appear in the page title |
| `inurl:` | Word must appear in the URL |
| `allinurl:` | All words must appear in the URL |
| `intext:` | Word must appear in the page body |
| `allintext:` | All words must appear in the page body |
| `inanchor:` | Pages linked with specific anchor text *(unreliable)* |

</details>

<details>
<summary><strong>Proximity & Date</strong></summary>

| Operator | Purpose |
|---|---|
| `AROUND(X)` | Two terms within X words of each other |
| `before:` | Results published before a date |
| `after:` | Results published after a date |

</details>

<details>
<summary><strong>Content & Utility (Google Cards)</strong></summary>

`define:` · `cache:` · `weather:` · `stocks:` · `map:` · `movie:` · `source:`

</details>

<details>
<summary><strong>Google Drive & Gmail</strong></summary>

**Drive:** `type:` · `owner:` · `to:` · `is:starred` · `is:trashed`

**Gmail:** `from:` · `to:` · `cc:` · `bcc:` · `subject:` · `has:attachment` · `has:drive` · `has:document` · `has:youtube` · `larger:` · `smaller:` · `size:` · `is:unread` · `is:read` · `is:important` · `is:snoozed` · `category:` · `label:` · `deliveredto:` · `list:` · `older:` · `newer:`

</details>

---

## Getting Started

**Prerequisites:** Node.js 18+

```bash
# Clone
git clone https://github.com/Danushka-Madushan/google-advanced-search-builder.git
cd google-advanced-search-builder

# Install
npm install

# Run
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

```bash
# Build for production
npm run build
```

---

## Project Structure

```
src/
├── components/
│   ├── ActiveChip.tsx       # Removable operator pill badges
│   ├── InputField.tsx       # Themed text input with label + badge
│   ├── ModeSwitcher.tsx     # Advanced / Super File Search toggle
│   └── Section.tsx          # Collapsible operator category container
├── icons/
│   └── GoogleLogo.tsx       # SVG Google wordmark
├── styles/
│   ├── g-color.ts           # Official Google colour tokens
│   └── cssHelpers.ts        # Shared inline-style helpers
├── utils/
│   └── queryBuilders.ts     # buildQuery + buildSFSQuery functions
├── constants.ts             # GOOGLE_BASE, INITIAL_OPS, FILE_TYPES
├── types.ts                 # SearchOperators, Mode types
└── App.tsx                  # Main application
```

---

## Tech Stack

- **[React 19](https://react.dev)** — UI framework
- **[TypeScript](https://www.typescriptlang.org)** — Static types throughout
- **[Vite](https://vitejs.dev)** — Build tooling
- **[Lucide React](https://lucide.dev)** — Icon system

No CSS framework or UI library dependency — all styling uses inline styles against Google's official colour tokens.

---

## Contributing

Contributions, issues, and feature requests are welcome.

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a pull request

---

## License

Distributed under the MIT License. See [`LICENSE`](LICENSE) for details.

---

<div align="center">

Made with ❤️ by [Danushka Madushan](https://github.com/Danushka-Madushan)

*All operators sourced from Google's official documentation.*

</div>
