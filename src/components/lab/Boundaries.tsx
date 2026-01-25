import React from 'react';
import { RigidBody } from '@react-three/rapier';

const Boundaries: React.FC = () => {
  const wallThickness = 0.5;
  const arenaSize = 10;
  const wallHeight = 8;

  return (
    <>
      {/* Floor */}
      <RigidBody type="fixed" position={[0, -4, 0]}>
        <mesh receiveShadow>
          <boxGeometry args={[arenaSize * 2, wallThickness, arenaSize * 2]} />
          <meshStandardMaterial color="#1a1a2e" roughness={0.8} />
        </mesh>
      </RigidBody>

      {/* Ceiling */}
      <RigidBody type="fixed" position={[0, wallHeight, 0]}>
        <mesh>
          <boxGeometry args={[arenaSize * 2, wallThickness, arenaSize * 2]} />
          <meshStandardMaterial color="#1a1a2e" transparent opacity={0.1} />
        </mesh>
      </RigidBody>

      {/* Back wall */}
      <RigidBody type="fixed" position={[0, wallHeight / 2 - 4, -arenaSize]}>
        <mesh>
          <boxGeometry args={[arenaSize * 2, wallHeight + wallThickness, wallThickness]} />
          <meshStandardMaterial color="#16213e" transparent opacity={0.3} />
        </mesh>
      </RigidBody>

      {/* Front wall (invisible) */}
      <RigidBody type="fixed" position={[0, wallHeight / 2 - 4, arenaSize]}>
        <mesh>
          <boxGeometry args={[arenaSize * 2, wallHeight + wallThickness, wallThickness]} />
          <meshStandardMaterial color="#16213e" transparent opacity={0} />
        </mesh>
      </RigidBody>

      {/* Left wall */}
      <RigidBody type="fixed" position={[-arenaSize, wallHeight / 2 - 4, 0]}>
        <mesh>
          <boxGeometry args={[wallThickness, wallHeight + wallThickness, arenaSize * 2]} />
          <meshStandardMaterial color="#16213e" transparent opacity={0.3} />
        </mesh>
      </RigidBody>

      {/* Right wall */}
      <RigidBody type="fixed" position={[arenaSize, wallHeight / 2 - 4, 0]}>
        <mesh>
          <boxGeometry args={[wallThickness, wallHeight + wallThickness, arenaSize * 2]} />
          <meshStandardMaterial color="#16213e" transparent opacity={0.3} />
        </mesh>
      </RigidBody>
    </>
  );
};

export default Boundaries;
