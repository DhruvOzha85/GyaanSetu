import React, { useState } from 'react';
import { 
  Search, 
  Mic, 
  Rocket, 
  Code, 
  Globe, 
  CreditCard, 
  Wrench, 
  User, 
  ChevronRight,
  Send,
  Upload,
  CheckCircle2,
  HelpCircle,
  Mail,
  Phone,
  MessageSquare
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card from '../../components/ui/Card';
import Accordion from '../../components/ui/Accordion';
import { mockFaqs } from './landing/data/mockData';

const Contact = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const helpCategories = [
    { title: 'Getting Started', icon: Rocket, color: 'text-teal-500', bg: 'bg-teal-50 dark:bg-teal-900/20', count: 12 },
    { title: 'Labs & Coding', icon: Code, color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-900/20', count: 24 },
    { title: 'Language Support', icon: Globe, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-900/20', count: 8 },
    { title: 'Billing & Plans', icon: CreditCard, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-900/20', count: 15 },
    { title: 'Technical Issues', icon: Wrench, color: 'text-rose-500', bg: 'bg-rose-50 dark:bg-rose-900/20', count: 10 },
    { title: 'Account & Profile', icon: User, color: 'text-slate-500', bg: 'bg-slate-50 dark:bg-slate-900/20', count: 18 },
  ];

  const extendedFaqs = [
    ...mockFaqs,
    { question: 'Do I get a refund if I cancel?', answer: 'Yes, if you cancel within the first 7 days of a new subscription, we offer a full no-questions-asked refund.' },
    { question: 'Can companies buy bulk licenses?', answer: 'Yes! Our Enterprise plan is designed for teams. We offer volume discounts and a centralized management dashboard for group enrollments.' },
    { question: 'Is there a mobile app?', answer: 'Our platform is a Progressive Web App (PWA) optimized for mobile. You can add GyaanSetu to your home screen for an app-like experience without needing a separate download.' },
    { question: 'How do I submit my technical projects?', answer: 'You can submit your projects directly through the Project Workspace. Our mentors review submissions within 48-72 hours.' },
    { question: 'What languages are currently supported?', answer: 'We currently support English, Hindi, Marathi, Gujarati, Bengali, and Tamil. We are actively adding more regional languages every month.' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  return (
    <div className="pt-24 pb-32 bg-white dark:bg-slate-950">
      <Helmet>
        <title>Help Center | Support — GyaanSetu</title>
        <meta name="description" content="Get support for GyaanSetu. Browse our bilingual help articles, FAQs, and guides, or contact our support team for help with labs, billing, and courses." />
        <meta property="og:title" content="Help Center | Support — GyaanSetu" />
        <meta property="og:description" content="We're here to help you succeed. Find answers to your questions in your preferred language." />
      </Helmet>

      {/* Hero / Search Section */}
      <div className="relative py-20 px-4 mb-20 overflow-hidden text-center">
         <div className="absolute inset-0 bg-primary/5 dark:bg-primary/5 -skew-y-3 origin-top-left" />
         <div className="relative max-w-4xl mx-auto z-10">
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 uppercase tracking-tight">How can we <span className="text-primary italic">help you?</span></h1>
            
            <div className="relative max-w-2xl mx-auto mt-12">
               <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400">
                  <Search size={24} />
               </div>
               <input 
                 type="text" 
                 placeholder="Search articles, guides, and tutorials..." 
                 className="w-full bg-white dark:bg-slate-900 border-none rounded-[32px] py-6 pl-16 pr-16 shadow-2xl shadow-primary/5 text-slate-700 dark:text-white font-bold focus:ring-4 focus:ring-primary/20 transition-all"
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
               />
               <button className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 hover:text-primary transition-colors">
                  <Mic size={24} />
               </button>
            </div>
         </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4">
         {/* Category Grid */}
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
            {helpCategories.map((cat, i) => (
               <Card key={i} hoverable className="p-8 flex items-center justify-between group cursor-pointer border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-5">
                     <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110", cat.bg, cat.color)}>
                        <cat.icon size={28} />
                     </div>
                     <div>
                        <h3 className="font-black text-slate-900 dark:text-white uppercase tracking-tight">{cat.title}</h3>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{cat.count} Articles</p>
                     </div>
                  </div>
                  <ChevronRight size={20} className="text-slate-200 group-hover:text-primary transition-colors" />
               </Card>
            ))}
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* FAQ Section */}
            <div className="lg:col-span-7">
               <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-10 tracking-tight">Frequently Asked Questions</h2>
               <div className="space-y-4">
                  {extendedFaqs.map((faq, i) => (
                     <Accordion 
                        key={i} 
                        title={faq.question} 
                        className="bg-slate-50 dark:bg-slate-900/50 border-none rounded-3xl"
                     >
                        <p className="text-slate-600 dark:text-slate-400 pb-6 leading-relaxed font-medium">
                           {faq.answer}
                        </p>
                     </Accordion>
                  ))}
               </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-5">
               <div className="sticky top-24 p-10 bg-slate-900 dark:bg-slate-900 rounded-[48px] text-white shadow-2xl">
                  {formSubmitted ? (
                     <motion.div 
                       initial={{ opacity: 0, scale: 0.9 }}
                       animate={{ opacity: 1, scale: 1 }}
                       className="flex flex-col items-center justify-center py-20 text-center"
                     >
                        <div className="w-20 h-20 bg-emerald-500 rounded-[32px] flex items-center justify-center mb-8 shadow-xl shadow-emerald-500/20">
                           <CheckCircle2 size={40} />
                        </div>
                        <h3 className="text-2xl font-black mb-4">Message Sent!</h3>
                        <p className="text-slate-400 font-bold max-w-[240px]">Thanks! Our bilingual support team will reply within 24 hours.</p>
                     </motion.div>
                  ) : (
                     <>
                        <h2 className="text-3xl font-black mb-4 tracking-tight">Still need help?</h2>
                        <p className="text-slate-400 font-bold mb-10">Send us a message and we'll get back to you shortly.</p>
                        
                        <form onSubmit={handleSubmit} className="space-y-6">
                           <div className="grid grid-cols-2 gap-4">
                              <Input 
                                label="Full Name" 
                                placeholder="Your Name" 
                                required 
                                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                              />
                              <Input 
                                label="Email Address" 
                                placeholder="name@email.com" 
                                type="email" 
                                required 
                                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                              />
                           </div>
                           
                           <div>
                              <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 tracking-widest">Support Category</label>
                              <select className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 px-4 text-sm font-bold text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none">
                                 <option>Technical Issue</option>
                                 <option>Billing & Subscription</option>
                                 <option>Course Content</option>
                                 <option>Lab Environment</option>
                                 <option>Other</option>
                              </select>
                           </div>

                           <Input 
                             label="Subject" 
                             placeholder="How can we help?" 
                             required 
                             className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                           />
                           
                           <div>
                              <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 tracking-widest">Your Message</label>
                              <textarea 
                                required 
                                minLength={20}
                                placeholder="Describe your issue in detail..." 
                                className="w-full bg-slate-800 border border-slate-700 rounded-2xl py-4 px-4 text-sm font-bold text-white h-32 focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none placeholder:text-slate-500"
                              />
                           </div>

                           <div className="p-4 bg-slate-800 border-2 border-dashed border-slate-700 rounded-2xl flex items-center justify-center gap-3 cursor-pointer hover:bg-slate-800/80 transition-colors group">
                              <Upload size={18} className="text-slate-500 group-hover:text-primary transition-colors" />
                              <span className="text-xs font-black uppercase tracking-widest text-slate-500">Attach Screenshots</span>
                           </div>

                           <Button type="submit" className="w-full py-5 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3">
                              Send Message <Send size={16} />
                           </Button>
                        </form>
                     </>
                  )}
               </div>
            </div>
         </div>

         {/* Support Channels Footer */}
         <div className="mt-40 grid grid-cols-1 md:grid-cols-3 gap-12 pt-20 border-t border-slate-100 dark:border-slate-800">
            <div className="flex flex-col items-center text-center">
               <div className="w-16 h-16 rounded-[24px] bg-primary/10 text-primary flex items-center justify-center mb-6">
                  <Mail size={28} />
               </div>
               <h4 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight mb-2">Email Support</h4>
               <p className="text-sm font-bold text-slate-500">support@gyaansetu.com</p>
            </div>
            <div className="flex flex-col items-center text-center">
               <div className="w-16 h-16 rounded-[24px] bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-6">
                  <Phone size={28} />
               </div>
               <h4 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight mb-2">Phone Support</h4>
               <p className="text-sm font-bold text-slate-500">1800-GYAAN-SETU</p>
            </div>
            <div className="flex flex-col items-center text-center">
               <div className="w-16 h-16 rounded-[24px] bg-teal-500/10 text-teal-500 flex items-center justify-center mb-6">
                  <MessageSquare size={28} />
               </div>
               <h4 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight mb-2">Live Chat</h4>
               <p className="text-sm font-bold text-slate-500">Average response: 2m</p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Contact;
