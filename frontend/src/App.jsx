import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.tsx"; // Keep only .tsx
import Pricing from "./pages/Pricing.jsx";
import Success from "./pages/Success.tsx"; // Keep only .tsx
import Cancel from "./pages/Cancel.tsx";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-800">
        <Navbar />
        <div className="p-6 max-w-5xl mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/success" element={<Success />} />
            <Route path="/cancel" element={<Cancel />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import Meta from '@/components/Meta';

// Landing Page Components
import Hero from '@/components/landing/Hero';
import PromoBanner from '@/components/landing/PromoBanner';
import About from '@/components/landing/About';
import Technology from '@/components/landing/Technology';
import CoreTechnology from '@/components/landing/CoreTechnology';
import Features from '@/components/landing/Features';
import HowItWorks from '@/components/landing/HowItWorks';
import Testimonials from '@/components/landing/Testimonials';
import FAQ from '@/components/landing/FAQ';
import Contact from '@/components/landing/Contact';
import Payment from '@/components/landing/Payment';
import AllServices from '@/components/landing/AllServices';
import SystemModes from '@/components/landing/SystemModes';
import Integrations from '@/components/landing/Integrations';
import Tokenomics from '@/components/landing/Tokenomics';
import HealingStackBuilder from '@/components/landing/HealingStackBuilder';

// New Pages
import WhitePapersIndexPage from '@/pages/WhitePapersIndexPage';
import WhitePaperDetailPage from '@/pages/WhitePaperDetailPage';
import PublicationsIndexPage from '@/pages/PublicationsIndexPage';
import PublicationDetailPage from '@/pages/PublicationDetailPage';
import EulaPage from '@/pages/EulaPage';
import CommercialServicesPage from '@/pages/CommercialServicesPage';
import SpcxPage from '@/pages/SpcxPage';
import TechnologyPage from '@/pages/TechnologyPage';
import ServicesPage from '@/pages/ServicesPage';
import DaoBoardPage from '@/pages/DaoBoardPage';
import DaoCorePage from '@/pages/DaoCorePage';
import LicenseViewerPage from '@/pages/LicenseViewerPage';
import OpenSourcePatentingPage from '@/pages/OpenSourcePatentingPage';
import EcosystemPage from '@/pages/EcosystemPage';
import PricingPage from '@/pages/PricingPage';
import TokenListingPage from '@/pages/TokenListingPage';
import PrivacyPolicyPage from '@/pages/PrivacyPolicyPage';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useSupabase } from '@/contexts/SupabaseClientProvider';
import { Loader2 } from 'lucide-react';

const App = () => {
  const { toast } = useToast();
  const location = useLocation();
  const { supabase } = useSupabase();
  const [stripePromise, setStripePromise] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [paymentError, setPaymentError] = useState(false);

  useEffect(() => {
    const fetchStripeKey = async () => {
      if (!supabase) {
          setIsLoading(false);
          setPaymentError(true);
          return;
      }
      try {
        const { data, error } = await supabase.functions.invoke('get-stripe-key');
        
        if (error) {
          throw new Error(`Failed to fetch Stripe key: ${error.message}`);
        }

        const { publishableKey } = data;

        if (publishableKey && publishableKey.includes('pk_')) {
          setStripePromise(loadStripe(publishableKey));
          setPaymentError(false);
        } else {
          throw new Error("Invalid Stripe publishable key received.");
        }
      } catch (error) {
        console.error(error.message);
        setPaymentError(true);
        toast({
          title: "Payment System Offline",
          description: "Could not connect to payment provider. Payments are currently disabled.",
          variant: "destructive",
          duration: 10000,
        });
        const dummyKey = 'pk_test_51RRIXHBekafS21xDDfLz4jL5CwB3tTjDIoE40g5u0s9s3SgN9c8n8f8g8h8i8j8k8l8m8n8o8p8q';
        setStripePromise(loadStripe(dummyKey));
      } finally {
        setIsLoading(false);
      }
    };

    fetchStripeKey();
  }, [toast, supabase]);

  const showToast = (message = "You can request this feature in your next prompt! 🚀") => {
    toast({
      title: "✨ Ready for Development!",
      description: message,
      variant: 'info',
    });
  };

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    if (query.get("session_id")) {
      toast({
        title: "Payment Successful!",
        description: "Thank you for your support! Your contribution helps us build a better web.",
        variant: 'success'
      });
    }
  }, [location.search, toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <Loader2 className="mr-2 h-8 w-8 animate-spin" />
        <p>Initializing Secure Payment System...</p>
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise}>
      <div className="min-h-screen bg-background text-foreground font-sans antialiased flex flex-col">
        <Toaster />
        <Header showToast={showToast} />
        <main className="pt-20 flex-grow">
          <Routes>
            <Route path="/" element={<LandingPageLayout showToast={showToast} paymentError={paymentError} />} />
            <Route path="/services" element={<ServicesPage showToast={showToast} />} />
            <Route path="/technology" element={<TechnologyPage />} />
            <Route path="/spcx" element={<SpcxPage showToast={showToast} />} />
            <Route path="/white-papers" element={<WhitePapersIndexPage showToast={showToast} />} />
            <Route path="/white-papers/:whitePaperSlug" element={<WhitePaperDetailPage showToast={showToast} />} />
            <Route path="/publications" element={<PublicationsIndexPage showToast={showToast} />} />
            <Route path="/publications/:publicationSlug" element={<PublicationDetailPage showToast={showToast} />} />
            <Route path="/eula" element={<EulaPage />} />
            <Route path="/commercial-services" element={<CommercialServicesPage />} />
            <Route path="/dao-board" element={<DaoBoardPage showToast={showToast} />} />
            <Route path="/daocore" element={<DaoCorePage showToast={showToast} />} />
            <Route path="/open-source-patenting" element={<OpenSourcePatentingPage showToast={showToast} />} />
            <Route path="/license-viewer" element={<LicenseViewerPage />} />
            <Route path="/ecosystem" element={<EcosystemPage showToast={showToast} />} />
            <Route path="/pricing" element={<PricingPage showToast={showToast} paymentError={paymentError} />} />
            <Route path="/token-listing" element={<TokenListingPage showToast={showToast} />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          </Routes>
        </main>
        <Footer showToast={showToast} />
      </div>
    </Elements>
  );
};

const LandingPageLayout = ({ showToast, paymentError }) => (
  <>
    <Meta />
    <Hero showToast={showToast} />
    <PromoBanner showToast={showToast} />
    <About />
    <Technology />
    <AllServices />
    <SystemModes />
    <CoreTechnology />
    <Features showToast={showToast} />
    <HowItWorks />
    <HealingStackBuilder showToast={showToast} />
    <Payment showToast={showToast} paymentError={paymentError} />
    <Integrations showToast={showToast} />
    <Tokenomics showToast={showToast} />
    <Testimonials />
    <FAQ />
    <Contact showToast={showToast} />
  </>
);

export default App;
