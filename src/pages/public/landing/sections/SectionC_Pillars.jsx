import React from 'react';
import { Terminal, Globe, Check } from 'lucide-react';
import Card from '../../../../components/ui/Card';
import Button from '../../../../components/ui/Button';

const SectionC_Pillars = () => {
  return (
    <section className="py-24 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Two Pillars. One Platform. <br />
            <span className="text-secondary italic">Zero Compromise.</span>
          </h2>
          <p className="text-slate-500 font-medium">
            We combined high-end industrial infrastructure with the comfort of your own language.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pillar 1: Hands-On Labs */}
          <Card className="border-l-8 border-l-primary p-0 overflow-hidden" hoverable>
            <div className="p-8 md:p-12 h-full flex flex-col">
              <div className="w-16 h-16 bg-orange-50 dark:bg-orange-900/20 text-primary rounded-2xl flex items-center justify-center mb-8">
                <Terminal size={32} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">
                Hands-On Industry Lab Environment
              </h3>
              <p className="text-slate-600 dark:text-slate-400 font-medium mb-8">
                No setup required. Launch standard industrial stacks (MERN, Python, DevOps) directly in your browser with real-time feedback.
              </p>
              <ul className="space-y-3 mb-10">
                {[
                  'Linux terminals with auto-evaluation',
                  'Live preview of web projects',
                  'One-click environment setup',
                  'Save & resume from any device',
                ].map((item, i) => (
                  <li key={i} className="flex items-center space-x-3 text-sm font-bold text-slate-700 dark:text-slate-300">
                    <Check size={18} className="text-primary flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto">
                <Button variant="outline" className="w-full sm:w-auto">Explore Labs →</Button>
              </div>
            </div>
          </Card>

          {/* Pillar 2: Bilingual Delivery */}
          <Card className="border-l-8 border-l-secondary p-0 overflow-hidden" hoverable>
            <div className="p-8 md:p-12 h-full flex flex-col">
              <div className="w-16 h-16 bg-teal-50 dark:bg-teal-900/20 text-secondary rounded-2xl flex items-center justify-center mb-8">
                <Globe size={32} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">
                Regional Language Content Delivery
              </h3>
              <p className="text-slate-600 dark:text-slate-400 font-medium mb-8">
                Master complex concepts in the language you speak at home. We support Hindi, Gujarati, and English with more on the way.
              </p>
              <ul className="space-y-3 mb-10">
                {[
                  'Bilingual video lectures (Mix language for clarity)',
                  'Reading materials in native scripts',
                  'Dedicated regional doubt solving',
                  'Localization of industry terms',
                ].map((item, i) => (
                  <li key={i} className="flex items-center space-x-3 text-sm font-bold text-slate-700 dark:text-slate-300">
                    <Check size={18} className="text-secondary flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto">
                <Button variant="outline" className="w-full sm:w-auto">View Languages →</Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SectionC_Pillars;
