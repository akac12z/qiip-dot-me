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
- **`src/styles/typo.css`** — typography base styles

### Path Aliases (tsconfig.json)

| Alias             | Resolves to                       |
| ----------------- | --------------------------------- |
| `@/*`             | `src/*`                           |
| `@/icons/*`       | `src/components/icons/*`          |
| `@/ui/*`          | `src/components/ui/*`             |
| `@/layout/*`      | `src/components/layout/*`         |
| `@/seo/*`         | `src/components/seo/*`            |
| `@/home/*`        | `src/features/home/*`             |
| `@/utms/*`        | `src/features/utms/*`             |
| `@/qr/*`          | `src/features/qr/*`               |
| `@/wordCounter/*` | `src/features/wordCount/*`        |
| `@/shortenUrls/*` | `src/features/urlShortener/*`     |

### Feature Folder Pattern

Each tool lives in `src/features/{featureName}/` with subfolders:

- `components/` — React + Astro UI components, one shared CSS module (`*.module.css`)
- `hooks/` — custom React hooks (state + logic, e.g. `useUTMBuilder.ts`)
- `rules/` — pure domain: interfaces (`*.interfaces.ts`), constants/config, domain logic
- `seo/` — optional per-feature Astro SEO head component (e.g. `HeadUTM.astro`)

Reference implementation: `src/features/utms/`

Current features:

| Feature         | Folder                       | Status              |
| --------------- | ---------------------------- | ------------------- |
| UTM Builder     | `src/features/utms/`         | Live                |
| QR Generator    | `src/features/qr/`           | Live                |
| Word Counter    | `src/features/wordCount/`    | Live                |
| URL Shortener   | `src/features/urlShortener/` | Pending (needs backend) |

### Registering a New Tool

All tools are declared in `src/components/layout/home/tools/tools.ts`. Adding an entry there automatically wires up the homepage cards and header menu. Steps:

1. Pick a short tag (e.g. `"su"` for URL Shortener).
2. Add `--tool-{tag}: #color;` to `src/styles/global.css`.
3. Extend the `ToolTag` union in `tools.ts` with the new tag literal.
4. Add the entry to the `TOOLS` array. Set `onAir: false` for coming-soon tools (renders a "Coming Soon" badge instead of a live link). The `href` field must exactly match the page route — `HeroTool.astro` resolves tool metadata by matching `href` at runtime.

### Global Constants

`src/global/siteInfo.ts` — site-wide metadata (name, description, URLs). Import from here rather than hardcoding strings.

### Layouts

`src/layouts/Layout.astro` — the only layout (Header + main slot + Footer).

### Pages

| Route           | File                           | Status       |
| --------------- | ------------------------------ | ------------ |
| `/`             | `src/pages/index.astro`        | Landing      |
| `/utm`          | `src/pages/utm.astro`          | UTM Builder  |
| `/qr`           | `src/pages/qr.astro`           | QR Generator |
| `/word-count`   | `src/pages/word-count.astro`   | Word Counter |
| `/shorten-urls` | `src/pages/shorten-urls.astro` | URL Shortener (placeholder) |

### Design System

Defined entirely in `src/styles/global.css`. Full token reference in `.claude/skills/design-system/SKILL.md`.

- Default theme: **dark** (`data-theme="dark"` on `<html>`), light mode via `[data-theme="light"]`
- Theme toggle: `document.startViewTransition()` with fallback, stored in `localStorage`
- Fonts: **Sono** (`--ff-headings`), **Inter** (`--ff-body`) — self-hosted in `src/assets/fonts/`
- Feedback colors: `--success-color`, `--warning-color`, `--error-color`

## Astro-specific patterns

### Scripts with ClientRouter

This project uses Astro's `<ClientRouter />` (View Transitions). Scripts in components must wrap their logic in `astro:page-load` to re-run on every navigation:

```ts
document.addEventListener("astro:page-load", () => {
	// DOM is ready here, both on initial load and after navigation
});
```

### CSS Modules + JavaScript class toggling

CSS Modules hashes class names, so `classList.toggle("open")` won't find `.open` from a module. Use `:global()` for any class toggled by JS:

```css
/* In the CSS Module */
.element:global(.open) { ... }
```

```ts
// In the script
element.classList.toggle("open");
```

Attribute selectors (`[aria-expanded="true"]`, `[data-*]`) work fine in CSS Modules without `:global()`.

### Cross-tool Data Passing

Tools communicate via URL params + `sessionStorage`. Example: UTM Builder calls `navigate('/qr?url=…')` and also writes `sessionStorage.setItem("qr-prefill", url)`; QR Generator reads the `url` query param on mount via `new URLSearchParams(window.location.search)`. Follow this pattern for any future tool-to-tool handoff.

## Skills

- `.claude/skills/design-system/` — qiip.me design tokens and stack conventions. Use when building any UI for this project.
- `.claude/skills/frontend-design/` → symlink to `.agents/skills/frontend-design/` — Anthropic's general frontend design skill. Use for creative/aesthetic direction.
