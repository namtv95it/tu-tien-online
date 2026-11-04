import React from 'react';

interface XianxiaFrameProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'gold' | 'cyan' | 'default';
}

export const XianxiaFrame: React.FC<XianxiaFrameProps> = ({
  children,
  className = '',
  variant = 'default',
}) => {
  const borderColor =
    variant === 'gold'
      ? 'border-amber-500/50'
      : variant === 'cyan'
      ? 'border-cyan-500/50'
      : 'border-yellow-600/30';

  const cornerColor =
    variant === 'gold'
      ? 'text-amber-400'
      : variant === 'cyan'
      ? 'text-cyan-400'
      : 'text-amber-500/80';

  return (
    <div className={`relative xianxia-card rounded-xl p-3.5 border ${borderColor} ${className}`}>
      {/* 4 Traditional Chinese Ornamental Corners */}
      <svg className={`absolute top-1 left-1 w-3.5 h-3.5 ${cornerColor} pointer-events-none`} viewBox="0 0 20 20" fill="none">
        <path d="M2,18 L2,4 C2,2.8 2.8,2 4,2 L18,2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="5" cy="5" r="1.5" fill="currentColor" />
      </svg>
      <svg className={`absolute top-1 right-1 w-3.5 h-3.5 ${cornerColor} pointer-events-none`} viewBox="0 0 20 20" fill="none">
        <path d="M18,18 L18,4 C18,2.8 17.2,2 16,2 L2,2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="15" cy="5" r="1.5" fill="currentColor" />
      </svg>
      <svg className={`absolute bottom-1 left-1 w-3.5 h-3.5 ${cornerColor} pointer-events-none`} viewBox="0 0 20 20" fill="none">
        <path d="M2,2 L2,16 C2,17.2 2.8,18 4,18 L18,18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="5" cy="15" r="1.5" fill="currentColor" />
      </svg>
      <svg className={`absolute bottom-1 right-1 w-3.5 h-3.5 ${cornerColor} pointer-events-none`} viewBox="0 0 20 20" fill="none">
        <path d="M18,2 L18,16 C18,17.2 17.2,18 16,18 L2,18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="15" cy="15" r="1.5" fill="currentColor" />
      </svg>

      {children}
    </div>
  );
};
