import React, { Suspense, useRef, useEffect, useState, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { Physics, RapierRigidBody, RigidBody } from '@react-three/rapier';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

import SceneEnvironment from './SceneEnvironment';
import InteractiveBox from './InteractiveBox';
import InteractiveSphere from './InteractiveSphere';
import Boundaries from './Boundaries';

export type GravityMode = 'normal' | 'zero' | 'reverse' | 'chaos';

interface PhysicsSceneProps {
  gravityMode: GravityMode;
  triggerExplosion: number;
  triggerReset: number;
  gyroEnabled: boolean;
  gyroData: { beta: number; gamma: number };
}

// Store refs to all physics bodies for explosion/reset
const objectRefs: React.RefObject<RapierRigidBody | null>[] = [];

const PhysicsObjects: React.FC<{
  triggerExplosion: number;
  triggerReset: number;
}> = ({ triggerExplosion, triggerReset }) => {
  const initialPositions = useRef<[number, number, number][]>([
    // Cubes
    [-2, 2, 0],
    [2, 3, 1],
    [0, 4, -1],
    [-3, 1, 2],
    [3, 2, -2],
    // Spheres
    [1, 5, 0],
    [-1, 3, 1],
    [0, 2, 2],
    [2, 4, -1],
    [-2, 5, -1],
  ]);

  const boxRefs = useRef<(RapierRigidBody | null)[]>([]);
  const sphereRefs = useRef<(RapierRigidBody | null)[]>([]);

  // Handle explosion
  useEffect(() => {
    if (triggerExplosion > 0) {
      [...boxRefs.current, ...sphereRefs.current].forEach((ref) => {
        if (ref) {
          const force = 15;
          ref.applyImpulse(
            {
              x: (Math.random() - 0.5) * force,
              y: Math.random() * force + 5,
              z: (Math.random() - 0.5) * force,
            },
            true
          );
          ref.applyTorqueImpulse(
            {
              x: (Math.random() - 0.5) * 10,
              y: (Math.random() - 0.5) * 10,
              z: (Math.random() - 0.5) * 10,
            },
            true
          );
        }
      });
    }
  }, [triggerExplosion]);

  // Handle reset
  useEffect(() => {
    if (triggerReset > 0) {
      const allRefs = [...boxRefs.current, ...sphereRefs.current];
      allRefs.forEach((ref, index) => {
        if (ref && initialPositions.current[index]) {
          const [x, y, z] = initialPositions.current[index];
          ref.setTranslation({ x, y, z }, true);
          ref.setRotation({ x: 0, y: 0, z: 0, w: 1 }, true);
          ref.setLinvel({ x: 0, y: 0, z: 0 }, true);
          ref.setAngvel({ x: 0, y: 0, z: 0 }, true);
        }
      });
    }
  }, [triggerReset]);

  const colors = {
    boxes: ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#6366f1'],
    spheres: ['#8b5cf6', '#ec4899', '#14b8a6', '#f97316', '#06b6d4'],
  };

  return (
    <>
      {/* Boxes */}
      {initialPositions.current.slice(0, 5).map((pos, i) => (
        <RigidBody
          key={`box-${i}`}
          ref={(el) => {
            boxRefs.current[i] = el;
          }}
          position={pos}
          colliders="cuboid"
          restitution={0.5}
          friction={0.5}
        >
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.8 + Math.random() * 0.4, 0.8 + Math.random() * 0.4, 0.8 + Math.random() * 0.4]} />
            <meshStandardMaterial color={colors.boxes[i]} roughness={0.3} metalness={0.6} />
          </mesh>
        </RigidBody>
      ))}

      {/* Spheres */}
      {initialPositions.current.slice(5, 10).map((pos, i) => (
        <RigidBody
          key={`sphere-${i}`}
          ref={(el) => {
            sphereRefs.current[i] = el;
          }}
          position={pos}
          colliders="ball"
          restitution={0.7}
          friction={0.3}
        >
          <mesh castShadow receiveShadow>
            <sphereGeometry args={[0.4 + Math.random() * 0.3, 32, 32]} />
            <meshStandardMaterial color={colors.spheres[i]} roughness={0.2} metalness={0.7} />
          </mesh>
        </RigidBody>
      ))}
    </>
  );
};

const PhysicsScene: React.FC<PhysicsSceneProps> = ({
  gravityMode,
  triggerExplosion,
  triggerReset,
  gyroEnabled,
  gyroData,
}) => {
  const getGravity = useCallback((): [number, number, number] => {
    if (gyroEnabled) {
      // Map gyro data to gravity direction
      const sensitivity = 0.5;
      const x = (gyroData.gamma / 45) * 9.81 * sensitivity;
      const z = (gyroData.beta / 45) * 9.81 * sensitivity;
      return [x, -9.81, z];
    }

    switch (gravityMode) {
      case 'zero':
        return [0, 0, 0];
      case 'reverse':
        return [0, 9.81, 0];
      case 'chaos':
        return [
          Math.sin(Date.now() / 1000) * 5,
          Math.cos(Date.now() / 1500) * 9.81,
          Math.sin(Date.now() / 800) * 5,
        ];
      default:
        return [0, -9.81, 0];
    }
  }, [gravityMode, gyroEnabled, gyroData]);

  const [gravity, setGravity] = useState<[number, number, number]>(getGravity());

  useEffect(() => {
    const interval = setInterval(() => {
      setGravity(getGravity());
    }, gravityMode === 'chaos' ? 50 : 100);
    return () => clearInterval(interval);
  }, [getGravity, gravityMode]);

  return (
    <Canvas shadows className="touch-none">
      <PerspectiveCamera makeDefault position={[0, 2, 12]} fov={50} />
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={8}
        maxDistance={20}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={0.1}
      />
      
      <color attach="background" args={['#0a0a0f']} />
      <fog attach="fog" args={['#0a0a0f', 15, 30]} />
      
      <Suspense fallback={null}>
        <SceneEnvironment />
        <Physics gravity={gravity}>
          <Boundaries />
          <PhysicsObjects
            triggerExplosion={triggerExplosion}
            triggerReset={triggerReset}
          />
        </Physics>
      </Suspense>
    </Canvas>
  );
};

export default PhysicsScene;
