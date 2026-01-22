import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import TechnicalGrid from './components/TechnicalGrid';
import Cursor from './components/Cursor';
import Noise from './components/Noise';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <div className="relative min-h-screen bg-background selection:bg-foreground selection:text-background overflow-x-hidden">
          
          <Cursor />
          <TechnicalGrid />
          <Noise />
          
          {/* Main Content Layer */}
          <div className="relative z-10 flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <Hero />
              <Projects />
              <About />
              <Contact />
            </main>
            <Footer />
          </div>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
