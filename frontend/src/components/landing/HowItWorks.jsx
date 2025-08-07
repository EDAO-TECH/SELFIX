import React from 'react';
import { motion } from 'framer-motion';
import { howItWorksSteps } from '@/data/landing';

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 sm:py-28 bg-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight page-title-glow">How SELFIX Works</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            A streamlined process for autonomous cybersecurity, from installation to continuous, intelligent healing.
          </p>
        </div>
        <div className="relative max-w-3xl mx-auto">
          {howItWorksSteps.map((item, index) => (
            <motion.div
              key={item.step}
              className="group relative flex items-start mb-12 last:mb-0"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="relative flex-shrink-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg sm:text-xl shadow-lg pulse-glow">
                  {item.step}
                </div>
              </div>
              {index < howItWorksSteps.length - 1 && (
                 <div className="absolute left-5 sm:left-6 top-12 sm:top-14 h-[calc(100%-1rem)] w-0.5 bg-border group-hover:bg-primary transition-colors duration-300"></div>
              )}
              <div className="ml-6 sm:ml-8">
                <h3 className="text-xl sm:text-2xl font-semibold text-glow mb-1">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;