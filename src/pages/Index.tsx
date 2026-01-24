import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import TechnicalGrid from '@/components/TechnicalGrid';
import Cursor from '@/components/Cursor';
import Noise from '@/components/Noise';
import ScrollProgress from '@/components/ScrollProgress';
import SectionDivider from '@/components/SectionDivider';

const Index: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-[#fafafa] selection:bg-black selection:text-white overflow-x-hidden">
      
      <Cursor />
      <TechnicalGrid />
      <Noise />
      <ScrollProgress />
      
      {/* Main Content Layer */}
      <div className="relative z-10 flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Hero />
          <SectionDivider variant="gradient" />
          <Projects />
          <SectionDivider variant="dots" />
          <About />
          <SectionDivider variant="line" />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Index;