import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Meta from '@/components/Meta';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { CheckCircle, Shield, Cpu, Calendar, KeyRound, Fingerprint, FileJson } from 'lucide-react';

const NftAttribute = ({ trait, value }) => (
    <div className="flex justify-between items-center p-3 bg-secondary/50 rounded-lg">
        <span className="text-sm text-muted-foreground">{trait}</span>
        <span className="font-semibold text-foreground">{value}</span>
    </div>
);

const LicenseViewerPage = () => {
    const [jsonInput, setJsonInput] = useState('');
    const [licenseData, setLicenseData] = useState(null);
    const [error, setError] = useState('');
    const { toast } = useToast();

    const handleParseJson = () => {
        if (!jsonInput.trim()) {
            setError('Please paste your license or metadata JSON.');
            setLicenseData(null);
            return;
        }
        try {
            const data = JSON.parse(jsonInput);
            // Check if it's NFT metadata or license data
            if (data.attributes && data.name) {
                // It's NFT Metadata
                const attributes = data.attributes.reduce((acc, attr) => {
                    acc[attr.trait_type.replace(/\s+/g, '')] = attr.value;
                    return acc;
                }, {});
                setLicenseData({ type: 'nft', ...data, parsedAttributes: attributes });
            } else if (data.license_key && data.signature) {
                // It's a License File
                setLicenseData({ type: 'license', ...data });
            } else {
                 throw new Error("Invalid JSON structure. Please provide valid SELFIX License or NFT Metadata JSON.");
            }
            setError('');
            toast({
                title: "Success!",
                description: "JSON parsed and displayed successfully.",
            });
        } catch (e) {
            setError(`Parsing Error: ${e.message}`);
            setLicenseData(null);
            toast({
                title: "Error Parsing JSON",
                description: "Please check the format of your JSON and try again.",
                variant: "destructive",
            });
        }
    };

    return (
        <>
            <Meta title="License & NFT Viewer" description="View and verify your SELFIX license key and NFT metadata." />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-glow">License & NFT Viewer</h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                        Paste your `selfix_license.key` or `nft_metadata.json` content below to view and verify its details.
                    </p>
                </motion.div>

                <Card className="max-w-3xl mx-auto cyber-border bg-secondary/20">
                    <CardHeader>
                        <CardTitle className="flex items-center"><FileJson className="w-6 h-6 mr-2 text-primary"/> JSON Input</CardTitle>
                        <CardDescription>Paste the contents of your license or metadata file here.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Textarea
                            placeholder='{ "name": "SELFIX License...", "description": "...", ... }'
                            value={jsonInput}
                            onChange={(e) => setJsonInput(e.target.value)}
                            rows={10}
                            className="font-mono text-sm bg-background"
                        />
                        {error && <p className="text-sm text-destructive">{error}</p>}
                        <Button onClick={handleParseJson} className="w-full pulse-glow">Parse & View Details</Button>
                    </CardContent>
                </Card>

                {licenseData && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mt-12"
                    >
                        {licenseData.type === 'nft' && (
                            <Card className="max-w-3xl mx-auto cyber-border-soft bg-secondary/50">
                                <CardHeader className="text-center">
                                    <img  src={licenseData.image} alt="License Logo" className="w-24 h-24 mx-auto mb-4 rounded-full border-2 border-primary" src="https://images.unsplash.com/photo-1644143379190-08a5f055de1d" />
                                    <CardTitle className="text-2xl text-glow">{licenseData.name}</CardTitle>
                                    <CardDescription>{licenseData.description}</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <h4 className="font-semibold text-center text-lg mb-4">NFT Attributes</h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {licenseData.attributes.map(attr => (
                                            <NftAttribute key={attr.trait_type} trait={attr.trait_type} value={attr.value} />
                                        ))}
                                    </div>
                                    <div className="pt-4 text-center">
                                        <a href={licenseData.external_url} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">
                                            View on SELFIX.pro
                                        </a>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                        {licenseData.type === 'license' && (
                             <Card className="max-w-3xl mx-auto cyber-border-soft bg-secondary/50">
                                <CardHeader className="text-center">
                                    <img  src={licenseData.branding.logo_url} alt="License Logo" className="w-24 h-24 mx-auto mb-4 rounded-full border-2 border-primary" src="https://images.unsplash.com/photo-1562412692-26406e1bf600" />
                                    <CardTitle className="text-2xl text-glow">SELFIX License Details</CardTitle>
                                    <CardDescription>For: {licenseData.license_key.email}</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="flex items-center gap-3 p-3 bg-background rounded-lg"><Shield className="w-5 h-5 text-primary"/> <div><p className="text-sm text-muted-foreground">Tier</p><p className="font-semibold">{licenseData.license_key.tier}</p></div></div>
                                        <div className="flex items-center gap-3 p-3 bg-background rounded-lg"><Cpu className="w-5 h-5 text-primary"/> <div><p className="text-sm text-muted-foreground">Device Limit</p><p className="font-semibold">{licenseData.license_key.limit}</p></div></div>
                                        <div className="flex items-center gap-3 p-3 bg-background rounded-lg"><Calendar className="w-5 h-5 text-primary"/> <div><p className="text-sm text-muted-foreground">Expires</p><p className="font-semibold">{new Date(licenseData.license_key.expiry).toLocaleDateString()}</p></div></div>
                                        <div className="flex items-center gap-3 p-3 bg-background rounded-lg"><KeyRound className="w-5 h-5 text-primary"/> <div><p className="text-sm text-muted-foreground">Issued</p><p className="font-semibold">{new Date(licenseData.timestamp).toLocaleString()}</p></div></div>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold mb-2 mt-4">Enabled Features:</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {licenseData.license_key.features.map(feature => (
                                                <span key={feature} className="flex items-center text-xs bg-primary/10 text-primary font-medium px-2.5 py-1 rounded-full">
                                                    <CheckCircle className="w-3 h-3 mr-1.5" />
                                                    {feature}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="pt-4">
                                        <h4 className="font-semibold mb-2">Signature</h4>
                                        <div className="flex items-start gap-3 p-3 bg-background rounded-lg">
                                            <Fingerprint className="w-5 h-5 text-primary mt-1 flex-shrink-0"/>
                                            <p className="font-mono text-xs break-all text-muted-foreground">{licenseData.signature}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </motion.div>
                )}
            </div>
        </>
    );
};

export default LicenseViewerPage;