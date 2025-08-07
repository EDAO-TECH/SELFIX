import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { nftClasses, nftUseCases } from '@/data/landing/tokenomics';
import { CheckCircle, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';

const NFTs = ({ showToast }) => {

    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        } else {
          showToast(`Section #${sectionId} not found.`);
        }
    };

    return (
        <div className="mt-12">
            <div className="text-center mb-12">
                <h3 className="text-3xl font-bold page-title-glow">Chained Patent NFTs</h3>
                <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                    These NFTs represent legal ownership of our patented healing modules. Each token gives access, governance, or licensing rights to the SELFIX ecosystem.
                </p>
            </div>

            <Card className="cyber-border bg-background/70">
                <CardHeader>
                    <CardTitle>🧬 NFT Class Table</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Symbol</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Utility</TableHead>
                                <TableHead>Supply</TableHead>
                                <TableHead>Multiplier</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {nftClasses.map((nft) => (
                                <TableRow key={nft.symbol}>
                                    <TableCell className="font-mono font-bold text-primary">{nft.symbol}</TableCell>
                                    <TableCell>{nft.role}</TableCell>
                                    <TableCell>{nft.utility}</TableCell>
                                    <TableCell>{nft.supply}</TableCell>
                                    <TableCell className="font-semibold">{nft.multiplier}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                <Card className="cyber-border bg-background/70">
                    <CardHeader>
                        <CardTitle>🎯 Use Cases</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {nftUseCases.map((useCase) => (
                            <div key={useCase.title} className="flex items-start">
                                <div className="p-2 bg-primary/10 rounded-full mr-4">{useCase.icon}</div>
                                <div>
                                    <p className="font-semibold">{useCase.title}</p>
                                    <p className="text-sm text-muted-foreground">{useCase.description}</p>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
                <Card className="cyber-border bg-background/70">
                    <CardHeader>
                        <CardTitle>✅ On-Chain Features</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                         <div className="flex items-center"><CheckCircle className="w-5 h-5 mr-3 text-green-500" /> NFT Aura: Stored on-chain</div>
                         <div className="flex items-center"><CheckCircle className="w-5 h-5 mr-3 text-green-500" /> IP Linked via SmartLicense hash</div>
                         <div className="flex items-center"><CheckCircle className="w-5 h-5 mr-3 text-green-500" /> DAO role granted upon mint</div>
                    </CardContent>
                    <CardContent>
                        <Card className="bg-primary/5 border-primary/50 pulse-glow p-6">
                            <p className="text-sm font-bold text-primary flex items-center"><Tag className="w-4 h-4 mr-2"/> PROMO</p>
                            <p className="mt-2 font-semibold">Use code <span className="font-bold text-primary">HEAL20</span> for 20% off an NFT + token combo.</p>
                            <p className="text-xs text-muted-foreground mt-1">Runs: July 3–17</p>
                        </Card>
                    </CardContent>
                </Card>
            </div>
            
            <div className="flex flex-wrap gap-4 mt-12 justify-center">
                <Button onClick={() => scrollToSection('support')} size="lg">Mint NFT</Button>
                <Link to="/license-viewer">
                    <Button size="lg" variant="secondary">Preview License NFT</Button>
                </Link>
                <Button onClick={() => scrollToSection('tokenomics')} size="lg" variant="outline">Stake My NFT</Button>
            </div>
        </div>
    );
};

export default NFTs;