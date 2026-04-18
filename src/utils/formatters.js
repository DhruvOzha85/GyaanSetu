/**
 * GyaanSetu — Formatting Utilities
 */
import { format, formatDistanceToNow, isValid, parseISO } from 'date-fns';

/**
 * Format a date to a readable string.
 * @param {string|Date} date
 * @param {string} pattern - date-fns format pattern (default: 'MMM dd, yyyy')
 * @returns {string}
 */
export const formatDate = (date, pattern = 'MMM dd, yyyy') => {
  try {
    const d = typeof date === 'string' ? parseISO(date) : date;
    if (!isValid(d)) return '—';
    return format(d, pattern);
  } catch {
    return '—';
  }
};

/**
 * Format a date as relative time (e.g., "2 days ago").
 * @param {string|Date} date
 * @returns {string}
 */
export const formatRelativeTime = (date) => {
  try {
    const d = typeof date === 'string' ? parseISO(date) : date;
    if (!isValid(d)) return '—';
    return formatDistanceToNow(d, { addSuffix: true });
  } catch {
    return '—';
  }
};

/**
 * Format a number as Indian Rupees.
 * @param {number} amount
 * @param {boolean} showFree - if amount is 0, show "Free" instead of "₹0"
 * @returns {string}
 */
export const formatCurrency = (amount, showFree = true) => {
  if (amount === 0 && showFree) return 'Free';
  if (amount === null || amount === undefined) return 'Custom';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Format duration in minutes to readable format.
 * @param {number} minutes
 * @returns {string}
 */
export const formatDuration = (minutes) => {
  if (!minutes || minutes <= 0) return '—';
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}m`;
};

/**
 * Truncate text to a max length with ellipsis.
 * @param {string} text
 * @param {number} maxLength
 * @returns {string}
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

/**
 * Format a large number to compact form (e.g., 10000 → "10K").
 * @param {number} num
 * @returns {string}
 */
export const formatNumber = (num) => {
  if (num === null || num === undefined) return '0';
  if (num < 1000) return num.toString();
  if (num < 100000) return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  if (num < 10000000) return (num / 100000).toFixed(1).replace(/\.0$/, '') + 'L';
  return (num / 10000000).toFixed(1).replace(/\.0$/, '') + 'Cr';
};

/**
 * Get initials from a full name (e.g., "Dhruv Ojha" → "DO").
 * @param {string} name
 * @returns {string}
 */
export const getInitials = (name) => {
  if (!name) return '?';
  return name
    .split(' ')
    .filter(Boolean)
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

/**
 * Format percentage (0-100).
 * @param {number} value
 * @param {number} total
 * @returns {string}
 */
export const formatPercentage = (value, total) => {
  if (!total || total === 0) return '0%';
  return Math.round((value / total) * 100) + '%';
};
