import React from 'react';
import { motion } from 'framer-motion';

interface MorphingShapeProps {
  className?: string;
}

const MorphingShape: React.FC<MorphingShapeProps> = ({ className = '' }) => {
  // Different blob paths to morph between
  const paths = [
    "M44.5,-76.3C56.9,-69.5,65.5,-55.6,72.6,-41.1C79.7,-26.6,85.3,-11.4,84.2,3.1C83.1,17.6,75.2,31.4,65.8,43.6C56.3,55.8,45.3,66.3,32.2,72.7C19.1,79.1,3.9,81.3,-11.3,80.1C-26.5,78.9,-41.7,74.2,-54.2,65.5C-66.7,56.8,-76.5,44.1,-81.4,29.7C-86.3,15.3,-86.3,-0.8,-81.9,-15.4C-77.5,-30,-68.7,-43.1,-57.1,-50.5C-45.5,-57.9,-31.1,-59.6,-17.9,-67.4C-4.7,-75.2,7.3,-89.1,20.5,-90.2C33.7,-91.3,48.1,-79.6,44.5,-76.3Z",
    "M38.9,-67.5C49.5,-59.3,56.5,-46.5,63.6,-33.4C70.7,-20.3,77.9,-6.9,78.2,7C78.5,20.9,71.9,35.3,62.5,46.8C53.1,58.3,40.9,66.9,27.4,72.2C13.9,77.5,-0.9,79.5,-15.4,76.8C-29.9,74.1,-44.1,66.7,-55.2,56C-66.3,45.3,-74.3,31.3,-77.6,16.2C-80.9,1.1,-79.5,-15.1,-73.2,-28.9C-66.9,-42.7,-55.7,-54.1,-42.9,-61.3C-30.1,-68.5,-15.1,-71.5,0,-71.5C15.1,-71.5,30.2,-71.5,38.9,-67.5Z",
    "M42.1,-72.1C54.1,-64.9,63.1,-52.5,69.9,-39.1C76.7,-25.7,81.3,-11.3,80.8,2.7C80.3,16.7,74.7,30.4,66.5,42.4C58.3,54.4,47.5,64.7,34.7,71.1C21.9,77.5,7.1,80,-7.4,78.7C-21.9,77.4,-36.1,72.3,-48.3,64.1C-60.5,55.9,-70.7,44.6,-76.4,31.4C-82.1,18.2,-83.3,3.1,-80.4,-10.9C-77.5,-24.9,-70.5,-37.8,-60.4,-47.1C-50.3,-56.4,-37.1,-62.1,-24.2,-68.4C-11.3,-74.7,1.3,-81.6,14.3,-82.1C27.3,-82.6,40.7,-76.7,42.1,-72.1Z"
  ];

  return (
    <motion.div className={`absolute pointer-events-none ${className}`}>
      <motion.svg
        viewBox="0 0 200 200"
        className="w-full h-full"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        <motion.path
          fill="currentColor"
          d={paths[0]}
          animate={{
            d: paths
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
          transform="translate(100, 100)"
        />
      </motion.svg>
    </motion.div>
  );
};

export default MorphingShape;
