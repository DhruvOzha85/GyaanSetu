import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '../../../utils/cn';

const XPChip = ({ xp, className }) => {
  return (
    <div className={cn(
      "inline-flex items-center space-x-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-2xl border border-emerald-100 dark:border-emerald-800/50 shadow-sm transition-all hover:scale-105 cursor-default",
      className
    )}>
      <div className="p-1 bg-emerald-500 rounded-lg text-white">
        <Star size={14} fill="currentColor" />
      </div>
      <span className="text-sm font-black tracking-tight">
        {xp.toLocaleString()} <span className="text-[10px] uppercase opacity-70 ml-0.5">XP</span>
      </span>
    </div>
  );
};

export default XPChip;
