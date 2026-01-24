import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { projects } from '@/data/projects';
const Projects: React.FC = () => {
  return <section id="projects" className="py-16 md:py-24 relative bg-gradient-to-b from-transparent via-black/[0.015] to-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-8 md:mb-16">
          <motion.h2 initial={{
          opacity: 0,
          x: -50
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: false,
          margin: "-10%"
        }} transition={{
          duration: 0.8
        }} className="text-2xl sm:text-3xl md:text-5xl font-display font-bold uppercase tracking-tighter">
            Selected <span className="text-gray-400 font-light">Works</span>
          </motion.h2>
          <motion.span initial={{
          opacity: 0
        }} whileInView={{
          opacity: 1
        }} viewport={{
          once: false,
          margin: "-10%"
        }} transition={{
          delay: 0.5,
          duration: 0.5
        }} className="hidden md:block text-[10px] font-mono tracking-widest text-gray-500 mb-1">
            ( {projects.length} ) PROJECTS
          </motion.span>
        </div>

        {/* List Container */}
        <div className="flex flex-col">
          {projects.map((project, index) => <ProjectItem key={project.id} project={project} index={index} />)}
          {/* Closing Line */}
          <motion.div initial={{
          scaleX: 0
        }} whileInView={{
          scaleX: 1
        }} viewport={{
          once: false,
          margin: "-50px"
        }} transition={{
          duration: 0.8,
          ease: "circOut"
        }} className="border-t border-gray-200 origin-left"></motion.div>
        </div>

        <div className="mt-12 md:mt-20 text-center">
            <Link to="/#projects" className="inline-block px-6 md:px-10 py-3 md:py-4 border border-black text-[10px] md:text-xs font-mono uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-300">
                View All Projects
            </Link>
        </div>
      </div>
    </section>;
};
interface ProjectItemProps {
  project: typeof projects[0];
  index: number;
}
const ProjectItem: React.FC<ProjectItemProps> = ({
  project,
  index
}) => {
  const [imgSrc, setImgSrc] = useState(project.image);
  const [hasError, setHasError] = useState(false);
  const handleImageError = () => {
    if (!project.image.startsWith('http') && !project.image.startsWith('/') && !project.image.startsWith('data:')) {
      setImgSrc('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2670&auto=format&fit=crop');
    } else {
      setHasError(true);
    }
  };
  return <motion.div initial={{
    opacity: 0,
    y: 20
  }} whileInView={{
    opacity: 1,
    y: 0
  }} viewport={{
    once: false,
    margin: "-50px"
  }} transition={{
    duration: 0.5,
    delay: index * 0.1
  }}>
            <Link to={`/project/${project.slug}`} className="group relative border-t border-gray-200 py-6 md:py-12 flex flex-col md:flex-row gap-4 md:gap-8 md:items-center justify-between transition-all duration-500 hover:bg-gray-50 block px-2 md:px-0">
                {/* Left Section: Index + Title */}
                <div className="flex items-start md:items-center gap-4 md:gap-8 md:w-5/12">
                    {/* Index */}
                    <span className="text-[10px] md:text-xs font-mono text-gray-300 group-hover:text-black transition-colors shrink-0 pt-1 md:pt-0">
                        0{index + 1}
                    </span>

                    {/* Title & Category */}
                    <div>
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-light group-hover:translate-x-2 transition-transform duration-500">
                            {project.title}
                        </h3>
                        <span className="text-[9px] md:text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400 mt-1 md:mt-2 block group-hover:translate-x-2 transition-transform duration-500 delay-75">
                            {project.category}
                        </span>
                    </div>
                </div>

                {/* Middle Section: Image or Fallback */}
                <div className="w-full md:w-5/12 h-40 sm:h-48 md:h-44 overflow-hidden relative transition-all duration-700 bg-gray-100 group-hover:bg-gray-200">
                    {hasError ? <div className="w-full h-full flex flex-col items-center justify-center border border-gray-200 bg-gray-50 p-4 text-center">
                            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-red-400 mb-1">
                                Img Error
                            </span>
                            <span className="text-[8px] font-mono text-gray-400 break-all">
                               {project.title}
                            </span>
                        </div> : <>
                            <div className="absolute inset-0 bg-gray-100/10 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-0 z-10" />
                            <img src={imgSrc} alt={project.title} onError={handleImageError} className="w-full h-full object-cover object-left-top grayscale group-hover:grayscale-0 transform scale-100 group-hover:scale-105 transition-all duration-1000 ease-out" />
                        </>}
                </div>

                {/* Right Section: Meta & Action */}
                <div className="flex items-center justify-between md:justify-end gap-4 md:gap-8 md:w-2/12">
                     <span className="text-[10px] md:text-xs text-gray-400 group-hover:text-black transition-colors text-center font-serif">
                        {project.year}
                     </span>
                     
                     <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-black group-hover:border-black transition-all duration-300">
                        <svg className="w-2.5 h-2.5 md:w-3 md:h-3 text-black group-hover:text-white transform -rotate-45 group-hover:rotate-0 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                     </div>
                </div>
            </Link>
        </motion.div>;
};
export default Projects;