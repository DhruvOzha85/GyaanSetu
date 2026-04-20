import React from 'react';
import { Megaphone, Star, Award, Settings } from 'lucide-react';
import Card from '../../../components/ui/Card';
import { cn } from '../../../utils/cn';

const AnnouncementsPanel = ({ items }) => {
  const getIcon = (type) => {
    switch (type) {
      case 'new_course': return <Star size={16} />;
      case 'achievement': return <Award size={16} />;
      default: return <Settings size={16} />;
    }
  };

  const getColor = (type) => {
    switch (type) {
      case 'new_course': return "text-teal-500 bg-teal-50 dark:bg-teal-900/20";
      case 'achievement': return "text-amber-500 bg-amber-50 dark:bg-amber-900/20";
      default: return "text-slate-500 bg-slate-50 dark:bg-slate-900/20";
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <div className="p-6 border-b border-slate-50 dark:border-slate-800/50 flex items-center space-x-3">
        <div className="p-2 bg-teal-50 dark:bg-teal-900/20 text-teal-500 rounded-xl">
          <Megaphone size={20} />
        </div>
        <h3 className="text-xl font-black text-slate-800 dark:text-white">What&apos;s New? 🎉</h3>
      </div>

      <div className="p-6 space-y-6">
        {items.map((item) => (
          <div key={item.id} className="flex space-x-4 group cursor-pointer">
            <div className={cn("p-2 rounded-lg h-fit flex-shrink-0 transition-transform group-hover:scale-110", getColor(item.type))}>
              {getIcon(item.type)}
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-black text-slate-800 dark:text-white leading-tight group-hover:text-primary transition-colors">
                  {item.title}
                </h4>
                <span className="text-[10px] font-bold text-slate-400 uppercase shrink-0 ml-4">
                  {item.date}
                </span>
              </div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 line-clamp-2">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-auto p-6 pt-0">
        <button className="w-full py-3 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest transition-all">
          View All Updates
        </button>
      </div>
    </Card>
  );
};

export default AnnouncementsPanel;
