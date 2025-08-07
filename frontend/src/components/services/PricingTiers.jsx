import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check } from 'lucide-react';
import { basePackages, addOnServices } from '@/data/landing/servicesPageData';
import { Link } from 'react-router-dom';

const PricingTiers = ({ showToast }) => {
    return (
        <section className="py-20 sm:py-28">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-glow">Pricing Plans & Add-Ons</h2>
                    <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                        Flexible options to suit your needs. Start with a base package and enhance it with powerful add-ons.
                    </p>
                </div>
                
                <h3 className="text-2xl font-bold text-glow text-center mb-8">Base Packages</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
                    {basePackages.map((pkg) => (
                        <motion.div
                            key={pkg.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <Card className="h-full flex flex-col bg-background/50 backdrop-blur-sm cyber-border-soft hover:border-primary transition-all duration-300">
                                <CardHeader className="items-center text-center">
                                    {pkg.icon}
                                    <CardTitle className="text-2xl text-glow mt-4">{pkg.name}</CardTitle>
                                    <CardDescription className="text-2xl font-bold text-primary">{pkg.price}</CardDescription>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <ul className="space-y-3">
                                        {pkg.features.map((feature, i) => (
                                            <li key={i} className="flex items-start">
                                                <Check className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                                                <span className="text-muted-foreground">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                                <CardFooter>
                                    <Button asChild className="w-full pulse-glow">
                                        <Link to="/pricing">Get Started</Link>
                                    </Button>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                <h3 className="text-2xl font-bold text-glow text-center mb-8">Add-On Services</h3>
                <Card className="bg-background/50 backdrop-blur-sm cyber-border-soft">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-base text-primary">Feature</TableHead>
                                <TableHead className="text-base text-primary text-right">Monthly Price (AUD)</TableHead>
                                <TableHead className="text-base text-primary text-right">One-Time SPXC Cost</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {addOnServices.map((service, i) => (
                                <TableRow key={i}>
                                    <TableCell className="font-medium text-foreground">{service.feature}</TableCell>
                                    <TableCell className="text-right text-muted-foreground font-semibold">{service.monthlyPrice}</TableCell>
                                    <TableCell className="text-right text-muted-foreground font-semibold">{service.spxcCost}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Card>
            </div>
        </section>
    );
};

export default PricingTiers;