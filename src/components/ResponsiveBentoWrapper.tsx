/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { bentoItems } from '../data/landingData';
import { useBreakpointObserver } from '../hooks/useBreakpointObserver';
import { Cube16Solid, ArrowTrendingUp, Cog8Tooth } from './SvgIcons';

const CheckIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
  </svg>
);

export default function ResponsiveBentoWrapper() {
  const [activeId, setActiveId] = useState<string>('canvas');
  const { isMobile } = useBreakpointObserver(768);

  // Sync state or log state handoff when viewport changes between desktop and mobile to verify index persistence
  useEffect(() => {
    console.log(`[Viewport Change] Handoff active context: "${activeId}" (isMobile: ${isMobile})`);
  }, [isMobile, activeId]);

  // Helper to map icon components based on ID
  const renderIcon = (id: string, active: boolean) => {
    const className = `h-6 w-6 transition-colors duration-300 ${active ? 'text-forsythia' : 'text-mystic/50'}`;
    switch (id) {
      case 'canvas':
        return <Cube16Solid className={className} />;
      case 'autonomous':
        return <ArrowTrendingUp className={className} />;
      case 'encryption':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={className}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
          </svg>
        );
      case 'stack':
        return <Cog8Tooth className={className} />;
      default:
        return <Cube16Solid className={className} />;
    }
  };

  return (
    <section id="bento" className="py-24 bg-oceanic border-t border-arctic/5" aria-labelledby="bento-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-forsythia uppercase tracking-widest mb-3">
            <Cube16Solid className="h-3.5 w-3.5" />
            <span>Platform Capabilities</span>
          </div>
          <h2 id="bento-title" className="text-3xl sm:text-5xl font-sans font-bold tracking-tight text-arctic mb-4">
            Engineered for high-frequency workflows
          </h2>
          <p className="text-lg text-mystic/70 leading-relaxed font-sans">
            A cohesive architecture delivering visual control, deterministic execution, and bank-grade isolation out of the box.
          </p>
        </div>

        {/* Desktop Bento Grid View */}
        {!isMobile && (
          <div className="hidden md:grid grid-cols-3 gap-6">
            {bentoItems.map((item) => {
              const isActive = activeId === item.id;
              return (
                <div
                  key={item.id}
                  onMouseEnter={() => {
                    setActiveId(item.id);
                  }}
                  onClick={() => {
                    setActiveId(item.id);
                  }}
                  className={`group relative p-6 sm:p-8 rounded-2xl cursor-pointer transition-all duration-300 glass-panel flex flex-col justify-between overflow-hidden outline-none ${
                    item.gridClass
                  } ${
                    isActive
                      ? 'border-forsythia bg-arctic/[0.03] shadow-xl shadow-forsythia/5 scale-[1.01]'
                      : 'border-arctic/10 hover:border-arctic/20 hover:bg-arctic/[0.01]'
                  }`}
                  role="button"
                  aria-expanded={isActive}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveId(item.id);
                    }
                  }}
                >
                  {/* Visual Glass Edge Glow on active card */}
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-br from-forsythia/10 via-transparent to-transparent pointer-events-none" />
                  )}

                  {/* Top Row: Icon and Badge */}
                  <div className="flex justify-between items-start mb-6">
                    <div className={`p-3 rounded-xl transition-all duration-300 ${isActive ? 'bg-forsythia/10' : 'bg-arctic/5'}`}>
                      {renderIcon(item.id, isActive)}
                    </div>
                    {item.badge && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-forsythia/10 text-forsythia border border-forsythia/25 font-semibold uppercase tracking-wider">
                        {item.badge}
                      </span>
                    )}
                  </div>

                  {/* Main Text Content */}
                  <div>
                    <span className="block text-[10px] font-mono text-mystic/40 uppercase tracking-widest mb-1.5 font-semibold">
                      {item.subtitle}
                    </span>
                    <h3 className={`text-xl font-bold tracking-tight mb-3 transition-colors duration-200 ${isActive ? 'text-forsythia' : 'text-arctic'}`}>
                      {item.title}
                    </h3>
                    <p className="text-sm text-mystic/75 leading-relaxed font-sans">
                      {item.description}
                    </p>
                  </div>

                  {/* Desktop Interactive Accordion reveal */}
                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      isActive
                        ? 'max-h-48 opacity-100 mt-6 pt-6 border-t border-arctic/5'
                        : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="space-y-3">
                      <span className="block text-[10px] font-mono text-forsythia uppercase tracking-widest font-semibold">
                        Enterprise SLA metrics
                      </span>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-arctic/5 rounded-xl border border-arctic/5 hover:bg-arctic/10 transition-colors duration-200">
                          <span className="block text-[10px] text-mystic/55 font-mono">THROUGHPUT</span>
                          <div className="flex items-center gap-1.5 mt-1">
                            <CheckIcon className="h-3.5 w-3.5 text-forsythia" />
                            <span className="text-xs font-mono font-bold text-arctic">99.98% SLA</span>
                          </div>
                        </div>
                        <div className="p-3 bg-arctic/5 rounded-xl border border-arctic/5 hover:bg-arctic/10 transition-colors duration-200">
                          <span className="block text-[10px] text-mystic/55 font-mono">COMPLIANCE</span>
                          <div className="flex items-center gap-1.5 mt-1">
                            <CheckIcon className="h-3.5 w-3.5 text-forsythia" />
                            <span className="text-xs font-mono font-bold text-arctic">SOC2 Encrypted</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Mobile Accordion View with Context Lock State Persistence */}
        {isMobile && (
          <div className="space-y-4 md:hidden">
            {bentoItems.map((item) => {
              const isActive = activeId === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setActiveId(item.id)}
                  className={`rounded-2xl border transition-all duration-300 glass-panel overflow-hidden ${
                    isActive
                      ? 'border-forsythia bg-arctic/[0.03] shadow-lg shadow-forsythia/5'
                      : 'border-arctic/10 bg-oceanic/40'
                  }`}
                >
                  {/* Accordion Header */}
                  <div className="p-6 flex items-center justify-between gap-4 cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className={`p-2.5 rounded-xl transition-all duration-300 ${isActive ? 'bg-forsythia/10 text-forsythia' : 'bg-arctic/5 text-mystic/50'}`}>
                        {renderIcon(item.id, isActive)}
                      </div>
                      <div>
                        <span className="block text-[9px] font-mono text-mystic/40 uppercase tracking-widest font-semibold">
                          {item.subtitle}
                        </span>
                        <h3 className={`text-base font-bold transition-colors duration-200 ${isActive ? 'text-forsythia' : 'text-arctic'}`}>
                          {item.title}
                        </h3>
                      </div>
                    </div>
                    
                    {/* Chevron expand indicator */}
                    <div className={`transition-transform duration-300 ${isActive ? 'rotate-180 text-forsythia' : 'text-mystic/40'}`}>
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>

                  {/* Accordion Body */}
                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      isActive ? 'max-h-[360px] border-t border-arctic/5 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="p-6 pt-5 space-y-4">
                      <p className="text-sm text-mystic/70 leading-relaxed font-sans">
                        {item.description}
                      </p>
                      
                      <div className="space-y-3">
                        <span className="block text-[9px] font-mono text-forsythia uppercase tracking-widest font-semibold">
                          Enterprise SLA metrics
                        </span>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="p-3 bg-arctic/5 rounded-xl border border-arctic/5">
                            <span className="block text-[9px] text-mystic/55 font-mono">THROUGHPUT</span>
                            <div className="flex items-center gap-1 mt-1">
                              <CheckIcon className="h-3.5 w-3.5 text-forsythia" />
                              <span className="text-xs font-mono font-bold text-arctic">99.98% SLA</span>
                            </div>
                          </div>
                          <div className="p-3 bg-arctic/5 rounded-xl border border-arctic/5">
                            <span className="block text-[9px] text-mystic/55 font-mono">COMPLIANCE</span>
                            <div className="flex items-center gap-1 mt-1">
                              <CheckIcon className="h-3.5 w-3.5 text-forsythia" />
                              <span className="text-xs font-mono font-bold text-arctic">SOC2 Encrypted</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
