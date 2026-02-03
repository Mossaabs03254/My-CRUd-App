
import React from 'react';
import { HiHome, HiUsers, HiCog, HiLogout } from 'react-icons/hi';

interface SidebarProps {
  onLogout: () => void;
  activeItem: string;
  setActiveItem: (item: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onLogout, activeItem, setActiveItem }) => {
  const menuItems = [
    { id: 'home', label: 'Home', icon: HiHome },
    { id: 'users', label: 'User Management', icon: HiUsers },
    { id: 'settings', label: 'Settings', icon: HiCog },
  ];

  return (
    <aside className="w-64 hidden lg:flex flex-col bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 h-screen fixed left-0 top-0">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-xl">E</span>
        </div>
        <h1 className="text-xl font-bold tracking-tight text-slate-800 dark:text-white">Elite Admin</h1>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveItem(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
              activeItem === item.id
                ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-4 mt-auto">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-200"
        >
          <HiLogout className="w-5 h-5" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
