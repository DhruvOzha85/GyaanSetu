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
import { ThemeProvider, CssBaseline } from '@mui/material';
import createMuiTheme from './theme/muiTheme';

const App = () => {
  const { isDark } = useTheme();
  const { fontSize, reducedMotion, highContrast } = useSelector((state) => state.ui);

  // Memoize theme to avoid unnecessary re-renders
  const muiTheme = React.useMemo(() => createMuiTheme(isDark ? 'dark' : 'light'), [isDark]);

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
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
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
    </ThemeProvider>
  );
};

export default App;
