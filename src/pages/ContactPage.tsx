import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TechnicalGrid from '@/components/TechnicalGrid';
import Cursor from '@/components/Cursor';
import Noise from '@/components/Noise';
import PageTransition from '@/components/PageTransition';
import GeometricShapes from '@/components/GeometricShapes';
import MagneticButton from '@/components/MagneticButton';

const ContactPage: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    
    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
      setFormState({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('hello@jscl.design');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <PageTransition>
      <div className="relative min-h-screen bg-background selection:bg-foreground selection:text-background overflow-x-hidden">
        <Cursor />
        <TechnicalGrid />
        <Noise />
        <GeometricShapes variant="contact" />
        
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          
          <main className="flex-grow pt-32 pb-24">
            <div className="max-w-7xl mx-auto px-6">
              {/* Header */}
              <motion.div 
                className="mb-20"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <motion.div 
                    className="w-12 h-12 border-2 border-foreground flex items-center justify-center"
                    animate={{ rotate: [0, 90, 180, 270, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <motion.div 
                      className="w-4 h-4 border border-foreground"
                      animate={{ scale: [1, 0.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>
                  <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase">Get In Touch</span>
                </div>
                <h1 className="font-display text-6xl md:text-8xl font-bold tracking-tight">
                  CONTACT
                </h1>
                <p className="mt-6 text-xl text-muted-foreground max-w-2xl">
                  Let's create something extraordinary together. I'm always open to discussing new projects and opportunities.
                </p>
              </motion.div>

              {/* Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                {/* Left - Contact Info */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                >
                  <div className="sticky top-32 space-y-12">
                    {/* Direct Email */}
                    <div>
                      <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4 block">
                        Direct Email
                      </span>
                      <button
                        onClick={copyEmail}
                        className="group flex items-center gap-4"
                      >
                        <span className="font-display text-2xl md:text-3xl font-bold group-hover:translate-x-2 transition-transform">
                          hello@jscl.design
                        </span>
                        <AnimatePresence mode="wait">
                          {copied ? (
                            <motion.span
                              key="copied"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              className="text-xs font-mono text-green-500"
                            >
                              COPIED!
                            </motion.span>
                          ) : (
                            <motion.span
                              key="copy"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              className="opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </button>
                    </div>

                    {/* Social Links */}
                    <div>
                      <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-6 block">
                        Connect
                      </span>
                      <div className="space-y-4">
                        {[
                          { name: 'Twitter', handle: '@jscl_design', url: '#' },
                          { name: 'LinkedIn', handle: '/in/jscl', url: '#' },
                          { name: 'GitHub', handle: '@jscl-dev', url: '#' },
                          { name: 'Dribbble', handle: '/jscl', url: '#' }
                        ].map((social, i) => (
                          <motion.a
                            key={social.name}
                            href={social.url}
                            className="group flex items-center justify-between py-3 border-b border-foreground/10 hover:border-foreground/30 transition-colors"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.4 + i * 0.1 }}
                          >
                            <span className="font-mono text-sm">{social.name}</span>
                            <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                              {social.handle}
                            </span>
                          </motion.a>
                        ))}
                      </div>
                    </div>

                    {/* Location */}
                    <div>
                      <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4 block">
                        Location
                      </span>
                      <p className="text-lg text-muted-foreground">
                        Available Worldwide<br />
                        <span className="text-foreground">Based in San Francisco, CA</span>
                      </p>
                    </div>

                    {/* Grid decoration */}
                    <motion.div 
                      className="grid grid-cols-4 gap-2 w-32"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.8 }}
                    >
                      {[...Array(16)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-6 h-6 border border-foreground/10"
                          animate={{ 
                            opacity: [0.3, 1, 0.3],
                            scale: [1, 1.1, 1]
                          }}
                          transition={{ 
                            duration: 2, 
                            delay: i * 0.1, 
                            repeat: Infinity 
                          }}
                        />
                      ))}
                    </motion.div>
                  </div>
                </motion.div>

                {/* Right - Contact Form */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.4, duration: 0.6 }}
                >
                  <div className="border border-foreground/20 p-8 md:p-12">
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-8 block">
                      Send a Message
                    </span>

                    <form onSubmit={handleSubmit} className="space-y-8">
                      <div className="space-y-6">
                        <div>
                          <label className="block font-mono text-xs text-muted-foreground uppercase tracking-wider mb-3">
                            Name
                          </label>
                          <input
                            type="text"
                            value={formState.name}
                            onChange={(e) => setFormState(prev => ({ ...prev, name: e.target.value }))}
                            className="w-full bg-transparent border-b-2 border-foreground/20 focus:border-foreground py-3 text-lg outline-none transition-colors placeholder:text-muted-foreground/50"
                            placeholder="Your name"
                          />
                        </div>

                        <div>
                          <label className="block font-mono text-xs text-muted-foreground uppercase tracking-wider mb-3">
                            Email
                          </label>
                          <input
                            type="email"
                            value={formState.email}
                            onChange={(e) => setFormState(prev => ({ ...prev, email: e.target.value }))}
                            className="w-full bg-transparent border-b-2 border-foreground/20 focus:border-foreground py-3 text-lg outline-none transition-colors placeholder:text-muted-foreground/50"
                            placeholder="your@email.com"
                          />
                        </div>

                        <div>
                          <label className="block font-mono text-xs text-muted-foreground uppercase tracking-wider mb-3">
                            Message
                          </label>
                          <textarea
                            value={formState.message}
                            onChange={(e) => setFormState(prev => ({ ...prev, message: e.target.value }))}
                            rows={5}
                            className="w-full bg-transparent border-b-2 border-foreground/20 focus:border-foreground py-3 text-lg outline-none transition-colors resize-none placeholder:text-muted-foreground/50"
                            placeholder="Tell me about your project..."
                          />
                        </div>
                      </div>

                      <MagneticButton
                        type="submit"
                        disabled={status === 'submitting'}
                        className="w-full bg-foreground text-background py-4 font-mono text-sm uppercase tracking-widest hover:bg-foreground/90 transition-colors disabled:opacity-50"
                      >
                        {status === 'success' ? (
                          <span className="flex items-center justify-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Message Sent
                          </span>
                        ) : status === 'submitting' ? (
                          <span className="flex items-center justify-center gap-2">
                            <motion.span
                              className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            />
                            Sending...
                          </span>
                        ) : (
                          'Send Message'
                        )}
                      </MagneticButton>
                    </form>

                    {/* Corner decorations */}
                    <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-foreground -translate-x-4 -translate-y-4" />
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-foreground translate-x-4 translate-y-4" />
                  </div>
                </motion.div>
              </div>

              {/* Back to Home */}
              <motion.div 
                className="mt-32 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
              >
                <Link 
                  to="/"
                  className="inline-flex items-center gap-3 font-mono text-sm uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
                >
                  <span>←</span>
                  <span>Back to Home</span>
                </Link>
              </motion.div>
            </div>
          </main>
          
          <Footer />
        </div>
      </div>
    </PageTransition>
  );
};

export default ContactPage;
