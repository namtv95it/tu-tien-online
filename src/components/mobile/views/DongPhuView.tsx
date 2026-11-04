import React from 'react';
import { useGameStore } from '../../../store/gameStore';
import { ASSETS } from '../../../utils/assets';

export const DongPhuView: React.FC = () => {
  const setActiveTab = useGameStore((state) => state.setActiveTab);
  const setNotification = useGameStore((state) => state.setNotification);
  const character = useGameStore((state) => state.character);

  return (
    <div className="absolute inset-0 w-full h-full select-none text-slate-100 overflow-hidden">
      {/* 1. High-Res Clean Background */}
      <img
        src={ASSETS.backgrounds.dongPhu}
        alt="Động Phủ Tiên Gia"
        className="absolute inset-0 w-full h-full object-cover object-top pointer-events-none"
      />

      {/* 2. Khung Nhiệm Vụ (Top-Left) */}
      <div
        onClick={() => setNotification(`Nhiệm vụ chính: Tu luyện đến Luyện Khí tầng 3 (Hiện tại: tầng ${character.realmLevel})`)}
        style={{ left: '0.85%', top: '9.45%', width: '32.09%', height: '14.23%' }}
        className="absolute z-20 cursor-pointer hover:scale-105 active:scale-95 transition drop-shadow-md"
        title="Nhiệm Vụ Động Phủ"
      >
        <img src={ASSETS.ui.bangNhiemVu} alt="Bảng Nhiệm Vụ" className="w-full h-full object-contain" />
      </div>

      {/* 3. Banner Sự Kiện (Under Mission Box) */}
      <div
        onClick={() => setNotification('Sự kiện: Thất Tịch Thưởng Trăng - Tăng 20% tốc độ tu luyện!')}
        style={{ left: '0.85%', top: '23.74%', width: '29.97%', height: '6.46%' }}
        className="absolute z-20 cursor-pointer hover:scale-105 active:scale-95 transition drop-shadow-md"
        title="Sự Kiện"
      >
        <img src={ASSETS.ui.bannerSuKien} alt="Banner Sự Kiện" className="w-full h-full object-contain" />
      </div>

      {/* 4. Interactive Hotspot: Đài Tu Luyện (Pavilion top right) */}
      <button
        onClick={() => setActiveTab('tu-luyen')}
        className="absolute top-[18%] left-[44%] w-[38%] h-[15%] z-20 cursor-pointer rounded-2xl group transition-all p-0 bg-transparent border-0"
        title="Vào Đài Tu Luyện"
      >
        <div className="w-full h-full rounded-2xl group-hover:bg-amber-400/20 group-hover:ring-2 group-hover:ring-amber-400/50 group-active:scale-95 transition flex items-center justify-center">
          {/* Ornate Nameplate */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 pointer-events-none opacity-90 group-hover:opacity-100 group-hover:scale-110 transition drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            <img src={ASSETS.dongPhu.labels.daiTuLuyen} alt="Đài Tu Luyện" className="h-7 object-contain" />
          </div>
        </div>
      </button>

      {/* 5. Interactive Hotspot: Phòng Luyện Đan (Mid-left building) */}
      <button
        onClick={() => setActiveTab('luyen-dan')}
        className="absolute top-[34%] left-[16%] w-[34%] h-[15%] z-20 cursor-pointer rounded-2xl group transition-all p-0 bg-transparent border-0"
        title="Vào Phòng Luyện Đan"
      >
        <div className="w-full h-full rounded-2xl group-hover:bg-orange-500/20 group-hover:ring-2 group-hover:ring-orange-400/50 group-active:scale-95 transition flex items-center justify-center">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 pointer-events-none opacity-90 group-hover:opacity-100 group-hover:scale-110 transition drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            <img src={ASSETS.dongPhu.labels.phongLuyenDan} alt="Phòng Luyện Đan" className="h-7 object-contain" />
          </div>
        </div>
      </button>

      {/* 6. Interactive Hotspot: Trận Tụ Linh (Right crystal array) */}
      <button
        onClick={() => setNotification('Trận Tụ Linh đang vận chuyển, linh khí xung quanh tăng +20%!')}
        className="absolute top-[34%] right-[6%] w-[28%] h-[15%] z-20 cursor-pointer rounded-full group transition-all p-0 bg-transparent border-0"
        title="Trận Tụ Linh"
      >
        <div className="w-full h-full rounded-full group-hover:bg-cyan-400/20 group-hover:ring-2 group-hover:ring-cyan-300/50 group-active:scale-95 transition flex items-center justify-center">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 pointer-events-none opacity-90 group-hover:opacity-100 group-hover:scale-110 transition drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            <img src={ASSETS.dongPhu.labels.tranTuLinh} alt="Trận Tụ Linh" className="h-7 object-contain" />
          </div>
        </div>
      </button>

      {/* 7. Interactive Hotspot: Kho Chứa (Lower-left hut) */}
      <button
        onClick={() => setNotification('Kho Chứa: Cất giữ an toàn 120/150 món bảo vật và thảo dược.')}
        className="absolute top-[49%] left-[5%] w-[30%] h-[15%] z-20 cursor-pointer rounded-2xl group transition-all p-0 bg-transparent border-0"
        title="Kho Chứa"
      >
        <div className="w-full h-full rounded-2xl group-hover:bg-amber-600/20 group-hover:ring-2 group-hover:ring-amber-500/50 group-active:scale-95 transition flex items-center justify-center">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 pointer-events-none opacity-90 group-hover:opacity-100 group-hover:scale-110 transition drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            <img src={ASSETS.dongPhu.labels.khoChua} alt="Kho Chứa" className="h-7 object-contain" />
          </div>
        </div>
      </button>

      {/* 8. Interactive Hotspot: Linh Điền (Mid-right herb plots) */}
      <button
        onClick={() => setActiveTab('linh-dien')}
        className="absolute top-[50%] right-[6%] w-[40%] h-[18%] z-20 cursor-pointer rounded-2xl group transition-all p-0 bg-transparent border-0"
        title="Vào Vườn Linh Điền"
      >
        <div className="w-full h-full rounded-2xl group-hover:bg-emerald-500/20 group-hover:ring-2 group-hover:ring-emerald-400/50 group-active:scale-95 transition flex items-center justify-center">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 pointer-events-none opacity-90 group-hover:opacity-100 group-hover:scale-110 transition drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            <img src={ASSETS.dongPhu.labels.linhDien} alt="Linh Điền" className="h-7 object-contain" />
          </div>
        </div>
      </button>

      {/* 9. Interactive Hotspot: Hồ Linh Ngư (Bottom left koi pond) */}
      <button
        onClick={() => setNotification('Hồ Linh Ngư: Đàn cá chép vàng bơi lội, tâm cảnh được thanh lọc +10!')}
        className="absolute bottom-[13%] left-[12%] w-[38%] h-[13%] z-20 cursor-pointer rounded-full group transition-all p-0 bg-transparent border-0"
        title="Hồ Linh Ngư"
      >
        <div className="w-full h-full rounded-full group-hover:bg-cyan-500/20 group-hover:ring-2 group-hover:ring-cyan-400/50 group-active:scale-95 transition flex items-center justify-center">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 pointer-events-none opacity-90 group-hover:opacity-100 group-hover:scale-110 transition drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            <img src={ASSETS.dongPhu.labels.hoLinhNgu} alt="Hồ Linh Ngư" className="h-7 object-contain" />
          </div>
        </div>
      </button>
    </div>
  );
};
