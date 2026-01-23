import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import GenerativeCanvas from '@/components/GenerativeCanvas';
import Noise from '@/components/Noise';

const Lab: React.FC = () => {
  return (
    <div className="relative min-h-screen h-screen bg-[#fafafa] selection:bg-black selection:text-white overflow-hidden flex flex-col">
      <Noise />

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-50 px-6 py-4 flex justify-between items-center border-b border-gray-100 bg-white/80 backdrop-blur-sm"
      >
        <Link
          to="/"
          className="font-mono text-xs tracking-widest text-gray-500 hover:text-black transition-colors group"
        >
          <span className="mr-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 inline-block">←</span>
          BACK
        </Link>

        <div className="font-display text-lg md:text-xl font-bold tracking-tight">
          <span className="text-gray-400 font-mono text-xs mr-2">//</span>
          CREATIVE LAB
        </div>

        <div className="font-mono text-xs text-gray-400">
          v2.0
        </div>
      </motion.header>

      {/* Canvas Container - Full remaining height */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="relative flex-1 overflow-hidden"
      >
        {/* Corner markers */}
        <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-black z-10 pointer-events-none" />
        <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-black z-10 pointer-events-none" />
        <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-black z-10 pointer-events-none" />
        <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-black z-10 pointer-events-none" />

        <GenerativeCanvas />
      </motion.div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="relative z-10 px-6 py-3 text-center font-mono text-[10px] text-gray-400 border-t border-gray-100 bg-white/80 backdrop-blur-sm"
      >
        <div className="flex justify-center items-center gap-4 flex-wrap">
          <span>SYMMETRY_DRAWING</span>
          <span className="hidden md:inline">|</span>
          <span>GENERATIVE_PATTERNS</span>
          <span className="hidden md:inline">|</span>
          <span>EXPORT_PNG</span>
        </div>
      </motion.footer>
    </div>
  );
};

export default Lab;
