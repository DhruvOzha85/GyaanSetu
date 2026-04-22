import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

const Button = React.forwardRef(({ 
  className, 
  variant = 'primary', 
  size = 'md', 
  isLoading = false,
  isDisabled = false,
  icon: Icon,
  children,
  'aria-label': ariaLabel,
  ...props 
}, ref) => {
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-hover shadow-orange-200 dark:shadow-none',
    secondary: 'bg-secondary text-white hover:bg-teal-700 shadow-teal-200 dark:shadow-none',
    outline: 'border-2 border-primary text-primary hover:bg-orange-50 dark:hover:bg-orange-900/20',
    ghost: 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-slate-800',
    danger: 'bg-error text-white hover:bg-red-700 shadow-red-200'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-2.5 text-base',
    lg: 'px-8 py-3.5 text-lg'
  };

  // Accessibility check for icon-only buttons
  const finalAriaLabel = ariaLabel || (typeof children === 'string' ? children : undefined);

  return (
    <motion.button
      ref={ref}
      disabled={isDisabled || isLoading}
      whileHover={!isDisabled && !isLoading ? { scale: 1.02, y: -1 } : {}}
      whileTap={!isDisabled && !isLoading ? { scale: 0.98 } : {}}
      aria-label={finalAriaLabel}
      aria-busy={isLoading}
      className={cn(
        'inline-flex items-center justify-center rounded-xl font-bold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:shadow-inner',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {isLoading ? (
        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : Icon && (
        <Icon className={cn('mr-2 h-5 w-5', children ? 'block' : 'mr-0')} aria-hidden="true" />
      )}
      {children}
    </motion.button>
  );
});

Button.displayName = 'Button';

Button.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'ghost', 'danger']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  isLoading: PropTypes.bool,
  isDisabled: PropTypes.bool,
  icon: PropTypes.elementType,
  children: PropTypes.node,
  'aria-label': PropTypes.string
};

export default Button;
