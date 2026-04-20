import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '../../utils/cn';
import Button from '../ui/Button';
import LanguageSwitcher from '../ui/LanguageSwitcher';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Courses', path: '/courses' },
    { name: 'Labs', path: '/labs' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-8 h-20 flex items-center justify-center',
        isScrolled 
          ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-gray-100 dark:border-slate-800' 
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-orange-200 dark:shadow-none">
            G
          </div>
          <span className="text-2xl font-black gradient-text tracking-tighter">GyaanSetu</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'px-4 py-2 rounded-xl text-sm font-bold transition-all hover:text-primary',
                location.pathname === link.path 
                  ? 'text-primary bg-orange-50 dark:bg-orange-900/20' 
                  : 'text-gray-600 dark:text-gray-400'
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="hidden lg:flex items-center space-x-4">
          <LanguageSwitcher />
          <Link to="/login">
            <Button variant="ghost" size="sm">Login</Button>
          </Link>
          <Link to="/signup">
            <Button size="sm">Get Started</Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-400"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-20 left-0 right-0 p-4 bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800 lg:hidden shadow-xl animate-fade-in-down">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-bold text-gray-600 dark:text-gray-300 px-4 py-2"
              >
                {link.name}
              </Link>
            ))}
            <div className="h-px bg-gray-100 dark:bg-slate-800 my-2" />
            <div className="flex items-center justify-between px-4">
              <span className="text-sm font-bold text-gray-500">Language</span>
              <LanguageSwitcher />
            </div>
            <Link to="/login" className="w-full">
              <Button variant="outline" className="w-full">Login</Button>
            </Link>
            <Link to="/signup" className="w-full">
              <Button className="w-full">Get Started</Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
