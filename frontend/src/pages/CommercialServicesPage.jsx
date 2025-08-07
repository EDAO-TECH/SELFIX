import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CheckCircle2, XCircle, ShieldCheck, Cpu, Code, Users, FileText, GitBranch, MessageSquare, LifeBuoy, BookOpen, Landmark, Gem, Star, Package, Server, DollarSign, ShoppingCart } from 'lucide-react';

const services = [
  { category: '🔍 Antivirus & Scanner', service: 'Real-time threat scanning (signature + heuristic)', tiers: ['All'] },
  { category: '🧠 AI Healing Engine', service: 'Entropy healing: automatic file/system correction', tiers: ['Pro', 'Enterprise', 'NFT'] },
  { category: '🛡️ Trap Logic™', service: 'Deception-based anti-intrusion logic', tiers: ['Pro', 'Enterprise'] },
  { category: '🔐 SmartLicense-X™', service: 'Programmable, verifiable local access license', tiers: ['All'] },
  { category: '📊 Healing Dashboard', service: 'Local GUI + web panel for entropy graphs, healing events', tiers: ['Pro', 'Enterprise'] },
  { category: '🧾 Legal Logging', service: 'Daily audit logs saved to /docs/legal_archive/', tiers: ['All'] },
  { category: '🔧 Module Sandbox', service: 'Karma-tested plugin execution (trust scope + GPG validation)', tiers: ['Pro', 'Enterprise', 'NFT'] },
  { category: '🔁 Rollback Engine', service: 'Instant rollback of corrupted or infected files', tiers: ['Enterprise', 'NFT'] },
  { category: '🌐 GUI Web Control', service: 'Launches Flask dashboard locally at http://localhost:5000', tiers: ['All'] },
  { category: '🧬 Healing Modules', service: 'Modular healing logic extensions (via GitHub or vault)', tiers: ['Pro', 'Enterprise', 'NFT'] },
  { category: '💬 Local CLI AI Chat', service: 'Natural language command interface to healing engine', tiers: ['Pro', 'NFT'] },
  { category: '🧠 Seeder Agents', service: 'Automate healing coordination across devices', tiers: ['Enterprise', 'NFT'] },
  { category: '📂 Vault Management', service: 'Golden module archive with staging + promotion via DAO', tiers: ['Enterprise', 'DAO'] },
  { category: '📦 Installer Builds', service: 'GUI app builds for Windows/macOS/Linux', tiers: ['All'] },
  { category: '🔄 SmartLicense CLI', service: 'selfix_license_check.py – license validation enforcement', tiers: ['All'] },
  { category: '💡 Compliance Reports', service: 'System summaries & logs formatted for audits', tiers: ['Enterprise'] },
  { category: '🤝 DAO Onboarding', service: 'NFT license onboarding, contribution rights', tiers: ['NFT', 'DAO'] },
  { category: '💬 Email & Support', service: 'Tiered support via email', tiers: ['Free', 'Pro', 'Enterprise'] },
  { category: '📚 Dev Documentation', service: 'Full API + module developer docs', tiers: ['All'] },
  { category: '🏛️ Legal Licensing', service: 'Under ABN 18 552 722 678 • Nevermissed Trust™ • SmartLicense-X™', tiers: ['All'] },
];

const tiers = {
  Free: { color: 'text-gray-400', icon: <Package className="w-5 h-5" /> },
  Pro: { color: 'text-cyan-400', icon: <Star className="w-5 h-5" /> },
  Enterprise: { color: 'text-purple-400', icon: <Server className="w-5 h-5" /> },
  NFT: { color: 'text-amber-400', icon: <Gem className="w-5 h-5" /> },
  DAO: { color: 'text-rose-400', icon: <Landmark className="w-5 h-5" /> },
  All: { color: 'text-green-400', icon: <CheckCircle2 className="w-5 h-5" /> },
};

