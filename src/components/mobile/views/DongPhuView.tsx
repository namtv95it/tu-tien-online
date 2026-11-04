import React from 'react';
import { useGameStore } from '../../../store/gameStore';

export const DongPhuView: React.FC = () => {
  const setActiveTab = useGameStore((state) => state.setActiveTab);
  const setNotification = useGameStore((state) => state.setNotification);

  return (
    <div className="relative w-full aspect-[9/16] min-h-[700px] select-none text-slate-100 overflow-hidden shadow-inner">
      {/* 1. High-Res Design Artwork Background */}
      <img
        src={`${import.meta.env.BASE_URL}design/dong-phu.png`}
        alt="Động Phủ"
        className="absolute inset-0 w-full h-full object-cover object-top pointer-events-none"
      />

      {/* 2. Interactive Hotspot: Đài Tu Luyện (Pavilion top right) */}
      <button
        onClick={() => setActiveTab('tu-luyen')}
        className="absolute top-[20%] left-[45%] w-[32%] h-[12%] z-20 cursor-pointer rounded-2xl hover:bg-amber-400/20 active:scale-95 transition"
        title="Vào Đài Tu Luyện"
      />

      {/* 3. Interactive Hotspot: Phòng Luyện Đan (Mid-left building) */}
      <button
        onClick={() => setActiveTab('luyen-dan')}
        className="absolute top-[34%] left-[18%] w-[32%] h-[14%] z-20 cursor-pointer rounded-2xl hover:bg-orange-500/20 active:scale-95 transition"
        title="Vào Phòng Luyện Đan"
      />

      {/* 4. Interactive Hotspot: Trận Tụ Linh (Right crystal array) */}
      <button
        onClick={() => setNotification('Trận Tụ Linh đang vận chuyển, linh khí xung quanh tăng +20%!')}
        className="absolute top-[34%] right-[8%] w-[26%] h-[14%] z-20 cursor-pointer rounded-full hover:bg-cyan-400/20 active:scale-95 transition"
        title="Trận Tụ Linh"
      />

      {/* 5. Interactive Hotspot: Kho Chứa (Lower-left hut) */}
      <button
        onClick={() => setNotification('Kho Chứa: Cất giữ an toàn 120/150 món bảo vật và thảo dược.')}
        className="absolute top-[49%] left-[6%] w-[28%] h-[14%] z-20 cursor-pointer rounded-2xl hover:bg-amber-600/20 active:scale-95 transition"
        title="Kho Chứa"
      />

      {/* 6. Interactive Hotspot: Linh Điền (Mid-right herb plots) */}
      <button
        onClick={() => setActiveTab('linh-dien')}
        className="absolute top-[50%] right-[8%] w-[38%] h-[18%] z-20 cursor-pointer rounded-2xl hover:bg-emerald-500/20 active:scale-95 transition"
        title="Vào Vườn Linh Điền"
      />

      {/* 7. Interactive Hotspot: Hồ Linh Ngư (Bottom left koi pond) */}
      <button
        onClick={() => setNotification('Hồ Linh Ngư: Đàn cá chép vàng bơi lội, tâm cảnh được thanh lọc +10!')}
        className="absolute bottom-[8%] left-[14%] w-[36%] h-[12%] z-20 cursor-pointer rounded-full hover:bg-cyan-500/20 active:scale-95 transition"
        title="Hồ Linh Ngư"
      />

      {/* 8. Mission Box click */}
      <div
        onClick={() => setNotification('Nhiệm vụ chính: Tu luyện đến Luyện Khí tầng 3 (tiến độ 2/3)')}
        className="absolute top-[12%] left-[4%] w-[42%] h-[12%] z-20 cursor-pointer"
      />
    </div>
  );
};
