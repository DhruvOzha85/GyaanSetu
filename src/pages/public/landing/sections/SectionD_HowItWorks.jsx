import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Search, Code, Briefcase } from 'lucide-react';

const SectionD_HowItWorks = () => {
  const steps = [
    {
      title: 'Sign Up & Choose Language',
      desc: 'Create your account and pick your preferred native language.',
      icon: UserPlus,
    },
    {
      title: 'Explore Courses & Labs',
      desc: 'Browse through our bilingual catalog of modern tech skills.',
      icon: Search,
    },
    {
      title: 'Build Real Projects',
      desc: 'Use our industry labs to code, debug, and ship real work.',
      icon: Code,
    },
    {
      title: 'Get Industry-Ready',
      desc: 'Earn certifications and get placed in top companies.',
      icon: Briefcase,
    },
  ];

  return (
    <section className="py-24 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl font-black text-center text-slate-900 dark:text-white mb-20">
          How It Works
        </h2>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-[40px] left-32 right-32 h-0.5 border-t-2 border-dashed border-slate-200 dark:border-slate-800" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="flex flex-col items-center text-center relative z-10"
              >
                <div className="w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center shadow-xl shadow-orange-100 dark:shadow-none mb-8 group hover:scale-110 transition-transform cursor-pointer">
                  <step.icon size={32} />
                  {/* Number Badge */}
                  <div className="absolute -top-1 -right-1 w-8 h-8 bg-slate-900 dark:bg-slate-100 dark:text-slate-900 text-white text-xs font-black rounded-full flex items-center justify-center ring-4 ring-white dark:ring-slate-950">
                    {i + 1}
                  </div>
                </div>
                <h4 className="text-xl font-black text-slate-900 dark:text-white mb-3">
                  {step.title}
                </h4>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400 max-w-[200px]">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionD_HowItWorks;