const TierBadge = ({ tier }) => {
  const tierInfo = tiers[tier] || { color: 'text-gray-500', icon: null };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary ${tierInfo.color}`}>
      {tierInfo.icon}
      <span className="ml-1.5">{tier}</span>
    </span>
  );
};

const productTiers = [
    { name: 'Free Tier (Community)', icon: Package, color: 'border-gray-700', target: 'Privacy-conscious individuals, Linux users, open-source fans', features: ['Real-time scanner', 'Legal archive', 'CLI-based UI', 'SmartLicense verification', 'Open-source GitHub access'] },
    { name: 'Pro Tier', icon: Star, color: 'border-cyan-500', target: 'Power users, builders, developers, sysadmins', features: ['All Free tier features', 'Local AI healing engine', 'GUI dashboard with real-time logs', 'Plugin sandboxing and karma evaluation', 'Trap Logic™ activation', 'GPG-signed module access', 'CLI-based rollback'] },
    { name: 'Enterprise', icon: Server, color: 'border-purple-500', target: 'Orgs, DevSecOps, Compliance-Heavy Teams', features: ['All Pro features', 'Dedicated healing module vault', 'Seeder agent orchestration', 'Priority email support', 'Offline audit reporting (JSON + PDF)', 'Licensing delegation', 'GitHub CI/CD support', 'Token utility dashboard'] },
    { name: 'NFT License', icon: Gem, color: 'border-amber-500', target: 'Core contributors, investors, digital sovereignty advocates', features: ['All Pro features forever', 'Voting rights in SELFIX DAO', 'Module promotion rights', 'Vault access (GPG + karma validation)', 'Healing on multiple devices (up to 5)', 'No monthly fees'] },
];

const addOns = [
    { name: 'SmartLicense Integration', availability: 'Enterprise, NFT', price: '$300–1,000', icon: Code },
    { name: 'Compliance License Report', availability: 'Enterprise', price: '$200/report', icon: FileText },
    { name: 'Module Testing Sandbox', availability: 'DAO or Pro (add-on)', price: '$5–20/module', icon: ShieldCheck },
    { name: 'Custom GUI Build Service', availability: 'Enterprise', price: '$500–2,000/project', icon: Cpu },
    { name: 'DAO Auditing License', availability: 'NFT or DAO-only', price: 'Requires NFT + KYC', icon: Landmark },
];

const revenueStreams = [
    { name: 'Pro Subscriptions', description: 'Monthly/annual recurring revenue.', icon: DollarSign },
    { name: 'Enterprise Licensing', description: 'Volume-based and SLA contracts.', icon: Users },
    { name: 'NFT Lifetime Licenses', description: 'Scarce, tradable assets for core supporters.', icon: Gem },
    { name: 'Token Utility Revenue', description: 'Module access, upgrades, and scans.', icon: ShoppingCart },
    { name: 'Karma-based Incentives', description: 'Minted from the DAO pool for contributors.', icon: GitBranch },
];

const CommercialServicesPage = () => {
  return (
    <>
      <Helmet>
        <title>Commercial Services - SELFIX</title>
        <meta name="description" content="Explore the full breakdown of SELFIX commercial services, product tiers, and licensing options for individuals, professionals, and enterprises." />
      </Helmet>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-glow">SELFIX Commercial Services</h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">A complete overview of our services, products, and revenue streams designed for transparency and power.</p>
        </motion.div>

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-center mb-8 text-glow">Services Feature Matrix</h2>
          <Card className="bg-secondary/50 cyber-border">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[250px]">Category</TableHead>
                      <TableHead>Commercial Service Offered</TableHead>
                      <TableHead className="text-right">Included In</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {services.map((service, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{service.category}</TableCell>
                        <TableCell>{service.service}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex gap-2 justify-end flex-wrap">
                            {service.tiers.map(tier => <TierBadge key={tier} tier={tier} />)}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-center mb-8 text-glow">Bundled Commercial Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            {productTiers.map((tier) => (
              <Card key={tier.name} className={`bg-secondary/50 cyber-border-soft flex flex-col border-2 ${tier.color}`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <tier.icon className={`w-8 h-8 ${tiers[tier.name.split(' ')[0]].color}`} />
                    {tier.name}
                  </CardTitle>
                  <CardDescription>{tier.target}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-2">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <CheckCircle2 className="w-4 h-4 mr-2 mt-1 text-green-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div>
                    <h2 className="text-3xl font-bold text-center mb-8 text-glow">Optional Add-ons</h2>
                    <div className="space-y-6">
                        {addOns.map((addon) => (
                            <Card key={addon.name} className="bg-secondary/50 cyber-border-soft">
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <addon.icon className="w-8 h-8 text-primary" />
                                        <div>
                                            <CardTitle>{addon.name}</CardTitle>
                                            <CardDescription>{addon.availability}</CardDescription>
                                        </div>
                                    </div>
                                    <div className="text-lg font-bold text-primary">{addon.price}</div>
                                </CardHeader>
                            </Card>
                        ))}
                    </div>
                </div>
                <div>
                    <h2 className="text-3xl font-bold text-center mb-8 text-glow">Recurring Revenue Streams</h2>
                    <div className="space-y-6">
                        {revenueStreams.map((stream) => (
                            <Card key={stream.name} className="bg-secondary/50 cyber-border-soft">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-3">
                                        <stream.icon className="w-6 h-6 text-primary" />
                                        {stream.name}
                                    </CardTitle>
                                    <CardDescription>{stream.description}</CardDescription>
                                </CardHeader>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </motion.section>

      </div>
    </>
  );
};

export default CommercialServicesPage;