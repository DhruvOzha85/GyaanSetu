import React from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleSidebar } from '../../features/ui/uiSlice';
import useTheme from '../../hooks/useTheme';

/**
 * DashboardLayout - Main layout for authenticated users
 */
const DashboardLayout = () => {
  const { sidebarOpen } = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const { isDark } = useTheme();

  return (
    <div className={`min-h-screen bg-background-primary transition-colors duration-300 ${isDark ? 'dark' : ''}`}>
      {/* Placeholder for Sidebar */}
      <aside
        className={`fixed left-0 top-0 bottom-0 z-40 bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-800 transition-all duration-300 ${
          sidebarOpen ? 'w-64' : 'w-20'
        }`}
      >
        <div className="p-4 flex items-center justify-between h-16">
          {sidebarOpen && <span className="text-xl font-bold gradient-text">GyaanSetu</span>}
          <button 
            onClick={() => dispatch(toggleSidebar())}
            className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg text-gray-500"
          >
            {sidebarOpen ? '←' : '→'}
          </button>
        </div>
        {/* Nav items would go here in Part 5 */}
      </aside>

      {/* Main Content Area */}
      <div 
        className={`transition-all duration-300 ${
          sidebarOpen ? 'pl-64' : 'pl-20'
        }`}
      >
        {/* Placeholder for AuthNavbar */}
        <header className="h-16 border-b border-gray-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md sticky top-0 z-30">
          <div className="h-full px-6 flex items-center justify-between">
            <div className="text-gray-500 font-medium">Dashboard</div>
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold">
                U
              </div>
            </div>
          </div>
        </header>

        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
