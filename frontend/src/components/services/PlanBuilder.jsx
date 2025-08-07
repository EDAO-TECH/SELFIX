import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { calculatorData } from '@/data/landing';
import { Info, Users, Bot, Briefcase, Building, BadgeDollarSign } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import CheckoutForm from '@/components/services/CheckoutForm';

const PlanBuilder = ({ showToast }) => {
  const [userTypeId, setUserTypeId] = useState(calculatorData.userTypes[0].id);
  const [devices, setDevices] = useState(1);
  const [selectedServices, setSelectedServices] = useState([]);
  const [billingCycleId, setBillingCycleId] = useState(calculatorData.billingCycles[0].id);
  const { toast } = useToast();

  const selectedUserType = useMemo(() => calculatorData.userTypes.find(ut => ut.id === userTypeId), [userTypeId]);

  React.useEffect(() => {
    if (selectedUserType) {
      if (selectedUserType.devices) {
        setDevices(selectedUserType.devices);
      } else if (selectedUserType.minDevices) {
        setDevices(selectedUserType.minDevices);
      }
    }
  }, [selectedUserType]);

  const handleServiceToggle = (serviceId) => {
    setSelectedServices(prev =>
      prev.includes(serviceId) ? prev.filter(id => id !== serviceId) : [...prev, serviceId]
    );
  };

  const priceCalculation = useMemo(() => {
    if (!selectedUserType || selectedUserType.custom) {
      return { custom: true };
    }

    const basePrice = selectedUserType.basePricePerDevice;
    const servicesPrice = Object.values(calculatorData.services)
      .flatMap(group => group.items)
      .reduce((total, service) => {
        if (selectedServices.includes(service.id)) {
          return total + service.price;
        }
        return total;
      }, 0);

    const pricePerDevicePerMonth = basePrice + servicesPrice;
    const totalMonthly = pricePerDevicePerMonth * devices;

    const quarterlyTotal = totalMonthly * 3 * (1 - calculatorData.billingCycles.find(c => c.id === 'quarterly').discount);
    const yearlyTotal = totalMonthly * 12 * (1 - calculatorData.billingCycles.find(c => c.id === 'yearly').discount);

    return {
      monthly: totalMonthly,
      quarterly: quarterlyTotal,
      yearly: yearlyTotal
    };
  }, [selectedUserType, devices, selectedServices]);

  const getPlaceholderPriceId = () => {
    // This logic is a placeholder. A real implementation would involve creating a price
    // on the backend or mapping the configuration to a specific Price ID.
    // We'll just use the Pro Tier Price ID as a default for the checkout flow.
    return 'price_1PZc7CBekafS21xDCg7yvYkP';
  }

  const getIconForUserType = (id) => {
    switch(id) {
        case 'individual': return <Bot className="w-5 h-5 mr-2" />;
        case 'family': return <Users className="w-5 h-5 mr-2" />;
        case 'pro': return <Briefcase className="w-5 h-5 mr-2" />;
        case 'commercial': return <Building className="w-5 h-5 mr-2" />;
        case 'government': return <Building className="w-5 h-5 mr-2" />;
        default: return null;
    }
  }

  return (
    <section className="py-20 sm:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-glow">Build Your Perfect Plan</h2>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            Use our interactive calculator to create a SELFIX subscription that fits your exact needs.
          </p>
        </div>

        <Card className="bg-card/30 cyber-border">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-px">
            <div className="lg:col-span-2 p-6 sm:p-8 space-y-8">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
                <h3 className="text-xl font-bold text-glow mb-4">Step 1: Select Your User Type</h3>
                <RadioGroup value={userTypeId} onValueChange={setUserTypeId} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {calculatorData.userTypes.map(ut => (
                    <Label key={ut.id} htmlFor={ut.id} className={`flex flex-col p-4 rounded-lg border-2 transition-all cursor-pointer ${userTypeId === ut.id ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50'}`}>
                      <div className="flex items-center mb-2">
                        {getIconForUserType(ut.id)}
                        <span className="font-semibold">{ut.name}</span>
                        <RadioGroupItem value={ut.id} id={ut.id} className="ml-auto" />
                      </div>
                      <p className="text-xs text-muted-foreground">{ut.description}</p>
                    </Label>
                  ))}
                </RadioGroup>
                {selectedUserType && (selectedUserType.minDevices || selectedUserType.maxDevices) && !selectedUserType.custom && (
                  <div className="mt-6">
                    <Label className="font-semibold">Number of Devices: <span className="text-primary font-bold">{devices}</span></Label>
                    <Slider
                      value={[devices]}
                      onValueChange={(value) => setDevices(value[0])}
                      min={selectedUserType.minDevices}
                      max={selectedUserType.maxDevices}
                      step={1}
                      className="mt-2"
                    />
                  </div>
                )}
              </motion.div>

               <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
                <h3 className="text-xl font-bold text-glow mb-4">Step 2: Choose Your Services</h3>
                <Accordion type="multiple" defaultValue={['coreSecurity']} className="w-full">
                  {Object.entries(calculatorData.services).map(([key, group]) => (
                    <AccordionItem key={key} value={key}>
                      <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                        <div className="flex items-center gap-3">
                            <div className="bg-primary/10 p-2 rounded-md">{group.icon}</div>
                            {group.name}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                          {group.items.map(service => (
                            <div key={service.id} className="flex items-center space-x-3">
                              <Checkbox id={service.id + "-builder"} onCheckedChange={() => handleServiceToggle(service.id)} checked={selectedServices.includes(service.id)} />
                              <Label htmlFor={service.id + "-builder"} className="flex-1 cursor-pointer">{service.name}</Label>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-6 w-6">
                                      <Info className="h-4 w-4 text-muted-foreground" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>{service.description}</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
               </motion.div>

              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
                <h3 className="text-xl font-bold text-glow mb-4">Step 3: Select Billing Cycle</h3>
                <RadioGroup value={billingCycleId} onValueChange={setBillingCycleId} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                   {calculatorData.billingCycles.map(cycle => (
                    <Label key={cycle.id} htmlFor={cycle.id + "-builder"} className={`flex items-center justify-center p-4 rounded-lg border-2 transition-all cursor-pointer ${billingCycleId === cycle.id ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50'}`}>
                      <RadioGroupItem value={cycle.id} id={cycle.id + "-builder"} className="mr-3" />
                      <div>
                        <span className="font-semibold">{cycle.name}</span>
                        {cycle.discount > 0 && <span className="block text-xs text-primary">{`Save ${cycle.discount * 100}%`}</span>}
                      </div>
                    </Label>
                   ))}
                </RadioGroup>
              </motion.div>
            </div>

            <div className="lg:col-span-1 bg-background/50 p-6 sm:p-8 flex flex-col justify-center">
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.5 }} className="sticky top-28">
                <Card className="bg-transparent border-0 shadow-none">
                  <CardHeader>
                    <CardTitle className="text-2xl text-glow text-center">Your Custom Plan</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {priceCalculation.custom ? (
                      <div className="text-center py-8">
                        <p className="text-lg text-muted-foreground">Custom enterprise and government solutions.</p>
                        <Button className="mt-4 w-full" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>Contact Sales</Button>
                      </div>
                    ) : (
                      <>
                        <div className="space-y-4">
                            <div className={`p-4 rounded-lg border-2 transition-all ${billingCycleId === 'monthly' ? 'border-primary bg-primary/10' : 'border-border'}`}>
                                <p className="font-semibold">Monthly</p>
                                <p className="text-2xl font-bold">${priceCalculation.monthly.toFixed(2)}</p>
                            </div>
                            <div className={`p-4 rounded-lg border-2 transition-all ${billingCycleId === 'quarterly' ? 'border-primary bg-primary/10' : 'border-border'}`}>
                                <p className="font-semibold">Quarterly</p>
                                <p className="text-2xl font-bold">${(priceCalculation.quarterly / 3).toFixed(2)} <span className="text-sm font-normal text-muted-foreground">/ month</span></p>
                                <p className="text-xs text-muted-foreground">Billed ${priceCalculation.quarterly.toFixed(2)} every 3 months</p>
                            </div>
                            <div className={`p-4 rounded-lg border-2 transition-all ${billingCycleId === 'yearly' ? 'border-primary bg-primary/10' : 'border-border'}`}>
                                <p className="font-semibold">Yearly</p>
                                <p className="text-2xl font-bold">${(priceCalculation.yearly / 12).toFixed(2)} <span className="text-sm font-normal text-muted-foreground">/ month</span></p>
                                <p className="text-xs text-muted-foreground">Billed ${priceCalculation.yearly.toFixed(2)} annually</p>
                            </div>
                        </div>
                        <CheckoutForm 
                          priceId={getPlaceholderPriceId()} 
                          mode="subscription"
                          showToast={showToast}
                        >
                          <Button size="lg" className="w-full text-lg pulse-glow">
                            Proceed to Checkout <BadgeDollarSign className="ml-2 w-5 h-5"/>
                          </Button>
                        </CheckoutForm>
                      </>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default PlanBuilder;