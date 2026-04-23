# Project Overview: Google Advanced Search Builder

A visual query builder for Google search operators, designed to generate live, shareable search URLs without requiring users to memorize complex operator syntax.

## Tech Stack
- **Framework:** React 19 (Functional Components, Hooks)
- **Language:** TypeScript
- **Build Tool:** Vite 6
- **Icons:** Lucide React
- **Styling:** Vanilla CSS-in-JS (Inline styles) using a custom design system based on official Google color tokens. No external CSS frameworks (Tailwind, Bootstrap, etc.) are used.

## Architecture & Structure
The project follows a modular React architecture:
- `src/App.tsx`: The central application component managing state for search operators, application mode, and URL generation.
- `src/components/`: Reusable UI components (e.g., `InputField`, `Section`, `ActiveChip`).
- `src/utils/queryBuilders.ts`: Pure functions for constructing query strings from operator states.
- `src/constants/index.ts`: Centralized configuration for file types, search operators, and URLs.
- `src/styles/`:
    - `g-color.ts`: Official Google color tokens.
    - `cssHelpers.ts`: Shared style objects and theme configurations.

## Building and Running
- **Development:** `npm run dev`
- **Production Build:** `npm run build` (Type-checks with `tsc` and bundles with `vite`)
- **Linting:** `npm run lint` (ESLint)
- **Preview Production Build:** `npm run preview`

## Development Conventions
1. **Styling:** Adhere to the inline styling pattern using tokens from `src/styles/g-color.ts` and helpers from `src/styles/cssHelpers.ts`. Avoid creating `.css` files unless absolutely necessary.
2. **Type Safety:** Maintain strict TypeScript typing. Interfaces for operators and application modes are defined in `src/types/index.d.ts`.
3. **Components:** Use functional components and hooks (`useState`, `useMemo`, `useCallback`). Ensure components are responsive, utilizing the `useIsMobile` hook where layout shifts are required.
4. **Google Design Language:** Maintain the "Google-esque" aesthetic by using 'Google Sans' (where available), Roboto, and the official palette defined in `g-color.ts`.
5. **Operator Integrity:** All search operators should be validated against documented Google behavior. Unreliable or deprecated operators should be marked clearly in the UI.
