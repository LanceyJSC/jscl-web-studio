import React from 'react';
import { motion } from 'framer-motion';
import TextReveal from './TextReveal';

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" as const },
  },
};

const slideInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" as const },
  },
};

const About: React.FC = () => {
  return (
    <motion.section 
      id="about" 
      className="py-16 md:py-32 relative bg-gradient-to-b from-black/[0.02] via-transparent to-black/[0.02]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={sectionVariants}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-black">
        {/* Grid setup: Default alignment stretches columns, enabling sticky behavior */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16">
          
          <motion.div className="relative pb-6 lg:pb-0" variants={slideInLeft}>
             <div className="lg:sticky lg:top-32">
                <div className="font-display text-4xl sm:text-5xl md:text-7xl font-bold leading-none mb-4 md:mb-8 opacity-90 text-black">
                  <TextReveal delay={0.1}>DIGITAL</TextReveal>
                  <br />
                  <TextReveal delay={0.3}>CRAFTSMAN</TextReveal>
                </div>
                
                <motion.p 
                  variants={itemVariants}
                  className="text-lg md:text-xl text-gray-600 font-light max-w-md leading-relaxed"
                >
                  I build digital products that are clean, efficient, and future-proof.
                </motion.p>
             </div>
          </motion.div>

          <motion.div className="space-y-8 md:space-y-24" variants={sectionVariants}>
             {/* Philosophy Block */}
             <motion.div variants={slideInRight}>
                <span className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 md:mb-4 block">01 / Philosophy</span>
                <p className="text-base md:text-2xl font-light leading-relaxed text-gray-800">
                  "Design is intelligence made visible." I believe in stripping away the non-essential to reveal the core message. My process is deeply collaborative, ensuring every pixel serves a purpose.
                </p>
             </motion.div>

             {/* Stack Block */}
             <motion.div variants={slideInRight}>
                <span className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest mb-6 md:mb-8 block">02 / Tech Stack</span>
                <motion.div 
                  className="grid grid-cols-2 gap-y-6 md:gap-y-8 gap-x-4"
                  variants={sectionVariants}
                >
                   {[
                      { title: "Frontend", items: ["React", "TypeScript", "Vite", "Tailwind CSS"] },
                      { title: "Animation", items: ["Framer Motion", "CSS Animations"] },
                      { title: "Design", items: ["Figma", "UI/UX", "Responsive Design"] },
                      { title: "Deployment", items: ["Vercel", "Git", "CI/CD"] }
                   ].map((group, i) => (
                      <motion.div 
                        key={group.title}
                        variants={itemVariants}
                      >
                         <h4 className="text-black font-bold mb-2 md:mb-4 text-sm md:text-base">
                            <TextReveal delay={0.2 + (i * 0.1)}>{group.title}</TextReveal>
                         </h4>
                         <ul className="space-y-1.5 md:space-y-2 text-gray-500 font-mono text-xs md:text-sm">
                            {group.items.map(item => <li key={item}>{item}</li>)}
                         </ul>
                      </motion.div>
                   ))}
                </motion.div>
             </motion.div>
          </motion.div>
          
        </div>
      </div>
    </motion.section>
  );
};

export default About;