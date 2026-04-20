import React from 'react';
import { motion } from 'framer-motion';
import Badge from '../../../../components/ui/Badge';
import { Globe } from 'lucide-react';

const SectionH_LanguageSupport = () => {
  const languages = [
    { name: 'English', native: 'English', count: '120+ Courses', status: 'live' },
    { name: 'Hindi', native: 'हिंदी', count: '80+ Courses', status: 'live' },
    { name: 'Gujarati', native: 'ગુજરાતી', count: '60+ Courses', status: 'live' },
    { name: 'Tamil', native: 'தமிழ்', count: 'Coming Soon', status: 'soon' },
    { name: 'Bengali', native: 'বাংলা', count: 'Coming Soon', status: 'soon' },
    { name: 'Marathi', native: 'मराठी', count: 'Coming Soon', status: 'soon' },
  ];

  return (
    <section className="py-24 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white">
            Breaking the Language Barrier
          </h2>
          <p className="text-slate-500 font-medium max-w-2xl mx-auto">
            Conceptual clarity starts with the language of your heart. We are expanding rapidly to include more regional Indian languages.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {languages.map((lang, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="p-8 rounded-3xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex flex-col items-center text-center group transition-colors hover:bg-white dark:hover:bg-slate-900"
            >
              <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <Globe size={24} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">
                {lang.native}
              </h3>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">
                ({lang.name})
              </p>
              <div className="mt-auto">
                {lang.status === 'live' ? (
                  <Badge variant="success" className="text-[10px] uppercase">{lang.count}</Badge>
                ) : (
                  <Badge variant="info" className="text-[10px] uppercase bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400">COMING SOON</Badge>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="text-sm font-black text-slate-400 hover:text-primary transition-colors flex items-center justify-center mx-auto space-x-2">
            <span>Request Your Language</span>
            <Globe size={14} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default SectionH_LanguageSupport;
