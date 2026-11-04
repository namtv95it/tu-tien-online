import React from 'react';
import { useGameStore } from '../../store/gameStore';
import { PlacedAbodeObject } from '../../types/game';

interface ObjectMeshProps {
  obj: PlacedAbodeObject;
}

const SingleAbodeObject: React.FC<ObjectMeshProps> = ({ obj }) => {
  const setActiveTab = useGameStore((state) => state.setActiveTab);
  const isBuildMode = useGameStore((state) => state.isBuildMode);
  const removeAbodeObject = useGameStore((state) => state.removeAbodeObject);

  const handleClick = (e: any) => {
    e.stopPropagation();
    if (isBuildMode) {
      if (confirm(`Thu hồi ${obj.name}?`)) {
        removeAbodeObject(obj.id);
      }
    } else if (obj.defId === 'obj_cauldron') {
      setActiveTab('alchemy');
    }
  };

  switch (obj.defId) {
    case 'obj_cauldron':
      /* Bronze Tripod Cauldron */
      return (
        <group position={[obj.x, 0, obj.z]} rotation={[0, obj.rotationY, 0]} onClick={handleClick}>
          {/* Main pot body */}
          <mesh position={[0, 0.7, 0]} castShadow>
            <sphereGeometry args={[0.65, 16, 16]} />
            <meshStandardMaterial color="#78350f" metalness={0.7} roughness={0.3} />
          </mesh>
          {/* Rim */}
          <mesh position={[0, 1.1, 0]}>
            <torusGeometry args={[0.5, 0.08, 12, 24]} />
            <meshStandardMaterial color="#ca8a04" metalness={0.8} roughness={0.2} />
          </mesh>
          {/* 3 Legs */}
          {[-0.4, 0.4].map((lx, i) => (
            <mesh key={i} position={[lx, 0.25, 0]} castShadow>
              <cylinderGeometry args={[0.07, 0.05, 0.5, 8]} />
              <meshStandardMaterial color="#78350f" metalness={0.7} />
            </mesh>
          ))}
          <mesh position={[0, 0.25, -0.4]} castShadow>
            <cylinderGeometry args={[0.07, 0.05, 0.5, 8]} />
            <meshStandardMaterial color="#78350f" metalness={0.7} />
          </mesh>
          {/* Flame / Spiritual glow */}
          <pointLight position={[0, 0.3, 0]} color="#f97316" intensity={2} distance={3} />
        </group>
      );

    case 'obj_stone_well':
      /* Stone Well */
      return (
        <group position={[obj.x, 0, obj.z]} rotation={[0, obj.rotationY, 0]} onClick={handleClick}>
          <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.9, 0.95, 1.0, 16]} />
            <meshStandardMaterial color="#475569" roughness={0.8} />
          </mesh>
          {/* Water surface inside */}
          <mesh position={[0, 0.65, 0]}>
            <circleGeometry args={[0.7, 16]} />
            <meshStandardMaterial color="#0284c7" metalness={0.2} roughness={0.1} />
          </mesh>
          {/* Wooden post & roof */}
          <mesh position={[-0.8, 1.2, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 1.4, 8]} />
            <meshStandardMaterial color="#78350f" />
          </mesh>
          <mesh position={[0.8, 1.2, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 1.4, 8]} />
            <meshStandardMaterial color="#78350f" />
          </mesh>
          <mesh position={[0, 2.0, 0]} rotation={[0, 0, 0.1]}>
            <coneGeometry args={[1.3, 0.5, 4]} />
            <meshStandardMaterial color="#292524" />
          </mesh>
        </group>
      );

    case 'obj_jade_desk':
      /* Jade Desk */
      return (
        <group position={[obj.x, 0, obj.z]} rotation={[0, obj.rotationY, 0]} onClick={handleClick}>
          {/* Tabletop */}
          <mesh position={[0, 0.75, 0]} castShadow>
            <boxGeometry args={[2.0, 0.1, 1.1]} />
            <meshStandardMaterial color="#451a03" roughness={0.6} />
          </mesh>
          {/* Legs */}
          {[-0.85, 0.85].map((lx, i) =>
            [-0.4, 0.4].map((lz, j) => (
              <mesh key={`${i}-${j}`} position={[lx, 0.35, lz]} castShadow>
                <boxGeometry args={[0.1, 0.7, 0.1]} />
                <meshStandardMaterial color="#451a03" />
              </mesh>
            ))
          )}
          {/* Jade scroll / Book */}
          <mesh position={[0, 0.82, 0]}>
            <boxGeometry args={[0.6, 0.04, 0.4]} />
            <meshStandardMaterial color="#10b981" roughness={0.2} />
          </mesh>
        </group>
      );

    case 'obj_storage_shelf':
      /* Storage Shelf */
      return (
        <group position={[obj.x, 0, obj.z]} rotation={[0, obj.rotationY, 0]} onClick={handleClick}>
          <mesh position={[0, 1.0, 0]} castShadow>
            <boxGeometry args={[1.6, 2.0, 0.6]} />
            <meshStandardMaterial color="#5c2c16" roughness={0.7} />
          </mesh>
          {/* Drawers / Shelves */}
          {[-0.5, 0, 0.5].map((sy, i) => (
            <mesh key={i} position={[0, 1.0 + sy, 0.31]}>
              <planeGeometry args={[1.4, 0.35]} />
              <meshStandardMaterial color="#78350f" />
            </mesh>
          ))}
        </group>
      );

    case 'obj_spirit_lantern':
      /* Spirit Lantern */
      return (
        <group position={[obj.x, 0, obj.z]} rotation={[0, obj.rotationY, 0]} onClick={handleClick}>
          {/* Base & Pole */}
          <mesh position={[0, 1.1, 0]} castShadow>
            <cylinderGeometry args={[0.06, 0.1, 2.2, 8]} />
            <meshStandardMaterial color="#451a03" />
          </mesh>
          {/* Lantern Cage */}
          <mesh position={[0, 2.1, 0]} castShadow>
            <octahedronGeometry args={[0.35]} />
            <meshStandardMaterial color="#eab308" emissive="#ca8a04" emissiveIntensity={0.6} />
          </mesh>
          <pointLight position={[0, 2.1, 0]} color="#fde047" intensity={2} distance={6} />
        </group>
      );

    case 'obj_spirit_array':
      /* Spirit Array (Tụ Linh Trận) */
      return (
        <group position={[obj.x, 0.03, obj.z]} rotation={[0, obj.rotationY, 0]} onClick={handleClick}>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[1.2, 1.7, 32]} />
            <meshBasicMaterial color="#38bdf8" transparent opacity={0.65} />
          </mesh>
          <pointLight color="#38bdf8" intensity={1.2} distance={3} />
        </group>
      );

    case 'obj_bamboo_bed':
      /* Bamboo Bed */
      return (
        <group position={[obj.x, 0, obj.z]} rotation={[0, obj.rotationY, 0]} onClick={handleClick}>
          <mesh position={[0, 0.3, 0]} castShadow>
            <boxGeometry args={[1.8, 0.4, 1.2]} />
            <meshStandardMaterial color="#65a30d" roughness={0.8} />
          </mesh>
          {/* Pillow */}
          <mesh position={[-0.6, 0.55, 0]}>
            <boxGeometry args={[0.35, 0.12, 0.8]} />
            <meshStandardMaterial color="#f8fafc" />
          </mesh>
        </group>
      );

    default:
      return null;
  }
};

export const AbodeObjects3D: React.FC = () => {
  const abodeObjects = useGameStore((state) => state.abodeObjects);

  return (
    <group>
      {abodeObjects.map((obj) => (
        <SingleAbodeObject key={obj.id} obj={obj} />
      ))}
    </group>
  );
};
