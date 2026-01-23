import React, { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  Float, 
  Environment,
  OrbitControls,
  PerspectiveCamera,
  Html
} from '@react-three/drei';
import { Physics, RigidBody, CuboidCollider } from '@react-three/rapier';
import type { RapierRigidBody } from '@react-three/rapier';
import * as THREE from 'three';
import { motion } from 'framer-motion';

interface LetterCubeProps {
  letter: string;
  initialPosition: [number, number, number];
  color: string;
}

const LetterCube: React.FC<LetterCubeProps> = ({ letter, initialPosition, color }) => {
  const rigidBodyRef = useRef<RapierRigidBody>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [scale, setScale] = useState(1);

  const handleClick = (e: any) => {
    e.stopPropagation?.();
    
    if (rigidBodyRef.current) {
      rigidBodyRef.current.applyImpulse(
        { 
          x: (Math.random() - 0.5) * 25, 
          y: 18 + Math.random() * 8, 
          z: (Math.random() - 0.5) * 25 
        },
        true
      );
      rigidBodyRef.current.applyTorqueImpulse(
        { 
          x: (Math.random() - 0.5) * 10, 
          y: (Math.random() - 0.5) * 10, 
          z: (Math.random() - 0.5) * 10 
        },
        true
      );
    }
  };

  useFrame(() => {
    const targetScale = isHovered ? 1.12 : 1;
    setScale(prev => prev + (targetScale - prev) * 0.15);
  });

  return (
    <RigidBody
      ref={rigidBodyRef}
      position={initialPosition}
      restitution={0.85}
      friction={0.15}
      linearDamping={0.2}
      angularDamping={0.2}
      colliders="cuboid"
    >
      <group
        scale={scale}
        onClick={handleClick}
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
      >
        {/* Main cube body */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2.2, 2.2, 2.2]} />
          <meshStandardMaterial
            color={isHovered ? '#1a1a1a' : color}
            metalness={0.4}
            roughness={0.1}
            envMapIntensity={1.2}
          />
        </mesh>

        {/* White face panels with letter */}
        {[
          { pos: [0, 0, 1.11] as [number, number, number], rot: [0, 0, 0] as [number, number, number] },
          { pos: [0, 0, -1.11] as [number, number, number], rot: [0, Math.PI, 0] as [number, number, number] },
          { pos: [1.11, 0, 0] as [number, number, number], rot: [0, Math.PI / 2, 0] as [number, number, number] },
          { pos: [-1.11, 0, 0] as [number, number, number], rot: [0, -Math.PI / 2, 0] as [number, number, number] },
          { pos: [0, 1.11, 0] as [number, number, number], rot: [-Math.PI / 2, 0, 0] as [number, number, number] },
          { pos: [0, -1.11, 0] as [number, number, number], rot: [Math.PI / 2, 0, 0] as [number, number, number] },
        ].map((face, i) => (
          <group key={i} position={face.pos} rotation={face.rot}>
            <mesh>
              <planeGeometry args={[1.8, 1.8]} />
              <meshStandardMaterial color="#fafafa" metalness={0} roughness={0.2} />
            </mesh>
            <Html
              transform
              occlude
              position={[0, 0, 0.01]}
              style={{
                fontSize: '48px',
                fontFamily: 'Space Grotesk, sans-serif',
                fontWeight: 'bold',
                color: '#111',
                userSelect: 'none',
                pointerEvents: 'none',
              }}
            >
              {letter}
            </Html>
          </group>
        ))}

        {/* Edge glow effect */}
        <mesh>
          <boxGeometry args={[2.25, 2.25, 2.25]} />
          <meshBasicMaterial 
            color={isHovered ? '#444' : '#222'} 
            wireframe 
            transparent 
            opacity={0.3} 
          />
        </mesh>
      </group>
    </RigidBody>
  );
};

const FloorAndWalls: React.FC = () => {
  return (
    <>
      {/* Floor */}
      <RigidBody type="fixed" position={[0, -5, 0]} colliders="cuboid">
        <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[40, 40]} />
          <meshStandardMaterial 
            color="#f5f5f5" 
            metalness={0.1} 
            roughness={0.8}
          />
        </mesh>
        <CuboidCollider args={[20, 0.1, 20]} />
      </RigidBody>

      {/* Grid on floor */}
      <gridHelper 
        args={[40, 40, '#ddd', '#e5e5e5']} 
        position={[0, -4.99, 0]} 
      />

      {/* Invisible walls */}
      <RigidBody type="fixed" position={[0, 5, -12]} colliders="cuboid">
        <CuboidCollider args={[20, 15, 0.5]} />
      </RigidBody>
      <RigidBody type="fixed" position={[0, 5, 12]} colliders="cuboid">
        <CuboidCollider args={[20, 15, 0.5]} />
      </RigidBody>
      <RigidBody type="fixed" position={[-12, 5, 0]} colliders="cuboid">
        <CuboidCollider args={[0.5, 15, 20]} />
      </RigidBody>
      <RigidBody type="fixed" position={[12, 5, 0]} colliders="cuboid">
        <CuboidCollider args={[0.5, 15, 20]} />
      </RigidBody>
    </>
  );
};

