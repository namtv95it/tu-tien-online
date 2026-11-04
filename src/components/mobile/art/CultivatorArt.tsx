import React from 'react';

interface CultivatorArtProps {
  isMeditating: boolean;
  realmName: string;
}

export const CultivatorArt: React.FC<CultivatorArtProps> = ({ isMeditating }) => {
  return (
    <div className="relative w-56 h-56 flex items-center justify-center select-none pointer-events-none">
      {/* 1. Outer Rotating Bagua / Runes Formation */}
      <div className={`absolute inset-0 flex items-center justify-center ${isMeditating ? 'animate-spin-slow' : 'opacity-30'}`}>
        <svg className="w-56 h-56 text-amber-500/30" viewBox="0 0 200 200" fill="none">
          {/* Outer runic ring */}
          <circle cx="100" cy="100" r="95" stroke="currentColor" strokeWidth="1" strokeDasharray="6 3" />
          <circle cx="100" cy="100" r="88" stroke="currentColor" strokeWidth="0.8" />
          {/* 8 Bagua trigram marks around ring */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <g key={i} transform={`rotate(${angle} 100 100)`}>
              <line x1="94" y1="8" x2="106" y2="8" stroke="currentColor" strokeWidth="1.5" />
              <line x1="94" y1="12" x2="106" y2="12" stroke="currentColor" strokeWidth="1.5" />
              <line x1="94" y1="16" x2="106" y2="16" stroke="currentColor" strokeWidth="1.5" />
            </g>
          ))}
        </svg>
      </div>

      {/* 2. Inner Reverse-rotating Rune Circle */}
      {isMeditating && (
        <div className="absolute inset-4 flex items-center justify-center animate-spin-reverse">
          <svg className="w-48 h-48 text-cyan-400/25" viewBox="0 0 200 200" fill="none">
            <circle cx="100" cy="100" r="82" stroke="currentColor" strokeWidth="1" strokeDasharray="3 4" />
            <polygon points="100,20 180,140 20,140" stroke="currentColor" strokeWidth="0.75" />
            <polygon points="100,180 180,60 20,60" stroke="currentColor" strokeWidth="0.75" />
          </svg>
        </div>
      )}

      {/* 3. Lotus Spiritual Pedestal */}
      <div className="absolute bottom-4 flex items-center justify-center">
        <svg className="w-36 h-12 text-amber-600/70" viewBox="0 0 120 40" fill="none">
          {/* Central Lotus Petals */}
          <ellipse cx="60" cy="30" rx="55" ry="8" fill="rgba(15, 23, 42, 0.9)" stroke="rgba(245, 158, 11, 0.6)" strokeWidth="1.5" />
          {/* Petal curves */}
          <path d="M20,30 Q40,15 60,28 Q80,15 100,30" stroke="rgba(245, 158, 11, 0.7)" strokeWidth="1.5" fill="none" />
          <path d="M40,28 Q60,10 80,28" stroke="rgba(56, 189, 248, 0.7)" strokeWidth="1.5" fill="none" />
          <path d="M50,26 Q60,6 70,26" stroke="rgba(253, 230, 138, 0.9)" strokeWidth="1.5" fill="rgba(245, 158, 11, 0.15)" />
        </svg>
      </div>

      {/* 4. Cultivator Silhouette with Daoist Robes & Hair Bun */}
      <div className={`relative z-10 flex flex-col items-center ${isMeditating ? 'animate-float' : ''}`}>
        {/* Spiritual Dan Tian Core Glow */}
        {isMeditating && (
          <div className="absolute top-16 w-14 h-14 rounded-full bg-cyan-400/30 blur-xl animate-pulse-glow" />
        )}

        <svg className="w-28 h-36" viewBox="0 0 100 130" fill="none">
          <defs>
            <linearGradient id="robeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="50%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#020617" />
            </linearGradient>
            <linearGradient id="trimGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="50%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
            <linearGradient id="skinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fed7aa" />
              <stop offset="100%" stopColor="#fbcfe8" />
            </linearGradient>
          </defs>

          {/* Hair Bun & Wooden Pin */}
          <ellipse cx="50" cy="18" rx="7" ry="6" fill="#090d16" />
          <line x1="38" y1="16" x2="62" y2="17" stroke="#b45309" strokeWidth="2" strokeLinecap="round" />

          {/* Head */}
          <circle cx="50" cy="27" r="11" fill="url(#skinGrad)" />
          {/* Hair contour */}
          <path d="M39,26 C40,18 60,18 61,26 C61,22 57,20 50,20 C43,20 39,22 39,26 Z" fill="#090d16" />

          {/* Daoist Robe Torso */}
          <path
            d="M50,38 L32,55 L25,95 L40,105 L60,105 L75,95 L68,55 Z"
            fill="url(#robeGrad)"
            stroke="url(#trimGrad)"
            strokeWidth="1.2"
          />

          {/* Crossed Arms / Hands in Dantian mudra */}
          <ellipse cx="50" cy="74" rx="14" ry="7" fill="#0f172a" stroke="rgba(56, 189, 248, 0.4)" strokeWidth="1" />
          <circle cx="50" cy="74" r="4" fill="url(#skinGrad)" />

          {/* Lotus Crossed Legs (Lower Robe) */}
          <ellipse cx="50" cy="108" rx="38" ry="14" fill="#0f172a" stroke="rgba(245, 158, 11, 0.4)" strokeWidth="1.2" />
          <path d="M22,108 Q50,96 78,108" stroke="rgba(245, 158, 11, 0.5)" strokeWidth="1" fill="none" />

          {/* Glowing Dan Tian Core Orb */}
          {isMeditating && (
            <circle cx="50" cy="74" r="6" fill="#38bdf8" opacity="0.8" className="animate-pulse" />
          )}
        </svg>
      </div>
    </div>
  );
};
