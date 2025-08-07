import React from 'react';
import Meta from '@/components/Meta';
import { motion } from 'framer-motion';

const PrivacyPolicyPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  const Section = ({ title, children }) => (
    <motion.div variants={itemVariants} className="mb-8">
      <h2 className="text-2xl font-bold text-primary mb-4 border-b border-primary/20 pb-2">{title}</h2>
      <div className="prose prose-invert max-w-none text-muted-foreground space-y-4">
        {children}
      </div>
    </motion.div>
  );

  return (
    <>
      <Meta title="Privacy Policy - SELFIX" description="Privacy Policy for SELFIX, the autonomous digital repair and intelligence system for enterprises." />
      <div className="bg-background text-foreground">
        <motion.div 
          className="container mx-auto px-4 sm:px-6 lg:px-8 py-16"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <h1 className="text-4xl font-extrabold tracking-tight text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Privacy Policy for SELFIX</h1>
            <p className="text-center text-muted-foreground mb-12">Effective Date: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </motion.div>

          <motion.p variants={itemVariants} className="text-lg text-center mb-12 max-w-3xl mx-auto">
            At SELFIX, your privacy and trust are paramount. This Privacy Policy outlines how we collect, use, store, and protect your data when you interact with our cybersecurity platform, including all software modules, web services, and integrated payment systems.
          </motion.p>

          <Section title="1. Information We Collect">
            <p>We collect various types of information in connection with the services we provide, including:</p>
            <h3 className="text-xl font-semibold text-foreground">a. Personal Information</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Email address (for license activation and notifications)</li>
              <li>Payment details (via our secure payment partners)</li>
              <li>IP address and device metadata (for licensing and compliance)</li>
            </ul>
            <h3 className="text-xl font-semibold text-foreground">b. Transactional Data</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Payment history (logged in a secure database)</li>
              <li>License usage (stored in a secure database)</li>
              <li>Blockchain transaction hashes (for SFXC/USDT verification)</li>
            </ul>
            <h3 className="text-xl font-semibold text-foreground">c. Technical Data</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Logs of security events, healing operations, and system status</li>
              <li>AI interactions and module performance analytics</li>
            </ul>
          </Section>

          <Section title="2. How We Use Your Information">
            <p>Your information is used to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Activate and manage licenses</li>
              <li>Fulfill service requests and payments</li>
              <li>Secure and monitor systems for threats and healing</li>
              <li>Generate compliance and audit reports</li>
              <li>Improve product performance and AI modules</li>
            </ul>
          </Section>

          <Section title="3. Data Security">
            <p>We implement robust security measures to protect your data:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>All communications are encrypted using HTTPS.</li>
              <li>Backend protected via API keys and modern authentication standards.</li>
              <li>Input validation and Web3 transaction verification.</li>
              <li>Immutable logging for compliance.</li>
            </ul>
          </Section>

          <Section title="4. Storage and Retention">
            <p>We store and retain data responsibly:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Data is stored in encrypted databases (e.g., PostgreSQL).</li>
              <li>Data retained only as long as necessary for legal and operational purposes.</li>
            </ul>
          </Section>

          <Section title="5. Third-Party Services">
            <p>We partner with trusted third-party services:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Payment processors (e.g., Stripe).</li>
              <li>Blockchain networks (e.g., Ethereum, BSC, TRON, Cronos).</li>
              <li>Compliance modules integrate with trusted service providers only.</li>
            </ul>
          </Section>

          <Section title="6. User Rights">
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Request access to or deletion of your data.</li>
              <li>Opt out of analytics where applicable.</li>
              <li>Request correction of incorrect information.</li>
            </ul>
          </Section>

          <Section title="7. Token-Based Access">
            <p>Users paying with SFXC tokens for one-time services agree to our Terms of Use and this Privacy Policy. Token transactions are logged on-chain and used only for verification purposes.</p>
          </Section>

          <Section title="8. Changes to This Policy">
            <p>We may update this policy. Material changes will be notified via email or in-app messages.</p>
          </Section>

          <Section title="9. Contact">
            <p>For questions or requests, please contact us at: <a href="mailto:privacy@selfix.pro" className="text-primary hover:underline">privacy@selfix.pro</a></p>
          </Section>
        </motion.div>
      </div>
    </>
  );
};

export default PrivacyPolicyPage;