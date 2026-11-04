import React from 'react';
import { useGameStore } from '../../../store/gameStore';

export const LinhDienView: React.FC = () => {
  const gardenPlots = useGameStore((state) => state.gardenPlots);
  const waterPlot = useGameStore((state) => state.waterPlot);
  const fertilizePlot = useGameStore((state) => state.fertilizePlot);
  const harvestPlot = useGameStore((state) => state.harvestPlot);

  const activePlot = gardenPlots[0]; // Mộc Linh Hoa
  const isAnyReady = gardenPlots.some((p) => p.ready);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `00:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative w-full aspect-[9/16] min-h-[700px] select-none text-slate-100 overflow-hidden shadow-inner">
      {/* 1. High-Res Design Artwork Background */}
      <img
        src={`${import.meta.env.BASE_URL}design/linh-dien.png`}
        alt="Linh Điền"
        className="absolute inset-0 w-full h-full object-cover object-top pointer-events-none"
      />

      {/* 2. Interactive Garden Beds Hotspots */}
      <div
        onClick={() => waterPlot(1)}
        className="absolute top-[35%] left-[24%] w-[22%] h-[12%] z-20 cursor-pointer rounded-xl hover:bg-cyan-400/20 active:scale-95 transition"
        title="Chăm sóc Ô Mộc Linh Hoa"
      />

      {/* 3. Live Details Overlay on Bottom Panel */}
      <div className="absolute bottom-[23%] left-[48%] z-20 text-[11px] font-medium text-slate-200">
        <span className="text-cyan-300 font-bold">{formatTime(activePlot.timeLeftSeconds)}</span>
      </div>

      <div className="absolute bottom-[20%] left-[48%] z-20 text-[11px] font-medium text-slate-200">
        <span className="text-emerald-400 font-bold">{activePlot.moisture}% (Tốt)</span>
      </div>

      {/* 4. Three Bottom Action Buttons */}
      <div className="absolute bottom-[10%] left-[4%] right-[4%] h-[7%] z-20 flex justify-between gap-2">
        {/* Nút Tưới */}
        <button
          onClick={() => waterPlot(1)}
          className="w-[28%] h-full cursor-pointer rounded-xl opacity-0 hover:opacity-20 bg-cyan-400 active:scale-95 transition"
          title="Tưới Nước Linh Tuyền"
        />

        {/* Nút Bón Linh Thạch */}
        <button
          onClick={() => fertilizePlot(1)}
          className="w-[36%] h-full cursor-pointer rounded-xl opacity-0 hover:opacity-20 bg-purple-500 active:scale-95 transition"
          title="Bón Linh Thạch Thúc Đẩy Sinh Trưởng"
        />

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
          className="w-[32%] h-full cursor-pointer rounded-xl opacity-0 hover:opacity-20 bg-emerald-500 active:scale-95 transition"
          title="Thu Hoạch Linh Thảo"
        />
      </div>
    </div>
  );
};
