import React from 'react';

const Noise: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[9000] opacity-[0.03] mix-blend-overlay overflow-hidden">
      <svg className="w-full h-full">
        <filter id="noiseFilter">
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency="0.80" 
            numOctaves="3" 
            stitchTiles="stitch" 
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
    </div>
  );
};

export default Noise;
