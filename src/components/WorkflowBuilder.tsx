/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Cog8Tooth, Cube16Solid, ArrowPath } from './SvgIcons';

interface WorkflowNode {
  id: string;
  type: 'trigger' | 'action' | 'condition' | 'validator';
  label: string;
  sub: string;
  desc: string;
  badge: string;
  config: Record<string, string>;
  status: 'idle' | 'running' | 'success' | 'failed';
}

export default function WorkflowBuilder() {
  const [nodes, setNodes] = useState<WorkflowNode[]>([
    {
      id: 'n1',
      type: 'trigger',
      label: 'Email Trigger',
      sub: 'IMAP Inbound',
      desc: 'Listens for incoming data payloads on secure port 993.',
      badge: 'IMAP',
      config: { server: 'imap.enterprise.org', folder: 'INBOX', auth: 'OAuth2' },
      status: 'idle'
    },
    {
      id: 'n2',
      type: 'action',
      label: 'Extract Fields',
      sub: 'Manual Mapping',
      desc: 'Parses body text and isolates customer metadata.',
      badge: 'Manual',
      config: { format: 'Regex JSON', keys: 'email, body, subject' },
      status: 'idle'
    },
    {
      id: 'n3',
      type: 'validator',
      label: 'Schema Validator',
      sub: 'V8 Compiler',
      desc: 'Validates structure and formats payload schema using V8 Compiler.',
      badge: 'V8 Engine',
      config: { engine: 'V8 Compiler', policy: 'Strict Typings', rule: 'Enforce Types' },
      status: 'idle'
    },
    {
      id: 'n4',
      type: 'condition',
      label: 'IF High Priority',
      sub: 'Conditional Split',
      desc: 'Routes based on urgency scores above 80%.',
      badge: 'Rules',
      config: { field: 'priority_score', condition: '> 80', target: 'true' },
      status: 'idle'
    },
    {
      id: 'n5',
      type: 'action',
      label: 'Telegram Alert',
      sub: 'Dispatch Send',
      desc: 'Sends urgent payload to DevOps mobile alert chat.',
      badge: 'Telegram',
      config: { bot: '@ArmoryPriorityBot', channel: '#emergency-telemetry' },
      status: 'idle'
    },
    {
      id: 'n6',
      type: 'action',
      label: 'Send Email Alert',
      sub: 'Dispatch Send',
      desc: 'Sends standard triage auto-reply receipt.',
      badge: 'SMTP',
      config: { template: 'standard_receipt', from: 'support@armory.ai' },
      status: 'idle'
    }
  ]);

  const [selectedNodeId, setSelectedNodeId] = useState<string>('n3');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<string>('idle');
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    'System standby. Press [Run System Test] to trigger automation trace.'
  ]);

  const [paths, setPaths] = useState<{
    p12: string;
    p23: string;
    p34: string;
    p45: string;
    p46: string;
  }>({ p12: '', p23: '', p34: '', p45: '', p46: '' });

  // Calculate coordinates dynamically to be 100% responsive and aligned on resize/reflow
  useEffect(() => {
    const updatePaths = () => {
      const canvas = document.getElementById('workflow-canvas');
      const n1 = document.getElementById('node-n1');
      const n2 = document.getElementById('node-n2');
      const n3 = document.getElementById('node-n3');
      const n4 = document.getElementById('node-n4');
      const n5 = document.getElementById('node-n5');
      const n6 = document.getElementById('node-n6');

      if (!canvas || !n1 || !n2 || !n3 || !n4 || !n5 || !n6) return;

      const canvasRect = canvas.getBoundingClientRect();
      const getPortCoords = (el: HTMLElement, side: 'left' | 'right' | 'top' | 'bottom') => {
        const r = el.getBoundingClientRect();
        const x = r.left - canvasRect.left;
        const y = r.top - canvasRect.top;
        if (side === 'left') return { x, y: y + r.height / 2 };
        if (side === 'right') return { x: x + r.width, y: y + r.height / 2 };
        if (side === 'top') return { x: x + r.width / 2, y };
        return { x: x + r.width / 2, y: y + r.height };
      };

      const p1_bot = getPortCoords(n1, 'bottom');
      const p2_top = getPortCoords(n2, 'top');
      const p2_right = getPortCoords(n2, 'right');
      
      const p3_left = getPortCoords(n3, 'left');
      const p3_bot = getPortCoords(n3, 'bottom');
      const p4_top = getPortCoords(n4, 'top');
      const p4_right = getPortCoords(n4, 'right');

      const p5_left = getPortCoords(n5, 'left');
      const p6_left = getPortCoords(n6, 'left');

      const path12 = `M ${p1_bot.x},${p1_bot.y} L ${p2_top.x},${p2_top.y}`;
      const path23 = `M ${p2_right.x},${p2_right.y} C ${(p2_right.x + p3_left.x) / 2},${p2_right.y} ${(p2_right.x + p3_left.x) / 2},${p3_left.y} ${p3_left.x},${p3_left.y}`;
      const path34 = `M ${p3_bot.x},${p3_bot.y} L ${p4_top.x},${p4_top.y}`;
      const path45 = `M ${p4_right.x},${p4_right.y} C ${(p4_right.x + p5_left.x) / 2},${p4_right.y} ${(p4_right.x + p5_left.x) / 2},${p5_left.y} ${p5_left.x},${p5_left.y}`;
      const path46 = `M ${p4_right.x},${p4_right.y} C ${(p4_right.x + p6_left.x) / 2},${p4_right.y} ${(p4_right.x + p6_left.x) / 2},${p6_left.y} ${p6_left.x},${p6_left.y}`;

      setPaths({ p12: path12, p23: path23, p34: path34, p45: path45, p46: path46 });
    };

    updatePaths();
    window.addEventListener('resize', updatePaths);
    const timer = setTimeout(updatePaths, 150); // layout settle fallback
    return () => {
      window.removeEventListener('resize', updatePaths);
      clearTimeout(timer);
    };
  }, [nodes]);

  const selectedNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

  const resetSimulation = () => {
    if (isRunning) return;
    setActiveStep('idle');
    setNodes((prev) => prev.map((n) => ({ ...n, status: 'idle' })));
    setTerminalLogs(['System standby. Press [Run System Test] to trigger automation trace.']);
  };

  const runSimulation = () => {
    if (isRunning) return;
    setIsRunning(true);
    setActiveStep('n1');
    setTerminalLogs(['[02:13:31] Initializing data validation pipeline...', '[02:13:31] Fetching secure IMAP security token keys...']);

    // Set first node to running
    setNodes((prev) =>
      prev.map((n) => (n.id === 'n1' ? { ...n, status: 'running' } : { ...n, status: 'idle' }))
    );

    // Timeline steps
    const steps = [
      {
        id: 'n2',
        log: '[02:13:32] Trigger n1: Received inbound payload: inbound-payload@armory.ai',
        run: () => {
          setActiveStep('n2');
          setNodes((prev) =>
            prev.map((n) =>
              n.id === 'n1' ? { ...n, status: 'success' } : n.id === 'n2' ? { ...n, status: 'running' } : n
            )
          );
        },
        delay: 1000
      },
      {
        id: 'n3',
        log: '[02:13:33] Action n2: Parsing headers. Isolated keys: ["id", "timestamp", "priority"]',
        run: () => {
          setActiveStep('n3');
          setNodes((prev) =>
            prev.map((n) =>
              n.id === 'n2' ? { ...n, status: 'success' } : n.id === 'n3' ? { ...n, status: 'running' } : n
            )
          );
        },
        delay: 2200
      },
      {
        id: 'n4',
        log: '[02:13:34] Validator n3: Schema validation verified. Integrity conformity: 99.8%',
        run: () => {
          setActiveStep('n4');
          setNodes((prev) =>
            prev.map((n) =>
              n.id === 'n3' ? { ...n, status: 'success' } : n.id === 'n4' ? { ...n, status: 'running' } : n
            )
          );
        },
        delay: 3400
      },
      {
        id: 'n5',
        log: '[02:13:35] Condition n4: Priority index evaluated > 80% (TRUE). Routing dispatch signal.',
        run: () => {
          setActiveStep('n5');
          setNodes((prev) =>
            prev.map((n) =>
              n.id === 'n4'
                ? { ...n, status: 'success' }
                : n.id === 'n5' || n.id === 'n6'
                ? { ...n, status: 'running' }
                : n
            )
          );
        },
        delay: 4600
      },
      {
        id: 'done',
        log: '[02:13:36] Action n5: Slack dispatch payload sent successfully.\n[02:13:36] Action n6: Auto-reply confirmation dispatch email sent.\n[02:13:36] System test complete. Status: PERFECT.',
        run: () => {
          setActiveStep('done');
          setIsRunning(false);
          setNodes((prev) =>
            prev.map((n) =>
              n.id === 'n5' || n.id === 'n6' ? { ...n, status: 'success' } : n
            )
          );
        },
        delay: 5800
      }
    ];

    steps.forEach((step) => {
      setTimeout(() => {
        step.run();
        setTerminalLogs((prev) => [...prev, ...step.log.split('\n')]);
      }, step.delay);
    });
  };

  const getIcon = (type: string, status: string) => {
    const isAct = status === 'running';
    const colorClass = isAct ? 'animate-pulse text-forsythia' : 'text-arctic';
    switch (type) {
      case 'trigger':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`h-5 w-5 ${colorClass}`}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
          </svg>
        );
      case 'action':
        return <Cube16Solid className={`h-5 w-5 ${colorClass}`} />;
      case 'validator':
        return <Cog8Tooth className={`h-5 w-5 ${colorClass}`} />;
      case 'condition':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`h-5 w-5 ${colorClass}`}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
          </svg>
        );
      default:
        return <Cube16Solid className={`h-5 w-5 ${colorClass}`} />;
    }
  };

  return (
    <section id="workflow" className="py-24 bg-oceanic border-t border-arctic/5" aria-labelledby="workflow-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-forsythia uppercase tracking-widest mb-3">
            <Cog8Tooth className="h-3.5 w-3.5" />
            <span>Interactive Workflow Designer</span>
          </div>
          <h2 id="workflow-title" className="text-3xl sm:text-5xl font-sans font-bold tracking-tight text-arctic mb-4">
            Build logic at scale
          </h2>
          <p className="text-lg text-mystic/70 leading-relaxed font-sans">
            Design, deploy, and manage sophisticated data pipelines through an intuitive visual interface. No complex scripting—just pure, deterministic logic.
          </p>
        </div>

        {/* Builder Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Visual Grid Canvas (Col Span 9) */}
          <div className="lg:col-span-9 relative p-6 sm:p-8 rounded-2xl glass-panel min-h-[500px] flex flex-row overflow-hidden bg-oceanic/40">
            
            {/* Main Interactive Workspace Area */}
            <div id="workflow-canvas" className="flex-1 relative flex flex-col justify-between overflow-hidden">
              {/* Mesh Background Grid */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(241,246,244,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(241,246,244,0.015)_1px,transparent_1px)] bg-[size:20px_20px]" />

              {/* Canvas Header */}
              <div className="relative z-10 flex items-center justify-between border-b border-arctic/5 pb-4 mb-6">
                <div className="flex items-center gap-3">
                  <span className={`h-2.5 w-2.5 rounded-full bg-forsythia ${isRunning ? 'animate-pulse' : ''}`} />
                  <span className="text-xs font-mono uppercase tracking-wider text-arctic/80 font-semibold">Active Interactive Workspace</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={resetSimulation}
                    disabled={isRunning}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs font-bold uppercase border transition-all duration-300 ${
                      isRunning
                        ? 'bg-arctic/5 border-arctic/5 text-mystic/20 cursor-not-allowed'
                        : 'bg-oceanic/80 hover:bg-arctic/5 text-arctic border-arctic/10 transform active:scale-95'
                    }`}
                  >
                    <ArrowPath className="h-3.5 w-3.5" />
                    <span>Reset</span>
                  </button>
                  
                  <div className="relative flex items-center">
                    {!isRunning && (
                      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-forsythia text-oceanic font-mono text-[9px] font-extrabold uppercase px-2.5 py-1 rounded-md shadow-lg shadow-forsythia/25 flex items-center gap-1.5 animate-bounce z-30 whitespace-nowrap">
                        <span>Click to Start Test</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3.5" stroke="currentColor" className="h-3.5 w-3.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
                        </svg>
                      </div>
                    )}
                    <button
                      onClick={runSimulation}
                      disabled={isRunning}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs font-bold uppercase transition-all duration-300 relative ${
                        isRunning
                          ? 'bg-arctic/5 text-mystic/40 cursor-not-allowed'
                          : 'bg-forsythia hover:bg-saffron text-oceanic transform active:scale-95 shadow-md shadow-forsythia/10 ring-2 ring-forsythia/35'
                      }`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="h-3.5 w-3.5">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                      <span>Run System Test</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Responsive SVG connection paths */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" aria-hidden="true">
                {/* 1. Base Low Opacity Paths */}
                {paths.p12 && <path d={paths.p12} stroke="rgba(241,246,244,0.08)" strokeWidth="2" fill="none" />}
                {paths.p23 && <path d={paths.p23} stroke="rgba(241,246,244,0.08)" strokeWidth="2" fill="none" />}
                {paths.p34 && <path d={paths.p34} stroke="rgba(241,246,244,0.08)" strokeWidth="2" fill="none" />}
                {paths.p45 && <path d={paths.p45} stroke="rgba(241,246,244,0.08)" strokeWidth="2" fill="none" />}
                {paths.p46 && <path d={paths.p46} stroke="rgba(241,246,244,0.08)" strokeWidth="2" fill="none" />}

                {/* 2. Completed Glowing Paths */}
                {(isRunning || activeStep === 'done') && (
                  <>
                    {['n2', 'n3', 'n4', 'n5', 'done'].includes(activeStep) && paths.p12 && (
                      <path d={paths.p12} stroke="#FFC801" strokeWidth="2" fill="none" opacity="0.6" />
                    )}
                    {['n3', 'n4', 'n5', 'done'].includes(activeStep) && paths.p23 && (
                      <path d={paths.p23} stroke="#FFC801" strokeWidth="2" fill="none" opacity="0.6" />
                    )}
                    {['n4', 'n5', 'done'].includes(activeStep) && paths.p34 && (
                      <path d={paths.p34} stroke="#FF9932" strokeWidth="2" fill="none" opacity="0.6" />
                    )}
                    {['n5', 'done'].includes(activeStep) && (
                      <>
                        {paths.p45 && <path d={paths.p45} stroke="#FF9932" strokeWidth="2" fill="none" opacity="0.6" />}
                        {paths.p46 && <path d={paths.p46} stroke="#FF9932" strokeWidth="2" fill="none" opacity="0.6" />}
                      </>
                    )}
                  </>
                )}

                {/* 3. Active Pulsing Flow Paths matching current simulation active index */}
                {isRunning && (
                  <>
                    {activeStep === 'n1' && paths.p12 && (
                      <path d={paths.p12} stroke="#FFC801" strokeWidth="2.5" fill="none" strokeDasharray="6 6" className="animate-dash-flow" />
                    )}
                    {activeStep === 'n2' && paths.p23 && (
                      <path d={paths.p23} stroke="#FFC801" strokeWidth="2.5" fill="none" strokeDasharray="6 6" className="animate-dash-flow" />
                    )}
                    {activeStep === 'n3' && paths.p34 && (
                      <path d={paths.p34} stroke="#FFC801" strokeWidth="2.5" fill="none" strokeDasharray="6 6" className="animate-dash-flow" />
                    )}
                    {activeStep === 'n4' && (
                      <>
                        {paths.p45 && <path d={paths.p45} stroke="#FFC801" strokeWidth="2.5" fill="none" strokeDasharray="6 6" className="animate-dash-flow" />}
                        {paths.p46 && <path d={paths.p46} stroke="#FFC801" strokeWidth="2.5" fill="none" strokeDasharray="6 6" className="animate-dash-flow" />}
                      </>
                    )}
                    {activeStep === 'n5' && (
                      <>
                        {paths.p45 && <path d={paths.p45} stroke="#FF9932" strokeWidth="2.5" fill="none" strokeDasharray="6 6" className="animate-dash-flow" />}
                        {paths.p46 && <path d={paths.p46} stroke="#FF9932" strokeWidth="2.5" fill="none" strokeDasharray="6 6" className="animate-dash-flow" />}
                      </>
                    )}
                  </>
                )}
              </svg>

              {/* Node Columns wrapper (Col 1 to 3) */}
              <div className="relative z-10 flex-1 grid grid-cols-1 sm:grid-cols-3 gap-6 items-center min-h-[300px]">
                
                {/* Column 1: Inbound & Parser */}
                <div className="space-y-10 flex flex-col justify-center h-full">
                  {nodes.slice(0, 2).map((node) => {
                    const isSelected = selectedNodeId === node.id;
                    const isActive = isRunning && activeStep === node.id;
                    const isCompleted = node.status === 'success';
                    return (
                      <div
                        id={`node-${node.id}`}
                        key={node.id}
                        onClick={() => setSelectedNodeId(node.id)}
                        className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer relative ${
                          isActive
                            ? 'border-forsythia bg-forsythia/10 shadow-lg shadow-forsythia/10 scale-102 font-bold'
                            : isSelected
                            ? 'border-forsythia bg-forsythia/5 shadow-md shadow-forsythia/5'
                            : isCompleted
                            ? 'border-saffron/30 bg-oceanic/80'
                            : 'border-arctic/10 bg-oceanic/80 hover:border-arctic/20'
                        }`}
                      >
                        {/* Active pulsing notification dot */}
                        {isActive && (
                          <span className="absolute -top-1 -right-1 flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-forsythia opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-forsythia"></span>
                          </span>
                        )}
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-forsythia/20' : 'bg-arctic/5'}`}>
                              {getIcon(node.type, node.status)}
                            </div>
                            <div>
                              <div className="text-[9px] font-mono text-mystic/40 uppercase tracking-widest font-semibold">
                                {node.type}
                              </div>
                              <h4 className="text-xs font-bold text-arctic">{node.label}</h4>
                            </div>
                          </div>
                          <span className="px-1.5 py-0.5 rounded text-[8px] font-mono bg-arctic/5 text-mystic/60">{node.badge}</span>
                        </div>
                        <div className="text-[10px] text-mystic/50 font-mono mt-1">{node.sub}</div>
                      </div>
                    );
                  })}
                </div>

                {/* Column 2: Validator & Condition */}
                <div className="space-y-10 flex flex-col justify-center h-full">
                  {nodes.slice(2, 4).map((node) => {
                    const isSelected = selectedNodeId === node.id;
                    const isActive = isRunning && activeStep === node.id;
                    const isCompleted = node.status === 'success';
                    return (
                      <div
                        id={`node-${node.id}`}
                        key={node.id}
                        onClick={() => setSelectedNodeId(node.id)}
                        className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer relative ${
                          isActive
                            ? 'border-forsythia bg-forsythia/10 shadow-lg shadow-forsythia/10 scale-102 font-bold'
                            : isSelected
                            ? 'border-forsythia bg-forsythia/5 shadow-md shadow-forsythia/5'
                            : isCompleted
                            ? 'border-saffron/30 bg-oceanic/80'
                            : 'border-arctic/10 bg-oceanic/80 hover:border-arctic/20'
                        }`}
                      >
                        {/* Active pulsing notification dot */}
                        {isActive && (
                          <span className="absolute -top-1 -right-1 flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-forsythia opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-forsythia"></span>
                          </span>
                        )}
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-forsythia/20' : 'bg-arctic/5'}`}>
                              {getIcon(node.type, node.status)}
                            </div>
                            <div>
                              <div className="text-[9px] font-mono text-mystic/40 uppercase tracking-widest font-semibold">
                                {node.type}
                              </div>
                              <h4 className="text-xs font-bold text-arctic">{node.label}</h4>
                            </div>
                          </div>
                          <span className="px-1.5 py-0.5 rounded text-[8px] font-mono bg-arctic/5 text-mystic/60">{node.badge}</span>
                        </div>
                        <div className="text-[10px] text-mystic/50 font-mono mt-1">{node.sub}</div>
                      </div>
                    );
                  })}
                </div>

                {/* Column 3: Dispatch Endpoint Targets */}
                <div className="space-y-10 flex flex-col justify-center h-full">
                  {nodes.slice(4, 6).map((node) => {
                    const isSelected = selectedNodeId === node.id;
                    const isActive = isRunning && node.status === 'running';
                    const isCompleted = node.status === 'success';
                    return (
                      <div
                        id={`node-${node.id}`}
                        key={node.id}
                        onClick={() => setSelectedNodeId(node.id)}
                        className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer relative ${
                          isActive
                            ? 'border-forsythia bg-forsythia/10 shadow-lg shadow-forsythia/10 scale-102 font-bold'
                            : isSelected
                            ? 'border-forsythia bg-forsythia/5 shadow-md shadow-forsythia/5'
                            : isCompleted
                            ? 'border-saffron/30 bg-oceanic/80'
                            : 'border-arctic/10 bg-oceanic/80 hover:border-arctic/20'
                        }`}
                      >
                        {/* Active pulsing notification dot */}
                        {isActive && (
                          <span className="absolute -top-1 -right-1 flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-forsythia opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-forsythia"></span>
                          </span>
                        )}
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-forsythia/20' : 'bg-arctic/5'}`}>
                              {getIcon(node.type, node.status)}
                            </div>
                            <div>
                              <div className="text-[9px] font-mono text-mystic/40 uppercase tracking-widest font-semibold">
                                {node.type}
                              </div>
                              <h4 className="text-xs font-bold text-arctic">{node.label}</h4>
                            </div>
                          </div>
                          <span className="px-1.5 py-0.5 rounded text-[8px] font-mono bg-arctic/5 text-mystic/60">{node.badge}</span>
                        </div>
                        <div className="text-[10px] text-mystic/50 font-mono mt-1">{node.sub}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Real-time Terminal Trace logs inside Canvas */}
              <div className="relative z-10 border-t border-arctic/5 pt-4 mt-6">
                <div className="flex items-center gap-2 mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-4 w-4 text-forsythia">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
                  </svg>
                  <span className="text-xs font-mono uppercase tracking-wider text-arctic/60 font-semibold">Live Sandbox Logs</span>
                </div>
                <div className="h-28 bg-oceanic/80 border border-arctic/5 p-3 rounded-lg font-mono text-[11px] text-mystic/85 overflow-y-auto space-y-1.5 scrollbar-thin">
                  {terminalLogs.map((log, idx) => (
                    <div key={idx} className={`${log.includes('PERFECT') ? 'text-forsythia font-bold' : ''}`}>
                      {log}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Node Config Inspector Panel (Col Span 3) */}
          <div className="lg:col-span-3 p-6 rounded-2xl glass-panel flex flex-col justify-between bg-oceanic/40">
            <div>
              <div className="border-b border-arctic/5 pb-4 mb-6">
                <span className="text-[10px] font-mono text-forsythia uppercase tracking-widest font-semibold">Node Inspector</span>
                <h3 className="text-xl font-bold text-arctic tracking-tight mt-1">{selectedNode.label}</h3>
                <span className="inline-block px-2 py-0.5 rounded text-[8px] font-mono bg-forsythia/10 text-forsythia mt-1.5 uppercase font-bold">{selectedNode.badge}</span>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h4 className="text-[10px] font-mono text-mystic/40 uppercase tracking-widest font-semibold mb-2">Behavior</h4>
                <p className="text-sm text-mystic/80 leading-relaxed bg-arctic/5 p-3.5 rounded-xl border border-arctic/5">
                  {selectedNode.desc}
                </p>
              </div>

              {/* Node Configurations Custom Fields */}
              <div className="space-y-4">
                <h4 className="text-[10px] font-mono text-mystic/40 uppercase tracking-widest font-semibold">Parameters</h4>
                {Object.entries(selectedNode.config).map(([key, val]) => (
                  <div key={key} className="flex justify-between items-center py-2 border-b border-arctic/5 text-xs">
                    <span className="font-mono text-mystic/55 uppercase">{key}</span>
                    <span className="font-mono font-medium text-arctic bg-arctic/5 px-2 py-1 rounded border border-arctic/5">
                      {val}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Micro details bottom panel */}
            <div className="mt-8 pt-4 border-t border-arctic/5 text-xs text-mystic/40 font-mono">
              <div className="flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="h-3.5 w-3.5 text-forsythia">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
                </svg>
                <span>Compiler Status: Secure</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
