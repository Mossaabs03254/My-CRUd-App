
import React, { useState, useCallback } from 'react';
import Sidebar from '../components/layout/Sidebar';
import Navbar from '../components/layout/Navbar';
import UserTable from '../components/users/UserTable';
import UserGrid from '../components/users/UserGrid';
import UserFormModal from '../components/users/UserFormModal';
import ViewUserModal from '../components/users/ViewUserModal';
import DeleteConfirmModal from '../components/users/DeleteConfirmModal';
import Toast from '../components/common/Toast';
import { useUsers } from '../hooks/useUsers';
import { User, ToastMessage, ToastType } from '../types';

interface DashboardPageProps {
  user: { name: string; email: string; avatar: string; role: string };
  onLogout: () => void;
  darkMode: boolean;
  toggleTheme: () => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ user, onLogout, darkMode, toggleTheme }) => {
  const [activeTab, setActiveTab] = useState('home');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback((message: string, type: ToastType) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
  }, []);

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const { users, loading, addUser, editUser, deleteUser } = useUsers(addToast);

  // Modals state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleProfileView = () => {
    const adminUser: User = {
      id: 0,
      name: user.name,
      username: 'admin_root',
      email: user.email,
      phone: '+1 (555) 000-0000',
      website: 'elite-admin.cloud',
      company: { name: 'System Core', catchPhrase: 'Powering the Dashboard', bs: 'Infrastructure' },
      address: { street: 'Server Blvd', suite: 'Rack 1', city: 'Data Center', zipcode: '01010', geo: { lat: '0', lng: '0' } }
    };
    setSelectedUser(adminUser);
    setIsViewOpen(true);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar onLogout={onLogout} activeItem={activeTab} setActiveItem={setActiveTab} />
      
      <main className="flex-1 lg:ml-64 flex flex-col h-full overflow-hidden">
        <Navbar 
          user={user} 
          onLogout={onLogout} 
          onProfileClick={handleProfileView}
          darkMode={darkMode}
          toggleTheme={toggleTheme}
        />
        
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {activeTab === 'home' && (
              <>
                <header>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Home</h2>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">Community overview and profile gallery.</p>
                </header>
                {loading ? (
                   <div className="h-64 flex items-center justify-center">
                    <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                   </div>
                ) : (
                  <div className="animate-in fade-in duration-500">
                    <UserGrid 
                      users={users} 
                      onView={(u) => { setSelectedUser(u); setIsViewOpen(true); }} 
                    />
                  </div>
                )}
              </>
            )}

            {activeTab === 'users' && (
              <>
                <header>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">User Management</h2>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">Administrative tools for user accounts.</p>
                </header>

                {loading ? (
                  <div className="h-64 flex items-center justify-center">
                    <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : (
                  <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <UserTable 
                      users={users} 
                      onAdd={() => { setSelectedUser(null); setIsFormOpen(true); }}
                      onEdit={(u) => { setSelectedUser(u); setIsFormOpen(true); }}
                      onDelete={(u) => { setSelectedUser(u); setIsDeleteOpen(true); }}
                      onView={(u) => { setSelectedUser(u); setIsViewOpen(true); }}
                    />
                  </div>
                )}
              </>
            )}

            {activeTab === 'settings' && (
              <div className="flex flex-col items-center justify-center h-full py-20 text-center">
                <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-400 mb-4">
                  <span className="text-2xl">⚙️</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Settings Page</h3>
                <p className="text-slate-500 text-sm">System configuration options will appear here.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Modals */}
      <UserFormModal 
        isOpen={isFormOpen} 
        onClose={() => { setIsFormOpen(false); setSelectedUser(null); }}
        onSubmit={selectedUser ? (data) => editUser(selectedUser.id, data) : addUser}
        initialData={selectedUser}
      />
      
      <ViewUserModal 
        isOpen={isViewOpen} 
        onClose={() => { setIsViewOpen(false); setSelectedUser(null); }}
        user={selectedUser}
      />

      <DeleteConfirmModal 
        isOpen={isDeleteOpen} 
        onClose={() => { setIsDeleteOpen(false); setSelectedUser(null); }}
        onConfirm={() => selectedUser && deleteUser(selectedUser.id)}
        user={selectedUser}
      />

      <Toast toasts={toasts} removeToast={removeToast} />
    </div>
  );
};

export default DashboardPage;
