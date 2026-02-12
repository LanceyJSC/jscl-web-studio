import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Edges } from '@react-three/drei';
import * as THREE from 'three';

const CubeScene: React.FC<{ size: number }> = ({ size }) => {
  const groupRef = useRef<THREE.Group>(null!);
  const [hovered, setHovered] = useState(false);

  const s = size;
  const half = s / 2;
  const depth = s * 0.4;
  const dh = depth / 2;

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    const tx = hovered ? -0.4 : Math.sin(t * 0.5) * 0.05 - 0.3;
    const ty = hovered ? -0.7 : Math.sin(t * 0.3) * 0.05 - 0.5;
    groupRef.current.rotation.x += (tx - groupRef.current.rotation.x) * 3 * delta;
    groupRef.current.rotation.y += (ty - groupRef.current.rotation.y) * 3 * delta;
  });

  // Create letter shapes using basic geometry (planes with canvas textures)
  const letterTextures = useMemo(() => {
    const letters = ['J', 'S', 'C', 'L'];
    return letters.map((char) => {
      const canvas = document.createElement('canvas');
      canvas.width = 128;
      canvas.height = 128;
      const ctx = canvas.getContext('2d')!;
      ctx.clearRect(0, 0, 128, 128);
      ctx.fillStyle = '#000000';
      ctx.font = '500 80px Inter, system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(char, 64, 68);
      const tex = new THREE.CanvasTexture(canvas);
      tex.needsUpdate = true;
      return tex;
    });
  }, []);

  const backLetterTextures = useMemo(() => {
    const letters = ['J', 'S', 'C', 'L'];
    return letters.map((char) => {
      const canvas = document.createElement('canvas');
      canvas.width = 128;
      canvas.height = 128;
      const ctx = canvas.getContext('2d')!;
      ctx.clearRect(0, 0, 128, 128);
      ctx.fillStyle = 'rgba(0,0,0,0.1)';
      ctx.font = '500 80px Inter, system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(char, 64, 68);
      const tex = new THREE.CanvasTexture(canvas);
      tex.needsUpdate = true;
      return tex;
    });
  }, []);

  const letterPositions: [number, number, number][] = [
    [-half / 2, half / 2, dh + 0.01],
    [half / 2, half / 2, dh + 0.01],
    [-half / 2, -half / 2, dh + 0.01],
    [half / 2, -half / 2, dh + 0.01],
  ];

  // Build line geometry for internal grid
  const gridLines = useMemo(() => {
    const positions: number[][] = [
      // Front face cross
      [0, half, dh, 0, -half, dh],
      [-half, 0, dh, half, 0, dh],
      // Back face cross
      [0, half, -dh, 0, -half, -dh],
      [-half, 0, -dh, half, 0, -dh],
      // Depth connectors at midpoints
      [0, half, -dh, 0, half, dh],
      [0, -half, -dh, 0, -half, dh],
      [-half, 0, -dh, -half, 0, dh],
      [half, 0, -dh, half, 0, dh],
      // Center depth line
      [0, 0, -dh, 0, 0, dh],
    ];
    return positions;
  }, [half, dh]);

  return (
    <group
      ref={groupRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Main cube wireframe */}
      <mesh>
        <boxGeometry args={[s, s, depth]} />
        <meshBasicMaterial transparent opacity={0} />
        <Edges color="black" />
      </mesh>

      {/* Internal grid lines */}
      {gridLines.map((pos, i) => {
        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
        return (
          <lineSegments key={i} geometry={geo}>
            <lineBasicMaterial color="black" opacity={i >= 2 ? 0.25 : 1} transparent />
          </lineSegments>
        );
      })}

      {/* Front face letters */}
      {letterPositions.map((pos, i) => (
        <mesh key={`front-${i}`} position={pos}>
          <planeGeometry args={[half * 0.8, half * 0.8]} />
          <meshBasicMaterial map={letterTextures[i]} transparent />
        </mesh>
      ))}

      {/* Back face letters (faint, mirrored) */}
      {letterPositions.map((pos, i) => (
        <mesh
          key={`back-${i}`}
          position={[pos[0], pos[1], -dh - 0.01]}
          rotation={[0, Math.PI, 0]}
        >
          <planeGeometry args={[half * 0.8, half * 0.8]} />
          <meshBasicMaterial map={backLetterTextures[i]} transparent />
        </mesh>
      ))}
    </group>
  );
};

interface Logo3DCubeProps {
  size?: number;
  className?: string;
}

const Logo3DCube: React.FC<Logo3DCubeProps> = ({ size = 2, className = '' }) => {
  return (
    <div className={className} style={{ cursor: 'pointer' }}>
      <Canvas
        camera={{ position: [0, 0, size * 2.8], fov: 40 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
      >
        <CubeScene size={size} />
      </Canvas>
    </div>
  );
};

export default Logo3DCube;
