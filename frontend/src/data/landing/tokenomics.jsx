import React from 'react';
import { ShieldCheck, DatabaseZap, Vote, Repeat } from 'lucide-react';

export const nftClasses = [
    { symbol: 'Txxx', role: 'Project Access', utility: 'Full system use', supply: '108', multiplier: '1.1x' },
    { symbol: 'Nxxx', role: 'Patent Control', utility: 'Vault staking, proposal rights', supply: '108', multiplier: '1.25x' },
    { symbol: 'Fxxx', role: 'Field License', utility: 'Jurisdictional resale', supply: '108', multiplier: '1.5x' },
    { symbol: 'Sxxx', role: 'DAO Core', utility: 'Full governance & treasury', supply: '108', multiplier: '2.0x' },
];

export const nftUseCases = [
    { title: 'Lifetime Healing Access', description: 'Perpetual access to all healing modules.', icon: <ShieldCheck className="w-6 h-6 text-primary"/> },
    { title: 'Stake Boost & Yield', description: 'Boost your APY and earn from DAO vaults.', icon: <DatabaseZap className="w-6 h-6 text-primary"/> },
    { title: 'DAO Voting Rights', description: 'Influence the protocol direction.', icon: <Vote className="w-6 h-6 text-primary"/> },
    { title: 'Licensing Resale', description: 'For B2B, MSSP, and government contracts.', icon: <Repeat className="w-6 h-6 text-primary"/> },
];

export const stakingPoolsData = [
    { name: 'Entropy Vault', module: 'Healing Engine', lockPeriod: '180d', apy: '38%', status: 'Open', statusColor: 'bg-green-500/20 text-green-400' },
    { name: 'Trap Vault', module: 'Trap Logic™', lockPeriod: '90d', apy: '35%', status: 'Mid', statusColor: 'bg-yellow-500/20 text-yellow-400' },
    { name: 'Compliance Vault', module: 'Compliance Reporting', lockPeriod: '365d', apy: '42%', status: 'DAO-only', statusColor: 'bg-red-500/20 text-red-400' },
];

export const roiCalculatorData = {
    vaults: {
        'Entropy Vault': { baseApy: 0.38 },
        'Trap Vault': { baseApy: 0.35 },
        'Compliance Vault': { baseApy: 0.42 },
    },
    lockPeriods: [90, 180, 365],
    nftClasses: {
        'None': { multiplier: 0 },
        'Txxx': { multiplier: 0.05 },
        'Nxxx': { multiplier: 0.10 },
        'Fxxx': { multiplier: 0.15 },
        'Sxxx': { multiplier: 0.20 },
    },
};

export const nftRoiEstimatorData = {
    nftClasses: {
        'Txxx': { apyBoost: 0.05 },
        'Nxxx': { apyBoost: 0.10 },
        'Fxxx': { apyBoost: 0.15 },
        'Sxxx': { apyBoost: 0.20 },
    },
    defaults: {
        baseTokenApy: 0.38,
        tokenPrice: 0.012,
    }
};

export const comparisonModelsData = {
    subscription: {
        cost: 600,
        annualRoi: 0,
        notes: '$50/mo x 12'
    },
    tokenStakingNoNft: {
        cost: 0,
        annualRoi: 228,
        notes: '5000 SFXC * 38% APY * $0.012'
    },
    tokenStakingWithNft: {
        cost: 1200,
        annualRoi: 288,
        notes: 'Staking ROI + NFT Bonus'
    },
    nftWithLicensing: {
        cost: 1200,
        annualRoi: 25288,
        notes: '$25K Licensing + Staking ROI'
    }
};