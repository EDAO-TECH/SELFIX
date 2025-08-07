import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { allServicesData } from '@/data/landing';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import Countdown from 'react-countdown';

const FreeTrialSelector = () => {
    const [selectedServices, setSelectedServices] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [activeTrial, setActiveTrial] = useState(null);
    const { toast } = useToast();
    const trialLimit = 5;

    useEffect(() => {
        const trialData = localStorage.getItem('selfix_trial');
        if (trialData) {
            const parsedData = JSON.parse(trialData);
            if (new Date(parsedData.validUntil) > new Date()) {
                setActiveTrial(parsedData);
            } else {
                localStorage.removeItem('selfix_trial');
            }
        }
    }, []);

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
        setIsModalOpen(true);
    };

    const handleConfirmTrial = (e) => {
        e.preventDefault();
        setIsLoading(true);

        setTimeout(() => {
            const validUntil = new Date();
            validUntil.setDate(validUntil.getDate() + 14);

            const trialData = {
                email,
                services: selectedServices,
                validUntil: validUntil.toISOString(),
            };

            localStorage.setItem('selfix_trial', JSON.stringify(trialData));
            setActiveTrial(trialData);
            setIsLoading(false);
            setIsModalOpen(false);

            toast({
                title: "🚀 Free Trial Activated!",
                description: `Your 14-day trial for ${email} has begun.`,
                className: 'bg-green-500/20 text-green-400 border-green-500'
            });
        }, 1500);
    };

    if (activeTrial) {
        return (
            <section className="py-20 sm:py-28 bg-card/20 cyber-border rounded-lg">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-glow">Your Trial is Active!</h2>
                        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                            Welcome, {activeTrial.email}! Explore your selected services and experience the future of digital security.
                        </p>
                        <Card className="max-w-md mx-auto mt-8 bg-background/50 backdrop-blur-sm cyber-border-soft">
                            <CardHeader>
                                <CardTitle className="text-primary text-glow">Trial Ends In:</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-4xl font-bold text-white">
                                    <Countdown date={new Date(activeTrial.validUntil)} />
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </section>
        );
    }

    return (
        <>
            <section className="py-20 sm:py-28 bg-card/20 cyber-border rounded-lg">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                  <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-glow">Start Your 14-Day Free Trial</h2>
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
                      <Card className={`h-full bg-background/50 backdrop-blur-sm cyber-border-soft hover:border-primary transition-all duration-300 transform hover:-translate-y-1 flex flex-col ${selectedServices.includes(service.name) ? 'border-primary' : ''}`}>
                        <CardHeader>
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 bg-primary/10 p-3 rounded-lg">
                              {service.icon}
                            </div>
                            <div className="flex-grow">
                                <CardTitle className="text-glow text-xl">{service.name}</CardTitle>
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
                        <p className="text-xl font-bold text-glow">
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

            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="sm:max-w-[425px] bg-background/80 backdrop-blur-sm cyber-border">
                    <DialogHeader>
                        <DialogTitle className="text-glow text-2xl">Confirm Your Free Trial</DialogTitle>
                        <DialogDescription>
                            Enter your email to activate your 14-day trial for the selected services.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleConfirmTrial}>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="email" className="text-right">
                                    Email
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="col-span-3"
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Activating...
                                </>
                            ) : (
                                'Start My 14-Day Trial'
                            )}
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default FreeTrialSelector;