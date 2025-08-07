import React, { useState } from 'react';
import { useStripe } from '@stripe/react-stripe-js';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';
import { useSupabase } from '@/contexts/SupabaseClientProvider';

const CheckoutForm = ({ priceId, mode, children, showToast, disabled: parentDisabled }) => {
    const [loading, setLoading] = useState(false);
    const stripe = useStripe();
    const { toast } = useToast();
    const { supabase } = useSupabase();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        if (!supabase) {
            toast({
                title: 'Connection Error',
                description: 'Cannot connect to the backend. Please try again later.',
                variant: 'destructive',
            });
            setLoading(false);
            return;
        }

        if (!priceId) {
             if (showToast) {
                showToast('A valid Price ID is required to proceed.');
             } else {
                toast({
                    title: 'Missing Information',
                    description: 'A valid Price ID is required to proceed.',
                    variant: 'destructive',
                });
             }
            setLoading(false);
            return;
        }
        
        if (!stripe) {
            if (showToast) {
                showToast('Stripe.js has not loaded yet. Please try again in a moment.');
            } else {
                toast({
                    title: 'Payment System Error',
                    description: 'Stripe.js has not loaded yet. Please try again in a moment.',
                    variant: 'destructive',
                });
            }
            setLoading(false);
            return;
        }

        try {
            const { data, error: functionError } = await supabase.functions.invoke('create-checkout-session', {
                body: JSON.stringify({ priceId, mode: mode || 'subscription' }),
            });

            if (functionError) {
                throw new Error(functionError.message);
            }

            const { sessionId } = data;
            if (!sessionId) {
                throw new Error('Could not create a checkout session.');
            }

            const { error: stripeError } = await stripe.redirectToCheckout({ sessionId });

            if (stripeError) {
                throw stripeError;
            }
        } catch (error) {
            const errorMessage = error.message || 'An unknown error occurred.';
            if (showToast) {
                showToast(`Payment Error: ${errorMessage}`);
            } else {
                toast({
                    title: 'Payment Error',
                    description: errorMessage,
                    variant: 'destructive',
                });
            }
            setLoading(false);
        }
    };
    
    const buttonChild = React.Children.only(children);

    return (
        <form onSubmit={handleSubmit} className="w-full">
            {React.cloneElement(buttonChild, {
                type: 'submit',
                disabled: loading || parentDisabled || buttonChild.props.disabled,
                children: loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                ) : buttonChild.props.children,
            })}
        </form>
    );
};

export default CheckoutForm;