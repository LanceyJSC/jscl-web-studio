import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const Hero = () => {
  const letters = ["J", "S", "C", "L"];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, scale: 0.8, rotateX: -90 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateX: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 blueprint-grid overflow-hidden">
      {/* Decorative corner elements */}
      <div className="absolute top-6 left-6 text-xs font-mono text-muted-foreground opacity-60">
        <span>MEM: 3114 / CPU: 32%</span>
      </div>
      
      <div className="absolute top-6 right-6 text-xs font-mono text-muted-foreground opacity-60">
        <span className="inline-block w-2 h-2 bg-accent-green rounded-full mr-2 animate-pulse"></span>
        <span>ONLINE</span>
      </div>

      {/* Main content */}
      <div className="text-center z-10">
        {/* JSCL Logo Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 gap-2 md:gap-3 w-48 h-48 md:w-64 md:h-64 mx-auto mb-8"
        >
          {letters.map((letter) => (
            <motion.div
              key={letter}
              variants={letterVariants}
              className="relative bg-foreground text-background flex items-center justify-center text-5xl md:text-7xl font-bold cursor-default overflow-hidden group"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <span className="relative z-10 transition-transform duration-300 group-hover:scale-110">
                {letter}
              </span>
              <motion.div
                className="absolute inset-0 bg-accent"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-lg md:text-xl tracking-ultra-wide font-light text-muted-foreground mb-6"
        >
          WEB DESIGNER
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="text-sm md:text-base text-muted-foreground max-w-md mx-auto mb-12 leading-relaxed"
        >
          Creating digital experiences that blend form with function.
          <br />
          Every pixel serves a purpose.
        </motion.p>

        {/* Status bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="flex items-center justify-center gap-6 text-xs font-mono text-muted-foreground"
        >
          <span className="flex items-center gap-2">
            <span className="w-1 h-1 bg-muted-foreground rounded-full"></span>
            EST. 2024
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1 h-1 bg-muted-foreground rounded-full"></span>
            DIGITAL ARCHITECT
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1 h-1 bg-muted-foreground rounded-full"></span>
            BASED IN LONDON
          </span>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.3 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-muted-foreground"
        >
          <span className="text-xs font-mono tracking-wide">SCROLL</span>
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.div>

      {/* Grid overlay lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 right-0 h-px bg-border opacity-30"></div>
        <div className="absolute top-3/4 left-0 right-0 h-px bg-border opacity-30"></div>
        <div className="absolute left-1/4 top-0 bottom-0 w-px bg-border opacity-30"></div>
        <div className="absolute left-3/4 top-0 bottom-0 w-px bg-border opacity-30"></div>
      </div>
    </section>
  );
};

export default Hero;
