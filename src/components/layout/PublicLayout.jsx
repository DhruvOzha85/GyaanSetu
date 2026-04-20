import React from 'react';
import { Outlet } from 'react-router-dom';

/**
 * PublicLayout - Structural wrapper for public-facing pages
 */
const PublicLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* TODO: Add PublicNavbar component */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          <div className="text-2xl font-bold gradient-text">GyaanSetu</div>
          <nav className="hidden md:flex space-x-8">
            <span className="text-gray-600 hover:text-primary transition-colors cursor-pointer">Courses</span>
            <span className="text-gray-600 hover:text-primary transition-colors cursor-pointer">Labs</span>
            <span className="text-gray-600 hover:text-primary transition-colors cursor-pointer">Pricing</span>
          </nav>
          <div className="flex space-x-4">
            <button className="px-4 py-2 text-primary hover:bg-orange-50 rounded-lg transition-colors">Login</button>
            <button className="bg-primary hover:bg-primary-hover text-white px-6 py-2 rounded-lg transition-all shadow-md">Get Started</button>
          </div>
        </div>
      </header>

      <main className="flex-grow pt-16">
        <Outlet />
      </main>

      {/* TODO: Add Footer component */}
      <footer className="bg-gray-100 border-t border-gray-200 py-12">
        <div className="container mx-auto px-4 text-center text-gray-500">
          <p>© {new Date().getFullYear()} GyaanSetu. Bridging the gap between education and industry.</p>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
