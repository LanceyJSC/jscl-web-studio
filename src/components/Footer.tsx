import React from 'react';
import { motion } from 'framer-motion';
import Logo from './Logo';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'LinkedIn', href: '#' },
    { name: 'GitHub', href: '#' },
    { name: 'Twitter', href: '#' },
    { name: 'Dribbble', href: '#' },
  ];

  return (
    <footer className="py-16 border-t border-border bg-transparent relative">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          
          {/* Logo & Tagline */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-start"
          >
            <Logo size="sm" animated={false} withSubtitle={false} />
            <p className="mt-4 text-sm text-muted-foreground font-light max-w-xs">
              Crafting digital experiences with precision and purpose.
            </p>
          </motion.div>

          {/* Navigation */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-col items-start md:items-center"
          >
            <span className="text-xs font-mono text-muted-foreground mb-4 tracking-widest">NAVIGATE</span>
            <nav className="flex flex-col md:flex-row gap-4 md:gap-8">
              <a href="#projects" className="text-sm hover:text-muted-foreground transition-colors">Projects</a>
              <a href="#about" className="text-sm hover:text-muted-foreground transition-colors">About</a>
              <a href="#contact" className="text-sm hover:text-muted-foreground transition-colors">Contact</a>
            </nav>
          </motion.div>

          {/* Social Links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-start md:items-end"
          >
            <span className="text-xs font-mono text-muted-foreground mb-4 tracking-widest">CONNECT</span>
            <div className="flex gap-6">
              {socialLinks.map((link) => (
                <a 
                  key={link.name}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>

        </div>

        {/* Bottom Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-xs font-mono text-muted-foreground">
            © {currentYear} JSCL. All rights reserved.
          </p>
          <p className="text-xs font-mono text-muted-foreground">
            Designed & Built with precision
          </p>
        </motion.div>

      </div>
    </footer>
  );
};

export default Footer;
