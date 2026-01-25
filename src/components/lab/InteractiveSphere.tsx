import React, { useRef, useState } from 'react';
import { RigidBody, RapierRigidBody } from '@react-three/rapier';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface InteractiveSphereProps {
  position: [number, number, number];
  radius?: number;
  color?: string;
  onClick?: () => void;
}

const InteractiveSphere: React.FC<InteractiveSphereProps> = ({
  position,
  radius = 0.6,
  color = '#8b5cf6',
  onClick,
}) => {
  const rigidBodyRef = useRef<RapierRigidBody>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (meshRef.current && hovered) {
      meshRef.current.scale.lerp(new THREE.Vector3(1.15, 1.15, 1.15), 0.1);
    } else if (meshRef.current) {
      meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
    }
  });

  const handleClick = () => {
    if (rigidBodyRef.current) {
      // Apply an upward impulse when clicked
      rigidBodyRef.current.applyImpulse({ x: 0, y: 10, z: 0 }, true);
      // Add a random torque for spin
      rigidBodyRef.current.applyTorqueImpulse(
        {
          x: (Math.random() - 0.5) * 8,
          y: (Math.random() - 0.5) * 8,
          z: (Math.random() - 0.5) * 8,
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
      colliders="ball"
      restitution={0.7}
      friction={0.3}
    >
      <mesh
        ref={meshRef}
        castShadow
        receiveShadow
        onClick={handleClick}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <sphereGeometry args={[radius, 32, 32]} />
        <meshStandardMaterial
          color={hovered ? '#a78bfa' : color}
          roughness={0.2}
          metalness={0.7}
        />
      </mesh>
    </RigidBody>
  );
};

export default InteractiveSphere;
