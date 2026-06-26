/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { caseStudies } from '../data/landingData';
import { ChevronRight, Cube16Solid, LinkSolid, XMark, ArrowPath, Cog8Tooth } from './SvgIcons';

// Rich mock data configuration for each case study's interactive ecosystem
interface EcosystemInfo {
  title: string;
  subtitle: string;
  color: string;
  accentClass: string;
  stats: { label: string; value: string }[];
  steps: { label: string; icon: 'cube' | 'path' | 'cog' | 'check'; status: string }[];
  logs: string[];
}

const ECOSYSTEM_DATA: Record<string, EcosystemInfo> = {
  cigna: {
    title: 'Cigna Health Systems',
    subtitle: 'Automated Document Ingestion & Routing Infrastructure',
    color: '#FFC801', // Forsythia
    accentClass: 'text-forsythia border-forsythia/20',
    stats: [
      { label: 'Auto-Ingestion', value: '84% of docs' },
      { label: 'Validation rate', value: '100% Pass' },
      { label: 'Queue Backlog', value: '0 items' },
      { label: 'Route Speed', value: '180ms/doc' }
    ],
    steps: [
      { label: 'Inbound Payload', icon: 'cube', status: 'Active' },
      { label: 'AI Indexing', icon: 'path', status: 'Running' },
      { label: 'EMR Sync Gateway', icon: 'cog', status: 'Pending' },
      { label: 'Dispatch Success', icon: 'check', status: 'Completed' }
    ],
    logs: [
      'SYSTEM: Launching Cigna ingestion thread #49a2...',
      'INGESTION: Inbound payload detected size=2.4MB mimetype=application/pdf',
      'AI_PARSER: Scanning document fields via V8 Schema Validator...',
      'AI_PARSER: Indexed patient_id, insurance_provider, diagnosis_codes (84% score)',
      'SYNC_GATEWAY: Initiating secure TLS 1.3 handshake with Cigna EMR endpoint...',
      'SYNC_GATEWAY: Connection authorized. Encrypted payload sync committed successfully.',
      'DISPATCH: Clearing router queue backlog... Done. Current depth: 0.',
      'MONITOR: Thread #49a2 exited with status 200 OK'
    ]
  },
  aetna: {
    title: 'Aetna Data Ecosystem',
    subtitle: 'Secure Policy Audits Encrypted Query Engine',
    color: '#FF9932', // Deep Saffron
    accentClass: 'text-saffron border-saffron/20',
    stats: [
      { label: 'Daily Audits', value: '1.2M policy audits' },
      { label: 'Access Auditing', value: 'Zero-Knowledge' },
      { label: 'Average Jitter', value: '<2ms' },
      { label: 'Cipher Suite', value: 'AES-256-GCM' }
    ],
    steps: [
      { label: 'Audit Request', icon: 'cube', status: 'Active' },
      { label: 'Decryption Core', icon: 'path', status: 'Running' },
      { label: 'Ledger Audit Verify', icon: 'cog', status: 'Pending' },
      { label: 'Audited Report', icon: 'check', status: 'Completed' }
    ],
    logs: [
      'SYSTEM: Initializing encrypted query engine vault...',
      'AUDIT: Serving 1.2M daily active query request ID #ae-910...',
      'DECRYPT: Fetching keys from Zero-Knowledge HSM module...',
      'DECRYPT: Payload decrypted. Decryption latency: 1.2ms',
      'LEDGER: Verifying access token signature on ledger node #3...',
      'LEDGER: Audit log signature matches block #838291.',
      'AUDIT: Policy audit committed to secure vault database.',
      'MONITOR: Query ID #ae-910 resolved with zero downtime.'
    ]
  },
  anthem: {
    title: 'Anthem Networks',
    subtitle: 'Provider Inquiry Intelligent Routing Pipeline',
    color: '#D9E8E2', // Mystic Mint
    accentClass: 'text-mystic border-mystic/20',
    stats: [
      { label: 'Endpoints Map', value: '12 databases' },
      { label: 'Auto-Dispatch', value: '92.5%' },
      { label: 'Active Channels', value: '256 pipelines' },
      { label: 'Pipeline Uptime', value: '100.00%' }
    ],
    steps: [
      { label: 'Provider Inquiry', icon: 'cube', status: 'Active' },
      { label: '12 Endpoint Query', icon: 'path', status: 'Running' },
      { label: 'Unified Dispatcher', icon: 'cog', status: 'Pending' },
      { label: 'Provider Answer', icon: 'check', status: 'Completed' }
    ],
    logs: [
      'SYSTEM: Anthem networks dispatcher thread #an-512 active.',
      'DISPATCHER: Querying 12 isolated database endpoints concurrently...',
      'QUERY_BUS: Connection handshake resolved on endpoint_3 (8ms)',
      'QUERY_BUS: Connection handshake resolved on endpoint_7 (12ms)',
      'INTEGRATOR: Compiling response schemas into singular unified data model...',
      'CLASSIFIER: Routing inquiry to regional support team (Category: Claim Audit)',
      'DISPATCHER: Inquiry successfully dispatched to regional queue.',
      'MONITOR: Pipeline run #an-512 completed successfully.'
    ]
  }
};

