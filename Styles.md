# Style Guide

## Design System Foundation

This project uses Tailwind CSS 4 as its sole styling mechanism. There is no separate design token file — all visual decisions are expressed through Tailwind utility classes directly in HTML and Svelte templates.

Custom CSS is a last resort. If a pattern cannot be expressed with Tailwind utilities, document it here before writing it.

## Tailwind CSS 4 Configuration

All configuration lives in `src/app.css`. There is no `tailwind.config.js`.

```css
@import "tailwindcss";
@custom-variant dark (&:where(.dark, .dark *));
@source "../_layouts/**/*.html";
@source "../_includes/**/*.html";
@source "../_posts/**/*.md";
@source "../_pages/**/*.html";
@source "../_pages/**/*.md";
@source "./components/**/*.svelte";

@theme {
  --color-jam-primary: #3b82f6;
  --color-jam-secondary: #10b981;
  --color-jam-accent: #f59e0b;
  --color-jam-surface: #f8fafc;
  --color-jam-surface-dark: #0f172a;
  --color-jam-text: #0f172a;
  --color-jam-text-dark: #f1f5f9;
  --color-jam-border: #e2e8f0;
  --color-jam-border-dark: #334155;
  --font-heading: "Inter", sans-serif;
  --font-body: "Inter", sans-serif;
}
```

`@custom-variant dark` enables the `.dark` class strategy for manual theme toggling. The `@theme` block defines both light and dark surface/text tokens. These generate utilities like `bg-jam-surface`, `dark:bg-jam-surface-dark`, `text-jam-text`, `dark:text-jam-text-dark`, etc.

## Color Palette

### Light Mode

| Token | Value | Usage |
|-------|-------|-------|
| `jam-primary` | `#3b82f6` (blue-500) | Buttons, links, active states |
| `jam-secondary` | `#10b981` (emerald-500) | Success states, secondary actions |
| `jam-accent` | `#f59e0b` (amber-500) | Highlights, badges, warnings |
| `jam-surface` | `#f8fafc` (slate-50) | Page background, card surfaces |
| `jam-text` | `#0f172a` (slate-900) | Body text, headings |
| `jam-border` | `#e2e8f0` (slate-200) | Card borders, dividers |

### Dark Mode

| Token | Value | Usage |
|-------|-------|-------|
| `jam-surface-dark` | `#0f172a` (slate-900) | Page background, card surfaces |
| `jam-text-dark` | `#f1f5f9` (slate-100) | Body text, headings |
| `jam-border-dark` | `#334155` (slate-700) | Card borders, dividers |

`jam-primary`, `jam-secondary`, and `jam-accent` are shared across both modes. Surface, text, and border tokens have separate light/dark values.

These are starting values. Update this table and `@theme` block together when the palette changes.

## Typography

| Element | Classes | Notes |
|---------|---------|-------|
| Page title (h1) | `text-3xl font-bold font-heading` | One per page |
| Section heading (h2) | `text-2xl font-semibold font-heading` | |
| Subsection (h3) | `text-xl font-medium` | |
| Body text | `text-base font-body leading-relaxed` | Default for `<p>` |
| Small/caption | `text-sm text-slate-500` | Metadata, timestamps |
| Code inline | `font-mono text-sm bg-slate-100 px-1 rounded` | |

## Spacing Scale

Use Tailwind's default spacing scale. Project conventions:

| Context | Spacing | Example |
|---------|---------|---------|
| Section gap | `py-12` or `py-16` | Between major page sections |
| Card padding | `p-6` | Inside card-like containers |
| Element gap in flex/grid | `gap-4` or `gap-6` | Between sibling items |
| Inline element spacing | `space-x-2` | Buttons, tags side by side |

## Component Patterns

### Buttons

