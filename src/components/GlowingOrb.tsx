import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface GlowingOrbProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  position?: { top?: string; left?: string; right?: string; bottom?: string };
  delay?: number;
}

const GlowingOrb: React.FC<GlowingOrbProps> = ({ 
  size = 'md', 
  color = 'rgba(0,0,0,0.03)',
  position = { top: '20%', left: '10%' },
  delay = 0
}) => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 0.9]);
  
  const sizeClasses = {
    sm: 'w-32 h-32',
    md: 'w-64 h-64',
    lg: 'w-96 h-96'
  };

  return (
    <motion.div
      className={`absolute ${sizeClasses[size]} rounded-full pointer-events-none`}
      style={{ 
        ...position,
        y,
        scale,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: 'blur(40px)'
      }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 1.5, ease: "easeOut" }}
    />
  );
};

export default GlowingOrb;
