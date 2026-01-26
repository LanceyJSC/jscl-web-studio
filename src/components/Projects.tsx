import React, { useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import { projects } from '@/data/projects';

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-24 md:py-40 relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/90 via-white to-gray-50/90" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-black/[0.02] via-transparent to-transparent" />
      
      {/* Large decorative number */}
      <div className="absolute top-10 left-4 md:left-10 text-[150px] md:text-[300px] font-display font-bold text-black/[0.02] leading-none pointer-events-none select-none">
        W
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Enhanced Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 md:mb-20 gap-4">
          <div>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              className="text-[10px] font-mono tracking-widest text-gray-400 block mb-2"
            >
              PORTFOLIO
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, margin: "-10%" }}
              transition={{ duration: 0.8 }}
              className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-display font-bold tracking-tighter"
            >
              Selected{' '}
              <span className="text-gray-300 font-light italic">Works</span>
            </motion.h2>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-4"
          >
            <span className="hidden md:block text-[10px] font-mono tracking-widest text-gray-400">
              ( {projects.length} ) PROJECTS
            </span>
            <div className="w-12 h-[1px] bg-black/10 hidden md:block" />
          </motion.div>
        </div>

        {/* Project Grid */}
        <div className="flex flex-col">
          {projects.map((project, index) => (
            <ProjectItem key={project.id} project={project} index={index} />
          ))}
          
          {/* Closing Line with animation */}
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent origin-left"
          />
        </div>

        {/* CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ delay: 0.2 }}
          className="mt-16 md:mt-24 text-center"
        >
          <Link 
            to="/#projects" 
            className="group inline-flex items-center gap-4 px-8 md:px-12 py-4 md:py-5 border border-black text-[10px] md:text-xs font-mono uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-500 relative overflow-hidden"
          >
            <span className="relative z-10">View All Projects</span>
            <motion.span 
              className="relative z-10"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
            <div className="absolute inset-0 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

interface ProjectItemProps {
  project: typeof projects[0];
  index: number;
}

const ProjectItem: React.FC<ProjectItemProps> = ({ project, index }) => {
  const [imgSrc, setImgSrc] = useState(project.image);
  const [hasError, setHasError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  // Magnetic effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });
  
  const handleImageError = () => {
    if (!project.image.startsWith('http') && !project.image.startsWith('/') && !project.image.startsWith('data:')) {
      setImgSrc('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2670&auto=format&fit=crop');
    } else {
      setHasError(true);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.05);
    y.set((e.clientY - centerY) * 0.05);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
      <motion.div 
        style={{ x: springX, y: springY }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-50px" }}
        transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <Link 
          to={`/project/${project.slug}`} 
          className="group relative border-t border-gray-200 py-8 md:py-14 flex flex-col md:flex-row gap-4 md:gap-8 md:items-center justify-between transition-all duration-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-transparent block px-2 md:px-4"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onMouseEnter={() => setIsHovered(true)}
        >
        {/* Hover accent line */}
        <motion.div 
          className="absolute left-0 top-0 bottom-0 w-[3px] bg-black origin-top"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Left Section: Index + Title */}
        <div className="flex items-start md:items-center gap-4 md:gap-8 md:w-5/12">
          {/* Animated Index */}
          <motion.span 
            className="text-[10px] md:text-xs font-mono text-gray-300 group-hover:text-black transition-all duration-500 shrink-0 pt-1 md:pt-0"
            animate={{ scale: isHovered ? 1.2 : 1 }}
          >
            0{index + 1}
          </motion.span>

          {/* Title & Category */}
          <div className="overflow-hidden">
            <motion.h3 
              className="text-xl sm:text-2xl md:text-4xl font-display font-light"
              animate={{ x: isHovered ? 8 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {project.title}
            </motion.h3>
            <motion.span 
              className="text-[9px] md:text-[10px] font-mono font-medium uppercase tracking-widest text-gray-400 mt-1 md:mt-2 block"
              animate={{ x: isHovered ? 12 : 0, opacity: isHovered ? 1 : 0.6 }}
              transition={{ duration: 0.3, delay: 0.05 }}
            >
              {project.category}
            </motion.span>
          </div>
        </div>

        {/* Middle Section: Image */}
        <div className="w-full md:w-5/12 h-44 sm:h-52 md:h-52 overflow-hidden relative">
          <motion.div 
            className="w-full h-full"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {hasError ? (
              <div className="w-full h-full flex flex-col items-center justify-center border border-gray-200 bg-gray-50 p-4 text-center">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-red-400 mb-1">
                  Img Error
                </span>
                <span className="text-[8px] font-mono text-gray-400 break-all">
                  {project.title}
                </span>
              </div>
            ) : (
              <>
                {/* Overlay gradient on hover */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
                <img 
                  src={imgSrc} 
                  alt={project.title} 
                  onError={handleImageError}
                  className="w-full h-full object-cover object-left-top grayscale group-hover:grayscale-0 transition-all duration-1000 ease-out"
                />
              </>
            )}
          </motion.div>
        </div>

        {/* Right Section: Meta & Action */}
        <div className="flex items-center justify-between md:justify-end gap-4 md:gap-8 md:w-2/12">
          <motion.span 
            className="text-[10px] md:text-sm text-gray-400 group-hover:text-black transition-colors text-center font-serif"
            animate={{ y: isHovered ? -2 : 0 }}
          >
            {project.year}
          </motion.span>
           
          <motion.div 
            className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-black group-hover:border-black transition-all duration-500"
            animate={{ scale: isHovered ? 1.1 : 1, rotate: isHovered ? 0 : -45 }}
            transition={{ duration: 0.3 }}
          >
            <svg 
              className="w-3 h-3 md:w-4 md:h-4 text-black group-hover:text-white transition-colors duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
};

export default Projects;
