import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Home, BookOpen, Search, ArrowLeft, RotateCcw } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

/**
 * GyaanSetu — 404 Page Not Found
 * 
 * Premium error page with illustrations, fun messages, 
 * and clear navigation paths.
 */
const NotFound = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [funMessage, setFunMessage] = useState('');

  const messages = [
    "Looks like this page took a permanent leave of absence.",
    "This route is more mysterious than advanced calculus.",
    "Our student couldn't find this page even with 20/20 vision.",
    "Even the fastest fiber optics can't find what doesn't exist.",
    "This URL is a dead end. Time to pivot your career path!"
  ];

  useEffect(() => {
    // Pick a random fun message on load
    setFunMessage(messages[Math.floor(Math.random() * messages.length)]);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/courses?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-primary p-6 relative overflow-hidden">
      <Helmet>
        <title>404 — Page Not Found | GyaanSetu</title>
      </Helmet>

      {/* Decorative background elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-secondary/5 rounded-full blur-[120px]" />

      <div className="max-w-4xl w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-20 animate-in fade-in slide-in-from-bottom-12 duration-1000">
        
        {/* Left Side: Illustration & 404 */}
        <div className="flex-1 text-center lg:text-left space-y-6 relative">
          <div className="relative inline-block lg:block">
            <h1 className="text-[120px] lg:text-[180px] font-black leading-none tracking-tighter bg-gradient-to-br from-primary to-teal-500 bg-clip-text text-transparent opacity-20">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center lg:justify-start">
               {/* Illustration: Student with a magnifying glass */}
               <div className="w-48 h-48 lg:w-64 lg:h-64 relative animate-float">
                  {/* Student Body (SVG) */}
                  <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl">
                    <circle cx="100" cy="100" r="80" fill="currentColor" className="text-primary/10" />
                    <path d="M60 140 Q100 110 140 140" stroke="currentColor" strokeWidth="8" strokeLinecap="round" fill="none" className="text-slate-800 dark:text-white" />
                    <circle cx="70" cy="80" r="12" fill="currentColor" className="text-slate-800 dark:text-white" />
                    <circle cx="130" cy="80" r="12" fill="currentColor" className="text-slate-800 dark:text-white" />
                    {/* Confused expression */}
                    <path d="M90 100 Q100 90 110 100" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none" className="text-slate-800 dark:text-white" />
                  </svg>
                  {/* Floating icons */}
                  <div className="absolute -top-4 -right-4 w-12 h-12 rounded-2xl bg-white dark:bg-slate-900 shadow-xl border border-slate-100 dark:border-slate-800 flex items-center justify-center text-primary animate-bounce">
                     ?
                  </div>
                  <div className="absolute bottom-4 -left-4 w-10 h-10 rounded-xl bg-white dark:bg-slate-900 shadow-lg border border-slate-100 dark:border-slate-800 flex items-center justify-center text-secondary animate-pulse" style={{ animationDelay: '1s' }}>
                     !
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* Right Side: Content & CTAs */}
        <div className="flex-1 space-y-8 text-center lg:text-left">
           <div className="space-y-4">
              <Badge variant="primary" className="text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1 mb-2">Error: Page Missing</Badge>
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight uppercase">
                 Oops! This page <br className="hidden lg:block" /> doesn't exist.
              </h2>
              <p className="text-lg font-bold text-slate-500 dark:text-slate-400 leading-relaxed italic">
                 "{funMessage}"
              </p>
           </div>

           <div className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4">
                 <Button 
                   as={Link} 
                   to="/" 
                   variant="primary" 
                   className="flex-1 h-14 font-black uppercase text-xs tracking-widest shadow-xl shadow-primary/20"
                 >
                    <ArrowLeft size={18} className="mr-2" /> Go to Home
                 </Button>
                 <Button 
                   as={Link} 
                   to="/courses" 
                   variant="outline" 
                   className="flex-1 h-14 font-black uppercase text-xs tracking-widest border-2"
                 >
                    <BookOpen size={18} className="mr-2" /> Browse Courses
                 </Button>
              </div>

              <div className="pt-8 border-t border-slate-100 dark:border-slate-800">
                 <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 px-2">Lost? Try searching for a course:</p>
                 <form onSubmit={handleSearch} className="flex gap-2">
                    <Input 
                      placeholder="Search courses..." 
                      icon={Search} 
                      className="flex-grow h-12 rounded-2xl" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Button type="submit" variant="ghost" className="h-12 w-12 rounded-2xl flex items-center justify-center p-0">
                       <ArrowLeft size={20} className="rotate-180" />
                    </Button>
                 </form>
              </div>
           </div>

           <button 
             onClick={() => navigate(-1)}
             className="flex items-center gap-2 mx-auto lg:mx-0 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors"
           >
              <RotateCcw size={14} /> Go back to previous page
           </button>
        </div>

      </div>

      {/* Fun student badge at the bottom */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-black uppercase tracking-[0.4em] text-slate-300 dark:text-slate-800 select-none">
         GyaanSetu Protocol 404
      </div>
    </div>
  );
};

// Simple Badge component if not globally available in this context
const Badge = ({ children, variant, className }) => {
  const variants = {
    primary: "bg-primary/10 text-primary",
    secondary: "bg-secondary/10 text-secondary",
  };
  return (
    <span className={`inline-block px-3 py-1 rounded-full ${variants[variant] || ""} ${className}`}>
      {children}
    </span>
  );
};

export default NotFound;
