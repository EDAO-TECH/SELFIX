import React from 'react';
import { BookOpen, Video, ShieldCheck, BarChart } from 'lucide-react';

export const activeProposals = [
    { title: 'Upgrade Healing Engine to v2.2', type: 'Tech', status: 'Voting Open', deadline: 'July 15', statusColor: 'bg-green-500/20 text-green-400' },
    { title: 'License NFT F012 for LATAM', type: 'Legal', status: 'Pending', deadline: 'July 10', statusColor: 'bg-yellow-500/20 text-yellow-400' },
    { title: 'Allocate Vault Karma Rewards', type: 'Treasury', status: 'Voting', deadline: 'July 18', statusColor: 'bg-green-500/20 text-green-400' },
];

export const myGovernanceRights = [
    { nft: 'N012', class: 'Patent', votes: '3', proposalAccess: '✅ Yes', role: 'Governance' },
    { nft: 'T015', class: 'Project', votes: '1', proposalAccess: '❌ No', role: 'Observer' },
    { nft: 'S003', class: 'Vault', votes: '10', proposalAccess: '✅ Yes', role: 'Chair Role' },
];

export const daoConstitutionLinks = [
    { label: 'DAO Charter & Rules', icon: <BookOpen className="mr-2 h-4 w-4" /> },
    { label: 'How to Govern', icon: <Video className="mr-2 h-4 w-4" /> },
    { label: 'SmartLicense Policy', icon: <ShieldCheck className="mr-2 h-4 w-4" /> },
    { label: 'Vault APY Logic', icon: <BarChart className="mr-2 h-4 w-4" /> },
];