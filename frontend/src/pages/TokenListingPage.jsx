import React from 'react';
import { motion } from 'framer-motion';
import Meta from '@/components/Meta';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Globe, Mail, Fingerprint, ExternalLink, ShieldCheck, Zap, Package, FileText } from 'lucide-react';

const DetailItem = ({ icon, label, value, isLink = false, isAddress = false }) => (
    <div className="flex items-start gap-4">
        <div className="text-primary flex-shrink-0 mt-1">{icon}</div>
        <div>
            <p className="text-sm font-semibold text-muted-foreground">{label}</p>
            {isLink ? (
                <a href={value} target="_blank" rel="noopener noreferrer" className="font-medium text-foreground hover:underline break-all">{value}</a>
            ) : (
                 <p className={`font-medium text-foreground ${isAddress ? 'font-mono text-xs break-all' : ''}`}>{value}</p>
            )}
        </div>
    </div>
);

const TokenListingPage = ({ showToast }) => {
    const pageTitle = "Token Listing Application: SELFIX (SFX)";
    const pageDescription = "Official application for the listing of the SELFIX (SFX) token on exchanges. Explore key project details, tokenomics, and our unique value proposition.";

    const uniqueFeatures = [
        "Legal-compliant NFT license wrapping",
        "Ethics-as-a-Service for DAOs and institutions",
        "Decentralized Karmic Reputation system",
        "Product-backed NFTs (not concept-only)",
        "Patent-backed public disclosures",
        "Active DEX liquidity provision"
    ];

    return (
        <>
            <Meta title={pageTitle} description={pageDescription} />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <p className="text-base font-semibold text-primary tracking-wide uppercase">For Exchange Partners</p>
                    <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold tracking-tight text-glow">Token Listing Application</h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                        A formal request for the consideration of SELFIXToken (SFX) for listing.
                    </p>
                </motion.div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="lg:col-span-2"
                    >
                        <Card className="bg-secondary/50 cyber-border">
                            <CardHeader>
                                <CardTitle className="text-2xl text-glow">Key Project & Token Details</CardTitle>
                                <CardDescription>An overview of the SELFIX ecosystem and SFX token.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <DetailItem icon={<Package className="h-5 w-5" />} label="Brand" value="SELFIX" />
                                    <DetailItem icon={<Zap className="h-5 w-5" />} label="Ecosystem" value="SELFIX-HEAL, SELFIX-ANTIVIVAL, etc." />
                                    <DetailItem icon={<ShieldCheck className="h-5 w-5" />} label="Token Name" value="SELFIXToken (SFX)" />
                                    <DetailItem icon={<Globe className="h-5 w-5" />} label="Chain" value="Cronos (Crypto.com ecosystem)" />
                                    <DetailItem icon={<Fingerprint className="h-5 w-5" />} label="Total Supply" value="1,000,000,000 SFX" />
                                </div>
                                <div>
                                     <DetailItem icon={<FileText className="h-5 w-5" />} label="Contract Address" value="0xd1995958E6cbCB328788600e50A1eD5213CEdAE5" isAddress={true}/>
                                </div>
                                <div className="border-t border-border pt-6">
                                    <h3 className="font-semibold text-lg text-glow mb-4">Core Innovations</h3>
                                     <ul className="space-y-3">
                                        <li><DetailItem icon={<ShieldCheck className="h-4 w-4" />} label="SmartLicense-X™" value="On-chain enforcement of ethical licensing, backed by expired PCT filings and DAO governance." /></li>
                                        <li><DetailItem icon={<Package className="h-4 w-4" />} label="NFT Suite" value="Each NFT tokenizes a single product with embedded ZOAN + GitHub proof of authorship." /></li>
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <Card className="bg-secondary/50 cyber-border-soft sticky top-24">
                            <CardHeader>
                                <CardTitle className="text-xl">Contact & Resources</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <DetailItem icon={<Mail className="h-5 w-5" />} label="Founder | TENG LI" value="support@selfix.pro" isLink={true} />
                                <DetailItem icon={<ExternalLink className="h-5 w-5" />} label="Website" value="https://selfix.pro" isLink={true} />
                                <div className="space-y-2 pt-2">
                                    <Button className="w-full" onClick={() => showToast()}><Download className="mr-2 h-4 w-4"/>Download White Paper</Button>
                                    <Button className="w-full" variant="outline" onClick={() => showToast()}><Download className="mr-2 h-4 w-4"/>Download Token Certificate</Button>
                                </div>
                                <p className="text-xs text-muted-foreground text-center pt-2">GitHub/Repo available upon request.</p>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
                
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="mt-12"
                >
                    <Card className="cyber-border-cta">
                        <CardHeader>
                            <CardTitle className="text-2xl text-center text-glow">Why SELFIX is Unique</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
                                {uniqueFeatures.map((feature, index) => (
                                    <div key={index} className="p-4 bg-background/50 rounded-lg">
                                        <p className="font-medium">{feature}</p>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </>
    );
};

export default TokenListingPage;