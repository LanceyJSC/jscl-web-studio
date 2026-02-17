import React from 'react';
import { motion } from 'framer-motion';

interface SectionDividerProps {
  variant?: 'line' | 'dots' | 'gradient';
  className?: string;
}

const SectionDivider: React.FC<SectionDividerProps> = ({ variant = 'line', className = '' }) => {
  if (variant === 'dots') {
    return (
      <div className={`flex justify-center gap-2 py-8 ${className}`}>
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.3 }}
            className="w-1.5 h-1.5 rounded-full bg-foreground/20"
          />
        ))}
      </div>
    );
  }

  if (variant === 'gradient') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={`h-12 md:h-16 relative overflow-hidden ${className}`}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-foreground/[0.02] to-transparent" />
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
      </motion.div>
    );
  }

  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 ${className}`}>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: "circOut" }}
        className="h-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent origin-center"
      />
    </div>
  );
};

export default SectionDivider;
