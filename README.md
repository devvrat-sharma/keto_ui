# ✦ Keto UI

**Ultralight glass-era components for the modern web.**

Apple-inspired frosted translucency, bouncy spring animations, and variable-driven theming — under 15 KB with zero dependencies.

```html
<link rel="stylesheet" href="keto.css">
<script src="keto.js" defer></script>
```

## Features

- **Frosted Glass Design** — `backdrop-filter` + RGBA surfaces on every component
- **Semantic & Classless** — styles `<button>`, `<dialog>`, `<table>` directly via native elements and `data-*` attributes
- **Variable-Driven Theming** — override `--k-*` CSS tokens to re-skin everything
- **Dark Mode** — automatic via `prefers-color-scheme`, manual via `data-theme="dark"`
- **Web Components** — `<k-tabs>`, `<k-dropdown>`, `<k-accordion>` with keyboard navigation
- **Zero Dependencies** — no runtime deps, no build tools required

## Install

### CDN (jsDelivr)

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ketoui@0.1.2/dist/keto.min.css">
<script src="https://cdn.jsdelivr.net/npm/ketoui@0.1.2/dist/keto.js" defer></script>
```

### CDN (unpkg)

```html
<link rel="stylesheet" href="https://unpkg.com/ketoui@0.1.2/dist/keto.min.css">
<script src="https://unpkg.com/ketoui@0.1.2/dist/keto.js" defer></script>
```

Use `@latest` only for demos:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ketoui@latest/dist/keto.min.css">
<script src="https://cdn.jsdelivr.net/npm/ketoui@latest/dist/keto.js" defer></script>
```

### npm

```bash
npm install ketoui
```

Pin a specific version:

```bash
npm install ketoui@0.1.2
```

## Updating Docs/CDN After Each Release

When you publish a new version, update version-pinned links in docs:

1. Bump and publish:
```bash
npm version patch
npm publish --access public
```
2. Replace `@0.1.2` with the new version in:
   - `README.md`
   - `docs/index.html`
3. Keep a separate `@latest` snippet for quick-start demos.

## Components

| Component | Type | Usage |
|-----------|------|-------|
| Typography | CSS | `<h1>` through `<h6>`, `<p>`, `<code>`, `<blockquote>` |
| Button | CSS | `<button>`, `data-variant="secondary|danger|outline|ghost"` |
| Card | CSS | `<article>` with `<header>`, `<section>`, `<footer>` |
| Dialog | CSS+JS | `<dialog>` with `data-modal-open`, `data-modal-close` |
| Form | CSS | `<input>`, `<select>`, `<textarea>`, `.switch` toggle |
| Alert | CSS | `role="alert"` with `data-type="success|warning|danger"` |
| Badge | CSS | `data-badge="success|warning|danger|info|secondary"` |
| Table | CSS | `<table>` with `data-striped`, `.table-wrap` |
| Progress | CSS | `<progress>` with `data-variant` |
| Tooltip | CSS | `data-tooltip="text"`, `data-tooltip-pos="bottom|right"` |
| Tabs | WC | `<k-tabs>` with `slot="tab"` / `slot="panel"` |
| Dropdown | WC | `<k-dropdown>` with `slot="trigger"` / `slot="menu"` |
| Accordion | WC | `<k-accordion>` with `<details>`, `data-exclusive` |
| Toast | JS | `Keto.toast('message', { type, duration })` |
| Spinner | CSS | `.spinner`, `.spinner-sm`, `.spinner-lg` |
| Skeleton | CSS | `.skeleton`, `.skeleton-text`, `.skeleton-circle` |
| Grid | CSS | `.grid`, `.grid-2`, `.grid-3`, `.grid-4`, `.grid-auto` |

## Theming

Keto is fully themeable via CSS custom properties. Override `--k-*` tokens on `:root` and every component re-skins itself.

### Built-in presets

Keto ships with 5 ready-made themes you can try on the [docs page](docs/index.html): **Default**, **Rose Gold**, **Midnight**, **Forest**, and **Ocean**.

### Create your own theme

Three layers to customize — you only need to touch what you want to change:

