import React from 'react';
import { useGameStore } from '../../../store/gameStore';

export const LuyenDanView: React.FC = () => {
  const selectedRecipeId = useGameStore((state) => state.selectedRecipeId);
  const setSelectedRecipe = useGameStore((state) => state.setSelectedRecipe);
  const fireIntensity = useGameStore((state) => state.fireIntensity);
  const setFireIntensity = useGameStore((state) => state.setFireIntensity);
  const alchemyBatchCount = useGameStore((state) => state.alchemyBatchCount);
  const setAlchemyBatchCount = useGameStore((state) => state.setAlchemyBatchCount);
  const startAlchemy = useGameStore((state) => state.startAlchemy);

  return (
    <div className="relative w-full aspect-[9/16] min-h-[700px] select-none text-slate-100 overflow-hidden shadow-inner">
      {/* 1. High-Res Design Artwork Background */}
      <img
        src={`${import.meta.env.BASE_URL}design/luyen-dan.png`}
        alt="Luyện Đan"
        className="absolute inset-0 w-full h-full object-cover object-top pointer-events-none"
      />

      {/* 2. Left Recipe Selector Hotspots */}
      <div className="absolute top-[12%] left-[2%] w-[25%] h-[24%] z-20 flex flex-col justify-between">
        <button
          onClick={() => setSelectedRecipe('tu_khi_dan')}
          className={`h-[18%] w-full rounded cursor-pointer ${selectedRecipeId === 'tu_khi_dan' ? 'ring-1 ring-amber-400 bg-amber-400/10' : ''}`}
          title="Tụ Khí Đan"
        />
        <button
          onClick={() => setSelectedRecipe('trang_the_dan')}
          className={`h-[18%] w-full rounded cursor-pointer ${selectedRecipeId === 'trang_the_dan' ? 'ring-1 ring-cyan-400 bg-cyan-400/10' : ''}`}
          title="Tráng Thể Đan"
        />
        <button
          onClick={() => setSelectedRecipe('thanh_tam_dan')}
          className={`h-[18%] w-full rounded cursor-pointer ${selectedRecipeId === 'thanh_tam_dan' ? 'ring-1 ring-emerald-400 bg-emerald-400/10' : ''}`}
          title="Thanh Tâm Đan"
        />
      </div>

      {/* 3. Fire Intensity Control Hotspots */}
      <div className="absolute top-[69%] left-[30%] right-[30%] h-[4%] z-20 flex items-center justify-between">
        {/* Decrease fire button */}
        <button
          onClick={() => setFireIntensity(fireIntensity - 1)}
          className="w-8 h-8 rounded-full opacity-0 hover:opacity-25 bg-amber-400 cursor-pointer active:scale-90"
          title="Giảm Cường Độ Lửa"
        />
        {/* Increase fire button */}
        <button
          onClick={() => setFireIntensity(fireIntensity + 1)}
          className="w-8 h-8 rounded-full opacity-0 hover:opacity-25 bg-orange-500 cursor-pointer active:scale-90"
          title="Tăng Cường Độ Lửa"
        />
      </div>

      {/* 4. Batch Count Control Hotspots */}
      <div className="absolute bottom-[8%] right-[4%] w-[28%] h-[5%] z-20 flex items-center justify-between">
        <button
          onClick={() => setAlchemyBatchCount(alchemyBatchCount - 1)}
          className="w-7 h-7 rounded-full opacity-0 hover:opacity-25 bg-amber-400 cursor-pointer active:scale-90"
          title="Giảm Số Lần"
        />
        <button
          onClick={() => setAlchemyBatchCount(alchemyBatchCount + 1)}
          className="w-7 h-7 rounded-full opacity-0 hover:opacity-25 bg-amber-400 cursor-pointer active:scale-90"
          title="Tăng Số Lần"
        />
      </div>

      {/* 5. Main Action Button: "Bắt đầu luyện đan" */}
      <button
        onClick={startAlchemy}
        className="absolute bottom-[8%] left-[34%] w-[34%] h-[5%] z-20 rounded-full opacity-0 hover:opacity-25 bg-amber-400 cursor-pointer active:scale-95 shadow-lg"
        title="Bắt đầu luyện đan"
      />
    </div>
  );
};
