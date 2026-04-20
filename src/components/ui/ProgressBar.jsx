import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '../../utils/cn';

const ProgressBar = ({ 
  progress, 
  className, 
  trackClassName,
  showLabel = false,
  size = 'md',
  color = 'primary'
}) => {
  const safeProgress = Math.min(Math.max(progress || 0, 0), 100);

  const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  const colorClasses = {
    primary: 'bg-primary',
    teal: 'bg-teal-500',
    orange: 'bg-orange-500',
    success: 'bg-emerald-500',
    rose: 'bg-rose-500',
  };

  return (
    <div className={cn("w-full", className)}>
      {showLabel && (
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-xs font-black text-slate-500 uppercase tracking-widest">Progress</span>
          <span className="text-sm font-black text-slate-800 dark:text-white">{Math.round(safeProgress)}%</span>
        </div>
      )}
      <div 
        className={cn(
          "w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden",
          sizeClasses[size],
          trackClassName
        )}
      >
        <div 
          className={cn(
            "h-full rounded-full transition-all duration-500 ease-out",
            colorClasses[color]
          )}
          style={{ width: `${safeProgress}%` }}
        />
      </div>
    </div>
  );
};

ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
  className: PropTypes.string,
  trackClassName: PropTypes.string,
  showLabel: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  color: PropTypes.oneOf(['primary', 'teal', 'orange', 'success', 'rose']),
};

export default ProgressBar;
