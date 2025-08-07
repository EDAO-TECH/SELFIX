import React from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, Dna, RefreshCw, ShieldCheck, MessageSquare, TrendingUp, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const workshopFeatures = [
  {
    icon: <BrainCircuit className="w-10 h-10 text-primary" />,
    title: 'Your Local AI Assistant',
    description: 'An onboard AI expert that monitors system health, offers guidance, and adapts to your workflow, ensuring peak performance and security.',
  },
  {
    icon: <Dna className="w-10 h-10 text-primary" />,
    title: 'The Seeder Agent',
    description: 'A specialized Python agent seeded with expert knowledge. It delivers custom "healing" modules and automated fixes tailored to your system’s unique DNA.',
  },
  {
    icon: <RefreshCw className="w-10 h-10 text-primary" />,
    title: 'A Collaborative Loop',
    description: 'The Local AI and Seeder Agent work in tandem, continuously exchanging insights to patch vulnerabilities, neutralize threats, and optimize performance.',
  },
];

const upgradedFeatures = [
    {
        icon: <ShieldCheck className="w-6 h-6 text-accent" />,
        text: 'Real-time Health Diagnostics: Scan, diagnose, and prevent issues before they ever disrupt your workflow.'
    },
    {
        icon: <MessageSquare className="w-6 h-6 text-primary" />,
        text: 'Personalized AI Support: Get instant answers, security recommendations, and automated fixes, 24/7.'
    },
    {
        icon: <TrendingUp className="w-6 h-6 text-primary" />,
        text: 'Always Self-Improving: Your Digital Workshop gets smarter with every interaction, proactively hardening your system.'
    }
]

const DigitalWorkshop = ({ showToast }) => {
  return (
    <section id="digital-workshop" className="py-20 sm:py-28 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight karma-gradient text-transparent bg-clip-text text-glow">
            Welcome to Your Digital Workshop
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Installing SELFIX is more than adding a program—it’s like building an intelligent, self-improving workshop right inside your system.
          </p>
        </motion.div>

        <div className="mt-16 grid md:grid-cols-3 gap-8">
          {workshopFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full bg-secondary cyber-border-soft text-center hover:border-primary transition-colors duration-300">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit">
                    {feature.icon}
                  </div>
                  <CardTitle className="mt-4 text-xl font-semibold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-20 max-w-4xl mx-auto"
        >
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-center text-glow">Your System, Upgraded</h3>
            <ul className="mt-8 space-y-4">
                {upgradedFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start gap-4">
                        <div className="flex-shrink-0">{feature.icon}</div>
                        <p className="text-muted-foreground">{feature.text}</p>
                    </li>
                ))}
            </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-20 text-center"
        >
          <h4 className="text-xl font-semibold">Ready to build your digital workshop?</h4>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Install Selfix and unlock continuous improvement, protection, and expert support — all inside your own system!
          </p>
          <Button size="lg" className="mt-8 pulse-glow" onClick={() => showToast("The download and installation process will be available soon!")}>
            <Download className="mr-2 h-5 w-5" /> Install Selfix Now
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default DigitalWorkshop;