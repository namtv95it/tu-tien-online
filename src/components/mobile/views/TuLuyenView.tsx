import React, { useState } from 'react';
import { useGameStore } from '../../../store/gameStore';
import { ASSETS } from '../../../utils/assets';

export const TuLuyenView: React.FC = () => {
  const character = useGameStore((state) => state.character);
  const vanKhi = useGameStore((state) => state.vanKhi);
  const toggleBeQuan = useGameStore((state) => state.toggleBeQuan);
  const thamNgo = useGameStore((state) => state.thamNgo);
  const attemptBreakthrough = useGameStore((state) => state.attemptBreakthrough);
  const setNotification = useGameStore((state) => state.setNotification);

  const [floaters, setFloaters] = useState<{ id: number; x: number; y: number; text: string }[]>([]);

  const handleCenterClick = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    vanKhi();

    const id = Date.now() + Math.random();
    setFloaters((prev) => [...prev, { id, x, y, text: '+120 Tu Vi' }]);
    setTimeout(() => {
      setFloaters((prev) => prev.filter((f) => f.id !== id));
    }, 800);
  };

  const handleBreakthrough = () => {
    const res = attemptBreakthrough();
    setNotification(res.message);
  };

  const cultivationPercent = Math.min(
    100,
    Math.floor((character.cultivation / character.cultivationThreshold) * 100)
  );

  return (
    <div className="relative w-full aspect-[9/16] min-h-[700px] select-none text-slate-100 overflow-hidden shadow-inner">
      {/* 1. High-Res Clean Background */}
      <img
        src={ASSETS.backgrounds.tuLuyen}
        alt="Tu Luyện"
        className="absolute inset-0 w-full h-full object-cover object-top pointer-events-none"
      />

      {/* Floating Tu Vi numbers on tap */}
      {floaters.map((f) => (
        <div
          key={f.id}
          style={{ left: f.x, top: f.y }}
          className="absolute pointer-events-none z-40 font-bold text-xs text-amber-300 animate-out fade-out slide-out-to-top duration-700 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
        >
          ✨ {f.text}
        </div>
      ))}

      {/* 2. Meditating Daoist Sprite & Aura Effects */}
      <div
        onClick={handleCenterClick}
        className="absolute top-[18%] left-[24%] right-[24%] h-[28%] z-10 cursor-pointer flex items-center justify-center group active:scale-95 transition"
        title="Chạm vào Đạo Sĩ để Vận Khí Tụ Linh"
      >
        {/* Subtle Qi aura glow when meditating */}
        {character.isMeditating && (
          <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-xl animate-pulse pointer-events-none" />
        )}
      </div>

      {/* 3. Interactive Hotspot: "Đổi công pháp >" */}
      <button
        onClick={() => setNotification('Công pháp: Trường Xuân Công (Tăng hồi phục linh lực +15%/giây)')}
        className="absolute top-[49%] right-[8%] z-20 px-3 py-1 text-[11px] font-bold text-amber-200 hover:text-white rounded-full bg-slate-900/60 border border-amber-500/30 backdrop-blur active:scale-95 transition hover:border-amber-400"
      >
        Đổi công pháp &gt;
      </button>

      {/* 4. Live Tu Vi Progress Overlay */}
      <div className="absolute top-[57%] left-[10%] right-[10%] z-20 flex justify-between items-center text-[10px] text-slate-200 font-mono">
        <span className="font-bold text-cyan-200">Luyện Khí tầng {character.realmLevel}</span>
        <span>{character.cultivation.toLocaleString()} / {character.cultivationThreshold.toLocaleString()}</span>
      </div>
      <div className="absolute top-[59.5%] left-[10%] right-[10%] h-1.5 z-20 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-emerald-400 via-cyan-300 to-amber-300 transition-all duration-300"
          style={{ width: `${cultivationPercent}%` }}
        />
      </div>

      {/* 5. Breakthrough Button Hotspot */}
      <button
        onClick={handleBreakthrough}
        className="absolute top-[62.5%] right-[8%] z-20 w-[42%] h-[5%] rounded-full opacity-0 hover:opacity-20 bg-amber-400 cursor-pointer active:scale-95 transition"
        title="Đột phá cảnh giới"
      />

      {/* 6. Three Action Buttons: Bế quan, Vận khí, Tham ngộ */}
      <div className="absolute top-[69%] left-[6%] right-[6%] h-[16%] z-20 flex justify-between items-center">
        {/* Bế quan button */}
        <button
          onClick={toggleBeQuan}
          className="w-[30%] h-full flex flex-col items-center justify-center p-0 bg-transparent border-0 cursor-pointer active:scale-95 transition group"
          title="Bế quan tu luyện liên tục"
        >
          <img
            src={ASSETS.tuLuyen.nutBeQuan}
            alt="Bế Quan"
            className={`w-full h-full object-contain filter transition-all ${
              character.isMeditating
                ? 'drop-shadow-[0_0_12px_rgba(245,158,11,0.8)] brightness-110'
                : 'opacity-90 group-hover:opacity-100 group-hover:brightness-105'
            }`}
          />
        </button>

        {/* Vận khí button */}
        <button
          onClick={handleCenterClick}
          className="w-[30%] h-full flex flex-col items-center justify-center p-0 bg-transparent border-0 cursor-pointer active:scale-95 transition group"
          title="Vận khí hấp thu linh khí (+120 Tu Vi)"
        >
          <img
            src={ASSETS.tuLuyen.nutVanKhi}
            alt="Vận Khí"
            className="w-full h-full object-contain opacity-90 group-hover:opacity-100 group-hover:brightness-105 transition-all group-hover:drop-shadow-[0_0_10px_rgba(56,189,248,0.6)]"
          />
        </button>

        {/* Tham ngộ button */}
        <button
          onClick={thamNgo}
          className="w-[30%] h-full flex flex-col items-center justify-center p-0 bg-transparent border-0 cursor-pointer active:scale-95 transition group"
          title="Tham ngộ đạo lý công pháp (+350 Tu Vi)"
        >
          <img
            src={ASSETS.tuLuyen.nutThamNgo}
            alt="Tham Ngộ"
            className="w-full h-full object-contain opacity-90 group-hover:opacity-100 group-hover:brightness-105 transition-all group-hover:drop-shadow-[0_0_10px_rgba(245,158,11,0.6)]"
          />
        </button>
      </div>
    </div>
  );
};
