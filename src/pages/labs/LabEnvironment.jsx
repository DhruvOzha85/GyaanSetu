import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  Play, 
  Terminal as TerminalIcon, 
  Settings, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  FileCode,
  FileText,
  HelpCircle,
  ChevronRight,
  Maximize2,
  RefreshCw,
  Code
} from 'lucide-react';
import { cn } from '../../utils/cn';

// Layout & Components
import LabLayout from '../../components/layout/LabLayout';
import Button from '../../components/ui/Button';
import Accordion from '../../components/ui/Accordion';

const LabEnvironment = () => {
  const { labId } = useParams();

  // ─── Panel Resizer Logic (Custom React) ────────────────────────
  const [panelWidths, setPanelWidths] = useState({
    instructions: 30, // 30%
    editor: 45,       // 45%
    terminal: 25      // 25%
  });
  
  const containerRef = useRef(null);
  const isResizingRef = useRef(null); // 'left' or 'right' separator

  const startResizing = (panel) => (e) => {
    isResizingRef.current = panel;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', stopResizing);
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  };

  const handleMouseMove = useCallback((e) => {
    if (!isResizingRef.current || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const containerWidth = containerRect.width;
    const mouseX = e.clientX - containerRect.left;
    const mouseXPercentage = (mouseX / containerWidth) * 100;

    setPanelWidths((prev) => {
      if (isResizingRef.current === 'left') {
        const newLeftWidth = Math.min(Math.max(mouseXPercentage, 15), 50);
        const remainingWidth = 100 - newLeftWidth;
        // Distribute remaining width to editor and terminal proportionally or just shrink editor
        const currentRightRatio = prev.terminal / (prev.editor + prev.terminal);
        return {
          ...prev,
          instructions: newLeftWidth,
          editor: remainingWidth * (1 - currentRightRatio),
          terminal: remainingWidth * currentRightRatio
        };
      } else if (isResizingRef.current === 'right') {
        // Here mouseXPercentage is the split between instructions+editor and terminal
        const instructionsPlusEditor = Math.min(Math.max(mouseXPercentage, 40), 85);
        const newTerminalWidth = 100 - instructionsPlusEditor;
        return {
          ...prev,
          editor: instructionsPlusEditor - prev.instructions,
          terminal: newTerminalWidth
        };
      }
      return prev;
    });
  }, []);

  const stopResizing = useCallback(() => {
    isResizingRef.current = null;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', stopResizing);
    document.body.style.cursor = 'default';
    document.body.style.userSelect = 'auto';
  }, [handleMouseMove]);

  // ─── Lab State ───────────────────────────────────────────────
  const [lang, setLang] = useState('en');
  const [timeLeft, setTimeLeft] = useState(1800); // 30 mins in secs
  const [activeTab, setActiveTab] = useState('output');
  const [activeFile, setActiveFile] = useState('main.py');
  const [files, setFiles] = useState({
    'main.py': '# Start your solution here\n\ndef solution(input_data):\n    print("Hello from GyaanSetu Labs!")\n    return True\n\nif __name__ == "__main__":\n    solution(None)',
    'tests.py': 'import main\n\ndef test_case_1():\n    assert main.solution("") == True\n\nprint("All tests passed!")',
    'README.md': '# Challenge: DevOps Foundations\n\nBuild a robust deployment pipeline for the application provided.'
  });
  const [output, setOutput] = useState('Terminal ready. Click "Run" to execute your code.');
  const [isExecuting, setIsExecuting] = useState(false);

  // Timer Effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleRunCode = () => {
    setIsExecuting(true);
    setOutput('Compiling code...\nExecuting main.py...\n------------------\n');
    
    setTimeout(() => {
      setOutput((prev) => prev + 'Hello from GyaanSetu Labs!\nProcess finished with exit code 0\n(Execution time: 42ms)');
      setIsExecuting(false);
      setActiveTab('output');
    }, 1200);
  };

  const handleSubmitLab = () => {
    alert('Submitting lab... All 5 test cases passed! Score: 100/100');
  };

  return (
    <LabLayout 
      title="DevOps Pipeline: Building CI/CD with Docker"
      timer={{ seconds: timeLeft, formatted: formatTime(timeLeft) }}
      instructionsLang={lang}
      onLangChange={setLang}
      onSubmit={handleSubmitLab}
    >
      <Helmet>
        <title>Lab Environment — GyaanSetu</title>
      </Helmet>

      <div ref={containerRef} className="flex flex-1 w-full relative overflow-hidden">
        
        {/* ─── LEFT PANEL: Instructions (Resizable) ───────────────── */}
        <aside 
          style={{ width: `${panelWidths.instructions}%` }}
          className="flex flex-col bg-[#1E1E2E] border-r border-[#2B2B3B] overflow-hidden"
        >
          <div className="flex-1 overflow-y-auto custom-scrollbar-dark p-6 space-y-8">
            <section>
              <h2 className="text-xl font-black text-white tracking-tight mb-4 flex items-center">
                <FileText className="mr-2 text-primary" size={20} />
                {lang === 'en' ? 'Instructions' : lang === 'hi' ? 'निर्देश' : 'સૂચનાઓ'}
              </h2>
              <div className="prose prose-invert prose-sm max-w-none">
                <p className="text-slate-400 font-medium leading-relaxed mb-4">
                  In this lab, you will architect a continuous integration pipeline using Docker. Your goal is to automate the build and testing process for a Python application.
                </p>
                <div className="bg-[#11111b] border border-white/5 rounded-2xl p-4 mb-6">
                  <h4 className="text-teal-400 font-black uppercase text-[10px] tracking-widest mb-2">Objectives</h4>
                  <ul className="space-y-2 text-slate-300 font-bold text-xs list-none p-0">
                    <li className="flex items-start">
                      <ChevronRight size={14} className="mr-2 text-primary mt-0.5 shrink-0" />
                      Containerize the Python application using a Dockerfile.
                    </li>
                    <li className="flex items-start">
                      <ChevronRight size={14} className="mr-2 text-primary mt-0.5 shrink-0" />
                      Configure a YAML pipeline for automated testing.
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-sm font-black text-white uppercase tracking-widest mb-4">Test Cases</h3>
              <div className="space-y-2">
                {[
                  { name: 'Docker Build', status: 'pending' },
                  { name: 'Syntax Audit', status: 'pending' },
                  { name: 'Unit Testing', status: 'pending' }
                ].map((test, i) => (
                  <div key={i} className="flex items-center justify-between bg-[#11111b] px-4 py-3 rounded-xl border border-white/5">
                    <span className="text-xs font-bold text-slate-300">{test.name}</span>
                    <div className="h-2 w-2 rounded-full bg-slate-700" />
                  </div>
                ))}
              </div>
            </section>
          </div>
        </aside>

        {/* DRAG HANDLE LEGEND LEFT */}
        <div 
          className="absolute z-10 w-1.5 h-full hover:bg-primary/50 transition-colors cursor-col-resize flex items-center justify-center group"
          style={{ left: `${panelWidths.instructions}%`, transform: 'translateX(-50%)' }}
          onMouseDown={startResizing('left')}
        >
          <div className="w-[1px] h-32 bg-white/10 group-hover:bg-white/30 rounded-full" />
        </div>

        {/* ─── MIDDLE PANEL: Editor (Resizable) ───────────────────── */}
        <div 
          style={{ width: `${panelWidths.editor}%` }}
          className="flex flex-col bg-[#181825] border-r border-[#252535] overflow-hidden"
        >
          {/* Editor Header: Tabs */}
          <div className="flex items-center justify-between h-10 px-4 bg-[#11111b] border-b border-white/5">
            <div className="flex h-full space-x-1 overflow-x-auto no-scrollbar">
              {Object.keys(files).map((filename) => (
                <button
                  key={filename}
                  onClick={() => setActiveFile(filename)}
                  className={cn(
                    "flex items-center px-4 h-full text-[10px] font-black uppercase tracking-widest transition-all",
                    activeFile === filename 
                      ? "bg-[#181825] text-teal-400 border-t-2 border-teal-400" 
                      : "text-slate-500 hover:text-slate-300"
                  )}
                >
                  <FileCode size={12} className="mr-2" />
                  {filename}
                </button>
              ))}
            </div>
            <div className="flex items-center space-x-3 text-slate-500">
               <span className="text-[10px] font-black uppercase">Python 3.10</span>
               <RefreshCw size={14} className="hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Core Editor View */}
          <div className="flex-1 relative font-mono text-sm leading-relaxed overflow-hidden">
            <div className="absolute top-0 left-0 bottom-0 w-12 bg-[#11111b] border-r border-white/5 flex flex-col items-center pt-6 text-slate-700 selection:bg-transparent pointer-events-none">
              {Array.from({ length: 50 }).map((_, i) => (
                <span key={i} className="h-6 leading-6 text-[10px] font-black">{i + 1}</span>
              ))}
            </div>
            <textarea
              spellCheck="false"
              className="absolute inset-0 pl-16 pt-6 bg-transparent text-slate-300 focus:outline-none resize-none custom-scrollbar-dark w-full h-full"
              value={files[activeFile]}
              onChange={(e) => setFiles({ ...files, [activeFile]: e.target.value })}
            />
          </div>

          {/* Action Bar */}
          <div className="h-14 p-3 bg-[#11111b] border-t border-white/5 flex justify-end items-center space-x-3">
             <Button 
                variant="ghost" 
                size="sm" 
                className="text-slate-400 hover:text-white hover:bg-white/5"
             >
                <HelpCircle size={18} className="mr-2" /> <span className="text-xs font-black uppercase">Hint</span>
             </Button>
             <Button 
                variant="primary" 
                size="sm" 
                onClick={handleRunCode}
                disabled={isExecuting}
                className="bg-teal-500 hover:bg-teal-600 shadow-xl shadow-teal-500/10 px-8"
             >
                {isExecuting ? (
                  <RefreshCw size={16} className="animate-spin" />
                ) : (
                  <Play size={16} fill="currentColor" />
                )}
                <span className="ml-2 text-xs font-black uppercase tracking-widest">Run Code</span>
             </Button>
          </div>
        </div>

        {/* DRAG HANDLE LEGEND RIGHT */}
        <div 
          className="absolute z-10 w-1.5 h-full hover:bg-primary/50 transition-colors cursor-col-resize flex items-center justify-center group"
          style={{ left: `${panelWidths.instructions + panelWidths.editor}%`, transform: 'translateX(-50%)' }}
          onMouseDown={startResizing('right')}
        >
          <div className="w-[1px] h-32 bg-white/10 group-hover:bg-white/30 rounded-full" />
        </div>

        {/* ─── RIGHT PANEL: Terminal/Output ──────────────────────── */}
        <aside 
          style={{ width: `${panelWidths.terminal}%` }}
          className="flex flex-col bg-[#11111b] overflow-hidden"
        >
          <div className="h-10 flex border-b border-white/5">
             {[
               { id: 'output', icon: TerminalIcon, label: 'Output' },
               { id: 'tests', icon: CheckCircle, label: 'Results' }
             ].map(tab => (
               <button
                 key={tab.id}
                 onClick={() => setActiveTab(tab.id)}
                 className={cn(
                   "flex-1 flex items-center justify-center h-full text-[10px] font-black uppercase tracking-widest border-b-2 transition-all",
                   activeTab === tab.id 
                    ? "text-primary border-primary bg-[#181825]" 
                    : "text-slate-500 border-transparent hover:text-slate-400 hover:bg-white/5"
                 )}
               >
                 <tab.icon size={12} className="mr-2" />
                 {tab.label}
               </button>
             ))}
          </div>

          <div className="flex-1 p-6 font-mono text-xs overflow-y-auto custom-scrollbar-dark bg-[#0a0a0f]">
            {activeTab === 'output' ? (
              <pre className={cn(
                "whitespace-pre-wrap transition-all duration-300",
                isExecuting ? "text-slate-500 animate-pulse" : "text-emerald-400"
              )}>
                {output}
                {!isExecuting && <span className="inline-block w-2 h-4 bg-emerald-400 ml-1 animate-pulse align-middle" />}
              </pre>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center p-3 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400">
                   <AlertCircle size={14} className="mr-2" />
                   <span className="font-black">Lab not submitted yet.</span>
                </div>
                <p className="text-slate-500 text-[10px] leading-relaxed uppercase tracking-widest font-black text-center mt-12">
                   Submit your lab to see the full analysis report here.
                </p>
              </div>
            )}
          </div>
        </aside>

      </div>
    </LabLayout>
  );
};

export default LabEnvironment;
