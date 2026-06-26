/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { caseStudies } from '../data/landingData';
import { ChevronRight, Cube16Solid, LinkSolid } from './SvgIcons';

export default function CaseStudies() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section id="features" className="py-24 bg-oceanic relative overflow-hidden" aria-labelledby="cases-title">
      {/* Accent Light */}
      <div className="absolute top-[30%] right-[-10%] w-[35vw] h-[35vw] rounded-full bg-nocturnal/20 filter blur-[130px] pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-forsythia uppercase tracking-widest mb-3">
            <Cube16Solid className="h-3.5 w-3.5" />
            <span>Case Studies</span>
          </div>
          <h2 id="cases-title" className="text-3xl sm:text-5xl font-sans font-bold tracking-tight text-arctic mb-4">
            Proven pipeline solutions
          </h2>
          <p className="text-lg text-mystic/70 leading-relaxed font-sans">
            We partner with industry leaders to deploy secure data pipelines that solve complex operational hurdles and drive massive, sustainable growth.
          </p>
        </div>

        {/* Case Studies Interactive List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {caseStudies.map((study) => {
            const isHovered = hoveredId === study.id;
            return (
              <div
                key={study.id}
                onMouseEnter={() => setHoveredId(study.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="group relative p-8 rounded-2xl transition-all duration-300 flex flex-col justify-between glass-panel hover:bg-arctic/[0.02] cursor-pointer min-h-[380px]"
                style={{
                  boxShadow: isHovered
                    ? `0 20px 40px -15px ${study.glowColor}, inset 0 1px 1px 0 rgba(241, 246, 244, 0.15)`
                    : 'none'
                }}
              >
                {/* Year Indicator & Logo Accent */}
                <div className="flex justify-between items-start mb-8">
                  <span className="text-xs font-mono text-mystic/40 tracking-wider font-medium">{study.year}</span>
                  <div
                    className="px-3 py-1 rounded-md text-xs font-mono font-bold tracking-tight transition-colors duration-300"
                    style={{
                      backgroundColor: isHovered ? study.color : 'rgba(241,246,244,0.05)',
                      color: isHovered ? '#172B36' : '#F1F6F4'
                    }}
                  >
                    {study.logo}
                  </div>
                </div>

                {/* Case Study Content */}
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-arctic tracking-tight mb-4 group-hover:text-forsythia transition-colors duration-200">
                    {study.title}
                  </h3>
                  <p className="text-sm text-mystic/60 font-sans leading-relaxed">
                    {study.description}
                  </p>
                </div>

                {/* Expand / Learn More Trigger */}
                <div className="mt-8 flex items-center justify-between">
                  <span className="flex items-center gap-1 text-xs font-mono text-forsythia opacity-0 group-hover:opacity-100 transition-opacity duration-300 uppercase tracking-widest font-semibold">
                    <LinkSolid className="h-3.5 w-3.5" />
                    <span>Explore Ecosystem</span>
                  </span>
                  <div
                    className="p-2.5 rounded-full bg-arctic/5 group-hover:bg-forsythia group-hover:text-oceanic transition-all duration-300 transform group-hover:translate-x-1"
                    style={{
                      color: isHovered ? '#172B36' : '#F1F6F4'
                    }}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Callout Info */}
        <div className="mt-12 p-6 glass-panel-light rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 text-forsythia">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
            </svg>
            <span className="text-sm text-arctic/80 font-medium">Looking for customized solutions for your operational dataset?</span>
          </div>
          <a
            href="#pricing"
            className="group flex items-center gap-1.5 text-sm font-semibold text-forsythia hover:text-saffron transition-colors"
          >
            <span>Consult our platform engineers</span>
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
