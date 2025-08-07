import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, GitMerge, UserCheck, ShieldCheck, Scale, ChevronsRight, FileText, BarChart, Users } from 'lucide-react';
import Meta from '@/components/Meta';
import { Link } from 'react-router-dom';

const DaoCorePage = ({ showToast }) => {

    const pageTitle = "DAOCORE: The Engine of Ethical Innovation";
    const pageDescription = "Explore DAOCORE, our decentralized governance model that powers SmartLicense-X, karmic reputation, and a fair, transparent ecosystem for all participants.";

    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const corePillars = [
        {
            icon: <Award className="w-10 h-10 text-primary" />,
            title: "Karmic Reputation",
            description: "Go beyond token holdings. Your contributions, ethical conduct, and expertise build your Karma, giving you a greater voice in the DAO."
        },
        {
            icon: <GitMerge className="w-10 h-10 text-primary" />,
            title: "SmartLicense-X Protocol",
            description: "The backbone of our ecosystem. It programmatically enforces licensing terms, royalty splits, and usage rights defined in our on-chain patents."
        },
        {
            icon: <UserCheck className="w-10 h-10 text-primary" />,
            title: "Proof of Authorship",
            description: "Secure your intellectual property on-chain. We provide immutable, timestamped proof of creation, replacing slow and costly traditional patent filings."
        },
        {
            icon: <ShieldCheck className="w-10 h-10 text-primary" />,
            title: "Dispute Resolution",
            description: "A multi-stage, DAO-managed process ensures fair and transparent handling of licensing conflicts, plagiarism claims, and enforcement issues."
        }
    ];

    const howItWorks = [
        {
            title: "Submit an Invention",
            description: "Creators submit their IP to the DAO for protection under the SmartLicense-X protocol.",
        },
        {
            title: "DAO Validation",
            description: "The DAO verifies the submission, ensuring it's unique and ethically sound.",
        },
        {
            title: "On-Chain Protection",
            description: "The IP is minted as an NFT, creating an immutable, timestamped record of ownership.",
        },
        {
            title: "License & Collaborate",
            description: "Creators can license their IP, collaborate with others, and earn royalties, all enforced by smart contracts.",
        }
    ];

    const ctaCards = [
        {
            icon: <FileText className="w-12 h-12 mx-auto mb-4 text-primary"/>,
            title: "Read the White Paper",
            description: "Dive deep into the technical architecture, governance model, and tokenomics of the SELFIX ecosystem.",
            buttonText: "View White Paper",
            link: "/white-papers"
        },
        {
            icon: <BarChart className="w-12 h-12 mx-auto mb-4 text-primary"/>,
            title: "Explore the Ecosystem",
            description: "See how DAOCORE integrates with our suite of products to create a seamless, self-sustaining digital economy.",
            buttonText: "See the Big Picture",
            link: "/ecosystem"
        },
        {
            icon: <Users className="w-12 h-12 mx-auto mb-4 text-primary"/>,
            title: "Join the Community",
            description: "Connect with inventors, developers, and visionaries. Participate in discussions and shape the future of ethical IP.",
            buttonText: "Engage with Us",
            link: "/#contact"
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
                        <span className="text-primary font-semibold tracking-widest uppercase">Decentralized Governance</span>
                        <h1 className="text-4xl md:text-6xl font-extrabold mt-4 page-title-glow">
                            Welcome to DAOCORE
                        </h1>
                        <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto text-muted-foreground">
                            This is the heart of SELFIX—a decentralized autonomous organization that puts ethics, reputation, and community at the center of innovation.
                        </p>
                        <div className="mt-10">
                            <Button asChild size="lg">
                                <Link to="/open-source-patenting">
                                    <Scale className="mr-2 h-5 w-5" />
                                    Explore Our Patent Model
                                </Link>
                            </Button>
                        </div>
                    </div>
                </motion.section>

                <section id="pillars" className="py-20 bg-secondary/20">
                    <div className="container mx-auto px-4">
                        <motion.div
                            className="text-center mb-16"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.5 }}
                            variants={fadeIn}
                        >
                            <h2 className="text-3xl font-bold tracking-tight page-title-glow">The Four Pillars of DAOCORE</h2>
                            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                                Our governance is built on a foundation of trust, transparency, and tangible contribution.
                            </p>
                        </motion.div>
                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.5 }}
                            variants={staggerContainer}
                        >
                            {corePillars.map((pillar, index) => (
                                <motion.div key={index} variants={fadeIn}>
                                    <Card className="h-full text-center hover:border-primary transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/20 bg-card/50 backdrop-blur-sm">
                                        <CardHeader>
                                            <div className="flex justify-center mb-4">{pillar.icon}</div>
                                            <CardTitle className="text-primary font-semibold">{pillar.title}</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-muted-foreground">{pillar.description}</p>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>
                
                <section id="howitworks" className="py-20">
                    <div className="container mx-auto px-4">
                        <motion.div
                            className="text-center mb-16"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.5 }}
                            variants={fadeIn}
                        >
                            <h2 className="text-3xl font-bold tracking-tight page-title-glow">How It Works</h2>
                            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                                A simple, transparent process for protecting and monetizing your intellectual property.
                            </p>
                        </motion.div>
                        <motion.div 
                            className="relative flex flex-col md:flex-row justify-between items-center"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            variants={staggerContainer}
                        >
                            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-border -translate-y-1/2 hidden md:block" />
                            <div className="absolute top-0 left-1/2 w-0.5 h-full bg-border -translate-x-1/2 md:hidden" />
                            
                            {howItWorks.map((step, index) => (
                                <motion.div key={index} className="flex-1 w-full md:w-auto relative mb-12 md:mb-0" variants={fadeIn}>
                                    <div className="flex flex-col md:flex-row items-center md:flex-col text-center">
                                        <div className="z-10 bg-background flex items-center justify-center w-16 h-16 rounded-full border-2 border-primary ring-4 ring-background mb-4 md:mb-0">
                                            <span className="text-2xl font-bold text-primary">{index + 1}</span>
                                        </div>
                                        <div className="md:mt-6 md:px-4">
                                            <h3 className="text-xl font-semibold text-primary mb-2">{step.title}</h3>
                                            <p className="text-muted-foreground">{step.description}</p>
                                        </div>
                                    </div>
                                    {index < howItWorks.length - 1 && 
                                        <ChevronsRight className="absolute top-1/2 -right-4 -translate-y-1/2 h-8 w-8 text-primary hidden md:block" />
                                    }
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                <section id="cta" className="py-20 bg-secondary/20">
                    <div className="container mx-auto px-4">
                        <motion.div 
                            className="grid grid-cols-1 md:grid-cols-3 gap-8"
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.5 }}
                        >
                            {ctaCards.map((card, index) => (
                                <motion.div key={index} variants={fadeIn}>
                                <Card className="flex flex-col h-full p-8 text-center bg-card cyber-border-soft">
                                    {card.icon}
                                    <CardTitle className="text-2xl mb-4 page-title-glow">{card.title}</CardTitle>
                                    <p className="text-muted-foreground flex-grow">{card.description}</p>
                                    <Button asChild className="mt-8" variant="outline">
                                        <Link to={card.link} onClick={(e) => { if(card.link.startsWith('/#')) { e.preventDefault(); document.querySelector(card.link.substring(1)).scrollIntoView({ behavior: 'smooth' }); }}}>
                                            {card.buttonText}
                                        </Link>
                                    </Button>
                                </Card>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default DaoCorePage;