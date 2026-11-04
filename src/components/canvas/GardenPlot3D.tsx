import React from 'react';
import { useFrame } from '@react-three/fiber';
import { useGameStore } from '../../store/gameStore';
import { GardenPlot } from '../../types/game';

export const GardenPlot3D: React.FC = () => {
  const garden = useGameStore((state) => state.garden);
  const tickGarden = useGameStore((state) => state.tickGarden);
  const harvestPlot = useGameStore((state) => state.harvestPlot);
  const waterPlot = useGameStore((state) => state.waterPlot);
  const setActiveTab = useGameStore((state) => state.setActiveTab);

  useFrame((_, delta) => {
    tickGarden(delta);
  });

  const handlePlotClick = (plot: GardenPlot) => {
    if (plot.harvestReady) {
      harvestPlot(plot.id);
    } else if (plot.seedId && plot.moisture < 50) {
      waterPlot(plot.id);
    } else {
      setActiveTab('garden');
    }
  };

  return (
    <group>
      {/* Garden Soil Boundary */}
      <mesh position={[7.1, 0.02, -1.9]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[5.2, 5.2]} />
        <meshStandardMaterial color="#3d2817" roughness={0.95} />
      </mesh>

      {garden.map((plot) => (
        <group
          key={plot.id}
          position={[plot.x, 0.05, plot.z]}
          onClick={(e) => {
            e.stopPropagation();
            handlePlotClick(plot);
          }}
        >
          {/* Soil Bed */}
          <mesh receiveShadow position={[0, 0.04, 0]}>
            <boxGeometry args={[1.8, 0.08, 1.8]} />
            <meshStandardMaterial
              color={plot.moisture > 30 ? '#45220d' : '#6b4f3b'}
              roughness={0.9}
            />
          </mesh>

          {/* Wooden Border Frame */}
          <mesh position={[0, 0.06, 0]}>
            <boxGeometry args={[1.9, 0.1, 1.9]} />
            <meshStandardMaterial color="#78350f" wireframe />
          </mesh>

          {/* Seedling / Plant Growth Stages */}
          {plot.seedId && (
            <group position={[0, 0.08, 0]}>
              {plot.progress < 40 ? (
                /* Stage 1: Sprout */
                <group position={[0, 0.1, 0]}>
                  <mesh castShadow>
                    <cylinderGeometry args={[0.02, 0.03, 0.2, 6]} />
                    <meshStandardMaterial color="#84cc16" />
                  </mesh>
                  <mesh position={[0.05, 0.1, 0]} rotation={[0, 0, 0.5]}>
                    <coneGeometry args={[0.06, 0.12, 4]} />
                    <meshStandardMaterial color="#a3e635" />
                  </mesh>
                </group>
              ) : plot.progress < 100 ? (
                /* Stage 2: Growing Bush */
                <group position={[0, 0.25, 0]}>
                  <mesh castShadow>
                    <cylinderGeometry args={[0.04, 0.06, 0.45, 6]} />
                    <meshStandardMaterial color="#4d7c0f" />
                  </mesh>
                  <mesh position={[0, 0.25, 0]}>
                    <sphereGeometry args={[0.25, 6, 6]} />
                    <meshStandardMaterial color="#65a30d" />
                  </mesh>
                </group>
              ) : (
                /* Stage 3: Mature & Ready to Harvest with Spirit Glow */
                <group position={[0, 0.35, 0]}>
                  <mesh castShadow>
                    <cylinderGeometry args={[0.05, 0.08, 0.65, 8]} />
                    <meshStandardMaterial color="#15803d" />
                  </mesh>
                  {/* Glowing Floral Blossom */}
                  <mesh position={[0, 0.4, 0]}>
                    <dodecahedronGeometry args={[0.3]} />
                    <meshStandardMaterial
                      color="#38bdf8"
                      emissive="#0284c7"
                      emissiveIntensity={0.8}
                    />
                  </mesh>
                  <pointLight color="#38bdf8" intensity={1.5} distance={2.5} />
                </group>
              )}
            </group>
          )}

          {/* Progress / Status Indicator Plate */}
          {plot.seedId && (
            <mesh position={[0, 0.1, 0.95]} rotation={[-Math.PI / 4, 0, 0]}>
              <planeGeometry args={[1.2, 0.2]} />
              <meshBasicMaterial
                color={plot.harvestReady ? '#22c55e' : '#eab308'}
                transparent
                opacity={0.85}
              />
            </mesh>
          )}
        </group>
      ))}
    </group>
  );
};
