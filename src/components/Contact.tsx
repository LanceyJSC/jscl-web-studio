import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MagneticButton from './MagneticButton';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email) return;

    setStatus('submitting');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setFormState({ name: '', email: '', message: '' });
      
      // Reset status after a few seconds
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('hello@jscl.design');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-32 relative bg-transparent">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Left Column: Heading & Info */}
          <div className="flex flex-col justify-between">
            <div>
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                className="text-xs font-mono text-muted-foreground mb-6 block tracking-widest"
              >
                // CONTACT_INIT
              </motion.span>
              
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                className="text-5xl md:text-7xl font-display font-bold leading-none mb-8 tracking-tighter"
              >
                Let's build <br/>
                <span className="text-muted-foreground">something iconic.</span>
              </motion.h2>

              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: false }}
                transition={{ delay: 0.2 }}
                className="text-lg text-muted-foreground font-light max-w-md leading-relaxed mb-12"
              >
                I am currently open for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you.
              </motion.p>
            </div>

            {/* Interactive Email Copy */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              className="group"
            >
              <span className="text-xs font-mono text-muted-foreground block mb-2">DIRECT LINE</span>
              <button 
                onClick={copyEmail}
                className="relative text-2xl md:text-3xl font-display font-medium hover:text-muted-foreground transition-colors text-left w-full flex items-center gap-4"
              >
                hello@jscl.design
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.span 
                      key="copied"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="text-xs font-mono bg-foreground text-background px-2 py-1 rounded-full"
                    >
                      COPIED!
                    </motion.span>
                  ) : (
                    <motion.svg 
                      key="copy-icon"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </motion.svg>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          </div>

          {/* Right Column: Technical Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.3 }}
            className="bg-card p-8 md:p-10 border border-foreground shadow-[8px_8px_0px_0px_hsl(var(--foreground))] relative"
          >
            {/* Decorative Corner Markers */}
            <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-foreground"></div>
            <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-foreground"></div>
            <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-foreground"></div>
            <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-foreground"></div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-1">
                <label htmlFor="name" className="block text-xs font-mono font-bold uppercase text-muted-foreground">
                  01 // NAME
                </label>
                <input 
                  type="text" 
                  id="name" 
                  required
                  value={formState.name}
                  onChange={(e) => setFormState({...formState, name: e.target.value})}
                  className="w-full bg-transparent border-b border-border py-3 font-mono text-sm focus:outline-none focus:border-foreground transition-colors placeholder-muted-foreground/50" 
                  placeholder="Enter your name_" 
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="email" className="block text-xs font-mono font-bold uppercase text-muted-foreground">
                  02 // EMAIL
                </label>
                <input 
                  type="email" 
                  id="email" 
                  required
                  value={formState.email}
                  onChange={(e) => setFormState({...formState, email: e.target.value})}
                  className="w-full bg-transparent border-b border-border py-3 font-mono text-sm focus:outline-none focus:border-foreground transition-colors placeholder-muted-foreground/50" 
                  placeholder="Enter your email_" 
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="message" className="block text-xs font-mono font-bold uppercase text-muted-foreground">
                  03 // MESSAGE
                </label>
                <textarea 
                  id="message" 
                  rows={4} 
                  required
                  value={formState.message}
                  onChange={(e) => setFormState({...formState, message: e.target.value})}
                  className="w-full bg-transparent border-b border-border py-3 font-mono text-sm focus:outline-none focus:border-foreground transition-colors placeholder-muted-foreground/50 resize-none" 
                  placeholder="Project details or just hello_" 
                ></textarea>
              </div>

              <div className="pt-4 flex justify-end">
                <MagneticButton 
                  type="submit" 
                  className={`relative overflow-hidden group px-8 py-3 bg-foreground text-background font-mono text-xs uppercase tracking-widest transition-all duration-300 ${status === 'success' ? 'bg-green-600' : ''}`}
                >
                  <span className={`flex items-center gap-2 ${status === 'submitting' ? 'opacity-0' : 'opacity-100'}`}>
                    {status === 'success' ? 'Message Sent' : 'Transmit Data'}
                    {status !== 'success' && <span className="text-lg leading-none">→</span>}
                  </span>
                  
                  {/* Loading Spinner */}
                  {status === 'submitting' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                       <motion.div 
                         className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full"
                         animate={{ rotate: 360 }}
                         transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                       />
                    </div>
                  )}
                </MagneticButton>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
