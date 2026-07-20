<script lang="ts">
  import { onMount } from 'svelte';
  import './PricingSection.css';

  // ── Types & Interfaces ──────────────────────────────────────────────────
  interface Plan {
    monthly: number;
    yearly: number;
    oldMonthly: string;
    oldYearly: string;
    dailyMonthly: string;
    dailyYearly: string;
    savingsYearly: string;
  }

  interface CurrencyConfig {
    symbol: string;
    isDecimal: boolean;
    plans: [Plan, Plan, Plan];
  }

  type CurrencyKey = 'BDT' | 'USD' | 'EUR' | 'TRY' | 'IRR';

  // ── State ──────────────────────────────────────────────────────────────────
  let isYearly = true;
  let currency: CurrencyKey = 'BDT';
  let dropdownOpen = false;
  let pulseActive = false;
  let visibleCards = [true, true, true];

  // Animated counters state
  let displayPrices = [0, 0, 0];
  let animFrames: (number | null)[] = [null, null, null];

  // Template DOM Refs
  let mouseGlowRef: HTMLDivElement;
  let dropdownRef: HTMLDivElement;
  let cardRefs: (HTMLDivElement | null)[] = [null, null, null];

  // ── Static Data ────────────────────────────────────────────────────────────
  const flags: Record<CurrencyKey, string> = {
    BDT: '🇧🇩', USD: '🇺🇸', EUR: '🇪🇺', TRY: '🇹🇷', IRR: '🇮🇷'
  };

  const currencyData: Record<CurrencyKey, CurrencyConfig> = {
    BDT: {
      symbol: '৳', isDecimal: false,
      plans: [
        { monthly: 499,    yearly: 4999,    oldMonthly: '৳799',       oldYearly: '৳8,000',       dailyMonthly: '≈ ৳16/day',   dailyYearly: '≈ ৳14/day',   savingsYearly: 'Save ৳3,001/yr' },
        { monthly: 699,    yearly: 6999,    oldMonthly: '৳1,199',     oldYearly: '৳12,000',      dailyMonthly: '≈ ৳23/day',   dailyYearly: '≈ ৳19/day',   savingsYearly: 'Save ৳5,001/yr' },
        { monthly: 1499,   yearly: 14999,   oldMonthly: '৳2,499',     oldYearly: '৳25,000',      dailyMonthly: '≈ ৳50/day',   dailyYearly: '≈ ৳41/day',   savingsYearly: 'Save ৳10,001/yr' }
      ]
    },
    USD: {
      symbol: '$', isDecimal: true,
      plans: [
        { monthly: 4.99,   yearly: 49.99,   oldMonthly: '$7.99',      oldYearly: '$79.99',       dailyMonthly: '≈ $0.16/day', dailyYearly: '≈ $0.14/day', savingsYearly: 'Save $30.00/yr' },
        { monthly: 6.99,   yearly: 69.99,   oldMonthly: '$11.99',     oldYearly: '$119.99',      dailyMonthly: '≈ $0.23/day', dailyYearly: '≈ $0.19/day', savingsYearly: 'Save $50.00/yr' },
        { monthly: 14.99,  yearly: 149.99,  oldMonthly: '$24.99',     oldYearly: '$249.99',      dailyMonthly: '≈ $0.50/day', dailyYearly: '≈ $0.41/day', savingsYearly: 'Save $100.00/yr' }
      ]
    },
    EUR: {
      symbol: '€', isDecimal: true,
      plans: [
        { monthly: 4.49,   yearly: 44.99,   oldMonthly: '€6.99',      oldYearly: '€69.99',       dailyMonthly: '≈ €0.15/day', dailyYearly: '≈ €0.13/day', savingsYearly: 'Save €25.00/yr' },
        { monthly: 6.49,   yearly: 64.99,   oldMonthly: '€10.99',     oldYearly: '€109.99',      dailyMonthly: '≈ €0.21/day', dailyYearly: '≈ €0.18/day', savingsYearly: 'Save €45.00/yr' },
        { monthly: 13.49,  yearly: 134.99,  oldMonthly: '€22.99',     oldYearly: '€229.99',      dailyMonthly: '≈ €0.45/day', dailyYearly: '≈ €0.37/day', savingsYearly: 'Save €95.00/yr' }
      ]
    },
    TRY: {
      symbol: '₺', isDecimal: false,
      plans: [
        { monthly: 149,    yearly: 1490,    oldMonthly: '₺249',       oldYearly: '₺2,490',       dailyMonthly: '≈ ₺5/day',    dailyYearly: '≈ ₺4/day',    savingsYearly: 'Save ₺1,000/yr' },
        { monthly: 219,    yearly: 2190,    oldMonthly: '₺349',       oldYearly: '₺3,490',       dailyMonthly: '≈ ₺7/day',    dailyYearly: '≈ ₺6/day',    savingsYearly: 'Save ₺1,300/yr' },
        { monthly: 449,    yearly: 4490,    oldMonthly: '₺749',       oldYearly: '₺7,490',       dailyMonthly: '≈ ₺15/day',   dailyYearly: '≈ ₺12/day',   savingsYearly: 'Save ₺3,000/yr' }
      ]
    },
    IRR: {
      symbol: '﷼', isDecimal: false,
      plans: [
        { monthly: 250000, yearly: 2500000, oldMonthly: '﷼400,000',   oldYearly: '﷼4,000,000',   dailyMonthly: '≈ ﷼8.3k/day', dailyYearly: '≈ ﷼6.8k/day', savingsYearly: 'Save ﷼1,500,000/yr' },
        { monthly: 350000, yearly: 3500000, oldMonthly: '﷼600,000',   oldYearly: '﷼6,000,000',   dailyMonthly: '≈ ﷼11.6k/day',dailyYearly: '≈ ﷼9.5k/day', savingsYearly: 'Save ﷼2,500,000/yr' },
        { monthly: 750000, yearly: 7500000, oldMonthly: '﷼1,200,000', oldYearly: '﷼12,000,000',  dailyMonthly: '≈ ﷼25k/day',  dailyYearly: '≈ ﷼20.5k/day',savingsYearly: 'Save ﷼4,500,000/yr' }
      ]
    }
  };

  $: currentCurrency = currencyData[currency];

  // ── Helper Functions ───────────────────────────────────────────────────────
  function animateTo(index: number, target: number, duration = 800) {
    if (animFrames[index]) cancelAnimationFrame(animFrames[index]!);
    const start = displayPrices[index];
    let startTs: number | null = null;
    const ease = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));
    
    const step = (ts: number) => {
      if (!startTs) startTs = ts;
      const progress = Math.min((ts - startTs) / duration, 1);
      displayPrices[index] = ease(progress) * (target - start) + start;
      displayPrices = [...displayPrices];
      if (progress < 1) {
        animFrames[index] = requestAnimationFrame(step);
      } else {
        displayPrices[index] = target;
        displayPrices = [...displayPrices];
      }
    };
    animFrames[index] = requestAnimationFrame(step);
  }

  function formatVal(index: number): string {
    const cur = currentCurrency;
    const val = displayPrices[index];
    return cur.isDecimal ? val.toFixed(2) : Math.floor(val).toLocaleString('en-BD');
  }

  function updatePrices() {
    [0, 1, 2].forEach((i) => {
      if (visibleCards[i]) {
        const plan = currentCurrency.plans[i];
        animateTo(i, isYearly ? plan.yearly : plan.monthly);
      }
    });
    if (isYearly) {
      pulseActive = true;
      setTimeout(() => (pulseActive = false), 800);
    }
  }

  // Reactive updates on billing toggle or currency change
  $: isYearly, currency, updatePrices();

  // Mouse spotlight handler
  function handleSpotlight(e: MouseEvent) {
    const card = e.currentTarget as HTMLElement;
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  }

  // Magnetic Button handler
  function handleMagnetic(e: MouseEvent) {
    const el = e.currentTarget as HTMLElement;
    const { left, top, width, height } = el.getBoundingClientRect();
    const moveX = Math.max(-15, Math.min(15, (e.clientX - left - width / 2) * 0.15));
    const moveY = Math.max(-15, Math.min(15, (e.clientY - top - height / 2) * 0.15));
    el.style.transform = `translate(${moveX}px, ${moveY}px)`;
  }

  function resetMagnetic(e: MouseEvent) {
    const el = e.currentTarget as HTMLElement;
    el.style.transform = 'translate(0, 0)';
  }

  onMount(() => {
    // Initial count-up animation from 0 (1500ms duration)
    [0, 1, 2].forEach((i) => {
      const plan = currentCurrency.plans[i];
      animateTo(i, isYearly ? plan.yearly : plan.monthly, 1500);
    });

    const onMouseMove = (e: MouseEvent) => {
      if (mouseGlowRef) {
        mouseGlowRef.style.left = e.clientX + 'px';
        mouseGlowRef.style.top = e.clientY + 'px';
      }
    };
    document.addEventListener('mousemove', onMouseMove);

    const onClickOutside = (e: MouseEvent) => {
      if (dropdownRef && !dropdownRef.contains(e.target as Node)) {
        dropdownOpen = false;
      }
    };
    document.addEventListener('mousedown', onClickOutside);

    // Scroll reveal observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute('data-index'));
            visibleCards[idx] = true;
            visibleCards = [...visibleCards];
            const plan = currentCurrency.plans[idx];
            animateTo(idx, isYearly ? plan.yearly : plan.monthly);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0, rootMargin: '100px 0px 100px 0px' }
    );

    cardRefs.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousedown', onClickOutside);
      observer.disconnect();
      animFrames.forEach((f) => f && cancelAnimationFrame(f));
    };
  });
