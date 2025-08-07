import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Quote } from 'lucide-react';
import { testimonialsData } from '@/data/landing';

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 sm:py-28 bg-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight page-title-glow">Trusted by Innovators</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Hear what industry leaders are saying about SELFIX's impact.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonialsData.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <Card className="h-full bg-background/50 backdrop-blur-sm cyber-border hover:shadow-primary/20 shadow-lg transition-shadow duration-300 flex flex-col">
                <CardContent className="pt-6 flex-grow flex flex-col">
                  <Quote className="w-8 h-8 text-primary mb-4" />
                  <blockquote className="text-muted-foreground italic mb-4 flex-grow">"{testimonial.quote}"</blockquote>
                  <p className="font-semibold text-primary text-right">- {testimonial.author}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;