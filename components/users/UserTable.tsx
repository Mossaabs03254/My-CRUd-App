
import React, { useState, useMemo } from 'react';
import { HiPencil, HiTrash, HiEye, HiPlus, HiChevronLeft, HiChevronRight, HiSearch } from 'react-icons/hi';
import { User } from '../../types';

interface UserTableProps {
  users: User[];
  onAdd: () => void;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
  onView: (user: User) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onAdd, onEdit, onDelete, onView }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredUsers = useMemo(() => {
    return users.filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const currentUsers = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative max-w-xs w-full">
          <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by name, email, or username..."
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
          />
        </div>
        <button
          onClick={onAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl shadow-lg shadow-indigo-600/20 transition-all active:scale-95"
        >
          <HiPlus className="w-5 h-5" />
          Add User
        </button>
      </div>

      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 w-16">ID</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Name</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Username</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Email</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
              {currentUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors group">
                  <td className="px-6 py-4 text-sm font-medium text-slate-400">{user.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold shrink-0 text-xs">
                        {user.name.charAt(0)}
                      </div>
                      <div className="text-sm font-semibold text-slate-900 dark:text-white leading-tight">{user.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">@{user.username}</td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">{user.email}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => onView(user)}
                        title="View Details"
                        className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-all"
                      >
                        <HiEye className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => onEdit(user)}
                        title="Edit"
                        className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-lg transition-all"
                      >
                        <HiPencil className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => onDelete(user)}
                        title="Delete"
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                      >
                        <HiTrash className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {currentUsers.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                    No users found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="px-6 py-4 bg-slate-50/50 dark:bg-slate-900/20 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Showing <span className="font-semibold text-slate-700 dark:text-slate-200">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-semibold text-slate-700 dark:text-slate-200">{Math.min(currentPage * itemsPerPage, filteredUsers.length)}</span> of <span className="font-semibold text-slate-700 dark:text-slate-200">{filteredUsers.length}</span> users
            </p>
            <div className="flex gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => p - 1)}
                className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white dark:hover:bg-slate-800 transition-all"
              >
                <HiChevronLeft className="w-5 h-5" />
              </button>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(p => p + 1)}
                className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white dark:hover:bg-slate-800 transition-all"
              >
                <HiChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserTable;
