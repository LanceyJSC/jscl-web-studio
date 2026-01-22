import { motion } from "framer-motion";

const Navigation = () => {
  const navItems = [
    { label: "Projects", href: "#projects" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="group">
          <div className="grid grid-cols-2 gap-0.5 w-10 h-10">
            {["J", "S", "C", "L"].map((letter, i) => (
              <div
                key={letter}
                className="w-full h-full bg-foreground text-background flex items-center justify-center text-xs font-semibold transition-all duration-300 group-hover:bg-accent"
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                {letter}
              </div>
            ))}
          </div>
        </a>

        {/* Nav Links */}
        <ul className="flex items-center gap-8">
          {navItems.map((item, index) => (
            <motion.li
              key={item.label}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
            >
              <a
                href={item.href}
                className="text-sm font-medium tracking-wide text-muted-foreground hover:text-foreground transition-colors duration-200 hover-line"
              >
                {item.label}
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.nav>
  );
};

export default Navigation;
