import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CheckoutForm from '@/components/services/CheckoutForm';
import { AlertCircle } from 'lucide-react';

const Payment = ({ showToast, paymentError }) => {
    return (
        <section id="support" className="py-20 sm:py-28 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight page-title-glow">Support Our Mission</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                        Your contributions fuel our development and help us create a safer digital world for everyone.
                    </p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    {paymentError ? (
                        <Card className="max-w-2xl mx-auto bg-destructive/10 border-destructive text-destructive-foreground">
                            <CardHeader className="flex-row items-center gap-4">
                                <AlertCircle className="w-8 h-8" />
                                <div>
                                    <CardTitle>Payment System Offline</CardTitle>
                                    <CardDescription className="text-destructive-foreground/80">
                                        We're currently unable to process payments. Please try again later.
                                    </CardDescription>
                                </div>
                            </CardHeader>
                        </Card>
                    ) : (
                        <Tabs defaultValue="general" className="max-w-2xl mx-auto">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="general">General Support</TabsTrigger>
                                <TabsTrigger value="early">Early Supporter</TabsTrigger>
                            </TabsList>
                            <TabsContent value="general">
                                <Card className="cyber-border-soft bg-secondary/50">
                                    <CardHeader>
                                        <CardTitle className="page-title-glow">One-Time Contribution</CardTitle>
                                        <CardDescription>
                                            Make a one-time donation to support the ongoing development and maintenance of the SELFIX platform. ($15)
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="text-center">
                                        <CheckoutForm priceId="price_1PZc7CBekafS21xDCg7yvYkP" mode="payment" showToast={showToast}>
                                            <Button size="lg" className="w-full pulse-glow">
                                                Donate with Card
                                            </Button>
                                        </CheckoutForm>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                            <TabsContent value="early">
                                <Card className="cyber-border-soft bg-secondary/50">
                                    <CardHeader>
                                        <CardTitle className="page-title-glow">Become an Early Supporter</CardTitle>
                                        <CardDescription>
                                            Become an Early Supporter and get exclusive access to features and our community. Your support is invaluable.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4 text-center">
                                        <CheckoutForm priceId="price_1RZa6uBekafS21xD3CPhtl9I" mode="payment" showToast={showToast}>
                                            <Button size="lg" className="w-full">
                                                Proceed to Checkout
                                            </Button>
                                        </CheckoutForm>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    )}
                </motion.div>
            </div>
        </section>
    );
};

export default Payment;