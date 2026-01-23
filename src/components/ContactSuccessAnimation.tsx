import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ContactSuccessAnimationProps {
  onComplete: () => void;
}

const ContactSuccessAnimation: React.FC<ContactSuccessAnimationProps> = ({ onComplete }) => {
  const [scrambledText, setScrambledText] = useState('');
  const targetText = 'TRANSMISSION COMPLETE';
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';

  useEffect(() => {
    let iteration = 0;
    const maxIterations = targetText.length;
    
    const interval = setInterval(() => {
      setScrambledText(
        targetText
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration) return targetText[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      iteration += 0.5;

      if (iteration >= maxIterations + 1) {
        clearInterval(interval);
        setTimeout(onComplete, 1500);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-white z-20 flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Animated Grid Lines */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`h-${i}`}
            className="absolute left-0 right-0 h-px bg-black/10"
            style={{ top: `${(i + 1) * 12.5}%` }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: i * 0.05, duration: 0.4, ease: 'easeOut' }}
          />
        ))}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`v-${i}`}
            className="absolute top-0 bottom-0 w-px bg-black/10"
            style={{ left: `${(i + 1) * 12.5}%` }}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{ delay: i * 0.05, duration: 0.4, ease: 'easeOut' }}
          />
        ))}
      </div>

      {/* Corner Markers */}
      <motion.div
        className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-black"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
      />
      <motion.div
        className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-black"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.35 }}
      />
      <motion.div
        className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-black"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
      />
      <motion.div
        className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-black"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.45 }}
      />

      {/* Main Content */}
      <div className="relative z-10 text-center">
        {/* Status Indicator */}
        <motion.div
          className="flex items-center justify-center gap-2 mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            className="w-2 h-2 bg-black rounded-full"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 0.6, repeat: 2 }}
          />
          <span className="text-xs font-mono tracking-[0.3em] text-gray-500">STATUS: OK</span>
        </motion.div>

        {/* Scrambling Text */}
        <motion.h3
          className="text-2xl md:text-4xl font-mono font-bold tracking-tight mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {scrambledText}
        </motion.h3>

        {/* Subtext */}
        <motion.p
          className="text-sm font-mono text-gray-400 tracking-widest"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          MESSAGE RECEIVED
        </motion.p>

        {/* Animated Line */}
        <motion.div
          className="mt-8 h-px bg-black mx-auto"
          initial={{ width: 0 }}
          animate={{ width: 120 }}
          transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
        />

        {/* Coordinates Style Detail */}
        <motion.div
          className="mt-6 flex justify-center gap-8 text-[10px] font-mono text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <span>LAT: 40.7128</span>
          <span>LNG: -74.0060</span>
          <span>TS: {Date.now()}</span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ContactSuccessAnimation;
