import React, { useState } from 'react';
import { useGameStore } from '../../../store/gameStore';
import { ItemType } from '../../../types/game';
import { XianxiaFrame } from '../art/XianxiaFrame';
import { Backpack, Download, Save, Check, Sparkles } from 'lucide-react';

export const InventoryTab: React.FC = () => {
  const inventory = useGameStore((state) => state.inventory);
  const useItem = useGameStore((state) => state.useItem);
  const exportSaveData = useGameStore((state) => state.exportSaveData);
  const importSaveData = useGameStore((state) => state.importSaveData);
  const setNotification = useGameStore((state) => state.setNotification);

  const [filter, setFilter] = useState<'ALL' | ItemType>('ALL');
  const [importJson, setImportJson] = useState('');
  const [copied, setCopied] = useState(false);
  const [showSaveSection, setShowSaveSection] = useState(false);

  const filteredItems = inventory.filter((item) => {
    if (filter === 'ALL') return true;
    return item.type === filter;
  });

  const handleExportDownload = () => {
    const jsonStr = exportSaveData();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `PhamDao_Save_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setNotification('Đã tải xuống tệp lưu tiến trình!');
  };

  const handleCopyClipboard = () => {
    const jsonStr = exportSaveData();
    navigator.clipboard.writeText(jsonStr);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
    setNotification('Đã sao chép mã bản lưu!');
  };

  const handleImport = async () => {
    if (!importJson.trim()) return;
    const ok = await importSaveData(importJson);
    if (!ok) setNotification('Lỗi: Định dạng dữ liệu không hợp lệ!');
  };

  const getItemIcon = (type: ItemType) => {
    switch (type) {
      case 'PILL': return '💊';
      case 'HERB': return '🌿';
      case 'SEED': return '🌱';
      default: return '💎';
    }
  };

  return (
    <div className="space-y-3 pb-20 animate-in fade-in duration-200">
      {/* Title & Filter Row */}
      <div className="flex justify-between items-center px-1">
        <div className="flex items-center gap-1.5 font-bold text-xs text-amber-300">
          <Backpack className="w-4 h-4 text-emerald-400" />
          Túi Trữ Vật
        </div>
        <button
          onClick={() => setShowSaveSection(!showSaveSection)}
          className="text-[10px] text-amber-400 font-semibold px-2 py-0.5 rounded bg-slate-900 border border-slate-700 flex items-center gap-1"
        >
          <Save className="w-3 h-3" /> Sao Lưu
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-1.5 text-xs">
        {[
          { id: 'ALL', label: 'Tất cả' },
          { id: 'PILL', label: 'Đan Dược' },
          { id: 'HERB', label: 'Thảo Dược' },
          { id: 'SEED', label: 'Hạt Giống' },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id as any)}
            className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
              filter === f.id
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/60'
                : 'bg-slate-900/80 text-slate-400 border border-slate-800'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Items List */}
      <div className="space-y-2">
        {filteredItems.map((item) => (
          <XianxiaFrame key={item.id} className="p-3 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">{getItemIcon(item.type)}</span>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-xs text-amber-200">{item.name}</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-800 text-amber-400 font-mono border border-slate-700">
                    x{item.quantity}
                  </span>
                  {item.quality && (
                    <span className="text-[9px] text-emerald-400 font-semibold">{item.quality}</span>
                  )}
                </div>
                <div className="text-[10px] text-slate-400">{item.description}</div>
              </div>
            </div>

            {/* Drink Pill Button */}
            {item.type === 'PILL' && (
              <button
                onClick={() => useItem(item)}
                className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-500 text-slate-950 font-bold text-xs whitespace-nowrap shadow transition flex items-center gap-1 active:scale-95 shrink-0"
              >
                <Sparkles className="w-3 h-3" /> Uống
              </button>
            )}
          </XianxiaFrame>
        ))}

        {filteredItems.length === 0 && (
          <div className="py-8 text-center text-xs text-slate-500">
            Trống không, chưa có vật phẩm.
          </div>
        )}
      </div>

      {/* Save / Restore Modal/Drawer */}
      {showSaveSection && (
        <XianxiaFrame variant="gold" className="p-3.5 space-y-2.5">
          <div className="flex justify-between items-center text-xs font-bold text-amber-300">
            <span>Sao Lưu Dữ Liệu Trình Duyệt</span>
            <button onClick={() => setShowSaveSection(false)} className="text-slate-400 hover:text-white">✕</button>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleExportDownload}
              className="flex-1 py-1.5 bg-amber-500 text-slate-950 font-bold text-xs rounded-lg transition flex items-center justify-center gap-1"
            >
              <Download className="w-3.5 h-3.5" /> Tải File Save
            </button>
            <button
              onClick={handleCopyClipboard}
              className="py-1.5 px-3 bg-slate-900 border border-slate-700 text-slate-300 text-xs rounded-lg transition flex items-center gap-1"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Save className="w-3.5 h-3.5" />}
              {copied ? 'Đã Chép' : 'Chép Mã'}
            </button>
          </div>

          <textarea
            value={importJson}
            onChange={(e) => setImportJson(e.target.value)}
            placeholder="Dán mã JSON để khôi phục..."
            rows={2}
            className="w-full bg-slate-950 border border-slate-800 rounded p-1.5 text-xs text-slate-300 font-mono focus:outline-none focus:border-amber-500"
          />
          <button
            onClick={handleImport}
            disabled={!importJson.trim()}
            className="w-full py-1.5 bg-cyan-700 disabled:opacity-40 text-white font-bold text-xs rounded-lg transition"
          >
            Khôi Phục Tiến Trình
          </button>
        </XianxiaFrame>
      )}
    </div>
  );
};
