import React from 'react';
import { 
  Users, 
  Clock, 
  BarChart, 
  ArrowRight,
  Code2,
  Globe
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';
import Button from './Button';
import Badge from './Badge';

const ProjectCard = React.memo(({ project, className }) => {
  const {
    id,
    title,
    industry,
    tech = [],
    difficulty = 'Intermediate',
    teamSize = 1,
    status = 'Open',
    image,
    description = "Build a real-world enterprise application focusing on scalable architecture and modern practices."
  } = project;

  const statusColors = {
    'Open': 'bg-teal-500/10 text-teal-600',
    'In Progress': 'bg-amber-500/10 text-amber-600',
    'Completed': 'bg-emerald-500/10 text-emerald-600',
    'Review': 'bg-blue-500/10 text-blue-600'
  };

  const difficultyColors = {
    'Beginner': 'bg-emerald-500/10 text-emerald-600',
    'Intermediate': 'bg-primary/10 text-primary',
    'Advanced': 'bg-rose-500/10 text-rose-600'
  };

  return (
    <div className={cn(
      "group bg-white dark:bg-slate-900 rounded-[32px] border border-slate-100 dark:border-slate-800 overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 flex flex-col h-full",
      className
    )}>
      {/* Image Header */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Badges on Top */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          <Badge className={cn("backdrop-blur-md border-0 text-white font-black uppercase tracking-widest text-[10px] bg-black/40")}>
            {industry}
          </Badge>
          <Badge className={cn("backdrop-blur-md border-0 font-black uppercase tracking-widest text-[10px]", statusColors[status])}>
            {status}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-3">
          <Badge variant="outline" className={cn("font-black uppercase tracking-widest text-[10px]", difficultyColors[difficulty])}>
            {difficulty}
          </Badge>
          <div className="flex items-center text-slate-400 text-[10px] font-black uppercase tracking-widest">
            <Users size={12} className="mr-1.5" />
            {teamSize === 1 ? 'Solo' : `Team of ${teamSize}`}
          </div>
        </div>

        <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight leading-tight mb-3 line-clamp-1">
          {title}
        </h3>
        
        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium line-clamp-2 mb-6">
          {description}
        </p>

        {/* Tech Stack Chips */}
        <div className="flex flex-wrap gap-2 mb-auto pb-6">
          {tech.slice(0, 3).map((item, idx) => (
            <span 
              key={idx} 
              className="px-2.5 py-1 bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 rounded-lg text-[10px] font-black uppercase tracking-wider"
            >
              {item}
            </span>
          ))}
          {tech.length > 3 && (
            <span className="px-2.5 py-1 text-slate-300 text-[10px] font-black uppercase tracking-wider">
              +{tech.length - 3} more
            </span>
          )}
        </div>

        {/* Footer Action */}
        <div className="pt-4 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between mt-auto">
          <Link to={`/projects/${id}`} className="w-full">
            <Button className="w-full justify-between items-center group-hover:bg-primary group-hover:text-white transition-all">
              <span className="text-xs font-black uppercase tracking-widest">View Project</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
});

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;
