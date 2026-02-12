import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Edges, Text } from '@react-three/drei';
import * as THREE from 'three';

interface Logo3DCubeProps {
  size?: number;
  className?: string;
}

const CubeScene: React.FC<{ size: number }> = ({ size }) => {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const targetRotation = useRef({ x: -0.3, y: -0.5 });

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    
    // Idle: gentle float. Hovered: tilt to reveal depth
    const t = state.clock.elapsedTime;
    const idleX = Math.sin(t * 0.5) * 0.05 - 0.3;
    const idleY = Math.sin(t * 0.3) * 0.05 - 0.5;
    
    targetRotation.current.x = hovered ? -0.4 : idleX;
    targetRotation.current.y = hovered ? -0.7 : idleY;
    
    groupRef.current.rotation.x += (targetRotation.current.x - groupRef.current.rotation.x) * 3 * delta;
    groupRef.current.rotation.y += (targetRotation.current.y - groupRef.current.rotation.y) * 3 * delta;
  });

  const s = size; // cube size
  const half = s / 2;
  const depth = s * 0.4; // cube depth
  const depthHalf = depth / 2;

  const letters = [
    { char: 'J', pos: [-half / 2, half / 2, depthHalf + 0.01] as [number, number, number] },
    { char: 'S', pos: [half / 2, half / 2, depthHalf + 0.01] as [number, number, number] },
    { char: 'C', pos: [-half / 2, -half / 2, depthHalf + 0.01] as [number, number, number] },
    { char: 'L', pos: [half / 2, -half / 2, depthHalf + 0.01] as [number, number, number] },
  ];

  // Internal grid lines on front face
  const lineColor = '#000000';

  return (
    <group
      ref={groupRef}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      {/* Main cube - transparent with edges */}
      <mesh>
        <boxGeometry args={[s, s, depth]} />
        <meshBasicMaterial transparent opacity={0} side={THREE.DoubleSide} />
        <Edges threshold={15} color="black" lineWidth={1.5} />
      </mesh>

      {/* Internal vertical divider - front face */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={2}
            array={new Float32Array([0, half, depthHalf, 0, -half, depthHalf])}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color={lineColor} />
      </line>

      {/* Internal horizontal divider - front face */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={2}
            array={new Float32Array([-half, 0, depthHalf, half, 0, depthHalf])}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color={lineColor} />
      </line>

      {/* Internal vertical divider - back face */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={2}
            array={new Float32Array([0, half, -depthHalf, 0, -half, -depthHalf])}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color={lineColor} opacity={0.3} transparent />
      </line>

      {/* Internal horizontal divider - back face */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={2}
            array={new Float32Array([-half, 0, -depthHalf, half, 0, -depthHalf])}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color={lineColor} opacity={0.3} transparent />
      </line>

      {/* Depth connecting lines at center cross */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={2}
            array={new Float32Array([0, half, -depthHalf, 0, half, depthHalf])}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color={lineColor} opacity={0.2} transparent />
      </line>
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={2}
            array={new Float32Array([0, -half, -depthHalf, 0, -half, depthHalf])}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color={lineColor} opacity={0.2} transparent />
      </line>
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={2}
            array={new Float32Array([-half, 0, -depthHalf, -half, 0, depthHalf])}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color={lineColor} opacity={0.2} transparent />
      </line>
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={2}
            array={new Float32Array([half, 0, -depthHalf, half, 0, depthHalf])}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color={lineColor} opacity={0.2} transparent />
      </line>

      {/* Letters on front face */}
      {letters.map(({ char, pos }) => (
        <Text
          key={char}
          position={pos}
          fontSize={half * 0.7}
          color="black"
          anchorX="center"
          anchorY="middle"
          font="/fonts/inter-medium.woff"
          fontWeight={500}
        >
          {char}
        </Text>
      ))}

      {/* Faint letters on back face (reversed) */}
      {letters.map(({ char, pos }) => (
        <Text
          key={`back-${char}`}
          position={[pos[0], pos[1], -depthHalf - 0.01]}
          fontSize={half * 0.7}
          color="black"
          anchorX="center"
          anchorY="middle"
          rotation={[0, Math.PI, 0]}
          fillOpacity={0.1}
        >
          {char}
        </Text>
      ))}
    </group>
  );
};

const Logo3DCube: React.FC<Logo3DCubeProps> = ({ size = 2, className = '' }) => {
  return (
    <div className={`${className}`} style={{ cursor: 'pointer' }}>
      <Canvas
        camera={{ position: [0, 0, size * 2.5], fov: 45 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        <CubeScene size={size} />
      </Canvas>
    </div>
  );
};

export default Logo3DCube;
