
import React, { useState, useRef, useEffect } from 'react';
import { HiBell, HiSearch, HiMenuAlt2, HiSun, HiMoon, HiUser, HiLogout } from 'react-icons/hi';

interface NavbarProps {
  user: { name: string; email: string; avatar: string; role: string };
  onLogout: () => void;
  onProfileClick: () => void;
  darkMode: boolean;
  toggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogout, onProfileClick, darkMode, toggleTheme }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-30 w-full h-16 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 px-4 md:px-6 flex items-center justify-between">
      <div className="flex items-center gap-4 lg:hidden">
        <button className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg">
          <HiMenuAlt2 className="w-6 h-6" />
        </button>
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold">E</span>
        </div>
      </div>

      <div className="hidden md:flex items-center max-w-md w-full ml-0 lg:ml-64">
        <div className="relative w-full group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <HiSearch className="w-5 h-5 group-focus-within:text-indigo-500 transition-colors" />
          </div>
          <input
            type="text"
            placeholder="Search dashboard..."
            className="block w-full pl-10 pr-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl leading-5 bg-slate-50 dark:bg-slate-900/50 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 sm:text-sm transition-all duration-200"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <button 
          onClick={toggleTheme}
          className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-all duration-200"
        >
          {darkMode ? <HiSun className="w-6 h-6" /> : <HiMoon className="w-6 h-6" />}
        </button>

        <button className="relative p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-all duration-200">
          <HiBell className="w-6 h-6" />
          <span className="absolute top-2 right-2 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
          </span>
        </button>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-3 p-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-200"
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="w-9 h-9 rounded-xl object-cover ring-2 ring-indigo-500/20"
            />
            <div className="hidden sm:block text-left">
              <p className="text-sm font-semibold dark:text-white leading-tight">{user.name}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-tight">{user.role}</p>
            </div>
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-700 sm:hidden">
                <p className="text-sm font-semibold dark:text-white leading-tight">{user.name}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{user.email}</p>
              </div>
              <button
                onClick={() => { onProfileClick(); setIsDropdownOpen(false); }}
                className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
              >
                <HiUser className="w-4 h-4" />
                View Profile
              </button>
              <button
                onClick={onLogout}
                className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              >
                <HiLogout className="w-4 h-4" />
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
