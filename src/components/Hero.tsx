import React from 'react';
import Logo from './Logo';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Cool blue-grey gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/[0.04] via-transparent to-foreground/[0.03]" />
      
      <div className="container mx-auto px-4 sm:px-6 z-10 flex flex-col items-center justify-center h-full py-20">
        
        <div className="flex flex-col items-center w-full">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="scale-75 sm:scale-100 md:scale-125 mb-12 md:mb-20 mt-16 md:mt-24"
          >
            <Logo size="xl" animationDelay={0.8} />
          </motion.div>
          
          <h1 className="sr-only">JSCL - Web Designer</h1>
          
          {/* Bold statement typography */}
          <div className="overflow-hidden mb-8 md:mb-12">
            <motion.h2
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
              className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-center leading-[0.85] text-foreground"
            >
              DESIGN
            </motion.h2>
          </div>
          
          <div className="overflow-hidden mb-8 md:mb-12">
            <motion.h2
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
              className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-center leading-[0.85] text-accent"
            >
              DEVELOP
            </motion.h2>
          </div>
          
          <div className="overflow-hidden mb-12 md:mb-16">
            <motion.h2
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.9 }}
              className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-center leading-[0.85] text-foreground"
            >
              DELIVER
            </motion.h2>
          </div>

          {/* Elegant divider with accent */}
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 1.2 }}
            className="w-full max-w-md h-[1px] bg-gradient-to-r from-transparent via-accent/40 to-transparent mb-10 md:mb-14"
          />

          {/* Refined description */}
          <div className="max-w-lg text-center overflow-hidden">
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 1.5 }}
              className="text-lg md:text-xl font-light text-muted-foreground leading-relaxed tracking-wide"
            >
              Websites that make an impact.
              <br />
              <span className="text-foreground font-medium">Clean. Modern. Memorable.</span>
            </motion.p>
          </div>

        </div>
      </div>
      
      {/* Refined Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-10 md:bottom-16 left-1/2 -translate-x-1/2 flex-col items-center gap-3 hidden md:flex"
      >
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-5 h-8 border border-accent/40 rounded-full flex justify-center pt-1.5"
        >
          <motion.div 
            animate={{ opacity: [1, 0], y: [0, 8] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-1 h-1 bg-accent rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
