interface QuestionNavProps {
  total: number;
  current: number;
  answers: Record<number, string>;
  onSelect: (index: number) => void;
}

export default function QuestionNav({ total, current, answers, onSelect }: QuestionNavProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {Array.from({ length: total }, (_, i) => {
        const answered = answers[i] !== undefined;
        const active = i === current;
        return (
          <button
            key={i}
            onClick={() => onSelect(i)}
            className={`w-9 h-9 rounded-lg font-display text-xs font-semibold transition-all ${
              active
                ? 'bg-primary text-primary-foreground glow-primary'
                : answered
                ? 'bg-primary/20 text-primary border border-primary/30'
                : 'bg-secondary text-muted-foreground hover:bg-secondary/80'
            }`}
          >
            {i + 1}
          </button>
        );
      })}
    </div>
  );
}
