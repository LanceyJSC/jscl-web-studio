import React, { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
}

const chars = "!@#$%^&*()_+-=[]{}|;:,.<>/?0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const TextReveal: React.FC<TextRevealProps> = ({ children, className = "", delay = 0 }) => {
  const [displayText, setDisplayText] = useState(children);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  
  const ref = useRef(null);
  // once: false allows re-triggering on every scroll into view
  const isInView = useInView(ref, { once: false, margin: "-10%" });

  useEffect(() => {
    // When element leaves viewport, reset state for next animation
    if (!isInView) {
      setIsAnimating(false);
      setHasStarted(false);
      setDisplayText(children);
      return;
    }

    // If already animating, don't restart
    if (isAnimating) return;

    // Start animation when in view
    setHasStarted(true);
    setIsAnimating(true);
    
    const startTimeout = setTimeout(() => {
      let iteration = 0;
      const interval = setInterval(() => {
        setDisplayText(
          children
            .split("")
            .map((letter, index) => {
              if (index < iteration) {
                return children[index];
              }
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("")
        );

        if (iteration >= children.length) {
          clearInterval(interval);
          setDisplayText(children);
        }

        iteration += 1 / 3; 
      }, 30);

      return () => clearInterval(interval);
    }, delay * 1000);

    return () => clearTimeout(startTimeout);
  }, [isInView, children, delay, isAnimating]);

  return (
    <span 
      ref={ref} 
      className={`inline-block font-mono ${className} transition-opacity duration-500 ${hasStarted ? 'opacity-100' : 'opacity-0'}`}
    >
      {displayText}
    </span>
  );
};

export default TextReveal;