import React from 'react';
import { Shield, Cpu, Goal, FileLock2, LayoutDashboard, FileText, Box, History, Globe, Puzzle, Terminal, Sprout, Archive, PackagePlus, TerminalSquare, ClipboardCheck, BookOpenCheck, Wifi } from 'lucide-react';

export const allServicesData = [
  {
    icon: <Shield className="w-8 h-8 text-primary" />,
    name: 'Antivirus & Scanner',
    whatItIs: 'Real-time threat scanning using both signature-based and heuristic analysis.',
    whyItMatters: 'Your first line of defense, stopping common viruses and malware before they can do harm.',
    tiers: 'All Tiers'
  },
  {
    icon: <Cpu className="w-8 h-8 text-primary" />,
    name: 'AI Healing Engine',
    whatItIs: 'Automatic file and system correction driven by our Entropy Healing AI.',
    whyItMatters: 'Proactively fixes the root causes of system instability, not just the symptoms of an attack.',
    tiers: 'Pro, Enterprise, NFT'
  },
  {
    icon: <Goal className="w-8 h-8 text-primary" />,
    name: 'Trap Logic™',
    whatItIs: 'Deception-based anti-intrusion system that lays digital traps for attackers.',
    whyItMatters: 'Turns attackers\' own methods against them, catching sophisticated threats that bypass traditional defenses.',
    tiers: 'Pro, Enterprise'
  },
  {
    icon: <FileLock2 className="w-8 h-8 text-primary" />,
    name: 'SmartLicense-X™',
    whatItIs: 'A programmable, verifiable local access license that embeds rules into the code.',
    whyItMatters: 'Guarantees transparent, ethical, and legally compliant software behavior you can verify yourself.',
    tiers: 'All Tiers'
  },
  {
    icon: <LayoutDashboard className="w-8 h-8 text-primary" />,
    name: 'Healing Dashboard',
    whatItIs: 'A local GUI and web panel displaying entropy graphs and real-time healing events.',
    whyItMatters: 'Gives you a clear, transparent view of your system’s health and all actions SELFIX takes.',
    tiers: 'Pro, Enterprise'
  },
  {
    icon: <FileText className="w-8 h-8 text-primary" />,
    name: 'Legal Logging',
    whatItIs: 'Immutable daily audit logs are automatically generated and archived for legal purposes.',
    whyItMatters: 'Creates a verifiable, timestamped record of system events for compliance and legal proof.',
    tiers: 'All Tiers'
  },
  {
    icon: <Box className="w-8 h-8 text-primary" />,
    name: 'Module Sandbox',
    whatItIs: 'A secure environment for executing and testing new healing modules with GPG validation.',
    whyItMatters: 'Allows for the safe testing and deployment of new capabilities without risking system integrity.',
    tiers: 'Pro, Enterprise, NFT'
  },
  {
    icon: <History className="w-8 h-8 text-primary" />,
    name: 'Rollback Engine',
    whatItIs: 'Provides instant, one-click rollback of any files corrupted or infected by an attack.',
    whyItMatters: 'Instantly reverses damage from an attack, minimizing downtime and data loss.',
    tiers: 'Enterprise, NFT'
  },
  {
    icon: <Globe className="w-8 h-8 text-primary" />,
    name: 'GUI Web Control',
    whatItIs: 'A simple, locally-hosted web dashboard for managing SELFIX from any browser.',
    whyItMatters: 'Provides an accessible, user-friendly interface for controlling SELFIX, no technical skill required.',
    tiers: 'All Tiers (Limited in Free)'
  },
  {
    icon: <Puzzle className="w-8 h-8 text-primary" />,
    name: 'Healing Modules',
    whatItIs: 'Modular healing logic extensions delivered via GitHub or a secure vault.',
    whyItMatters: 'Allows your protection to evolve, adapting with new, specialized healing capabilities as threats change.',
    tiers: 'Pro (Limited), Full in Enterprise/NFT'
  },
  {
    icon: <Terminal className="w-8 h-8 text-primary" />,
    name: 'Local CLI AI Chat',
    whatItIs: 'A natural language command interface for interacting with the healing engine.',
    whyItMatters: 'Control complex security operations and get instant insights using simple, conversational commands.',
    tiers: 'Pro, NFT'
  },
  {
    icon: <Sprout className="w-8 h-8 text-primary" />,
    name: 'Seeder Agents',
    whatItIs: 'Automated agents that coordinate healing strategies across multiple devices.',
    whyItMatters: 'Creates a swarm intelligence that learns from threats on one device to protect all devices.',
    tiers: 'Enterprise, NFT'
  },
  {
    icon: <Archive className="w-8 h-8 text-primary" />,
    name: 'Vault Management',
    whatItIs: 'A GPG-signed archive of "golden" healing modules, with promotion managed by the DAO.',
    whyItMatters: 'Ensures that only the most effective and rigorously-tested healing code runs on your system.',
    tiers: 'Enterprise, DAO only'
  },
  {
    icon: <PackagePlus className="w-8 h-8 text-primary" />,
    name: 'Installer Builds',
    whatItIs: 'GUI application installers for Windows, macOS, and Linux, built via CI/CD.',
    whyItMatters: 'Ensures easy, secure, and reproducible deployment of SELFIX across any platform.',
    tiers: 'All Tiers (CLI); Enterprise (with support)'
  },
  {
    icon: <TerminalSquare className="w-8 h-8 text-primary" />,
    name: 'SmartLicense CLI',
    whatItIs: 'A command-line tool for validating and managing your license status locally.',
    whyItMatters: 'Easily verify, renew, or upgrade your license directly from your terminal—no cloud login needed.',
    tiers: 'All Tiers'
  },
  {
    icon: <ClipboardCheck className="w-8 h-8 text-primary" />,
    name: 'Compliance Reports',
    whatItIs: 'Generates system summaries and logs formatted for formal audits (PDF/JSON).',
    whyItMatters: 'Generate a signed, audit-ready report with one click, simplifying regulatory readiness.',
    tiers: 'Enterprise'
  },
  {
    icon: <BookOpenCheck className="w-8 h-8 text-primary" />,
    name: 'Book of Forgiveness',
    whatItIs: 'An intelligent engine that inspects, verifies, compresses, and securely stores health-certified copies of your system’s operational scripts and configurations.',
    whyItMatters: 'Preserves a tamper-proof archive of trusted logic. When attacks damage or alter key files, the system can immediately restore known-good versions with confidence.',
    tiers: 'Pro, Enterprise, NFT'
  },
  {
    icon: <Wifi className="w-8 h-8 text-primary" />,
    name: 'Anonymous VPN',
    whatItIs: 'A secure, no-log VPN service to encrypt your internet connection and hide your IP address.',
    whyItMatters: 'Protects your online privacy, secures your data on public Wi-Fi, and bypasses censorship.',
    tiers: 'Pro, Enterprise, NFT'
  },
];