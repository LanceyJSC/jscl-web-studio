import React, { useRef, useState } from 'react';
import { RigidBody, RapierRigidBody } from '@react-three/rapier';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface InteractiveBoxProps {
  position: [number, number, number];
  size?: [number, number, number];
  color?: string;
  onClick?: () => void;
}

const InteractiveBox: React.FC<InteractiveBoxProps> = ({
  position,
  size = [1, 1, 1],
  color = '#3b82f6',
  onClick,
}) => {
  const rigidBodyRef = useRef<RapierRigidBody>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (meshRef.current && hovered) {
      meshRef.current.scale.lerp(new THREE.Vector3(1.1, 1.1, 1.1), 0.1);
    } else if (meshRef.current) {
      meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
    }
  });

  const handleClick = () => {
    if (rigidBodyRef.current) {
      // Apply an upward impulse when clicked
      rigidBodyRef.current.applyImpulse({ x: 0, y: 8, z: 0 }, true);
      // Add a random torque for spin
      rigidBodyRef.current.applyTorqueImpulse(
        {
          x: (Math.random() - 0.5) * 5,
          y: (Math.random() - 0.5) * 5,
          z: (Math.random() - 0.5) * 5,
        },
        true
      );
    }
    onClick?.();
  };

  return (
    <RigidBody
      ref={rigidBodyRef}
      position={position}
      colliders="cuboid"
      restitution={0.5}
      friction={0.5}
    >
      <mesh
        ref={meshRef}
        castShadow
        receiveShadow
        onClick={handleClick}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <boxGeometry args={size} />
        <meshStandardMaterial
          color={hovered ? '#60a5fa' : color}
          roughness={0.3}
          metalness={0.6}
        />
      </mesh>
    </RigidBody>
  );
};

export default InteractiveBox;
