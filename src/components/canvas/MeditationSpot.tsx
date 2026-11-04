import React from 'react';
import { useGameStore } from '../../store/gameStore';

export const MeditationSpot: React.FC = () => {
  const isMeditating = useGameStore((state) => state.character.isMeditating);
  const toggleMeditation = useGameStore((state) => state.toggleMeditation);

  return (
    <group position={[0, 0, 0]}>
      {/* Futon / Bồ Đoàn */}
      <mesh
        position={[0, 0.08, 0]}
        castShadow
        receiveShadow
        onClick={(e) => {
          e.stopPropagation();
          toggleMeditation();
        }}
      >
        <cylinderGeometry args={[0.7, 0.75, 0.16, 24]} />
        <meshStandardMaterial color="#92400e" roughness={0.8} />
      </mesh>

      {/* Decorative woven trim */}
      <mesh position={[0, 0.16, 0]}>
        <cylinderGeometry args={[0.65, 0.65, 0.02, 24]} />
        <meshStandardMaterial color="#d97706" roughness={0.6} />
      </mesh>

      {/* Pulsing Aura Effect when meditating */}
      {isMeditating && (
        <group position={[0, 0.1, 0]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.8, 1.4, 32]} />
            <meshBasicMaterial color="#38bdf8" transparent opacity={0.4} />
          </mesh>
          <pointLight color="#38bdf8" intensity={2} distance={4} />
        </group>
      )}
    </group>
  );
};

