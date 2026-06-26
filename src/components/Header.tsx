/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Cog8Tooth, XMark } from './SvgIcons';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Data Strategy', href: '#features' },
    { label: 'Platform Capabilities', href: '#bento' },
    { label: 'Workflow Builder', href: '#workflow' },
    { label: 'Infrastructure Metrics', href: '#telemetry' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-oceanic/80 backdrop-blur-md border-b border-arctic/10 py-4 shadow-lg'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-2 text-2xl font-bold tracking-tighter text-arctic focus-visible:ring-2 focus-visible:ring-forsythia rounded-md"
            aria-label="Armory Home"
          >
            <Cog8Tooth className="h-6 w-6 text-forsythia" />
            <span className="font-mono lowercase">armory</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-arctic/80 hover:text-forsythia transition-colors duration-200 focus-visible:text-forsythia"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="#pricing"
              className="text-sm font-medium text-arctic hover:text-forsythia transition-colors duration-200 focus-visible:text-forsythia"
            >
              Sign In
            </a>
            <a
              href="#pricing"
              className="flex items-center gap-1.5 px-4 py-2 bg-forsythia hover:bg-saffron text-oceanic font-semibold text-sm rounded-lg transition-all duration-300 transform active:scale-95 shadow-md focus-visible:ring-2 focus-visible:ring-arctic"
            >
              <span>Start Trial</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="h-3.5 w-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-arctic/80 hover:text-forsythia hover:bg-arctic/5 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-forsythia"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <XMark className="h-6 w-6" />
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <div
        id="mobile-menu"
        className={`md:hidden fixed inset-x-0 top-[64px] bg-oceanic/95 backdrop-blur-lg border-b border-arctic/10 transition-all duration-300 ease-in-out origin-top ${
          isOpen ? 'opacity-100 scale-y-100 h-screen overflow-y-auto' : 'opacity-0 scale-y-0 h-0 pointer-events-none'
        }`}
      >
        <div className="px-4 pt-4 pb-20 space-y-3">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-4 text-lg font-medium text-arctic hover:text-forsythia border-b border-arctic/5 focus-visible:text-forsythia"
            >
              {item.label}
            </a>
          ))}
          <div className="pt-6 px-3 space-y-4">
            <a
              href="#pricing"
              onClick={() => setIsOpen(false)}
              className="block text-center text-lg font-medium text-arctic hover:text-forsythia py-2 focus-visible:text-forsythia"
            >
              Sign In
            </a>
            <a
              href="#pricing"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-1.5 w-full py-4 bg-forsythia hover:bg-saffron text-oceanic font-bold rounded-xl transition-all shadow-md focus-visible:ring-2 focus-visible:ring-arctic"
            >
              <span>Start Trial</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
