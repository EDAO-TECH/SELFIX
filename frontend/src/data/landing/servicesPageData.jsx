import React from 'react';
import { User, Users } from 'lucide-react';

export const basePackages = [
  {
    id: 'solo',
    name: 'Solo Plan',
    price: '$25/month AUD',
    icon: <User className="w-10 h-10 text-primary" />,
    features: [
      '1 Device License',
      'Entropy Monitoring',
      'Autonomous Healing Engine',
      'Mini Monitor Dashboard',
      'SmartLicense-X™ Verification'
    ]
  },
  {
    id: 'family',
    name: 'Family Plan',
    price: '$49/month AUD',
    icon: <Users className="w-10 h-10 text-primary" />,
    features: [
      'Up to 3 Devices',
      'All Solo features',
      'Clustered Healing Logic',
      'Karma Ledger Sharing'
    ]
  }
];

export const addOnServices = [
  { feature: 'AI Healing Dashboard (Full)', monthlyPrice: '$5', spxcCost: '20 SPXC' },
  { feature: 'Rollback Engine', monthlyPrice: '$7', spxcCost: '30 SPXC' },
  { feature: 'Trap Logic™', monthlyPrice: '$6', spxcCost: '25 SPXC' },
  { feature: 'Compliance Reports', monthlyPrice: '$4', spxcCost: '20 SPXC' },
  { feature: 'Book of Forgiveness', monthlyPrice: '$5', spxcCost: '25 SPXC' },
  { feature: 'CLI AI Chat Interface', monthlyPrice: '$6', spxcCost: '25 SPXC' },
  { feature: 'Seeder Agents', monthlyPrice: '$10', spxcCost: '50 SPXC' },
];