const FloatingDecorations: React.FC = () => {
  return (
    <>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh position={[7, 7, -4]}>
          <octahedronGeometry args={[0.4]} />
          <meshStandardMaterial color="#ccc" wireframe />
        </mesh>
      </Float>
      
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
        <mesh position={[-7, 5, -2]}>
          <icosahedronGeometry args={[0.35]} />
          <meshStandardMaterial color="#bbb" wireframe />
        </mesh>
      </Float>
      
      <Float speed={2.5} rotationIntensity={0.4} floatIntensity={0.6}>
        <mesh position={[5, 9, 2]}>
          <tetrahedronGeometry args={[0.5]} />
          <meshStandardMaterial color="#aaa" wireframe />
        </mesh>
      </Float>

      <Float speed={1.8} rotationIntensity={0.6} floatIntensity={0.4}>
        <mesh position={[-5, 8, 3]}>
          <dodecahedronGeometry args={[0.3]} />
          <meshStandardMaterial color="#999" wireframe />
        </mesh>
      </Float>
    </>
  );
};

const Scene: React.FC = () => {
  const cubes = [
    { letter: 'J', position: [-2.5, 8, 0] as [number, number, number], color: '#1a1a1a' },
    { letter: 'S', position: [2.5, 10, 0] as [number, number, number], color: '#2a2a2a' },
    { letter: 'C', position: [-2.5, 14, 1] as [number, number, number], color: '#3a3a3a' },
    { letter: 'L', position: [2.5, 12, -1] as [number, number, number], color: '#4a4a4a' },
  ];

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 6, 16]} fov={50} />
      <OrbitControls 
        enablePan={false} 
        minDistance={10} 
        maxDistance={25}
        minPolarAngle={0.4}
        maxPolarAngle={Math.PI / 2 - 0.1}
        target={[0, 2, 0]}
        enableDamping
        dampingFactor={0.05}
      />
      
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[8, 15, 8]}
        intensity={1.8}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={40}
        shadow-camera-left={-15}
        shadow-camera-right={15}
        shadow-camera-top={15}
        shadow-camera-bottom={-15}
      />
      <pointLight position={[-8, 8, -8]} intensity={0.4} color="#fff" />
      <hemisphereLight args={['#fafafa', '#e0e0e0', 0.4]} />
      
      <Environment preset="city" />
      
      <Physics gravity={[0, -18, 0]} debug={false}>
        <FloorAndWalls />
        
        {cubes.map((cube) => (
          <LetterCube
            key={cube.letter}
            letter={cube.letter}
            initialPosition={cube.position}
            color={cube.color}
          />
        ))}
      </Physics>
      
      <FloatingDecorations />
    </>
  );
};

const Logo3DPlayground: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative w-full h-full bg-gradient-to-b from-[#fafafa] to-[#f0f0f0]">
      {/* Loading overlay */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: isLoading ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className={`absolute inset-0 z-20 bg-[#fafafa] flex items-center justify-center pointer-events-none ${!isLoading ? 'hidden' : ''}`}
      >
        <div className="font-mono text-sm text-gray-500 animate-pulse">
          LOADING_3D_ENGINE...
        </div>
      </motion.div>

      {/* 3D Canvas */}
      <Canvas
        shadows
        onCreated={() => setTimeout(() => setIsLoading(false), 800)}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent', cursor: 'grab' }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>

      {/* UI Overlay - Instructions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 20 : 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-sm border border-gray-200 px-6 py-3 font-mono text-xs text-gray-600 shadow-lg pointer-events-none"
      >
        <span className="text-gray-400 mr-2">//</span>
        <span className="font-semibold text-black">CLICK</span> cubes to launch
        <span className="mx-3 text-gray-300">|</span>
        <span className="font-semibold text-black">DRAG</span> to orbit
        <span className="mx-3 text-gray-300">|</span>
        <span className="font-semibold text-black">SCROLL</span> to zoom
      </motion.div>

      {/* Tech badge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute top-4 right-4 font-mono text-[10px] text-gray-400 text-right pointer-events-none"
      >
        <div className="text-black font-semibold">LOGO_PHYSICS</div>
        <div>THREE.JS + RAPIER</div>
      </motion.div>
    </div>
  );
};

export default Logo3DPlayground;
