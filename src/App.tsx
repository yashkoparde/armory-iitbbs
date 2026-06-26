/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import TrustedBy from './components/TrustedBy';
import CaseStudies from './components/CaseStudies';
import ResponsiveBentoWrapper from './components/ResponsiveBentoWrapper';
import WorkflowBuilder from './components/WorkflowBuilder';
import DashboardTelemetry from './components/DashboardTelemetry';
import AutonomyTabs from './components/AutonomyTabs';
import PricingSection from './components/PricingSection';
import Testimonials from './components/Testimonials';
import InsightsSection from './components/InsightsSection';
import FAQSection from './components/FAQSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import { ChevronUpSolid } from './components/SvgIcons';

export default function App() {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-oceanic text-arctic selection:bg-forsythia selection:text-oceanic antialiased relative">
      {/* Structural Accessible Navigation Header */}
      <Header />

      {/* Semantic main content wrapper */}
      <main className="flex-grow">
        <Hero />
        <TrustedBy />
        <CaseStudies />
        <ResponsiveBentoWrapper />
        <WorkflowBuilder />
        <DashboardTelemetry />
        <AutonomyTabs />
        <PricingSection />
        <Testimonials />
        <InsightsSection />
        <FAQSection />
        <CTASection />
      </main>

      {/* Footer Watermark */}
      <Footer />

      {/* Floating Back to Top Button rendering ChevronUpSolid SVG */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-40 p-3.5 rounded-full bg-forsythia text-oceanic shadow-lg transition-all duration-300 hover:bg-saffron transform active:scale-95 focus:outline-none focus:ring-1 focus:ring-arctic ${
          showScroll ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'
        }`}
        aria-label="Back to top"
      >
        <ChevronUpSolid className="h-5 w-5" />
      </button>
    </div>
  );
}
