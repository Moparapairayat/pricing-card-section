import React, { useState, useEffect, useRef } from 'react';
import './PricingSection.css';

// Animated Pricing Counter Component
const AnimatedCounter = ({ value, isDecimal = false }) => {
    const [displayValue, setDisplayValue] = useState(0);
    const valueRef = useRef(0);

    useEffect(() => {
        let startTimestamp = null;
        const duration = 800; // Animation duration in ms
        const start = valueRef.current;
        const end = value;
        valueRef.current = value;

        const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

        let animationFrameId;

        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const easedProgress = easeOutExpo(progress);
            const val = easedProgress * (end - start) + start;

            setDisplayValue(val);

            if (progress < 1) {
                animationFrameId = window.requestAnimationFrame(step);
            } else {
                setDisplayValue(end);
            }
        };

        animationFrameId = window.requestAnimationFrame(step);

        return () => {
            if (animationFrameId) {
                window.cancelAnimationFrame(animationFrameId);
            }
        };
    }, [value]);

    return (
        <span>
            {isDecimal 
                ? displayValue.toFixed(2) 
                : Math.floor(displayValue).toLocaleString('en-BD')}
        </span>
    );
};

// Magnetic Button Wrapper Component
const MagneticButton = ({ children, className }) => {
    const containerRef = useRef(null);

    const handleMouseMove = (e) => {
        const container = containerRef.current;
        if (!container) return;
        const rect = container.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const mouseX = e.clientX;
        const mouseY = e.clientY;

        const distX = mouseX - centerX;
        const distY = mouseY - centerY;

        // Friction controls how "heavy" the button feels
        const friction = 0.15;
        const moveX = Math.max(-15, Math.min(15, distX * friction));
        const moveY = Math.max(-15, Math.min(15, distY * friction));

        container.style.transform = `translate(${moveX}px, ${moveY}px)`;
    };

    const handleMouseLeave = () => {
        const container = containerRef.current;
        if (container) {
            container.style.transform = 'translate(0px, 0px)';
        }
    };

    return (
        <div
            ref={containerRef}
            className={className}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ transition: 'transform 0.2s cubic-bezier(0.2, 0, 0, 1)', willChange: 'transform' }}
        >
            {children}
        </div>
    );
};

