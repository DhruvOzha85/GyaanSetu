import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '../../utils/cn';

const Input = React.forwardRef(({ 
  className, 
  type = 'text', 
  label,
  error,
  icon: Icon,
  ...props 
}, ref) => {
  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
            <Icon size={18} />
          </div>
        )}
        <input
          type={type}
          ref={ref}
          className={cn(
            'flex h-12 w-full rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm transition-all duration-200 placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-900 dark:text-gray-100',
            Icon && 'pl-11',
            error && 'border-error focus:border-error focus:ring-error/10',
            className
          )}
          {...props}
        />
      </div>
      {error && (
        <p className="ml-1 text-xs font-bold text-error animate-fade-in">
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

Input.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.string,
  icon: PropTypes.elementType
};

export default Input;
