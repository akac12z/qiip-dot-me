---
name: design-system
description: Use alongside frontend-design when building UI for qiip.me. Provides the project's design tokens, stack constraints, and visual conventions so all output stays consistent with the existing codebase.
---

# qiip.me — Design System

## Stack constraints

- **Astro** for structural/static components (`.astro`)
- **React** (`.tsx`) only when state or browser interactivity is needed — always `client:only="react"`
- **CSS Modules** for component styles, colocated with the component
- **`src/styles/global.css`** is the only global stylesheet — never create new ones

## Fonts

| Role             | Family | Variable        |
| ---------------- | ------ | --------------- |
| Headings (h1–h6) | Sono   | `--ff-headings` |
| Body text        | Inter  | `--ff-body`     |

Both are self-hosted in `src/assets/fonts/`. Never load external font sources.

## Color tokens

All defined in `src/styles/global.css`. Always use variables — never hardcode values.

**Backgrounds**

```
--bg      page background
--surface-1    large area differentiation
--surface-2     interactive elements at rest
--surface-3     floating / overlapping elements
--bg-card         content containers
```

**Text**

```
--fg    headings
--fg-2  body text
--fg-3   secondary info
--fg-muted      placeholders
```

**Borders**

```
--border    standard
--border-2    hover
--border-focus    active / focus
--r-xs   6px — all rounded corners
```

**Accent**

```
--accent   green — active states, underlines, selection highlight
```

**Feedback**

```
--success-color
--success-color-hover
```

**Shadows**

```
--shadow-sm    buttons
--shadow-md    cards
--shadow-lg    dialogs / modals
```

**Glass**

```
--glass-bg      frosted glass background
--glass-border  frosted glass border
```

## Animation tokens

```
--timer-05s    short transitions
--timer-2s     longer transitions
--ease   cubic-bezier(0.4, 0, 0.2, 1)
```

Always use `--ease` for transition timing. Never use `ease`, `linear`, or arbitrary bezier values.

## Global utility classes

From `global.css` — use before writing custom CSS.

## Typography scale

```
h1 1.8rem  h2 1.5rem  h3 1.25rem
h4 1rem    h5 0.875rem  h6 0.85rem
```

## Theme system

- Default theme: **dark** (`data-theme="dark"` on `<html>`)
- Light mode: `[data-theme="light"]` — all tokens already have light values in `global.css`
- Toggle: stored in `localStorage` as `"light"` or `"dark"`, applied via `document.documentElement.dataset.theme`
- Transitions: use `document.startViewTransition()` with a synchronous fallback

## Component checklist

1. One `.module.css` per component, colocated
2. Colors, spacing, radio from tokens only
3. Hover/focus → `--border-2` / `--border-focus`
4. Mount animation → `.au` class or the `fadeUp` keyframe
5. Floating elements → `--glass-bg` + `--glass-border` + `--shadow-lg`
