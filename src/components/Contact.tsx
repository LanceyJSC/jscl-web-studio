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
  const [focusedField, setFocusedField] = useState<string | null>(null);

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

  const formFields = [
    { id: 'name', label: '01 NAME', type: 'text', placeholder: 'Enter your name' },
    { id: 'email', label: '02 EMAIL', type: 'email', placeholder: 'Enter your email' },
  ];

  return (
    <section id="contact" className="py-20 md:py-40 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/[0.04] via-transparent to-transparent" />
      
      {/* Decorative element */}
      <div className="absolute bottom-0 left-0 text-[100px] md:text-[200px] font-display font-bold text-black/[0.015] leading-none pointer-events-none select-none translate-y-1/3">
        CONTACT
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 lg:gap-24">
          
          {/* Left Column: Heading & Info */}
          <div className="flex flex-col justify-between">
            <div>
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, margin: "-10%" }}
                className="text-[10px] font-mono text-gray-400 mb-4 block tracking-widest"
              >
                GET IN TOUCH
              </motion.span>
              
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-10%" }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-[0.95] mb-6 md:mb-8 tracking-tighter"
              >
                Let's build{' '}
                <motion.span 
                  className="text-gray-300 block"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  something iconic.
                </motion.span>
              </motion.h2>

              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: false, margin: "-10%" }}
                transition={{ delay: 0.2 }}
                className="text-base md:text-lg text-gray-600 font-light max-w-md leading-relaxed mb-10 md:mb-16"
              >
                I am currently open for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you.
              </motion.p>
            </div>

            {/* Interactive Email Copy */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-10%" }}
              transition={{ delay: 0.3 }}
              className="group"
            >
              <span className="text-[10px] font-mono text-gray-400 block mb-3 tracking-widest">DIRECT LINE</span>
              <button 
                onClick={copyEmail}
                className="relative text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-medium hover:text-gray-600 transition-colors text-left w-full flex items-center gap-3 md:gap-4 flex-wrap group"
              >
                <span className="relative">
                  jsclancey@gmail.com
                  <motion.span 
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-black origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </span>
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.span 
                      key="copied"
                      initial={{ opacity: 0, scale: 0.8, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8, y: -10 }}
                      className="text-xs font-mono bg-black text-white px-3 py-1.5 rounded-full"
                    >
                      ✓ COPIED
                    </motion.span>
                  ) : (
                    <motion.div
                      key="copy-icon"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          </div>

          {/* Right Column: Enhanced Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-10%" }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Form card with enhanced styling */}
            <div className="bg-white p-6 sm:p-8 md:p-12 border border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
              
              {/* Success Animation Overlay */}
              <AnimatePresence>
                {status === 'animating' && (
                  <ContactSuccessAnimation onComplete={() => setStatus('idle')} />
                )}
              </AnimatePresence>

              {/* Corner accents */}
              <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-black" />
              <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-black" />
              <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-black" />
              <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-black" />
              
              <form onSubmit={handleSubmit} className="space-y-8 md:space-y-10">
                {formFields.map((field, i) => (
                  <motion.div 
                    key={field.id}
                    className="space-y-2 relative"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                  >
                    <motion.label 
                      htmlFor={field.id} 
                      className="block text-xs font-mono font-bold uppercase text-gray-400 transition-colors"
                      animate={{ color: focusedField === field.id ? '#000' : '#9ca3af' }}
                    >
                      {field.label}
                    </motion.label>
                    <div className="relative">
                      <input 
                        type={field.type} 
                        id={field.id} 
                        required
                        value={formState[field.id as keyof typeof formState]}
                        onChange={(e) => setFormState({...formState, [field.id]: e.target.value})}
                        onFocus={() => setFocusedField(field.id)}
                        onBlur={() => setFocusedField(null)}
                        className="w-full bg-transparent border-b-2 border-gray-200 py-3 font-mono text-sm focus:outline-none focus:border-black transition-colors placeholder-gray-300" 
                        placeholder={field.placeholder} 
                      />
                      <motion.div 
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-black origin-left"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: focusedField === field.id ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </motion.div>
                ))}

                <motion.div 
                  className="space-y-2 relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: 0.6 }}
                >
                  <motion.label 
                    htmlFor="message" 
                    className="block text-xs font-mono font-bold uppercase text-gray-400 transition-colors"
                    animate={{ color: focusedField === 'message' ? '#000' : '#9ca3af' }}
                  >
                    03 MESSAGE
                  </motion.label>
                  <div className="relative">
                    <textarea 
                      id="message" 
                      rows={4} 
                      required
                      value={formState.message}
                      onChange={(e) => setFormState({...formState, message: e.target.value})}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full bg-transparent border-b-2 border-gray-200 py-3 font-mono text-sm focus:outline-none focus:border-black transition-colors placeholder-gray-300 resize-none" 
                      placeholder="Project details or just hello" 
                    />
                    <motion.div 
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-black origin-left"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: focusedField === 'message' ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </motion.div>

                <motion.div 
                  className="pt-4 flex justify-end"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: false }}
                  transition={{ delay: 0.7 }}
                >
                  <MagneticButton 
                    type="submit" 
                    className={`relative overflow-hidden group px-10 py-4 bg-black text-white font-mono text-xs uppercase tracking-widest transition-all duration-300 ${status === 'success' ? 'bg-green-600' : ''}`}
                  >
                    <span className={`flex items-center gap-3 ${status === 'submitting' ? 'opacity-0' : 'opacity-100'}`}>
                      {status === 'success' ? 'Message Sent' : 'Transmit Data'}
                      {status !== 'success' && (
                        <motion.span 
                          className="text-lg leading-none"
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          →
                        </motion.span>
                      )}
                    </span>
                    
                    {/* Loading Spinner */}
                    {status === 'submitting' && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div 
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                      </div>
                    )}
                  </MagneticButton>
                </motion.div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
