import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  FlaskConical, 
  Briefcase, 
  Star, 
  ChevronRight,
  Zap
} from 'lucide-react';

// Components
import DashboardStatCard from './components/DashboardStatCard';
import StreakBadge from './components/StreakBadge';
import XPChip from './components/XPChip';
import LeaderboardPreview from './components/LeaderboardPreview';
import AnnouncementsPanel from './components/AnnouncementsPanel';
import CourseCard from '../../components/ui/CourseCard';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

// Mock Data
import { 
  mockEnrolledCourses, 
  mockRecommendedLabs, 
  mockActiveProjects,
  mockLeaderboard,
  mockAnnouncements 
} from '../public/landing/data/mockData';

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const firstName = user?.name?.split(' ')[0] || 'Scholar';

  return (
    <>
      <Helmet>
        <title>Dashboard — GyaanSetu</title>
      </Helmet>

      <div className="space-y-10 pb-12">
        {/* ─── Welcome Bar ───────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">
              Good morning, {firstName} 👋
            </h2>
            <div className="flex items-center space-x-3">
              <div className="flex items-center px-3 py-1 bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400 rounded-full border border-teal-100 dark:border-teal-800 text-xs font-bold ring-2 ring-white dark:ring-slate-950">
                <Zap size={12} className="mr-1 fill-current" />
                Learning in: <span className="ml-1 font-black underline cursor-pointer">ગુજરાતી</span>
              </div>
              <span className="text-xs font-bold text-slate-400">Next goal: Build a React App</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <StreakBadge days={7} />
            <XPChip xp={1840} />
          </div>
        </div>

        {/* ─── Stat Cards ───────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardStatCard 
            title="Courses Enrolled" 
            value="4" 
            icon={BookOpen} 
            color="orange" 
            description="2 Courses active this week"
          />
          <DashboardStatCard 
            title="Labs Completed" 
            value="12" 
            icon={FlaskConical} 
            color="teal" 
            description="Top 5% in terminal speed"
          />
          <DashboardStatCard 
            title="Projects Submitted" 
            value="2" 
            icon={Briefcase} 
            color="amber" 
            description="Next review in 2 days"
          />
          <DashboardStatCard 
            title="XP Points" 
            value="1,840" 
            icon={Star} 
            color="emerald" 
            description="+250 XP earned today"
          />
        </div>

        {/* ─── Continue Learning ──────────────────────────────────────── */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Resume Where You Left Off
            </h3>
            <Link to="/courses/my-learning" className="text-sm font-bold text-slate-500 hover:text-primary transition-colors flex items-center">
              View All <ChevronRight size={16} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockEnrolledCourses.map((course) => (
              <div key={course.id} className="relative group">
                <CourseCard course={course} />
                {/* Progress Overlay if not present in CourseCard */}
                <div className="mt-4 px-2">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Course Progress</span>
                    <span className="text-xs font-black text-primary">{course.progress}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all duration-500" 
                      style={{ width: `${course.progress}%` }} 
                    />
                  </div>
                  <Link to={`/courses/${course.id}/learn`} className="mt-4 block">
                    <Button variant="outline" size="sm" className="w-full font-black">
                      Continue Learning
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
            {/* Empty Slot Placeholder */}
            <div className="border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-[2rem] flex flex-col items-center justify-center p-8 text-center space-y-4 hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-colors cursor-pointer min-h-[300px]">
              <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-2xl text-slate-400">
                <BookOpen size={32} />
              </div>
              <div>
                <p className="font-bold text-slate-600 dark:text-slate-300">Enroll in a new course</p>
                <p className="text-xs text-slate-400">Explore 50+ bilingual tech paths</p>
              </div>
            </div>
          </div>
        </div>

        {/* ─── Recommended Labs ────────────────────────────────────────── */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Labs Recommended For You
            </h3>
            <Link to="/labs" className="text-sm font-bold text-slate-500 hover:text-primary transition-colors flex items-center">
              Explore All Labs <ChevronRight size={16} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockRecommendedLabs.map((lab) => (
              <Card key={lab.id} className="overflow-hidden group hover:translate-y-[-4px] transition-all duration-300">
                <div className="relative h-40 overflow-hidden">
                  <img src={lab.image} alt={lab.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-black text-white uppercase tracking-widest border border-white/30">
                      {lab.difficulty}
                    </span>
                  </div>
                </div>
                <div className="p-5 space-y-4">
                  <div>
                    <h4 className="text-lg font-black text-slate-800 dark:text-white line-clamp-1">{lab.title}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-[10px] font-bold text-teal-500 uppercase tracking-wider">{lab.language} Support</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase">•</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{lab.time}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {lab.tags.map(tag => (
                      <span key={tag} className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[10px] font-bold rounded-md">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <Button className="w-full py-2.5 text-xs font-black shadow-lg shadow-orange-100 dark:shadow-none" icon={ChevronRight}>
                    Start Lab
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* ─── Active Projects ────────────────────────────────────────── */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Active Projects</h3>
            <Link to="/projects" className="text-sm font-bold text-slate-500 hover:text-primary transition-colors flex items-center">
              Workspace <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockActiveProjects.map((project) => (
              <Card key={project.id} className="p-2 hover:shadow-2xl hover:shadow-slate-200/50 dark:hover:shadow-none transition-all duration-300">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="w-full sm:w-40 h-32 rounded-2xl overflow-hidden shrink-0">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 py-1 pr-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-black text-primary uppercase tracking-widest leading-none">{project.industry}</span>
                        <h4 className="text-lg font-black text-slate-800 dark:text-white leading-tight mt-1">{project.title}</h4>
                      </div>
                      <div className="px-3 py-1 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-black rounded-lg border border-emerald-100 dark:border-emerald-800/50">
                        {project.status}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map(t => (
                        <span key={t} className="text-[10px] font-bold text-slate-400">{t}</span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-slate-50 dark:border-slate-800/50 mt-auto">
                      <div className="text-[10px] font-bold text-rose-500 uppercase tracking-tight">
                        Deadline: {project.deadline}
                      </div>
                      <Link to="/workspace" className="text-xs font-black text-slate-800 dark:text-white hover:text-primary transition-colors">
                        Open Workspace →
                      </Link>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* ─── Community & News ────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mt-8">
          <div className="lg:col-span-8 flex flex-col">
            <LeaderboardPreview data={mockLeaderboard} />
          </div>
          <div className="lg:col-span-4 flex flex-col">
            <AnnouncementsPanel items={mockAnnouncements} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
