import React from 'react';
import Logo from './Logo';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-card py-8 md:py-12 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8">
        <div className="flex items-center gap-3 md:gap-4">
          <Logo size="sm" animated={false} />
          <div className="text-[10px] md:text-xs font-mono text-muted-foreground">
            <p>&copy; {year} JSCL Web Design.</p>
            <p>All rights reserved.</p>
          </div>
        </div>
        <div className="flex gap-4 md:gap-6">
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-[10px] md:text-xs font-mono uppercase tracking-wider">Twitter</a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-[10px] md:text-xs font-mono uppercase tracking-wider">LinkedIn</a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-[10px] md:text-xs font-mono uppercase tracking-wider">Instagram</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
