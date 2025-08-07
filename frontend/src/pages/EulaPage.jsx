import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, ExternalLink } from 'lucide-react';

const EulaSection = ({ title, children }) => (
  <div className="mb-8">
    <h2 className="text-2xl font-bold text-glow mb-4">{title}</h2>
    <div className="space-y-4 text-muted-foreground">{children}</div>
  </div>
);

const EulaLink = ({ href, children }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">
    {children} <ExternalLink className="w-4 h-4" />
  </a>
);

const EulaPage = () => {
  return (
    <>
      <Helmet>
        <title>EULA - SELFIX</title>
        <meta name="description" content="End User License Agreement (EULA) for SELFIX. By using our software, you agree to these terms." />
      </Helmet>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <FileText className="mx-auto h-16 w-16 text-primary" />
            <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight text-glow">
              End User License Agreement (EULA)
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Effective Date: June 6, 2025
            </p>
          </div>

          <Card className="bg-secondary/50 cyber-border p-6 sm:p-8">
            <CardContent className="p-0">
              <div className="mb-6 pb-6 border-b border-border">
                <p><strong>Product:</strong> SELFIX (Decentralized Ethical Antivirus & AI Karmic Governance)</p>
                <p><strong>Publisher:</strong> Nevermissed Licensed Trust™ (ABN 18 552 722 678)</p>
                <p><strong>Websites:</strong></p>
                <ul className="list-disc list-inside ml-4">
                  <li><EulaLink href="https://www.selfix.pro">www.selfix.pro</EulaLink></li>
                  <li><EulaLink href="https://www.daocore.tech">www.daocore.tech</EulaLink></li>
                  <li><EulaLink href="https://www.nevermissedlicensedtrust.tech">www.nevermissedlicensedtrust.tech</EulaLink></li>
                </ul>
              </div>

              <EulaSection title="1. Acceptance of Terms">
                <p>By installing, copying, accessing, or using the SELFIX software (“Software”), you agree to be bound by the terms of this End User License Agreement (“EULA”). If you do not agree to these terms, do not install or use the Software.</p>
              </EulaSection>

              <EulaSection title="2. Grant of License">
                <ul className="list-disc list-inside space-y-2">
                  <li>You are granted a limited, non-exclusive, non-transferable license to use the Software according to this EULA and the attached SmartLicense-X™ Public Use Covenant.</li>
                  <li>For commercial usage, advanced integrations, or enterprise deployments, a Master Licensee Agreement is required. Please contact <a href="mailto:legal@daocore.tech" className="text-primary hover:underline">legal@daocore.tech</a>.</li>
                </ul>
              </EulaSection>

              <EulaSection title="3. SmartLicense-X™ and Karmic Public Use">
                <ul className="list-disc list-inside space-y-2">
                  <li>The Software is governed by SmartLicense-X™ (PCT/US25/20835) as detailed in LICENSE.txt.</li>
                  <li>All users and contributors must preserve digital sovereignty, ethical computation, and comply with DAO arbitration as described in the public license.</li>
                  <li>Any violation of the ethical or karmic terms may result in blacklisting or revocation of rights by the SELFIX DAO.</li>
                </ul>
              </EulaSection>

              <EulaSection title="4. Restrictions">
                <ul className="list-disc list-inside space-y-2">
                  <li>You may not weaponize, obfuscate, or use the Software for unlawful, unethical, or non-disclosed commercial purposes without proper licensing.</li>
                  <li>Modification of healing or trust logic must be disclosed and remain transparent.</li>
                </ul>
              </EulaSection>

              <EulaSection title="5. Updates and Support">
                <p>This EULA does not entitle you to any support, updates, or upgrades unless expressly provided under a separate Master Licensee Agreement or support contract.</p>
              </EulaSection>

              <EulaSection title="6. Intellectual Property">
                <ul className="list-disc list-inside space-y-2">
                  <li>The Software, SmartLicense-X™, and all related trademarks remain the property of Nevermissed Licensed Trust™ and the SELFIX DAO.</li>
                  <li>All rights not expressly granted are reserved.</li>
                </ul>
              </EulaSection>

              <EulaSection title="7. Disclaimer of Warranty">
                <p>The Software is provided “AS IS” without warranty of any kind. The authors, DAO, and Nevermissed Licensed Trust™ disclaim all warranties, express or implied.</p>
              </EulaSection>

              <EulaSection title="8. Limitation of Liability">
                <p>In no event shall the authors, DAO, or Nevermissed Licensed Trust™ be liable for any damages arising from the use or inability to use the Software, even if advised of the possibility of such damages.</p>
              </EulaSection>

              <EulaSection title="9. Governing Law">
                <p>This Agreement shall be governed by the laws of the jurisdiction of Nevermissed Licensed Trust™ (Australia), unless otherwise superseded by DAO arbitration.</p>
              </EulaSection>

              <EulaSection title="10. Additional Terms">
                <ul className="list-disc list-inside space-y-2">
                  <li>By using the Software, you acknowledge the possibility of automated logging, DAO audits, and karmic scoring as part of the protocol.</li>
                  <li>For commercial rights or integration, refer to the Master Licensee Agreement or contact <a href="mailto:legal@daocore.tech" className="text-primary hover:underline">legal@daocore.tech</a>.</li>
                </ul>
              </EulaSection>

              <div className="mt-8 pt-8 border-t border-border">
                <p><strong>Contact:</strong></p>
                <ul className="list-disc list-inside ml-4 text-muted-foreground">
                  <li>General: <a href="mailto:support@selfix.pro" className="text-primary hover:underline">support@selfix.pro</a></li>
                  <li>Legal: <a href="mailto:legal@daocore.tech" className="text-primary hover:underline">legal@daocore.tech</a></li>
                  <li>Admin: <a href="mailto:hello@edao.tech" className="text-primary hover:underline">hello@edao.tech</a></li>
                </ul>
                <p className="mt-4"><strong>Full license details and ethical terms are available in LICENSE.txt and at:</strong></p>
                <ul className="list-disc list-inside ml-4 text-muted-foreground">
                  <li><EulaLink href="https://www.selfix.pro">www.selfix.pro</EulaLink></li>
                  <li><EulaLink href="https://www.daocore.tech">www.daocore.tech</EulaLink></li>
                  <li><EulaLink href="https://www.nevermissedlicensedtrust.tech">www.nevermissedlicensedtrust.tech</EulaLink></li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default EulaPage;