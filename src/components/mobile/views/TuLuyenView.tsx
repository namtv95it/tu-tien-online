import React, { useState } from 'react';
import { useGameStore } from '../../../store/gameStore';
import { ASSETS, getAssetUrl } from '../../../utils/assets';
import { DESIGN_LAYOUT } from '../../../utils/designCoordinates';

export const TuLuyenView: React.FC = () => {
  const character = useGameStore((state) => state.character);
  const vanKhi = useGameStore((state) => state.vanKhi);
  const toggleBeQuan = useGameStore((state) => state.toggleBeQuan);
  const thamNgo = useGameStore((state) => state.thamNgo);
  const attemptBreakthrough = useGameStore((state) => state.attemptBreakthrough);
  const setNotification = useGameStore((state) => state.setNotification);

  const [floaters, setFloaters] = useState<{ id: number; x: number; y: number; text: string }[]>([]);

  const L = DESIGN_LAYOUT.tu_luyen;

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
    <div className="absolute inset-0 w-full h-full select-none text-slate-100 overflow-hidden">
      {/* 1. Background Scene (Already contains the scenic cave and meditating Daoist) */}
      <img
        src={ASSETS.backgrounds.tuLuyen}
        alt="Thiền Đường"
        className="absolute inset-0 w-full h-full object-cover object-top pointer-events-none"
      />

      {/* Floating Tu Vi numbers on tap */}
      {floaters.map((f) => (
        <div
          key={f.id}
          style={{ left: f.x, top: f.y }}
          className="absolute pointer-events-none z-50 font-bold text-xs text-amber-300 animate-out fade-out slide-out-to-top duration-700 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
        >
          ✨ {f.text}
        </div>
      ))}

      {/* 2. Tiêu Đề: Đài Tu Luyện */}
      <div
        style={{ left: L.tieu_de.left, top: L.tieu_de.top, width: L.tieu_de.width, height: L.tieu_de.height }}
        className="absolute z-20 pointer-events-none drop-shadow-md"
      >
        <img src={getAssetUrl(L.tieu_de.path)} alt="Đài Tu Luyện" className="w-full h-full object-contain" />
      </div>

      {/* 3. Interactive Cultivator Tap Hotspot (The Daoist is already painted in the background) */}
      <div
        onClick={handleCenterClick}
        style={{ left: L.nhan_vat_thien_dinh.left, top: L.nhan_vat_thien_dinh.top, width: L.nhan_vat_thien_dinh.width, height: L.nhan_vat_thien_dinh.height }}
        className="absolute z-20 cursor-pointer flex items-center justify-center group active:scale-95 transition rounded-full"
        title="Chạm vào Đạo Sĩ để Vận Khí Tụ Linh"
      >
        {/* Breathing aura when meditating */}
        {character.isMeditating && (
          <div className="w-48 h-48 rounded-full bg-cyan-400/20 blur-xl animate-pulse pointer-events-none" />
        )}
      </div>

      {/* 4. Khung Công Pháp */}
      <div
        style={{ left: L.khung_cong_phap.left, top: L.khung_cong_phap.top, width: L.khung_cong_phap.width, height: L.khung_cong_phap.height }}
        className="absolute z-20 drop-shadow-md pointer-events-none"
      >
        <img src={getAssetUrl(L.khung_cong_phap.path)} alt="Khung Công Pháp" className="w-full h-full object-fill" />
      </div>

      {/* Nút Đổi Công Pháp */}
      <button
        onClick={() => setNotification('Công pháp: Trường Xuân Công (Tăng hồi phục linh lực +15%/giây)')}
        style={{ left: L.nut_doi_cong_phap.left, top: L.nut_doi_cong_phap.top, width: L.nut_doi_cong_phap.width, height: L.nut_doi_cong_phap.height }}
        className="absolute z-25 p-0 bg-transparent border-0 cursor-pointer active:scale-95 transition group"
        title="Đổi công pháp"
      >
        <img
          src={getAssetUrl(L.nut_doi_cong_phap.path)}
          alt="Đổi công pháp"
          className="w-full h-full object-contain filter group-hover:brightness-110 drop-shadow"
        />
      </button>

      {/* 5. Khung Tu Vi Đột Phá */}
      <div
        style={{ left: L.khung_tu_vi_dot_pha.left, top: L.khung_tu_vi_dot_pha.top, width: L.khung_tu_vi_dot_pha.width, height: L.khung_tu_vi_dot_pha.height }}
        className="absolute z-20 drop-shadow-md pointer-events-none"
      >
        <img src={getAssetUrl(L.khung_tu_vi_dot_pha.path)} alt="Khung Tu Vi" className="w-full h-full object-fill" />
        {/* Dynamic progress bar fill */}
        <div className="absolute top-[32%] left-[17%] right-[32%] h-[26%] rounded-full overflow-hidden pointer-events-none">
          <div
            className="h-full bg-gradient-to-r from-emerald-400 via-cyan-300 to-amber-300 transition-all duration-300 shadow-[0_0_8px_rgba(56,189,248,0.7)]"
            style={{ width: `${cultivationPercent}%` }}
          />
        </div>
        {/* Cultivation numbers text */}
        <div className="absolute top-[28%] left-[18%] right-[33%] flex justify-between items-center text-[9px] text-slate-100 font-mono font-bold drop-shadow">
          <span>Luyện Khí tầng {character.realmLevel}</span>
          <span>{character.cultivation}/{character.cultivationThreshold} ({cultivationPercent}%)</span>
        </div>
      </div>

      {/* Nút Đột Phá Hotspot over the right side of Khung Tu Vi */}
      <button
        onClick={handleBreakthrough}
        style={{ left: '70%', top: L.khung_tu_vi_dot_pha.top, width: '24%', height: L.khung_tu_vi_dot_pha.height }}
        className="absolute z-25 cursor-pointer rounded-xl hover:bg-amber-400/20 active:scale-95 transition"
        title="Đột Phá Cảnh Giới"
      />

      {/* 6. Three Action Buttons: Bế quan, Vận khí, Tham ngộ */}
      <button
        onClick={toggleBeQuan}
        style={{ left: L.nut_be_quan.left, top: L.nut_be_quan.top, width: L.nut_be_quan.width, height: L.nut_be_quan.height }}
        className="absolute z-25 p-0 bg-transparent border-0 cursor-pointer active:scale-95 transition group"
        title="Bế Quan"
      >
        <img
          src={getAssetUrl(L.nut_be_quan.path)}
          alt="Bế Quan"
          className={`w-full h-full object-contain filter transition-all ${
            character.isMeditating
              ? 'drop-shadow-[0_0_14px_rgba(245,158,11,0.9)] brightness-115 scale-105'
              : 'group-hover:brightness-110 drop-shadow'
          }`}
        />
      </button>

      <button
        onClick={handleCenterClick}
        style={{ left: L.nut_van_khi.left, top: L.nut_van_khi.top, width: L.nut_van_khi.width, height: L.nut_van_khi.height }}
        className="absolute z-25 p-0 bg-transparent border-0 cursor-pointer active:scale-95 transition group"
        title="Vận Khí (+120 Tu Vi)"
      >
        <img
          src={getAssetUrl(L.nut_van_khi.path)}
          alt="Vận Khí"
          className="w-full h-full object-contain filter group-hover:brightness-110 group-hover:drop-shadow-[0_0_12px_rgba(56,189,248,0.7)] drop-shadow transition"
        />
      </button>

      <button
        onClick={thamNgo}
        style={{ left: L.nut_tham_ngo.left, top: L.nut_tham_ngo.top, width: L.nut_tham_ngo.width, height: L.nut_tham_ngo.height }}
        className="absolute z-25 p-0 bg-transparent border-0 cursor-pointer active:scale-95 transition group"
        title="Tham Ngộ (+350 Tu Vi)"
      >
        <img
          src={getAssetUrl(L.nut_tham_ngo.path)}
          alt="Tham Ngộ"
          className="w-full h-full object-contain filter group-hover:brightness-110 group-hover:drop-shadow-[0_0_12px_rgba(245,158,11,0.7)] drop-shadow transition"
        />
      </button>

      {/* 7. Khung Dự Kiến Thu Hoạch */}
      <div
        style={{ left: L.khung_du_kien.left, top: L.khung_du_kien.top, width: L.khung_du_kien.width, height: L.khung_du_kien.height }}
        className="absolute z-20 drop-shadow-md pointer-events-none"
      >
        <img src={getAssetUrl(L.khung_du_kien.path)} alt="Khung Dự Kiến" className="w-full h-full object-fill" />
      </div>

      <div
        style={{ left: L.dong_thu_hoach.left, top: L.dong_thu_hoach.top, width: L.dong_thu_hoach.width, height: L.dong_thu_hoach.height }}
        className="absolute z-25 pointer-events-none drop-shadow"
      >
        <img src={getAssetUrl(L.dong_thu_hoach.path)} alt="Dòng Thu Hoạch" className="w-full h-full object-contain" />
      </div>
    </div>
  );
};
