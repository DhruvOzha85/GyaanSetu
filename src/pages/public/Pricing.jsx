import React, { useState } from 'react';
import { 
  Check, 
  X, 
  HelpCircle, 
  ArrowRight,
  Zap,
  Shield,
  Star,
  Globe,
  Rocket
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Accordion from '../../components/ui/Accordion';
import { pricingPlans, mockFaqs } from './landing/data/mockData';

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  const comparisonFeatures = [
    { name: 'Practice Labs', free: '5/mo', pro: 'Unlimited', ent: 'Unlimited' },
    { name: 'Bilingual Support', free: 'English only', pro: 'All Languages', ent: 'All + Custom' },
    { name: 'Certificates', free: false, pro: true, ent: 'Branded' },
    { name: 'Mentorship', free: 'Community', pro: 'Priority', ent: 'Dedicated' },
    { name: 'Cloud Projects', free: 'Basic', pro: 'Full Stack', ent: 'Enterprise Grade' },
    { name: 'API Access', free: false, pro: false, ent: true },
    { name: 'Analytics', free: false, pro: 'Personal', ent: 'Team Dashboard' },
  ];

  return (
    <div className="pt-24 pb-32 px-4 md:px-8 bg-white dark:bg-slate-950 overflow-hidden">
      <Helmet>
        <title>Pricing Plans — GyaanSetu</title>
        <meta name="description" content="Flexible pricing plans for GyaanSetu. Start for free with basic labs or upgrade to Pro for unlimited access to bilingual courses and cloud projects." />
        <meta property="og:title" content="Pricing Plans — GyaanSetu" />
        <meta property="og:description" content="Affordable practical skill building in your language. Explore our student-friendly pricing." />
      </Helmet>

      {/* Hero Section */}
      <div className="max-w-4xl mx-auto text-center mb-20 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-16 w-64 h-64 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-400 text-[10px] font-black uppercase tracking-widest mb-8"
        >
          <Rocket size={12} className="text-primary" /> Simplified, Transparent Pricing
        </motion.div>

        <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-8 tracking-tighter leading-none">
          Start for <span className="text-primary italic">Free</span>, <br />
          Scale as you <span className="text-emerald-500">Grow.</span>
        </h1>
        
        {/* Toggle */}
        <div className="flex items-center justify-center gap-6 mt-12">
           <span className={cn("text-xs font-black uppercase tracking-widest transition-colors", !isAnnual ? "text-slate-900 dark:text-white" : "text-slate-400")}>Monthly</span>
           <button 
             onClick={() => setIsAnnual(!isAnnual)}
             className="relative w-16 h-8 bg-slate-100 dark:bg-slate-900 rounded-full p-1 border border-slate-200 dark:border-slate-800"
           >
              <div className={cn(
                "absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-primary rounded-full shadow-lg transition-all duration-300 transform",
                isAnnual ? "translate-x-8" : "translate-x-0"
              )} />
           </button>
           <div className="flex items-center gap-2">
              <span className={cn("text-xs font-black uppercase tracking-widest transition-colors", isAnnual ? "text-slate-900 dark:text-white" : "text-slate-400")}>Annual</span>
              <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-[9px] font-black uppercase tracking-widest rounded-md">Save 30%</span>
           </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-32 relative z-10">
         {pricingPlans.map((plan) => (
           <Card 
             key={plan.id}
             className={cn(
               "relative p-10 flex flex-col h-full rounded-[48px] transition-all duration-500",
               plan.isRecommended ? "border-primary shadow-2xl shadow-primary/10 ring-8 ring-primary/5 -translate-y-4" : "border-slate-100 dark:border-slate-800"
             )}
           >
              {plan.isRecommended && (
                 <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-6 py-1.5 bg-primary text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full shadow-lg">
                    Recommended
                 </div>
              )}

              <div className="mb-10">
                 <h3 className="text-lg font-black text-slate-900 dark:text-white mb-6 uppercase tracking-widest">{plan.name}</h3>
                 <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter">
                       {typeof plan.monthlyPrice === 'number' ? `₹${isAnnual ? plan.annualPrice : plan.monthlyPrice}` : plan.monthlyPrice}
                    </span>
                    {typeof plan.monthlyPrice === 'number' && (
                       <span className="text-slate-400 text-sm font-bold">/ month</span>
                    )}
                 </div>
                 {isAnnual && plan.monthlyPrice > 0 && <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">Billed annually (₹{plan.annualPrice * 12}/year)</p>}
              </div>

              <div className="space-y-6 mb-12 flex-grow">
                 {plan.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-3">
                       <div className="mt-0.5 w-5 h-5 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 text-emerald-500 flex items-center justify-center flex-shrink-0">
                          <Check size={12} />
                       </div>
                       <span className="text-sm font-bold text-slate-600 dark:text-slate-400 italic">{feat}</span>
                    </div>
                 ))}
              </div>

              <Button 
                variant={plan.variant === 'primary' ? 'primary' : 'outline'}
                className={cn(
                  "w-full py-6 rounded-3xl text-sm font-black uppercase tracking-widest shadow-xl shadow-transparent hover:shadow-primary/20",
                   plan.variant === 'teal' ? "border-teal-500 text-teal-500 hover:bg-teal-50" : ""
                )}
              >
                 {plan.buttonText}
              </Button>
           </Card>
         ))}
      </div>

      {/* Comparison Table */}
      <div className="max-w-5xl mx-auto mb-32 overflow-hidden">
         <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-12 text-center uppercase tracking-tight">Full Plan Comparison</h2>
         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800">
                     <th className="py-6 px-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Features</th>
                     <th className="py-6 px-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Free</th>
                     <th className="py-6 px-4 text-[10px] font-black uppercase tracking-widest text-primary text-center">Pro</th>
                     <th className="py-6 px-4 text-[10px] font-black uppercase tracking-widest text-teal-500 text-center">Enterprise</th>
                  </tr>
               </thead>
               <tbody>
                  {comparisonFeatures.map((row, i) => (
                     <tr key={i} className="border-b border-slate-50 dark:border-slate-900 hover:bg-slate-50/50 dark:hover:bg-slate-900/50 transition-colors">
                        <td className="py-5 px-4 text-xs font-bold text-slate-700 dark:text-slate-200">{row.name}</td>
                        <td className="py-5 px-4 text-center">
                           <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                              {typeof row.free === 'string' ? row.free : row.free ? <Check className="mx-auto text-emerald-500" size={14} /> : <X className="mx-auto text-slate-200" size={14} />}
                           </span>
                        </td>
                        <td className="py-5 px-4 text-center">
                           <span className="text-[10px] font-black uppercase tracking-wider text-slate-900 dark:text-white">
                              {typeof row.pro === 'string' ? row.pro : row.pro ? <Check className="mx-auto text-emerald-500" size={14} /> : <X className="mx-auto text-slate-200" size={14} />}
                           </span>
                        </td>
                        <td className="py-5 px-4 text-center">
                           <span className="text-[10px] font-black uppercase tracking-wider text-slate-900 dark:text-white">
                              {typeof row.ent === 'string' ? row.ent : row.ent ? <Check className="mx-auto text-emerald-500" size={14} /> : <X className="mx-auto text-slate-200" size={14} />}
                           </span>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto">
         <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">Frequently Asked Questions</h2>
            <p className="text-slate-500 font-bold dark:text-slate-400">Everything you need to know about the GyaanSetu scholarship & billing.</p>
         </div>
         
         <div className="space-y-4">
            {mockFaqs.map((faq, i) => (
               <Accordion 
                 key={i} 
                 title={faq.question} 
                 className="bg-slate-50 dark:bg-slate-900/50 border-none rounded-3xl px-8"
               >
                  <p className="text-slate-600 dark:text-slate-400 pb-6 leading-relaxed font-medium">
                     {faq.answer}
                  </p>
               </Accordion>
            ))}
         </div>

         <div className="mt-20 p-10 bg-primary/5 rounded-[48px] border border-primary/10 text-center">
            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-4">Still have questions?</h3>
            <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-8 max-w-sm mx-auto">Our support team is available 24/7 in 12 Indian languages to help you choose the right path.</p>
            <Button variant="primary" className="text-xs font-black uppercase tracking-widest px-10">
               Contact Us <ArrowRight size={14} className="ml-2" />
            </Button>
         </div>
      </div>
    </div>
  );
};

export default Pricing;
