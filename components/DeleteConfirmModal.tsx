
import React from 'react';
import Modal from './Modal';
import { HiExclamation } from 'react-icons/hi';
import { User } from '../types';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  user: User | null;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({ isOpen, onClose, onConfirm, user }) => {
  if (!user) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete User">
      <div className="space-y-6">
        <div className="flex items-center gap-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-2xl">
          <div className="w-12 h-12 bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 rounded-xl flex items-center justify-center shrink-0">
            <HiExclamation className="w-8 h-8" />
          </div>
          <div>
            <h5 className="font-bold text-red-800 dark:text-red-300">Caution</h5>
            <p className="text-sm text-red-700 dark:text-red-400/80">This action cannot be undone.</p>
          </div>
        </div>
        
        <p className="text-slate-600 dark:text-slate-300">
          Are you sure you want to delete <span className="font-bold text-slate-900 dark:text-white">{user.name}</span>? 
          All associated data will be permanently removed from our servers.
        </p>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-semibold rounded-xl transition-all"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl shadow-lg shadow-red-600/20 transition-all active:scale-95"
          >
            Delete Permanently
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmModal;
