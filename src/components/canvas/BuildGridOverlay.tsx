import React, { useState } from 'react';
import { useGameStore } from '../../store/gameStore';
import { ABODE_CATALOG } from '../../data/gameData';

export const BuildGridOverlay: React.FC = () => {
  const isBuildMode = useGameStore((state) => state.isBuildMode);
  const selectedDefId = useGameStore((state) => state.selectedDefId);
  const buildRotation = useGameStore((state) => state.buildRotation);
  const placeAbodeObject = useGameStore((state) => state.placeAbodeObject);

  const [hoverPos, setHoverPos] = useState<[number, number, number] | null>(null);

  if (!isBuildMode) return null;

  const selectedDef = ABODE_CATALOG.find((c) => c.defId === selectedDefId);

  const handlePointerMove = (e: any) => {
    e.stopPropagation();
    const point = e.point;
    const snapX = Math.round(point.x * 2) / 2;
    const snapZ = Math.round(point.z * 2) / 2;
    setHoverPos([snapX, 0, snapZ]);
  };

  const handleClick = (e: any) => {
    e.stopPropagation();
    if (hoverPos) {
      placeAbodeObject(hoverPos[0], hoverPos[1], hoverPos[2]);
    }
  };

  return (
    <group>
      {/* 0.5m Building Grid visual helper */}
      <gridHelper
        args={[30, 60, '#eab308', '#334155']}
        position={[0, 0.03, 0]}
      />

      {/* Interactive Raycast Floor */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.04, 0]}
        onPointerMove={handlePointerMove}
        onClick={handleClick}
        visible={false}
      >
        <planeGeometry args={[30, 30]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* Ghost Preview of Object being placed */}
      {hoverPos && selectedDef && (
        <group position={hoverPos} rotation={[0, buildRotation, 0]}>
          <mesh position={[0, selectedDef.height / 2, 0]}>
            <boxGeometry args={[selectedDef.width, selectedDef.height, selectedDef.depth]} />
            <meshStandardMaterial
              color="#22c55e"
              transparent
              opacity={0.5}
              wireframe
            />
          </mesh>
          <pointLight color="#22c55e" intensity={1} distance={2} />
        </group>
      )}
    </group>
  );
};
