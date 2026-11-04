import React, { useState } from 'react';
import { useGameStore } from '../../../store/gameStore';
import { ASSETS, getAssetUrl } from '../../../utils/assets';
import { DESIGN_LAYOUT } from '../../../utils/designCoordinates';

export const LinhDienView: React.FC = () => {
  const gardenPlots = useGameStore((state) => state.gardenPlots);
  const waterPlot = useGameStore((state) => state.waterPlot);
  const fertilizePlot = useGameStore((state) => state.fertilizePlot);
  const harvestPlot = useGameStore((state) => state.harvestPlot);
  const setNotification = useGameStore((state) => state.setNotification);
  const openModal = useGameStore((state) => state.openModal);

  const [wateringAnim, setWateringAnim] = useState(false);
  const [selectedPlotIndex, setSelectedPlotIndex] = useState(0);

  const L = DESIGN_LAYOUT.linh_dien;

  const activePlot = gardenPlots[selectedPlotIndex] || gardenPlots[0];
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

  // 8 plant hotspots corresponding to the garden beds painted on background
  const plots = [
    { key: 'cay_hoa_tim', layout: L.cay_hoa_tim, name: 'Hàn Băng Thảo', plotId: 1 },
    { key: 'cay_giong', layout: L.cay_giong, name: 'Mầm Mộc Linh', plotId: 2 },
    { key: 'cay_qua_do', layout: L.cay_qua_do, name: 'Xích Huyết Quả', plotId: 3 },
    { key: 'cay_nhan_sam', layout: L.cay_nhan_sam, name: 'Bách Niên Sâm', plotId: 4 },
    { key: 'cay_hoa_xanh', layout: L.cay_hoa_xanh, name: 'U Lan Hoa', plotId: 5 },
    { key: 'cay_dang_tuoi', layout: L.cay_dang_tuoi, name: 'Thanh Phong Thảo', plotId: 6 },
    { key: 'cay_la_xanh', layout: L.cay_la_xanh, name: 'Bích Diệp Đằng', plotId: 7 },
    { key: 'cay_nhan_sam_2', layout: L.cay_nhan_sam_2, name: 'Hoàng Tinh Căn', plotId: 8 },
  ];

  return (
    <div className="absolute inset-0 w-full h-full select-none text-slate-100 overflow-hidden">
      {/* 1. Background Scene (Already contains the lush garden, 8 herb beds, and watering cultivator) */}
      <img
        src={ASSETS.backgrounds.linhDien}
        alt="Vườn Thảo Dược"
        className="absolute inset-0 w-full h-full object-cover object-top pointer-events-none"
      />

      {/* 2. Khung Nhiệm Vụ (Top-Left) từ assets/images/khung */}
      <div
        onClick={() => openModal('QUESTS')}
        style={{ left: L.khung_nhiem_vu.left, top: L.khung_nhiem_vu.top, width: L.khung_nhiem_vu.width, height: L.khung_nhiem_vu.height }}
        className="absolute z-20 cursor-pointer hover:scale-105 active:scale-95 transition drop-shadow-md"
        title="Nhiệm Vụ Linh Điền"
      >
        <img src={ASSETS.khung.nhiemVu} alt="Khung Nhiệm Vụ" className="w-full h-full object-contain" />
      </div>

      {/* 3. Banner Sự Kiện (Under Mission Box) từ assets/images/khung */}
      <div
        onClick={() => openModal('EVENT')}
        style={{ left: L.banner_su_kien.left, top: L.banner_su_kien.top, width: L.banner_su_kien.width, height: L.banner_su_kien.height }}
        className="absolute z-20 cursor-pointer hover:scale-105 active:scale-95 transition drop-shadow-md"
        title="Banner Sự Kiện"
      >
        <img src={ASSETS.khung.bannerSuKien} alt="Banner Sự Kiện" className="w-full h-full object-contain" />
      </div>

      {/* 4. Interactive Garden Bed Hotspots (The herbs are already painted on the background) */}
      {plots.map((p, idx) => (
        <div
          key={p.key}
          onClick={() => {
            setSelectedPlotIndex(idx % gardenPlots.length);
            setNotification(`Đang chăm sóc: ${p.name}`);
          }}
          style={{ left: p.layout.left, top: p.layout.top, width: p.layout.width, height: p.layout.height }}
          className={`absolute z-20 cursor-pointer rounded-xl hover:bg-emerald-400/20 active:scale-95 transition flex items-center justify-center ${
            selectedPlotIndex === (idx % gardenPlots.length) ? 'ring-2 ring-emerald-400 bg-emerald-400/20 shadow-[0_0_12px_rgba(52,211,153,0.6)]' : ''
          }`}
          title={p.name}
        />
      ))}

      {/* Water droplet splash effect when watering */}
      {wateringAnim && (
        <div
          style={{ left: L.nhan_vat_tuoi_cay.left, top: L.nhan_vat_tuoi_cay.top, width: L.nhan_vat_tuoi_cay.width, height: L.nhan_vat_tuoi_cay.height }}
          className="absolute z-25 pointer-events-none flex items-center justify-center"
        >
          <div className="w-24 h-24 rounded-full bg-cyan-400/30 blur-xl animate-ping" />
        </div>
      )}

      {/* 5. Khung Thông Tin Linh Thảo (Bottom Large Panel) */}
      <div
        style={{ left: L.khung_thong_tin_linh_thao.left, top: L.khung_thong_tin_linh_thao.top, width: L.khung_thong_tin_linh_thao.width, height: L.khung_thong_tin_linh_thao.height }}
        className="absolute z-20 pointer-events-none drop-shadow-lg"
      >
        <img src={getAssetUrl(L.khung_thong_tin_linh_thao.path)} alt="Khung Thông Tin Linh Thảo" className="w-full h-full object-fill" />
      </div>

      {/* Ảnh Linh Thảo trong khung */}
      <div
        style={{ left: L.anh_linh_thao.left, top: L.anh_linh_thao.top, width: L.anh_linh_thao.width, height: L.anh_linh_thao.height }}
        className="absolute z-25 pointer-events-none drop-shadow"
      >
        <img src={getAssetUrl(L.anh_linh_thao.path)} alt="Linh Thảo Minh Họa" className="w-full h-full object-contain" />
      </div>

      {/* Bảng Trạng Thái Cây với live overlay data */}
      <div
        style={{ left: L.bang_trang_thai_cay.left, top: L.bang_trang_thai_cay.top, width: L.bang_trang_thai_cay.width, height: L.bang_trang_thai_cay.height }}
        className="absolute z-25 pointer-events-none"
      >
        <img src={getAssetUrl(L.bang_trang_thai_cay.path)} alt="Bảng Trạng Thái Cây" className="w-full h-full object-contain" />
        {/* Dynamic live timer & moisture overlay */}
        <div className="absolute top-[48%] left-[45%] text-[10px] font-bold text-cyan-300 font-mono drop-shadow">
          {formatTime(activePlot.timeLeftSeconds)}
        </div>
        <div className="absolute top-[68%] left-[45%] text-[10px] font-bold text-emerald-400 font-mono drop-shadow">
          {activePlot.moisture}% (Tốt)
        </div>
      </div>

      {/* 6. Three Action Buttons: Tưới, Bón Linh Thạch, Thu Hoạch */}
      <button
        onClick={() => handleWater(activePlot.id)}
        style={{ left: L.nut_tuoi.left, top: L.nut_tuoi.top, width: L.nut_tuoi.width, height: L.nut_tuoi.height }}
        className="absolute z-30 p-0 bg-transparent border-0 cursor-pointer active:scale-95 transition group"
        title="Tưới Nước Linh Tuyền"
      >
        <img
          src={getAssetUrl(L.nut_tuoi.path)}
          alt="Tưới Nước"
          className="w-full h-full object-contain filter group-hover:brightness-110 drop-shadow"
        />
      </button>

      <button
        onClick={() => fertilizePlot(activePlot.id)}
        style={{ left: L.nut_bon_linh_thach.left, top: L.nut_bon_linh_thach.top, width: L.nut_bon_linh_thach.width, height: L.nut_bon_linh_thach.height }}
        className="absolute z-30 p-0 bg-transparent border-0 cursor-pointer active:scale-95 transition group"
        title="Bón Linh Thạch"
      >
        <img
          src={getAssetUrl(L.nut_bon_linh_thach.path)}
          alt="Bón Linh Thạch"
          className="w-full h-full object-contain filter group-hover:brightness-110 drop-shadow"
        />
      </button>

      <button
        onClick={() => {
          if (isAnyReady) {
            const readyPlot = gardenPlots.find((p) => p.ready);
            if (readyPlot) harvestPlot(readyPlot.id);
          } else {
            harvestPlot(activePlot.id);
          }
        }}
        style={{ left: L.nut_thu_hoach.left, top: L.nut_thu_hoach.top, width: L.nut_thu_hoach.width, height: L.nut_thu_hoach.height }}
        className="absolute z-30 p-0 bg-transparent border-0 cursor-pointer active:scale-95 transition group"
        title="Thu Hoạch Linh Thảo"
      >
        <img
          src={getAssetUrl(L.nut_thu_hoach.path)}
          alt="Thu Hoạch"
          className={`w-full h-full object-contain filter group-hover:brightness-110 drop-shadow ${
            isAnyReady ? 'animate-pulse drop-shadow-[0_0_12px_rgba(52,211,153,0.9)]' : ''
          }`}
        />
      </button>
    </div>
  );
};
