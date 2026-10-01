import React from 'react';
import { Sparkles } from 'lucide-react';

interface ToastNotificationProps {
  message: string | null;
}

export const ToastNotification: React.FC<ToastNotificationProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div
      id="global-toast-notification"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-slate-900/95 border border-indigo-500/40 text-xs font-semibold text-slate-100 shadow-2xl backdrop-blur-md animate-fade-in"
    >
      <Sparkles className="w-4 h-4 text-indigo-400" />
      <span>{message}</span>
    </div>
  );
};
