/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Cog8Tooth, Cube16Solid, ChartPie, ChevronRight } from './SvgIcons';

interface TabContent {
  id: string;
  title: string;
  tagline: string;
  description: string;
  metrics: { label: string; value: string }[];
  visualType: 'scorecard' | 'chart' | 'network' | 'deploy';
}

export default function AutonomyTabs() {
  const [activeTab, setActiveTab] = useState<string>('analysis');

  const tabs: { id: string; label: string; icon: any }[] = [
    { id: 'discovery', label: 'Discovery', icon: Cube16Solid },
    { id: 'analysis', label: 'Analysis', icon: ChartPie },
    { id: 'training', label: 'Tuning', icon: Cog8Tooth },
    { id: 'deploy', label: 'Deploy', icon: Cog8Tooth } // We will draw an inline deployment icon inside button mapping
  ];

  const contentMap: Record<string, TabContent> = {
    discovery: {
      id: 'discovery',
      title: 'Automated schema exploration',
      tagline: 'INDEX AND MAP COMPILING',
      description: 'Our crawler probes existing databases, REST APIs, and file repositories to compile high-fidelity schemas. Identifies relational bridges and creates automated connection metadata within seconds.',
      metrics: [
        { label: 'Metadata discovery', value: '1.2s' },
        { label: 'Relational accuracy', value: '100%' }
      ],
      visualType: 'network'
    },
    analysis: {
      id: 'analysis',
      title: 'Evaluate data accuracy',
      tagline: 'SURGICAL ACCURACY MATRIX',
      description: 'Evaluate processing performance with surgical precision. Get real-time scoring on compliance metrics, semantic alignment accuracy, security thresholds, and overall workflow reliability.',
      metrics: [
        { label: 'Accuracy Score', value: '9.9/10' },
        { label: 'Queue Delay Avg', value: '12ms' }
      ],
      visualType: 'scorecard'
    },
    training: {
      id: 'training',
      title: 'Dynamic parameter optimization',
      tagline: 'AUTOMATED CORRECTIONS',
      description: 'Inject prompt schema validation rules and contextual feedback. Optimize outputs through deep validation loops, minimizing data errors while adhering strictly to regional compliance standards.',
      metrics: [
        { label: 'Data compaction', value: '4.2x' },
        { label: 'Synthesized drift', value: '0.004%' }
      ],
      visualType: 'chart'
    },
    deploy: {
      id: 'deploy',
      title: 'One-click serverless deployment',
      tagline: 'CONTAINER ORCHESTRATION',
      description: 'Compile visual schemas straight to serverless containers. Distribute workloads globally across secure isolated edge endpoints with full administrative rollback mechanisms.',
      metrics: [
        { label: 'Deploy speed', value: '1.2s' },
        { label: 'Global cluster scale', value: 'Unlimited' }
      ],
      visualType: 'deploy'
    }
  };

  const activeContent = contentMap[activeTab];

  const renderVisual = (type: string) => {
    switch (type) {
      case 'scorecard':
        return (
          <div className="bg-oceanic/90 border border-arctic/10 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between h-full">
            <div className="flex justify-between items-center mb-6">
              <span className="text-[10px] font-mono text-mystic/40 uppercase tracking-widest font-semibold">Validation matrix</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-forsythia/10 text-forsythia font-bold">ACTIVE</span>
            </div>
            
            {/* Score List */}
            <div className="space-y-4 flex-1 flex flex-col justify-center">
              <div className="flex items-center justify-between p-3 bg-arctic/5 rounded-xl border border-arctic/5">
                <span className="text-xs text-mystic/80 font-medium">Compliance Auditing</span>
                <span className="text-sm font-mono font-bold text-forsythia">100%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-arctic/5 rounded-xl border border-arctic/5">
                <span className="text-xs text-mystic/80 font-medium">Semantic Mapping</span>
                <span className="text-sm font-mono font-bold text-arctic">9.9/10</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-arctic/5 rounded-xl border border-arctic/5">
                <span className="text-xs text-mystic/80 font-medium">Security Gate SLA</span>
                <span className="text-sm font-mono font-bold text-arctic">Pass</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-arctic/5 flex items-center gap-2 text-[10px] font-mono text-mystic/40 uppercase">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="h-4 w-4 text-forsythia">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
              </svg>
              <span>SOC2 Validation Verified</span>
            </div>
          </div>
        );
      case 'chart':
        return (
          <div className="bg-oceanic/90 border border-arctic/10 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between h-full">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[10px] font-mono text-mystic/40 uppercase tracking-widest font-semibold">Parameter optimization</span>
              <span className="text-[10px] font-mono text-forsythia font-bold">COMPRESSED</span>
            </div>
            {/* Slider previews */}
            <div className="space-y-4 py-4 flex-1 flex flex-col justify-center">
              <div>
                <div className="flex justify-between text-[10px] font-mono text-mystic/55 mb-1.5 uppercase font-semibold">
                  <span>Throughput bias</span>
                  <span>0.15 (High Precision)</span>
                </div>
                <div className="h-1.5 w-full bg-arctic/5 rounded-full overflow-hidden">
                  <div className="h-full w-[15%] bg-forsythia rounded-full" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[10px] font-mono text-mystic/55 mb-1.5 uppercase font-semibold">
                  <span>Queue depth constraint</span>
                  <span>64k parameters</span>
                </div>
                <div className="h-1.5 w-full bg-arctic/5 rounded-full overflow-hidden">
                  <div className="h-full w-[80%] bg-saffron rounded-full" />
                </div>
              </div>
            </div>
            <div className="text-[10px] font-mono text-mystic/40 border-t border-arctic/5 pt-3">
              Parameter changes apply instantaneously
            </div>
          </div>
        );
      case 'network':
        return (
          <div className="bg-oceanic/90 border border-arctic/10 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between h-full">
            <div className="flex justify-between items-center mb-6">
              <span className="text-[10px] font-mono text-mystic/40 uppercase tracking-widest font-semibold">Schema visualizer</span>
              <span className="text-[10px] font-mono text-arctic font-bold">MAPPED</span>
            </div>
            {/* Visual mapping connections */}
            <div className="flex-1 flex items-center justify-center relative min-h-[140px]">
              <div className="absolute top-[20%] left-[20%] h-8 w-8 rounded-full bg-forsythia/20 border border-forsythia flex items-center justify-center text-[10px] font-mono text-forsythia font-bold">SQL</div>
              <div className="absolute top-[60%] right-[15%] h-8 w-8 rounded-full bg-saffron/20 border border-saffron flex items-center justify-center text-[10px] font-mono text-saffron font-bold">API</div>
              <div className="absolute bottom-[10%] left-[30%] h-8 w-8 rounded-full bg-mystic/20 border border-mystic/50 flex items-center justify-center text-[10px] font-mono text-arctic font-bold">CSV</div>
              <div className="absolute top-[40%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-nocturnal/40 border-2 border-forsythia flex items-center justify-center text-forsythia shadow-lg shadow-forsythia/10">
                <Cog8Tooth className="h-5 w-5" />
              </div>
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" aria-hidden="true">
                <line x1="20%" y1="20%" x2="50%" y2="40%" stroke="rgba(241,246,244,0.15)" strokeWidth="1" />
                <line x1="85%" y1="60%" x2="50%" y2="40%" stroke="rgba(241,246,244,0.15)" strokeWidth="1" />
                <line x1="30%" y1="90%" x2="50%" y2="40%" stroke="rgba(241,246,244,0.15)" strokeWidth="1" />
              </svg>
            </div>
            <div className="text-[10px] font-mono text-mystic/40 border-t border-arctic/5 pt-3">
              Discovered 3 target databases and mapped endpoints
            </div>
          </div>
        );
      case 'deploy':
      default:
        return (
          <div className="bg-oceanic/90 border border-arctic/10 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between h-full">
            <div className="flex justify-between items-center mb-6">
              <span className="text-[10px] font-mono text-mystic/40 uppercase tracking-widest font-semibold">Cluster deployment</span>
              <span className="text-[10px] font-mono text-forsythia font-bold">ONLINE</span>
            </div>
            <div className="flex-1 flex flex-col justify-center space-y-4">
              <div className="p-3 bg-arctic/5 border border-arctic/5 rounded-xl flex items-center justify-between">
                <div>
                  <div className="text-xs text-arctic font-bold">edge-cluster-nyc</div>
                  <div className="text-[9px] font-mono text-mystic/40 mt-0.5">VPC GATEWAY ACTIVE</div>
                </div>
                <span className="text-xs font-mono font-bold text-forsythia">1.2s deploy speed</span>
              </div>
              <div className="p-3 bg-arctic/5 border border-arctic/5 rounded-xl flex items-center justify-between">
                <div>
                  <div className="text-xs text-arctic font-bold">edge-cluster-blr</div>
                  <div className="text-[9px] font-mono text-mystic/40 mt-0.5">VPC GATEWAY ACTIVE</div>
                </div>
                <span className="text-xs font-mono font-bold text-forsythia">1.2s deploy speed</span>
              </div>
            </div>
            <div className="text-[10px] font-mono text-mystic/40 border-t border-arctic/5 pt-3">
              Deploying compiled container instances internationally
            </div>
          </div>
        );
    }
  };

  return (
    <section id="autonomy" className="py-24 bg-oceanic border-t border-arctic/5" aria-labelledby="autonomy-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-forsythia uppercase tracking-widest mb-3">
            <Cog8Tooth className="h-3.5 w-3.5" />
            <span>Underlying Architecture</span>
          </div>
          <h2 id="autonomy-title" className="text-3xl sm:text-5xl font-sans font-bold tracking-tight text-arctic mb-4">
            Engineered for scalability
          </h2>
          <p className="text-lg text-mystic/70 leading-relaxed font-sans">
            Go beyond simple custom scripting. Armory constructs underlying data pipelines to run, test, and scale enterprise workloads securely.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-arctic/10 gap-2 overflow-x-auto pb-px scrollbar-thin">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isAct = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2.5 px-6 py-4 text-xs font-mono uppercase tracking-wider font-bold transition-all border-b-2 outline-none whitespace-nowrap ${
                  isAct
                    ? 'border-forsythia text-forsythia bg-arctic/[0.02]'
                    : 'border-transparent text-mystic/55 hover:text-arctic hover:bg-arctic/[0.01]'
                }`}
              >
                {tab.id === 'deploy' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="h-4 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
                  </svg>
                ) : (
                  <Icon className="h-4 w-4" />
                )}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab content panel */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mt-12 items-center">
          
          {/* Details (Col Span 3) */}
          <div className="lg:col-span-3 space-y-6">
            <span className="inline-block text-[10px] font-mono text-forsythia uppercase tracking-widest font-bold">
              {activeContent.tagline}
            </span>
            <h3 className="text-2xl sm:text-4xl font-sans font-bold text-arctic tracking-tight leading-tight">
              {activeContent.title}
            </h3>
            <p className="text-base sm:text-lg text-mystic/70 leading-relaxed font-sans">
              {activeContent.description}
            </p>

            {/* Sub-metrics */}
            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-arctic/5">
              {activeContent.metrics.map((m) => (
                <div key={m.label}>
                  <span className="text-[10px] font-mono text-mystic/40 uppercase tracking-wider font-semibold">
                    {m.label}
                  </span>
                  <div className="text-2xl font-mono font-bold text-arctic mt-1">
                    {m.value}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <a
                href="#pricing"
                className="group flex items-center gap-1.5 text-sm font-semibold text-forsythia hover:text-saffron transition-colors"
              >
                <span>Read development API documentation</span>
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>

          {/* Visual Showcase Box (Col Span 2) */}
          <div className="lg:col-span-2 h-[340px] relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-forsythia/5 to-transparent filter blur-[40px] rounded-full pointer-events-none" />
            <div className="relative z-10 h-full">
              {renderVisual(activeContent.visualType)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
