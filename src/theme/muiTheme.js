import { createTheme } from '@mui/material/styles';
import colors from './colors';

/**
 * Creates the MUI theme for GyaanSetu.
 * Accepts 'light' or 'dark' mode and returns a fully configured MUI theme
 * that matches the GyaanSetu design system.
 */
const createMuiTheme = (mode = 'light') => {
  const isDark = mode === 'dark';

  return createTheme({
    palette: {
      mode,
      primary: {
        main: colors.primary,
        light: '#FB923C',
        dark: '#EA6C0A',
        contrastText: '#FFFFFF',
      },
      secondary: {
        main: colors.secondary,
        light: '#14B8A6',
        dark: '#0F766E',
        contrastText: '#FFFFFF',
      },
      error: {
        main: colors.error,
        light: '#F87171',
        dark: '#DC2626',
      },
      warning: {
        main: colors.warning,
        light: '#FBBF24',
        dark: '#D97706',
      },
      success: {
        main: colors.success,
        light: '#34D399',
        dark: '#059669',
      },
      info: {
        main: colors.info,
        light: '#14B8A6',
        dark: '#0F766E',
      },
      background: {
        default: isDark ? colors.dark.bg.primary : colors.bg.primary,
        paper: isDark ? colors.dark.bg.secondary : colors.bg.primary,
      },
      text: {
        primary: isDark ? colors.dark.text.primary : colors.text.heading,
        secondary: isDark ? colors.dark.text.secondary : colors.text.body,
      },
      divider: isDark ? colors.dark.border : colors.border.light,
    },

    typography: {
      fontFamily: '"Inter", "Plus Jakarta Sans", "Helvetica Neue", Arial, sans-serif',
      h1: {
        fontFamily: '"Plus Jakarta Sans", "Inter", sans-serif',
        fontWeight: 800,
        fontSize: '3rem',
        lineHeight: 1.1,
        letterSpacing: '-0.02em',
      },
      h2: {
        fontFamily: '"Plus Jakarta Sans", "Inter", sans-serif',
        fontWeight: 700,
        fontSize: '2.25rem',
        lineHeight: 1.2,
        letterSpacing: '-0.01em',
      },
      h3: {
        fontFamily: '"Plus Jakarta Sans", "Inter", sans-serif',
        fontWeight: 700,
        fontSize: '1.75rem',
        lineHeight: 1.3,
      },
      h4: {
        fontFamily: '"Plus Jakarta Sans", "Inter", sans-serif',
        fontWeight: 600,
        fontSize: '1.5rem',
        lineHeight: 1.35,
      },
      h5: {
        fontFamily: '"Plus Jakarta Sans", "Inter", sans-serif',
        fontWeight: 600,
        fontSize: '1.25rem',
        lineHeight: 1.4,
      },
      h6: {
        fontFamily: '"Plus Jakarta Sans", "Inter", sans-serif',
        fontWeight: 600,
        fontSize: '1rem',
        lineHeight: 1.45,
      },
      subtitle1: {
        fontFamily: '"Inter", sans-serif',
        fontWeight: 500,
        fontSize: '1rem',
        lineHeight: 1.5,
      },
      subtitle2: {
        fontFamily: '"Inter", sans-serif',
        fontWeight: 500,
        fontSize: '0.875rem',
        lineHeight: 1.5,
      },
      body1: {
        fontFamily: '"Inter", sans-serif',
        fontWeight: 400,
        fontSize: '1rem',
        lineHeight: 1.6,
      },
      body2: {
        fontFamily: '"Inter", sans-serif',
        fontWeight: 400,
        fontSize: '0.875rem',
        lineHeight: 1.6,
      },
      caption: {
        fontFamily: '"Inter", sans-serif',
        fontWeight: 400,
        fontSize: '0.75rem',
        lineHeight: 1.5,
      },
      button: {
        fontFamily: '"Inter", sans-serif',
        fontWeight: 600,
        fontSize: '0.875rem',
        textTransform: 'none',
        letterSpacing: '0.01em',
      },
      overline: {
        fontFamily: '"Inter", sans-serif',
        fontWeight: 600,
        fontSize: '0.75rem',
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
      },
    },

    shape: {
      borderRadius: 8,
    },

    shadows: [
      'none',
      colors.shadows.sm,
      colors.shadows.sm,
      colors.shadows.md,
      colors.shadows.md,
      colors.shadows.md,
      colors.shadows.lg,
      colors.shadows.lg,
      colors.shadows.lg,
      colors.shadows.lg,
      colors.shadows.xl,
      colors.shadows.xl,
      colors.shadows.xl,
      colors.shadows.xl,
      colors.shadows.xl,
      colors.shadows.xl,
      colors.shadows.xl,
      colors.shadows.xl,
      colors.shadows.xl,
      colors.shadows.xl,
      colors.shadows.xl,
      colors.shadows.xl,
      colors.shadows.xl,
      colors.shadows.xl,
      colors.shadows.xl,
    ],

    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '8px',
            textTransform: 'none',
            fontWeight: 600,
            boxShadow: 'none',
            '&:hover': {
              boxShadow: 'none',
            },
          },
          containedPrimary: {
            backgroundColor: colors.primary,
            '&:hover': {
              backgroundColor: colors.hover.primary,
            },
          },
          containedSecondary: {
            backgroundColor: colors.secondary,
            '&:hover': {
              backgroundColor: colors.hover.secondary,
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: '12px',
            boxShadow: colors.shadows.md,
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: colors.primary,
                borderWidth: '2px',
              },
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: '9999px',
            fontWeight: 500,
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            borderRadius: '16px',
          },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            borderRadius: '8px',
            fontSize: '0.75rem',
            fontWeight: 500,
          },
        },
      },
      MuiSwitch: {
        styleOverrides: {
          switchBase: {
            '&.Mui-checked': {
              color: colors.primary,
              '& + .MuiSwitch-track': {
                backgroundColor: colors.primary,
              },
            },
          },
        },
      },
    },
  });
};

export default createMuiTheme;
