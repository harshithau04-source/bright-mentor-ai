import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, ArrowRight, RotateCcw, BookOpen } from 'lucide-react';
import { useTest } from '@/context/TestContext';
import { Button } from '@/components/ui/button';

export default function TestResults() {
  const navigate = useNavigate();
  const { lastResult } = useTest();

  if (!lastResult) {
    navigate('/');
    return null;
  }

  const { score, total, passed, round } = lastResult;
  const pct = Math.round((score / total) * 100);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="mb-6"
        >
          {passed ? (
            <CheckCircle className="w-20 h-20 text-success mx-auto" />
          ) : (
            <XCircle className="w-20 h-20 text-destructive mx-auto" />
          )}
        </motion.div>

        <h1 className="font-display text-3xl font-bold text-foreground mb-2">
          {passed ? 'Congratulations!' : 'Keep Practicing!'}
        </h1>
        <p className="text-muted-foreground mb-8">
          {passed
            ? 'You passed this round and unlocked the next one.'
            : 'Score 60% or above to advance to the next round.'}
        </p>

        <div className="rounded-xl border border-border/50 gradient-card p-6 mb-8">
          <div className="text-5xl font-display font-bold mb-2">
            <span className={passed ? 'text-success' : 'text-destructive'}>{score}</span>
            <span className="text-muted-foreground">/{total}</span>
          </div>
          <p className="text-muted-foreground text-sm">{pct}% accuracy</p>

          <div className="w-full bg-secondary rounded-full h-2 mt-4">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className={`h-2 rounded-full ${passed ? 'bg-success' : 'bg-destructive'}`}
            />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Button onClick={() => navigate('/solutions')} className="gap-2 w-full">
            <BookOpen className="w-4 h-4" /> View Solutions
          </Button>
          {passed ? (
            <Button variant="outline" onClick={() => navigate('/')} className="gap-2 w-full">
              <ArrowRight className="w-4 h-4" /> Next Round
            </Button>
          ) : (
            <Button variant="outline" onClick={() => navigate(`/test/${round}/1`)} className="gap-2 w-full">
              <RotateCcw className="w-4 h-4" /> Retry
            </Button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
