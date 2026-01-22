import React from 'react';
import { motion } from 'framer-motion';

interface GeometricShapesProps {
  variant: 'projects' | 'about' | 'contact';
}

const GeometricShapes: React.FC<GeometricShapesProps> = ({ variant }) => {
  if (variant === 'projects') {
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Floating circles for Projects page */}
        <motion.div
          className="absolute top-20 right-20 w-32 h-32 border border-foreground/10 rounded-full"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-40 right-40 w-16 h-16 border border-foreground/10 rounded-full"
          animate={{ 
            scale: [1.1, 1, 1.1],
            x: [0, 20, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-32 left-20 w-48 h-48 border border-foreground/5 rounded-full"
          animate={{ 
            rotate: [360, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-1/2 left-10 w-24 h-24 bg-foreground/[0.02] rounded-full"
          animate={{ 
            y: [0, -30, 0],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Concentric circles */}
        <div className="absolute bottom-20 right-1/4">
          {[80, 60, 40].map((size, i) => (
            <motion.div
              key={size}
              className="absolute border border-foreground/5 rounded-full"
              style={{ 
                width: size, 
                height: size,
                top: (80 - size) / 2,
                left: (80 - size) / 2
              }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 4, delay: i * 0.3, repeat: Infinity }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (variant === 'about') {
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Triangular shapes for About page */}
        <motion.div
          className="absolute top-32 right-32"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-0 h-0 border-l-[40px] border-l-transparent border-r-[40px] border-r-transparent border-b-[70px] border-b-foreground/10" />
        </motion.div>
        <motion.div
          className="absolute bottom-40 left-32"
          animate={{ 
            rotate: [180, 0, 180],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-0 h-0 border-l-[60px] border-l-transparent border-r-[60px] border-r-transparent border-b-[100px] border-b-foreground/5" />
        </motion.div>
        <motion.div
          className="absolute top-1/2 right-20"
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 45, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-0 h-0 border-l-[25px] border-l-transparent border-r-[25px] border-r-transparent border-b-[43px] border-b-foreground/10" />
        </motion.div>
        {/* Diamond shape */}
        <motion.div
          className="absolute top-20 left-1/4 w-16 h-16 border border-foreground/10"
          style={{ transform: 'rotate(45deg)' }}
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [45, 90, 45]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-1/3 w-8 h-8 border border-foreground/10"
          style={{ transform: 'rotate(45deg)' }}
          animate={{ 
            y: [0, 20, 0],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    );
  }

  if (variant === 'contact') {
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Square/rectangular shapes for Contact page */}
        <motion.div
          className="absolute top-24 right-24 w-20 h-20 border border-foreground/10"
          animate={{ 
            rotate: [0, 90, 180, 270, 360],
            scale: [1, 1.1, 1, 1.1, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-32 left-24 w-32 h-32 border border-foreground/5"
          animate={{ 
            rotate: [45, 135, 45]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/3 left-16 w-12 h-12 bg-foreground/[0.02]"
          animate={{ 
            x: [0, 30, 0],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Grid of small squares */}
        <div className="absolute bottom-24 right-20 grid grid-cols-3 gap-2">
          {[...Array(9)].map((_, i) => (
            <motion.div
              key={i}
              className="w-4 h-4 border border-foreground/10"
              animate={{ 
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                duration: 3, 
                delay: i * 0.2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
        {/* Cross shape */}
        <motion.div
          className="absolute top-1/2 right-1/3"
          animate={{ rotate: [0, 180, 360] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          <div className="relative w-16 h-16">
            <div className="absolute top-1/2 left-0 w-full h-[2px] bg-foreground/10 -translate-y-1/2" />
            <div className="absolute top-0 left-1/2 w-[2px] h-full bg-foreground/10 -translate-x-1/2" />
          </div>
        </motion.div>
      </div>
    );
  }

  return null;
};

export default GeometricShapes;
