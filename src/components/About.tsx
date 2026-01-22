import { motion } from "framer-motion";

interface TechCategory {
  title: string;
  items: string[];
}

const techStack: TechCategory[] = [
  {
    title: "Frontend",
    items: ["React", "TypeScript", "Next.js", "Tailwind"],
  },
  {
    title: "Creative",
    items: ["WebGL", "Framer Motion", "GSAP", "Three.js"],
  },
  {
    title: "Design",
    items: ["Figma", "Adobe CC", "Blender", "UI/UX"],
  },
  {
    title: "Backend",
    items: ["Node.js", "PostgreSQL", "Supabase", "AWS"],
  },
];

const About = () => {
  return (
    <section id="about" className="py-24 md:py-32 px-6 md:px-12 bg-card blueprint-grid-fine">
      <div className="max-w-7xl mx-auto">
        {/* Large headline */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
            DIGITAL
            <br />
            <span className="text-muted-foreground">CRAFTSMAN</span>
          </h2>
        </motion.div>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Philosophy */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="text-xs font-mono text-muted-foreground tracking-wide block mb-4">
              01 / Philosophy
            </span>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                I believe in the power of thoughtful design. Every project is an 
                opportunity to create something that not only looks beautiful but 
                also solves real problems and delivers measurable results.
              </p>
              <p>
                My approach combines clean aesthetics with robust functionality, 
                ensuring that every interaction feels intuitive and every detail 
                serves a purpose. I work closely with clients to understand their 
                vision and translate it into digital experiences that exceed expectations.
              </p>
              <p>
                From concept to deployment, I handle every aspect of the development 
                process with meticulous attention to detail and a commitment to 
                excellence.
              </p>
            </div>
          </motion.div>

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <span className="text-xs font-mono text-muted-foreground tracking-wide block mb-4">
              02 / Tech Stack
            </span>
            <div className="grid grid-cols-2 gap-8">
              {techStack.map((category, categoryIndex) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.5 + categoryIndex * 0.1 }}
                >
                  <h4 className="text-sm font-medium text-foreground mb-3">
                    {category.title}
                  </h4>
                  <ul className="space-y-2">
                    {category.items.map((item) => (
                      <li
                        key={item}
                        className="text-sm text-muted-foreground flex items-center gap-2"
                      >
                        <span className="w-1 h-1 bg-accent rounded-full"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stats or additional info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20 pt-12 border-t border-border"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "5+", label: "Years Experience" },
              { value: "50+", label: "Projects Completed" },
              { value: "100%", label: "Client Satisfaction" },
              { value: "24/7", label: "Support Available" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                className="text-center md:text-left"
              >
                <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-xs font-mono text-muted-foreground tracking-wide">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
