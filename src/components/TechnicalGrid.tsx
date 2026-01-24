import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const TechnicalGrid: React.FC = () => {
  const { scrollYProgress } = useScroll();
  
  // Subtle parallax for grid elements
  const gridY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const markerY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const statusY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none">
      
      {/* Base Grid Layer - with subtle parallax */}
      <motion.div 
        style={{ y: gridY }}
        className="absolute inset-0 opacity-[0.03]"
      >
        <div 
          className="absolute inset-0"
          style={{
              backgroundImage: `linear-gradient(to right, black 1px, transparent 1px), linear-gradient(to bottom, black 1px, transparent 1px)`,
              backgroundSize: '80px 80px'
          }}
        />
      </motion.div>

      {/* Parallax Version Marker */}
      <motion.div 
        style={{ y: markerY }}
        className="absolute top-32 right-6 font-mono text-[8px] text-gray-400 [writing-mode:vertical-rl] tracking-widest opacity-50"
      >
        SYSTEM.V.2.4 // READY
      </motion.div>
      
      {/* Parallax System Status */}
      <motion.div 
        style={{ y: statusY }}
        className="absolute bottom-10 left-10 font-mono text-[8px] text-gray-400 opacity-60 hidden md:block"
      >
        MEM: 4096 / CPU: OPTIMAL
      </motion.div>
    </div>
  );
};

export default TechnicalGrid;