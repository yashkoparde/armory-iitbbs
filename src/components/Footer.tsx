/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Cog8Tooth, LinkIcon } from './SvgIcons';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const links = {
    quick: [
      { label: 'Home', href: '#' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Projects', href: '#features' },
      { label: 'Articles', href: '#autonomy' }
    ],
    company: [
      { label: 'About Us', href: '#' },
      { label: 'Contact Us', href: '#faq' },
      { label: 'Book A Call', href: '#pricing' },
      { label: 'More Templates', href: '#' }
    ],
    policies: [
      { label: 'Terms & Conditions', href: '#' },
      { label: 'Privacy Policy', href: '#' }
    ]
  };

  return (
    <footer className="bg-oceanic border-t border-arctic/10 pt-20 pb-12 overflow-hidden" aria-label="Footer Navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          
          {/* Logo & Description */}
          <div className="lg:col-span-2 space-y-6">
            <a href="#" className="flex items-center gap-2 text-2xl font-bold tracking-tighter text-arctic select-none">
              <Cog8Tooth className="h-6 w-6 text-forsythia" />
              <span className="font-mono lowercase">armory</span>
            </a>
            <p className="text-sm text-mystic/60 font-sans leading-relaxed max-w-sm">
              The premium enterprise-grade Data Automation Platform. Orchestrate visual schemas, deploy custom automated workflows, and monitor systems telemetry in real-time.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-4">
              <a href="#" className="p-2.5 rounded-lg bg-arctic/5 hover:bg-forsythia hover:text-oceanic transition-all text-mystic/55" aria-label="Github link">
                <svg className="h-4.5 w-4.5 fill-current" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.193 22 16.44 22 12.017 22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
              <a href="#" className="p-2.5 rounded-lg bg-arctic/5 hover:bg-forsythia hover:text-oceanic transition-all text-mystic/55" aria-label="Twitter link">
                <svg className="h-4.5 w-4.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-mono text-mystic/40 uppercase tracking-widest font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4" aria-label="Quick links">
              {links.quick.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="group flex items-center gap-1 text-sm font-medium text-mystic/70 hover:text-forsythia transition-colors duration-200">
                    <span>{link.label}</span>
                    <LinkIcon className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h4 className="text-xs font-mono text-mystic/40 uppercase tracking-widest font-bold mb-6">Company</h4>
            <ul className="space-y-4" aria-label="Company links">
              {links.company.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="group flex items-center gap-1 text-sm font-medium text-mystic/70 hover:text-forsythia transition-colors duration-200">
                    <span>{link.label}</span>
                    <LinkIcon className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="text-xs font-mono text-mystic/40 uppercase tracking-widest font-bold mb-6">Policies</h4>
            <ul className="space-y-4" aria-label="Policies">
              {links.policies.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="group flex items-center gap-1 text-sm font-medium text-mystic/70 hover:text-forsythia transition-colors duration-200">
                    <span>{link.label}</span>
                    <LinkIcon className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Massive displays footer watermark */}
        <div className="relative border-t border-arctic/5 pt-12 text-center overflow-hidden select-none">
          <div className="absolute inset-x-0 bottom-[-50px] flex justify-center pointer-events-none opacity-5">
            <span className="font-sans font-extrabold text-[12vw] tracking-tighter lowercase leading-none text-arctic">
              armory
            </span>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-mystic/40 relative z-10">
            <span>&copy; {currentYear} Armory. All rights reserved.</span>
            <div className="flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="h-4 w-4 text-forsythia">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0v3.75" />
              </svg>
              <span>Orchestrated in Private Cloud Run Workspace</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
