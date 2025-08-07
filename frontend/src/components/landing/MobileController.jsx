import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Smartphone, ShieldCheck, Activity, RefreshCw, UploadCloud } from 'lucide-react';
import { useSelfixActions } from '@/hooks/useSelfixActions';

const MobileController = ({ showToast }) => {
  const { handleHealthCheck } = useSelfixActions();

  return (
    <section id="mobile-controller" className="py-20 sm:py-28 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-glow">
            Control From Anywhere
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Manage your SELFIX instance remotely with our intuitive mobile interface. Monitor system status, switch modes, and escalate critical alerts on the go.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button size="lg" onClick={handleHealthCheck}>
              <RefreshCw className="mr-2 h-5 w-5"/> Re-check System
            </Button>
            <Button size="lg" variant="outline" onClick={showToast}>
              <UploadCloud className="mr-2 h-5 w-5"/> Escalate to HQ
            </Button>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative flex justify-center"
        >
          <div className="bg-background p-4 sm:p-6 rounded-2xl shadow-2xl cyber-border w-full max-w-sm transform perspective-1000 rotate-y-5 hover:rotate-y-0 transition-transform duration-500">
            <div className="aspect-[9/19.5] bg-card rounded-lg p-4 flex flex-col justify-between relative overflow-hidden shadow-inner">
              <div className="absolute top-0 left-0 w-full h-8 bg-background/80 backdrop-blur-sm flex items-center justify-center">
                <div className="w-16 h-1 bg-muted-foreground/50 rounded-full"></div>
              </div>
              <div className="pt-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-2">
                    <Smartphone className="w-7 h-7 text-primary text-glow"/>
                    <span className="text-xl font-bold text-glow">SELFIX Mobile</span>
                  </div>
                  <div className="w-3 h-3 bg-primary rounded-full animate-ping"></div>
                </div>
                
                <div className="space-y-4">
                  <div className="p-3 bg-secondary rounded-lg">
                    <p className="text-xs text-muted-foreground">Current Mode</p>
                    <p className="text-lg font-semibold text-primary flex items-center">
                      <ShieldCheck className="w-5 h-5 mr-2"/> Autonomous
                    </p>
                  </div>
                  <div className="p-3 bg-secondary rounded-lg">
                    <p className="text-xs text-muted-foreground">System Status</p>
                    <p className="text-lg font-semibold text-primary flex items-center">
                      <Activity className="w-5 h-5 mr-2"/> Healthy & Optimized
                    </p>
                  </div>
                  <div className="p-3 bg-secondary rounded-lg">
                    <p className="text-xs text-muted-foreground">Last Heal Event</p>
                    <p className="text-md text-muted-foreground">2 minutes ago (minor entropy)</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 border-t border-border pt-4">
                 <p className="text-xs text-center text-muted-foreground">Next health check in 5:00 min</p>
              </div>
            </div>
            <img  class="absolute -bottom-10 -right-10 w-32 h-32 opacity-10 filter blur-sm" alt="Abstract blue network lines" src="https://images.unsplash.com/photo-1542425629-5d496574c3be" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MobileController;