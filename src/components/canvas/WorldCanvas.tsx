import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Sky } from '@react-three/drei';
import { Terrain } from './Terrain';
import { Player } from './Player';
import { MeditationSpot } from './MeditationSpot';
import { GardenPlot3D } from './GardenPlot3D';
import { AbodeObjects3D } from './AbodeObjects3D';
import { BuildGridOverlay } from './BuildGridOverlay';

export const WorldCanvas: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        shadows
        camera={{ position: [0, 4, 7], fov: 55 }}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      >
        {/* Xianxia Sky & Atmospheric Fog */}
        <color attach="background" args={['#0f172a']} />
        <fog attach="fog" args={['#0f172a', 15, 65]} />

        {/* Ambient & Sun lighting */}
        <ambientLight intensity={0.65} color="#e2e8f0" />
        <directionalLight
          castShadow
          position={[15, 25, 12]}
          intensity={1.4}
          color="#fef08a"
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-near={0.5}
          shadow-camera-far={80}
          shadow-camera-left={-25}
          shadow-camera-right={25}
          shadow-camera-top={25}
          shadow-camera-bottom={-25}
        />

        {/* Blue moonlight fill from the opposite side */}
        <directionalLight position={[-15, 10, -15]} intensity={0.3} color="#38bdf8" />

        {/* Dynamic Sky */}
        <Sky
          distance={450000}
          sunPosition={[15, 25, 12]}
          inclination={0.49}
          azimuth={0.25}
          mieCoefficient={0.005}
          mieDirectionalG={0.8}
          rayleigh={1.2}
          turbidity={6}
        />

        {/* World Components */}
        <Terrain />
        <MeditationSpot />
        <GardenPlot3D />
        <AbodeObjects3D />
        <BuildGridOverlay />
        <Player />
      </Canvas>
    </div>
  );
};
