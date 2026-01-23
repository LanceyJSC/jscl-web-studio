import React, { useRef } from 'react';
import Logo from './Logo';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax transforms
  const logoY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const taglineY = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <section 
      ref={containerRef}
      className="relative h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Parallax Background Elements */}
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 200]) }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-black/5 rotate-45" />
        <div className="absolute bottom-1/3 right-1/4 w-24 h-24 border border-black/5 rotate-12" />
        <div className="absolute top-1/2 right-1/3 w-16 h-16 border border-black/5 -rotate-12" />
      </motion.div>

      {/* 
        Hero Content 
        We use h-screen to make it a full immersive entry.
      */}
      <motion.div 
        style={{ opacity, scale }}
        className="container mx-auto px-4 sm:px-6 z-10 flex flex-col items-center justify-center h-full"
      >
        
        <div className="flex flex-col items-center w-full">
          <motion.div 
            style={{ y: logoY }}
            className="scale-75 sm:scale-100 md:scale-125"
          >
            <Logo size="xl" className="mb-8 md:mb-16" />
          </motion.div>
          
          <h1 className="sr-only">JSCL - Web Designer</h1>
          
          {/* Brutalist / Technical typographic element */}
          <motion.div 
            style={{ y: taglineY }}
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "100%", opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 1 }}
            className="w-full max-w-7xl border-t border-b border-black/10 py-4 md:py-6 my-4 md:my-6 flex flex-col md:flex-row justify-center items-center gap-3 md:gap-6 text-[10px] md:text-xs font-mono tracking-widest text-gray-500 overflow-hidden px-4"
          >
             <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }} className="leading-relaxed">CREATIVE</motion.span>
             <span className="hidden md:inline-block w-8 h-[1px] bg-black/20"></span>
             <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }} className="text-black font-medium leading-relaxed">DIGITAL ARCHITECT</motion.span>
             <span className="hidden md:inline-block w-8 h-[1px] bg-black/20"></span>
             <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.4 }} className="leading-relaxed">TECHNICAL</motion.span>
          </motion.div>

          {/* Staggered Text Reveal for Description */}
          <motion.div 
            style={{ y: textY }}
            className="max-w-xl text-center text-base md:text-lg font-light text-gray-600 leading-relaxed mt-6 md:mt-4 overflow-hidden px-4"
          >
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
          </motion.div>

        </div>
      </motion.div>
      
      {/* Sophisticated Scroll Indicator */}
      <motion.div 
        style={{ opacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
        <motion.div 
          animate={{ height: [0, 48, 0], y: [0, 0, 48] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-[1px] bg-black"
        ></motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;