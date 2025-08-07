import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import Countdown from 'react-countdown';
import { BrainCircuit, TrendingUp, Lock, Rocket, Sparkles, AlertTriangle, BadgePercent, KeyRound, ShoppingCart, Send, ShieldCheck, Database, CheckCircle, Info } from 'lucide-react';
import { intentData, modulesData, pathComparisonData } from '@/data/healingStackData';

const HealingStackBuilder = ({ showToast }) => {
  const [selectedIntent, setSelectedIntent] = useState(intentData[0].id);
  const [selectedModules, setSelectedModules] = useState({});
  const trialEndDate = new Date('2025-07-17T23:59:59');

  useEffect(() => {
    const intent = intentData.find(i => i.id === selectedIntent);
    const initialModules = modulesData.reduce((acc, module) => {
      acc[module.id] = intent.defaultModules.includes(module.id);
      return acc;
    }, {});
    setSelectedModules(initialModules);
  }, [selectedIntent]);

  const handleModuleToggle = (moduleId) => {
    setSelectedModules(prev => ({ ...prev, [moduleId]: !prev[moduleId] }));
  };

  const totals = useMemo(() => {
    return modulesData.reduce(
      (acc, module) => {
        if (selectedModules[module.id]) {
          acc.monthly += module.monthlyPrice;
          acc.tokens += module.tokenPrice;
        }
        return acc;
      },
      { monthly: 0, tokens: 0 }
    );
  }, [selectedModules]);

  const countdownRenderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <span className="text-lg font-bold text-destructive">Offer has ended!</span>;
    }
    return (
      <div className="flex items-center justify-center gap-2">
        <div><span className="font-bold text-lg">{days}</span>d</div>
        <div><span className="font-bold text-lg">{hours}</span>h</div>
        <div><span className="font-bold text-lg">{minutes}</span>m</div>
        <div><span className="font-bold text-lg">{seconds}</span>s</div>
      </div>
    );
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    } else {
      showToast(`Section #${sectionId} not found.`);
    }
  };

  const Step = ({ number, title, children }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
      className="mb-12"
    >
      <div className="flex items-center mb-6">
        <div className="flex-shrink-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl shadow-lg">
          {number}
        </div>
        <h3 className="ml-4 text-2xl font-bold page-title-glow">{title}</h3>
      </div>
      {children}
    </motion.div>
  );

  return (
    <section id="healing-stack-builder" className="py-20 sm:py-28 bg-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <Step number="1" title="What Do You Want to Protect?">
          <p className="mb-6 text-center text-muted-foreground">Choose your healing intent to get a recommended setup, then customize further.</p>
          <RadioGroup value={selectedIntent} onValueChange={setSelectedIntent} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {intentData.map(intent => (
              <div key={intent.id}>
                <RadioGroupItem value={intent.id} id={intent.id} className="sr-only" />
                <Label htmlFor={intent.id} className={`flex flex-col items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all h-full ${selectedIntent === intent.id ? 'border-primary bg-primary/10 shadow-lg' : 'border-border bg-background hover:border-primary/50'}`}>
                  {intent.icon}
                  <span className="font-semibold text-center mt-2">{intent.label}</span>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </Step>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Step number="2" title="Assemble Your Healing Stack">
              <Card className="bg-background cyber-border overflow-hidden">
                <CardHeader>
                    <CardTitle>Build your own security system.</CardTitle>
                    <CardDescription>Choose monthly plan, use tokens, or unlock via NFT.</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12"></TableHead>
                        <TableHead>Module</TableHead>
                        <TableHead className="text-center">Monthly</TableHead>
                        <TableHead className="text-center">SFXC Tokens</TableHead>
                        <TableHead className="text-center">NFT Unlock</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {modulesData.map(module => (
                        <TableRow key={module.id} className={selectedModules[module.id] ? 'bg-primary/5' : ''}>
                          <TableCell>
                            <Checkbox id={module.id} checked={selectedModules[module.id]} onCheckedChange={() => handleModuleToggle(module.id)} />
                          </TableCell>
                          <TableCell className="font-medium">
                            {module.name}
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Info className="w-3 h-3 text-muted-foreground inline ml-2 cursor-help" />
                                </TooltipTrigger>
                                <TooltipContent><p>{module.description}</p></TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </TableCell>
                          <TableCell className="text-center font-mono">{module.monthlyPrice > 0 ? `${module.monthlyPrice}` : 'Free'}</TableCell>
                          <TableCell className="text-center font-mono">{module.tokenPrice > 0 ? module.tokenPrice.toLocaleString() : 'Free'}</TableCell>
                          <TableCell className="text-center font-mono">{module.nftUnlock}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </Step>
          </div>

          <div className="lg:col-span-1">
            <Step number="3" title="Your ROI Dashboard">
              <Card className="bg-background cyber-border h-full">
                <CardHeader>
                  <CardTitle className="flex items-center"><BrainCircuit className="mr-2"/> Your Stack Total</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="p-4 rounded-lg bg-muted border flex justify-between items-center">
                        <Label htmlFor="sub-total" className="text-lg">Subscription:</Label>
                        <p className="font-bold text-2xl text-primary">${totals.monthly}/month</p>
                    </div>
                     <div className="p-4 rounded-lg bg-muted border flex justify-between items-center">
                        <Label htmlFor="token-total" className="text-lg">SFXC Token Cost:</Label>
                        <p className="font-bold text-2xl text-primary">{totals.tokens.toLocaleString()}</p>
                    </div>
                     <div className="p-4 rounded-lg bg-muted border flex justify-between items-center">
                        <Label htmlFor="nft-total" className="text-lg">NFT Unlock:</Label>
                        <p className="font-bold text-xl text-primary">$999 <span className="text-sm font-normal text-muted-foreground">/ one-time</span></p>
                    </div>
                </CardContent>
                <CardHeader>
                  <CardTitle className="flex items-center"><TrendingUp className="mr-2"/> ROI Summary</CardTitle>
                </CardHeader>
                 <CardContent className="space-y-3 text-sm">
                  <div className="flex items-start"><CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0"/> <p><span className="font-bold">Using tokens saves 20%</span> over 12 months</p></div>
                  <div className="flex items-start"><CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0"/> <p><span className="font-bold">Staking 4,000 SFXC</span> = $1,680 return/year at 42% APY</p></div>
                  <div className="flex items-start"><CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0"/> <p><span className="font-bold">Holding NFT T013</span> = Lifetime access + DAO voting rights</p></div>
                  <div className="flex items-start"><CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0"/> <p><span className="font-bold">NFTs give access aura</span> + SmartLicense-X identity proof</p></div>
                 </CardContent>
                 <CardContent>
                    <div className="flex flex-col gap-2">
                         <Button className="w-full" onClick={() => scrollToSection('support')}><ShoppingCart className="mr-2 h-4 w-4"/> Subscribe Monthly</Button>
                         <Button className="w-full" variant="secondary" onClick={() => scrollToSection('tokenomics')}><Send className="mr-2 h-4 w-4"/> Use Tokens</Button>
                         <Button className="w-full" variant="outline" onClick={() => scrollToSection('tokenomics')}><KeyRound className="mr-2 h-4 w-4"/> Mint Chained-IP NFT</Button>
                    </div>
                 </CardContent>
              </Card>
            </Step>
          </div>
        </div>

        <Step number="4" title="Start Free Trial">
          <Card className="bg-background cyber-border text-center p-8 grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-2xl font-bold karma-gradient bg-clip-text text-transparent">Get 14 Days Free — No Card Required</p>
                <ul className="mt-4 space-y-2 text-left max-w-sm mx-auto">
                    <li className="flex items-center"><ShieldCheck className="w-5 h-5 mr-3 text-primary"/> Choose any 5 modules</li>
                    <li className="flex items-center"><Database className="w-5 h-5 mr-3 text-primary"/> No hidden fees</li>
                    <li className="flex items-center"><TrendingUp className="w-5 h-5 mr-3 text-primary"/> Receive full healing report at trial end</li>
                </ul>
              </div>
              <div className="bg-primary/10 border-l-4 border-primary p-4 text-left rounded-lg">
                <div className="flex items-center text-lg font-bold"><BadgePercent className="mr-2 text-primary"/> Use code <code className="bg-primary/20 text-primary px-2 py-1 rounded-md mx-2">HEAL20</code> for 20% off</div>
                <p className="text-muted-foreground mt-1">This discount applies to your first token or NFT purchase during the trial period.</p>
                <div className="mt-2 text-sm text-muted-foreground flex items-center">
                    <AlertTriangle className="w-4 h-4 mr-2 text-yellow-500"/>
                    Offer valid until July 17: <Countdown date={trialEndDate} renderer={countdownRenderer} />
                </div>
              </div>
          </Card>
        </Step>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="text-center py-12 border-t border-border mt-12"
        >
          <h3 className="text-2xl font-bold page-title-glow">You’re not just buying software.</h3>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            You’re licensing forgiveness, staking intention, and protecting futures.
          </p>
          <div className="mt-6 space-y-2 text-xl font-semibold text-primary">
            <p>✨ Heal your stack.</p>
            <p>🔗 Own the protocol.</p>
            <p>🧠 Let karma compute.</p>
          </div>
           <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 flex-wrap">
              <Button size="lg" className="pulse-glow" onClick={() => scrollToSection('all-services')}><Rocket className="mr-2 h-5 w-5"/> Start Free Trial</Button>
              <Button size="lg" variant="secondary" onClick={() => scrollToSection('tokenomics')}><Send className="mr-2 h-5 w-5"/> Buy SFXC Tokens</Button>
              <Button size="lg" variant="outline" onClick={() => scrollToSection('tokenomics')}><KeyRound className="mr-2 h-5 w-5"/> Mint Chained-IP NFT</Button>
            </div>
        </motion.div>

        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-16"
        >
            <h3 className="text-2xl font-bold text-center page-title-glow mb-8">Which Path Is Right for Me?</h3>
            <Card className="bg-background cyber-border overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Path</TableHead>
                            <TableHead>Good For</TableHead>
                            <TableHead>Ownership</TableHead>
                            <TableHead>ROI Potential</TableHead>
                            <TableHead>Karma Score</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {pathComparisonData.map(path => (
                            <TableRow key={path.path} className={path.highlight ? 'bg-primary/10' : ''}>
                                <TableCell className="font-bold">{path.path}</TableCell>
                                <TableCell>{path.goodFor}</TableCell>
                                <TableCell>{path.ownership}</TableCell>
                                <TableCell className="font-semibold" style={{color: path.roiColor}}>{path.roiPotential}</TableCell>
                                <TableCell className="font-semibold" style={{color: path.karmaColor}}>{path.karmaScore}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </motion.div>

      </div>
    </section>
  );
};

export default HealingStackBuilder;