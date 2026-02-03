
import React, { useState, useEffect } from 'react';
import { User } from '../../types';
import Modal from '../common/Modal';

interface UserFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (user: Partial<User>) => void;
  initialData?: User | null;
}

const UserFormModal: React.FC<UserFormModalProps> = ({ isOpen, onClose, onSubmit, initialData }) => {
  const emptyState: Partial<User> = {
    name: '',
    email: '',
    username: '',
    phone: '',
    website: '',
    address: { street: '', suite: '', city: '', zipcode: '', geo: { lat: '', lng: '' } },
    company: { name: '', catchPhrase: '', bs: '' }
  };

  const [formData, setFormData] = useState<Partial<User>>(emptyState);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData(emptyState);
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? 'Edit User Details' : 'Add New User'}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-indigo-600 uppercase tracking-widest border-b border-indigo-100 dark:border-indigo-900/50 pb-2">Basic Information</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Full Name</label>
              <input
                required
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Username</label>
              <input
                required
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Email</label>
              <input
                required
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Phone</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Website</label>
              <input
                type="text"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all dark:text-white"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-bold text-indigo-600 uppercase tracking-widest border-b border-indigo-100 dark:border-indigo-900/50 pb-2">Address Details</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Street</label>
              <input
                type="text"
                value={formData.address?.street}
                onChange={(e) => setFormData({ ...formData, address: { ...formData.address!, street: e.target.value } })}
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all dark:text-white"
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Suite/Apt</label>
              <input
                type="text"
                value={formData.address?.suite}
                onChange={(e) => setFormData({ ...formData, address: { ...formData.address!, suite: e.target.value } })}
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">City</label>
              <input
                type="text"
                value={formData.address?.city}
                onChange={(e) => setFormData({ ...formData, address: { ...formData.address!, city: e.target.value } })}
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Zipcode</label>
              <input
                type="text"
                value={formData.address?.zipcode}
                onChange={(e) => setFormData({ ...formData, address: { ...formData.address!, zipcode: e.target.value } })}
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all dark:text-white"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-bold text-indigo-600 uppercase tracking-widest border-b border-indigo-100 dark:border-indigo-900/50 pb-2">Company Information</h4>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Company Name</label>
              <input
                type="text"
                value={formData.company?.name}
                onChange={(e) => setFormData({ ...formData, company: { ...formData.company!, name: e.target.value } })}
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all dark:text-white"
              />
            </div>
          </div>
        </div>

        <div className="pt-6 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-3 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-semibold rounded-xl transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-indigo-600/20 transition-all active:scale-95"
          >
            {initialData ? 'Update Profile' : 'Create User'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default UserFormModal;
