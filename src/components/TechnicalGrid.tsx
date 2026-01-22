import React from 'react';

const TechnicalGrid: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none">
      
      {/* Base Grid Layer - Static */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
            backgroundImage: `linear-gradient(to right, black 1px, transparent 1px), linear-gradient(to bottom, black 1px, transparent 1px)`,
            backgroundSize: '80px 80px'
        }}
      />

      {/* Static Version Marker */}
      <div className="absolute top-32 right-6 font-mono text-[8px] text-gray-400 [writing-mode:vertical-rl] tracking-widest opacity-50">
        SYSTEM.V.2.4 // READY
      </div>
      
      {/* Static System Status */}
      <div className="absolute bottom-10 left-10 font-mono text-[8px] text-gray-400 opacity-60 hidden md:block">
        MEM: 4096 / CPU: OPTIMAL
      </div>
    </div>
  );
};

export default TechnicalGrid;