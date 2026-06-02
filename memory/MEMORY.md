# qiip.me - Project Memory

## Stack

- Astro + React (for interactive components) + CSS Modules
- Branch: `testing` (main: `main`)
- Framework: Astro with SSR potential

## Design System (global.css)

- CSS variables for colors, shadows, border-radius (6px)
- Dark mode default (`data-theme="dark"`), light mode via `[data-theme="light"]`
- Fonts: "Sono" (headings), "Inter" (body)
- Primary color: purple `hsla(160, 79%, 39%, 1)`
- `primary-btn` class: transparent bg, hover bg-secondary, active class with purple underline

## Project Structure

- `src/features/` — feature folders (e.g. `utmBuilder/`)
- `src/components/layout/` — Header, Footer
- `src/components/ui/` — shared UI (darkmode toggle)
- `src/pages/` — Astro pages
- `src/styles/global.css` — design tokens + base styles
- `src/global/siteInfo.ts` — site metadata

## Features Planned (4 tools)

1. **UTM Builder** (`/utm`) — form to build URLs with UTM params. Pure frontend.
2. **QR Generator** (`/qr`) — generate QR from URLs. Pure frontend.
3. **URL Shortener** (`/shorten-urls`) — `qiip.me/{name}/{campaign}`. Needs backend/DB.
4. **Character Counter** (`/word-count` or `/contador`) — paste text, get chars/words/reading time/spell check. Pure frontend.

## Current State

- Header nav: Build UTMs, Create QRs, Shorten URLs (no Character Counter yet)
- UTM Builder: page + feature folder exist, but FormUTM.astro is empty
- QR page: placeholder only
- Shorten URLs page: placeholder only
- Character Counter: not started, not in nav

## Key Files

- `src/components/layout/header/Header.astro` — nav links
- `src/styles/global.css` — all design tokens
- `src/layouts/Layout.astro` — base layout
- `src/features/utmBuilder/` — UTM feature folder pattern to follow for other features

## User Preferences

- El usuario está aprendiendo a programar — quiere guía, no soluciones completas
- Ir feature por feature, una a la vez
- URL Shortener va al final, marcar como "coming soon" por ahora

## Patterns

- Feature folder pattern: `src/features/{featureName}/` with components inside
- CSS Modules for component-level styles
- Astro components for static parts, React (`.tsx`) for interactive/stateful parts
- `client:only="react"` for React components that need browser
