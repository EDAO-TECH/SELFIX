import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
    return (
        <section id="about" className="py-20 sm:py-28">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    <div className="relative">
                        <img  class="rounded-xl shadow-2xl w-full h-auto object-cover" alt="Abstract digital art representing karmic trust and data streams" src="https://images.unsplash.com/photo-1692607987924-bfa64745358c" />
                        <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-xl"></div>
                    </div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                >
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight page-title-glow">
                        From Reaction to Regeneration
                    </h2>
                    <p className="mt-6 text-lg text-muted-foreground">
                        SELFIX isn't just another security tool. It's the world’s first ethical, AI-powered system designed to <span className="text-primary font-semibold">heal digital environments</span>, not just defend them. We replace the outdated “block & scan” model with a new paradigm: <span className="text-primary font-semibold">“detect, simulate, heal, log, learn.”</span>
                    </p>
                    <p className="mt-4 text-lg text-muted-foreground">
                        By using autonomous AI agents, a karmic trust protocol, and real-time entropy analysis, SELFIX doesn't just block attacks; it pre-emptively repairs the very fabric of your system to make it resilient and self-sustaining.
                    </p>
                     <p className="mt-4 text-lg text-muted-foreground">
                        Governed by the SELFIX DAO and built on the transparent, verifiable <span className="text-primary font-semibold">SmartLicense-X™</span> framework, our mission is to restore digital sovereignty. This is security that is proactive, transparent, and aligned with your interests.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default About;