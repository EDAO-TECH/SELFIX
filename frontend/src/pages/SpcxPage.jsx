import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Meta from '@/components/Meta';
import { spcxData } from '@/data/landing/spcxData';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const SpcxPage = ({ showToast }) => {
  return (
    <>
      <Meta title="SPXC Credits | SELFIX" description="Learn about SPXC credits, how to earn them, and how to use them to unlock powerful features in SELFIX." />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <p className="text-lg font-semibold text-primary mb-2">{spcxData.hero.subtitle}</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight page-title-glow mb-4">{spcxData.hero.title}</h1>
          <p className="max-w-3xl mx-auto text-xl text-muted-foreground">{spcxData.hero.tagline}</p>
        </motion.div>

        {/* What it is */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center mb-20"
        >
            <h2 className="text-3xl font-bold page-title-glow mb-4">{spcxData.whatItIs.title}</h2>
            <p className="text-lg text-muted-foreground">{spcxData.whatItIs.content}</p>
        </motion.div>


        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 items-start">
            {/* Usage */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
            >
                <Card className="h-full bg-secondary/50 cyber-border-soft">
                    <CardHeader>
                        <CardTitle className="text-2xl page-title-glow">{spcxData.usage.title}</CardTitle>
                        <p className="text-muted-foreground">{spcxData.usage.description}</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {spcxData.usage.items.map((item, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                                <div className="flex items-center gap-4">
                                    {item.icon}
                                    <span className="font-medium">{item.action}</span>
                                </div>
                                <span className="font-bold text-primary">{item.cost}</span>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </motion.div>

            {/* Earning */}
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <Card className="h-full bg-secondary/50 cyber-border-soft">
                    <CardHeader>
                        <CardTitle className="text-2xl page-title-glow">{spcxData.earning.title}</CardTitle>
                        <p className="text-muted-foreground">{spcxData.earning.description}</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {spcxData.earning.items.map((item, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                                <div className="flex items-center gap-4">
                                    {item.icon}
                                    <span className="font-medium">{item.action}</span>
                                </div>
                                <span className="font-bold text-green-500">{item.reward}</span>
                            </div>
                        ))}
                         <p className="text-center text-muted-foreground pt-4 text-sm">{spcxData.earning.note}</p>
                    </CardContent>
                </Card>
            </motion.div>
        </div>

        {/* How it's different */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mb-20"
        >
            <h2 className="text-3xl font-bold page-title-glow mb-4">{spcxData.howItsDifferent.title}</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">{spcxData.howItsDifferent.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                {spcxData.howItsDifferent.points.map((point, index) => (
                    <Card key={index} className="bg-secondary/50 cyber-border-soft p-6">
                        <div className="flex flex-col items-center text-center">
                            <div className="bg-primary/10 p-4 rounded-full mb-4">
                                {point.icon}
                            </div>
                            <h3 className="text-xl font-semibold text-primary">{point.title}</h3>
                        </div>
                    </Card>
                ))}
            </div>
        </motion.div>
        
        {/* Get Started */}
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
        >
            <Card className="bg-primary/10 cyber-border-soft">
                <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 p-8 md:p-12">
                    <div>
                        <h2 className="text-3xl font-bold page-title-glow mb-4">{spcxData.getStarted.title}</h2>
                        <ul className="space-y-3">
                            {spcxData.getStarted.steps.map((step, index) => (
                                <li key={index} className="flex items-start">
                                    <CheckCircle className="w-6 h-6 mr-3 mt-1 text-primary flex-shrink-0" />
                                    <span className="text-lg text-muted-foreground">{step}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="text-center md:text-right">
                        <Button asChild size="lg" className="pulse-glow text-lg">
                            <Link to="/pricing">
                                {spcxData.getStarted.cta} <ArrowRight className="ml-2 w-5 h-5"/>
                            </Link>
                        </Button>
                    </div>
                </div>
            </Card>
        </motion.div>

      </div>
    </>
  );
};

export default SpcxPage;