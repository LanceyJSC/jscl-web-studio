import { useScroll, useTransform, MotionValue } from 'framer-motion';
import { useRef } from 'react';

interface ParallaxOptions {
  offset?: [string, string];
  inputRange?: [number, number];
  outputRange?: [number, number];
}

export const useParallax = (options: ParallaxOptions = {}) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const { offset = ["start end", "end start"], inputRange = [0, 1], outputRange = [0, 100] } = options;
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset as ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, inputRange, outputRange);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  return { ref, y, opacity, scale, scrollYProgress };
};

export const useParallaxLayer = (
  scrollYProgress: MotionValue<number>,
  speed: number = 50
) => {
  return useTransform(scrollYProgress, [0, 1], [0, speed]);
};
