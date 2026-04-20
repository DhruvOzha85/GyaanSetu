import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

/**
 * PublicLayout - Structural wrapper for public-facing pages
 */
const PublicLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
      <Navbar />
      
      <main className="flex-grow pt-20" id="main-content">
        <Outlet />
      </main>

      <footer className="bg-gray-50 dark:bg-slate-900/50 border-t border-gray-100 dark:border-slate-800 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-black text-sm">G</div>
                <span className="text-xl font-black gradient-text tracking-tighter">GyaanSetu</span>
              </div>
              <p className="text-gray-500 dark:text-gray-400 max-w-sm mb-6">
                India&apos;s first bilingual practical EdTech platform. Bridging the gap between education and industry through project-based learning.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-6">Platform</h4>
              <ul className="space-y-4 text-sm text-gray-500 dark:text-gray-400 font-bold">
                <li className="hover:text-primary transition-colors cursor-pointer">Courses</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Code Labs</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Live Projects</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-6">Company</h4>
              <ul className="space-y-4 text-sm text-gray-500 dark:text-gray-400 font-bold">
                <li className="hover:text-primary transition-colors cursor-pointer">About Us</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Pricing</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Terms & Privacy</li>
              </ul>
            </div>
          </div>
          <div className="h-px bg-gray-100 dark:bg-slate-800 my-12" />
          <p className="text-center text-xs font-bold text-gray-400">
            © {new Date().getFullYear()} GyaanSetu Foundation. Built with 🧡 for India.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
