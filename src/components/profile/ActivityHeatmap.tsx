import { useEffect, useState } from 'react';

interface ActivityData {
  date: string;
  count: number;
}

export default function ActivityHeatmap({ userId }: { userId: string }) {
  const [activities, setActivities] = useState<ActivityData[]>([]);

  useEffect(() => {
    fetch(`http://localhost:3001/api/users/${userId}/activity`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then(data => setActivities(data))
      .catch(err => {
        console.error(err);
        setActivities([]);
      });
  }, [userId]);

  const getColor = (count: number) => {
    if (count === 0) return 'bg-muted';
    if (count <= 2) return 'bg-green-200 dark:bg-green-900';
    if (count <= 5) return 'bg-green-400 dark:bg-green-700';
    if (count <= 10) return 'bg-green-600 dark:bg-green-500';
    return 'bg-green-800 dark:bg-green-300';
  };

  const getLast365Days = () => {
    const days = [];
    for (let i = 364; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const activity = activities.find(a => a.date === dateStr);
      days.push({ date: dateStr, count: activity?.count || 0 });
    }
    return days;
  };

  const days = getLast365Days();
  const weeks = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium">Learning Activity</h3>
      <div className="flex gap-1 overflow-x-auto pb-2">
        {weeks.map((week, i) => (
          <div key={i} className="flex flex-col gap-1">
            {week.map((day, j) => (
              <div
                key={j}
                className={`w-3 h-3 rounded-sm ${getColor(day.count)}`}
                title={`${day.date}: ${day.count} activities`}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span>Less</span>
        <div className="flex gap-1">
          <div className="w-3 h-3 rounded-sm bg-muted" />
          <div className="w-3 h-3 rounded-sm bg-green-200 dark:bg-green-900" />
          <div className="w-3 h-3 rounded-sm bg-green-400 dark:bg-green-700" />
          <div className="w-3 h-3 rounded-sm bg-green-600 dark:bg-green-500" />
          <div className="w-3 h-3 rounded-sm bg-green-800 dark:bg-green-300" />
        </div>
        <span>More</span>
      </div>
    </div>
  );
}
