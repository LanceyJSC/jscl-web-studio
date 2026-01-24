import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ParallaxBackground: React.FC = () => {
  const { scrollYProgress } = useScroll();
  
  // Different speeds for depth effect
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -600]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, 300]);
  
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const rotate3 = useTransform(scrollYProgress, [0, 1], [0, 90]);
  
  const scale1 = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 0.8]);
  const opacity1 = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.03, 0.06, 0.04, 0.02]);

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none">
      
      {/* Floating geometric shapes - Layer 1 (slowest) */}
      <motion.div
        style={{ y: y1, rotate: rotate1, scale: scale1 }}
        className="absolute -top-20 -left-20 w-96 h-96"
      >
        <div className="w-full h-full border border-black/[0.03] rounded-full" />
      </motion.div>
      
      <motion.div
        style={{ y: y1, opacity: opacity1 }}
        className="absolute top-[30%] right-[10%] w-64 h-64"
      >
        <div className="w-full h-full border border-black/[0.04] rotate-45" />
      </motion.div>

      {/* Layer 2 (medium speed) */}
      <motion.div
        style={{ y: y2, rotate: rotate2 }}
        className="absolute top-[60%] -left-10 w-48 h-48 opacity-[0.03]"
      >
        <div className="w-full h-full bg-gradient-to-br from-black/10 to-transparent rounded-full blur-xl" />
      </motion.div>
      
      <motion.div
        style={{ y: y2 }}
        className="absolute top-[20%] left-[20%] w-32 h-32"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full opacity-[0.02]">
          <polygon points="50,5 95,97.5 5,97.5" fill="none" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      </motion.div>

      {/* Layer 3 (faster) */}
      <motion.div
        style={{ y: y3, rotate: rotate3 }}
        className="absolute top-[80%] right-[20%] w-24 h-24"
      >
        <div className="w-full h-full border border-black/[0.05]" />
      </motion.div>
      
      <motion.div
        style={{ y: y3 }}
        className="absolute top-[40%] right-[30%] w-3 h-3 bg-black/[0.06] rounded-full"
      />
      
      <motion.div
        style={{ y: y3 }}
        className="absolute top-[70%] left-[15%] w-2 h-2 bg-black/[0.05] rounded-full"
      />

      {/* Layer 4 (reverse direction for depth) */}
      <motion.div
        style={{ y: y4 }}
        className="absolute top-[10%] right-[40%] w-40 h-40 opacity-[0.02]"
      >
        <div className="w-full h-full border border-black/20 rounded-full blur-sm" />
      </motion.div>

      {/* Floating lines */}
      <motion.div
        style={{ y: y2 }}
        className="absolute top-[50%] left-[5%] w-[1px] h-32 bg-gradient-to-b from-transparent via-black/[0.04] to-transparent"
      />
      
      <motion.div
        style={{ y: y1 }}
        className="absolute top-[25%] right-[5%] w-[1px] h-48 bg-gradient-to-b from-transparent via-black/[0.03] to-transparent"
      />

      {/* Subtle gradient orbs */}
      <motion.div
        style={{ y: y2 }}
        className="absolute top-[90%] left-[50%] -translate-x-1/2 w-[600px] h-[600px] opacity-[0.015]"
      >
        <div className="w-full h-full bg-gradient-radial from-black to-transparent rounded-full blur-3xl" />
      </motion.div>
    </div>
  );
};

export default ParallaxBackground;
