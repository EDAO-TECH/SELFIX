import React, { useState } from 'react';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from 'lucide-react';

export const AuthModal = () => {
  const { 
    signUp, 
    signIn, 
    loading, 
    isAuthModalOpen, 
    setAuthModalOpen,
    authModalView,
    setAuthModalView
  } = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    const { error } = await signUp(email, password);
    if (error) {
      toast({
        variant: "destructive",
        title: "Sign up failed",
        description: error.message,
      });
    } else {
      toast({
        title: "Account Created!",
        description: "Please check your email to verify your account.",
        className: 'bg-green-500/20 text-green-400 border-green-500'
      });
      setEmail('');
      setPassword('');
      setAuthModalView('signin');
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    const { error } = await signIn(email, password);
    if (error) {
      toast({
        variant: "destructive",
        title: "Sign in failed",
        description: error.message,
      });
    } else {
      toast({
        title: "Sign In Successful!",
        description: `Welcome back!`,
        className: 'bg-green-500/20 text-green-400 border-green-500'
      });
      setAuthModalOpen(false);
      setEmail('');
      setPassword('');
    }
  };

  const handleOpenChange = (open) => {
    if (!open) {
      setEmail('');
      setPassword('');
    }
    setAuthModalOpen(open);
  }

  return (
    <Dialog open={isAuthModalOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Authentication</DialogTitle>
          <DialogDescription>
            Sign in or create an account to continue.
          </DialogDescription>
        </DialogHeader>
        <Tabs value={authModalView} onValueChange={setAuthModalView} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="signin">
            <form onSubmit={handleSignIn}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email-in" className="text-right">
                    Email
                  </Label>
                  <Input id="email-in" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="col-span-3" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="password-in" className="text-right">
                    Password
                  </Label>
                  <Input id="password-in" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="col-span-3" required />
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Sign In
              </Button>
            </form>
          </TabsContent>
          <TabsContent value="signup">
            <form onSubmit={handleSignUp}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email-up" className="text-right">
                    Email
                  </Label>
                  <Input id="email-up" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="col-span-3" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="password-up" className="text-right">
                    Password
                  </Label>
                  <Input id="password-up" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="col-span-3" required />
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Sign Up
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};