import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getProjectBySlug } from '@/data/projects';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Cursor from '@/components/Cursor';
import TechnicalGrid from '@/components/TechnicalGrid';
import Noise from '@/components/Noise';

const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-display font-bold mb-4">Project Not Found</h1>
          <Link to="/" className="text-gray-500 hover:text-black transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#fafafa] selection:bg-black selection:text-white overflow-x-hidden">
      <Cursor />
      <TechnicalGrid />
      <Noise />

      <div className="relative z-10 flex flex-col">
        <Navbar />

        <main className="flex-grow pt-24">
          {/* Hero Section */}
          <section className="max-w-7xl mx-auto px-6 py-16">
            {/* Back Link */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link 
                to="/#projects" 
                className="inline-flex items-center gap-2 text-xs font-mono text-gray-500 hover:text-black transition-colors mb-12 group"
              >
                <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                BACK TO PROJECTS
              </Link>
            </motion.div>

            {/* Project Header */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <span className="text-xs font-mono text-gray-400 tracking-widest block mb-4">
                  {project.category.toUpperCase()} / {project.year}
                </span>
                <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-6">
                  {project.title}
                </h1>
                <p className="text-2xl font-light text-gray-600 leading-relaxed">
                  {project.headline}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col justify-end"
              >
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <span className="text-xs font-mono text-gray-400 block mb-2">ROLE</span>
                    <p className="font-medium">{project.role}</p>
                  </div>
                  <div>
                    <span className="text-xs font-mono text-gray-400 block mb-2">DURATION</span>
                    <p className="font-medium">{project.duration}</p>
                  </div>
                </div>

                {project.externalLink !== '#' && (
                  <a
                    href={project.externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-8 px-8 py-4 bg-black text-white font-mono text-xs uppercase tracking-widest hover:bg-gray-800 transition-colors w-fit"
                  >
                    Visit Live Site
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                )}
              </motion.div>
            </div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative aspect-video bg-gray-100 overflow-hidden mb-24"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Project Story */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mb-24">
              {/* Overview */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-2"
              >
                <span className="text-xs font-mono text-gray-400 tracking-widest block mb-4">
                  01 / OVERVIEW
                </span>
                <p className="text-xl font-light text-gray-700 leading-relaxed">
                  {project.description}
                </p>
              </motion.div>

              {/* Technologies */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <span className="text-xs font-mono text-gray-400 tracking-widest block mb-4">
                  TECHNOLOGIES
                </span>
                <ul className="space-y-2">
                  {project.technologies.map((tech, i) => (
                    <li key={i} className="font-mono text-sm text-gray-600">
                      {tech}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Challenge & Solution */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-xs font-mono text-gray-400 tracking-widest block mb-4">
                  02 / THE CHALLENGE
                </span>
                <p className="text-lg font-light text-gray-700 leading-relaxed">
                  {project.challenge}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <span className="text-xs font-mono text-gray-400 tracking-widest block mb-4">
                  03 / THE SOLUTION
                </span>
                <p className="text-lg font-light text-gray-700 leading-relaxed">
                  {project.solution}
                </p>
              </motion.div>
            </div>

            {/* Additional Screenshots */}
            {project.screenshots.length > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-24"
              >
                <span className="text-xs font-mono text-gray-400 tracking-widest block mb-8">
                  04 / GALLERY
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {project.screenshots.slice(1).map((screenshot, i) => (
                    <div key={i} className="aspect-video bg-gray-100 overflow-hidden">
                      <img
                        src={screenshot}
                        alt={`${project.title} screenshot ${i + 2}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Next Project CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="border-t border-gray-200 pt-16 text-center"
            >
              <span className="text-xs font-mono text-gray-400 block mb-4">CONTINUE EXPLORING</span>
              <Link
                to="/#projects"
                className="inline-block text-3xl font-display font-bold hover:text-gray-500 transition-colors"
              >
                View All Projects →
              </Link>
            </motion.div>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default ProjectDetail;