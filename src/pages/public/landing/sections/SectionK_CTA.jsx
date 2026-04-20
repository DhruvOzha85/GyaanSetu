import React from 'react';
import { motion } from 'framer-motion';
import Button from '../../../../components/ui/Button';
import { Link } from 'react-router-dom';

const SectionK_CTA = () => {
  return (
    <section className="py-24 px-4">
      <div className="container mx-auto max-w-6xl relative">
        <div className="bg-gradient-to-br from-primary to-secondary rounded-[4rem] px-8 py-20 text-center text-white overflow-hidden shadow-2xl relative">
          {/* Decorative Background Circles */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/20 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-400/20 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />
          
          <div className="relative z-10 max-w-3xl mx-auto space-y-8">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-black leading-tight tracking-tighter"
            >
              Your Language. Your Labs. <br />
              <span className="text-slate-900 italic">Your Career.</span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg md:text-xl font-bold opacity-90"
            >
              Join 10,000+ scholars bridging the gap between education and industry. 
              Start your bilingual tech journey today for zero cost.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center space-y-4"
            >
              <Link to="/signup">
                <Button 
                  size="lg" 
                  className="bg-white text-primary hover:bg-slate-50 shadow-2xl px-12 h-16 text-lg"
                >
                  Get Started for Free →
                </Button>
              </Link>
              <p className="text-xs font-black uppercase tracking-widest opacity-60">
                ⭐ No Credit Card Required
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionK_CTA;
