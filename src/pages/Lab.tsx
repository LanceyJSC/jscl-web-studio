import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Mouse, Hand } from 'lucide-react';

import PhysicsScene, { GravityMode } from '@/components/lab/PhysicsScene';
import GravityControls from '@/components/lab/GravityControls';

const Lab: React.FC = () => {
  const [gravityMode, setGravityMode] = useState<GravityMode>('normal');
  const [explosionTrigger, setExplosionTrigger] = useState(0);
  const [resetTrigger, setResetTrigger] = useState(0);
  const [showInstructions, setShowInstructions] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [gyroEnabled, setGyroEnabled] = useState(false);
  const [gyroData, setGyroData] = useState({ beta: 0, gamma: 0 });
  const [gyroCalibration, setGyroCalibration] = useState({ beta: 0, gamma: 0 });

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Hide instructions after interaction
  useEffect(() => {
    const timer = setTimeout(() => setShowInstructions(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  // Gyroscope handling
  const handleDeviceOrientation = useCallback(
    (event: DeviceOrientationEvent) => {
      if (!gyroEnabled) return;
      
      const beta = (event.beta || 0) - gyroCalibration.beta;
      const gamma = (event.gamma || 0) - gyroCalibration.gamma;
      
      setGyroData({ beta, gamma });
    },
    [gyroEnabled, gyroCalibration]
  );

  const requestGyroPermission = async () => {
    // Check if it's iOS and needs permission
    if (
      typeof (DeviceOrientationEvent as any).requestPermission === 'function'
    ) {
      try {
        const permission = await (
          DeviceOrientationEvent as any
        ).requestPermission();
        if (permission === 'granted') {
          // Calibrate on enable
          const calibrationHandler = (event: DeviceOrientationEvent) => {
            setGyroCalibration({
              beta: event.beta || 0,
              gamma: event.gamma || 0,
            });
            window.removeEventListener('deviceorientation', calibrationHandler);
          };
          window.addEventListener('deviceorientation', calibrationHandler);
          setGyroEnabled(true);
        }
      } catch (error) {
        console.error('Gyro permission denied:', error);
      }
    } else {
      // Non-iOS devices
      const calibrationHandler = (event: DeviceOrientationEvent) => {
        setGyroCalibration({
          beta: event.beta || 0,
          gamma: event.gamma || 0,
        });
        window.removeEventListener('deviceorientation', calibrationHandler);
      };
      window.addEventListener('deviceorientation', calibrationHandler);
      setGyroEnabled(true);
    }
  };

  const toggleGyro = () => {
    if (gyroEnabled) {
      setGyroEnabled(false);
    } else {
      requestGyroPermission();
    }
  };

  useEffect(() => {
    if (gyroEnabled) {
      window.addEventListener('deviceorientation', handleDeviceOrientation);
    }
    return () => {
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
    };
  }, [gyroEnabled, handleDeviceOrientation]);

  const handleExplosion = () => setExplosionTrigger((prev) => prev + 1);
  const handleReset = () => setResetTrigger((prev) => prev + 1);

  return (
    <div className="relative w-full h-screen bg-[#0a0a0f] overflow-hidden">
      {/* Back to home */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="absolute top-6 left-6 z-20"
      >
        <Link
          to="/"
          className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg text-white/70 hover:text-white hover:bg-white/20 transition-all font-mono text-sm uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Back</span>
        </Link>
      </motion.div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-6 left-1/2 -translate-x-1/2 z-20 text-center"
      >
        <h1 className="text-white font-mono text-sm uppercase tracking-[0.3em]">
          Physics Lab
        </h1>
        <p className="text-white/40 text-xs mt-1">Interactive Playground</p>
      </motion.div>

      {/* Instructions overlay */}
      <AnimatePresence>
        {showInstructions && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
          >
            <div className="bg-black/70 backdrop-blur-sm px-8 py-6 rounded-2xl text-center">
              <div className="flex items-center justify-center gap-4 mb-3">
                {isMobile ? (
                  <Hand className="w-8 h-8 text-white/60" />
                ) : (
                  <Mouse className="w-8 h-8 text-white/60" />
                )}
              </div>
              <p className="text-white font-mono text-sm uppercase tracking-wider">
                {isMobile ? 'Tap & drag to interact' : 'Click & drag to interact'}
              </p>
              <p className="text-white/40 text-xs mt-2">
                Orbit: {isMobile ? 'Two fingers' : 'Click + drag background'}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3D Canvas */}
      <PhysicsScene
        gravityMode={gravityMode}
        triggerExplosion={explosionTrigger}
        triggerReset={resetTrigger}
        gyroEnabled={gyroEnabled}
        gyroData={gyroData}
      />

      {/* Controls */}
      <GravityControls
        gravityMode={gravityMode}
        setGravityMode={setGravityMode}
        onExplosion={handleExplosion}
        onReset={handleReset}
        gyroEnabled={gyroEnabled}
        onToggleGyro={toggleGyro}
        isMobile={isMobile}
      />
    </div>
  );
};

export default Lab;
