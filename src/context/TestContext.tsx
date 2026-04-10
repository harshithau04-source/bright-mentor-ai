import { createContext, useContext, useState, ReactNode } from 'react';
import { Question, RoundType } from '@/data/mockQuestions';

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
  const [lastResult, setLastResult] = useState<TestResult | null>(null);
  const [progress, setProgress] = useState<UserProgress>({
    completedRounds: [],
    scores: {},
  });

  const updateProgress = (round: string, score: number) => {
    setProgress(prev => ({
      completedRounds: [...prev.completedRounds, round],
      scores: { ...prev.scores, [round]: score },
    }));
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
