<div align="center">

<!-- Animated Header Banner -->
<a href="https://github.com/Moparapairayat/pricing-card-section">
  <img src="https://readme-typing-svg.herokuapp.com?font=Inter&weight=800&size=32&duration=3000&pause=1000&color=8B5CF6&center=true&vCenter=true&width=800&height=70&lines=💎+Ultra-Premium+SaaS+Pricing+Engine;⚡+Built+Once.+Shipped+Everywhere.;🚀+React+%C2%B7+Vue+%C2%B7+Next.js+%C2%B7+Svelte+%C2%B7+Astro+%C2%B7+HTML5" alt="Typing Banner" />
</a>

<p align="center">
  <strong>Crafted for Modern Web Apps · Linear & Apple Inspired Dark Aesthetic</strong>
</p>

<!-- Animated Badges Bar -->
<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/React_18-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/Vue_3-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white" alt="Vue.js" />
  <img src="https://img.shields.io/badge/Next.js_14-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/Svelte_4%2F5-FF3E00?style=for-the-badge&logo=svelte&logoColor=white" alt="Svelte" />
  <img src="https://img.shields.io/badge/Astro-BC52EE?style=for-the-badge&logo=astro&logoColor=white" alt="Astro" />
</p>

<!-- Live Status Badges -->
<p align="center">
  <img src="https://img.shields.io/github/license/Moparapairayat/pricing-card-section?style=for-the-badge&color=8b5cf6" alt="License" />
  <img src="https://img.shields.io/github/last-commit/Moparapairayat/pricing-card-section?style=for-the-badge&color=38bdf8" alt="Last Commit" />
  <img src="https://img.shields.io/badge/Build-Passing-10b981?style=for-the-badge&logo=githubactions&logoColor=white" alt="Build" />
</p>

---

</div>

## 🌌 Architectural Overview

> [!NOTE]
> **Single Source of Styling Truth**: All six framework components import the **exact same CSS design system** (`PricingSection.css`). Edit design tokens once, and every stack automatically stays 100% in sync!

```
                            ┌───────────────────────────────────────────────┐
                            │   Shared CSS Core (PricingSection.css)       │
                            │   · Design Tokens & Variables                 │
                            │   · Glassmorphism & Shimmer Effects           │
                            │   · SVG Displacement Filter               │
                            └───────────────────────┬───────────────────────┘
                                                    │
             ┌─────────────────┬────────────────────┼────────────────────┬─────────────────┐
             ▼                 ▼                    ▼                    ▼                 ▼
      ┌─────────────┐   ┌─────────────┐      ┌─────────────┐      ┌─────────────┐   ┌─────────────┐
      │  HTML5/JS   │   │  React 18   │      │   Vue 3     │      │ Next.js 14  │   │ Svelte 4/5  │   ┌─────────────┐
      │ pricing2.html │ │ PricingSection│   │ PricingSection│     │ PricingSection│  │ PricingSection│ │ Astro Island│
      └─────────────┘   └─────────────┘      └─────────────┘      └─────────────┘   └─────────────┘   └─────────────┘
```

---

## 🔥 Next-Gen Interactive Features

| Icon | Feature | Animated Behavior & Capabilities |
| :---: | :--- | :--- |
| ⚡ | **1500ms Count-Up Animation** | Eased `requestAnimationFrame` tween counts up from `0` on initial load (1500ms) and animates over `800ms` during currency/billing toggle. |
| 🧲 | **Magnetic CTA Button** | Interactive physics math pulls the flagship button towards the cursor proximity (`±15px`) for tactile engagement. |
| ✨ | **Shimmer Light Sweep** | Smooth metallic light beam sweeps across card borders when hovered (`left: -100%` → `100%`). |
| 🔮 | **Electric Border Displacement** | SVG `feTurbulence` + `feDisplacementMap` filter renders an animated lightning border on the Ultimate Flagship card. |
| 🌟 | **Pulsing Badge Star** | Flagship badge features a pulsing, rotating golden star icon (`@keyframes starPulse`) with ambient drop-shadow. |
| 🔄 | **Smart Billing Switcher** | Interactive spring toggle calculating yearly discounts (**Save 20%**) and live daily-equivalent pricing breakdown (`≈ ৳14/day`). |
| 🌐 | **Multi-Currency Engine** | Glassmorphic dropdown converting **BDT (৳), USD ($), EUR (€), TRY (₺), IRR (﷼)** with locale-aware number formatting. |
| 💡 | **Glass Feature Tooltips** | CSS-only glassmorphic tooltips offering deep context on hover (`backdrop-filter: blur(12px)`). |
| 💚 | **Savings Tracker Banner** | Coupon-style active banner calculating exact annual savings with green pulse animation on change. |
| 👻 | **Peer Card Dimming** | Hovering over a card gently dims (`opacity: 0.6`) and desaturates neighboring cards using CSS `:has()` selector. |

