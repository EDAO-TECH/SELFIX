import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Gem, Package, Server, Star } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import PlanBuilder from '@/components/services/PlanBuilder';
import CheckoutForm from '@/components/services/CheckoutForm';

const pricingTiers = [
    {
        name: 'Free Tier',
        id: 'free',
        price: '$0',
        description: 'For privacy-conscious individuals and open-source fans.',
        features: ['Real-time scanner', 'Legal archive', 'CLI-based UI', 'SmartLicense verification'],
        priceId: null,
        mode: null,
        icon: <Package className="w-10 h-10 text-gray-400" />,
        buttonText: 'Get Started',
        variant: 'secondary'
    },
    {
        name: 'Pro Tier',
        id: 'pro',
        price: '$15/mo',
        description: 'For power users, developers, and sysadmins.',
        features: ['All Free features', 'Local AI healing engine', 'GUI dashboard', 'Plugin sandboxing', 'Trap Logic™'],
        priceId: 'price_1PZc7CBekafS21xDCg7yvYkP',
        mode: 'subscription',
        icon: <Star className="w-10 h-10 text-cyan-400" />,
        buttonText: 'Choose Pro',
        variant: 'default'
    },
    {
        name: 'Enterprise',
        id: 'enterprise',
        price: 'Custom',
        description: 'For organizations and compliance-heavy teams.',
        features: ['All Pro features', 'Dedicated healing module vault', 'Seeder agent orchestration', 'Priority support'],
        priceId: null,
        mode: null,
        icon: <Server className="w-10 h-10 text-purple-400" />,
        buttonText: 'Contact Sales',
        variant: 'default'
    },
    {
        name: 'NFT License',
        id: 'nft',
        price: '$500',
        description: 'For core contributors and digital sovereignty advocates.',
        features: ['All Pro features forever', 'Voting rights in DAO', 'Module promotion rights', 'No monthly fees'],
        priceId: 'price_1PZc8DBekafS21xDSyKz2sSj',
        mode: 'payment',
        icon: <Gem className="w-10 h-10 text-amber-400" />,
        buttonText: 'Become a Patron',
        variant: 'default'
    }
];

const PricingPage = ({ showToast, paymentError }) => {
    const { toast } = useToast();

    const handleFreeTier = () => {
         showToast("The Free Tier is available via CLI download. Instructions coming soon!");
    }

    const handleEnterprise = () => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        toast({
            title: "Let's Talk!",
            description: "For custom enterprise plans, please get in touch with our sales team.",
        });
    }

    return (
        <>
            <Helmet>
                <title>Pricing - SELFIX</title>
                <meta name="description" content="Choose the perfect SELFIX plan for your needs. From free trials to enterprise solutions, find your fit." />
            </Helmet>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight page-title-glow">Find Your Perfect Plan</h1>
                    <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                        Whether you're an individual, a professional, or an enterprise, we have a plan that fits your needs.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-20">
                    {pricingTiers.map((tier) => (
                        <motion.div
                            key={tier.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <Card className={`h-full flex flex-col bg-background/50 backdrop-blur-sm cyber-border-soft hover:border-primary transition-all duration-300 ${tier.id === 'pro' ? 'border-primary' : ''}`}>
                                <CardHeader className="items-center text-center">
                                    {tier.icon}
                                    <CardTitle className="text-2xl page-title-glow mt-4">{tier.name}</CardTitle>
                                    <CardDescription className="text-2xl font-bold text-primary">{tier.price}</CardDescription>
                                    <p className="text-sm text-muted-foreground h-10">{tier.description}</p>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <ul className="space-y-3">
                                        {tier.features.map((feature, i) => (
                                            <li key={i} className="flex items-start">
                                                <Check className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                                                <span className="text-muted-foreground">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                                <CardFooter>
                                    {tier.priceId ? (
                                        <CheckoutForm priceId={tier.priceId} mode={tier.mode} showToast={showToast} disabled={paymentError}>
                                            <Button className={`w-full ${tier.id === 'pro' ? 'pulse-glow' : ''}`} variant={tier.variant}>
                                                {tier.buttonText}
                                            </Button>
                                        </CheckoutForm>
                                    ) : (
                                         <Button 
                                            className={`w-full`} 
                                            onClick={tier.id === 'enterprise' ? handleEnterprise : handleFreeTier}
                                            variant={tier.variant}
                                        >
                                            {tier.buttonText}
                                        </Button>
                                    )}
                                </CardFooter>
                            </Card>
                        </motion.div>
                    ))}
                </div>
                
                <PlanBuilder showToast={showToast} />

            </div>
        </>
    );
};

export default PricingPage;