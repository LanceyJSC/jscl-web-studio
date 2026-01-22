import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const Cursor: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  
  // Use MotionValues for direct DOM updates without re-renders for the follower
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 40, stiffness: 1000 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only run on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const moveCursor = (e: MouseEvent) => {
      // 1. Move the Main Dot instantly (Raw performance)
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
      // 2. Update the Follower spring target
      cursorX.set(e.clientX - 16); // -16 to center the 32px follower
      cursorY.set(e.clientY - 16);
    };

    const handleMouseOver = (e: MouseEvent) => {
      // Strict check to ensure target is an Element before accessing tagName/closest
      if (!(e.target instanceof Element)) return;
      const target = e.target;
      
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button');

      if (isInteractive) {
        setIsHovered(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
       if (!(e.target instanceof Element)) return;
       const target = e.target;

       const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button');

       if (isInteractive) {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Main Dot - fixed position, no lag (Raw Mouse Position) */}
      <div 
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-foreground rounded-full pointer-events-none z-[9999] hidden md:block"
        style={{ 
            width: '6px',
            height: '6px',
            marginLeft: '-3px', // Center align
            marginTop: '-3px',
            // transform is set via JS in useEffect
        }}
      />
      
      {/* Follower Circle - smooth physics lag */}
      <motion.div 
        className={`fixed top-0 left-0 w-8 h-8 border border-foreground rounded-full pointer-events-none z-[9998] hidden md:block transition-colors duration-300 ${
            isHovered ? 'bg-foreground mix-blend-difference border-transparent scale-150' : ''
        }`}
        style={{ 
            x: cursorXSpring, 
            y: cursorYSpring,
        }}
      />
    </>
  );
};

export default Cursor;
