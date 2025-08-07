import React from 'react';
import { User, Server, FileCheck, Code, Bot } from 'lucide-react';

export const intentData = [
  { 
    id: 'personal', 
    label: 'Personal Device', 
    icon: <User className="w-8 h-8 mb-2" />, 
    defaultModules: ['antivirus', 'ai-healing'] 
  },
  { 
    id: 'business', 
    label: 'Business Servers', 
    icon: <Server className="w-8 h-8 mb-2" />, 
    defaultModules: ['antivirus', 'ai-healing', 'rollback-engine', 'legal-logging', 'trap-logic']
  },
  { 
    id: 'compliance', 
    label: 'Compliance & Legal', 
    icon: <FileCheck className="w-8 h-8 mb-2" />, 
    defaultModules: ['antivirus', 'legal-logging', 'compliance-reports']
  },
  { 
    id: 'developer', 
    label: 'API & Dev Environments', 
    icon: <Code className="w-8 h-8 mb-2" />, 
    defaultModules: ['antivirus', 'ai-healing', 'rollback-engine', 'healing-vault']
  },
  { 
    id: 'advanced', 
    label: 'Advanced AI Healing', 
    icon: <Bot className="w-8 h-8 mb-2" />, 
    defaultModules: ['antivirus', 'ai-healing', 'rollback-engine', 'healing-vault', 'trap-logic']
  },
];

export const modulesData = [
  { id: 'antivirus', name: 'Antivirus & Scanner', description: 'Real-time malware protection', monthlyPrice: 0, tokenPrice: 0, nftUnlock: 'All tiers' },
  { id: 'ai-healing', name: 'AI Healing Engine', description: 'Auto-diagnosis & entropy repair', monthlyPrice: 15, tokenPrice: 1000, nftUnlock: 'Txxx+' },
  { id: 'rollback-engine', name: 'Rollback Engine', description: 'One-click restoration of corrupted files', monthlyPrice: 12, tokenPrice: 800, nftUnlock: 'Nxxx+' },
  { id: 'legal-logging', name: 'Legal Logging', description: 'Immutable, timestamped audit logs', monthlyPrice: 9, tokenPrice: 600, nftUnlock: 'Txxx+' },
  { id: 'healing-vault', name: 'Healing Modules Vault', description: 'Evolving healing logic from DAO vault', monthlyPrice: 20, tokenPrice: 1500, nftUnlock: 'Sxxx+/Nxxx+' },
  { id: 'trap-logic', name: 'Trap Logic™', description: 'Intrusion trap and attacker deception', monthlyPrice: 10, tokenPrice: 750, nftUnlock: 'Pro+/NFT' },
  { id: 'compliance-reports', name: 'Compliance Reports', description: 'Signed audit-ready reports (PDF/JSON)', monthlyPrice: 8, tokenPrice: 600, nftUnlock: 'Enterprise' },
];

export const pathComparisonData = [
    { path: 'Subscription', goodFor: 'Simple monthly security', ownership: '❌ No', roiPotential: 'Low', karmaScore: 'Low', roiColor: '#f87171', karmaColor: '#f87171' },
    { path: 'SFXC Token Use', goodFor: 'Crypto users, devs, stakers', ownership: '🔁 Partial', roiPotential: 'Medium', karmaScore: 'Medium', roiColor: '#fbbf24', karmaColor: '#fbbf24' },
    { path: 'NFT Ownership', goodFor: 'Long-term IP investors', ownership: '✅ Full', roiPotential: 'High', karmaScore: 'Very High', roiColor: '#4ade80', karmaColor: '#4ade80', highlight: true },
];