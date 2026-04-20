import React from 'react';
import PropTypes from 'prop-types';
import { Star, Clock, FlaskConical, User, ChevronRight } from 'lucide-react';
import { cn } from '../../utils/cn';
import Card from './Card';
import Badge from './Badge';

const CourseCard = ({ course, className }) => {
  return (
    <Card 
      className={cn('group flex flex-col p-0 overflow-hidden', className)} 
      hoverable
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={course.image} 
          alt={course.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {course.isPopular && (
            <Badge variant="primary" className="shadow-lg">Popular</Badge>
          )}
          <Badge variant="secondary" className="shadow-lg">{course.language}</Badge>
        </div>
        <div className="absolute bottom-3 right-3">
          <Badge variant="info" className="bg-slate-900/80 text-white border-none backdrop-blur-md">
            {course.level}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-primary">
            {course.category}
          </span>
          <div className="flex items-center space-x-1 text-amber-500">
            <Star size={12} fill="currentColor" />
            <span className="text-xs font-black">{course.rating}</span>
          </div>
        </div>

        <h3 className="text-lg font-black text-slate-900 dark:text-white mb-3 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
          {course.title}
        </h3>

        <div className="flex items-center space-x-4 mb-6 text-slate-500 dark:text-slate-400">
          <div className="flex items-center space-x-1.5">
            <Clock size={14} />
            <span className="text-xs font-bold">{course.duration}</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <FlaskConical size={14} />
            <span className="text-xs font-bold">{course.labs} Labs</span>
          </div>
        </div>

        <div className="mt-auto pt-4 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
              <User size={12} className="text-slate-400" />
            </div>
            <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
              {course.instructor}
            </span>
          </div>
          
          <div className="flex flex-col items-end">
            <span className="text-sm font-black text-slate-900 dark:text-white">
              ₹{course.price}
            </span>
            <span className="text-[10px] text-slate-400 line-through">
              ₹{course.originalPrice}
            </span>
          </div>
        </div>

        {/* Hover Action Overlay */}
        <div className="mt-4 overflow-hidden h-0 group-hover:h-10 transition-all duration-300">
          <button className="w-full h-full bg-slate-900 dark:bg-primary text-white text-xs font-black rounded-xl flex items-center justify-center space-x-2">
            <span>VIEW DETAILS</span>
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </Card>
  );
};

CourseCard.propTypes = {
  course: PropTypes.object.isRequired,
  className: PropTypes.string
};

export default CourseCard;
