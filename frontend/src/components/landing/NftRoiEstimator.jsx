import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { nftRoiEstimatorData } from '@/data/landing/tokenomics';

const NftRoiEstimator = () => {
    const [nftClass, setNftClass] = useState('Nxxx');
    const [purchasePrice, setPurchasePrice] = useState(1200);
    const [holdingDuration, setHoldingDuration] = useState(3);
    const [annualLicensingRevenue, setAnnualLicensingRevenue] = useState(25000);
    const [stakedTokens, setStakedTokens] = useState(5000);

    const {
        apyBoost,
        combinedApy,
        totalStakingReturn,
        totalLicensingRevenue,
        cumulativeRoi,
        roiPercentage
    } = useMemo(() => {
        const apyBoost = nftRoiEstimatorData.nftClasses[nftClass]?.apyBoost || 0;
        const baseTokenApy = nftRoiEstimatorData.defaults.baseTokenApy;
        const tokenPrice = nftRoiEstimatorData.defaults.tokenPrice;

        const combinedApy = baseTokenApy + apyBoost;
        const totalStakingReturn = stakedTokens * combinedApy * holdingDuration * tokenPrice;
        const totalLicensingRevenue = annualLicensingRevenue * holdingDuration;
        const cumulativeRoi = totalStakingReturn + totalLicensingRevenue;
        const roiPercentage = purchasePrice > 0 ? cumulativeRoi / purchasePrice : 0;

        return {
            apyBoost,
            combinedApy,
            totalStakingReturn,
            totalLicensingRevenue,
            cumulativeRoi,
            roiPercentage
        };
    }, [nftClass, purchasePrice, holdingDuration, annualLicensingRevenue, stakedTokens]);

    const formatPercent = (value) => new Intl.NumberFormat('en-US', { style: 'percent', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);
    const formatCurrency = (value) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

    return (
        <div className="mt-12">
            <div className="text-center mb-12">
                <h3 className="text-3xl font-bold page-title-glow">NFT ROI Estimator</h3>
                <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                    Estimate the potential return on your Chained-IP NFT, factoring in licensing and staking rewards.
                </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="cyber-border bg-background/70">
                    <CardHeader><CardTitle>📈 Estimator Inputs</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="nft-class-roi">NFT Class</Label>
                                <Select value={nftClass} onValueChange={setNftClass}>
                                    <SelectTrigger id="nft-class-roi"><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        {Object.keys(nftRoiEstimatorData.nftClasses).map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="purchase-price">Purchase Price (USD)</Label>
                                <Input id="purchase-price" type="number" value={purchasePrice} onChange={e => setPurchasePrice(Number(e.target.value))} />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="holding-duration">Holding Duration (Years)</Label>
                                <Input id="holding-duration" type="number" value={holdingDuration} onChange={e => setHoldingDuration(Number(e.target.value))} />
                            </div>
                            <div>
                                <Label htmlFor="licensing-revenue">Annual Licensing Revenue</Label>
                                <Input id="licensing-revenue" type="number" value={annualLicensingRevenue} onChange={e => setAnnualLicensingRevenue(Number(e.target.value))} />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="staked-tokens-roi">Expected Vault Staking Tokens</Label>
                            <Input id="staked-tokens-roi" type="number" value={stakedTokens} onChange={e => setStakedTokens(Number(e.target.value))} />
                        </div>
                    </CardContent>
                </Card>
                <Card className="cyber-border bg-background/70">
                    <CardHeader><CardTitle>💸 Estimated Returns</CardTitle></CardHeader>
                    <CardContent className="space-y-3">
                        <div className="flex justify-between text-sm"><span>APY Boost from Staking:</span> <span className="font-semibold text-green-400">{formatPercent(apyBoost)}</span></div>
                        <div className="flex justify-between text-sm"><span>Combined APY (Staking + NFT):</span> <span className="font-semibold">{formatPercent(combinedApy)}</span></div>
                        <div className="flex justify-between text-sm border-t pt-2 mt-2"><span>Total Staking Return:</span> <span className="font-semibold">{formatCurrency(totalStakingReturn)}</span></div>
                        <div className="flex justify-between text-sm"><span>Total Licensing Revenue:</span> <span className="font-semibold">{formatCurrency(totalLicensingRevenue)}</span></div>
                        
                        <div className="text-center bg-background/50 p-4 rounded-lg mt-4">
                            <p className="text-muted-foreground">Cumulative ROI in {holdingDuration} years</p>
                            <p className="text-3xl font-extrabold text-glow karma-gradient bg-clip-text text-transparent">{formatCurrency(cumulativeRoi)}</p>
                            <p className="text-muted-foreground text-lg font-bold">{formatPercent(roiPercentage)} over cost</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default NftRoiEstimator;