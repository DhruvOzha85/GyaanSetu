import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  LayoutGrid, 
  List,
  FilterX,
  ChevronDown,
  Sparkles
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import ProjectCard from '../../components/ui/ProjectCard';
import { mockAllProjects } from '../public/landing/data/mockData';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

const ProjectCatalog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');

  const industries = ['All', 'Finance', 'Energy', 'Healthcare', 'Logistics', 'Retail'];
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredProjects = useMemo(() => {
    return mockAllProjects.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          project.tech.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesIndustry = selectedIndustry === 'All' || project.industry === selectedIndustry;
      const matchesDifficulty = selectedDifficulty === 'All' || project.difficulty === selectedDifficulty;
      return matchesSearch && matchesIndustry && matchesDifficulty;
    });
  }, [searchQuery, selectedIndustry, selectedDifficulty]);

  return (
    <div className="p-4 md:p-8 max-w-[1600px] mx-auto animate-in fade-in duration-700 relative z-0">
      <Helmet>
        <title>Project Catalog — GyaanSetu</title>
      </Helmet>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="max-w-2xl">
          <div className="flex items-center space-x-2 text-primary mb-3">
            <Sparkles size={18} />
            <span className="text-xs font-black uppercase tracking-[0.2em]">Industry Experience</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
            Real-World <span className="text-primary italic">Projects</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-lg leading-relaxed">
            Move beyond tutorials. Build production-grade applications used in industry and gain practical experience.
          </p>
        </div>
        
        <div className="flex items-center space-x-3 bg-slate-50 dark:bg-slate-800/50 p-1.5 rounded-2xl border border-slate-100 dark:border-slate-800">
          <Button variant="ghost" size="sm" className="bg-white dark:bg-slate-800 shadow-sm text-primary">
            <LayoutGrid size={18} />
          </Button>
          <Button variant="ghost" size="sm" className="text-slate-400 dark:text-slate-500">
            <List size={18} />
          </Button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="sticky top-6 z-40 flex flex-col lg:flex-row gap-4 mb-10 p-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-100 dark:border-slate-800 rounded-[32px] shadow-sm">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text"
            placeholder="Search projects or tech stack..."
            className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800/50 border-0 rounded-[22px] focus:ring-2 focus:ring-primary/20 text-slate-900 dark:text-white font-bold transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <select 
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="appearance-none pl-6 pr-12 py-4 bg-slate-50 dark:bg-slate-800/50 border-0 rounded-[22px] text-slate-700 dark:text-slate-300 font-black uppercase tracking-widest text-[10px] focus:ring-2 focus:ring-primary/20 cursor-pointer min-w-[160px]"
            >
              {industries.map(ind => <option key={ind} value={ind}>{ind} Industry</option>)}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
          </div>

          <div className="relative">
            <select 
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="appearance-none pl-6 pr-12 py-4 bg-slate-50 dark:bg-slate-800/50 border-0 rounded-[22px] text-slate-700 dark:text-slate-300 font-black uppercase tracking-widest text-[10px] focus:ring-2 focus:ring-primary/20 cursor-pointer min-w-[160px]"
            >
              {difficulties.map(diff => <option key={diff} value={diff}>{diff} Level</option>)}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
          </div>

          <Button 
            variant="ghost" 
            onClick={() => { setSearchQuery(''); setSelectedIndustry('All'); setSelectedDifficulty('All'); }}
            className="px-6 py-4 rounded-[22px] hover:bg-rose-50 dark:hover:bg-rose-950/30 text-slate-400 hover:text-rose-500 transition-all font-black uppercase tracking-widest text-[10px]"
          >
            <FilterX size={18} className="mr-2" />
            Clear
          </Button>
        </div>
      </div>

      {/* Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
          {filteredProjects.map((project, idx) => (
            <div key={project.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${idx * 100}ms` }}>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      ) : (
        <div className="py-32 flex flex-col items-center justify-center text-center max-w-sm mx-auto">
          <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-300 dark:text-slate-700 mb-6">
            <Filter size={40} />
          </div>
          <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight mb-2">No projects found</h3>
          <p className="text-slate-500 font-medium italic">
            Try adjusting your search or filters to see more results.
          </p>
        </div>
      )}
    </div>
  );
};

export default ProjectCatalog;
