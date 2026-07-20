# ⚡ Vue 3 — Premium Pricing Section

Vue 3 (Composition API + `<script setup>`) implementation of the **Mopara Pair Ayat** premium pricing card section.

## ✅ Features Included

| Feature | Status |
|---|---|
| 🌌 Nebula Grid Background (blobs + grid + mouse glow) | ✅ |
| 💱 Currency Switcher (BDT, USD, EUR, TRY, IRR) | ✅ |
| 🔄 Billing Toggle with animated price counter | ✅ |
| 💰 Dynamic Savings Badge (pulse on toggle) | ✅ |
| ✨ Mouse Spotlight on Elite & Ultimate cards | ✅ |
| ⚡ Electric Animated SVG Border (Ultimate card) | ✅ |
| 🎭 Intersection Observer scroll-reveal animation | ✅ |
| 📱 Fully Responsive | ✅ |

---

## 🚀 Quick Start

### 1. Create a new Vite + Vue project

```bash
npm create vite@latest my-app -- --template vue
cd my-app
npm install
```

### 2. Copy the files

Copy these two files into `src/`:

```
src/
├── PricingSection.vue   ← main component
└── App.vue              ← entry point (replace existing)
```

### 3. Add the CSS

Open `PricingSection.vue` and find the `<style scoped>` block at the bottom.
Copy the **entire** contents of `react/PricingSection.css` into that block:

```vue
<style scoped>
/* paste the full CSS from react/PricingSection.css here */
</style>
```

> **Tip:** The CSS is 100% identical across all framework versions.
> You only need to paste it once inside the `<style scoped>` block.

### 4. Run the dev server

```bash
npm run dev
```

Open `http://localhost:5173` and enjoy! 🎉

---

## 📁 File Structure

```
vue/
├── PricingSection.vue   — Full component (template + script + style)
├── App.vue              — Minimal entry point
└── README.md            — This file
```

---

## 🔧 Integration in an Existing Vue Project

```vue
<!-- In any parent component or page -->
<script setup>
import PricingSection from '@/components/PricingSection.vue';
</script>

<template>
  <PricingSection />
</template>
```

---

## 🗂 Key Vue 3 Concepts Used

| React Concept | Vue 3 Equivalent |
|---|---|
| `useState` | `ref()` / `reactive()` |
| `useEffect` | `onMounted()` + `watch()` |
| `useRef` | `ref()` (template refs) |
| `className` | `class` / `:class` binding |
| `onClick` | `@click` |
| `onMouseMove` | `@mousemove` |
| Array `.map()` in JSX | `v-for` directive |
| Conditional rendering | `v-if` / `:class` |

---

## 📄 License

MIT — [Mopara Pair Ayat](https://github.com/Moparapairayat)
