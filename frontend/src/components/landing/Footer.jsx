import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Logo from '@/components/Logo';
import { footerNavigation } from '@/data/landing/footer';
import { UserPlus, LogIn, TrendingUp } from 'lucide-react';
import { useAuth } from '@/contexts/SupabaseAuthContext';

const Footer = ({ showToast }) => {
  const { openAuthModal } = useAuth();
  
  const legalLinks = [
    ...footerNavigation.legal,
    { name: 'Privacy Policy', href: '/privacy-policy' }
  ];

  return (
    <footer className="bg-background border-t border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <Logo />
            <p className="text-muted-foreground text-base max-w-xs">
              Ethical cybernetic healing for the digital age. Join us in building a more resilient, trustworthy future.
            </p>
            <div className="flex space-x-2">
               <Button variant="ghost" onClick={() => openAuthModal('signin')}>
                  <LogIn className="mr-2 h-4 w-4" />
                  Login
                </Button>
                <Button onClick={() => openAuthModal('signup')}>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Sign Up
                </Button>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <p className="font-semibold text-foreground tracking-wider">Solutions</p>
                <ul className="mt-4 space-y-4">
                  {footerNavigation.solutions.map((item) => (
                    <li key={item.name}>
                      <Link to={item.href} className="text-base text-muted-foreground hover:text-primary transition-colors">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <p className="font-semibold text-foreground tracking-wider">Support</p>
                <ul className="mt-4 space-y-4">
                  {footerNavigation.support.map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className="text-base text-muted-foreground hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <p className="font-semibold text-foreground tracking-wider">Company</p>
                <ul className="mt-4 space-y-4">
                  {footerNavigation.company.map((item) => (
                    <li key={item.name}>
                      <Link to={item.href} className="text-base text-muted-foreground hover:text-primary transition-colors">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                   <li>
                      <Link to="/token-listing" className="text-base text-muted-foreground hover:text-primary transition-colors flex items-center">
                        Token Listing <TrendingUp className="ml-2 h-4 w-4 text-primary/70" />
                      </Link>
                    </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <p className="font-semibold text-foreground tracking-wider">Legal</p>
                <ul className="mt-4 space-y-4">
                  {legalLinks.map((item) => (
                    <li key={item.name}>
                      <Link to={item.href} className="text-base text-muted-foreground hover:text-primary transition-colors">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-border/50 pt-8 flex flex-col sm:flex-row items-center justify-between">
          <div className="flex space-x-6">
            {footerNavigation.social.map((item) => (
              <a key={item.name} href={item.href} className="text-muted-foreground hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">
                <span className="sr-only">{item.name}</span>
                <item.icon className="h-6 w-6" aria-hidden="true" />
              </a>
            ))}
          </div>
          <p className="mt-8 sm:mt-0 text-base text-muted-foreground">&copy; {new Date().getFullYear()} SELFIX.PRO. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;