```html
<!-- Primary -->
<button class="px-4 py-2 bg-jam-primary text-white rounded-lg hover:bg-blue-600 transition-colors">
  Action
</button>

<!-- Secondary -->
<button class="px-4 py-2 border border-jam-primary text-jam-primary rounded-lg hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors">
  Secondary
</button>

<!-- Ghost -->
<button class="px-4 py-2 text-jam-primary hover:bg-blue-50 dark:hover:bg-slate-800 rounded-lg transition-colors">
  Ghost
</button>
```

### Cards

```html
<div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-jam-border dark:border-jam-border-dark p-6">
  <h3 class="text-xl font-semibold mb-2">Title</h3>
  <p class="text-slate-600 dark:text-slate-300 leading-relaxed">Content here.</p>
</div>
```

### Layout Container

```html
<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
  <!-- Page content -->
</div>
```

### Slider

```html
{% assign slides = site.data.slides[page.lang] %}
{% if slides %}
  <jam-slider data-slides="{{ slides | jsonify | escape }}" autoplay="5000"></jam-slider>
{% endif %}
```

Slider styling is handled inside the `Slider.svelte` component. Background overlays use `bg-black/40` for readability. Navigation arrows use `bg-white/80 dark:bg-slate-800/80` for visibility in both modes.

### Product Card

```html
<div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-jam-border dark:border-jam-border-dark overflow-hidden group">
  <div class="aspect-square overflow-hidden">
    <img src="/assets/img/products/sku001.jpg" alt="Product"
         class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
  </div>
  <div class="p-4">
    <h3 class="font-semibold mb-1">Product Title</h3>
    <p class="text-jam-primary font-bold">299.99 TRY</p>
    <div class="flex flex-wrap gap-1 mt-2">
      <span class="px-2 py-0.5 text-xs bg-jam-accent/10 text-jam-accent rounded-full">tag</span>
    </div>
  </div>
</div>
```

### Tag Badge

```html
<!-- Post tags -->
<span class="px-2 py-1 text-xs bg-jam-primary/10 text-jam-primary rounded-full">svelte</span>

<!-- Product tags -->
<span class="px-2 py-1 text-xs bg-jam-accent/10 text-jam-accent rounded-full">elektronik</span>

<!-- Category badge -->
<span class="px-2 py-1 text-xs bg-jam-secondary/10 text-jam-secondary rounded-full">teknoloji</span>
```

Post tags use `jam-primary`, product tags use `jam-accent`, categories use `jam-secondary`. This visual distinction helps users identify content types.

### Search Modal (Spotlight)

The search modal is rendered by the `jam-search` Svelte component. Key styling decisions:

- Backdrop: `bg-black/50` with `fixed inset-0 z-50`
- Modal: `max-w-xl bg-white dark:bg-slate-800 rounded-2xl shadow-2xl`
- Input area: transparent background, bordered bottom, search icon + ESC kbd hint
- Result items: type badge (colored by content type) + title
- Active item: `bg-jam-primary/10` highlight
- Entrance animation: Motion `opacity: [0, 1], scale: [0.95, 1]` at 150ms

## Responsive Breakpoints

Use Tailwind's default breakpoints. Mobile-first approach:

| Breakpoint | Min width | Usage |
|------------|-----------|-------|
| (default) | 0px | Mobile layout |
| `sm:` | 640px | Small tablets |
| `md:` | 768px | Tablets |
| `lg:` | 1024px | Desktop |
| `xl:` | 1280px | Wide desktop |

## Animation Patterns

All animations use Motion (motion.dev). Do not use CSS `@keyframes` or Svelte `transition:` directives. Simple hover/focus transitions use Tailwind `transition-*` utilities only.

### Entrance Animations (inView)

```js
import { animate, inView } from "motion";

// Fade up — standard entrance for cards, sections
inView(".card", (el) => {
  animate(el, { opacity: [0, 1], y: [20, 0] }, { duration: 0.5, easing: "ease-out" });
});

// Staggered children — list items, grid cards
inView(".card-grid", (el) => {
  animate(el.querySelectorAll(".card"), 
    { opacity: [0, 1], y: [15, 0] }, 
    { delay: stagger(0.1), duration: 0.4 }
  );
});
```

