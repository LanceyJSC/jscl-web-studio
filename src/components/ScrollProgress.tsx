import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

interface Section {
  id: string;
  label: string;
}

const sections: Section[] = [
  { id: 'hero', label: 'Home' },
  { id: 'projects', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
      
      // Default to hero if at top
      if (window.scrollY < 100) {
        setActiveSection('hero');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 2, duration: 0.6 }}
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-1"
    >
      {/* Progress Line Background */}
      <div className="absolute left-1/2 -translate-x-1/2 w-[1px] h-full bg-black/10" />
      
      {/* Animated Progress Fill */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 w-[1px] bg-black origin-top"
        style={{ scaleY, height: '100%' }}
      />

      {/* Section Dots */}
      <div className="relative flex flex-col gap-6">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className="group relative flex items-center gap-3"
          >
            {/* Dot */}
            <motion.div
              className={`w-2.5 h-2.5 rounded-full border transition-all duration-300 ${
                activeSection === section.id
                  ? 'bg-black border-black scale-125'
                  : 'bg-transparent border-black/30 hover:border-black/60'
              }`}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
            />
            
            {/* Label (shows on hover) */}
            <span
              className={`absolute right-6 text-[10px] font-mono uppercase tracking-wider whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${
                activeSection === section.id ? 'text-black' : 'text-black/50'
              }`}
            >
              {section.label}
            </span>
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default ScrollProgress;
