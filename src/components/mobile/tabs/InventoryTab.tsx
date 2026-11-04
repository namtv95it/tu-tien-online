import React, { useState } from 'react';
import { useGameStore } from '../../../store/gameStore';
import { ItemType } from '../../../types/game';
import { Backpack, Download, Upload, Save, Check, Sparkles } from 'lucide-react';

export const InventoryTab: React.FC = () => {
  const inventory = useGameStore((state) => state.inventory);
  const useItem = useGameStore((state) => state.useItem);
  const exportSaveData = useGameStore((state) => state.exportSaveData);
  const importSaveData = useGameStore((state) => state.importSaveData);
  const setNotification = useGameStore((state) => state.setNotification);

  const [filter, setFilter] = useState<'ALL' | ItemType>('ALL');
  const [importJson, setImportJson] = useState('');
  const [copied, setCopied] = useState(false);

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
    a.download = `PhamDao2D_Save_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setNotification('Đã tải xuống tệp lưu tiến trình!');
  };

  const handleCopyClipboard = () => {
    const jsonStr = exportSaveData();
    navigator.clipboard.writeText(jsonStr);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
    setNotification('Đã sao chép mã bản lưu vào bộ nhớ tạm!');
  };

  const handleImport = async () => {
    if (!importJson.trim()) return;
    const ok = await importSaveData(importJson);
    if (!ok) setNotification('Lỗi: Định dạng dữ liệu không hợp lệ!');
  };

  return (
    <div className="space-y-3 pb-20 animate-in fade-in duration-200">
      {/* Title */}
      <div className="flex justify-between items-center px-1">
        <div>
          <h3 className="font-bold text-sm text-yellow-300 flex items-center gap-1.5">
            <Backpack className="w-4 h-4 text-emerald-400" />
            Túi Trữ Vật (Càn Khôn Đại)
          </h3>
          <p className="text-[11px] text-slate-400">Chạm vào đan dược để uống tăng tu vi</p>
        </div>
        <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
          {inventory.length} Món
        </span>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 text-xs">
        {[
          { id: 'ALL', label: 'Tất cả' },
          { id: 'PILL', label: 'Đan Dược' },
          { id: 'HERB', label: 'Thảo Dược' },
          { id: 'SEED', label: 'Hạt Giống' },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id as any)}
            className={`px-3 py-1 rounded-lg font-medium whitespace-nowrap transition ${
              filter === f.id
                ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/50'
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
          <div
            key={item.id}
            className="p-3 rounded-xl bg-slate-900/90 border border-slate-700/80 flex items-center justify-between"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-xs text-yellow-200">{item.name}</span>
                <span className="text-xs px-2 py-0.2 rounded-full bg-slate-800 text-yellow-400 font-mono border border-slate-700">
                  x{item.quantity}
                </span>
                {item.quality && (
                  <span className="text-[10px] text-emerald-400 font-semibold">{item.quality}</span>
                )}
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">{item.description}</p>
            </div>

            {/* Action for Pills */}
            {item.type === 'PILL' && (
              <button
                onClick={() => useItem(item)}
                className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-500 text-slate-950 font-bold text-xs whitespace-nowrap shadow transition flex items-center gap-1 active:scale-95"
              >
                <Sparkles className="w-3.5 h-3.5" /> Uống
              </button>
            )}
          </div>
        ))}

        {filteredItems.length === 0 && (
          <div className="py-8 text-center text-xs text-slate-500">
            Không có vật phẩm nào trong mục này.
          </div>
        )}
      </div>

      {/* Save / Restore Section */}
      <div className="mt-4 p-3.5 rounded-xl bg-slate-900/80 border border-slate-700">
        <h4 className="text-xs font-bold text-yellow-400 mb-2 flex items-center gap-1.5">
          <Save className="w-4 h-4" /> Sao Lưu & Khôi Phục Dữ Liệu
        </h4>

        <div className="flex gap-2 mb-2.5">
          <button
            onClick={handleExportDownload}
            className="flex-1 py-2 bg-yellow-600/80 hover:bg-yellow-500 text-slate-950 font-bold text-xs rounded-lg transition flex items-center justify-center gap-1.5 shadow"
          >
            <Download className="w-3.5 h-3.5" /> Tải Tệp .JSON
          </button>
          <button
            onClick={handleCopyClipboard}
            className="py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-lg transition flex items-center gap-1.5 border border-slate-600"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Save className="w-3.5 h-3.5" />}
            {copied ? 'Đã chép' : 'Chép Mã'}
          </button>
        </div>

        <textarea
          value={importJson}
          onChange={(e) => setImportJson(e.target.value)}
          placeholder="Dán mã bản lưu JSON vào đây để khôi phục..."
          rows={2}
          className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-slate-200 font-mono focus:outline-none focus:border-yellow-500 mb-2"
        />
        <button
          onClick={handleImport}
          disabled={!importJson.trim()}
          className="w-full py-2 bg-cyan-700 hover:bg-cyan-600 disabled:opacity-40 text-white font-bold text-xs rounded-lg transition flex items-center justify-center gap-1.5"
        >
          <Upload className="w-3.5 h-3.5" /> Khôi Phục Dữ Liệu
        </button>
      </div>
    </div>
  );
};
