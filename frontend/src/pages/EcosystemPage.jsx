import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, ShieldCheck, GitMerge, Users, Award, Atom, Dna, Box, ChevronsRight, FileText, BarChart, Scale } from 'lucide-react';
import Meta from '@/components/Meta';
import { Link } from 'react-router-dom';

const EcosystemPage = ({ showToast }) => {

    const pageTitle = "SELFIX Ecosystem: The Future of Digital Identity & IP";
    const pageDescription = "Explore the interconnected products of the SELFIX ecosystem, from on-chain identity verification and ethical IP management to decentralized data storage and karmic governance.";

    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
            }
        }
    };
    
    const ecosystemComponents = [
        {
            icon: <Dna className="w-10 h-10 text-primary" />,
            title: "SELFIX-ID: Your Sovereign Digital Identity",
            description: "On-chain, user-controlled digital identity. A single, secure key to access the entire ecosystem and prove who you are without revealing unnecessary data.",
            link: "/technology",
            linkText: "Explore Tech"
        },
        {
            icon: <ShieldCheck className="w-10 h-10 text-primary" />,
            title: "SmartLicense-X: The Ethical IP Protocol",
            description: "Our core innovation. Replaces traditional patents with on-chain, DAO-governed licenses that enforce fair use and royalties automatically.",
            link: "/open-source-patenting",
            linkText: "Learn about Patenting"
        },
        {
            icon: <GitMerge className="w-10 h-10 text-primary" />,
            title: "DAOCORE: Decentralized Governance",
            description: "The engine of our ecosystem. A Karma-based DAO where your contributions matter more than your wallet size, ensuring fair and expert-driven decisions.",
            link: "/daocore",
            linkText: "Discover DAOCORE"
        },
        {
            icon: <Box className="w-10 h-10 text-primary" />,
            title: "Product-Backed NFTs: Tangible Digital Assets",
            description: "Unlike speculative JPEGs, our NFTs are backed by real-world products, licensed IP, and verifiable data, giving them intrinsic, lasting value.",
            link: "/#nfts",
            linkText: "See our NFTs"
        },
        {
            icon: <Atom className="w-10 h-10 text-primary" />,
            title: "SELFIX-HEAL: Decentralized Wellness",
            description: "A suite of wellness applications and services powered by our core tech, ensuring data privacy and user-controlled health information.",
            link: "/services",
            linkText: "View Services"
        },
        {
            icon: <Award className="w-10 h-10 text-primary" />,
            title: "Karmic System: Your On-Chain Reputation",
            description: "Earn Karma for positive contributions—from validating data to developing code. Your reputation is a quantifiable asset across the ecosystem.",
            link: "/daocore",
            linkText: "Understand Karma"
        }
    ];

    return (
        <>
            <Meta title={pageTitle} description={pageDescription} />
            <div className="bg-background text-foreground">

                <motion.section
                    className="py-20 md:py-32 text-center"
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                >
                    <div className="container mx-auto px-4">
                        <span className="text-primary font-semibold tracking-widest uppercase">A Connected Universe</span>
                        <h1 className="text-4xl md:text-6xl font-extrabold mt-4 page-title-glow">
                            The SELFIX Ecosystem
                        </h1>
                        <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto text-muted-foreground">
                            We're not just building a product; we're building a self-sustaining digital economy where your identity, ideas, and contributions are protected, valued, and rewarded.
                        </p>
                        <div className="mt-10">
                            <Button asChild size="lg">
                                <Link to="/#contact">
                                    <Users className="mr-2 h-5 w-5" />
                                    Join the Community
                                </Link>
                            </Button>
                        </div>
                    </div>
                </motion.section>
                
                <section id="components" className="py-20 bg-secondary/20">
                    <div className="container mx-auto px-4">
                        <motion.div
                            className="text-center mb-16"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.5 }}
                            variants={fadeIn}
                        >
                            <h2 className="text-3xl font-bold tracking-tight">Core Components</h2>
                            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                                Each piece of our ecosystem is designed to work in synergy, creating a powerful network effect.
                            </p>
                        </motion.div>
                        <motion.div 
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                        >
                            {ecosystemComponents.map((component, index) => (
                                <motion.div key={index} variants={fadeIn}>
                                    <Card className="flex flex-col h-full p-6 text-left hover:border-primary transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/20 bg-card/50 backdrop-blur-sm">
                                        <CardHeader className="flex-row items-start gap-4 p-0 mb-4">
                                            <div className="flex-shrink-0 bg-primary/10 p-3 rounded-lg">
                                                {component.icon}
                                            </div>
                                            <div className="flex-grow">
                                                <CardTitle>{component.title}</CardTitle>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="p-0 flex-grow">
                                            <p className="text-muted-foreground">{component.description}</p>
                                        </CardContent>
                                        <Button asChild variant="link" className="p-0 h-auto mt-4 text-primary justify-start">
                                            <Link to={component.link} onClick={(e) => { if(component.link.startsWith('/#')) { e.preventDefault(); document.querySelector(component.link.substring(1)).scrollIntoView({ behavior: 'smooth' }); }}}>
                                                {component.linkText}
                                                <ChevronsRight className="w-4 h-4 ml-1" />
                                            </Link>
                                        </Button>
                                    </Card>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                <motion.section className="py-20 text-center">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        variants={fadeIn}
                        className="container mx-auto px-4"
                    >
                        <h2 className="text-3xl font-bold">Ready to Dive Deeper?</h2>
                        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                            Explore the foundational documents and governance that underpin our entire ecosystem.
                        </p>
                        <div className="mt-8 flex flex-wrap justify-center gap-4">
                            <Button asChild size="lg" variant="outline">
                               <Link to="/white-papers">
                                    <FileText className="mr-2 h-5 w-5" />
                                    Read White Papers
                                </Link>
                            </Button>
                            <Button asChild size="lg" variant="secondary">
                                <Link to="/daocore">
                                    <Scale className="mr-2 h-5 w-5" />
                                    Understand Governance
                                </Link>
                            </Button>
                        </div>
                    </motion.div>
                </motion.section>
            </div>
        </>
    );
};

export default EcosystemPage;