import React from 'react';
import { Trophy, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../../../utils/cn';
import Card from '../../../components/ui/Card';

const LeaderboardPreview = ({ data }) => {
  return (
    <Card className="flex-grow flex flex-col">
      <div className="p-6 border-b border-slate-50 dark:border-slate-800/50 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-amber-50 dark:bg-amber-900/20 text-amber-500 rounded-xl">
            <Trophy size={20} />
          </div>
          <h3 className="text-xl font-black text-slate-800 dark:text-white">Community Leaderboard</h3>
        </div>
        <Link to="/leaderboard" className="text-sm font-bold text-primary hover:underline flex items-center">
          View Full <ChevronRight size={16} />
        </Link>
      </div>

      <div className="p-2">
        <table className="w-full">
          <thead>
            <tr className="text-[10px] uppercase tracking-widest text-slate-400 font-black">
              <th className="px-4 py-3 text-left">Rank</th>
              <th className="px-4 py-3 text-left">Scholar</th>
              <th className="px-4 py-3 text-left">City</th>
              <th className="px-4 py-3 text-right">XP Points</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
            {data.map((user) => (
              <tr 
                key={user.rank}
                className={cn(
                  "group transition-colors",
                  user.isCurrentUser ? "bg-orange-50/50 dark:bg-orange-900/10" : "hover:bg-slate-50 dark:hover:bg-slate-800/20"
                )}
              >
                <td className="px-4 py-3">
                  <span className={cn(
                    "text-sm font-black",
                    user.rank === 1 ? "text-amber-500" : 
                    user.rank === 2 ? "text-slate-400" :
                    user.rank === 3 ? "text-orange-500" : "text-slate-500"
                  )}>
                    #{user.rank}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm">
                  <div className="flex items-center space-x-3">
                    <img className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-800" src={user.avatar} alt={user.name} />
                    <span className={cn("font-bold", user.isCurrentUser ? "text-primary" : "text-slate-700 dark:text-slate-300")}>
                      {user.name} {user.isCurrentUser && "(You)"}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm font-medium text-slate-500 dark:text-slate-400">
                  {user.city}
                </td>
                <td className="px-4 py-3 text-right text-sm font-black text-slate-800 dark:text-white">
                  {user.xp.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default LeaderboardPreview;
