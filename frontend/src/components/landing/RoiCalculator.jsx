import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Info, TrendingUp, Wallet, Coins } from 'lucide-react';
import { stakingPoolsData, roiCalculatorData } from '@/data/landing/tokenomics';

const RoiCalculator = ({ showToast }) => {
    const [stakedAmount, setStakedAmount] = useState(5000);
    const [selectedVault, setSelectedVault] = useState('Entropy Vault');
    const [lockPeriod, setLockPeriod] = useState('180');
    const [nftClass, setNftClass] = useState('Fxxx');
    const [karmaScore, setKarmaScore] = useState(35);
    const [tokenPrice, setTokenPrice] = useState(0.012);

    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        } else {
          showToast(`Section #${sectionId} not found.`);
        }
    };

    const {
        baseApy,
        nftMultiplier,
        karmaBonus,
        totalApy,
        stakingDurationYears,
        estimatedReturnSfxc,
        estimatedReturnUsd
    } = useMemo(() => {
        const vault = roiCalculatorData.vaults[selectedVault];
        const baseApy = vault ? vault.baseApy : 0;
        
        const nft = roiCalculatorData.nftClasses[nftClass];
        const nftMultiplier = nft ? nft.multiplier : 0;

        const karmaBonus = karmaScore * 0.001;
        const totalApy = baseApy + nftMultiplier + karmaBonus;
        const stakingDurationYears = parseInt(lockPeriod) / 365;
        const estimatedReturnSfxc = stakedAmount * totalApy * stakingDurationYears;
        const estimatedReturnUsd = estimatedReturnSfxc * tokenPrice;

        return {
            baseApy,
            nftMultiplier,
            karmaBonus,
            totalApy,
            stakingDurationYears,
            estimatedReturnSfxc,
            estimatedReturnUsd
        };
    }, [stakedAmount, selectedVault, lockPeriod, nftClass, karmaScore, tokenPrice]);

    const formatPercent = (value) => new Intl.NumberFormat('en-US', { style: 'percent', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);
    const formatCurrency = (value) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
    const formatNumber = (value) => new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(value);

    return (
        <div className="mt-12">
            <div className="text-center mb-12">
                <h3 className="text-3xl font-bold page-title-glow">Stake SFXC & Earn Yield</h3>
                <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                    Stake your SFXC tokens and earn up to 42% APY. Your healing creates your return.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="cyber-border bg-background/70">
                    <CardHeader>
                        <CardTitle>💰 ROI Calculator Inputs</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="staked-amount">SFXC Tokens Staked</Label>
                                <Input id="staked-amount" type="number" value={stakedAmount} onChange={(e) => setStakedAmount(Number(e.target.value))} />
                            </div>
                            <div>
                                <Label htmlFor="token-price">Token Price ($)</Label>
                                <Input id="token-price" type="number" value={tokenPrice} onChange={(e) => setTokenPrice(Number(e.target.value))} step="0.001" />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="vault-select">Vault Selected</Label>
                                <Select value={selectedVault} onValueChange={setSelectedVault}>
                                    <SelectTrigger id="vault-select"><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        {Object.keys(roiCalculatorData.vaults).map(v => <SelectItem key={v} value={v}>{v}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="lock-period">Lock Period (Days)</Label>
                                <Select value={lockPeriod} onValueChange={setLockPeriod}>
                                    <SelectTrigger id="lock-period"><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        {roiCalculatorData.lockPeriods.map(p => <SelectItem key={p} value={p.toString()}>{p} days</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="nft-class">NFT Class Held</Label>
                                <Select value={nftClass} onValueChange={setNftClass}>
                                    <SelectTrigger id="nft-class"><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        {Object.keys(roiCalculatorData.nftClasses).map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="karma-score">Karma Score: <span className="text-primary font-bold">{karmaScore}</span></Label>
                                <Slider id="karma-score" value={[karmaScore]} onValueChange={(val) => setKarmaScore(val[0])} min={0} max={100} step={1} />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="cyber-border bg-background/70">
                    <CardHeader>
                        <CardTitle>💸 Estimated Returns</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2 text-sm mb-4">
                            <div className="flex justify-between"><span>Base APY:</span> <span className="font-semibold">{formatPercent(baseApy)}</span></div>
                            <div className="flex justify-between"><span>NFT Multiplier:</span> <span className="font-semibold">{formatPercent(nftMultiplier)}</span></div>
                            <div className="flex justify-between"><span>Karma Bonus:</span> <span className="font-semibold">{formatPercent(karmaBonus)}</span></div>
                            <div className="flex justify-between text-base font-bold border-t pt-2 mt-2"><span>Total APY:</span> <span className="text-primary">{formatPercent(totalApy)}</span></div>
                        </div>
                        <div className="text-center bg-background/50 p-4 rounded-lg">
                            <p className="text-muted-foreground">Return in {lockPeriod} days</p>
                            <p className="text-3xl font-extrabold text-glow karma-gradient bg-clip-text text-transparent">{formatCurrency(estimatedReturnUsd)}</p>
                            <p className="text-muted-foreground text-sm">({formatNumber(estimatedReturnSfxc)} SFXC)</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="mt-12 cyber-border bg-background/70">
                <CardHeader>
                    <CardTitle>📊 Available Vaults</CardTitle>
                    <CardDescription>Choose your healing vault and start earning.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader><TableRow><TableHead>Vault Name</TableHead><TableHead>Module Tied</TableHead><TableHead>Lock Time</TableHead><TableHead>Base APY</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
                        <TableBody>
                            {stakingPoolsData.map((pool) => (
                                <TableRow key={pool.name}>
                                    <TableCell className="font-medium">{pool.name}</TableCell>
                                    <TableCell>{pool.module}</TableCell>
                                    <TableCell>{pool.lockPeriod}</TableCell>
                                    <TableCell className="text-green-400 font-semibold">{pool.apy}</TableCell>
                                    <TableCell><span className={`px-2 py-1 text-xs font-semibold rounded-full ${pool.statusColor}`}>{pool.status}</span></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <div className="flex flex-wrap gap-4 mt-6 justify-center">
                        <Button onClick={() => showToast()}><Wallet className="mr-2 h-4 w-4" /> Connect Wallet</Button>
                        <Button variant="secondary" onClick={() => showToast()}><TrendingUp className="mr-2 h-4 w-4" /> Stake Now</Button>
                        <Button variant="outline" onClick={() => scrollToSection('support')}><Coins className="mr-2 h-4 w-4" /> Buy SFXC Tokens</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default RoiCalculator;