export default function CaseStudies() {
  const [activeId, setActiveId] = useState<string>('cigna');
  const [selectedEcosystem, setSelectedEcosystem] = useState<string | null>(null);

  // States inside modal animation
  const [activeStepIdx, setActiveStepIdx] = useState<number>(0);
  const [visibleLogs, setVisibleLogs] = useState<string[]>([]);

  const activeStudy = caseStudies.find((s) => s.id === activeId) || caseStudies[0];

  // Helper to map color gradients for the active preview frame
  const getGlowGradient = (id: string) => {
    switch (id) {
      case 'cigna':
        return 'from-forsythia/35 via-saffron/10 to-transparent';
      case 'aetna':
        return 'from-saffron/35 via-mystic/10 to-transparent';
      case 'anthem':
        return 'from-mystic/40 via-nocturnal/25 to-transparent';
      default:
        return 'from-forsythia/35 to-transparent';
    }
  };

  // Keyboard close for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedEcosystem(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Modal animation - cycle steps & stream logs
  useEffect(() => {
    if (!selectedEcosystem) {
      setVisibleLogs([]);
      setActiveStepIdx(0);
      return;
    }

    const eco = ECOSYSTEM_DATA[selectedEcosystem];
    if (!eco) return;

    // Reset and initialize visible logs
    setVisibleLogs([eco.logs[0]]);
    setActiveStepIdx(0);

    const stepInterval = setInterval(() => {
      setActiveStepIdx((prev) => (prev + 1) % eco.steps.length);
    }, 2800);

    let currentLogIdx = 1;
    const logInterval = setInterval(() => {
      if (currentLogIdx < eco.logs.length) {
        setVisibleLogs((prev) => [...prev, eco.logs[currentLogIdx]]);
        currentLogIdx++;
      } else {
        // Reset stream
        setVisibleLogs([eco.logs[0]]);
        currentLogIdx = 1;
      }
    }, 2000);

    return () => {
      clearInterval(stepInterval);
      clearInterval(logInterval);
    };
  }, [selectedEcosystem]);

  // Current active ecosystem modal info
  const ecoInfo = selectedEcosystem ? ECOSYSTEM_DATA[selectedEcosystem] : null;

  return (
    <section id="features" className="py-24 bg-oceanic relative overflow-hidden" aria-labelledby="cases-title">
      {/* Accent Light */}
      <div className="absolute top-[30%] right-[-10%] w-[35vw] h-[35vw] rounded-full bg-nocturnal/20 filter blur-[130px] pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main 2-Column Grid matching the demo.mp4 structural layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column (Span 5): Titles, Shifting Preview & More Projects CTA */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono text-forsythia uppercase tracking-widest mb-3">
                <Cube16Solid className="h-3.5 w-3.5" />
                <span>Case Studies</span>
              </div>
              <h2 id="cases-title" className="text-3xl sm:text-5xl font-sans font-bold tracking-tight text-arctic mb-4">
                Proven pipeline solutions
              </h2>
              <p className="text-lg text-mystic/70 leading-relaxed font-sans">
                We partner with industry leaders to deploy secure data pipelines that solve complex operational hurdles.
              </p>
            </div>

            {/* Shifting visual preview screen matching active selection */}
            <div className="relative h-56 rounded-2xl glass-panel overflow-hidden bg-oceanic/40 flex items-center justify-center border border-arctic/10">
              <div className={`absolute inset-0 bg-gradient-to-tr ${getGlowGradient(activeId)} transition-all duration-700 ease-in-out`} />
              
              {/* Dynamic abstract grid pattern inside screen */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(241,246,244,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(241,246,244,0.01)_1px,transparent_1px)] bg-[size:15px_15px] opacity-30" />
              
              {/* Pulsing visual node logo of the active partner */}
              <div className="relative z-10 text-center animate-fade-in" key={activeId}>
                <span className="font-sans font-extrabold text-5xl tracking-tighter text-arctic/85 drop-shadow-[0_4px_12px_rgba(255,255,255,0.05)]">
                  {activeStudy.logo.toLowerCase()}
                </span>
                <span className="block text-[10px] font-mono text-forsythia/80 uppercase tracking-widest mt-2">
                  {activeStudy.company}
                </span>
              </div>
            </div>

            {/* More Projects trigger button */}
            <button className="group flex items-center gap-2 text-xs font-mono font-bold text-arctic hover:text-forsythia transition-colors uppercase tracking-widest">
              <span>More Projects</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="h-4 w-4 transition-transform group-hover:translate-x-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>

          {/* Right Column (Span 7): Accordion-like Vertical Cards Stack */}
          <div className="lg:col-span-7 space-y-4">
            {caseStudies.map((study) => {
              const isActive = activeId === study.id;
              return (
                <div
                  key={study.id}
                  onMouseEnter={() => setActiveId(study.id)}
                  onClick={() => {
                    if (isActive) {
                      setSelectedEcosystem(study.id);
                    } else {
                      setActiveId(study.id);
                    }
                  }}
                  className={`group relative p-6 sm:p-8 rounded-2xl transition-all duration-300 border cursor-pointer glass-panel ${
                    isActive
                      ? 'border-forsythia bg-arctic/[0.02] shadow-xl shadow-forsythia/5 scale-[1.01]'
                      : 'border-arctic/10 bg-oceanic/40 hover:border-arctic/20'
                  }`}
                  style={{
                    boxShadow: isActive
                      ? `0 20px 40px -15px ${study.glowColor}, inset 0 1px 1px 0 rgba(241, 246, 244, 0.1)`
                      : 'none'
                  }}
                >
                  {/* Top row: Always visible */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-mono text-mystic/40 tracking-wider">{study.year}</span>
                      <span className={`text-base font-bold transition-colors ${isActive ? 'text-forsythia' : 'text-arctic'}`}>
                        {study.company}
                      </span>
                    </div>
                    <div className={`transition-transform duration-300 ${isActive ? 'rotate-90 text-forsythia' : 'text-mystic/40'}`}>
                      <ChevronRight className="h-4 w-4" />
                    </div>
                  </div>

                  {/* Accordion description body: slides smoothly with safety height */}
                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      isActive
                        ? 'max-h-[30rem] opacity-100 mt-4 pt-4 border-t border-arctic/5'
                        : 'max-h-0 opacity-0'
                    }`}
                  >
                    <h3 className="text-lg sm:text-xl font-bold text-arctic tracking-tight mb-2">
                      {study.title}
                    </h3>
                    <p className="text-sm text-mystic/60 leading-relaxed font-sans mb-5">
                      {study.description}
                    </p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedEcosystem(study.id);
                      }}
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-forsythia font-bold uppercase tracking-widest hover:text-saffron transition-colors cursor-pointer bg-transparent border-none p-0 outline-none"
                    >
                      <LinkSolid className="h-3.5 w-3.5" />
                      <span>Explore Ecosystem</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>

      {/* Ecosystem Detail Dialog Modal */}
      {selectedEcosystem && ecoInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
          {/* Blur backdrop */}
          <div 
            className="absolute inset-0 bg-oceanic/85 backdrop-blur-md transition-opacity duration-300 cursor-pointer"
            onClick={() => setSelectedEcosystem(null)}
          />
          
          {/* Modal box */}
          <div className="relative z-10 w-full max-w-3xl max-h-[90vh] bg-oceanic/95 border border-arctic/15 rounded-3xl shadow-2xl overflow-y-auto scrollbar-thin p-6 sm:p-8 md:p-10 animate-fade-in flex flex-col justify-between">
            {/* Close trigger top right */}
            <button
              onClick={() => setSelectedEcosystem(null)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-arctic/5 text-mystic/60 hover:text-arctic transition-colors outline-none"
              aria-label="Close modal"
            >
              <XMark className="h-5 w-5" />
            </button>

            {/* Title block */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-forsythia uppercase tracking-widest mb-1.5">
                <Cube16Solid className="h-3.5 w-3.5 animate-pulse-slow" />
                <span>Verified System Architecture</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-sans font-bold text-arctic tracking-tight">
                {ecoInfo.title}
              </h3>
              <p className="text-sm text-mystic/65 font-sans mt-1">
                {ecoInfo.subtitle}
              </p>
            </div>

            {/* Performance Stats Dashboard */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {ecoInfo.stats.map((stat, idx) => (
                <div key={idx} className="p-4 rounded-2xl border border-arctic/5 bg-arctic/[0.01]">
                  <span className="text-[10px] font-mono text-mystic/40 uppercase tracking-wider block">
                    {stat.label}
                  </span>
                  <span className="text-sm sm:text-base font-mono font-bold text-arctic mt-1 block">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Interactive SVG Pipeline Graph */}
            <div className="p-6 rounded-2xl border border-arctic/10 bg-oceanic/60 relative overflow-hidden mb-6 h-56 flex flex-col justify-between">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(241,246,244,0.005)_1px,transparent_1px),linear-gradient(to_bottom,rgba(241,246,244,0.005)_1px,transparent_1px)] bg-[size:12px_12px] opacity-40" />
              
              <div className="flex justify-between items-center z-10">
                <span className="text-[10px] font-mono text-mystic/40 uppercase font-semibold">Active Sync Topology</span>
                <span className="flex items-center gap-1.5 text-[9px] font-mono text-forsythia bg-forsythia/10 px-2.5 py-0.5 rounded font-bold uppercase tracking-wider animate-pulse-slow">
                  <span className="h-1.5 w-1.5 rounded-full bg-forsythia inline-block animate-ping" />
                  Live Syncing
                </span>
              </div>

              {/* Graphical nodes */}
              <div className="flex items-center justify-between relative px-2 sm:px-6 my-auto z-10">
                {ecoInfo.steps.map((step, idx) => (
                  <div key={idx} className="flex flex-col items-center relative z-10 w-24">
                    <div className={`h-11 w-11 rounded-full flex items-center justify-center border transition-all duration-500 ${
                      idx === activeStepIdx
                        ? 'bg-forsythia/15 border-forsythia text-forsythia shadow-lg shadow-forsythia/15 scale-110'
                        : idx < activeStepIdx
                        ? 'bg-nocturnal/30 border-mystic/30 text-mystic/55'
                        : 'bg-oceanic/90 border-arctic/5 text-mystic/20'
                    }`}>
                      {idx === 0 && <Cube16Solid className="h-5 w-5" />}
                      {idx === 1 && <ArrowPath className={`h-5 w-5 ${idx === activeStepIdx ? 'animate-spin' : ''}`} />}
                      {idx === 2 && <Cog8Tooth className={`h-5 w-5 ${idx === activeStepIdx ? 'animate-spin' : ''}`} />}
                      {idx === 3 && (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="h-5 w-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                      )}
                    </div>
                    <span className="text-[9px] font-mono text-center font-bold tracking-tight text-mystic/80 mt-2 truncate w-full">
                      {step.label}
                    </span>
                  </div>
                ))}

                {/* SVG Connections between nodes */}
                <svg className="absolute inset-x-0 top-5.5 h-2 w-full -z-10 pointer-events-none" preserveAspectRatio="none">
                  {/* Base track */}
                  <line x1="8%" y1="50%" x2="92%" y2="50%" stroke="rgba(241, 246, 244, 0.05)" strokeWidth="2" />
                  {/* Progress track */}
                  <line 
                    x1="8%" 
                    y1="50%" 
                    x2={`${8 + (activeStepIdx / 3) * 84}%`} 
                    y2="50%" 
                    stroke="#FFC801" 
                    strokeWidth="2" 
                    className="transition-all duration-1000 ease-in-out" 
                  />
                </svg>
              </div>

              <div className="text-[9px] font-mono text-mystic/30 z-10 flex justify-between">
                <span>Network Latency: {12 + activeStepIdx * 4}ms</span>
                <span>Thread ID: route_{selectedEcosystem}_v3</span>
              </div>
            </div>

            {/* Live Terminal Output */}
            <div className="flex flex-col min-h-[160px] max-h-[220px] rounded-2xl border border-arctic/10 bg-black/40 overflow-hidden">
              <div className="bg-black/20 border-b border-arctic/5 px-4 py-2 flex items-center justify-between">
                <div className="flex gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
                  <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
                </div>
                <span className="text-[9px] font-mono text-mystic/40 uppercase tracking-widest font-semibold">
                  Console Output
                </span>
              </div>
              <div className="p-4 font-mono text-[10px] space-y-1.5 overflow-y-auto flex-1 h-full scrollbar-thin text-emerald-400/90">
                {visibleLogs.map((log, idx) => {
                  let logColor = 'text-mystic/60';
                  if (log.startsWith('SYSTEM:')) logColor = 'text-forsythia/85 font-semibold';
                  else if (log.includes('successfully') || log.includes('OK') || log.includes('Done')) logColor = 'text-emerald-400 font-bold';
                  else if (log.startsWith('AI_PARSER:') || log.startsWith('DECRYPT:') || log.startsWith('QUERY_BUS:')) logColor = 'text-arctic';
                  
                  return (
                    <div key={idx} className={`${logColor} leading-relaxed`}>
                      <span className="text-mystic/30 select-none mr-2">$</span>
                      {log}
                    </div>
                  );
                })}
                <div className="h-2.5 w-1.5 bg-emerald-400/80 inline-block animate-pulse ml-0.5" style={{ verticalAlign: 'middle' }} />
              </div>
            </div>

            {/* Close footer */}
            <div className="mt-8 flex justify-end">
              <button
                onClick={() => setSelectedEcosystem(null)}
                className="px-6 py-2.5 rounded-xl bg-arctic text-oceanic font-sans font-bold text-xs uppercase tracking-wider hover:bg-forsythia hover:text-oceanic transition-all duration-300 transform active:scale-95 outline-none"
              >
                Close Workspace
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
