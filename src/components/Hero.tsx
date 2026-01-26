import React from 'react';
import Logo from './Logo';
import { motion, useScroll, useTransform } from 'framer-motion';
import MorphingShape from './MorphingShape';

const Hero: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.3], [0, 50]);

  return (
    <section id="hero" className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Animated background shapes */}
      <MorphingShape className="w-[600px] h-[600px] text-black/[0.02] -top-32 -right-32 hidden md:block" />
      <MorphingShape className="w-[400px] h-[400px] text-black/[0.015] bottom-0 -left-20 hidden md:block" />
      
      {/* Gradient orbs */}
      <motion.div 
        className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full pointer-events-none hidden md:block"
        style={{
          background: 'radial-gradient(circle, rgba(0,0,0,0.02) 0%, transparent 70%)',
          filter: 'blur(60px)'
        }}
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 30, 0],
          y: [0, -20, 0]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full pointer-events-none hidden md:block"
        style={{
          background: 'radial-gradient(circle, rgba(0,0,0,0.015) 0%, transparent 70%)',
          filter: 'blur(40px)'
        }}
        animate={{
          scale: [1.1, 0.9, 1.1],
          x: [0, -20, 0],
          y: [0, 30, 0]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Hero Content with scroll effects */}
      <motion.div 
        style={{ opacity, scale, y }}
        className="container mx-auto px-4 sm:px-6 z-10 flex flex-col items-center justify-center h-full"
      >
        <div className="flex flex-col items-center w-full">
          <motion.div 
            className="scale-75 sm:scale-100 md:scale-125"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Logo size="xl" className="mb-8 md:mb-16" />
          </motion.div>
          
          <h1 className="sr-only">JSCL - Web Designer</h1>
          
          {/* Enhanced typographic element with stagger */}
          <motion.div 
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "100%", opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 1 }}
            className="w-full max-w-7xl border-t border-b border-black/10 py-4 md:py-6 my-4 md:my-6 flex flex-col md:flex-row justify-center items-center gap-3 md:gap-6 text-[10px] md:text-xs font-mono tracking-widest text-gray-500 overflow-hidden px-4 relative"
          >
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent hidden md:block"
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ duration: 2, delay: 2, ease: "easeInOut" }}
            />
            
            <motion.span 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 2, duration: 0.5 }} 
              className="leading-relaxed relative"
            >
              CREATIVE
            </motion.span>
            <motion.span 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 2.1, duration: 0.3 }}
              className="hidden md:inline-block w-8 h-[1px] bg-black/20"
            />
            <motion.span 
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ delay: 2.2, duration: 0.5, type: "spring" }} 
              className="text-black font-medium leading-relaxed relative"
            >
              DIGITAL ARCHITECT
            </motion.span>
            <motion.span 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 2.3, duration: 0.3 }}
              className="hidden md:inline-block w-8 h-[1px] bg-black/20"
            />
            <motion.span 
              initial={{ opacity: 0, y: -10 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 2.4, duration: 0.5 }} 
              className="leading-relaxed relative"
            >
              TECHNICAL
            </motion.span>
          </motion.div>

          {/* Staggered Text Reveal for Description */}
          <div className="max-w-xl text-center text-base md:text-lg font-light text-gray-600 leading-relaxed mt-6 md:mt-4 overflow-hidden px-4">
            <motion.p
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 2.5 }}
            >
              Transforming complex problems into elegant, minimalist digital solutions. 
            </motion.p>
            <motion.p
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 2.7 }}
            >
              Merging technical precision with artistic direction.
            </motion.p>
          </div>

          {/* CTA Button */}
          <motion.a
            href="#projects"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3, duration: 0.5 }}
            className="mt-8 md:mt-12 group relative overflow-hidden"
          >
            <span className="relative z-10 inline-flex items-center gap-3 px-6 py-3 text-xs font-mono uppercase tracking-widest border border-black/20 hover:border-black transition-colors duration-300">
              <span>Explore Work</span>
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </span>
          </motion.a>
        </div>
      </motion.div>
      
      {/* Enhanced Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 3.5, duration: 1 }}
        className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex-col items-center gap-3 hidden md:flex"
      >
        <motion.div
          className="w-5 h-8 border border-black/30 rounded-full flex justify-center pt-1"
        >
          <motion.div
            className="w-1 h-1.5 bg-black/50 rounded-full"
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
        <span className="text-[9px] uppercase tracking-[0.25em] text-gray-400">Scroll</span>
      </motion.div>
    </section>
  );
};

export default Hero;
