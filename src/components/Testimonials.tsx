/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { testimonials } from '../data/landingData';
import { ChevronLeft, ChevronRight } from './SvgIcons';

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTest = testimonials[activeIndex];

  return (
    <section id="testimonials" className="py-24 bg-oceanic border-t border-arctic/5 relative overflow-hidden" aria-labelledby="testimonials-title">
      {/* Background Soft Glow */}
      <div className="absolute top-[40%] right-[-15%] w-[35vw] h-[35vw] rounded-full bg-saffron/5 filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-forsythia uppercase tracking-widest mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-3.5 w-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21.75l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
              </svg>
              <span>Customer Reviews</span>
            </div>
            <h2 id="testimonials-title" className="text-3xl sm:text-5xl font-sans font-bold tracking-tight text-arctic mb-4">
              Trusted by the pioneers
            </h2>
            <p className="text-lg text-mystic/70 leading-relaxed font-sans">
              Read how engineering groups and automation teams deploy, monitor, and scale their bespoke automated workflows.
            </p>
          </div>

          {/* Navigation Controls using provided ChevronLeft / ChevronRight SVGs */}
          <div className="flex items-center gap-3">
            <button
              onClick={prevSlide}
              className="p-3 rounded-full border border-arctic/10 bg-oceanic/80 text-mystic hover:text-forsythia hover:border-forsythia/35 transition-all outline-none focus-visible:ring-1 focus-visible:ring-forsythia"
              aria-label="Previous review"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextSlide}
              className="p-3 rounded-full border border-arctic/10 bg-oceanic/80 text-mystic hover:text-forsythia hover:border-forsythia/35 transition-all outline-none focus-visible:ring-1 focus-visible:ring-forsythia"
              aria-label="Next review"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Featured Testimonial Card Slider with fade-in and smooth sliding effect */}
        <div className="max-w-4xl mx-auto">
          <div
            key={currentTest.id}
            className="relative p-8 sm:p-12 rounded-3xl transition-all duration-500 glass-panel bg-oceanic/50 border border-arctic/10 hover:border-forsythia/10 flex flex-col justify-between min-h-[320px] shadow-2xl animate-fade-in"
          >
            {/* Quote marks background */}
            <div className="absolute top-8 right-8 text-forsythia/10 pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="h-20 w-20">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>

            <div>
              {/* Stars rating and corporate metadata */}
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-1" aria-label={`Rating: ${currentTest.rating} stars`}>
                  {[...Array(currentTest.rating)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-forsythia">
                      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                    </svg>
                  ))}
                </div>
                <span className="text-xs font-mono text-forsythia/80 uppercase tracking-widest font-extrabold bg-forsythia/10 px-3 py-1 rounded-md border border-forsythia/15">
                  {currentTest.company}
                </span>
              </div>

              {/* Quote Description */}
              <blockquote className="text-xl sm:text-2xl text-arctic font-medium leading-relaxed font-sans italic mb-10">
                &ldquo;{currentTest.quote}&rdquo;
              </blockquote>
            </div>

            {/* Author Info */}
            <div className="flex items-center justify-between pt-6 border-t border-arctic/5 mt-auto">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-forsythia/15 text-forsythia font-bold text-base flex items-center justify-center border border-forsythia/20">
                  {currentTest.avatarLetter}
                </div>
                <div>
                  <div className="text-base font-bold text-arctic">{currentTest.author}</div>
                  <div className="text-xs font-mono text-mystic/50 mt-0.5">{currentTest.role}</div>
                </div>
              </div>

              {/* Dots tracker indicator */}
              <div className="flex items-center gap-1.5">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      activeIndex === idx ? 'w-6 bg-forsythia' : 'w-2 bg-arctic/10'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
