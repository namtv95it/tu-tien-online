import React, { useEffect } from 'react';
import { WorldCanvas } from './components/canvas/WorldCanvas';
import { HUD } from './components/ui/HUD';
import { Notification } from './components/ui/Notification';
import { InventoryModal } from './components/ui/InventoryModal';
import { SaveModal } from './components/ui/SaveModal';
import { useGameStore } from './store/gameStore';

export const App: React.FC = () => {
  const initGame = useGameStore((state) => state.initGame);

  useEffect(() => {
    initGame();
  }, [initGame]);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#0b0f17] select-none">
      {/* 3D WebGL World */}
      <WorldCanvas />

      {/* Xianxia Atmospheric Vignette Overlay */}
      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.6)] z-[5]" />

      {/* UI Overlays */}
      <HUD />
      <Notification />
      <InventoryModal />
      <SaveModal />
    </div>
  );
};

export default App;

