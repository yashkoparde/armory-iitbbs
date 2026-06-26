/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Cube16Solid, ArrowTrendingUp } from './SvgIcons';

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden bg-oceanic"
      aria-labelledby="hero-title"
    >
      {/* Decorative Grid Overlay */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(241,246,244,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(241,246,244,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"
        aria-hidden="true"
      />

      {/* Background Glowing Mesh Orbs */}
      <div className="absolute top-[20%] left-[10%] w-[30vw] h-[30vw] rounded-full bg-nocturnal/20 filter blur-[100px] animate-pulse-slow" aria-hidden="true" />
      <div className="absolute bottom-[15%] right-[10%] w-[25vw] h-[25vw] rounded-full bg-saffron/10 filter blur-[120px] animate-pulse-slow [animation-delay:2s]" aria-hidden="true" />
      <div className="absolute top-[40%] right-[30%] w-[15vw] h-[15vw] rounded-full bg-forsythia/10 filter blur-[80px] animate-pulse-slow [animation-delay:4s]" aria-hidden="true" />

      {/* Floating Hardware Accel Shapes */}
      <div
        className="hidden lg:block absolute top-[25%] left-[15%] glass-panel-light p-4 rounded-xl shadow-2xl animate-float pointer-events-none"
        aria-hidden="true"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-forsythia/10 rounded-lg text-forsythia">
            <Cube16Solid className="h-5 w-5" />
          </div>
          <div>
            <div className="text-xs font-mono text-arctic/50">SYSTEM_MODE</div>
            <div className="text-sm font-semibold text-arctic">Pipeline Compiler</div>
          </div>
        </div>
      </div>

      <div
        className="hidden lg:block absolute bottom-[25%] right-[15%] glass-panel-light p-4 rounded-xl shadow-2xl animate-float-delayed pointer-events-none"
        aria-hidden="true"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-saffron/10 rounded-lg text-saffron">
            <ArrowTrendingUp className="h-5 w-5" />
          </div>
          <div>
            <div className="text-xs font-mono text-arctic/50">UPTIME_SLA</div>
            <div className="text-sm font-semibold text-forsythia">99.99% Guaranteed</div>
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        {/* Upper Micro-Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel text-xs font-mono text-arctic/90 mb-8 animate-fade-in uppercase tracking-wider">
          <Cube16Solid className="h-3.5 w-3.5 text-forsythia" />
          <span>Enterprise Data Core</span>
        </div>

        {/* H1 Title with Custom Font Hierarchy */}
        <h1
          id="hero-title"
          className="text-4xl sm:text-6xl lg:text-8xl font-sans font-bold tracking-tight text-arctic leading-tight mb-6 max-w-5xl mx-auto animate-slide-up"
        >
          Power your <span className="text-transparent bg-clip-text bg-gradient-to-r from-forsythia via-saffron to-mystic">pipelines</span> with data automation
        </h1>

        {/* Supporting Copy */}
        <p className="text-lg sm:text-xl text-mystic/80 max-w-3xl mx-auto mb-10 leading-relaxed font-sans animate-slide-up [animation-delay:150ms]">
          Deploy custom enterprise workflows and automate complex database pipelines. Scale your system telemetry and infrastructure securely with <span className="font-semibold text-arctic">Armory</span> today.
        </p>

        {/* Dual CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up [animation-delay:300ms]">
          <a
            href="#workflow"
            className="group flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 bg-forsythia hover:bg-saffron text-oceanic font-bold text-base rounded-xl transition-all duration-300 transform active:scale-95 shadow-xl hover:shadow-forsythia/10 focus-visible:ring-2 focus-visible:ring-arctic"
          >
            <span>Build a Workflow</span>
            <span className="p-1 bg-oceanic/10 rounded-md transition-transform group-hover:translate-x-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </span>
          </a>
          <a
            href="#pricing"
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 glass-panel hover:bg-arctic/5 text-arctic font-semibold text-base rounded-xl transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-forsythia"
          >
            <span>Request Demo</span>
          </a>
        </div>
      </div>
    </section>
  );
}
