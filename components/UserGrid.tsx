
import React from 'react';
import { User } from '../types';
import { HiMail, HiExternalLink } from 'react-icons/hi';

interface UserGridProps {
  users: User[];
  onView: (user: User) => void;
}

const UserGrid: React.FC<UserGridProps> = ({ users, onView }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {users.map((user) => (
        <div 
          key={user.id}
          onClick={() => onView(user)}
          className="group relative bg-white dark:bg-slate-800 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 dark:hover:shadow-none hover:-translate-y-1 transition-all duration-300 cursor-pointer"
        >
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-4">
              <div className="w-20 h-20 rounded-3xl bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center text-2xl font-bold text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform duration-300">
                {user.name.charAt(0)}
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 border-4 border-white dark:border-slate-800 rounded-full"></div>
            </div>
            
            <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {user.name}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-4">@{user.username}</p>
            
            <div className="w-full pt-4 border-t border-slate-50 dark:border-slate-700/50 space-y-2">
              <div className="flex items-center justify-center gap-2 text-slate-400">
                <HiMail className="w-4 h-4" />
                <span className="text-xs font-medium truncate max-w-[150px]">{user.email}</span>
              </div>
            </div>
          </div>
          
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <HiExternalLink className="w-5 h-5 text-slate-300" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserGrid;
