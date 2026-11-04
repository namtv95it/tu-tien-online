import React, { useState } from 'react';
import { useGameStore } from '../../../store/gameStore';
import { ASSETS } from '../../../utils/assets';

export const LuyenDanView: React.FC = () => {
  const selectedRecipeId = useGameStore((state) => state.selectedRecipeId);
  const setSelectedRecipe = useGameStore((state) => state.setSelectedRecipe);
  const fireIntensity = useGameStore((state) => state.fireIntensity);
  const setFireIntensity = useGameStore((state) => state.setFireIntensity);
  const alchemyBatchCount = useGameStore((state) => state.alchemyBatchCount);
  const setAlchemyBatchCount = useGameStore((state) => state.setAlchemyBatchCount);
  const startAlchemy = useGameStore((state) => state.startAlchemy);

  const [brewing, setBrewing] = useState(false);

  const handleStartAlchemy = () => {
    setBrewing(true);
    startAlchemy();
    setTimeout(() => setBrewing(false), 1500);
  };

  return (
    <div className="relative w-full aspect-[9/16] min-h-[700px] select-none text-slate-100 overflow-hidden shadow-inner">
      {/* 1. High-Res Clean Background */}
      <img
        src={ASSETS.backgrounds.luyenDan}
        alt="Luyện Đan"
        className="absolute inset-0 w-full h-full object-cover object-top pointer-events-none"
      />

      {/* 2. Left Recipe Selector Hotspots */}
      <div className="absolute top-[12%] left-[2%] w-[25%] h-[24%] z-20 flex flex-col justify-between">
        <button
          onClick={() => setSelectedRecipe('tu_khi_dan')}
          className={`h-[18%] w-full rounded cursor-pointer transition ${
            selectedRecipeId === 'tu_khi_dan' ? 'ring-2 ring-amber-400 bg-amber-400/20 shadow-[0_0_8px_rgba(245,158,11,0.5)]' : 'hover:bg-amber-400/10'
          }`}
          title="Tụ Khí Đan"
        />
        <button
          onClick={() => setSelectedRecipe('trang_the_dan')}
          className={`h-[18%] w-full rounded cursor-pointer transition ${
            selectedRecipeId === 'trang_the_dan' ? 'ring-2 ring-cyan-400 bg-cyan-400/20 shadow-[0_0_8px_rgba(56,189,248,0.5)]' : 'hover:bg-cyan-400/10'
          }`}
          title="Tráng Thể Đan"
        />
        <button
          onClick={() => setSelectedRecipe('thanh_tam_dan')}
          className={`h-[18%] w-full rounded cursor-pointer transition ${
            selectedRecipeId === 'thanh_tam_dan' ? 'ring-2 ring-emerald-400 bg-emerald-400/20 shadow-[0_0_8px_rgba(52,211,153,0.5)]' : 'hover:bg-emerald-400/10'
          }`}
          title="Thanh Tâm Đan"
        />
      </div>

      {/* Brewing Aura Effect over Furnace */}
      {brewing && (
        <div className="absolute top-[38%] left-[36%] w-[28%] h-[20%] z-25 pointer-events-none flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-orange-500/30 blur-2xl animate-ping" />
        </div>
      )}

      {/* 3. Fire Intensity Control Hotspots */}
      <div className="absolute top-[69%] left-[30%] right-[30%] h-[4%] z-20 flex items-center justify-between">
        {/* Decrease fire button */}
        <button
          onClick={() => setFireIntensity(fireIntensity - 1)}
          className="w-8 h-8 rounded-full opacity-0 hover:opacity-25 bg-amber-400 cursor-pointer active:scale-90 transition"
          title="Giảm Cường Độ Lửa"
        />
        {/* Increase fire button */}
        <button
          onClick={() => setFireIntensity(fireIntensity + 1)}
          className="w-8 h-8 rounded-full opacity-0 hover:opacity-25 bg-orange-500 cursor-pointer active:scale-90 transition"
          title="Tăng Cường Độ Lửa"
        />
      </div>

      {/* 4. Batch Count Control Hotspots */}
      <div className="absolute bottom-[8%] right-[4%] w-[28%] h-[5%] z-20 flex items-center justify-between">
        <button
          onClick={() => setAlchemyBatchCount(alchemyBatchCount - 1)}
          className="w-7 h-7 rounded-full opacity-0 hover:opacity-25 bg-amber-400 cursor-pointer active:scale-90 transition"
          title="Giảm Số Lần"
        />
        <button
          onClick={() => setAlchemyBatchCount(alchemyBatchCount + 1)}
          className="w-7 h-7 rounded-full opacity-0 hover:opacity-25 bg-amber-400 cursor-pointer active:scale-90 transition"
          title="Tăng Số Lần"
        />
      </div>

      {/* 5. Main Action Button: "Bắt đầu luyện đan" */}
      <button
        onClick={handleStartAlchemy}
        className="absolute bottom-[7.5%] left-[33%] w-[34%] h-[5.5%] z-20 flex items-center justify-center p-0 bg-transparent border-0 cursor-pointer active:scale-95 transition group"
        title="Bắt đầu luyện đan"
      >
        <img
          src={ASSETS.luyenDan.nutBatDau}
          alt="Bắt Đầu Luyện Đan"
          className="w-full h-full object-contain filter group-hover:brightness-110 group-hover:drop-shadow-[0_0_12px_rgba(245,158,11,0.6)] transition"
        />
      </button>
    </div>
  );
};
