import React from 'react';
import { Coins, Award, ShieldQuestion, Zap, Gift, BarChart2, CheckCircle, ArrowRight } from 'lucide-react';

export const spcxData = {
  hero: {
    title: "SELFIX Credits: What is SPXC?",
    subtitle: "Your System. Your Security. Your Currency.",
    tagline: "Earn trust. Unlock healing. Stay in control."
  },
  whatItIs: {
    title: "What is SPXC?",
    content: "SPXC is your reward for taking control of your system’s health. Unlike points or gimmicks, SPXC reflects trust, action, and responsibility inside SELFIX."
  },
  usage: {
    title: "What is SPXC Used For?",
    description: "Use SPXC to unlock extended features, advanced healing, or save on subscriptions—without committing upfront.",
    items: [
      { action: 'Unlock 1 day of Rollback Engine', cost: '15 SPXC', icon: <Zap className="w-6 h-6 text-primary"/> },
      { action: 'Generate full Compliance Report', cost: '25 SPXC', icon: <BarChart2 className="w-6 h-6 text-primary"/> },
      { action: 'Access new Healing Module (sandbox)', cost: '20 SPXC', icon: <Zap className="w-6 h-6 text-primary"/> },
      { action: 'Discount 10% on Pro Upgrade', cost: '50 SPXC', icon: <Gift className="w-6 h-6 text-primary"/> }
    ]
  },
  earning: {
    title: "How You Earn SPXC",
    description: "You earn SPXC by securing, healing, and exploring SELFIX:",
    items: [
      { action: 'Run a full scan', reward: '+1 SPXC', icon: <Award className="w-6 h-6 text-green-500"/> },
      { action: 'Use AI Healing Engine', reward: '+2 SPXC', icon: <Award className="w-6 h-6 text-green-500"/> },
      { action: 'Use all 5 selected services in trial', reward: '+15 SPXC', icon: <Award className="w-6 h-6 text-green-500"/> },
      { action: 'Submit a feedback or improvement tip', reward: '+3 SPXC', icon: <Award className="w-6 h-6 text-green-500"/> },
      { action: 'Refer a trusted user', reward: '+10 SPXC', icon: <Award className="w-6 h-6 text-green-500"/> }
    ],
    note: "The more proactive and secure your behavior, the more you earn."
  },
  howItsDifferent: {
    title: "How It’s Different",
    description: "SPXC isn’t just “points.” It’s:",
    points: [
      { title: "A security performance token", icon: <ShieldQuestion className="w-6 h-6 text-primary"/> },
      { title: "A compliance and resilience reward", icon: <BarChart2 className="w-6 h-6 text-primary"/> },
      { title: "A tool for unlocking real healing power", icon: <Zap className="w-6 h-6 text-primary"/> },
    ]
  },
  getStarted: {
    title: "New User? Here’s How to Start:",
    steps: [
      "Pick 5 premium features for your 14-day free trial",
      "Explore and use them—each earns SPXC",
      "Spend your SPXC on what matters most to you",
      "Continue with earned credits or upgrade to a plan anytime"
    ],
    cta: "Start Your Free Trial"
  }
};