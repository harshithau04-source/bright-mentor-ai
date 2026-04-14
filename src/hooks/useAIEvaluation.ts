import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface CodingEvaluation {
  score: number;
  feedback: string;
  correctness: boolean;
  suggestions: string[];
}

export interface HREvaluation {
  score: number;
  feedback: string;
  strengths: string[];
  improvements: string[];
}

export function useAIEvaluation() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const evaluateCoding = async (
    question: string,
    code: string,
    language: string,
    category: string
  ): Promise<CodingEvaluation | null> => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('evaluate', {
        body: { type: 'coding', data: { question, code, language, category } },
      });
      if (error) throw error;
      return data.evaluation;
    } catch (e: any) {
      toast({ title: 'Evaluation failed', description: e.message, variant: 'destructive' });
      return null;
    } finally {
      setLoading(false);
    }
  };

  const evaluateHR = async (
    question: string,
    answer: string,
    category: string
  ): Promise<HREvaluation | null> => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('evaluate', {
        body: { type: 'hr', data: { question, answer, category } },
      });
      if (error) throw error;
      return data.evaluation;
    } catch (e: any) {
      toast({ title: 'Evaluation failed', description: e.message, variant: 'destructive' });
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { evaluateCoding, evaluateHR, loading };
}
