import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Zap, Phone, Hash } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

type AuthMode = 'login' | 'register' | 'phone' | 'otp';

export default function Login() {
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (authMode === 'register') {
        await signUp(email, password, displayName);
        toast({ title: 'Account created!', description: 'Check your email to confirm, or log in if auto-confirm is enabled.' });
      } else {
        await signIn(email, password);
      }
      navigate('/');
    } catch (err: any) {
      toast({ title: 'Error', description: err.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formattedPhone = phone.startsWith('+') ? phone : `+${phone}`;
      const { error } = await supabase.auth.signInWithOtp({ phone: formattedPhone });
      if (error) throw error;
      toast({ title: 'OTP Sent!', description: 'Check your phone for the verification code.' });
      setAuthMode('otp');
    } catch (err: any) {
      toast({ title: 'Error', description: err.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formattedPhone = phone.startsWith('+') ? phone : `+${phone}`;
      const { error } = await supabase.auth.verifyOtp({
        phone: formattedPhone,
        token: otp,
        type: 'sms',
      });
      if (error) throw error;
      navigate('/');
    } catch (err: any) {
      toast({ title: 'Error', description: err.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Brand */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="p-2 rounded-lg bg-primary/10">
              <Zap className="w-7 h-7 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-display font-bold text-gradient-primary">AI Interview Prep</h1>
          <p className="text-muted-foreground mt-2 text-sm">Master your interviews with adaptive practice</p>
        </div>

        {/* Auth method tabs */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={authMode === 'phone' || authMode === 'otp' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setAuthMode('phone')}
            className="flex-1 gap-2"
          >
            <Phone className="w-4 h-4" /> Phone
          </Button>
          <Button
            variant={authMode === 'login' || authMode === 'register' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setAuthMode('login')}
            className="flex-1 gap-2"
          >
            <Mail className="w-4 h-4" /> Email
          </Button>
        </div>

        {/* Form card */}
        <div className="rounded-xl border border-border/50 gradient-card p-8">
          {(authMode === 'login' || authMode === 'register') && (
            <>
              <h2 className="font-display text-xl font-semibold text-foreground mb-6">
                {authMode === 'register' ? 'Create Account' : 'Welcome Back'}
              </h2>

              <form onSubmit={handleEmailSubmit} className="space-y-4">
                {authMode === 'register' && (
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Display Name"
                      value={displayName}
                      onChange={e => setDisplayName(e.target.value)}
                      className="pl-10 bg-secondary border-border/50"
                      required
                    />
                  </div>
                )}

                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="pl-10 bg-secondary border-border/50"
                    required
                  />
                </div>

                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="pl-10 bg-secondary border-border/50"
                    required
                    minLength={6}
                  />
                </div>

                <Button type="submit" className="w-full gap-2" disabled={loading}>
                  {loading ? 'Please wait...' : authMode === 'register' ? 'Sign Up' : 'Sign In'}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </form>

              <div className="mt-6 text-center">
                <button
                  onClick={() => setAuthMode(authMode === 'register' ? 'login' : 'register')}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {authMode === 'register' ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
                </button>
              </div>
            </>
          )}

          {authMode === 'phone' && (
            <>
              <h2 className="font-display text-xl font-semibold text-foreground mb-6">
                Phone Login
              </h2>

              <form onSubmit={handlePhoneSubmit} className="space-y-4">
                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="tel"
                    placeholder="+91XXXXXXXXXX"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="pl-10 bg-secondary border-border/50"
                    required
                  />
                </div>
                <p className="text-xs text-muted-foreground">Include country code (e.g. +91 for India)</p>

                <Button type="submit" className="w-full gap-2" disabled={loading}>
                  {loading ? 'Sending...' : 'Send OTP'}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </form>
            </>
          )}

          {authMode === 'otp' && (
            <>
              <h2 className="font-display text-xl font-semibold text-foreground mb-6">
                Enter OTP
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                Code sent to {phone}
              </p>

              <form onSubmit={handleOtpSubmit} className="space-y-4">
                <div className="relative">
                  <Hash className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={e => setOtp(e.target.value)}
                    className="pl-10 bg-secondary border-border/50 text-center tracking-[0.5em] font-display"
                    maxLength={6}
                    required
                  />
                </div>

                <Button type="submit" className="w-full gap-2" disabled={loading}>
                  {loading ? 'Verifying...' : 'Verify & Login'}
                  <ArrowRight className="w-4 h-4" />
                </Button>

                <button
                  type="button"
                  onClick={() => setAuthMode('phone')}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors w-full text-center"
                >
                  Change phone number
                </button>
              </form>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}
