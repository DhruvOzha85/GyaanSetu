import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { Check, Globe, ChevronRight } from 'lucide-react';
import { setLanguage } from '../../features/language/languageSlice';
import { LANGUAGES } from '../../utils/constants';
import { cn } from '../../utils/cn';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

const LanguageSelection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selected, setSelected] = useState('en');

  const handleContinue = () => {
    dispatch(setLanguage(selected));
    navigate('/onboarding/goals');
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-12 bg-white dark:bg-slate-950">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl w-full text-center"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-6">
          <Globe size={32} />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight uppercase">
          Choose your <span className="text-primary italic">language</span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-bold mb-12 max-w-lg mx-auto">
          We'll tailor your learning experience based on your preferred language. You can change this anytime.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {LANGUAGES.map((lang) => (
            <Card
              key={lang.code}
              hoverable
              onClick={() => setSelected(lang.code)}
              className={cn(
                "relative p-8 flex flex-col items-center text-center cursor-pointer transition-all duration-300 border-2",
                selected === lang.code 
                  ? "border-primary bg-primary/5 shadow-xl shadow-primary/10" 
                  : "border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700"
              )}
            >
              <div className="text-4xl mb-4">{lang.flag}</div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white mb-1 uppercase tracking-tight">
                {lang.nativeName}
              </h3>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                {lang.name}
              </p>

              {selected === lang.code && (
                <div className="absolute top-4 right-4 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center shadow-lg animate-in zoom-in">
                  <Check size={14} strokeWidth={4} />
                </div>
              )}

              {!lang.isLive && (
                <div className="absolute inset-0 bg-white/60 dark:bg-slate-950/60 backdrop-blur-[2px] rounded-[32px] flex items-center justify-center z-10 cursor-not-allowed">
                  <span className="bg-slate-900 text-white text-[10px] font-black py-1 px-3 rounded-full uppercase tracking-widest">
                    Coming Soon
                  </span>
                </div>
              )}
            </Card>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button 
            size="lg" 
            className="w-full sm:w-64 py-5 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3"
            onClick={handleContinue}
          >
            Continue <ChevronRight size={16} />
          </Button>
          <button 
            onClick={() => navigate('/onboarding/goals')}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-black text-[10px] uppercase tracking-widest transition-colors"
          >
            Skip for now
          </button>
        </div>
      </motion.div>
    </div>
  );
};

LanguageSelection.displayName = 'LanguageSelection';

export default LanguageSelection;
