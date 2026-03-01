# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev        # Start dev server
pnpm build      # Build for production
pnpm preview    # Preview production build
```

No linter or test runner is configured.

## Architecture

**qiip.me** is an Astro 5 site with React for interactive components, deployed on Vercel. It's a collection of frontend tools (UTM builder, QR generator, URL shortener, word counter).

### Tech Stack
- **Astro** — pages, layouts, static components
- **React (.tsx)** — interactive/stateful components only, always with `client:only="react"`
- **CSS Modules** — component-level styles (colocated with components)
- **`src/styles/global.css`** — global design tokens (CSS variables) and base styles

### Path Aliases (tsconfig.json)
| Alias | Resolves to |
|---|---|
| `@/*` | `src/*` |
| `@/icons/*` | `src/components/icons/*` |
| `@/ui/*` | `src/components/ui/*` |
| `@/layout/*` | `src/components/layout/*` |
| `@/seo/*` | `src/components/seo/*` |
| `@/utmBuilder/*` | `src/features/utmBuilder/*` |

### Feature Folder Pattern
Each tool lives in `src/features/{featureName}/` with its own `components/` subfolder. The `utmBuilder/` feature is the reference implementation to follow for new features.

### Layouts
- `src/layouts/Layout.astro` — the only layout (Header + main slot + Footer)

### Design System
Defined entirely in `src/styles/global.css`:
- Default theme is **dark** (`data-theme="dark"` on `<html>`), light mode via `[data-theme="light"]`
- Theme toggling uses `document.startViewTransition()` (with fallback), persisted to `localStorage`
- Fonts: **Sono** (headings, `--ff-headings`), **Inter** (body, `--ff-body`) — self-hosted in `src/assets/fonts/`
- Primary accent color: `--primary-color` (green tones; dark/light values differ slightly)
- Shared button style: `.primary-btn` class (global); `.active` state shows a `--primary-color` underline
- Border radius: `--border-radius: 6px`

### Pages
| Route | File | Status |
|---|---|---|
| `/` | `src/pages/index.astro` | Landing |
| `/build-utms` | `src/pages/build-utms.astro` | UTM Builder |
| `/qr` | `src/pages/qr.astro` | QR Generator (placeholder) |
| `/shorten-urls` | `src/pages/shorten-urls.astro` | URL Shortener (placeholder) |
| `/word-count` | `src/pages/word-count.astro` | Word Counter (pending) |
