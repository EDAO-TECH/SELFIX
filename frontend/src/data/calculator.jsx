import React from 'react';
import { Shield, Cpu, Goal, History, LayoutDashboard, Puzzle, Box, Sprout, Archive, Terminal, Globe, FileText, FileLock2, TerminalSquare, ClipboardCheck, User, Users, Code, Building, Landmark } from 'lucide-react';

export const userTypes = [
  { id: 'individual', name: 'Individual', devices: 1, icon: <User className="w-6 h-6" />, basePrice: 10 },
  { id: 'family', name: 'Family', devices: 5, icon: <Users className="w-6 h-6" />, basePrice: 25 },
  { id: 'pro', name: 'Pro / Developer', devices: 3, icon: <Code className="w-6 h-6" />, basePrice: 40 },
  { id: 'commercial', name: 'Commercial', devices: 5, minDevices: 5, maxDevices: 50, icon: <Building className="w-6 h-6" />, basePrice: 100 },
  { id: 'government', name: 'Government', devices: 'Custom', icon: <Landmark className="w-6 h-6" />, basePrice: 'Custom' },
];

export const serviceCategories = {
  coreSecurity: {
    name: 'Core Security',
    icon: <Shield className="w-5 h-5 mr-2" />,
    services: [
      { id: 'antivirus', name: 'Antivirus & Scanner', price: 5, description: 'Real-time threat scanning (signature + heuristic).' },
      { id: 'trapLogic', name: 'Trap Logic™', price: 8, description: 'Deception-based anti-intrusion logic.' },
      { id: 'rollbackEngine', name: 'Rollback Engine', price: 10, description: 'Instant rollback of corrupted or infected files.' },
    ]
  },
  healing: {
    name: 'Healing',
    icon: <Cpu className="w-5 h-5 mr-2" />,
    services: [
      { id: 'aiHealing', name: 'AI Healing Engine', price: 15, description: 'Entropy healing: automatic file/system correction.' },
      { id: 'healingDashboard', name: 'Healing Dashboard', price: 5, description: 'Local GUI + web panel for entropy graphs, healing events.' },
      { id: 'healingModules', name: 'Healing Modules', price: 7, description: 'Modular healing logic extensions (via GitHub or vault).' },
      { id: 'moduleSandbox', name: 'Module Sandbox', price: 5, description: 'Karma-tested plugin execution (trust scope + GPG validation).' },
    ]
  },
  intelligence: {
    name: 'Intelligence & Control',
    icon: <Sprout className="w-5 h-5 mr-2" />,
    services: [
      { id: 'seederAgents', name: 'Seeder Agents', price: 12, description: 'Automate healing coordination across devices.' },
      { id: 'vaultManagement', name: 'Vault Management', price: 10, description: 'Golden module archive with staging + promotion via DAO.' },
      { id: 'cliAiChat', name: 'Local CLI AI Chat', price: 8, description: 'Natural language command interface to healing engine.' },
      { id: 'guiWebControl', name: 'GUI Web Control', price: 4, description: 'Launches Flask dashboard locally at http://localhost:5000.' },
    ]
  },
  compliance: {
    name: 'Compliance & Admin',
    icon: <FileText className="w-5 h-5 mr-2" />,
    services: [
      { id: 'legalLogging', name: 'Legal Logging', price: 5, description: 'Daily audit logs saved to /docs/legal_archive/.' },
      { id: 'smartLicenseX', name: 'SmartLicense-X™', price: 10, description: 'Programmable, verifiable local access license.' },
      { id: 'smartLicenseCli', name: 'SmartLicense CLI', price: 3, description: 'selfix_license_check.py – license validation enforcement.' },
      { id: 'complianceReports', name: 'Compliance Reports', price: 15, description: 'System summaries & logs formatted for audits.' },
    ]
  }
};

export const billingCycles = [
    { id: 'monthly', name: 'Monthly', discount: 0 },
    { id: 'quarterly', name: 'Quarterly', discount: 0.05 },
    { id: 'yearly', name: 'Yearly', discount: 0.15 },
];