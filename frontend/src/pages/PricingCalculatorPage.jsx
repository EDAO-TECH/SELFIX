import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { userTypes, serviceCategories, billingCycles } from '@/data/calculator';
import { HelpCircle, Zap, ShoppingCart } from 'lucide-react';
import Meta from '@/components/Meta';

const PricingCalculatorPage = ({ showToast }) => {
  const [selectedUserTypeId, setSelectedUserTypeId] = useState(userTypes[0].id);
  const [selectedServices, setSelectedServices] = useState({});
  const [deviceCount, setDeviceCount] = useState(userTypes.find(ut => ut.id === 'commercial')?.minDevices || 5);
  const [billingCycleId, setBillingCycleId] = useState(billingCycles[0].id);
  const [totalPrice, setTotalPrice] = useState(0);

  const selectedUserType = useMemo(() => userTypes.find(ut => ut.id === selectedUserTypeId), [selectedUserTypeId]);

  useEffect(() => {
    const calculatePrice = () => {
      if (selectedUserType.basePrice === 'Custom') {
        setTotalPrice('Custom');
        return;
      }

      let base = selectedUserType.basePrice;
      let servicesTotal = 0;
      
      for (const serviceId in selectedServices) {
        if (selectedServices[serviceId]) {
          for (const category in serviceCategories) {
            const service = serviceCategories[category].services.find(s => s.id === serviceId);
            if (service) {
              servicesTotal += service.price;
              break;
            }
          }
        }
      }

      let finalDeviceCount = selectedUserType.id === 'commercial' ? deviceCount : selectedUserType.devices;
      let deviceMultiplier = 1 + (finalDeviceCount - 1) * 0.5;

      let subtotal = (base + servicesTotal) * deviceMultiplier;

      const billingCycle = billingCycles.find(bc => bc.id === billingCycleId);
      const discount = subtotal * billingCycle.discount;
      
      const finalPrice = subtotal - discount;
      setTotalPrice(finalPrice);
    };

    calculatePrice();
  }, [selectedUserTypeId, selectedServices, deviceCount, billingCycleId, selectedUserType]);

  const handleServiceToggle = (serviceId) => {
    setSelectedServices(prev => ({ ...prev, [serviceId]: !prev[serviceId] }));
  };

  const handleCheckout = () => {
    showToast("Checkout functionality is not yet implemented. This would integrate with Stripe using the calculated price.");
  };

  const StepCard = ({ title, step, children }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-background/50 cyber-border-soft overflow-hidden">
        <CardHeader className="bg-muted/30">
          <CardTitle className="flex items-center text-xl">
            <span className="flex items-center justify-center w-8 h-8 mr-4 rounded-full bg-primary text-primary-foreground font-bold">{step}</span>
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {children}
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <>
      <Meta title="SELFIX Pricing Calculator" description="Interactively calculate your SELFIX subscription price based on your specific needs." />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-glow karma-gradient bg-clip-text text-transparent">
            Interactive Pricing Calculator
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            Tailor your SELFIX plan. Get a transparent, real-time quote based on your exact needs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <StepCard title="Select User Type" step={1}>
              <RadioGroup value={selectedUserTypeId} onValueChange={setSelectedUserTypeId} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {userTypes.map(ut => (
                  <div key={ut.id}>
                    <RadioGroupItem value={ut.id} id={ut.id} className="sr-only" />
                    <Label htmlFor={ut.id} className={`flex flex-col items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all ${selectedUserTypeId === ut.id ? 'border-primary bg-primary/10' : 'border-border'}`}>
                      {ut.icon}
                      <span className="font-semibold mt-2 text-center text-sm">{ut.name}</span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              {selectedUserTypeId === 'commercial' && (
                <div className="mt-6">
                  <Label htmlFor="device-slider" className="font-semibold">Number of Devices: {deviceCount}</Label>
                  <Slider
                    id="device-slider"
                    min={selectedUserType.minDevices}
                    max={selectedUserType.maxDevices}
                    step={1}
                    value={[deviceCount]}
                    onValueChange={(value) => setDeviceCount(value[0])}
                    className="mt-2"
                  />
                </div>
              )}
            </StepCard>

            <StepCard title="Choose Your Services" step={2}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                {Object.entries(serviceCategories).map(([key, category]) => (
                  <div key={key}>
                    <h4 className="font-bold text-lg mb-4 flex items-center text-primary">{category.icon} {category.name}</h4>
                    <div className="space-y-4">
                      {category.services.map(service => (
                        <div key={service.id} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Label htmlFor={service.id} className="text-base">{service.name}</Label>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-6 w-6 ml-2">
                                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{service.description}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                          <Switch
                            id={service.id}
                            checked={!!selectedServices[service.id]}
                            onCheckedChange={() => handleServiceToggle(service.id)}
                            disabled={selectedUserTypeId === 'government'}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </StepCard>

            <StepCard title="Select Billing Cycle" step={3}>
              <RadioGroup value={billingCycleId} onValueChange={setBillingCycleId} className="flex flex-col sm:flex-row gap-4">
                {billingCycles.map(bc => (
                  <div key={bc.id} className="flex-1">
                    <RadioGroupItem value={bc.id} id={bc.id} className="sr-only" />
                    <Label htmlFor={bc.id} className={`flex flex-col items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all ${billingCycleId === bc.id ? 'border-primary bg-primary/10' : 'border-border'}`}>
                      <span className="font-semibold text-lg">{bc.name}</span>
                      {bc.discount > 0 && <span className="text-sm text-primary font-bold">Save {bc.discount * 100}%</span>}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </StepCard>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card className="bg-background/70 backdrop-blur-xl cyber-border">
                <CardHeader>
                  <CardTitle className="text-2xl text-glow">Your Custom Plan</CardTitle>
                  <CardDescription>A summary of your selections.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-muted-foreground">User Type</p>
                    <p className="font-bold text-lg">{selectedUserType.name}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Devices</p>
                    <p className="font-bold text-lg">{selectedUserType.id === 'commercial' ? deviceCount : selectedUserType.devices}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Billing Cycle</p>
                    <p className="font-bold text-lg">{billingCycles.find(bc => bc.id === billingCycleId)?.name}</p>
                  </div>
                  <div className="border-t border-border pt-4">
                    <p className="text-muted-foreground mb-2">Total Estimated Price</p>
                    <div className="text-4xl font-extrabold karma-gradient bg-clip-text text-transparent">
                      {typeof totalPrice === 'number' ? `$${totalPrice.toFixed(2)}` : totalPrice}
                      {typeof totalPrice === 'number' && <span className="text-lg text-muted-foreground"> / {billingCycles.find(bc => bc.id === billingCycleId)?.id === 'monthly' ? 'mo' : billingCycles.find(bc => bc.id === billingCycleId)?.id === 'quarterly' ? 'qtr' : 'yr'}</span>}
                    </div>
                  </div>
                  <Button size="lg" className="w-full mt-6 pulse-glow" onClick={handleCheckout} disabled={selectedUserTypeId === 'government'}>
                    {selectedUserTypeId === 'government' ? 'Contact Sales' : 'Proceed to Checkout'}
                    <ShoppingCart className="ml-2 h-5 w-5" />
                  </Button>
                   {selectedUserTypeId === 'government' && <p className="text-xs text-center mt-2 text-muted-foreground">Custom plans require consultation.</p>}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PricingCalculatorPage;