import React, { useState } from 'react';
import { useGameStore } from '../../store/gameStore';
import { X, Download, Upload, Save, Check } from 'lucide-react';

export const SaveModal: React.FC = () => {
  const activeTab = useGameStore((state) => state.activeTab);
  const setActiveTab = useGameStore((state) => state.setActiveTab);
  const exportSaveData = useGameStore((state) => state.exportSaveData);
  const importSaveData = useGameStore((state) => state.importSaveData);
  const setNotification = useGameStore((state) => state.setNotification);

  const [importJson, setImportJson] = useState('');
  const [copied, setCopied] = useState(false);

  if (activeTab !== 'abode') return null;

  const handleExportDownload = () => {
    const jsonStr = exportSaveData();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `PhamDao3D_Save_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setNotification('Đã tải xuống tệp lưu trữ tiến trình tu tiên!');
  };

  const handleCopyClipboard = () => {
    const jsonStr = exportSaveData();
    navigator.clipboard.writeText(jsonStr);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
    setNotification('Đã sao chép mã tiến trình vào bộ nhớ tạm!');
  };

  const handleImport = async () => {
    if (!importJson.trim()) return;
    const success = await importSaveData(importJson);
    if (success) {
      setActiveTab(null);
    } else {
      setNotification('Lỗi: Định dạng dữ liệu không hợp lệ!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="xianxia-panel rounded-xl max-w-lg w-full p-5 relative border border-yellow-500/40 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex justify-between items-center pb-3 border-b border-yellow-500/20 mb-4">
          <div className="flex items-center gap-2 text-yellow-300 font-bold text-lg">
            <Save className="w-5 h-5 text-yellow-400" />
            Lưu Trữ & Khôi Phục Dữ Liệu
          </div>
          <button
            onClick={() => setActiveTab(null)}
            className="p-1 rounded-md text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-slate-300 mb-4 leading-relaxed">
          Toàn bộ tiến trình tu vi, bồ đoàn và linh điền được tự động lưu trong trình duyệt (IndexedDB). Bạn có thể sao lưu tệp JSON để chơi trên thiết bị khác mà không lo mất dữ liệu.
        </p>

        {/* Export Section */}
        <div className="mb-4 bg-slate-900/70 p-3.5 rounded-lg border border-slate-700">
          <h4 className="text-xs font-semibold text-yellow-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Download className="w-4 h-4" /> Xuất Bản Lưu Tiến Trình
          </h4>
          <div className="flex gap-2">
            <button
              onClick={handleExportDownload}
              className="flex-1 py-2 px-3 bg-yellow-600/80 hover:bg-yellow-500 text-slate-950 font-semibold text-xs rounded transition flex items-center justify-center gap-1.5 shadow"
            >
              <Download className="w-4 h-4" /> Tải Tệp .JSON
            </button>
            <button
              onClick={handleCopyClipboard}
              className="py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded transition flex items-center gap-1.5 border border-slate-600"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Save className="w-4 h-4" />}
              {copied ? 'Đã chép!' : 'Chép Mã'}
            </button>
          </div>
        </div>

        {/* Import Section */}
        <div className="bg-slate-900/70 p-3.5 rounded-lg border border-slate-700">
          <h4 className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Upload className="w-4 h-4" /> Khôi Phục Bản Lưu
          </h4>
          <textarea
            value={importJson}
            onChange={(e) => setImportJson(e.target.value)}
            placeholder="Dán nội dung JSON bản lưu vào đây..."
            rows={3}
            className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-xs text-slate-200 font-mono focus:outline-none focus:border-cyan-500 mb-2"
          />
          <button
            onClick={handleImport}
            disabled={!importJson.trim()}
            className="w-full py-2 bg-cyan-700/80 hover:bg-cyan-600 disabled:opacity-40 text-white font-semibold text-xs rounded transition flex items-center justify-center gap-1.5 shadow"
          >
            <Upload className="w-4 h-4" /> Khôi Phục Dữ Liệu
          </button>
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-slate-800 flex justify-end">
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

