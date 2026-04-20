import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import { mockTestimonials } from '../data/mockData';
import Card from '../../../../components/ui/Card';

const SectionI_Testimonials = () => {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-950/50">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white">
            Students Who Made the Leap
          </h2>
          <p className="text-slate-500 font-medium">
            Hear from our scholars across Tier 2 and Tier 3 cities in India.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockTestimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="h-full flex flex-col p-8 relative overflow-hidden group" hoverable>
                <Quote 
                  size={64} 
                  className="absolute -top-4 -left-4 text-primary opacity-[0.03] group-hover:opacity-10 transition-opacity" 
                />
                
                <div className="flex items-center space-x-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={14} 
                      fill={i < t.rating ? 'currentColor' : 'none'} 
                      className={cn(i < t.rating ? 'text-amber-500' : 'text-slate-300')} 
                    />
                  ))}
                </div>

                <p className="text-lg font-bold text-slate-700 dark:text-slate-300 mb-8 italic flex-1">
                  &ldquo;{t.quote}&rdquo;
                </p>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-lg">
                    <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 dark:text-white leading-none">
                      {t.name}
                    </h4>
                    <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">
                      {t.college}, {t.city}
                    </p>
                    <div className="inline-block mt-2 px-1.5 py-0.5 bg-secondary/10 text-secondary text-[8px] font-black rounded uppercase">
                      {t.tier} City
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const cn = (...classes) => classes.filter(Boolean).join(' ');

export default SectionI_Testimonials;
