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
import { useSelector } from 'react-redux';

const App = () => {
  const { isDark } = useTheme();
  const { fontSize, reducedMotion, highContrast } = useSelector((state) => state.ui);

  useEffect(() => {
    // Sync theme class
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Apply Font Size scaling
    const fontSizeMap = {
      1: '0.875rem', // Small
      2: '1rem',     // Normal
      3: '1.125rem', // Large
      4: '1.25rem',  // XL
    };
    document.documentElement.style.setProperty('--font-size-base', fontSizeMap[fontSize] || '1rem');

    // Apply Reduced Motion
    if (reducedMotion) {
      document.documentElement.classList.add('reduce-motion');
    } else {
      document.documentElement.classList.remove('reduce-motion');
    }

    // Apply High Contrast
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  }, [isDark, fontSize, reducedMotion, highContrast]);

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
