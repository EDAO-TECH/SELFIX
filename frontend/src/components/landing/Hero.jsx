import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ShieldCheck, Zap } from 'lucide-react';

const Hero = ({ showToast }) => {

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    } else {
      showToast(`Section #${sectionId} not found.`);
    }
  };

  return (
    <section className="relative text-center py-28 sm:py-36 lg:py-48 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern bg-center [mask-image:radial-gradient(ellipse_at_center,transparent_5%,black)]"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-background to-transparent opacity-80"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight karma-gradient text-transparent bg-clip-text text-glow leading-tight">SELFIX: The World's First AI-Powered, Programmable Healing System for Digital Trust</h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg sm:text-xl text-muted-foreground">
            SELFIX is not an antivirus. It’s backed by patents, soulbound licensing, and karmic simulation logic. It turns cybersecurity from reaction to regeneration, replacing “block & scan” with “detect, simulate, heal, log, learn.”
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" onClick={() => scrollToSection('all-services')} className="pulse-glow">
              <ShieldCheck className="mr-2 h-5 w-5" />
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" onClick={() => scrollToSection('healing-stack-builder')}>
              <Zap className="mr-2 h-5 w-5" />
              Build Your Defense
            </Button>
          </div>
           <div className="mt-6 text-sm text-muted-foreground">
            ✅ Try any 5 features for free ✅ No credit card required
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;