import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import TechnicalGrid from '@/components/TechnicalGrid';
import Cursor from '@/components/Cursor';
import Noise from '@/components/Noise';
import PageTransition from '@/components/PageTransition';

const HomePage: React.FC = () => {
  return (
    <PageTransition>
      <div className="relative min-h-screen bg-background selection:bg-foreground selection:text-background overflow-x-hidden">
        <Cursor />
        <TechnicalGrid />
        <Noise />
        
        <div className="relative z-10 flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Hero />
          </main>
          <Footer />
        </div>
      </div>
    </PageTransition>
  );
};

export default HomePage;