export default function PricingSection() {
    const [isYearly, setIsYearly] = useState(true);
    const [currency, setCurrency] = useState('BDT');
    const [visibleCards, setVisibleCards] = useState({ 0: false, 1: false, 2: false });
    const [pulseActive, setPulseActive] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const cardRefs = useRef([]);
    const dropdownRef = useRef(null);
    const mouseGlowRef = useRef(null);

    const flags = { BDT: '🇧🇩', USD: '🇺🇸', EUR: '🇪🇺', TRY: '🇹🇷', IRR: '🇮🇷' };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (mouseGlowRef.current) {
                mouseGlowRef.current.style.left = e.clientX + 'px';
                mouseGlowRef.current.style.top = e.clientY + 'px';
            }
        };
        document.addEventListener('mousemove', handleMouseMove);
        return () => document.removeEventListener('mousemove', handleMouseMove);
    }, []);;

    // Currency Definitions Config
    const currencyData = {
        BDT: {
            symbol: '৳',
            isDecimal: false,
            plans: [
                { monthly: 499, yearly: 4999, oldMonthly: '৳799', oldYearly: '৳8,000', dailyMonthly: '≈ ৳16/day', dailyYearly: '≈ ৳14/day', savingsYearly: 'Save ৳3,001/yr' },
                { monthly: 699, yearly: 6999, oldMonthly: '৳1,199', oldYearly: '৳12,000', dailyMonthly: '≈ ৳23/day', dailyYearly: '≈ ৳19/day', savingsYearly: 'Save ৳5,001/yr' },
                { monthly: 1499, yearly: 14999, oldMonthly: '৳2,499', oldYearly: '৳25,000', dailyMonthly: '≈ ৳50/day', dailyYearly: '≈ ৳41/day', savingsYearly: 'Save ৳10,001/yr' }
            ]
        },
        USD: {
            symbol: '$',
            isDecimal: true,
            plans: [
                { monthly: 4.99, yearly: 49.99, oldMonthly: '$7.99', oldYearly: '$79.99', dailyMonthly: '≈ $0.16/day', dailyYearly: '≈ $0.14/day', savingsYearly: 'Save $30.00/yr' },
                { monthly: 6.99, yearly: 69.99, oldMonthly: '$11.99', oldYearly: '$119.99', dailyMonthly: '≈ $0.23/day', dailyYearly: '≈ $0.19/day', savingsYearly: 'Save $50.00/yr' },
                { monthly: 14.99, yearly: 149.99, oldMonthly: '$24.99', oldYearly: '$249.99', dailyMonthly: '≈ $0.50/day', dailyYearly: '≈ $0.41/day', savingsYearly: 'Save $100.00/yr' }
            ]
        },
        EUR: {
            symbol: '€',
            isDecimal: true,
            plans: [
                { monthly: 4.49, yearly: 44.99, oldMonthly: '€6.99', oldYearly: '€69.99', dailyMonthly: '≈ €0.15/day', dailyYearly: '≈ €0.13/day', savingsYearly: 'Save €25.00/yr' },
                { monthly: 6.49, yearly: 64.99, oldMonthly: '€10.99', oldYearly: '€109.99', dailyMonthly: '≈ €0.21/day', dailyYearly: '≈ €0.18/day', savingsYearly: 'Save €45.00/yr' },
                { monthly: 13.49, yearly: 134.99, oldMonthly: '€22.99', oldYearly: '€229.99', dailyMonthly: '≈ €0.45/day', dailyYearly: '≈ €0.37/day', savingsYearly: 'Save €95.00/yr' }
            ]
        },
        TRY: {
            symbol: '₺',
            isDecimal: false,
            plans: [
                { monthly: 149, yearly: 1490, oldMonthly: '₺249', oldYearly: '₺2,490', dailyMonthly: '≈ ₺5/day', dailyYearly: '≈ ₺4/day', savingsYearly: 'Save ₺1,000/yr' },
                { monthly: 219, yearly: 2190, oldMonthly: '₺349', oldYearly: '₺3,490', dailyMonthly: '≈ ₺7/day', dailyYearly: '≈ ₺6/day', savingsYearly: 'Save ₺1,300/yr' },
                { monthly: 449, yearly: 4490, oldMonthly: '₺749', oldYearly: '₺7,490', dailyMonthly: '≈ ₺15/day', dailyYearly: '≈ ₺12/day', savingsYearly: 'Save ₺3,000/yr' }
            ]
        },
        IRR: {
            symbol: '﷼',
            isDecimal: false,
            plans: [
                { monthly: 250000, yearly: 2500000, oldMonthly: '﷼400,000', oldYearly: '﷼4,000,000', dailyMonthly: '≈ ﷼8.3k/day', dailyYearly: '≈ ﷼6.8k/day', savingsYearly: 'Save ﷼1,500,000/yr' },
                { monthly: 350000, yearly: 3500000, oldMonthly: '﷼600,000', oldYearly: '﷼6,000,000', dailyMonthly: '≈ ﷼11.6k/day', dailyYearly: '≈ ﷼9.5k/day', savingsYearly: 'Save ﷼2,500,000/yr' },
                { monthly: 750000, yearly: 7500000, oldMonthly: '﷼1,200,000', oldYearly: '﷼12,000,000', dailyMonthly: '≈ ﷼25k/day', dailyYearly: '≈ ﷼20.5k/day', savingsYearly: 'Save ﷼4,500,000/yr' }
            ]
        }
    };

    const currentCurrency = currencyData[currency];

    // Intersection Observer for scroll-reveal animations
    useEffect(() => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px',
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const index = entry.target.getAttribute('data-index');
                    setVisibleCards((prev) => ({ ...prev, [index]: true }));
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        cardRefs.current.forEach((card) => {
            if (card) observer.observe(card);
        });

        return () => {
            observer.disconnect();
        };
    }, []);

    // Pulse savings banner on changes to billing toggle
    useEffect(() => {
        if (isYearly) {
            setPulseActive(true);
            const timer = setTimeout(() => setPulseActive(false), 800);
            return () => clearTimeout(timer);
        }
    }, [isYearly]);

    // Pulse savings banner on currency change
    useEffect(() => {
        if (isYearly) {
            setPulseActive(true);
            const timer = setTimeout(() => setPulseActive(false), 800);
            return () => clearTimeout(timer);
        }
    }, [currency]);

    // Throttled mouse spotlight event handler
    const handleMouseMoveSpotlight = (e) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    };

    return (
        <div className="pricing-page-wrapper">
            {/* SVG Turbulence Filter for Ultimate Card Electric Border */}
            <svg style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }}>
                <defs>
                    <filter id="turbulent-displace" colorInterpolationFilters="sRGB" x="-20%" y="-20%" width="140%" height="140%">
                        <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise1" seed="1" />
                        <feOffset in="noise1" dx="0" dy="0" result="offsetNoise1">
                            <animate attributeName="dy" values="700; 0" dur="6s" repeatCount="indefinite" calcMode="linear" />
                        </feOffset>

                        <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise2" seed="1" />
                        <feOffset in="noise2" dx="0" dy="0" result="offsetNoise2">
                            <animate attributeName="dy" values="0; -700" dur="6s" repeatCount="indefinite" calcMode="linear" />
                        </feOffset>

                        <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise1" seed="2" />
                        <feOffset in="noise1" dx="0" dy="0" result="offsetNoise3">
                            <animate attributeName="dx" values="490; 0" dur="6s" repeatCount="indefinite" calcMode="linear" />
                        </feOffset>

                        <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise2" seed="2" />
                        <feOffset in="noise2" dx="0" dy="0" result="offsetNoise4">
                            <animate attributeName="dx" values="0; -490" dur="6s" repeatCount="indefinite" calcMode="linear" />
                        </feOffset>

                        <feComposite in="offsetNoise1" in2="offsetNoise2" result="part1" />
                        <feComposite in="offsetNoise3" in2="offsetNoise4" result="part2" />
                        <feBlend in="part1" in2="part2" mode="color-dodge" result="combinedNoise" />

                        <feDisplacementMap in="SourceGraphic" in2="combinedNoise" scale="30" xChannelSelector="R" yChannelSelector="B" />
                    </filter>
                </defs>
            </svg>

            <div className="ambient-background">
                <div className="ambient-blob blob-1"></div>
                <div className="ambient-blob blob-2"></div>
                <div className="ambient-blob blob-3"></div>
            </div>
            <div className="grid-overlay"></div>
            <div className="mouse-glow" ref={mouseGlowRef}></div>
            <div className="noise-overlay"></div>

            <section className="pricing-section">
                {/* Billing toggle */}
                <div className="pricing-toggle-container">
                    <span className={`toggle-label ${!isYearly ? 'active' : ''}`} onClick={() => setIsYearly(false)}>
                        Monthly
                    </span>
                    <button
                        className={`billing-toggle-btn ${isYearly ? 'yearly' : ''}`}
                        onClick={() => setIsYearly(!isYearly)}
                        aria-label="Toggle billing cycle"
                    >
                        <span className="toggle-slider"></span>
                    </button>
                    <span className={`toggle-label ${isYearly ? 'active' : ''}`} onClick={() => setIsYearly(true)}>
                        Yearly <span className="discount-badge">Save 20%</span>
                    </span>

                    <div className="currency-selector-wrapper" ref={dropdownRef}>
                        <div className={`custom-dropdown ${dropdownOpen ? 'open' : ''}`}>
                            <button 
                                className="dropdown-trigger" 
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                aria-haspopup="listbox" 
                                aria-expanded={dropdownOpen}
                            >
                                <span className="selected-flag">{flags[currency]}</span>
                                <span className="selected-text">{currentCurrency.symbol} {currency}</span>
                                <svg className="dropdown-arrow" width="10" height="6" viewBox="0 0 10 6" fill="none">
                                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>
                            <ul className="dropdown-menu" role="listbox">
                                {Object.keys(currencyData).map((currKey) => (
                                    <li 
                                        key={currKey}
                                        className={`dropdown-item ${currency === currKey ? 'active' : ''}`} 
                                        role="option" 
                                        aria-selected={currency === currKey}
                                        onClick={() => {
                                            setCurrency(currKey);
                                            setDropdownOpen(false);
                                        }}
                                    >
                                        <span className="flag">{flags[currKey]}</span>
                                        <span className="currency-code">{currKey} ({currencyData[currKey].symbol})</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Pricing Grid */}
                <div className="pricing-grid">
                    
                    {/* CARD 1: ESSENTIAL */}
                    <div
                        ref={(el) => (cardRefs.current[0] = el)}
                        data-index="0"
                        className={`card-wrapper card-wrapper-essential ${visibleCards[0] ? 'visible' : ''}`}
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
                                            {visibleCards[0] ? (
                                                <AnimatedCounter
                                                    value={isYearly ? currentCurrency.plans[0].yearly : currentCurrency.plans[0].monthly}
                                                    isDecimal={currentCurrency.isDecimal}
                                                />
                                            ) : '0'}
                                        </span>
                                        <span className="price-suffix">{isYearly ? '/year' : '/mo'}</span>
                                    </div>
                                    <div className="monthly-equivalent">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="12" cy="12" r="10"></circle>
                                            <polyline points="12 6 12 12 16 14"></polyline>
                                        </svg>
                                        <span>{isYearly ? currentCurrency.plans[0].dailyYearly : currentCurrency.plans[0].dailyMonthly}</span>
                                    </div>
                                    <div className={`savings-tracker-banner ${isYearly ? 'active' : ''} ${pulseActive ? 'pulse' : ''}`}>
                                        <span className="savings-tracker-icon">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                                                <line x1="7" y1="7" x2="7.01" y2="7"></line>
                                            </svg>
                                        </span>
                                        <span className="savings-tracker-text">{currentCurrency.plans[0].savingsYearly}</span>
                                    </div>
                                </div>

                                <p className="value-prop">For developers starting their journey in AI and machine learning.</p>

                                <div className="cta-container">
                                    <button className="btn-premium btn-essential">
                                        <span className="btn-text">Get Started</span>
                                        <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <div className="divider"></div>

                            <div className="card-section">
                                <div className="features-header">Capabilities</div>
                                <div className="feature-list">
                                    <div className="feature-row" style={{ transitionDelay: '0.3s' }}>
                                        <div className="feature-icon-wrapper">
                                            <svg className="feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                                            </svg>
                                        </div>
                                        <div className="feature-text-content">
                                            <h4 className="feature-title">
                                                Core AI Fundamentals
                                                <span className="feature-info-icon">
                                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                        <circle cx="12" cy="12" r="10"></circle>
                                                        <line x1="12" y1="16" x2="12" y2="12"></line>
                                                        <line x1="12" y1="8" x2="12.01" y2="8"></line>
                                                    </svg>
                                                </span>
                                                <span className="feature-tooltip">Hands-on syllabus covering machine learning math, neural architectures, and custom dataset preprocessing.</span>
                                            </h4>
                                            <p className="feature-desc">Master Python, PyTorch, and neural networks.</p>
                                        </div>
                                    </div>
                                    <div className="feature-row" style={{ transitionDelay: '0.4s' }}>
                                        <div className="feature-icon-wrapper">
                                            <svg className="feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                                            </svg>
                                        </div>
                                        <div className="feature-text-content">
                                            <h4 className="feature-title">Weekly Code Reviews</h4>
                                            <p className="feature-desc">Interactive sessions with senior AI engineers.</p>
                                        </div>
                                    </div>
                                    <div className="feature-row" style={{ transitionDelay: '0.5s' }}>
                                        <div className="feature-icon-wrapper">
                                            <svg className="feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                                            </svg>
                                        </div>
                                        <div className="feature-text-content">
                                            <h4 className="feature-title">Builder Community</h4>
                                            <p className="feature-desc">Connect with peers and deploy real models.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="trust-footer">
                                    <div className="stars">
                                        {[...Array(5)].map((_, sIndex) => (
                                            <svg key={sIndex} fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                            </svg>
                                        ))}
                                    </div>
                                    <span>Perfect for new developers</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CARD 2: ELITE */}
                    <div
                        ref={(el) => (cardRefs.current[1] = el)}
                        data-index="1"
                        className={`card-wrapper card-wrapper-elite ${visibleCards[1] ? 'visible' : ''}`}
                        style={{ transitionDelay: '0.15s' }}
                    >
                        <div className="card card-elite" onMouseMove={handleMouseMoveSpotlight}>
                            <div className="spotlight-overlay"></div>

                            <div className="card-section">
                                <div className="plan-identity">
                                    <span className="plan-name">Elite</span>
                                    <span className="badge badge-elite">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
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
                                            {visibleCards[1] ? (
                                                <AnimatedCounter
                                                    value={isYearly ? currentCurrency.plans[1].yearly : currentCurrency.plans[1].monthly}
                                                    isDecimal={currentCurrency.isDecimal}
                                                />
                                            ) : '0'}
                                        </span>
                                        <span className="price-suffix">{isYearly ? '/year' : '/mo'}</span>
                                    </div>
                                    <div className="monthly-equivalent">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="12" cy="12" r="10"></circle>
                                            <polyline points="12 6 12 12 16 14"></polyline>
                                        </svg>
                                        <span>{isYearly ? currentCurrency.plans[1].dailyYearly : currentCurrency.plans[1].dailyMonthly}</span>
                                    </div>
                                    <div className={`savings-tracker-banner ${isYearly ? 'active' : ''} ${pulseActive ? 'pulse' : ''}`}>
                                        <span className="savings-tracker-icon">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                                                <line x1="7" y1="7" x2="7.01" y2="7"></line>
                                            </svg>
                                        </span>
                                        <span className="savings-tracker-text">{currentCurrency.plans[1].savingsYearly}</span>
                                    </div>
                                </div>

                                <p className="value-prop">For engineers eager to build autonomous agents and production-ready AI.</p>

                                <div className="cta-container">
                                    <button className="btn-premium btn-elite">
                                        <span className="btn-text">Upgrade to Elite</span>
                                        <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <div className="divider"></div>

                            <div className="card-section">
                                <div className="features-header">Capabilities</div>
                                <div className="feature-list">
                                    <div className="feature-row" style={{ transitionDelay: '0.3s' }}>
                                        <div className="feature-icon-wrapper">
                                            <svg className="feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                            </svg>
                                        </div>
                                        <div className="feature-text-content">
                                            <h4 className="feature-title">Everything in Essential</h4>
                                            <p className="feature-desc">All base features included.</p>
                                        </div>
                                    </div>
                                    <div className="feature-row" style={{ transitionDelay: '0.4s' }}>
                                        <div className="feature-icon-wrapper">
                                            <svg className="feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                            </svg>
                                        </div>
                                        <div className="feature-text-content">
                                            <h4 className="feature-title">
                                                Dedicated AI Mentorship
                                                <span className="feature-info-icon">
                                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                        <circle cx="12" cy="12" r="10"></circle>
                                                        <line x1="12" y1="16" x2="12" y2="12"></line>
                                                        <line x1="12" y1="8" x2="12.01" y2="8"></line>
                                                    </svg>
                                                </span>
                                                <span className="feature-tooltip">Weekly 1-on-1 calls with professional AI engineers to debug code and discuss architecture patterns.</span>
                                            </h4>
                                            <p className="feature-desc">Personalized guidance from industry pros.</p>
                                        </div>
                                    </div>
                                    <div className="feature-row" style={{ transitionDelay: '0.5s' }}>
                                        <div className="feature-icon-wrapper">
                                            <svg className="feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
                                            </svg>
                                        </div>
                                        <div className="feature-text-content">
                                            <h4 className="feature-title">Hackathons & Bounties</h4>
                                            <p className="feature-desc">Compete, build agents, and win cash prizes.</p>
                                        </div>
                                    </div>
                                    <div className="feature-row" style={{ transitionDelay: '0.6s' }}>
                                        <div className="feature-icon-wrapper">
                                            <svg className="feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
                                            </svg>
                                        </div>
                                        <div className="feature-text-content">
                                            <h4 className="feature-title">Premium API Credits</h4>
                                            <p className="feature-desc">$500 worth of OpenAI, Anthropic & GPU credits.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="trust-footer">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                                    </svg>
                                    <span>Trusted by 10,000+ engineers</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CARD 3: ULTIMATE */}
                    <div
                        ref={(el) => (cardRefs.current[2] = el)}
                        data-index="2"
                        className={`card-wrapper card-wrapper-ultimate ${visibleCards[2] ? 'visible' : ''}`}
                        style={{ transitionDelay: '0.3s' }}
                    >
                        {/* Electric Border Layers */}
                        <div className="electric-inner-container">
                            <div className="electric-border-outer"><div className="main-card-electric"></div></div>
                            <div className="electric-glow-layer-1"></div>
                            <div className="electric-glow-layer-2"></div>
                        </div>
                        <div className="electric-overlay-1"></div>
                        <div className="electric-overlay-2"></div>
                        <div className="electric-background-glow"></div>

                        <div className="card card-ultimate" onMouseMove={handleMouseMoveSpotlight}>
                            <div className="spotlight-overlay"></div>

                            <div className="card-section">
                                <div className="plan-identity">
                                    <span className="plan-name">Ultimate</span>
                                    <span className="badge badge-ultimate">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                                        </svg>
                                        Flagship
                                    </span>
                                </div>

                                <div className="price-hero">
                                    <div className="price-header">
                                        <s className="old-price">{isYearly ? currentCurrency.plans[2].oldYearly : currentCurrency.plans[2].oldMonthly}</s>
                                        <span
                                            className="savings-pill"
                                            style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#fbbf24', borderColor: 'rgba(245, 158, 11, 0.2)' }}
                                        >
                                            Save 40%
                                        </span>
                                    </div>
                                    <div className="current-price-wrapper">
                                        <span className="currency">{currentCurrency.symbol}</span>
                                        <span className="current-price">
                                            {visibleCards[2] ? (
                                                <AnimatedCounter
                                                    value={isYearly ? currentCurrency.plans[2].yearly : currentCurrency.plans[2].monthly}
                                                    isDecimal={currentCurrency.isDecimal}
                                                />
                                            ) : '0'}
                                        </span>
                                        <span className="price-suffix">{isYearly ? '/year' : '/mo'}</span>
                                    </div>
                                    <div className="monthly-equivalent">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="12" cy="12" r="10"></circle>
                                            <polyline points="12 6 12 12 16 14"></polyline>
                                        </svg>
                                        <span>{isYearly ? currentCurrency.plans[2].dailyYearly : currentCurrency.plans[2].dailyMonthly}</span>
                                    </div>
                                    <div className={`savings-tracker-banner ${isYearly ? 'active' : ''} ${pulseActive ? 'pulse' : ''}`}>
                                        <span className="savings-tracker-icon">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                                                <line x1="7" y1="7" x2="7.01" y2="7"></line>
                                            </svg>
                                        </span>
                                        <span className="savings-tracker-text">{currentCurrency.plans[2].savingsYearly}</span>
                                    </div>
                                </div>

                                <p className="value-prop">For developers serious about building high-income AI SaaS and securing top engineering roles.</p>

                                <div className="cta-container">
                                    <MagneticButton className="btn-ultimate-wrapper">
                                        <button className="btn-premium btn-ultimate">
                                            <span className="btn-text">Secure Flagship Access</span>
                                            <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                            </svg>
                                        </button>
                                    </MagneticButton>
                                </div>
                            </div>

                            <div className="divider"></div>

                            <div className="card-section">
                                <div className="features-header">Capabilities</div>
                                <div className="feature-list">
                                    <div className="feature-row" style={{ transitionDelay: '0.3s' }}>
                                        <div className="feature-icon-wrapper">
                                            <svg className="feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                            </svg>
                                        </div>
                                        <div className="feature-text-content">
                                            <h4 className="feature-title">Everything in Elite</h4>
                                            <p className="feature-desc">Plus exclusive career-focused tools.</p>
                                        </div>
                                    </div>
                                    <div className="feature-row" style={{ transitionDelay: '0.4s' }}>
                                        <div className="feature-icon-wrapper">
                                            <svg className="feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                                            </svg>
                                        </div>
                                        <div className="feature-text-content">
                                            <h4 className="feature-title">
                                                Founding Engineer Track
                                                <span className="feature-info-icon">
                                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                                        <circle cx="12" cy="12" r="10"></circle>
                                                        <line x1="12" y1="16" x2="12" y2="12"></line>
                                                        <line x1="12" y1="8" x2="12.01" y2="8"></line>
                                                    </svg>
                                                </span>
                                                <span className="feature-tooltip">Product ideation and go-to-market strategies tailored to launch profitable indie products.</span>
                                            </h4>
                                            <p className="feature-desc">1-on-1 product roadmapping and launch support.</p>
                                        </div>
                                    </div>
                                    <div className="feature-row" style={{ transitionDelay: '0.5s' }}>
                                        <div className="feature-icon-wrapper">
                                            <svg className="feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                            </svg>
                                        </div>
                                        <div className="feature-text-content">
                                            <h4 className="feature-title">Elite Placement</h4>
                                            <p className="feature-desc">Direct referrals to top AI startups and labs.</p>
                                        </div>
                                    </div>
                                    <div className="feature-row" style={{ transitionDelay: '0.6s' }}>
                                        <div className="feature-icon-wrapper">
                                            <svg className="feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                                            </svg>
                                        </div>
                                        <div className="feature-text-content">
                                            <h4 className="feature-title">
                                                SaaS Boilerplate
                                                <span className="feature-info-icon">
                                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                                        <circle cx="12" cy="12" r="10"></circle>
                                                        <line x1="12" y1="16" x2="12" y2="12"></line>
                                                        <line x1="12" y1="8" x2="12.01" y2="8"></line>
                                                    </svg>
                                                </span>
                                                <span className="feature-tooltip">Pre-configured tech stack containing Auth, DB, billing, and AI API wrappers to build apps in hours.</span>
                                            </h4>
                                            <p className="feature-desc">Enterprise-grade Next.js & AI agent boilerplate.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="trust-footer">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                                    </svg>
                                    <span>98% placement in top tech companies</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Footer Copyright */}
                <footer className="pricing-footer">
                    <p>
                        © 2026 <span className="pricing-footer-brand">Mopara Pair Ayat</span>. All rights reserved. | Developed by{' '}
                        <span className="pricing-footer-brand">Mopara Pair Ayat</span>
                    </p>
                </footer>
            </section>
        </div>
    );
}
