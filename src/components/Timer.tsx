import { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

interface TimerProps {
  initialSeconds: number;
  onTimeUp: () => void;
}

export default function Timer({ initialSeconds, onTimeUp }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);

  useEffect(() => {
    if (timeLeft <= 0) { onTimeUp(); return; }
    const id = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(id);
  }, [timeLeft, onTimeUp]);

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  const urgent = timeLeft < 300;

  return (
    <div className={`flex items-center gap-2 font-display text-sm font-semibold px-3 py-1.5 rounded-lg ${
      urgent ? 'bg-destructive/10 text-destructive' : 'bg-secondary text-secondary-foreground'
    }`}>
      <Clock className="w-4 h-4" />
      {mins}:{String(secs).padStart(2, '0')}
    </div>
  );
}
