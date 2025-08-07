import { GitCommit, TestTube2, Cpu, FileText, Bot, DollarSign, HeartHandshake as Handshake, ShieldCheck, FileKey2, Github, Twitter, MessageSquare, BookOpen, Globe, Library, Gavel } from 'lucide-react';

export const footerNavigation = {
  solutions: [
    { name: 'Ecosystem', href: '/ecosystem', icon: Library },
    { name: 'DAOCORE', href: '/daocore', icon: FileKey2 },
    { name: 'Open Source Patents', href: '/open-source-patenting', icon: Globe },
    { name: 'SPCX', href: '/spcx', icon: GitCommit },
    { name: 'AI Services', href: '/services', icon: TestTube2 },
    { name: 'Core Technology', href: '/technology', icon: Cpu },
    { name: 'White Papers', href: '/white-papers', icon: FileText },
    { name: 'Publications', href: '/publications', icon: Gavel },
  ],
  support: [
    { name: 'Documentation', href: 'https://docs.selfix.pro', icon: BookOpen },
    { name: 'Community', href: 'https://discord.gg/selfix', icon: MessageSquare },
  ],
  company: [
    { name: 'About', href: '/#about' },
    { name: 'DAO Board', href: '/dao-board' },
    { name: 'Business', href: '/commercial-services' },
  ],
  legal: [
    { name: 'Privacy', href: '/eula#privacy' },
    { name: 'Terms', href: '/eula#terms' },
    { name: 'EULA', href: '/eula' },
  ],
  social: [
    {
      name: 'Twitter',
      href: 'https://twitter.com/selfix_pro',
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: 'GitHub',
      href: 'https://github.com/selfix-meta',
      icon: Github,
    },
  ],
}