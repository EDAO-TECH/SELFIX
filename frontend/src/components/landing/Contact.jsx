import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from "@/components/ui/use-toast";
import emailjs from '@emailjs/browser';

const Contact = () => {
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        try {
            // Temporarily disable Supabase until integration is complete
            // const { error: dbError } = await supabase
            //     .from('contacts')
            //     .insert([
            //         { name: data.name, email: data.email, message: data.message }
            //     ]);
            // if (dbError) throw dbError;

            // Using EmailJS directly
            await emailjs.send(
                'YOUR_SERVICE_ID', 
                'YOUR_TEMPLATE_ID', 
                data, 
                'YOUR_PUBLIC_KEY'
            );

            toast({
                title: "Message Sent!",
                description: "Thank you for reaching out. We'll get back to you soon.",
            });
            e.target.reset();
        } catch (error) {
            console.error("Contact form error:", error);
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem sending your message. Please try again later.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contact" className="py-20 sm:py-28 bg-secondary/20 cyber-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
              <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
                  <h2 className="text-3xl sm:text-4xl font-bold tracking-tight page-title-glow">Contact & Support</h2>
                  <p className="mt-4 text-lg text-muted-foreground">Have questions or want to connect with our DAO? Reach out to us or our AI Service Officer for enterprise services.</p>
                  <div className="mt-8 space-y-4">
                      <a href="mailto:support@selfix.pro" className="flex items-center text-muted-foreground hover:text-primary transition-colors">
                          <Mail className="w-5 h-5 mr-3 text-primary"/>
                          support@selfix.pro
                      </a>
                      <a href="mailto:hello@edao.tech" className="flex items-center text-muted-foreground hover:text-primary transition-colors">
                          <Mail className="w-5 h-5 mr-3 text-primary"/>
                          hello@edao.tech
                      </a>
                  </div>
              </motion.div>
              <motion.form initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }} onSubmit={handleSubmit} className="space-y-4">
                  <Input name="name" type="text" placeholder="Name" required className="bg-background/50"/>
                  <Input name="email" type="email" placeholder="Email" required className="bg-background/50"/>
                  <Textarea name="message" placeholder="Your Message" required className="bg-background/50"/>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Mail className="mr-2 h-4 w-4"/>}
                    Submit
                  </Button>
              </motion.form>
          </div>
        </section>
    );
};

export default Contact;