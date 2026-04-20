import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useTheme from '../../hooks/useTheme';
import Button from './Button';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="sm"
      className="p-2 rounded-full w-10 h-10 overflow-hidden"
      onClick={toggleTheme}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={isDark ? 'dark' : 'light'}
          initial={{ y: 20, rotate: 45, opacity: 0 }}
          animate={{ y: 0, rotate: 0, opacity: 1 }}
          exit={{ y: -20, rotate: -45, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {isDark ? (
            <Sun className="text-amber-400" size={20} />
          ) : (
            <Moon className="text-slate-600" size={20} />
          )}
        </motion.div>
      </AnimatePresence>
    </Button>
  );
};

export default ThemeToggle;
