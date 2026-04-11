import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Send, Code2 } from 'lucide-react';
import Editor from '@monaco-editor/react';
import Timer from '@/components/Timer';
import WebcamProctor from '@/components/WebcamProctor';
import { dsaQuestions, sqlQuestions, codingLanguages, CodingLanguage, CodingQuestion } from '@/data/codingQuestions';
import { useTest } from '@/context/TestContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const monacoLangMap: Record<string, string> = {
  python: 'python',
  javascript: 'javascript',
  java: 'java',
  cpp: 'cpp',
  sql: 'sql',
};

export default function CodingTest() {
  const navigate = useNavigate();
  const { setLastResult, updateProgress } = useTest();
  const { toast } = useToast();

  const [language, setLanguage] = useState<CodingLanguage | null>(null);
  const [category, setCategory] = useState<'dsa' | 'sql' | null>(null);
  const [current, setCurrent] = useState(0);
  const [codes, setCodes] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);

  // Category & language selection screen
  if (!category || !language) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-lg w-full"
        >
          <div className="text-center mb-8">
            <Code2 className="w-12 h-12 text-primary mx-auto mb-4" />
            <h1 className="text-2xl font-display font-bold text-foreground mb-2">Coding Round</h1>
            <p className="text-muted-foreground text-sm">Choose your category and language</p>
          </div>

          {/* Category Selection */}
          <div className="mb-6">
            <p className="text-sm font-display text-muted-foreground uppercase tracking-wider mb-3">Category</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'dsa' as const, label: 'DSA', desc: '5 Data Structures & Algorithms problems', icon: '🧮' },
                { id: 'sql' as const, label: 'SQL', desc: '5 SQL query problems', icon: '🗃️' },
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setCategory(cat.id);
                    if (cat.id === 'sql') setLanguage('sql');
                  }}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    category === cat.id
                      ? 'border-primary bg-primary/10'
                      : 'border-border/50 hover:border-muted-foreground/30 gradient-card'
                  }`}
                >
                  <span className="text-2xl">{cat.icon}</span>
                  <p className="font-display font-semibold text-foreground mt-2">{cat.label}</p>
                  <p className="text-xs text-muted-foreground mt-1">{cat.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Language Selection (only for DSA) */}
          {category && category !== 'sql' && (
            <div className="mb-6">
              <p className="text-sm font-display text-muted-foreground uppercase tracking-wider mb-3">Language</p>
              <div className="grid grid-cols-2 gap-3">
                {codingLanguages.filter(l => l.id !== 'sql').map(lang => (
                  <button
                    key={lang.id}
                    onClick={() => setLanguage(lang.id)}
                    className={`p-3 rounded-lg border flex items-center gap-3 transition-all ${
                      language === lang.id
                        ? 'border-primary bg-primary/10'
                        : 'border-border/50 hover:border-muted-foreground/30'
                    }`}
                  >
                    <span className="text-xl">{lang.icon}</span>
                    <span className="font-display text-sm text-foreground">{lang.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {category && language && (
            <Button
              onClick={() => {}}
              className="w-full gap-2 mt-4"
              // This button is just visual - selection already done
            >
              Start Coding <ArrowRight className="w-4 h-4" />
            </Button>
          )}
        </motion.div>
      </div>
    );
  }

  const questions: CodingQuestion[] = category === 'dsa' ? dsaQuestions : sqlQuestions;
  const q = questions[current];
  const currentCode = codes[current] ?? (q.starterCode[language] || q.starterCode['sql'] || '');

  const handleCodeChange = (value: string | undefined) => {
    setCodes(prev => ({ ...prev, [current]: value || '' }));
  };

  const handleSubmit = () => {
    if (submitted) return;
    setSubmitted(true);

    // For coding round, we give score based on how many were attempted
    const attempted = Object.keys(codes).length;
    const score = attempted; // simplified scoring
    const passed = score >= 3;
    const key = `coding_1`;

    if (passed) updateProgress(key, score);

    setLastResult({
      round: 'coding' as any,
      level: 1,
      score,
      total: 5,
      answers: codes as any,
      questions: questions.map(q => ({
        id: q.id,
        question: q.title,
        options: [],
        answer: '',
        explanation: q.description,
        topic: q.category,
      })),
      passed,
    });

    toast({
      title: passed ? 'Round Complete!' : 'Keep Practicing!',
      description: `You attempted ${attempted}/5 problems.`,
    });

    navigate('/results');
  };

  return (
    <div className="min-h-screen bg-background">
      <WebcamProctor />

      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-20">
        <div className="container mx-auto px-6 py-3 flex items-center justify-between">
          <div>
            <h1 className="font-display text-lg font-bold text-foreground">
              Coding Round — {category.toUpperCase()}
            </h1>
            <p className="text-xs text-muted-foreground">
              Q{current + 1}/5 • {language.toUpperCase()}
            </p>
          </div>
          <Timer initialSeconds={2700} onTimeUp={handleSubmit} />
        </div>
      </header>

      <div className="flex h-[calc(100vh-65px)]">
        {/* Problem panel */}
        <div className="w-[400px] border-r border-border/50 overflow-y-auto p-6">
          {/* Question nav */}
          <div className="flex gap-2 mb-4">
            {questions.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-8 h-8 rounded-lg text-xs font-display font-bold transition-all ${
                  i === current
                    ? 'bg-primary text-primary-foreground'
                    : codes[i]
                    ? 'bg-success/20 text-success border border-success/30'
                    : 'bg-secondary text-muted-foreground border border-border/50'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <span className={`inline-block px-2 py-0.5 text-xs rounded-md font-display mb-3 ${
                q.difficulty === 'easy' ? 'bg-success/10 text-success' :
                q.difficulty === 'medium' ? 'bg-warning/10 text-warning' :
                'bg-destructive/10 text-destructive'
              }`}>
                {q.difficulty}
              </span>
              <h2 className="text-lg font-display font-bold text-foreground mb-3">{q.title}</h2>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">
                {q.description}
              </p>

              <div className="mt-4 p-3 rounded-lg bg-secondary/50 border border-border/50">
                <p className="text-xs font-display text-muted-foreground mb-1">Expected Output</p>
                <code className="text-xs text-primary">{q.expectedOutput}</code>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Editor panel */}
        <div className="flex-1 flex flex-col">
          <Editor
            height="calc(100vh - 130px)"
            language={monacoLangMap[language]}
            value={currentCode}
            onChange={handleCodeChange}
            theme="vs-dark"
            options={{
              fontSize: 14,
              fontFamily: 'JetBrains Mono, monospace',
              minimap: { enabled: false },
              padding: { top: 16 },
              scrollBeyondLastLine: false,
            }}
          />

          <div className="border-t border-border/50 p-3 flex justify-between bg-card">
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrent(c => Math.max(0, c - 1))}
                disabled={current === 0}
                className="gap-1"
              >
                <ArrowLeft className="w-3 h-3" /> Prev
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrent(c => Math.min(4, c + 1))}
                disabled={current === 4}
                className="gap-1"
              >
                Next <ArrowRight className="w-3 h-3" />
              </Button>
            </div>

            {current === 4 || Object.keys(codes).length === 5 ? (
              <Button size="sm" onClick={handleSubmit} className="gap-1 bg-success hover:bg-success/90 text-success-foreground">
                Submit All <Send className="w-3 h-3" />
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
