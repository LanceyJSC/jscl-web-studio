import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import TextReveal from './TextReveal';

const About: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section id="about" className="py-32 relative bg-transparent">
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 text-black">
        {/* Grid setup: Default alignment stretches columns, enabling sticky behavior */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          <div className="relative">
             <motion.div style={{ y: y1 }} className="sticky top-32">
                <div className="font-display text-5xl md:text-7xl font-bold leading-none mb-8 opacity-90 text-black">
                  <TextReveal delay={0.1}>DIGITAL</TextReveal>
                  <br />
                  <TextReveal delay={0.3}>CRAFTSMAN</TextReveal>
                </div>
                
                <motion.p 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: false, margin: "-10%" }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="text-xl text-gray-600 font-light max-w-md leading-relaxed"
                >
                  I build digital products that are clean, efficient, and future-proof.
                </motion.p>
             </motion.div>
          </div>

          <div className="space-y-24">
             {/* Philosophy Block */}
             <motion.div
               initial={{ opacity: 0, x: 50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: false, margin: "-10%" }}
               transition={{ duration: 0.8 }}
             >
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 block">01 / Philosophy</span>
                <p className="text-2xl font-light leading-normal text-gray-800">
                  "Design is intelligence made visible." I believe in stripping away the non-essential to reveal the core message. My process is deeply collaborative, ensuring every pixel serves a purpose.
                </p>
             </motion.div>

             {/* Stack Block */}
             <motion.div
               initial={{ opacity: 0, x: 50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: false, margin: "-10%" }}
               transition={{ duration: 0.8, delay: 0.2 }}
             >
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-8 block">02 / Tech Stack</span>
                <div className="grid grid-cols-2 gap-y-8 gap-x-4">
                   {[
                      { title: "Frontend", items: ["React", "TypeScript", "Next.js", "Tailwind"] },
                      { title: "Creative", items: ["WebGL", "Framer Motion", "GSAP", "Three.js"] },
                      { title: "Design", items: ["Figma", "Adobe CC", "Blender", "UI/UX"] },
                      { title: "Backend", items: ["Node.js", "PostgreSQL", "Supabase", "AWS"] }
                   ].map((group, i) => (
                      <motion.div 
                        key={group.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, margin: "-50px" }}
                        transition={{ delay: 0.2 + (i * 0.1) }}
                      >
                         <h4 className="text-black font-bold mb-4">
                            <TextReveal delay={0.2 + (i * 0.1)}>{group.title}</TextReveal>
                         </h4>
                         <ul className="space-y-2 text-gray-500 font-mono text-sm">
                            {group.items.map(item => <li key={item}>{item}</li>)}
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