import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { comparisonModelsData } from '@/data/landing/tokenomics';
import { CheckCircle } from 'lucide-react';

const CompareModels = () => {
    const models = [
        { name: 'Subscription', ...comparisonModelsData.subscription },
        { name: 'Token Staking (no NFT)', ...comparisonModelsData.tokenStakingNoNft },
        { name: 'Token Staking (with NFT)', ...comparisonModelsData.tokenStakingWithNft },
        { name: 'NFT + Licensing', ...comparisonModelsData.nftWithLicensing },
    ];

    const bestRoi = Math.max(...models.map(m => m.annualRoi));

    const formatCurrency = (value) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);

    return (
        <div className="mt-12">
            <div className="text-center mb-12">
                <h3 className="text-3xl font-bold page-title-glow">Compare Participation Models</h3>
                <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                    Understand the economic differences between subscribing, staking tokens, and owning a Chained-IP NFT.
                </p>
            </div>
            <Card className="cyber-border bg-background/70">
                <CardHeader>
                    <CardTitle>ROI Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Model</TableHead>
                                <TableHead>Upfront Cost</TableHead>
                                <TableHead>Est. Annual ROI</TableHead>
                                <TableHead>Notes</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {models.map((model) => (
                                <TableRow key={model.name} className={model.annualRoi === bestRoi ? 'bg-primary/10' : ''}>
                                    <TableCell className="font-medium flex items-center">
                                        {model.annualRoi === bestRoi && <CheckCircle className="w-5 h-5 mr-2 text-primary" />}
                                        {model.name}
                                    </TableCell>
                                    <TableCell>{formatCurrency(model.cost)}</TableCell>
                                    <TableCell className="font-semibold text-green-400">{formatCurrency(model.annualRoi)}</TableCell>
                                    <TableCell className="text-sm text-muted-foreground">{model.notes}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

export default CompareModels;