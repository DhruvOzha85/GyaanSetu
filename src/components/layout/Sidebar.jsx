import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { 
  LayoutDashboard, 
  BookOpen, 
  Terminal, 
  Cpu, 
  Trophy, 
  Settings, 
  CircleHelp,
  ChevronRight
} from 'lucide-react';
import { cn } from '../../utils/cn';

/**
 * NavItem - Individual link in the Sidebar
 */
const NavItem = ({ item, sidebarOpen }) => {
  const location = useLocation();
  const isActive = location.pathname === item.path;
  const Icon = item.icon;

  return (
    <Link
      to={item.path}
      aria-current={isActive ? 'page' : undefined}
      aria-label={sidebarOpen ? undefined : item.name}
      className={cn(
        'flex items-center rounded-2xl transition-all duration-200 group relative mb-2 h-12',
        sidebarOpen ? 'px-4' : 'justify-center',
        isActive 
          ? 'bg-primary text-white shadow-lg shadow-orange-200 dark:shadow-none' 
          : 'text-gray-500 hover:bg-orange-50 hover:text-primary dark:text-gray-400 dark:hover:bg-orange-900/10'
      )}
    >
      <Icon size={22} strokeWidth={isActive ? 2.5 : 2} aria-hidden="true" />
      {sidebarOpen && (
        <span className="ml-3 font-bold text-[15px]">{item.name}</span>
      )}
      
      {/* Tooltip for collapsed mode */}
      {!sidebarOpen && (
        <div className="absolute left-16 px-3 py-2 bg-slate-900 text-white text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
          {item.name}
        </div>
      )}

      {isActive && sidebarOpen && (
        <div className="ml-auto">
          <ChevronRight size={14} className="opacity-50" aria-hidden="true" />
        </div>
      )}
    </Link>
  );
};

NavItem.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    icon: PropTypes.elementType.isRequired,
    path: PropTypes.string.isRequired,
  }).isRequired,
  sidebarOpen: PropTypes.bool.isRequired,
};

const Sidebar = () => {
  const { sidebarOpen } = useSelector((state) => state.ui);

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'My Courses', icon: BookOpen, path: '/my-courses' },
    { name: 'Code Labs', icon: Terminal, path: '/labs' },
    { name: 'Projects', icon: Cpu, path: '/projects' },
    { name: 'Leaderboard', icon: Trophy, path: '/leaderboard' },
  ];

  const bottomItems = [
    { name: 'Settings', icon: Settings, path: '/settings' },
    { name: 'Help Support', icon: CircleHelp, path: '/contact' },
  ];

  return (
    <aside
      className={cn(
        'h-screen bg-white dark:bg-slate-950 border-r border-gray-100 dark:border-slate-800 transition-all duration-300 z-50 flex flex-col flex-shrink-0 sticky top-0',
        sidebarOpen ? 'w-64' : 'w-24'
      )}
    >
      {/* Brand */}
      <div className="h-20 flex items-center px-6">
        <Link to="/" className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary min-w-[40px] rounded-xl flex items-center justify-center text-white font-black text-xl">
            G
          </div>
          {sidebarOpen && (
            <span className="text-2xl font-black gradient-text tracking-tighter transition-all">GyaanSetu</span>
          )}
        </Link>
      </div>

      {/* Main Nav */}
      <nav className="flex-1 px-4 py-6 overflow-y-auto no-scrollbar">
        <p className={cn(
          'text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4 px-2',
          !sidebarOpen && 'text-center px-0'
        )}>
          {sidebarOpen ? 'Main Menu' : '•••' }
        </p>
        {menuItems.map((item) => (
          <NavItem key={item.path} item={item} sidebarOpen={sidebarOpen} />
        ))}

        <div className="h-px bg-gray-50 dark:bg-slate-900 my-6 mx-2" />

        <p className={cn(
          'text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4 px-2',
          !sidebarOpen && 'text-center px-0'
        )}>
          {sidebarOpen ? 'Preferences' : '•••' }
        </p>
        {bottomItems.map((item) => (
          <NavItem key={item.path} item={item} sidebarOpen={sidebarOpen} />
        ))}
      </nav>

      {/* Promo Card (only visible when expanded) */}
      {sidebarOpen && (
        <div className="p-4 m-4 bg-orange-50 dark:bg-orange-900/10 rounded-3xl border border-orange-100 dark:border-orange-900/20">
          <p className="text-xs font-bold text-primary mb-2">Build Together!</p>
          <p className="text-[10px] text-orange-700 dark:text-orange-400 font-medium">Join 5,000+ creators building in public.</p>
          <button className="mt-3 w-full py-2 bg-white dark:bg-orange-900/30 text-[10px] font-black text-primary rounded-xl hover:bg-orange-100 transition-colors">
            INVITE FRIENDS
          </button>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
