import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MagneticButton from './MagneticButton';
import ContactSuccessAnimation from './ContactSuccessAnimation';
const Contact: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'animating'>('idle');
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setStatus('submitting');

    try {
      const formData = new FormData();
      formData.append("access_key", "3c0eff7c-ab02-4b29-aa31-9d57590a5b06");
      formData.append("name", formState.name);
      formData.append("email", formState.email);
      formData.append("message", formState.message);
      formData.append("subject", `Portfolio Contact from ${formState.name}`);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setStatus('animating');
        setFormState({ name: '', email: '', message: '' });
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setStatus('idle');
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('jsclancey@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-24 md:py-40 relative">
      {/* Dramatic background */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/[0.05] via-transparent to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-20 lg:gap-32">
          
          {/* Left Column: Bold Statement */}
          <div className="flex flex-col justify-between">
            <div>
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, margin: "-10%" }}
                className="text-[10px] md:text-xs font-mono text-black/40 uppercase tracking-[0.3em] mb-6 block"
              >
                Contact
              </motion.span>
              
              <div className="overflow-hidden mb-4">
                <motion.h2 
                  initial={{ y: "100%" }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: false, margin: "-10%" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold leading-[0.9] tracking-tighter"
                >
                  LET'S
                </motion.h2>
              </div>
              
              <div className="overflow-hidden mb-8 md:mb-12">
                <motion.h2 
                  initial={{ y: "100%" }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: false, margin: "-10%" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                  className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold leading-[0.9] tracking-tighter text-black/20"
                >
                  TALK
                </motion.h2>
              </div>

              <motion.div 
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: false, margin: "-10%" }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                className="w-16 h-[2px] bg-black origin-left mb-8"
              />

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-10%" }}
                transition={{ delay: 0.4 }}
                className="text-base md:text-lg text-black/50 font-light max-w-sm leading-relaxed mb-12 md:mb-16"
              >
                Have a project in mind? Whether you need a new website, a refresh, or just want to chat about ideas—I'd love to hear from you.
              </motion.p>
            </div>

            {/* Interactive Email Copy */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-10%" }}
              transition={{ delay: 0.5 }}
              className="group"
            >
              <span className="text-[10px] font-mono text-black/30 uppercase tracking-[0.2em] block mb-3">Direct Line</span>
              <button 
                onClick={copyEmail}
                className="relative text-2xl sm:text-3xl md:text-4xl font-display font-bold hover:text-black/60 transition-colors text-left w-full flex items-center gap-4 flex-wrap tracking-tight"
              >
                jsclancey@gmail.com
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.span 
                      key="copied"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="text-[10px] font-mono bg-black text-white px-3 py-1.5"
                    >
                      COPIED
                    </motion.span>
                  ) : (
                    <motion.svg 
                      key="copy-icon"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity text-black/40" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
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
            viewport={{ once: false, margin: "-10%" }}
            transition={{ delay: 0.3 }}
            className="bg-white p-5 sm:p-8 md:p-10 border border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden"
          >
            {/* Success Animation Overlay */}
            <AnimatePresence>
              {status === 'animating' && (
                <ContactSuccessAnimation onComplete={() => setStatus('idle')} />
              )}
            </AnimatePresence>

            {/* Decorative Corner Markers */}
            <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-black"></div>
            <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-black"></div>
            <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-black"></div>
            <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-black"></div>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-1">
                <label htmlFor="name" className="block text-xs font-mono font-bold uppercase text-gray-500">
                  01 NAME
                </label>
                <input 
                  type="text" 
                  id="name" 
                  required
                  value={formState.name}
                  onChange={(e) => setFormState({...formState, name: e.target.value})}
                  className="w-full bg-transparent border-b border-gray-200 py-3 font-mono text-sm focus:outline-none focus:border-black transition-colors placeholder-gray-300" 
                  placeholder="Enter your name" 
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="email" className="block text-xs font-mono font-bold uppercase text-gray-500">
                  02 EMAIL
                </label>
                <input 
                  type="email" 
                  id="email" 
                  required
                  value={formState.email}
                  onChange={(e) => setFormState({...formState, email: e.target.value})}
                  className="w-full bg-transparent border-b border-gray-200 py-3 font-mono text-sm focus:outline-none focus:border-black transition-colors placeholder-gray-300" 
                  placeholder="Enter your email" 
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="message" className="block text-xs font-mono font-bold uppercase text-gray-500">
                  03 MESSAGE
                </label>
                <textarea 
                  id="message" 
                  rows={4} 
                  required
                  value={formState.message}
                  onChange={(e) => setFormState({...formState, message: e.target.value})}
                  className="w-full bg-transparent border-b border-gray-200 py-3 font-mono text-sm focus:outline-none focus:border-black transition-colors placeholder-gray-300 resize-none" 
                  placeholder="Project details or just hello" 
                ></textarea>
              </div>

              <div className="pt-4 flex justify-end">
                <MagneticButton 
                  type="submit" 
                  className={`relative overflow-hidden group px-8 py-3 bg-black text-white font-mono text-xs uppercase tracking-widest transition-all duration-300 ${status === 'success' ? 'bg-green-600' : ''}`}
                >
                  <span className={`flex items-center gap-2 ${status === 'submitting' ? 'opacity-0' : 'opacity-100'}`}>
                    {status === 'success' ? 'Message Sent' : 'Transmit Data'}
                    {status !== 'success' && <span className="text-lg leading-none">→</span>}
                  </span>
                  
                  {/* Loading Spinner */}
                  {status === 'submitting' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                       <motion.div 
                         className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
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