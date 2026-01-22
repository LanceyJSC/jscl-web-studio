import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-8 px-6 md:px-12 border-t border-border"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <div className="grid grid-cols-2 gap-0.5 w-6 h-6">
              {["J", "S", "C", "L"].map((letter) => (
                <div
                  key={letter}
                  className="w-full h-full bg-foreground text-background flex items-center justify-center text-[6px] font-semibold"
                >
                  {letter}
                </div>
              ))}
            </div>
            <span className="text-xs font-mono text-muted-foreground">
              © {currentYear} JSCL Design
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            {["Twitter", "LinkedIn", "Dribbble", "GitHub"].map((link) => (
              <a
                key={link}
                href="#"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Status */}
          <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
            <span className="inline-block w-1.5 h-1.5 bg-accent-green rounded-full animate-pulse"></span>
            <span>Available for work</span>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