---

## 🌐 Multi-Currency Matrix Table

| Currency | Flag | Code | Symbol | Decimals | Essential Plan | Elite Plan | Ultimate Plan | Annual Savings |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Bangladeshi Taka** | 🇧🇩 | `BDT` | `৳` | ❌ No | ৳4,999/yr | ৳6,999/yr | ৳14,999/yr | **Save ৳10,001/yr** |
| **US Dollar** | 🇺🇸 | `USD` | `$` | 🟢 Yes | $49.99/yr | $69.99/yr | $149.99/yr | **Save $100.00/yr** |
| **Euro** | 🇪🇺 | `EUR` | `€` | 🟢 Yes | €44.99/yr | €64.99/yr | €134.99/yr | **Save €95.00/yr** |
| **Turkish Lira** | 🇹🇷 | `TRY` | `₺` | ❌ No | ₺1,490/yr | ₺2,190/yr | ₺4,490/yr | **Save ₺3,000/yr** |
| **Iranian Rial** | 🇮🇷 | `IRR` | `﷼` | ❌ No | ﷼2.5M/yr | ﷼3.5M/yr | ﷼7.5M/yr | **Save ﷼4.5M/yr** |

---

## ⚡ Framework Integration Guides

<details open>
<summary><strong>🌐 1. Vanilla HTML5 / JS (Zero Build Step)</strong></summary>

```html
<!-- Simply open html/pricing2.html in any browser -->
<link rel="stylesheet" href="html/PricingSection.css">
<!-- Includes standalone embedded CSS + SVG filters + Vanilla JS -->
```
</details>

<details>
<summary><strong>⚛️ 2. React 18</strong></summary>

```jsx
import PricingSection from './components/PricingSection';
import './components/PricingSection.css';

export default function App() {
  return <PricingSection />;
}
```
</details>

<details>
<summary><strong>🟢 3. Vue 3 (Composition API)</strong></summary>

```vue
<script setup>
import PricingSection from './PricingSection.vue';
</script>

<template>
  <PricingSection />
</template>
```
</details>

<details>
<summary><strong>▲ 4. Next.js 14 (App Router & TypeScript)</strong></summary>

```tsx
import PricingSection from '@/components/PricingSection';

export default function Page() {
  return <PricingSection />;
}
```
</details>

<details>
<summary><strong>🍊 5. Svelte 4 / 5 (TypeScript)</strong></summary>

```svelte
<script>
  import PricingSection from '$lib/components/PricingSection.svelte';
</script>

<PricingSection />
```
</details>

<details>
<summary><strong>🚀 6. Astro</strong></summary>

```astro
---
import PricingSection from '../components/PricingSection.astro';
---

<PricingSection />
```
</details>

---

## 🎨 Design Tokens

> [!TIP]
> Customize base theme colors, tier accent gradients, and animation easings directly in `PricingSection.css`:

```css
:root {
    /* Base Color Tokens */
    --bg-base: #030303;
    --bg-surface: #0a0a0a;
    --bg-surface-elevated: #111111;

    /* Tier Accent Tokens */
    --essential-accent: #e2e8f0;
    --elite-accent: #60a5fa;
    --ult-accent-1: #818cf8; /* Indigo */
    --ult-accent-2: #38bdf8; /* Cyan */
    --ult-accent-3: #c084fc; /* Purple */

    /* Animation Easing */
    --ease-spring: cubic-bezier(0.175, 0.885, 0.32, 1.15);
    --ease-smooth: cubic-bezier(0.25, 1, 0.5, 1);
}
```

---

## 🛡️ License & Author

Distributed under the **MIT License**. Maintained by **[Mopara Pair Ayat](https://github.com/Moparapairayat)**.

<div align="center">

<br />

[![Follow Mopara Pair Ayat](https://img.shields.io/github/followers/Moparapairayat?style=for-the-badge&logo=github&color=8b5cf6&label=Follow%20Mopara%20Pair%20Ayat)](https://github.com/Moparapairayat)

</div>
