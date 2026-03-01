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
Each tool lives in `src/features/{featureName}/` with its own `components/` subfolder:
- `src/features/utmBuilder/` — reference implementation
- `src/features/qrGenerator/` — pending
- `src/features/urlShortener/` — pending (needs backend)
- `src/features/wordCount/` — pending

### Layouts
- `src/layouts/Layout.astro` — the only layout (Header + main slot + Footer)

### Design System
Defined entirely in `src/styles/global.css`. Full token reference in `.claude/skills/design-system/SKILL.md`.

- Default theme: **dark** (`data-theme="dark"` on `<html>`), light mode via `[data-theme="light"]`
- Theme toggle: `document.startViewTransition()` with fallback, stored in `localStorage`
- Fonts: **Sono** (`--ff-headings`), **Inter** (`--ff-body`) — self-hosted in `src/assets/fonts/`
- Feedback colors: `--success-color`, `--warning-color`, `--error-color`

### Pages
| Route | File | Status |
|---|---|---|
| `/` | `src/pages/index.astro` | Landing |
| `/build-utms` | `src/pages/build-utms.astro` | UTM Builder |
| `/qr` | `src/pages/qr.astro` | QR Generator (placeholder) |
| `/shorten-urls` | `src/pages/shorten-urls.astro` | URL Shortener (placeholder) |
| `/word-count` | `src/pages/word-count.astro` | Word Counter (placeholder) |

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

## Skills

- `.claude/skills/design-system/` — qiip.me design tokens and stack conventions. Use when building any UI for this project.
- `.claude/skills/frontend-design/` → symlink to `.agents/skills/frontend-design/` — Anthropic's general frontend design skill. Use for creative/aesthetic direction.
