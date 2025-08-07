import React from 'react';
import { User, Users, Briefcase, Shield } from 'lucide-react';

export const pricingPlans = [
  {
    id: "prod_SUXkMLsckbT76A",
    name: "SELFIX Individual",
    icon: <User className="w-8 h-8 mx-auto mb-4 text-primary"/>,
    description: "Basic SELFIX healing engine for 1 personal device (Windows/macOS/Linux). Real-time entropy scan, autonomous repair, local AI assist.",
    prices: [
      { priceId: "price_1RZYeoBekafS21xDfCqAXqRy", amount: 25.00, currency: "aud", interval: "month", intervalCount: 1, devices: 1, description: "Monthly subscription for 1 device." },
      { priceId: "price_1RZaOKBekafS21xDFRxILhHc", amount: 69.00, currency: "aud", interval: "month", intervalCount: 3, devices: 1, description: "3 months package for 1 device." },
      { priceId: "price_1RZaOKBekafS21xD40FsTMHi", amount: 133.00, currency: "aud", interval: "month", intervalCount: 6, devices: 1, description: "6 months package for 1 device." },
      { priceId: "price_1RZaOKBekafS21xDmKNYtpuv", amount: 210.00, currency: "aud", interval: "year", intervalCount: 1, devices: 1, description: "12 months package for 1 device." },
    ],
    features: [
      "1 Device License",
      "Entropy Monitoring",
      "Autonomous Healing Engine",
      "Mini Monitor Dashboard",
      "SmartLicense-X™ Verification"
    ],
    highlight: false,
  },
  {
    id: "prod_SUYqhHKhwPF9Cs",
    name: "SELFIX Family",
    icon: <Users className="w-8 h-8 mx-auto mb-4 text-primary"/>,
    description: "For small households. Activate healing on up to 3 devices. Includes family entropy sharing (cluster AI healing logic).",
    prices: [
      { priceId: "price_1RZZizBekafS21xDGG7Gxoy5", amount: 49.00, currency: "aud", interval: "month", intervalCount: 1, devices: 3, description: "Monthly subscription for up to 3 devices." },
      { priceId: "price_1RZawaBekafS21xDnISyvZ0o", amount: 133.00, currency: "aud", interval: "month", intervalCount: 3, devices: 3, description: "3 months package for up to 3 devices." },
      { priceId: "price_1RZazyBekafS21xDIK8cX0er", amount: 230.00, currency: "aud", interval: "month", intervalCount: 6, devices: 3, description: "6 months package for up to 3 devices." },
      { priceId: "price_1RZb29BekafS21xDV0VkLfYp", amount: 370.00, currency: "aud", interval: "year", intervalCount: 1, devices: 3, description: "12 months package for up to 3 devices." },
    ],
    features: [
      "Up to 3 Devices",
      "All Core Features",
      "Clustered Healing Logic",
      "Karma Ledger Sharing",
    ],
    highlight: true,
  },
  {
    id: "prod_SUYvl3uAA8dEg1",
    name: "SELFIX Home/Studio",
    icon: <Briefcase className="w-8 h-8 mx-auto mb-4 text-primary"/>,
    description: "Designed for prosumers, creators, and home servers. Advanced AI modules, karma rollback, and healing verifier engine across up to 5 nodes.",
    prices: [
      { priceId: "price_1RZZnuBekafS21xDcFIqhVxw", amount: 79.00, currency: "aud", interval: "month", intervalCount: 1, devices: 5, description: "Monthly subscription for up to 5 devices." },
      { priceId: "price_1RZb6LBekafS21xDmbXCIbvr", amount: 220.00, currency: "aud", interval: "month", intervalCount: 3, devices: 5, description: "3 months package for up to 5 devices." },
      { priceId: "price_1RZbAeBekafS21xDj2yF6Bus", amount: 410.00, currency: "aud", interval: "month", intervalCount: 6, devices: 5, description: "6 months package for up to 5 devices." },
      { priceId: "price_1RZbC5BekafS21xDy06J6l3n", amount: 650.00, currency: "aud", interval: "year", intervalCount: 1, devices: 5, description: "12 months package for up to 5 devices." },
    ],
    features: [
      "Up to 5 Devices/Nodes",
      "All Core Features",
      "Chat with Local AI Agent",
      "Early Access to New Modules",
      "Book of Forgiveness",
      "Priority Support"
    ],
    highlight: false,
  },
  {
    id: "prod_SUZFkZOmhtqYX3",
    name: "SELFIX PRO",
    icon: <Shield className="w-8 h-8 mx-auto mb-4 text-primary"/>,
    description: "Tailored enterprise protection, legal consulting, and custom NFT integration. Conditions applied on devices quantity.",
    prices: [
      { priceId: "price_1RZa6uBekafS21xD3CPhtl9I", amount: 299.00, currency: "aud", interval: "month", intervalCount: 1, devices: "Custom", description: "From $299/month. Contact for quote." },
    ],
    features: [
      "All Core & Premium Features",
      "On-Premise Deployment",
      "Compliance-Aligned Healing",
      "Programmable AI Governance",
      "Book of Forgiveness",
      "Dedicated AI Service Officer"
    ],
    highlight: false,
    contactForPricing: true,
  }
];