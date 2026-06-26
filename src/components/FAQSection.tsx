/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { faqCategories } from '../data/landingData';
import { ChevronDown, ChevronUp, Cube16Solid, Search } from './SvgIcons';

export default function FAQSection() {
  const [activeCategory, setActiveCategory] = useState<string>('overview');
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0); // Default open first question
  const [searchQuery, setSearchQuery] = useState<string>('');

  const currentCategory = faqCategories.find((cat) => cat.id === activeCategory) || faqCategories[0];

  const handleToggleAccordion = (idx: number) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  // Filter questions based on search query
  const filteredQuestions = currentCategory.questions.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="faq" className="py-24 bg-oceanic border-t border-arctic/5 relative overflow-hidden" aria-labelledby="faq-title">
      {/* Soft background glow */}
      <div className="absolute top-[20%] left-[-10%] w-[35vw] h-[35vw] rounded-full bg-forsythia/5 filter blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-forsythia uppercase tracking-widest mb-3">
            <Cube16Solid className="h-3.5 w-3.5" />
            <span>Support center</span>
          </div>
          <h2 id="faq-title" className="text-3xl sm:text-5xl font-sans font-bold tracking-tight text-arctic mb-4">
            Common inquiries
          </h2>
          <p className="text-lg text-mystic/70 leading-relaxed font-sans">
            Everything you need to know about deploying, scaling, and securing your custom data pipelines with Armory. Can't find an answer?
          </p>
        </div>

        {/* FAQ Category Selection and List Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          
          {/* Categories Tab Selector (Desktop Left / Mobile Top) */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-row lg:flex-col overflow-x-auto pb-4 lg:pb-0 gap-2 border-b lg:border-b-0 lg:border-l border-arctic/10 whitespace-nowrap scrollbar-none">
              {faqCategories.map((cat) => {
                const isSelected = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActiveCategory(cat.id);
                      setExpandedIndex(0); // Reset accordion expand index on tab shift
                      setSearchQuery('');  // Clear search on tab switch
                    }}
                    className={`px-6 py-3.5 text-left text-xs font-mono uppercase tracking-wider font-bold border-b-2 lg:border-b-0 lg:border-l-2 transition-all outline-none ${
                      isSelected
                        ? 'border-forsythia text-forsythia bg-arctic/[0.02]'
                        : 'border-transparent text-mystic/55 hover:text-arctic hover:bg-arctic/[0.01]'
                    }`}
                    aria-selected={isSelected}
                    role="tab"
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Support box */}
            <div className="hidden lg:block p-5 glass-panel rounded-xl text-left bg-oceanic/40 border border-arctic/10">
              <span className="block text-[10px] font-mono text-mystic/40 uppercase tracking-widest font-semibold mb-2">Need real assistance?</span>
              <p className="text-xs text-mystic/75 leading-relaxed mb-4 font-sans">
                Our support desk is open 24/7 to answer custom database pipelines questions or draft SLAs.
              </p>
              <a
                href="#pricing"
                className="inline-flex items-center gap-2 text-xs font-mono font-bold text-forsythia hover:text-saffron transition-colors uppercase tracking-wider"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="h-4 w-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
                <span>Contact support Desk</span>
              </a>
            </div>
          </div>

          {/* Accordion Questions Stack (Right Grid, Span 2) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Premium Interactive Search input using Search SVG */}
            <div className="relative w-full">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-mystic/40">
                <Search className="h-4.5 w-4.5 text-forsythia" />
              </span>
              <input
                type="text"
                placeholder={`Search ${currentCategory.label.toLowerCase()} questions...`}
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setExpandedIndex(null); // Close active accordion when filtering
                }}
                className="w-full pl-11 pr-4 py-3.5 bg-oceanic/80 text-arctic rounded-xl border border-arctic/10 focus:border-forsythia outline-none font-sans text-sm transition-all placeholder:text-mystic/30 shadow-inner"
              />
            </div>

            {/* List */}
            <div className="space-y-4">
              {filteredQuestions.length > 0 ? (
                filteredQuestions.map((faq, idx) => {
                  const isOpen = expandedIndex === idx;
                  return (
                    <div
                      key={faq.question}
                      className={`border rounded-2xl transition-all duration-300 ${
                        isOpen
                          ? 'border-forsythia/30 bg-arctic/[0.02] shadow-md shadow-forsythia/5'
                          : 'border-arctic/10 hover:border-arctic/20 hover:bg-arctic/[0.01]'
                      }`}
                    >
                      {/* Accordion Button Trigger */}
                      <button
                        onClick={() => handleToggleAccordion(idx)}
                        className="flex justify-between items-center w-full p-6 text-left outline-none"
                        aria-expanded={isOpen}
                        aria-controls={`faq-answer-${idx}`}
                      >
                        <span className="text-base sm:text-lg font-bold text-arctic tracking-tight pr-4">
                          {faq.question}
                        </span>
                        <div className="p-1.5 rounded-full bg-arctic/5 text-mystic/50 transition-transform duration-300">
                          {isOpen ? (
                            <ChevronUp className="h-4 w-4 text-forsythia" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </div>
                      </button>

                      {/* Accordion Content Sliding Panel */}
                      <div
                        id={`faq-answer-${idx}`}
                        className={`transition-all duration-300 ease-in-out overflow-hidden ${
                          isOpen ? 'max-h-60 opacity-100 border-t border-arctic/5' : 'max-h-0 opacity-0'
                        }`}
                      >
                        <div className="p-6 text-sm sm:text-base text-mystic/80 leading-relaxed font-sans">
                          {faq.answer}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-12 p-6 glass-panel rounded-2xl border border-arctic/5">
                  <span className="block text-sm text-mystic/40 font-mono">No matching inquiries found</span>
                  <button
                    onClick={() => setSearchQuery('')}
                    className="mt-4 text-xs font-mono text-forsythia hover:text-saffron font-bold uppercase tracking-widest"
                  >
                    Reset Filter
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
