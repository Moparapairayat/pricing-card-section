# 💎 Mopara Pair Ayat — Premium Pricing Section

A state-of-the-art, high-converting SaaS pricing section. Featuring elegant micro-interactions, responsive glassmorphism cards, dynamic price toggle transitions, animated counters, and a flagship electric animated border experience.

Available for multiple frameworks — pick your stack and drop it in.

## ✨ Features

- 💎 **Premium SaaS Cards:** Three polished tiers (Essential, Elite, Ultimate).
- ⚡ **Animated Counters:** Numbers scroll up on viewport entry and billing toggle.
- 🎯 **Magnetic CTA Button:** Interactive magnetic pull on the flagship button.
- 🌟 **Mouse Spotlight Glow:** Immersive hover flashlight effect.
- 🔥 **Electric Animated Border:** Flagship SVG-distorted glowing electric border.
- 🌐 **Live Currency Selector:** BDT, USD, EUR, TRY, IRR with dynamic conversion.
- 💡 **Interactive Tooltips:** CSS-driven feature tooltips.
- 📱 **Fully Responsive:** Mobile to ultra-wide.

## 📂 Folders

| Folder | Stack | Description |
| :--- | :--- | :--- |
| [`/html`](./html) | HTML5 · CSS3 · JS | Vanilla version — open directly in a browser. |
| [`/react`](./react) | React 18 | `PricingSection.jsx` + `PricingSection.css`. |
| [`/vue`](./vue) | Vue 3 | `PricingSection.vue` (`<script setup>`). |
| [`/nextjs`](./nextjs) | Next.js 14 | App Router, TypeScript, `'use client'`. |

## 🚀 Usage

### HTML
```bash
# Open html/pricing2.html directly in a browser
```

### React
Copy `react/PricingSection.jsx` and `react/PricingSection.css` into your project:
```jsx
import PricingSection from './components/Pricing/PricingSection';

export default function App() {
  return <PricingSection />;
}
```

### Vue
Copy `vue/PricingSection.vue` into your project:
```vue
<script setup>
import PricingSection from './PricingSection.vue';
</script>

<template>
  <PricingSection />
</template>
```

### Next.js
Copy `nextjs/components/PricingSection.tsx` and `PricingSection.css` into your app:
```tsx
import PricingSection from '@/components/PricingSection';

export default function Page() {
  return <PricingSection />;
}
```

## ⚙ Customization

Tweak CSS variables defined at the top of each stylesheet:

```css
:root {
  --bg-base: #030303;
  --essential-accent: #e2e8f0;
  --elite-accent: #60a5fa;
  --ult-accent-1: #8b5cf6;
}
```

- 💵 **Pricing Rates:** Edit via `data-monthly` / `data-yearly` attributes.
- 🎨 **Accents:** Adjust HSL variables for custom lighting.
- 📐 **Layout:** Modify CSS Grid columns.

## 📄 License

Distributed under the MIT License. Maintained by [Mopara Pair Ayat](https://github.com/Moparapairayat).
