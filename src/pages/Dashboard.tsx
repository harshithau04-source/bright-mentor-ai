import { motion } from 'framer-motion';
import { Trophy, Target, Zap, LogOut, User } from 'lucide-react';
import RoundCard from '@/components/RoundCard';
import { useTest } from '@/context/TestContext';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';

export default function Dashboard() {
  const { progress } = useTest();
  const { profile, signOut } = useAuth();
  const totalCompleted = progress.completedRounds.length;
  const totalScore = Object.values(progress.scores).reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 gradient-hero">
        <div className="container mx-auto px-6 py-8 flex items-start justify-between">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl font-display font-bold text-gradient-primary mb-2">
              AI Interview Prep
            </h1>
            <p className="text-muted-foreground">
              Welcome back, <span className="text-foreground font-medium">{profile?.display_name || 'User'}</span>
            </p>
          </motion.div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/50 border border-border/50">
              <User className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-foreground">{profile?.display_name}</span>
            </div>
            <Button variant="outline" size="sm" onClick={signOut} className="gap-2">
              <LogOut className="w-4 h-4" /> Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {[
            { icon: Target, label: 'Rounds Completed', value: `${totalCompleted}/3`, color: 'text-primary' },
            { icon: Trophy, label: 'Total Score', value: `${totalScore}`, color: 'text-warning' },
            { icon: Zap, label: 'Pass Rate', value: totalCompleted ? `${Math.round((totalCompleted / 3) * 100)}%` : '—', color: 'text-success' },
          ].map(({ icon: Icon, label, value, color }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="rounded-xl border border-border/50 gradient-card p-5 flex items-center gap-4"
            >
              <Icon className={`w-8 h-8 ${color}`} />
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">{label}</p>
                <p className="text-2xl font-display font-bold text-foreground">{value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Rounds */}
        <h2 className="font-display text-xl font-semibold text-foreground mb-6">Interview Rounds</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <RoundCard round="aptitude" />
          <RoundCard round="technical" />
          <RoundCard round="hr" />
        </div>

        <p className="text-xs text-muted-foreground mt-8 text-center">
          Score ≥ 60% (12/20) to unlock the next round
        </p>
      </main>
    </div>
  );
}
