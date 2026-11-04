import React, { useMemo } from 'react';

export const Terrain: React.FC = () => {
  // Generate random bamboo trees
  const bambooCount = 60;
  const bambooData = useMemo(() => {
    const data: { position: [number, number, number]; scale: [number, number, number]; rot: number }[] = [];
    for (let i = 0; i < bambooCount; i++) {
      // Bamboo outside the central courtyard (radius 15m - 40m)
      const angle = Math.random() * Math.PI * 2;
      const radius = 12 + Math.random() * 25;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const height = 4 + Math.random() * 3.5;
      data.push({
        position: [x, height / 2, z],
        scale: [0.15, height, 0.15],
        rot: (Math.random() - 0.5) * 0.1,
      });
    }
    return data;
  }, []);

  return (
    <group>
      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, 0, 0]}>
        <planeGeometry args={[120, 120, 32, 32]} />
        <meshStandardMaterial color="#2d4a2d" roughness={0.9} />
      </mesh>

      {/* Central stone platform for meditation & abode */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, 0.02, 0]}>
        <circleGeometry args={[8, 32]} />
        <meshStandardMaterial color="#475569" roughness={0.7} />
      </mesh>

      {/* Decorative stone path */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, 0.015, 6]}>
        <planeGeometry args={[2.5, 8]} />
        <meshStandardMaterial color="#64748b" roughness={0.8} />
      </mesh>

      {/* Small pond / Linh Tuyền stream */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-9, 0.03, -4]}>
        <circleGeometry args={[4.5, 32]} />
        <meshStandardMaterial color="#0284c7" roughness={0.1} metalness={0.2} transparent opacity={0.85} />
      </mesh>

      {/* Bamboo Grove */}
      {bambooData.map((b, idx) => (
        <group key={idx} position={b.position} rotation={[0, 0, b.rot]}>
          {/* Stem */}
          <mesh castShadow>
            <cylinderGeometry args={[0.08, 0.1, b.scale[1], 8]} />
            <meshStandardMaterial color="#4d7c0f" roughness={0.6} />
          </mesh>
          {/* Foliage cluster on top */}
          <mesh position={[0, b.scale[1] / 2, 0]}>
            <sphereGeometry args={[0.9, 6, 6]} />
            <meshStandardMaterial color="#65a30d" roughness={0.8} />
          </mesh>
        </group>
      ))}

      {/* Rustic Ancient Hut / Thảo Lư */}
      <group position={[0, 0, -9]}>
        {/* Main Base */}
        <mesh position={[0, 1.8, 0]} castShadow receiveShadow>
          <boxGeometry args={[7, 3.6, 5]} />
          <meshStandardMaterial color="#78350f" roughness={0.85} />
        </mesh>
        {/* Roof (Xianxia eaves) */}
        <mesh position={[0, 4.2, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
          <coneGeometry args={[6.2, 2.2, 4]} />
          <meshStandardMaterial color="#1c1917" roughness={0.6} />
        </mesh>
        {/* Doorway */}
        <mesh position={[0, 1.2, 2.51]}>
          <planeGeometry args={[1.6, 2.4]} />
          <meshStandardMaterial color="#292524" />
        </mesh>
        {/* Plaque "Thanh Phong Am" */}
        <mesh position={[0, 3, 2.52]}>
          <planeGeometry args={[2, 0.6]} />
          <meshStandardMaterial color="#eab308" />
        </mesh>
      </group>
    </group>
  );
};
