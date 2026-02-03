import React, { useEffect } from "react";
import {
  HiCheckCircle,
  HiExclamationCircle,
  HiInformationCircle,
  HiXMark,
} from "react-icons/hi2";

import { ToastMessage } from "../types";

interface ToastProps {
  toasts: ToastMessage[];
  removeToast: (id: string) => void;
}

const Toast: React.FC<ToastProps> = ({ toasts, removeToast }) => {
  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          onRemove={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};

const ToastItem: React.FC<{
  toast: ToastMessage;
  onRemove: () => void;
}> = ({ toast, onRemove }) => {
  useEffect(() => {
    const timer = setTimeout(onRemove, 3500);
    return () => clearTimeout(timer);
  }, [onRemove]);

  const styles = {
    success:
      "bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-300 dark:border-emerald-800",
    error:
      "bg-red-50 text-red-800 border-red-200 dark:bg-red-900/40 dark:text-red-300 dark:border-red-800",
    info:
      "bg-indigo-50 text-indigo-800 border-indigo-200 dark:bg-indigo-900/40 dark:text-indigo-300 dark:border-indigo-800",
  };

  const icons = {
    success: <HiCheckCircle className="w-5 h-5" />,
    error: <HiExclamationCircle className="w-5 h-5" />,
    info: <HiInformationCircle className="w-5 h-5" />,
  };

  return (
    <div
      className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-2xl border shadow-xl animate-in slide-in-from-right-10 duration-300 ${styles[toast.type]}`}
    >
      {icons[toast.type]}

      <span className="text-sm font-semibold">{toast.message}</span>

      <button
        onClick={onRemove}
        className="ml-auto p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/10"
      >
        <HiXMark lassName="w-4 h-4 opacity-50 hover:opacity-100" />
      </button>
    </div>
  );
};

export default Toast;
