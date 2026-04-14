import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Send, MessageSquare, Video, Lightbulb, Sparkles, Loader2 } from 'lucide-react';
import WebcamProctor from '@/components/WebcamProctor';
import VideoRecorder from '@/components/VideoRecorder';
import { hrInterviewQuestions } from '@/data/hrInterviewQuestions';
import { useTest } from '@/context/TestContext';
import { useAIEvaluation, HREvaluation } from '@/hooks/useAIEvaluation';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

type ResponseMode = 'text' | 'video';

interface HRResponse {
  mode: ResponseMode;
  text?: string;
  videoBlob?: Blob;
}

export default function HRInterview() {
  const navigate = useNavigate();
  const { setLastResult, updateProgress } = useTest();
  const { toast } = useToast();

  const [current, setCurrent] = useState(0);
  const [responses, setResponses] = useState<Record<number, HRResponse>>({});
  const [mode, setMode] = useState<ResponseMode>('text');
  const [textInput, setTextInput] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showTips, setShowTips] = useState(false);
  const [hrEvaluations, setHrEvaluations] = useState<Record<number, HREvaluation>>({});
  const { evaluateHR, loading: aiLoading } = useAIEvaluation();

  const questions = hrInterviewQuestions;
  const q = questions[current];

  const saveResponse = () => {
    if (mode === 'text' && textInput.trim()) {
      setResponses(prev => ({
        ...prev,
        [current]: { mode: 'text', text: textInput.trim() },
      }));
      toast({ title: 'Response saved!' });
    }
  };

  const handleVideoComplete = (blob: Blob) => {
    setResponses(prev => ({
      ...prev,
      [current]: { mode: 'video', videoBlob: blob },
    }));
    toast({ title: 'Video response saved!' });
  };

  const handleNext = () => {
    if (mode === 'text' && textInput.trim()) saveResponse();
    setCurrent(c => Math.min(questions.length - 1, c + 1));
    setTextInput(responses[current + 1]?.text || '');
    setMode(responses[current + 1]?.mode || 'text');
    setShowTips(false);
  };

  const handlePrev = () => {
    if (mode === 'text' && textInput.trim()) saveResponse();
    setCurrent(c => Math.max(0, c - 1));
    setTextInput(responses[current - 1]?.text || '');
    setMode(responses[current - 1]?.mode || 'text');
    setShowTips(false);
  };

  const handleSubmit = useCallback(() => {
    if (submitted) return;
    if (mode === 'text' && textInput.trim()) {
      setResponses(prev => ({ ...prev, [current]: { mode: 'text', text: textInput.trim() } }));
    }
    setSubmitted(true);

    const answered = Object.keys(responses).length + (textInput.trim() ? 1 : 0);
    const score = answered;
    const passed = score >= 3;
    const key = 'hr_interview_1';

    if (passed) updateProgress(key, score);

    setLastResult({
      round: 'hr' as any,
      level: 1,
      score,
      total: 5,
      answers: Object.fromEntries(
        Object.entries(responses).map(([k, v]) => [k, v.mode === 'text' ? v.text || '' : '[Video Response]'])
      ) as any,
      questions: questions.map(q => ({
        id: q.id,
        question: q.question,
        options: [],
        answer: '',
        explanation: q.tips.join('. '),
        topic: q.category,
      })),
      passed,
    });

    navigate('/results');
  }, [submitted, responses, textInput, current, mode, questions, navigate, setLastResult, updateProgress]);

  return (
    <div className="min-h-screen bg-background">
      <WebcamProctor />

      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-20">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-display text-lg font-bold text-foreground">HR Interview Round</h1>
            <p className="text-xs text-muted-foreground">Question {current + 1} of {questions.length}</p>
          </div>
          <div className="flex items-center gap-3">
            {/* Question indicators */}
            <div className="flex gap-1">
              {questions.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    if (mode === 'text' && textInput.trim()) saveResponse();
                    setCurrent(i);
                    setTextInput(responses[i]?.text || '');
                    setMode(responses[i]?.mode || 'text');
                  }}
                  className={`w-7 h-7 rounded-md text-xs font-display font-bold transition-all ${
                    i === current
                      ? 'bg-primary text-primary-foreground'
                      : responses[i]
                      ? 'bg-success/20 text-success border border-success/30'
                      : 'bg-secondary text-muted-foreground'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 max-w-3xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            {/* Question */}
            <div className="rounded-xl border border-border/50 gradient-card p-6 mb-6">
              <span className="inline-block px-2 py-0.5 text-xs rounded-md bg-accent/10 text-accent font-display mb-3">
                {q.category}
              </span>
              <h2 className="text-xl font-display font-bold text-foreground mb-4">{q.question}</h2>

              {/* Tips toggle */}
              <button
                onClick={() => setShowTips(!showTips)}
                className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                <Lightbulb className="w-3 h-3" />
                {showTips ? 'Hide tips' : 'Show tips'}
              </button>

              <AnimatePresence>
                {showTips && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <ul className="mt-3 space-y-1">
                      {q.tips.map((tip, i) => (
                        <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                          <span className="text-primary mt-0.5">•</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Response mode toggle */}
            <div className="flex gap-2 mb-4">
              <Button
                variant={mode === 'text' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setMode('text')}
                className="gap-2"
              >
                <MessageSquare className="w-4 h-4" /> Type Response
              </Button>
              <Button
                variant={mode === 'video' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setMode('video')}
                className="gap-2"
              >
                <Video className="w-4 h-4" /> Record Video
              </Button>
            </div>

            {/* Response area */}
            {mode === 'text' ? (
              <div>
                <Textarea
                  placeholder="Type your answer here... Be detailed and provide examples."
                  value={textInput}
                  onChange={e => setTextInput(e.target.value)}
                  className="min-h-[200px] bg-secondary border-border/50 text-sm"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  {textInput.length} characters
                </p>
              </div>
            ) : (
              <VideoRecorder
                onRecordingComplete={handleVideoComplete}
                maxDuration={q.maxDuration}
              />
            )}

            {/* AI Evaluate Button */}
            {mode === 'text' && textInput.trim() && (
              <div className="mt-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={async () => {
                    const result = await evaluateHR(q.question, textInput, q.category);
                    if (result) setHrEvaluations(prev => ({ ...prev, [current]: result }));
                  }}
                  disabled={aiLoading}
                  className="gap-2"
                >
                  {aiLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                  AI Evaluate Response
                </Button>
              </div>
            )}

            {/* AI Feedback */}
            {hrEvaluations[current] && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 rounded-xl border border-primary/30 bg-primary/5 p-4"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="font-display text-sm font-bold text-foreground">
                    AI Score: {hrEvaluations[current].score}/10
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{hrEvaluations[current].feedback}</p>
                {hrEvaluations[current].strengths.length > 0 && (
                  <div className="mb-2">
                    <p className="text-xs font-display text-success mb-1">Strengths:</p>
                    <ul className="space-y-1">
                      {hrEvaluations[current].strengths.map((s, i) => (
                        <li key={i} className="text-xs text-muted-foreground flex gap-1">
                          <span className="text-success">✓</span> {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {hrEvaluations[current].improvements.length > 0 && (
                  <div>
                    <p className="text-xs font-display text-warning mb-1">Improvements:</p>
                    <ul className="space-y-1">
                      {hrEvaluations[current].improvements.map((s, i) => (
                        <li key={i} className="text-xs text-muted-foreground flex gap-1">
                          <span className="text-warning">→</span> {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            )}
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={handlePrev}
            disabled={current === 0}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Previous
          </Button>

          {current < questions.length - 1 ? (
            <Button onClick={handleNext} className="gap-2">
              Next <ArrowRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} className="gap-2 bg-success hover:bg-success/90 text-success-foreground">
              Submit <Send className="w-4 h-4" />
            </Button>
          )}
        </div>
      </main>
    </div>
  );
}
