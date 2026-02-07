import { useEffect, useState } from 'react';
import { Clock, BookOpen, Trophy, Target } from 'lucide-react';

interface Stats {
  totalTime: number;
  coursesCompleted: number;
  currentStreak: number;
  longestStreak: number;
}

export default function LearningStats({ userId }: { userId: string }) {
  const [stats, setStats] = useState<Stats>({
    totalTime: 0,
    coursesCompleted: 0,
    currentStreak: 0,
    longestStreak: 0
  });

  useEffect(() => {
    fetch(`http://localhost:3001/api/users/${userId}/stats`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then(data => setStats(data))
      .catch(err => {
        console.error(err);
        setStats({
          totalTime: 0,
          coursesCompleted: 0,
          currentStreak: 0,
          longestStreak: 0
        });
      });
  }, [userId]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="p-4 rounded-lg bg-muted/30 border border-border">
        <div className="flex items-center gap-2 mb-2">
          <Clock className="h-4 w-4 text-primary" />
          <span className="text-xs text-muted-foreground">Total Time</span>
        </div>
        <p className="text-2xl font-bold">{formatTime(stats.totalTime)}</p>
      </div>

      <div className="p-4 rounded-lg bg-muted/30 border border-border">
        <div className="flex items-center gap-2 mb-2">
          <BookOpen className="h-4 w-4 text-primary" />
          <span className="text-xs text-muted-foreground">Completed</span>
        </div>
        <p className="text-2xl font-bold">{stats.coursesCompleted}</p>
      </div>

      <div className="p-4 rounded-lg bg-muted/30 border border-border">
        <div className="flex items-center gap-2 mb-2">
          <Trophy className="h-4 w-4 text-primary" />
          <span className="text-xs text-muted-foreground">Current Streak</span>
        </div>
        <p className="text-2xl font-bold">{stats.currentStreak} days</p>
      </div>

      <div className="p-4 rounded-lg bg-muted/30 border border-border">
        <div className="flex items-center gap-2 mb-2">
          <Target className="h-4 w-4 text-primary" />
          <span className="text-xs text-muted-foreground">Best Streak</span>
        </div>
        <p className="text-2xl font-bold">{stats.longestStreak} days</p>
      </div>
    </div>
  );
}
