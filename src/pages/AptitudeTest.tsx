import { useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Send } from 'lucide-react';
import Timer from '@/components/Timer';
import QuestionNav from '@/components/QuestionNav';
import { getQuestions, RoundType } from '@/data/mockQuestions';
import { useTest } from '@/context/TestContext';
import { Button } from '@/components/ui/button';

export default function AptitudeTest() {
  const { round } = useParams<{ round: RoundType }>();
  const navigate = useNavigate();
  const { setLastResult, updateProgress } = useTest();
  const questions = getQuestions(round as RoundType);

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleAnswer = (option: string) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [current]: option }));
  };

  const handleSubmit = useCallback(() => {
    if (submitted) return;
    setSubmitted(true);
    let score = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.answer) score++;
    });
    const passed = score >= 12;
    const key = `${round}_1`;

    if (passed) updateProgress(key, score);

    setLastResult({
      round: round as RoundType,
      level: 1,
      score,
      total: 20,
      answers,
      questions,
      passed,
    });
    navigate('/results');
  }, [submitted, questions, answers, round, navigate, setLastResult, updateProgress]);

  const q = questions[current];
  const roundLabel = round === 'aptitude' ? 'Aptitude' : round === 'technical' ? 'Technical' : 'HR';

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-20">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-display text-lg font-bold text-foreground">{roundLabel} Round</h1>
            <p className="text-xs text-muted-foreground">Question {current + 1} of 20</p>
          </div>
          <Timer initialSeconds={1800} onTimeUp={handleSubmit} />
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 flex flex-col lg:flex-row gap-8">
        {/* Sidebar nav */}
        <aside className="lg:w-64 shrink-0">
          <div className="sticky top-24">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">Questions</p>
            <QuestionNav total={20} current={current} answers={answers} onSelect={setCurrent} />
            <p className="text-xs text-muted-foreground mt-4">
              {Object.keys(answers).length}/20 answered
            </p>
          </div>
        </aside>

        {/* Question area */}
        <div className="flex-1 max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="rounded-xl border border-border/50 gradient-card p-6 mb-6"
            >
              <span className="inline-block px-2 py-0.5 text-xs rounded-md bg-primary/10 text-primary font-display mb-4">
                {q.topic}
              </span>
              <p className="text-lg font-medium text-foreground mb-6 leading-relaxed">{q.question}</p>

              <div className="space-y-3">
                {q.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswer(opt)}
                    className={`w-full text-left p-4 rounded-lg border transition-all text-sm ${
                      answers[current] === opt
                        ? 'border-primary bg-primary/10 text-foreground'
                        : 'border-border/50 hover:border-muted-foreground/30 text-secondary-foreground hover:bg-secondary/50'
                    }`}
                  >
                    <span className="font-display font-semibold mr-3 text-muted-foreground">
                      {String.fromCharCode(65 + i)}.
                    </span>
                    {opt}
                  </button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => setCurrent(c => Math.max(0, c - 1))}
              disabled={current === 0}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" /> Previous
            </Button>

            {current < 19 ? (
              <Button onClick={() => setCurrent(c => c + 1)} className="gap-2">
                Next <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} className="gap-2 bg-success hover:bg-success/90 text-success-foreground">
                Submit <Send className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
