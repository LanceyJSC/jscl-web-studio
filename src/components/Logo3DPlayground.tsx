import React, { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  Text3D, 
  Center, 
  Float, 
  Environment,
  OrbitControls,
  PerspectiveCamera,
  useTexture
} from '@react-three/drei';
import { Physics, RigidBody, CuboidCollider, RapierRigidBody } from '@react-three/rapier';
import * as THREE from 'three';
import { motion } from 'framer-motion';

interface LetterCubeProps {
  letter: string;
  position: [number, number, number];
  color: string;
  index: number;
}

const LetterCube: React.FC<LetterCubeProps> = ({ letter, position, color, index }) => {
  const rigidBodyRef = useRef<RapierRigidBody>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const { camera, gl } = useThree();

  const handlePointerDown = (e: any) => {
    e.stopPropagation();
    setIsDragging(true);
    gl.domElement.style.cursor = 'grabbing';
    
    // Apply upward impulse when clicked
    if (rigidBodyRef.current) {
      rigidBodyRef.current.applyImpulse(
        { x: (Math.random() - 0.5) * 15, y: 12, z: (Math.random() - 0.5) * 15 },
        true
      );
      rigidBodyRef.current.applyTorqueImpulse(
        { x: (Math.random() - 0.5) * 5, y: (Math.random() - 0.5) * 5, z: (Math.random() - 0.5) * 5 },
        true
      );
    }
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    gl.domElement.style.cursor = isHovered ? 'grab' : 'auto';
  };

  const handlePointerEnter = () => {
    setIsHovered(true);
    gl.domElement.style.cursor = 'grab';
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    if (!isDragging) {
      gl.domElement.style.cursor = 'auto';
    }
  };

  useFrame(() => {
    if (meshRef.current && isHovered && !isDragging) {
      meshRef.current.scale.lerp(new THREE.Vector3(1.1, 1.1, 1.1), 0.1);
    } else if (meshRef.current) {
      meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
    }
  });

  return (
    <RigidBody
      ref={rigidBodyRef}
      position={position}
      restitution={0.7}
      friction={0.3}
      linearDamping={0.5}
      angularDamping={0.5}
      colliders="cuboid"
    >
      <mesh
        ref={meshRef}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[1.8, 1.8, 1.8]} />
        <meshStandardMaterial
          color={isHovered ? '#333' : color}
          metalness={0.1}
          roughness={0.2}
          envMapIntensity={0.5}
        />
        
        {/* Letter on front face */}
        <mesh position={[0, 0, 0.91]}>
          <planeGeometry args={[1.5, 1.5]} />
          <meshStandardMaterial color="#fafafa" metalness={0} roughness={0.5} />
        </mesh>
        
        {/* Letter text - simplified approach */}
        <group position={[0, 0, 0.92]}>
          <mesh>
            <planeGeometry args={[1.2, 1.2]} />
            <meshBasicMaterial transparent opacity={0}>
              {/* We'll render the letter using HTML overlay instead */}
            </meshBasicMaterial>
          </mesh>
        </group>
      </mesh>
      
      {/* 3D Text for letter */}
      <Center position={[0, 0, 0.95]}>
        <Text3D
          font="/fonts/helvetiker_bold.typeface.json"
          size={0.8}
          height={0.1}
          curveSegments={12}
          bevelEnabled={false}
        >
          {letter}
          <meshStandardMaterial color="#111" />
        </Text3D>
      </Center>
    </RigidBody>
  );
};

// Simplified letter cube without 3D text font dependency
const SimpleLetterCube: React.FC<LetterCubeProps> = ({ letter, position, color, index }) => {
  const rigidBodyRef = useRef<RapierRigidBody>(null);
  const meshRef = useRef<THREE.Group>(null);
  const [isHovered, setIsHovered] = useState(false);
  const { gl } = useThree();

  const handleClick = (e: any) => {
    e.stopPropagation();
    
    if (rigidBodyRef.current) {
      // Apply random impulse for fun physics
      rigidBodyRef.current.applyImpulse(
        { 
          x: (Math.random() - 0.5) * 20, 
          y: 15 + Math.random() * 10, 
          z: (Math.random() - 0.5) * 20 
        },
        true
      );
      rigidBodyRef.current.applyTorqueImpulse(
        { 
          x: (Math.random() - 0.5) * 8, 
          y: (Math.random() - 0.5) * 8, 
          z: (Math.random() - 0.5) * 8 
        },
        true
      );
    }
  };

  const handlePointerEnter = () => {
    setIsHovered(true);
    gl.domElement.style.cursor = 'pointer';
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    gl.domElement.style.cursor = 'auto';
  };

  useFrame(() => {
    if (meshRef.current) {
      const targetScale = isHovered ? 1.15 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.15);
    }
  });

  return (
    <RigidBody
      ref={rigidBodyRef}
      position={position}
      restitution={0.8}
      friction={0.2}
      linearDamping={0.3}
      angularDamping={0.3}
    >
      <group
        ref={meshRef}
        onClick={handleClick}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
      >
        {/* Main cube */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial
            color={isHovered ? '#222' : color}
            metalness={0.3}
            roughness={0.15}
            envMapIntensity={1}
          />
        </mesh>

        {/* Letter faces - front */}
        <mesh position={[0, 0, 1.01]}>
          <planeGeometry args={[1.6, 1.6]} />
          <meshStandardMaterial color="#fafafa" metalness={0} roughness={0.3} />
        </mesh>

        {/* Letter faces - back */}
        <mesh position={[0, 0, -1.01]} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[1.6, 1.6]} />
          <meshStandardMaterial color="#fafafa" metalness={0} roughness={0.3} />
        </mesh>

        {/* Edges for depth */}
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(2, 2, 2)]} />
          <lineBasicMaterial color="#000" linewidth={1} />
        </lineSegments>
      </group>
    </RigidBody>
  );
};

