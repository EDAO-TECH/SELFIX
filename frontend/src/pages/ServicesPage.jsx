import React from 'react';
import { motion } from 'framer-motion';
import Meta from '@/components/Meta';
import FreeTrialSelector from '@/components/services/FreeTrialSelector';
import PricingTiers from '@/components/services/PricingTiers';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const ServicesPage = ({ showToast }) => {
  return (
    <>
      <Meta title="Services | SELFIX" description="Explore all SELFIX services, build your custom plan, and start your free trial." />
      <div className="space-y-20 sm:space-y-28">
        <div className="pt-16 sm:pt-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.h1 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-glow"
                >
                    Our Service Ecosystem
                </motion.h1>
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="mt-6 max-w-3xl mx-auto text-lg sm:text-xl text-muted-foreground"
                >
                    Everything you need for autonomous digital security. From free trials to enterprise-grade plans, tailor your protection.
                </motion.p>
                 <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                    className="mt-8"
                >
                    <Button asChild size="lg">
                        <Link to="/pricing">View All Pricing Plans</Link>
                    </Button>
                </motion.div>
            </div>
        </div>
        
        <FreeTrialSelector />
        <PricingTiers showToast={showToast} />
      </div>
    </>
  );
};

export default ServicesPage;