import React from 'react';
import { Cpu, Zap, Layers, BookOpen, Scaling, FileLock2 } from 'lucide-react';

export const productOverview = [
    {
        icon: <Cpu className="w-8 h-8 text-primary" />,
        title: "AI Healing Engine",
        description: "Autonomous AI that identifies, diagnoses, and self-heals system logic in real-time."
    },
    {
        icon: <Zap className="w-8 h-8 text-primary" />,
        title: "Trap Logic™",
        description: "Deception-based defense that sets digital traps and uses attacker behavior against them."
    },
    {
        icon: <Layers className="w-8 h-8 text-primary" />,
        title: "Liquid API Layer",
        description: "A dynamic API system that changes behavior based on trust, entropy, and smart licensing."
    },
];


export const coreTechModules = [
    {
        title: 'AI Healing Engine',
        icon: <Cpu className="w-10 h-10 text-primary" />,
        whatItIs: 'An autonomous, AI-driven module that identifies, diagnoses, and self-heals corrupted files, configurations, or system logic in real time.',
        problemSolved: 'Traditional cybersecurity stops threats—but doesn’t fix the damage. This engine actively repairs what’s broken, reducing downtime and eliminating manual remediation.',
        howItWorks: [
            'Uses entropy modeling and anomaly detection',
            'Builds a “health snapshot” of the system',
            'When deviation is detected, it triggers real-time rollback or reconfiguration',
            'Integrates with “Book of Forgiveness” for clean restoration'
        ],
        defensibility: [
            'Combines behavioral and structural healing (most tools do only one)',
            'Proprietary entropy scoring system',
            'Designed for autonomous, not reactive, healing'
        ],
        investorAngle: [
            'Creates a new category: "Self-healing cybersecurity"',
            'Reduces support cost for enterprise clients',
            'Stickiness: the more it heals, the more value it stores per system'
        ]
    },
    {
        title: 'Trap Logic™',
        icon: <Zap className="w-10 h-10 text-primary" />,
        whatItIs: 'A deception-based defense system that sets digital traps and uses attacker behavior against them.',
        problemSolved: 'Sophisticated threats bypass traditional antivirus. Trap Logic™ identifies and contains attackers in real-time, often without them knowing.',
        howItWorks: [
            'Deploys fake services, files, or endpoints',
            'Triggers based on entropy volatility and behavioral deltas',
            'Redirects intruders to “Black Hole,” “Echo,” or “White Hole” traps',
            'Feeds threat data back to the DAO'
        ],
        defensibility: [
            'Proprietary trap types + adaptive routing logic',
            'Blends deception and telemetry in one layer'
        ],
        investorAngle: [
            'Captures high-value threat data',
            'Differentiator in crowded endpoint security space',
            'Creates real-time security intelligence'
        ]
    },
    {
        title: 'Liquid API Layer',
        icon: <Layers className="w-10 h-10 text-primary" />,
        whatItIs: 'A dynamic API system that changes behavior based on trust, entropy, and smart licensing.',
        problemSolved: 'APIs are static and vulnerable. Liquid API is adaptive—each call is evaluated based on the agent’s reputation, entropy, and context.',
        howItWorks: [
            'Uses a probabilistic access model (Powerball-style)',
            'Smart contracts control endpoint access',
            'Redirects untrusted or unstable calls to simulated traps',
            'Links to KarmaNFT for revocation, gating, and access shaping'
        ],
        defensibility: [
            'Unique stochastic + trust-based API control model',
            'DAO-driven ruleset = programmable compliance'
        ],
        investorAngle: [
            'First adaptive API gateway governed by ethical credentials',
            'Monetizable via pay-per-access, trust-tiers, or token tolls',
            'Fits into cloud, DeFi, and Web3 security stacks'
        ]
    },
    {
        title: 'Book of Forgiveness',
        icon: <BookOpen className="w-10 h-10 text-primary" />,
        whatItIs: 'An intelligent ledger of trusted, health-certified versions of critical scripts and logic.',
        problemSolved: 'When systems are attacked, even clean-up leaves damage. This module preserves known-good logic for instant, verifiable recovery.',
        howItWorks: [
            'During pre-checks, it inspects & validates key scripts',
            'Creates compressed, signed versions',
            'Stores in encrypted archive',
            'Acts as rollback anchor + legal evidence'
        ],
        defensibility: [
            'Immune memory for machines',
            'Linked to Healing Engine + Vault + SmartLicense'
        ],
        investorAngle: [
            'Turns every healing action into future resilience',
            'Enterprise/gov customers can map this to compliance/audit controls',
            'Enables premium upsells (backup as a service, legal log proof)'
        ]
    },
    {
        title: 'Entropy Framework',
        icon: <Scaling className="w-10 h-10 text-primary" />,
        whatItIs: 'The real-time scoring system that measures chaos, trust, and volatility in users, files, and requests.',
        problemSolved: 'Security often misses subtle risk signals. Entropy lets SELFIX predict instability before it becomes damage.',
        howItWorks: [
            'Scores every action or file in entropy',
            'Triggers traps, healing, or throttling',
            'Inputs into every SELFIX module',
            'Can weight trust, risk, urgency, or cost'
        ],
        defensibility: [
            'Custom entropy algorithm tuned to security logic',
            'Acts as a behavioral OS for the entire system'
        ],
        investorAngle: [
            'Powers predictive defense',
            'Monetizable via entropy-based pricing or throttling (e.g., higher risk = higher token cost)',
            'Licensable across other security layers'
        ]
    },
    {
        title: 'SmartLicense-X™ + KarmaNFT',
        icon: <FileLock2 className="w-10 h-10 text-primary" />,
        whatItIs: "A programmable, revocable, ethics-bound license tied to a user or agent's behavior.",
        problemSolved: "You can’t trust agents forever based on static credentials. KarmaNFT reflects ongoing ethical reputation and can change in real-time.",
        howItWorks: [
            'SmartLicense-X validates software rights and ethical access',
            'KarmaNFT includes: Entropy history, Quiz results (from EthicsEngine), DAO approval state',
            'Used to gate access to sensitive features or APIs'
        ],
        defensibility: [
            'First behavioral NFT for software access',
            'Integrates ethics, identity, and revocation logic'
        ],
        investorAngle: [
            'New licensing model = per-user access bound to ethics',
            'Enables compliance automation and AI governance',
            'Opens DAO-based marketplace for licensing and arbitration'
        ]
    }
];