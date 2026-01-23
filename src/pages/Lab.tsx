import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ParticlePlayground from '@/components/ParticlePlayground';
import Noise from '@/components/Noise';
import TechnicalGrid from '@/components/TechnicalGrid';

const Lab: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-[#fafafa] selection:bg-black selection:text-white overflow-hidden">
      <TechnicalGrid />
      <Noise />

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 px-6 py-6 flex justify-between items-center"
      >
        <Link
          to="/"
          className="font-mono text-xs tracking-widest text-gray-500 hover:text-black transition-colors group"
        >
          <span className="mr-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 inline-block">←</span>
          BACK
        </Link>

        <div className="font-mono text-xs tracking-widest text-gray-400">
          <span className="text-black">//</span> PARTICLE_LAB
        </div>

        <div className="font-mono text-xs text-gray-400">
          v1.0.0
        </div>
      </motion.header>

      {/* Title Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="relative z-10 pt-24 pb-8 px-6 text-center"
      >
        <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-black mb-4">
          PHYSICS LAB
        </h1>
        <p className="font-mono text-xs md:text-sm text-gray-500 max-w-md mx-auto">
          An interactive particle simulation with real-time physics. 
          Click anywhere to spawn particles and watch them interact.
        </p>
      </motion.div>

      {/* Playground Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="relative z-10 mx-4 md:mx-8 mb-8 border border-gray-200 bg-white/50 backdrop-blur-sm overflow-hidden"
        style={{ height: 'calc(100vh - 240px)', minHeight: '400px' }}
      >
        {/* Corner markers */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-black" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-black" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-black" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-black" />

        <ParticlePlayground />
      </motion.div>

      {/* Footer Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="relative z-10 px-6 pb-8 text-center font-mono text-[10px] text-gray-400"
      >
        <div className="flex justify-center items-center gap-4 flex-wrap">
          <span>TECH: CANVAS_2D</span>
          <span className="hidden md:inline">|</span>
          <span>PHYSICS: VERLET_INTEGRATION</span>
          <span className="hidden md:inline">|</span>
          <span>COLLISIONS: ELASTIC</span>
        </div>
      </motion.div>
    </div>
  );
};

export default Lab;
