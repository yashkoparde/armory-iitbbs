/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export default function TrustedBy() {
  const partners = [
    { name: 'Cigna Health', type: 'Document Routing' },
    { name: 'Aetna Ecosystem', type: 'Member Audits' },
    { name: 'Anthem Networks', type: 'Mainframe Sync' },
    { name: 'CVS Pharmacy', type: 'SLA Dispatch' },
    { name: 'UnitedHealthcare', type: 'Policy Automation' },
    { name: 'Vertex Labs', type: 'Hybrid Clusters' },
    { name: 'Sentinel Systems', type: 'Compliance Auditing' }
  ];

  // Repeat twice for infinite marquee scrolling effect
  const repeatedPartners = [...partners, ...partners, ...partners];

  return (
    <section className="bg-oceanic py-12 border-y border-arctic/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex items-center justify-center gap-2 text-xs font-mono text-mystic/60 tracking-wider uppercase">
          {/* Custom Shield Check SVG Inline */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="h-4 w-4 text-forsythia">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
          </svg>
          <span>Orchestrating production workflows for the world's largest enterprises</span>
        </div>
      </div>

      <div className="relative w-full overflow-hidden flex items-center">
        {/* Shadow Fades for Premium Matte Insets */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-oceanic to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-oceanic to-transparent z-10 pointer-events-none" />

        <div className="flex whitespace-nowrap gap-12 items-center animate-infinite-marquee">
          {repeatedPartners.map((p, idx) => (
            <div
              key={`${p.name}-${idx}`}
              className="inline-flex flex-col items-center justify-center px-6 py-2 glass-panel-light rounded-xl hover:border-forsythia/30 transition-colors duration-200 cursor-default"
            >
              <span className="text-arctic font-bold text-lg tracking-tight">{p.name}</span>
              <span className="text-[10px] font-mono text-forsythia/80 uppercase tracking-widest mt-0.5">{p.type}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
