# 💎 Premium Pricing Section — Mopara Pair Ayat

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/Vue.js-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white" alt="Vue.js" />
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License" />
</p>

A production-grade, high-converting **SaaS pricing section** for *Mopara Pair Ayat* — built once, shipped everywhere. It pairs deep, ambient visuals with genuinely useful pricing UX (live currency conversion, billing-cycle math, animated counters) so visitors actually understand what they're paying.

The same layout and styling ship in **four stacks** — pick yours and drop it in.

---

## ✨ Features

| Feature | Description |
| :--- | :--- |
| 💎 **Three Pricing Tiers** | `Essential` (entry), `Elite` (most popular), and `Ultimate` (flagship) — each with distinct visual identity. |
| ⚡ **Animated Counters** | Prices count up with an eased `requestAnimationFrame` tween on scroll-reveal and on every billing/currency change. |
| 🔄 **Monthly / Yearly Toggle** | Smooth spring toggle with per-tier "Save 20%" discount and recalculated daily-equivalent pricing. |
| 🌐 **Live Currency Selector** | Glassmorphic dropdown with flag emojis; converts **BDT, USD, EUR, TRY, IRR** with country-correct decimals and formatting. |
| 🎯 **Magnetic CTA** | The flagship button physically pulls toward the cursor (capped at ±15px) for a tactile, high-converting feel. |
| 🌟 **Mouse Spotlight Glow** | A radial light follows the cursor across the Elite & Ultimate cards via CSS variables. |
| 🔥 **Electric Animated Border** | Flagship SVG `feTurbulence` + `feDisplacementMap` border on the Ultimate plan, looping infinitely. |
| 💡 **Feature Tooltips** | Zero-JS CSS tooltips on capability rows for rich context on hover. |
| 💚 **Savings Tracker** | Pulsing coupon-style banner that shows precise yearly savings per currency and re-pulses on change. |
| 👻 **Peer Dimming** | Hovering one card gently dims & desaturates the others using `:has()` for a focused, premium feel. |
| 🌌 **Ambient Background** | Drifting nebula blobs, masked grid overlay, mouse-tracking glow, and an SVG noise texture. |
| 📱 **Fully Responsive** | 3-col → 2-col (with centered flagship) → 1-col, from mobile to ultra-wide. |
| ♿ **Accessible** | `aria-label`, `role="listbox"`/`option`, `aria-expanded` on the currency control; semantic HTML. |

---

## 📂 Project Structure

```
pricing-card-section/
├── html/                 # Vanilla HTML5 + CSS + JS (single file, zero build)
│   └── pricing2.html
├── react/                # React 18 component (JSX + CSS)
│   ├── PricingSection.jsx
│   ├── PricingSection.css
│   └── App.jsx           # usage example
├── vue/                  # Vue 3 (Composition API, <script setup>)
│   ├── PricingSection.vue
│   ├── PricingSection.css
│   └── App.vue           # usage example
├── nextjs/               # Next.js 14 (App Router, TypeScript, 'use client')
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   └── components/
│       ├── PricingSection.tsx
│       └── PricingSection.css
├── .gitignore
└── README.md
```

> **Styling is shared.** Every framework imports the same `PricingSection.css` (the HTML file inlines it). Change the look in one place and all versions stay in sync.

---

## 🚀 Quick Start

### HTML (no build step)
```bash
# Just open the file in a browser
open html/pricing2.html        # macOS
# or double-click html/pricing2.html
```

### React 18
Copy `react/PricingSection.jsx` + `react/PricingSection.css` into `src/components/Pricing`:
```jsx
import PricingSection from './components/Pricing/PricingSection';

export default function App() {
  return <PricingSection />;
}
```

### Vue 3
Copy `vue/PricingSection.vue` + `vue/PricingSection.css` (or `@import` the CSS inside the component) and use it:
```vue
<script setup>
import PricingSection from './PricingSection.vue';
</script>

<template>
  <PricingSection />
</template>
```

### Next.js 14 (App Router)
Copy `nextjs/components/PricingSection.tsx` + `PricingSection.css` into your `components/` folder. The component is already marked `'use client'`:
```tsx
import PricingSection from '@/components/PricingSection';

export default function Page() {
  return <PricingSection />;
}
```

---

## 🎨 Customization

All visual tokens live in CSS variables at the top of the stylesheet:

```css
:root {
  --bg-base: #030303;
  --bg-surface: #0a0a0a;

  /* Tier accents */
  --essential-accent: #e2e8f0;
  --elite-accent: #60a5fa;
  --ult-accent-1: #818cf8;   /* Indigo */
  --ult-accent-2: #38bdf8;   /* Cyan   */
  --ult-accent-3: #c084fc;   /* Purple */

  /* Motion */
  --ease-spring: cubic-bezier(0.175, 0.885, 0.32, 1.15);
  --ease-smooth: cubic-bezier(0.25, 1, 0.5, 1);
}
```

**Where to edit:**
- 💵 **Prices & savings** — the `currencyData` map inside each component (`BDT` / `USD` / `EUR` / `TRY` / `IRR`), or the `data-monthly` / `data-yearly` attributes in the HTML version.
- 🌐 **Add a currency** — add a key to `currencyData` (symbol, `isDecimal`, and the three `plans`) and a `<li>` in the dropdown.
- 🎨 **Accents & glow** — tweak the HSL/hex accent variables; the electric border color is driven by `--electric-border-color` on `.card-wrapper-ultimate`.
- 📐 **Layout** — the grid is `repeat(3, 1fr)` with responsive breakpoints at `1100px`, `968px`, and `768px`.

---

## 🧰 Tech Stack

- **Markup:** Semantic HTML5
- **Styling:** CSS Custom Properties, CSS Grid, Flexbox, `backdrop-filter` glass, SVG `feTurbulence` / `feDisplacementMap` filters, `:has()` peer dimming
- **Logic:** Vanilla JS · React Hooks · Vue Composition API · Next.js Client Component
- **Animation:** `requestAnimationFrame` counters, CSS keyframes, `IntersectionObserver` scroll-reveal, spring cubic-beziers
- **Font:** [Inter](https://fonts.google.com/specimen/Inter) (Google Fonts)

---

## 🌐 Browser Support

Built on modern CSS (`oklch`, `:has()`, `color-mix()`, SVG filters). Targets current evergreen browsers (Chrome/Edge 111+, Safari 16.4+, Firefox 121+). Graceful degradation is not applied for legacy engines.

---

## 📄 License

Distributed under the **MIT License**. Maintained by [Mopara Pair Ayat](https://github.com/Moparapairayat).
