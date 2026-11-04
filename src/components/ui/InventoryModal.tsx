import React from 'react';
import { useGameStore } from '../../store/gameStore';
import { X, Backpack } from 'lucide-react';

export const InventoryModal: React.FC = () => {
  const activeTab = useGameStore((state) => state.activeTab);
  const setActiveTab = useGameStore((state) => state.setActiveTab);
  const inventory = useGameStore((state) => state.inventory);

  if (activeTab !== 'inventory') return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="xianxia-panel rounded-xl max-w-lg w-full p-5 relative border border-yellow-500/40 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex justify-between items-center pb-3 border-b border-yellow-500/20 mb-4">
          <div className="flex items-center gap-2 text-yellow-300 font-bold text-lg">
            <Backpack className="w-5 h-5 text-emerald-400" />
            Túi Trữ Vật (Càn Khôn Đại)
          </div>
          <button
            onClick={() => setActiveTab(null)}
            className="p-1 rounded-md text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Item Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[380px] overflow-y-auto pr-1">
          {inventory.map((item) => (
            <div
              key={item.id}
              className="bg-slate-900/80 border border-slate-700/60 rounded-lg p-3 hover:border-yellow-500/50 transition flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-1">
                  <span className="font-semibold text-sm text-yellow-200">{item.name}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-yellow-400 font-mono border border-slate-700">
                    x{item.quantity}
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
              </div>

              <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex justify-between items-center text-[11px] text-slate-500">
                <span>Loại: {item.type}</span>
                {item.quality && <span className="text-emerald-400">{item.quality}</span>}
              </div>
            </div>
          ))}

          {inventory.length === 0 && (
            <div className="col-span-2 text-center py-10 text-slate-500 text-sm">
              Túi trữ vật trống rỗng, hãy dạo quanh thu thập linh thảo!
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="mt-4 pt-3 border-t border-slate-800 flex justify-between items-center text-xs text-slate-400">
          <span>Dung tích: {inventory.length} / 20 ô</span>
          <button
            onClick={() => setActiveTab(null)}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs transition"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

