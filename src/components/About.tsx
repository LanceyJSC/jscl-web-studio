import React from 'react';
import { motion } from 'framer-motion';
import TextReveal from './TextReveal';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 md:py-40 relative">
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/[0.02] to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-black">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24">
          
          {/* Left column - Bold header */}
          <div className="relative">
            <div className="lg:sticky lg:top-32">
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, margin: "-10%" }}
                transition={{ duration: 0.6 }}
                className="text-[10px] md:text-xs font-mono text-black/40 uppercase tracking-[0.3em] mb-6 block"
              >
                About
              </motion.span>
              
              <div className="font-display text-5xl sm:text-6xl md:text-8xl font-bold leading-[0.9] mb-8 tracking-tighter">
                <TextReveal delay={0.1}>I CREATE</TextReveal>
                <br />
                <span className="text-black/20">
                  <TextReveal delay={0.3}>WEBSITES</TextReveal>
                </span>
                <br />
                <TextReveal delay={0.5}>THAT WORK</TextReveal>
              </div>
              
              <motion.div 
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: false, margin: "-10%" }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.7 }}
                className="w-24 h-[2px] bg-black origin-left mb-8"
              />
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-10%" }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="text-lg md:text-xl text-black/50 font-light max-w-sm leading-relaxed"
              >
                Delivering results through thoughtful design and clean code.
              </motion.p>
            </div>
          </div>

          {/* Right column - Content blocks */}
          <div className="space-y-16 md:space-y-28">
            {/* Philosophy Block */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-10%" }}
              transition={{ duration: 0.8 }}
              className="group"
            >
              <span className="text-6xl md:text-8xl font-display font-bold text-black/[0.06] block mb-4 group-hover:text-black/10 transition-colors duration-500">01</span>
              <h3 className="text-xs font-mono text-black/40 uppercase tracking-[0.2em] mb-4">My Approach</h3>
              <p className="text-xl md:text-2xl font-light leading-relaxed text-black/80">
                Great websites start with understanding your goals. I work closely with each client to create something that truly represents their brand—thoughtful design that connects with your audience.
              </p>
            </motion.div>

            {/* Stack Block */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-10%" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="group"
            >
              <span className="text-6xl md:text-8xl font-display font-bold text-black/[0.06] block mb-4 group-hover:text-black/10 transition-colors duration-500">02</span>
              <h3 className="text-xs font-mono text-black/40 uppercase tracking-[0.2em] mb-8">Tech Stack</h3>
              <div className="grid grid-cols-2 gap-y-10 gap-x-8">
                {[
                  { title: "Frontend", items: ["React", "TypeScript", "Vite", "Tailwind CSS"] },
                  { title: "Animation", items: ["Framer Motion", "CSS Animations"] },
                  { title: "Design", items: ["Figma", "UI/UX", "Responsive Design"] },
                  { title: "Deployment", items: ["Vercel", "Git", "CI/CD"] }
                ].map((group, i) => (
                  <motion.div 
                    key={group.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: "-50px" }}
                    transition={{ delay: 0.3 + (i * 0.1) }}
                    className="group/item"
                  >
                    <h4 className="text-black font-bold mb-3 text-sm md:text-base tracking-wide uppercase">
                      {group.title}
                    </h4>
                    <ul className="space-y-2 text-black/50 font-mono text-xs md:text-sm">
                      {group.items.map(item => (
                        <li key={item} className="hover:text-black transition-colors duration-300">{item}</li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default About;