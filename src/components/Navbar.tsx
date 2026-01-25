import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Projects', href: '#projects' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
    { name: 'Lab', href: '/lab', isRoute: true },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled ? 'bg-white/80 backdrop-blur-md py-2 md:py-3 shadow-sm' : 'bg-transparent py-4 md:py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
        <a href="#" className="group flex items-center">
          {/* Small version of logo for Navbar - Static (No hover scale) */}
          <Logo size="sm" animated={false} />
        </a>

        <div className="hidden md:flex items-center space-x-12">
          {navLinks.map((link) => (
            link.isRoute ? (
              <Link
                key={link.name}
                to={link.href}
                className="text-xs font-mono font-normal tracking-widest text-gray-500 hover:text-black transition-colors uppercase relative group"
              >
                <span className="mr-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 inline-block text-black">//</span>
                {link.name}
              </Link>
            ) : (
              <a
                key={link.name}
                href={link.href}
                className="text-xs font-mono font-normal tracking-widest text-gray-500 hover:text-black transition-colors uppercase relative group"
              >
                <span className="mr-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 inline-block text-black">//</span>
                {link.name}
              </a>
            )
          ))}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-black focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 p-4 sm:p-6 flex flex-col space-y-3 sm:space-y-4 shadow-xl animate-fade-in">
          {navLinks.map((link) => (
            link.isRoute ? (
              <Link
                key={link.name}
                to={link.href}
                className="text-base sm:text-lg font-mono font-normal tracking-widest text-center text-gray-800 hover:text-black uppercase py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ) : (
              <a
                key={link.name}
                href={link.href}
                className="text-base sm:text-lg font-mono font-normal tracking-widest text-center text-gray-800 hover:text-black uppercase py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            )
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;