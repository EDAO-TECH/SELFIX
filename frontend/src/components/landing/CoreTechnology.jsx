import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { coreTechModules } from '@/data/landing/technology';
import { CheckCircle } from 'lucide-react';

const CoreTechnology = () => {
    return (
        <section id="tech" className="py-20 sm:py-28 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight page-title-glow">Investor Deep Dive: Core Technology</h2>
              <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                Our proprietary technologies create a new paradigm in cybersecurity, moving from reactive defense to autonomous, self-healing systems. This is our defensible edge.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              {coreTechModules.map((tech, index) => (
                <motion.div
                  key={tech.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="h-full"
                >
                  <Card className="h-full bg-secondary/50 cyber-border-soft hover:border-primary/80 transition-all duration-300 transform hover:-translate-y-2 flex flex-col">
                    <CardHeader className="text-center">
                       <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-4">
                        {tech.icon}
                       </div>
                      <CardTitle className="text-primary text-2xl font-semibold">{tech.title}</CardTitle>
                      <p className="text-muted-foreground pt-2">{tech.whatItIs}</p>
                    </CardHeader>
                    <CardContent className="flex-grow flex flex-col">
                        <Tabs defaultValue="problem" className="w-full flex-grow flex flex-col">
                            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 gap-1 h-auto">
                                <TabsTrigger value="problem">Problem</TabsTrigger>
                                <TabsTrigger value="how">How</TabsTrigger>
                                <TabsTrigger value="defense">Defense</TabsTrigger>
                                <TabsTrigger value="investor">Angle</TabsTrigger>
                            </TabsList>
                            <TabsContent value="problem" className="flex-grow mt-4">
                                <p className="text-sm text-muted-foreground">{tech.problemSolved}</p>
                            </TabsContent>
                            <TabsContent value="how" className="flex-grow mt-4">
                                <ul className="space-y-2">
                                    {tech.howItWorks.map((item, i) => (
                                        <li key={i} className="flex items-start text-sm">
                                            <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-primary flex-shrink-0" />
                                            <span className="text-muted-foreground">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </TabsContent>
                            <TabsContent value="defense" className="flex-grow mt-4">
                                <ul className="space-y-2">
                                    {tech.defensibility.map((item, i) => (
                                        <li key={i} className="flex items-start text-sm">
                                            <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-primary flex-shrink-0" />
                                            <span className="text-muted-foreground">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </TabsContent>
                            <TabsContent value="investor" className="flex-grow mt-4">
                                <ul className="space-y-2">
                                    {tech.investorAngle.map((item, i) => (
                                        <li key={i} className="flex items-start text-sm">
                                            <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-primary flex-shrink-0" />
                                            <span className="text-muted-foreground">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
    );
};

export default CoreTechnology;