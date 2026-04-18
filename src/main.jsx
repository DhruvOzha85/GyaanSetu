/**
 * GyaanSetu — Application Entry Point
 *
 * Wraps the App with all necessary providers:
 * - Redux store (state management)
 * - MUI ThemeProvider (Material UI theming)
 * - HelmetProvider (SEO <head> management)
 * - BrowserRouter (client-side routing)
 * - i18n (internationalization — initialized on import)
 * - Toaster (toast notifications)
 */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import App from './App.jsx';
import { store } from './store/store.js';
import createMuiTheme from './theme/muiTheme.js';
import './i18n/index.js';
import './index.css';

// Create the initial theme (will be recreated dynamically on theme toggle in App)
const theme = createMuiTheme('light');

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <App />
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  fontFamily: '"Inter", sans-serif',
                  fontSize: '14px',
                  borderRadius: '8px',
                  padding: '12px 16px',
                },
                success: {
                  iconTheme: {
                    primary: '#10B981',
                    secondary: '#FFFFFF',
                  },
                },
                error: {
                  iconTheme: {
                    primary: '#EF4444',
                    secondary: '#FFFFFF',
                  },
                },
              }}
            />
          </BrowserRouter>
        </ThemeProvider>
      </HelmetProvider>
    </Provider>
  </StrictMode>
);
