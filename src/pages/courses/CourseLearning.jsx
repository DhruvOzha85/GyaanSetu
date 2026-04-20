import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  Play, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle, 
  Circle, 
  Video, 
  FlaskConical, 
  HelpCircle, 
  Maximize, 
  Volume2, 
  Settings, 
  Share2, 
  ThumbsUp, 
  ThumbsDown, 
  Flag,
  FileText,
  MessageCircle,
  Download,
  BookOpen,
  Lock
} from 'lucide-react';
import { cn } from '../../utils/cn';

// UI Components
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Accordion from '../../components/ui/Accordion';
import ProgressBar from '../../components/ui/ProgressBar';

// Data
import { mockCourses } from '../public/landing/data/mockData';

const CourseLearning = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  
  // State
  const [course, setCourse] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [subtitleLang, setSubtitleLang] = useState('en'); // en, hi, gj
  const [activeTab, setActiveTab] = useState('notes');
  const [notes, setNotes] = useState('');
  const [completedLessons, setCompletedLessons] = useState(new Set());
  const [isMarkingComplete, setIsMarkingComplete] = useState(false);

  // Initialize Data
  useEffect(() => {
    const foundCourse = mockCourses.find(c => c.id === parseInt(courseId));
    if (foundCourse) {
      setCourse(foundCourse);
      // Default to first lesson of first section if exists
      if (foundCourse.curriculum?.length > 0) {
        setCurrentLesson(foundCourse.curriculum[0].lessons[0]);
      }
    }

    // Load progress from localStorage
    const savedProgress = localStorage.getItem(`gyaansetu_progress_${courseId}`);
    if (savedProgress) {
      setCompletedLessons(new Set(JSON.parse(savedProgress)));
    }
  }, [courseId]);

  // Load/Save Notes
  useEffect(() => {
    if (currentLesson) {
      const savedNotes = localStorage.getItem(`gyaansetu_notes_${courseId}_${currentLesson.title}`);
      setNotes(savedNotes || '');
    }
  }, [currentLesson, courseId]);

  const handleNotesChange = (e) => {
    const val = e.target.value;
    setNotes(val);
    localStorage.setItem(`gyaansetu_notes_${courseId}_${currentLesson.title}`, val);
  };

  const toggleComplete = () => {
    setIsMarkingComplete(true);
    const newCompleted = new Set(completedLessons);
    if (newCompleted.has(currentLesson.title)) {
      newCompleted.delete(currentLesson.title);
    } else {
      newCompleted.add(currentLesson.title);
    }
    setCompletedLessons(newCompleted);
    localStorage.setItem(`gyaansetu_progress_${courseId}`, JSON.stringify([...newCompleted]));
    
    // Tiny delay for UX feel
    setTimeout(() => setIsMarkingComplete(false), 300);
  };

  const progressPercentage = useMemo(() => {
    if (!course || !course.curriculum) return 0;
    const totalLessons = course.curriculum.reduce((acc, sec) => acc + sec.lessons.length, 0);
    return (completedLessons.size / totalLessons) * 100;
  }, [course, completedLessons]);

  if (!course || !currentLesson) return null;

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-slate-950 overflow-hidden">
      <Helmet>
        <title>{currentLesson.title} — {course.title} — GyaanSetu</title>
      </Helmet>

      {/* ─── Top Immersive Header ───────────────────────────────────── */}
      <header className="h-16 flex items-center justify-between px-6 bg-slate-900 border-b border-white/5 z-50">
        <div className="flex items-center space-x-4">
          <Link to="/dashboard" className="p-2 text-slate-400 hover:text-white transition-colors">
            <ChevronLeft size={24} />
          </Link>
          <div className="h-4 w-[1px] bg-white/10 mx-2" />
          <h1 className="text-sm font-black text-white line-clamp-1 tracking-tight">
            {course.title} <span className="mx-2 text-white/30">•</span> 
            <span className="text-slate-400 font-bold">{currentLesson.title}</span>
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex flex-col items-end mr-4">
            <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Course Progress</span>
            <div className="flex items-center space-x-2">
              <div className="w-32 h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-500" 
                  style={{ width: `${progressPercentage}%` }} 
                />
              </div>
              <span className="text-xs font-black text-white">{Math.round(progressPercentage)}%</span>
            </div>
          </div>
          <Button size="sm" variant="outline" className="text-white border-white/20 hover:bg-white/10">
            <Settings size={16} />
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* ─── Main Content (65%) ──────────────────────────────────── */}
        <main className="flex-1 flex flex-col overflow-y-auto custom-scrollbar bg-slate-50 dark:bg-slate-950">
          {/* Video Section */}
          <div className="bg-black aspect-video relative group">
            {/* Mock Player Placeholder */}
            <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-white shadow-2xl scale-100 group-hover:scale-110 transition-transform cursor-pointer">
                <Play size={40} fill="currentColor" className="ml-1" />
              </div>
              <p className="text-white/40 text-sm font-bold tracking-widest uppercase">Video Lesson Playing...</p>
            </div>

            {/* Subtitle Indicator */}
            <div className="absolute bottom-20 left-12">
              <div className="bg-black/80 backdrop-blur-md px-6 py-2 rounded-xl border border-white/10 text-white font-black tracking-tight text-lg shadow-2xl animate-fade-in">
                {subtitleLang === 'en' && "Subtitles: Welcome to the world of DevOps!"}
                {subtitleLang === 'hi' && "सबटाइटल्स: डेवऑप्स की दुनिया में आपका स्वागत है!"}
                {subtitleLang === 'gj' && "સબટાઈટલ્સ: ડેવઓપ્સની દુનિયામાં તમારું સ્વાગત છે!"}
              </div>
            </div>

            {/* Subtitle Controls Overlay */}
            <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex items-center space-x-2 bg-black/60 backdrop-blur-md p-1.5 rounded-2xl border border-white/10">
                {['en', 'hi', 'gj'].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setSubtitleLang(lang)}
                    className={cn(
                      "px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                      subtitleLang === lang 
                        ? "bg-primary text-white shadow-lg" 
                        : "text-white/60 hover:text-white"
                    )}
                  >
                    {lang === 'en' ? 'ENG' : lang === 'hi' ? 'हिंदी' : 'ગુજ'}
                  </button>
                ))}
              </div>
            </div>

            {/* Player UI */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
              <div className="h-1 w-full bg-white/20 rounded-full mb-6 overflow-hidden group/progress cursor-pointer">
                <div className="h-full bg-primary w-1/3 relative">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-xl opacity-0 group-hover/progress:opacity-100 transition-opacity" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6 text-white/80">
                  <Play size={20} fill="currentColor" className="hover:text-white cursor-pointer" />
                  <div className="flex items-center space-x-2 text-xs font-black">
                    <span>12:45</span> <span className="text-white/30">/</span> <span>45:00</span>
                  </div>
                  <Volume2 size={20} className="hover:text-white cursor-pointer" />
                </div>
                <div className="flex items-center space-x-6 text-white/80">
                  <Settings size={20} className="hover:text-white cursor-pointer" />
                  <Maximize size={20} className="hover:text-white cursor-pointer" />
                </div>
              </div>
            </div>
          </div>

          {/* Lesson Metadata */}
          <div className="p-8 space-y-8 max-w-5xl mx-auto w-full">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div>
                <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-none mb-2">
                  {currentLesson.title}
                </h2>
                <div className="flex items-center space-x-4 text-xs font-bold text-slate-400">
                  <span className="flex items-center"><Video size={14} className="mr-1.5" /> Video Lesson</span>
                  <span className="h-1 w-1 bg-slate-300 rounded-full" />
                  <span>45 Minutes</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" className="space-x-2">
                  <ThumbsUp size={16} /> <span className="text-xs font-black">Helpful</span>
                </Button>
                <Button variant="outline" size="sm" className="space-x-2">
                  <Share2 size={16} /> <span className="text-xs font-black">Share</span>
                </Button>
              </div>
            </div>

            <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
              In this core session, we dive deep into the foundations of {course.category}. 
              Master the architectural patterns and real-world implementation strategies used by elite engineers. 
              Don't forget to practice the labs attached to this module.
            </p>

            {/* Tabs Area */}
            <div className="space-y-6 pt-4">
              <div className="flex space-x-8 border-b border-slate-200 dark:border-slate-800">
                {[
                  { id: 'notes', icon: FileText, label: 'Notes' },
                  { id: 'discussion', icon: MessageCircle, label: 'Discussion' },
                  { id: 'resources', icon: Download, label: 'Resources' },
                  { id: 'transcript', icon: BookOpen, label: 'Transcript' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "flex items-center space-x-2 pb-4 text-xs font-black uppercase tracking-widest transition-all relative",
                      activeTab === tab.id 
                        ? "text-primary" 
                        : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    )}
                  >
                    <tab.icon size={16} />
                    <span>{tab.label}</span>
                    {activeTab === tab.id && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full animate-scale-x" />
                    )}
                  </button>
                ))}
              </div>

              <div className="min-h-[300px]">
                {activeTab === 'notes' && (
                  <div className="space-y-4 animate-fade-in">
                    <textarea 
                      placeholder="Type your personal lesson notes here... (they save automatically)"
                      className="w-full h-64 p-6 bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-100 dark:border-slate-800 focus:border-primary/30 outline-none font-medium text-slate-700 dark:text-slate-300 transition-all resize-none shadow-inner"
                      value={notes}
                      onChange={handleNotesChange}
                    />
                    <p className="text-[10px] font-bold text-slate-400 uppercase text-right">Last saved {new Date().toLocaleTimeString()}</p>
                  </div>
                )}
                {activeTab !== 'notes' && (
                  <div className="flex flex-col items-center justify-center p-20 text-center space-y-4 animate-fade-in">
                    <div className="w-16 h-16 bg-slate-100 dark:bg-slate-900 rounded-full flex items-center justify-center text-slate-300">
                      <HelpCircle size={32} />
                    </div>
                    <h4 className="text-lg font-black text-slate-800 dark:text-white uppercase tracking-tight">Content Coming Soon</h4>
                    <p className="text-slate-400 text-sm max-w-xs font-bold">This tab is currently under development. Check back in the next version!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>

        {/* ─── Right Sidebar Navigation (35%) ───────────────────────── */}
        <aside className="w-[380px] hidden lg:flex flex-col bg-white dark:bg-slate-950 border-l border-slate-100 dark:border-slate-800">
          <div className="p-6 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight mb-4">Course Curriculum</h3>
            <ProgressBar progress={progressPercentage} showLabel color="primary" size="md" />
          </div>
          
          <div className="flex-1 overflow-y-auto custom-scrollbar py-2">
            {course.curriculum.map((section, sIdx) => (
              <Accordion 
                key={sIdx} 
                title={section.title} 
                className="bg-transparent border-0"
                titleClassName="px-6 py-4 hover:bg-slate-50 dark:hover:bg-slate-900/50"
                defaultOpen={section.lessons.some(l => l.title === currentLesson.title)}
              >
                <div className="space-y-1 pb-4">
                  {section.lessons.map((lesson, lIdx) => {
                    const isActive = currentLesson.title === lesson.title;
                    const isCompleted = completedLessons.has(lesson.title);
                    
                    return (
                      <div 
                        key={lIdx}
                        onClick={() => setCurrentLesson(lesson)}
                        className={cn(
                          "group px-6 py-3.5 flex items-start space-x-3 cursor-pointer transition-all relative border-l-4",
                          isActive 
                            ? "bg-primary/5 dark:bg-primary/10 border-primary" 
                            : "border-transparent hover:bg-slate-50 dark:hover:bg-slate-900/50"
                        )}
                      >
                        <div className={cn(
                          "mt-0.5 transition-colors",
                          isCompleted ? "text-emerald-500" : isActive ? "text-primary" : "text-slate-300"
                        )}>
                          {isCompleted ? <CheckCircle size={18} fill="currentColor" fillOpacity={0.1} /> : <Circle size={18} />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={cn(
                            "text-sm font-bold truncate transition-colors",
                            isActive ? "text-primary" : isCompleted ? "text-slate-700 dark:text-slate-200" : "text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200"
                          )}>
                            {lesson.title}
                          </p>
                          <div className="flex items-center space-x-2 mt-1 text-[10px] font-black text-slate-400/80 uppercase">
                            <span className="flex items-center">
                              {lesson.type === 'video' ? <Video size={10} className="mr-1" /> : <FlaskConical size={10} className="mr-1" />}
                              {lesson.type}
                            </span>
                            <span>•</span>
                            <span>{lesson.duration}</span>
                          </div>
                        </div>
                        {!isCompleted && !isActive && !lesson.isFreePreview && (
                           <Lock size={14} className="text-slate-200 mt-1" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </Accordion>
            ))}
          </div>
        </aside>
      </div>

      {/* ─── Bottom Navigation Bar ──────────────────────────────────── */}
      <footer className="h-20 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between px-8 z-[51]">
        <Button variant="ghost" size="sm" className="hidden md:flex items-center space-x-2 text-slate-500 font-black uppercase tracking-widest hover:text-primary">
          <ChevronLeft size={18} /> <span>Prev Lesson</span>
        </Button>
        
        <div className="flex-1 flex justify-center">
          <Button 
            onClick={toggleComplete}
            disabled={isMarkingComplete}
            variant={completedLessons.has(currentLesson.title) ? "success" : "primary"}
            className={cn(
              "px-10 py-4 shadow-xl transition-all",
              completedLessons.has(currentLesson.title) ? "shadow-emerald-100" : "shadow-orange-100"
            )}
          >
            {completedLessons.has(currentLesson.title) ? (
              <span className="flex items-center space-x-2">
                <CheckCircle size={20} /> <span className="text-sm font-black uppercase">Completed</span>
              </span>
            ) : (
              <span className="text-sm font-black uppercase tracking-wider">Mark as Complete</span>
            )}
          </Button>
        </div>

        <Button variant="primary" size="sm" className="px-8 flex items-center space-x-2">
          <span className="text-xs font-black uppercase tracking-widest">Next Lesson</span> <ChevronRight size={18} />
        </Button>
      </footer>
    </div>
  );
};

export default CourseLearning;
