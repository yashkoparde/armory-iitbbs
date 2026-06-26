/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MailCheck, ArrowRight } from 'lucide-react';

export default function CTASection() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitted(true);
    // Mimic API subscription
    setTimeout(() => {
      setEmail('');
    }, 2000);
  };

  return (
    <section id="cta" className="py-24 bg-oceanic border-t border-arctic/5 relative overflow-hidden" aria-labelledby="cta-title">
      {/* Background glowing circles */}
      <div className="absolute top-[20%] right-[-10%] w-[35vw] h-[35vw] rounded-full bg-saffron/10 filter blur-[140px] pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-[10%] left-[10%] w-[25vw] h-[25vw] rounded-full bg-forsythia/10 filter blur-[100px] pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="glass-panel p-8 sm:p-16 rounded-3xl relative overflow-hidden text-center max-w-5xl mx-auto">
          {/* Subtle overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-forsythia/[0.02] via-transparent to-transparent pointer-events-none" />


          {/* Header */}
          <h2 id="cta-title" className="text-3xl sm:text-5xl font-sans font-bold tracking-tight text-arctic mb-4 max-w-3xl mx-auto leading-tight">
            Get smarter about AI systems
          </h2>
          <p className="text-base sm:text-lg text-mystic/70 max-w-2xl mx-auto mb-10 leading-relaxed font-sans">
            Weekly insights on automation, AI workflows, and real system builds. No fluff, just what actually works in production.
          </p>

          {/* Newsletter form with validation and accessibility states */}
          <div className="max-w-md mx-auto">
            {isSubmitted ? (
              <div className="p-6 bg-forsythia/10 border border-forsythia/20 rounded-2xl text-center">
                <div className="inline-flex p-3 bg-forsythia/20 text-forsythia rounded-xl mb-3">
                  <MailCheck className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-arctic tracking-tight">You\'re subscribed</h3>
                <p className="text-xs text-mystic/60 font-sans mt-1">We dispatch custom intelligence reports every Tuesday morning.</p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-4 text-xs font-mono text-forsythia hover:text-saffron font-bold uppercase tracking-widest outline-none"
                >
                  Subscribe another email
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <label htmlFor="cta-email" className="sr-only">Email Address</label>
                  <input
                    id="cta-email"
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-5 py-4 bg-oceanic/90 text-arctic font-medium rounded-xl border border-arctic/10 focus:border-forsythia focus:ring-1 focus:ring-forsythia outline-none transition-all placeholder:text-mystic/35 text-sm font-sans"
                  />
                </div>
                <button
                  type="submit"
                  className="group flex items-center justify-center gap-2 px-6 py-4 bg-forsythia hover:bg-saffron text-oceanic font-bold text-sm rounded-xl transition-all duration-300 transform active:scale-95 shadow-md shadow-forsythia/10 font-sans uppercase tracking-wider whitespace-nowrap"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
