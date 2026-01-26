import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import type { Transition } from 'framer-motion';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
  withSubtitle?: boolean;
  animated?: boolean;
}

// Unique animation for each letter
const letterAnimations: Array<{ animate: Record<string, number[]>; transition: Transition }> = [
  { // J - Bounce up with twist
    animate: { y: [0, -20, 0], rotate: [0, -15, 10, 0], scale: [1, 1.2, 1] },
    transition: { duration: 0.6, ease: "easeOut" as const }
  },
  { // S - Wiggle shake
    animate: { x: [0, -8, 8, -8, 8, 0], rotate: [0, -5, 5, -5, 5, 0] },
    transition: { duration: 0.5, ease: "easeInOut" as const }
  },
  { // C - Pulse scale with glow effect
    animate: { scale: [1, 1.4, 0.9, 1.15, 1], rotate: [0, 5, -5, 0] },
    transition: { duration: 0.5, ease: "easeOut" as const }
  },
  { // L - 360 flip
    animate: { rotateY: [0, 360], scale: [1, 1.1, 1] },
    transition: { duration: 0.7, ease: "easeInOut" as const }
  }
];

// Color burst for each letter
const letterColors = [
  'rgba(255, 59, 48, 0.8)',   // J - Red
  'rgba(50, 215, 75, 0.8)',   // S - Green  
  'rgba(0, 122, 255, 0.8)',   // C - Blue
  'rgba(255, 204, 0, 0.8)'    // L - Yellow
];

