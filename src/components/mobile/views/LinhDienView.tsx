import React, { useState } from 'react';
import { useGameStore } from '../../../store/gameStore';
import { ASSETS } from '../../../utils/assets';

export const LinhDienView: React.FC = () => {
  const gardenPlots = useGameStore((state) => state.gardenPlots);
  const waterPlot = useGameStore((state) => state.waterPlot);
  const fertilizePlot = useGameStore((state) => state.fertilizePlot);
  const harvestPlot = useGameStore((state) => state.harvestPlot);

  const [wateringAnim, setWateringAnim] = useState(false);

  const activePlot = gardenPlots[0]; // Mộc Linh Hoa
  const isAnyReady = gardenPlots.some((p) => p.ready);

  const handleWater = (id: number) => {
    waterPlot(id);
    setWateringAnim(true);
    setTimeout(() => setWateringAnim(false), 1200);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `00:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative w-full aspect-[9/16] min-h-[700px] select-none text-slate-100 overflow-hidden shadow-inner">
      {/* 1. High-Res Clean Background */}
      <img
        src={ASSETS.backgrounds.linhDien}
        alt="Linh Điền"
        className="absolute inset-0 w-full h-full object-cover object-top pointer-events-none"
      />

      {/* 2. Interactive Garden Beds Hotspots */}
      <div
        onClick={() => handleWater(1)}
        className="absolute top-[35%] left-[24%] w-[22%] h-[12%] z-20 cursor-pointer rounded-xl hover:bg-cyan-400/20 active:scale-95 transition"
        title="Chăm sóc Ô Mộc Linh Hoa"
      />

      {/* Cultivator Watering Animation Overlay */}
      {wateringAnim && (
        <div className="absolute top-[30%] left-[35%] z-30 pointer-events-none animate-bounce duration-700">
          <img
            src={ASSETS.linhDien.nhanVat}
            alt="Đang tưới cây"
            className="w-24 h-auto drop-shadow-[0_4px_12px_rgba(56,189,248,0.8)]"
          />
        </div>
      )}

      {/* 3. Live Details Overlay on Bottom Panel */}
      <div className="absolute bottom-[23%] left-[48%] z-20 text-[11px] font-medium text-slate-200">
        <span className="text-cyan-300 font-bold">{formatTime(activePlot.timeLeftSeconds)}</span>
      </div>

      <div className="absolute bottom-[20%] left-[48%] z-20 text-[11px] font-medium text-slate-200">
        <span className="text-emerald-400 font-bold">{activePlot.moisture}% (Tốt)</span>
      </div>

      {/* 4. Three Bottom Action Buttons */}
      <div className="absolute bottom-[9.5%] left-[4%] right-[4%] h-[7.5%] z-20 flex justify-between gap-1.5 items-center">
        {/* Nút Tưới */}
        <button
          onClick={() => handleWater(1)}
          className="w-[30%] h-full flex items-center justify-center p-0 bg-transparent border-0 cursor-pointer active:scale-95 transition group"
          title="Tưới Nước Linh Tuyền"
        >
          <img
            src={ASSETS.linhDien.nutTuoi}
            alt="Tưới Nước"
            className="w-full h-full object-contain filter group-hover:brightness-110 group-active:brightness-90 transition drop-shadow"
          />
        </button>

        {/* Nút Bón Linh Thạch */}
        <button
          onClick={() => fertilizePlot(1)}
          className="w-[36%] h-full flex items-center justify-center p-0 bg-transparent border-0 cursor-pointer active:scale-95 transition group"
          title="Bón Linh Thạch Thúc Đẩy Sinh Trưởng"
        >
          <img
            src={ASSETS.linhDien.nutBonLinhThach}
            alt="Bón Linh Thạch"
            className="w-full h-full object-contain filter group-hover:brightness-110 group-active:brightness-90 transition drop-shadow"
          />
        </button>

        {/* Nút Thu Hoạch */}
        <button
          onClick={() => {
            if (isAnyReady) {
              const readyPlot = gardenPlots.find((p) => p.ready);
              if (readyPlot) harvestPlot(readyPlot.id);
            } else {
              harvestPlot(1);
            }
          }}
          className="w-[32%] h-full flex items-center justify-center p-0 bg-transparent border-0 cursor-pointer active:scale-95 transition group"
          title="Thu Hoạch Linh Thảo"
        >
          <img
            src={ASSETS.linhDien.nutThuHoach}
            alt="Thu Hoạch"
            className={`w-full h-full object-contain filter group-hover:brightness-110 group-active:brightness-90 transition drop-shadow ${
              isAnyReady ? 'animate-pulse drop-shadow-[0_0_10px_rgba(52,211,153,0.8)]' : ''
            }`}
          />
        </button>
      </div>
    </div>
  );
};
