import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { financialProjections } from '@/data/landing.jsx';
import { TrendingUp } from 'lucide-react';

const Financials = () => {
    return (
        <section id="financials" className="py-20 sm:py-28 bg-secondary">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-glow">Financial Projections</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                        A transparent look at our growth strategy and projected NFT holder payouts.
                    </p>
                </div>
                <motion.div 
                    initial={{ opacity: 0, y: 50 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    viewport={{ once: true }} 
                    transition={{ duration: 0.7 }}
                    className="mt-16"
                >
                    <Card className="bg-background cyber-border">
                        <CardHeader>
                            <CardTitle className="flex items-center text-glow"><TrendingUp className="mr-3 text-primary" /> Growth & Payouts</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="border-b border-border">
                                            <th className="p-4 text-muted-foreground">Year</th>
                                            <th className="p-4 text-muted-foreground">Revenue</th>
                                            <th className="p-4 text-muted-foreground">Karmic NFT Payout</th>
                                            <th className="p-4 text-muted-foreground">Entropy NFT Payout</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {financialProjections.map((item, index) => (
                                            <tr key={index} className="border-b border-border/50">
                                                <td className="p-4 font-bold text-primary">Year {item.year}</td>
                                                <td className="p-4 text-foreground">{item.revenue}</td>
                                                <td className="p-4 text-foreground">{item.karmicPayout}</td>
                                                <td className="p-4 text-foreground">{item.entropyPayout}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </section>
    );
};

export default Financials;