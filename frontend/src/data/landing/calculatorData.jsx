import React from 'react';
import { Shield, Goal, History, Cpu, LayoutDashboard, Puzzle, Box, Sprout, Archive, Terminal, Globe, FileText, FileLock2, TerminalSquare, ClipboardCheck, HelpCircle } from 'lucide-react';

export const calculatorData = {
  userTypes: [
    { id: 'individual', name: 'Individual', devices: 1, basePricePerDevice: 15, description: "For personal use on a single device." },
    { id: 'family', name: 'Family', minDevices: 2, maxDevices: 5, basePricePerDevice: 12, description: "Protect all your family's devices." },
    { id: 'pro', name: 'Pro / Developer', minDevices: 1, maxDevices: 3, basePricePerDevice: 25, description: "For technical users and creators." },
    { id: 'commercial', name: 'Commercial', minDevices: 5, maxDevices: 50, basePricePerDevice: 22, description: "For small to medium businesses." },
    { id: 'government', name: 'Government / Critical Infrastructure', custom: true, description: "Custom licensing for critical sectors." },
  ],
  services: {
    coreSecurity: {
      name: 'Core Security',
      icon: <Shield />,
      items: [
        { id: 'antivirus', name: 'Antivirus & Scanner', price: 2, description: 'Real-time threat scanning using both signature-based and heuristic analysis.' },
        { id: 'trapLogic', name: 'Trap Logic™', price: 3, description: 'Deception-based anti-intrusion system that lays digital traps for attackers.' },
        { id: 'rollbackEngine', name: 'Rollback Engine', price: 4, description: 'Provides instant, one-click rollback of any files corrupted or infected.' },
      ]
    },
    healing: {
      name: 'Healing',
      icon: <Cpu />,
      items: [
        { id: 'aiHealingEngine', name: 'AI Healing Engine', price: 5, description: 'Automatic file and system correction driven by our Entropy Healing AI.' },
        { id: 'healingDashboard', name: 'Healing Dashboard', price: 1, description: 'A local GUI and web panel displaying entropy graphs and healing events.' },
        { id: 'healingModules', name: 'Healing Modules', price: 3, description: 'Modular healing logic extensions delivered via GitHub or a secure vault.' },
        { id: 'moduleSandbox', name: 'Module Sandbox', price: 2, description: 'A secure environment for executing and testing new healing modules.' },
        { id: 'bookOfForgiveness', name: 'Book of Forgiveness', price: 4, description: 'Securely stores health-certified copies of your system’s scripts for instant restoration.' }
      ]
    },
    intelligenceControl: {
      name: 'Intelligence & Control',
      icon: <Sprout />,
      items: [
        { id: 'seederAgents', name: 'Seeder Agents', price: 4, description: 'Automated agents that coordinate healing strategies across multiple devices.' },
        { id: 'vaultManagement', name: 'Vault Management', price: 3, description: 'A GPG-signed archive of "golden" healing modules, managed by the DAO.' },
        { id: 'localCliAiChat', name: 'Local CLI AI Chat', price: 2, description: 'A natural language command interface for interacting with the healing engine.' },
        { id: 'guiWebControl', name: 'GUI Web Control', price: 1, description: 'A simple, locally-hosted web dashboard for managing SELFIX.' },
      ]
    },
    complianceAdmin: {
      name: 'Compliance & Admin',
      icon: <FileText />,
      items: [
        { id: 'legalLogging', name: 'Legal Logging', price: 2, description: 'Immutable daily audit logs are automatically generated and archived.' },
        { id: 'smartlicenseX', name: 'SmartLicense-X™', price: 1, description: 'A programmable, verifiable local access license that embeds rules into the code.' },
        { id: 'smartlicenseCli', name: 'SmartLicense CLI', price: 1, description: 'A command-line tool for validating and managing your license status locally.' },
        { id: 'complianceReports', name: 'Compliance Reports', price: 5, description: 'Generates system summaries and logs formatted for formal audits.' },
      ]
    },
  },
  billingCycles: [
    { id: 'monthly', name: 'Monthly', discount: 0 },
    { id: 'quarterly', name: 'Quarterly', discount: 0.05 },
    { id: 'yearly', name: 'Yearly', discount: 0.15 },
  ]
};