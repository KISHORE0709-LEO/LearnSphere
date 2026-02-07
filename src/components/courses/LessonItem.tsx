import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { 
  Video, 
  FileText, 
  Image as ImageIcon, 
  HelpCircle, 
  CheckCircle2, 
  Circle, 
  PlayCircle,
  Clock,
  MoreVertical,
  Pencil,
  Trash2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type LessonType = "video" | "document" | "image" | "quiz";
export type LessonStatus = "completed" | "in-progress" | "not-started";

export interface LessonItemProps {
  id: string;
  title: string;
  type: LessonType;
  duration?: string;
  status?: LessonStatus;
  isActive?: boolean;
  isAdmin?: boolean;
  onClick?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

const typeIcons: Record<LessonType, typeof Video> = {
  video: Video,
  document: FileText,
  image: ImageIcon,
  quiz: HelpCircle,
};

const statusIcons: Record<LessonStatus, typeof CheckCircle2> = {
  completed: CheckCircle2,
  "in-progress": PlayCircle,
  "not-started": Circle,
};

export function LessonItem({
  id,
  title,
  type,
  duration,
  status = "not-started",
  isActive,
  isAdmin,
  onClick,
  onEdit,
  onDelete
}: LessonItemProps) {
  const TypeIcon = typeIcons[type];
  const StatusIcon = statusIcons[status];

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ x: 4 }}
      className={cn(
        "group flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all",
        isActive 
          ? "bg-primary/10 border border-primary/30" 
          : "hover:bg-muted/50",
        status === "completed" && "opacity-80"
      )}
      onClick={onClick}
    >
      {/* Status Icon */}
      {!isAdmin && (
        <StatusIcon 
          className={cn(
            "h-5 w-5 shrink-0",
            status === "completed" && "text-success",
            status === "in-progress" && "text-primary",
            status === "not-started" && "text-muted-foreground"
          )} 
        />
      )}

      {/* Type Icon */}
      <div className={cn(
        "p-2 rounded-lg shrink-0",
        type === "video" && "bg-primary/10 text-primary",
        type === "document" && "bg-warning/10 text-warning",
        type === "image" && "bg-success/10 text-success",
        type === "quiz" && "bg-secondary/10 text-secondary"
      )}>
        <TypeIcon className="h-4 w-4" />
      </div>

      {/* Title */}
      <div className="flex-1 min-w-0">
        <p className={cn(
          "text-sm font-medium truncate",
          isActive ? "text-primary" : "text-foreground"
        )}>
          {title}
        </p>
        {duration && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
            <Clock className="h-3 w-3" />
            <span>{duration}</span>
          </div>
        )}
      </div>

      {/* Admin Actions */}
      {isAdmin && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon-sm" 
              className="opacity-0 group-hover:opacity-100"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onEdit?.(); }}>
              <Pencil className="h-4 w-4 mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={(e) => { e.stopPropagation(); onDelete?.(); }}
              className="text-destructive focus:text-destructive"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </motion.div>
  );
}
