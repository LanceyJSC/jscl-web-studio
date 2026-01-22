import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  image: string;
  link?: string;
}

const projects: Project[] = [
  {
    id: '01',
    title: 'Helix Finance',
    category: 'Web Design / Development',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop',
    link: '#'
  },
  {
    id: '02',
    title: 'Verdant Studio',
    category: 'Brand Identity / Website',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=800&fit=crop',
    link: '#'
  },
  {
    id: '03',
    title: 'Nexus Platform',
    category: 'UI/UX Design / Development',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1200&h=800&fit=crop',
    link: '#'
  },
  {
    id: '04',
    title: 'Apex Dynamics',
    category: 'Full Stack Application',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&h=800&fit=crop',
    link: '#'
  },
  {
    id: '05',
    title: 'Lumina Arts',
    category: 'Creative Direction / Web',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1493612276216-ee3925520721?w=1200&h=800&fit=crop',
    link: '#'
  }
];

const Projects: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <section id="projects" className="py-32 relative bg-transparent">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 flex justify-between items-end border-b border-border pb-6"
        >
          <div>
            <span className="text-xs font-mono text-muted-foreground mb-2 block tracking-widest">// SELECTED WORK</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight">Projects</h2>
          </div>
          <span className="text-sm font-mono text-muted-foreground hidden md:block">2023 — 2024</span>
        </motion.div>

        {/* Project List */}
        <div className="space-y-0" onMouseMove={handleMouseMove}>
          {projects.map((project, index) => (
            <motion.a
              key={project.id}
              href={project.link}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1 }}
              className="group block border-b border-border py-8 relative"
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="flex items-center justify-between">
                {/* Left: Number & Title */}
                <div className="flex items-center gap-8">
                  <span className="text-xs font-mono text-muted-foreground w-8">{project.id}</span>
                  <h3 className="text-2xl md:text-4xl font-display font-medium group-hover:translate-x-4 transition-transform duration-300">
                    {project.title}
                  </h3>
                </div>
                
                {/* Right: Category & Year */}
                <div className="hidden md:flex items-center gap-12 text-sm text-muted-foreground">
                  <span className="font-mono">{project.category}</span>
                  <span className="font-mono">{project.year}</span>
                  <motion.span 
                    className="text-xl"
                    animate={{ x: hoveredId === project.id ? 5 : 0 }}
                  >
                    →
                  </motion.span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Floating Image Preview */}
        <AnimatePresence>
          {hoveredId && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="fixed pointer-events-none z-50 w-80 h-52 overflow-hidden shadow-2xl hidden md:block"
              style={{
                left: mousePosition.x + 20,
                top: mousePosition.y - 100,
              }}
            >
              <img
                src={projects.find(p => p.id === hoveredId)?.image}
                alt=""
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              />
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default Projects;
