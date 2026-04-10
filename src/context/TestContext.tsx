import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Question, RoundType } from '@/data/mockQuestions';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface TestResult {
  round: RoundType;
  level: number;
  score: number;
  total: number;
  answers: Record<number, string>;
  questions: Question[];
  passed: boolean;
}

interface UserProgress {
  completedRounds: string[];
  scores: Record<string, number>;
}

interface TestContextType {
  lastResult: TestResult | null;
  setLastResult: (r: TestResult | null) => void;
  progress: UserProgress;
  updateProgress: (round: string, score: number) => void;
  isRoundUnlocked: (round: RoundType, level: number) => boolean;
}

const TestContext = createContext<TestContextType | null>(null);

export function TestProvider({ children }: { children: ReactNode }) {
  const { user, profile, refreshProfile } = useAuth();
  const [lastResult, setLastResult] = useState<TestResult | null>(null);
  const [progress, setProgress] = useState<UserProgress>({
    completedRounds: [],
    scores: {},
  });

  // Sync progress from profile
  useEffect(() => {
    if (profile) {
      setProgress({
        completedRounds: profile.completed_rounds,
        scores: profile.scores,
      });
    }
  }, [profile]);

  const updateProgress = async (round: string, score: number) => {
    const newCompleted = [...progress.completedRounds, round];
    const newScores = { ...progress.scores, [round]: score };

    setProgress({ completedRounds: newCompleted, scores: newScores });

    if (user) {
      await supabase
        .from('profiles')
        .update({
          completed_rounds: newCompleted,
          scores: newScores,
        })
        .eq('user_id', user.id);
      refreshProfile();
    }
  };

  const isRoundUnlocked = (round: RoundType, level: number): boolean => {
    if (level === 1) {
      if (round === 'aptitude') return true;
      if (round === 'technical') return progress.completedRounds.includes('aptitude_1');
      if (round === 'hr') return progress.completedRounds.includes('technical_1');
    }
    return progress.completedRounds.includes(`${round}_${level - 1}`);
  };

  return (
    <TestContext.Provider value={{ lastResult, setLastResult, progress, updateProgress, isRoundUnlocked }}>
      {children}
    </TestContext.Provider>
  );
}

export const useTest = () => {
  const ctx = useContext(TestContext);
  if (!ctx) throw new Error('useTest must be used within TestProvider');
  return ctx;
};
