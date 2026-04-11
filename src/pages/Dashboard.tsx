import { motion } from 'framer-motion';
import { Trophy, Target, Zap, LogOut, User, Brain, Code, Users, Code2, Video } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import RoundCard from '@/components/RoundCard';
import { useTest } from '@/context/TestContext';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';

export default function Dashboard() {
  const { progress } = useTest();
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();
  const totalCompleted = progress.completedRounds.length;
  const totalScore = Object.values(progress.scores).reduce((a, b) => a + b, 0);

  const allRounds = [
    { key: 'aptitude', label: 'Aptitude', icon: Brain, color: 'primary', desc: 'Logical reasoning, math & analytical skills', path: '/test/aptitude/1', qCount: '20 Questions • 30 min' },
    { key: 'technical', label: 'Technical', icon: Code, color: 'accent', desc: 'DSA, OOP, databases & system design', path: '/test/technical/1', qCount: '20 Questions • 30 min' },
    { key: 'coding', label: 'Coding', icon: Code2, color: 'warning', desc: 'DSA & SQL problems — choose your language', path: '/coding', qCount: '5 Problems • 45 min' },
    { key: 'hr', label: 'HR (MCQ)', icon: Users, color: 'success', desc: 'Behavioral, situational & communication', path: '/test/hr/1', qCount: '20 Questions • 30 min' },
    { key: 'hr_interview', label: 'HR Interview', icon: Video, color: 'accent', desc: 'Tell about yourself & skills — text or video', path: '/hr-interview', qCount: '5 Questions • Video/Text' },
  ];

  const isUnlocked = (key: string) => {
    if (key === 'aptitude') return true;
    if (key === 'technical') return progress.completedRounds.includes('aptitude_1');
    if (key === 'coding') return progress.completedRounds.includes('technical_1');
    if (key === 'hr') return progress.completedRounds.includes('coding_1') || progress.completedRounds.includes('technical_1');
    if (key === 'hr_interview') return progress.completedRounds.includes('hr_1');
    return false;
  };

  const isCompleted = (key: string) => {
    return progress.completedRounds.includes(`${key}_1`);
  };

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
            { icon: Target, label: 'Rounds Completed', value: `${totalCompleted}/5`, color: 'text-primary' },
            { icon: Trophy, label: 'Total Score', value: `${totalScore}`, color: 'text-warning' },
            { icon: Zap, label: 'Pass Rate', value: totalCompleted ? `${Math.round((totalCompleted / 5) * 100)}%` : '—', color: 'text-success' },
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

        {/* All Rounds */}
        <h2 className="font-display text-xl font-semibold text-foreground mb-6">Interview Rounds</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allRounds.map((round, i) => {
            const Icon = round.icon;
            const unlocked = isUnlocked(round.key);
            const completed = isCompleted(round.key);
            const score = progress.scores[`${round.key}_1`];

            return (
              <motion.div
                key={round.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                whileHover={unlocked ? { y: -4, scale: 1.02 } : {}}
                className={`relative rounded-xl border gradient-card p-6 transition-all duration-300 ${
                  unlocked
                    ? 'border-border/50 hover:border-primary/50 hover:glow-primary cursor-pointer'
                    : 'border-border/20 opacity-60'
                }`}
                onClick={() => unlocked && !completed && navigate(round.path)}
              >
                {!unlocked && (
                  <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-background/60 backdrop-blur-sm z-10">
                    <span className="text-2xl">🔒</span>
                  </div>
                )}

                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg ${
                    round.color === 'primary' ? 'bg-primary/10' :
                    round.color === 'accent' ? 'bg-accent/10' :
                    round.color === 'warning' ? 'bg-warning/10' : 'bg-success/10'
                  }`}>
                    <Icon className={`w-6 h-6 ${
                      round.color === 'primary' ? 'text-primary' :
                      round.color === 'accent' ? 'text-accent' :
                      round.color === 'warning' ? 'text-warning' : 'text-success'
                    }`} />
                  </div>
                  {completed && <span className="text-success text-lg">✓</span>}
                </div>

                <h3 className="font-display text-lg font-semibold text-foreground mb-1">{round.label}</h3>
                <p className="text-sm text-muted-foreground mb-4">{round.desc}</p>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {completed ? `Score: ${score}` : round.qCount}
                  </span>
                  {unlocked && !completed && (
                    <span className="text-primary text-sm">→</span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        <p className="text-xs text-muted-foreground mt-8 text-center">
          Score ≥ 60% to unlock the next round • Webcam & mic required during tests
        </p>
      </main>
    </div>
  );
}
