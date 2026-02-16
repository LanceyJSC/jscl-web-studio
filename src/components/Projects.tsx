import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { projects } from '@/data/projects';

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-16 md:py-24 relative">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-b from-foreground/[0.02] via-transparent to-foreground/[0.02]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Bold header */}
        <div className="mb-16 md:mb-24">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-10%" }}
            className="text-[10px] md:text-xs font-mono text-accent uppercase tracking-[0.3em] mb-6 block"
          >
            Portfolio
          </motion.span>
          
          <div className="flex items-end justify-between">
            <div>
              <div className="overflow-hidden">
                <motion.h2 
                  initial={{ y: "100%" }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: false, margin: "-10%" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold tracking-tighter leading-[0.9] text-foreground"
                >
                  SELECTED
                </motion.h2>
              </div>
              <div className="overflow-hidden">
                <motion.h2 
                  initial={{ y: "100%" }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: false, margin: "-10%" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                  className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold tracking-tighter leading-[0.9] text-muted-foreground/40"
                >
                  WORKS
                </motion.h2>
              </div>
            </div>
            
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false, margin: "-10%" }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="hidden md:block text-6xl font-display font-bold text-foreground/[0.06]"
            >
              {String(projects.length).padStart(2, '0')}
            </motion.span>
          </div>
        </div>

        {/* List Container */}
        <div className="flex flex-col">
          {projects.map((project, index) => (
            <ProjectItem key={project.id} project={project} index={index} />
          ))}
          {/* Closing Line */}
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 0.8, ease: "circOut" }}
            className="h-[1px] bg-border origin-left"
          />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ delay: 0.3 }}
          className="mt-16 md:mt-24 text-center"
        >
          <Link 
            to="/#projects" 
            className="inline-block px-10 md:px-14 py-4 md:py-5 bg-foreground text-background text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] hover:bg-accent transition-all duration-300"
          >
            View All Projects
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
  
  const handleImageError = () => {
    if (!project.image.startsWith('http') && !project.image.startsWith('/') && !project.image.startsWith('data:')) {
      setImgSrc('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2670&auto=format&fit=crop');
    } else {
      setHasError(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link 
        to={`/project/${project.slug}`} 
        className="group relative border-t border-border py-6 md:py-12 flex flex-col md:flex-row gap-4 md:gap-8 md:items-center justify-between transition-all duration-500 hover:bg-secondary/50 block px-2 md:px-0"
      >
        {/* Left Section: Index + Title */}
        <div className="flex items-start md:items-center gap-4 md:gap-8 md:w-5/12">
          <span className="text-[10px] md:text-xs font-mono text-muted-foreground/40 group-hover:text-accent transition-colors shrink-0 pt-1 md:pt-0">
            0{index + 1}
          </span>
          <div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold tracking-tight group-hover:translate-x-3 transition-transform duration-500 text-foreground">
              {project.title}
            </h3>
            <span className="text-[10px] md:text-xs font-mono uppercase tracking-[0.15em] text-muted-foreground mt-2 block group-hover:translate-x-3 transition-transform duration-500 delay-75">
              {project.category}
            </span>
          </div>
        </div>

        {/* Middle Section: Image */}
        <div className="w-full md:w-5/12 h-40 sm:h-48 md:h-44 overflow-hidden relative transition-all duration-700 bg-secondary group-hover:bg-muted">
          {hasError ? (
            <div className="w-full h-full flex flex-col items-center justify-center border border-border bg-secondary p-4 text-center">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-destructive mb-1">Img Error</span>
              <span className="text-[8px] font-mono text-muted-foreground break-all">{project.title}</span>
            </div>
          ) : (
            <>
              <div className="absolute inset-0 bg-accent/5 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-0 z-10" />
              <img 
                src={imgSrc} 
                alt={project.title} 
                onError={handleImageError} 
                className="w-full h-full object-cover object-left-top grayscale group-hover:grayscale-0 transform scale-100 group-hover:scale-105 transition-all duration-1000 ease-out" 
              />
            </>
          )}
        </div>

        {/* Right Section */}
        <div className="flex items-center justify-between md:justify-end gap-4 md:gap-8 md:w-2/12">
          <span className="text-[10px] md:text-xs text-muted-foreground group-hover:text-foreground transition-colors text-center font-serif">
            {project.year}
          </span>
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-border flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all duration-300">
            <svg className="w-2.5 h-2.5 md:w-3 md:h-3 text-foreground group-hover:text-accent-foreground transform -rotate-45 group-hover:rotate-0 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default Projects;
