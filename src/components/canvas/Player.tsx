import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useGameStore } from '../../store/gameStore';

export const Player: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const isMeditating = useGameStore((state) => state.character.isMeditating);
  const tickCultivation = useGameStore((state) => state.tickCultivation);

  // Position and movement state
  const pos = useRef(new THREE.Vector3(0, 0, 2));
  const targetRotation = useRef(0);
  const keys = useRef<{ [key: string]: boolean }>({});

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keys.current[e.code] = true;
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      keys.current[e.code] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useFrame((state, delta) => {
    // Tick active cultivation when meditating
    if (isMeditating) {
      tickCultivation(delta);
      // Snap to futon position when meditating
      pos.current.set(0, 0, 0);
      if (groupRef.current) {
        groupRef.current.position.copy(pos.current);
        groupRef.current.rotation.y = 0;
      }
      return;
    }

    // Movement calculation
    let moveX = 0;
    let moveZ = 0;
    const speed = keys.current['ShiftLeft'] || keys.current['ShiftRight'] ? 6 : 3.5;

    if (keys.current['KeyW'] || keys.current['ArrowUp']) moveZ -= 1;
    if (keys.current['KeyS'] || keys.current['ArrowDown']) moveZ += 1;
    if (keys.current['KeyA'] || keys.current['ArrowLeft']) moveX -= 1;
    if (keys.current['KeyD'] || keys.current['ArrowRight']) moveX += 1;

    if (moveX !== 0 || moveZ !== 0) {
      const moveVec = new THREE.Vector3(moveX, 0, moveZ).normalize();
      pos.current.x += moveVec.x * speed * delta;
      pos.current.z += moveVec.z * speed * delta;

      // Keep within bounds (radius 45m)
      const dist = Math.sqrt(pos.current.x * pos.current.x + pos.current.z * pos.current.z);
      if (dist > 45) {
        pos.current.x = (pos.current.x / dist) * 45;
        pos.current.z = (pos.current.z / dist) * 45;
      }

      targetRotation.current = Math.atan2(moveVec.x, moveVec.z);
    }

    if (groupRef.current) {
      groupRef.current.position.copy(pos.current);
      // Smoothly interpolate rotation towards target
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRotation.current,
        10 * delta
      );

      // Camera smoothly follows player
      const idealCameraOffset = new THREE.Vector3(0, 3.8, 6.2);
      idealCameraOffset.add(pos.current);
      state.camera.position.lerp(idealCameraOffset, 5 * delta);
      state.camera.lookAt(pos.current.x, pos.current.y + 1.2, pos.current.z);
    }
  });

  return (
    <group ref={groupRef} position={[pos.current.x, 0, pos.current.z]}>
      {isMeditating ? (
        /* Lotus Meditation Posture */
        <group position={[0, 0.25, 0]}>
          {/* Robe lower body crossed legs */}
          <mesh castShadow position={[0, 0.15, 0]}>
            <cylinderGeometry args={[0.45, 0.55, 0.3, 16]} />
            <meshStandardMaterial color="#3b82f6" roughness={0.7} />
          </mesh>
          {/* Upper torso */}
          <mesh castShadow position={[0, 0.5, 0]}>
            <cylinderGeometry args={[0.22, 0.28, 0.5, 12]} />
            <meshStandardMaterial color="#f8fafc" roughness={0.6} />
          </mesh>
          {/* Head */}
          <mesh castShadow position={[0, 0.85, 0]}>
            <sphereGeometry args={[0.16, 16, 16]} />
            <meshStandardMaterial color="#fde047" roughness={0.5} />
          </mesh>
          {/* Hair Bun / Đạo Kế */}
          <mesh position={[0, 1.05, -0.04]} castShadow>
            <cylinderGeometry args={[0.06, 0.08, 0.12, 10]} />
            <meshStandardMaterial color="#1e293b" />
          </mesh>
          {/* Qi glow particles / aura */}
          <pointLight color="#38bdf8" intensity={1.5} distance={3} />
        </group>
      ) : (
        /* Standing / Walking Posture */
        <group position={[0, 0, 0]}>
          {/* Legs / Robe skirt */}
          <mesh castShadow position={[0, 0.55, 0]}>
            <cylinderGeometry args={[0.22, 0.35, 0.9, 14]} />
            <meshStandardMaterial color="#1d4ed8" roughness={0.7} />
          </mesh>
          {/* Upper Body / Daoist Robe */}
          <mesh castShadow position={[0, 1.15, 0]}>
            <cylinderGeometry args={[0.24, 0.26, 0.6, 14]} />
            <meshStandardMaterial color="#f8fafc" roughness={0.5} />
          </mesh>
          {/* Sash / Đai lưng */}
          <mesh position={[0, 0.95, 0]}>
            <cylinderGeometry args={[0.26, 0.26, 0.08, 14]} />
            <meshStandardMaterial color="#eab308" />
          </mesh>
          {/* Head */}
          <mesh castShadow position={[0, 1.6, 0]}>
            <sphereGeometry args={[0.18, 16, 16]} />
            <meshStandardMaterial color="#fed7aa" roughness={0.5} />
          </mesh>
          {/* Hair Bun / Đạo Kế */}
          <mesh position={[0, 1.84, -0.04]} castShadow>
            <cylinderGeometry args={[0.07, 0.09, 0.14, 10]} />
            <meshStandardMaterial color="#0f172a" />
          </mesh>
          {/* Wooden Hairpin / Trâm gỗ */}
          <mesh position={[0, 1.84, -0.04]} rotation={[0, 0, Math.PI / 3]}>
            <cylinderGeometry args={[0.015, 0.015, 0.35, 8]} />
            <meshStandardMaterial color="#b45309" />
          </mesh>
        </group>
      )}

      {/* Name tag above player */}
      <mesh position={[0, 2.3, 0]}>
        <planeGeometry args={[1.2, 0.3]} />
        <meshBasicMaterial color="#0f172a" transparent opacity={0.6} />
      </mesh>
    </group>
  );
};

