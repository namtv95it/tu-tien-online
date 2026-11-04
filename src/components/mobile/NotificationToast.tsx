import React from 'react';
import { useGameStore } from '../../store/gameStore';
import { Sparkles } from 'lucide-react';

export const NotificationToast: React.FC = () => {
  const notification = useGameStore((state) => state.notification);

  if (!notification) return null;

  return (
    <div className="fixed top-16 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none w-[90%] max-w-sm animate-in fade-in slide-in-from-top-3 duration-200">
      <div className="bg-[#101927]/95 border border-yellow-500/80 text-yellow-200 px-4 py-2 rounded-full shadow-2xl flex items-center justify-center gap-2 text-xs font-semibold text-center backdrop-blur">
        <Sparkles className="w-3.5 h-3.5 text-yellow-400 shrink-0 animate-spin" />
        <span className="truncate">{notification}</span>
      </div>
    </div>
  );
};
