import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { integrationsData } from '@/data/landing';
import { ArrowRight } from 'lucide-react';

const Integrations = ({ showToast }) => {
  return (
    <section id="integrations" className="py-20 sm:py-28 bg-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight page-title-glow">Ecosystem Integrations</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            SELFIX connects with leading platforms to enhance your workflow and secure your digital assets across the board.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {integrationsData.map((integration, index) => (
            <motion.div
              key={integration.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full bg-background cyber-border hover:border-primary/80 transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col">
                <CardHeader className="flex flex-row items-start space-x-4 pb-3">
                  {integration.icon}
                  <div>
                    <CardTitle className="text-xl text-glow">{integration.name}</CardTitle>
                    <CardDescription className="text-xs text-primary">{integration.category}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground mb-4">{integration.description}</p>
                </CardContent>
                <div className="p-6 pt-0">
                  <Button 
                    variant="outline" 
                    className="w-full sm:w-auto" 
                    onClick={() => {
                      if (integration.url === "#") {
                        showToast(`Integration with ${integration.name} is coming soon!`);
                      } else {
                        window.open(integration.url, '_blank');
                      }
                    }}
                  >
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Integrations;