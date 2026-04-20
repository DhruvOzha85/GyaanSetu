import React from 'react';
import { motion } from 'framer-motion';
import { XCircle, CheckCircle } from 'lucide-react';

const SectionB_ProblemStatement = () => {
  const problems = [
    'Traditional skills gap in Tier 2/3 cities',
    'English-only content excluding many top talents',
    'Expensive courses without practical relevance',
    'Passive learning without industry tools',
  ];

  const solutions = [
    'Bilingual curriculum for deep conceptual clarity',
    'Browser-based lab environment for practicals',
    'Affordable access to world-class tech education',
    'Direct industry project integration',
  ];

  return (
    <section className="py-16 bg-teal-50/50 dark:bg-teal-900/10">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-200 dark:bg-slate-800 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm">
          
          {/* Problem Side */}
          <div className="bg-white dark:bg-slate-950 p-8 md:p-12">
            <div className="flex items-center space-x-3 mb-8">
              <div className="p-2 rounded-xl bg-rose-50 text-rose-500">
                <XCircle size={24} />
              </div>
              <h3 className="text-xl font-black text-slate-800 dark:text-slate-200">The Problem</h3>
            </div>
            <ul className="space-y-4">
              {problems.map((p, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start space-x-3 text-slate-500"
                >
                  <div className="h-1.5 w-1.5 rounded-full bg-slate-300 mt-2 flex-shrink-0" />
                  <span className="font-medium text-sm md:text-base">{p}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Solution Side */}
          <div className="bg-white dark:bg-slate-950 p-8 md:p-12 relative">
            {/* Visual Highlight */}
            <div className="absolute top-0 right-0 p-4">
              <span className="text-[100px] font-black text-teal-500 opacity-5 pointer-events-none">SETU</span>
            </div>

            <div className="flex items-center space-x-3 mb-8">
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-500">
                <CheckCircle size={24} />
              </div>
              <h3 className="text-xl font-black gradient-text">Our Setu (Solution)</h3>
            </div>
            <ul className="space-y-4">
              {solutions.map((s, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start space-x-3 text-slate-700 dark:text-slate-300"
                >
                  <CheckCircle size={18} className="text-secondary mt-0.5 flex-shrink-0" />
                  <span className="font-bold text-sm md:text-base">{s}</span>
                </motion.li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SectionB_ProblemStatement;
