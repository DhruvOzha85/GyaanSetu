import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setLanguage } from '../../features/language/languageSlice';
import { Languages, ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';

const LanguageSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { current, available } = useSelector((state) => state.language);
  const dispatch = useDispatch();

  const currentLang = available.find(l => l.code === current);

  const handleSelect = (code) => {
    dispatch(setLanguage(code));
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 rounded-xl border border-gray-200 bg-white/50 px-3 py-1.5 text-sm font-bold transition-all hover:bg-white dark:border-slate-800 dark:bg-slate-900/50 dark:hover:bg-slate-900"
      >
        <Languages size={18} className="text-primary" />
        <span className="hidden sm:inline">{currentLang?.nativeName}</span>
        <ChevronDown size={14} className={cn('transition-transform', isOpen && 'rotate-180')} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop for closing */}
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setIsOpen(false)} 
            />
            
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute right-0 mt-2 w-48 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900 z-50"
            >
              <div className="p-1.5">
                {available.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleSelect(lang.code)}
                    className={cn(
                      'flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm font-bold transition-colors',
                      current === lang.code 
                        ? 'bg-orange-50 text-primary dark:bg-orange-900/20' 
                        : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-slate-800'
                    )}
                  >
                    <span>{lang.nativeName}</span>
                    {current === lang.code && <Check size={16} />}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSwitcher;
