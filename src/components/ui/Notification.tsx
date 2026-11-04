import React from 'react';
import { useGameStore } from '../../store/gameStore';
import { Sparkles } from 'lucide-react';

export const Notification: React.FC = () => {
  const notification = useGameStore((state) => state.notification);

  if (!notification) return null;

  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none animate-in fade-in slide-in-from-top-4 duration-300">
      <div className="xianxia-panel border-yellow-500/60 text-yellow-200 px-5 py-2.5 rounded-full shadow-2xl flex items-center gap-2 text-xs md:text-sm font-medium tracking-wide">
        <Sparkles className="w-4 h-4 text-yellow-400 animate-spin" />
        <span>{notification}</span>
      </div>
    </div>
  );
};

