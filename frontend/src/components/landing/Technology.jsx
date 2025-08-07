import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { productOverview } from '@/data/landing/technology';
import { ArrowRight } from 'lucide-react';

const Technology = () => {
    return (
        <section id="tech-overview" className="py-20 sm:py-28 bg-secondary/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight page-title-glow">Product Overview</h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                SELFIX defends digital life not just with code — but with conscience.
              </p>
            </div>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {productOverview.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full bg-background/50 backdrop-blur-sm cyber-border hover:border-primary/80 transition-all duration-300 transform hover:-translate-y-2 flex flex-col">
                    <CardHeader>
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">{feature.icon}</div>
                        <CardTitle className="text-primary font-semibold">{feature.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
            <div className="mt-16 text-center">
                <Button asChild size="lg" className="group">
                    <Link to="/technology">
                        Investor Deep Dive <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Link>
                </Button>
            </div>
          </div>
        </section>
    );
};

export default Technology;