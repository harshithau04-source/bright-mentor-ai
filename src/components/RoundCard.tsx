import { motion } from 'framer-motion';
import { Lock, CheckCircle, ArrowRight, Brain, Code, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { RoundType } from '@/data/mockQuestions';
import { useTest } from '@/context/TestContext';

const roundConfig = {
  aptitude: { icon: Brain, label: 'Aptitude', description: 'Logical reasoning, math & analytical skills', color: 'primary' },
  technical: { icon: Code, label: 'Technical', description: 'DSA, OOP, databases & system design', color: 'accent' },
  hr: { icon: Users, label: 'HR', description: 'Behavioral, situational & communication skills', color: 'success' },
} as const;

export default function RoundCard({ round }: { round: RoundType }) {
  const navigate = useNavigate();
  const { isRoundUnlocked, progress } = useTest();
  const config = roundConfig[round];
  const Icon = config.icon;
  const unlocked = isRoundUnlocked(round, 1);
  const completed = progress.completedRounds.includes(`${round}_1`);
  const score = progress.scores[`${round}_1`];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={unlocked ? { y: -4, scale: 1.02 } : {}}
      transition={{ duration: 0.3 }}
      className={`relative rounded-xl border gradient-card p-6 transition-all duration-300 ${
        unlocked 
          ? 'border-border/50 hover:border-primary/50 hover:glow-primary cursor-pointer' 
          : 'border-border/20 opacity-60'
      }`}
      onClick={() => unlocked && !completed && navigate(`/test/${round}/1`)}
    >
      {!unlocked && (
        <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-background/60 backdrop-blur-sm z-10">
          <Lock className="w-8 h-8 text-muted-foreground" />
        </div>
      )}

      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg ${
          config.color === 'primary' ? 'bg-primary/10' : 
          config.color === 'accent' ? 'bg-accent/10' : 'bg-success/10'
        }`}>
          <Icon className={`w-6 h-6 ${
            config.color === 'primary' ? 'text-primary' : 
            config.color === 'accent' ? 'text-accent' : 'text-success'
          }`} />
        </div>
        {completed && <CheckCircle className="w-6 h-6 text-success" />}
      </div>

      <h3 className="font-display text-lg font-semibold text-foreground mb-1">{config.label} Round</h3>
      <p className="text-sm text-muted-foreground mb-4">{config.description}</p>

      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">
          {completed ? `Score: ${score}/20` : '20 Questions • 30 min'}
        </span>
        {unlocked && !completed && (
          <ArrowRight className="w-4 h-4 text-primary" />
        )}
      </div>
    </motion.div>
  );
}
