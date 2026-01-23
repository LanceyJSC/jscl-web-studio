import React from 'react';
import Logo from './Logo';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* 
        Hero Content 
        We use h-screen to make it a full immersive entry.
      */}
      <div className="container mx-auto px-6 z-10 flex flex-col items-center justify-center h-full">
        
        <div className="flex flex-col items-center">
          <Logo size="2xl" className="mb-16" />
          
          <h1 className="sr-only">JSCL - Web Designer</h1>
          
          {/* Brutalist / Technical typographic element */}
          <motion.div 
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "100%", opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 1 }}
            className="w-full max-w-7xl border-t border-b border-black/10 py-6 my-6 flex flex-col md:flex-row justify-center items-center gap-4 md:gap-6 text-xs font-mono tracking-widest text-gray-500 overflow-hidden whitespace-nowrap px-6"
          >
             <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}>CREATIVE</motion.span>
             <span className="hidden md:inline-block w-8 h-[1px] bg-black/20"></span>
             <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }} className="text-black font-medium">DIGITAL ARCHITECT</motion.span>
             <span className="hidden md:inline-block w-8 h-[1px] bg-black/20"></span>
             <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.4 }}>TECHNICAL</motion.span>
          </motion.div>

          {/* Staggered Text Reveal for Description */}
          <div className="max-w-xl text-center text-lg font-light text-gray-600 leading-relaxed mt-4 overflow-hidden">
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

        </div>
      </div>
      
      {/* Sophisticated Scroll Indicator */}
      <motion.div 
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