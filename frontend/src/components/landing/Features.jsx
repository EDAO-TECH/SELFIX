import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { tieredFeaturesData } from '@/data/landing/features';
import { Coins } from 'lucide-react';

const FeatureGrid = ({ features, hasSpcxColumn = false, showToast }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
        {features.map((feature, index) => (
            <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="h-full"
            >
                <Card 
                    className="h-full bg-background cyber-border-soft hover:border-primary transition-all duration-300 transform hover:-translate-y-1 flex flex-col cursor-pointer"
                    onClick={() => showToast(`Would you like to implement the "${feature.name}" feature?`)}
                >
                    <CardHeader className="flex flex-row items-center gap-4 pb-4">
                        {React.cloneElement(feature.icon, { className: 'w-8 h-8 text-primary flex-shrink-0' })}
                        <CardTitle className="text-primary font-semibold text-lg">{feature.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <p className="text-muted-foreground text-sm">{feature.description}</p>
                        {hasSpcxColumn && feature.requiresSpcx && (
                            <div className="mt-4 flex items-center text-xs text-accent font-semibold">
                                <Coins className="w-4 h-4 mr-2" />
                                <span>Requires SPXC Token</span>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </motion.div>
        ))}
    </div>
);

const Features = ({ showToast }) => {
    return (
        <section id="features" className="py-20 sm:py-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight page-title-glow">Features & Services</h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                From essential free protection to advanced enterprise capabilities, explore what SELFIX offers.
              </p>
            </div>
            
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                <Tabs defaultValue="core" className="w-full">
                    <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 gap-2 h-auto mb-8">
                        <TabsTrigger value="core" className="py-3 text-base">{tieredFeaturesData.core.title}</TabsTrigger>
                        <TabsTrigger value="premium" className="py-3 text-base">{tieredFeaturesData.premium.title}</TabsTrigger>
                        <TabsTrigger value="enterprise" className="py-3 text-base">{tieredFeaturesData.enterprise.title}</TabsTrigger>
                    </TabsList>

                    <TabsContent value="core">
                        <Card className="bg-secondary/50 cyber-border">
                            <CardHeader>
                                <CardTitle className="page-title-glow">{tieredFeaturesData.core.subtitle}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <FeatureGrid features={tieredFeaturesData.core.features} showToast={showToast} />
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="premium">
                         <Card className="bg-secondary/50 cyber-border">
                             <CardHeader>
                                <CardTitle className="page-title-glow">{tieredFeaturesData.premium.subtitle}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <FeatureGrid features={tieredFeaturesData.premium.features} hasSpcxColumn={true} showToast={showToast} />
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="enterprise">
                         <Card className="bg-secondary/50 cyber-border">
                             <CardHeader>
                                <CardTitle className="page-title-glow">{tieredFeaturesData.enterprise.subtitle}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <FeatureGrid features={tieredFeaturesData.enterprise.features} showToast={showToast} />
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </motion.div>
          </div>
        </section>
    );
};

export default Features;