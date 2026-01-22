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
  const [isRevealed, setIsRevealed] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  useEffect(() => {
    // If we've already revealed it, stop.
    if (isRevealed) return;

    if (isInView) {
      setHasStarted(true);
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
            setIsRevealed(true);
            setDisplayText(children);
          }

          iteration += 1 / 3; 
        }, 30);

        return () => clearInterval(interval);
      }, delay * 1000);

      return () => clearTimeout(startTimeout);
    }
  }, [isInView, children, delay, isRevealed]);

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
