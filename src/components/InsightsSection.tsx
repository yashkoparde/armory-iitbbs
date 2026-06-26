/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { insights } from '../data/landingData';
import { ChevronRight, Cube16Solid, XMark } from './SvgIcons';

// Detailed article content structures for the reader modal
interface ArticleDetail {
  id: string;
  category: string;
  date: string;
  readTime: string;
  title: string;
  subtitle: string;
  intro: string;
  sections: { heading: string; text: string }[];
  codeSnippet?: { language: string; code: string };
  takeaway: string;
}

const ARTICLE_DETAILS: Record<string, ArticleDetail> = {
  i1: {
    id: 'i1',
    category: 'STRATEGY',
    date: 'APR 29, 2026',
    readTime: '3 MINS READ',
    title: 'What It Takes to Turn Automation Into a Business Asset',
    subtitle: 'Going beyond simple chat interactions to build deterministic data flows that actively complete production work.',
    intro: 'Natural language triggers are excellent for exploratory queries but dangerous for automated database writes or transaction processing. Without strict typing, minor text drift or unexpected values can crash critical ingestion channels. To turn automation into an asset, we must enforce validation matrices.',
    sections: [
      {
        heading: '1. The Fallacy of Natural Language in Databases',
        text: 'Relying on raw generative models to handle transaction-level operations creates massive structural vulnerabilities. Inconsistent formats, missing keys, and unexpected datatype coercions can lead to index fragmentation and compilation halts.'
      },
      {
        heading: '2. Enforcing Strict Schema Validation',
        text: 'Armory solves this by routing all inbound payloads through a static validation matrix. This compiler parses payload nodes, verifies security headers, and guarantees data matches strict schemas before any downstream writes occur.'
      }
    ],
    codeSnippet: {
      language: 'json',
      code: `{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "DocumentIngestionPayload",
  "type": "object",
  "properties": {
    "patient_id": { "type": "string", "pattern": "^PAT-[0-9]{5}$" },
    "insurance_code": { "type": "string" },
    "priority_level": { "type": "integer", "minimum": 1, "maximum": 5 }
  },
  "required": ["patient_id", "insurance_code"]
}`
    },
    takeaway: 'Deterministic logic rules prevent pipeline exceptions. Never send raw generative outputs directly to database endpoints.'
  },
  i2: {
    id: 'i2',
    category: 'ARCHITECTURE',
    date: 'APR 20, 2026',
    readTime: '4 MINS READ',
    title: 'From Scripts to Systems: The Real Shift in Automation',
    subtitle: 'Why legacy bash cron jobs are a liability and how visual event-driven state machines compile robust pipelines.',
    intro: 'Custom scripts scheduled via crontab are the silent killer of team productivity. They run unmonitored, fail without alerts, and lack isolated rollbacks or automatic failovers. A modern stack uses decentralized edge runners, persistent queues, and automated fallback hooks.',
    sections: [
      {
        heading: '1. The Fragility of Cron Jobs',
        text: 'When a scheduled script fails, finding the origin requires scouring server logs. If the script was writing to multiple endpoints, it leaves the database in an inconsistent state. There is no automatic rollback.'
      },
      {
        heading: '2. Compiling Visual Schemas to Containers',
        text: 'Visual canvases let developers map workflows as a structured network. Clicking run compiles these links straight to serverless docker containers that scale horizontally and auto-retry on server bottlenecks.'
      }
    ],
    codeSnippet: {
      language: 'javascript',
      code: `const workflow = new PipelineCompiler({
  name: "patient_sync",
  trigger: "imap_inbound",
  actions: [
    { id: "extract", runner: "regex_parser" },
    { id: "validate", runner: "v8_validator", fallback: "triage_smtp" }
  ]
});
await workflow.deploy({ target: "edge-cluster-nyc" });`
    },
    takeaway: 'Centralized observability, visual mapping, and self-healing error catchers represent the standard for modern automated platforms.'
  },
  i3: {
    id: 'i3',
    category: 'ENGINEERING',
    date: 'APR 12, 2026',
    readTime: '2 MINS READ',
    title: 'Why Your Data Outputs Feel Brittle & Inconsistent',
    subtitle: 'Isolating queue backlogs, mitigating network jitter, and configuring database pools.',
    intro: 'Inconsistent database syncs are usually caused by exhausted connection pools and unindexed queries. When high-frequency API traffic hits a standard database, connections hang, creating queue backlogs.',
    sections: [
      {
        heading: '1. Latency Jitter Mitigation',
        text: 'Network jitter occurs when packets arrive out of order or experiences regional routing blockages. Standard retry configurations double this traffic, worsening the latency.'
      },
      {
        heading: '2. Active Load Balancing',
        text: 'Armory maintains active load balancing connections across regional clusters (e.g. BLR and NYC edge nodes), ensuring that requests are routed dynamically based on real-time server telemetry.'
      }
    ],
    codeSnippet: {
      language: 'typescript',
      code: `interface PoolConfig {
  maxConnections: number;
  minIdle: number;
  idleTimeoutMs: number;
  acquireTimeoutMs: number;
}
const dbPool: PoolConfig = {
  maxConnections: 128,
  minIdle: 10,
  idleTimeoutMs: 30000,
  acquireTimeoutMs: 5000
};`
    },
    takeaway: 'Optimize database pools, index query columns, and route traffic based on real-time telemetry to reduce queue backlogs to zero.'
  }
};

