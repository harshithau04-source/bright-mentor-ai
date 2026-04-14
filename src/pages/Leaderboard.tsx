import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Trophy, Medal, Crown } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';

interface LeaderboardEntry {
  user_id: string;
  display_name: string;
  avatar_url: string | null;
  total_score: number;
  rounds_completed: number;
}

export default function Leaderboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const { data } = await supabase
        .from('profiles')
        .select('user_id, display_name, avatar_url, scores, completed_rounds');

      if (data) {
        const board: LeaderboardEntry[] = data
          .map(p => {
            const scores = (p.scores as Record<string, number>) || {};
            const total = Object.values(scores).reduce((a: number, b: number) => a + b, 0);
            return {
              user_id: p.user_id,
              display_name: p.display_name || 'Anonymous',
              avatar_url: p.avatar_url,
              total_score: total,
              rounds_completed: (p.completed_rounds || []).length,
            };
          })
          .sort((a, b) => b.total_score - a.total_score || b.rounds_completed - a.rounds_completed);
        setEntries(board);
      }
      setLoading(false);
    };
    fetchLeaderboard();
  }, []);

  const rankIcon = (i: number) => {
    if (i === 0) return <Crown className="w-5 h-5 text-warning" />;
    if (i === 1) return <Medal className="w-5 h-5 text-muted-foreground" />;
    if (i === 2) return <Medal className="w-5 h-5 text-warning/60" />;
    return <span className="w-5 text-center text-xs font-display text-muted-foreground">{i + 1}</span>;
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-20">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Trophy className="w-6 h-6 text-warning" />
            <div>
              <h1 className="font-display text-lg font-bold text-foreground">Leaderboard</h1>
              <p className="text-xs text-muted-foreground">Top performers across all rounds</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={() => navigate('/')} className="gap-2">
            <ArrowLeft className="w-4 h-4" /> Dashboard
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 max-w-2xl">
        {loading ? (
          <div className="text-center py-20 text-muted-foreground font-display animate-pulse">Loading...</div>
        ) : entries.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">No scores yet. Be the first!</div>
        ) : (
          <div className="space-y-3">
            {entries.map((entry, i) => {
              const isMe = entry.user_id === user?.id;
              return (
                <motion.div
                  key={entry.user_id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
                    isMe
                      ? 'border-primary/50 bg-primary/5 glow-primary'
                      : 'border-border/50 gradient-card'
                  } ${i < 3 ? 'border-warning/30' : ''}`}
                >
                  <div className="w-8 flex justify-center">{rankIcon(i)}</div>

                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center overflow-hidden shrink-0">
                    {entry.avatar_url ? (
                      <img src={entry.avatar_url} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-sm font-display font-bold text-muted-foreground">
                        {entry.display_name.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-display text-sm font-bold text-foreground truncate">
                      {entry.display_name} {isMe && <span className="text-primary text-xs">(You)</span>}
                    </p>
                    <p className="text-xs text-muted-foreground">{entry.rounds_completed} rounds completed</p>
                  </div>

                  <div className="text-right">
                    <p className="font-display text-lg font-bold text-foreground">{entry.total_score}</p>
                    <p className="text-xs text-muted-foreground">pts</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
