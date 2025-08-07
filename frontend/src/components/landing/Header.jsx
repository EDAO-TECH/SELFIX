import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mainNavLinks } from '@/data/landing/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import Logo from '@/components/Logo';

const Header = ({ showToast }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut, openAuthModal } = useAuth();

  const getInitials = (email) => {
    if (!email) return 'U';
    return email.substring(0, 2).toUpperCase();
  };
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Logo />
          </motion.div>
          <nav className="hidden md:flex space-x-6">
            {mainNavLinks.map((link) => (
              <Link key={link.label} to={link.href} className="text-muted-foreground hover:text-primary transition-colors duration-300 font-medium">
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                     <Avatar>
                      <AvatarImage src={null} alt="User Avatar" />
                      <AvatarFallback>{getInitials(user.email)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">My Account</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut}>
                    <LogIn className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="ghost" onClick={() => openAuthModal()}>
                Login <LogIn className="ml-2 w-4 h-4" />
              </Button>
            )}
             <Button asChild>
              <Link to="/pricing">
                Subscribe <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 border-t border-border"
          >
            <nav className="flex flex-col items-center space-y-4 py-6">
              {mainNavLinks.map((link) => (
                <Link key={link.label} to={link.href} onClick={() => setIsMenuOpen(false)} className="text-lg text-muted-foreground hover:text-primary transition-colors duration-300">
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 w-full px-8 flex flex-col space-y-3">
               {user ? (
                 <Button onClick={() => { signOut(); setIsMenuOpen(false); }} className="w-full">Logout</Button>
               ) : (
                 <Button onClick={() => { openAuthModal(); setIsMenuOpen(false); }} className="w-full">
                   Login
                 </Button>
               )}
              <Button asChild className="w-full">
                <Link to="/pricing" onClick={() => setIsMenuOpen(false)}>
                  Subscribe Now
                </Link>
              </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;