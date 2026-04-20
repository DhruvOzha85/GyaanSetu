import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '../../features/ui/uiSlice';
import { Search, Bell, PanelLeftOpen, PanelLeftClose } from 'lucide-react';
import Input from '../ui/Input';
import LanguageSwitcher from '../ui/LanguageSwitcher';
import ThemeToggle from '../ui/ThemeToggle';

const AuthNavbar = () => {
  const dispatch = useDispatch();
  const { sidebarOpen } = useSelector((state) => state.ui);
  const { user } = useSelector((state) => state.auth);

  return (
    <header className="h-20 border-b border-gray-100 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl sticky top-0 z-40 px-4 md:px-8">
      <div className="h-full mx-auto flex items-center justify-between">
        {/* Left Side: Collapse & Search */}
        <div className="flex items-center space-x-4 flex-1 max-w-xl">
          <button
            onClick={() => dispatch(toggleSidebar())}
            className="p-2.5 rounded-xl bg-gray-50 hover:bg-orange-50 text-gray-500 hover:text-primary transition-colors dark:bg-slate-800 dark:hover:bg-orange-900/20"
          >
            {sidebarOpen ? <PanelLeftClose size={20} /> : <PanelLeftOpen size={20} />}
          </button>
          
          <div className="hidden md:block w-full">
            <Input 
              placeholder="Search courses, labs, or tools..." 
              icon={Search}
              className="h-11 bg-gray-50/50 border-transparent focus:bg-white dark:bg-slate-800/50 dark:focus:bg-slate-900"
            />
          </div>
        </div>

        {/* Right Side: Utils & User */}
        <div className="flex items-center space-x-3 md:space-x-6">
          <div className="hidden sm:flex items-center space-x-3">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>

          <button className="relative p-2.5 rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full ring-2 ring-white dark:ring-slate-900" />
          </button>

          <div className="h-10 w-px bg-gray-100 dark:bg-slate-800 hidden sm:block" />

          {/* User Entry */}
          <div className="flex items-center space-x-3 cursor-pointer group">
            <div className="hidden md:block text-right">
              <p className="text-sm font-black text-gray-900 dark:text-gray-100 leading-none">
                {user?.name || 'Dhruv Ozha'}
              </p>
              <p className="text-[10px] font-bold text-primary tracking-widest mt-1 uppercase">
                {user?.role || 'Pro Scholar'}
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-400 to-primary p-0.5 shadow-lg shadow-orange-100 dark:shadow-none group-hover:scale-105 transition-transform">
              <div className="w-full h-full rounded-[10px] bg-white dark:bg-slate-900 flex items-center justify-center text-primary font-black">
                {user?.name?.[0] || 'D'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AuthNavbar;
