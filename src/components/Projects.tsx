import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";

interface Project {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  image: string;
  link?: string;
}

const projects: Project[] = [
  {
    id: "sceneburn",
    number: "01",
    title: "Sceneburn",
    category: "Film & TV Tracker",
    description: "A comprehensive platform for tracking films and TV shows with a sleek, modern interface.",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&h=600&fit=crop&q=80",
    link: "https://sceneburn.com",
  },
  {
    id: "apex-finance",
    number: "02",
    title: "Apex Finance",
    category: "Trading Interface",
    description: "Professional trading dashboard with real-time data visualization and analytics.",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600&fit=crop&q=80",
  },
  {
    id: "vanguard-capital",
    number: "03",
    title: "Vanguard Capital",
    category: "Investment Banking",
    description: "Corporate website for a leading investment banking firm with elegant design.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop&q=80",
  },
  {
    id: "helix-health",
    number: "04",
    title: "Helix Health",
    category: "Biotech Dashboard",
    description: "Healthcare analytics platform with intuitive data visualization.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop&q=80",
  },
  {
    id: "mono-architectural",
    number: "05",
    title: "Mono Architectural",
    category: "Real Estate",
    description: "Minimalist portfolio for an architectural firm showcasing their projects.",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=600&fit=crop&q=80",
  },
];

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group"
    >
      <a
        href={project.link || "#"}
        target={project.link ? "_blank" : undefined}
        rel={project.link ? "noopener noreferrer" : undefined}
        className="block"
      >
        {/* Image container */}
        <div className="relative aspect-[4/3] overflow-hidden bg-muted mb-4">
          {/* Loading skeleton */}
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 bg-muted animate-pulse" />
          )}
          
          {/* Error fallback */}
          {imageError && (
            <div className="absolute inset-0 bg-muted flex items-center justify-center">
              <span className="text-muted-foreground font-mono text-sm">
                {project.number}
              </span>
            </div>
          )}
          
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
          
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300" />
          
          {/* Arrow indicator */}
          <motion.div
            initial={{ opacity: 0, x: -10, y: 10 }}
            whileHover={{ opacity: 1, x: 0, y: 0 }}
            className="absolute top-4 right-4 w-10 h-10 bg-background flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <ArrowUpRight className="w-5 h-5 text-foreground" />
          </motion.div>
        </div>

        {/* Content */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="text-xs font-mono text-muted-foreground mb-1 block">
              {project.number}
            </span>
            <h3 className="text-lg font-medium text-foreground group-hover:text-accent transition-colors duration-200">
              {project.title}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {project.category}
            </p>
          </div>
        </div>
      </a>
    </motion.article>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-xs font-mono text-muted-foreground tracking-wide block mb-2">
            // SELECTED WORK
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Projects
          </h2>
        </motion.div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* View all link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <a
            href="#"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 hover-line"
          >
            View All Projects
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
