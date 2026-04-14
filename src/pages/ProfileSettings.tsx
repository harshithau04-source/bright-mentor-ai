import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, User, Trophy, Target } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useTest } from '@/context/TestContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

export default function ProfileSettings() {
  const navigate = useNavigate();
  const { profile, user, refreshProfile } = useAuth();
  const { progress } = useTest();
  const { toast } = useToast();

  const [displayName, setDisplayName] = useState(profile?.display_name || '');
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatar_url || '');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (profile) {
      setDisplayName(profile.display_name || '');
      setAvatarUrl(profile.avatar_url || '');
    }
  }, [profile]);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    const { error } = await supabase
      .from('profiles')
      .update({ display_name: displayName, avatar_url: avatarUrl })
      .eq('user_id', user.id);

    if (error) {
      toast({ title: 'Error saving profile', description: error.message, variant: 'destructive' });
    } else {
      await refreshProfile();
      toast({ title: 'Profile updated!' });
    }
    setSaving(false);
  };

  const totalScore = Object.values(progress.scores).reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-20">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-display text-lg font-bold text-foreground">Profile Settings</h1>
            <p className="text-xs text-muted-foreground">Manage your account</p>
          </div>
          <Button variant="outline" size="sm" onClick={() => navigate('/')} className="gap-2">
            <ArrowLeft className="w-4 h-4" /> Dashboard
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 max-w-xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {/* Avatar */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-20 h-20 rounded-full bg-primary/20 border-2 border-primary/50 flex items-center justify-center overflow-hidden">
              {avatarUrl ? (
                <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <User className="w-8 h-8 text-primary" />
              )}
            </div>
            <div>
              <h2 className="font-display text-xl font-bold text-foreground">{displayName || 'User'}</h2>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
          </div>

          {/* Form */}
          <div className="space-y-5 rounded-xl border border-border/50 gradient-card p-6">
            <div>
              <label className="text-xs font-display text-muted-foreground uppercase tracking-wider mb-2 block">
                Display Name
              </label>
              <Input
                value={displayName}
                onChange={e => setDisplayName(e.target.value)}
                placeholder="Your name"
                className="bg-secondary border-border/50"
              />
            </div>

            <div>
              <label className="text-xs font-display text-muted-foreground uppercase tracking-wider mb-2 block">
                Avatar URL
              </label>
              <Input
                value={avatarUrl}
                onChange={e => setAvatarUrl(e.target.value)}
                placeholder="https://example.com/avatar.png"
                className="bg-secondary border-border/50"
              />
            </div>

            <Button onClick={handleSave} disabled={saving} className="w-full gap-2">
              <Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-8 rounded-xl border border-border/50 gradient-card p-6">
            <h3 className="font-display text-sm font-bold text-foreground mb-4 uppercase tracking-wider">Your Stats</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Target className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Rounds</p>
                  <p className="font-display font-bold text-foreground">{progress.completedRounds.length}/5</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Trophy className="w-5 h-5 text-warning" />
                <div>
                  <p className="text-xs text-muted-foreground">Total Score</p>
                  <p className="font-display font-bold text-foreground">{totalScore}</p>
                </div>
              </div>
            </div>

            {/* Completed rounds list */}
            {progress.completedRounds.length > 0 && (
              <div className="mt-4 pt-4 border-t border-border/50">
                <p className="text-xs text-muted-foreground mb-2">Completed Rounds</p>
                <div className="flex flex-wrap gap-2">
                  {progress.completedRounds.map(r => (
                    <span key={r} className="px-2 py-1 text-xs rounded-md bg-success/10 text-success font-display">
                      {r}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
