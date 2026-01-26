import React from 'react';
import { motion } from 'framer-motion';
import TextReveal from './TextReveal';
import AnimatedCounter from './AnimatedCounter';

const About: React.FC = () => {
  const stats = [
    { value: 50, suffix: '+', label: 'Projects Delivered' },
    { value: 5, suffix: '+', label: 'Years Experience' },
    { value: 100, suffix: '%', label: 'Client Satisfaction' },
  ];

  return (
    <section id="about" className="py-20 md:py-40 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/[0.015] via-transparent to-black/[0.02]" />
      
      {/* Large decorative text */}
      <div className="absolute top-0 right-0 text-[120px] md:text-[250px] font-display font-bold text-black/[0.015] leading-none pointer-events-none select-none -translate-y-1/4 translate-x-1/4">
        ABOUT
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-black">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20">
          
          {/* Left Column */}
          <div className="relative pb-6 lg:pb-0">
            <div className="lg:sticky lg:top-32">
              {/* Section label */}
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                className="text-[10px] font-mono tracking-widest text-gray-400 block mb-4"
              >
                ABOUT ME
              </motion.span>
              
              <div className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] mb-6 md:mb-10 text-black">
                <TextReveal delay={0.1}>DIGITAL</TextReveal>
                <br />
                <span className="text-gray-300">
                  <TextReveal delay={0.3}>CRAFTSMAN</TextReveal>
                </span>
              </div>
              
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-lg md:text-xl text-gray-600 font-light max-w-md leading-relaxed mb-8"
              >
                I build digital products that are clean, efficient, and future-proof.
              </motion.p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-10 md:mt-16 border-t border-gray-100 pt-8">
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="text-center md:text-left"
                  >
                    <div className="text-2xl md:text-4xl font-display font-bold mb-1">
                      <AnimatedCounter 
                        value={stat.value} 
                        suffix={stat.suffix}
                        className="tabular-nums"
                      />
                    </div>
                    <span className="text-[9px] md:text-[10px] font-mono uppercase tracking-widest text-gray-400">
                      {stat.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-10 md:space-y-20">
            {/* Philosophy Block */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, margin: "-10%" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="absolute -left-4 top-0 bottom-0 w-px bg-gradient-to-b from-black/20 via-black/5 to-transparent hidden md:block" />
              <span className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 md:mb-6 block">
                01 / Philosophy
              </span>
              <p className="text-lg md:text-2xl font-light leading-relaxed text-gray-800">
                <span className="font-medium text-black">"Design is intelligence made visible."</span> I believe in stripping away the non-essential to reveal the core message. My process is deeply collaborative, ensuring every pixel serves a purpose.
              </p>
            </motion.div>

            {/* Stack Block */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, margin: "-10%" }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="absolute -left-4 top-0 bottom-0 w-px bg-gradient-to-b from-black/20 via-black/5 to-transparent hidden md:block" />
              <span className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest mb-8 md:mb-10 block">
                02 / Tech Stack
              </span>
              <div className="grid grid-cols-2 gap-y-8 md:gap-y-12 gap-x-6">
                {[
                  { title: "Frontend", items: ["React", "TypeScript", "Vite", "Tailwind CSS"] },
                  { title: "Animation", items: ["Framer Motion", "CSS Animations", "Three.js"] },
                  { title: "Design", items: ["Figma", "UI/UX", "Responsive Design"] },
                  { title: "Deployment", items: ["Vercel", "Git", "CI/CD"] }
                ].map((group, i) => (
                  <motion.div 
                    key={group.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: "-50px" }}
                    transition={{ delay: 0.2 + (i * 0.1), ease: [0.22, 1, 0.36, 1] }}
                    className="group"
                  >
                    <h4 className="text-black font-bold mb-3 md:mb-4 text-sm md:text-base flex items-center gap-2">
                      <span className="w-2 h-2 bg-black group-hover:scale-125 transition-transform" />
                      <TextReveal delay={0.2 + (i * 0.1)}>{group.title}</TextReveal>
                    </h4>
                    <ul className="space-y-2 md:space-y-3 text-gray-500 font-mono text-xs md:text-sm">
                      {group.items.map((item, j) => (
                        <motion.li 
                          key={item}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: false }}
                          transition={{ delay: 0.3 + (i * 0.1) + (j * 0.05) }}
                          className="flex items-center gap-2 hover:text-black transition-colors"
                        >
                          <span className="w-1 h-1 bg-gray-300" />
                          {item}
                        </motion.li>
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
