import { GitCommit, TestTube2, Cpu, FileText, Bot, DollarSign, HeartHandshake as Handshake, ShieldCheck, FileKey2, Globe, Library, Gavel } from 'lucide-react';

export const mainNavLinks = [
    { href: "/ecosystem", label: "Ecosystem", icon: <Library className="w-4 h-4" /> },
    { href: "/daocore", label: "DAOCORE", icon: <FileKey2 className="w-4 h-4" /> },
    { href: "/open-source-patenting", label: "Open Source Patents", icon: <Globe className="w-4 h-4" /> },
    { href: "/spcx", label: "SPCX", icon: <GitCommit className="w-4 h-4" /> },
    { href: "/services", label: "Services", icon: <TestTube2 className="w-4 h-4" /> },
    { href: "/technology", label: "Technology", icon: <Cpu className="w-4 h-4" /> },
    { href: "/white-papers", label: "White Papers", icon: <FileText className="w-4 h-4" /> },
    { href: "/publications", label: "Publications", icon: <Gavel className="w-4 h-4" /> },
    { href: "/dao-board", label: "DAO", icon: <Bot className="w-4 h-4" /> },
    { href: "/commercial-services", label: "For Business", icon: <Handshake className="w-4 h-4" /> },
];

export const secondaryNavLinks = [
    { href: "/#tokenomics", label: "Tokenomics", icon: <DollarSign className="w-4 h-4" /> },
    { href: "/#payment", label: "Subscribe", icon: <ShieldCheck className="w-4 h-4" /> }
];