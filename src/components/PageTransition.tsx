import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [scanComplete, setScanComplete] = useState(false);

  useEffect(() => {
    // Reset states on mount
    setIsLoading(true);
    setScanComplete(false);
    
    const scanTimer = setTimeout(() => {
      setScanComplete(true);
    }, 600);

    const loadTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => {
      clearTimeout(scanTimer);
      clearTimeout(loadTimer);
    };
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loader"
            className="fixed inset-0 z-[100] bg-background flex items-center justify-center"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {/* Frame corners */}
            <div className="absolute inset-8 pointer-events-none">
              {/* Top Left */}
              <motion.div
                className="absolute top-0 left-0 w-8 h-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <div className="absolute top-0 left-0 w-full h-[2px] bg-foreground" />
                <div className="absolute top-0 left-0 h-full w-[2px] bg-foreground" />
              </motion.div>
              
              {/* Top Right */}
              <motion.div
                className="absolute top-0 right-0 w-8 h-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
              >
                <div className="absolute top-0 right-0 w-full h-[2px] bg-foreground" />
                <div className="absolute top-0 right-0 h-full w-[2px] bg-foreground" />
              </motion.div>
              
              {/* Bottom Left */}
              <motion.div
                className="absolute bottom-0 left-0 w-8 h-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-foreground" />
                <div className="absolute bottom-0 left-0 h-full w-[2px] bg-foreground" />
              </motion.div>
              
              {/* Bottom Right */}
              <motion.div
                className="absolute bottom-0 right-0 w-8 h-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 }}
              >
                <div className="absolute bottom-0 right-0 w-full h-[2px] bg-foreground" />
                <div className="absolute bottom-0 right-0 h-full w-[2px] bg-foreground" />
              </motion.div>
            </div>

            {/* Center Logo Animation */}
            <div className="relative">
              {/* 2x2 Grid Logo */}
              <motion.div 
                className="grid grid-cols-2 gap-1 w-24 h-24"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                {['J', 'S', 'C', 'L'].map((letter, i) => (
                  <motion.div
                    key={letter}
                    className="relative w-full h-full bg-foreground text-background flex items-center justify-center font-bold text-2xl overflow-hidden"
                    initial={{ clipPath: 'inset(0 0 100% 0)' }}
                    animate={{ clipPath: 'inset(0 0 0% 0)' }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.4, ease: "easeOut" }}
                  >
                    {letter}
                  </motion.div>
                ))}
              </motion.div>

              {/* Scanner Line */}
              <motion.div
                className="absolute left-0 right-0 h-[2px] bg-accent pointer-events-none"
                initial={{ top: 0, opacity: 0 }}
                animate={scanComplete 
                  ? { top: '100%', opacity: [0, 1, 1, 0] }
                  : { top: '100%', opacity: [0, 1, 1, 0] }
                }
                transition={{ delay: 0.3, duration: 0.5, ease: "linear" }}
              />
            </div>

            {/* Loading text */}
            <motion.div
              className="absolute bottom-12 left-1/2 -translate-x-1/2 font-mono text-xs text-muted-foreground tracking-widest"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.span
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                LOADING...
              </motion.span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.4 }}
      >
        {children}
      </motion.div>
    </>
  );
};

export default PageTransition;
