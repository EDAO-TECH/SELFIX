import React from 'react';
import { Share2, GitBranch, Link } from 'lucide-react';

export const integrationsData = [
  {
    name: "Zenodo",
    description: "Securely archive and share your research outputs, datasets, and software with our Zenodo integration. Ensuring long-term preservation and citable IP.",
    icon: <Share2 className="w-8 h-8 text-primary" />,
    url: "https://zenodo.org/records/15653901", 
    category: "Research & IP"
  },
  {
    name: "GitHub",
    description: "Connect your SELFIX instance with GitHub for seamless code repository monitoring and automated security checks within your development workflow.",
    icon: <GitBranch className="w-8 h-8 text-primary" />,
    url: "https://github.com/EDAO-TECH/SELFIX/blob/main/README.md",
    category: "Development"
  },
  {
    name: "ORCID",
    description: "Link your ORCID iD to associate your research contributions and SELFIX activities, enhancing your scholarly profile and ensuring proper attribution.",
    icon: <Link className="w-8 h-8 text-primary" />, 
    url: "https://orcid.org/0009-0009-0619-9982",
    category: "Researcher Identity"
  },
  {
    name: "OpenAIRE",
    description: "Integrate with OpenAIRE to make your SELFIX-related research outputs discoverable and compliant with Open Science mandates across Europe.",
    icon: <Share2 className="w-8 h-8 text-primary" />,
    url: "https://www.openaire.eu/openaire-for-rpos",
    category: "Open Science"
  }
];