</script>

<!-- SVG Turbulence Filter -->
<svg style="position: absolute; width: 0; height: 0; pointer-events: none;">
  <defs>
    <filter id="turbulent-displace" color-interpolation-filters="sRGB" x="-20%" y="-20%" width="140%" height="140%">
      <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise1" seed="1"/>
      <feOffset in="noise1" dx="0" dy="0" result="offsetNoise1">
        <animate attributeName="dy" values="700; 0" dur="6s" repeatCount="indefinite" calcMode="linear"/>
      </feOffset>

      <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise2" seed="1"/>
      <feOffset in="noise2" dx="0" dy="0" result="offsetNoise2">
        <animate attributeName="dy" values="0; -700" dur="6s" repeatCount="indefinite" calcMode="linear"/>
      </feOffset>

      <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise1" seed="2"/>
      <feOffset in="noise1" dx="0" dy="0" result="offsetNoise3">
        <animate attributeName="dx" values="490; 0" dur="6s" repeatCount="indefinite" calcMode="linear"/>
      </feOffset>

      <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise2" seed="2"/>
      <feOffset in="noise2" dx="0" dy="0" result="offsetNoise4">
        <animate attributeName="dx" values="0; -490" dur="6s" repeatCount="indefinite" calcMode="linear"/>
      </feOffset>

      <feComposite in="offsetNoise1" in2="offsetNoise2" result="part1"/>
      <feComposite in="offsetNoise3" in2="offsetNoise4" result="part2"/>
      <feBlend in="part1" in2="part2" mode="color-dodge" result="combinedNoise"/>

      <feDisplacementMap in="SourceGraphic" in2="combinedNoise" scale="30" xChannelSelector="R" yChannelSelector="B"/>
    </filter>
  </defs>
