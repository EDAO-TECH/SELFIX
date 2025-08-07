import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { systemModesData } from '@/data/landing';

const SystemModes = () => {
  return (
    <section id="system-modes" className="py-20 sm:py-28 bg-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight page-title-glow">System Operation Modes</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            SELFIX adapts its defense posture based on real-time threat intelligence and system health.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {systemModesData.map((mode, index) => (
            <motion.div
              key={mode.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <Card className={`h-full bg-background/50 backdrop-blur-sm cyber-border hover:border-primary/80 transition-all duration-300 transform hover:-translate-y-2 flex flex-col border-${mode.color}-500/50 hover:border-${mode.color}-500`}>
                <CardHeader className="items-center text-center">
                  {React.cloneElement(mode.icon, { className: `w-12 h-12 text-${mode.color}-400 mb-3` })}
                  <CardTitle className={`text-2xl text-glow text-${mode.color}-400`}>{mode.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow text-center">
                  <CardDescription className="text-base text-muted-foreground mb-3">{mode.description}</CardDescription>
                  <p className={`text-sm font-medium text-${mode.color}-300`}>{mode.details}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SystemModes;