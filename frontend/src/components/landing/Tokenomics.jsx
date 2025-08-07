import React from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, ShieldQuestion, Landmark, Link, GitCompareArrows } from 'lucide-react';
import RoiCalculator from '@/components/landing/RoiCalculator';
import NFTs from '@/components/landing/NFTs';
import NftRoiEstimator from '@/components/landing/NftRoiEstimator';
import CompareModels from '@/components/landing/CompareModels';
import { Link as RouterLink } from 'react-router-dom';

const Tokenomics = ({ showToast }) => {
    return (
        <section id="tokenomics" className="py-20 sm:py-28 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                
                <Tabs defaultValue="nfts" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 max-w-4xl mx-auto h-auto">
                        <TabsTrigger value="nfts" aria-label="Chained Patent NFT Tab" className="py-3 text-base">
                            <ShieldQuestion className="w-5 h-5 mr-2" /> NFT Portal
                        </TabsTrigger>
                        <TabsTrigger value="staking" aria-label="Staking and Yield Tab" className="py-3 text-base">
                            <TrendingUp className="w-5 h-5 mr-2" /> Token Staking
                        </TabsTrigger>
                        <TabsTrigger value="nft-roi" aria-label="NFT ROI Estimator Tab" className="py-3 text-base">
                            <TrendingUp className="w-5 h-5 mr-2" /> NFT ROI
                        </TabsTrigger>
                        <TabsTrigger value="compare" aria-label="Compare Models Tab" className="py-3 text-base">
                            <GitCompareArrows className="w-5 h-5 mr-2" /> Compare
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="nfts">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                           <NFTs showToast={showToast} />
                        </motion.div>
                    </TabsContent>
                    
                    <TabsContent value="staking">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                           <RoiCalculator showToast={showToast} />
                        </motion.div>
                    </TabsContent>

                    <TabsContent value="nft-roi">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                           <NftRoiEstimator showToast={showToast} />
                        </motion.div>
                    </TabsContent>

                    <TabsContent value="compare">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                           <CompareModels showToast={showToast} />
                        </motion.div>
                    </TabsContent>
                </Tabs>

                <div className="mt-20">
                    <RouterLink to="/dao-board" aria-label="Navigate to DAO Board">
                        <Card className="max-w-4xl mx-auto cyber-border-cta hover:border-primary transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
                            <CardContent className="p-8 flex flex-col md:flex-row items-center text-center md:text-left gap-6">
                                <Landmark className="w-16 h-16 text-primary flex-shrink-0" />
                                <div>
                                    <h3 className="text-2xl font-bold page-title-glow">DAO-Board</h3>
                                    <p className="mt-2 text-muted-foreground">
                                        Access the exclusive portal for NFT holders to participate in governance, review proposals, and exercise voting rights.
                                    </p>
                                </div>
                                <Button variant="ghost" className="ml-auto flex-shrink-0" aria-label="Enter DAO Boardroom">
                                    Enter Boardroom <Link className="w-4 h-4 ml-2" />
                                </Button>
                            </CardContent>
                        </Card>
                    </RouterLink>
                </div>

            </div>
        </section>
    );
};

export default Tokenomics;