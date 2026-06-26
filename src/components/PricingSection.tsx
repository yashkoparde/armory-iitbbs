/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';
import { pricingConfig } from '../data/landingData';
import { Plan } from '../types';
import { ChevronRight, Cube16Solid } from './SvgIcons';

interface PricingCardProps {
  plan: Plan;
}

// PricingCard component renders the initial USD monthly values
const PricingCard = React.memo(({ plan }: PricingCardProps) => {
  const initialPrice = plan.basePrice; // Initial is USD monthly
  
  return (
    <div
      className={`group relative p-8 rounded-2xl flex flex-col justify-between transition-all duration-300 glass-panel bg-oceanic/40 ${
        plan.popular
          ? 'border-forsythia bg-arctic/[0.03] shadow-xl shadow-forsythia/5 scale-[1.02] md:translate-y-[-8px]'
          : 'border-arctic/10 hover:border-arctic/20'
      }`}
    >
      {/* Decorative Recommended Banner */}
      {plan.popular && (
        <span className="absolute top-0 right-1/2 transform translate-x-1/2 -translate-y-1/2 px-3 py-1 bg-forsythia text-oceanic font-mono text-[10px] font-extrabold uppercase rounded-full tracking-wider shadow-md">
          Recommended
        </span>
      )}

      {/* Plan Details */}
      <div>
        <h3 className="text-xl font-bold text-arctic tracking-tight mb-2">{plan.name}</h3>
        <p className="text-sm text-mystic/60 font-sans leading-relaxed mb-6 min-h-[40px]">{plan.description}</p>

        {/* Localized Price display - updates instantly with zero global thrash via direct DOM selection */}
        <div className="flex items-baseline gap-2 mb-6">
          <span
            id={`price-val-${plan.id}`}
            className="text-4xl sm:text-5xl font-mono font-bold tracking-tight text-arctic transition-all duration-300"
          >
            ${initialPrice.toLocaleString()}
          </span>
          <span
            id={`price-period-${plan.id}`}
            className="text-xs font-mono text-mystic/40 uppercase tracking-widest"
          >
            / month
          </span>
        </div>

        {/* Features Checklist */}
        <ul className="space-y-3 border-t border-arctic/5 pt-6 mb-8" aria-label={`Features for ${plan.name}`}>
          {plan.features.map((feat) => (
            <li key={feat} className="flex items-start gap-3 text-sm text-mystic/80">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="h-4 w-4 text-forsythia shrink-0 mt-0.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
              <span>{feat}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Trigger CTA button */}
      <div>
        <button
          className={`group flex items-center justify-center gap-2 w-full py-4 px-6 rounded-xl font-bold text-sm uppercase tracking-wide transition-all duration-300 transform active:scale-95 ${
            plan.popular
              ? 'bg-forsythia hover:bg-saffron text-oceanic shadow-lg shadow-forsythia/10'
              : 'bg-arctic/5 hover:bg-arctic/10 text-arctic border border-arctic/10 hover:border-arctic/20'
          }`}
        >
          <span>{plan.ctaText}</span>
          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </div>
  );
});

PricingCard.displayName = 'PricingCard';

// Isolated engine holding selectors locally to ensure zero parent or global page re-renders
const PricingEngine = React.memo(() => {
  const currentCurrency = useRef<string>('USD');
  const currentIsAnnual = useRef<boolean>(false);

  // Helper to calculate price and update the DOM directly
  const updatePrices = (currencyCode: string, isAnnual: boolean) => {
    pricingConfig.plans.forEach((plan) => {
      const currencyObj = pricingConfig.currencies.find((c) => c.code === currencyCode);
      const multiplier = currencyObj ? currencyObj.regionalMultiplier : 1;
      const symbol = currencyObj ? currencyObj.symbol : '$';
      const rawPrice = plan.basePrice * multiplier * (isAnnual ? pricingConfig.annualDiscount : 1);
      const calculatedPrice = Math.round(rawPrice);

      const valNode = document.getElementById(`price-val-${plan.id}`);
      if (valNode) {
        valNode.textContent = `${symbol}${calculatedPrice.toLocaleString()}`;
      }

      const periodNode = document.getElementById(`price-period-${plan.id}`);
      if (periodNode) {
        periodNode.textContent = isAnnual ? '/ mo paid annual' : '/ month';
      }
    });

    // Update currency button active/inactive styling states
    pricingConfig.currencies.forEach((curr) => {
      const btn = document.getElementById(`currency-btn-${curr.code}`);
      if (btn) {
        if (curr.code === currencyCode) {
          btn.className = "px-4 py-2 rounded-lg font-mono text-xs font-bold transition-all bg-forsythia text-oceanic shadow-md";
        } else {
          btn.className = "px-4 py-2 rounded-lg font-mono text-xs font-bold transition-all text-mystic/55 hover:text-arctic hover:bg-arctic/5";
        }
      }
    });

    // Update billing labels
    const monthlyBtn = document.getElementById('billing-btn-monthly');
    if (monthlyBtn) {
      monthlyBtn.className = `text-xs font-mono uppercase tracking-widest font-bold transition-colors ${
        !isAnnual ? 'text-forsythia' : 'text-mystic/55 hover:text-arctic'
      }`;
    }

    const annualBtn = document.getElementById('billing-btn-annual');
    if (annualBtn) {
      annualBtn.className = `flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest font-bold transition-colors ${
        isAnnual ? 'text-forsythia' : 'text-mystic/55 hover:text-arctic'
      }`;
    }

    // Update slider circle translation
    const toggleCircle = document.getElementById('billing-toggle-circle');
    if (toggleCircle) {
      if (isAnnual) {
        toggleCircle.classList.remove('translate-x-0');
        toggleCircle.classList.add('translate-x-6');
      } else {
        toggleCircle.classList.remove('translate-x-6');
        toggleCircle.classList.add('translate-x-0');
      }
    }
  };

  const selectCurrency = (code: string) => {
    currentCurrency.current = code;
    updatePrices(currentCurrency.current, currentIsAnnual.current);
  };

  const selectBilling = (annual: boolean) => {
    currentIsAnnual.current = annual;
    updatePrices(currentCurrency.current, currentIsAnnual.current);
  };

  // Set initial active state layout style on mount
  useEffect(() => {
    updatePrices(currentCurrency.current, currentIsAnnual.current);
  }, []);

  return (
    <div>
      {/* Controls Container */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
        {/* Currency Controls */}
        <div className="flex items-center gap-1 bg-oceanic/80 border border-arctic/10 p-1 rounded-xl">
          {pricingConfig.currencies.map((curr) => {
            const isActive = currentCurrency.current === curr.code;
            return (
              <button
                id={`currency-btn-${curr.code}`}
                key={curr.code}
                onClick={() => selectCurrency(curr.code)}
                className={`px-4 py-2 rounded-lg font-mono text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-forsythia text-oceanic shadow-md'
                    : 'text-mystic/55 hover:text-arctic hover:bg-arctic/5'
                }`}
              >
                {curr.code}
              </button>
            );
          })}
        </div>

        {/* Billing Cycles Toggles */}
        <div className="flex items-center gap-3">
          <button
            id="billing-btn-monthly"
            onClick={() => selectBilling(false)}
            className={`text-xs font-mono uppercase tracking-widest font-bold transition-colors ${
              !currentIsAnnual.current ? 'text-forsythia' : 'text-mystic/55 hover:text-arctic'
            }`}
          >
            Monthly
          </button>
          
          {/* Slider switch */}
          <button
            id="billing-toggle-slider"
            onClick={() => selectBilling(!currentIsAnnual.current)}
            className="w-12 h-6 bg-arctic/10 border border-arctic/10 rounded-full p-0.5 transition-colors focus:outline-none focus:ring-1 focus:ring-forsythia relative"
            aria-label="Toggle annual pricing"
          >
            <div
              id="billing-toggle-circle"
              className={`h-4 w-4 rounded-full bg-forsythia transition-transform duration-300 ${
                currentIsAnnual.current ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>

          <button
            id="billing-btn-annual"
            onClick={() => selectBilling(true)}
            className={`flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest font-bold transition-colors ${
              currentIsAnnual.current ? 'text-forsythia' : 'text-mystic/55 hover:text-arctic'
            }`}
          >
            <span>Annual</span>
            <span className="px-1.5 py-0.5 bg-forsythia/10 border border-forsythia/20 rounded text-[9px] font-mono text-forsythia uppercase">
              Save 20%
            </span>
          </button>
        </div>
      </div>

      {/* Plans Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {pricingConfig.plans.map((plan) => (
          <PricingCard key={plan.id} plan={plan} />
        ))}
      </div>
    </div>
  );
});

PricingEngine.displayName = 'PricingEngine';

const PricingSection = React.memo(() => {
  return (
    <section id="pricing" className="py-24 bg-oceanic border-t border-arctic/5 relative overflow-hidden" aria-labelledby="pricing-title">
      {/* Background Soft Glow */}
      <div className="absolute top-[40%] left-[-15%] w-[30vw] h-[30vw] rounded-full bg-saffron/5 filter blur-[120px]" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-forsythia uppercase tracking-widest mb-3">
            <Cube16Solid className="h-3.5 w-3.5" />
            <span>Regional Purchasing Parity</span>
          </div>
          <h2 id="pricing-title" className="text-3xl sm:text-5xl font-sans font-bold tracking-tight text-arctic mb-4">
            Fair pricing, wherever you deploy
          </h2>
          <p className="text-lg text-mystic/70 leading-relaxed font-sans">
            Choose a tier scaling seamlessly with your execution limits. We translate standard rates fairly based on purchasing power indices.
          </p>
        </div>

        {/* Dynamic Pricing Engine Wrapper (Contains currency/billing local states) */}
        <PricingEngine />

        {/* Dynamic enterprise support card */}
        <div className="mt-16 p-6 sm:p-8 rounded-2xl glass-panel-light flex flex-col md:flex-row items-center justify-between gap-6 border border-arctic/5 bg-arctic/[0.01]">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-forsythia/10 rounded-xl text-forsythia shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 1 1 1.063 1.062 10.124 10.124 0 0 0-14.24 0 .75.75 0 0 1-1.063-1.062 11.624 11.624 0 0 1 14.24 0Zm8.25 8.25.042-.02a.75.75 0 1 1 1.063 1.062 10.124 10.124 0 0 0-14.24 0 .75.75 0 0 1-1.063-1.062 11.624 11.624 0 0 1 14.24 0Zm-16.5 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm13.5 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM6 18a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm9 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
              </svg>
            </div>
            <div>
              <h4 className="text-base font-bold text-arctic tracking-tight mb-1">Custom Hybrid Networking SLAs</h4>
              <p className="text-xs sm:text-sm text-mystic/60 font-sans leading-relaxed">
                Need SOC2 isolated VPC deployment, custom mainframe databases, or private model endpoints on local hardware? Our infrastructure specialists are available to architect hybrid agreements.
              </p>
            </div>
          </div>
          <button className="flex items-center gap-2 px-6 py-3.5 bg-arctic/5 hover:bg-arctic/10 text-arctic font-mono text-xs font-bold uppercase rounded-lg border border-arctic/10 hover:border-arctic/20 tracking-wider whitespace-nowrap">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="h-4 w-4 text-forsythia">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
            </svg>
            <span>Contact Custom SLAs</span>
          </button>
        </div>
      </div>
    </section>
  );
});

PricingSection.displayName = 'PricingSection';

export default PricingSection;
