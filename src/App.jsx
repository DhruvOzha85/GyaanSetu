import React, { useEffect } from 'react';
import AppRouter from './routes/index.jsx';
import useTheme from './hooks/useTheme';
import { Toaster } from 'react-hot-toast';

/**
 * GyaanSetu — Root App Component
 * 
 * Handles:
 * - Dynamic theme class synchronization
 * - Toast notifications layer
 * - Main routing entry point
 */
const App = () => {
  const { isDark } = useTheme();

  useEffect(() => {
    // Sync theme class with document root for Tailwind dark mode
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div className="min-h-screen bg-background-primary transition-colors duration-300">
      <AppRouter />
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            borderRadius: '8px',
            background: isDark ? '#1E293B' : '#FFFFFF',
            color: isDark ? '#F1F5F9' : '#374151',
          },
        }}
      />
    </div>
  );
};

export default App;
