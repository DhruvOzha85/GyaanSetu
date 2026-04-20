import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Terminal, Cpu } from 'lucide-react';
import Button from '../../../../components/ui/Button';

const SectionG_LabPreview = () => {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-950/50">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Side */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight">
                Learn By Doing, <br />
                <span className="text-secondary italic">Not Just Reading.</span>
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 font-medium">
                Our revolutionary Lab Environment brings industry workflows to your browser. No high-end PC required—only your curiosity.
              </p>
            </div>

            <ul className="space-y-4">
              {[
                'Full-featured browser-based code editor',
                'Integrated Linux terminal for real debugging',
                'Auto-evaluation of steps and final projects',
                'Real-time output preview for Web & Apps',
              ].map((item, i) => (
                <li key={i} className="flex items-center space-x-3 font-bold text-slate-700 dark:text-slate-300">
                  <CheckCircle size={20} className="text-secondary flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="pt-4">
              <Button size="lg" variant="primary" className="bg-secondary hover:bg-teal-700">
                Try a Free Lab →
              </Button>
            </div>
          </div>

          {/* Visual Mock Side */}
          <div className="relative">
            {/* Background Glow */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-3xl blur-2xl opacity-50" />
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative rounded-3xl bg-slate-900 shadow-2xl border border-slate-800 overflow-hidden"
            >
              {/* Fake Toolbar */}
              <div className="h-12 bg-slate-800 border-b border-slate-700 px-6 flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500" />
                    <div className="w-3 h-3 rounded-full bg-amber-500" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  </div>
                  <div className="h-6 w-px bg-slate-700" />
                  <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400">
                    <Cpu size={14} />
                    <span>MERN Stack Project</span>
                  </div>
                </div>
                <Button size="sm" className="h-7 text-[10px] py-0 px-3">SUBMIT LAB</Button>
              </div>

              <div className="flex h-[400px]">
                {/* Left Panel: Instructions */}
                <div className="w-1/3 border-r border-slate-800 p-6 space-y-4 bg-slate-900/50">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Task 1 of 5</h4>
                  <p className="text-[11px] font-bold text-slate-300">Set up the initial Express server with middleware.</p>
                  <div className="space-y-2">
                    <div className="h-1 w-full bg-slate-800 rounded" />
                    <div className="h-1 w-4/5 bg-slate-800 rounded" />
                    <div className="h-1 w-3/4 bg-slate-800 rounded" />
                  </div>
                  <div className="flex items-center space-x-2 pt-2 text-[10px] text-emerald-400 font-bold">
                    <CheckCircle size={12} />
                    <span>Middleware linked!</span>
                  </div>
                </div>

                {/* Main Area: Editor & Terminal */}
                <div className="flex-1 flex flex-col">
                  {/* Editor */}
                  <div className="flex-1 border-b border-slate-800 p-6 font-mono text-[11px] space-y-2">
                    <p className="text-slate-500">1 <span className="text-secondary ml-4">const express = require(&apos;express&apos;);</span></p>
                    <p className="text-slate-500">2 <span className="text-secondary ml-4">const app = express();</span></p>
                    <p className="text-slate-500">3 <span className="text-secondary ml-4">const PORT = 3000;</span></p>
                    <p className="text-slate-500">4 &nbsp;</p>
                    <p className="text-slate-500">5 <span className="text-slate-400 ml-4">app.use(express.json());</span></p>
                    <p className="text-slate-500">6 <span className="text-emerald-400 ml-4 cursor-default animate-pulse">|</span></p>
                  </div>
                  {/* Terminal */}
                  <div className="h-32 bg-slate-950 p-4 font-mono text-[10px]">
                    <div className="flex items-center space-x-2 text-slate-500 mb-2">
                      <Terminal size={12} />
                      <span>bash</span>
                    </div>
                    <p className="text-slate-400">$ npm start</p>
                    <p className="text-emerald-500">&gt; gyaansetu-lab@1.0.0 start</p>
                    <p className="text-emerald-500">&gt; node index.js</p>
                    <p className="text-slate-200 mt-2">Server listening on port 3000...</p>
                    <p className="text-slate-200 opacity-50">MongoDB Connected successfully.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SectionG_LabPreview;
