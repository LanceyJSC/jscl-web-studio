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
import TextReveal from '@/components/TextReveal';

const skills = [
  { title: "Frontend", items: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Framer Motion"] },
  { title: "Creative", items: ["WebGL", "Three.js", "GSAP", "Canvas API", "Shaders"] },
  { title: "Design", items: ["Figma", "Adobe CC", "Blender", "UI/UX", "Motion Design"] },
  { title: "Backend", items: ["Node.js", "PostgreSQL", "Supabase", "AWS", "REST/GraphQL"] }
];

const experience = [
  { year: "2022 - Present", role: "Senior Frontend Developer", company: "Tech Innovators Inc." },
  { year: "2020 - 2022", role: "Creative Developer", company: "Digital Agency XYZ" },
  { year: "2018 - 2020", role: "UI/UX Designer", company: "Design Studio ABC" },
];

const AboutPage: React.FC = () => {
  return (
    <PageTransition>
      <div className="relative min-h-screen bg-background selection:bg-foreground selection:text-background overflow-x-hidden">
        <Cursor />
        <TechnicalGrid />
        <Noise />
        <GeometricShapes variant="about" />
        
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
                    className="w-12 h-12 border-2 border-foreground flex items-center justify-center"
                    style={{ transform: 'rotate(45deg)' }}
                    animate={{ rotate: [45, 135, 225, 315, 405] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <div className="w-2 h-2 bg-foreground" style={{ transform: 'rotate(-45deg)' }} />
                  </motion.div>
                  <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase">Who I Am</span>
                </div>
                <h1 className="font-display text-6xl md:text-8xl font-bold tracking-tight">
                  <TextReveal delay={1.1}>ABOUT</TextReveal>
                </h1>
              </motion.div>

              {/* Main Content */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                {/* Left Column - Bio */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                >
                  <div className="sticky top-32">
                    <div className="font-display text-4xl md:text-5xl font-bold leading-tight mb-8">
                      <TextReveal delay={1.3}>DIGITAL</TextReveal>
                      <br />
                      <TextReveal delay={1.5}>CRAFTSMAN</TextReveal>
                    </div>
                    
                    <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                      I build digital products that are clean, efficient, and future-proof. 
                      With over 6 years of experience in web development and design, 
                      I specialize in creating immersive digital experiences.
                    </p>
                    
                    <p className="text-lg text-muted-foreground/80 leading-relaxed mb-12">
                      "Design is intelligence made visible." I believe in stripping away 
                      the non-essential to reveal the core message. My process is deeply 
                      collaborative, ensuring every pixel serves a purpose.
                    </p>

                    {/* Triangle decoration */}
                    <motion.div
                      className="flex gap-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.8 }}
                    >
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-b-[26px] border-b-foreground/20"
                          animate={{ y: [0, -10, 0] }}
                          transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
                        />
                      ))}
                    </motion.div>
                  </div>
                </motion.div>

                {/* Right Column - Skills & Experience */}
                <div className="space-y-20">
                  {/* Skills */}
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.4, duration: 0.6 }}
                  >
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-8 block">
                      01 / Tech Stack
                    </span>
                    
                    <div className="grid grid-cols-2 gap-8">
                      {skills.map((group, i) => (
                        <motion.div 
                          key={group.title}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.5 + i * 0.1 }}
                        >
                          <h4 className="font-bold mb-4 text-foreground">
                            <TextReveal delay={1.6 + i * 0.1}>{group.title}</TextReveal>
                          </h4>
                          <ul className="space-y-2 font-mono text-sm text-muted-foreground">
                            {group.items.map((item) => (
                              <li key={item} className="flex items-center gap-2">
                                <span className="w-1 h-1 bg-foreground/50" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Experience */}
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.6, duration: 0.6 }}
                  >
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-8 block">
                      02 / Experience
                    </span>
                    
                    <div className="space-y-6">
                      {experience.map((exp, i) => (
                        <motion.div
                          key={i}
                          className="group border-l-2 border-foreground/20 pl-6 hover:border-foreground transition-colors duration-300"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 1.7 + i * 0.1 }}
                        >
                          <span className="font-mono text-xs text-muted-foreground">
                            {exp.year}
                          </span>
                          <h4 className="font-bold text-lg mt-1">{exp.role}</h4>
                          <p className="text-muted-foreground">{exp.company}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Values */}
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.8, duration: 0.6 }}
                  >
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-8 block">
                      03 / Values
                    </span>
                    
                    <div className="grid grid-cols-1 gap-6">
                      {[
                        { title: "Precision", desc: "Every detail matters. From pixel-perfect designs to clean code architecture." },
                        { title: "Innovation", desc: "Pushing boundaries with creative solutions and cutting-edge technologies." },
                        { title: "Collaboration", desc: "The best work emerges from open communication and shared vision." }
                      ].map((value, i) => (
                        <motion.div
                          key={value.title}
                          className="p-6 border border-foreground/10 hover:border-foreground/30 transition-colors duration-300"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.9 + i * 0.1 }}
                        >
                          <h4 className="font-bold mb-2">{value.title}</h4>
                          <p className="text-sm text-muted-foreground">{value.desc}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Back to Home */}
              <motion.div 
                className="mt-32 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.2 }}
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

export default AboutPage;
