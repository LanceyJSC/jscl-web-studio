import React from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Bomb, ArrowDown, Circle, ArrowUp, Zap, Smartphone } from 'lucide-react';
import { GravityMode } from './PhysicsScene';

interface GravityControlsProps {
  gravityMode: GravityMode;
  setGravityMode: (mode: GravityMode) => void;
  onExplosion: () => void;
  onReset: () => void;
  gyroEnabled: boolean;
  onToggleGyro: () => void;
  isMobile: boolean;
}

const GravityControls: React.FC<GravityControlsProps> = ({
  gravityMode,
  setGravityMode,
  onExplosion,
  onReset,
  gyroEnabled,
  onToggleGyro,
  isMobile,
}) => {
  const buttonBase =
    'flex items-center gap-2 px-4 py-2.5 rounded-lg font-mono text-xs uppercase tracking-wider transition-all duration-200';
  
  const gravityButtons: { mode: GravityMode; icon: React.ReactNode; label: string }[] = [
    { mode: 'normal', icon: <ArrowDown className="w-4 h-4" />, label: 'Normal' },
    { mode: 'zero', icon: <Circle className="w-4 h-4" />, label: 'Zero-G' },
    { mode: 'reverse', icon: <ArrowUp className="w-4 h-4" />, label: 'Reverse' },
    { mode: 'chaos', icon: <Zap className="w-4 h-4" />, label: 'Chaos' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-wrap justify-center gap-2 p-3 bg-black/60 backdrop-blur-md rounded-xl border border-white/10"
    >
      {/* Gravity mode buttons */}
      <div className="flex gap-1.5">
        {gravityButtons.map(({ mode, icon, label }) => (
          <button
            key={mode}
            onClick={() => setGravityMode(mode)}
            className={`${buttonBase} ${
              gravityMode === mode && !gyroEnabled
                ? 'bg-white text-black'
                : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
            }`}
          >
            {icon}
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </div>

      {/* Divider */}
      <div className="w-px h-8 bg-white/20 mx-1 hidden sm:block" />

      {/* Action buttons */}
      <div className="flex gap-1.5">
        {/* Gyro toggle (mobile only) */}
        {isMobile && (
          <button
            onClick={onToggleGyro}
            className={`${buttonBase} ${
              gyroEnabled
                ? 'bg-purple-500 text-white'
                : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span className="hidden sm:inline">Tilt</span>
          </button>
        )}

        <button
          onClick={onExplosion}
          className={`${buttonBase} bg-orange-500/80 text-white hover:bg-orange-500`}
        >
          <Bomb className="w-4 h-4" />
          <span className="hidden sm:inline">Boom</span>
        </button>

        <button
          onClick={onReset}
          className={`${buttonBase} bg-white/10 text-white/70 hover:bg-white/20 hover:text-white`}
        >
          <RotateCcw className="w-4 h-4" />
          <span className="hidden sm:inline">Reset</span>
        </button>
      </div>
    </motion.div>
  );
};

export default GravityControls;
