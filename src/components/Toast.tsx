import React, { useEffect } from 'react';
import { CheckCircle2, Info, X } from 'lucide-react';

interface ToastProps {
  message: string;
  isOpen: boolean;
  onClose: () => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  isOpen,
  onClose,
  duration = 3500,
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [isOpen, duration, onClose]);

  if (!isOpen) return null;

  return (
    <div
      id="app-toast-notification"
      className="fixed bottom-6 right-6 z-50 max-w-sm flex items-center gap-3 bg-[#1c1917] text-white px-4 py-3 rounded-xl shadow-2xl border border-white/10 animate-in fade-in slide-in-from-bottom-5 duration-200"
    >
      <CheckCircle2 className="w-5 h-5 text-[#c28e5d] shrink-0" />
      <p className="text-sm font-medium pr-2 leading-snug">{message}</p>
      <button
        id="toast-close-btn"
        onClick={onClose}
        className="text-stone-400 hover:text-white p-1 ml-auto transition-colors"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
