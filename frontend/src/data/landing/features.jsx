import React from 'react';
import { Activity, Cpu, HeartHandshake, LayoutDashboard, Sprout, ShieldCheck, TerminalSquare, Github, MessageSquare, Rocket, ServerCog, UploadCloud, KeyRound, Coins, Gem, Building, Gavel, Settings2, FileText } from 'lucide-react';

export const tieredFeaturesData = {
  core: {
    title: 'Core Features',
    subtitle: 'Free for All Users',
    features: [
      { name: 'Entropy Monitoring', description: 'Detect system instability and threat patterns in real-time.', icon: <Activity /> },
      { name: 'Autonomous Healing Engine', description: 'AI triggers local healing modules based on detected entropy.', icon: <Cpu /> },
      { name: 'Karma Ledger', description: 'Each system has a trust score that affects healing outcomes.', icon: <HeartHandshake /> },
      { name: 'Mini Monitor Dashboard', description: 'View healing activity, entropy status, and karma logs locally.', icon: <LayoutDashboard /> },
      { name: 'Seeder Agent', description: 'Automatically installs trusted healing modules and manages updates.', icon: <Sprout /> },
      { name: 'SmartLicense-X™ Verification', description: 'Ensures ethical, licensed use under digital law compliance.', icon: <ShieldCheck /> },
      { name: 'SmartLicense CLI Management', description: 'Verify your license status in one command — no cloud, no login.', icon: <TerminalSquare /> },
      { name: 'Manual GitHub-Integrated Builds', description: 'Build secure apps directly from code using provided scripts.', icon: <Github /> },
    ],
  },
  premium: {
    title: 'Premium Services',
    subtitle: 'Powered by SPXC Token',
    features: [
      { name: 'Chat with Local AI Agent', description: 'Get advice, insights, or diagnostics from your AI healing companion.', requiresSpcx: true, icon: <MessageSquare /> },
      { name: 'Early Access to New Modules', description: 'Use cutting-edge healing logic before public release.', requiresSpcx: true, icon: <Rocket /> },
      { name: 'Remote Node Management', description: 'Securely control your SELFIX node from HQ.', requiresSpcx: true, icon: <ServerCog /> },
      { name: 'Forensic Reports & Cloud Backup', description: 'Export healing logs, karma shifts, and entropy events for audits.', requiresSpcx: true, icon: <UploadCloud /> },
      { name: 'Vault & GPG-Signed Modules', description: 'Only GPG-signed healing modules are executed — sandboxed, trusted, and transparent.', requiresSpcx: true, icon: <KeyRound /> },
      { name: 'Token-Based Healing Payments', description: 'Use $SPXC to unlock healing services, seed networks, or promote trusted modules.', requiresSpcx: true, icon: <Coins /> },
      { name: 'NFT License & DAO Access', description: 'Own your antivirus. SELFIX NFT licenses grant lifetime access and DAO power.', requiresSpcx: true, icon: <Gem /> },
    ],
  },
  enterprise: {
    title: 'Enterprise Features',
    subtitle: 'Custom or High-Stake Access',
    features: [
      { name: 'On-Premise SELFIX Deployment', description: 'For regulated industries, defense environments, or custom use cases.', icon: <Building /> },
      { name: 'Compliance-Aligned Healing', description: 'Tailor healing protocols for standards like HIPAA, ISO27001.', icon: <Gavel /> },
      { name: 'Programmable AI Governance via HQ', description: 'Define and enforce custom operational rules and ethics for your AI fleet.', icon: <Settings2 /> },
      { name: 'DAO-Signed Access & Licensing', description: 'Secure, verifiable access and licensing credentials managed by the DAO.', icon: <KeyRound /> },
      { name: 'Compliance Reporting & Snapshots', description: 'Generate a signed compliance report for any scan — built-in regulatory readiness.', icon: <FileText /> },
      { name: 'Automated GitHub-Integrated Builds', description: 'Automated CI/CD build scripts for all platforms using GitHub Actions.', icon: <Github /> },
    ]
  }
};