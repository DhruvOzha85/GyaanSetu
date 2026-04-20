import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Info, HelpCircle, Settings, LogOut } from 'lucide-react';
import Button from '../ui/Button';

const LabLayout = ({ children, title, timer, instructionsLang, onLangChange, onSave, onSubmit }) => {
  return (
    <div className="flex flex-col h-screen bg-[#1E1E2E] text-slate-300 overflow-hidden font-sans selection:bg-primary/30 selection:text-white">
      {/* ─── Lab Top Bar ─────────────────────────────────────────── */}
      <header className="h-14 flex items-center justify-between px-6 bg-[#181825] border-b border-white/5 z-50">
        <div className="flex items-center space-x-4">
          <Link 
            to="/labs" 
            className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all"
            title="Exit Lab"
          >
            <ChevronLeft size={20} />
          </Link>
          <div className="h-4 w-[1px] bg-white/10 mx-2" />
          <div className="flex flex-col">
            <h1 className="text-sm font-black text-white tracking-tight leading-none mb-1">
              {title || 'Loading Lab...'}
            </h1>
            <span className="text-[10px] font-bold text-teal-400 uppercase tracking-widest">Interactive Lab Environment</span>
          </div>
        </div>

        {/* Center: Language Instructions Toggle */}
        <div className="flex items-center bg-[#11111b] p-1 rounded-xl border border-white/5">
          {[
            { id: 'en', label: 'ENG' },
            { id: 'hi', label: 'हिंदी' },
            { id: 'gj', label: 'ગુજ' }
          ].map((lang) => (
            <button
              key={lang.id}
              onClick={() => onLangChange(lang.id)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-black transition-all ${
                instructionsLang === lang.id 
                  ? 'bg-primary text-white shadow-lg' 
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center space-x-4">
          {timer && (
            <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl border ${
              timer.seconds < 300 ? 'border-rose-500/50 bg-rose-500/10 text-rose-400' : 'border-white/5 bg-white/5 text-slate-300'
            }`}>
              <div className={`w-2 h-2 rounded-full ${timer.seconds < 300 ? 'bg-rose-500 animate-pulse' : 'bg-teal-500'}`} />
              <span className="text-sm font-black mono tracking-tighter">{timer.formatted}</span>
            </div>
          )}
          
          <div className="flex items-center space-x-2 border-l border-white/10 pl-4">
            <Button 
               variant="ghost" 
               size="sm" 
               className="text-slate-400 hover:text-white hover:bg-white/5"
            >
              <HelpCircle size={18} />
            </Button>
            <Button 
               variant="primary" 
               size="sm" 
               onClick={onSubmit}
               className="px-6 py-2 shadow-xl shadow-primary/20"
            >
              <span className="text-xs font-black uppercase tracking-widest">Submit Lab</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 relative flex overflow-hidden">
        {children}
      </main>
    </div>
  );
};

export default LabLayout;
