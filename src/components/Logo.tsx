import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
  withSubtitle?: boolean;
  animated?: boolean;
  animationDelay?: number;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', className = '', withSubtitle, animated = true, animationDelay = 0 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [gyroEnabled, setGyroEnabled] = useState(false);
  const isMobile = useIsMobile();
  
  // Detect iOS specifically (needs permission request on tap)
  const isIOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

  // Store initial calibration values (the phone's orientation when gyro starts)
  const calibrationRef = useRef<{ beta: number; gamma: number } | null>(null);

  // 1. Mouse/Gyroscope Tracking (0 to 1)
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  // 2. Physics Configuration
  const springConfig = { damping: 30, stiffness: 400, mass: 0.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  // 3. Transforms
  const rotateX = useTransform(springY, [0, 1], [25, -25]); 
  const _rotateY = useTransform(springX, [0, 1], [-25, 25]); 
  const skewX = useTransform(springX, [0, 1], [-2, 2]);

  // 4. Gyroscope handler - calibrates to initial phone position
  const handleDeviceOrientationRef = useRef<(event: DeviceOrientationEvent) => void>();
  
  handleDeviceOrientationRef.current = (event: DeviceOrientationEvent) => {
    const beta = event.beta ?? 0;
    const gamma = event.gamma ?? 0;
    
    // Calibrate on first reading - use current position as baseline
    if (calibrationRef.current === null) {
      calibrationRef.current = { beta, gamma };
    }
    
    // Calculate delta from calibration point
    const deltaBeta = beta - calibrationRef.current.beta;
    const deltaGamma = gamma - calibrationRef.current.gamma;
    
    // Normalize delta to 0-1 range (centered at 0.5, ±30 degrees range)
    const normalizedY = Math.max(0, Math.min(1, 0.5 + deltaBeta / 60));
    const normalizedX = Math.max(0, Math.min(1, 0.5 + deltaGamma / 60));
    
    x.set(normalizedX);
    y.set(normalizedY);
  };

  // Stable event handler wrapper
  const handleDeviceOrientation = (event: DeviceOrientationEvent) => {
    handleDeviceOrientationRef.current?.(event);
  };

  // Recalibrate function - resets baseline to current phone angle
  const recalibrate = () => {
    calibrationRef.current = null;
  };

  // Haptic feedback function
  const triggerHaptic = () => {
    if (isMobile && navigator.vibrate) {
      navigator.vibrate(50); // Short 50ms vibration
    }
  };

  // 5. Request gyroscope permission on first tap (iOS requires user gesture)
  const requestGyroPermission = async () => {
    if (gyroEnabled) return;
    
    if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      try {
        const permission = await (DeviceOrientationEvent as any).requestPermission();
        if (permission === 'granted') {
          setGyroEnabled(true);
          window.addEventListener('deviceorientation', handleDeviceOrientation);
        }
      } catch (error) {
        console.log('Gyroscope permission denied');
      }
    } else {
      // Non-iOS devices - enable directly
      setGyroEnabled(true);
      window.addEventListener('deviceorientation', handleDeviceOrientation);
    }
  };

  // Auto-enable gyroscope for all mobile devices on mount
  useEffect(() => {
    if (!animated || !isMobile) return;
    
    // iOS requires permission request via user gesture
    if (isIOS) return;
    
    // Non-iOS devices can enable gyro immediately without permission
    if (window.DeviceOrientationEvent && !gyroEnabled) {
      setGyroEnabled(true);
      window.addEventListener('deviceorientation', handleDeviceOrientation);
    }
    
    return () => {
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
    };
  }, [animated, isMobile, isIOS]);

  const handleMouseMove = (e: React.MouseEvent) => {
    // Disable mouse interaction on mobile (use gyroscope instead)
    if (!animated || isMobile) return;

    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    // Calculate normalized position (0 to 1)
    const newX = (e.clientX - rect.left) / rect.width;
    const newY = (e.clientY - rect.top) / rect.height;
    
    x.set(newX);
    y.set(newY);
  };

  const handleMouseLeave = () => {
    if (!animated || isMobile) return;
    x.set(0.5);
    y.set(0.5);
  };

  // Spin animation spring
  const spinY = useSpring(0, { damping: 20, stiffness: 80, mass: 2 });

  // Dimensions & Styles
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-24 h-24',
    lg: 'w-48 h-48',
    xl: 'w-64 h-64',
    '2xl': 'w-80 h-80',
  };

  const textClasses = {
    sm: 'text-[12px]',
    md: 'text-3xl',
    lg: 'text-6xl',
    xl: 'text-8xl',
    '2xl': 'text-9xl',
  };

  const subtitleClasses = {
    sm: 'text-[6px] mt-1',
    md: 'text-[10px] mt-2',
    lg: 'text-sm mt-4',
    xl: 'text-lg mt-6',
    '2xl': 'text-xl mt-8',
  };

  const showSubtitle = withSubtitle !== undefined 
    ? withSubtitle 
    : (size === 'lg' || size === 'xl' || size === '2xl');

  const letters = ['J', 'S', 'C', 'L'];

  // Animation Timings (Faster for small logos)
  const isSmall = size === 'sm';
  const duration = isSmall ? 0.2 : 0.3;
  const baseDelay = animationDelay;

  return (
    <div 
      ref={containerRef}
      className={`flex flex-col items-center relative ${className}`} 
      style={{ perspective: 800 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* 3D Container */}
      <motion.div 
        className={`relative grid grid-cols-2 grid-rows-2 ${sizeClasses[size]} bg-transparent cursor-pointer`}
        style={{
          rotateX,
          rotateY: useTransform([springX, spinY], ([sx, sy]) => {
            const hoverRotate = (sx as number - 0.5) * 50;
            return hoverRotate + (sy as number);
          }),
          skewX,
          transformStyle: "preserve-3d", 
        }}
        onClick={() => {
          // Trigger haptic feedback on mobile
          triggerHaptic();
          
          // Request gyro permission on first tap (iOS requirement)
          if (isMobile && !gyroEnabled) {
            requestGyroPermission();
          }
          
          // Recalibrate gyro to current phone angle on each tap
          if (isMobile && gyroEnabled) {
            recalibrate();
          }
          
          if (!isSpinning) {
            setIsSpinning(true);
            spinY.set(spinY.get() + 720);
            setTimeout(() => {
              setIsSpinning(false);
              spinY.jump(0); // Reset to default position instantly
            }, 2000);
          }
        }}
      >
        {/* --- Outer Frame Construction (Clockwise Drawing) --- */}
        
        {/* Top Line: Left to Right */}
        <motion.div 
            className="absolute top-0 left-0 right-0 h-px bg-foreground origin-left"
            initial={{ scaleX: animated ? 0 : 1 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: animated ? duration : 0, ease: "easeInOut", delay: baseDelay }}
        />
        
        {/* Right Line: Top to Bottom */}
        <motion.div 
            className="absolute top-0 right-0 bottom-0 w-px bg-foreground origin-top"
            initial={{ scaleY: animated ? 0 : 1 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: animated ? duration : 0, ease: "easeInOut", delay: animated ? baseDelay + duration : 0 }}
        />

        {/* Bottom Line: Right to Left */}
        <motion.div 
            className="absolute bottom-0 right-0 left-0 h-px bg-foreground origin-right"
            initial={{ scaleX: animated ? 0 : 1 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: animated ? duration : 0, ease: "easeInOut", delay: animated ? baseDelay + duration * 2 : 0 }}
        />

        {/* Left Line: Bottom to Top */}
        <motion.div 
            className="absolute bottom-0 left-0 top-0 w-px bg-foreground origin-bottom"
            initial={{ scaleY: animated ? 0 : 1 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: animated ? duration : 0, ease: "easeInOut", delay: animated ? baseDelay + duration * 3 : 0 }}
        />

        {/* --- Internal Crosshairs --- */}
        <motion.div 
          className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-foreground pointer-events-none" 
          style={{ translateZ: 10 }} 
          initial={{ scaleY: animated ? 0 : 1 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.5, ease: "circOut", delay: animated ? baseDelay + duration * 4 : 0 }}
        />
        <motion.div 
          className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-foreground pointer-events-none"
          style={{ translateZ: 10 }} 
          initial={{ scaleX: animated ? 0 : 1 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, ease: "circOut", delay: animated ? baseDelay + duration * 4 : 0 }}
        />

        {/* --- Letters (Fade In Together) --- */}
        {letters.map((letter, i) => (
          <div 
            key={i} 
            className="flex items-center justify-center w-full h-full relative pointer-events-none"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="relative" style={{ transform: "translateZ(40px)" }}>
                <motion.span 
                    className={`${textClasses[size]} font-sans font-medium text-foreground leading-none select-none block`}
                    initial={animated ? { opacity: 0, scale: 0.3, filter: "blur(8px)" } : {}}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    transition={{ 
                        duration: animated ? 0.5 : 0, 
                        delay: animated ? baseDelay + (duration * 4.5) + i * 0.08 : 0, 
                        ease: [0.16, 1, 0.3, 1]
                    }}
                >
                    {letter}
                </motion.span>
            </div>
          </div>
        ))}
      </motion.div>
      
      {/* Subtitle */}
      {showSubtitle && (
        <motion.div 
          initial={{ opacity: animated ? 0 : 1, clipPath: animated ? "inset(0 100% 0 0)" : "inset(0 0 0 0)" }}
          animate={{ opacity: 1, clipPath: "inset(0 0 0 0)" }}
          transition={{ delay: animated ? baseDelay + duration * 6 : 0, duration: 0.8, ease: "circOut" }}
        >
          <span className={`block font-sans tracking-[0.4em] text-foreground font-medium uppercase ${subtitleClasses[size]}`}>
            Web Designer
          </span>
        </motion.div>
      )}
      
      {/* Mobile tap indicator */}
      {isMobile && animated && (size === 'lg' || size === 'xl' || size === '2xl') && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: baseDelay + duration * 7, duration: 0.5 }}
          className="mt-4 flex items-center gap-2 text-[10px] font-mono tracking-widest text-muted-foreground uppercase"
        >
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            ◉
          </motion.span>
          <span>Tap logo</span>
        </motion.div>
      )}
    </div>
  );
};

export default Logo;