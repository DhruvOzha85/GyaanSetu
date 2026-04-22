import React from 'react';
import PropTypes from 'prop-types';
import { Star, Clock, BookOpen, User, ChevronRight } from 'lucide-react';
import { cn } from '../../utils/cn';
import Card from './Card';
import Badge from './Badge';
import ProgressBar from './ProgressBar';

const CourseCard = React.memo(({ course, className, variant = 'catalog' }) => {
  // Ultra-defensive check
  if (!course) return null;

  if (variant === 'resume') {
    return (
      <Card 
        className={cn('group flex flex-col p-6 border border-slate-100 dark:border-slate-800 hover:border-primary/20 transition-all', className)} 
        hoverable
      >
        <div className="flex gap-6">
          <div className="w-40 h-24 rounded-2xl overflow-hidden relative flex-shrink-0">
             <img 
               src={course.image || ''} 
               alt={course.title || 'Course'} 
               className="w-full h-full object-cover" 
               loading="lazy"
             />
             <div className="absolute top-2 left-2 flex flex-col gap-1">
                <Badge variant="primary" className="text-[8px] px-1.5 py-0">{course.language || 'English'}</Badge>
                <Badge variant="secondary" className="text-[8px] px-1.5 py-0">{course.level || 'Beginner'}</Badge>
             </div>
          </div>
          
          <div className="flex-grow flex flex-col min-w-0">
             <div className="flex justify-between items-start mb-1">
                <h3 className="text-sm font-black text-slate-900 dark:text-white truncate pr-4">{course.title || 'Untitled Course'}</h3>
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">
                   {course.progress || 0}% Done
                </span>
             </div>
             <p className="text-[10px] font-bold text-slate-500 mb-4">{course.instructor || 'Unknown'}</p>
             
             <div className="mt-auto space-y-2">
                <div className="flex justify-between text-[9px] font-black text-slate-400 uppercase tracking-widest">
                   <span>{course.completedLessons || 0} / {course.totalLessons || 40} Lessons</span>
                   <span>Last accessed {course.lastAccessed || 'N/A'}</span>
                </div>
                <ProgressBar progress={course.progress || 0} size="md" color="primary" />
             </div>
          </div>
        </div>
        
        <div className="mt-6 flex items-center justify-between">
           <button className="flex items-center gap-2 text-xs font-black text-primary hover:gap-3 transition-all uppercase tracking-widest">
              Continue Learning <ChevronRight size={16} />
           </button>
           {course.progress === 100 && (
              <Badge variant="success" className="text-[9px]">COMPLETED</Badge>
           )}
        </div>
      </Card>
    );
  }

  return (
    <Card 
      className={cn('group flex flex-col p-0 overflow-hidden', className)} 
      hoverable
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={course.image || ''} 
          alt={course.title || 'Course thumbnail'} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {course.isPopular && (
            <Badge variant="primary" className="shadow-lg">Popular</Badge>
          )}
          <Badge variant="secondary" className="shadow-lg">{course.language || 'English'}</Badge>
        </div>
        <div className="absolute bottom-3 right-3">
          <Badge variant="info" className="bg-slate-900/80 text-white border-none backdrop-blur-md">
            {course.level || 'Beginner'}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-primary">
            {course.category || 'Technology'}
          </span>
          <div className="flex items-center space-x-1 text-amber-500">
            <Star size={12} fill="currentColor" />
            <span className="text-xs font-black">{course.rating || '4.5'}</span>
          </div>
        </div>

        <h3 className="text-lg font-black text-slate-900 dark:text-white mb-3 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
          {course.title || 'Untitled Course'}
        </h3>

        <div className="flex items-center space-x-4 mb-6 text-slate-500 dark:text-slate-400">
          <div className="flex items-center space-x-1.5">
            <Clock size={14} />
            <span className="text-xs font-bold">{course.duration || '8 weeks'}</span>
          </div>
          <div className="flex items-center space-x-1.5">
             {/* Replaced FlaskConical with BookOpen for higher compatibility */}
            <BookOpen size={14} />
            <span className="text-xs font-bold">{course.labs || 10} Labs</span>
          </div>
        </div>

        <div className="mt-auto pt-4 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
              <User size={12} className="text-slate-400" />
            </div>
            <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
              {course.instructor || 'GyaanSetu Instructor'}
            </span>
          </div>
          
          <div className="flex flex-col items-end">
            <span className="text-sm font-black text-slate-900 dark:text-white">
              ₹{course.price || 'Free'}
            </span>
            {course.originalPrice && (
              <span className="text-[10px] text-slate-400 line-through">
                ₹{course.originalPrice}
              </span>
            )}
          </div>
        </div>

        {/* Hover Action Overlay */}
        <div className="mt-4 overflow-hidden h-0 group-hover:h-10 transition-all duration-300">
          <div className="w-full h-full bg-slate-900 dark:bg-primary text-white text-xs font-black rounded-xl flex items-center justify-center space-x-2">
            <span>VIEW DETAILS</span>
            <ChevronRight size={14} />
          </div>
        </div>
      </div>
    </Card>
  );
});

CourseCard.displayName = 'CourseCard';

CourseCard.propTypes = {
  course: PropTypes.object.isRequired,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['catalog', 'resume'])
};

export default CourseCard;
