import React from 'react';
import { Environment, ContactShadows } from '@react-three/drei';

const SceneEnvironment: React.FC = () => {
  return (
    <>
      {/* Ambient lighting */}
      <ambientLight intensity={0.4} />
      
      {/* Main directional light with shadows */}
      <directionalLight
        position={[10, 15, 10]}
        intensity={1}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      
      {/* Fill light */}
      <directionalLight
        position={[-5, 5, -5]}
        intensity={0.3}
      />
      
      {/* Accent light */}
      <pointLight position={[0, 10, 0]} intensity={0.5} color="#4f46e5" />
      
      {/* Environment for reflections */}
      <Environment preset="city" />
      
      {/* Contact shadows for grounding */}
      <ContactShadows
        position={[0, -3.9, 0]}
        opacity={0.4}
        scale={20}
        blur={2}
        far={4}
      />
    </>
  );
};

export default SceneEnvironment;
