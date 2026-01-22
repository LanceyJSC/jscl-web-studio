import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Project {
  id: number;
  title: string;
  category: string;
  year: string;
  image: string;
  link: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Sceneburn',
    category: 'Film & TV Tracker',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2525&auto=format&fit=crop', 
    link: 'https://sceneburn.com/',
  },
  {
    id: 2,
    title: 'Apex Finance',
    category: 'Trading Interface',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?q=80&w=2670&auto=format&fit=crop',
    link: '#',
  },
  {
    id: 3,
    title: 'Vanguard Capital',
    category: 'Investment Banking',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop',
    link: '#',
  },
  {
    id: 4,
    title: 'Helix Health',
    category: 'Biotech Dashboard',
    year: '2022',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2670&auto=format&fit=crop',
    link: '#',
  },
  {
    id: 5,
    title: 'Mono Architectural',
    category: 'Real Estate',
    year: '2022',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop',
    link: '#',
  }
];

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-end justify-between mb-8 md:mb-16">
          <motion.h2 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-10%" }}
            transition={{ duration: 0.8 }}
            className="text-2xl md:text-5xl font-display font-bold uppercase tracking-tighter"
          >
            Selected <span className="text-muted-foreground font-light">Works</span>
          </motion.h2>
          <motion.span 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: false, margin: "-10%" }}
             transition={{ delay: 0.5, duration: 0.5 }}
             className="hidden md:block text-[10px] font-mono tracking-widest text-muted-foreground mb-1"
          >
            ( {projects.length} ) PROJECTS
          </motion.span>
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
            className="border-t border-border origin-left"
          ></motion.div>
        </div>

        <div className="mt-12 md:mt-20 text-center">
            <a href="#" className="inline-block px-6 md:px-10 py-3 md:py-4 border border-foreground text-[10px] md:text-xs font-mono uppercase tracking-widest hover:bg-foreground hover:text-background transition-all duration-300">
                View All Projects
            </a>
        </div>
      </div>
    </section>
  );
};

const ProjectItem: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
    const [imgSrc, setImgSrc] = useState(project.image);
    const [hasError, setHasError] = useState(false);
    
    const handleImageError = () => {
        if (!project.image.startsWith('http')) {
             setImgSrc('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2670&auto=format&fit=crop');
        } else {
            setHasError(true);
        }
    };

    return (
        <motion.a 
            href={project.link}
            target={project.link.startsWith('http') ? "_blank" : "_self"}
            rel={project.link.startsWith('http') ? "noopener noreferrer" : undefined}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative border-t border-border py-6 md:py-12 flex flex-col md:flex-row gap-4 md:gap-8 md:items-center justify-between transition-all duration-500 hover:bg-secondary/50"
        >
            {/* Left Section: Index + Title */}
            <div className="flex items-start md:items-center gap-4 md:gap-8 md:w-5/12">
                {/* Index */}
                <span className="text-[10px] md:text-xs font-mono text-muted-foreground/50 group-hover:text-foreground transition-colors shrink-0 pt-1 md:pt-0">
                    0{index + 1}
                </span>

                {/* Title & Category */}
                <div>
                    <h3 className="text-xl md:text-3xl font-display font-light group-hover:translate-x-2 transition-transform duration-500">
                        {project.title}
                    </h3>
                    <span className="text-[9px] md:text-[10px] font-mono font-bold uppercase tracking-widest text-muted-foreground mt-1 md:mt-2 block group-hover:translate-x-2 transition-transform duration-500 delay-75">
                        {project.category}
                    </span>
                </div>
            </div>

            {/* Middle Section: Image or Fallback */}
            <div className="w-full md:w-5/12 h-32 md:h-40 overflow-hidden relative transition-all duration-700 bg-muted group-hover:bg-muted/80">
                {hasError ? (
                    <div className="w-full h-full flex flex-col items-center justify-center border border-border bg-secondary p-4 text-center">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-destructive mb-1">
                            Img Error
                        </span>
                        <span className="text-[8px] font-mono text-muted-foreground break-all">
                           {project.title}
                        </span>
                    </div>
                ) : (
                    <>
                        <div className="absolute inset-0 bg-muted/10 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-0 z-10" />
                        <img 
                            src={imgSrc}
                            alt={project.title} 
                            onError={handleImageError}
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transform scale-100 group-hover:scale-110 transition-all duration-1000 ease-out"
                        />
                    </>
                )}
            </div>

            {/* Right Section: Meta & Action */}
            <div className="flex items-center justify-between md:justify-end gap-4 md:gap-8 md:w-2/12">
                 <span className="text-[10px] md:text-xs font-mono text-muted-foreground group-hover:text-foreground transition-colors">
                    {project.year}
                 </span>
                 
                 <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-border flex items-center justify-center group-hover:bg-foreground group-hover:border-foreground transition-all duration-300">
                    <svg className="w-2.5 h-2.5 md:w-3 md:h-3 text-foreground group-hover:text-background transform -rotate-45 group-hover:rotate-0 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                 </div>
            </div>
        </motion.a>
    );
}

export default Projects;
