import React from 'react';
import { useGameStore } from '../../../store/gameStore';
import { ASSETS } from '../../../utils/assets';

export const DongPhuView: React.FC = () => {
  const setActiveTab = useGameStore((state) => state.setActiveTab);
  const setNotification = useGameStore((state) => state.setNotification);
  const character = useGameStore((state) => state.character);

  return (
    <div className="relative w-full aspect-[9/16] min-h-[700px] select-none text-slate-100 overflow-hidden shadow-inner">
      {/* 1. High-Res Clean Background */}
      <img
        src={ASSETS.backgrounds.dongPhu}
        alt="Động Phủ"
        className="absolute inset-0 w-full h-full object-cover object-top pointer-events-none"
      />

      {/* 2. Interactive Hotspot: Đài Tu Luyện (Pavilion top right) */}
      <button
        onClick={() => setActiveTab('tu-luyen')}
        className="absolute top-[20%] left-[45%] w-[32%] h-[12%] z-20 cursor-pointer rounded-2xl group transition-all"
        title="Vào Đài Tu Luyện"
      >
        <div className="w-full h-full rounded-2xl group-hover:bg-amber-400/20 group-hover:ring-1 group-hover:ring-amber-400/50 group-active:scale-95 transition" />
        {/* Ornate Nameplate */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 pointer-events-none opacity-90 group-hover:opacity-100 group-hover:scale-110 transition drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
          <img src={ASSETS.dongPhu.labels.daiTuLuyen} alt="Đài Tu Luyện" className="h-6 object-contain" />
        </div>
      </button>

      {/* 3. Interactive Hotspot: Phòng Luyện Đan (Mid-left building) */}
      <button
        onClick={() => setActiveTab('luyen-dan')}
        className="absolute top-[34%] left-[18%] w-[32%] h-[14%] z-20 cursor-pointer rounded-2xl group transition-all"
        title="Vào Phòng Luyện Đan"
      >
        <div className="w-full h-full rounded-2xl group-hover:bg-orange-500/20 group-hover:ring-1 group-hover:ring-orange-400/50 group-active:scale-95 transition" />
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 pointer-events-none opacity-90 group-hover:opacity-100 group-hover:scale-110 transition drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
          <img src={ASSETS.dongPhu.labels.phongLuyenDan} alt="Phòng Luyện Đan" className="h-6 object-contain" />
        </div>
      </button>

      {/* 4. Interactive Hotspot: Trận Tụ Linh (Right crystal array) */}
      <button
        onClick={() => setNotification('Trận Tụ Linh đang vận chuyển, linh khí xung quanh tăng +20%!')}
        className="absolute top-[34%] right-[8%] w-[26%] h-[14%] z-20 cursor-pointer rounded-full group transition-all"
        title="Trận Tụ Linh"
      >
        <div className="w-full h-full rounded-full group-hover:bg-cyan-400/20 group-hover:ring-1 group-hover:ring-cyan-300/50 group-active:scale-95 transition" />
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 pointer-events-none opacity-90 group-hover:opacity-100 group-hover:scale-110 transition drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
          <img src={ASSETS.dongPhu.labels.tranTuLinh} alt="Trận Tụ Linh" className="h-6 object-contain" />
        </div>
      </button>

      {/* 5. Interactive Hotspot: Kho Chứa (Lower-left hut) */}
      <button
        onClick={() => setNotification('Kho Chứa: Cất giữ an toàn 120/150 món bảo vật và thảo dược.')}
        className="absolute top-[49%] left-[6%] w-[28%] h-[14%] z-20 cursor-pointer rounded-2xl group transition-all"
        title="Kho Chứa"
      >
        <div className="w-full h-full rounded-2xl group-hover:bg-amber-600/20 group-hover:ring-1 group-hover:ring-amber-500/50 group-active:scale-95 transition" />
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 pointer-events-none opacity-90 group-hover:opacity-100 group-hover:scale-110 transition drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
          <img src={ASSETS.dongPhu.labels.khoChua} alt="Kho Chứa" className="h-6 object-contain" />
        </div>
      </button>

      {/* 6. Interactive Hotspot: Linh Điền (Mid-right herb plots) */}
      <button
        onClick={() => setActiveTab('linh-dien')}
        className="absolute top-[50%] right-[8%] w-[38%] h-[18%] z-20 cursor-pointer rounded-2xl group transition-all"
        title="Vào Vườn Linh Điền"
      >
        <div className="w-full h-full rounded-2xl group-hover:bg-emerald-500/20 group-hover:ring-1 group-hover:ring-emerald-400/50 group-active:scale-95 transition" />
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 pointer-events-none opacity-90 group-hover:opacity-100 group-hover:scale-110 transition drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
          <img src={ASSETS.dongPhu.labels.linhDien} alt="Linh Điền" className="h-6 object-contain" />
        </div>
      </button>

      {/* 7. Interactive Hotspot: Hồ Linh Ngư (Bottom left koi pond) */}
      <button
        onClick={() => setNotification('Hồ Linh Ngư: Đàn cá chép vàng bơi lội, tâm cảnh được thanh lọc +10!')}
        className="absolute bottom-[8%] left-[14%] w-[36%] h-[12%] z-20 cursor-pointer rounded-full group transition-all"
        title="Hồ Linh Ngư"
      >
        <div className="w-full h-full rounded-full group-hover:bg-cyan-500/20 group-hover:ring-1 group-hover:ring-cyan-400/50 group-active:scale-95 transition" />
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 pointer-events-none opacity-90 group-hover:opacity-100 group-hover:scale-110 transition drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
          <img src={ASSETS.dongPhu.labels.hoLinhNgu} alt="Hồ Linh Ngư" className="h-6 object-contain" />
        </div>
      </button>

      {/* 8. Quest Notice Banner click */}
      <div
        onClick={() => setNotification(`Nhiệm vụ: Tu luyện đến Luyện Khí tầng 3 (Hiện tại: tầng ${character.realmLevel})`)}
        className="absolute top-[12%] left-[4%] w-[42%] h-[12%] z-20 cursor-pointer hover:opacity-90 active:scale-95 transition"
        title="Nhiệm vụ Tông Môn"
      />
    </div>
  );
};
