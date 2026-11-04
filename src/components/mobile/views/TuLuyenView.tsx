import React, { useState } from 'react';
import { useGameStore } from '../../../store/gameStore';

export const TuLuyenView: React.FC = () => {
  const character = useGameStore((state) => state.character);
  const vanKhi = useGameStore((state) => state.vanKhi);
  const toggleBeQuan = useGameStore((state) => state.toggleBeQuan);
  const thamNgo = useGameStore((state) => state.thamNgo);
  const attemptBreakthrough = useGameStore((state) => state.attemptBreakthrough);
  const setNotification = useGameStore((state) => state.setNotification);

  const [floaters, setFloaters] = useState<{ id: number; x: number; y: number; text: string }[]>([]);

  const handleCenterClick = (e: React.MouseEvent<HTMLDivElement>) => {
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
      {/* 1. High-Res Design Artwork Background */}
      <img
        src={`${import.meta.env.BASE_URL}design/tu-luyen.png`}
        alt="Tu Luyện"
        className="absolute inset-0 w-full h-full object-cover object-top pointer-events-none"
      />

      {/* Floating Tu Vi numbers on tap */}
      {floaters.map((f) => (
        <div
          key={f.id}
          style={{ left: f.x, top: f.y }}
          className="absolute pointer-events-none z-30 font-bold text-xs text-amber-300 animate-out fade-out slide-out-to-top duration-700 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
        >
          ✨ {f.text}
        </div>
      ))}

      {/* 2. Interactive Hotspot: Meditating Daoist in the Center */}
      <div
        onClick={handleCenterClick}
        className="absolute top-[18%] left-[25%] right-[25%] h-[28%] z-10 cursor-pointer rounded-full hover:bg-amber-400/10 active:scale-95 transition"
        title="Chạm vào Đạo Sĩ để Vận Khí Tụ Linh"
      />

      {/* 3. Interactive Hotspot: "Đổi công pháp >" */}
      <button
        onClick={() => setNotification('Công pháp Trường Xuân Công: Bền bỉ hồi phục, tăng trưởng điều hòa.')}
        className="absolute top-[49%] right-[8%] z-20 px-3 py-1 text-[11px] font-bold text-amber-200 hover:text-white rounded-full bg-slate-900/60 border border-amber-500/30 backdrop-blur active:scale-95"
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
        className="absolute top-[62.5%] right-[8%] z-20 w-[42%] h-[5%] rounded-full opacity-0 hover:opacity-20 bg-amber-400 cursor-pointer active:scale-95"
        title="Đột phá cảnh giới"
      />

      {/* 6. Three Action Buttons: Bế quan, Vận khí, Tham ngộ */}
      <div className="absolute top-[69%] left-[5%] right-[5%] h-[16%] z-20 flex justify-between items-center">
        {/* Bế quan button */}
        <div
          onClick={toggleBeQuan}
          className="w-[30%] h-full cursor-pointer rounded-2xl hover:bg-amber-400/15 active:scale-95 transition flex flex-col justify-end items-center pb-1 text-center"
          title="Bế quan tu luyện liên tục"
        >
          <span className="text-[10px] font-bold text-amber-300">
            {character.isMeditating ? 'Đang Bế Quan' : 'Bế Quan'}
          </span>
        </div>

        {/* Vận khí button */}
        <div
          onClick={handleCenterClick}
          className="w-[30%] h-full cursor-pointer rounded-2xl hover:bg-cyan-400/15 active:scale-95 transition flex flex-col justify-end items-center pb-1 text-center"
          title="Vận khí hấp thu linh khí"
        >
          <span className="text-[10px] font-bold text-cyan-300">Vận Khí (+120)</span>
        </div>

        {/* Tham ngộ button */}
        <div
          onClick={thamNgo}
          className="w-[30%] h-full cursor-pointer rounded-2xl hover:bg-amber-400/15 active:scale-95 transition flex flex-col justify-end items-center pb-1 text-center"
          title="Tham ngộ đạo lý công pháp"
        >
          <span className="text-[10px] font-bold text-amber-300">Tham Ngộ (+350)</span>
        </div>
      </div>
    </div>
  );
};
