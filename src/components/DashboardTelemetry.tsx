/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Cog8Tooth, Cube16Solid, ArrowTrendingUp } from './SvgIcons';

export default function DashboardTelemetry() {
  const [tokenCount, setTokenCount] = useState<number>(345120);
  const [cpuLoad, setCpuLoad] = useState<number>(42.4);
  const [latencies, setLatencies] = useState<number[]>([12, 11, 14, 15, 12, 13, 11, 16, 12]);

  // Telemetry ticking intervals
  useEffect(() => {
    // Tick transaction count upwards to simulate continuous data processing
    const tokenInterval = setInterval(() => {
      setTokenCount((prev) => prev + Math.floor(Math.random() * 4) + 1);
    }, 500);

    // Random jitter cpu load slightly
    const cpuInterval = setInterval(() => {
      setCpuLoad((prev) => {
        const delta = (Math.random() * 0.8 - 0.4);
        const next = prev + delta;
        return parseFloat(Math.min(Math.max(next, 40), 45).toFixed(1));
      });
    }, 1500);

    // Dynamic latency bars fluctuating
    const latencyInterval = setInterval(() => {
      setLatencies((prev) =>
        prev.map((val) => {
          const delta = Math.floor(Math.random() * 5) - 2;
          return Math.min(Math.max(val + delta, 9), 22);
        })
      );
    }, 2000);

    return () => {
      clearInterval(tokenInterval);
      clearInterval(cpuInterval);
      clearInterval(latencyInterval);
    };
  }, []);

  return (
    <section id="telemetry" className="py-24 bg-oceanic border-t border-arctic/5" aria-labelledby="telemetry-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-forsythia uppercase tracking-widest mb-3">
            {/* Inline pulse activity line */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="h-3.5 w-3.5 animate-pulse">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
            </svg>
            <span>Infrastructure Metrics</span>
          </div>
          <h2 id="telemetry-title" className="text-3xl sm:text-5xl font-sans font-bold tracking-tight text-arctic mb-4">
            Optimized for performance
          </h2>
          <p className="text-lg text-mystic/70 leading-relaxed font-sans">
            Monitor every data pipeline in real-time. Armory provides deep infrastructure metrics into query throughput, server workloads, and data efficiency.
          </p>
        </div>

        {/* Telemetry Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          
          {/* Circular CPU Load widget */}
          <div className="p-6 rounded-2xl glass-panel flex flex-col justify-between bg-oceanic/40">
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-mono text-mystic/40 uppercase tracking-widest font-semibold">System Load</span>
                <span className="text-xs font-mono text-forsythia font-bold">CORE ONLINE</span>
              </div>
              <h3 className="text-sm font-bold text-arctic tracking-tight mb-4">Active Data Processing</h3>
            </div>
            <div className="flex items-center justify-center py-6">
              <div className="relative h-28 w-28 flex items-center justify-center">
                {/* SVG circular progress ring */}
                <svg className="absolute inset-0 transform -rotate-95 w-full h-full" aria-hidden="true">
                  <circle cx="56" cy="56" r="48" stroke="rgba(241,246,244,0.05)" strokeWidth="6" fill="transparent" />
                  <circle
                    cx="56"
                    cy="56"
                    r="48"
                    stroke="#FFC801"
                    strokeWidth="6"
                    fill="transparent"
                    strokeDasharray="301.6"
                    strokeDashoffset={301.6 - (301.6 * cpuLoad) / 100}
                    className="transition-all duration-500 ease-out"
                  />
                </svg>
                <div className="text-center">
                  <span className="text-2xl font-mono font-bold text-arctic">{cpuLoad}%</span>
                  <span className="block text-[8px] font-mono text-mystic/40 uppercase tracking-wider font-semibold">CPU Load</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs font-mono text-mystic/40 border-t border-arctic/5 pt-3">
              <span>99.9% Cache hits</span>
              <span>100% Uptime</span>
            </div>
          </div>

          {/* SLA Response latencies bars */}
          <div className="p-6 rounded-2xl glass-panel flex flex-col justify-between bg-oceanic/40 md:col-span-1 lg:col-span-2">
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-mono text-mystic/40 uppercase tracking-widest font-semibold">Queue Delay</span>
                <span className="text-xs font-mono text-forsythia font-bold">12ms GLOBAL MEDIAN</span>
              </div>
              <h3 className="text-sm font-bold text-arctic tracking-tight mb-4">Global Network Routing</h3>
            </div>
            
            {/* Latency columns wrapper */}
            <div className="flex items-end justify-between h-28 gap-2 px-2 py-4">
              {latencies.map((latency, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-full bg-gradient-to-t from-saffron to-forsythia rounded-sm transition-all duration-500 ease-out"
                    style={{ height: `${(latency / 24) * 100}%` }}
                  />
                  <span className="text-[9px] font-mono text-mystic/30 mt-1.5">{latency}ms</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between text-xs font-mono text-mystic/40 border-t border-arctic/5 pt-3">
              <span>99.99% Network SLA</span>
              <span>12ms Average Delay</span>
            </div>
          </div>

          {/* Live Token Usage counter */}
          <div className="p-6 rounded-2xl glass-panel flex flex-col justify-between bg-oceanic/40">
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-mono text-mystic/40 uppercase tracking-widest font-semibold">Query Volume</span>
                <span className="text-xs font-mono text-saffron font-bold">LIVE METRICS</span>
              </div>
              <h3 className="text-sm font-bold text-arctic tracking-tight mb-2">Throughput Volume</h3>
            </div>
            
            <div className="py-6">
              <div className="text-3xl sm:text-4xl font-mono font-bold tracking-tight text-arctic transition-all duration-300">
                {tokenCount.toLocaleString()}
              </div>
              <span className="block text-[10px] font-mono text-mystic/40 mt-1 uppercase tracking-wider font-semibold">Queries Processed</span>
            </div>

            <div className="flex items-center justify-between text-xs font-mono text-mystic/40 border-t border-arctic/5 pt-3">
              <span>Stable Load</span>
              <span>115 Active Connectors</span>
            </div>
          </div>
        </div>

        {/* Growth Vector glowing curve section */}
        <div className="p-6 sm:p-8 rounded-2xl glass-panel bg-oceanic/40 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-forsythia/[0.03] to-transparent pointer-events-none" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            
            {/* Left label */}
            <div className="lg:col-span-1">
              <span className="text-[10px] font-mono text-forsythia uppercase tracking-widest font-semibold">Growth Vector</span>
              <h3 className="text-2xl sm:text-3xl font-sans font-bold text-arctic tracking-tight mt-1 mb-3">
                Efficiency gains over 30 days
              </h3>
              <p className="text-sm text-mystic/70 leading-relaxed font-sans">
                Tracking database caching, query indexing, and resource allocation variables resulting in system overhead declines.
              </p>
              <div className="mt-6 flex items-center gap-2">
                <span className="text-3xl font-mono font-bold text-forsythia">82%</span>
                <span className="text-xs font-mono text-mystic/40 uppercase font-semibold leading-tight">Net Cost Decline Boost</span>
              </div>
            </div>

            {/* Glowing SVG Wave Chart */}
            <div className="lg:col-span-2 relative h-48 w-full">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 500 150" aria-hidden="true" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FFC801" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#FFC801" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {/* Under-path fill */}
                <path
                  d="M 0,130 Q 80,110 160,80 T 320,50 T 500,10 L 500,150 L 0,150 Z"
                  fill="url(#chartGradient)"
                  className="transition-all duration-500"
                />
                {/* Main line */}
                <path
                  d="M 0,130 Q 80,110 160,80 T 320,50 T 500,10"
                  fill="none"
                  stroke="#FFC801"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  className="transition-all duration-500"
                />
                {/* Interactive Pulsing Node dot at the end */}
                <circle cx="500" cy="10" r="5" fill="#FFC801" className="animate-ping" />
                <circle cx="500" cy="10" r="4.5" fill="#FFC801" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
