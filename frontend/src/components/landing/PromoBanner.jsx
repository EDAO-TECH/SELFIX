import React from 'react';
import { motion } from 'framer-motion';
import Countdown from 'react-countdown';
import { Button } from '@/components/ui/button';
import { CheckCircle, Zap, Package, Lock } from 'lucide-react';

const PromoBanner = ({ showToast }) => {
  const promoEndDate = new Date('2025-08-20T23:59:59');

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    } else {
      showToast(`Section #${sectionId} not found.`);
    }
  };

  const countdownRenderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <span className="text-2xl font-bold text-destructive">Promo has ended!</span>;
    } else {
      return (
        <div className="flex items-center justify-center gap-2 sm:gap-4">
          <div className="text-center p-2 rounded-lg bg-primary/10">
            <div className="text-2xl sm:text-4xl font-bold">{days}</div>
            <div className="text-xs sm:text-sm uppercase">Days</div>
          </div>
          <div className="text-2xl sm:text-4xl font-bold">:</div>
          <div className="text-center p-2 rounded-lg bg-primary/10">
            <div className="text-2xl sm:text-4xl font-bold">{hours}</div>
            <div className="text-xs sm:text-sm uppercase">Hours</div>
          </div>
          <div className="text-2xl sm:text-4xl font-bold">:</div>
          <div className="text-center p-2 rounded-lg bg-primary/10">
            <div className="text-2xl sm:text-4xl font-bold">{minutes}</div>
            <div className="text-xs sm:text-sm uppercase">Minutes</div>
          </div>
          <div className="text-2xl sm:text-4xl font-bold">:</div>
          <div className="text-center p-2 rounded-lg bg-primary/10">
            <div className="text-2xl sm:text-4xl font-bold">{seconds}</div>
            <div className="text-xs sm:text-sm uppercase">Seconds</div>
          </div>
        </div>
      );
    }
  };

  return (
    <motion.section
      id="promo"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-16"
    >
      <div className="relative rounded-xl overflow-hidden p-8 sm:p-12 border border-primary/20 bg-secondary/50 shadow-2xl pulse-glow-subtle">
        <div className="text-center z-10 relative">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight karma-gradient bg-clip-text text-transparent">
            🎉 Early Guardian Promo Starts August 1st!
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            Join the first wave of SELFIX supporters and claim your 20% launch discount.
          </p>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto text-left">
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <p className="text-foreground">Get lifetime access to healing tech (NFTs)</p>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <p className="text-foreground">Stake tokens into 6 patented projects (35–42% APY)</p>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <p className="text-foreground">Own the future of self-healing cybersecurity</p>
            </div>
          </div>

          <div className="mt-10">
            <Countdown date={promoEndDate} renderer={countdownRenderer} />
            <p className="mt-2 text-sm text-muted-foreground">Promo Ends: August 20, 2025 | Only for the first 100 wallets</p>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 flex-wrap">
            <Button size="lg" className="pulse-glow text-lg py-3 px-8" onClick={() => scrollToSection('tokenomics')}>
              <Zap className="mr-2 h-5 w-5" /> Mint Now with Discount
            </Button>
            <Button size="lg" variant="secondary" className="text-lg py-3 px-8" onClick={() => scrollToSection('tokenomics')}>
              <Package className="mr-2 h-5 w-5" /> Stake Early
            </Button>
            <Button size="lg" variant="outline" className="text-lg py-3 px-8" onClick={() => scrollToSection('tokenomics')}>
              <Lock className="mr-2 h-5 w-5" /> Get SFXC
            </Button>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default PromoBanner;