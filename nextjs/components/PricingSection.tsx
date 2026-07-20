'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import './PricingSection.css';

// ── Types ──────────────────────────────────────────────────────────────────
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

// ── Animated Counter ────────────────────────────────────────────────────────
function AnimatedCounter({ value, isDecimal = false }: { value: number; isDecimal?: boolean }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(0);

  useEffect(() => {
    const start = ref.current;
    ref.current = value;
    let frameId: number;
    let startTs: number | null = null;
    const duration = 800;
    const ease = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

    const step = (ts: number) => {
      if (!startTs) startTs = ts;
      const progress = Math.min((ts - startTs) / duration, 1);
      setDisplay(ease(progress) * (value - start) + start);
      if (progress < 1) frameId = requestAnimationFrame(step);
      else setDisplay(value);
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [value]);

  return (
    <span>
      {isDecimal
        ? display.toFixed(2)
        : Math.floor(display).toLocaleString('en-BD')}
    </span>
  );
}

// ── Magnetic Button ─────────────────────────────────────────────────────────
function MagneticButton({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const moveX = Math.max(-15, Math.min(15, (e.clientX - left - width / 2) * 0.15));
    const moveY = Math.max(-15, Math.min(15, (e.clientY - top - height / 2) * 0.15));
    el.style.transform = `translate(${moveX}px, ${moveY}px)`;
  };

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = 'translate(0,0)';
  };

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ transition: 'transform 0.2s cubic-bezier(0.2,0,0,1)', willChange: 'transform' }}
    >
      {children}
    </div>
  );
}

