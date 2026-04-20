import React from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { cn } from '../../utils/cn';
import Sidebar from './Sidebar';
import AuthNavbar from './AuthNavbar';
import useTheme from '../../hooks/useTheme';

/**
 * DashboardLayout - Main layout for authenticated users
 */
const DashboardLayout = () => {
  const { sidebarOpen } = useSelector((state) => state.ui);
  const { isDark } = useTheme();

  return (
    <div className={cn(
      'min-h-screen bg-gray-50/30 transition-colors duration-300 font-body',
      isDark ? 'dark bg-slate-950' : 'bg-white'
    )}>
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <div 
        className={cn(
          'transition-all duration-300 min-h-screen flex flex-col',
          sidebarOpen ? 'pl-64' : 'pl-24'
        )}
      >
        <AuthNavbar />

        <main className="flex-grow p-4 md:p-8" id="main-content">
          <div className="max-w-[1600px] mx-auto animate-fade-in">
            <Outlet />
          </div>
        </main>

        <footer className="px-8 py-6 border-t border-gray-100 dark:border-slate-800 text-center md:text-left">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
            GyaanSetu Dashboard v1.0.0 — Build Phase
          </p>
        </footer>
      </div>
    </div>
  );
};

export default DashboardLayout;
