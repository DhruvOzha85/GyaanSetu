import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ExternalLink, 
  Calendar, 
  FileText,
  Layout,
  CheckCircle,
  AlertCircle,
  Link as LinkIcon,
  UploadCloud,
  ChevronRight,
  TrendingUp,
  Award
} from 'lucide-react';
import { cn } from '../../utils/cn';
import KanbanBoard from '../../components/ui/KanbanBoard';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { mockAllProjects, mockProjectTasks } from '../public/landing/data/mockData';

const ProjectWorkspace = () => {
  const { projectId } = useParams();
  
  const project = useMemo(() => {
    if (!mockAllProjects || mockAllProjects.length === 0) return null;
    return mockAllProjects.find(p => p.id === parseInt(projectId)) || mockAllProjects[0];
  }, [projectId]);
  
  const [submissionType, setSubmissionType] = useState('link');
  const [submissionValue, setSubmissionValue] = useState('');
  const [checklist, setChecklist] = useState([
    { id: 1, label: 'Completed all required features', checked: true },
    { id: 2, label: 'Documentation updated in README', checked: false },
    { id: 3, label: 'Test cases passing locally', checked: true },
    { id: 4, label: 'Code cleaned and formatted', checked: false }
  ]);

  const toggleCheck = (id) => {
    setChecklist(prev => prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  const activityFeed = [
    { id: 1, user: 'Aman Patel', action: 'moved task', target: 'Initial Project UI Mockups', time: '2 hours ago' },
    { id: 2, user: 'Sonal Verma', action: 'added comment to', target: 'Define API structure', time: '4 hours ago' },
    { id: 3, user: 'System', action: 'updated project brief', target: 'Documentation section', time: '1 day ago' },
  ];

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center p-20 text-center">
        <AlertCircle size={48} className="text-rose-500 mb-4" />
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Project Not Found</h2>
        <p className="text-slate-500 mb-6">The project you are looking for doesn't exist.</p>
        <Link to="/projects">
          <Button variant="primary">Back to Catalog</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-[1600px] mx-auto">
      {/* Top Navigation / Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-8 overflow-x-auto no-scrollbar whitespace-nowrap">
        <Link to="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link>
        <ChevronRight size={12} />
        <Link to="/projects" className="hover:text-primary transition-colors">Projects</Link>
        <ChevronRight size={12} />
        <span className="text-slate-600 dark:text-slate-200">{project.title}</span>
      </nav>

      {/* Workspace Header */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8 mb-12">
        <div className="flex items-start space-x-6">
          <div className="hidden sm:flex w-20 h-20 rounded-[28px] bg-primary/10 items-center justify-center text-primary border border-primary/20 shrink-0">
            <Layout size={36} />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <Badge variant="primary" className="font-black uppercase tracking-[0.2em] text-[10px]">Active Project</Badge>
              <div className="flex items-center text-slate-400 text-[10px] font-black uppercase tracking-widest border-l border-slate-200 dark:border-slate-800 pl-3">
                <Calendar size={12} className="mr-1.5" />
                Due: Oct 25, 2026
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
              {project.title}
            </h1>
            <div className="flex items-center space-x-4">
               <div className="flex -space-x-2">
                  {[1, 2, 3].map(i => (
                    <img key={i} src={`https://i.pravatar.cc/150?u=${i + 10}`} className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900" alt="Team member" />
                  ))}
               </div>
               <span className="text-slate-500 dark:text-slate-400 text-xs font-bold italic tracking-tight">Collaboration workspace</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-800 shadow-sm">
             <ExternalLink size={18} className="mr-2" />
             <span className="text-xs font-black uppercase tracking-widest">Preview</span>
          </Button>
          <Button variant="primary" className="shadow-xl shadow-primary/20 px-8">
             <span className="text-xs font-black uppercase tracking-widest">Actions</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        
        <div className="xl:col-span-8 space-y-8">
          <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-100 dark:border-slate-800 p-8 shadow-sm">
            <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-widest mb-6 flex items-center">
              <FileText size={20} className="mr-3 text-primary" />
              Project Briefing
            </h3>
            <div className="mb-8">
               <p className="text-slate-600 dark:text-slate-400 font-medium text-base leading-relaxed">
                 {project.description}
               </p>
               <h4 className="text-sm font-black text-slate-800 dark:text-white uppercase mt-6 mb-3 tracking-wider">Requirements:</h4>
               <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 list-none p-0 text-slate-500 dark:text-slate-400 font-bold text-sm">
                 <li className="flex items-start">
                    <TrendingUp size={16} className="mr-3 text-emerald-500 shrink-0 mt-0.5" />
                    Responsive UI
                 </li>
                 <li className="flex items-start">
                    <TrendingUp size={16} className="mr-3 text-emerald-500 shrink-0 mt-0.5" />
                    RESTful API
                 </li>
               </ul>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-[40px] border border-slate-100 dark:border-slate-800 p-8 shadow-sm">
            <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-widest mb-8 flex items-center">
              <CheckCircle size={24} className="mr-3 text-emerald-500" />
              Milestone Tracker
            </h3>
            <KanbanBoard initialTasks={mockProjectTasks || []} />
          </div>
        </div>

        <aside className="xl:col-span-4 space-y-8 h-full">
          <div className="bg-primary shadow-2xl shadow-primary/20 rounded-[40px] p-8 text-white relative overflow-hidden group">
            <h3 className="text-lg font-black uppercase tracking-widest mb-6 flex items-center">
              <UploadCloud size={24} className="mr-3" />
              Submission
            </h3>

            <div className="space-y-6 mb-8">
              {checklist.map(item => (
                <button 
                  key={item.id}
                  onClick={() => toggleCheck(item.id)}
                  className="flex items-center w-full group/check"
                >
                  <div className={cn(
                    "w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all shrink-0 mr-4",
                    item.checked ? "bg-white border-white" : "border-white/30 group-hover/check:border-white/60"
                  )}>
                    {item.checked && <CheckCircle size={16} className="text-primary" />}
                  </div>
                  <span className={cn(
                    "text-sm font-black tracking-tight text-left transition-colors",
                    item.checked ? "text-white opacity-100" : "text-white/60 group-hover/check:text-white"
                  )}>
                    {item.label}
                  </span>
                </button>
              ))}
            </div>

            <Button 
               className="w-full h-14 bg-white text-primary hover:bg-slate-50 border-0 shadow-lg font-black uppercase tracking-widest text-sm"
               isDisabled={checklist.some(c => !c.checked)}
            >
              Finish & Send
            </Button>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-100 dark:border-slate-800 p-8 shadow-sm">
            <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-widest mb-6 flex items-center justify-between">
               Activity
               <TrendingUp size={16} className="text-primary" />
            </h3>
            <div className="space-y-6">
              {activityFeed.map((activity, i) => (
                <div key={i} className="relative pl-6 border-l-2 border-slate-50 dark:border-slate-800 pb-2">
                   <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-white dark:bg-slate-900 border-2 border-primary flex items-center justify-center" />
                   <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1">
                      <span className="font-black text-slate-900 dark:text-white">{activity.user}</span> {activity.action}
                   </div>
                   <div className="text-xs font-black text-slate-800 dark:text-slate-200 mb-2 truncate">
                      {activity.target}
                   </div>
                </div>
              ))}
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
};

export default ProjectWorkspace;
