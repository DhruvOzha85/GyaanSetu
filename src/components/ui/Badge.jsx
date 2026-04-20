import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '../../utils/cn';

const Badge = ({ 
  className, 
  variant = 'info', 
  children, 
  ...props 
}) => {
  const variants = {
    info: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
    success: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400',
    warning: 'bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400',
    error: 'bg-rose-50 text-rose-600 dark:bg-rose-900/20 dark:text-rose-400',
    primary: 'bg-orange-50 text-primary dark:bg-orange-900/20 dark:text-primary',
    secondary: 'bg-teal-50 text-secondary dark:bg-teal-900/20 dark:text-secondary'
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold ring-1 ring-inset ring-transparent transition-colors',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

Badge.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf(['info', 'success', 'warning', 'error', 'primary', 'secondary']),
  children: PropTypes.node.isRequired
};

export default Badge;