**1. Accent color** — the primary action color used by buttons, links, badges, and focus rings:

```css
:root {
  --k-primary: #7c3aed;
  --k-primary-hover: #6d28d9;
  --k-primary-active: #5b21b6;
  --k-primary-fg: #ffffff;
  --k-primary-light: rgba(124, 58, 237, 0.1);
}
```

**2. Surface palette** — background, text, and border colors. For light themes, tint `--k-bg` toward your accent. For dark themes, use deep values and invert glass opacities:

```css
:root {
  --k-bg: #faf5ff;
  --k-surface: rgba(255, 255, 255, 0.75);
  --k-text: #2e1065;
  --k-text-sec: #6b21a8;
  --k-text-ter: #a78bfa;
  --k-border: rgba(124, 58, 237, 0.1);
}
```

**3. Glass layer** — controls every translucent panel (cards, dialogs, dropdowns, tooltips, navbar):

```css
:root {
  --k-glass-bg: rgba(255, 255, 255, 0.7);
  --k-glass-bg-heavy: rgba(255, 255, 255, 0.88);
  --k-glass-border: rgba(124, 58, 237, 0.12);
  --k-glass-shadow: 0 8px 32px rgba(124, 58, 237, 0.06);
}
```

### Runtime theming (JavaScript)

Switch or extend themes dynamically:

```js
function setTheme(vars) {
  const s = document.documentElement.style;
  Object.entries(vars).forEach(([k, v]) => s.setProperty(k, v));
}

setTheme({
  '--k-primary': '#f97316',
  '--k-bg': '#fff7ed',
  '--k-text': '#431407',
});

// Reset to defaults
function resetTheme(keys) {
  keys.forEach(k => document.documentElement.style.removeProperty(k));
}
```

### Dark mode

```html
<!-- Auto — follows system preference (default) -->
<html>

<!-- Force dark -->
<html data-theme="dark">

<!-- Force light -->
<html data-theme="light">
```

### Scoped themes

Theme any section independently by scoping variables to a container:

```css
.dark-panel {
  --k-primary: #818cf8;
  --k-bg: #0f0e1a;
  --k-text: #f5f5f7;
  --k-glass-bg: rgba(22, 20, 38, 0.65);
  --k-glass-border: rgba(255, 255, 255, 0.1);
  background: var(--k-bg);
  color: var(--k-text);
}
```

### Key tokens

| Token | Default | Purpose |
|-------|---------|---------|
| `--k-primary` | `#007AFF` | Accent color |
| `--k-primary-hover` | `#0066D6` | Accent hover state |
| `--k-primary-fg` | `#ffffff` | Text on accent backgrounds |
| `--k-primary-light` | `rgba(0,122,255,0.1)` | Tinted badge/alert backgrounds |
| `--k-bg` | `#F5F5F7` | Page background |
| `--k-surface` | `rgba(255,255,255,0.75)` | Card/table surface |
| `--k-text` | `#1d1d1f` | Primary text |
| `--k-text-sec` | `#86868b` | Secondary text |
| `--k-text-ter` | `#a1a1a6` | Tertiary/placeholder text |
| `--k-glass-bg` | `rgba(255,255,255,0.65)` | Glass panel background |
| `--k-glass-border` | `rgba(255,255,255,0.4)` | Glass panel border |
| `--k-glass-blur` | `24px` | Backdrop blur amount |
| `--k-glass-shadow` | `0 8px 32px rgba(0,0,0,0.08)` | Glass panel shadow |
| `--k-rad` | `10px` | Default border radius |
| `--k-rad-lg` | `14px` | Large radius (cards, inputs) |
| `--k-rad-xl` | `20px` | XL radius (dialogs, panels) |
| `--k-trans` | `0.2s ease` | Default transition |
| `--k-success` | `#34C759` | Success color |
| `--k-warning` | `#FF9500` | Warning color |
| `--k-danger` | `#FF3B30` | Danger color |
| `--k-info` | `#5AC8FA` | Info color |

## Browser Support

Keto requires `backdrop-filter` support (all modern browsers). Gracefully degrades to solid backgrounds in older browsers.

## License

MIT — Devvrat Sharma
