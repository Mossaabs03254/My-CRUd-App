
import React from 'react';
import { User } from '../types';
import Modal from './Modal';
import { HiMail, HiPhone, HiGlobeAlt, HiOfficeBuilding, HiMap, HiLocationMarker } from 'react-icons/hi';

interface ViewUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
}

const ViewUserModal: React.FC<ViewUserModalProps> = ({ isOpen, onClose, user }) => {
  if (!user) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="User Profile">
      <div className="space-y-6">
        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-2xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-3 ring-4 ring-indigo-50 dark:ring-indigo-900/20">
            {user.name.charAt(0)}
          </div>
          <h4 className="text-xl font-bold text-slate-900 dark:text-white">{user.name}</h4>
          <p className="text-slate-500 dark:text-slate-400 text-sm">@{user.username}</p>
          <div className="mt-1 text-xs text-slate-400 font-medium">User ID: #{user.id}</div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <DetailItem icon={HiMail} label="Email" value={user.email} />
            <DetailItem icon={HiPhone} label="Phone" value={user.phone} />
            <DetailItem icon={HiGlobeAlt} label="Website" value={user.website} />
            <DetailItem icon={HiOfficeBuilding} label="Company" value={user.company.name} subValue={user.company.catchPhrase} />
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 space-y-3">
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 mb-1">
              <HiMap className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-wider">Full Address</span>
            </div>
            <div className="space-y-1">
              <p className="text-sm dark:text-white font-medium">
                {user.address.suite}, {user.address.street}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {user.address.city}, {user.address.zipcode}
              </p>
            </div>
            {user.address.geo && (
              <div className="flex items-center gap-2 pt-2 border-t border-slate-200 dark:border-slate-700">
                <HiLocationMarker className="w-4 h-4 text-slate-400" />
                <span className="text-xs text-slate-500 font-mono">
                  Lat: {user.address.geo.lat}, Lng: {user.address.geo.lng}
                </span>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-semibold rounded-xl transition-all"
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

const DetailItem: React.FC<{ icon: any, label: string, value: string, subValue?: string }> = ({ icon: Icon, label, value, subValue }) => (
  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 space-y-1">
    <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 mb-1">
      <Icon className="w-5 h-5" />
      <span className="text-xs font-bold uppercase tracking-wider">{label}</span>
    </div>
    <p className="text-sm dark:text-white font-semibold truncate">{value}</p>
    {subValue && <p className="text-xs italic text-slate-500 dark:text-slate-400 truncate">"{subValue}"</p>}
  </div>
);

export default ViewUserModal;
