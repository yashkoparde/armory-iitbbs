/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { insights } from '../data/landingData';
import { ChevronRight, Cube16Solid } from './SvgIcons';

export default function InsightsSection() {
  return (
    <section id="insights" className="py-24 bg-oceanic border-t border-arctic/5 relative overflow-hidden" aria-labelledby="insights-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-forsythia uppercase tracking-widest mb-3">
            <Cube16Solid className="h-3.5 w-3.5" />
            <span>Platform Articles</span>
          </div>
          <h2 id="insights-title" className="text-3xl sm:text-5xl font-sans font-bold tracking-tight text-arctic mb-4">
            Insights on data logic
          </h2>
          <p className="text-lg text-mystic/70 leading-relaxed font-sans">
            Deep dives into enterprise data architecture, system automation pipelines, and the future of deterministic orchestration.
          </p>
        </div>

        {/* Insights Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {insights.map((art) => (
            <div
              key={art.id}
              className="group relative p-6 sm:p-8 rounded-2xl flex flex-col justify-between transition-all duration-300 glass-panel bg-oceanic/40 hover:bg-arctic/[0.02] cursor-pointer hover:border-forsythia/20 border border-arctic/10 min-h-[360px]"
            >
              {/* Graphic Accent Box */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl opacity-10 blur-xl pointer-events-none rounded-bl-3xl" />

              <div>
                {/* Meta details */}
                <div className="flex items-center justify-between gap-4 mb-6">
                  <span className="text-[10px] font-mono text-forsythia uppercase tracking-widest font-bold">
                    {art.category}
                  </span>
                  <div className="flex items-center gap-2 text-[10px] font-mono text-mystic/40 font-semibold">
                    <span>{art.date}</span>
                    <span>&bull;</span>
                    <span>{art.readTime}</span>
                  </div>
                </div>

                {/* Article Copy */}
                <h3 className="text-xl font-bold text-arctic tracking-tight mb-4 group-hover:text-forsythia transition-colors duration-200">
                  {art.title}
                </h3>
                <p className="text-sm text-mystic/60 leading-relaxed font-sans">
                  {art.description}
                </p>
              </div>

              {/* Action read button */}
              <div className="mt-8 flex items-center justify-between">
                <span className="text-xs font-mono text-mystic/40 group-hover:text-forsythia transition-colors uppercase tracking-widest font-bold">
                  Read Article
                </span>
                <div className="p-2 rounded-full bg-arctic/5 text-arctic group-hover:bg-forsythia group-hover:text-oceanic transition-all duration-300 transform group-hover:translate-x-1">
                  <ChevronRight className="h-4 w-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
