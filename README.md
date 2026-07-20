# 💎 Mopara Pair Ayat — Premium Pricing Section

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/Vue.js-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white" alt="Vue.js" />
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License" />
</p>

A state-of-the-art, high-converting SaaS pricing section designed for **Mopara Pair Ayat**. Featuring elegant micro-interactions, responsive glassmorphism cards, dynamic price toggle transitions, and a flagship electric animated border experience.

Available for multiple frameworks — pick your stack and drop it in.

---

## 📂 Folder Structure

The repository is organized into distinct versions for ease of integration:
- 📂 [`/html`](file:///d:/pricing-card-section/html) — Vanilla HTML5, CSS3, and JavaScript version.
- 📂 [`/react`](file:///d:/pricing-card-section/react) — React 18 component (JSX + CSS).
- 📂 [`/vue`](file:///d:/pricing-card-section/vue) — Vue 3 component (Composition API, `<script setup>`).
- 📂 [`/nextjs`](file:///d:/pricing-card-section/nextjs) — Next.js 14 component (App Router, TypeScript, `'use client'`).

---

## 🎥 Live Preview

<p align="center">
  <img src="pricing-card/assets/pricing.gif" alt="Premium Pricing Cards Preview" width="100%"/>
</p>

> 💡 **Tip:** The preview above showcases the hover elevation, animated counters, spotlight glow, magnetic CTA buttons, and smooth transition animations.

---

## ✨ Premium Features

- 💎 **Premium SaaS Cards:** Three highly polished tiers (Essential, Elite, Ultimate) designed for luxury conversion rates.
- ⚡ **Animated Counters:** Numbers scroll up dynamically when the card enters the viewport or during billing cycle toggles.
- 🎯 **Magnetic CTA Button:** Interactive magnetic pull on the flagship button for high-converting user experience.
- 🌟 **Mouse Spotlight Glow:** Immersive hover flashlight effect follows the mouse cursor on premium cards.
- 🔥 **Electric Animated Border:** Flagship SVG-distorted glowing electric border wrapper for the Ultimate plan.
- 🎨 **Glassmorphism Design:** Deep modern aesthetics using blur overlays, subtle shadows, and clean gradients.
- 📱 **Fully Responsive:** Adapts seamlessly to all screen sizes from mobile viewports to ultra-wide displays.
- 🖱 **Peer Dimming Effect:** Hovering over one card gently focuses attention by dimming other plans.

---

## 🛠 Tech Stack

- **Structure:** Semantic HTML5
- **Styling:** CSS Variables, Grid Layout, Flexbox, SVG Turbulence Filters
- **Logic:** Vanilla JavaScript, Intersection Observer API
- **Fonts:** [Inter](https://fonts.google.com/specimen/Inter) (Google Fonts)

---

## 🚀 Quick Start & Installation

### 1. Clone the repository
```bash
git clone https://github.com/Moparapairayat/pricing-card-section.git
```

### 2. Open the file
Navigate to the directory and open the HTML file directly in your browser:
```bash
cd pricing-card-section
# Open html/pricing2.html in browser
```

---

## ⚛ React Component Integration

The project includes a ready-to-use, high-performance React component version located in the [`/react`](file:///d:/pricing-card-section/react) directory.

### Files Included:
- 📄 [`PricingSection.jsx`](file:///d:/pricing-card-section/react/PricingSection.jsx) — Fully featured React component.
- 🎨 [`PricingSection.css`](file:///d:/pricing-card-section/react/PricingSection.css) — Component stylesheet (exact copy of the original HTML styling).
- 💻 [`App.jsx`](file:///d:/pricing-card-section/react/App.jsx) — Sample code showing component integration.

### Quick Start with React:

1. Copy [`PricingSection.jsx`](file:///d:/pricing-card-section/react/PricingSection.jsx) and [`PricingSection.css`](file:///d:/pricing-card-section/react/PricingSection.css) into your React project (e.g., in `src/components/Pricing`).
2. Import and use it in your layout:

```jsx
import React from 'react';
import PricingSection from './components/Pricing/PricingSection';

function App() {
  return <PricingSection />;
}
```

---

## ✨ Premium UI/UX Features

- **Live Currency Selector:** Custom interactive glassmorphic dropdown with country flag emojis, spring cubic-bezier transitions, purple glow hover states, and outside-click dismissal. Supports BDT (৳), USD ($), EUR (€), TRY (₺), and IRR (﷼) converting all values dynamically.
- **Interactive Feature Tooltips:** CSS-driven tooltips next to capabilities that show rich context on hover with zero javascript overhead.
- **Visual Savings Tracker:** Dynamic, coupon-style badge highlighting precise yearly savings per currency, pulsing with a green glow when users toggle cycles or switch currencies.

---

## 🎨 Animations Included

| Animation | Description |
| :--- | :--- |
| **Entrance Reveal** | Cards slide up and fade in dynamically as they enter the screen. |
| **Number Counter** | Eased progress animations for prices during billing cycle changes. |
| **Magnetic Pull** | CTAs shift dynamically relative to the mouse position. |
| **Electric Turbulence** | Distorted SVG glow animating infinitely along the borders. |
| **Spotlight Hover** | Mouse coordinates mapped to CSS variables for responsive lighting effects. |

---

## ⚙ Customization Guide

You can easily customize all visual values using CSS Variables defined at the top of the file:

```css
:root {
    /* Base background levels */
    --bg-base: #030303;
    --bg-surface: #0a0a0a;

    /* Pricing Accents */
    --essential-accent: #e2e8f0;
    --elite-accent: #60a5fa;
    --ult-accent-1: #8b5cf6;
}
```

### Easily Editable Elements:
- 💵 **Pricing Rates:** Change rates using `data-monthly` and `data-yearly` attributes in the HTML.
- 🎨 **Accent Gradients:** Tweak HSL variables for custom lighting on card borders.
- 📐 **Border Radius & Layout:** Flexibly adjust layout using CSS Grid columns.

---

## 📄 License & Credits

Distributed under the MIT License. Developed and maintained by **[Mopara Pair Ayat](https://github.com/Moparapairayat)**.
