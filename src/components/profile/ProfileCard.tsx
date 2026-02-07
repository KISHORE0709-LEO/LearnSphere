import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Trophy, Star, Sparkles } from "lucide-react";

export interface BadgeLevel {
  name: string;
  minPoints: number;
  icon: string;
  color: string;
}

export const BADGE_LEVELS: BadgeLevel[] = [
  { name: "Newbie", minPoints: 0, icon: "🌱", color: "from-green-400 to-green-600" },
  { name: "Explorer", minPoints: 20, icon: "🧭", color: "from-blue-400 to-blue-600" },
  { name: "Achiever", minPoints: 40, icon: "🎯", color: "from-amber-400 to-amber-600" },
  { name: "Specialist", minPoints: 60, icon: "⚡", color: "from-purple-400 to-purple-600" },
  { name: "Expert", minPoints: 80, icon: "🔥", color: "from-orange-400 to-red-600" },
  { name: "Master", minPoints: 100, icon: "👑", color: "from-yellow-400 to-yellow-600" },
];

export function getCurrentBadge(points: number): BadgeLevel {
  for (let i = BADGE_LEVELS.length - 1; i >= 0; i--) {
    if (points >= BADGE_LEVELS[i].minPoints) {
      return BADGE_LEVELS[i];
    }
  }
  return BADGE_LEVELS[0];
}

export function getNextBadge(points: number): BadgeLevel | null {
  for (const badge of BADGE_LEVELS) {
    if (points < badge.minPoints) {
      return badge;
    }
  }
  return null;
}

interface ProfileCardProps {
  name: string;
  email: string;
  avatar?: string;
  points: number;
  coursesCompleted: number;
  coursesInProgress: number;
}

export function ProfileCard({
  name,
  email,
  avatar,
  points,
  coursesCompleted,
  coursesInProgress
}: ProfileCardProps) {
  const currentBadge = getCurrentBadge(points);
  const nextBadge = getNextBadge(points);
  const progressToNext = nextBadge 
    ? ((points - currentBadge.minPoints) / (nextBadge.minPoints - currentBadge.minPoints)) * 100
    : 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-2xl overflow-hidden"
    >
      {/* Header with gradient */}
      <div className={cn("h-24 bg-gradient-to-r", currentBadge.color)} />
      
      {/* Profile Info */}
      <div className="px-6 pb-6 -mt-10 relative">
        {/* Avatar */}
        <div className="relative inline-block">
          <div className="h-20 w-20 rounded-full border-4 border-card bg-muted overflow-hidden">
            {avatar ? (
              <img src={avatar} alt={name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-muted-foreground">
                {name.charAt(0)}
              </div>
            )}
          </div>
          <div className="absolute -bottom-1 -right-1 text-2xl">{currentBadge.icon}</div>
        </div>

        {/* Name & Email */}
        <div className="mt-3">
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-sm text-muted-foreground">{email}</p>
        </div>

        {/* Badge Level */}
        <div className="mt-4 p-4 bg-muted/50 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Trophy className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">{currentBadge.name}</span>
            </div>
            <span className="text-sm font-bold text-primary">{points} pts</span>
          </div>
          
          {nextBadge && (
            <>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progressToNext}%` }}
                  className={cn("h-full bg-gradient-to-r", currentBadge.color)}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {nextBadge.minPoints - points} pts to {nextBadge.name} {nextBadge.icon}
              </p>
            </>
          )}
        </div>

        {/* Stats */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="p-3 bg-muted/50 rounded-lg text-center">
            <p className="text-2xl font-bold text-primary">{coursesCompleted}</p>
            <p className="text-xs text-muted-foreground">Completed</p>
          </div>
          <div className="p-3 bg-muted/50 rounded-lg text-center">
            <p className="text-2xl font-bold text-secondary">{coursesInProgress}</p>
            <p className="text-xs text-muted-foreground">In Progress</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
