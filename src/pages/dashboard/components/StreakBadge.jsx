import React from 'react';
import { Flame } from 'lucide-react';
import { cn } from '../../../utils/cn';

const StreakBadge = ({ days, className }) => {
  return (
    <div className={cn(
      "inline-flex items-center space-x-2 px-4 py-2 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 rounded-2xl border border-orange-100 dark:border-orange-800/50 shadow-sm transition-all hover:scale-105 cursor-default group",
      className
    )}>
      <div className="relative">
        <Flame size={18} className="text-orange-500 fill-orange-500 group-hover:animate-bounce" />
        <div className="absolute inset-0 bg-orange-400 blur-lg opacity-20 group-hover:opacity-40 animate-pulse" />
      </div>
      <span className="text-sm font-black tracking-tight italic">
        {days}-Day Streak
      </span>
    </div>
  );
};

export default StreakBadge;