// ── Currency Data ───────────────────────────────────────────────────────────
const CURRENCY_DATA: Record<CurrencyKey, CurrencyConfig> = {
  BDT: {
    symbol: '৳', isDecimal: false,
    plans: [
      { monthly: 499,    yearly: 4999,    oldMonthly: '৳799',       oldYearly: '৳8,000',       dailyMonthly: '≈ ৳16/day',    dailyYearly: '≈ ৳14/day',    savingsYearly: 'Save ৳3,001/yr' },
      { monthly: 699,    yearly: 6999,    oldMonthly: '৳1,199',     oldYearly: '৳12,000',      dailyMonthly: '≈ ৳23/day',    dailyYearly: '≈ ৳19/day',    savingsYearly: 'Save ৳5,001/yr' },
      { monthly: 1499,   yearly: 14999,   oldMonthly: '৳2,499',     oldYearly: '৳25,000',      dailyMonthly: '≈ ৳50/day',    dailyYearly: '≈ ৳41/day',    savingsYearly: 'Save ৳10,001/yr' },
    ],
  },
  USD: {
    symbol: '$', isDecimal: true,
    plans: [
      { monthly: 4.99,   yearly: 49.99,   oldMonthly: '$7.99',      oldYearly: '$79.99',       dailyMonthly: '≈ $0.16/day',  dailyYearly: '≈ $0.14/day',  savingsYearly: 'Save $30.00/yr' },
      { monthly: 6.99,   yearly: 69.99,   oldMonthly: '$11.99',     oldYearly: '$119.99',      dailyMonthly: '≈ $0.23/day',  dailyYearly: '≈ $0.19/day',  savingsYearly: 'Save $50.00/yr' },
      { monthly: 14.99,  yearly: 149.99,  oldMonthly: '$24.99',     oldYearly: '$249.99',      dailyMonthly: '≈ $0.50/day',  dailyYearly: '≈ $0.41/day',  savingsYearly: 'Save $100.00/yr' },
    ],
  },
  EUR: {
    symbol: '€', isDecimal: true,
    plans: [
      { monthly: 4.49,   yearly: 44.99,   oldMonthly: '€6.99',      oldYearly: '€69.99',       dailyMonthly: '≈ €0.15/day',  dailyYearly: '≈ €0.13/day',  savingsYearly: 'Save €25.00/yr' },
      { monthly: 6.49,   yearly: 64.99,   oldMonthly: '€10.99',     oldYearly: '€109.99',      dailyMonthly: '≈ €0.21/day',  dailyYearly: '≈ €0.18/day',  savingsYearly: 'Save €45.00/yr' },
      { monthly: 13.49,  yearly: 134.99,  oldMonthly: '€22.99',     oldYearly: '€229.99',      dailyMonthly: '≈ €0.45/day',  dailyYearly: '≈ €0.37/day',  savingsYearly: 'Save €95.00/yr' },
    ],
  },
  TRY: {
    symbol: '₺', isDecimal: false,
    plans: [
      { monthly: 149,    yearly: 1490,    oldMonthly: '₺249',       oldYearly: '₺2,490',       dailyMonthly: '≈ ₺5/day',     dailyYearly: '≈ ₺4/day',     savingsYearly: 'Save ₺1,000/yr' },
      { monthly: 219,    yearly: 2190,    oldMonthly: '₺349',       oldYearly: '₺3,490',       dailyMonthly: '≈ ₺7/day',     dailyYearly: '≈ ₺6/day',     savingsYearly: 'Save ₺1,300/yr' },
      { monthly: 449,    yearly: 4490,    oldMonthly: '₺749',       oldYearly: '₺7,490',       dailyMonthly: '≈ ₺15/day',    dailyYearly: '≈ ₺12/day',    savingsYearly: 'Save ₺3,000/yr' },
    ],
  },
  IRR: {
    symbol: '﷼', isDecimal: false,
    plans: [
      { monthly: 250000, yearly: 2500000, oldMonthly: '﷼400,000',   oldYearly: '﷼4,000,000',   dailyMonthly: '≈ ﷼8.3k/day',  dailyYearly: '≈ ﷼6.8k/day',  savingsYearly: 'Save ﷼1,500,000/yr' },
      { monthly: 350000, yearly: 3500000, oldMonthly: '﷼600,000',   oldYearly: '﷼6,000,000',   dailyMonthly: '≈ ﷼11.6k/day', dailyYearly: '≈ ﷼9.5k/day',  savingsYearly: 'Save ﷼2,500,000/yr' },
      { monthly: 750000, yearly: 7500000, oldMonthly: '﷼1,200,000', oldYearly: '﷼12,000,000',  dailyMonthly: '≈ ﷼25k/day',   dailyYearly: '≈ ﷼20.5k/day', savingsYearly: 'Save ﷼4,500,000/yr' },
    ],
  },
};

const FLAGS: Record<CurrencyKey, string> = {
  BDT: '🇧🇩', USD: '🇺🇸', EUR: '🇪🇺', TRY: '🇹🇷', IRR: '🇮🇷',
};

const CURRENCY_KEYS = Object.keys(CURRENCY_DATA) as CurrencyKey[];

