import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { allServicesData } from '@/data/landing';

const AllServices = () => {
    const [selectedServices, setSelectedServices] = useState([]);
    const { toast } = useToast();
    const trialLimit = 5;

    const handleSelectService = (serviceName) => {
        setSelectedServices(prev => {
            if (prev.includes(serviceName)) {
                return prev.filter(s => s !== serviceName);
            } else {
                if (prev.length < trialLimit) {
                    return [...prev, serviceName];
                } else {
                    toast({
                        title: "Selection Limit Reached",
                        description: `You can only select up to ${trialLimit} services for the free trial.`,
                        variant: "destructive"
                    });
                    return prev;
                }
            }
        });
    };

    const handleStartTrial = () => {
        if (selectedServices.length === 0) {
            toast({
                title: "No Services Selected",
                description: "Please select at least one service to start your trial.",
                variant: "destructive"
            });
            return;
        }
        toast({
            title: "🚀 Free Trial Activated!",
            description: `You've started your 14-day trial with: ${selectedServices.join(', ')}.`,
        });
    };

    return (
        <section id="all-services" className="py-20 sm:py-28 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight page-title-glow">Start Your 14-Day Free Trial</h2>
              <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                Select up to {trialLimit} services to experience the full power of SELFIX. No credit card required.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allServicesData.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="h-full"
                >
                  <Card className={`h-full bg-secondary/50 cyber-border-soft hover:border-primary transition-all duration-300 transform hover:-translate-y-1 flex flex-col ${selectedServices.includes(service.name) ? 'border-primary' : ''}`}>
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 bg-primary/10 p-3 rounded-lg">
                          {service.icon}
                        </div>
                        <div className="flex-grow">
                            <CardTitle className="text-primary text-xl font-semibold">{service.name}</CardTitle>
                        </div>
                        <Checkbox 
                            id={`service-${index}`}
                            checked={selectedServices.includes(service.name)}
                            onCheckedChange={() => handleSelectService(service.name)}
                            disabled={!selectedServices.includes(service.name) && selectedServices.length >= trialLimit}
                            aria-label={`Select ${service.name}`}
                            className="mt-1"
                        />
                      </div>
                    </CardHeader>
                    <CardContent className="flex flex-col flex-grow space-y-4">
                      <div>
                        <h4 className="font-semibold text-primary">What it is:</h4>
                        <p className="text-muted-foreground text-sm">{service.whatItIs}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-primary">Why it matters:</h4>
                        <p className="text-muted-foreground text-sm">{service.whyItMatters}</p>
                      </div>
                      <div className="flex-grow"></div>
                      <div>
                        <h4 className="font-semibold text-primary">Included In:</h4>
                        <p className="text-muted-foreground text-sm font-medium">{service.tiers}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
            <div className="mt-16 text-center">
                <div className="mb-6">
                    <p className="text-xl font-bold page-title-glow">
                        {selectedServices.length} / {trialLimit} Services Selected
                    </p>
                    <div className="w-full bg-muted rounded-full h-2.5 mt-2 max-w-md mx-auto">
                        <motion.div 
                            className="bg-primary h-2.5 rounded-full" 
                            style={{ width: `${(selectedServices.length / trialLimit) * 100}%` }}
                            initial={{ width: 0 }}
                            animate={{ width: `${(selectedServices.length / trialLimit) * 100}%` }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                        />
                    </div>
                </div>
                <Button 
                    size="lg" 
                    onClick={handleStartTrial}
                    disabled={selectedServices.length === 0}
                    className="pulse-glow text-lg"
                >
                    Activate Your Free Trial
                </Button>
            </div>
          </div>
        </section>
    );
};

export default AllServices;