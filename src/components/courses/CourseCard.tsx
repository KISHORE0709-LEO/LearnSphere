import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Clock, BookOpen, Star, Users } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  duration: string;
  lessonsCount: number;
  rating?: number;
  studentsCount?: number;
  progress?: number;
  status?: "not-started" | "in-progress" | "completed";
  isPaid?: boolean;
  price?: number;
  isEnrolled?: boolean;
  isLoggedIn?: boolean;
  onClick?: () => void;
}

export function CourseCard({
  id,
  title,
  description,
  image,
  tags,
  duration,
  lessonsCount,
  rating,
  studentsCount,
  progress,
  status,
  isPaid,
  price,
  isEnrolled,
  isLoggedIn,
  onClick
}: CourseCardProps) {
  const getActionButton = () => {
    // Not logged in - show Join Course
    if (!isLoggedIn) {
      return <Button variant="default" size="sm" className="w-full">Join Course</Button>;
    }
    // Paid course and not enrolled - show Buy button
    if (isPaid && !isEnrolled) {
      return <Button variant="gradient" size="sm" className="w-full">Buy ${price}</Button>;
    }
    // Course in progress - show Continue
    if (progress && progress > 0) {
      return <Button variant="glow" size="sm" className="w-full">Continue</Button>;
    }
    // Enrolled but not started - show Start
    return <Button variant="default" size="sm" className="w-full">Start</Button>;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group relative bg-card rounded-xl border border-border overflow-hidden hover:border-primary/50 transition-all cursor-pointer"
      onClick={onClick}
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        
        {/* Tags overlay */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1">
          {tags.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="glass" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Rating overlay */}
        {rating && typeof rating === 'number' && (
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-background/80 backdrop-blur-sm rounded-full px-2 py-1">
            <Star className="h-3 w-3 text-warning fill-warning" />
            <span className="text-xs font-medium">{rating.toFixed(1)}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <h3 className="font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="h-3 w-3" />
            <span>{lessonsCount} lessons</span>
          </div>
          {studentsCount && (
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              <span>{studentsCount}</span>
            </div>
          )}
        </div>

        {/* Progress */}
        {typeof progress === "number" && (
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Progress</span>
              <span className="text-primary font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-1.5" />
          </div>
        )}

        {/* Action */}
        <div className="pt-1">
          {getActionButton()}
        </div>
      </div>
    </motion.div>
  );
}