### Scroll-Linked Animations

```js
import { animate, scroll } from "motion";

// Progress bar
scroll(animate(".progress-bar", { scaleX: [0, 1] }));

// Parallax hero
scroll(animate(".hero-bg", { y: [0, -50] }), { target: ".hero" });
```

### Interaction Feedback

For hover/focus/active, prefer Tailwind utilities:

```html
<button class="transition-colors duration-150 hover:bg-blue-600 active:scale-95">
```

For complex interactions (drag, press, gesture), use Motion:

```js
import { animate } from "motion";

animate(element, { scale: 0.95 }, { duration: 0.1 });
```

### Animation Guidelines

| Principle | Rule |
|-----------|------|
| Duration | 150-500ms. Never exceed 800ms. |
| Easing | `ease-out` for entrances, `ease-in-out` for state changes |
| Distance | Translate max 20-30px. Subtle > dramatic. |
| Reduce motion | Respect `prefers-reduced-motion`. Wrap Motion calls in a check. |

```js
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!prefersReduced) {
  animate(el, { opacity: [0, 1], y: [20, 0] });
}
```

### View Transitions (page-to-page)

View Transitions are handled globally in `src/main.js`. Individual pages/components do not need to do anything. To customize which elements morph between pages, use CSS `view-transition-name`:

```css
.site-logo { view-transition-name: logo; }
.page-title { view-transition-name: title; }
```

Elements with matching `view-transition-name` on both pages will morph instead of crossfading.

## Dark Mode

Dark mode uses Tailwind's `@custom-variant dark` with class strategy. The `.dark` class on `<html>` activates all `dark:` utilities.

### Implementation

1. **FOUC prevention**: Inline `<script>` in `<head>` adds `.dark` before any CSS renders
2. **Toggle**: `<jam-theme-toggle>` Svelte component toggles `.dark` class and saves to `localStorage`
3. **Preference chain**: `localStorage` > OS `prefers-color-scheme` > light (default)

### Usage Pattern

Every element with mode-dependent colors must include both light and dark classes:

```html
<div class="bg-jam-surface dark:bg-jam-surface-dark text-jam-text dark:text-jam-text-dark">
  <p class="text-slate-600 dark:text-slate-300">Content</p>
  <div class="border-jam-border dark:border-jam-border-dark">Bordered</div>
</div>
```

### Dark Mode Rules

- Always pair light colors with `dark:` variants: `bg-white dark:bg-slate-800`
- `jam-primary`, `jam-secondary`, `jam-accent` work in both modes without change
- Test every component in both modes before committing
- Interactive states need dark variants too: `hover:bg-blue-50 dark:hover:bg-slate-800`

## Styling Rules

1. **Tailwind utilities only** — No custom CSS classes unless impossible to achieve with utilities.
2. **No inline `style` attributes** — Use Tailwind classes or CSS custom properties via `@theme`.
3. **No `@apply`** — Write utilities directly in markup. `@apply` hides intent and defeats Tailwind's purpose.
4. **Consistent ordering** — Layout → Sizing → Spacing → Typography → Colors → Effects. Example: `flex items-center gap-2 w-full p-4 text-sm text-slate-700 bg-white rounded-lg shadow-sm`.
5. **Svelte components use the same Tailwind classes** — Since `shadow: "none"`, global styles apply. No component-scoped `<style>` blocks unless absolutely necessary.
6. **Motion for animations** — Use `animate`, `inView`, `scroll` from `motion`. No CSS `@keyframes` or Svelte transitions.
7. **Respect reduced motion** — Always check `prefers-reduced-motion` before running Motion animations.
8. **Tailwind transitions for simple states** — `transition-colors`, `transition-transform`, `duration-150` for hover/focus. Motion for everything else.