// ── Main Component ──────────────────────────────────────────────────────────
export default function PricingSection() {
  const [isYearly, setIsYearly]       = useState(true);
  const [currency, setCurrency]       = useState<CurrencyKey>('BDT');
  const [visibleCards, setVisibleCards] = useState<Record<number, boolean>>({ 0: false, 1: false, 2: false });
  const [pulseActive, setPulseActive] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const cardRefs    = useRef<(HTMLDivElement | null)[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mouseGlowRef = useRef<HTMLDivElement>(null);

  const currentCurrency = CURRENCY_DATA[currency];

  // Mouse glow
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (mouseGlowRef.current) {
        mouseGlowRef.current.style.left = e.clientX + 'px';
        mouseGlowRef.current.style.top  = e.clientY + 'px';
      }
    };
    document.addEventListener('mousemove', handler);
    return () => document.removeEventListener('mousemove', handler);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Intersection Observer — scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute('data-index'));
            setVisibleCards((prev) => ({ ...prev, [idx]: true }));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    cardRefs.current.forEach((card) => { if (card) observer.observe(card); });
    return () => observer.disconnect();
  }, []);

  // Pulse savings badge on billing / currency change
  useEffect(() => {
    if (isYearly) {
      setPulseActive(true);
      const t = setTimeout(() => setPulseActive(false), 800);
      return () => clearTimeout(t);
    }
  }, [isYearly, currency]);

  // Spotlight handler
  const handleSpotlight = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const { left, top } = card.getBoundingClientRect();
    card.style.setProperty('--mouse-x', `${e.clientX - left}px`);
    card.style.setProperty('--mouse-y', `${e.clientY - top}px`);
  }, []);

  const savingsClass = (isYearly ? ' active' : '') + (pulseActive ? ' pulse' : '');

  // ── Savings Banner (shared) ──────────────────────────────────────────────
  const SavingsBanner = ({ planIdx }: { planIdx: 0 | 1 | 2 }) => (
    <div className={`savings-tracker-banner${savingsClass}`}>
      <span className="savings-tracker-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
          <line x1="7" y1="7" x2="7.01" y2="7"/>
        </svg>
      </span>
      <span className="savings-tracker-text">{currentCurrency.plans[planIdx].savingsYearly}</span>
    </div>
  );

  // ── Daily Line (shared) ──────────────────────────────────────────────────
  const DailyLine = ({ planIdx }: { planIdx: 0 | 1 | 2 }) => (
    <div className="monthly-equivalent">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
      <span>{isYearly ? currentCurrency.plans[planIdx].dailyYearly : currentCurrency.plans[planIdx].dailyMonthly}</span>
    </div>
  );

  return (
    <div className="pricing-page-wrapper">
      {/* SVG Turbulence Filter */}
      <svg style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }}>
        <defs>
          <filter id="turbulent-displace" colorInterpolationFilters="sRGB" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves={10} result="noise1" seed={1}/>
            <feOffset in="noise1" dx="0" dy="0" result="offsetNoise1">
              <animate attributeName="dy" values="700; 0" dur="6s" repeatCount="indefinite" calcMode="linear"/>
            </feOffset>
            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves={10} result="noise2" seed={1}/>
            <feOffset in="noise2" dx="0" dy="0" result="offsetNoise2">
              <animate attributeName="dy" values="0; -700" dur="6s" repeatCount="indefinite" calcMode="linear"/>
            </feOffset>
            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves={10} result="noise1" seed={2}/>
            <feOffset in="noise1" dx="0" dy="0" result="offsetNoise3">
              <animate attributeName="dx" values="490; 0" dur="6s" repeatCount="indefinite" calcMode="linear"/>
            </feOffset>
            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves={10} result="noise2" seed={2}/>
            <feOffset in="noise2" dx="0" dy="0" result="offsetNoise4">
              <animate attributeName="dx" values="0; -490" dur="6s" repeatCount="indefinite" calcMode="linear"/>
            </feOffset>
            <feComposite in="offsetNoise1" in2="offsetNoise2" result="part1"/>
            <feComposite in="offsetNoise3" in2="offsetNoise4" result="part2"/>
            <feBlend in="part1" in2="part2" mode="color-dodge" result="combinedNoise"/>
            <feDisplacementMap in="SourceGraphic" in2="combinedNoise" scale={30} xChannelSelector="R" yChannelSelector="B"/>
          </filter>
        </defs>
      </svg>

      {/* Nebula Background */}
      <div className="ambient-background">
        <div className="ambient-blob blob-1"/>
        <div className="ambient-blob blob-2"/>
        <div className="ambient-blob blob-3"/>
      </div>
      <div className="grid-overlay"/>
      <div className="mouse-glow" ref={mouseGlowRef}/>
      <div className="noise-overlay"/>

      <section className="pricing-section">

        {/* ── Toggle + Currency ── */}
        <div className="pricing-toggle-container">
          <span className={`toggle-label${!isYearly ? ' active' : ''}`} onClick={() => setIsYearly(false)}>Monthly</span>
          <button
            className={`billing-toggle-btn${isYearly ? ' yearly' : ''}`}
            onClick={() => setIsYearly(!isYearly)}
            aria-label="Toggle billing cycle"
          >
            <span className="toggle-slider"/>
          </button>
          <span className={`toggle-label${isYearly ? ' active' : ''}`} onClick={() => setIsYearly(true)}>
            Yearly <span className="discount-badge">Save 20%</span>
          </span>

          {/* Currency Dropdown */}
          <div className="currency-selector-wrapper" ref={dropdownRef}>
            <div className={`custom-dropdown${dropdownOpen ? ' open' : ''}`}>
              <button
                className="dropdown-trigger"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                aria-haspopup="listbox"
                aria-expanded={dropdownOpen}
              >
                <span className="selected-flag">{FLAGS[currency]}</span>
                <span className="selected-text">{currentCurrency.symbol} {currency}</span>
                <svg className="dropdown-arrow" width="10" height="6" viewBox="0 0 10 6" fill="none">
                  <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <ul className="dropdown-menu" role="listbox">
                {CURRENCY_KEYS.map((key) => (
                  <li
                    key={key}
                    className={`dropdown-item${currency === key ? ' active' : ''}`}
                    role="option"
                    aria-selected={currency === key}
                    onClick={() => { setCurrency(key); setDropdownOpen(false); }}
                  >
                    <span className="flag">{FLAGS[key]}</span>
                    <span className="currency-code">{key} ({CURRENCY_DATA[key].symbol})</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ── Pricing Grid ── */}
        <div className="pricing-grid">

          {/* ══════════════════════ CARD 1: ESSENTIAL ══════════════════════ */}
          <div
            ref={(el) => { cardRefs.current[0] = el; }}
            data-index="0"
            className={`card-wrapper card-wrapper-essential${visibleCards[0] ? ' visible' : ''}`}
            style={{ transitionDelay: '0s' }}
          >
            <div className="card card-essential">
              <div className="card-section">
                <div className="plan-identity">
                  <span className="plan-name">Essential</span>
                  <span className="badge">Entry</span>
                </div>
                <div className="price-hero">
                  <div className="price-header">
                    <s className="old-price">{isYearly ? currentCurrency.plans[0].oldYearly : currentCurrency.plans[0].oldMonthly}</s>
                    <span className="savings-pill">Save 37%</span>
                  </div>
                  <div className="current-price-wrapper">
                    <span className="currency">{currentCurrency.symbol}</span>
                    <span className="current-price">
                      {visibleCards[0] ? <AnimatedCounter value={isYearly ? currentCurrency.plans[0].yearly : currentCurrency.plans[0].monthly} isDecimal={currentCurrency.isDecimal}/> : '0'}
                    </span>
                    <span className="price-suffix">{isYearly ? '/year' : '/mo'}</span>
                  </div>
                  <DailyLine planIdx={0}/>
                  <SavingsBanner planIdx={0}/>
                </div>
                <p className="value-prop">For developers starting their journey in AI and machine learning.</p>
                <div className="cta-container">
                  <button className="btn-premium btn-essential">
                    <span className="btn-text">Get Started</span>
                    <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </button>
                </div>
              </div>
              <div className="divider"/>
              <div className="card-section">
                <div className="features-header">Capabilities</div>
                <div className="feature-list">
                  {[
                    { delay: '0.3s', title: 'Core AI Fundamentals', tooltip: 'Hands-on syllabus covering machine learning math, neural architectures, and custom dataset preprocessing.', desc: 'Master Python, PyTorch, and neural networks.' },
                    { delay: '0.4s', title: 'Weekly Code Reviews', desc: 'Interactive sessions with senior AI engineers.' },
                    { delay: '0.5s', title: 'Builder Community', desc: 'Connect with peers and deploy real models.' },
                  ].map(({ delay, title, tooltip, desc }) => (
                    <div className="feature-row" key={title} style={{ transitionDelay: delay }}>
                      <div className="feature-icon-wrapper">
                        <svg className="feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                        </svg>
                      </div>
                      <div className="feature-text-content">
                        <h4 className="feature-title">
                          {title}
                          {tooltip && (
                            <>
                              <span className="feature-info-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
                                </svg>
                              </span>
                              <span className="feature-tooltip">{tooltip}</span>
                            </>
                          )}
                        </h4>
                        <p className="feature-desc">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="trust-footer">
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                    ))}
                  </div>
                  <span>Perfect for new developers</span>
                </div>
              </div>
            </div>
          </div>

          {/* ══════════════════════ CARD 2: ELITE ══════════════════════════ */}
          <div
            ref={(el) => { cardRefs.current[1] = el; }}
            data-index="1"
            className={`card-wrapper card-wrapper-elite${visibleCards[1] ? ' visible' : ''}`}
            style={{ transitionDelay: '0.15s' }}
          >
            <div className="card card-elite" onMouseMove={handleSpotlight}>
              <div className="spotlight-overlay"/>
              <div className="card-section">
                <div className="plan-identity">
                  <span className="plan-name">Elite</span>
                  <span className="badge badge-elite">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                    </svg>
                    Most Popular
                  </span>
                </div>
                <div className="price-hero">
                  <div className="price-header">
                    <s className="old-price">{isYearly ? currentCurrency.plans[1].oldYearly : currentCurrency.plans[1].oldMonthly}</s>
                    <span className="savings-pill">Save 41%</span>
                  </div>
                  <div className="current-price-wrapper">
                    <span className="currency">{currentCurrency.symbol}</span>
                    <span className="current-price">
                      {visibleCards[1] ? <AnimatedCounter value={isYearly ? currentCurrency.plans[1].yearly : currentCurrency.plans[1].monthly} isDecimal={currentCurrency.isDecimal}/> : '0'}
                    </span>
                    <span className="price-suffix">{isYearly ? '/year' : '/mo'}</span>
                  </div>
                  <DailyLine planIdx={1}/>
                  <SavingsBanner planIdx={1}/>
                </div>
                <p className="value-prop">For engineers eager to build autonomous agents and production-ready AI.</p>
                <div className="cta-container">
                  <button className="btn-premium btn-elite">
                    <span className="btn-text">Upgrade to Elite</span>
                    <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </button>
                </div>
              </div>
              <div className="divider"/>
              <div className="card-section">
                <div className="features-header">Capabilities</div>
                <div className="feature-list">
                  {[
                    { delay: '0.3s', title: 'Everything in Essential', desc: 'All base features included.' },
                    { delay: '0.4s', title: 'Dedicated AI Mentorship', tooltip: 'Weekly 1-on-1 calls with professional AI engineers to debug code and discuss architecture patterns.', desc: 'Personalized guidance from industry pros.' },
                    { delay: '0.5s', title: 'Hackathons & Bounties', desc: 'Compete, build agents, and win cash prizes.' },
                    { delay: '0.6s', title: 'Premium API Credits', desc: '$500 worth of OpenAI, Anthropic & GPU credits.' },
                  ].map(({ delay, title, tooltip, desc }) => (
                    <div className="feature-row" key={title} style={{ transitionDelay: delay }}>
                      <div className="feature-icon-wrapper">
                        <svg className="feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                        </svg>
                      </div>
                      <div className="feature-text-content">
                        <h4 className="feature-title">
                          {title}
                          {tooltip && (
                            <>
                              <span className="feature-info-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
                                </svg>
                              </span>
                              <span className="feature-tooltip">{tooltip}</span>
                            </>
                          )}
                        </h4>
                        <p className="feature-desc">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="trust-footer">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                  <span>Trusted by 10,000+ engineers</span>
                </div>
              </div>
            </div>
          </div>

          {/* ══════════════════════ CARD 3: ULTIMATE ═══════════════════════ */}
          <div
            ref={(el) => { cardRefs.current[2] = el; }}
            data-index="2"
            className={`card-wrapper card-wrapper-ultimate${visibleCards[2] ? ' visible' : ''}`}
            style={{ transitionDelay: '0.3s' }}
          >
            <div className="electric-inner-container">
              <div className="electric-border-outer"><div className="main-card-electric"/></div>
              <div className="electric-glow-layer-1"/>
              <div className="electric-glow-layer-2"/>
            </div>
            <div className="electric-overlay-1"/>
            <div className="electric-overlay-2"/>
            <div className="electric-background-glow"/>
            <div className="card card-ultimate" onMouseMove={handleSpotlight}>
              <div className="spotlight-overlay"/>
              <div className="card-section">
                <div className="plan-identity">
                  <span className="plan-name">Ultimate</span>
                  <span className="badge badge-ultimate">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                    </svg>
                    Flagship
                  </span>
                </div>
                <div className="price-hero">
                  <div className="price-header">
                    <s className="old-price">{isYearly ? currentCurrency.plans[2].oldYearly : currentCurrency.plans[2].oldMonthly}</s>
                    <span className="savings-pill" style={{ background: 'rgba(245,158,11,0.1)', color: '#fbbf24', borderColor: 'rgba(245,158,11,0.2)' }}>Save 40%</span>
                  </div>
                  <div className="current-price-wrapper">
                    <span className="currency">{currentCurrency.symbol}</span>
                    <span className="current-price">
                      {visibleCards[2] ? <AnimatedCounter value={isYearly ? currentCurrency.plans[2].yearly : currentCurrency.plans[2].monthly} isDecimal={currentCurrency.isDecimal}/> : '0'}
                    </span>
                    <span className="price-suffix">{isYearly ? '/year' : '/mo'}</span>
                  </div>
                  <DailyLine planIdx={2}/>
                  <SavingsBanner planIdx={2}/>
                </div>
                <p className="value-prop">For developers serious about building high-income AI SaaS and securing top engineering roles.</p>
                <div className="cta-container">
                  <MagneticButton className="btn-ultimate-wrapper">
                    <button className="btn-premium btn-ultimate">
                      <span className="btn-text">Secure Flagship Access</span>
                      <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                      </svg>
                    </button>
                  </MagneticButton>
                </div>
              </div>
              <div className="divider"/>
              <div className="card-section">
                <div className="features-header">Capabilities</div>
                <div className="feature-list">
                  {[
                    { delay: '0.3s', title: 'Everything in Elite', desc: 'Plus exclusive career-focused tools.' },
                    { delay: '0.4s', title: 'Founding Engineer Track', tooltip: 'Product ideation and go-to-market strategies tailored to launch profitable indie products.', desc: '1-on-1 product roadmapping and launch support.' },
                    { delay: '0.5s', title: 'Elite Placement', desc: 'Direct referrals to top AI startups and labs.' },
                    { delay: '0.6s', title: 'SaaS Boilerplate', tooltip: 'Pre-configured tech stack containing Auth, DB, billing, and AI API wrappers to build apps in hours.', desc: 'Enterprise-grade Next.js & AI agent boilerplate.' },
                  ].map(({ delay, title, tooltip, desc }) => (
                    <div className="feature-row" key={title} style={{ transitionDelay: delay }}>
                      <div className="feature-icon-wrapper">
                        <svg className="feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                        </svg>
                      </div>
                      <div className="feature-text-content">
                        <h4 className="feature-title">
                          {title}
                          {tooltip && (
                            <>
                              <span className="feature-info-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
                                </svg>
                              </span>
                              <span className="feature-tooltip">{tooltip}</span>
                            </>
                          )}
                        </h4>
                        <p className="feature-desc">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="trust-footer">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                  <span>98% placement in top tech companies</span>
                </div>
              </div>
            </div>
          </div>

        </div>{/* /pricing-grid */}

        <footer className="pricing-footer">
          <p>© 2026 <span className="pricing-footer-brand">Mopara Pair Ayat</span>. All rights reserved. | Developed by <span className="pricing-footer-brand">Mopara Pair Ayat</span></p>
        </footer>

      </section>
    </div>
  );
}
