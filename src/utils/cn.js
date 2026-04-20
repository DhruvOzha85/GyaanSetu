import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * cn - Utility to merge Tailwind classes cleanly without conflicts.
 * Uses clsx for conditional classes and tailwind-merge to handle overrides.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default cn;