const Logo: React.FC<LogoProps> = ({ size = 'md', className = '', withSubtitle, animated = true }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [animatingLetters, setAnimatingLetters] = useState<Record<number, boolean>>({});
  const [gyroEnabled, setGyroEnabled] = useState(false);
  const isMobile = useIsMobile();
  
  const isIOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const calibrationRef = useRef<{ beta: number; gamma: number } | null>(null);

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const springConfig = { damping: 30, stiffness: 400, mass: 0.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const rotateX = useTransform(springY, [0, 1], [25, -25]); 
  const rotateY = useTransform(springX, [0, 1], [-25, 25]); 
  const skewX = useTransform(springX, [0, 1], [-2, 2]);

  const handleDeviceOrientationRef = useRef<(event: DeviceOrientationEvent) => void>();
  
  handleDeviceOrientationRef.current = (event: DeviceOrientationEvent) => {
    const beta = event.beta ?? 0;
    const gamma = event.gamma ?? 0;
    
    if (calibrationRef.current === null) {
      calibrationRef.current = { beta, gamma };
    }
    
    const deltaBeta = beta - calibrationRef.current.beta;
    const deltaGamma = gamma - calibrationRef.current.gamma;
    
    const normalizedY = Math.max(0, Math.min(1, 0.5 + deltaBeta / 60));
    const normalizedX = Math.max(0, Math.min(1, 0.5 + deltaGamma / 60));
    
    x.set(normalizedX);
    y.set(normalizedY);
  };

  const handleDeviceOrientation = (event: DeviceOrientationEvent) => {
    handleDeviceOrientationRef.current?.(event);
  };

  const recalibrate = () => {
    calibrationRef.current = null;
  };

  const triggerHaptic = () => {
    if (isMobile && navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

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
      setGyroEnabled(true);
      window.addEventListener('deviceorientation', handleDeviceOrientation);
    }
  };

  useEffect(() => {
    if (!animated || !isMobile) return;
    
    if (isIOS) return;
    
    if (window.DeviceOrientationEvent && !gyroEnabled) {
      setGyroEnabled(true);
      window.addEventListener('deviceorientation', handleDeviceOrientation);
    }
    
    return () => {
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
    };
  }, [animated, isMobile, isIOS]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!animated || isMobile) return;

    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
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

  // Handle individual letter click
  const handleLetterClick = (index: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent logo spin
    if (animatingLetters[index]) return;
    
    triggerHaptic();
    setAnimatingLetters(prev => ({ ...prev, [index]: true }));
    
    setTimeout(() => {
      setAnimatingLetters(prev => ({ ...prev, [index]: false }));
    }, 700);
  };

  const spinY = useSpring(0, { damping: 20, stiffness: 80, mass: 2 });

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

  const isSmall = size === 'sm';
  const duration = isSmall ? 0.2 : 0.3;
  const stagger = isSmall ? 0.05 : 0.1;
  const letterDuration = isSmall ? 0.3 : 0.5;

  return (
    <div 
      ref={containerRef}
      className={`flex flex-col items-center relative ${className}`} 
      style={{ perspective: 800 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
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
          triggerHaptic();
          
          if (isMobile && !gyroEnabled) {
            requestGyroPermission();
          }
          
          if (isMobile && gyroEnabled) {
            recalibrate();
          }
          
          if (!isSpinning) {
            setIsSpinning(true);
            spinY.set(spinY.get() + 720);
            setTimeout(() => {
              setIsSpinning(false);
              spinY.jump(0);
            }, 2000);
          }
        }}
      >
        {/* Outer Frame */}
        <motion.div 
            className="absolute top-0 left-0 right-0 h-px bg-black origin-left"
            initial={{ scaleX: animated ? 0 : 1 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: animated ? duration : 0, ease: "easeInOut", delay: 0 }}
        />
        
        <motion.div 
            className="absolute top-0 right-0 bottom-0 w-px bg-black origin-top"
            initial={{ scaleY: animated ? 0 : 1 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: animated ? duration : 0, ease: "easeInOut", delay: animated ? duration : 0 }}
        />

        <motion.div 
            className="absolute bottom-0 right-0 left-0 h-px bg-black origin-right"
            initial={{ scaleX: animated ? 0 : 1 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: animated ? duration : 0, ease: "easeInOut", delay: animated ? duration * 2 : 0 }}
        />

        <motion.div 
            className="absolute bottom-0 left-0 top-0 w-px bg-black origin-bottom"
            initial={{ scaleY: animated ? 0 : 1 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: animated ? duration : 0, ease: "easeInOut", delay: animated ? duration * 3 : 0 }}
        />

        {/* Crosshairs */}
        <motion.div 
          className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-black pointer-events-none" 
          style={{ translateZ: 10 }} 
          initial={{ scaleY: animated ? 0 : 1 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.5, ease: "circOut", delay: animated ? duration * 4 : 0 }}
        />
        <motion.div 
          className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-black pointer-events-none" 
          style={{ translateZ: 10 }} 
          initial={{ scaleX: animated ? 0 : 1 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, ease: "circOut", delay: animated ? duration * 4 : 0 }}
        />

        {/* Letters with individual click animations */}
        {letters.map((letter, i) => (
          <div 
            key={i} 
            className="flex items-center justify-center w-full h-full relative cursor-pointer"
            style={{ transformStyle: "preserve-3d" }}
            onClick={(e) => handleLetterClick(i, e)}
          >
            <div className="relative" style={{ transform: "translateZ(40px)" }}>
              {/* Color burst effect on click */}
              {animatingLetters[i] && (
                <motion.div
                  className="absolute inset-0 rounded-full blur-xl"
                  initial={{ scale: 0, opacity: 0.8 }}
                  animate={{ scale: 3, opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  style={{ 
                    backgroundColor: letterColors[i],
                    transform: "translateZ(-20px)"
                  }}
                />
              )}
              
              {/* Animated Letter */}
              <motion.span 
                className={`${textClasses[size]} font-sans font-medium text-black leading-none select-none block relative z-10`}
                initial={{ clipPath: animated ? "inset(100% 0 0 0)" : "inset(0% 0 0 0)" }}
                animate={animatingLetters[i] 
                  ? letterAnimations[i].animate 
                  : { clipPath: "inset(0% 0 0 0)" }
                }
                transition={animatingLetters[i] 
                  ? letterAnimations[i].transition
                  : { 
                      duration: animated ? letterDuration : 0, 
                      delay: animated ? (duration * 4.5) + (i * stagger) : 0, 
                      ease: "linear"
                    }
                }
                style={{
                  textShadow: animatingLetters[i] ? `0 0 20px ${letterColors[i]}` : 'none'
                }}
              >
                {letter}
              </motion.span>
              
              {/* Scanner Line */}
              {animated && !animatingLetters[i] && (
                <motion.div
                    className="absolute left-0 right-0 h-[2px] bg-black"
                    initial={{ bottom: "0%", opacity: 0 }}
                    animate={{ bottom: "100%", opacity: [0, 1, 1, 0] }}
                    transition={{ 
                        duration: letterDuration, 
                        delay: (duration * 4.5) + (i * stagger), 
                        ease: "linear",
                        times: [0, 0.1, 0.9, 1] 
                    }}
                />
              )}
            </div>
          </div>
        ))}
      </motion.div>
      
      {/* Subtitle */}
      {showSubtitle && (
        <motion.div 
          initial={{ opacity: animated ? 0 : 1, clipPath: animated ? "inset(0 100% 0 0)" : "inset(0 0 0 0)" }}
          animate={{ opacity: 1, clipPath: "inset(0 0 0 0)" }}
          transition={{ delay: animated ? duration * 6 : 0, duration: 0.8, ease: "circOut" }}
        >
          <span className={`block font-sans tracking-[0.4em] text-black font-medium uppercase ${subtitleClasses[size]}`}>
            Web Designer
          </span>
        </motion.div>
      )}
      
      {/* Mobile tap indicator */}
      {isMobile && animated && (size === 'lg' || size === 'xl' || size === '2xl') && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: duration * 7, duration: 0.5 }}
          className="mt-4 flex items-center gap-2 text-[10px] font-mono tracking-widest text-gray-400 uppercase"
        >
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            ◉
          </motion.span>
          <span>Tap letters or logo</span>
        </motion.div>
      )}
    </div>
  );
};

export default Logo;
