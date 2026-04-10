import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, ArrowLeft } from 'lucide-react';
import { useTest } from '@/context/TestContext';
import { Button } from '@/components/ui/button';

export default function Solutions() {
  const navigate = useNavigate();
  const { lastResult } = useTest();

  if (!lastResult) {
    navigate('/');
    return null;
  }

  const { questions, answers } = lastResult;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-20">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-display text-lg font-bold text-foreground">Solutions</h1>
            <p className="text-xs text-muted-foreground">Review all answers with explanations</p>
          </div>
          <Button variant="outline" size="sm" onClick={() => navigate('/')} className="gap-2">
            <ArrowLeft className="w-4 h-4" /> Dashboard
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 max-w-2xl space-y-4">
        {questions.map((q, i) => {
          const userAnswer = answers[i];
          const correct = userAnswer === q.answer;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className={`rounded-xl border p-5 ${
                correct
                  ? 'border-success/30 bg-success/5'
                  : 'border-destructive/30 bg-destructive/5'
              }`}
            >
              <div className="flex items-start gap-3 mb-3">
                {correct ? (
                  <CheckCircle className="w-5 h-5 text-success shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                )}
                <div>
                  <span className="text-xs text-muted-foreground font-display">Q{i + 1} • {q.topic}</span>
                  <p className="text-sm font-medium text-foreground mt-1">{q.question}</p>
                </div>
              </div>

              <div className="ml-8 space-y-1 text-sm">
                <p className="text-muted-foreground">
                  Your answer: <span className={correct ? 'text-success' : 'text-destructive'}>{userAnswer || 'Not answered'}</span>
                </p>
                {!correct && (
                  <p className="text-success">
                    Correct: {q.answer}
                  </p>
                )}
                <p className="text-muted-foreground/80 italic mt-2 text-xs">{q.explanation}</p>
              </div>
            </motion.div>
          );
        })}
      </main>
    </div>
  );
}
