import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TechnicalGrid from '@/components/TechnicalGrid';
import Cursor from '@/components/Cursor';
import Noise from '@/components/Noise';
import PageTransition from '@/components/PageTransition';
import GeometricShapes from '@/components/GeometricShapes';

const projects = [
  { 
    id: 1, 
    title: "NEXUS PLATFORM", 
    category: "Web Application", 
    year: "2024",
    description: "A next-generation SaaS platform with real-time collaboration features, built for enterprise teams.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=600&fit=crop",
    tech: ["React", "TypeScript", "WebSockets", "PostgreSQL"],
    link: "#"
  },
  { 
    id: 2, 
    title: "VOID STUDIOS", 
    category: "Brand Identity", 
    year: "2024",
    description: "Complete brand redesign for a creative agency, including logo, website, and marketing materials.",
    image: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&h=600&fit=crop",
    tech: ["Figma", "After Effects", "Webflow"],
    link: "#"
  },
  { 
    id: 3, 
    title: "ECHO COMMERCE", 
    category: "E-Commerce", 
    year: "2023",
    description: "High-performance headless e-commerce solution with custom checkout and inventory management.",
    image: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=800&h=600&fit=crop",
    tech: ["Next.js", "Shopify API", "Stripe", "Tailwind"],
    link: "#"
  },
  { 
    id: 4, 
    title: "NEURAL DASHBOARD", 
    category: "Data Visualization", 
    year: "2023",
    description: "AI-powered analytics dashboard with real-time data streams and predictive insights.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    tech: ["React", "D3.js", "Python", "TensorFlow"],
    link: "#"
  },
];

const ProjectsPage: React.FC = () => {
  return (
    <PageTransition>
      <div className="relative min-h-screen bg-background selection:bg-foreground selection:text-background overflow-x-hidden">
        <Cursor />
        <TechnicalGrid />
        <Noise />
        <GeometricShapes variant="projects" />
        
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          
          <main className="flex-grow pt-32 pb-24">
            <div className="max-w-7xl mx-auto px-6">
              {/* Header */}
              <motion.div 
                className="mb-20"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <motion.div 
                    className="w-12 h-12 border-2 border-foreground rounded-full flex items-center justify-center"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <div className="w-2 h-2 bg-foreground rounded-full" />
                  </motion.div>
                  <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase">Selected Works</span>
                </div>
                <h1 className="font-display text-6xl md:text-8xl font-bold tracking-tight">
                  PROJECTS
                </h1>
                <p className="mt-6 text-xl text-muted-foreground max-w-2xl">
                  A curated selection of digital experiences crafted with precision and purpose.
                </p>
              </motion.div>

              {/* Projects Grid */}
              <div className="space-y-32">
                {projects.map((project, index) => (
                  <motion.article
                    key={project.id}
                    className="group"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 + index * 0.15, duration: 0.6 }}
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                      {/* Image */}
                      <motion.div 
                        className={`relative overflow-hidden ${index % 2 === 1 ? 'lg:order-2' : ''}`}
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.4 }}
                      >
                        <div className="aspect-[4/3] overflow-hidden">
                          <motion.img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.6 }}
                          />
                        </div>
                        {/* Corner accents */}
                        <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </motion.div>

                      {/* Content */}
                      <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                        <div className="flex items-center gap-4 mb-4">
                          <span className="font-mono text-sm text-muted-foreground">
                            0{project.id}
                          </span>
                          <span className="w-12 h-[1px] bg-foreground/30" />
                          <span className="font-mono text-sm text-muted-foreground">
                            {project.year}
                          </span>
                        </div>
                        
                        <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 group-hover:translate-x-2 transition-transform duration-300">
                          {project.title}
                        </h2>
                        
                        <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-6">
                          {project.category}
                        </p>
                        
                        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                          {project.description}
                        </p>
                        
                        {/* Tech Stack */}
                        <div className="flex flex-wrap gap-2 mb-8">
                          {project.tech.map((tech) => (
                            <span 
                              key={tech}
                              className="px-3 py-1 text-xs font-mono border border-foreground/20 text-muted-foreground"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        {/* View Project */}
                        <motion.a
                          href={project.link}
                          className="inline-flex items-center gap-3 group/link"
                          whileHover={{ x: 10 }}
                        >
                          <span className="font-mono text-sm uppercase tracking-widest">View Project</span>
                          <motion.span
                            className="text-xl"
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            →
                          </motion.span>
                        </motion.a>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>

              {/* Back to Home */}
              <motion.div 
                className="mt-32 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
              >
                <Link 
                  to="/"
                  className="inline-flex items-center gap-3 font-mono text-sm uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
                >
                  <span>←</span>
                  <span>Back to Home</span>
                </Link>
              </motion.div>
            </div>
          </main>
          
          <Footer />
        </div>
      </div>
    </PageTransition>
  );
};

export default ProjectsPage;
