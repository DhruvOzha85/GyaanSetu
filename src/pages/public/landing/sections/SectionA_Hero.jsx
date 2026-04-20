import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, CheckCircle, ArrowRight } from 'lucide-react';
import Button from '../../../../components/ui/Button';
import { Link } from 'react-router-dom';

const SectionA_Hero = () => {
  const bubbles = [
    { text: 'ગ', color: 'bg-secondary', top: '20%', left: '10%', delay: 0 },
    { text: 'ह', color: 'bg-primary', top: '60%', left: '80%', delay: 1 },
    { text: 'E', color: 'bg-slate-700', top: '10%', left: '70%', delay: 0.5 },
  ];

  return (
    <section className="relative min-h-[90vh] flex items-center bg-[#F9FAFB] dark:bg-slate-950 overflow-hidden pt-20">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-orange-50/50 dark:bg-orange-950/5 skew-x-12 translate-x-32" />
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Content */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-teal-50 dark:bg-teal-900/20 text-secondary rounded-full"
            >
              <BookOpen size={16} />
              <span className="text-xs font-black uppercase tracking-widest">
                India&apos;s First Bilingual Practical EdTech
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tighter"
            >
              Learn by <span className="text-primary italic">Doing.</span> <br />
              Learn in Your <span className="gradient-text">Language.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl font-medium"
            >
              Master high-demand tech skills through browser-based labs and interactive projects. 
              Available in Hindi, Gujarati, and English to bridge the gap for every aspiring scholar.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4"
            >
              <Link to="/signup">
                <Button size="lg" icon={ArrowRight}>Start Learning Free</Button>
              </Link>
              <Link to="/courses">
                <Button variant="outline" size="lg">Explore Courses</Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="pt-8 grid grid-cols-2 md:flex md:items-center gap-4 text-slate-500 dark:text-slate-400"
            >
              {[
                '10,000+ Students',
                '200+ Labs',
                '5 Languages',
                '98% Placement'
              ].map((stat, i) => (
                <div key={i} className="flex items-center space-x-2 text-sm font-bold">
                  <CheckCircle size={14} className="text-secondary" />
                  <span>{stat}</span>
                  {i < 3 && <span className="hidden md:block mx-2 opacity-30">|</span>}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Illustration */}
          <div className="lg:col-span-5 relative hidden lg:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative aspect-square bg-white dark:bg-slate-900 rounded-[4rem] shadow-2xl p-8 border border-slate-100 dark:border-slate-800"
            >
              {/* Mock Code Interface */}
              <div className="w-full h-full bg-slate-50 dark:bg-slate-950 rounded-[3rem] p-6 font-mono text-[10px] overflow-hidden">
                <div className="flex space-x-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-rose-400" />
                  <div className="w-2 h-2 rounded-full bg-amber-400" />
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                </div>
                <div className="space-y-2 opacity-50">
                  <p className="text-primary">import &#123; PracticalSkill &#125; from &apos;GyaanSetu&apos;;</p>
                  <p className="text-secondary">const student = new Scholar(&apos;Bharat&apos;);</p>
                  <p>&nbsp;</p>
                  <p className="text-emerald-500">{"// Start the bilingual journey..."}</p>
                  <p>student.selectLanguage(&apos;Hindi&apos;);</p>
                  <p>student.startLab(&apos;FullStack-MERN&apos;);</p>
                  <p>&nbsp;</p>
                  {[45, 70, 55, 80, 40, 65, 50, 75, 45, 60].map((width, i) => (
                    <div key={i} className="h-1.5 bg-slate-200 dark:bg-slate-800 rounded w-full" style={{ width: `${width}%` }} />
                  ))}
                </div>
              </div>

              {/* Floating Language Bubbles */}
              {bubbles.map((b, i) => (
                <motion.div
                  key={i}
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: b.delay, ease: "easeInOut" }}
                  className={cn(
                    "absolute w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black text-white shadow-xl",
                    b.color
                  )}
                  style={{ top: b.top, left: b.left }}
                >
                  {b.text}
                </motion.div>
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

// Sub-component Helper: cn
const cn = (...classes) => classes.filter(Boolean).join(' ');

export default SectionA_Hero;
