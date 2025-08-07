import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, ShieldCheck, Globe, Users, Coins, ChevronsRight, UploadCloud, BookOpen, Trophy } from 'lucide-react';
import Meta from '@/components/Meta';

const OpenSourcePatentingPage = ({ showToast }) => {

  const pageTitle = "Open Source Patenting: A Patent for the People";
  const pageDescription = "Discover how DAOCORE and SmartLicense-X are creating a new paradigm for intellectual property—making innovation accessible, secure, and collaborative for everyone.";

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const problemsSolved = [
    {
      icon: <Zap className="w-10 h-10 text-primary" />,
      title: "Eliminates High Upfront Costs",
      description: "Replace $5K–$35K+ in filing fees with a low-cost, on-chain proof-of-creation, making IP protection accessible to all."
    },
    {
      icon: <ShieldCheck className="w-10 h-10 text-primary" />,
      title: "Immediate, Immutable Protection",
      description: "Get instant, timestamped proof of authorship. No more waiting 12-24 months for a grant. Your idea is protected from day one."
    },
    {
      icon: <Globe className="w-10 h-10 text-primary" />,
      title: "Global, Borderless Enforcement",
      description: "Your IP is protected by DAO governance, not limited by jurisdiction. It's a truly global patent system."
    },
    {
      icon: <Users className="w-10 h-10 text-primary" />,
      title: "Enables Collaborative Innovation",
      description: "Tokenize, co-own, and license ideas with ease. Attract co-developers and build reputation within the DAOCORE ecosystem."
    },
     {
      icon: <Coins className="w-10 h-10 text-primary" />,
      title: "Built-In Royalty Enforcement",
      description: "Smart contracts automatically distribute royalties, handle tiered licensing, and enforce usage terms transparently."
    },
     {
      icon: <ChevronsRight className="w-10 h-10 text-primary" />,
      title: "Prevents Idea Theft",
      description: "SmartLicense-X defines reuse rules enforced by the DAO. The blockchain provides a transparent, auditable record of access and use."
    },
  ];

  const upcomingFeatures = [
    {
      icon: <UploadCloud className="w-12 h-12 text-primary" />,
      title: "NFT Minting Interface",
      description: "An intuitive drag-and-drop interface for inventors. Upload your idea, choose your license terms, and instantly mint your timestamped NFT.",
      buttonText: "Mint Your Invention NFT"
    },
    {
      icon: <BookOpen className="w-12 h-12 text-primary" />,
      title: "Public Innovation Ledger",
      description: "A decentralized, DAO-backed equivalent of Google Patents. Search and explore a world of protected ideas, filterable by field, inventor, and license type.",
      buttonText: "Explore the Ledger"
    },
    {
      icon: <Trophy className="w-12 h-12 text-primary" />,
      title: "Invention Bounty Mechanism",
      description: "Organizations can post challenges, and inventors can submit solutions. The DAO votes to fund the best proposals, connecting problems with brilliant minds.",
      buttonText: "View Bounties"
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
            <span className="text-primary font-semibold tracking-widest uppercase">The Future of IP</span>
            <h1 className="text-4xl md:text-6xl font-extrabold mt-4 page-title-glow">
              Open Source Patenting
            </h1>
            <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto text-muted-foreground">
              We're reframing invention from a bureaucratic privilege to a publicly protected digital right—secured by code, ethics, and DAO governance. This is the patent for the people.
            </p>
            <div className="mt-10">
              <Button size="lg" onClick={() => showToast()}>
                <Zap className="mr-2 h-5 w-5" />
                Protect Your Idea Now
              </Button>
            </div>
          </div>
        </motion.section>

        <section id="solutions" className="py-20 bg-secondary/20">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={fadeIn}
            >
              <h2 className="text-3xl font-bold tracking-tight page-title-glow">Solving the Inventor's Dilemma</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Our NFT-based patent model directly addresses the systemic issues that stifle innovation.
              </p>
            </motion.div>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={staggerContainer}
            >
              {problemsSolved.map((feature, index) => (
                <motion.div key={index} variants={fadeIn}>
                  <Card className="h-full text-center hover:border-primary transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/20 bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                      <div className="flex justify-center mb-4">{feature.icon}</div>
                      <CardTitle className="text-primary font-semibold">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section id="features" className="py-20">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={fadeIn}
            >
              <h2 className="text-3xl font-bold tracking-tight page-title-glow">The Innovation Toolkit</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                We're building the tools to de-risk invention and encourage open collaboration.
              </p>
            </motion.div>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
            >
              {upcomingFeatures.map((feature, index) => (
                <motion.div key={index} variants={fadeIn}>
                  <Card className="flex flex-col h-full p-8 text-center bg-card cyber-border-soft">
                     <div className="flex justify-center mb-6">{feature.icon}</div>
                    <CardTitle className="text-2xl mb-4 page-title-glow">{feature.title}</CardTitle>
                    <p className="text-muted-foreground flex-grow">{feature.description}</p>
                    <Button className="mt-8" variant="outline" onClick={() => showToast()}>
                      {feature.buttonText}
                    </Button>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="py-20 text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={fadeIn}
              className="container mx-auto px-4"
            >
                <h2 className="text-3xl font-bold page-title-glow">Join the Patent Revolution</h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                    Whether you're an inventor, a developer, or an idealist, you have a role to play in building a more equitable system for innovation.
                </p>
                <div className="mt-8 flex justify-center gap-4">
                    <Button size="lg" onClick={() => showToast()}>
                        Submit an Invention
                    </Button>
                    <Button size="lg" variant="secondary" onClick={() => showToast()}>
                        Contribute to the DAO
                    </Button>
                </div>
            </motion.div>
        </section>
      </div>
    </>
  );
};

export default OpenSourcePatentingPage;