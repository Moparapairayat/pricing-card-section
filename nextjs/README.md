# ⚡ Next.js 14 — Premium Pricing Section

Next.js 14 (App Router) + TypeScript implementation of the **Mopara Pair Ayat** premium pricing card section.

## ✅ Features Included

| Feature | Status |
|---|---|
| 🌌 Nebula Grid Background (blobs + grid + mouse glow) | ✅ |
| 💱 Currency Switcher (BDT, USD, EUR, TRY, IRR) | ✅ |
| 🔄 Billing Toggle with animated price counter | ✅ |
| 💰 Dynamic Savings Badge (pulse on toggle) | ✅ |
| ✨ Mouse Spotlight on Elite & Ultimate cards | ✅ |
| ⚡ Electric Animated SVG Border (Ultimate card) | ✅ |
| 🧲 Magnetic CTA Button (Ultimate) | ✅ |
| 🎭 Intersection Observer scroll-reveal animation | ✅ |
| 🔤 Inter font via `next/font/google` (zero layout shift) | ✅ |
| 🏷️ SEO metadata via `export const metadata` | ✅ |
| 📱 Fully Responsive | ✅ |

---

## 🚀 Quick Start

### 1. Create a new Next.js project

```bash
npx create-next-app@latest my-app --typescript --app --no-tailwind --no-eslint --no-src-dir
cd my-app
```

### 2. Copy the files

```
app/
├── globals.css          ← copy from nextjs/app/globals.css
├── layout.tsx           ← copy from nextjs/app/layout.tsx
└── page.tsx             ← copy from nextjs/app/page.tsx

components/
├── PricingSection.tsx   ← main component
└── PricingSection.css   ← styles
```

### 3. Run the dev server

```bash
npm run dev
```

Open `http://localhost:3000` 🎉

---

## 📁 File Structure

```
nextjs/
├── app/
│   ├── globals.css      — Minimal body reset
│   ├── layout.tsx       — Root layout + Inter font + SEO metadata
│   └── page.tsx         — Home page (renders PricingSection)
├── components/
│   ├── PricingSection.tsx  — Full 'use client' component (TypeScript)
│   └── PricingSection.css  — Styles (identical across all frameworks)
└── README.md
```

---

## 🔧 Integration in an Existing Next.js Project

```tsx
// app/pricing/page.tsx  or  any page
import PricingSection from '@/components/PricingSection';

export default function PricingPage() {
  return <PricingSection />;
}
```

> **Note:** `PricingSection.tsx` is a Client Component (`'use client'`).
> This is required because it uses browser APIs: `useState`, `useEffect`,
> `IntersectionObserver`, `mousemove` events, and `requestAnimationFrame`.

---

## 🗂 Key Next.js Concepts Used

| Concept | Usage |
|---|---|
| `'use client'` directive | Required for browser APIs & React hooks |
| `next/font/google` | Zero-layout-shift Inter font loading |
| `export const metadata` | Built-in SEO without `<head>` tags |
| App Router (`app/`) | Modern Next.js 13+ file-based routing |
| TypeScript interfaces | `Plan`, `CurrencyConfig`, `CurrencyKey` types |

---

## 📄 License

MIT — [Mopara Pair Ayat](https://github.com/Moparapairayat)