export default function InsightsSection() {
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);

  // Keyboard close listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedArticleId(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const activeArticle = selectedArticleId ? ARTICLE_DETAILS[selectedArticleId] : null;

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
              onClick={() => setSelectedArticleId(art.id)}
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

      {/* Article Reader Modal */}
      {selectedArticleId && activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
          {/* Backdrop blur */}
          <div 
            className="absolute inset-0 bg-oceanic/85 backdrop-blur-md transition-opacity duration-300 cursor-pointer"
            onClick={() => setSelectedArticleId(null)}
          />
          
          {/* Dialog Container */}
          <div className="relative z-10 w-full max-w-3xl max-h-[90vh] bg-oceanic/95 border border-arctic/15 rounded-3xl shadow-2xl overflow-y-auto scrollbar-thin p-6 sm:p-8 md:p-10 animate-fade-in flex flex-col justify-between">
            {/* Top close trigger */}
            <button
              onClick={() => setSelectedArticleId(null)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-arctic/5 text-mystic/60 hover:text-arctic transition-colors outline-none"
              aria-label="Close modal"
            >
              <XMark className="h-5 w-5" />
            </button>

            {/* Header info */}
            <div className="mb-6 border-b border-arctic/10 pb-6">
              <div className="flex items-center gap-4 text-[10px] font-mono text-forsythia uppercase tracking-widest font-bold mb-2">
                <span>{activeArticle.category}</span>
                <span>&bull;</span>
                <span className="text-mystic/40">{activeArticle.date}</span>
                <span>&bull;</span>
                <span className="text-mystic/40">{activeArticle.readTime}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-sans font-bold text-arctic tracking-tight mb-2">
                {activeArticle.title}
              </h3>
              <p className="text-sm text-mystic/65 italic leading-relaxed font-sans">
                {activeArticle.subtitle}
              </p>
            </div>

            {/* Content body */}
            <div className="space-y-6 text-sm text-mystic/80 leading-relaxed font-sans flex-1">
              <p className="font-semibold text-arctic/90">{activeArticle.intro}</p>
              
              {activeArticle.sections.map((sect, idx) => (
                <div key={idx} className="space-y-2">
                  <h4 className="text-base font-bold text-arctic tracking-tight">{sect.heading}</h4>
                  <p>{sect.text}</p>
                </div>
              ))}

              {/* Code Snippets */}
              {activeArticle.codeSnippet && (
                <div className="rounded-xl border border-arctic/10 bg-black/40 overflow-hidden font-mono text-xs">
                  <div className="bg-black/20 border-b border-arctic/5 px-4 py-2 flex items-center justify-between text-[10px] text-mystic/40 uppercase tracking-widest font-semibold">
                    <span>Example Configuration</span>
                    <span>{activeArticle.codeSnippet.language}</span>
                  </div>
                  <pre className="p-4 overflow-x-auto text-emerald-400/90 scrollbar-thin">
                    <code>{activeArticle.codeSnippet.code}</code>
                  </pre>
                </div>
              )}

              {/* Note / Takeaway block */}
              <div className="p-4 rounded-xl border border-forsythia/10 bg-forsythia/5 flex gap-3 text-xs text-mystic/90">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="h-5 w-5 text-forsythia shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div>
                  <span className="font-bold text-forsythia uppercase font-mono block mb-1">Key Takeaway</span>
                  <p>{activeArticle.takeaway}</p>
                </div>
              </div>
            </div>

            {/* Footer close CTA */}
            <div className="mt-8 pt-6 border-t border-arctic/10 flex justify-end">
              <button
                onClick={() => setSelectedArticleId(null)}
                className="px-6 py-2.5 rounded-xl bg-arctic text-oceanic font-sans font-bold text-xs uppercase tracking-wider hover:bg-forsythia hover:text-oceanic transition-all duration-300 transform active:scale-95 outline-none"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