</svg>

<div class="ambient-background">
  <div class="ambient-blob blob-1"></div>
  <div class="ambient-blob blob-2"></div>
  <div class="ambient-blob blob-3"></div>
</div>
<div class="grid-overlay"></div>
<div class="mouse-glow" bind:this={mouseGlowRef}></div>
<div class="noise-overlay"></div>

<section class="pricing-section">
  <!-- Toggle & Currency Bar -->
  <div class="pricing-toggle-container">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <span class="toggle-label" class:active={!isYearly} on:click={() => (isYearly = false)}>Monthly</span>
    <button
      class="billing-toggle-btn"
      class:yearly={isYearly}
      on:click={() => (isYearly = !isYearly)}
      aria-label="Toggle billing cycle"
    >
      <span class="toggle-slider"></span>
    </button>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <span class="toggle-label" class:active={isYearly} on:click={() => (isYearly = true)}>
      Yearly <span class="discount-badge">Save 20%</span>
    </span>

    <!-- Currency Selector -->
    <div class="currency-selector-wrapper" bind:this={dropdownRef}>
      <div class="custom-dropdown" class:open={dropdownOpen}>
        <button
          class="dropdown-trigger"
          on:click={() => (dropdownOpen = !dropdownOpen)}
          aria-haspopup="listbox"
          aria-expanded={dropdownOpen}
        >
          <span class="selected-flag">{flags[currency]}</span>
          <span class="selected-text">{currentCurrency.symbol} {currency}</span>
          <svg class="dropdown-arrow" width="10" height="6" viewBox="0 0 10 6" fill="none">
            <path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <ul class="dropdown-menu" role="listbox">
          {#each (Object.keys(currencyData) as CurrencyKey[]) as key}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <li
              class="dropdown-item"
              class:active={currency === key}
              role="option"
              aria-selected={currency === key}
              on:click={() => { currency = key; dropdownOpen = false; }}
            >
              <span class="flag">{flags[key]}</span>
              <span class="currency-code">{key} ({currencyData[key].symbol})</span>
            </li>
          {/each}
        </ul>
      </div>
    </div>
  </div>

  <!-- Pricing Grid -->
  <div class="pricing-grid">

    <!-- CARD 1: ESSENTIAL -->
    <div
      bind:this={cardRefs[0]}
      data-index="0"
      class="card-wrapper card-wrapper-essential"
      class:visible={visibleCards[0]}
      style="transition-delay:0s"
    >
      <div class="card card-essential">
        <div class="card-section">
          <div class="plan-identity">
            <span class="plan-name">Essential</span>
            <span class="badge">Entry</span>
          </div>

          <div class="price-hero">
            <div class="price-header">
              <s class="old-price">{isYearly ? currentCurrency.plans[0].oldYearly : currentCurrency.plans[0].oldMonthly}</s>
              <span class="savings-pill">Save 37%</span>
            </div>
            <div class="current-price-wrapper">
              <span class="currency">{currentCurrency.symbol}</span>
              <span class="current-price">{currentCurrency.isDecimal ? displayPrices[0].toFixed(2) : Math.floor(displayPrices[0]).toLocaleString('en-BD')}</span>
              <span class="price-suffix">{isYearly ? '/year' : '/mo'}</span>
            </div>
            <div class="monthly-equivalent">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 16 14"/>
              </svg>
              <span>{isYearly ? currentCurrency.plans[0].dailyYearly : currentCurrency.plans[0].dailyMonthly}</span>
            </div>
            <div class="savings-tracker-banner" class:active={isYearly} class:pulse={pulseActive}>
              <span class="savings-tracker-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
                  <line x1="7" y1="7" x2="7.01" y2="7"/>
                </svg>
              </span>
              <span class="savings-tracker-text">{currentCurrency.plans[0].savingsYearly}</span>
            </div>
          </div>

          <p class="value-prop">For developers starting their journey in AI and machine learning.</p>

          <div class="cta-container">
            <button class="btn-premium btn-essential">
              <span class="btn-text">Get Started</span>
              <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>

        <div class="divider"></div>

        <div class="card-section">
          <div class="features-header">Capabilities</div>
          <div class="feature-list">
            <div class="feature-row" style="transition-delay:0.3s">
              <div class="feature-icon-wrapper">
                <svg class="feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                </svg>
              </div>
              <div class="feature-text-content">
                <h4 class="feature-title">
                  Core AI Fundamentals
                  <span class="feature-info-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
                    </svg>
                  </span>
                  <span class="feature-tooltip">Hands-on syllabus covering machine learning math, neural architectures, and custom dataset preprocessing.</span>
                </h4>
                <p class="feature-desc">Master Python, PyTorch, and neural networks.</p>
              </div>
            </div>

            <div class="feature-row" style="transition-delay:0.4s">
              <div class="feature-icon-wrapper">
                <svg class="feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                </svg>
              </div>
              <div class="feature-text-content">
                <h4 class="feature-title">Weekly Code Reviews</h4>
                <p class="feature-desc">Interactive sessions with senior AI engineers.</p>
              </div>
            </div>

            <div class="feature-row" style="transition-delay:0.5s">
              <div class="feature-icon-wrapper">
                <svg class="feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
              </div>
              <div class="feature-text-content">
                <h4 class="feature-title">Builder Community</h4>
                <p class="feature-desc">Connect with peers and deploy real models.</p>
              </div>
            </div>
          </div>

          <div class="trust-footer">
            <div class="stars">
              {#each Array(5) as _}
                <svg fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              {/each}
            </div>
            <span>Perfect for new developers</span>
          </div>
        </div>
      </div>
    </div>

    <!-- CARD 2: ELITE -->
    <div
      bind:this={cardRefs[1]}
      data-index="1"
      class="card-wrapper card-wrapper-elite"
      class:visible={visibleCards[1]}
      style="transition-delay:0.15s"
    >
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <div class="card card-elite" on:mousemove={handleSpotlight}>
        <div class="spotlight-overlay"></div>

        <div class="card-section">
          <div class="plan-identity">
            <span class="plan-name">Elite</span>
            <span class="badge badge-elite">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
              </svg>
              Most Popular
            </span>
          </div>

          <div class="price-hero">
            <div class="price-header">
              <s class="old-price">{isYearly ? currentCurrency.plans[1].oldYearly : currentCurrency.plans[1].oldMonthly}</s>
              <span class="savings-pill">Save 41%</span>
            </div>
            <div class="current-price-wrapper">
              <span class="currency">{currentCurrency.symbol}</span>
              <span class="current-price">{currentCurrency.isDecimal ? displayPrices[1].toFixed(2) : Math.floor(displayPrices[1]).toLocaleString('en-BD')}</span>
              <span class="price-suffix">{isYearly ? '/year' : '/mo'}</span>
            </div>
            <div class="monthly-equivalent">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 16 14"/>
              </svg>
              <span>{isYearly ? currentCurrency.plans[1].dailyYearly : currentCurrency.plans[1].dailyMonthly}</span>
            </div>
            <div class="savings-tracker-banner" class:active={isYearly} class:pulse={pulseActive}>
              <span class="savings-tracker-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
                  <line x1="7" y1="7" x2="7.01" y2="7"/>
                </svg>
              </span>
              <span class="savings-tracker-text">{currentCurrency.plans[1].savingsYearly}</span>
            </div>
          </div>

          <p class="value-prop">For engineers eager to build autonomous agents and production-ready AI.</p>

          <div class="cta-container">
            <button class="btn-premium btn-elite">
              <span class="btn-text">Upgrade to Elite</span>
              <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>

        <div class="divider"></div>

        <div class="card-section">
          <div class="features-header">Capabilities</div>
          <div class="feature-list">
            <div class="feature-row" style="transition-delay:0.3s">
              <div class="feature-icon-wrapper">
                <svg class="feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
              </div>
              <div class="feature-text-content">
                <h4 class="feature-title">Everything in Essential</h4>
                <p class="feature-desc">All base features included.</p>
              </div>
            </div>

            <div class="feature-row" style="transition-delay:0.4s">
              <div class="feature-icon-wrapper">
                <svg class="feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </div>
              <div class="feature-text-content">
                <h4 class="feature-title">
                  Dedicated AI Mentorship
                  <span class="feature-info-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
                    </svg>
                  </span>
                  <span class="feature-tooltip">Weekly 1-on-1 calls with professional AI engineers to debug code and discuss architecture patterns.</span>
                </h4>
                <p class="feature-desc">Personalized guidance from industry pros.</p>
              </div>
            </div>

            <div class="feature-row" style="transition-delay:0.5s">
              <div class="feature-icon-wrapper">
                <svg class="feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                </svg>
              </div>
              <div class="feature-text-content">
                <h4 class="feature-title">Hackathons & Bounties</h4>
                <p class="feature-desc">Compete, build agents, and win cash prizes.</p>
              </div>
            </div>

            <div class="feature-row" style="transition-delay:0.6s">
              <div class="feature-icon-wrapper">
                <svg class="feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
                </svg>
              </div>
              <div class="feature-text-content">
                <h4 class="feature-title">Premium API Credits</h4>
                <p class="feature-desc">$500 worth of OpenAI, Anthropic & GPU credits.</p>
              </div>
            </div>
          </div>

          <div class="trust-footer">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            <span>Trusted by 10,000+ engineers</span>
          </div>
        </div>
      </div>
    </div>

    <!-- CARD 3: ULTIMATE -->
    <div
      bind:this={cardRefs[2]}
      data-index="2"
      class="card-wrapper card-wrapper-ultimate"
      class:visible={visibleCards[2]}
      style="transition-delay:0.3s"
    >
      <div class="electric-inner-container">
        <div class="electric-border-outer"><div class="main-card-electric"></div></div>
        <div class="electric-glow-layer-1"></div>
        <div class="electric-glow-layer-2"></div>
      </div>
      <div class="electric-overlay-1"></div>
      <div class="electric-overlay-2"></div>
      <div class="electric-background-glow"></div>

      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <div class="card card-ultimate" on:mousemove={handleSpotlight}>
        <div class="spotlight-overlay"></div>

        <div class="card-section">
          <div class="plan-identity">
            <span class="plan-name">Ultimate</span>
            <span class="badge badge-ultimate">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
              </svg>
              Flagship
            </span>
          </div>

          <div class="price-hero">
            <div class="price-header">
              <s class="old-price">{isYearly ? currentCurrency.plans[2].oldYearly : currentCurrency.plans[2].oldMonthly}</s>
              <span class="savings-pill" style="background:rgba(245,158,11,0.1);color:#fbbf24;border-color:rgba(245,158,11,0.2)">Save 40%</span>
            </div>
            <div class="current-price-wrapper">
              <span class="currency">{currentCurrency.symbol}</span>
              <span class="current-price">{currentCurrency.isDecimal ? displayPrices[2].toFixed(2) : Math.floor(displayPrices[2]).toLocaleString('en-BD')}</span>
              <span class="price-suffix">{isYearly ? '/year' : '/mo'}</span>
            </div>
            <div class="monthly-equivalent">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 16 14"/>
              </svg>
              <span>{isYearly ? currentCurrency.plans[2].dailyYearly : currentCurrency.plans[2].dailyMonthly}</span>
            </div>
            <div class="savings-tracker-banner" class:active={isYearly} class:pulse={pulseActive}>
              <span class="savings-tracker-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
                  <line x1="7" y1="7" x2="7.01" y2="7"/>
                </svg>
              </span>
              <span class="savings-tracker-text">{currentCurrency.plans[2].savingsYearly}</span>
            </div>
          </div>

          <p class="value-prop">For developers serious about building high-income AI SaaS and securing top engineering roles.</p>

          <div class="cta-container">
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div class="btn-ultimate-wrapper magnetic-btn-container" on:mousemove={handleMagnetic} on:mouseleave={resetMagnetic}>
              <button class="btn-premium btn-ultimate">
                <span class="btn-text">Secure Flagship Access</span>
                <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div class="divider"></div>

        <div class="card-section">
          <div class="features-header">Capabilities</div>
          <div class="feature-list">
            <div class="feature-row" style="transition-delay:0.3s">
              <div class="feature-icon-wrapper">
                <svg class="feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
              </div>
              <div class="feature-text-content">
                <h4 class="feature-title">Everything in Elite</h4>
                <p class="feature-desc">Plus exclusive career-focused tools.</p>
              </div>
            </div>

            <div class="feature-row" style="transition-delay:0.4s">
              <div class="feature-icon-wrapper">
                <svg class="feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                </svg>
              </div>
              <div class="feature-text-content">
                <h4 class="feature-title">
                  Founding Engineer Track
                  <span class="feature-info-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
                    </svg>
                  </span>
                  <span class="feature-tooltip">Product ideation and go-to-market strategies tailored to launch profitable indie products.</span>
                </h4>
                <p class="feature-desc">1-on-1 product roadmapping and launch support.</p>
              </div>
            </div>

            <div class="feature-row" style="transition-delay:0.5s">
              <div class="feature-icon-wrapper">
                <svg class="feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </div>
              <div class="feature-text-content">
                <h4 class="feature-title">Elite Placement</h4>
                <p class="feature-desc">Direct referrals to top AI startups and labs.</p>
              </div>
            </div>

            <div class="feature-row" style="transition-delay:0.6s">
              <div class="feature-icon-wrapper">
                <svg class="feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
                </svg>
              </div>
              <div class="feature-text-content">
                <h4 class="feature-title">
                  SaaS Boilerplate
                  <span class="feature-info-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
                    </svg>
                  </span>
                  <span class="feature-tooltip">Pre-configured tech stack containing Auth, DB, billing, and AI API wrappers to build apps in hours.</span>
                </h4>
                <p class="feature-desc">Enterprise-grade Next.js & AI agent boilerplate.</p>
              </div>
            </div>
          </div>

          <div class="trust-footer">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            <span>98% placement in top tech companies</span>
          </div>
        </div>
      </div>
    </div>

  </div>

  <footer class="pricing-footer">
    <p>© 2026 <span class="pricing-footer-brand">Mopara Pair Ayat</span>. All rights reserved. | Developed by <span class="pricing-footer-brand">Mopara Pair Ayat</span></p>
  </footer>
</section>


