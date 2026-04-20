import React from 'react';
import { cn } from '../../../utils/cn';
import Card from '../../../components/ui/Card';

const DashboardStatCard = ({ title, value, icon: Icon, color, description, isLoading }) => {
  const colorMap = {
    orange: "bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400",
    teal: "bg-teal-50 text-teal-600 dark:bg-teal-900/20 dark:text-teal-400",
    amber: "bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400",
    emerald: "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400",
  };

  const iconBgMap = {
    orange: "bg-orange-500",
    teal: "bg-teal-500",
    amber: "bg-amber-500",
    emerald: "bg-emerald-500",
  };

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse flex items-center space-x-4">
          <div className="rounded-full bg-slate-200 h-12 w-12" />
          <div className="flex-1 space-y-2 py-1">
            <div className="h-2 bg-slate-200 rounded w-3/4" />
            <div className="h-4 bg-slate-200 rounded" />
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 hover:translate-y-[-4px] transition-all duration-300 group">
      <div className="flex items-center justify-between mb-4">
        <div className={cn("p-3 rounded-2xl transition-colors", colorMap[color] || colorMap.teal)}>
          <Icon size={24} strokeWidth={2.5} />
        </div>
        <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">
          Last 30 Days
        </div>
      </div>
      
      <div>
        <h3 className="text-3xl font-black text-slate-800 dark:text-white tracking-tighter mb-1">
          {value}
        </h3>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          {title}
        </p>
      </div>

      {description && (
        <div className="mt-4 pt-4 border-t border-slate-50 dark:border-slate-800/50">
          <p className="text-[10px] font-medium text-slate-500 dark:text-slate-400 italic">
            {description}
          </p>
        </div>
      )}
    </Card>
  );
};

export default DashboardStatCard;
