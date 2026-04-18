/**
 * GyaanSetu Design System — Color Tokens
 * All colors used throughout the application are defined here.
 *
 * ❌ FORBIDDEN COLORS: Dark Blue, Navy Blue, Purple, Indigo, Violet
 */

// ─── Brand Colors ───────────────────────────────────────────────────
export const PRIMARY = '#F97316'; // Saffron Orange
export const SECONDARY = '#0D9488'; // Teal Green
export const ACCENT = '#F59E0B'; // Amber Yellow

// ─── Semantic Colors ────────────────────────────────────────────────
export const ERROR = '#EF4444'; // Coral Red
export const SUCCESS = '#10B981'; // Emerald Green
export const WARNING = '#F59E0B'; // Amber Yellow (same as accent)
export const INFO = '#0D9488'; // Teal Green (same as secondary)

// ─── Background Colors ─────────────────────────────────────────────
export const BG_PRIMARY = '#FFFFFF';
export const BG_SECONDARY = '#F9FAFB';
export const BG_CARD = '#F3F4F6';

// ─── Text Colors ────────────────────────────────────────────────────
export const TEXT_HEADING = '#111827'; // Charcoal
export const TEXT_BODY = '#374151'; // Dark Gray
export const TEXT_PLACEHOLDER = '#9CA3AF'; // Mid Gray
export const TEXT_LIGHT = '#6B7280'; // Gray 500
export const TEXT_WHITE = '#FFFFFF';

// ─── Border Colors ──────────────────────────────────────────────────
export const BORDER_LIGHT = '#E5E7EB';
export const BORDER_DEFAULT = '#D1D5DB';
export const BORDER_DARK = '#9CA3AF';

// ─── Gradients ──────────────────────────────────────────────────────
export const GRADIENT_PRIMARY = 'linear-gradient(135deg, #F97316 0%, #0D9488 100%)';
export const GRADIENT_SECONDARY = 'linear-gradient(135deg, #F59E0B 0%, #F97316 100%)';
export const GRADIENT_HERO = 'linear-gradient(135deg, #F97316 0%, #0D9488 100%)';

// ─── Dark Mode Colors ──────────────────────────────────────────────
export const DARK_BG_PRIMARY = '#0F172A';
export const DARK_BG_SECONDARY = '#1E293B';
export const DARK_BG_CARD = '#334155';
export const DARK_TEXT_PRIMARY = '#F1F5F9';
export const DARK_TEXT_SECONDARY = '#CBD5E1';
export const DARK_BORDER = '#475569';

// ─── Hover States ───────────────────────────────────────────────────
export const PRIMARY_HOVER = '#EA6C0A';
export const SECONDARY_HOVER = '#0F766E';
export const ERROR_HOVER = '#DC2626';
export const SUCCESS_HOVER = '#059669';

// ─── Difficulty Colors ──────────────────────────────────────────────
export const DIFFICULTY = {
  beginner: { bg: '#D1FAE5', text: '#065F46' },
  intermediate: { bg: '#FEF3C7', text: '#92400E' },
  advanced: { bg: '#FEE2E2', text: '#991B1B' },
};

// ─── Shadows ────────────────────────────────────────────────────────
export const SHADOWS = {
  sm: '0px 1px 3px rgba(0, 0, 0, 0.08)',
  md: '0px 4px 16px rgba(0, 0, 0, 0.10)',
  lg: '0px 8px 32px rgba(0, 0, 0, 0.14)',
  xl: '0px 16px 48px rgba(0, 0, 0, 0.18)',
};

// ─── Border Radius ──────────────────────────────────────────────────
export const RADIUS = {
  button: '8px',
  card: '12px',
  modal: '16px',
  pill: '9999px',
  input: '8px',
};

// ─── Full Palette (for MUI theme & export) ──────────────────────────
const colors = {
  primary: PRIMARY,
  secondary: SECONDARY,
  accent: ACCENT,
  error: ERROR,
  success: SUCCESS,
  warning: WARNING,
  info: INFO,
  bg: {
    primary: BG_PRIMARY,
    secondary: BG_SECONDARY,
    card: BG_CARD,
  },
  text: {
    heading: TEXT_HEADING,
    body: TEXT_BODY,
    placeholder: TEXT_PLACEHOLDER,
    light: TEXT_LIGHT,
    white: TEXT_WHITE,
  },
  border: {
    light: BORDER_LIGHT,
    default: BORDER_DEFAULT,
    dark: BORDER_DARK,
  },
  gradient: {
    primary: GRADIENT_PRIMARY,
    secondary: GRADIENT_SECONDARY,
    hero: GRADIENT_HERO,
  },
  dark: {
    bg: {
      primary: DARK_BG_PRIMARY,
      secondary: DARK_BG_SECONDARY,
      card: DARK_BG_CARD,
    },
    text: {
      primary: DARK_TEXT_PRIMARY,
      secondary: DARK_TEXT_SECONDARY,
    },
    border: DARK_BORDER,
  },
  hover: {
    primary: PRIMARY_HOVER,
    secondary: SECONDARY_HOVER,
    error: ERROR_HOVER,
    success: SUCCESS_HOVER,
  },
  difficulty: DIFFICULTY,
  shadows: SHADOWS,
  radius: RADIUS,
};

export default colors;