const Floor: React.FC = () => {
  return (
    <RigidBody type="fixed" position={[0, -6, 0]}>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial 
          color="#e8e8e8" 
          metalness={0} 
          roughness={0.9}
          transparent
          opacity={0.5}
        />
      </mesh>
      
      {/* Grid lines */}
      <gridHelper args={[50, 50, '#ccc', '#ddd']} rotation={[0, 0, 0]} position={[0, 0.01, 0]} />
    </RigidBody>
  );
};

const Walls: React.FC = () => {
  return (
    <>
      {/* Invisible walls */}
      <RigidBody type="fixed" position={[0, 0, -15]}>
        <CuboidCollider args={[25, 20, 0.5]} />
      </RigidBody>
      <RigidBody type="fixed" position={[0, 0, 15]}>
        <CuboidCollider args={[25, 20, 0.5]} />
      </RigidBody>
      <RigidBody type="fixed" position={[-15, 0, 0]}>
        <CuboidCollider args={[0.5, 20, 25]} />
      </RigidBody>
      <RigidBody type="fixed" position={[15, 0, 0]}>
        <CuboidCollider args={[0.5, 20, 25]} />
      </RigidBody>
    </>
  );
};

const Scene: React.FC = () => {
  const letters = [
    { letter: 'J', position: [-2.5, 5, 0] as [number, number, number], color: '#1a1a1a' },
    { letter: 'S', position: [2.5, 6, 0] as [number, number, number], color: '#2a2a2a' },
    { letter: 'C', position: [-2.5, 10, 1] as [number, number, number], color: '#3a3a3a' },
    { letter: 'L', position: [2.5, 8, -1] as [number, number, number], color: '#4a4a4a' },
  ];

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 5, 18]} fov={50} />
      <OrbitControls 
        enablePan={false} 
        minDistance={8} 
        maxDistance={30}
        minPolarAngle={0.3}
        maxPolarAngle={Math.PI / 2 - 0.1}
        target={[0, 0, 0]}
      />
      
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[10, 20, 10]}
        intensity={1.5}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={50}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />
      <pointLight position={[-10, 10, -10]} intensity={0.5} color="#fff" />
      
      <Environment preset="city" />
      
      <Physics gravity={[0, -15, 0]}>
        <Floor />
        <Walls />
        
        {letters.map((item, index) => (
          <SimpleLetterCube
            key={item.letter}
            letter={item.letter}
            position={item.position}
            color={item.color}
            index={index}
          />
        ))}
      </Physics>
      
      {/* Decorative floating elements */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh position={[8, 8, -5]}>
          <octahedronGeometry args={[0.5]} />
          <meshStandardMaterial color="#ddd" wireframe />
        </mesh>
      </Float>
      
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
        <mesh position={[-8, 6, -3]}>
          <icosahedronGeometry args={[0.4]} />
          <meshStandardMaterial color="#ccc" wireframe />
        </mesh>
      </Float>
      
      <Float speed={2.5} rotationIntensity={0.4} floatIntensity={0.6}>
        <mesh position={[6, 10, 3]}>
          <tetrahedronGeometry args={[0.6]} />
          <meshStandardMaterial color="#bbb" wireframe />
        </mesh>
      </Float>
    </>
  );
};

const Logo3DPlayground: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative w-full h-full bg-gradient-to-b from-[#fafafa] to-[#f0f0f0]">
      {/* Loading overlay */}
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: isLoading ? 1 : 0 }}
          className="absolute inset-0 z-20 bg-[#fafafa] flex items-center justify-center"
        >
          <div className="font-mono text-sm text-gray-500 animate-pulse">
            INITIALIZING_3D_ENGINE...
          </div>
        </motion.div>
      )}

      {/* 3D Canvas */}
      <Canvas
        shadows
        onCreated={() => setTimeout(() => setIsLoading(false), 500)}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>

      {/* UI Overlay - Instructions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 20 : 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm border border-gray-200 px-6 py-3 font-mono text-xs text-gray-600 shadow-lg"
      >
        <span className="text-gray-400 mr-2">//</span>
        CLICK cubes to launch
        <span className="mx-3 text-gray-300">|</span>
        DRAG to orbit
        <span className="mx-3 text-gray-300">|</span>
        SCROLL to zoom
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="absolute top-4 right-4 font-mono text-[10px] text-gray-400 text-right"
      >
        <div className="text-black font-semibold">LOGO_PHYSICS</div>
        <div>WEBGL_RENDERER</div>
        <div>RAPIER_ENGINE</div>
      </motion.div>
    </div>
  );
};

export default Logo3DPlayground;
