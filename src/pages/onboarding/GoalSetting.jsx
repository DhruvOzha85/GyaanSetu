import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Target, Check, ChevronRight } from 'lucide-react';
import { ONBOARDING_GOALS } from '../../utils/constants';
import { cn } from '../../utils/cn';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

const GoalSetting = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState('job');

  const handleFinish = () => {
    // In a real app, you'd save this to the user profile API
    localStorage.setItem('gs_onboarding_complete', 'true');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-12 bg-white dark:bg-slate-950">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-4xl w-full text-center"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-secondary/10 text-secondary mb-6">
          <Target size={32} />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight uppercase">
          What is your <span className="text-secondary italic">primary goal</span>?
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-bold mb-12 max-w-lg mx-auto">
          Help us personalize your learning path by telling us what you want to achieve.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
          {ONBOARDING_GOALS.map((goal) => (
            <Card
              key={goal.id}
              hoverable
              onClick={() => setSelected(goal.id)}
              className={cn(
                "relative p-10 flex items-center gap-6 text-left cursor-pointer transition-all duration-300 border-2",
                selected === goal.id 
                  ? "border-secondary bg-secondary/5 shadow-xl shadow-secondary/10" 
                  : "border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700"
              )}
            >
              <div className="text-5xl">{goal.emoji}</div>
              <div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white mb-1 uppercase tracking-tight">
                  {goal.title}
                </h3>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Personalized Path Available
                </p>
              </div>

              {selected === goal.id && (
                <div className="absolute top-4 right-4 w-6 h-6 bg-secondary text-white rounded-full flex items-center justify-center shadow-lg animate-in zoom-in">
                  <Check size={14} strokeWidth={4} />
                </div>
              )}
            </Card>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button 
            variant="secondary"
            size="lg" 
            className="w-full sm:w-64 py-5 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3"
            onClick={handleFinish}
          >
            Get Started <ChevronRight size={16} />
          </Button>
          <button 
            onClick={() => navigate('/onboarding/language')}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-black text-[10px] uppercase tracking-widest transition-colors"
          >
            Go Back
          </button>
        </div>
      </motion.div>
    </div>
  );
};

GoalSetting.displayName = 'GoalSetting';

export default GoalSetting;
