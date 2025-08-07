import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { activeProposals, myGovernanceRights, daoConstitutionLinks } from '@/data/landing/daoData';
import { Landmark, KeyRound, Wallet, ShieldCheck, FileText, Vote, MessageSquare, BarChart3, PlusCircle, BookOpen, Video, Info, Lock } from 'lucide-react';

const DaoLogin = ({ onLogin, showToast }) => {
    return (
        <div className="mt-12">
            <div className="text-center max-w-3xl mx-auto">
                <h3 className="text-3xl font-bold text-glow">The SELFIX DAO Boardroom</h3>
                <p className="mt-4 text-lg text-muted-foreground">
                    The SELFIX DAO is governed by the holders of Chained-IP NFTs. Each NFT grants real voting power, licensing rights, and ethical access to healing governance.
                </p>
                <div className="mt-6 flex justify-center gap-6 text-sm">
                    <span>✅ Join as a delegate</span>
                    <span>🧬 Influence digital immunity</span>
                    <span>🔐 Login required</span>
                </div>
            </div>

            <Card className="max-w-md mx-auto mt-12 cyber-border bg-background/70">
                <CardHeader>
                    <CardTitle className="text-center">🔒 Access Portal</CardTitle>
                    <CardDescription className="text-center mt-2">Verify yourself to access the DAO Boardroom. SmartLicense-X confirms signature and class.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <Label htmlFor="nft-id">NFT Mint Code (e.g., T013, N009, S001)</Label>
                        <Input id="nft-id" placeholder="Enter your NFT ID" />
                    </div>
                    <div>
                        <Label htmlFor="password">Private Code Phrase</Label>
                        <Input id="password" type="password" placeholder="Enter your code phrase" />
                    </div>
                    <div className="relative my-4">
                        <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
                        <div className="relative flex justify-center text-xs uppercase"><span className="bg-card px-2 text-muted-foreground">Or</span></div>
                    </div>
                    <Button variant="secondary" className="w-full" onClick={() => { onLogin(); showToast("Wallet connected successfully!"); }}>
                        <Wallet className="mr-2 h-4 w-4" /> Connect Wallet (MetaMask/Keplr)
                    </Button>
                    <Button className="w-full" onClick={() => onLogin()}>
                        <KeyRound className="mr-2 h-4 w-4" /> Enter Governance Portal
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};

const DaoDashboard = ({ onLogout, showToast }) => {
    return (
        <div className="space-y-12 mt-12">
            <Card className="cyber-border bg-background/70">
                <CardHeader>
                    <CardTitle className="flex items-center"><FileText className="mr-3 text-primary"/> Active Proposals Panel</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader><TableRow><TableHead>Proposal</TableHead><TableHead>Type</TableHead><TableHead>Status</TableHead><TableHead>Deadline</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
                        <TableBody>
                            {activeProposals.map(p => (
                                <TableRow key={p.title}>
                                    <TableCell className="font-medium">{p.title}</TableCell>
                                    <TableCell>{p.type}</TableCell>
                                    <TableCell><span className={`px-2 py-1 text-xs font-semibold rounded-full ${p.statusColor}`}>{p.status}</span></TableCell>
                                    <TableCell>{p.deadline}</TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <Button size="sm" variant="outline" onClick={() => showToast()}><Vote className="h-4 w-4 mr-1"/> Vote</Button>
                                        <Button size="sm" variant="ghost" onClick={() => showToast()}><Info className="h-4 w-4 mr-1"/> Details</Button>
                                        <Button size="sm" variant="ghost" onClick={() => showToast()}><MessageSquare className="h-4 w-4 mr-1"/> Discussion</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="cyber-border bg-background/70">
                    <CardHeader><CardTitle className="flex items-center"><BarChart3 className="mr-3 text-primary"/> My DAO Rights</CardTitle></CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader><TableRow><TableHead>NFT</TableHead><TableHead>Class</TableHead><TableHead>Votes</TableHead><TableHead>Proposal Access</TableHead><TableHead>DAO Role</TableHead></TableRow></TableHeader>
                            <TableBody>
                                {myGovernanceRights.map(r => (
                                <TableRow key={r.nft}>
                                    <TableCell className="font-mono">{r.nft}</TableCell>
                                    <TableCell>{r.class}</TableCell>
                                    <TableCell>{r.votes}</TableCell>
                                    <TableCell>{r.proposalAccess}</TableCell>
                                    <TableCell>{r.role}</TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                         <div className="mt-4 pt-4 border-t text-right">
                            <p className="text-sm text-muted-foreground">Karma Score: <span className="font-bold text-primary">41</span></p>
                            <p className="text-lg font-bold">Boost: <span className="text-primary">+15% Proposal Influence</span></p>
                        </div>
                    </CardContent>
                </Card>
                 <Card className="cyber-border bg-background/70">
                    <CardHeader><CardTitle className="flex items-center"><PlusCircle className="mr-3 text-primary"/> Submit Proposal</CardTitle></CardHeader>
                    <CardContent className="flex flex-col h-full justify-between">
                        <p className="text-muted-foreground">Only holders of Sxxx or Nxxx with Karma ≥ 5 can submit proposals.</p>
                        <ul className="space-y-2 mt-4 text-sm">
                            <li className="flex items-center"><ShieldCheck className="w-4 h-4 mr-2 text-green-500"/> Select Template</li>
                            <li className="flex items-center"><ShieldCheck className="w-4 h-4 mr-2 text-green-500"/> SmartLicense auto-sign</li>
                            <li className="flex items-center"><ShieldCheck className="w-4 h-4 mr-2 text-green-500"/> Upload to IPFS</li>
                            <li className="flex items-center"><ShieldCheck className="w-4 h-4 mr-2 text-green-500"/> DAO Snapshot Trigger</li>
                        </ul>
                        <Button className="w-full mt-6" onClick={() => showToast()}>Create New Proposal</Button>
                    </CardContent>
                </Card>
            </div>
            
             <Card className="cyber-border bg-background/70">
                <CardHeader><CardTitle className="flex items-center"><BookOpen className="mr-3 text-primary"/> DAO Constitution & Links</CardTitle></CardHeader>
                <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    {daoConstitutionLinks.map(link => (
                        <Button key={link.label} variant="outline" className="w-full" onClick={() => showToast()}>
                            {link.icon} {link.label}
                        </Button>
                    ))}
                </CardContent>
            </Card>
            <div className="text-center">
                <Button variant="destructive" onClick={onLogout}><Lock className="mr-2 h-4 w-4" /> Log Out</Button>
            </div>
        </div>
    )
}

const DaoBoardroom = ({ showToast }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => setIsLoggedIn(true);
    const handleLogout = () => setIsLoggedIn(false);

    return (
        <div className="mt-8">
            {isLoggedIn ? (
                <motion.div key="dashboard" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <DaoDashboard onLogout={handleLogout} showToast={showToast} />
                </motion.div>
            ) : (
                <motion.div key="login" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <DaoLogin onLogin={handleLogin} showToast={showToast} />
                </motion.div>
            )}
        </div>
    );
};

export default DaoBoardroom;