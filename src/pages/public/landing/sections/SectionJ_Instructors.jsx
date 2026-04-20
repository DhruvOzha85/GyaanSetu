import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { BadgeCheck, ChevronRight } from 'lucide-react';

const SectionJ_Instructors = () => {
  const instructors = [
    { name: 'Dr. Vivek Rao', role: 'Data Scientist', company: 'Ex-Google', subject: 'Machine Learning', rating: 4.9, avatar: 'https://i.pravatar.cc/150?u=vivek' },
    { name: 'Sneha Kapoor', role: 'UI/UX Lead', company: 'Zomato', subject: 'Product Design', rating: 4.8, avatar: 'https://i.pravatar.cc/150?u=sneha' },
    { name: 'Amit Singh', role: 'Staff Engineer', company: 'Amazon', subject: 'DSA & Algorithms', rating: 4.9, avatar: 'https://i.pravatar.cc/150?u=amit' },
    { name: 'Priya Verma', role: 'Backend Expert', company: 'Razorpay', subject: 'Node.js Architecture', rating: 4.7, avatar: 'https://i.pravatar.cc/150?u=priya' },
  ];

  return (
    <section className="py-24 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="space-y-4 text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white">
              Learn From the Best
            </h2>
            <p className="text-slate-500 font-medium max-w-xl mx-auto md:mx-0">
              Our instructors are industry veterans who bring years of real-world production experience to your screen.
            </p>
          </div>
          <button className="flex items-center space-x-2 text-primary font-black text-sm group mx-auto md:mx-0">
            <span>View All Instructors</span>
            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {instructors.map((ins, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-orange-100 dark:bg-orange-950/20 rounded-3xl translate-y-2 translate-x-2 group-hover:translate-y-4 group-hover:translate-x-4 transition-transform duration-300" />
              <div className="relative p-8 rounded-3xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 h-full flex flex-col items-center text-center shadow-lg transition-shadow group-hover:shadow-xl">
                <div className="w-24 h-24 rounded-[2rem] overflow-hidden mb-6 ring-4 ring-orange-50 dark:ring-orange-900/10">
                  <img src={ins.avatar} alt={ins.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                </div>
                <h4 className="text-xl font-black text-slate-900 dark:text-white flex items-center space-x-2">
                  <span>{ins.name}</span>
                  <BadgeCheck size={18} className="text-primary fill-orange-50" />
                </h4>
                <p className="text-[10px] font-black text-primary uppercase tracking-widest mt-1">
                  {ins.role} • {ins.company}
                </p>
                <div className="h-px w-8 bg-slate-100 dark:bg-slate-800 my-4" />
                <p className="text-sm font-bold text-slate-600 dark:text-slate-400">
                  Specialist in {ins.subject}
                </p>
                <div className="mt-6 flex items-center space-x-1 text-amber-500 font-black text-sm">
                  <Star size={14} fill="currentColor" />
                  <span>{ins.rating} Rating</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Star = ({ size, fill, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

Star.propTypes = {
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  fill: PropTypes.string,
  className: PropTypes.string,
};

export default SectionJ_Instructors;
