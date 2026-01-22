import React from 'react';
import Logo from './Logo';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white py-12 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        
        <div className="flex items-center gap-4">
           {/* Static Logo in Footer */}
           <Logo size="sm" animated={false} />
           <div className="text-xs font-mono text-gray-400">
             <p>&copy; {year} JSCL Web Design.</p>
             <p>All rights reserved.</p>
           </div>
        </div>

        <div className="flex gap-6">
          <a href="#" className="text-gray-400 hover:text-black transition-colors text-xs font-mono uppercase tracking-wider">Twitter</a>
          <a href="#" className="text-gray-400 hover:text-black transition-colors text-xs font-mono uppercase tracking-wider">LinkedIn</a>
          <a href="#" className="text-gray-400 hover:text-black transition-colors text-xs font-mono uppercase tracking-wider">Instagram</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;