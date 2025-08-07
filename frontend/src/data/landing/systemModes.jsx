import React from 'react';
import { Shield, Zap, HeartHandshake } from 'lucide-react';

export const systemModesData = [
  {
    icon: <Shield className="w-10 h-10" />,
    title: "Autonomous Mode",
    description: "Full self-healing active. SELFIX automatically neutralizes threats and repairs system entropy.",
    details: "Triggers only on confirmed malicious activity or high entropy.",
    color: "green"
  },
  {
    icon: <Zap className="w-10 h-10" />,
    title: "Passive Monitor",
    description: "Watching system integrity, healing paused. Provides alerts and logs potential issues.",
    details: "Some entropy found or suspicious activity detected.",
    color: "yellow"
  },
  {
    icon: <HeartHandshake className="w-10 h-10" />,
    title: "Quarantine",
    description: "System locked down for critical threats. Manual review and HQ escalation may be required.",
    details: "Critical threat detected, system isolated for safety.",
    color: "red"
  }
];